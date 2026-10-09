'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { TechIcon } from '@/components/ui/TechIcon';
import { resolveTechIconKey } from '@/data/techIcons';
import type { FlowDiagramData, FlowLayout } from '@/data/diagrams';

const STEP_MS = 1800; // one node per step; never faster than ~2 s so reduced-motion users get no flashing
const END_PAUSE_MS = 2400; // rest state between two laps
const START_MS = 500; // after entering the viewport

/** Edges are two SVGs (wide/tall) under one set of HTML nodes; CSS container queries pick the layout. */
function Edges({ data, layout, kind, hotEdge }: { data: FlowDiagramData; layout: FlowLayout; kind: 'wide' | 'tall'; hotEdge: (i: number) => boolean | null }) {
  const [w, h] = layout.viewBox;
  return (
    <svg className={`pv3-flow__edges pv3-flow__edges--${kind}`} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" focusable="false">
      <defs>
        <marker id={`flow-${data.id}-${kind}-a`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0L10 5L0 10z" className="pv3-flow__head" />
        </marker>
      </defs>
      {data.edges.map((e, i) => {
        const hot = hotEdge(i);
        const state = hot === null ? '' : hot ? ' is-hot' : ' is-dim';
        return (
          <g key={`${e.from}-${e.to}`} className={`pv3-flow__edge${state}`} style={{ '--i': i } as CSSProperties}>
            <path d={layout.edges[i]} pathLength={1} className="pv3-flow__line" markerEnd={`url(#flow-${data.id}-${kind}-a)`} />
            <path d={layout.edges[i]} className="pv3-flow__run" />
          </g>
        );
      })}
    </svg>
  );
}

/** Auto-running, non-interactive flow: nodes are plain elements, the loop pauses off-screen and in hidden tabs. */
export function FlowDiagram({ data, label, className = '' }: { data: FlowDiagramData; label: string; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [auto, setAuto] = useState<number | null>(null); // index in `seq` of the highlighted step; null = rest

  // The loop walks the lifecycle states when the data has them, otherwise the nodes along the edge order.
  const seq = useMemo(
    () => data.steps ?? [data.edges[0].from, ...data.edges.map((e) => e.to)].map((node) => ({ node, label: '' })),
    [data],
  );

  // setTimeout-based loop: starts in view, pauses off-screen or in a hidden tab. Only the step index is state.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let inView = false;
    let i = -1;
    const stop = () => { if (timer) clearTimeout(timer); timer = undefined; };
    const schedule = (delay: number) => {
      stop();
      if (!inView || document.hidden) return;
      timer = setTimeout(() => {
        i = i + 1 > seq.length ? 0 : i + 1;
        const atRest = i === seq.length;
        setAuto(atRest ? null : i);
        schedule(atRest ? END_PAUSE_MS : STEP_MS);
      }, delay);
    };
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      el.dataset.live = inView ? '1' : '0';
      if (inView) schedule(START_MS); else stop();
    });
    io.observe(el);
    const onVisibility = () => (document.hidden ? stop() : schedule(START_MS));
    document.addEventListener('visibilitychange', onVisibility);
    return () => { stop(); io.disconnect(); document.removeEventListener('visibilitychange', onVisibility); };
  }, [seq]);

  const step = auto !== null ? seq[auto] : null;
  const active = step?.node ?? null;
  const node = data.nodes.find((n) => n.id === active);
  // Only the edge leading into the active node is lit.
  const hotEdge = (i: number) => (active === null ? null : data.edges[i].to === active);
  const [vw, vh] = data.wide.viewBox;
  const [uw, uh] = data.tall.viewBox;

  return (
    <div ref={root} data-live="1" className={`pv3-flow ${className}`} role="group" aria-label={label}>
      {/* Decorative twin of the sr-only list below: hidden from assistive tech. */}
      <div className="pv3-flow__stage" aria-hidden="true" style={{ '--tr': uw / uh, '--wr': vw / vh } as CSSProperties}>
        <Edges data={data} layout={data.wide} kind="wide" hotEdge={hotEdge} />
        <Edges data={data} layout={data.tall} kind="tall" hotEdge={hotEdge} />
        {data.nodes.map((n) => {
          const iconKey = n.icon ? resolveTechIconKey(n.icon) : null;
          const state = active === null ? '' : n.id === active ? ' is-hot' : ' is-dim';
          const [wx, wy, ww, wh] = data.wide.boxes[n.id];
          const [tx, ty, tw, th] = data.tall.boxes[n.id];
          const pos = {
            '--wl': `${(wx / vw) * 100}%`, '--wt': `${(wy / vh) * 100}%`, '--ww': `${(ww / vw) * 100}%`, '--wh': `${(wh / vh) * 100}%`,
            '--tl': `${(tx / uw) * 100}%`, '--tt': `${(ty / uh) * 100}%`, '--tw': `${(tw / uw) * 100}%`, '--th': `${(th / uh) * 100}%`,
          } as CSSProperties;
          return (
            <div key={n.id} style={pos} className={`pv3-flow__node${n.group === 'ci' ? ' pv3-flow__node--ci' : ''}${state}`}>
              <span className="pv3-flow__title">
                {iconKey && <TechIcon name={iconKey} />}
                {n.title}
              </span>
              <span className="pv3-flow__sub">{n.subtitle}</span>
            </div>
          );
        })}
      </div>

      {/* Visible caption of the current step; silent for screen readers (the list below carries the content). */}
      <div className="pv3-flow__bar" aria-hidden="true">
        <p className="pv3-flow__caption">
          {step && node && (
            <>{step.label && <><strong className="pv3-flow__state">{step.label}</strong> · </>}<strong>{node.title}.</strong> {node.caption}</>
          )}
        </p>
      </div>

      <ol className="pv3-flow__sr">
        {data.nodes.filter((n) => n.group !== 'ci').map((n) => {
          const to = data.edges.filter((e) => e.from === n.id).map((e) => data.nodes.find((m) => m.id === e.to)?.title).join(', ');
          return <li key={n.id}>{n.title}, {n.subtitle}. {n.caption}{to ? ` Siguiente: ${to}.` : ' Fin del flujo.'}</li>;
        })}
        {data.nodes.filter((n) => n.group === 'ci').map((n) => <li key={n.id}>{n.title}, {n.subtitle}. {n.caption}</li>)}
      </ol>
    </div>
  );
}
