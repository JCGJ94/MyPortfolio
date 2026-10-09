'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { TechIcon } from '@/components/ui/TechIcon';

export type StackCase = { id: string; title: string };
export type StackItem = { label: string; icon: string; cases: StackCase[] };
export type StackLayer = { key: string; title: string; items: StackItem[] };

const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));
const HOLD_MS = 9000;
const CYCLE_MS = 3600;

/**
 * Exploded isometric stack in CSS 3D. The DOM is a plain nested list, so the flat layout (no-JS) is the same
 * markup. JS only writes four CSS variables (--px/--py pointer, --sc scroll position, --ex explode amount) in a
 * rAF that stops once converged, and picks the active layer (click/focus, idle auto-cycle on desktop, the layer
 * nearest the viewport centre on narrow screens). The active layer flattens toward the viewer to be readable.
 */
export function Stack3D({ layers, usedIn }: { layers: StackLayer[]; usedIn: string }) {
  const root = useRef<HTMLDivElement>(null);
  const idx = useRef(0);
  const hold = useRef(0);
  const firstOf = (k: number) => layers[k].items.find((i) => i.cases.length)?.label ?? '';
  const [sel, setSel] = useState(() => firstOf(0));
  const [act, setAct] = useState(layers[0].key);
  // Featured block (null = the neutral staggered pose). `locked` stops the idle auto-cycle after the first user choice.
  const [feat, setFeat] = useState<string | null>(null);
  const featRef = useRef<string | null>(null);
  const locked = useRef(false);

  const pick = (k: number, label = firstOf(k)) => {
    idx.current = k;
    hold.current = Date.now() + HOLD_MS;
    setAct(layers[k].key);
    if (label) setSel(label);
  };

  const close = () => { // back to the neutral pose: nothing featured, first layer active
    featRef.current = null;
    idx.current = 0;
    setFeat(null);
    setAct(layers[0].key);
    setSel(firstOf(0));
  };

  const toggle = (k: number) => {
    const key = layers[k].key;
    locked.current = true;
    if (feat === key) return close();
    featRef.current = key;
    setFeat(key);
    idx.current = k;
    hold.current = Date.now() + HOLD_MS;
    if (act !== key) { setAct(key); setSel(firstOf(k)); }
  };

  // Escape returns to the staggered pose from anywhere while a block is featured.
  useEffect(() => {
    if (!feat) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- close only touches refs, setters and `layers`
  }, [feat]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    el.classList.add('is-live');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const narrow = matchMedia('(max-width: 63.99rem)');
    const layerEls = [...el.querySelectorAll<HTMLElement>('.pv3-s3d__layer')];
    const cur = { px: 0, py: 0, sc: 0, ex: 0 };
    const tgt = { ...cur };
    let raf = 0;
    let visible = false;
    const apply = () => (Object.keys(cur) as (keyof typeof cur)[]).forEach((k) => el.style.setProperty(`--${k}`, cur[k].toFixed(3)));
    const tick = () => {
      raf = 0;
      let moving = false;
      (Object.keys(cur) as (keyof typeof cur)[]).forEach((k) => {
        const d = tgt[k] - cur[k];
        if (Math.abs(d) > 0.002) { cur[k] += d * 0.12; moving = true; } else cur[k] = tgt[k];
      });
      apply();
      if (moving && visible) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf && visible) raf = requestAnimationFrame(tick); };
    const set = (k: number) => {
      if (featRef.current || k === idx.current || Date.now() < hold.current) return;
      idx.current = k;
      setAct(layers[k].key);
      setSel(firstOf(k));
    };
    const measure = () => {
      const r = el.getBoundingClientRect();
      const vh = innerHeight;
      tgt.ex = clamp((vh * 0.95 - r.top) / (vh * 0.6), 0, 1);
      tgt.sc = clamp((r.top + r.height / 2 - vh / 2) / vh, -1, 1);
      if (narrow.matches) { // the card nearest the viewport centre flattens
        let best = 0;
        let bd = Infinity;
        layerEls.forEach((l, i) => {
          const b = l.getBoundingClientRect();
          const d = Math.abs(b.top + b.height / 2 - vh / 2);
          if (d < bd) { bd = d; best = i; }
        });
        if (r.top < vh * 0.5 && r.bottom > vh * 0.3) set(best);
      }
      kick();
    };
    const onScroll = () => { if (visible) measure(); };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = el.getBoundingClientRect();
      tgt.px = clamp(((e.clientX - r.left) / r.width - 0.5) * 2, -1, 1);
      tgt.py = clamp(((e.clientY - r.top) / r.height - 0.5) * 2, -1, 1);
      hold.current = Math.max(hold.current, Date.now() + 2500);
      kick();
    };
    const onLeave = () => { tgt.px = 0; tgt.py = 0; kick(); };

    measure(); // snap to the current scroll position so nothing animates from a wrong pose on load
    Object.assign(cur, tgt);
    apply();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) measure();
    }, { rootMargin: '10% 0px' });
    io.observe(el);
    // Idle auto-cycle (desktop): walks down the layers until the visitor interacts.
    const cycle = setInterval(() => {
      if (visible && !narrow.matches && !locked.current && Date.now() >= hold.current) {
        const k = (idx.current + 1) % layers.length;
        idx.current = k;
        setAct(layers[k].key);
        setSel(firstOf(k));
      }
    }, CYCLE_MS);
    addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      io.disconnect();
      clearInterval(cycle);
      removeEventListener('scroll', onScroll);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- firstOf only reads `layers`
  }, [layers]);

  return (
    <div ref={root} className="pv3-s3d" data-feat={feat ?? undefined}>
      <div className="pv3-s3d__stage" onClick={(e) => { if (!(e.target as Element).closest('.pv3-s3d__layer')) close(); }}>
        <ul className="pv3-s3d__rig" style={{ '--n': layers.length - 1 } as CSSProperties}>
          {layers.map((layer, k) => (
            <li
              key={layer.key}
              className={`pv3-s3d__layer${act === layer.key ? ' is-act' : ''}${feat === layer.key ? ' is-feat' : ''}`}
              style={{ '--k': layers.length - 1 - k } as CSSProperties}
              onClick={() => toggle(k)}
            >
              <span className="pv3-s3d__node" aria-hidden="true" />
              <h3 className="pv3-s3d__role">
                <button type="button" className="pv3-s3d__layerbtn pv3-focus" aria-pressed={feat === layer.key}>{layer.title}</button>
                <span className="pv3-s3d__count" aria-hidden="true">{layer.items.length}</span>
              </h3>
              {/* Decorative copy of the chips for the 3D scene; the real, interactive list is in the panel. */}
              <ul className="pv3-s3d__ghost" aria-hidden="true">
                {layer.items.map((item) => <li key={item.label}><TechIcon name={item.icon} />{item.label}</li>)}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <aside className="pv3-s3d__panel">
        {layers.map((layer, k) => (
          <section key={layer.key} className="pv3-s3d__group" data-on={act === layer.key} aria-label={layer.title}>
            <h4 className="pv3-s3d__grouptitle">{layer.title}</h4>
            <ul className="pv3-s3d__chips">
              {layer.items.map((item) => (
                <li key={item.label}>
                  {item.cases.length ? (
                    <button
                      type="button"
                      className="pv3-s3d__chip pv3-s3d__chip--linked pv3-focus"
                      aria-pressed={sel === item.label}
                      onClick={() => pick(k, item.label)}
                    >
                      <TechIcon name={item.icon} />
                      {item.label}
                    </button>
                  ) : (
                    <span className="pv3-s3d__chip"><TechIcon name={item.icon} />{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
            {layer.items.filter((i) => i.cases.length).map((item) => (
              <div key={item.label} className="pv3-s3d__set" data-on={sel === item.label}>
                <p className="pv3-s3d__tech">{item.label}</p>
                <p className="pv3-s3d__used">{usedIn}</p>
                <ul>
                  {item.cases.map((p) => (
                    <li key={p.id}><a href={`#caso-${p.id}`} className="pv3-focus">{p.title}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </aside>
    </div>
  );
}
