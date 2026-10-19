import React from 'react';
import { motion } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import { getThumbnailUrl } from '../../utils/cloudinary';

export default function GalleryCard({ proj, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      onClick={() => onClick(proj)}
      className="glass-panel glass-panel-hover p-5 sm:p-6 rounded-2xl group cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[380px] sm:min-h-[400px] active:scale-[0.98] transition-all"
    >
      {/* Project Image Panel */}
      <div className="w-full h-48 sm:h-56 rounded-xl border border-slate-200 relative overflow-hidden mb-4 flex items-center justify-center transition-all flex-shrink-0">
        <img 
          src={getThumbnailUrl(proj.image, 500)} 
          alt={proj.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          decoding="async"
        />
        {/* Zoom indicator hover overlay */}
        <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg">
            <ZoomIn className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="text-left flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-mono text-cyan-600 font-bold uppercase tracking-wider block mb-1">
            {proj.category}
          </span>
          <h4 className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-cyan-600 transition-colors">
            {proj.title}
          </h4>
          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
            {proj.desc}
          </p>
        </div>
        
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
          <span className="text-[10px] text-slate-400 font-mono">
            Dimensions: {proj.size}
          </span>
          <span className="text-cyan-600 font-bold flex items-center gap-1">
            Inspect <span>→</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
