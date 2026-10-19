import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { getThemeStyles } from './modal/modalThemeStyles';

export default function ThemeModal() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'alert', // 'alert' or 'confirm'
    type: 'info', // 'success', 'error', 'info', 'confirm', 'warning'
    title: '',
    message: '',
    resolve: null
  });

  useEffect(() => {
    // 1. Listen for custom event
    const handleModalEvent = (e) => {
      const { mode, message, title, type, resolve } = e.detail;
      setModalState({
        isOpen: true,
        mode: mode || 'alert',
        type: type || 'info',
        title: title || (type === 'success' ? 'Success!' : type === 'error' ? 'Attention Required' : 'System Notice'),
        message: String(message),
        resolve: resolve || null
      });
    };

    window.addEventListener('wazir-theme-modal', handleModalEvent);

    // 2. Override window.alert globally
    window.alert = (message) => {
      let type = 'info';
      let title = 'System Notice';
      const str = String(message).toLowerCase();
      
      if (str.includes('success') || str.includes('saved') || str.includes('created') || str.includes('downloaded') || str.includes('updated') || str.includes('deleted successfully') || str.includes('marked as')) {
        type = 'success';
        title = 'Success!';
      } else if (str.includes('fail') || str.includes('error') || str.includes('not found') || str.includes('please') || str.includes('required') || str.includes('cannot') || str.includes('invalid') || str.includes('unreachable') || str.includes('issue') || str.includes('not linked')) {
        type = 'error';
        title = 'Attention Required';
      }

      window.dispatchEvent(new CustomEvent('wazir-theme-modal', {
        detail: { mode: 'alert', message, type, title }
      }));
    };

    // 3. Provide window.customConfirm globally
    window.customConfirm = (message, title = "Confirmation Required") => {
      return new Promise((resolve) => {
        window.dispatchEvent(new CustomEvent('wazir-theme-modal', {
          detail: { mode: 'confirm', message, title, type: 'confirm', resolve }
        }));
      });
    };

    return () => {
      window.removeEventListener('wazir-theme-modal', handleModalEvent);
    };
  }, []);

  useEffect(() => {
    if (modalState.isOpen) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = orig; };
    }
  }, [modalState.isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!modalState.isOpen) return;
      if (e.key === 'Escape') handleClose(false);
      if (e.key === 'Enter' && modalState.mode === 'alert') handleClose(true);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalState.isOpen]);

  const handleClose = (result = false) => {
    if (modalState.resolve) {
      modalState.resolve(result);
    }
    setModalState(prev => ({ ...prev, isOpen: false, resolve: null }));
  };

  const theme = getThemeStyles(modalState.type);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {modalState.isOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => handleClose(false)}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-gradient-to-br from-slate-900 via-slate-900/98 to-slate-950 rounded-3xl border border-slate-700/80 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden z-10"
          >
            {/* Top glowing gradient bar */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${theme.bar}`} />

            {/* Close button for alert */}
            {modalState.mode === 'alert' && (
              <button
                onClick={() => handleClose(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <div className="p-6 md:p-8 flex flex-col items-center text-center">
              {/* Icon */}
              <div className={`p-4 rounded-2xl border mb-5 ${theme.iconBg} shadow-lg shadow-black/20 animate-pulse`}>
                {theme.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2 font-outfit">
                {modalState.title}
              </h3>

              {/* Message */}
              <p className="text-slate-300 font-medium text-sm md:text-base leading-relaxed mb-8 max-w-sm">
                {modalState.message}
              </p>

              {/* Actions */}
              {modalState.mode === 'alert' ? (
                <button
                  onClick={() => handleClose(true)}
                  className={`w-full py-3.5 px-6 rounded-xl bg-gradient-to-r ${theme.btn} font-bold shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2`}
                >
                  OK, Close
                </button>
              ) : (
                <div className="flex items-center gap-4 w-full">
                  <button
                    onClick={() => handleClose(false)}
                    className="flex-1 py-3.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-600/60 text-slate-300 hover:text-white font-semibold transition-all transform hover:scale-[1.02] active:scale-95"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleClose(true)}
                    className={`flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r ${theme.btn} font-bold shadow-lg transition-all transform hover:scale-[1.02] active:scale-95`}
                  >
                    Yes, Confirm
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
