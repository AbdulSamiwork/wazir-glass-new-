import React from 'react';
import { TrendingUp, BadgeCheck, Wallet, Clock } from 'lucide-react';

export default function BillSummaryCards({ summary, totalCount, fmt }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
      {/* Total Revenue */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-sm flex flex-col gap-1.5 sm:gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Total Revenue
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
            <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
          </div>
        </div>
        <p className="text-sm sm:text-base lg:text-lg font-black text-slate-800 font-mono truncate">
          PKR {fmt(summary.totalRevenue)}
        </p>
        <p className="text-[10px] text-slate-400">{totalCount} total invoice(s)</p>
      </div>

      {/* Collected / Advanced */}
      <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-3.5 sm:p-4 shadow-sm flex flex-col gap-1.5 sm:gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-emerald-600">
            Collected
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
            <BadgeCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
          </div>
        </div>
        <p className="text-sm sm:text-base lg:text-lg font-black text-emerald-700 font-mono truncate">
          PKR {fmt(summary.totalCollected)}
        </p>
        <p className="text-[10px] text-emerald-600 truncate">
          {summary.paidCount} paid · {summary.advancedCount} adv.
        </p>
      </div>

      {/* Remaining / Outstanding */}
      <div className="bg-red-50 rounded-2xl border border-red-200 p-3.5 sm:p-4 shadow-sm flex flex-col gap-1.5 sm:gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-red-600">
            Remaining
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
            <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600" />
          </div>
        </div>
        <p className="text-sm sm:text-base lg:text-lg font-black text-red-700 font-mono truncate">
          PKR {fmt(summary.totalRemaining)}
        </p>
        <p className="text-[10px] text-red-500">Outstanding balance</p>
      </div>

      {/* Not Paid / Pending */}
      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-3.5 sm:p-4 shadow-sm flex flex-col gap-1.5 sm:gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-amber-600">
            Not Paid
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
          </div>
        </div>
        <p className="text-2xl sm:text-3xl font-black text-amber-700">{summary.pendingCount}</p>
        <p className="text-[10px] text-amber-600">pending invoice(s)</p>
      </div>
    </div>
  );
}
