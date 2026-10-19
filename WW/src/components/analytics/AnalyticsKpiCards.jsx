import React from 'react';
import { TrendingUp, Users, DollarSign, Award, Clock, AlertCircle, Layers, BarChart2 } from 'lucide-react';

export default function AnalyticsKpiCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
      {/* Card 1: Total Leads */}
      <div className="bg-gradient-to-br from-white to-slate-50/50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Total Inquiries</span>
          <span className="text-2xl font-black text-slate-800 mt-1 block">{stats.total}</span>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> All-time received
          </span>
        </div>
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-600 shrink-0">
          <Users className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>

      {/* Card 2: New / Action Required */}
      <div className="bg-gradient-to-br from-white to-amber-50/30 p-4 sm:p-5 rounded-2xl border border-amber-200/60 shadow-sm flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-mono font-bold text-amber-600 uppercase tracking-widest block">New / Pending</span>
          <span className="text-2xl font-black text-slate-800 mt-1 block">{stats.newCount}</span>
          <span className="text-[11px] text-amber-700 font-semibold flex items-center gap-1 mt-1">
            <Clock className="w-3 h-3" /> Requires follow-up
          </span>
        </div>
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
          <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>

      {/* Card 3: Top Product Category */}
      <div className="bg-gradient-to-br from-white to-purple-50/30 p-4 sm:p-5 rounded-2xl border border-purple-200/60 shadow-sm flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[10px] font-mono font-bold text-purple-600 uppercase tracking-widest block">Top Interest</span>
          <span className="text-base sm:text-lg font-black text-slate-800 mt-1 block truncate" title={stats.topCategory}>{stats.topCategory}</span>
          <span className="text-[11px] text-purple-700 font-semibold flex items-center gap-1 mt-1">
            <Award className="w-3 h-3 shrink-0" /> Most requested
          </span>
        </div>
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 shrink-0">
          <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>

      {/* Card 4: Pipeline Value */}
      <div className="bg-gradient-to-br from-white to-emerald-50/30 p-4 sm:p-5 rounded-2xl border border-emerald-200/60 shadow-sm flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest block">Pipeline Est. Value</span>
          <span className="text-xl font-black text-slate-800 mt-1 block">PKR {(stats.estimatedValue / 1000).toFixed(0)}k</span>
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
            <DollarSign className="w-3 h-3" /> @ 85k avg project
          </span>
        </div>
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
          <BarChart2 className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>
    </div>
  );
}
