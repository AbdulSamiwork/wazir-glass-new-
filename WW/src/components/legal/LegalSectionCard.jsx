import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Eye, Database, Lock, UserCheck, Globe, Cookie, Baby,
  Mail, Server, Fingerprint, FileWarning, Bell, Info, Layers, CreditCard,
  Clock, Truck, Shield, RefreshCw, AlertTriangle, Scale, Ban, Gavel, FileText
} from 'lucide-react';

const iconMap = {
  Eye, Database, Lock, UserCheck, Cookie, Fingerprint, Server, Baby, Globe,
  FileWarning, Bell, Mail, ShieldCheck, Clock, Info, Layers, CreditCard,
  Truck, Shield, RefreshCw, AlertTriangle, Scale, Ban, Gavel, FileText
};

export const renderLegalIcon = (iconProp, className = "w-4 h-4 sm:w-5 sm:h-5") => {
  if (React.isValidElement(iconProp)) return iconProp;
  if (typeof iconProp === 'string' && iconMap[iconProp]) {
    const IconComp = iconMap[iconProp];
    return <IconComp className={className} />;
  }
  return <ShieldCheck className={className} />;
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  })
};

export default function LegalSectionCard({ section, index, prefix = 'policy' }) {
  return (
    <motion.div
      id={`${prefix}-section-${index + 1}`}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      className="group relative bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-7 shadow-2xs sm:shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 scroll-mt-24 text-left"
    >
      <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-gradient-to-b from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-colors duration-300 mt-0.5">
          {renderLegalIcon(section.icon)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-2.5 sm:mb-3 group-hover:text-emerald-700 transition-colors leading-snug">
            {section.title}
          </h3>

          {section.content && (
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-words whitespace-pre-line mb-3">
              {section.content}
            </p>
          )}

          {Array.isArray(section.items) && section.items.length > 0 && (
            <ul className="space-y-2.5 sm:space-y-3">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 sm:gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 sm:mt-2" />
                  <div className="min-w-0 flex-1">
                    {item.label && <span className="font-semibold text-xs text-slate-700">{item.label}: </span>}
                    <span className="text-xs text-slate-600 leading-relaxed break-words">{item.desc || item.description || ''}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}
