import React from 'react';
import { Search, Filter } from 'lucide-react';

export default function AnalyticsFilterBar({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  serviceFilter,
  setServiceFilter,
  inquiriesLength,
  stats
}) {
  return (
    <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
      {/* Search */}
      <div className="relative w-full lg:w-80">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder="Search by name, phone, service..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-8 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all font-medium bg-slate-50/50"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm font-bold w-5 h-5 flex items-center justify-center"
          >
            ×
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:flex items-center gap-2.5 w-full lg:w-auto">
        <div className="hidden md:flex items-center gap-1.5 text-xs font-bold text-slate-500 shrink-0">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span>Filters:</span>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-auto px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:border-sky-500"
        >
          <option value="ALL">All Statuses ({inquiriesLength})</option>
          <option value="New">🟡 New ({stats.newCount})</option>
          <option value="Contacted">🔵 Contacted ({stats.contactedCount})</option>
          <option value="Quoted">🟣 Quoted ({stats.quotedCount})</option>
          <option value="Converted (Won)">🟢 Won ({stats.wonCount})</option>
          <option value="Closed (Lost)">🔴 Lost</option>
        </select>

        <select
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
          className="w-full md:w-auto px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:border-sky-500 truncate"
        >
          <option value="ALL">All Categories</option>
          {Object.keys(stats.categories || {}).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
