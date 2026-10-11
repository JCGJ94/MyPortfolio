// Shared shapes of the case page copy. Each case file exports Record<Language, ...> so TypeScript
// enforces all five languages and every key. Hrefs, ids and code identifiers stay in the page components.

/** Bold lead followed by a sentence: <strong>{lead}</strong> {text} */
export type LeadItem = { lead: string; text: string };

export type CaseHeaderCopy = {
  tier: string;
  title: string;
  lede: string;
  summary: { kind: string; role: string; stack: string[]; proves: string[] };
  /** Link labels in the same order as the hrefs defined by the page. */
  actions: string[];
};

export type StackRow = [string, string];

export type SquaadsCopy = {
  header: CaseHeaderCopy;
  imageAlt: string;
  archLabel: string;
  note: string;
  stackTitle: string;
  stack: StackRow[];
  product: { title: string; pull: string; flowTitle: string; flow: LeadItem[]; featuresTitle: string; features: string[] };
  architecture: {
    title: string;
    /** Text before, inside and after the highlighted phrase. */
    pull: [string, string, string];
    monorepoTitle: string;
    /** Text that follows each of the four <code> paths (apps/web, apps/worker, apps/extension, packages/shared). */
    monorepo: [string, string, string, string];
    decisionsTitle: string;
    stateLead: string;
    stateTail: string;
    decisions: LeadItem[];
  };
  cicd: {
    title: string;
    highlight: string;
    pipelineTitle: string;
    pipelineIntro: string;
    pipelineLabel: string;
    pipeline: string[];
    govTitle: string;
    governance: LeadItem;
    web: { lead: string; before: string; after: string };
    worker: LeadItem;
  };
  security: { title: string; items: LeadItem[] };
  roleTitle: string;
};

export type NutriflowCopy = {
  header: CaseHeaderCopy;
  imageAlt: string;
  archTitle: string;
  archLede: string;
  stackTitle: string;
  stack: StackRow[];
  problem: { title: string; pull: string; items: string[] };
  solution: {
    title: string;
    /** Text before and after <strong>Gemini 2.0 Flash</strong>, then before/after <strong>Supabase</strong>. */
    pull: [string, string, string];
    /** Text before and after <strong>Next.js 16</strong>. */
    frontend: { lead: string; before: string; after: string };
    /** Text after <strong>NestJS 11</strong>. */
    backend: { lead: string; after: string };
    /** Text before and after <strong>RLS (Row Level Security)</strong>. */
    auth: [string, string];
    generator: string;
  };
};

export type ClinicalAiCopy = {
  header: CaseHeaderCopy;
  /** Pre block lines; code identifiers stay as written. */
  architecture: string;
  codeLabel: string;
  apiTitle: string;
  apiLede: string;
  apiImageAlt: string;
  archTitle: string;
  archLede: string;
  stackTitle: string;
  stack: StackRow[];
  concept: { title: string; pull: string; items: LeadItem[] };
  decisions: {
    title: string;
    triage: { lead: string; before: string; after: string };
    content: LeadItem;
    parallel: { lead: string; before: string; after: string };
    rag: { lead: string; before: string; after: string };
    /** Text around <code>return_exceptions=True</code>, <code>failed_agents</code> and <code>warnings</code>. */
    resilience: { lead: string; before: string; mid: string; and: string; after: string };
    providers: LeadItem;
  };
  proves: { title: string; pull: [string, string]; items: LeadItem[] };
};
