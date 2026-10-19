import React from 'react';
import { SocialIcon } from './SocialIcons';

const BRAND_HOVER_STYLES = {
  facebook: 'hover:bg-[#1877F2]/10 hover:border-[#1877F2] hover:text-[#1877F2]',
  instagram: 'hover:bg-[#E4405F]/10 hover:border-[#E4405F] hover:text-[#E4405F]',
  whatsapp: 'hover:bg-[#25D366]/10 hover:border-[#25D366] hover:text-[#25D366]',
  youtube: 'hover:bg-[#FF0000]/10 hover:border-[#FF0000] hover:text-[#FF0000]',
  linkedin: 'hover:bg-[#0A66C2]/10 hover:border-[#0A66C2] hover:text-[#0A66C2]',
  tiktok: 'hover:bg-slate-900/10 hover:border-slate-900 hover:text-slate-900',
  twitter: 'hover:bg-slate-900/10 hover:border-slate-900 hover:text-slate-900',
  pinterest: 'hover:bg-[#BD081C]/10 hover:border-[#BD081C] hover:text-[#BD081C]'
};

export default function FooterSocialRow({ socials = [] }) {
  const activeSocials = socials.filter(s => s && s.enabled && typeof s.url === 'string' && s.url.trim().length > 0);

  if (activeSocials.length === 0) return null;

  return (
    <div className="mt-5 w-full">
      <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
        Connect With Us
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {activeSocials.map((item) => {
          const hoverClass = BRAND_HOVER_STYLES[item.id] || 'hover:bg-sky-50 hover:border-sky-500 hover:text-sky-600';
          return (
            <a
              key={item.id || item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit our ${item.name || 'social'} profile`}
              title={item.name}
              className={`w-9 h-9 rounded-xl bg-white border border-slate-200/90 text-slate-600 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-2xs ${hoverClass}`}
            >
              <SocialIcon id={item.id} className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
