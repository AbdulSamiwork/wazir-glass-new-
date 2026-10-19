import React from 'react';
import { Download, FileText } from 'lucide-react';

export default function PortfolioToolbar({
  clientName,
  setClientName,
  selectedCount,
  isGenerating,
  onGenerate
}) {
  return (
    <div className="lg:col-span-4 flex flex-col gap-5">
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
        <h4 className="text-sm font-bold text-sky-600 uppercase tracking-wider border-b border-slate-100 pb-3">Document Customization</h4>
        
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Prepared For / Client Name (Optional)</label>
          <input 
            type="text" 
            value={clientName} 
            onChange={e => setClientName(e.target.value)} 
            placeholder="e.g. Mr. Ali / DHA Phase 6 Project" 
            className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all text-sm" 
          />
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-1 text-xs text-slate-600">
          <p className="font-bold text-slate-800 mb-1.5 flex items-center gap-1.5 text-sky-700">
            <FileText className="w-3.5 h-3.5" /> Full Technical Dossier Included:
          </p>
          <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-600 font-medium">
            <li>Executive Branded Cover Page</li>
            <li>{selectedCount} Detailed Project Spec Sheet(s)</li>
            <li>High-Resolution CAD &amp; Project Photos</li>
            <li>Full Specifications (Size, Materials, Hardware)</li>
            <li>Detailed Scope of Work &amp; Warranty Specs</li>
          </ul>
        </div>

        <button
          onClick={onGenerate}
          disabled={isGenerating || selectedCount === 0}
          className="w-full min-h-[48px] mt-2 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-extrabold uppercase text-xs tracking-wider transition-all shadow-md shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          {isGenerating ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Download className="w-4 h-4" />}
          {isGenerating ? 'Generating PDF...' : 'Download Portfolio'}
        </button>
      </div>
    </div>
  );
}
