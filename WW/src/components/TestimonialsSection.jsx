import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { getThumbnailUrl } from '../utils/cloudinary';

export default function TestimonialsSection({ data }) {
  const defaultReviews = [
    {
      name: "Ahmed Raza",
      role: "Homeowner",
      text: "Excellent finishing and professional aluminium work. They installed heavy double-glazed windows in my lounge and they glide perfectly. Highly recommended!",
      stars: 5
    },
    {
      name: "Sajjad Ali",
      role: "Store Manager",
      text: "Best glass installation service with clean work. The shop front showroom glass was installed within 3 days. Clean cuts and pristine seals.",
      stars: 5
    },
    {
      name: "Kamran Khan",
      role: "Interior Designer",
      text: "Reliable team and quality material. I always partner with Wazir Glass for my office cabin partition projects because they respect dimensions down to the millimeter.",
      stars: 5
    }
  ];

  const reviews = data?.items || defaultReviews;
  const [current, setCurrent] = useState(0);

  // Safety guard: If index is out of bounds (e.g. after items deleted), reset to 0
  useEffect(() => {
    if (current >= reviews.length) {
      setCurrent(0);
    }
  }, [reviews.length, current]);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const handlePrev = () => {
    if (reviews.length === 0) return;
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    if (reviews.length === 0) return;
    setCurrent((prev) => (prev + 1) % reviews.length);
  };

  if (!reviews || reviews.length === 0) return null;
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-6 relative z-10 text-center"
      >
        
        {/* Quote Badge */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
            <Quote className="w-5 h-5 fill-sky-600" />
          </div>
        </div>

        {/* Dynamic review frame */}
        <div className="min-h-[260px] flex items-center justify-center relative py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center"
            >
              {/* Star Rating */}
              <div className="flex gap-1.5 justify-center mb-4">
                {[...Array(reviews[current].stars || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                ))}
              </div>

              {/* Project photo if present */}
              {reviews[current].image && (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden mb-4 border-2 border-white shadow-md mx-auto">
                  <img 
                    src={getThumbnailUrl(reviews[current].image, 200)} 
                    alt={reviews[current].name} 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}

              <blockquote className="text-lg sm:text-xl font-medium text-slate-800 italic leading-relaxed max-w-2xl text-center">
                "{reviews[current].text}"
              </blockquote>

              <cite className="block not-italic mt-6">
                <span className="block text-sm font-bold text-slate-900 tracking-wider">
                  {reviews[current].name}
                </span>
                <span className="block text-[11px] text-sky-600 font-bold uppercase tracking-widest mt-1">
                  {reviews[current].role}
                </span>
              </cite>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Buttons Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all shadow-xs active:scale-95 focus:outline-none cursor-pointer"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Indicator Dots */}
          <div className="flex items-center justify-center gap-1">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrent(idx)}
                className="indicator-dot p-1 border-0 bg-transparent focus:outline-none cursor-pointer shrink-0 flex items-center justify-center !min-h-0 !h-auto"
                aria-label={`Go to slide ${idx + 1}`}
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    current === idx 
                      ? 'w-6 bg-sky-500 shadow-xs' 
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all shadow-xs active:scale-95 focus:outline-none cursor-pointer"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </motion.div>
    </section>
  );
}
