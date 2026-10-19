import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, AlertCircle, ArrowRight, Package } from 'lucide-react';
import TrackingResultCard from './tracking/TrackingResultCard';
import { API_BASE_URL } from '../utils/apiConfig';

export default function ProjectTrackingModal({ isOpen, onClose, whatsappNumber }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setErrorMsg('');
    setResults(null);

    try {
      const res = await fetch(`${API_BASE_URL}?action=track_order&query=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (res.ok && data.success) {
        if (data.data && data.data.length > 0) {
          setResults(data.data);
        } else {
          setErrorMsg('No active project or quotation found matching this number. Please verify or contact support.');
        }
      } else {
        setErrorMsg(data.error || 'Failed to retrieve project tracking status.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error. Unable to connect to tracking server.');
    } finally {
      setLoading(false);
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
          className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 text-left my-auto max-h-[90vh] flex flex-col"
        >
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400" />

          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-slate-800/80 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-mono text-[10px] font-bold uppercase tracking-widest">
                    Live Portal
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Wazir Glass</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">Track My Project / Order</h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 flex flex-col gap-6">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Enter Quotation No (WG-...), Bill No (INV-...), or Phone..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-800/80 border border-slate-700/80 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 font-mono transition-all"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="px-6 py-3.5 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 disabled:opacity-50 text-slate-950 font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Check Status</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Error Message */}
            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            {/* Results Display */}
            {results && results.map((order, idx) => (
              <TrackingResultCard key={order.order_number || idx} order={order} whatsappNumber={whatsappNumber} />
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
