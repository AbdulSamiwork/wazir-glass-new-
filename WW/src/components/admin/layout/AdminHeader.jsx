import React from 'react';
import { Save, Loader, CheckCircle, AlertTriangle, ArrowLeft, LogOut } from 'lucide-react';
import Logo from '../../Logo';

export default function AdminHeader({
  onToggleSidebar,
  saveStatus,
  onSave,
  isSaving,
  onLogout
}) {
  return (
    <header className="sticky top-0 z-[30] px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between flex-shrink-0 bg-white/95 border-b border-slate-200/80 backdrop-blur-md shadow-xs">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden w-9 h-9 rounded-xl border border-slate-200/90 bg-slate-50/60 hover:bg-slate-100 text-slate-700 hover:text-sky-600 transition-colors shadow-2xs shrink-0 flex items-center justify-center active:scale-95"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <Logo className="w-8 h-8 sm:w-9 sm:h-9 text-sm sm:text-base" />

        <div className="min-w-0">
          <span className="font-black text-xs tracking-wider text-slate-900 uppercase block font-outfit sm:hidden whitespace-nowrap">
            Wazir Admin
          </span>
          <span className="font-black text-sm tracking-wide text-slate-900 uppercase hidden sm:block font-outfit truncate">
            Wazir Executive Panel
          </span>
          <span className="text-[9px] font-bold text-sky-600 uppercase tracking-widest font-mono hidden md:block">
            Dynamic Content & CRM Engine
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {saveStatus?.message && (
          <div className={`hidden md:flex px-3 py-1.5 rounded-xl text-xs items-center gap-1.5 border ${
            saveStatus.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm' 
              : saveStatus.type === 'info'
              ? 'bg-sky-50 border-sky-200 text-sky-700 shadow-sm'
              : 'bg-red-50 border-red-200 text-red-700 shadow-sm'
          } backdrop-blur-md`}>
            {saveStatus.type === 'success' ? (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            ) : saveStatus.type === 'info' ? (
              <Loader className="w-3.5 h-3.5 text-sky-600 animate-spin" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            )}
            <span className="font-bold text-[11px]">{saveStatus.message}</span>
          </div>
        )}

        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 text-white font-black text-xs uppercase tracking-wider shadow-sm shadow-sky-500/20 active:scale-95 transition-all disabled:opacity-50 shrink-0"
        >
          {isSaving ? <Loader className="w-3.5 h-3.5 animate-spin text-white" /> : <Save className="w-3.5 h-3.5 text-white" />}
          <span className="hidden sm:inline">Save Website Changes</span>
          <span className="sm:hidden text-[11px] font-bold">Save</span>
        </button>

        <button
          onClick={() => {
            window.location.href = '/#home';
          }}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-sky-600 font-bold text-xs uppercase tracking-wider transition-all shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-sky-500" />
          Website
        </button>

        <button
          onClick={onLogout}
          className="w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-xl border border-slate-200 bg-white hover:border-red-200 hover:bg-red-50 text-slate-500 hover:text-red-600 transition-all shadow-2xs flex items-center justify-center shrink-0 active:scale-95"
          title="Log Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
