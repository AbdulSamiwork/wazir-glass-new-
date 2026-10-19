import React from 'react';
import { ChevronDown, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';

export default function FooterAccordionSection({
  title,
  isOpen,
  onToggle,
  type = 'links', // 'links' | 'catalog' | 'contact'
  items = [],
  contactDetails = null
}) {
  return (
    <div className={`flex flex-col border-b md:border-b-0 border-slate-200/80 ${type === 'links' ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
      {/* Mobile Accordion Toggle Button */}
      <button
        type="button"
        onClick={onToggle}
        className="md:hidden w-full flex items-center justify-between py-3.5 text-left text-xs font-extrabold text-slate-800 uppercase tracking-widest min-h-[44px]"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <ChevronDown 
          className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-sky-600' : ''
          }`} 
        />
      </button>

      {/* Desktop Static Header */}
      <h4 className="hidden md:block text-xs font-extrabold text-slate-800 uppercase tracking-widest mb-5">
        {title}
      </h4>

      {/* Collapsible Content */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'max-h-96 pb-4 opacity-100' 
            : 'max-h-0 md:max-h-none opacity-0 md:opacity-100'
        }`}
      >
        {type === 'links' && (
          <ul className="flex flex-col gap-2.5 sm:gap-3 text-xs text-slate-600 pt-1 md:pt-0">
            {items.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="group/link inline-flex items-center hover:text-sky-600 transition-colors py-1.5 md:py-1 min-h-[38px] md:min-h-0 w-full"
                >
                  <span className="w-0 opacity-0 -translate-x-2 group-hover/link:w-4 group-hover/link:opacity-100 group-hover/link:translate-x-0 group-hover/link:mr-1.5 transition-all duration-200 text-sky-500 flex items-center shrink-0 overflow-hidden">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">
                    {link.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}

        {type === 'catalog' && (
          <ul className="flex flex-col gap-2.5 sm:gap-3 text-xs text-slate-600 pt-1 md:pt-0">
            {items.map((cat, idx) => (
              <li key={idx}>
                <a
                  href="#products"
                  className="group/link inline-flex items-center hover:text-sky-600 transition-colors py-1.5 md:py-1 min-h-[38px] md:min-h-0 w-full"
                >
                  <span className="w-0 opacity-0 -translate-x-2 group-hover/link:w-4 group-hover/link:opacity-100 group-hover/link:translate-x-0 group-hover/link:mr-1.5 transition-all duration-200 text-sky-500 flex items-center shrink-0 overflow-hidden">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">
                    {cat}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}

        {type === 'contact' && contactDetails && (
          <ul className="flex flex-col gap-3.5 sm:gap-4 text-xs text-slate-600 pt-1 md:pt-0">
            <li className="flex items-start gap-3 py-1">
              <MapPin className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">{contactDetails.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-sky-500 flex-shrink-0" />
              <a
                href={`tel:${contactDetails.phoneCall}`}
                className="group/contact inline-flex items-center hover:text-sky-600 transition-colors py-1 min-h-[38px] md:min-h-0 font-mono font-medium"
              >
                <span className="w-0 opacity-0 -translate-x-1.5 group-hover/contact:w-3.5 group-hover/contact:opacity-100 group-hover/contact:translate-x-0 group-hover/contact:mr-1 transition-all duration-200 text-sky-500 flex items-center shrink-0 overflow-hidden">
                  <ArrowRight className="w-3 h-3" />
                </span>
                <span>{contactDetails.phone}</span>
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-sky-500 flex-shrink-0" />
              <a
                href={`mailto:${contactDetails.email}`}
                className="group/contact inline-flex items-center hover:text-sky-600 transition-colors py-1 min-h-[38px] md:min-h-0 font-mono"
              >
                <span className="w-0 opacity-0 -translate-x-1.5 group-hover/contact:w-3.5 group-hover/contact:opacity-100 group-hover/contact:translate-x-0 group-hover/contact:mr-1 transition-all duration-200 text-sky-500 flex items-center shrink-0 overflow-hidden">
                  <ArrowRight className="w-3 h-3" />
                </span>
                <span>{contactDetails.email}</span>
              </a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
