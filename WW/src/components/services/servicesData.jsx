import React from 'react';
import { Layers, Hammer, ShieldCheck, Wrench, PenTool, Building2 } from 'lucide-react';

export const getServiceIcon = (title) => {
  const iconClass = "w-6 h-6 text-sky-500 group-hover:scale-110 transition-transform duration-300";
  switch (title?.toLowerCase()) {
    case 'glass installation':
      return <Layers className={iconClass} />;
    case 'aluminium fabrication':
      return <Hammer className="w-6 h-6 text-cyan-550 group-hover:rotate-12 transition-transform duration-300" />;
    case 'door & window fitting':
      return <ShieldCheck className="w-6 h-6 text-sky-500 group-hover:scale-105 transition-transform duration-300" />;
    case 'repair & maintenance':
      return <Wrench className="w-6 h-6 text-cyan-550 group-hover:rotate-45 transition-transform duration-300" />;
    case 'custom design work':
      return <PenTool className="w-6 h-6 text-sky-500 group-hover:-translate-y-0.5 transition-transform duration-300" />;
    case 'commercial projects':
      return <Building2 className="w-6 h-6 text-cyan-550 group-hover:scale-110 transition-transform duration-300" />;
    default:
      return <Layers className={iconClass} />;
  }
};

export const defaultServices = [
  {
    title: "Glass Installation",
    description: "Seamless fitting of double glazing, tempered safety glass, and heavy partition panes with elite weather sealing.",
    image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=600&q=80",
    details: "Professional on-site installation of heavy architectural glass plates, double glazing units, and tempered safety panels. We utilize industrial vacuum lifters and high-performance weather sealants to ensure a structural, leak-proof finish.",
    highlights: [
      "EPDM Weather Gasketing for maximum wind & water seal",
      "Double & Triple Glazing Options for thermal/acoustic insulation",
      "Vacuum Suction Cup Lift Handling for zero glass stress",
      "5-Year Guarantee against condensation and gas leaks"
    ]
  },
  {
    title: "Aluminium Fabrication",
    description: "Precision cutting and assembly of profile bars to construct high-strength doors, frames, and windows.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
    details: "Precision workshop cutting, hydraulic crimping, and assembly of heavy-gauge aluminium profiles. We build customized frames, mullions, and sashes exactly to architectural site blueprints.",
    highlights: [
      "AA 6063-T6 Structural Grade Aluminium Profile Alloys",
      "Hydraulic Corner Crimping for rock-solid joint stability",
      "Anodized & Powder-coated finishes (Qualicoat Class 1)",
      "Custom extrusion shapes and framing depth profiles"
    ]
  },
  {
    title: "Door & Window Fitting",
    description: "Flawless placement of casement doors, glass panels, sliding rollers, window tracks, and safety locks.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80",
    details: "Flawless site placement, locking alignment, and leveling of sliding windows, casement doors, and pivot panels. We ensure smooth track roller operation and tight locking seals.",
    highlights: [
      "Tandem Brass Smooth Roller Tracks for effortless glide",
      "Adjustable Friction Stay Hinges for secure positioning",
      "Multi-Point Security Locks and deadbolts",
      "Immaculate perimeter sealing with structural silicone"
    ]
  },
  {
    title: "Repair & Maintenance",
    description: "Quick alignment corrections, replacing damaged rollers/tracks, updating locks, and replacing broken glass.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd376a?auto=format&fit=crop&w=600&q=80",
    details: "Fast response maintenance services for commercial and residential installations. We replace worn tracks, broken roller bearings, faulty locks, and cracked glass panes to restore your structures to original specs.",
    highlights: [
      "Lock, handle, and latches replacements",
      "Roller & Track alignment corrections for sliding elements",
      "Prompt glass panel replacement (tempered & laminated)",
      "Preventative weatherstripping and seal upgrades"
    ]
  },
  {
    title: "Custom Design Work",
    description: "Bespoke creation of custom shapes, frosted pattern sandblasting, and custom mirror sizes to fit specific architectural plans.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
    details: "Custom architectural requests including decorative frosted sandblasting, chemical etching of brand logos, customized mirror designs, and glass table tops with bespoke edge polishing.",
    highlights: [
      "Logo Sandblasting & Acid-Etched Glass Engraving",
      "Bespoke Vanity Mirror LED Backlighting",
      "Pencil Polish, OG Cut, & Beveled Edging Options",
      "Tempered table tops and structural glass shelving"
    ]
  },
  {
    title: "Commercial Projects",
    description: "Large-scale glass partitions, curtain walls, shop fronts, and commercial cabin works completed within deadline parameters.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
    details: "End-to-end execution of large-scale glazing projects, structural curtain walls, showroom shop fronts, and glass partition cabins for office spaces, completing projects under tight builder schedules.",
    highlights: [
      "Curtain wall engineering & deflection compliance",
      "12mm Toughened Shop Front Glass assemblies",
      "Office Cabin demountable glass partition systems",
      "Dedicated project management for fast-track construction sites"
    ]
  }
];
