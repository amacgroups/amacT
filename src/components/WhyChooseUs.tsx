import React from 'react';
import { Shield, ThermometerSnowflake, Boxes, FileCheck2, Award, Zap } from 'lucide-react';

export default function WhyChooseUs() {
  const advantages = [
    {
      icon: ThermometerSnowflake,
      title: 'Unbroken Cold Chain',
      desc: 'Hydro-cooling within 90 minutes of harvest, pre-cooling chambers, and continuous reefer container temperature telemetry.',
    },
    {
      icon: Award,
      title: 'Global Certifications',
      desc: 'Fully compliant with GlobalG.A.P., BRCGS Food Safety, ISO 22000, and SMETA social audit benchmarks.',
    },
    {
      icon: Boxes,
      title: 'Tailored Packaging',
      desc: 'Loose bulk cartons, private supermarket brands, punnets, clamshells, micro-perforated flowpack, and modified atmosphere packaging (MAP).',
    },
    {
      icon: FileCheck2,
      title: 'Full Export Clearance',
      desc: 'Phytosanitary inspection, Certificate of Origin (EUR.1 / COMESA), Bill of Lading, and rapid customs documentation.',
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-3">
            Why Partner With AMAC Group
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Setting the Benchmark for <span className="text-emerald-600">Fresh Produce Export</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Importers and retail chains rely on our precision quality controls, farm-to-shelf traceability, and uncompromised supply continuity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/90 hover:border-emerald-500 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-5 shadow-md shadow-emerald-600/30">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Global Standards Banner */}
        <div className="mt-16 bg-slate-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <h3 className="text-2xl font-black text-white">Adherence to Stringent MRL Regulations</h3>
            <p className="text-slate-300 text-sm mt-2">
              Every single batch undergoes multi-residue pesticide screenings (MRL) at accredited ISO 17025 laboratories to exceed EU, UK, and North American consumer safety guidelines.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-emerald-400">
              ✓ GLOBALG.A.P. IFA
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-emerald-400">
              ✓ BRCGS FOOD SAFETY
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-emerald-400">
              ✓ ISO 22000 : 2018
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
