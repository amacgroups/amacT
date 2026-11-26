'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Truck, Award, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Background soft glow elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-emerald-200/30 via-green-100/40 to-amber-100/30 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold tracking-wide border border-emerald-200 shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>International Fresh Produce Growers & Exporters</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Finest Fresh <span className="text-emerald-600">Fruits</span> &{' '}
              <span className="text-amber-600">Vegetables</span> From Farm to Global Markets
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              <strong>AMAC Group</strong> supplies top-tier supermarkets, wholesalers, and importers worldwide with certified organic and conventional produce. Driven by strict cold-chain mastery and international agricultural standards.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all hover:-translate-y-0.5"
              >
                <span>Explore Our Produce</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#quote"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border border-slate-300 shadow-sm transition-all hover:border-slate-400"
              >
                <span>Request Wholesale Catalog</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">GlobalG.A.P. Certified</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">Cold-Chain Guaranteed</span>
              </div>
              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">Export to 35+ Nations</span>
              </div>
            </div>
          </div>

          {/* Right Visual Banner / Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
              {/* Main Banner Image */}
              <img
                src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=80"
                alt="AMAC Group Fresh Produce Farm"
                className="w-full h-[440px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

              {/* Floating Stat Card 1 */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-lg border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500">Quality Grade</div>
                  <div className="text-sm font-bold text-slate-900">Grade A+ Export</div>
                </div>
              </div>

              {/* Floating Stat Card 2 */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Active Shipments</span>
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-extrabold text-slate-900">Weekly Sea & Air Cargo</p>
                    <p className="text-xs text-slate-500">Europe, Middle East, Asia, Americas</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                      100% Tracked
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
