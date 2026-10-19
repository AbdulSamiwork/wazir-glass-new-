import React from 'react';

export default function GalleryProjectForm({
  editingIndex,
  setEditingIndex,
  itemForm,
  setItemForm,
  saveListItem,
  handleFileUpload
}) {
  return (
    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-50/50 border border-slate-200">
      <h4 className="text-sm font-extrabold text-sky-600 uppercase tracking-widest mb-6 font-mono">
        {editingIndex === 'new' ? 'Add Project Gallery Image' : 'Modify Project Gallery specifications'}
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-left">
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Project Image</label>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
            <img
              src={itemForm.image}
              alt={itemForm.title}
              className="w-24 h-18 rounded-xl object-cover border border-slate-200 flex-shrink-0"
              onError={(e) => (e.target.src = 'https://placehold.co/120x80?text=Project')}
            />
            <div className="flex-1 flex flex-col gap-2 w-full">
              <input
                type="text"
                value={itemForm.image || ''}
                onChange={(e) => setItemForm((prev) => ({ ...prev, image: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-mono"
                placeholder="Image URL"
              />
              <input
                type="file"
                accept="image/*"
                id="upload-proj-gal"
                className="hidden"
                onChange={(e) => handleFileUpload(e, (url) => setItemForm((prev) => ({ ...prev, image: url })))}
              />
              <label
                htmlFor="upload-proj-gal"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 text-[10px] font-bold uppercase tracking-wider cursor-pointer self-start"
              >
                Upload File
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Project Title</label>
          <input
            type="text"
            value={itemForm.title || ''}
            onChange={(e) => setItemForm((prev) => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-bold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Filter Category</label>
          <select
            value={itemForm.category || 'Doors'}
            onChange={(e) => setItemForm((prev) => ({ ...prev, category: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm outline-none"
          >
            <option value="Windows">Windows</option>
            <option value="Doors">Doors</option>
            <option value="Glass Partitions">Glass Partitions</option>
            <option value="Shop Fronts">Shop Fronts</option>
            <option value="Mirrors">Mirrors</option>
            <option value="Aluminium Work">Aluminium Work</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Dimensions / Size Info</label>
          <input
            type="text"
            value={itemForm.size || ''}
            onChange={(e) => setItemForm((prev) => ({ ...prev, size: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm"
            placeholder="e.g. 1200 x 2400 mm"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Detailed Summary description (Modal popup)
          </label>
          <textarea
            rows="3"
            value={itemForm.desc || ''}
            onChange={(e) => setItemForm((prev) => ({ ...prev, desc: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm resize-none"
          />
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 justify-end mt-6 border-t border-slate-200 pt-4">
        <button
          type="button"
          onClick={() => {
            setEditingIndex(null);
            setItemForm(null);
          }}
          className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider flex items-center justify-center transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => saveListItem('gallery')}
          className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center transition-all active:scale-[0.98]"
        >
          Apply Project Item
        </button>
      </div>
    </div>
  );
}
