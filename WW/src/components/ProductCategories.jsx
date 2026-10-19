import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import TiltCard from './products/TiltCard';
import CategoryPreviewModal from './products/CategoryPreviewModal';
import { defaultCategories, getCategoryIcon } from './products/categoriesData';

export default function ProductCategories({ data, whatsappNumber }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMeta, setFilterMeta] = useState('All');

  const categories = data || defaultCategories;
  const uniqueMetas = ['All', ...new Set(categories.map(c => c.meta))];

  const filteredCategories = categories.filter(cat => {
    const matchesSearch = cat.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cat.meta?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cat.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMeta = filterMeta === 'All' || cat.meta?.toLowerCase() === filterMeta.toLowerCase();
    return matchesSearch && matchesMeta;
  });

  return (
    <section id="products" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-600 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Product Catalog</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight metallic-text">
            Architectural Product Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 sm:mt-3 leading-relaxed">
            High-performance aluminium framing and precision-toughened glass engineering for luxury residential and commercial developments.
          </p>
        </motion.div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-8 sm:mb-10">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search profiles, glass, doors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
            {uniqueMetas.map((meta) => (
              <button
                key={meta}
                onClick={() => setFilterMeta(meta)}
                className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
                  filterMeta === meta
                    ? 'bg-sky-500 text-slate-950 shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {meta}
              </button>
            ))}
          </div>
        </div>

        {/* Spacious, Full-Sized Product Grid */}
        {filteredCategories.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-2">
            <Search className="w-8 h-8 text-slate-300" />
            <p className="text-sm font-bold text-slate-700">No matching products found</p>
            <button
              onClick={() => { setSearchQuery(''); setFilterMeta('All'); }}
              className="text-xs text-sky-600 font-bold hover:underline mt-1"
            >
              Clear Search & Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((cat, idx) => (
              <TiltCard
                key={cat.id || idx}
                product={cat}
                icon={cat.icon || getCategoryIcon(cat.meta)}
                onViewDetails={setActiveCategory}
              />
            ))}
          </div>
        )}
      </div>

      {/* Details Dialog Modal */}
      <CategoryPreviewModal
        activeCategory={activeCategory}
        onClose={() => setActiveCategory(null)}
        whatsappNumber={whatsappNumber}
      />
    </section>
  );
}
