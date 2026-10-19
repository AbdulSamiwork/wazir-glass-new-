import React, { useState } from 'react';
import { FileImage } from 'lucide-react';
import PortfolioToolbar from './portfolio/PortfolioToolbar';
import PortfolioProjectGrid from './portfolio/PortfolioProjectGrid';
import { buildPortfolioPdf } from './portfolio/portfolioPdfBuilder';

export default function PortfolioGenerator({ siteData }) {
  const allProjects = siteData?.gallery?.projects || [];
  const [selectedIds, setSelectedIds] = useState([]);
  const [clientName, setClientName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleProject = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const selectAll = () => setSelectedIds(allProjects.map(p => p.id));
  const deselectAll = () => setSelectedIds([]);

  const handleGenerate = async () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one project to include in the portfolio.");
      return;
    }

    setIsGenerating(true);
    try {
      const selectedProjects = allProjects.filter(p => selectedIds.includes(p.id));
      await buildPortfolioPdf({ selectedProjects, clientName, contact: siteData?.contact });
    } catch (error) {
      console.error(error);
      alert("An error occurred while generating the PDF portfolio.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left pb-10">
      <div className="border-b border-slate-200/80 pb-4">
        <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
          <FileImage className="w-5 h-5 text-sky-500" />
          Technical PDF Portfolio &amp; Dossier Generator
        </h3>
        <p className="text-xs text-slate-500 mt-1">Select projects from your gallery to generate a comprehensive, executive technical specification profile with dimensions, materials, hardware fittings, and photos.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <PortfolioToolbar
          clientName={clientName}
          setClientName={setClientName}
          selectedCount={selectedIds.length}
          isGenerating={isGenerating}
          onGenerate={handleGenerate}
        />

        <PortfolioProjectGrid
          allProjects={allProjects}
          selectedIds={selectedIds}
          onToggleProject={toggleProject}
          onSelectAll={selectAll}
          onDeselectAll={deselectAll}
        />
      </div>
    </div>
  );
}
