import React from 'react';
import { Sun, ScanEye, Snowflake, Ship, CheckCircle } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      step: '01',
      title: 'Precision Harvest',
      desc: 'Hand-picked during cool morning hours at exact brix/sugar index and color uniformity.',
      icon: Sun,
    },
    {
      step: '02',
      title: 'Automated Sorting',
      desc: 'High-speed optical grading lines calibrate size, weight, caliber, and surface defects.',
      icon: ScanEye,
    },
    {
      step: '03',
      title: 'Pre-Cooling & Pack',
      desc: 'Rapid forced-air and hydro-cooling down to core target temperature, packed in sanitized rooms.',
      icon: Snowflake,
    },
    {
      step: '04',
      title: 'Global Reefer Transit',
      desc: 'Loaded directly into controlled-atmosphere reefer containers destined for international seaports and airports.',
      icon: Ship,
    },
  ];

  return (
    <section id="process" className="py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-100/70 px-3 py-1 rounded-full mb-3">
            From Field to Shelf
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Our 4-Stage <span className="text-emerald-600">Export Journey</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            How AMAC Group guarantees freshness, crunch, and vitality across thousands of maritime miles.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-emerald-600/30">{item.step}</span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Quality Verified</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
