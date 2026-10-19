import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Mail, Clock, MessageSquare, ExternalLink } from 'lucide-react';
import { getWhatsAppUrl } from '../../utils/phoneUtils';

export default function ContactInfoCard({ data }) {
  const companyName = data?.companyName || "Wazir Glass & Aluminium Centre";
  const address = data?.address || "Akbar Market Ferozpur Road, Kalma Chowk 2L-A, Gulberg-III, Lahore-Pakistan";
  const phone = data?.phone || "+92 (300) 0000000";
  const phoneCall = data?.phoneCall || "+923000000000";
  const email = data?.email || "wazirglass100@gmail.com";
  const businessHours = data?.businessHours || "Monday – Saturday: 9:00 AM – 7:00 PM";
  const whatsappNumber = data?.whatsappNumber || "+923218457556";

  const cleanMapUrl = useMemo(() => {
    let url = data?.mapEmbedUrl || '';
    if (url.includes('<iframe')) {
      const match = url.match(/src=["']([^"']+)["']/i);
      if (match) url = match[1];
    }
    if (url.includes('"')) {
      url = url.split('"')[0];
    }
    url = url.trim();
    if (!url || !url.startsWith('http')) {
      const queryAddress = address || "Akbar Market Ferozpur Road, Kalma Chowk 2L-A, Gulberg-III, Lahore-Pakistan";
      return `https://maps.google.com/maps?q=${encodeURIComponent(queryAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }
    return url;
  }, [data?.mapEmbedUrl, address]);

  const directMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="lg:col-span-5 flex flex-col justify-between gap-6"
    >
      <div className="glass-panel p-6 rounded-2xl text-left">
        <h4 className="text-lg font-bold text-slate-900 mb-6">
          {companyName}
        </h4>

        <div className="flex flex-col gap-5 text-sm">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 mt-0.5 shrink-0">
              <MapPin className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="block text-slate-400 font-bold uppercase tracking-wider text-[10px]">Head Office Address</span>
              <span className="block text-slate-700 mt-1 font-medium">{address}</span>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 mt-0.5 shrink-0">
              <Phone className="w-4.5 h-4.5" />
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <span className="block text-slate-400 font-bold uppercase tracking-wider text-[10px]">Primary Contact</span>
                <span className="block text-slate-700 mt-0.5 hover:text-sky-600 transition-colors font-mono font-medium">
                  <a href={`tel:${phoneCall}`}>{phone}</a>
                </span>
              </div>
              {data?.additionalNumbers?.map((num, idx) => (
                <div key={idx}>
                  <span className="block text-slate-400 font-bold uppercase tracking-wider text-[10px]">{num.name || 'Additional Contact'}</span>
                  <span className="block text-slate-700 mt-0.5 hover:text-sky-600 transition-colors font-mono font-medium">
                    <a href={`tel:${num.phoneCall}`}>{num.phone}</a>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 mt-0.5 shrink-0">
              <Mail className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="block text-slate-400 font-bold uppercase tracking-wider text-[10px]">Email Correspondence</span>
              <span className="block text-slate-700 mt-1 hover:text-sky-600 transition-colors font-medium">
                <a href={`mailto:${email}`}>{email}</a>
              </span>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 mt-0.5 shrink-0">
              <Clock className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="block text-slate-400 font-bold uppercase tracking-wider text-[10px]">Business Hours</span>
              <span className="block text-slate-700 mt-1 font-medium">{businessHours}</span>
            </div>
          </div>
        </div>

        {/* Direct Quick WhatsApp click */}
        <div className="mt-7 pt-5 border-t border-slate-100">
          <a
            href={getWhatsAppUrl(whatsappNumber, 'Hello, I would like to inquire about your products and services.')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-emerald-500/15 hover:shadow-emerald-500/25 active:scale-[0.99]"
          >
            <MessageSquare className="w-4.5 h-4.5 fill-white text-emerald-500" />
            Chat Instantly on WhatsApp
          </a>
        </div>
      </div>

      {/* Styled Interactive Map frame with Direct Maps Link */}
      <div className="w-full h-72 sm:h-80 rounded-2xl bg-slate-100 border border-slate-200/90 overflow-hidden relative shadow-sm group">
        <a
          href={directMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-xl bg-white/95 hover:bg-white text-slate-800 text-[11px] font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 border border-slate-200 backdrop-blur-sm"
          title="Open directions in Google Maps"
        >
          <ExternalLink className="w-3.5 h-3.5 text-sky-500" />
          <span>Open in Google Maps</span>
        </a>

        <iframe
          title="Wazir Glass Location Map"
          src={cleanMapUrl}
          width="100%"
          height="100%"
          className="w-full h-full border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </motion.div>
  );
}
