import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export default function HeroMetrics({
  completedProjectsVal = "500+",
  completedProjectsLabel = "Completed Projects",
  experienceVal = "10+ Years",
  experienceLabel = "Experience",
  qualityVal = "100%",
  qualityLabel = "Quality Assurance"
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="hero-metrics grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-10 pt-8 border-t border-slate-200/80 w-full"
    >
      <div className="flex flex-col bg-white/60 p-3.5 rounded-2xl border border-slate-100 shadow-sm backdrop-blur-sm">
        <span className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
          {completedProjectsVal}
        </span>
        <span className="text-[11px] text-slate-500 font-bold tracking-wider uppercase mt-1">
          {completedProjectsLabel}
        </span>
      </div>
      <div className="flex flex-col bg-white/60 p-3.5 rounded-2xl border border-slate-100 shadow-sm backdrop-blur-sm">
        <span className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
          {experienceVal}
        </span>
        <span className="text-[11px] text-slate-500 font-bold tracking-wider uppercase mt-1">
          {experienceLabel}
        </span>
      </div>
      <div className="flex flex-col col-span-2 md:col-span-1 bg-white/60 p-3.5 rounded-2xl border border-slate-100 shadow-sm backdrop-blur-sm">
        <span className="text-2xl sm:text-3xl font-black text-slate-900 font-heading flex items-center gap-1">
          {qualityVal}
          <ShieldCheck className="w-6 h-6 text-emerald-500 inline" />
        </span>
        <span className="text-[11px] text-slate-500 font-bold tracking-wider uppercase mt-1">
          {qualityLabel}
        </span>
      </div>
    </motion.div>
  );
}
