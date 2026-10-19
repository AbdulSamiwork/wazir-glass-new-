import React, { useRef, useState, useEffect } from 'react';
import { ShieldCheck, ArrowLeftRight } from 'lucide-react';
import { getBannerUrl } from '../../utils/cloudinary';

export default function ComparisonViewer({ currentProject, sliderPosition, setSliderPosition }) {
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !e.touches[0]) return;
    handleMove(e.touches[0].clientX);
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
    <div className="lg:col-span-8">
      <div
        ref={containerRef}
        onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
        onMouseMove={handleMouseMove}
        onTouchStart={(e) => { setIsDragging(true); if (e.touches[0]) handleMove(e.touches[0].clientX); }}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[360px] sm:h-[500px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl cursor-ew-resize select-none touch-none group bg-slate-900"
      >
        {/* After Image (Full Background) */}
        <div className="absolute inset-0">
          <img
            src={getBannerUrl(currentProject.afterImage, 1000)}
            alt={currentProject.afterLabel}
            className="w-full h-full object-cover object-center pointer-events-none"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute top-3 sm:top-5 right-3 sm:right-5 z-20 max-w-[46%] sm:max-w-none px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-sky-500/40 text-sky-400 font-bold text-[10px] sm:text-xs shadow-lg flex items-center gap-1 sm:gap-2 truncate">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 flex-shrink-0" />
            <span className="truncate">AFTER: {currentProject.afterLabel}</span>
          </div>
        </div>

        {/* Before Image (Clipped Overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={getBannerUrl(currentProject.beforeImage, 1000)}
            alt={currentProject.beforeLabel}
            className="absolute inset-0 h-full object-cover object-center pointer-events-none max-w-none"
            style={{ width: containerWidth > 0 ? `${containerWidth}px` : '100%' }}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute top-3 sm:top-5 left-3 sm:left-5 z-20 max-w-[46%] sm:max-w-none px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-slate-300 font-bold text-[10px] sm:text-xs shadow-lg truncate">
            <span className="truncate">BEFORE: {currentProject.beforeLabel}</span>
          </div>
        </div>

        {/* Slider Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-sky-400 via-cyan-300 to-sky-500 z-30 pointer-events-none shadow-[0_0_15px_rgba(56,189,248,0.8)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900 border-2 border-sky-400 text-white flex items-center justify-center shadow-xl shadow-sky-500/40 transition-transform duration-200 group-hover:scale-110">
            <ArrowLeftRight className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />
          </div>
        </div>

        {/* Bottom Instruction Hint */}
        <div className="absolute bottom-3 sm:bottom-5 inset-x-0 text-center z-20 pointer-events-none px-4">
          <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-widest font-mono">
            ↔ Drag slider to compare
          </span>
        </div>
      </div>
    </div>
  );
}
