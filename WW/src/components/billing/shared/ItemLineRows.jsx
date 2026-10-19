import React from 'react';
import { Trash2 } from 'lucide-react';

export default function ItemLineRows({ items, setItems }) {
  const addItem = () => {
    const newItem = {
      id: `item-${Date.now()}-${Math.random()}`,
      description: '',
      quantity: 1,
      unit: 'sft',
      rate: '',
      amount: 0
    };
    setItems(prev => [...prev, newItem]);
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          const qty = parseFloat(field === 'quantity' ? value : updated.quantity) || 0;
          const rate = parseFloat(field === 'rate' ? value : updated.rate) || 0;
          updated.amount = qty * rate;
        }
        return updated;
      }
      return item;
    }));
  };

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-200/80 flex flex-col gap-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h4 className="text-sm font-bold text-sky-600 uppercase tracking-wider">3. Item lines</h4>
        <button 
          type="button"
          onClick={addItem}
          className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:text-sky-600 text-slate-650 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
        >
          + Add Row
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item, idx) => (
          <div key={item.id} className="p-4 sm:p-5 rounded-2xl bg-slate-50/60 border border-slate-200/70 flex flex-col gap-3.5 relative">
            <div className="w-full">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase">Item #{idx + 1} Description *</label>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="sm:hidden text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1"
                  title="Remove Item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
              <input
                type="text"
                required
                placeholder="Glass type, frames, sizes..."
                value={item.description}
                onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm shadow-sm focus:border-sky-500 focus:ring-sky-500 focus:ring-1 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-end mt-0.5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Qty *</label>
                <input
                  type="number"
                  required
                  min="0.01"
                  step="any"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-mono shadow-sm focus:border-sky-500 focus:ring-sky-500 focus:ring-1 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Unit *</label>
                <select
                  value={item.unit}
                  onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm shadow-sm focus:border-sky-500 focus:ring-sky-500 focus:ring-1 outline-none"
                >
                  <option value="sft">Sft</option>
                  <option value="rft">Rft</option>
                  <option value="pcs">Pcs</option>
                  <option value="box">Box</option>
                  <option value="kg">Kg</option>
                  <option value="ltr">Ltr</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Rate (PKR) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="any"
                  placeholder="Rate"
                  value={item.rate}
                  onChange={(e) => updateItem(item.id, 'rate', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-mono shadow-sm focus:border-sky-500 focus:ring-sky-500 focus:ring-1 outline-none"
                />
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-2 bg-white sm:bg-transparent px-3 py-2 sm:p-0 rounded-xl border sm:border-0 border-slate-200/80">
                <div className="flex flex-col items-start sm:items-end">
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Amount</span>
                  <span className="font-bold text-xs sm:text-sm text-slate-800 font-mono">
                    PKR {(parseFloat(item.amount) || 0).toLocaleString('en-US')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="hidden sm:flex p-2.5 rounded-xl border border-slate-200 hover:border-red-200 hover:bg-red-50 text-red-500 transition-colors shrink-0"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="py-8 text-center text-slate-400 text-sm">
            No items added yet. Click "+ Add Row" to define line items.
          </div>
        )}
      </div>
    </div>
  );
}
