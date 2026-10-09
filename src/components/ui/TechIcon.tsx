import { Bot, Code, Cpu, Database, FileSearch, Layers, MessageSquare, Plug, Puzzle, Sparkles, TestTube, Workflow, Wrench, type LucideIcon } from 'lucide-react';
import { brandIcons, resolveTechIconKey } from '@/data/techIcons';

// Technologies without an official brand glyph: a neutral Lucide symbol, never an invented logo.
const glyphs: Record<string, LucideIcon> = {
  'REST APIs': Plug, pgvector: Database, relational: Database, RAG: FileSearch, orchestration: Workflow, agents: Bot,
  prompting: MessageSquare, automation: Sparkles, tools: Wrench, VSCode: Code, testing: TestTube, SOLID: Layers, 'Clean Code': Puzzle, fallback: Cpu,
};

/** Decorative tech icon (the chip text stays the accessible name). Brand colour comes from --ti-d / --ti-l (see pv3-icons.css). */
export function TechIcon({ name }: { name: string }) {
  const brand = brandIcons[name];
  if (brand) {
    return (
      <svg className="pv3-ti" viewBox="0 0 24 24" aria-hidden="true" focusable="false" style={{ '--ti-d': brand.dark ?? 'currentColor', '--ti-l': brand.light ?? 'currentColor' } as React.CSSProperties}>
        <path d={brand.d} fill="currentColor" />
      </svg>
    );
  }
  const Glyph = glyphs[name] ?? glyphs.fallback;
  return <Glyph className="pv3-ti pv3-ti--glyph" aria-hidden="true" focusable="false" strokeWidth={1.75} />;
}

const SEP = /( · | \+ | \/ )/;

/** Text that names technologies ("Postgres · Drizzle", "Python / Flask"): each part with a known icon gets it before the text; the rest stays plain. */
export function TechLabel({ text }: { text: string }) {
  return (
    <span>
      {text.split(SEP).map((part, i) => {
        const key = i % 2 ? null : resolveTechIconKey(part);
        return key ? <span key={i} className="pv3-tl"><TechIcon name={key} />{part}</span> : part;
      })}
    </span>
  );
}
