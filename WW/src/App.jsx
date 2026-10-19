import React, { lazy, Suspense, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import ScrollToTopButton from './components/ScrollToTopButton';
import PWAInstallBanner from './components/PWAInstallBanner';
import MainSections from './components/MainSections';

const AdminPanel = lazy(() => import('./components/AdminPanel'));
const TermsAndConditions = lazy(() => import('./components/TermsAndConditions'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
import ProjectTrackingModal from './components/ProjectTrackingModal';
import SecretAdminPortalModal from './components/SecretAdminPortalModal';
import { useSecretAdminTriggers } from './hooks/useSecretAdminTriggers';
import { API_BASE_URL, normalizeSiteData } from './utils/apiConfig';

// Common fallback for lazy loaded sections
const SectionLoader = () => (
  <div className="py-24 flex flex-col items-center justify-center gap-3">
    <div className="w-9 h-9 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
    <span className="text-xs font-mono text-slate-400">Loading catalog modules...</span>
  </div>
);

export default function App() {
  const [siteData, setSiteData] = useState(null);
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#home');
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const { isSecretPortalOpen, setIsSecretPortalOpen } = useSecretAdminTriggers(setCurrentHash);

  // Fetch website data from MySQL API with static data.json fallback
  const fetchSiteData = () => {
    const dataUrl = `${API_BASE_URL}?action=get`;
    const token = localStorage.getItem('wazir_admin_token');
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

    fetch(dataUrl, { cache: 'no-store', headers })
      .then((res) => {
        if (!res.ok) throw new Error('API server unreachable');
        return res.json();
      })
      .then((data) => {
        if (data && data.hero) {
          setSiteData(normalizeSiteData(data));
        } else {
          throw new Error('Invalid JSON schema');
        }
      })
      .catch((err) => {
        console.warn('API fetch failed, loading fallback data.json:', err.message);
        fetch('/data.json')
          .then((res) => res.json())
          .then((fallbackData) => setSiteData(normalizeSiteData(fallbackData)))
          .catch((e) => console.error('Failed to load fallback data.json:', e));
      });
  };

  useEffect(() => {
    fetchSiteData();
    // Silently preload all lazy sections in background
    const preloadTimer = setTimeout(() => {
      import('./components/AboutSection');
      import('./components/ProductCategories');
      import('./components/FeaturedProducts');
      import('./components/ServicesSection');
      import('./components/WhyChooseUs');
      import('./components/BeforeAfterSlider');
      import('./components/ProjectGallery');
      import('./components/ProcessTimeline');
      import('./components/TestimonialsSection');
      import('./components/ContactForm');
    }, 800);
    return () => clearTimeout(preloadTimer);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash || '#home';
      setCurrentHash(newHash);

      if (newHash !== '#terms' && newHash !== '#privacy' && newHash !== '#home') {
        const targetId = newHash.replace('#', '');
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else if (newHash === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Clean up any direct path requests to /wazirglass into hash
  useEffect(() => {
    if (window.location.pathname.toLowerCase().includes('wazirglass') || window.location.search.toLowerCase().includes('wazirglass')) {
      sessionStorage.setItem('wazir_secret_portal_unlocked', 'true');
      window.history.replaceState(null, '', '/#wazirglass');
      setCurrentHash('#wazirglass');
    }
  }, []);

  const isAdminView = currentHash === '#admin' || currentHash === '#wazirglass';

  if (isAdminView) {
    const isSecretUnlocked = sessionStorage.getItem('wazir_secret_portal_unlocked') === 'true';
    const hasValidAdminToken = !!localStorage.getItem('wazir_admin_token');
    
    if (!isSecretUnlocked && !hasValidAdminToken) {
      window.location.hash = '#home';
      return null;
    }

    return (
      <Suspense fallback={<SectionLoader />}>
        <AdminPanel onSaveSuccess={fetchSiteData} />
      </Suspense>
    );
  }

  const isLegalPage = currentHash === '#terms' || currentHash === '#privacy';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-sky-500 selection:text-white">
      {/* Navbar with PWA & Tracking */}
      <Navbar onOpenTracking={() => setIsTrackingOpen(true)} />

      {/* Main Content */}
      <main>
        {isLegalPage ? (
          <Suspense fallback={<SectionLoader />}>
            {currentHash === '#terms' ? (
              <TermsAndConditions data={siteData?.termsAndConditions} />
            ) : (
              <PrivacyPolicy data={siteData?.privacyPolicy} />
            )}
          </Suspense>
        ) : (
          <MainSections siteData={siteData} SectionLoader={SectionLoader} />
        )}
      </main>

      {/* Footer Details */}
      <Footer data={siteData?.footer} contactData={siteData?.contact} />

      {/* Floaters & Modals */}
      <WhatsAppFloatingButton contactData={siteData?.contact} />
      <ScrollToTopButton />
      <ProjectTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        whatsappNumber={siteData?.contact?.whatsappNumber}
      />
      <SecretAdminPortalModal isOpen={isSecretPortalOpen} onClose={() => setIsSecretPortalOpen(false)} />
    </div>
  );
}
