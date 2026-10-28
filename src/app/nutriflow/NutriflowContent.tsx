'use client';

import Image from 'next/image';
import { FlowDiagram } from '@/components/ui/FlowDiagram';
import { getFlow } from '@/data/content/diagrams.i18n';
import { CaseHeader, CaseLayout, CaseSection } from '@/components/ui/CaseHeader';
import { useLanguage } from '@/context/LanguageContext';
import { nutriflowCopy } from '@/data/content/cases/nutriflow.i18n';

export function NutriflowContent() {
  const { language } = useLanguage();
  const c = nutriflowCopy[language];
  const h = c.header;
  const s = c.solution;
  const flow = getFlow('nutriflow', language);
  return (
    <main id="main-content" className="pv3-section pv3-detail">
      <div className="pv3-section__inner">
        <CaseHeader
          id="nutriflow"
          tier={h.tier}
          title={h.title}
          lede={h.lede}
          summary={h.summary}
          actions={[
            { label: h.actions[0], href: 'https://nutri-flow-mu.vercel.app/' },
            { label: h.actions[1], href: 'https://github.com/JCGJ94/NutriFlow-Project' },
          ]}
        >
          <Image
            src="/projects/nutriflow.png"
            alt={c.imageAlt}
            width={1485}
            height={1075}
            className="pv3-detail__img"
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority
          />
        </CaseHeader>

        <section className="pv3-detail__api pv3-detail__arch">
          <h2 className="pv3-detail__label">{c.archTitle}</h2>
          <p className="pv3-detail__apilede">{c.archLede}</p>
          <FlowDiagram data={flow} label={flow.label ?? ''} className="pv3-case__diagram" />
        </section>

        <CaseLayout stackTitle={c.stackTitle} stack={c.stack}>
          <CaseSection title={c.problem.title}>
            <p className="pv3-detail__pull">
              {c.problem.pull}
            </p>
            <ul className="pv3-detail__cards">
              {c.problem.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseSection>
          <CaseSection title={s.title}>
            <p className="pv3-detail__pull">{s.pull[0]}<strong>Gemini 2.0 Flash</strong>{s.pull[1]}<strong>Supabase</strong>{s.pull[2]}</p>
            <ul className="pv3-detail__cards">
              <li><strong>{s.frontend.lead}</strong> {s.frontend.before}<strong>Next.js 16</strong>{s.frontend.after}</li>
              <li><strong>{s.backend.lead}</strong> <strong>Next.js Route Handlers</strong>{s.backend.after}</li>
              <li>{s.auth[0]}<strong>RLS (Row Level Security)</strong>{s.auth[1]}</li>
              <li>{s.generator}</li>
            </ul>
          </CaseSection>
        </CaseLayout>
      </div>
    </main>
  );
}
