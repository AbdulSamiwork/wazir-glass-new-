import React from 'react';

export default function TimelineEditor({ localData, updateField }) {
  const steps = localData.timeline?.steps || [];

  const handleStepChange = (idx, field, value) => {
    const list = [...steps];
    list[idx] = { ...list[idx], [field]: value };
    updateField('timeline', 'steps', list);
  };

  return (
    <div className="bg-white p-4 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-6">
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-sky-500 rounded-full" />
          <h3 className="text-base sm:text-lg font-extrabold text-slate-850">Fabrication Process Timeline</h3>
        </div>
        <p className="text-xs text-slate-500 mt-1 pl-3.5">Manage the steps of your company workflow timeline.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Section Badge</label>
          <input
            type="text"
            value={localData.timeline?.badge || ''}
            onChange={(e) => updateField('timeline', 'badge', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Section Title</label>
          <input
            type="text"
            value={localData.timeline?.title || ''}
            onChange={(e) => updateField('timeline', 'title', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-bold"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Short Description</label>
          <input
            type="text"
            value={localData.timeline?.description || ''}
            onChange={(e) => updateField('timeline', 'description', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm"
          />
        </div>

        {/* Timeline Steps */}
        <div className="md:col-span-2 border-t border-slate-200 pt-4 mt-2">
          <h4 className="text-xs font-bold text-slate-850 uppercase tracking-wider mb-4 font-mono">
            Timeline Process Steps ({steps.length} items)
          </h4>
          <div className="flex flex-col gap-4">
            {steps.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50/50 border border-slate-200">
                <div className="flex gap-4 items-center mb-3">
                  <span className="w-6 h-6 rounded-full bg-sky-50 flex items-center justify-center text-xs font-mono text-sky-600 border border-sky-100 font-bold">
                    {item.step || idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-400">Step #{idx + 1}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-4">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Step Title</label>
                    <input
                      type="text"
                      value={item.title || ''}
                      onChange={(e) => handleStepChange(idx, 'title', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-bold"
                    />
                  </div>
                  <div className="md:col-span-8">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Step Description</label>
                    <input
                      type="text"
                      value={item.desc || ''}
                      onChange={(e) => handleStepChange(idx, 'desc', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
