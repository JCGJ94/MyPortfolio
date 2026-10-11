'use client';

import Image from 'next/image';
import { FlowDiagram } from '@/components/ui/FlowDiagram';
import { getFlow } from '@/data/content/diagrams.i18n';
import { CaseHeader, CaseLayout, CaseSection } from '@/components/ui/CaseHeader';
import { useLanguage } from '@/context/LanguageContext';
import { clinicalAiCopy } from '@/data/content/cases/clinical-ai.i18n';

export function ClinicalAiContent() {
    const { language } = useLanguage();
    const c = clinicalAiCopy[language];
    const h = c.header;
    const d = c.decisions;
    const r = d.resilience;
    const flow = getFlow('clinical-ai', language);
    return (
        <main id="main-content" className="pv3-section pv3-detail">
            <div className="pv3-section__inner">
                <CaseHeader
                    id="clinical-ai"
                    tier={h.tier}
                    title={h.title}
                    lede={h.lede}
                    summary={h.summary}
                    actions={[{ label: h.actions[0], href: 'https://github.com/JCGJ94/Clinical-AI-Multi-Agent' }]}
                >
                    <pre className="pv3-detail__code" role="group" tabIndex={0} aria-label={c.codeLabel}>
                        <code>{c.architecture}</code>
                    </pre>
                </CaseHeader>

                <section className="pv3-detail__api">
                    <h2 className="pv3-detail__label">{c.apiTitle}</h2>
                    <p className="pv3-detail__apilede">{c.apiLede}</p>
                    <div className="pv3-detail__media pv3-detail__media--light">
                        <Image
                            src="/projects/clinical-ai.png"
                            alt={c.apiImageAlt}
                            width={1491}
                            height={1222}
                            className="pv3-detail__img"
                            sizes="(max-width: 1024px) 100vw, 1024px"
                        />
                    </div>
                </section>

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
                        <ul className="pv3-detail__cards">
                            {c.concept.items.map((i) => (
                                <li key={i.lead}><strong>{i.lead}</strong> {i.text}</li>
                            ))}
                        </ul>
                    </CaseSection>
                    <CaseSection title={d.title}>
                        <ul className="pv3-detail__cards">
                            <li><strong>{d.triage.lead}</strong> {d.triage.before}<code>temperature=0.0</code>{d.triage.after}</li>
                            <li><strong>{d.content.lead}</strong> {d.content.text}</li>
                            <li><strong>{d.parallel.lead}</strong> {d.parallel.before}<code>asyncio.gather</code>{d.parallel.after}</li>
                            <li><strong>{d.rag.lead}</strong> {d.rag.before}<code>retriever | prompt | llm | parser</code>{d.rag.after}</li>
                            <li><strong>{r.lead}</strong> {r.before}<code>return_exceptions=True</code>{r.mid}<code>failed_agents</code>{r.and}<code>warnings</code>{r.after}</li>
                            <li><strong>{d.providers.lead}</strong> {d.providers.text}</li>
                        </ul>
                    </CaseSection>
                    <CaseSection title={c.proves.title}>
                        <p className="pv3-detail__pull">
                            {c.proves.pull[0]} <mark>{c.proves.pull[1]}</mark>
                        </p>
                        <ul className="pv3-detail__cards">
                            {c.proves.items.map((i) => (
                                <li key={i.lead}><strong>{i.lead}</strong> {i.text}</li>
                            ))}
                        </ul>
                    </CaseSection>
                </CaseLayout>
            </div>
        </main>
    );
}
