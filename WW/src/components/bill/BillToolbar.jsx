import React from 'react';
import { X, Printer, Download, MessageSquare } from 'lucide-react';

export default function BillToolbar({
  onClose,
  onPrint,
  onDownload,
  onWhatsApp
}) {
  return (
    <div id="bill-preview-actions" className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 border-b border-slate-200 pb-4 mb-3 sm:mb-4 px-4 sm:px-5 pt-4 sm:pt-5 flex-shrink-0">
      <div className="flex items-center justify-between w-full sm:w-auto">
        <div>
          <h3 className="text-base font-extrabold text-slate-800">Tax Invoice &amp; Bill Preview</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Print, download, or share transaction bills</p>
        </div>
        <button 
          onClick={onClose}
          className="sm:hidden min-h-[38px] min-w-[38px] flex items-center justify-center p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors border border-slate-200"
          title="Close Dialog"
          aria-label="Close Dialog"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <button
          onClick={onWhatsApp}
          className="flex-1 sm:flex-initial min-h-[40px] sm:min-h-[44px] flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WhatsApp</span>
        </button>
        <button
          onClick={onDownload}
          className="flex-1 sm:flex-initial min-h-[40px] sm:min-h-[44px] flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-700 border border-slate-200 font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>PDF</span>
        </button>
        <button
          onClick={handlePrintWrapper(onPrint)}
          className="flex-1 sm:flex-initial min-h-[40px] sm:min-h-[44px] flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
        >
          <Printer className="w-4 h-4" />
          <span>Print</span>
        </button>
        <button 
          onClick={onClose}
          className="hidden sm:flex min-h-[44px] min-w-[44px] items-center justify-center p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
          title="Close Dialog"
          aria-label="Close Dialog"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function handlePrintWrapper(onPrint) {
  return onPrint;
}
