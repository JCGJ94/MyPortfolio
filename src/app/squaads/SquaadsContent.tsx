'use client';

import Image from 'next/image';
import { CaseHeader, CaseLayout, CaseSection } from '@/components/ui/CaseHeader';
import { SquaadsArchitecture } from '@/components/ui/SquaadsArchitecture';
import { useLanguage } from '@/context/LanguageContext';
import { squaadsCopy } from '@/data/content/cases/squaads.i18n';

export function SquaadsContent() {
  const { language } = useLanguage();
  const c = squaadsCopy[language];
  const h = c.header;
  const a = c.architecture;
  const ci = c.cicd;
  return (
    <main id="main-content" className="pv3-section pv3-detail">
      <div className="pv3-section__inner">
        <CaseHeader
          id="squaads-meeting-bot"
          tier={h.tier}
          title={h.title}
          lede={h.lede}
          summary={h.summary}
          actions={[{ label: h.actions[0], href: 'https://github.com/devs-squaads/tldv-squaads-dev' }]}
        >
          <figure className="pv3-detail__shot">
            <Image
              src="/projects/squaads-login.webp"
              alt={c.imageAlt}
              width={1111}
              height={1064}
              sizes="(min-width: 64rem) 28rem, 90vw"
              className="pv3-case__shot"
            />
          </figure>
          <SquaadsArchitecture label={c.archLabel} />
        </CaseHeader>
        <p className="pv3-detail__note">{c.note}</p>

        <CaseLayout stackTitle={c.stackTitle} stack={c.stack}>
          <CaseSection title={c.product.title}>
            <p className="pv3-detail__pull">
              {c.product.pull}
            </p>
            <h3 className="pv3-detail__sub">{c.product.flowTitle}</h3>
            <ul className="pv3-detail__cards">
              {c.product.flow.map((f) => (
                <li key={f.lead}><strong>{f.lead}</strong> {f.text}</li>
              ))}
            </ul>
            <h3 className="pv3-detail__sub">{c.product.featuresTitle}</h3>
            <ul>
              {c.product.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </CaseSection>
          <CaseSection title={a.title}>
            <p className="pv3-detail__pull">
              {a.pull[0]}<mark>{a.pull[1]}</mark>{a.pull[2]}
            </p>
            <h3 className="pv3-detail__sub">{a.monorepoTitle}</h3>
            <p>
              <code>apps/web</code>{a.monorepo[0]}<code>apps/worker</code>{a.monorepo[1]}<code>apps/extension</code>{a.monorepo[2]}<code>packages/shared</code>{a.monorepo[3]}
            </p>
            <h3 className="pv3-detail__sub">{a.decisionsTitle}</h3>
            <ul className="pv3-detail__cards">
              <li><strong>{a.stateLead}</strong> <code>pending → recording → transcribing → summarizing → completed | error</code>{a.stateTail}</li>
              {a.decisions.map((d) => (
                <li key={d.lead}><strong>{d.lead}</strong> {d.text}</li>
              ))}
            </ul>
          </CaseSection>
          <CaseSection title={ci.title}>
            <p>
              <mark>{ci.highlight}</mark>
            </p>
            <h3 className="pv3-detail__sub">{ci.pipelineTitle}</h3>
            <p>{ci.pipelineIntro}</p>
            <ol className="pv3-detail__pipeline" aria-label={ci.pipelineLabel}>
              {ci.pipeline.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <h3 className="pv3-detail__sub">{ci.govTitle}</h3>
            <ul className="pv3-detail__cards">
              <li><strong>{ci.governance.lead}</strong> {ci.governance.text}</li>
              <li><strong>{ci.web.lead}</strong> {ci.web.before}<code>vercel.json</code>{ci.web.after}</li>
              <li><strong>{ci.worker.lead}</strong> {ci.worker.text}</li>
            </ul>
          </CaseSection>
          <CaseSection title={c.security.title}>
            <ul className="pv3-detail__cards">
              {c.security.items.map((s) => (
                <li key={s.lead}><strong>{s.lead}</strong> {s.text}</li>
              ))}
            </ul>
          </CaseSection>
          <CaseSection title={c.roleTitle}>
            <p>
              {h.summary.role}
            </p>
          </CaseSection>
        </CaseLayout>
      </div>
    </main>
  );
}
