import React from 'react';
import Logo from '../Logo';

export default function BillDocumentBody({
  bill,
  formattedDate,
  discountAmount,
  taxAmount,
  amountReceived,
  companyContact
}) {
  const contact = companyContact || bill.companyContact || {};
  const companyName = contact.companyName || 'Wazir Glass & Aluminium Centre';
  const companyAddress = contact.address || 'Akbar Market Ferozpur Road, Kalma Chowk 2L-A, Gulberg-III, Lahore-Pakistan';
  const companyPhone = contact.phone || contact.phoneCall || '0321-8457556';

  const customerName = bill.customerName || 'Valued Customer';
  const customerAddress = bill.customerAddress || bill.address || bill.location || '';
  const customerPhone = bill.customerPhone || bill.phone || '';

  return (
    <div
      id="bill-content"
      className="bg-white p-3.5 sm:p-10 text-slate-900 leading-normal w-full max-w-[800px] min-h-auto sm:min-h-[1080px] mx-auto flex flex-col justify-between shadow-2xs"
    >
      {/* Top and Middle Content Section */}
      <div className="w-full flex-1 flex flex-col">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6 border-b-2 border-sky-600 pb-4 sm:pb-5">
          <div className="flex items-center gap-3">
            <div 
              style={{ width: '44px', height: '44px', minWidth: '44px', minHeight: '44px' }}
              className="w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] rounded-xl shadow-sm shrink-0 select-none overflow-hidden block"
            >
              <svg
                viewBox="0 0 100 100"
                width="44"
                height="44"
                className="w-full h-full block"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="wazirDocLogoBill" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <rect width="100" height="100" rx="24" fill="url(#wazirDocLogoBill)" />
                <path
                  d="M 20 26 L 31 74 L 40.5 74 L 50 49 L 59.5 74 L 69 74 L 80 26 L 69.5 26 L 62.5 56.5 L 54.5 35 L 45.5 35 L 37.5 56.5 L 30.5 26 Z"
                  fill="#ffffff"
                />
              </svg>
            </div>
            <div className="text-left">
              <h1 className="text-sky-700 text-base sm:text-2xl font-black tracking-tight leading-tight">
                {companyName}
              </h1>
              <p className="text-[10px] sm:text-[11px] text-slate-500 tracking-widest uppercase font-bold mt-0.5">
                Renovate. Repair. Restore.
              </p>
            </div>
          </div>
          <div className="flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-start gap-1 border-t sm:border-t-0 border-slate-100 pt-2 sm:pt-0">
            <div className="text-xl sm:text-3xl font-black text-slate-900 tracking-wider uppercase font-heading leading-none">
              INVOICE
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest sm:mt-1">
              Official Tax Bill
            </p>
          </div>
        </header>

        {/* Parties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 mb-5 sm:mb-6 text-xs print-party-grid">
          <div className="bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-200/80">
            <h3 className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1.5 sm:mb-2">Bill To:</h3>
            <p className="font-extrabold text-sm text-slate-900">{customerName}</p>
            {customerAddress && <p className="text-slate-600 mt-1">{customerAddress}</p>}
            <p className="text-slate-600 font-mono mt-1 font-medium">{customerPhone}</p>
          </div>

          <div className="bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-200/80 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1.5 sm:mb-2">Bill From:</h3>
              <p className="font-extrabold text-slate-900">{companyName}</p>
              <p className="text-slate-600 mt-0.5">{companyAddress}</p>
              <p className="text-slate-600 font-mono">{companyPhone}</p>
            </div>
            <div className="border-t border-slate-200 pt-2.5 mt-2.5 flex flex-col gap-1 font-mono text-[11px]">
              <div className="flex justify-between items-center gap-2">
                <span className="text-slate-500 whitespace-nowrap">Invoice No:</span>
                <span className="font-bold text-sky-700 font-mono truncate">{bill.billNumber}</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-slate-500 whitespace-nowrap">Date:</span>
                <span className="font-bold text-slate-800 font-mono">{formattedDate}</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-slate-500 whitespace-nowrap">Status:</span>
                <span className={`font-bold uppercase ${bill.status === 'paid' ? 'text-emerald-600' : 'text-amber-600'}`}>{bill.status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-5 sm:mb-6 overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
          <table className="w-full text-xs min-w-[500px] sm:min-w-0">
            <thead>
              <tr className="bg-sky-600 text-white font-bold uppercase tracking-wider text-[10px] sm:text-[11px]">
                <th className="py-2.5 px-3 text-left w-[7%]">Sr.</th>
                <th className="py-2.5 px-3 text-left w-[43%]">Description</th>
                <th className="py-2.5 px-3 text-center w-[12%]">Qty</th>
                <th className="py-2.5 px-3 text-center w-[10%]">Unit</th>
                <th className="py-2.5 px-3 text-right w-[14%] font-mono">Rate (PKR)</th>
                <th className="py-2.5 px-3 text-right w-[14%] font-mono">Amount (PKR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {bill.items?.map((item, idx) => (
                <tr key={item.id || idx} className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 text-slate-500">{idx + 1}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800 whitespace-normal text-left">{item.description}</td>
                  <td className="py-2.5 px-3 text-center font-mono">{parseFloat(item.quantity).toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-center uppercase font-medium">{item.unit}</td>
                  <td className="py-2.5 px-3 text-right font-mono">{parseFloat(item.rate).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  <td className="py-2.5 px-3 text-right font-bold font-mono text-slate-900">{parseFloat(item.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notes & Totals */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-6 border-t border-slate-200 pt-5 mb-auto print-notes-grid">
          <div className="sm:col-span-3 text-left">
            {bill.notes && (
              <div className="bg-slate-50/80 p-3 sm:p-4 rounded-xl border border-slate-200/80">
                <h4 className="font-bold text-slate-700 mb-1 uppercase tracking-wide text-[10px]">Notes &amp; Conditions:</h4>
                <p className="text-[11px] text-slate-600 whitespace-pre-wrap leading-relaxed">{bill.notes}</p>
              </div>
            )}
          </div>
          <div className="sm:col-span-2 flex flex-col gap-2 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Subtotal:</span>
              <span className="font-semibold text-slate-800">PKR {parseFloat(bill.subtotal).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-100 text-emerald-600">
                <span>Discount ({parseFloat(bill.discount).toFixed(2)}%):</span>
                <span className="font-semibold">- PKR {discountAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            {taxAmount > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Tax ({parseFloat(bill.taxRate).toFixed(2)}%):</span>
                <span className="font-semibold">PKR {taxAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Total Bill:</span>
              <span className="font-bold text-slate-900">PKR {parseFloat(bill.total).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 text-emerald-600">
              <span>Advance Paid:</span>
              <span className="font-bold">PKR {amountReceived.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center py-2.5 px-3.5 mt-1 bg-amber-50 rounded-xl border border-amber-200/80 text-amber-900 gap-2">
              <span className="font-bold uppercase tracking-wider text-xs whitespace-nowrap">Remaining Balance</span>
              <span className="font-black text-sm sm:text-base font-mono whitespace-nowrap text-right">PKR {parseFloat(bill.remainingAmount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Signature & Legal Footer Section */}
      <div className="w-full pt-8 sm:pt-10 mt-6 border-t border-slate-100">
        <div className="flex justify-between items-end gap-3 mb-6 sm:mb-8">
          <div className="text-left">
            <p className="text-xs text-slate-500 italic mb-6 sm:mb-8">Very truly yours,</p>
            <div className="border-t border-slate-400 w-44 sm:w-56 pt-2">
              <p className="font-bold text-xs text-slate-800">For Wazir Glass &amp; Aluminium</p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">Authorised Signature</p>
            </div>
          </div>
          <div className="text-right text-[10px] font-mono text-slate-400 shrink-0">
            <p>Official Tax Invoice</p>
            <p className="text-slate-500 font-bold mt-0.5">Lahore, Pakistan</p>
          </div>
        </div>

        <footer className="border-t border-slate-200 pt-4 text-slate-400 text-center text-[10px] space-y-1 font-mono">
          <p>Thank you for your business. We appreciate your prompt payment.</p>
          <p className="italic text-slate-500">Note: Please retain this bill invoice for all warranty and customer care services.</p>
        </footer>
      </div>
    </div>
  );
}
