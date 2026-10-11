'use client';

import Image from 'next/image';
import { FlowDiagram } from '@/components/ui/FlowDiagram';
import { getFlow } from '@/data/content/diagrams.i18n';
import { CaseHeader, CaseLayout, CaseSection } from '@/components/ui/CaseHeader';
import { useLanguage } from '@/context/LanguageContext';
import { sportBarLeagueCopy } from '@/data/content/cases/sportbarleague.i18n';

export function SportBarLeagueContent() {
  const { language } = useLanguage();
  const c = sportBarLeagueCopy[language];
  const h = c.header;
  const flow = getFlow('sportbarleague', language);
  return (
    <main id="main-content" className="pv3-section pv3-detail">
      <div className="pv3-section__inner">
        <CaseHeader
          id="sportbarleague"
          tier={h.tier}
          title={h.title}
          lede={h.lede}
          summary={h.summary}
          actions={[
            { label: h.actions[0], href: 'https://github.com/JCGJ94/JCGJ94-SportBarLeague' },
          ]}
        >
          <Image
            src="/projects/sportbar-league-captura.png"
            alt={c.imageAlt}
            width={1362}
            height={925}
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
          <CaseSection title={c.concept.title}>
            <p className="pv3-detail__pull">
              {c.concept.pull}
            </p>
            <h3 className="pv3-detail__sub">{c.concept.allowsTitle}</h3>
            <ul className="pv3-detail__cards">
              {c.concept.allows.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <h3 className="pv3-detail__sub">{c.concept.requiresTitle}</h3>
            <p>{c.concept.requires}</p>
          </CaseSection>
          <CaseSection title={c.decisions.title}>
            <ul className="pv3-detail__cards">
              {c.decisions.items.map((i) => (
                <li key={i.lead}><strong>{i.lead}</strong> {i.text}</li>
              ))}
            </ul>
          </CaseSection>
          <CaseSection title={c.evolution.title}>
            <p className="pv3-detail__pull">
              {c.evolution.pull[0]}<mark>{c.evolution.pull[1]}</mark>{c.evolution.pull[2]}
            </p>
            <p>
              {c.evolution.text}
            </p>
          </CaseSection>
        </CaseLayout>
      </div>
    </main>
  );
}
