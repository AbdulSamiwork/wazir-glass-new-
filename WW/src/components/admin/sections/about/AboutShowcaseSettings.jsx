import React from 'react';
import { Image } from 'lucide-react';

export default function AboutShowcaseSettings({ about, onChange, onFileUpload }) {
  return (
    <>
      <div className="md:col-span-2 border-t border-slate-200 pt-4 mt-2">
        <h4 className="text-xs font-bold text-slate-850 uppercase tracking-wider mb-4">
          Before / After Showcase Settings
        </h4>
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Showcase Badge</label>
        <input
          type="text"
          value={about.showcaseBadge || ''}
          onChange={(e) => onChange('showcaseBadge', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Showcase Slogan</label>
        <input
          type="text"
          value={about.showcaseTitle || ''}
          onChange={(e) => onChange('showcaseTitle', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 outline-none font-bold"
        />
      </div>

      {/* Before Image */}
      <div className="md:col-span-2 border-b border-slate-200/60 pb-4">
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
          Before Image (masonry raw space)
        </label>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
          <img
            src={about.beforeImage}
            alt="Before"
            className="w-24 h-16 rounded-xl object-cover border border-slate-200 flex-shrink-0"
            onError={(e) => (e.target.src = 'https://placehold.co/120x80?text=Before+Image')}
          />
          <div className="flex-1 flex flex-col gap-2">
            <input
              type="text"
              value={about.beforeImage || ''}
              onChange={(e) => onChange('beforeImage', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-mono"
              placeholder="Image URL"
            />
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                id="upload-before"
                className="hidden"
                onChange={(e) => onFileUpload(e, (url) => onChange('beforeImage', url))}
              />
              <label
                htmlFor="upload-before"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-sky-600 text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors shadow-2xs"
              >
                <Image className="w-4 h-4 text-sky-500" />
                Upload Custom Photo
              </label>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Before State Title</label>
        <input
          type="text"
          value={about.beforeTitle || ''}
          onChange={(e) => onChange('beforeTitle', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Before State Desc</label>
        <input
          type="text"
          value={about.beforeDesc || ''}
          onChange={(e) => onChange('beforeDesc', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 outline-none"
        />
      </div>

      {/* After Image */}
      <div className="md:col-span-2 border-b border-slate-200/60 pb-4">
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
          After Image (polished glass layout)
        </label>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
          <img
            src={about.afterImage}
            alt="After"
            className="w-24 h-16 rounded-xl object-cover border border-slate-200 flex-shrink-0"
            onError={(e) => (e.target.src = 'https://placehold.co/120x80?text=After+Image')}
          />
          <div className="flex-1 flex flex-col gap-2">
            <input
              type="text"
              value={about.afterImage || ''}
              onChange={(e) => onChange('afterImage', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-mono"
              placeholder="Image URL"
            />
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                id="upload-after"
                className="hidden"
                onChange={(e) => onFileUpload(e, (url) => onChange('afterImage', url))}
              />
              <label
                htmlFor="upload-after"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-sky-600 text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors shadow-2xs"
              >
                <Image className="w-4 h-4 text-sky-500" />
                Upload Custom Photo
              </label>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">After State Title</label>
        <input
          type="text"
          value={about.afterTitle || ''}
          onChange={(e) => onChange('afterTitle', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">After State Desc</label>
        <input
          type="text"
          value={about.afterDesc || ''}
          onChange={(e) => onChange('afterDesc', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 outline-none"
        />
      </div>
    </>
  );
}
