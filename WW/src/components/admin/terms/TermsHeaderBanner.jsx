import React from 'react';
import { FileText, ExternalLink, Save } from 'lucide-react';

export default function TermsHeaderBanner({ onSave }) {
  return (
    <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 p-5 sm:p-7 rounded-2xl text-white shadow-lg shadow-sky-600/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider mb-2 text-white">
          <FileText className="w-3.5 h-3.5" />
          Legal Agreement Management
        </div>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight">Terms of Service Manager</h2>
        <p className="text-xs sm:text-sm text-sky-100 max-w-xl mt-1">
          Edit order contracts, payment rules, installation warranties, and liability limitations. Changes reflect live on your website at <code className="bg-black/20 px-1.5 py-0.5 rounded font-mono">#terms</code>.
        </p>
      </div>

      <div className="flex items-center gap-2.5 self-stretch sm:self-auto flex-wrap">
        <a
          href="#terms"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs backdrop-blur-md transition-all border border-white/20 min-h-[40px]"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Preview Live Page</span>
        </a>

        {onSave && (
          <button
            type="button"
            onClick={onSave}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-sky-700 font-extrabold text-xs shadow-md transition-all min-h-[40px]"
          >
            <Save className="w-3.5 h-3.5 text-sky-600" />
            <span>Save Changes</span>
          </button>
        )}
      </div>
    </div>
  );
}
