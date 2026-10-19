import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import LegalHeroHeader from './legal/LegalHeroHeader';
import LegalSectionCard, { renderLegalIcon } from './legal/LegalSectionCard';
import LegalContactCTA from './legal/LegalContactCTA';
import { defaultPrivacySections, defaultTrustBadges } from './legal/privacyData';

export default function PrivacyPolicy({ data }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const badgeText = data?.badge || "Data Protection";
  const titleLine1 = data?.titleLine1 || "Privacy";
  const titleLine2 = data?.titleLine2 || "Policy";
  const description = data?.description || "Your privacy matters to us. This policy explains how Wazir Glass & Aluminium Centre collects, uses, protects, and handles your personal information.";
  const lastUpdated = data?.lastUpdated || "October 2026";
  const subNotice = data?.subNotice || "Your Data, Your Rights";
  const trustBadges = Array.isArray(data?.trustBadges) && data.trustBadges.length > 0 ? data.trustBadges : defaultTrustBadges;
  const sections = Array.isArray(data?.sections) && data.sections.length > 0 ? data.sections : defaultPrivacySections;
  const ctaTitle = data?.ctaTitle || "Privacy Concerns?";
  const ctaDescription = data?.ctaDescription || "If you have any questions about this Privacy Policy or want to exercise your data rights, please reach out to us.";
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
      />

      <section className="relative py-10 sm:py-20">
        <div className="max-w-4xl mx-auto px-3.5 sm:px-6">
          {/* Trust Badges */}
          <div className="mb-8 sm:mb-12 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4">
            {trustBadges.map((badge, i) => (
              <div key={i} className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs sm:shadow-sm">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 text-emerald-500">
                  {renderLegalIcon(badge.icon || (i === 0 ? "Lock" : i === 1 ? "ShieldCheck" : "Fingerprint"))}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">{badge.label}</div>
                  <div className="text-[11px] text-slate-500">{badge.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Jump Bar */}
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
                  onClick={() => scrollToSection(`policy-section-${idx + 1}`)}
                  className="shrink-0 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-medium text-slate-700 shadow-2xs active:bg-emerald-50 active:text-emerald-700 transition-colors cursor-pointer"
                >
                  {idx + 1}. {s.title.split('. ')[1] || s.title}
                </button>
              ))}
            </div>
          </div>

          {/* All Privacy Sections */}
          <div className="space-y-4 sm:space-y-6">
            {sections.map((section, index) => (
              <LegalSectionCard
                key={index}
                section={section}
                index={index}
                prefix="policy"
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
