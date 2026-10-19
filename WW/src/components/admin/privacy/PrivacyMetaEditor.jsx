import React from 'react';

export default function PrivacyMetaEditor({ policy, onFieldChange }) {
  return (
    <>
      {/* 1. Header Banner & Meta Details Card */}
      <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-6">
        <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-emerald-500 rounded-full"></span>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-800">1. Header Banner & Meta Settings</h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Page Hero Section</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Badge Text</label>
            <input
              type="text"
              value={policy.badge || ''}
              onChange={(e) => onFieldChange('badge', e.target.value)}
              placeholder="e.g. Data Protection"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Title (Line 1)</label>
            <input
              type="text"
              value={policy.titleLine1 || ''}
              onChange={(e) => onFieldChange('titleLine1', e.target.value)}
              placeholder="e.g. Privacy"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Title (Gradient Highlight)</label>
            <input
              type="text"
              value={policy.titleLine2 || ''}
              onChange={(e) => onFieldChange('titleLine2', e.target.value)}
              placeholder="e.g. Policy"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-emerald-600 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Last Updated Date</label>
            <input
              type="text"
              value={policy.lastUpdated || ''}
              onChange={(e) => onFieldChange('lastUpdated', e.target.value)}
              placeholder="e.g. October 2026"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Sub Notice Tagline</label>
            <input
              type="text"
              value={policy.subNotice || ''}
              onChange={(e) => onFieldChange('subNotice', e.target.value)}
              placeholder="e.g. Your Data, Your Rights"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Banner Description</label>
            <textarea
              rows={2}
              value={policy.description || ''}
              onChange={(e) => onFieldChange('description', e.target.value)}
              placeholder="Explain how your company collects and protects user information..."
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* 4. Bottom Contact Card Settings */}
      <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-6">
        <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-emerald-500 rounded-full"></span>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-800">4. Bottom Contact Card</h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Footer CTA Section</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Card Title</label>
            <input
              type="text"
              value={policy.ctaTitle || ''}
              onChange={(e) => onFieldChange('ctaTitle', e.target.value)}
              placeholder="e.g. Privacy Concerns?"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Button Text</label>
            <input
              type="text"
              value={policy.ctaBtnText || ''}
              onChange={(e) => onFieldChange('ctaBtnText', e.target.value)}
              placeholder="e.g. Contact Us"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Card Subtext / Description</label>
            <textarea
              rows={2}
              value={policy.ctaDescription || ''}
              onChange={(e) => onFieldChange('ctaDescription', e.target.value)}
              placeholder="If you have questions about this Privacy Policy or want to exercise your data rights..."
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>
      </div>
    </>
  );
}
