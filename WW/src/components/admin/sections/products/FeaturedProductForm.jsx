import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function FeaturedProductForm({
  editingIndex,
  itemForm,
  setItemForm,
  saveListItem,
  cancelEdit,
  onFileUpload
}) {
  return (
    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-50/50 border border-slate-200">
      <h4 className="text-sm font-extrabold text-sky-600 uppercase tracking-widest mb-6 font-mono">
        {editingIndex === 'new' ? 'Add Flagship Product' : 'Modify Product Specifications'}
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Product Image
          </label>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
            <img
              src={itemForm?.image}
              alt={itemForm?.title}
              className="w-24 h-18 rounded-xl object-cover border border-slate-200 flex-shrink-0"
              onError={(e) => (e.target.src = 'https://placehold.co/120x80?text=Product')}
            />
            <div className="flex-1 flex flex-col gap-2">
              <input
                type="text"
                value={itemForm?.image || ''}
                onChange={(e) => setItemForm((prev) => ({ ...prev, image: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-mono"
                placeholder="Image URL"
              />
              <input
                type="file"
                accept="image/*"
                id="upload-prod-form"
                className="hidden"
                onChange={(e) => onFileUpload(e, (url) => setItemForm((prev) => ({ ...prev, image: url })))}
              />
              <label
                htmlFor="upload-prod-form"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 text-[10px] font-bold uppercase tracking-wider cursor-pointer"
              >
                Upload File
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Product Title
          </label>
          <input
            type="text"
            value={itemForm?.title || ''}
            onChange={(e) => setItemForm((prev) => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-bold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Slogan Tagline
          </label>
          <input
            type="text"
            value={itemForm?.tagline || ''}
            onChange={(e) => setItemForm((prev) => ({ ...prev, tagline: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-semibold"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Full Description
          </label>
          <textarea
            rows="3"
            value={itemForm?.description || ''}
            onChange={(e) => setItemForm((prev) => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm resize-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Best Use Case
          </label>
          <input
            type="text"
            value={itemForm?.useCase || ''}
            onChange={(e) => setItemForm((prev) => ({ ...prev, useCase: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Technical Specifications Label
          </label>
          <input
            type="text"
            value={itemForm?.specifications || ''}
            onChange={(e) => setItemForm((prev) => ({ ...prev, specifications: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-mono"
          />
        </div>

        <div className="md:col-span-2 border-t border-slate-200 pt-4 mt-2">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 font-mono">
            Product Features Checklist
          </label>
          <div className="flex flex-col gap-3">
            {(itemForm?.features || []).map((feat, fidx) => (
              <div key={fidx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={feat}
                  onChange={(e) => {
                    const list = [...itemForm.features];
                    list[fidx] = e.target.value;
                    setItemForm((prev) => ({ ...prev, features: list }));
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm"
                  placeholder={`Feature #${fidx + 1}`}
                />
                <button
                  type="button"
                  onClick={() => {
                    const list = itemForm.features.filter((_, i) => i !== fidx);
                    setItemForm((prev) => ({ ...prev, features: list }));
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 text-red-400 hover:bg-slate-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setItemForm((prev) => ({ ...prev, features: [...(prev?.features || []), ''] }));
              }}
              className="inline-flex items-center gap-1.5 self-start px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-bold uppercase tracking-wider"
            >
              <Plus className="w-4 h-4" />
              Add Checklist Point
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 justify-end mt-6 sm:mt-8 border-t border-slate-200 pt-4 sm:pt-6">
        <button
          type="button"
          onClick={cancelEdit}
          className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider flex items-center justify-center transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => saveListItem('featuredProducts')}
          className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center transition-all active:scale-[0.98]"
        >
          Apply Product Changes
        </button>
      </div>
    </div>
  );
}
