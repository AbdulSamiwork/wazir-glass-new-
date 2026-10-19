import { getWhatsAppUrl } from './phoneUtils';

const isDev = window.location.port && window.location.port !== '80' && window.location.port !== '443';

export const API_BASE_URL = import.meta.env.VITE_API_URL || (isDev
  ? `http://${window.location.hostname}/backend_Wazir/api.php`
  : (window.location.pathname.includes('/backend_Wazir') ? 'api.php' : 'backend_Wazir/api.php'));

export const DEFAULT_SOCIALS = [
  { id: 'facebook', name: 'Facebook', url: 'https://facebook.com', enabled: true },
  { id: 'instagram', name: 'Instagram', url: 'https://instagram.com', enabled: true },
  { id: 'whatsapp', name: 'WhatsApp', url: 'https://wa.me/923000000000', enabled: true },
  { id: 'youtube', name: 'YouTube', url: 'https://youtube.com', enabled: false },
  { id: 'linkedin', name: 'LinkedIn', url: 'https://linkedin.com', enabled: false },
  { id: 'tiktok', name: 'TikTok', url: 'https://tiktok.com', enabled: false },
  { id: 'twitter', name: 'X (Twitter)', url: 'https://x.com', enabled: false },
  { id: 'pinterest', name: 'Pinterest', url: 'https://pinterest.com', enabled: false }
];

export const normalizeSocials = (socials) => {
  if (!Array.isArray(socials) || socials.length === 0) {
    return DEFAULT_SOCIALS;
  }
  const existingMap = new Map(socials.map(s => [s?.id, s]));
  const list = DEFAULT_SOCIALS.map(def => {
    const found = existingMap.get(def.id);
    return found ? { ...def, ...found } : def;
  });
  socials.forEach(s => {
    if (s?.id && !DEFAULT_SOCIALS.some(d => d.id === s.id)) {
      list.push(s);
    }
  });
  return list;
};

export const normalizeSiteData = (data) => {
  if (!data) return null;
  const d = JSON.parse(JSON.stringify(data));
  d.hero = d.hero || {};
  d.about = d.about || { features: [] };
  d.categories = Array.isArray(d.categories) ? d.categories : [];
  d.featuredProducts = Array.isArray(d.featuredProducts) ? d.featuredProducts : [];
  d.services = d.services || { items: [] };
  d.whyChooseUs = d.whyChooseUs || { stats: [], trustPoints: [] };
  d.beforeAfter = d.beforeAfter || { items: [] };
  d.gallery = d.gallery || { projects: [] };
  d.timeline = d.timeline || { steps: [] };
  d.testimonials = d.testimonials || { items: [] };
  d.contact = d.contact || { additionalNumbers: [] };
  d.privacyPolicy = d.privacyPolicy || { sections: [], trustBadges: [] };
  d.termsAndConditions = d.termsAndConditions || { sections: [] };
  d.footer = d.footer || {};
  d.footer.socials = normalizeSocials(d.footer.socials);
  if (d.contact?.whatsappNumber && Array.isArray(d.footer.socials)) {
    d.footer.socials = d.footer.socials.map(s => {
      if (s.id === 'whatsapp' && (!s.url || s.url.includes('923000000000'))) {
        return { ...s, url: getWhatsAppUrl(d.contact.whatsappNumber) };
      }
      return s;
    });
  }
  return d;
};
