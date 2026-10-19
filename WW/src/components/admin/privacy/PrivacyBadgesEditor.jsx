import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { availableIcons } from './privacyIcons';

export default function PrivacyBadgesEditor({
  trustBadges,
  onAddBadge,
  onRemoveBadge,
  onBadgeChange
}) {
  return (
    <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-5">
      <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-emerald-500 rounded-full"></span>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-800">2. Security & Trust Badges</h3>
        </div>
        <button
          type="button"
          onClick={onAddBadge}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Badge</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trustBadges.map((badge, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 relative group flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-600 font-mono">Badge #{idx + 1}</span>
              {trustBadges.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemoveBadge(idx)}
                  className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors"
                  title="Remove Badge"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Icon</label>
              <select
                value={badge.icon || 'ShieldCheck'}
                onChange={(e) => onBadgeChange(idx, 'icon', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-medium"
              >
                {availableIcons.map(ic => (
                  <option key={ic.id} value={ic.id}>{ic.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Badge Title</label>
              <input
                type="text"
                value={badge.label || ''}
                onChange={(e) => onBadgeChange(idx, 'label', e.target.value)}
                placeholder="e.g. SSL Encrypted"
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Subtext</label>
              <input
                type="text"
                value={badge.sub || ''}
                onChange={(e) => onBadgeChange(idx, 'sub', e.target.value)}
                placeholder="e.g. Secure Data Transfer"
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
