import React from 'react';

export default function CustomerInfoFields({
  docNumber,
  setDocNumber,
  docNumberLabel = "Document Number *",
  date,
  setDate,
  dateLabel = "Date *",
  headerSectionTitle = "1. Header Information",
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  customerAddress,
  setCustomerAddress
}) {
  const handlePhoneChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 11);
    setCustomerPhone(raw);
  };

  return (
    <>
      {/* Header details card */}
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-200/80 flex flex-col gap-5 shadow-sm">
        <h4 className="text-sm font-bold text-sky-600 uppercase tracking-wider border-b border-slate-100 pb-3">
          {headerSectionTitle}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              {docNumberLabel}
            </label>
            <input
              type="text"
              value={docNumber}
              onChange={(e) => setDocNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-mono shadow-sm focus:border-sky-500 focus:ring-sky-500 focus:ring-1 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              {dateLabel}
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-850 text-sm font-mono shadow-sm focus:border-sky-500 focus:ring-sky-500 focus:ring-1 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Client details card */}
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-200/80 flex flex-col gap-5 shadow-sm">
        <h4 className="text-sm font-bold text-sky-600 uppercase tracking-wider border-b border-slate-100 pb-3">
          2. Client details
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Client Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="Enter client name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-850 text-sm font-bold shadow-sm focus:border-sky-500 focus:ring-sky-500 focus:ring-1 outline-none transition-all"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Contact Phone Number *
              </label>
              {customerPhone && (
                <span className={`text-[11px] font-mono font-bold ${
                  customerPhone.length === 11 && customerPhone.startsWith('0') 
                    ? 'text-emerald-600' 
                    : !customerPhone.startsWith('0') 
                      ? 'text-rose-500' 
                      : 'text-amber-500'
                }`}>
                  {customerPhone.length}/11 digits
                </span>
              )}
            </div>
            <div className="relative">
              <input
                type="tel"
                required
                maxLength={11}
                placeholder="03XXXXXXXXX (11 digits)"
                value={customerPhone}
                onChange={handlePhoneChange}
                className={`w-full px-4 py-3 rounded-xl bg-white border text-slate-850 text-sm font-mono shadow-sm outline-none transition-all ${
                  customerPhone
                    ? customerPhone.length === 11 && customerPhone.startsWith('0')
                      ? 'border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                      : !customerPhone.startsWith('0')
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                        : 'border-amber-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                    : 'border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                }`}
              />
            </div>
            {/* Real-time Validation Message */}
            {customerPhone ? (
              <p className={`text-[11px] mt-1.5 font-medium flex items-center gap-1 ${
                customerPhone.length === 11 && customerPhone.startsWith('0')
                  ? 'text-emerald-600'
                  : !customerPhone.startsWith('0')
                    ? 'text-rose-600'
                    : 'text-amber-600'
              }`}>
                {customerPhone.length === 11 && customerPhone.startsWith('0') ? (
                  <>✓ Valid 11-digit phone number</>
                ) : !customerPhone.startsWith('0') ? (
                  <>⚠️ Must start with 0 (e.g. 03XXXXXXXXX)</>
                ) : (
                  <>{11 - customerPhone.length} more digit(s) needed (Total 11 digits starting with 0)</>
                )}
              </p>
            ) : (
              <p className="text-[11px] text-slate-400 mt-1">Must start with 0 and be 11 digits (e.g. 03001234567)</p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Project Location / Site Address
            </label>
            <input
              type="text"
              placeholder="Enter building address or location details"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-850 text-sm shadow-sm focus:border-sky-500 focus:ring-sky-500 focus:ring-1 outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </>
  );
}
