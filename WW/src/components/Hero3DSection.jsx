import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, Star } from 'lucide-react';
import TypewriterText from './hero/TypewriterText';
import HeroMetrics from './hero/HeroMetrics';
import SceneWrapper from './hero/SceneWrapper';

export default function Hero3DSection({ data }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(() => (
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : false
  ));
  
  const badge = data?.badge || "Over 10 Years of Excellence";
  const titleLine1 = data?.titleLine1 || "Premium Glass &";
  const fullText = data?.typedText || "Aluminium Solutions";
  const description = data?.description || "Modern doors, windows, partitions, mirrors, shop fronts, and custom aluminium works designed with premium strength, refined quality, and striking style.";
  const ctaText1 = data?.ctaText1 || "View Products";
  const ctaLink1 = data?.ctaLink1 || "#products";
  const ctaText2 = data?.ctaText2 || "Contact us";
  const ctaLink2 = data?.ctaLink2 || "#contact";

  useEffect(() => {
    if (!isDesktop) return;
    let frameId;
    const handleMouseMove = (e) => {
      if (frameId) return;
      frameId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;
        setMouse({ x, y });
        frameId = null;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [isDesktop]);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const updateDesktopState = () => setIsDesktop(desktopQuery.matches);
    updateDesktopState();
    desktopQuery.addEventListener('change', updateDesktopState);
    return () => desktopQuery.removeEventListener('change', updateDesktopState);
  }, []);

  return (
    <section id="home" className="hero-shell relative pt-28 pb-16 sm:pt-32 md:py-36 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_45%,#f0f7fc_100%)] overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(90deg,transparent,rgba(14,165,233,0.15),transparent)] pointer-events-none" />
      <div className="absolute right-10 top-20 h-[60%] w-72 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-10 bottom-10 h-64 w-64 bg-cyan-200/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:42px_42px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Hero Copywriting */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-200/80 bg-white/90 text-xs text-sky-700 font-extrabold uppercase tracking-wider mb-6 shadow-sm shadow-sky-100 backdrop-blur-sm"
            >
              <Star className="w-3.5 h-3.5 fill-sky-600 text-sky-600" />
              {badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[1.12] font-heading"
            >
              <span className="block text-slate-900 metallic-text">{titleLine1}</span>
              <TypewriterText fullText={fullText} />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed mb-8 font-medium"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <a
                href={ctaLink1}
                className="hero-primary-cta flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-sky-600 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-extrabold text-sm tracking-wide shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                {ctaText1}
                <ArrowRight className="w-4.5 h-4.5" />
              </a>
              <a
                href={ctaLink2}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/90 border border-slate-200/80 hover:border-sky-500 hover:bg-white text-slate-800 font-extrabold text-sm tracking-wide shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
              >
                <Phone className="w-4.5 h-4.5 text-sky-600 mr-1" />
                {ctaText2}
              </a>
            </motion.div>

            <HeroMetrics
              completedProjectsVal={data?.completedProjectsVal}
              completedProjectsLabel={data?.completedProjectsLabel}
              experienceVal={data?.experienceVal}
              experienceLabel={data?.experienceLabel}
              qualityVal={data?.qualityVal}
              qualityLabel={data?.qualityLabel}
            />
          </div>

          {/* Interactive 3D / Glass Showcase Right Side (Desktop Only) */}
          {isDesktop && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:flex lg:col-span-5 items-center justify-center relative mt-6 lg:mt-0"
            >
              <div className="absolute -top-4 -left-2 sm:left-4 z-20 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/90 border border-slate-200/80 shadow-lg backdrop-blur-md animate-bounce duration-[3000ms]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold text-slate-800">🛡️ 10mm Tempered Safety Glass</span>
              </div>
              
              <div className="absolute -bottom-4 -right-2 sm:right-4 z-20 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/90 border border-slate-200/80 shadow-lg backdrop-blur-md">
                <span className="text-[11px] font-bold text-slate-800">⚡ Soundproof Double Glazing</span>
              </div>

              <SceneWrapper mouse={mouse} isDesktop={isDesktop} />
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}
