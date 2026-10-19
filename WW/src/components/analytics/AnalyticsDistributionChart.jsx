import React from 'react';
import { PieChart } from 'lucide-react';

export default function AnalyticsDistributionChart({ stats }) {
  if (!stats?.categories || Object.keys(stats.categories).length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <PieChart className="w-4 h-4 text-sky-500" />
        <span>Service Request Breakdown</span>
      </h4>
      <div className="flex flex-col gap-3">
        {Object.entries(stats.categories).map(([category, count]) => {
          const percentage = Math.round((count / (stats.total || 1)) * 100);
          return (
            <div key={category} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="truncate pr-2">{category}</span>
                <span className="font-mono text-slate-500 shrink-0">
                  {count} leads ({percentage}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
