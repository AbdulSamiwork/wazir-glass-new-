import React from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import StatCounter from './whychooseus/StatCounter';
import { getBannerUrl } from '../utils/cloudinary';
import {
  defaultTrustPoints,
  defaultStats,
  statIcons,
  trustIcons
} from './whychooseus/whyChooseData';

export default function WhyChooseUs({ data }) {
  const badge = data?.badge || "Why Partner With Us";
  const sectionTitle = data?.title || "Architectural Reliability & Trust";
  const sectionDesc = data?.description || "We bridge structural integrity and premium style. Our commitment to premium materials and flawless installation ensures our projects stand the test of time.";

  const rawStats = data?.stats || defaultStats;
  const rawTrust = data?.trustPoints || defaultTrustPoints;

  const stats = rawStats.map((stat, idx) => ({
    ...stat,
    icon: statIcons[idx % statIcons.length]
  }));

  const trustPoints = rawTrust.map((point, idx) => ({
    ...point,
    icon: trustIcons[idx % trustIcons.length]
  }));

  return (
    <section className="py-20 bg-white border-t border-slate-200 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="text-sm font-bold text-sky-400 uppercase tracking-widest">
            {badge}
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 metallic-text">
            {sectionTitle}
          </h3>
          <p className="text-sm text-slate-600 mt-4 leading-relaxed">
            {sectionDesc}
          </p>
        </motion.div>

        {/* Counters / Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass-panel p-6 rounded-2xl text-center flex flex-col items-center justify-center relative overflow-hidden group hover:border-sky-500/25 hover:shadow-md transition-all duration-300"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-cyan-500 opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon badge */}
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
                {stat.icon}
              </div>

              <div className="flex items-baseline justify-center">
                <StatCounter value={stat.value} suffix="" />
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stat.suffix}</span>
              </div>

              <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase mt-2.5 text-center leading-snug max-w-[120px]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Featured Showcase Banner Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden shadow-xl mb-16 border border-slate-200/80 group"
        >
          <img 
            src={getBannerUrl(data?.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80", 1200)} 
            alt="Wazir Glass Architectural Excellence" 
            className="w-full h-[320px] sm:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex flex-col justify-end p-6 sm:p-10 text-left" />
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white z-10">
            <div>
              <span className="px-3 py-1 rounded-full bg-sky-500 text-slate-950 font-black text-xs uppercase tracking-wider mb-2 inline-block shadow-sm">
                Certified Fabrication Facility
              </span>
              <h4 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                Engineered for Structural Perfection
              </h4>
              <p className="text-sm text-slate-200 max-w-xl mt-1">
                Every aluminium frame and toughened glass panel undergoes multi-point laser testing before leaving our workshop.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 shrink-0">
              <Building2 className="w-8 h-8 text-sky-400" />
              <div className="text-left">
                <div className="text-xs font-bold text-slate-300 uppercase">ISO 9001 Compliant</div>
                <div className="text-sm font-extrabold text-white">100% Quality Guaranteed</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 8 trust points list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((point, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:border-sky-500/25 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col items-start text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center mb-4">
                {point.icon}
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                {point.title}
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
