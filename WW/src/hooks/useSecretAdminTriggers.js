import { useState, useEffect } from 'react';

export function useSecretAdminTriggers(setCurrentHash) {
  const [isSecretPortalOpen, setIsSecretPortalOpen] = useState(false);

  useEffect(() => {
    const handleOpenSecretPortal = () => setIsSecretPortalOpen(true);
    window.addEventListener('open-secret-admin-portal', handleOpenSecretPortal);

    let typedBuffer = '';
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'X' || e.key === 'x' || e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsSecretPortalOpen(true);
        return;
      }

      if (e.key && e.key.length === 1) {
        typedBuffer += e.key.toLowerCase();
        if (typedBuffer.length > 15) typedBuffer = typedBuffer.slice(-15);
        if (typedBuffer.endsWith('wazirglass') || typedBuffer.endsWith('waziradmin') || typedBuffer.endsWith('secretadmin')) {
          setIsSecretPortalOpen(true);
          typedBuffer = '';
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const checkRestrictedAccess = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();

      // If user is navigating to any public website section, allow it immediately
      if (hash && hash !== '#wazirglass' && hash !== '#admin') {
        if (path.includes('wazirglass')) {
          window.history.replaceState(null, '', `/${hash}`);
        }
        setCurrentHash(hash);
        return;
      }

      if (path.includes('wazirglass') || search.includes('wazirglass')) {
        sessionStorage.setItem('wazir_secret_portal_unlocked', 'true');
        window.history.replaceState(null, '', '/#wazirglass');
        setCurrentHash('#wazirglass');
        return;
      }

      const isSecretUnlocked = sessionStorage.getItem('wazir_secret_portal_unlocked') === 'true';
      const hasValidAdminToken = !!localStorage.getItem('wazir_admin_token');

      if ((path.includes('/admin') || path.includes('/login') || path.includes('/dashboard') || hash === '#admin') && !isSecretUnlocked && !hasValidAdminToken) {
        if (hash === '#admin') {
          window.location.hash = '#home';
          setCurrentHash('#home');
        } else if (path !== '/' && !path.includes('/index.html') && !path.includes('/backend_wazir')) {
          window.location.href = '/#home';
        }
      }
    };

    checkRestrictedAccess();
    window.addEventListener('hashchange', checkRestrictedAccess);

    return () => {
      window.removeEventListener('open-secret-admin-portal', handleOpenSecretPortal);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', checkRestrictedAccess);
    };
  }, [setCurrentHash]);

  return { isSecretPortalOpen, setIsSecretPortalOpen };
}
