// Data-driven flow diagrams (rendered by src/components/ui/FlowDiagram.tsx).
// Only facts already published in the case pages: no code, hosts, metrics or private data.
export type FlowNode = {
  id: string;
  title: string;
  subtitle: string;
  /** Short sentence shown in the caption area while the node is highlighted. */
  caption: string;
  /** Technology name resolved with resolveTechIconKey; omitted when the node has no official icon. */
  icon?: string;
  /** 'ci' renders the node as a dashed band instead of a pipeline step. */
  group?: 'flow' | 'ci';
};
export type FlowEdge = { from: string; to: string; label?: string };
/** One state of the lifecycle, highlighted on `node` while the flow is played. */
export type FlowStep = { node: string; label: string };
/** Boxes are [x, y, w, h] in viewBox units; `edges` has one SVG path per entry of `FlowDiagramData.edges`, same order. */
export type FlowLayout = { viewBox: [number, number]; boxes: Record<string, [number, number, number, number]>; edges: string[] };
export type FlowDiagramData = {
  id: string;
  /** Spanish accessible name of the whole diagram (Squaads takes it from the translations instead). */
  label?: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  steps?: FlowStep[];
  wide: FlowLayout;
  tall: FlowLayout;
};

export const squaadsFlow: FlowDiagramData = {
  id: 'squaads',
  nodes: [
    { id: 'calendar', title: 'Calendar', subtitle: 'Extensión · auto-join', caption: 'Auto-join con Google Calendar y extensión de navegador.' },
    { id: 'web', title: 'Web · Next.js', subtitle: 'OAuth · API', icon: 'Next.js', caption: 'Next.js con inicio de sesión de Google OAuth y API.' },
    { id: 'queue', title: 'Cola en Postgres', subtitle: 'pending → completed', icon: 'Postgres', caption: 'Cola de trabajos en Postgres con máquina de estados: pending → recording → transcribing → summarizing → completed.' },
    { id: 'worker', title: 'Worker · Docker', subtitle: 'Puppeteer + FFmpeg', icon: 'Docker', caption: 'Worker en Docker: Puppeteer entra a la reunión y FFmpeg la graba; reclama trabajos con heartbeat y reintenta con backoff.' },
    { id: 'storage', title: 'S3 / MinIO', subtitle: 'Grabaciones', icon: 'MinIO', caption: 'Las grabaciones viven en S3 / MinIO.' },
    { id: 'stt', title: 'Transcripción', subtitle: 'STT', icon: 'Deepgram', caption: 'Transcripción con Groq Whisper o Deepgram.' },
    { id: 'llm', title: 'Resumen · LLM', subtitle: 'Con fallback', icon: 'Gemini', caption: 'Resumen con Groq, con Gemini como fallback.' },
    { id: 'panel', title: 'Panel · Chat IA', subtitle: 'Reuniones', caption: 'Panel de reuniones con chat de IA sobre ellas.' },
    { id: 'ci', title: 'CI/CD · GitHub Actions', subtitle: 'tests · lint · types · Docker → Vercel · Railway', icon: 'GitHub', group: 'ci', caption: 'GitHub Actions ejecuta tests, lint, tipos y build Docker; el despliegue continuo sale solo de main: web en Vercel y worker en Railway.' },
  ],
  edges: [
    { from: 'calendar', to: 'web' },
    { from: 'web', to: 'queue' },
    { from: 'queue', to: 'worker', label: 'el worker reclama trabajos' },
    { from: 'worker', to: 'storage' },
    { from: 'storage', to: 'stt' },
    { from: 'stt', to: 'llm' },
    { from: 'llm', to: 'panel' },
  ],
  steps: [
    { node: 'queue', label: 'pending' },
    { node: 'worker', label: 'recording' },
    { node: 'stt', label: 'transcribing' },
    { node: 'llm', label: 'summarizing' },
    { node: 'panel', label: 'completed' },
  ],
  // Wide: row 1 left to right, the worker drops to storage, row 2 right to left.
  wide: {
    viewBox: [860, 296],
    boxes: {
      calendar: [0, 6, 188, 76], web: [224, 6, 188, 76], queue: [448, 6, 188, 76], worker: [672, 6, 188, 76],
      storage: [672, 136, 188, 76], stt: [448, 136, 188, 76], llm: [224, 136, 188, 76], panel: [0, 136, 188, 76],
      ci: [0, 240, 860, 56],
    },
    edges: ['M190 44H221', 'M414 44H445', 'M638 44H669', 'M766 84V133', 'M670 174H639', 'M446 174H415', 'M222 174H191'],
  },
  // Tall: the same snake in two columns for narrow containers.
  tall: {
    viewBox: [400, 492],
    boxes: {
      calendar: [0, 0, 180, 80], web: [220, 0, 180, 80], queue: [220, 104, 180, 80], worker: [0, 104, 180, 80],
      storage: [0, 208, 180, 80], stt: [220, 208, 180, 80], llm: [220, 312, 180, 80], panel: [0, 312, 180, 80],
      ci: [0, 424, 400, 64],
    },
    edges: ['M182 40H217', 'M310 82V101', 'M218 144H183', 'M90 186V205', 'M182 248H217', 'M310 290V309', 'M218 352H183'],
  },
};

// Layout helpers for plain left-to-right chains: one row when wide, a two-column snake when tall.
const chainWide = (ids: string[]): FlowLayout => {
  const n = ids.length;
  const w = n <= 3 ? 232 : n === 4 ? 190 : 150;
  const gap = (860 - n * w) / (n - 1);
  const boxes: FlowLayout['boxes'] = {};
  ids.forEach((id, i) => { boxes[id] = [Math.round(i * (w + gap)), 6, w, 84]; });
  const edges = ids.slice(1).map((_, i) => `M${Math.round(i * (w + gap) + w + 2)} 48H${Math.round((i + 1) * (w + gap) - 3)}`);
  return { viewBox: [860, 96], boxes, edges };
};
const chainTall = (ids: string[]): FlowLayout => {
  const rows = Math.ceil(ids.length / 2);
  const cell = (i: number): [number, number] => [(Math.floor(i / 2) % 2 === 0 ? i % 2 : 1 - (i % 2)) * 220, Math.floor(i / 2) * 104];
  const boxes: FlowLayout['boxes'] = {};
  ids.forEach((id, i) => { const [x, y] = cell(i); boxes[id] = [x, y, 180, 80]; });
  const edges = ids.slice(1).map((_, i) => {
    const [x, y] = cell(i);
    const [x2] = cell(i + 1);
    if (x2 === x) return `M${x + 90} ${y + 82}V${y + 101}`;
    return x2 > x ? `M${x + 182} ${y + 40}H${x2 - 3}` : `M${x - 2} ${y + 40}H${x2 + 183}`;
  });
  return { viewBox: [400, rows * 80 + (rows - 1) * 24], boxes, edges };
};
const chainFlow = (id: string, label: string, nodes: FlowNode[]): FlowDiagramData => {
  const ids = nodes.map((n) => n.id);
  return {
    id, label, nodes,
    edges: ids.slice(1).map((to, i) => ({ from: ids[i], to })),
    wide: chainWide(ids),
    tall: chainTall(ids),
  };
};

// Facts below come from each case's stack, decisions and flow already published on its page.
export const clinicalFlow = chainFlow('clinical-ai', 'Flujo de Clinical AI Multi-Agent: petición a la API, triage con LLM, integrador en paralelo, agentes con RAG sobre pgvector y salida tipada.', [
  { id: 'api', title: 'API · FastAPI', subtitle: 'Caso clínico', icon: 'FastAPI', caption: 'POST /clinical-case/analyze recibe la descripción del caso en lenguaje natural.' },
  { id: 'router', title: 'AgentRouter', subtitle: 'Triage con LLM', caption: 'Un LLM con temperature=0.0 clasifica la urgencia y sugiere los agentes especialistas según el contenido del caso.' },
  { id: 'integrator', title: 'Integrator', subtitle: 'asyncio.gather', caption: 'Ejecuta en paralelo los agentes seleccionados; si uno falla, el resto devuelve igual su resultado.' },
  { id: 'agents', title: 'Agentes', subtitle: 'RAG · pgvector', icon: 'pgvector', caption: 'Clinical, Emergency, Cardiology y otros: cada uno encadena retriever, prompt, LLM y parser sobre guías clínicas en pgvector.' },
  { id: 'output', title: 'AnalyzeOutput', subtitle: 'Salida tipada', icon: 'Pydantic', caption: 'Evaluación integrada con summary, findings, red_flags, recommendations, confidence, failed_agents y warnings.' },
]);

export const sportbarFlow = chainFlow('sportbarleague', 'Arquitectura de SportBarLeague: cliente React con Vite, API REST en Flask con JWT, SQLAlchemy y PostgreSQL.', [
  { id: 'client', title: 'React · Vite', subtitle: 'Cliente', icon: 'React', caption: 'Frontend React con componentes reutilizables, estado global y consumo de la API con tokens JWT.' },
  { id: 'api', title: 'API · Flask', subtitle: 'REST + JWT', icon: 'Flask', caption: 'API REST con controladores separados, validación de payloads, registro, login y refresh tokens hechos a mano.' },
  { id: 'orm', title: 'SQLAlchemy', subtitle: 'Modelo · Alembic', icon: 'SQLAlchemy', caption: 'Relaciones N:M (jugadores-equipos) y 1:N (liga-equipos) con constraints y migraciones versionadas con Alembic.' },
  { id: 'db', title: 'PostgreSQL', subtitle: 'Base de datos', icon: 'PostgreSQL', caption: 'Base de datos relacional de ligas, equipos y resultados.' },
]);

export const jegFlow = chainFlow('jegstudio', 'Flujo de trabajo en equipo de JEG Studio: ramas feat y fix, pull request con reviewer y merge a main.', [
  { id: 'branch', title: 'Rama', subtitle: 'feat/ · fix/', icon: 'Git', caption: 'Git Flow: cada feature o fix vive en su propia rama.' },
  { id: 'pr', title: 'Pull request', subtitle: 'Con reviewer', caption: 'Los PRs son obligatorios y llevan al menos un reviewer del equipo.' },
  { id: 'main', title: 'main', subtitle: 'Solo con revisión', caption: 'Nada se mergeaba a main sin revisión.' },
]);

// Branching cases are laid out by hand: one root on the left (wide) or top (tall), children to the right / below.
export const nutriflowFlow: FlowDiagramData = {
  id: 'nutriflow',
  label: 'Arquitectura de NutriFlow: frontend Next.js, API NestJS, base de datos Supabase con Row Level Security y Gemini para los planes.',
  nodes: [
    { id: 'web', title: 'Next.js 16', subtitle: 'Frontend', icon: 'Next.js', caption: 'Frontend en Next.js 16, separado de la API.' },
    { id: 'api', title: 'NestJS 11', subtitle: 'API en Railway', icon: 'NestJS', caption: 'API modular en NestJS 11 desplegada en Railway.' },
    { id: 'db', title: 'Supabase', subtitle: 'PostgreSQL · RLS', icon: 'Supabase', caption: 'Base de datos con Row Level Security: la autenticación por roles vive en la propia base.' },
    { id: 'ai', title: 'Gemini 2.0', subtitle: 'Planes por macros', icon: 'Gemini', caption: 'Gemini 2.0 Flash genera los planes de alimentación basados en macros.' },
  ],
  edges: [{ from: 'web', to: 'api' }, { from: 'api', to: 'db' }, { from: 'api', to: 'ai' }],
  wide: {
    viewBox: [860, 196],
    boxes: { web: [0, 56, 220, 84], api: [320, 56, 220, 84], db: [640, 6, 220, 84], ai: [640, 106, 220, 84] },
    edges: ['M222 98H317', 'M542 98H590V48H637', 'M542 98H590V148H637'],
  },
  tall: {
    viewBox: [400, 184],
    boxes: { web: [0, 0, 180, 80], api: [220, 0, 180, 80], db: [0, 104, 180, 80], ai: [220, 104, 180, 80] },
    edges: ['M182 40H217', 'M310 82V92H90V101', 'M310 82V101'],
  },
};

export const tallerFlow: FlowDiagramData = {
  id: 'tallercardonal',
  label: 'Arquitectura de TallerCardonal.es: web React con Vite desplegada en Vercel, con EmailJS para el contacto y GA4 con Google Ads para marketing.',
  nodes: [
    { id: 'web', title: 'React · Vite', subtitle: 'CSS propio', icon: 'React', caption: 'Web en React 19 con Vite 7 y CSS propio, mobile-first, con imágenes WebP, lazy loading y SEO.' },
    { id: 'deploy', title: 'Vercel', subtitle: 'Dominio del cliente', icon: 'Vercel', caption: 'Deploy en Vercel con el dominio propio del cliente.' },
    { id: 'contact', title: 'EmailJS', subtitle: 'Contacto', caption: 'Contacto del formulario a través de EmailJS.' },
    { id: 'marketing', title: 'GA4 · Ads', subtitle: 'Marketing', icon: 'GA4', caption: 'Medición con GA4 y campañas de Google Ads.' },
  ],
  edges: [{ from: 'web', to: 'deploy' }, { from: 'web', to: 'contact' }, { from: 'web', to: 'marketing' }],
  wide: {
    viewBox: [860, 296],
    boxes: { web: [0, 106, 232, 84], deploy: [628, 6, 232, 84], contact: [628, 106, 232, 84], marketing: [628, 206, 232, 84] },
    edges: ['M234 148H431V48H625', 'M234 148H625', 'M234 148H431V248H625'],
  },
  tall: {
    viewBox: [400, 288],
    boxes: { web: [110, 0, 180, 80], deploy: [0, 104, 180, 80], contact: [220, 104, 180, 80], marketing: [110, 208, 180, 80] },
    edges: ['M150 82V93H90V101', 'M250 82V93H310V101', 'M200 82V205'],
  },
};

/** Flow per case id (Squaads included); the Projects stage and the detail pages read from here. */
export const flows: Record<string, FlowDiagramData> = {
  'squaads-meeting-bot': squaadsFlow,
  nutriflow: nutriflowFlow,
  'clinical-ai': clinicalFlow,
  tallercardonal: tallerFlow,
  jegstudio: jegFlow,
  sportbarleague: sportbarFlow,
};
