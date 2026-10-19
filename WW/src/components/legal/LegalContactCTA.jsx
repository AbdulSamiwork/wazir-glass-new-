import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function LegalContactCTA({
  title = "Have Questions?",
  description = "If you have any questions, please reach out to us.",
  btnText = "Contact Us"
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mt-10 sm:mt-14 text-center"
    >
      <div className="p-5 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border border-slate-700/60 text-center max-w-lg mx-auto shadow-xl">
        <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto mb-3.5 sm:mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
        </div>
        <h3 className="text-white font-bold text-base mb-2">{title}</h3>
        <p className="text-slate-400 text-xs leading-relaxed mb-5 max-w-sm mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3">
          <a
            href="#contact"
            onClick={() => {
              window.location.hash = '#home';
              setTimeout(() => { window.location.hash = '#contact'; }, 100);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 min-h-[44px] inline-flex items-center justify-center cursor-pointer"
          >
            {btnText}
          </a>
          <a
            href="#home"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-600/50 text-slate-300 hover:text-white font-semibold text-xs transition-all min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </a>
        </div>
      </div>
    </motion.div>
  );
}
