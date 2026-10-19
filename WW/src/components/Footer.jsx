import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import FooterBrandCol from './footer/FooterBrandCol';
import FooterAccordionSection from './footer/FooterAccordionSection';
import { DEFAULT_SOCIALS } from '../utils/apiConfig';

export default function Footer({ data, contactData }) {
  const tagline = data?.tagline || "Wazir Glass & Aluminium Centre is your high-end supplier for luxury partitions, custom windows, security storefronts, and premium steel-fitted doors. Committed to quality, precision, and customer trust.";
  const copyright = data?.copyright || "© 2026 Wazir Glass & Aluminium Centre. All Rights Reserved.";
  const socials = (Array.isArray(data?.socials) && data.socials.length > 0) ? data.socials : DEFAULT_SOCIALS;

  const contactDetails = {
    address: contactData?.address || "Akbar Market, Kalma Chowk  Lahore, Pakistan",
    phone: contactData?.phone || "+92 (300) 0000000",
    phoneCall: contactData?.phoneCall || "+923000000000",
    email: contactData?.email || "info@wazirglass.com",
    whatsappNumber: contactData?.whatsappNumber || "+923000000000"
  };

  const [openSections, setOpenSections] = useState({
    navigation: false,
    catalog: false,
    contact: false
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Products", href: "#products" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" }
  ];

  const categories = [
    "Aluminium Windows",
    "Aluminium Doors",
    "Glass Partitions",
    "Office Glass Cabins",
    "Shop Front Glass",
    "Shower Enclosures",
    "Decorative Mirrors"
  ];

  return (
    <footer className="bg-slate-100 border-t border-slate-200 pt-10 sm:pt-16 pb-8 relative overflow-hidden footer-safe">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sky-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-0 md:gap-10 mb-8 sm:mb-12 text-left">
          <FooterBrandCol
            tagline={tagline}
            whatsappNumber={contactDetails.whatsappNumber}
            socials={socials}
          />

          <FooterAccordionSection
            title="Quick Navigation"
            isOpen={openSections.navigation}
            onToggle={() => toggleSection('navigation')}
            type="links"
            items={quickLinks}
          />

          <FooterAccordionSection
            title="Product Catalog"
            isOpen={openSections.catalog}
            onToggle={() => toggleSection('catalog')}
            type="catalog"
            items={categories}
          />

          <FooterAccordionSection
            title="Direct Contact"
            isOpen={openSections.contact}
            onToggle={() => toggleSection('contact')}
            type="contact"
            contactDetails={contactDetails}
          />
        </div>

        {/* Footer Bottom copyright */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center sm:text-left">
          <span>{copyright}</span>
          <div className="flex gap-4 items-center">
            <a
              href="#privacy"
              className="group/legal inline-flex items-center hover:text-sky-600 cursor-pointer transition-colors py-1 min-h-[36px] sm:min-h-0"
            >
              <span className="w-0 opacity-0 -translate-x-1 group-hover/legal:w-3.5 group-hover/legal:opacity-100 group-hover/legal:translate-x-0 group-hover/legal:mr-1 transition-all duration-200 text-sky-500 flex items-center shrink-0 overflow-hidden">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <span>Privacy Policy</span>
            </a>
            <span className="text-slate-300">//</span>
            <a
              href="#terms"
              className="group/legal inline-flex items-center hover:text-sky-600 cursor-pointer transition-colors py-1 min-h-[36px] sm:min-h-0"
            >
              <span className="w-0 opacity-0 -translate-x-1 group-hover/legal:w-3.5 group-hover/legal:opacity-100 group-hover/legal:translate-x-0 group-hover/legal:mr-1 transition-all duration-200 text-sky-500 flex items-center shrink-0 overflow-hidden">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <span>Terms of Service</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
