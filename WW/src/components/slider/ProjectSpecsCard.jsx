import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function ProjectSpecsCard({ currentProject }) {
  return (
    <div className="lg:col-span-4 flex flex-col justify-between h-full py-2">
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-5 sm:p-8 shadow-xl">
        <span className="text-xs font-bold text-sky-400 uppercase tracking-widest font-mono">
          {currentProject.category}
        </span>
        <h3 className="text-2xl font-bold font-heading mt-1 mb-6 text-white">
          {currentProject.title}
        </h3>

        <div className="space-y-4 mb-8">
          <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider font-mono">
            Engineered Specifications:
          </h4>
          {currentProject.specs?.map((spec, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-slate-200">
              <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <span className="font-medium">{spec}</span>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 mb-8">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block font-mono mb-1">
            Proven Architectural Impact
          </span>
          <p className="text-sm font-extrabold text-white">
            {currentProject.impact}
          </p>
        </div>

        <a
          href="#contact"
          className="w-full min-h-[48px] py-3.5 sm:py-4 px-4 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98] text-center"
        >
          <span className="whitespace-nowrap">Upgrade Your Property</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </a>
      </div>
    </div>
  );
}
