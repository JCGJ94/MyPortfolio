import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Children, isValidElement, type ReactElement, type ReactNode } from 'react';
import { TechLabel } from '@/components/ui/TechIcon';
import { CaseAtAGlance, type CaseAtAGlanceData } from '@/components/ui/CaseAtAGlance';

type Action = { label: string; href: string };

// Shared header of the case detail routes: back link to the home case, tier, h1, blue-ruled note, links and media.
export function CaseHeader({ id, tier, title, lede, actions, summary, children }: {
  id: string; tier: string; title: string; lede: string; actions: Action[]; summary?: CaseAtAGlanceData; children: ReactNode;
}) {
  return (
    <>
      <Link href={`/#caso-${id}`} className="pv3-detail__back pv3-focus">
        <ArrowLeft aria-hidden="true" size={16} />
        Volver a Proyectos
      </Link>
      <header className="pv3-detail__head">
        <div className="pv3-detail__copy">
          <p className="pv3-detail__tier">{tier}</p>
          <h1 className="pv3-detail__title">{title}</h1>
          <p className="pv3-detail__lede">{lede}</p>
          <div className="pv3-case__links">
            {actions.map((a, i) => (
              <a key={a.href} href={a.href} target="_blank" rel="noopener noreferrer"
                className={`${i === 0 ? 'pv3-case__cta' : 'pv3-case__ext'} pv3-focus`}>
                {a.label}
              </a>
            ))}
          </div>
        </div>
        <div className="pv3-detail__media">{children}</div>
      </header>
      {summary && <CaseAtAGlance data={summary} actions={actions} />}
    </>
  );
}

// Facts table (aside) plus the trace of sections.
export const slug = (title: string) =>
  title.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Facts table (aside) plus the trace of sections; at wide viewports the aside also carries an in-page index.
export function CaseLayout({ stackTitle, stack, children }: {
  stackTitle: string; stack: [string, string][]; children: ReactNode;
}) {
  const titles = Children.toArray(children)
    .filter((c): c is ReactElement<{ title: string }> => isValidElement(c) && typeof (c.props as { title?: unknown }).title === 'string')
    .map((c) => c.props.title);
  return (
    <div className="pv3-detail__body">
      <aside className="pv3-detail__stack">
        <h2 className="pv3-detail__label">{stackTitle}</h2>
        <dl>
          {stack.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd><TechLabel text={v} /></dd>
            </div>
          ))}
        </dl>
        {titles.length > 1 && (
          <nav className="pv3-detail__toc" aria-label="En esta página">
            <ol>
              {titles.map((t) => (
                <li key={t}><a href={`#${slug(t)}`} className="pv3-focus">{t}</a></li>
              ))}
            </ol>
          </nav>
        )}
      </aside>
      <div className="pv3-trace pv3-detail__steps">{children}</div>
    </div>
  );
}

export function CaseSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section id={slug(title)} className="pv3-detail__step">
      <span className="pv3-trace__node" aria-hidden="true" />
      <h2 className="pv3-detail__label">{title}</h2>
      <div className="pv3-detail__prose">{children}</div>
    </section>
  );
}
