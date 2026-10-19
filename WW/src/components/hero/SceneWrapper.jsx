import { lazy, Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const Hero3DCanvas = lazy(() => import('../Hero3DCanvas'));

function detectWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

function CSS3DWindow({ mouse }) {
  const style = {
    transform: `rotateY(${mouse.x * 20}deg) rotateX(${mouse.y * -20}deg)`,
    transformStyle: 'preserve-3d',
    perspective: '1000px',
  };

  return (
    <div className="relative w-full h-[360px] md:h-[480px] flex items-center justify-center">
      <div className="absolute w-[280px] h-[280px] rounded-full bg-cyan-500/15 blur-[80px]" />
      
      <motion.div
        style={style}
        className="w-[260px] md:w-[300px] h-[340px] md:h-[400px] border-4 border-slate-200 bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_20px_50px_rgba(56,189,248,0.15)] flex flex-col items-center justify-between p-6 transition-all duration-300 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 border-t-2 border-b-2 border-slate-300/40 scale-y-50 pointer-events-none" />
        <div className="absolute inset-0 border-l-2 border-r-2 border-slate-300/40 scale-x-50 pointer-events-none" />

        <div className="w-full flex justify-between items-center z-10">
          <div className="h-1.5 w-10 bg-sky-500/60 rounded-full" />
          <div className="h-2 w-2 bg-emerald-400 rounded-full animate-ping" />
        </div>

        <div className="z-10 text-center flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl border border-sky-500/30 flex items-center justify-center bg-sky-50/80 backdrop-blur-sm mb-3 shadow-sm">
            <Sparkles className="w-6 h-6 text-sky-600" />
          </div>
          <span className="text-[10px] text-sky-600 font-extrabold uppercase tracking-widest">
            European Standard
          </span>
          <span className="text-base font-black text-slate-900 tracking-wide mt-1">
            Structural Glass
          </span>
        </div>

        <div className="w-full flex justify-between items-center z-10 border-t border-slate-200/60 pt-3">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 inline" /> 10mm Tempered
          </div>
          <div className="text-[10px] text-slate-400 font-mono font-bold">ISO 9001</div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SceneWrapper({ mouse, isDesktop }) {
  const [hasWebGL] = useState(detectWebGL);
  const [shouldRender3D, setShouldRender3D] = useState(false);

  useEffect(() => {
    if (!isDesktop) return;
    const timer = setTimeout(() => {
      setShouldRender3D(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [isDesktop]);

  if (!isDesktop) {
    return null;
  }

  if (!hasWebGL || !shouldRender3D) {
    return <CSS3DWindow mouse={mouse} />;
  }

  return (
    <Suspense fallback={<CSS3DWindow mouse={mouse} />}>
      <Hero3DCanvas mouse={mouse} />
    </Suspense>
  );
}
