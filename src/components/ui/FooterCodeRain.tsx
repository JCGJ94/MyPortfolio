'use client';

import { useEffect, useRef } from 'react';

// Real stack vocabulary, read top to bottom by each falling column.
const TOKENS = [
  'async def', 'await', 'SELECT * FROM', 'docker compose up', 'git push', 'FastAPI', 'Next.js',
  'React', 'TypeScript', 'Python', 'Postgres', 'npm run dev', 'useState', 'def main():', '{ }',
  '01001101', '10110', 'git commit', 'pytest', 'import', 'return', '=>', '[ ]', '</>',
];

// Static texture shown instead of the rain under prefers-reduced-motion.
const STATIC_LINES = [
  'async def get_user(id: int):', 'SELECT id, name FROM users;', 'docker compose up -d',
  'const [state, set] = useState()', 'git commit -m "feat"', 'await db.fetch(query)',
  'npm run dev   // next.js', 'def main(): return 0', '01001010 01000011 10110', 'pytest -q && git push',
];

/**
 * Decorative code rain behind the footer signature. aria-hidden, pointer-events none, carries no
 * information. Mounts after idle, runs a single ~30fps rAF loop only while the footer is near
 * the viewport and the tab is visible, DPR capped at 1.5. Reduced motion never starts the loop.
 */
export function FooterCodeRain() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!root || !canvas || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const dprCap = 1.5;
    const FRAME = 1000 / 30;
    let cols: { x: number; text: string; head: number; speed: number }[] = [];
    let w = 0;
    let h = 0;
    let cell = 16;
    let raf = 0;
    let last = 0;
    let colorAt = 0;
    let accent = '#3b82f6';
    let ink = '#ffffff';
    let near = false;
    let idleId = 0;
    let started = false;
    let io: IntersectionObserver | undefined;
    let ro: ResizeObserver | undefined;

    const build = () => {
      const r = root.getBoundingClientRect();
      w = Math.max(1, Math.round(r.width));
      h = Math.max(1, Math.round(r.height));
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = w < 640 ? 24 : 16; // lighter on mobile: fewer columns
      const n = Math.floor(w / cell);
      cols = Array.from({ length: n }, (_, i) => {
        let text = '';
        while (text.length < 48) text += `${TOKENS[Math.floor(Math.random() * TOKENS.length)]} `;
        return { x: i * cell + cell / 2, text, head: Math.random() * (h / cell), speed: 4 + Math.random() * 7 };
      });
    };

    const readColors = () => {
      const s = getComputedStyle(root);
      accent = s.getPropertyValue('--pv3-color-accent').trim() || accent;
      ink = s.getPropertyValue('--pv3-color-ink').trim() || ink;
    };

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      const dt = t - last;
      if (dt < FRAME) return;
      last = t;
      if (t - colorAt > 1500) { colorAt = t; readColors(); }
      const rows = h / cell;
      const trail = 14;
      ctx.clearRect(0, 0, w, h);
      ctx.font = `${cell === 16 ? 12 : 13}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (const c of cols) {
        c.head += (c.speed * dt) / 1000;
        if (c.head - trail > rows) { c.head = -Math.random() * 6; c.speed = 4 + Math.random() * 7; }
        const hi = Math.floor(c.head);
        for (let k = 0; k < trail; k++) {
          const row = hi - k;
          if (row < 0 || row > rows) continue;
          ctx.globalAlpha = k === 0 ? 0.95 : (1 - k / trail) * 0.95;
          ctx.fillStyle = k === 0 ? ink : accent;
          ctx.fillText(c.text[row % c.text.length], c.x, row * cell + cell / 2);
        }
      }
      ctx.globalAlpha = 1;
    };

    const sync = () => {
      const run = near && !document.hidden && !reduce.matches;
      if (run && !raf) { last = 0; raf = requestAnimationFrame(frame); }
      else if (!run && raf) { cancelAnimationFrame(raf); raf = 0; }
    };

    const start = () => {
      started = true;
      readColors();
      build();
      io = new IntersectionObserver(([e]) => { near = e.isIntersecting; sync(); }, { rootMargin: '200px 0px' });
      io.observe(root);
      ro = new ResizeObserver(() => { build(); });
      ro.observe(root);
      document.addEventListener('visibilitychange', sync);
      reduce.addEventListener('change', sync);
    };

    // Lazy: nothing runs before the browser is idle, so LCP/TBT at first load are untouched.
    const ric = window.requestIdleCallback as undefined | ((cb: () => void) => number);
    idleId = ric ? ric(start) : window.setTimeout(start, 600);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (!started) { if (ric) window.cancelIdleCallback(idleId); else clearTimeout(idleId); }
      io?.disconnect();
      ro?.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reduce.removeEventListener('change', sync);
    };
  }, []);

  return (
    <div ref={rootRef} className="pv3-rain" aria-hidden="true">
      <canvas ref={canvasRef} className="pv3-rain__canvas" />
      <pre className="pv3-rain__static">{STATIC_LINES.join('\n')}</pre>
    </div>
  );
}
