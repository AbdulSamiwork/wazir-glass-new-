import React from 'react';

export default function InspectionClientFields({
  inspectionDate,
  setInspectionDate,
  technicianName,
  setTechnicianName,
  clientName,
  setClientName,
  clientPhone,
  setClientPhone,
  siteAddress,
  setSiteAddress
}) {
  return (
    <>
      {/* Card 1: Header / Inspector Info */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 flex flex-col gap-5 shadow-sm">
        <h4 className="text-sm font-bold text-sky-600 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
          <span>1. Inspection Schedule Header</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Inspection Date *</label>
            <input
              type="date"
              value={inspectionDate}
              onChange={(e) => setInspectionDate(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-850 text-sm font-mono shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Field Engineer / Karigar Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Master Karigar Arshad / Engineer Wazir"
              value={technicianName}
              onChange={(e) => setTechnicianName(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-850 text-sm font-bold shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Card 2: Client Details */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 flex flex-col gap-5 shadow-sm">
        <h4 className="text-sm font-bold text-sky-600 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
          <span>2. Client &amp; Site Location Details</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Client Full Name *</label>
            <input
              type="text"
              required
              placeholder="Enter client name (e.g. Malik Tariq Sahib)"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-bold shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Client Phone Number</label>
            <input
              type="text"
              placeholder="0300-1234567"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-mono shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Site Address / Project Location</label>
          <input
            type="text"
            placeholder="e.g. Plaza 42, Block H, DHA Phase 6, Lahore"
            value={siteAddress}
            onChange={(e) => setSiteAddress(e.target.value)}
            className="w-full px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
          />
        </div>
      </div>
    </>
  );
}
