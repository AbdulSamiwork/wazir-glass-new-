import React from 'react';
import { TrendingUp, CheckCircle2, ArrowRightLeft, Clock } from 'lucide-react';

export default function QuotationSummaryCards({ summary, allQuotationsCount, fmt }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
      {/* Total Estimate Value */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-sm flex flex-col gap-1.5 sm:gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Total Value
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
            <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
          </div>
        </div>
        <p className="text-sm sm:text-base lg:text-lg font-black text-slate-800 font-mono leading-tight truncate">
          PKR {fmt(summary.totalEstimateValue)}
        </p>
        <p className="text-[10px] text-slate-400">{allQuotationsCount} total quote(s)</p>
      </div>

      {/* Accepted */}
      <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-3.5 sm:p-4 shadow-sm flex flex-col gap-1.5 sm:gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-emerald-600">
            Accepted
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
          </div>
        </div>
        <p className="text-2xl sm:text-3xl font-black text-emerald-700">{summary.acceptedCount}</p>
        <p className="text-[10px] text-emerald-600">ready to convert</p>
      </div>

      {/* Converted to Bill */}
      <div className="bg-purple-50 rounded-2xl border border-purple-200 p-3.5 sm:p-4 shadow-sm flex flex-col gap-1.5 sm:gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-purple-600">
            Converted
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
            <ArrowRightLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
          </div>
        </div>
        <p className="text-2xl sm:text-3xl font-black text-purple-700">{summary.convertedCount}</p>
        <p className="text-[10px] text-purple-500">billed to invoice</p>
      </div>

      {/* Pending */}
      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-3.5 sm:p-4 shadow-sm flex flex-col gap-1.5 sm:gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-amber-600">
            Pending
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
          </div>
        </div>
        <p className="text-2xl sm:text-3xl font-black text-amber-700">{summary.pendingCount}</p>
        <p className="text-[10px] text-amber-600">{summary.rejectedCount} rejected</p>
      </div>
    </div>
  );
}
