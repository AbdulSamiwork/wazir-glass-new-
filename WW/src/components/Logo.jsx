import React from 'react';

export default function Logo({ className = "w-10 h-10" }) {
  return (
    <div
      style={{ aspectRatio: '1 / 1' }}
      className={`${className} aspect-square rounded-xl bg-gradient-to-tr from-sky-500 via-blue-500 to-cyan-500 flex items-center justify-center text-white font-black shadow-md shadow-sky-500/25 shrink-0 select-none overflow-hidden`}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 20 26 L 31 74 L 40.5 74 L 50 49 L 59.5 74 L 69 74 L 80 26 L 69.5 26 L 62.5 56.5 L 54.5 35 L 45.5 35 L 37.5 56.5 L 30.5 26 Z"
          fill="#ffffff"
        />
      </svg>
    </div>
  );
}
