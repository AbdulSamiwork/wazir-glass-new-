import React from 'react';
import { Info, RefreshCw } from 'lucide-react';

export default function EstimateResultCard({
  estimate,
  customRate,
  glassType,
  onReset
}) {
  const fmt = (n) => n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div className="lg:col-span-5 flex flex-col gap-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col gap-5 sm:gap-6">
        <div>
          <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">
            Estimated Total Cost
          </h4>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono tracking-tight break-all sm:break-normal">
            PKR {fmt(estimate.total)}
          </div>
        </div>

        <div className="h-px bg-white/10 w-full" />

        <div className="flex flex-col gap-3 text-xs sm:text-sm">
          <div className="flex justify-between items-center text-slate-300">
            <span>Total Area</span>
            <span className="font-mono font-bold text-white">{estimate.area.toFixed(2)} Sft</span>
          </div>
          
          {parseFloat(customRate) > 0 ? (
            <div className="flex justify-between items-center text-slate-300">
              <span>Custom Flat Rate (@ {fmt(parseFloat(customRate))} / Sft)</span>
              <span className="font-mono text-white">PKR {fmt(estimate.customCost)}</span>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center text-slate-300">
                <span>Glass ({glassType.replace('_', ' ')})</span>
                <span className="font-mono text-white">PKR {fmt(estimate.glassCost)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Aluminium Profile</span>
                <span className="font-mono text-white">PKR {fmt(estimate.profileCost)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Hardware & Accessories</span>
                <span className="font-mono text-white">PKR {fmt(estimate.hardwareCost)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Labor & Installation</span>
                <span className="font-mono text-white">PKR {fmt(estimate.laborCost)}</span>
              </div>
            </>
          )}
        </div>

        <div className="mt-1 p-3 bg-white/5 rounded-xl border border-white/10 flex gap-2.5 sm:gap-3 text-xs text-slate-300">
          <Info className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed text-[11px] sm:text-xs">
            This is a rough estimate based on baseline rates. Final quotes may vary depending on site conditions, specific brands, and wastage limits.
          </p>
        </div>
      </div>
      
      <button 
        onClick={onReset}
        className="min-h-[48px] w-full py-3.5 sm:py-4 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold uppercase text-xs tracking-wider hover:bg-slate-50 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
      >
        <RefreshCw className="w-4 h-4" /> Reset Calculator
      </button>
    </div>
  );
}
