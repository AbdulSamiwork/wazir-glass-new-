import React from 'react';
import { motion } from 'framer-motion';
import { Award, Compass, Eye } from 'lucide-react';
import AboutShowcaseSlider from './about/AboutShowcaseSlider';

export default function AboutSection({ data }) {
  // Dynamic variables with fallback defaults
  const badge = data?.badge || "About Wazir Centre";
  const title = data?.title || "Crafting High-End Glass & Aluminium Projects";
  const description1 = data?.description1 || "Wazir Glass & Aluminium Centre is a premier provider of high-quality architectural glass and aluminium fabrication. For over a decade, we have partnered with homeowners, interior architects, commercial business owners, and developers to bring structural glass ideas to life.";
  const description2 = data?.description2 || "We specialize in custom creations. Whether you require minimalist floor-to-ceiling glass partitions for an office cabin, heavy-duty aluminium windows for a modern home, or striking frameless mirrors and shop fronts, we handle measurement, custom cutting, assembly, and final installation with absolute precision.";

  const rawFeatures = data?.features || [
    {
      title: "Certified Materials",
      description: "We source high-grade structural-alloy aluminium and safety-tempered glass."
    },
    {
      title: "Precision Engineering",
      description: "Laser-measured and custom fabricated to achieve micro-millimeter tolerance."
    },
    {
      title: "Aesthetic Detailing",
      description: "Hidden joints, elegant finishes, and sleek glass alignments."
    }
  ];

  const icons = [
    <Award className="w-6 h-6 text-sky-400" />,
    <Compass className="w-6 h-6 text-cyan-400" />,
    <Eye className="w-6 h-6 text-sky-400" />
  ];

  const features = rawFeatures.map((feat, idx) => ({
    ...feat,
    icon: icons[idx % icons.length]
  }));

  const showcaseBadge = data?.showcaseBadge || "Interactive Showcase";
  const showcaseTitle = data?.showcaseTitle || "Slide to compare: Before vs After";
  const showcaseDesc = data?.showcaseDesc || "Drag the slider in the center to view finished glass partition installation.";

  const beforeImage = data?.beforeImage || "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80";
  const beforeBadge = data?.beforeBadge || "RAW SPACE";
  const beforeTitle = data?.beforeTitle || "BEFORE INSTALLATION";
  const beforeDesc = data?.beforeDesc || "Open masonry space with unfinished layout and block partitions.";

  const afterImage = data?.afterImage || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80";
  const afterBadge = data?.afterBadge || "FINISHED";
  const afterTitle = data?.afterTitle || "After Wazir Work";
  const afterDesc = data?.afterDesc || "Custom glass partitions and premium aluminium profile framework installed.";

  return (
    <section id="about" className="py-20 bg-white border-t border-slate-200 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Copywriting Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            <h2 className="text-sm font-bold text-sky-400 uppercase tracking-widest mb-3">
              {badge}
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6 text-slate-900 metallic-text">
              {title}
            </h3>
            <p className="text-slate-700 leading-relaxed mb-6">
              {description1}
            </p>
            <p className="text-slate-700 leading-relaxed mb-8">
              {description2}
            </p>

            {/* Feature Cards list */}
            <div className="flex flex-col gap-6 w-full">
              {features.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/60 backdrop-blur-sm">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-sky-50 border border-sky-200">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-base">{item.title}</h4>
                    <p className="text-slate-600 text-sm mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Before/After Showcase Interactive Column */}
          <AboutShowcaseSlider
            showcaseBadge={showcaseBadge}
            showcaseTitle={showcaseTitle}
            showcaseDesc={showcaseDesc}
            beforeImage={beforeImage}
            beforeBadge={beforeBadge}
            beforeTitle={beforeTitle}
            beforeDesc={beforeDesc}
            afterImage={afterImage}
            afterBadge={afterBadge}
            afterTitle={afterTitle}
            afterDesc={afterDesc}
          />

        </div>
      </div>
    </section>
  );
}
