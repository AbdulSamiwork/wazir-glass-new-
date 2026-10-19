import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function AdditionalNumbersEditor({
  additionalNumbers,
  handleNumChange,
  addNumber,
  removeNumber
}) {
  return (
    <div className="mt-4 border-t border-slate-100 pt-4">
      <label className="block text-xs font-semibold text-slate-600 mb-2">
        Additional Contact Numbers
      </label>
      <div className="flex flex-col gap-2.5">
        {additionalNumbers.map((num, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row gap-2 sm:items-center p-2.5 sm:p-0 bg-slate-50 sm:bg-transparent rounded-xl border sm:border-0 border-slate-200"
          >
            <input
              type="text"
              value={num.name || ''}
              onChange={(e) => handleNumChange(idx, 'name', e.target.value)}
              className="w-full sm:w-1/3 px-3 py-2 rounded-xl bg-white sm:bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-sky-500 outline-none"
              placeholder="Name (e.g. Manager)"
            />
            <input
              type="text"
              value={num.phone || ''}
              onChange={(e) => handleNumChange(idx, 'phone', e.target.value)}
              className="w-full sm:flex-1 px-3 py-2 rounded-xl bg-white sm:bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:border-sky-500 outline-none"
              placeholder="Display Phone"
            />
            <input
              type="text"
              value={num.phoneCall || ''}
              onChange={(e) => handleNumChange(idx, 'phoneCall', e.target.value)}
              className="w-full sm:flex-1 px-3 py-2 rounded-xl bg-white sm:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-mono focus:border-sky-500 outline-none"
              placeholder="tel: link"
            />
            <button
              type="button"
              onClick={() => removeNumber(idx)}
              className="self-end sm:self-auto p-2 rounded-xl border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addNumber}
          className="self-start mt-1 flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-semibold transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Another Phone Number
        </button>
      </div>
    </div>
  );
}
