import React from 'react';
import { ExternalLink, Sparkles, Save } from 'lucide-react';

export default function PrivacyHeaderBanner({ onSave }) {
  return (
    <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-5 sm:p-7 rounded-2xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-mono text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm">
            LEGAL COMPLIANCE
          </span>
          <span className="flex items-center gap-1 text-[11px] text-emerald-100 font-medium">
            <Sparkles className="w-3 h-3 text-emerald-200" />
            SEO & GDPR Ready
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight">Privacy Policy Manager</h2>
        <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-xl">
          Live edits to legal clauses, data disclosure, and GDPR/Pakistani electronic data compliance.
        </p>
      </div>

      <div className="flex items-center gap-2.5 w-full sm:w-auto">
        <a
          href="/#privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold backdrop-blur-sm transition-all border border-white/20 min-h-[40px]"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Live Page</span>
        </a>

        {onSave && (
          <button
            type="button"
            onClick={onSave}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-emerald-700 font-extrabold text-xs shadow-md transition-all min-h-[40px]"
          >
            <Save className="w-3.5 h-3.5 text-emerald-600" />
            <span>Save Changes</span>
          </button>
        )}
      </div>
    </div>
  );
}
