'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Elements that get `.is-in` once they enter the viewport. CSS (globals.css, "U9-B")
// only hides them under `html.js-reveal` + no-preference, so SSR/no-JS/reduced motion
// always show full content.
const TARGETS = [
  '.pv3-cases__head',
  '.pv3-about__title',
  '.pv3-stack__head',
  '.pv3-contact__title',
  '.pv3-case__diagram',
  // V3: band furniture and the long text blocks (case stages animate on selection instead).
  '.pv3-label',
  '.pv3-about__facts',
  '.pv3-about__step',
  '.pv3-about__lede',
  '.pv3-about__block',
  '.pv3-about__focus',
  '.pv3-stack__row',
  '.pv3-contact__form',
  // A5: contact invitation, footer blocks.
  '.pv3-contact__head',
  '.pv3-foot__inner',
  // X3: the footer signature types itself once.
  '.pv3-foot__brand',
].join(',');

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const root = document.documentElement;
    root.classList.add('js-reveal');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
    );
    document.querySelectorAll(TARGETS).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
