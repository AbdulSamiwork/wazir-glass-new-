import React from 'react';
import { Plus, Ruler } from 'lucide-react';
import InspectionItemCard from './InspectionItemCard';

export default function InspectionItemsTable({
  items,
  handleAddItem,
  handleRemoveItem,
  handleItemChange,
  getTotalGlazingArea,
  getTotalHardwareCount
}) {
  return (
    <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h4 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Ruler className="w-4 h-4 text-sky-500" />
            2. Site Measurement Items & Hardware Schedule
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Record glass dimensions for auto-area calculation, or add required hardware fixtures.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddItem}
          className="min-h-[44px] px-4 py-2 bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Item Line
        </button>
      </div>

      {/* Dynamic Item Cards List */}
      <div className="space-y-4">
        {items.map((item, idx) => (
          <InspectionItemCard
            key={item.id || idx}
            item={item}
            idx={idx}
            itemsLength={items.length}
            handleItemChange={handleItemChange}
            handleRemoveItem={handleRemoveItem}
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 mt-2">
        <span className="text-xs text-slate-500">
          Tip: Glazing dimensions auto-calculate square footage, while hardware items count as standalone units.
        </span>
        <div className="flex items-center gap-6 text-sm">
          <span className="text-slate-600">
            Total Glazing Area: <strong className="text-sky-700 font-mono text-base">{getTotalGlazingArea(items)} Sft</strong>
          </span>
          <span className="text-slate-600">
            Total Hardware Items: <strong className="text-amber-700 font-mono text-base">{getTotalHardwareCount(items)} Units</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
