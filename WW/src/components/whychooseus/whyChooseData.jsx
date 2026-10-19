import React from 'react';
import {
  ShieldCheck,
  Layers,
  ClipboardCheck,
  Clock,
  Users,
  BadgeDollarSign,
  Hammer,
  CheckCircle,
  Building2
} from 'lucide-react';

export const defaultTrustPoints = [
  { title: "Premium Quality Material", desc: "Grade-A structural alloy and high-strength tempered glass." },
  { title: "Professional Finishing", desc: "Flush joint finishes, clean sealant lines, and scratch-free profiles." },
  { title: "Custom Size & Design", desc: "Tailored layout designs built exact to site measurements." },
  { title: "Affordable Pricing", desc: "Transparent upfront quotes with no hidden costs." },
  { title: "On-Time Delivery", desc: "Fast fabrication schedules with timely on-site fitting." },
  { title: "Skilled Fabricators", desc: "Experienced crew ensuring robust joins and micro-precision alignments." },
  { title: "Strong Aluminium Frames", desc: "Heavy gauge frames resisting high weather and structural loads." },
  { title: "Clean Glass Installation", desc: "Safe handling, vacuum suction lifting, and immaculate sealing." }
];

export const defaultStats = [
  { value: "10", suffix: "+", label: "Years Experience" },
  { value: "500", suffix: "+", label: "Completed Projects" },
  { value: "300", suffix: "+", label: "Happy Customers" },
  { value: "50", suffix: "+", label: "Commercial Glazing" }
];

export const statIcons = [
  <Clock className="w-5 h-5 text-sky-550" />,
  <ClipboardCheck className="w-5 h-5 text-cyan-550" />,
  <Users className="w-5 h-5 text-sky-550" />,
  <Building2 className="w-5 h-5 text-cyan-550" />
];

export const trustIcons = [
  <ShieldCheck className="w-5 h-5 text-sky-400" />,
  <CheckCircle className="w-5 h-5 text-cyan-400" />,
  <Layers className="w-5 h-5 text-sky-400" />,
  <BadgeDollarSign className="w-5 h-5 text-cyan-400" />,
  <Clock className="w-5 h-5 text-sky-400" />,
  <Hammer className="w-5 h-5 text-cyan-400" />,
  <ClipboardCheck className="w-5 h-5 text-sky-400" />,
  <Users className="w-5 h-5 text-cyan-400" />
];
