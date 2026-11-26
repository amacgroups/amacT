'use client';

import React, { useState } from 'react';
import { Leaf, Menu, X, PhoneCall, Globe, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Leaf className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900">AMAC</span>
                <span className="text-2xl font-extrabold text-emerald-600 tracking-tight">GROUP</span>
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700/80 -mt-1">
                Fresh Fruits & Vegetables
              </p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">
              About Us
            </a>
            <a href="#products" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">
              Our Produce
            </a>
            <a href="#why-us" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">
              Quality & Standards
            </a>
            <a href="#process" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">
              Export Process
            </a>
            <a href="#quote" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">
              Inquire
            </a>
          </nav>

          {/* Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 border border-slate-200 px-3 py-1.5 rounded-full">
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>Worldwide Shipping</span>
            </div>
            <a
              href="#quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 transition-all hover:-translate-y-0.5"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Request Quote</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-emerald-50"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg"
          >
            About Us
          </a>
          <a
            href="#products"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg"
          >
            Our Produce
          </a>
          <a
            href="#why-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg"
          >
            Quality & Standards
          </a>
          <a
            href="#process"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg"
          >
            Export Process
          </a>
          <a
            href="#quote"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full mt-4 px-4 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-md"
          >
            <span>Request a Wholesale Quote</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
}
