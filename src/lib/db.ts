import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Product, PRODUCTS as DEFAULT_PRODUCTS } from '@/data/products';

export interface Inquiry {
  id: string;
  reference: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  destinationCountry: string;
  produce: string;
  volume: string;
  message: string;
  status: 'new' | 'contacted' | 'completed';
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
  passwordHash: string; // sha256
}

interface DatabaseSchema {
  products: Product[];
  inquiries: Inquiry[];
  admin: AdminUser;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'store.json');

// Default initial admin: admin@amacgroup.com / admin123456
const DEFAULT_ADMIN_PASSWORD_HASH = crypto
  .createHash('sha256')
  .update('admin123456')
  .digest('hex');

const INITIAL_DB: DatabaseSchema = {
  products: DEFAULT_PRODUCTS,
  inquiries: [
    {
      id: 'inq-1',
      reference: 'AMAC-904128',
      name: 'Alexander Schmidt',
      company: 'EuroFruits Import GmbH',
      email: 'a.schmidt@eurofruits.de',
      phone: '+49 40 12345678',
      destinationCountry: 'Hamburg Port, Germany',
      produce: 'valencia-oranges',
      volume: '2 - 5 Containers (40ft Reefer)',
      message: 'Looking for weekly delivery of Valencia Oranges, counts 56/64/72.',
      status: 'new',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
    {
      id: 'inq-2',
      reference: 'AMAC-654812',
      name: 'Tariq Al-Mansoor',
      company: 'Gulf Fresh Foodstuff LLC',
      email: 'tariq@gulffresh.ae',
      phone: '+971 4 9876543',
      destinationCountry: 'Jebel Ali Port, UAE',
      produce: 'fresh-onions',
      volume: 'Full Seasonal Contract (10+ Containers)',
      message: 'Golden onions in 25kg red mesh bags with phytosanitary certificate.',
      status: 'contacted',
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
  ],
  admin: {
    id: 'admin-1',
    email: process.env.ADMIN_EMAIL || 'admin@amacgroup.com',
    name: 'AMAC Administrator',
    role: 'admin',
    passwordHash: DEFAULT_ADMIN_PASSWORD_HASH,
  },
};

function ensureDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DB, null, 2), 'utf-8');
      return INITIAL_DB;
    }

    const content = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(content) as DatabaseSchema;
    return parsed;
  } catch (error) {
    console.error('Database read error, falling back to memory state', error);
    return INITIAL_DB;
  }
}

function saveDb(data: DatabaseSchema) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Database write error', error);
  }
}

// Product helpers
export function getDbProducts(): Product[] {
  const db = ensureDb();
  return db.products || [];
}

export function createDbProduct(product: Omit<Product, 'id'> & { id?: string }): Product {
  const db = ensureDb();
  const id = product.id || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `prod-${Date.now()}`;
  const newProduct: Product = { ...product, id };
  db.products = [newProduct, ...(db.products || [])];
  saveDb(db);
  return newProduct;
}

export function updateDbProduct(id: string, updates: Partial<Product>): Product | null {
  const db = ensureDb();
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  db.products[index] = {
    ...db.products[index],
    ...updates,
    id, // protect id
  };
  saveDb(db);
  return db.products[index];
}

export function deleteDbProduct(id: string): boolean {
  const db = ensureDb();
  const initialLen = db.products.length;
  db.products = db.products.filter((p) => p.id !== id);
  if (db.products.length !== initialLen) {
    saveDb(db);
    return true;
  }
  return false;
}

// Inquiry helpers
export function getDbInquiries(): Inquiry[] {
  const db = ensureDb();
  return db.inquiries || [];
}

export function createDbInquiry(inquiryData: Omit<Inquiry, 'id' | 'reference' | 'status' | 'createdAt'>): Inquiry {
  const db = ensureDb();
  const reference = 'AMAC-' + Math.floor(100000 + Math.random() * 900000);
  const newInquiry: Inquiry = {
    ...inquiryData,
    id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    reference,
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  db.inquiries = [newInquiry, ...(db.inquiries || [])];
  saveDb(db);
  return newInquiry;
}

export function updateDbInquiryStatus(id: string, status: 'new' | 'contacted' | 'completed'): boolean {
  const db = ensureDb();
  const item = db.inquiries.find((inq) => inq.id === id);
  if (!item) return false;
  item.status = status;
  saveDb(db);
  return true;
}

export function deleteDbInquiry(id: string): boolean {
  const db = ensureDb();
  const initialLen = db.inquiries.length;
  db.inquiries = db.inquiries.filter((inq) => inq.id !== id);
  if (db.inquiries.length !== initialLen) {
    saveDb(db);
    return true;
  }
  return false;
}

// Auth helpers
export function getAdminUser(): AdminUser {
  const db = ensureDb();
  return db.admin;
}

export function updateAdminPassword(newPasswordHash: string): boolean {
  const db = ensureDb();
  db.admin.passwordHash = newPasswordHash;
  saveDb(db);
  return true;
}
