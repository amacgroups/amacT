'use client';

import React, { useState, useEffect } from 'react';
import { PRODUCTS as FALLBACK_PRODUCTS, Product } from '@/data/products';
import { Apple, Carrot, Calendar, Package, ArrowUpRight, X, ShieldCheck, RefreshCw } from 'lucide-react';

export default function Products() {
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [activeTab, setActiveTab] = useState<'all' | 'fruits' | 'vegetables'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Dynamically fetch latest products from the backend store
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch((err) => {
        console.warn('Using initial produce list fallback', err);
      });
  }, []);

  const filteredProducts = activeTab === 'all'
    ? products
    : products.filter((item) => item.category === activeTab);

  return (
    <section id="products" className="py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-100/70 px-3 py-1 rounded-full mb-3">
              Premium Fresh Harvest
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Our Wholesale <span className="text-emerald-600">Produce Portfolio</span>
            </h2>
            <p className="mt-2 text-slate-600 max-w-xl text-sm sm:text-base">
              Explore our export-grade seasonal and year-round fruits and vegetables, harvested at peak maturity and packed to order.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 mt-6 md:mt-0 p-1 bg-white border border-slate-200 rounded-xl shadow-sm self-start">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-emerald-600'
              }`}
            >
              All Harvests ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('fruits')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'fruits'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-emerald-600'
              }`}
            >
              <Apple className="w-4 h-4" />
              <span>Fruits</span>
            </button>
            <button
              onClick={() => setActiveTab('vegetables')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'vegetables'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-emerald-600'
              }`}
            >
              <Carrot className="w-4 h-4" />
              <span>Vegetables</span>
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col group cursor-pointer"
              onClick={() => setSelectedProduct(item)}
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-sm text-[11px] font-bold uppercase tracking-wider text-emerald-800 shadow-sm">
                  {item.category === 'fruits' ? 'Fresh Fruit' : 'Fresh Vegetable'}
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-emerald-400" />
                  <span>{item.season}</span>
                </span>
              </div>

              {/* Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-emerald-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {item.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-3">
                    <Package className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{item.packaging}</span>
                  </div>

                  <button
                    type="button"
                    className="w-full py-2 px-3 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold hover:bg-emerald-600 hover:text-white transition-colors flex items-center justify-center gap-1"
                  >
                    <span>View Specifications</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Product Specifications */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row gap-6">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full sm:w-1/2 h-56 object-cover rounded-2xl"
                />
                <div className="space-y-3 sm:w-1/2">
                  <span className="inline-block px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                    {selectedProduct.category}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900">{selectedProduct.name}</h3>
                  <p className="text-sm text-slate-600">{selectedProduct.description}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-3.5 bg-slate-50 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 block">Season / Availability</span>
                  <span className="font-bold text-slate-800">{selectedProduct.season}</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 block">Export Packaging</span>
                  <span className="font-bold text-slate-800">{selectedProduct.packaging}</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 block">Recommended Temp</span>
                  <span className="font-bold text-slate-800">{selectedProduct.specs?.temperature}</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 block">Shelf Life</span>
                  <span className="font-bold text-slate-800">{selectedProduct.specs?.shelfLife}</span>
                </div>
              </div>

              {selectedProduct.specs?.certifications && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedProduct.specs.certifications.map((cert) => (
                    <span key={cert} className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      {cert}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6 pt-4 flex gap-3">
                <a
                  href="#quote"
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 text-center py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-colors text-sm"
                >
                  Inquire For Container Order
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
