import { useState, useEffect } from 'react';
import { api } from './api';
import { sanitizeAssetUrl, withBasePath } from '../utils/assets';

export const DEFAULT_BRANDING = {
  logo: withBasePath('/logo-kimson.png'),
  logoWhite: withBasePath('/logo-kimson-white.png'),
  favicon: withBasePath('/favicon.png'),
  siteTitle: 'Kim Sơn Automobiles - Cổng Thông Tin Hệ Sinh Thái Ô Tô'
};

export function getStoredBranding() {
  try {
    const raw = localStorage.getItem('kimson_branding');
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_BRANDING,
        ...parsed,
        logo: sanitizeAssetUrl(parsed.logo, DEFAULT_BRANDING.logo),
        logoWhite: sanitizeAssetUrl(parsed.logoWhite, DEFAULT_BRANDING.logoWhite),
        favicon: sanitizeAssetUrl(parsed.favicon, DEFAULT_BRANDING.favicon),
      };
    }
  } catch (e) {
    console.warn('Error reading stored branding:', e);
  }
  return DEFAULT_BRANDING;
}

export function applyFavicon(faviconUrl) {
  if (!faviconUrl) return;
  const links = document.querySelectorAll("link[rel*='icon']");
  links.forEach(link => {
    link.href = faviconUrl;
  });
}

export function useBranding() {
  const [branding, setBranding] = useState(getStoredBranding);

  useEffect(() => {
    let isMounted = true;

    // 1. Fetch latest from API on mount
    api.getSettings()
      .then(data => {
        if (!isMounted || !data) return;
        const updated = {
          logo: sanitizeAssetUrl(data.logo, DEFAULT_BRANDING.logo),
          logoWhite: sanitizeAssetUrl(data.logoWhite, DEFAULT_BRANDING.logoWhite),
          favicon: sanitizeAssetUrl(data.favicon, DEFAULT_BRANDING.favicon),
          siteTitle: data.siteTitle || DEFAULT_BRANDING.siteTitle
        };
        setBranding(updated);
        try {
          localStorage.setItem('kimson_branding', JSON.stringify(updated));
        } catch (e) {}

        applyFavicon(updated.favicon);
        if (updated.siteTitle && document.title.includes('Kim Sơn')) {
          document.title = updated.siteTitle;
        }
      })
      .catch(err => {
        console.warn('Could not load branding settings, using cached:', err.message);
      });

    // 2. Listen to real-time branding update events
    const handleUpdate = (e) => {
      if (e.detail) {
        setBranding(prev => {
          const next = {
            ...prev,
            ...e.detail,
            logo: sanitizeAssetUrl(e.detail.logo ?? prev.logo, DEFAULT_BRANDING.logo),
            logoWhite: sanitizeAssetUrl(e.detail.logoWhite ?? prev.logoWhite, DEFAULT_BRANDING.logoWhite),
            favicon: sanitizeAssetUrl(e.detail.favicon ?? prev.favicon, DEFAULT_BRANDING.favicon),
          };
          try {
            localStorage.setItem('kimson_branding', JSON.stringify(next));
          } catch (err) {}
          applyFavicon(next.favicon);
          return next;
        });
      }
    };

    window.addEventListener('kimson-branding-updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('kimson-branding-updated', handleUpdate);
    };
  }, []);

  return branding;
}
