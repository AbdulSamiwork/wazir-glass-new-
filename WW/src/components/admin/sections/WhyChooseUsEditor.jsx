import React from 'react';

export default function WhyChooseUsEditor({ whyChooseUs, onChange }) {
  if (!whyChooseUs) return null;

  return (
    <div className="bg-white p-4 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-6">
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-sky-500 rounded-full"></span>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-850">Why Partner With Wazir</h3>
        </div>
        <p className="text-xs text-slate-500 mt-1 pl-3.5">
          Manage stats counters values and structural assurance lists.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Section Badge</label>
          <input
            type="text"
            value={whyChooseUs.badge || ''}
            onChange={(e) => onChange('badge', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Section Title</label>
          <input
            type="text"
            value={whyChooseUs.title || ''}
            onChange={(e) => onChange('title', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-bold"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Short Description</label>
          <input
            type="text"
            value={whyChooseUs.description || ''}
            onChange={(e) => onChange('description', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm"
          />
        </div>

        {/* Counters */}
        <div className="md:col-span-2 border-t border-slate-200 pt-4 mt-2">
          <h4 className="text-xs font-bold text-slate-850 uppercase tracking-wider mb-4 font-mono">
            Counters / Statistics badges (Fixed 4 items)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(whyChooseUs.stats || []).map((stat, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50/50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[9px] font-bold text-slate-600 uppercase mb-1.5">Value</label>
                  <input
                    type="text"
                    value={stat.value || ''}
                    onChange={(e) => {
                      const list = [...whyChooseUs.stats];
                      list[idx].value = e.target.value;
                      onChange('stats', list);
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-600 uppercase mb-1.5">Suffix</label>
                  <input
                    type="text"
                    value={stat.suffix || ''}
                    onChange={(e) => {
                      const list = [...whyChooseUs.stats];
                      list[idx].suffix = e.target.value;
                      onChange('stats', list);
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-600 uppercase mb-1.5">Label</label>
                  <input
                    type="text"
                    value={stat.label || ''}
                    onChange={(e) => {
                      const list = [...whyChooseUs.stats];
                      list[idx].label = e.target.value;
                      onChange('stats', list);
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assurance Cards */}
        <div className="md:col-span-2 border-t border-slate-200 pt-4 mt-2">
          <h4 className="text-xs font-bold text-slate-850 uppercase tracking-wider mb-4 font-mono">
            Assurance & Trust Cards (Fixed 8 items)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(whyChooseUs.trustPoints || []).map((point, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50/50 border border-slate-200 flex flex-col gap-3">
                <div>
                  <label className="block text-[9px] font-bold text-slate-600 uppercase mb-1.5">Card #{idx+1} Title</label>
                  <input
                    type="text"
                    value={point.title || ''}
                    onChange={(e) => {
                      const list = [...whyChooseUs.trustPoints];
                      list[idx].title = e.target.value;
                      onChange('trustPoints', list);
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-600 uppercase mb-1.5">Card #{idx+1} Description</label>
                  <input
                    type="text"
                    value={point.desc || ''}
                    onChange={(e) => {
                      const list = [...whyChooseUs.trustPoints];
                      list[idx].desc = e.target.value;
                      onChange('trustPoints', list);
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
