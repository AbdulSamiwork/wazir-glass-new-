import React from 'react';
import { Phone, Mail, MapPin, Calendar, Trash2, MessageSquare, FileText } from 'lucide-react';
import { getWhatsAppUrl } from '../../utils/phoneUtils';

export default function LeadCardItem({
  lead,
  updatingId,
  handleStatusChange,
  handleDelete,
  onConvertToQuotation
}) {
  const currentStatus = lead.status || 'New';
  const whatsappMsg = `Hello ${lead.name}, this is Wazir Glass & Aluminium Centre. We received your quote inquiry for "${lead.service_type}" via our website. How can we assist you with your project?`;
  const whatsappUrl = getWhatsAppUrl(lead.phone, whatsappMsg);

  const statusBg =
    currentStatus === 'New'
      ? 'bg-amber-50 border-amber-300 text-amber-800'
      : currentStatus === 'Contacted'
      ? 'bg-sky-50 border-sky-300 text-sky-800'
      : currentStatus === 'Quoted'
      ? 'bg-purple-50 border-purple-300 text-purple-800'
      : currentStatus === 'Converted (Won)'
      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
      : 'bg-red-50 border-red-300 text-red-800';

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all flex flex-col gap-4 text-left">
      {/* Top bar: Customer & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h4 className="text-base font-black text-slate-800">{lead.name}</h4>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono font-bold text-[10px] uppercase tracking-wider">
              ID: #{lead.id}
            </span>
          </div>
          <span className="text-xs text-sky-600 font-bold block mt-0.5">
            📌 Service: {lead.service_type}
          </span>
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Status:</span>
          <select
            value={currentStatus}
            disabled={updatingId === lead.id}
            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
            className={`flex-1 sm:flex-initial px-3 py-2 sm:py-1.5 rounded-xl font-bold text-xs border transition-all cursor-pointer ${statusBg}`}
          >
            <option value="New">🟡 New Inquiry</option>
            <option value="Contacted">🔵 Contacted</option>
            <option value="Quoted">🟣 Quotation Sent</option>
            <option value="Converted (Won)">🟢 Converted (Won)</option>
            <option value="Closed (Lost)">🔴 Closed (Lost)</option>
          </select>
        </div>
      </div>

      {/* Middle info grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Column 1: Contact */}
        <div className="flex flex-col gap-1.5 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            Contact Info
          </span>
          <a
            href={`tel:${lead.phone}`}
            className="font-mono font-bold text-slate-800 hover:text-sky-600 flex items-center gap-2"
          >
            <Phone className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span className="break-all">{lead.phone}</span>
          </a>
          {lead.email && (
            <a
              href={`mailto:${lead.email}`}
              className="font-mono text-slate-600 hover:text-sky-600 flex items-center gap-2 truncate"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{lead.email}</span>
            </a>
          )}
          {lead.location && (
            <div className="text-slate-600 flex items-center gap-2 font-sans">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{lead.location}</span>
            </div>
          )}
        </div>

        {/* Column 2: Message Details */}
        <div className="md:col-span-2 flex flex-col gap-1.5 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
              Customer Requirement
            </span>
            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
              <Calendar className="w-3 h-3 shrink-0" />{' '}
              {new Date(lead.created_at).toLocaleString('en-GB')}
            </span>
          </div>
          <p className="text-slate-700 whitespace-pre-wrap leading-relaxed font-medium break-words">
            {lead.project_details || 'No additional details provided.'}
          </p>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-2.5 border-t border-slate-100 pt-3.5">
        <button
          onClick={() => handleDelete(lead.id)}
          className="w-full sm:w-auto px-4 py-2.5 min-h-[40px] sm:min-h-0 rounded-xl border border-slate-200 hover:border-red-200 hover:bg-red-50 text-xs font-bold text-red-500 transition-all flex items-center justify-center gap-1.5"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete Lead</span>
        </button>

        <div className="grid grid-cols-1 sm:flex items-center gap-2 w-full sm:w-auto">
          {/* WhatsApp 1-Click Follow up */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-2.5 min-h-[40px] sm:min-h-0 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
            title="Send WhatsApp message to client"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-white" />
            <span>WhatsApp Reply</span>
          </a>

          {/* Convert to Quotation */}
          {onConvertToQuotation && (
            <button
              onClick={() => onConvertToQuotation(lead)}
              className="w-full sm:w-auto px-4 py-2.5 min-h-[40px] sm:min-h-0 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-[0.98]"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Create Quotation</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
