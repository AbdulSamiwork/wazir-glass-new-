import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Sparkles } from 'lucide-react';

export default function UpdateAvailableToast({ needRefresh, setNeedRefresh, updateServiceWorker }) {
  return (
    <AnimatePresence>
      {needRefresh && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="pointer-events-auto bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border border-sky-500/50 shadow-2xl shadow-sky-500/20 rounded-2xl p-4 backdrop-blur-xl"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
              <RefreshCw className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-white flex items-center gap-1.5">
                Update Available <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                A newer version of Wazir Glass app is ready with latest features.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => updateServiceWorker(true)}
                  className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-medium text-xs px-3.5 py-2 rounded-xl transition-all shadow-md shadow-sky-500/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reload & Update
                </button>
                <button
                  onClick={() => setNeedRefresh(false)}
                  className="text-xs text-slate-400 hover:text-white px-2.5 py-2 transition-colors cursor-pointer"
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
