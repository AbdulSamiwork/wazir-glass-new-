import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi } from 'lucide-react';

export default function NetworkStatusToasts({ isOffline, showOnlineRecovery }) {
  return (
    <>
      {/* Offline Status Toast */}
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="pointer-events-auto bg-slate-900/95 text-white border border-rose-500/40 shadow-2xl shadow-rose-500/10 rounded-2xl p-4 backdrop-blur-xl flex items-center gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <WifiOff className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-slate-100 flex items-center gap-1.5">
                Offline Mode
              </h4>
              <p className="text-xs text-slate-400 truncate">
                Browsing cached Wazir architectural catalog
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back Online Recovery Toast */}
      <AnimatePresence>
        {showOnlineRecovery && !isOffline && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="pointer-events-auto bg-slate-900/95 text-white border border-emerald-500/40 shadow-2xl shadow-emerald-500/10 rounded-2xl p-4 backdrop-blur-xl flex items-center gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Wifi className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-emerald-300">
                Back Online!
              </h4>
              <p className="text-xs text-slate-400 truncate">
                Live connection restored
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
