import React from 'react';
import AboutShowcaseSettings from './about/AboutShowcaseSettings';

export default function AboutEditor({
  about,
  onChange,
  onArrayChange,
  onFileUpload
}) {
  if (!about) return null;

  return (
    <div className="bg-white p-4 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-6">
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-sky-500 rounded-full"></span>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-850">About Wazir Section</h3>
        </div>
        <p className="text-xs text-slate-500 mt-1 pl-3.5">
          Edit copy texts, feature points list, and Before/After slider showcase parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">About Section Badge</label>
          <input
            type="text"
            value={about.badge || ''}
            onChange={(e) => onChange('badge', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Main Title</label>
          <input
            type="text"
            value={about.title || ''}
            onChange={(e) => onChange('title', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 outline-none font-bold"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Description Paragraph 1</label>
          <textarea
            rows="3"
            value={about.description1 || ''}
            onChange={(e) => onChange('description1', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 outline-none leading-relaxed"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Description Paragraph 2</label>
          <textarea
            rows="3"
            value={about.description2 || ''}
            onChange={(e) => onChange('description2', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 outline-none leading-relaxed"
          />
        </div>

        {/* Feature points */}
        <div className="md:col-span-2 border-t border-slate-200 pt-4 mt-2">
          <h4 className="text-xs font-bold text-slate-850 uppercase tracking-wider mb-4">Core Feature Points (Fixed 3 items)</h4>
          <div className="flex flex-col gap-4">
            {(about.features || []).map((feat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50/50 border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Point #{idx + 1} Title</label>
                  <input
                    type="text"
                    value={feat.title || ''}
                    onChange={(e) => onArrayChange(idx, 'title', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Point #{idx + 1} Description</label>
                  <input
                    type="text"
                    value={feat.description || ''}
                    onChange={(e) => onArrayChange(idx, 'description', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Before/After Showcase */}
        <AboutShowcaseSettings
          about={about}
          onChange={onChange}
          onFileUpload={onFileUpload}
        />
      </div>
    </div>
  );
}
