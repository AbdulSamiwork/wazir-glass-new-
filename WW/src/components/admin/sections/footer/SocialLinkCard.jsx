import React from 'react';
import { ExternalLink, Trash2, Eye, EyeOff } from 'lucide-react';
import { SocialIcon } from '../../../footer/SocialIcons';

export default function SocialLinkCard({
  item,
  index,
  onToggle,
  onUrlChange,
  onRemove,
  isCustom = false
}) {
  const isEnabled = item.enabled !== false;

  return (
    <div className={`p-4 rounded-xl border transition-all duration-200 ${
      isEnabled 
        ? 'bg-white border-slate-200/90 shadow-2xs' 
        : 'bg-slate-50/70 border-slate-200/50 opacity-75'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
            isEnabled 
              ? 'bg-sky-50 text-sky-600 border-sky-200/60' 
              : 'bg-slate-100 text-slate-400 border-slate-200'
          }`}>
            <SocialIcon id={item.id} className="w-4.5 h-4.5" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-slate-800 flex items-center gap-2">
              <span>{item.name || item.id}</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                isEnabled ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
              }`}>
                {isEnabled ? 'Visible in Footer' : 'Hidden'}
              </span>
            </h5>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
              ID: {item.id}
            </span>
          </div>
        </div>

        {/* Toggle & Action Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            type="button"
            onClick={() => onToggle(index)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[34px] cursor-pointer ${
              isEnabled
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
            title={isEnabled ? "Click to Hide from Footer" : "Click to Show in Footer"}
          >
            {isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{isEnabled ? 'Show' : 'Hide'}</span>
          </button>

          {isCustom && onRemove && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              title="Remove this social link"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* URL Input */}
      <div className="relative flex items-center gap-2">
        <input
          type="url"
          value={item.url || ''}
          onChange={(e) => onUrlChange(index, e.target.value)}
          placeholder={`https://${item.id}.com/your-page`}
          className="w-full px-3.5 py-2 text-xs rounded-lg bg-slate-50/50 border border-slate-200 text-slate-800 focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
        />
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors shrink-0"
            title="Open link in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
