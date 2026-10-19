import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function QuoteButton({ onNavClick, isMobile = false }) {
  const [clickRipples, setClickRipples] = useState([]);

  const handleClick = (e) => {
    if (navigator.vibrate) navigator.vibrate(35);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setClickRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setClickRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 700);

    if (onNavClick) onNavClick(e, '#contact');
  };

  if (isMobile) {
    return (
      <motion.a
        href="#contact"
        onClick={handleClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        className="relative overflow-hidden flex items-center justify-center gap-2 w-full max-w-xs py-3.5 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-500 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-sky-500/25 min-h-[44px] group"
      >
        <span className="absolute inset-0 w-[200%] h-full -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
        <Sparkles className="w-4 h-4 text-slate-950 group-hover:rotate-180 transition-transform duration-500" />
        <span>Get Free Quote</span>
        <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
      </motion.a>
    );
  }

  return (
    <motion.a
      href="#contact"
      onClick={handleClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 450, damping: 17 }}
      className="relative group cursor-pointer select-none rounded-full p-[1.5px] focus:outline-none min-h-[44px] flex items-center"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-600 transition-all duration-300" />
      <div className="relative overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-full bg-white group-hover:bg-slate-900 text-xs font-bold text-slate-900 group-hover:text-white transition-colors duration-300">
        <span className="absolute inset-0 w-[200%] h-full -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-sky-400/40 via-white/80 to-transparent pointer-events-none" />
        {clickRipples.map((r) => (
          <span
            key={r.id}
            style={{ left: r.x, top: r.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-sky-400/60 animate-ping pointer-events-none"
          />
        ))}
        <Sparkles className="w-3.5 h-3.5 text-sky-500 group-hover:text-cyan-300 group-hover:rotate-180 transition-transform duration-500 shrink-0" />
        <span className="tracking-wide">Get Quote</span>
        <ArrowRight className="w-3.5 h-3.5 text-sky-500 group-hover:text-cyan-300 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
      </div>
    </motion.a>
  );
}
