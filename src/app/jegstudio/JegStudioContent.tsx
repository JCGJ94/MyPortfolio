'use client';

import Image from 'next/image';
import { FlowDiagram } from '@/components/ui/FlowDiagram';
import { getFlow } from '@/data/content/diagrams.i18n';
import { CaseHeader, CaseLayout, CaseSection } from '@/components/ui/CaseHeader';
import { useLanguage } from '@/context/LanguageContext';
import { jegStudioCopy } from '@/data/content/cases/jegstudio.i18n';

export function JegStudioContent() {
  const { language } = useLanguage();
  const c = jegStudioCopy[language];
  const h = c.header;
  const t = c.team;
  const g = t.gitFlow.parts;
  const flow = getFlow('jegstudio', language);
  return (
    <main id="main-content" className="pv3-section pv3-detail">
      <div className="pv3-section__inner">
        <CaseHeader
          id="jegstudio"
          tier={h.tier}
          title={h.title}
          lede={h.lede}
          summary={h.summary}
          actions={[
            { label: h.actions[0], href: 'https://www.jegsdev.com/' },
            { label: h.actions[1], href: 'https://github.com/SergioGala/CodeNinja' },
          ]}
        >
          <Image
            src="/projects/JegStudio.png"
            alt={c.imageAlt}
            width={951}
            height={711}
            className="pv3-detail__img"
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority
          />
        </CaseHeader>

        <section className="pv3-detail__api pv3-detail__arch">
          <h2 className="pv3-detail__label">{c.flowTitle}</h2>
          <p className="pv3-detail__apilede">{c.flowLede}</p>
          <FlowDiagram data={flow} label={flow.label ?? ''} className="pv3-case__diagram" />
        </section>

        <CaseLayout stackTitle={c.stackTitle} stack={c.stack}>
          <CaseSection title={c.context.title}>
            <p className="pv3-detail__pull">
              {c.context.pull}
            </p>
            <p>{c.context.text[0]}<mark>{c.context.text[1]}</mark>{c.context.text[2]}</p>
          </CaseSection>
          <CaseSection title={t.title}>
            <ul className="pv3-detail__cards">
              <li><strong>{t.gitFlow.lead}</strong> {g[0]}<code>feat/</code>{g[1]}<code>fix/</code>{g[2]}<code>main</code>{g[3]}</li>
              <li><strong>{t.decisions.lead}</strong> {t.decisions.text}</li>
              <li><strong>{t.coordination.lead}</strong> {t.coordination.text}</li>
              <li><strong>{t.responsibility.lead}</strong> {t.responsibility.text}</li>
            </ul>
          </CaseSection>
          <CaseSection title={c.skills.title}>
            <ul className="pv3-detail__cards">
              {c.skills.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </CaseSection>
        </CaseLayout>
      </div>
    </main>
  );
}
