'use client';

import { TechLabel } from '@/components/ui/TechIcon';
import { useLanguage } from '@/context/LanguageContext';

export type CaseAtAGlanceData = {
  kind: string;
  role: string;
  stack: string[];
  proves: string[];
};

type Action = { label: string; href: string };

// "De un vistazo": key facts as a grid, then what the case shows as short numbered cards. Facts already on the page only.
export function CaseAtAGlance({ data, actions }: { data: CaseAtAGlanceData; actions: Action[] }) {
  const { t } = useLanguage();
  const c = t.caseUi;
  return (
    <section className="pv3-detail__summary" aria-labelledby="de-un-vistazo">
      <h2 id="de-un-vistazo" className="pv3-detail__summary-title">{c.glance}</h2>
      <dl className="pv3-detail__summary-grid">
        <div className="pv3-detail__summary-cell">
          <dt>{c.kind}</dt>
          <dd className="pv3-detail__kind">{data.kind}</dd>
        </div>
        <div className="pv3-detail__summary-cell">
          <dt>{c.role}</dt>
          <dd>{data.role}</dd>
        </div>
        <div className="pv3-detail__summary-cell">
          <dt>{c.stack}</dt>
          <dd>
            <ul className="pv3-detail__chips">
              {data.stack.map((s) => <li key={s}><TechLabel text={s} /></li>)}
            </ul>
          </dd>
        </div>
        <div className="pv3-detail__summary-cell">
          <dt>{c.links}</dt>
          <dd>
            <ul className="pv3-detail__summary-links">
              {actions.map((a) => (
                <li key={a.href}>
                  <a href={a.href} target="_blank" rel="noopener noreferrer" className="pv3-focus">{a.label}</a>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
      <h3 className="pv3-detail__proves-title">{c.proves}</h3>
      <ol className="pv3-detail__proves">
        {data.proves.map((p) => <li key={p}>{p}</li>)}
      </ol>
    </section>
  );
}
