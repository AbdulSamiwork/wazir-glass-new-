import React from 'react';
import { Plus, Edit3, Trash2 } from 'lucide-react';

export default function TestimonialsEditor({
  localData,
  updateField,
  editingIndex,
  setEditingIndex,
  itemForm,
  setItemForm,
  startAddListItem,
  startEditListItem,
  saveListItem,
  deleteListItem
}) {
  const defaultTemplate = {
    name: 'Zainab Bibi',
    role: 'Homeowner',
    text: 'Amazing finishing and precise measurements. Recommended!',
    stars: 5
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-extrabold text-slate-850">Client Reviews & Testimonials</h3>
          <p className="text-xs text-slate-500 mt-1">Manage ratings and feedback slider copy on your landing pages.</p>
        </div>
        {editingIndex === null && (
          <button
            onClick={() => startAddListItem(defaultTemplate)}
            className="self-start sm:self-auto min-h-[40px] flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold text-xs uppercase tracking-wider transition-colors border border-sky-100/80 shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Testimonial review
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Section Badge</label>
          <input
            type="text"
            value={localData.testimonials?.badge || ''}
            onChange={(e) => updateField('testimonials', 'badge', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Section Title</label>
          <input
            type="text"
            value={localData.testimonials?.title || ''}
            onChange={(e) => updateField('testimonials', 'title', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-bold"
          />
        </div>
        <div className="md:col-span-3">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Section Description</label>
          <input
            type="text"
            value={localData.testimonials?.description || ''}
            onChange={(e) => updateField('testimonials', 'description', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm"
          />
        </div>
      </div>

      {editingIndex === null ? (
        <div className="flex flex-col gap-4 mt-4 border-t border-slate-200 pt-6">
          {(localData.testimonials?.items || []).map((rev, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50/50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex gap-1 mb-1">
                  {[...Array(rev.stars || 5)].map((_, i) => (
                    <span key={i} className="text-amber-500 text-xs">★</span>
                  ))}
                </div>
                <blockquote className="text-xs italic text-slate-700 font-medium leading-relaxed">"{rev.text}"</blockquote>
                <cite className="block not-italic text-[10px] text-slate-500 font-bold uppercase mt-2">
                  {rev.name} – <span className="text-sky-500">{rev.role}</span>
                </cite>
              </div>
              <div className="flex gap-2 self-end sm:self-auto shrink-0">
                <button
                  onClick={() => startEditListItem(idx, rev)}
                  className="min-h-[36px] px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 flex items-center justify-center"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteListItem('testimonials', idx)}
                  className="min-h-[36px] px-3 py-1.5 rounded-lg border border-red-100 bg-red-50/50 hover:bg-red-50 text-red-400 flex items-center justify-center"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-50/50 border border-slate-200">
          <h4 className="text-sm font-extrabold text-sky-600 uppercase tracking-widest mb-6 font-mono">
            {editingIndex === 'new' ? 'Add Client Review' : 'Modify Client Review'}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-left">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Client Name</label>
              <input
                type="text"
                value={itemForm.name || ''}
                onChange={(e) => setItemForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Client Role / Profession</label>
              <input
                type="text"
                value={itemForm.role || ''}
                onChange={(e) => setItemForm(prev => ({ ...prev, role: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm"
                placeholder="e.g. Homeowner, Architect"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Star rating (1 to 5)</label>
              <select
                value={itemForm.stars || 5}
                onChange={(e) => setItemForm(prev => ({ ...prev, stars: parseInt(e.target.value) }))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm outline-none"
              >
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Review text feedback</label>
              <textarea
                rows="3"
                value={itemForm.text || ''}
                onChange={(e) => setItemForm(prev => ({ ...prev, text: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm resize-none"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 justify-end mt-6 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={() => { setEditingIndex(null); setItemForm(null); }}
              className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider flex items-center justify-center transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => saveListItem('testimonials')}
              className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center transition-all active:scale-[0.98]"
            >
              Apply Review changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
