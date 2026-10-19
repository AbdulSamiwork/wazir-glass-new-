import React from 'react';
import { Trash2 } from 'lucide-react';

export default function InspectionItemCard({
  item,
  idx,
  itemsLength,
  handleItemChange,
  handleRemoveItem
}) {
  const isHardware = item.category === 'hardware';

  return (
    <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
      isHardware ? 'bg-amber-50/40 border-amber-200' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b border-slate-200/60">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
            {idx + 1}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
            {isHardware ? 'Hardware / Fitting' : 'Glass / Glazing'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={item.category || 'glazing'}
            onChange={(e) => handleItemChange(idx, 'category', e.target.value)}
            className="text-xs px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold shadow-xs outline-none"
          >
            <option value="glazing">🪟 Glazing / Glass</option>
            <option value="hardware">🔧 Hardware / Fitting</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 sm:gap-4">
        <div className="md:col-span-4">
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Location / Description *</label>
          <input
            type="text"
            required
            placeholder={isHardware ? "e.g. Heavy Duty Floor Spring Hinge" : "e.g. Ground Floor Entrance Door"}
            value={item.description}
            onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-bold shadow-sm focus:border-sky-500 outline-none"
          />
        </div>
        <div className="md:col-span-4">
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Spec / Glass Material *</label>
          <input
            type="text"
            required
            placeholder={isHardware ? "e.g. Dorma German Brand 150kg" : "e.g. 12mm Clear Tempered Glass"}
            value={item.specification}
            onChange={(e) => handleItemChange(idx, 'specification', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm shadow-sm focus:border-sky-500 outline-none"
          />
        </div>
        <div className="md:col-span-4">
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Profile / Fitting Notes</label>
          <input
            type="text"
            placeholder={isHardware ? "e.g. Floor box cutout required" : "e.g. Frameless Patch Fitting System"}
            value={item.profileOrNotes}
            onChange={(e) => handleItemChange(idx, 'profileOrNotes', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm shadow-sm focus:border-sky-500 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 items-end pt-1">
        {!isHardware && (
          <>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Width (ft)</label>
              <input
                type="number"
                step="any"
                placeholder="0"
                value={item.width}
                onChange={(e) => handleItemChange(idx, 'width', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-mono text-center shadow-sm focus:border-sky-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Height (ft)</label>
              <input
                type="number"
                step="any"
                placeholder="0"
                value={item.height}
                onChange={(e) => handleItemChange(idx, 'height', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-mono text-center shadow-sm focus:border-sky-500 outline-none"
              />
            </div>
          </>
        )}

        <div className={isHardware ? "md:col-span-2" : ""}>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
            {isHardware ? "Quantity *" : "Total Qty/Area *"}
          </label>
          <input
            type="number"
            required
            min="0.01"
            step="any"
            value={item.quantity}
            onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl bg-white border text-sm font-mono font-bold shadow-sm focus:border-sky-500 outline-none ${
              isHardware ? 'border-amber-300 text-amber-900' : 'border-sky-300 text-sky-900'
            }`}
          />
        </div>

        <div className={isHardware ? "md:col-span-2" : ""}>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Unit *</label>
          <select
            value={item.unit}
            onChange={(e) => handleItemChange(idx, 'unit', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm shadow-sm focus:border-sky-500 outline-none"
          >
            <option value="sft">Sft (Sq.Ft)</option>
            <option value="rft">Rft (Running Ft)</option>
            <option value="pcs">Pcs</option>
            <option value="set">Set</option>
            <option value="pair">Pair</option>
            <option value="box">Box</option>
            <option value="meter">Meter</option>
            <option value="kg">Kg</option>
            <option value="job">Job / Lump</option>
          </select>
        </div>

        <div className="flex items-center justify-center pb-2">
          <span className="font-bold text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            ✓ Ready for Quote
          </span>
        </div>

        <div className="flex justify-end pb-1 pr-1">
          <button
            type="button"
            onClick={() => handleRemoveItem(idx)}
            disabled={itemsLength <= 1}
            className={`p-3 rounded-xl border transition-colors ${
              itemsLength <= 1 
                ? 'border-slate-100 text-slate-300 cursor-not-allowed' 
                : 'border-slate-200 hover:border-red-200 hover:bg-red-50 text-red-500 cursor-pointer'
            }`}
            title="Remove Row"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
