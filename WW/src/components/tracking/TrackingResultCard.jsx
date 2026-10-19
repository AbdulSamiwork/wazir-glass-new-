import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Truck, ShieldCheck, Phone } from 'lucide-react';
import { getWhatsAppUrl } from '../../utils/phoneUtils';

const getStageIndex = (status) => {
  const s = (status || '').toLowerCase();
  if (s === 'completed' || s === 'paid' || s === 'delivered' || s === 'finished') return 4;
  if (s === 'ready' || s === 'installing' || s === 'installation' || s === 'shipped' || s === 'dispatched') return 3;
  if (s === 'in_progress' || s === 'fabrication' || s === 'processing' || s === 'workshop' || s === 'glazing' || s === 'cutting') return 2;
  return 1;
};

export default function TrackingResultCard({ order, whatsappNumber }) {
  const stage = getStageIndex(order.status);
  const whatsappMsg = `Hello Wazir Glass! I am tracking my ${order.doc_type} #${order.order_number} (${order.customer_name}). Can you provide a live workshop update?`;
  const whatsappUrl = getWhatsAppUrl(whatsappNumber, whatsappMsg);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/40 border border-slate-700/60 rounded-3xl p-5 sm:p-6 flex flex-col gap-6"
    >
      {/* Order Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/60 pb-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-400 font-mono text-[10px] font-bold uppercase">
            {order.doc_type}
          </span>
          <h4 className="text-lg font-black text-white mt-1 font-mono">#{order.order_number}</h4>
          <span className="text-xs text-slate-400">Customer: <strong className="text-slate-200">{order.customer_name}</strong></span>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-[10px] font-mono text-slate-400 block uppercase">Order Value</span>
          <span className="text-lg font-black text-emerald-400 font-mono">PKR {Number(order.total || 0).toLocaleString()}</span>
          <span className="text-[10px] text-slate-500 block font-mono">Date: {order.date}</span>
        </div>
      </div>

      {/* 4-Stage Progress Stepper */}
      <div className="py-2">
        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-4">
          Live Workshop & Installation Status
        </span>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative">
          <div className={`p-3 rounded-2xl border flex flex-col gap-1 text-center transition-all ${
            stage >= 1 ? 'bg-sky-500/15 border-sky-500/40 text-sky-300' : 'bg-slate-900/50 border-slate-800 text-slate-600'
          }`}>
            <CheckCircle2 className={`w-5 h-5 mx-auto ${stage >= 1 ? 'text-sky-400' : 'text-slate-600'}`} />
            <span className="text-xs font-bold mt-1">1. Confirmed</span>
            <span className="text-[10px] opacity-75">Site Measured</span>
          </div>

          <div className={`p-3 rounded-2xl border flex flex-col gap-1 text-center transition-all ${
            stage >= 2 ? 'bg-sky-500/15 border-sky-500/40 text-sky-300' : 'bg-slate-900/50 border-slate-800 text-slate-600'
          }`}>
            <Clock className={`w-5 h-5 mx-auto ${stage >= 2 ? 'text-sky-400' : 'text-slate-600'}`} />
            <span className="text-xs font-bold mt-1">2. Fabrication</span>
            <span className="text-[10px] opacity-75">Workshop Glazing</span>
          </div>

          <div className={`p-3 rounded-2xl border flex flex-col gap-1 text-center transition-all ${
            stage >= 3 ? 'bg-sky-500/15 border-sky-500/40 text-sky-300' : 'bg-slate-900/50 border-slate-800 text-slate-600'
          }`}>
            <Truck className={`w-5 h-5 mx-auto ${stage >= 3 ? 'text-sky-400' : 'text-slate-600'}`} />
            <span className="text-xs font-bold mt-1">3. Installation</span>
            <span className="text-[10px] opacity-75">Site Dispatch</span>
          </div>

          <div className={`p-3 rounded-2xl border flex flex-col gap-1 text-center transition-all ${
            stage >= 4 ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' : 'bg-slate-900/50 border-slate-800 text-slate-600'
          }`}>
            <ShieldCheck className={`w-5 h-5 mx-auto ${stage >= 4 ? 'text-emerald-400' : 'text-slate-600'}`} />
            <span className="text-xs font-bold mt-1">4. Completed</span>
            <span className="text-[10px] opacity-75">Handover Done</span>
          </div>
        </div>
      </div>

      {/* Order Items Summary */}
      {order.items && order.items.length > 0 && (
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2">
            Included Items ({order.items.length})
          </span>
          <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-slate-300 py-1 border-b border-slate-800/60 last:border-0">
                <span className="truncate pr-2 font-medium">▪ {item.description || item.name || 'Glazing Item'}</span>
                <span className="font-mono text-slate-400 shrink-0">{item.qty || 1} {item.unit || 'sq.ft'}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Connect WhatsApp Button */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <span className="text-xs text-slate-400 hidden sm:inline">Need expedited delivery or dimension change?</span>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20"
        >
          <Phone className="w-4 h-4 fill-slate-950" />
          <span>Contact Workshop on WhatsApp</span>
        </a>
      </div>
    </motion.div>
  );
}
