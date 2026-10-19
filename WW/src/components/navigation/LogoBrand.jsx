import React from 'react';
import Logo from '../Logo';

export default function LogoBrand({ handleLogoClick, setActiveSection }) {
  return (
    <a
      href="#home"
      onClick={(e) => {
        handleLogoClick(e);
        setActiveSection('home');
      }}
      className="flex items-center gap-2.5 sm:gap-3 group"
    >
      <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
        <Logo className="w-9 h-9 sm:w-10 sm:h-10 text-base sm:text-lg" />
      </div>
      <div className="flex flex-col">
        <span className="font-extrabold text-base sm:text-lg tracking-wide metallic-text font-heading leading-tight">
          WAZIR
        </span>
        <span className="text-[10px] font-bold text-sky-500 tracking-widest uppercase font-sans">
          Glass & Aluminium
        </span>
      </div>
    </a>
  );
}
