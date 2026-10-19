import React from 'react';

export default function TermsMetaEditor({ terms, onFieldChange }) {
  return (
    <>
      {/* 1. Header Banner & Meta Details Card */}
      <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-6">
        <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-sky-500 rounded-full"></span>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-800">1. Header Banner & Meta Settings</h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Page Hero Section</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Badge Text</label>
            <input
              type="text"
              value={terms.badge || ''}
              onChange={(e) => onFieldChange('badge', e.target.value)}
              placeholder="e.g. Legal Agreement"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Title (Line 1)</label>
            <input
              type="text"
              value={terms.titleLine1 || ''}
              onChange={(e) => onFieldChange('titleLine1', e.target.value)}
              placeholder="e.g. Terms &"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Title (Gradient Highlight)</label>
            <input
              type="text"
              value={terms.titleLine2 || ''}
              onChange={(e) => onFieldChange('titleLine2', e.target.value)}
              placeholder="e.g. Conditions"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sky-600 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Last Updated Date</label>
            <input
              type="text"
              value={terms.lastUpdated || ''}
              onChange={(e) => onFieldChange('lastUpdated', e.target.value)}
              placeholder="e.g. October 2026"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Sub Notice Tagline</label>
            <input
              type="text"
              value={terms.subNotice || ''}
              onChange={(e) => onFieldChange('subNotice', e.target.value)}
              placeholder="e.g. Effective Immediately"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            />
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Banner Subtitle / Description</label>
            <textarea
              rows={2}
              value={terms.description || ''}
              onChange={(e) => onFieldChange('description', e.target.value)}
              placeholder="Please read these terms carefully before engaging with our services..."
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* 2. Quick Summary Box Card */}
      <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-4">
        <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-sky-500 rounded-full"></span>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-800">2. Quick Summary Highlight Box</h3>
          </div>
          <span className="text-[11px] font-mono text-sky-600 font-bold bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
            Prominent Top Box
          </span>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Summary Text (Key Takeaways for Clients)
          </label>
          <textarea
            rows={3}
            value={terms.quickSummary || ''}
            onChange={(e) => onFieldChange('quickSummary', e.target.value)}
            placeholder="e.g. We provide custom glass & aluminium fabrication services. 50% advance is required to start production..."
            className="w-full px-4 py-2.5 rounded-xl bg-sky-50/40 border border-sky-200/70 text-slate-800 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
          />
          <p className="text-[11px] text-slate-400 mt-1">This text appears highlighted in a blue card right above the clauses on the live page.</p>
        </div>
      </div>

      {/* 4. Bottom CTA Box Settings */}
      <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-6">
        <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-sky-500 rounded-full"></span>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-800">4. Bottom Contact Card</h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Footer CTA Section</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Card Title</label>
            <input
              type="text"
              value={terms.ctaTitle || ''}
              onChange={(e) => onFieldChange('ctaTitle', e.target.value)}
              placeholder="e.g. Have Questions?"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Button Text</label>
            <input
              type="text"
              value={terms.ctaBtnText || ''}
              onChange={(e) => onFieldChange('ctaBtnText', e.target.value)}
              placeholder="e.g. Contact Us"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Card Subtext / Description</label>
            <textarea
              rows={2}
              value={terms.ctaDescription || ''}
              onChange={(e) => onFieldChange('ctaDescription', e.target.value)}
              placeholder="If you have any questions about these Terms & Conditions, please contact us..."
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>
        </div>
      </div>
    </>
  );
}
