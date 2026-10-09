'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { flows } from '@/data/diagrams';
import { projects, type CaseStep, type Project } from '@/data/projects';
import { TechLabel } from '@/components/ui/TechIcon';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { FlowDiagram } from '@/components/ui/FlowDiagram';
import { SquaadsArchitecture } from '@/components/ui/SquaadsArchitecture';
import { useLanguage } from '@/context/LanguageContext';

// Real component chain of each project, taken from its stack and highlights in projects.ts.
const architecture: Record<string, string[]> = {
  'squaads-meeting-bot': ['Next.js', 'Postgres · cola', 'Worker · Puppeteer + FFmpeg', 'S3 / MinIO', 'IA con fallback'],
  nutriflow: ['Next.js', 'NestJS', 'Supabase · RLS', 'Gemini'],
  'clinical-ai': ['Router de triage', 'Agentes en paralelo', 'RAG · pgvector', 'Salida tipada'],
  tallercardonal: ['React', 'Vite', 'Vercel'],
  jegstudio: ['React', 'Next.js', 'Git Flow'],
  sportbarleague: ['React', 'Flask · JWT', 'SQLAlchemy', 'PostgreSQL'],
};

const steps: CaseStep[] = ['problem', 'solution', 'decisions', 'evidence'];

// Below 64rem, decisions beyond this many collapse into a native <details>; all text stays in the DOM.
const VISIBLE_DECISIONS = 3;

// Desktop layout (vertical tablist) from 64rem; the same breakpoint as the CSS.
const WIDE = '(min-width: 64rem)';
const noopSubscribe = () => () => {};
const subscribeWide = (cb: () => void) => {
  const mq = window.matchMedia(WIDE);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};

const pad =(n: number) => String(n + 1).padStart(2, '0');

/** Case stage: product screen first, architecture flow one tab away (both stay in the DOM). */
function CaseMedia({ project }: { project: Project }) {
  const { t } = useLanguage();
  const c = t.projects.case;
  const [tab, setTab] = useState<'product' | 'architecture'>('product');
  const flow = flows[project.id];
  const tabs = [
    { id: 'product', label: c.tabProduct },
    { id: 'architecture', label: c.tabArchitecture },
  ] as const;

  return (
    <>
      <div className="pv3-case__tabs" role="tablist" aria-label={`${c.tabProduct} / ${c.tabArchitecture}`}>
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`${project.id}-tab-${id}`}
            aria-selected={tab === id}
            aria-controls={`${project.id}-panel-${id}`}
            tabIndex={tab === id ? 0 : -1}
            className="pv3-case__tab pv3-focus"
            onClick={() => setTab(id)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                const next = id === 'product' ? 'architecture' : 'product';
                setTab(next);
                document.getElementById(`${project.id}-tab-${next}`)?.focus();
              }
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${project.id}-panel-product`} aria-labelledby={`${project.id}-tab-product`} hidden={tab !== 'product'} className="pv3-case__panel">
        {project.media === 'diagram' ? (
          <Image
            src="/projects/squaads-login.webp"
            alt={c.screenshotAlt}
            width={1111}
            height={1064}
            sizes="(min-width: 48rem) 32rem, 90vw"
            className="pv3-case__shot"
          />
        ) : (
          <div className="pv3-case__frame">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 64rem) 45vw, (min-width: 48rem) 40rem, 100vw"
              className="pv3-case__img"
            />
          </div>
        )}
      </div>
      <div role="tabpanel" id={`${project.id}-panel-architecture`} aria-labelledby={`${project.id}-tab-architecture`} hidden={tab !== 'architecture'} className="pv3-case__panel">
        {project.media === 'diagram' ? (
          <SquaadsArchitecture label={c.diagramAlt} />
        ) : (
          <FlowDiagram data={flow} label={flow.label ?? project.title} className="pv3-case__diagram" />
        )}
      </div>
    </>
  );
}

/** One case = one tabpanel. Rendered for every project (SSR/no-JS keep all of them); `hidden` is applied after hydration. */
function CaseFile({ project, index, hidden }: { project: Project; index: number; hidden: boolean }) {
  const { t } = useLanguage();
  const c = project.case;
  const chain = architecture[project.id] ?? [];

  return (
    <div
      id={`caso-${project.id}`}
      role="tabpanel"
      className="pv3-case"
      aria-labelledby={`tab-${project.id}`}
      hidden={hidden}
      tabIndex={hidden ? undefined : 0}
    >
      <header className="pv3-case__head">
        <span className="pv3-case__num" aria-hidden="true">{pad(index)}</span>
        <p className="pv3-case__meta">
          <span>{project.badge}</span>
          <span aria-hidden="true">/</span>
          <span><TechLabel text={project.tags.slice(0, 3).join(' · ')} /></span>
        </p>
        <h3 id={`caso-${project.id}-title`} className="pv3-case__title">{project.title}</h3>
        <p className="pv3-case__sub">{project.subtitle}</p>
      </header>

      <ol className="pv3-case__chain" aria-label={project.title}>
        {chain.map((node) => (
          <li key={node}><TechLabel text={node} /></li>
        ))}
      </ol>

      <div className="pv3-case__media">
        <CaseMedia project={project} />
      </div>

      <ol className="pv3-trace pv3-case__steps">
        {steps.map((step) => {
          const value = c?.[step];
          const isPending = !c || c.pending.includes(step);
          const items = Array.isArray(value) ? value : value ? [value] : [];
          return (
            <li key={step} data-step={step} className={`pv3-case__step${isPending ? ' is-pending' : ''}`}>
              <span className="pv3-trace__node" aria-hidden="true" />
              <h4 className="pv3-case__label">{t.projects.case[step]}</h4>
              {step === 'decisions' && items.length > VISIBLE_DECISIONS ? (
                <div className="pv3-case__decisions">
                  <ul className="pv3-case__list">
                    {items.slice(0, VISIBLE_DECISIONS).map((it) => <li key={it}>{it}</li>)}
                  </ul>
                  <details className="pv3-case__more">
                    <summary className="pv3-focus">
                      {t.projects.case.moreDecisions.replace('{n}', String(items.length - VISIBLE_DECISIONS))}
                    </summary>
                    <ul className="pv3-case__list">
                      {items.slice(VISIBLE_DECISIONS).map((it) => <li key={it}>{it}</li>)}
                    </ul>
                  </details>
                </div>
              ) : items.length > 1 || Array.isArray(value) ? (
                <ul className="pv3-case__list">
                  {items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              ) : (
                items[0] && <p className="pv3-case__text">{items[0]}</p>
              )}
              {isPending && <p className="pv3-case__pending">{t.projects.case.pending}</p>}
            </li>
          );
        })}
      </ol>

      <footer className="pv3-case__links">
        <Link href={project.detailPath ?? `/${project.id}`} className="pv3-case__cta pv3-focus">
          {t.projects.viewProject}
          <ArrowUpRight aria-hidden="true" size={18} />
        </Link>
        {project.internalProject && <p className="pv3-case__internal pv3-case__note">{t.projects.case.internal}</p>}
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="pv3-case__ext pv3-focus">
            Demo<span className="sr-only"> — {project.title}</span>
          </a>
        )}
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="pv3-case__ext pv3-focus">
            GitHub<span className="sr-only"> — {project.title}</span>
          </a>
        )}
      </footer>
    </div>
  );
}

export function Projects() {
  const { t, language } = useLanguage();
  const [selected, setSelected] = useState(projects[0].id);
  // `ready` flips after hydration: until then (and without JS) every case is visible and indexable.
  const ready = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [switched, setSwitched] = useState(false);
  const vertical = useSyncExternalStore(subscribeWide, () => window.matchMedia(WIDE).matches, () => true);
  const tabsRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const select = (id: string, focus = false) => {
    setSelected(id);
    setSwitched(true);
    // replaceState: the URL is shareable (/#caso-<id>) without a jump or a history entry per click.
    history.replaceState(null, '', `#caso-${id}`);
    if (focus) document.getElementById(`tab-${id}`)?.focus();
  };

  // Deep links (/#caso-<id>, also from the Stack panel and the case pages) select that case and land on the section.
  useEffect(() => {
    const fromHash = () => {
      const id = decodeURIComponent(window.location.hash).replace(/^#caso-/, '');
      if (!window.location.hash.startsWith('#caso-') || !projects.some((p) => p.id === id)) return;
      setSelected(id);
      setSwitched(true);
      requestAnimationFrame(() => document.getElementById('projects')?.scrollIntoView());
    };
    const raf = requestAnimationFrame(fromHash);
    window.addEventListener('hashchange', fromHash);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('hashchange', fromHash);
    };
  }, []);

  // Chip row (< 64rem): keep the selected chip visible and, if the reader was deep in a long case, bring the new one into view.
  useEffect(() => {
    const row = tabsRef.current;
    const a = row?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!row || !a || vertical) return;
    if (row.scrollWidth > row.clientWidth) row.scrollTo({ left: a.offsetLeft - (row.clientWidth - a.offsetWidth) / 2 });
    if (switched && (listRef.current?.getBoundingClientRect().top ?? 0) < 0) listRef.current?.scrollIntoView();
  }, [selected, switched, vertical]);

  const onKeyDown = (e: KeyboardEvent) => {
    const keys = vertical ? ['ArrowUp', 'ArrowDown'] : ['ArrowLeft', 'ArrowRight'];
    const i = projects.findIndex((p) => p.id === selected);
    let next = -1;
    if (e.key === keys[0]) next = (i - 1 + projects.length) % projects.length;
    else if (e.key === keys[1]) next = (i + 1) % projects.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = projects.length - 1;
    if (next < 0) return;
    e.preventDefault();
    select(projects[next].id, true);
  };

  return (
    <section id="projects" className="pv3-section pv3-cases">
      <div className="pv3-section__inner">
        <header className="pv3-cases__head">
          <SectionLabel index="02" label={t.sectionLabel.projects} meta={`${t.projects.case.index} · ${String(projects.length).padStart(2, '0')}`} />
          <h2 className="pv3-cases__title">
            {t.projects.title} <span>{t.projects.titleSpan}</span>
          </h2>
          <p className="pv3-cases__lede">{t.projects.description}</p>
          {language !== 'es' && <p className="pv3-cases__note">{t.projects.case.spanishOnly}</p>}
        </header>

        <div className="pv3-cases__layout">
          <div className="pv3-case-index">
            <p className="pv3-case-index__cap" aria-hidden="true">{t.projects.case.index}</p>
            {/* Anchors with role=tab: without JS they still jump to the (visible) case. */}
            <div
              ref={tabsRef}
              role="tablist"
              aria-label={t.projects.case.index}
              aria-orientation={vertical ? 'vertical' : 'horizontal'}
              className="pv3-case-index__tabs"
              onKeyDown={onKeyDown}
            >
              {projects.map((p, i) => (
                <a
                  key={p.id}
                  id={`tab-${p.id}`}
                  href={`#caso-${p.id}`}
                  role="tab"
                  aria-selected={selected === p.id}
                  aria-controls={`caso-${p.id}`}
                  tabIndex={selected === p.id ? 0 : -1}
                  className="pv3-focus"
                  onClick={(e) => {
                    e.preventDefault();
                    select(p.id);
                  }}
                >
                  <span className="pv3-case-index__n">{pad(i)}</span>
                  <span className="pv3-case-index__t">{p.title}</span>
                  <span className="pv3-case-index__tier">{p.badge}</span>
                </a>
              ))}
            </div>
          </div>

          <div ref={listRef} className="pv3-cases__list" data-ready={ready || undefined} data-switched={switched || undefined}>
            {projects.map((p, i) => (
              <CaseFile key={p.id} project={p} index={i} hidden={ready && selected !== p.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
