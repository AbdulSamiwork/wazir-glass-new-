import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { getThumbnailUrl } from '../../utils/cloudinary';

export default function TiltCard({ product, icon, onViewDetails }) {
  const cardRef = useRef(null);

  // Set up motion values for cursor tracking
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Smooth out the movement
  const springConfig = { damping: 20, stiffness: 200, size: 0.5, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current || (typeof window !== 'undefined' && window.innerWidth < 1024)) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onViewDetails(product)}
      style={{
        rotateX: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : rotateX,
        rotateY: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="glass-panel glass-panel-hover p-5 sm:p-6 rounded-2xl flex flex-col justify-between min-h-[380px] sm:min-h-[420px] w-full relative overflow-hidden group cursor-pointer text-left active:scale-[0.98] transition-all"
    >
      {/* Light Reflection Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Product Image Banner */}
      <div 
        style={{ transform: 'translateZ(30px)' }}
        className="w-full h-48 sm:h-56 rounded-xl border border-slate-200 relative overflow-hidden mb-5 group-hover:border-sky-500/20 transition-all duration-300 flex-shrink-0"
      >
        <img 
          src={getThumbnailUrl(product.image, 500)} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
          decoding="async"
        />
        
        {/* Spec labels inside container */}
        <div className="absolute bottom-2.5 left-3 bg-slate-950/75 backdrop-blur-md px-2.5 py-1 rounded-md text-[9px] text-slate-200 font-mono tracking-wider">
          CAD // SPEC
        </div>
        <div className="absolute top-2.5 right-3 bg-emerald-500/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[9px] text-white font-mono font-bold">
          ✓ APPROVED
        </div>
      </div>

      {/* Content description */}
      <div style={{ transform: 'translateZ(20px)' }} className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-sky-600 uppercase tracking-widest font-extrabold bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
              {product.meta}
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1">
            {product.name}
          </h4>
          <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
          <span className="text-sky-600 group-hover:text-cyan-600 transition-colors flex items-center gap-1">
            <span>View Full CAD Specs</span>
            <span className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            WZ-PRO
          </span>
        </div>
      </div>
    </motion.div>
  );
}
