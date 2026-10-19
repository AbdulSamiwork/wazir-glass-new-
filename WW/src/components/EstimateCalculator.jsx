import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { computeEstimate } from './calculator/calculatorRates';
import EstimateResultCard from './calculator/EstimateResultCard';

export default function EstimateCalculator() {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [category, setCategory] = useState('window');
  const [glassType, setGlassType] = useState('5mm_clear');
  const [profileType, setProfileType] = useState('1.2mm_local');
  const [hardware, setHardware] = useState('standard');
  const [customRate, setCustomRate] = useState('');

  const [estimate, setEstimate] = useState({
    area: 0,
    glassCost: 0,
    profileCost: 0,
    hardwareCost: 0,
    laborCost: 0,
    customCost: 0,
    total: 0
  });

  useEffect(() => {
    const result = computeEstimate({ width, height, category, glassType, profileType, hardware, customRate });
    setEstimate(result);
  }, [width, height, category, glassType, profileType, hardware, customRate]);

  const handleReset = () => {
    setWidth('');
    setHeight('');
    setCustomRate('');
    setEstimate({ area: 0, glassCost: 0, profileCost: 0, hardwareCost: 0, laborCost: 0, customCost: 0, total: 0 });
  };

  return (
    <div className="flex flex-col gap-6 text-left pb-10">
      <div className="border-b border-slate-200/80 pb-4">
        <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-sky-500" />
          Quick Estimate Calculator
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Generate approximate cost estimates for client inquiries based on dimensions and materials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-7 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4 sm:gap-5">
          <h4 className="text-sm font-bold text-sky-600 uppercase tracking-wider border-b border-slate-100 pb-3">
            1. Dimensions & Type
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Width (Feet) *</label>
              <input type="number" min="0" step="any" value={width} onChange={e => setWidth(e.target.value)} placeholder="e.g. 5" className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Height (Feet) *</label>
              <input type="number" min="0" step="any" value={height} onChange={e => setHeight(e.target.value)} placeholder="e.g. 7" className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Product Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} disabled={parseFloat(customRate) > 0} className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all disabled:opacity-50 text-sm">
              <option value="window">Aluminium Window (Sliding/Openable)</option>
              <option value="door">Aluminium / Glass Door</option>
              <option value="partition">Office Glass Partition</option>
              <option value="shower">Shower Cabin / Enclosure</option>
            </select>
          </div>

          <div className="bg-sky-50/50 p-4 rounded-xl border border-sky-100">
            <label className="block text-xs font-bold text-sky-700 uppercase mb-2">Custom Rate (PKR per Sq.Ft) - Optional</label>
            <input type="number" min="0" step="any" value={customRate} onChange={e => setCustomRate(e.target.value)} placeholder="e.g. 1500" className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-sky-200 bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all text-sm" />
            <p className="text-[10px] text-sky-600 mt-1 font-semibold">If provided, this overrides the individual material costs below.</p>
          </div>

          <h4 className={`text-sm font-bold text-sky-600 uppercase tracking-wider border-b border-slate-100 pb-3 mt-2 ${parseFloat(customRate) > 0 ? 'opacity-50' : ''}`}>
            2. Materials Specifications
          </h4>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 ${parseFloat(customRate) > 0 ? 'opacity-50 pointer-events-none' : ''}`}>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Glass Type</label>
              <select value={glassType} onChange={e => setGlassType(e.target.value)} className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 outline-none text-sm">
                <option value="5mm_clear">5mm Clear Float</option>
                <option value="5mm_tinted">5mm Tinted / Reflective</option>
                <option value="8mm_tempered">8mm Tempered Glass</option>
                <option value="12mm_tempered">12mm Tempered Glass</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Aluminium Profile</label>
              <select value={profileType} onChange={e => setProfileType(e.target.value)} className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 outline-none text-sm">
                <option value="1.2mm_local">1.2mm Standard (Local)</option>
                <option value="1.6mm_chawla">1.6mm Premium (Chawla/Prime)</option>
                <option value="2.0mm_prime">2.0mm Heavy Duty</option>
                <option value="none">Frameless / No Profile</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Hardware & Accessories</label>
              <select value={hardware} onChange={e => setHardware(e.target.value)} className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 outline-none text-sm">
                <option value="standard">Standard Quality (Locks, Hinges, Rollers)</option>
                <option value="premium">Premium Quality (Imported, Hydraulic, Stainless Steel)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <EstimateResultCard
          estimate={estimate}
          customRate={customRate}
          glassType={glassType}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}
