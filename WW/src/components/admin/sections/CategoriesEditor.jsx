import React from 'react';

export default function CategoriesEditor({
  categories,
  onArrayChange,
  onFileUpload
}) {
  if (!Array.isArray(categories)) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-extrabold text-slate-850">Product Catalogue Categories</h3>
          <p className="text-xs text-slate-500 mt-1">Manage the catalog classifications (12 items grid).</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {categories.map((cat, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-slate-50/50 border border-slate-200">
            <div className="flex items-center gap-4 border-b border-slate-200/60 pb-4 mb-4">
              <span className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-xs font-mono font-bold text-sky-600 border border-sky-100">
                {idx + 1}
              </span>
              <h4 className="text-sm font-extrabold text-slate-850">{cat.name || 'Unnamed Category'}</h4>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider ml-auto font-bold bg-slate-100 px-2.5 py-1 rounded text-slate-600 border border-slate-200">
                {cat.meta}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              <div className="md:col-span-4">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Category Image</label>
                <div className="flex flex-col gap-2">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-24 rounded-xl object-cover border border-slate-200"
                    onError={(e) => e.target.src = 'https://placehold.co/120x80?text=Category+Image'}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    id={`upload-cat-${idx}`}
                    className="hidden"
                    onChange={(e) => onFileUpload(e, (url) => {
                      onArrayChange('categories', idx, 'image', url);
                    })}
                  />
                  <label
                    htmlFor={`upload-cat-${idx}`}
                    className="text-center py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    Upload Image
                  </label>
                </div>
              </div>

              <div className="md:col-span-8 flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Category Name</label>
                  <input
                    type="text"
                    value={cat.name || ''}
                    onChange={(e) => onArrayChange('categories', idx, 'name', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Short Description</label>
                  <input
                    type="text"
                    value={cat.description || ''}
                    onChange={(e) => onArrayChange('categories', idx, 'description', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Detailed Summary (Modal)</label>
                  <textarea
                    rows="2"
                    value={cat.details || ''}
                    onChange={(e) => onArrayChange('categories', idx, 'details', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
