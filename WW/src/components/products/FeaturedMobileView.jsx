import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Ruler, Check } from 'lucide-react';
import { getBannerUrl } from '../../utils/cloudinary';

export default function FeaturedMobileView({ featured, activeTab, setActiveTab }) {
  const activeProduct = featured[activeTab] || featured[0];

  return (
    <div className="block md:hidden">
      {/* Category Tabs */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 mb-6 pb-2 -mx-4 px-4 snap-x">
        {featured.map((prod, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`min-h-[44px] px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 snap-start flex items-center gap-1.5 border active:scale-95 ${
              activeTab === idx
                ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/20'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${activeTab === idx ? 'text-slate-950' : 'text-sky-500'}`} />
            <span>{prod.shortTitle || prod.title.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Active Product Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-lg shadow-slate-200/50 flex flex-col gap-4 text-left"
        >
          {/* Product Image */}
          <div className="relative w-full aspect-[16/10] rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <img 
              src={getBannerUrl(activeProduct.image || 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80', 600)}
              alt={activeProduct.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            
            {/* Top Badges */}
            <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono text-slate-200 font-semibold border border-white/10">
              CODE // WZ-00{activeTab + 1}
            </div>
            <div className="absolute top-3 right-3 bg-sky-500 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-black text-slate-950 uppercase tracking-wide flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3 text-slate-950" />
              <span>PREMIUM</span>
            </div>

            {/* Specifications Bar - readable, wraps cleanly without truncation */}
            <div className="absolute bottom-0 inset-x-0 bg-slate-950/85 backdrop-blur-md px-3 py-2 text-white flex items-start sm:items-center gap-2 border-t border-white/10 font-mono text-[11px] leading-snug">
              <Ruler className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5 sm:mt-0" />
              <span className="text-slate-200">
                {activeProduct.specifications}
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="inline-flex items-center gap-1 self-start px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200 mb-2 uppercase tracking-wide">
              <Sparkles className="w-3 h-3 text-sky-500" />
              Flagship Design
            </span>

            <h4 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug tracking-tight">
              {activeProduct.title}
            </h4>

            <p className="text-sky-600 font-bold text-xs sm:text-sm mt-1 mb-2.5">
              {activeProduct.tagline}
            </p>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
              {activeProduct.description}
            </p>

            {/* Features Checklist */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 mb-3.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-2">
                Engineering Highlights
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeProduct.features.map((feat, fidx) => (
                  <div key={fidx} className="flex items-center gap-2.5 text-xs text-slate-800 font-medium">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Use Case Box */}
            <div className="p-3 rounded-2xl border border-sky-100 bg-sky-50/60 text-xs mb-4">
              <span className="font-bold text-sky-700">Best Application: </span>
              <span className="text-slate-700 font-medium">{activeProduct.useCase}</span>
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              className="min-h-[46px] w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 active:scale-[0.98] transition-all"
            >
              <span>Request Free Quote</span>
              <span className="text-sm">→</span>
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
