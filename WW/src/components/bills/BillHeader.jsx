import React from 'react';
import { RefreshCw } from 'lucide-react';

export default function BillHeader({ onRefresh }) {
  return (
    <div className="border-b border-slate-200/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h3 className="text-lg font-extrabold text-slate-800">Billing &amp; Invoices</h3>
        <p className="text-xs text-slate-500 mt-1">
          Manage invoice histories, balance payments, client credits, and billing accounts.
        </p>
      </div>
      <button
        onClick={onRefresh}
        className="self-start sm:self-auto p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-650 hover:text-slate-800 transition-colors shadow-sm flex items-center gap-1.5 text-xs font-bold"
        title="Refresh List"
      >
        <RefreshCw className="w-4 h-4 text-sky-500" />
        <span className="sm:hidden">Refresh</span>
      </button>
    </div>
  );
}
