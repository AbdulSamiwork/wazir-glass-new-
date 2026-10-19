import React from 'react';

export default function HeroEditor({ hero, onChange }) {
  if (!hero) return null;

  return (
    <div className="bg-white p-4 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-6">
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-sky-500 rounded-full"></span>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-850">Hero Header Section</h3>
        </div>
        <p className="text-xs text-slate-500 mt-1 pl-3.5">
          Manage title slogans, text descriptions, action link references, and trust metrics.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Header Badge</label>
          <input
            type="text"
            value={hero.badge || ''}
            onChange={(e) => onChange('badge', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Title Line 1</label>
          <input
            type="text"
            value={hero.titleLine1 || ''}
            onChange={(e) => onChange('titleLine1', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 outline-none transition-colors font-bold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Animated Typist Title</label>
          <input
            type="text"
            value={hero.typedText || ''}
            onChange={(e) => onChange('typedText', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 outline-none transition-colors font-bold text-sky-400"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Description Paragraph</label>
          <textarea
            rows="3"
            value={hero.description || ''}
            onChange={(e) => onChange('description', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 outline-none transition-colors resize-none leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Primary Button Text</label>
          <input
            type="text"
            value={hero.ctaText1 || ''}
            onChange={(e) => onChange('ctaText1', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Primary Button Link</label>
          <input
            type="text"
            value={hero.ctaLink1 || ''}
            onChange={(e) => onChange('ctaLink1', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 outline-none font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Secondary Button Text</label>
          <input
            type="text"
            value={hero.ctaText2 || ''}
            onChange={(e) => onChange('ctaText2', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Secondary Button Link</label>
          <input
            type="text"
            value={hero.ctaLink2 || ''}
            onChange={(e) => onChange('ctaLink2', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 outline-none font-mono"
          />
        </div>

        <div className="md:col-span-2 border-t border-slate-200 pt-4 mt-2">
          <h4 className="text-xs font-bold text-slate-850 uppercase tracking-wider mb-4">Trust Statistics Badges</h4>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Projects Value</label>
          <input
            type="text"
            value={hero.completedProjectsVal || ''}
            onChange={(e) => onChange('completedProjectsVal', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 outline-none font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Projects Label</label>
          <input
            type="text"
            value={hero.completedProjectsLabel || ''}
            onChange={(e) => onChange('completedProjectsLabel', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Experience Value</label>
          <input
            type="text"
            value={hero.experienceVal || ''}
            onChange={(e) => onChange('experienceVal', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 outline-none font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Experience Label</label>
          <input
            type="text"
            value={hero.experienceLabel || ''}
            onChange={(e) => onChange('experienceLabel', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Quality Value</label>
          <input
            type="text"
            value={hero.qualityVal || ''}
            onChange={(e) => onChange('qualityVal', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 outline-none font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Quality Label</label>
          <input
            type="text"
            value={hero.qualityLabel || ''}
            onChange={(e) => onChange('qualityLabel', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 outline-none"
          />
        </div>
      </div>
    </div>
  );
}
