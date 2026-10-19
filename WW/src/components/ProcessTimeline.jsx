import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Ruler, FileCheck, Hammer, Truck, ShieldAlert, Sparkles } from 'lucide-react';
import { getThumbnailUrl } from '../utils/cloudinary';

export default function ProcessTimeline({ data }) {
  const defaultSteps = [
    {
      step: "01",
      title: "Customer Requirement",
      desc: "We consult with you on your structural ideas, select profile shapes, and understand design objectives."
    },
    {
      step: "02",
      title: "Site Measurement",
      desc: "Our field engineers visit your property to capture laser-precise measurements and gauge structural supports."
    },
    {
      step: "03",
      title: "Design & Material",
      desc: "We customize CAD layouts, specify sheet thicknesses, and select frame finishes for official approval."
    },
    {
      step: "04",
      title: "Fabrication",
      desc: "We construct the aluminium profile joints and cut safety tempered glass layers in our clean workshop."
    },
    {
      step: "05",
      title: "Installation",
      desc: "Our expert crew fits the frames, hangs doors, seals joints, and conducts safety inspections on site."
    },
    {
      step: "06",
      title: "Final Finishing",
      desc: "We clean all glass surfaces, polish steel lock plates, and hand over the keys for your finalized project."
    }
  ];

  const stepIcons = [
    <ClipboardList className="w-5 h-5 text-sky-400" />,
    <Ruler className="w-5 h-5 text-cyan-400" />,
    <FileCheck className="w-5 h-5 text-sky-400" />,
    <Hammer className="w-5 h-5 text-cyan-400" />,
    <Truck className="w-5 h-5 text-sky-400" />,
    <Sparkles className="w-5 h-5 text-cyan-400" />
  ];

  const badge = data?.badge || "How We Work";
  const sectionTitle = data?.title || "Our Fabrication Process";
  const sectionDesc = data?.description || "From initial sketch discussions to the final glass wipe, we maintain strict quality control checklists at each project phase.";

  const rawSteps = data?.steps || defaultSteps;

  const steps = rawSteps.map((step, idx) => ({
    ...step,
    icon: stepIcons[idx % stepIcons.length]
  }));

  return (
    <section className="py-20 bg-white border-t border-slate-200 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-20"
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

        {/* Timeline Path Grid */}
        <div className="relative border-l-2 border-slate-200 md:border-l-0 md:grid md:grid-cols-3 xl:grid-cols-6 gap-6 pl-6 md:pl-0">
          
          {/* Connecting line for desktop */}
          <div className="hidden xl:block absolute top-[44px] left-8 right-8 h-[2px] bg-slate-200 pointer-events-none" />

          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative mb-10 md:mb-0 text-left flex flex-col items-start group"
            >
              {/* Circle Connector Node */}
              <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center relative z-10 group-hover:border-sky-500 shadow-sm group-hover:shadow-[0_0_15px_rgba(56,189,248,0.15)] transition-all duration-300 mb-6">
                {item.icon}
                
                {/* Float count label */}
                <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-500 font-mono">
                  {item.step}
                </div>
              </div>

              {/* Title & Info */}
              <div className="w-full">
                {item.image && (
                  <div className="w-full h-32 sm:h-36 rounded-xl overflow-hidden mb-3 border border-slate-200/80 shadow-2xs group-hover:border-sky-500/40 transition-all">
                    <img 
                      src={getThumbnailUrl(item.image, 400)} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
