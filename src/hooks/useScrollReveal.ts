// ============================================================
// FINDRIDE - useScrollReveal hook
// ============================================================
// Adds the class "visible" to every element that has the class
// "reveal" once it enters the viewport. Respects
// prefers-reduced-motion by marking all elements immediately.
// ============================================================

import { useEffect } from 'react';

export function useScrollReveal(): void {
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const elements = document.querySelectorAll<HTMLElement>('.reveal');

    if (prefersReduced) {
      // Respect user preference - show everything instantly
      elements.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing after reveal so it doesn't flicker
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  });
}
