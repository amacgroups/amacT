'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/data/products';
import { Inquiry } from '@/lib/db';
import {
  Leaf,
  Package,
  Inbox,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  CheckCircle,
  Clock,
  CheckCircle2,
  X,
  Search,
  Filter,
  RefreshCw,
  Globe,
  Building,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'products' | 'inquiries'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  // Search & Filter
  const [productSearch, setProductSearch] = useState('');
  const [productCategory, setProductCategory] = useState<'all' | 'fruits' | 'vegetables'>('all');

  // Modal State for Add / Edit Product
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: 'fruits',
    tagline: '',
    season: '',
    packaging: '',
    image: '',
    description: '',
    specs: {
      origin: 'AMAC Export Farms',
      shelfLife: '30 - 60 Days',
      temperature: '+4°C',
      certifications: ['GlobalG.A.P.', 'ISO 22000'],
    },
  });

  // Fetch initial data & verify session
  const fetchData = async () => {
    setLoading(true);
    try {
      const authRes = await fetch('/api/auth/me');
      if (!authRes.ok) {
        router.push('/admin/login');
        return;
      }
      const authData = await authRes.json();
      setUser(authData.user);

      // Load products and inquiries
      const [prodRes, inqRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/inquiries'),
      ]);

      if (prodRes.ok) {
        const pData = await prodRes.json();
        setProducts(pData.products || []);
      }

      if (inqRes.ok) {
        const iData = await inqRes.json();
        setInquiries(iData.inquiries || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  // Open modal for adding
  const handleAddNew = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'fruits',
      tagline: '',
      season: 'October - May',
      packaging: '15kg Telescopic Cartons',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80',
      description: '',
      specs: {
        origin: 'AMAC Groves & Protected Lands',
        shelfLife: '45 - 60 Days',
        temperature: '+4°C to +6°C',
        certifications: ['GlobalG.A.P.', 'ISO 22000', 'BRCGS'],
      },
    });
    setModalOpen(true);
  };

  // Open modal for editing
  const handleEdit = (prod: Product) => {
    setEditingProduct(prod);
    setFormData(JSON.parse(JSON.stringify(prod)));
    setModalOpen(true);
  };

  // Submit Product Add / Edit
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    try {
      if (editingProduct) {
        // PUT update
        const res = await fetch('/api/admin/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: editingProduct.id }),
        });
        if (res.ok) {
          await fetchData();
          setModalOpen(false);
        }
      } else {
        // POST create
        const res = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          await fetchData();
          setModalOpen(false);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}" from the website?`)) return;

    try {
      const res = await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Update inquiry status
  const handleUpdateInquiryStatus = async (id: string, status: 'new' | 'contacted' | 'completed') => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setInquiries(
          inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete inquiry
  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this client inquiry?')) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setInquiries(inquiries.filter((inq) => inq.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = productCategory === 'all' || p.category === productCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.tagline.toLowerCase().includes(productSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-emerald-500" />
          <span className="font-bold">Loading AMAC Group Admin Portal...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <span className="font-black text-lg tracking-tight">AMAC GROUP</span>
                <span className="ml-2 text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded">
                  Admin Panel
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
              >
                <span>View Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="text-right hidden md:block">
                <div className="text-xs font-bold text-white">{user?.name || 'Administrator'}</div>
                <div className="text-[11px] text-slate-400">{user?.email}</div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs font-bold bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white px-3 py-1.5 rounded-lg border border-red-500/30 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase">Live Products</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{products.length}</h3>
              <p className="text-xs text-emerald-600 font-semibold mt-1">Displayed on website</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase">Fruits Varieties</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                {products.filter((p) => p.category === 'fruits').length}
              </h3>
              <p className="text-xs text-slate-500 mt-1">Export-grade</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              FR
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase">Vegetables Varieties</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                {products.filter((p) => p.category === 'vegetables').length}
              </h3>
              <p className="text-xs text-slate-500 mt-1">Export-grade</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center font-bold">
              VG
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase">Inquiries & Quotes</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{inquiries.length}</h3>
              <p className="text-xs text-emerald-600 font-semibold mt-1">
                {inquiries.filter((i) => i.status === 'new').length} New Leads
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Inbox className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 mb-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 px-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'products'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Produce Products ({products.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`pb-3 px-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-all relative ${
              activeTab === 'inquiries'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Commercial Inquiries ({inquiries.length})</span>
            {inquiries.filter((i) => i.status === 'new').length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                {inquiries.filter((i) => i.status === 'new').length}
              </span>
            )}
          </button>
        </div>

        {/* TAB 1: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search produce..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setProductCategory('all')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      productCategory === 'all'
                        ? 'bg-white text-slate-800 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setProductCategory('fruits')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      productCategory === 'fruits'
                        ? 'bg-white text-slate-800 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Fruits
                  </button>
                  <button
                    onClick={() => setProductCategory('vegetables')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      productCategory === 'vegetables'
                        ? 'bg-white text-slate-800 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Vegetables
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddNew}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Produce</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-bold text-slate-500 tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Produce</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Season</th>
                      <th className="px-6 py-4">Packaging</th>
                      <th className="px-6 py-4">Temperature</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm">
                          No produce found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                              />
                              <div>
                                <div className="font-bold text-slate-900">{p.name}</div>
                                <div className="text-xs text-slate-500 truncate max-w-xs">{p.tagline}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                                p.category === 'fruits'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {p.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-slate-700">{p.season}</td>
                          <td className="px-6 py-4 text-xs text-slate-600">{p.packaging}</td>
                          <td className="px-6 py-4 text-xs font-semibold text-slate-700">
                            {p.specs?.temperature || 'Standard'}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleEdit(p)}
                                className="p-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                                title="Edit Product"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id, p.name)}
                                className="p-2 rounded-lg text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                                title="Delete Product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INQUIRIES MANAGEMENT */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">Commercial Wholesale Inquiries</h3>
                  <p className="text-xs text-slate-500">
                    Client quotes submitted through the website RFQ form.
                  </p>
                </div>
                <span className="text-xs font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-700">
                  Total: {inquiries.length}
                </span>
              </div>

              {inquiries.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-sm">
                  No inquiries received yet.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="p-6 hover:bg-slate-50/50 transition-colors space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-900 text-base">{inq.company}</span>
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                            {inq.reference}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={inq.status}
                            onChange={(e) =>
                              handleUpdateInquiryStatus(
                                inq.id,
                                e.target.value as 'new' | 'contacted' | 'completed'
                              )
                            }
                            className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-none ${
                              inq.status === 'new'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : inq.status === 'contacted'
                                ? 'bg-blue-50 text-blue-800 border-blue-200'
                                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            }`}
                          >
                            <option value="new">● New Inquiry</option>
                            <option value="contacted">● Contacted Client</option>
                            <option value="completed">● Order Closed</option>
                          </select>

                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                        <div>
                          <span className="font-bold text-slate-700 block">Contact Person:</span>
                          <span>{inq.name} ({inq.email})</span>
                          {inq.phone && <div className="text-slate-500">{inq.phone}</div>}
                        </div>
                        <div>
                          <span className="font-bold text-slate-700 block">Produce & Volume:</span>
                          <span className="font-semibold text-emerald-700">{inq.produce}</span>
                          <div className="text-slate-500">{inq.volume}</div>
                        </div>
                        <div>
                          <span className="font-bold text-slate-700 block">Destination Port:</span>
                          <span>{inq.destinationCountry || 'Not specified'}</span>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            Received: {new Date(inq.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      {inq.message && (
                        <p className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-100 italic">
                          "{inq.message}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT PRODUCT */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-black text-slate-900 mb-6">
                {editingProduct ? `Edit Produce: ${editingProduct.name}` : 'Add New Produce to Catalog'}
              </h3>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Produce Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Navel Oranges"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value as 'fruits' | 'vegetables' })
                      }
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    >
                      <option value="fruits">Fresh Fruits</option>
                      <option value="vegetables">Fresh Vegetables</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tagline / Key Highlight</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="e.g. High brix, sweet, juicy with vibrant golden rind"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Harvest Season</label>
                    <input
                      type="text"
                      value={formData.season}
                      onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                      placeholder="e.g. November - May"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Export Packaging</label>
                    <input
                      type="text"
                      value={formData.packaging}
                      onChange={(e) => setFormData({ ...formData, packaging: e.target.value })}
                      placeholder="e.g. 15kg Telescopic Cartons"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Image URL (Unsplash or CDN)</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the produce quality, origin, sorting process..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Storage Temperature</label>
                    <input
                      type="text"
                      value={formData.specs?.temperature}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specs: { ...formData.specs!, temperature: e.target.value },
                        })
                      }
                      placeholder="+3°C to +5°C"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Shelf Life</label>
                    <input
                      type="text"
                      value={formData.specs?.shelfLife}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specs: { ...formData.specs!, shelfLife: e.target.value },
                        })
                      }
                      placeholder="60 - 90 Days"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30"
                  >
                    {editingProduct ? 'Save Changes' : 'Publish Produce'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
