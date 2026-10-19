import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Camera } from 'lucide-react';
import GalleryCard from './gallery/GalleryCard';
import GalleryLightboxModal from './gallery/GalleryLightboxModal';
import { defaultProjects } from './gallery/projectsData';

export default function ProjectGallery({ data, whatsappNumber }) {
  const [filter, setFilter] = useState('All');
  const [activeItem, setActiveItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const sectionTitle = data?.title || "Recent Completed Projects";
  const sectionDesc = data?.description || "Take a look at some of our architectural installations. We guarantee precision sizing and pristine cleaning upon project completion.";
  const projects = data?.projects || defaultProjects;

  const tabs = ['All', ...new Set(projects.map(p => p.category))];

  const filteredProjects = projects.filter(p => {
    const matchesFilter = filter === 'All' || p.category === filter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Installed Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight metallic-text">
            {sectionTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 sm:mt-3 leading-relaxed">
            {sectionDesc}
          </p>
        </motion.div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-8 sm:mb-10">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search installations..."
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
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
                  filter === tab
                    ? 'bg-cyan-500 text-slate-950 shadow-xs font-black'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Project Gallery Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-2">
            <Search className="w-8 h-8 text-slate-300" />
            <p className="text-sm font-bold text-slate-700">No matching projects found</p>
            <button
              onClick={() => { setSearchQuery(''); setFilter('All'); }}
              className="text-xs text-sky-600 font-bold hover:underline mt-1"
            >
              Clear Search & Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((proj) => (
              <GalleryCard
                key={proj.id}
                proj={proj}
                onClick={setActiveItem}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <GalleryLightboxModal
        activeItem={activeItem}
        onClose={() => setActiveItem(null)}
        whatsappNumber={whatsappNumber}
      />
    </section>
  );
}
