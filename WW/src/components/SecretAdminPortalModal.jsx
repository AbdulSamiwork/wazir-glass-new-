import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ShieldAlert, Lock, Unlock, Key, CheckCircle2, AlertTriangle, X, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SecretAdminPortalModal({ isOpen, onClose }) {
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setPasscode('');
      setErrorMsg('');
      setIsSuccess(false);
      const orig = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape' && !isSuccess) onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = orig;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose, isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanCode = passcode.trim().toLowerCase();

    // Accepted secret passkeys for admin
    const validKeys = ['wazirglass', 'wazirglass2026', 'wazir786', 'wazir2026', 'admin2026', 'secret786'];

    if (validKeys.includes(cleanCode)) {
      setIsSuccess(true);
      setErrorMsg('');
      sessionStorage.setItem('wazir_secret_portal_unlocked', 'true');
      
      setTimeout(() => {
        onClose();
        window.location.hash = '#wazirglass';
      }, 1200);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setErrorMsg(`Invalid security passkey. Attempt ${newAttempts}/3`);
      setPasscode('');

      if (newAttempts >= 3) {
        setTimeout(() => {
          onClose();
          window.location.hash = '#home';
        }, 1000);
      }
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget && !isSuccess) onClose();
        }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="relative w-full max-w-md p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-sky-500/30 rounded-3xl shadow-2xl shadow-sky-500/10 text-white overflow-hidden text-center"
        >
          {/* Background subtle glowing glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Close button */}
          {!isSuccess && (
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {isSuccess ? (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="py-6 flex flex-col items-center gap-4"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20 animate-pulse">
                <Unlock className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-white tracking-wide">
                ACCESS VERIFIED
              </h3>
              <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                Opening Secure Control Room...
              </p>
            </motion.div>
          ) : (
            <>
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-inner">
                <ShieldAlert className="w-8 h-8" />
              </div>

              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sky-400 block mb-1">
                Classified Security Gate
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide mb-2">
                RESTRICTED AREA
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Wazir Glass &amp; Aluminium Administration Portal. Direct URL access is prohibited. Enter authorized personnel passkey to proceed.
              </p>

              {errorMsg && (
                <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center justify-center gap-2 font-semibold">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative flex items-center">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <Key className="w-5 h-5" />
                  </div>
                  <input
                    type={showPasscode ? 'text' : 'password'}
                    autoFocus
                    required
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter Secret Passkey..."
                    className="w-full pl-12 pr-12 py-3.5 bg-slate-950/80 border border-slate-700/80 rounded-2xl text-white placeholder-slate-500 text-sm font-mono tracking-wider focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all text-center"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasscode(p => !p)}
                    tabIndex={-1}
                    className="absolute right-3.5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors focus:outline-none"
                    aria-label={showPasscode ? "Hide passkey" : "Show passkey"}
                  >
                    {showPasscode ? (
                      <EyeOff className="w-4.5 h-4.5 text-slate-400" />
                    ) : (
                      <Eye className="w-4.5 h-4.5 text-slate-500" />
                    )}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg shadow-sky-500/20 active:scale-[0.99]"
                >
                  Unlock Admin Portal
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Triggers: 4x Logo Click</span>
                <span>Key: waziradmin / Ctrl+Shift+X</span>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
