import React from 'react';
import { Target, Users, Sprout, Globe2, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-3">
            Who We Are
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Cultivating Excellence at <span className="text-emerald-600">AMAC Group</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            With decades of combined agricultural experience, AMAC Group bridges the gap between fertile agricultural heartlands and international consumer markets with uncompromising standards of food safety, freshness, and dependability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Sustainable Agriculture</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We employ regenerative soil management, micro-drip irrigation, and minimal pesticide treatments to preserve nature while boosting natural flavors.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Global Distribution</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Active export lines to supermarkets and food processing partners across Europe, GCC, East Asia, and the Americas with complete customs clearance support.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Strict Traceability</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every carton is serialized with lot numbers showing exact grove coordinates, harvest date, grading line, and inspection records.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Dedicated Partnership</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tailored calendar programs for supermarket contracts, private branding, custom caliber sorting, and flexible payment terms.
            </p>
          </div>
        </div>

        {/* Banner with stats */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-emerald-800 to-emerald-950 p-8 sm:p-12 text-white shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-emerald-700/50">
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-amber-400">12,000+</div>
              <div className="text-xs sm:text-sm font-medium text-emerald-100 mt-1">Cultivated Acres</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-amber-400">85,000+</div>
              <div className="text-xs sm:text-sm font-medium text-emerald-100 mt-1">Tons Exported Annually</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-amber-400">35+</div>
              <div className="text-xs sm:text-sm font-medium text-emerald-100 mt-1">Export Destinations</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-amber-400">99.4%</div>
              <div className="text-xs sm:text-sm font-medium text-emerald-100 mt-1">On-Time Arrival Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
