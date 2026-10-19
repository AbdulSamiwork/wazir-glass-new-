import React from 'react';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import BeforeAfterForm from './beforeafter/BeforeAfterForm';

export default function BeforeAfterEditor({
  localData,
  updateField,
  editingIndex,
  setEditingIndex,
  itemForm,
  setItemForm,
  startAddListItem,
  startEditListItem,
  saveListItem,
  deleteListItem,
  handleFileUpload
}) {
  const defaultTemplate = {
    id: Date.now(),
    title: 'New Glazing Transformation',
    category: 'Commercial Plaza • Lahore',
    beforeImage: 'https://images.unsplash.com/photo-1541888946425-d0ebb18086f6?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    beforeLabel: 'Old Ordinary Shutter & Frame',
    afterLabel: 'Wazir 12mm Frameless Safety Glass',
    specs: ['12mm Clear Tempered Glass', 'Hydraulic Floor Spring Hinges', '304 Grade Stainless Steel Patch Fittings'],
    impact: '+300% Customer Footfall & Modern Look'
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-extrabold text-slate-850">Before &amp; After Glazing Transformations</h3>
          <p className="text-xs text-slate-500 mt-1">Manage interactive comparison projects, images, and architectural specifications.</p>
        </div>
        {editingIndex === null && (
          <button
            onClick={() => startAddListItem(defaultTemplate)}
            className="self-start sm:self-auto min-h-[40px] flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold text-xs uppercase tracking-wider transition-colors border border-sky-100/80 shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Transformation
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Section Badge</label>
          <input
            type="text"
            value={localData.beforeAfter?.badge || ''}
            onChange={(e) => updateField('beforeAfter', 'badge', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Section Title</label>
          <input
            type="text"
            value={localData.beforeAfter?.title || ''}
            onChange={(e) => updateField('beforeAfter', 'title', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-bold"
          />
        </div>
        <div className="md:col-span-3">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Section Short Description</label>
          <input
            type="text"
            value={localData.beforeAfter?.description || ''}
            onChange={(e) => updateField('beforeAfter', 'description', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm"
          />
        </div>
      </div>

      {editingIndex === null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(localData.beforeAfter?.items || []).map((proj, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="grid grid-cols-2 h-36 relative bg-slate-900 border-b border-slate-200">
                  <div className="relative overflow-hidden border-r border-slate-700">
                    <img src={proj.beforeImage} alt={proj.beforeLabel} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-bold">BEFORE</span>
                  </div>
                  <div className="relative overflow-hidden">
                    <img src={proj.afterImage} alt={proj.afterLabel} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-1 px-2 py-0.5 rounded bg-sky-500/90 text-white text-[10px] font-bold">AFTER</span>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-bold text-sky-500 uppercase tracking-wider font-mono">{proj.category}</span>
                  <h4 className="font-extrabold text-slate-850 text-base mt-0.5 mb-2">{proj.title}</h4>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p><strong>Before:</strong> {proj.beforeLabel}</p>
                    <p><strong>After:</strong> {proj.afterLabel}</p>
                    <p className="text-emerald-600 font-bold mt-1">✨ {proj.impact}</p>
                  </div>
                </div>
              </div>
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
                <button
                  onClick={() => startEditListItem(idx, proj)}
                  className="min-h-[36px] flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 shadow-sm"
                >
                  <Edit3 className="w-3.5 h-3.5 text-sky-500" /> Edit
                </button>
                <button
                  onClick={() => deleteListItem('beforeAfter', idx)}
                  className="min-h-[36px] px-2.5 rounded-lg bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 border border-slate-200 shadow-sm flex items-center justify-center"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <BeforeAfterForm
          editingIndex={editingIndex}
          setEditingIndex={setEditingIndex}
          itemForm={itemForm}
          setItemForm={setItemForm}
          saveListItem={saveListItem}
          handleFileUpload={handleFileUpload}
        />
      )}
    </div>
  );
}
