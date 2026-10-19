import React from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { availableIcons } from './privacyIcons';

export default function PrivacySectionItem({
  sec,
  idx,
  totalSections,
  isExpanded,
  onToggleExpand,
  onSectionChange,
  onMoveSection,
  onRemoveSection,
  onAddItem,
  onRemoveItem,
  onItemChange
}) {
  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${
        isExpanded 
          ? 'border-emerald-300 bg-emerald-50/20 shadow-sm' 
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      {/* Header / Accordion Toggle */}
      <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onToggleExpand}
          className="flex items-center gap-3 text-left flex-1 min-w-0"
        >
          <span className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700 font-mono shrink-0">
            {idx + 1}
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-xs sm:text-sm font-bold text-slate-800 truncate">
              {sec.title || `Clause #${idx + 1}`}
            </div>
            <div className="text-[11px] text-slate-400 truncate">
              {Array.isArray(sec.items) && sec.items.length > 0 
                ? `${sec.items.length} bullet item${sec.items.length > 1 ? 's' : ''}` 
                : (sec.content ? sec.content.slice(0, 70) + '...' : 'No content')}
            </div>
          </div>
        </button>

        {/* Action buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            disabled={idx === 0}
            onClick={() => onMoveSection(idx, 'up')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
            title="Move Up"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            disabled={idx === totalSections - 1}
            onClick={() => onMoveSection(idx, 'down')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
            title="Move Down"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onRemoveSection(idx)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50"
            title="Delete Clause"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expanded Edit Form */}
      {isExpanded && (
        <div className="p-4 sm:p-6 border-t border-slate-100 flex flex-col gap-4 bg-white rounded-b-xl">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-8">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Clause Title</label>
              <input
                type="text"
                value={sec.title || ''}
                onChange={(e) => onSectionChange(idx, 'title', e.target.value)}
                placeholder="e.g. 1. Information We Collect"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Icon</label>
              <select
                value={sec.icon || 'ShieldCheck'}
                onChange={(e) => onSectionChange(idx, 'icon', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-medium"
              >
                {availableIcons.map(ic => (
                  <option key={ic.id} value={ic.id}>{ic.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Main Content (Paragraph Explanation)
            </label>
            <textarea
              rows={3}
              value={sec.content || ''}
              onChange={(e) => onSectionChange(idx, 'content', e.target.value)}
              placeholder="Type clause text here (can be left blank if using bullet points below)..."
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Bullet Items Manager */}
          <div className="border border-slate-100 rounded-xl p-3.5 sm:p-4 bg-slate-50/50 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Bullet Points / Detailed Items ({Array.isArray(sec.items) ? sec.items.length : 0})
              </span>
              <button
                type="button"
                onClick={() => onAddItem(idx)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Add Bullet Item</span>
              </button>
            </div>

            {Array.isArray(sec.items) && sec.items.length > 0 ? (
              <div className="flex flex-col gap-2.5">
                {sec.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="p-3 bg-white rounded-lg border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
                    <div className="sm:w-1/3 w-full">
                      <input
                        type="text"
                        value={item.label || ''}
                        onChange={(e) => onItemChange(idx, itemIdx, 'label', e.target.value)}
                        placeholder="Label (e.g. Data Deletion)"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-800"
                      />
                    </div>
                    <div className="sm:w-2/3 w-full flex items-center gap-2">
                      <input
                        type="text"
                        value={item.desc || item.description || ''}
                        onChange={(e) => onItemChange(idx, itemIdx, 'desc', e.target.value)}
                        placeholder="Description..."
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700"
                      />
                      <button
                        type="button"
                        onClick={() => onRemoveItem(idx, itemIdx)}
                        className="p-1 text-slate-400 hover:text-red-500 rounded"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 italic">No structured bullets added. You can leave this empty or click "Add Bullet Item" above.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
