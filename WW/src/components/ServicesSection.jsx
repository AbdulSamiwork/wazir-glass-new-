import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { defaultServices, getServiceIcon } from './services/servicesData';
import ServiceDetailModal from './services/ServiceDetailModal';

export default function ServicesSection({ data, whatsappNumber }) {
  const [activeService, setActiveService] = useState(null);

  const sectionTitle = data?.title || "Our Professional Services";
  const sectionDesc = data?.description || "From initial drafting and detailed site measurement to precision fabrication and clean installations, we provide premium architectural glazing and aluminium work.";
  const services = data?.items || defaultServices;

  return (
    <section id="services" className="py-20 bg-slate-50 border-t border-slate-200 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-8 sm:mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-600 text-xs font-bold uppercase tracking-widest mb-3">
            <span>Precision Glazing</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight metallic-text">
            {sectionTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 sm:mt-3 leading-relaxed">
            {sectionDesc}
          </p>
        </motion.div>

        {/* Top 3 Services Teaser Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.slice(0, 3).map((serv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => setActiveService(serv)}
              className="glass-panel glass-panel-hover p-6 rounded-2xl group flex flex-col text-left justify-between cursor-pointer active:scale-[0.98] transition-transform h-[280px]"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center mb-5 group-hover:border-sky-400 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.15)] transition-all duration-300">
                  {serv.icon || getServiceIcon(serv.title)}
                </div>
                
                <h4 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2">
                  {serv.title}
                </h4>
                
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {serv.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                <span>Services // WZ</span>
                <span className="text-sky-600 group-hover:text-sky-500 transition-colors">Details →</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10 sm:mt-12">
          <button
            onClick={() => setActiveService(services[3] || services[0])}
            className="min-h-[50px] w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 hover:from-sky-950 hover:to-slate-900 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-xl shadow-slate-900/15 hover:shadow-sky-500/20 active:scale-95 transition-all flex items-center justify-center gap-2.5 border border-slate-700/50 cursor-pointer group"
          >
            <span>Explore All {services.length} Fabrication Services & Specs</span>
            <span className="bg-sky-500 text-slate-950 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
              {services.length}
            </span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>

      {/* Services Details Dialog Modal */}
      <ServiceDetailModal
        activeService={activeService}
        onClose={() => setActiveService(null)}
        whatsappNumber={whatsappNumber}
      />
    </section>
  );
}
