import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AboutShowcaseSlider({
  showcaseBadge,
  showcaseTitle,
  showcaseDesc,
  beforeImage,
  beforeBadge,
  beforeTitle,
  beforeDesc,
  afterImage,
  afterBadge,
  afterTitle,
  afterDesc
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !e.touches[0]) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleEnd = () => setIsDragging(false);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchend', handleEnd);
    window.addEventListener('touchcancel', handleEnd);
    return () => {
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
      window.removeEventListener('touchcancel', handleEnd);
    };
  }, [isDragging]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="lg:col-span-6 flex flex-col items-center"
    >
      <div className="mb-6 text-center">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50/60 text-cyan-700 border border-cyan-200">
          {showcaseBadge}
        </span>
        <h4 className="text-lg font-bold text-slate-800 mt-2">
          {showcaseTitle}
        </h4>
        <p className="text-xs text-slate-500 mt-1">
          {showcaseDesc}
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full max-w-[500px] aspect-[4/3] rounded-2xl border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50 cursor-ew-resize select-none touch-none"
        onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
        onMouseMove={handleMouseMove}
        onTouchStart={(e) => { setIsDragging(true); if (e.touches[0]) handleMove(e.touches[0].clientX); }}
        onTouchMove={handleTouchMove}
      >
        {/* Before State */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-8 text-center bg-cover bg-center select-none overflow-hidden"
          style={{ 
            backgroundImage: `url('${beforeImage}')`,
            clipPath: `inset(0 0 0 ${sliderPosition}%)`
          }}
        >
          <div className="absolute inset-0 bg-slate-950/60 z-0" />
          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded border-2 border-dashed border-slate-300 flex items-center justify-center mb-3 sm:mb-4 opacity-80">
              <span className="text-[10px] text-white font-mono font-semibold">{beforeBadge}</span>
            </div>
            <h5 className="text-white font-bold text-xs sm:text-sm tracking-wide">{beforeTitle}</h5>
            <p className="text-[11px] sm:text-xs text-slate-300 max-w-[240px] mt-1.5 leading-relaxed">
              {beforeDesc}
            </p>
          </div>
        </div>

        {/* After State */}
        <div
          className="absolute inset-0 select-none overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center flex flex-col items-center justify-center p-6 sm:p-8 text-center"
            style={{ backgroundImage: `url('${afterImage}')` }}
          >
            <div className="absolute inset-0 bg-slate-950/45 z-0" />
            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="relative w-16 h-20 sm:w-20 sm:h-24 border-2 border-sky-400 bg-sky-950/30 backdrop-blur-sm flex items-center justify-center mb-3 sm:mb-4 shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
                <span className="text-[10px] text-sky-400 font-extrabold tracking-wider">{afterBadge}</span>
              </div>
              <h5 className="text-white font-extrabold text-xs sm:text-sm tracking-wide uppercase">
                {afterTitle}
              </h5>
              <p className="text-[11px] sm:text-xs text-slate-200 max-w-[240px] mt-1.5 leading-relaxed">
                {afterDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Slider Handle Divider */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-sky-400 cursor-ew-resize z-20 flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-10 h-10 rounded-full bg-white border-2 border-sky-500 flex items-center justify-center shadow-lg text-sky-600 font-extrabold text-sm select-none">
            ↔
          </div>
        </div>
      </div>
    </motion.div>
  );
}
