import React, { useState } from 'react';
import { FileText, Plus } from 'lucide-react';
import TermsHeaderBanner from './admin/terms/TermsHeaderBanner';
import TermsMetaEditor from './admin/terms/TermsMetaEditor';
import TermsClauseItem from './admin/terms/TermsClauseItem';

export default function TermsEditor({ data, onUpdate, onSave }) {
  const [expandedSection, setExpandedSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const terms = data || {};
  const sections = Array.isArray(terms.sections) ? terms.sections : [];

  const handleFieldChange = (field, value) => {
    onUpdate({ ...terms, [field]: value });
  };

  const handleSectionChange = (index, field, value) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    handleFieldChange('sections', updated);
  };

  const handleAddSection = () => {
    const newId = sections.length > 0 ? Math.max(...sections.map(s => Number(s.id) || 0)) + 1 : 1;
    const newSection = {
      id: newId,
      icon: 'FileText',
      title: `${sections.length + 1}. New Clause / Provision`,
      content: 'Enter the terms, conditions, or policy provision content here...'
    };
    const updated = [...sections, newSection];
    handleFieldChange('sections', updated);
    setExpandedSection(updated.length - 1);
  };

  const handleRemoveSection = (index) => {
    if (window.confirm(`Are you sure you want to delete "${sections[index]?.title || 'this clause'}"?`)) {
      const updated = sections.filter((_, i) => i !== index);
      handleFieldChange('sections', updated);
      if (expandedSection === index) setExpandedSection(null);
    }
  };

  const handleMoveSection = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;
    const updated = [...sections];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);
    handleFieldChange('sections', updated);
    setExpandedSection(newIndex);
  };

  const filteredSections = sections.filter(sec => 
    !searchQuery || 
    (sec.title && sec.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (sec.content && sec.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-6">
      <TermsHeaderBanner onSave={onSave} />

      <TermsMetaEditor terms={terms} onFieldChange={handleFieldChange} />

      {/* 3. Clauses & Sections Manager */}
      <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-6">
        <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-sky-500 rounded-full"></span>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-800">3. Terms & Conditions Clauses</h3>
              <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 text-xs font-bold font-mono">
                {sections.length} clauses
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 pl-3.5">
              Manage your legal conditions, warranty limitations, advance payments, and dispute resolutions.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search clauses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-700 w-full sm:w-48 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
            <button
              type="button"
              onClick={handleAddSection}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all shadow-sm shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Clause</span>
            </button>
          </div>
        </div>

        {/* Clauses List */}
        <div className="flex flex-col gap-4">
          {filteredSections.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-500">No terms clauses matched your search.</p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-sky-600 font-bold hover:underline mt-1"
              >
                Clear Search
              </button>
            </div>
          ) : (
            filteredSections.map((sec) => {
              const idx = sections.indexOf(sec);
              return (
                <TermsClauseItem
                  key={sec.id || idx}
                  sec={sec}
                  idx={idx}
                  totalSections={sections.length}
                  isExpanded={expandedSection === idx}
                  onToggleExpand={() => setExpandedSection(expandedSection === idx ? null : idx)}
                  onSectionChange={handleSectionChange}
                  onMoveSection={handleMoveSection}
                  onRemoveSection={handleRemoveSection}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
