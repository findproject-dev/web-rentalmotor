// ============================================================
// FINDRIDE - useScrolled hook
// ============================================================
// Returns true when the page has been scrolled past a given
// threshold (default 80 px). Cleans up its listener on unmount.
// ============================================================

import { useEffect, useState } from 'react';

export function useScrolled(threshold = 80): boolean {
  const [scrolled, setScrolled] = useState<boolean>(
    typeof window !== 'undefined' ? window.scrollY > threshold : false,
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Sync immediately in case the page loads mid-scroll
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return scrolled;
}
