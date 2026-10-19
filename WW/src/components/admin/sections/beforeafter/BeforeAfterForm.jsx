import React from 'react';

export default function BeforeAfterForm({
  editingIndex,
  setEditingIndex,
  itemForm,
  setItemForm,
  saveListItem,
  handleFileUpload
}) {
  return (
    <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 flex flex-col gap-5">
      <h4 className="font-extrabold text-slate-800 border-b border-slate-200 pb-3">
        {editingIndex === 'new' ? 'Add Glazing Transformation Project' : 'Modify Glazing Transformation Project'}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Location / Category</label>
          <input
            type="text"
            value={itemForm.category || ''}
            onChange={(e) => setItemForm((prev) => ({ ...prev, category: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm"
            placeholder="e.g. Commercial Plaza • Lahore"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Before Image */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">Before Image URL</label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={itemForm.beforeImage || ''}
              onChange={(e) => setItemForm((prev) => ({ ...prev, beforeImage: e.target.value }))}
              className="flex-1 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono"
            />
            <input
              type="file"
              accept="image/*"
              id="upload-before-img"
              className="hidden"
              onChange={(e) => handleFileUpload(e, (url) => setItemForm((prev) => ({ ...prev, beforeImage: url })))}
            />
            <label
              htmlFor="upload-before-img"
              className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer shrink-0"
            >
              Upload
            </label>
          </div>
          {itemForm.beforeImage && (
            <img
              src={itemForm.beforeImage}
              alt="Before preview"
              className="w-full h-24 object-cover rounded-lg border border-slate-200 mt-2"
            />
          )}
        </div>

        {/* After Image */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
          <label className="block text-xs font-bold text-sky-600 uppercase tracking-wider">After Image URL</label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={itemForm.afterImage || ''}
              onChange={(e) => setItemForm((prev) => ({ ...prev, afterImage: e.target.value }))}
              className="flex-1 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono"
            />
            <input
              type="file"
              accept="image/*"
              id="upload-after-img"
              className="hidden"
              onChange={(e) => handleFileUpload(e, (url) => setItemForm((prev) => ({ ...prev, afterImage: url })))}
            />
            <label
              htmlFor="upload-after-img"
              className="px-3 py-2 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-600 text-xs font-bold cursor-pointer shrink-0"
            >
              Upload
            </label>
          </div>
          {itemForm.afterImage && (
            <img
              src={itemForm.afterImage}
              alt="After preview"
              className="w-full h-24 object-cover rounded-lg border border-slate-200 mt-2"
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Before Label Description</label>
          <input
            type="text"
            value={itemForm.beforeLabel || ''}
            onChange={(e) => setItemForm((prev) => ({ ...prev, beforeLabel: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-sky-600 uppercase tracking-wider mb-2">After Label Description</label>
          <input
            type="text"
            value={itemForm.afterLabel || ''}
            onChange={(e) => setItemForm((prev) => ({ ...prev, afterLabel: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-bold"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
          Engineered Specifications (Comma Separated)
        </label>
        <input
          type="text"
          value={Array.isArray(itemForm.specs) ? itemForm.specs.join(', ') : itemForm.specs || ''}
          onChange={(e) =>
            setItemForm((prev) => ({
              ...prev,
              specs: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
            }))
          }
          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-mono"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">
          Proven Commercial Impact
        </label>
        <input
          type="text"
          value={itemForm.impact || ''}
          onChange={(e) => setItemForm((prev) => ({ ...prev, impact: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-bold text-emerald-700"
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 justify-end pt-4 border-t border-slate-200">
        <button
          onClick={() => {
            setEditingIndex(null);
            setItemForm(null);
          }}
          className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => saveListItem('beforeAfter')}
          className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center transition-all active:scale-[0.98]"
        >
          Save Project
        </button>
      </div>
    </div>
  );
}
