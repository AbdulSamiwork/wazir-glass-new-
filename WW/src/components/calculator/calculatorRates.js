export const RATES = {
  glass: {
    '5mm_clear': 120,
    '8mm_tempered': 280,
    '12mm_tempered': 450,
    '5mm_tinted': 150
  },
  profile: {
    'none': 0,
    '1.2mm_local': 400,
    '1.6mm_chawla': 750,
    '2.0mm_prime': 1200
  },
  hardware: {
    'window': { standard: 1500, premium: 3500 },
    'door': { standard: 3500, premium: 8500 },
    'partition': { standard: 2000, premium: 5000 },
    'shower': { standard: 8000, premium: 18000 }
  },
  labor: 150
};

export const computeEstimate = ({ width, height, category, glassType, profileType, hardware, customRate }) => {
  const w = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;
  const area = w * h;

  const glassRate = RATES.glass[glassType] || 0;
  const profileRate = RATES.profile[profileType] || 0;
  const hCost = RATES.hardware[category] ? RATES.hardware[category][hardware] : 0;
  const customR = parseFloat(customRate) || 0;

  if (area <= 0) {
    return { area: 0, glassCost: 0, profileCost: 0, hardwareCost: 0, laborCost: 0, customCost: 0, total: 0 };
  }

  if (customR > 0) {
    const cCost = area * customR;
    return {
      area,
      glassCost: 0,
      profileCost: 0,
      hardwareCost: 0,
      laborCost: 0,
      customCost: cCost,
      total: cCost
    };
  }

  const gCost = area * glassRate;
  const pCost = area * profileRate;
  const lCost = area * RATES.labor;

  return {
    area,
    glassCost: gCost,
    profileCost: pCost,
    hardwareCost: hCost,
    laborCost: lCost,
    customCost: 0,
    total: gCost + pCost + hCost + lCost
  };
};
