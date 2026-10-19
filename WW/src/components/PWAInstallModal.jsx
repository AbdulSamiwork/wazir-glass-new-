import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, X, Download, Monitor, Sparkles, CheckCircle, Zap } from 'lucide-react';
import DeviceSetupGuide from './pwa/DeviceSetupGuide';

export default function PWAInstallModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('android');
  const [hasDirectPrompt, setHasDirectPrompt] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setActiveTab('ios');
    } else if (/android/.test(userAgent)) {
      setActiveTab('android');
    } else {
      setActiveTab('desktop');
    }

    const checkPrompt = () => {
      setHasDirectPrompt(!!window.deferredInstallPrompt);
    };

    checkPrompt();
    const interval = setInterval(checkPrompt, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const handleDirectInstall = async () => {
    if (window.deferredInstallPrompt) {
      window.deferredInstallPrompt.prompt();
      const { outcome } = await window.deferredInstallPrompt.userChoice;
      if (outcome === 'accepted') {
        window.deferredInstallPrompt = null;
        setHasDirectPrompt(false);
        onClose();
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = orig;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return typeof document !== 'undefined' && ReactDOM.createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
          className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700/80 shadow-2xl shadow-sky-500/10 rounded-3xl overflow-hidden z-10 text-white my-auto"
        >
          <div className="absolute -top-24 -right-24 w-56 h-56 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 z-20 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors border border-slate-700/50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-8 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 p-0.5 shadow-lg shadow-sky-500/25 shrink-0 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Smartphone className="w-7 h-7 text-sky-400 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/20 border border-sky-500/30 text-[11px] font-extrabold uppercase tracking-wider text-sky-300 mb-1">
                  <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" />
                  Instant App Access
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Install Wazir Glass App
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              Add our official architectural glazing catalog to your home screen for ultra-fast offline access, seamless 3D viewing, and native app performance.
            </p>

            {hasDirectPrompt && (
              <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-sky-900/40 via-blue-900/40 to-slate-900/40 border border-sky-500/40 shadow-lg shadow-sky-500/10">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 fill-sky-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">1-Click Install Available</h4>
                      <p className="text-xs text-sky-200/80">Your browser supports instant direct installation</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleDirectInstall}
                  className="mt-3 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Install App to Home Screen Now
                </button>
              </div>
            )}

            <div className="mt-6">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Select Your Device for Setup Guide:
              </h3>
              <div className="grid grid-cols-3 gap-2 p-1 bg-slate-950/80 rounded-2xl border border-slate-800">
                <button
                  onClick={() => setActiveTab('android')}
                  className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'android'
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <span>🤖</span> Android
                </button>
                <button
                  onClick={() => setActiveTab('ios')}
                  className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'ios'
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <span>🍎</span> iPhone / iPad
                </button>
                <button
                  onClick={() => setActiveTab('desktop')}
                  className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'desktop'
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" /> Desktop
                </button>
              </div>
            </div>

            <DeviceSetupGuide activeTab={activeTab} />

            <div className="mt-6 p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-sky-400 shrink-0" />
              <p className="text-xs text-slate-400 leading-normal">
                <span className="text-slate-200 font-semibold">100% Offline Capable:</span> Once installed, browse our complete product catalog and gallery even without an active internet connection.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-end">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm transition-colors border border-slate-700 cursor-pointer"
              >
                Got It, Close Guide
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
