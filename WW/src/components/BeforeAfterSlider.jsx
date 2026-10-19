import React, { useState } from 'react';
import { Sliders, Sparkles } from 'lucide-react';
import { transformations } from './slider/transformationsData';
import ProjectSpecsCard from './slider/ProjectSpecsCard';
import ComparisonViewer from './slider/ComparisonViewer';

export default function BeforeAfterSlider({ data }) {
  const itemsList = data?.items && data.items.length > 0 ? data.items : transformations;
  const badge = data?.badge || "Interactive Glazing Comparison";
  const title = data?.title || "Architectural Transformations";
  const description = data?.description || "Slide left and right to witness how Wazir Glass & Aluminium upgrades ordinary buildings into high-end structural masterpieces.";

  const [activeTab, setActiveTab] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  const currentProject = itemsList[activeTab] || itemsList[0] || {};

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-widest mb-4 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading leading-tight mb-4">
            {title.includes(' ') ? (
              <>
                {title.slice(0, title.lastIndexOf(' '))} <span className="metallic-text">{title.slice(title.lastIndexOf(' ') + 1)}</span>
              </>
            ) : title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            {description}
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-10">
          {itemsList.map((proj, idx) => (
            <button
              key={proj.id || idx}
              onClick={() => {
                setActiveTab(idx);
                setSliderPosition(50);
              }}
              className={`min-h-[44px] px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 border active:scale-95 cursor-pointer ${
                activeTab === idx
                  ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 border-sky-400 shadow-lg shadow-sky-500/20 scale-105'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>{proj.title}</span>
            </button>
          ))}
        </div>

        {/* Interactive Comparison Window */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <ComparisonViewer
            currentProject={currentProject}
            sliderPosition={sliderPosition}
            setSliderPosition={setSliderPosition}
          />
          <ProjectSpecsCard currentProject={currentProject} />
        </div>
      </div>
    </section>
  );
}
