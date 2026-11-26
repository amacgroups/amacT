import crypto from 'crypto';
import { cookies } from 'next/headers';
import { getAdminUser } from './db';

const SESSION_COOKIE_NAME = 'amac_admin_session';
const SECRET_SALT = process.env.AUTH_SECRET || 'amac-secret-salt-key-2026';

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function createSessionToken(email: string): string {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac('sha256', SECRET_SALT)
    .update(`${email}:${timestamp}`)
    .digest('hex');
  return Buffer.from(JSON.stringify({ email, timestamp, signature })).toString('base64');
}

export function verifySessionToken(token: string): boolean {
  try {
    const raw = Buffer.from(token, 'base64').toString('utf-8');
    const { email, timestamp, signature } = JSON.parse(raw);

    const expectedSignature = crypto
      .createHmac('sha256', SECRET_SALT)
      .update(`${email}:${timestamp}`)
      .digest('hex');

    if (signature !== expectedSignature) return false;

    // Token expires in 7 days
    const age = Date.now() - parseInt(timestamp, 10);
    if (age > 7 * 24 * 60 * 60 * 1000) return false;

    const admin = getAdminUser();
    return admin.email === email;
  } catch {
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export { SESSION_COOKIE_NAME };
