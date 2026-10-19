import React from 'react';

export default function QuotationFilterPills({ statusFilter, setStatusFilter, allQuotationsCount, summary }) {
  const filterOptions = [
    {
      key: 'all',
      label: `All  (${allQuotationsCount})`,
      cls:
        statusFilter === 'all'
          ? 'bg-slate-800 text-white border-slate-800'
          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
    },
    {
      key: 'pending',
      label: `⏳ Pending  (${summary.pendingCount})`,
      cls:
        statusFilter === 'pending'
          ? 'bg-amber-500 text-white border-amber-500'
          : 'bg-white text-amber-700 border-amber-200 hover:border-amber-400'
    },
    {
      key: 'accepted',
      label: `✓ Accepted  (${summary.acceptedCount})`,
      cls:
        statusFilter === 'accepted'
          ? 'bg-emerald-600 text-white border-emerald-600'
          : 'bg-white text-emerald-700 border-emerald-200 hover:border-emerald-400'
    },
    {
      key: 'converted',
      label: `⇄ Converted  (${summary.convertedCount})`,
      cls:
        statusFilter === 'converted'
          ? 'bg-purple-600 text-white border-purple-600'
          : 'bg-white text-purple-700 border-purple-200 hover:border-purple-400'
    },
    {
      key: 'rejected',
      label: `✗ Rejected  (${summary.rejectedCount})`,
      cls:
        statusFilter === 'rejected'
          ? 'bg-red-500 text-white border-red-500'
          : 'bg-white text-red-700 border-red-200 hover:border-red-400'
    }
  ];

  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2">
      {filterOptions.map(({ key, label, cls }) => (
        <button
          key={key}
          onClick={() => setStatusFilter(key)}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${cls}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
