import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuoteButton from './QuoteButton';

export default function NavMobileDrawer({ isOpen, setIsOpen, navLinks, activeSection, handleNavClick }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-0 top-[76px] z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200 py-6 lg:hidden flex flex-col items-center gap-4 shadow-xl"
        >
          <nav className="flex flex-col items-center gap-2 w-full px-6">
            {navLinks.map((link) => {
              const targetId = link.href.replace('#', '');
              const isActive = activeSection === targetId;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`w-full text-center py-2.5 rounded-xl text-base font-semibold transition-all min-h-[44px] flex items-center justify-center ${
                    isActive
                      ? 'bg-sky-50 text-sky-600 font-bold border border-sky-200/80 shadow-sm'
                      : 'text-slate-800 hover:bg-slate-50 hover:text-sky-600'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
          <div className="flex flex-col items-center gap-3 w-full px-8 pt-2 border-t border-slate-100 mt-2">
            <QuoteButton
              isMobile={true}
              onNavClick={(e, href) => {
                setIsOpen(false);
                handleNavClick(e, href);
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
