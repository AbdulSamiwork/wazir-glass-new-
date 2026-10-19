/**
 * Phone Number & WhatsApp URL Utilities
 * Cleans phone strings and formats reliable, standard WhatsApp chat URLs.
 */

export function cleanPhoneNumber(rawPhone, defaultCountryCode = '92') {
  if (!rawPhone || typeof rawPhone !== 'string') return '';
  let digits = rawPhone.replace(/\D/g, '');
  if (!digits) return '';

  // If local Pakistani format starting with 0 (e.g. 03001234567 -> 923001234567)
  if (digits.startsWith('0') && digits.length === 11) {
    digits = defaultCountryCode + digits.slice(1);
  }
  return digits;
}

export function getWhatsAppUrl(rawPhone, message = '') {
  const cleaned = cleanPhoneNumber(rawPhone);
  // Fallback to default if empty
  const target = cleaned || '923000000000';
  const textParam = message && message.trim() ? `?text=${encodeURIComponent(message.trim())}` : '';
  return `https://wa.me/${target}${textParam}`;
}
