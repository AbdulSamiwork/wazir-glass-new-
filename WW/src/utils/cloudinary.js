/**
 * High-Performance Media Optimizer Utility
 * Cloudinary & CDN Auto-Format (AVIF/WebP) and Dynamic Responsive Sizing
 */

export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'topin8es',
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY || '492248647196671',
  folder: import.meta.env.VITE_CLOUDINARY_FOLDER || 'wazir'
};

/**
 * Optimizes an image URL with auto-format (WebP/AVIF), auto-compression, and responsive dimensions.
 * @param {string} url - Original image URL
 * @param {object} options - { width, height, quality, crop }
 * @returns {string} Optimized URL
 */
export function getOptimizedImageUrl(url, options = {}) {
  if (!url || typeof url !== 'string') return url;

  const { width, height, quality = 'auto', crop = 'limit' } = options;

  // 1. Cloudinary CDN Transformation
  if (url.includes('res.cloudinary.com')) {
    const transformations = ['f_auto', `q_${quality}`];
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    if (width || height) transformations.push(`c_${crop}`);

    const uploadSegment = '/upload/';
    const index = url.indexOf(uploadSegment);
    if (index === -1) return url;

    const prefix = url.substring(0, index + uploadSegment.length);
    const suffix = url.substring(index + uploadSegment.length);

    // If already contains optimization parameters, return as is
    if (suffix.startsWith('f_auto') || suffix.startsWith('q_auto')) {
      return url;
    }

    return `${prefix}${transformations.join(',')}/${suffix}`;
  }

  // 2. Unsplash CDN Transformation
  if (url.includes('images.unsplash.com')) {
    try {
      const u = new URL(url);
      u.searchParams.set('auto', 'format');
      u.searchParams.set('fit', 'crop');
      u.searchParams.set('q', '80');
      if (width) u.searchParams.set('w', String(width));
      if (height) u.searchParams.set('h', String(height));
      return u.toString();
    } catch {
      return url;
    }
  }

  return url;
}

/**
 * Preset for responsive card thumbnails (300-500px)
 */
export function getThumbnailUrl(url, width = 500) {
  return getOptimizedImageUrl(url, { width, quality: 'auto', crop: 'limit' });
}

/**
 * Preset for banners & modal previews (1000-1200px)
 */
export function getBannerUrl(url, width = 1200) {
  return getOptimizedImageUrl(url, { width, quality: 'auto', crop: 'limit' });
}

/**
 * Preset for full-screen lightboxes (1800-1920px)
 */
export function getLightboxUrl(url, width = 1920) {
  return getOptimizedImageUrl(url, { width, quality: 'auto', crop: 'limit' });
}
