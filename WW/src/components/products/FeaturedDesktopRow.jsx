import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Ruler, Check } from 'lucide-react';
import { getBannerUrl } from '../../utils/cloudinary';

export default function FeaturedDesktopRow({ prod, idx }) {
  const isEven = idx % 2 === 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      {/* Product Image Card Box */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -45 : 45 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        className={`lg:col-span-6 order-2 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
      >
        <div className="relative w-full aspect-[4/3] rounded-2xl border border-slate-200 overflow-hidden shadow-xl group">
          <img 
            src={getBannerUrl(prod.image || 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80', 800)}
            alt={prod.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
            decoding="async"
          />
          
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-30 pointer-events-none" />

          <div className="absolute top-4 left-4 z-10 bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            <span className="text-[9px] font-mono text-white tracking-wider">
              CODE // WZ-00{idx + 1}
            </span>
          </div>

          <div className="absolute top-4 right-4 z-10 bg-sky-500/95 backdrop-blur-md px-3 py-1 rounded-full border border-sky-400/20 flex items-center gap-1">
            <Sparkles className="w-3 h-3 fill-white text-white" />
            <span className="text-[9px] font-bold text-white uppercase tracking-wider">
              PREMIUM
            </span>
          </div>

          <div className="absolute bottom-0 inset-x-0 bg-slate-950/70 backdrop-blur-md border-t border-white/10 p-3.5 flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-wide text-slate-200">
              <Ruler className="w-3.5 h-3.5 text-sky-400" />
              <span>{prod.specifications}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Information content */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 45 : -45 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        className={`lg:col-span-6 order-1 ${isEven ? 'lg:order-2' : 'lg:order-1'} flex flex-col items-start text-left`}
      >
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-600 border border-sky-200 mb-3.5 uppercase">
          Flagship Design
        </span>
        <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 metallic-text mb-2">
          {prod.title}
        </h4>
        <p className="text-sky-600 font-semibold text-sm mb-4">
          {prod.tagline}
        </p>
        <p className="text-slate-700 leading-relaxed text-sm mb-6">
          {prod.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full mb-6">
          {prod.features.map((feat, fidx) => (
            <div key={fidx} className="flex items-start gap-2 text-xs">
              <div className="flex-shrink-0 w-4.5 h-4.5 rounded-full bg-emerald-50 border border-emerald-350 flex items-center justify-center text-emerald-650 mt-0.5">
                <Check className="w-3 h-3" />
              </div>
              <span className="text-slate-700 font-medium">{feat}</span>
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 w-full mb-8 text-xs text-left">
          <span className="font-bold text-sky-600">Best Use Case: </span>
          <span className="text-slate-700">{prod.useCase}</span>
        </div>

        <a
          href="#contact"
          className="min-h-[44px] flex items-center gap-2 px-6 py-3 rounded-full border border-sky-500/40 hover:border-sky-600 hover:bg-sky-500/5 text-sky-600 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-sky-500/5 hover:shadow-sky-500/10"
        >
          Request Free Quote
          <span>→</span>
        </a>
      </motion.div>
    </div>
  );
}
