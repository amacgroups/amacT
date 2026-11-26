'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, Mail, MapPin, Building, Globe } from 'lucide-react';
import { PRODUCTS } from '@/data/products';

export default function QuoteSection() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    destinationCountry: '',
    produce: 'valencia-oranges',
    volume: '1-2 Containers (40ft Reefer)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fakeRef = 'AMAC-' + Math.floor(100000 + Math.random() * 900000);
    setRefNumber(fakeRef);
    setSubmitted(true);
  };

  return (
    <section id="quote" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-3">
                Direct Export Desk
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Request a Wholesale <span className="text-emerald-600">Export Quotation</span>
              </h2>
              <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                Connect directly with our export logistics specialists for spot orders, seasonal contracts, FOB, CIF, or CFR quotes tailored to your destination port.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Headquarters & Packing Station</h4>
                  <p className="text-xs text-slate-600">AMAC Group Agribusiness Complex, Industrial & Agricultural Free Zone</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Commercial Export Email</h4>
                  <p className="text-xs text-slate-600">export@amacgroup.com / sales@amacgroup.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Direct Phone & WhatsApp</h4>
                  <p className="text-xs text-slate-600">+1 (800) 555-AMAC / +20 100 000 0000</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Global Reefer Ports Served</h4>
                  <p className="text-xs text-slate-600">Rotterdam, Hamburg, Felixstowe, Jebel Ali, Singapore, New York</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right form column */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Quotation Request Received!</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Thank you for contacting AMAC Group. Your inquiry reference is <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">{refNumber}</span>. Our export trading manager will reply within 24 business hours with current FOB/CIF rates.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        destinationCountry: '',
                        produce: 'valencia-oranges',
                        volume: '1-2 Containers (40ft Reefer)',
                        message: '',
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Company / Importer Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Global Foods Trading Ltd"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Business Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="procurement@company.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp</label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+44 20 7946 0991"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Produce Required *</label>
                      <select
                        value={formData.produce}
                        onChange={(e) => setFormData({ ...formData, produce: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-sm"
                      >
                        {PRODUCTS.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({p.category.toUpperCase()})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Order Volume</label>
                      <select
                        value={formData.volume}
                        onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-sm"
                      >
                        <option>Trial Shipment (1 Container - 40ft Reefer)</option>
                        <option>2 - 5 Containers / Month</option>
                        <option>Full Seasonal Contract (10+ Containers)</option>
                        <option>Air Freight Pallet Order (Urgent Delivery)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Destination Country / Seaport</label>
                    <input
                      type="text"
                      value={formData.destinationCountry}
                      onChange={(e) => setFormData({ ...formData, destinationCountry: e.target.value })}
                      placeholder="e.g. Rotterdam Port, Netherlands or Jebel Ali, UAE"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Special Packaging or Specifications</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mention caliber sizes, custom carton requirements, target arrival window, or required certifications..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Commercial Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
