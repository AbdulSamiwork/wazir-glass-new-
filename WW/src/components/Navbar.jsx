import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import LogoBrand from './navigation/LogoBrand';
import PWAInstallModal from './PWAInstallModal';
import QuoteButton from './navigation/QuoteButton';
import NavMobileDrawer from './navigation/NavMobileDrawer';

export default function Navbar({ onOpenTracking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [pressTimer, setPressTimer] = useState(null);

  const triggerSecretPortal = (e) => {
    if (e) e.preventDefault();
    if (navigator.vibrate) navigator.vibrate([100, 50, 150]);
    window.dispatchEvent(new Event('open-secret-admin-portal'));
  };

  const handleLogoClick = (e) => {
    const now = Date.now();
    if (navigator.vibrate) navigator.vibrate(35);
    if (now - lastClickTime > 2000) {
      setLogoClickCount(1);
    } else {
      const newCount = logoClickCount + 1;
      setLogoClickCount(newCount);
      if (newCount >= 3) {
        setLogoClickCount(0);
        triggerSecretPortal(e);
        return;
      }
    }
    setLastClickTime(now);
  };

  const [activeSection, setActiveSection] = useState(() => {
    const hash = window.location.hash ? window.location.hash.replace('#', '') : 'home';
    return ['home', 'products', 'services', 'about', 'gallery', 'contact'].includes(hash) ? hash : 'home';
  });

  useEffect(() => {
    const sectionIds = ['home', 'products', 'services', 'about', 'gallery', 'contact'];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (window.location.hash === '#terms' || window.location.hash === '#privacy') {
        setActiveSection('');
        return;
      }

      if (scrollPos + windowHeight >= documentHeight - 60) {
        setActiveSection('contact');
        return;
      }

      if (scrollPos < 100) {
        setActiveSection('home');
        return;
      }

      const offsetThreshold = 160;
      let current = 'home';
      for (let i = 0; i < sectionIds.length; i++) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offsetThreshold) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleOpenModal = () => setShowInstallModal(true);
    window.addEventListener('open-pwa-modal', handleOpenModal);
    return () => window.removeEventListener('open-pwa-modal', handleOpenModal);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (e, href) => {
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      e.preventDefault();
      setActiveSection(targetId);
      setIsOpen(false);
      targetElement.scrollIntoView({ behavior: 'smooth' });
      if (window.history.pushState) {
        window.history.pushState(null, '', href);
      } else {
        window.location.hash = href;
      }
    } else {
      setIsOpen(false);
      window.location.hash = href;
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-slate-200/90 ${
          isScrolled ? 'shadow-md py-3' : 'shadow-sm py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <LogoBrand handleLogoClick={handleLogoClick} setActiveSection={setActiveSection} />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const targetId = link.href.replace('#', '');
              const isActive = activeSection === targetId;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm transition-all duration-200 relative py-1 group ${
                    isActive
                      ? 'text-sky-600 font-bold'
                      : 'text-slate-700 hover:text-sky-600 font-medium'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-300 ${
                      isActive ? 'w-full shadow-sm shadow-sky-500/40' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            <QuoteButton onNavClick={handleNavClick} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 focus:outline-none transition-colors border border-slate-200/80 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <NavMobileDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navLinks={navLinks}
        activeSection={activeSection}
        handleNavClick={handleNavClick}
      />

      <PWAInstallModal isOpen={showInstallModal} onClose={() => setShowInstallModal(false)} />
    </>
  );
}
