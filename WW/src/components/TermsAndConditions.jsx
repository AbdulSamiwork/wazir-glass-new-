import React, { useEffect } from 'react';
import LegalHeroHeader from './legal/LegalHeroHeader';
import LegalSectionCard from './legal/LegalSectionCard';
import LegalContactCTA from './legal/LegalContactCTA';
import { defaultTermsSections } from './legal/termsData';

export default function TermsAndConditions({ data }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const badgeText = data?.badge || "Legal Agreement";
  const titleLine1 = data?.titleLine1 || "Terms &";
  const titleLine2 = data?.titleLine2 || "Conditions";
  const description = data?.description || "Please read these terms carefully before using our services. By engaging with Wazir Glass & Aluminium Centre, you agree to be bound by the following conditions.";
  const lastUpdated = data?.lastUpdated || "October 2026";
  const subNotice = data?.subNotice || "Effective Immediately";
  const quickSummary = data?.quickSummary || "We provide custom glass & aluminium fabrication services. 50% advance is required to start production. Custom products are non-returnable. We offer a 1-year workmanship warranty. All disputes are governed by Pakistani law with jurisdiction in Lahore.";
  const sections = Array.isArray(data?.sections) && data.sections.length > 0 ? data.sections : defaultTermsSections;
  const ctaTitle = data?.ctaTitle || "Have Questions?";
  const ctaDescription = data?.ctaDescription || "If you have any questions about these Terms & Conditions, please contact us through our website or visit our showroom.";
  const ctaBtnText = data?.ctaBtnText || "Contact Us";

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <LegalHeroHeader
        badgeText={badgeText}
        titleLine1={titleLine1}
        titleLine2={titleLine2}
        description={description}
        lastUpdated={lastUpdated}
        subNotice={subNotice}
        isTerms={true}
      />

      <section className="relative py-10 sm:py-20">
        <div className="max-w-4xl mx-auto px-3.5 sm:px-6">
          {/* Quick Summary Card */}
          {quickSummary && (
            <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-left">
              <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest block mb-1">
                Executive Summary
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {quickSummary}
              </p>
            </div>
          )}

          {/* Quick Navigation Pills on Mobile */}
          <div className="sm:hidden mb-6">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Quick Navigation:</span>
              <span className="text-[10px] text-emerald-600 font-mono font-bold">{sections.length} Sections</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
              {sections.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToSection(`terms-section-${idx + 1}`)}
                  className="shrink-0 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-medium text-slate-700 shadow-2xs active:bg-emerald-50 active:text-emerald-700 transition-colors cursor-pointer"
                >
                  {idx + 1}. {s.title.split('. ')[1] || s.title}
                </button>
              ))}
            </div>
          </div>

          {/* All Terms Sections */}
          <div className="space-y-4 sm:space-y-6">
            {sections.map((section, index) => (
              <LegalSectionCard
                key={index}
                section={section}
                index={index}
                prefix="terms"
              />
            ))}
          </div>

          <LegalContactCTA
            title={ctaTitle}
            description={ctaDescription}
            btnText={ctaBtnText}
          />
        </div>
      </section>
    </>
  );
}
