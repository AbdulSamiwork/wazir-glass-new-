import React from 'react';
import { Calendar, CreditCard, CheckCheck, Eye, Trash2 } from 'lucide-react';

function getStatusBadge(status) {
  switch ((status || '').toLowerCase()) {
    case 'completed':
    case 'paid':
      return (
        <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 text-[10px] font-bold uppercase tracking-wider">
          ✓ 4. Completed / Paid
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
    case 'fabrication':
    case 'in_progress':
    case 'processing':
      return (
        <span className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-bold uppercase tracking-wider">
          🛠️ 2. Fabrication
        </span>
      );
    case 'confirmed':
    case 'accepted':
      return (
        <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
          ✓ 1. Confirmed
        </span>
      );
    case 'advanced':
      return (
        <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold uppercase tracking-wider">
          ↑ Advanced / Partial
        </span>
      );
    case 'pending':
    default:
      return (
        <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold uppercase tracking-wider">
          ⏳ Pending
        </span>
      );
  }
}

export default function BillListItem({
  b,
  fmt,
  handleUpdateStatus,
  setPaymentUpdateBill,
  handleMarkAsPaid,
  setSelectedBill,
  setShowPreview,
  handleDelete
}) {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 flex flex-col lg:flex-row justify-between lg:items-center gap-3.5 sm:gap-4 hover:border-slate-300 transition-colors shadow-sm text-left">
      <div className="flex flex-col gap-1.5 sm:gap-2 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono font-bold text-slate-400">{b.billNumber}</span>
          {getStatusBadge(b.status)}
        </div>
        <h4 className="text-base font-extrabold text-slate-800 truncate">{b.customerName}</h4>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-500 mt-0.5">
          <span className="flex items-center gap-1.5 font-mono text-slate-600">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {new Date(b.date).toLocaleDateString('en-GB')}
          </span>
          <span className="font-mono text-slate-600 font-semibold">{b.customerPhone}</span>
        </div>
      </div>

      {/* Payment breakdown */}
      <div className="grid grid-cols-3 sm:flex items-stretch gap-1.5 sm:gap-3 text-xs font-mono w-full lg:w-auto">
        <div className="flex flex-col gap-0.5 text-center bg-slate-50 px-2 sm:px-3 py-2 rounded-xl border border-slate-100 min-w-0 sm:min-w-[90px]">
          <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-slate-400">Total</span>
          <span className="font-bold text-slate-700 text-[10px] sm:text-xs truncate">PKR {fmt(b.total)}</span>
        </div>
        <div className="flex flex-col gap-0.5 text-center bg-emerald-50 px-2 sm:px-3 py-2 rounded-xl border border-emerald-100 min-w-0 sm:min-w-[90px]">
          <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-emerald-500">Received</span>
          <span className="font-bold text-emerald-700 text-[10px] sm:text-xs truncate">PKR {fmt(b.amountReceived)}</span>
        </div>
        <div className="flex flex-col gap-0.5 text-center bg-red-50 px-2 sm:px-3 py-2 rounded-xl border border-red-100 min-w-0 sm:min-w-[90px]">
          <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-red-400">Remaining</span>
          <span className="font-black text-red-600 text-[10px] sm:text-xs truncate">PKR {fmt(b.remainingAmount)}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2.5 lg:pt-0 border-t lg:border-t-0 border-slate-100 w-full lg:w-auto shrink-0">
        <select
          value={(b.status || 'pending').toLowerCase()}
          onChange={(e) => handleUpdateStatus(b.id, e.target.value)}
          className="w-full sm:w-auto px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer shadow-sm transition-all min-h-[40px]"
          title="Update Work Tracking Stage for Customer Portal"
        >
          <option value="pending">⏳ Pending</option>
          <option value="confirmed">✅ 1. Confirmed</option>
          <option value="fabrication">🛠️ 2. Fabrication</option>
          <option value="installation">🚚 3. Installation</option>
          <option value="completed">🌟 4. Completed / Paid</option>
        </select>

        <div className="flex items-center justify-end gap-1.5 w-full sm:w-auto">
          {b.status !== 'paid' && b.status !== 'completed' && (
            <>
              <button
                onClick={() => setPaymentUpdateBill(b)}
                className="flex-1 sm:flex-initial p-2.5 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-600 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="Add Collection Payment"
              >
                <CreditCard className="w-4 h-4" />
                <span className="sm:hidden text-xs font-bold ml-1">Pay</span>
              </button>
              <button
                onClick={() => handleMarkAsPaid(b.id, b.total)}
                className="flex-1 sm:flex-initial p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-600 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="Mark as Fully Paid"
              >
                <CheckCheck className="w-4 h-4" />
                <span className="sm:hidden text-xs font-bold ml-1">Settle</span>
              </button>
            </>
          )}
          <button
            onClick={() => {
              setSelectedBill(b);
              setShowPreview(true);
            }}
            className="flex-1 sm:flex-initial p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-650 hover:text-slate-800 transition-colors shadow-sm min-h-[40px] min-w-[40px] flex items-center justify-center"
            title="View & Print Preview"
          >
            <Eye className="w-4 h-4" />
            <span className="sm:hidden text-xs font-bold ml-1">View</span>
          </button>
          <button
            onClick={() => handleDelete(b.id)}
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
