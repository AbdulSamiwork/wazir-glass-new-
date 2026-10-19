import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MessageSquare } from 'lucide-react';
import { getLightboxUrl } from '../../utils/cloudinary';
import { getWhatsAppUrl } from '../../utils/phoneUtils';

export default function GalleryLightboxModal({ activeItem, onClose, whatsappNumber }) {
  useEffect(() => {
    if (activeItem) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activeItem, onClose]);

  if (typeof document === 'undefined') return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {activeItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-2xl lg:max-w-3xl max-h-[92vh] bg-white rounded-3xl relative flex flex-col border border-slate-200/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Glowing Ambient Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 flex-shrink-0" />

            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-100 flex-shrink-0 bg-white">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-full bg-sky-50 text-sky-600 font-extrabold text-[10px] tracking-widest uppercase border border-sky-100/80 font-mono">
                  {activeItem.category}
                </span>
                <span className="text-slate-400 text-xs hidden sm:inline">•</span>
                <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">PROJECT // WZ-GALLERY</span>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all active:scale-90"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
              {/* Lightbox Real Image */}
              <div className="w-full h-56 sm:h-72 rounded-2xl border border-slate-200 overflow-hidden relative shadow-inner group">
                <img
                  src={getLightboxUrl(activeItem.image, 1200)}
                  alt={activeItem.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-white">
                  <span className="text-xs font-mono font-bold tracking-wider drop-shadow-md">
                    SITE INSTALLATION
                  </span>
                  <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono border border-white/30">
                    VERIFIED WORK
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
                  {activeItem.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2.5 leading-relaxed font-sans">
                  {activeItem.desc} This project was executed utilizing high-grade raw components, featuring custom double perimeter locks, weather gasketing, and clear glass sheets with light reflection coatings.
                </p>
              </div>

              {/* Project Details Grid */}
              <div>
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 font-mono">
                  Project Specification & Quality Rating
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 sm:p-5 bg-slate-50/80 border border-slate-200/70 rounded-2xl">
                  <div className="flex flex-col bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider font-mono">
                      Project Scale / Sizing
                    </span>
                    <span className="text-slate-800 text-xs font-bold mt-0.5 font-mono">
                      {activeItem.size}
                    </span>
                  </div>
                  <div className="flex flex-col bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider font-mono">
                      Engineering Assurance
                    </span>
                    <span className="text-emerald-600 text-xs font-bold mt-0.5 font-sans">
                      ✓ 100% Quality & Safety Approved
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex flex-col sm:flex-row gap-3 px-5 sm:px-7 py-4 border-t border-slate-100 bg-slate-50/50 flex-shrink-0">
              <a
                href="#contact"
                onClick={onClose}
                className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-sky-500/20 active:scale-95 flex items-center justify-center gap-2 text-center"
              >
                <Phone className="w-4 h-4" />
                <span>Get Similar Estimate</span>
              </a>
              <a
                href={getWhatsAppUrl(whatsappNumber, `Hi, I am interested in Wazir's project: ${activeItem.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2 text-center"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
