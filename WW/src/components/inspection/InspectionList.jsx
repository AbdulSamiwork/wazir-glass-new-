import React, { useState } from 'react';
import { ClipboardCheck, Plus, Ruler, Phone, MapPin, User, Sparkles, Edit3, Trash2 } from 'lucide-react';
import PaginationControls from '../common/PaginationControls';

export default function InspectionList({
  inspections = [],
  handleCreateNew,
  handleEdit,
  handleDelete,
  triggerConvertToQuote,
  getTotalGlazingArea,
  getTotalHardwareCount
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalRecords = inspections.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedInspections = inspections.slice(startIndex, startIndex + pageSize);
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-xs font-bold uppercase tracking-wider mb-2 font-mono border border-sky-100">
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>Field Team &amp; Inspection Schedule</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-850 tracking-tight font-heading">
            Site Measurement &amp; Hardware Sheets
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Record exact glass dimensions AND hardware/fitting accessories. Convert any schedule into a formal quotation with 1-Click.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 transition-transform active:scale-95 shrink-0"
        >
          <Plus className="w-5 h-5" />
          <span>+ New Site Schedule</span>
        </button>
      </div>

      {inspections.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/80 text-slate-400 shadow-sm">
          <Ruler className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-lg font-bold text-slate-700">No site inspection sheets saved yet.</p>
          <p className="text-xs text-slate-500 mt-1">Click the button above to record your first site measurement and hardware schedule.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {paginatedInspections.map((insp) => {
            const glazingCount = insp.items?.filter(i => i.type === 'glazing').length || 0;
            const hardwareCount = insp.items?.filter(i => i.type === 'hardware').length || 0;
            
            return (
              <div 
                key={insp.id}
                className="bg-white border border-slate-200/80 hover:border-slate-300 rounded-2xl p-6 shadow-sm hover:shadow transition-all space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0 mt-1 shadow-sm">
                      <Ruler className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-extrabold text-slate-850 font-heading">{insp.clientName}</h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-bold">
                          Date: {insp.inspectionDate}
                        </span>
                        {glazingCount > 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[11px] font-bold">
                            🪟 {glazingCount} Glazing
                          </span>
                        )}
                        {hardwareCount > 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold">
                            🔧 {hardwareCount} Hardware
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-500 mt-1.5 font-medium">
                        {insp.clientPhone && (
                          <span className="flex items-center gap-1.5 text-slate-700">
                            <Phone className="w-3.5 h-3.5 text-sky-500" />
                            {insp.clientPhone}
                          </span>
                        )}
                        {insp.siteAddress && (
                          <span className="flex items-center gap-1.5 text-slate-600">
                            <MapPin className="w-3.5 h-3.5 text-rose-500" />
                            {insp.siteAddress}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          Field Engineer: <strong className="text-slate-700">{insp.technicianName}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => triggerConvertToQuote(insp)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>1-Click Quote</span>
                    </button>
                    <button
                      onClick={() => handleEdit(insp)}
                      className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(insp.id)}
                      className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/60">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
                    <span>Schedule Items ({insp.items?.length || 0} Total)</span>
                    <div className="flex items-center gap-4 text-[11px]">
                      <span className="text-sky-700">Total Glazing: <strong>{getTotalGlazingArea(insp.items || [])} Sq.Ft.</strong></span>
                      <span className="text-amber-700">Total Hardware: <strong>{getTotalHardwareCount(insp.items || [])} Units</strong></span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    {(insp.items || []).map((it, idx) => {
                      const isHardware = it.type === 'hardware';
                      return (
                        <div 
                          key={idx} 
                          className={`p-3 rounded-xl bg-white border flex items-center justify-between gap-2 shadow-2xs ${
                            isHardware ? 'border-amber-200/70 bg-amber-50/30' : 'border-sky-200/70 bg-sky-50/20'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-base shrink-0">{isHardware ? '🔧' : '🪟'}</span>
                            <span className="font-bold text-slate-800 truncate">{it.description || 'Item Section'}</span>
                          </div>
                          <span className="text-slate-600 font-mono text-right shrink-0 ml-2 text-[11px]">
                            {!isHardware && it.width && it.height ? `${it.width}x${it.height} ft • ` : ''}
                            <strong className={isHardware ? 'text-amber-700 font-bold' : 'text-sky-700 font-bold'}>
                              {it.quantity} {it.unit}
                            </strong>
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {insp.generalNotes && (
                    <div className="mt-3 text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200/70">
                      <strong className="text-slate-800">📝 Site Observations:</strong> {insp.generalNotes}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {inspections.length > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={totalRecords}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      )}
    </div>
  );
}
