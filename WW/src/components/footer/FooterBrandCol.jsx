import React from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import Logo from '../Logo';
import FooterSocialRow from './FooterSocialRow';
import { getWhatsAppUrl } from '../../utils/phoneUtils';

export default function FooterBrandCol({ tagline, whatsappNumber, socials }) {
  return (
    <div className="lg:col-span-4 flex flex-col items-start pb-6 md:pb-0 border-b md:border-b-0 border-slate-200/80 mb-2 md:mb-0">
      <a href="#home" className="flex items-center gap-3 group mb-4 sm:mb-5">
        <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
          <Logo className="w-9 h-9 sm:w-10 sm:h-10 text-base sm:text-lg" />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-base sm:text-lg tracking-wide metallic-text">
            WAZIR
          </span>
          <span className="text-[10px] font-bold text-sky-600 tracking-widest uppercase">
            Glass & Aluminium
          </span>
        </div>
      </a>

      <p className="text-xs text-slate-600 leading-relaxed max-w-sm mb-5 sm:mb-6">
        {tagline}
      </p>

      <a
        href={getWhatsAppUrl(whatsappNumber, 'Hello, I would like to get in touch with Wazir Glass & Aluminium Centre.')}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 text-xs font-bold transition-all duration-300 min-h-[44px] shadow-2xs"
      >
        <MessageSquare className="w-4 h-4 fill-current text-emerald-500" />
        <span>Contact on WhatsApp</span>
        <ArrowRight className="w-3.5 h-3.5 text-emerald-500 opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
      </a>

      <FooterSocialRow socials={socials} />
    </div>
  );
}

