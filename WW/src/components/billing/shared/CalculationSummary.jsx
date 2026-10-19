import React from 'react';

export default function CalculationSummary({
  subtotal,
  discountType,
  setDiscountType,
  discountValue,
  setDiscountValue,
  discountAmount,
  total,
  isInvoice = false,
  taxRate,
  setTaxRate,
  taxAmount,
  amountReceived,
  setAmountReceived,
  remainingAmount
}) {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 flex flex-col gap-4 text-sm shadow-sm">
      <h4 className="text-sm font-bold text-sky-600 uppercase tracking-wider border-b border-slate-100 pb-3 text-left">
        4. Summary Totals
      </h4>
      
      <div className="flex justify-between items-center py-2 border-b border-slate-100">
        <span className="text-slate-500">Gross Subtotal</span>
        <span className="text-slate-800 font-bold font-mono">
          PKR {subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      </div>

      {/* Discount Configuration */}
      <div className="flex flex-col gap-2 border-b border-slate-100 pb-3">
        <span className="text-slate-500 text-left">Discount Settings</span>
        <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 mt-1">
          <button
            type="button"
            onClick={() => setDiscountType('percentage')}
            className={`py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
              discountType === 'percentage' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Percent (%)
          </button>
          <button
            type="button"
            onClick={() => setDiscountType('amount')}
            className={`py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
              discountType === 'amount' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Fixed Amount
          </button>
        </div>
        <input
          type="number"
          min="0"
          step="any"
          value={discountValue}
          onChange={(e) => setDiscountValue(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-850 text-sm mt-1 text-right font-mono focus:border-sky-500 focus:ring-sky-500 focus:ring-1 outline-none"
          placeholder={discountType === 'percentage' ? 'Discount %' : 'Discount PKR'}
        />
      </div>

      {discountAmount > 0 && (
        <div className="flex justify-between items-center py-2 border-b border-slate-100 text-emerald-600">
          <span>Discount Deduction</span>
          <span className="font-mono font-bold">
            - PKR {discountAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      )}

      {/* Tax Configuration for Invoices */}
      {isInvoice && (
        <div className="flex flex-col gap-2 border-b border-slate-100 pb-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Sales Tax Rate (%)</span>
            <input
              type="number"
              min="0"
              max="100"
              step="any"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              className="w-24 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-right text-xs font-mono focus:border-sky-500 outline-none"
              placeholder="0%"
            />
          </div>
          {taxAmount > 0 && (
            <div className="flex justify-between items-center text-xs text-slate-600 pt-1">
              <span>Tax Amount</span>
              <span className="font-mono">+ PKR {taxAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          )}
        </div>
      )}

      {/* Total Amount */}
      <div className="flex justify-between items-center py-3.5 text-base bg-sky-50/80 px-4 rounded-xl border border-sky-100 text-sky-700 font-extrabold">
        <span className="uppercase tracking-wider text-xs">
          {isInvoice ? 'Total Bill' : 'Total Estimate'}
        </span>
        <span className="font-mono">
          PKR {total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      </div>

      {/* Received & Remaining Balance for Invoices */}
      {isInvoice && (
        <>
          <div className="flex flex-col gap-2 border-b border-slate-100 pb-3 pt-1">
            <span className="text-slate-500 text-left">Advance / Payment Received</span>
            <input
              type="number"
              min="0"
              step="any"
              value={amountReceived}
              onChange={(e) => setAmountReceived(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-emerald-700 font-bold text-sm text-right font-mono focus:border-emerald-500 outline-none"
              placeholder="PKR 0.00"
            />
          </div>

          <div className={`flex justify-between items-center py-3 px-4 rounded-xl border font-bold ${
            remainingAmount <= 0 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
              : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}>
            <span className="text-xs uppercase tracking-wider">
              {remainingAmount <= 0 ? 'Payment Status' : 'Remaining Dues'}
            </span>
            <span className="font-mono">
              {remainingAmount <= 0 ? 'Fully Cleared ✓' : `PKR ${remainingAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
