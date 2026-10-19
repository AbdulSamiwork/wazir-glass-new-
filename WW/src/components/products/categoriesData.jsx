import React from 'react';
import { Grid, Frame, Layers, Box, Scissors } from 'lucide-react';

export const getCategoryIcon = (meta) => {
  const iconClass = "w-8 h-8 text-sky-500 group-hover:scale-105 transition-transform duration-300";
  switch (meta?.toLowerCase()) {
    case 'windows':
      return <Grid className={iconClass} />;
    case 'doors':
      return <Frame className={iconClass} />;
    case 'partitions':
      return <Layers className={iconClass} />;
    case 'shop fronts':
      return <Box className={iconClass} />;
    case 'mirrors':
      return <Scissors className={iconClass} />;
    case 'shower':
      return <Frame className={iconClass} />;
    case 'frames':
      return <Grid className={iconClass} />;
    case 'railings':
    case 'curtain walls':
    default:
      return <Layers className={iconClass} />;
  }
};

export const defaultCategories = [
  {
    name: "Aluminium Sliding Windows",
    meta: "Windows",
    description: "Smooth glide multi-track aluminium windows designed with thermal breaks and noise insulation.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80",
    details: "Engineered with heavy-gauge anodized aluminium and double-glazing options. Flawless rolling track operations, high wind load resistance, and premium heat-and-noise insulation.",
    specs: {
      "Profile Thickness": "1.6mm - 2.0mm Commercial Gauge",
      "Glass Compatibility": "5mm Single / 12mm Double Glazed (DGU)",
      "Locking Mechanism": "Multi-point concealed crescent lock",
      "Sealing": "EPDM Weatherproof Rubber Gaskets"
    }
  },
  {
    name: "Modern Glass Partitions",
    meta: "Partitions",
    description: "Sound-dampening acoustic glass partition walls with slim aluminium framing for modern offices.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
    details: "Provide sound-deadening properties and elegant partition walls for offices and conference rooms. Installed with minimalist slimline aluminium tracks and patch fittings.",
    specs: {
      "Glass Type": "10mm - 12mm Toughened Clear / Frosted",
      "Acoustic Rating": "Up to 38 dB Noise Reduction",
      "Channel Profile": "Slim 25mm Anodized Black / Silver Frame",
      "Hardware": "German Hydraulic Floor Spring & Stainless Handles"
    }
  },
  {
    name: "Commercial Shop Front Glass",
    meta: "Shop Fronts",
    description: "High-impact toughened glass storefronts with sturdy structural support for commercial outlets.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    details: "Maximize visibility and foot-traffic engagement. Built with heavy-duty top and bottom aluminium rails, overhead transom closers, and ultra-clear tempered glass panels.",
    specs: {
      "Safety Rating": "Tempered Safety Glass Grade A",
      "Rail System": "100mm Heavy Duty Aluminium Clamped Rail",
      "Door Configuration": "Double Swing / Automatic Sliding Compatibility",
      "Security": "Euro-profile floor deadlock system"
    }
  },
  {
    name: "Frameless Shower Enclosures",
    meta: "Shower",
    description: "Water-sealed luxury tempered glass shower cabins with corrosion-resistant brass hardware.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
    details: "Transform bathrooms into luxury spaces. Custom-cut tempered glass with anti-limescale hydrophobic surface treatments and solid brass hardware in chrome or matte black.",
    specs: {
      "Glass Gauge": "8mm or 10mm Toughened Safety Glass",
      "Fittings": "Solid Brass / 304 Stainless Steel Hinge System",
      "Water Protection": "Magnetic PVC door seals & acrylic water threshold",
      "Finish Options": "Matte Black, Brushed Gold, Polished Chrome"
    }
  },
  {
    name: "Aluminium Hinged & Pivot Doors",
    meta: "Doors",
    description: "Heavy-duty entry doors engineered for smooth pivoting action and extreme weather durability.",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80",
    details: "High-traffic architectural pivot doors featuring self-closing concealed floor pivots, integrated weather seals, and custom powder-coated color finishes.",
    specs: {
      "Hinge Load": "Rated up to 250 kg per door leaf",
      "Core": "Reinforced structural aluminium composite",
      "Weather Stripping": "Dual-finned perimeter draft seals",
      "Lock Options": "Smart biometric, digital keypad, or key deadbolt"
    }
  },
  {
    name: "LED Backlit Vanity Mirrors",
    meta: "Mirrors",
    description: "Precision-beveled ambient LED smart mirrors with built-in defogger heating pads.",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=600&q=80",
    details: "Custom-cut high-definition copper-free mirrors featuring waterproof LED lighting, touch-sensor dimmers, and anti-fog heating elements.",
    specs: {
      "Mirror Quality": "5mm Copper-Free Ultra Clear Silver Mirror",
      "Lighting": "CRI >90 Waterproof LED (3000K - 6000K Adjustable)",
      "Safety": "Shatter-proof safety vinyl backing membrane",
      "Features": "Touch switch, defogger pad, dimmer memory"
    }
  },
  {
    name: "Office Glass Cabins",
    meta: "Partitions",
    description: "Modular glass executive cubicles offering privacy, elegance, and natural light transmission.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80",
    details: "Complete turnkey office enclosures with acoustic laminated glass, integrated sliding doors, and custom sandblasted privacy logos.",
    specs: {
      "Acoustics": "Sound-insulating laminated safety glass",
      "Structure": "Extruded aluminium modular channel grid",
      "Door Type": "Soft-close top-hung sliding glass door",
      "Customization": "Frosted geometric patterns & frosted film branding"
    }
  },
  {
    name: "Aluminium Casement Windows",
    meta: "Windows",
    description: "Side-hung and top-hung friction stay windows offering optimal airflow and tight compression sealing.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    details: "Precision 90-degree opening casement windows equipped with heavy-duty stainless friction hinges, espagnolette locking handles, and integrated insect screens.",
    specs: {
      "Opening Style": "Side hung / Top hung awning configuration",
      "Hardware": "Stainless Steel 304 friction stays & multi-point handles",
      "Weather Barrier": "Continuous compression gasket barrier",
      "Glass Thickness": "Single, Double, or Tinted Solar Control Glass"
    }
  },
  {
    name: "Frameless Glass Balcony Railings",
    meta: "Railings",
    description: "Structural laminated glass balustrades with base shoe channels for unobstructed panoramic views.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80",
    details: "Engineered for rooftop terraces, balconies, and staircases. Heavy-gauge aluminium U-channel base profiles with monolithic laminated toughened glass.",
    specs: {
      "Glass Specification": "12mm Tempered or 17.52mm SentryGlas Laminated",
      "Base Channel": "Heavy extruded continuous aluminium base shoe",
      "Handrail": "Optional minimalist slotted top cap in 316 Stainless",
      "Load Resistance": "Tested to 1.5 kN/m line load building safety codes"
    }
  },
  {
    name: "Curtain Wall Facade Systems",
    meta: "Curtain Walls",
    description: "Integrated structural curtain wall facades engineered for superior thermal insulation and wind capacity.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
    details: "Integrated structural curtain wall facades engineered for superior thermal insulation, acoustic isolation, and extreme wind load capacity.",
    specs: {
      "Thermal Break": "Polyamide Thermal Barrier Inserts",
      "Glazing Infill": "28mm Low-E Double Glazed Unit (DGU)",
      "Wind Load Rating": "Engineered for high-rise commercial codes",
      "Drainage": "Multi-tier pressure equalized weep hole system"
    }
  },
  {
    name: "Aluminium Bi-Fold Patio Doors",
    meta: "Doors",
    description: "Wide-span folding door systems that open entire wall sections for seamless indoor-outdoor living.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80",
    details: "Multi-panel accordion folding doors with stainless steel bottom rolling mechanisms, flush threshold tracks, and thermal break frames.",
    specs: {
      "Panel Capacity": "Up to 8 folding leaves per system",
      "Track System": "Stainless steel quad-roller bottom carriage",
      "Threshold": "Flush weather-rated threshold for zero-trip hazard",
      "Locking": "Shootbolt locking with high-security euro cylinders"
    }
  },
  {
    name: "Custom Tinted & Frosted Glass",
    meta: "Partitions",
    description: "Decorative frosted, fluted, acid-etched, and solar reflective architectural glass panels.",
    image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=600&q=80",
    details: "Bespoke glass processing including fluted reed patterns, acid-etched privacy surfaces, bronze and grey tints, and ceramic fritted graphics.",
    specs: {
      "Pattern Styles": "Fluted, Moru, Acid Etched, Tinted, Reeded",
      "Thickness Range": "5mm, 8mm, 10mm, 12mm",
      "Safety Treatment": "Fully tempered to safety standards",
      "Applications": "Partitions, cabinet doors, feature walls, facade infill"
    }
  }
];
