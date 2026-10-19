import React from 'react';
import { Download, RefreshCw } from 'lucide-react';

export default function AnalyticsHeader({ onRefresh, onExport }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-850 tracking-tight">
            Analytics &amp; Lead Management
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-600 border border-sky-100/80 text-[10px] font-mono font-bold uppercase tracking-wider shrink-0 whitespace-nowrap">
            Live CRM
          </span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Real-time pipeline analytics, customer inquiry tracking, and automated conversion workflows.
        </p>
      </div>

      <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-start">
        <button
          onClick={onRefresh}
          className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-650 hover:text-slate-800 transition-all shadow-sm flex items-center justify-center gap-1.5 text-xs font-bold shrink-0 min-h-[42px]"
          title="Refresh CRM Data"
        >
          <RefreshCw className="w-4 h-4 text-sky-500" />
          <span className="hidden sm:inline">Sync Data</span>
        </button>

        <button
          onClick={onExport}
          className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-600 hover:emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/15 active:scale-[0.98] min-h-[42px]"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV / Excel</span>
        </button>
      </div>
    </div>
  );
}
