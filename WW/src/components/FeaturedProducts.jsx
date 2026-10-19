import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FeaturedMobileView from './products/FeaturedMobileView';
import FeaturedDesktopRow from './products/FeaturedDesktopRow';
import { defaultFeatured } from './products/featuredData';

export default function FeaturedProducts({ data }) {
  const [activeTab, setActiveTab] = useState(0);

  const featured = data || defaultFeatured;

  return (
    <section className="py-14 sm:py-20 bg-white border-t border-slate-200 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-8 sm:mb-20"
        >
          <h2 className="text-xs sm:text-sm font-bold text-sky-400 uppercase tracking-widest">
            Premium Showcases
          </h2>
          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-1 sm:mt-2 metallic-text">
            Featured Products
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 sm:mt-4">
            Discover our high-end engineering masterpieces, tailored to combine safety, insulation, and elite architectural aesthetics.
          </p>
        </motion.div>

        {/* Mobile View (< 768px): High-Density Tab Switcher */}
        <FeaturedMobileView
          featured={featured}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Desktop View (>= 768px): Alternating Showcase Grid */}
        <div className="hidden md:flex flex-col gap-24">
          {featured.map((prod, idx) => (
            <FeaturedDesktopRow
              key={idx}
              prod={prod}
              idx={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
