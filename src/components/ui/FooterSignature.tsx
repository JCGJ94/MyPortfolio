import type { CSSProperties } from 'react';

/**
 * Footer signature typed letter by letter (CSS-only, see "X3" in globals.css).
 * The full name is real text for assistive tech; the animated letters are aria-hidden.
 * Without JS / with reduced motion every letter is simply visible.
 */
export function FooterSignature({ first, accent }: { first: string; accent: string }) {
  let n = 0;
  const word = (text: string, className?: string) => (
    <span className={`pv3-sig__word${className ? ` ${className}` : ''}`}>
      {[...text].map((ch, i) => (
        <span key={i} className="pv3-sig__l" style={{ '--i': n++ } as CSSProperties}>{ch}</span>
      ))}
    </span>
  );

  return (
    <p className="pv3-foot__brand">
      <span className="sr-only">{`${first} ${accent}`}</span>
      <span aria-hidden="true">
        {word(first)} {word(accent, 'pv3-foot__brand-accent')}
      </span>
    </p>
  );
}
