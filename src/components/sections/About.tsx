'use client';

import { Fragment, type CSSProperties } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TechLabel } from '@/components/ui/TechIcon';
import { useLanguage } from '@/context/LanguageContext';

const pad = (n: number) => String(n + 1).padStart(2, '0');
const MAX_MARKS = 2;
const escape =(s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Wraps the exact phrases from `marks` in <mark>; the text itself is never altered. */
function Marked({ text, marks, wave = false }: { text: string; marks: string[]; wave?: boolean }) {
  const own = marks.filter((m) => text.includes(m)).sort((a, b) => b.length - a.length);
  const parts = own.length ? text.split(new RegExp(`(${own.map(escape).join('|')})`)) : [text];
  // `wave` wraps each word (spaces stay real text nodes) so CSS can stagger them via --i.
  let n = 0;
  const words = (s: string) =>
    wave
      ? s.split(/(\s+)/).map((w, k) =>
          w.trim() ? <span key={k} className="pv3-w" style={{ '--i': n++ } as CSSProperties}>{w}</span> : w,
        )
      : s;
  // The capture group puts matches at odd indexes; only the first MAX_MARKS stay highlighted.
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 && i <= MAX_MARKS * 2 ? (
          <mark key={i} className="pv3-about__mark">{words(part)}</mark>
        ) : (
          <Fragment key={i}>{words(part)}</Fragment>
        ),
      )}
    </>
  );
}

export function About() {
  const { t } = useLanguage();
  const about = t.about as typeof t.about & {
    subtitle?: string;
    focusTitle?: string;
    focusAreas?: string[];
    marks?: string;
    kickers?: string[];
    timeline?: { tag: string; label: string }[];
  };
  const facts = [about.facts.education, about.facts.stack, about.facts.projects];
  const marks = (about.marks ?? '').split('|').filter(Boolean);
  const blocks = [about.p1, about.p2, about.p3];

  return (
    <section id="about" className="pv3-section pv3-about">
      <div className="pv3-section__inner pv3-about__grid">
        <header className="pv3-about__head">
          <SectionLabel index="01" label={t.sectionLabel.about} />
          <h2 className="pv3-about__title">
            {about.title} <span>{about.titleSpan}</span>
          </h2>
          {about.subtitle && <p className="pv3-about__sub">{about.subtitle}</p>}
          <ul className="pv3-about__facts">
            {facts.map((fact) => (
              <li key={fact}>{fact === about.facts.stack ? <TechLabel text={fact} /> : fact}</li>
            ))}
          </ul>
        </header>

        <div className="pv3-about__main">
          {about.timeline && (
            <ol className="pv3-about__timeline">
              {about.timeline.map((step) => (
                <li key={step.tag} className="pv3-about__step">
                  <span className="pv3-about__step-tag">{step.tag}</span>
                  <span className="pv3-about__step-label">{step.label}</span>
                </li>
              ))}
            </ol>
          )}

          <blockquote className="pv3-about__lede">
            <Marked text={about.p4} marks={marks} wave />
          </blockquote>

          <div className="pv3-about__body">
            {blocks.map((text, i) => (
              <article key={i} className="pv3-about__block">
                {about.kickers?.[i] && (
                  <h3 className="pv3-about__kicker">
                    <span aria-hidden="true">{pad(i)}</span> {about.kickers[i]}
                  </h3>
                )}
                <p>
                  <Marked text={text} marks={marks} />
                </p>
              </article>
            ))}
          </div>

          {about.focusAreas && about.focusAreas.length > 0 && (
            <div className="pv3-about__focus">
              <h3 className="pv3-about__focus-title">{about.focusTitle}</h3>
              <ol className="pv3-about__points">
                {about.focusAreas.map((area, i) => (
                  <li key={area}>
                    <span className="pv3-about__n" aria-hidden="true">{pad(i)}</span>
                    <span>{area}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
