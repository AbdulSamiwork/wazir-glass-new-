import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function StatCounter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    
    const target = parseInt(value, 10);
    if (isNaN(target)) {
      setCount(value);
      return;
    }

    let start = 0;
    const duration = 1.5; // seconds
    const totalFrames = 60;
    const frameDuration = (duration * 1000) / totalFrames;
    const increment = target / totalFrames;

    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
      {count}
      {suffix}
    </span>
  );
}
