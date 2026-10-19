import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Smartphone, X } from 'lucide-react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import NetworkStatusToasts from './pwa/NetworkStatusToasts';
import UpdateAvailableToast from './pwa/UpdateAvailableToast';

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showOnlineRecovery, setShowOnlineRecovery] = useState(false);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered:', r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      window.deferredInstallPrompt = e;
      if (!sessionStorage.getItem('pwa_banner_dismissed')) {
        setShowInstallBanner(true);
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      setDeferredPrompt(null);
      window.deferredInstallPrompt = null;
    };

    const handleOffline = () => {
      setIsOffline(true);
      setShowOnlineRecovery(false);
    };

    const handleOnline = () => {
      setIsOffline(false);
      setShowOnlineRecovery(true);
      const timer = setTimeout(() => setShowOnlineRecovery(false), 4000);
      return () => clearTimeout(timer);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  const handleInstallClick = async () => {
    const promptToUse = deferredPrompt || window.deferredInstallPrompt;
    if (!promptToUse) {
      window.dispatchEvent(new CustomEvent('open-pwa-modal'));
      return;
    }
    promptToUse.prompt();
    const { outcome } = await promptToUse.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setShowInstallBanner(false);
      window.deferredInstallPrompt = null;
    } else {
      window.dispatchEvent(new CustomEvent('open-pwa-modal'));
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    sessionStorage.setItem('pwa_banner_dismissed', 'true');
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none pr-6 sm:pr-0">
      <NetworkStatusToasts isOffline={isOffline} showOnlineRecovery={showOnlineRecovery} />

      <UpdateAvailableToast
        needRefresh={needRefresh}
        setNeedRefresh={setNeedRefresh}
        updateServiceWorker={updateServiceWorker}
      />

      {/* PWA Install Banner */}
      <AnimatePresence>
        {showInstallBanner && !isInstalled && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
            className="pointer-events-auto bg-slate-900/95 text-white border border-slate-700/80 shadow-2xl shadow-sky-500/10 rounded-3xl p-5 backdrop-blur-2xl relative overflow-hidden group"
          >
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-sky-500/15 rounded-full blur-2xl pointer-events-none group-hover:bg-sky-500/25 transition-all duration-500" />

            <button
              onClick={handleDismiss}
              aria-label="Close install banner"
              className="absolute top-3.5 right-3.5 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 p-0.5 shadow-lg shadow-sky-500/25 shrink-0 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-sky-400" />
                </div>
              </div>

              <div className="flex-1 pr-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full border border-sky-500/30">
                    PWA App
                  </span>
                </div>
                <h3 className="font-bold text-base text-white mt-1 leading-snug">
                  Install Wazir Glass
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Add our official app to your home screen for instant offline access, catalog viewing, and faster performance.
                </p>

                <div className="mt-4 flex items-center gap-2.5">
                  <button
                    onClick={handleInstallClick}
                    className="flex-1 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 group/btn cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    Install Free App
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
