import React from 'react';

export const PRESET_TERMS = [
  'Validity: 15 days from today',
  'Payment: As per routine',
  'Delivery: Within 07 Working Days',
  'Taxes: Price is exclusive of taxes',
  'Warranty: As per manufacturer terms',
  'Material: Subject to availability',
];

export function buildFullNotes(selectedTerms, customTerm, notes) {
  const termLines = (selectedTerms || []).map(t => `• ${t}`).join('\n');
  const customLine = customTerm && customTerm.trim() ? `• ${customTerm.trim()}` : '';
  const allTerms = [termLines, customLine].filter(Boolean).join('\n');
  const extra = notes ? notes.trim() : '';
  return [allTerms, extra].filter(Boolean).join('\n\n');
}

export default function StandardTermsSelector({
  selectedTerms,
  setSelectedTerms,
  customTerm,
  setCustomTerm,
  notes,
  setNotes,
  notesPlaceholder = "Enter any project specific exclusions, specifications, delivery milestones..."
}) {
  const toggleTerm = (term) => {
    setSelectedTerms(prev =>
      prev.includes(term) ? prev.filter(t => t !== term) : [...prev, term]
    );
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 flex flex-col gap-4 shadow-sm">
      <h4 className="text-sm font-bold text-sky-600 uppercase tracking-wider border-b border-slate-100 pb-3 text-left">
        5. Notes & Terms
      </h4>

      {/* Preset Terms Checkboxes */}
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Quick-Select Standard Terms
        </p>
        <div className="grid grid-cols-1 gap-2">
          {PRESET_TERMS.map((term) => (
            <label
              key={term}
              className={`flex items-center gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border cursor-pointer transition-all ${
                selectedTerms.includes(term)
                  ? 'bg-sky-50 border-sky-200 text-sky-800'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-sky-200 hover:bg-sky-50/40'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedTerms.includes(term)}
                onChange={() => toggleTerm(term)}
                className="w-4 h-4 rounded accent-sky-500 flex-shrink-0"
              />
              <span className="text-xs sm:text-sm font-medium">{term}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Custom single term */}
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Add a Custom Term
        </p>
        <input
          type="text"
          value={customTerm}
          onChange={(e) => setCustomTerm(e.target.value)}
          placeholder="e.g. 50% advance before cutting"
          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
        />
      </div>

      {/* Additional Notes Field */}
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Additional Notes & Remarks
        </p>
        <textarea
          rows="3"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={notesPlaceholder}
          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all resize-none shadow-inner"
        />
      </div>
    </div>
  );
}
