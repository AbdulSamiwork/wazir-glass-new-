import React from 'react';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import FeaturedProductForm from './products/FeaturedProductForm';

export default function FeaturedProductsEditor({
  featuredProducts,
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
  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-extrabold text-slate-850">Flagship Products Showcases</h3>
          <p className="text-xs text-slate-500 mt-1">Manage premium products list on landing section. Customize detailed features.</p>
        </div>

        {editingIndex === null && (
          <button
            onClick={() =>
              startAddListItem({
                title: 'New Aluminium Product',
                tagline: 'Premium Grade Product Slogan',
                description: 'Enter detail specifications and architectural applications of product.',
                useCase: 'Office, Commercial setups, residences.',
                specifications: 'Material thickness: 1.5mm - 2.0mm // Finish: Powder coat.',
                features: ['Quality tested', 'EPDM Seals', 'Custom locks'],
                image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80'
              })
            }
            className="self-start sm:self-auto min-h-[40px] flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold text-xs uppercase tracking-wider transition-colors border border-sky-100/80 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Flagship Product
          </button>
        )}
      </div>

      {editingIndex === null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(featuredProducts || []).map((prod, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-2xl flex flex-col justify-between border border-slate-200 bg-slate-50/30">
              <div>
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-full h-32 rounded-xl object-cover border border-slate-200 mb-4"
                  onError={(e) => (e.target.src = 'https://placehold.co/120x80?text=Product')}
                />
                <h4 className="font-extrabold text-slate-850 text-base">{prod.title}</h4>
                <span className="text-[10px] text-sky-600 block font-semibold mt-1">{prod.tagline}</span>
                <p className="text-xs text-slate-500 line-clamp-2 mt-3 leading-relaxed">{prod.description}</p>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200/60 mt-5 pt-4">
                <button
                  onClick={() => startEditListItem(idx, prod)}
                  className="min-h-[36px] flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 hover:text-sky-600 transition-colors shadow-2xs"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Modify
                </button>
                <button
                  onClick={() => deleteListItem('featuredProducts', idx)}
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
        <FeaturedProductForm
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
