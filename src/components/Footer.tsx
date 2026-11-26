import React from 'react';
import { Leaf, Mail, Phone, MapPin, Globe, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Leaf className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black text-white tracking-tight">AMAC</span>
                <span className="text-2xl font-extrabold text-emerald-500 tracking-tight">GROUP</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              AMAC Group is a premier international agricultural company specializing in the sustainable cultivation, grading, packaging, and cold-chain export of fresh fruits and vegetables worldwide.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-medium">GlobalG.A.P.</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-medium">ISO 22000</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-medium">BRCGS Food</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-emerald-400 transition-colors">About AMAC</a></li>
              <li><a href="#products" className="hover:text-emerald-400 transition-colors">Fresh Harvest</a></li>
              <li><a href="#why-us" className="hover:text-emerald-400 transition-colors">Quality Assurance</a></li>
              <li><a href="#process" className="hover:text-emerald-400 transition-colors">Export Process</a></li>
            </ul>
          </div>

          {/* Harvest Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Our Produce</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#products" className="hover:text-emerald-400 transition-colors">Valencia & Navel Oranges</a></li>
              <li><a href="#products" className="hover:text-emerald-400 transition-colors">Fresh Strawberries</a></li>
              <li><a href="#products" className="hover:text-emerald-400 transition-colors">Table Grapes</a></li>
              <li><a href="#products" className="hover:text-emerald-400 transition-colors">Golden & Red Onions</a></li>
              <li><a href="#products" className="hover:text-emerald-400 transition-colors">Export Grade Potatoes</a></li>
            </ul>
          </div>

          {/* Contact & Admin */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Contact Desk</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>export@amacgroup.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>+1 (800) 555-AMAC</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Agri-Export Zone, Hub Terminal</span>
              </li>
              <li className="pt-2">
                <a
                  href="/admin/login"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-emerald-950 text-slate-400 hover:text-emerald-400 border border-slate-800 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AMAC Group. All rights reserved. Vegetables and Fruits Export Enterprise.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Supply</a>
            <a href="/admin/login" className="hover:text-emerald-400 text-slate-400">Admin Login</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
