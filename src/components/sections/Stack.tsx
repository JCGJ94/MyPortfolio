'use client';

import { projects } from '@/data/projects';
import { Stack3D, type StackLayer } from '@/components/ui/Stack3D';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { useLanguage } from '@/context/LanguageContext';
import '@/app/pv3-stack.css';

type Tech = { label: string; tags: string[]; icon: string };

// Each technology links to the cases whose `tags` in projects.ts declare it; no tags means no link.
// `icon` keys the brand glyph in techIcons.ts (default: the label) or a neutral fallback glyph in TechIcon.
const tech = (label: string, tags: string[] = [], icon = label): Tech => ({ label, tags, icon });

export function Stack() {
  const { t } = useLanguage();
  const it = t.stack.items;
  const roles: { key: 'frontend' | 'backend' | 'ai' | 'data' | 'tools'; items: Tech[] }[] = [
    {
      key: 'backend',
      items: [
        tech('Python', ['Python']), tech('Flask', ['Flask']), tech('FastAPI', ['FastAPI']),
        tech('REST APIs', ['REST API']), tech('JWT', ['JWT']), tech('SQLAlchemy', ['SQLAlchemy']),
        tech('Node.js'), tech('NestJS', ['NestJS']), tech('Bun', ['Bun']),
      ],
    },
    {
      key: 'frontend',
      items: [tech('React', ['React']), tech('Next.js', ['Next.js']), tech('TypeScript', ['TypeScript']), tech('Tailwind CSS')],
    },
    {
      key: 'data',
      items: [
        tech('PostgreSQL', ['PostgreSQL', 'Postgres']), tech('Supabase', ['Supabase']),
        tech('pgvector', ['pgvector']), tech(it.relationalModeling, [], 'relational'),
      ],
    },
    {
      key: 'ai',
      items: [
        tech('Gemini API', ['Gemini']), tech('LangChain', ['LangChain']), tech('RAG', ['RAG']),
        tech(it.llmOrchestration, [], 'orchestration'), tech(it.agentArchitecture, [], 'agents'), tech(it.prompting, [], 'prompting'),
        tech(it.aiAutomation, [], 'automation'), tech(it.toolCalling, [], 'tools'),
      ],
    },
    {
      key: 'tools',
      items: [
        tech('Git'), tech('GitHub'), tech('Docker', ['Docker']), tech('Vercel', ['Vercel']), tech('Railway', ['Railway']),
        tech('Puppeteer', ['Puppeteer']), tech('FFmpeg', ['FFmpeg']), tech('VSCode'), tech('Postman'),
        tech(it.testing, ['Testing'], 'testing'), tech('SOLID'), tech('Clean Code'),
      ],
    },
  ];
  const langs = [tech(it.languageEs), tech(it.languageEn)];

  // Top of the stack first: what the user sees, down to the tooling underneath.
  const layers: StackLayer[] = (['frontend', 'backend', 'ai', 'data', 'tools'] as const).map((key) => ({
    key,
    title: t.stack.roles[key],
    items: roles.find((r) => r.key === key)!.items.map((item) => ({
      label: item.label,
      icon: item.icon,
      cases: projects.filter((p) => p.tags.some((tag) => item.tags.includes(tag))).map((p) => ({ id: p.id, title: p.title })),
    })),
  }));

  return (
    <section id="stack" className="pv3-section pv3-stack">
      <div className="pv3-section__inner">
        <header className="pv3-stack__head">
          <SectionLabel index="03" label={t.sectionLabel.stack} />
          <h2 className="pv3-stack__title">
            {t.stack.title} <span>{t.stack.titleSpan}</span>
          </h2>
          <p className="pv3-stack__lede">{t.stack.description}</p>
        </header>

        <Stack3D layers={layers} usedIn={t.stack.usedIn} />
        <p className="pv3-stack__langs">
          <strong>{t.stack.roles.languages}</strong> {langs.map((l) => l.label).join(' / ')}
        </p>
      </div>
    </section>
  );
}
