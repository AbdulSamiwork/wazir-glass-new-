import React from 'react';
import { CheckCircle2, AlertTriangle, Sparkles, HelpCircle } from 'lucide-react';

export function getThemeStyles(type) {
  switch (type) {
    case 'success':
      return {
        bar: 'from-emerald-500 via-teal-400 to-emerald-600',
        iconBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        btn: 'from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-emerald-500/20 text-slate-950',
        icon: <CheckCircle2 className="w-10 h-10 text-emerald-400" />
      };
    case 'error':
    case 'warning':
      return {
        bar: 'from-amber-500 via-red-500 to-amber-600',
        iconBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
        btn: 'from-amber-500 to-red-500 hover:from-amber-400 hover:to-red-400 shadow-amber-500/20 text-slate-950',
        icon: <AlertTriangle className="w-10 h-10 text-amber-400" />
      };
    case 'confirm':
      return {
        bar: 'from-amber-400 via-yellow-500 to-amber-600',
        iconBg: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
        btn: 'from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 shadow-amber-500/20 text-slate-950',
        icon: <HelpCircle className="w-10 h-10 text-yellow-400" />
      };
    default: // info
      return {
        bar: 'from-cyan-400 via-blue-500 to-indigo-600',
        iconBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
        btn: 'from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-blue-400 shadow-cyan-500/20 text-slate-950',
        icon: <Sparkles className="w-10 h-10 text-cyan-400" />
      };
  }
}
