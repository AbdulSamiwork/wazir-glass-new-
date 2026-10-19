import React from 'react';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import ServiceForm from './services/ServiceForm';

export default function ServicesEditor({
  services,
  onChange,
  editingIndex,
  itemForm,
  setItemForm,
  startAddListItem,
  startEditListItem,
  saveListItem,
  deleteListItem,
  cancelEdit,
  onFileUpload
}) {
  if (!services) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-extrabold text-slate-850">Workshop &amp; Onsite Services</h3>
          <p className="text-xs text-slate-500 mt-1">Customize services sections titles and manage items list.</p>
        </div>

        {editingIndex === null && (
          <button
            onClick={() =>
              startAddListItem({
                title: 'New Fabrication Service',
                description: 'Brief 2-sentence description of the capability.',
                details: 'Detailed overview of workshop tooling, specs and tolerances.',
                highlights: ['Specification check', 'Workshop quality', 'Laser measure'],
                image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80'
              })
            }
            className="self-start sm:self-auto min-h-[40px] flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold text-xs uppercase tracking-wider transition-colors border border-sky-100/80 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Service Item
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-1">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Service Section Badge</label>
          <input
            type="text"
            value={services.badge || ''}
            onChange={(e) => onChange('badge', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Service Section Slogan</label>
          <input
            type="text"
            value={services.title || ''}
            onChange={(e) => onChange('title', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-bold"
          />
        </div>
        <div className="md:col-span-3">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Service Section Desc</label>
          <input
            type="text"
            value={services.description || ''}
            onChange={(e) => onChange('description', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm"
          />
        </div>
      </div>

      {editingIndex === null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 border-t border-slate-200 pt-6">
          {(services.items || []).map((serv, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-2xl flex flex-col justify-between border border-slate-200 bg-slate-50/30">
              <div>
                <img
                  src={serv.image}
                  alt={serv.title}
                  className="w-full h-32 rounded-xl object-cover border border-slate-200 mb-4"
                  onError={(e) => (e.target.src = 'https://placehold.co/120x80?text=Service')}
                />
                <h4 className="font-extrabold text-slate-850 text-base">{serv.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-3 leading-relaxed">{serv.description}</p>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200/60 mt-5 pt-4">
                <button
                  onClick={() => startEditListItem(idx, serv)}
                  className="min-h-[36px] flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 hover:text-sky-600 transition-colors shadow-2xs"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Modify
                </button>
                <button
                  onClick={() => deleteListItem('services', idx)}
                  className="min-h-[36px] flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-200 bg-red-50/70 hover:bg-red-100 text-xs font-semibold text-red-600 transition-colors shadow-2xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ServiceForm
          editingIndex={editingIndex}
          itemForm={itemForm}
          setItemForm={setItemForm}
          saveListItem={saveListItem}
          cancelEdit={cancelEdit}
          onFileUpload={onFileUpload}
        />
      )}
    </div>
  );
}
