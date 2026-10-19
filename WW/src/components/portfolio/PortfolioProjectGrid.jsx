import React from 'react';
import { FileImage, CheckSquare, Square, FileText } from 'lucide-react';
import { getThumbnailUrl } from '../../utils/cloudinary';

export default function PortfolioProjectGrid({
  allProjects,
  selectedIds,
  onToggleProject,
  onSelectAll,
  onDeselectAll
}) {
  return (
    <div className="lg:col-span-8 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4 sm:gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h4 className="text-sm font-bold text-sky-600 uppercase tracking-wider">Select Projects to Include</h4>
          <span className="text-[11px] text-slate-500 font-medium">Click projects below to add full details and photos to the PDF</span>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={onSelectAll} className="min-h-[36px] text-[10px] font-bold uppercase tracking-wider text-slate-600 hover:text-sky-600 bg-slate-100 hover:bg-sky-50 px-3 py-1.5 rounded-lg transition-colors">Select All</button>
          <button onClick={onDeselectAll} className="min-h-[36px] text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors">Clear</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 max-h-[450px] sm:max-h-[620px] overflow-y-auto pr-1 sm:pr-2 pb-2">
        {allProjects.map(project => {
          const isSelected = selectedIds.includes(project.id);
          const descText = project.desc || project.description || "Custom fabricated architectural structure.";
          const sizeText = project.size || project.dimensions || "Custom CAD Dimensions";

          return (
            <div 
              key={project.id}
              onClick={() => onToggleProject(project.id)}
              className={`flex flex-col sm:flex-row gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                isSelected ? 'border-sky-500 bg-sky-50/25 shadow-sm' : 'border-slate-150 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="w-full h-40 sm:w-28 sm:h-28 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden relative border border-slate-200/80">
                {project.image ? (
                  <img 
                    src={getThumbnailUrl(project.image, 300)} 
                    alt={project.title} 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileImage className="w-8 h-8 text-slate-300" />
                  </div>
                )}
                {isSelected && (
                  <div className="absolute inset-0 bg-sky-500/25 flex items-center justify-center backdrop-blur-[1px]">
                    <CheckSquare className="w-7 h-7 text-sky-600 bg-white rounded-lg shadow-md p-1" />
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between text-left min-w-0">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-extrabold text-slate-800 text-sm sm:text-base truncate">{project.title || "Untitled Project"}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-100/80 text-sky-700 font-bold text-[10px] uppercase tracking-wider shrink-0">{project.category || "General"}</span>
                  </div>
                  <div className="text-xs font-mono text-slate-500 mt-1 font-semibold">
                    📐 Dimensions: <span className="text-slate-700">{sizeText}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">{descText}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wider">
                  <span className="text-slate-400">Ref ID: WZ-2026-{project.id}</span>
                  {isSelected ? (
                    <span className="text-sky-600 flex items-center gap-1.5 bg-sky-100/60 px-2.5 py-1 rounded-lg"><CheckSquare className="w-3.5 h-3.5" /> Included</span>
                  ) : (
                    <span className="text-slate-400 flex items-center gap-1.5 hover:text-slate-600"><Square className="w-3.5 h-3.5" /> Click to Include</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {allProjects.length === 0 && (
          <div className="py-12 text-center text-slate-400 text-sm flex flex-col items-center gap-2">
            <FileText className="w-10 h-10 text-slate-300" />
            No projects found in the gallery. Add projects in the Project Gallery tab first.
          </div>
        )}
      </div>
    </div>
  );
}
