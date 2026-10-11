'use client';

import Image from 'next/image';
import { FlowDiagram } from '@/components/ui/FlowDiagram';
import { getFlow } from '@/data/content/diagrams.i18n';
import { CaseHeader, CaseLayout, CaseSection } from '@/components/ui/CaseHeader';
import { useLanguage } from '@/context/LanguageContext';
import { tallerCardonalCopy } from '@/data/content/cases/tallercardonal.i18n';

export function TallerCardonalContent() {
  const { language } = useLanguage();
  const c = tallerCardonalCopy[language];
  const h = c.header;
  const flow = getFlow('tallercardonal', language);
  return (
    <main id="main-content" className="pv3-section pv3-detail">
      <div className="pv3-section__inner">
        <CaseHeader
          id="tallercardonal"
          tier={h.tier}
          title={h.title}
          lede={h.lede}
          summary={h.summary}
          actions={[
            { label: h.actions[0], href: 'https://www.tallercardonal.es/' },
          ]}
        >
          <Image
            src="/projects/taller-demo.png"
            alt={c.imageAlt}
            width={1094}
            height={896}
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
          <CaseSection title={c.context.title}>
            <p className="pv3-detail__pull">
              {c.context.pull}
            </p>
            <h3 className="pv3-detail__sub">{c.context.subTitle}</h3>
            <ul className="pv3-detail__cards">
              {c.context.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </CaseSection>
          <CaseSection title={c.process.title}>
            <ul className="pv3-detail__cards">
              {c.process.items.map((i) => (
                <li key={i.lead}><strong>{i.lead}</strong> {i.text}</li>
              ))}
            </ul>
          </CaseSection>
          <CaseSection title={c.impact.title}>
            <p>
              {c.impact.pull[0]}<strong>{c.impact.pull[1]}</strong>{c.impact.pull[2]}
            </p>
            <ul className="pv3-detail__cards">
              {c.impact.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </CaseSection>
        </CaseLayout>
      </div>
    </main>
  );
}
