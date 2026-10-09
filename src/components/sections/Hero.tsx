'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { MagneticPillButton } from '@/components/ui/MagneticPillButton';
import { Typewriter } from '@/components/ui/Typewriter';
import { TechLabel } from '@/components/ui/TechIcon';

const TYPE_DELAY = 280;
const TYPE_STEP = 70;

/** Name typed by JS, letter by letter. All letters are laid out from first paint (no shift);
 *  the real text lives in an sr-only span and the letters are aria-hidden. */
function TypedName({ name, count }: { name: string; count: number }) {
  let n = 0;
  return (
    <>
      <span className="sr-only">{name}</span>
      <span aria-hidden="true">
        {name.split(' ').map((word, w) => (
          <span key={w} className="hw-word">
            {[...word].map((ch) => {
              const i = n++;
              return (
                <span key={i} className={`hw-l${i < count ? ' is-on' : ''}${i === count - 1 ? ' is-last' : ''}`}>{ch}</span>
              );
            })}
          </span>
        ))}
      </span>
    </>
  );
}

export function Hero() {
  const { t } = useLanguage();
  const focusTerms = t.hero.techFocus.split(' · ');
  const roles = t.hero.roles;
  const name = t.hero.name;
  const total = name.replace(/ /g, '').length;
  const sectionRef = useRef<HTMLElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState(0);
  const done = typed >= total;

  // JS typewriter for the name. It also runs under reduced motion (typed text is not a
  // vestibular trigger). The rest of the hero waits for `data-typing="done"` (CSS), with a
  // CSS failsafe if scripts never run.
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      timer = setInterval(() => setTyped((c) => { if (c + 1 >= total) clearInterval(timer); return c + 1; }), TYPE_STEP);
    }, TYPE_DELAY);
    return () => { clearTimeout(start); clearInterval(timer); };
  }, [total]);

  // Ambient life: `is-live` while the hero is on screen (CSS loops pause otherwise).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => el.classList.toggle('is-live', entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pointer tilt (fine pointers only): rAF lerp towards the pointer, stops once settled.
  useEffect(() => {
    const el = glassRef.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
    let rx = 0, ry = 0, tx = 0, ty = 0, raf = 0;
    const tick = () => {
      rx += (tx - rx) * 0.08;
      ry += (ty - ry) * 0.08;
      el.style.setProperty('--rx', rx.toFixed(2));
      el.style.setProperty('--ry', ry.toFixed(2));
      raf = Math.abs(tx - rx) + Math.abs(ty - ry) > 0.02 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const move = (e: PointerEvent) => {
      if (!sectionRef.current?.classList.contains('is-live')) return; // off-screen: no rAF
      const r = el.getBoundingClientRect();
      tx = -((e.clientY - (r.top + r.height / 2)) / window.innerHeight) * 18;
      ty = ((e.clientX - (r.left + r.width / 2)) / window.innerWidth) * 26;
      tx = Math.max(-10, Math.min(10, tx));
      ty = Math.max(-14, Math.min(14, ty));
      kick();
    };
    const leave = () => { tx = 0; ty = 0; kick(); };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave); cancelAnimationFrame(raf); };
  }, []);

  const portrait = {
    src: '/heroAvatar.png',
    width: 550,
    height: 550,
    quality: 60,
    sizes: '(max-width: 40rem) 92vw, (max-width: 64rem) 48vw, 42vw',
    className: 'hero-workbench__image',
  };

  return (
    <section ref={sectionRef} className="hero-workbench" id="hero" aria-labelledby="hero-title" data-typing={done ? 'done' : 'pending'}>
      <noscript>
        <style>{'.hw-l{opacity:1!important}.hero-workbench[data-typing] :is(.hero-workbench__role,.hero-workbench__description,.hero-workbench__focus,.hero-workbench__actions){opacity:1!important;animation:none!important}'}</style>
      </noscript>
      <div className="hero-workbench__layout">
        <div className="hero-workbench__copy">
          <p className="hero-workbench__availability">
            <span className="hero-workbench__availability-mark" aria-hidden="true" />
            {t.hero.badge}
          </p>

          <h1 className="hero-workbench__title" id="hero-title">
            <TypedName name={name} count={typed} />
          </h1>

          <p className="hero-workbench__role">
            <span className="sr-only">{roles.join(' · ')}</span>
            <Typewriter words={roles} start={done} />
          </p>

          <p className="hero-workbench__description">{t.hero.description}</p>

          <ul className="hero-workbench__focus" aria-label={t.hero.techFocus}>
            {focusTerms.map((term) => (
              <li key={term}><TechLabel text={term} /></li>
            ))}
          </ul>

          <div className="hero-workbench__actions">
            <MagneticPillButton
              href="/#projects"
              label={t.hero.viewProjects}
              variant="primary"
              className="hero-workbench__action hero-workbench__action--primary"
            />
          </div>
        </div>

        <figure className="hero-workbench__figure">
          <div className="hero-workbench__portrait">
            <div className="hero-glass" ref={glassRef}>
              <div className="hero-glass__stage">
                <div className="hero-glass__glow" aria-hidden="true" />
                {/* Depth order comes from translateZ, not DOM order. Both layers use the same
                    optimized URL (one download) and both are high priority: Chrome reports
                    the larger visible ring as LCP. */}
                <div className="hero-glass__shards" aria-hidden="true">
                  <Image {...portrait} alt="" loading="eager" fetchPriority="high" />
                </div>
                <div className="hero-glass__face">
                  <Image {...portrait} alt="Jose Carlos Avatar" preload fetchPriority="high" />
                </div>
              </div>
            </div>
          </div>
        </figure>
      </div>
      <span className="hero-workbench__cue" aria-hidden="true" />
    </section>
  );
}
