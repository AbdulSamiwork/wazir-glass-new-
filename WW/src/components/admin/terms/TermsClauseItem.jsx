import React from 'react';
import { Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { availableIcons } from './termsIcons';

export default function TermsClauseItem({
  sec,
  idx,
  totalSections,
  isExpanded,
  onToggleExpand,
  onSectionChange,
  onMoveSection,
  onRemoveSection
}) {
  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${
        isExpanded 
          ? 'border-sky-300 bg-sky-50/20 shadow-sm' 
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
          <span className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-xs font-bold text-sky-700 font-mono shrink-0">
            {idx + 1}
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-xs sm:text-sm font-bold text-slate-800 truncate">
              {sec.title || `Clause #${idx + 1}`}
            </div>
            <div className="text-[11px] text-slate-400 truncate">
              {sec.content ? sec.content.slice(0, 80) + '...' : 'Empty clause'}
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
                placeholder="e.g. 1. Introduction & Acceptance"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Icon</label>
              <select
                value={sec.icon || 'FileText'}
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
              Clause Body Text (Supports multi-line text)
            </label>
            <textarea
              rows={6}
              value={sec.content || ''}
              onChange={(e) => onSectionChange(idx, 'content', e.target.value)}
              placeholder="Type clause text here..."
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 font-sans"
            />
          </div>
        </div>
      )}
    </div>
  );
}
