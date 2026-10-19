import React from 'react';
import { Calendar, FileText, Eye, Trash2 } from 'lucide-react';

function getStatusBadge(status) {
  switch ((status || '').toLowerCase()) {
    case 'accepted':
    case 'confirmed':
      return (
        <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
          ✓ 1. Confirmed
        </span>
      );
    case 'fabrication':
    case 'in_progress':
    case 'processing':
      return (
        <span className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-bold uppercase tracking-wider">
          🛠️ 2. Fabrication
        </span>
      );
    case 'installation':
    case 'ready':
    case 'shipped':
      return (
        <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold uppercase tracking-wider">
          🚚 3. Installation
        </span>
      );
    case 'completed':
    case 'delivered':
    case 'paid':
      return (
        <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 text-[10px] font-bold uppercase tracking-wider">
          🌟 4. Completed
        </span>
      );
    case 'rejected':
      return (
        <span className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200 text-[10px] font-bold uppercase tracking-wider">
          ✗ Rejected
        </span>
      );
    case 'converted':
      return (
        <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold uppercase tracking-wider">
          ⇄ Converted to Bill
        </span>
      );
    case 'pending':
    default:
      return (
        <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold uppercase tracking-wider">
          ⏳ Pending Review
        </span>
      );
  }
}

export default function QuotationListItem({
  q,
  fmt,
  handleUpdateStatus,
  onConvertToBill,
  setSelectedQuotation,
  setShowPreview,
  handleDelete
}) {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 flex flex-col lg:flex-row justify-between lg:items-center gap-3.5 sm:gap-4 hover:border-slate-300 transition-colors shadow-sm text-left">
      {/* Left: info */}
      <div className="flex flex-col gap-1.5 sm:gap-2 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono font-bold text-slate-400">{q.quotationNumber}</span>
          {getStatusBadge(q.status)}
        </div>
        <h4 className="text-base font-extrabold text-slate-800 truncate">{q.customerName}</h4>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5 font-mono text-slate-600">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {new Date(q.date).toLocaleDateString('en-GB')}
          </span>
          <span className="font-mono text-slate-600 font-semibold">{q.customerPhone}</span>
        </div>
      </div>

      {/* Center: estimate value */}
      <div className="flex flex-row lg:flex-col items-center justify-between lg:justify-center bg-sky-50 border border-sky-100 rounded-xl px-4 py-2.5 sm:px-5 sm:py-3 shrink-0">
        <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-sky-500 lg:mb-0.5">
          Estimate Value
        </span>
        <span className="font-black text-sky-700 font-mono text-sm sm:text-base">PKR {fmt(q.total)}</span>
      </div>

      {/* Right: actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2.5 lg:pt-0 border-t lg:border-t-0 border-slate-100 shrink-0">
        {/* Live Customer Tracking Stage Selector */}
        <select
          value={(q.status || 'pending').toLowerCase()}
          onChange={(e) => handleUpdateStatus(q.id, e.target.value)}
          className="w-full sm:w-auto px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer shadow-sm transition-all min-h-[40px]"
          title="Update Work Tracking Stage for Customer Portal"
        >
          <option value="pending">⏳ Pending Review</option>
          <option value="confirmed">✅ 1. Confirmed / Accepted</option>
          <option value="fabrication">🛠️ 2. Workshop Fabrication</option>
          <option value="installation">🚚 3. Out for Installation</option>
          <option value="completed">🌟 4. Project Completed</option>
          <option value="rejected">❌ Cancelled / Rejected</option>
        </select>

        <div className="flex items-center justify-end gap-1.5 w-full sm:w-auto">
          {(q.status === 'accepted' || q.status === 'confirmed') && (
            <button
              onClick={() => onConvertToBill(q)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 border border-purple-200 hover:bg-purple-100 text-purple-700 text-[11px] font-bold uppercase tracking-wider transition-colors min-h-[40px]"
              title="Convert to Official Bill"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Bill</span>
            </button>
          )}

          <button
            onClick={() => {
              setSelectedQuotation(q);
              setShowPreview(true);
            }}
            className="flex-1 sm:flex-initial p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-650 hover:text-slate-800 transition-colors shadow-sm min-h-[40px] min-w-[40px] flex items-center justify-center"
            title="View & Print Preview"
          >
            <Eye className="w-4 h-4" />
            <span className="sm:hidden text-xs font-bold ml-1">View</span>
          </button>

          <button
            onClick={() => handleDelete(q.id)}
            className="p-2.5 rounded-xl border border-slate-200 hover:border-red-200 hover:bg-red-50 text-red-500 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center shrink-0"
            title="Delete Record"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
