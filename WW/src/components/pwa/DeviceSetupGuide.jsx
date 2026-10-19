import React from 'react';
import { MoreVertical, Share2 } from 'lucide-react';

export default function DeviceSetupGuide({ activeTab }) {
  if (activeTab === 'android') {
    return (
      <div className="mt-4 space-y-3">
        <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
            1
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              Open Chrome Menu <MoreVertical className="w-4 h-4 text-sky-400 inline" />
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Tap the three dots icon (<span className="text-slate-200 font-semibold">⋮</span>) in the top-right corner of your browser.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
            2
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-100">
              Select Install Option
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Tap <span className="text-sky-300 font-semibold">'Install app'</span> or <span className="text-sky-300 font-semibold">'Add to Home screen'</span> from the dropdown list.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
            ✓
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-emerald-300">
              Confirm Installation
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Tap <span className="text-emerald-300 font-semibold">'Install'</span> on the popup. The Wazir Glass app icon will appear on your home screen!
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'ios') {
    return (
      <div className="mt-4 space-y-3">
        <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
            1
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              Tap Share Button <Share2 className="w-4 h-4 text-sky-400 inline" />
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Tap the Share icon (<span className="text-slate-200 font-semibold">↑ inside square</span>) at the bottom center of Safari.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
            2
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-100">
              Scroll to 'Add to Home Screen'
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Scroll down the menu list and tap <span className="text-sky-300 font-semibold">'Add to Home Screen'</span> (⊕ icon).
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
            ✓
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-emerald-300">
              Tap 'Add' in Top Right
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Tap <span className="text-emerald-300 font-semibold">'Add'</span> in the top-right corner. Enjoy instant standalone access on your iPhone or iPad!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3.5">
        <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
          1
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-slate-100">
            Locate Install Icon in Address Bar
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Look at the top-right corner of your browser's address bar (Chrome, Edge, or Brave).
          </p>
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3.5">
        <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
          2
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-slate-100">
            Click the App Icon (⊕ or 💻)
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Click the small desktop display or plus symbol (<span className="text-sky-300 font-semibold">Install Wazir Glass & Aluminium</span>).
          </p>
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3.5">
        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
          ✓
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-emerald-300">
            Click 'Install' in Dialog
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Confirm by clicking <span className="text-emerald-300 font-semibold">'Install'</span>. The app will open in its own clean window and pin to your taskbar!
          </p>
        </div>
      </div>
    </div>
  );
}
