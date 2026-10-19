import React from 'react';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import GalleryProjectForm from './gallery/GalleryProjectForm';

export default function GalleryEditor({
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
    title: 'Premium Sliding Doors',
    category: 'Doors',
    size: '1800 x 2400 mm',
    desc: 'Bespoke aluminium profile frameworks.',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80'
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-extrabold text-slate-850">Portfolio Project Gallery</h3>
          <p className="text-xs text-slate-500 mt-1">Manage recent site installations photos in the filterable project gallery.</p>
        </div>
        {editingIndex === null && (
          <button
            onClick={() => startAddListItem(defaultTemplate)}
            className="self-start sm:self-auto min-h-[40px] flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold text-xs uppercase tracking-wider transition-colors border border-sky-100/80 shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Project Item
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Gallery Badge</label>
          <input
            type="text"
            value={localData.gallery?.badge || ''}
            onChange={(e) => updateField('gallery', 'badge', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Gallery Title</label>
          <input
            type="text"
            value={localData.gallery?.title || ''}
            onChange={(e) => updateField('gallery', 'title', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-bold"
          />
        </div>
        <div className="md:col-span-3">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Gallery Short Description</label>
          <input
            type="text"
            value={localData.gallery?.description || ''}
            onChange={(e) => updateField('gallery', 'description', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm"
          />
        </div>
      </div>

      {editingIndex === null ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 border-t border-slate-200 pt-6">
          {(localData.gallery?.projects || []).map((proj, idx) => (
            <div key={idx} className="glass-panel p-4 rounded-2xl flex flex-col justify-between border border-slate-200 bg-slate-50/30">
              <div>
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-24 rounded-xl object-cover border border-slate-200 mb-3"
                  onError={(e) => (e.target.src = 'https://placehold.co/120x80?text=Project')}
                />
                <span className="text-[9px] font-mono text-sky-400 block font-bold uppercase">{proj.category}</span>
                <h4 className="font-extrabold text-slate-850 text-xs mt-1 line-clamp-1">{proj.title}</h4>
                <span className="text-[9px] text-slate-500 block font-mono mt-1">Size: {proj.size}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200/60 mt-4 pt-3">
                <button
                  onClick={() => startEditListItem(idx, proj)}
                  className="min-h-[36px] flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-[10px] font-semibold text-slate-700 hover:text-sky-600 transition-colors shadow-2xs"
                >
                  <Edit3 className="w-3 h-3" /> Modify
                </button>
                <button
                  onClick={() => deleteListItem('gallery', idx)}
                  className="min-h-[36px] flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-red-200 bg-red-50/70 hover:bg-red-100 text-[10px] font-semibold text-red-600 transition-colors shadow-2xs"
                >
                  <Trash2 className="w-3 h-3" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <GalleryProjectForm
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
