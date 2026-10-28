// Translated diagram text. Structure (nodes, edges, layouts, icons, lifecycle step names) stays in diagrams.ts,
// whose Spanish text is the source of truth: the `es` entries are read from it, never retyped.
import { flows, type FlowDiagramData } from '@/data/diagrams';
import type { Language } from '@/data/translations';

type NodeIds = {
  'squaads-meeting-bot': 'calendar' | 'web' | 'queue' | 'worker' | 'storage' | 'stt' | 'llm' | 'panel' | 'ci';
  nutriflow: 'web' | 'api' | 'db' | 'ai';
  'clinical-ai': 'api' | 'router' | 'integrator' | 'agents' | 'output';
  tallercardonal: 'web' | 'deploy' | 'contact' | 'marketing';
  jegstudio: 'branch' | 'pr' | 'main';
  sportbarleague: 'client' | 'api' | 'orm' | 'db';
};
export type FlowId = keyof NodeIds;
export type NodeText = { title: string; subtitle: string; caption: string };
/** `label` is the accessible name of the diagram; Squaads takes its own from the translations instead. */
export type FlowText<K extends FlowId = FlowId> = { label?: string; nodes: Record<NodeIds[K], NodeText> };
export type DiagramText = { [K in FlowId]: FlowText<K> };

const es = Object.fromEntries(
  Object.entries(flows).map(([id, f]) => [id, {
    label: f.label,
    nodes: Object.fromEntries(f.nodes.map((n) => [n.id, { title: n.title, subtitle: n.subtitle, caption: n.caption }])),
  }]),
) as DiagramText;

const en: DiagramText = {
  'squaads-meeting-bot': {
    nodes: {
      calendar: { title: 'Calendar', subtitle: 'Extension · auto-join', caption: 'Auto-join with Google Calendar and a browser extension.' },
      web: { title: 'Web · Next.js', subtitle: 'OAuth · API', caption: 'Next.js with Google OAuth sign-in and an API.' },
      queue: { title: 'Postgres queue', subtitle: 'pending → completed', caption: 'Job queue in Postgres with a state machine: pending → recording → transcribing → summarizing → completed.' },
      worker: { title: 'Worker · Docker', subtitle: 'Puppeteer + FFmpeg', caption: 'Worker in Docker: Puppeteer joins the meeting and FFmpeg records it; it claims jobs with a heartbeat and retries with backoff.' },
      storage: { title: 'S3 / MinIO', subtitle: 'Recordings', caption: 'Recordings are stored in S3 / MinIO.' },
      stt: { title: 'Transcription', subtitle: 'STT', caption: 'Transcription with Groq Whisper or Deepgram.' },
      llm: { title: 'Summary · LLM', subtitle: 'With fallback', caption: 'Summary with Groq, with Gemini as a fallback.' },
      panel: { title: 'Dashboard · AI chat', subtitle: 'Meetings', caption: 'Meetings dashboard with an AI chat about them.' },
      ci: { title: 'CI/CD · GitHub Actions', subtitle: 'tests · lint · types · Docker → Vercel · Railway', caption: 'GitHub Actions runs tests, lint, types and the Docker build; continuous deployment only goes out from main: web on Vercel and worker on Railway.' },
    },
  },
  nutriflow: {
    label: 'NutriFlow architecture: Next.js app with Route Handlers as the API, Supabase database with Row Level Security and Gemini for the plans.',
    nodes: {
      web: { title: 'Next.js 16', subtitle: 'Frontend', caption: 'Frontend in Next.js 16 (App Router), in the same app as the API.' },
      api: { title: 'Route Handlers', subtitle: 'API in Next.js', caption: 'Modular API in Next.js Route Handlers, deployed on Vercel alongside the frontend.' },
      db: { title: 'Supabase', subtitle: 'PostgreSQL · RLS', caption: 'Database with Row Level Security: role-based authentication lives in the database itself.' },
      ai: { title: 'Gemini 2.0', subtitle: 'Macro-based plans', caption: 'Gemini 2.0 Flash generates the meal plans based on macros.' },
    },
  },
  'clinical-ai': {
    label: 'Clinical AI Multi-Agent flow: API request, LLM triage, parallel integrator, agents with RAG over pgvector and typed output.',
    nodes: {
      api: { title: 'API · FastAPI', subtitle: 'Clinical case', caption: 'POST /clinical-case/analyze receives the case description in natural language.' },
      router: { title: 'AgentRouter', subtitle: 'LLM triage', caption: 'An LLM with temperature=0.0 classifies the urgency and suggests the specialist agents based on the content of the case.' },
      integrator: { title: 'Integrator', subtitle: 'asyncio.gather', caption: 'Runs the selected agents in parallel; if one fails, the rest still return their result.' },
      agents: { title: 'Agents', subtitle: 'RAG · pgvector', caption: 'Clinical, Emergency, Cardiology and others: each one chains retriever, prompt, LLM and parser over clinical guidelines in pgvector.' },
      output: { title: 'AnalyzeOutput', subtitle: 'Typed output', caption: 'Integrated assessment with summary, findings, red_flags, recommendations, confidence, failed_agents and warnings.' },
    },
  },
  tallercardonal: {
    label: 'TallerCardonal.es architecture: React website with Vite deployed on Vercel, with EmailJS for contact and GA4 with Google Ads for marketing.',
    nodes: {
      web: { title: 'React · Vite', subtitle: 'Custom CSS', caption: 'Website in React 19 with Vite 7 and custom CSS, mobile-first, with WebP images, lazy loading and SEO.' },
      deploy: { title: 'Vercel', subtitle: "Client's domain", caption: "Deployed on Vercel under the client's own domain." },
      contact: { title: 'EmailJS', subtitle: 'Contact', caption: 'Contact form delivery through EmailJS.' },
      marketing: { title: 'GA4 · Ads', subtitle: 'Marketing', caption: 'Measurement with GA4 and Google Ads campaigns.' },
    },
  },
  jegstudio: {
    label: 'JEG Studio team workflow: feat and fix branches, pull request with a reviewer and merge to main.',
    nodes: {
      branch: { title: 'Branch', subtitle: 'feat/ · fix/', caption: 'Git Flow: each feature or fix lives in its own branch.' },
      pr: { title: 'Pull request', subtitle: 'With reviewer', caption: 'PRs are mandatory and have at least one reviewer from the team.' },
      main: { title: 'main', subtitle: 'Only after review', caption: 'Nothing was merged to main without a review.' },
    },
  },
  sportbarleague: {
    label: 'SportBarLeague architecture: React client with Vite, REST API in Flask with JWT, SQLAlchemy and PostgreSQL.',
    nodes: {
      client: { title: 'React · Vite', subtitle: 'Client', caption: 'React frontend with reusable components, global state and API calls using JWT tokens.' },
      api: { title: 'API · Flask', subtitle: 'REST + JWT', caption: 'REST API with separate controllers, payload validation, and hand-built registration, login and refresh tokens.' },
      orm: { title: 'SQLAlchemy', subtitle: 'Model · Alembic', caption: 'N:M (players-teams) and 1:N (league-teams) relationships with constraints and versioned migrations with Alembic.' },
      db: { title: 'PostgreSQL', subtitle: 'Database', caption: 'Relational database of leagues, teams and results.' },
    },
  },
};

const de: DiagramText = {
  'squaads-meeting-bot': {
    nodes: {
      calendar: { title: 'Calendar', subtitle: 'Erweiterung · Auto-Join', caption: 'Auto-Join über Google Calendar und eine Browser-Erweiterung.' },
      web: { title: 'Web · Next.js', subtitle: 'OAuth · API', caption: 'Next.js mit Google-OAuth-Anmeldung und API.' },
      queue: { title: 'Postgres-Queue', subtitle: 'pending → completed', caption: 'Job-Warteschlange in Postgres mit Zustandsautomat: pending → recording → transcribing → summarizing → completed.' },
      worker: { title: 'Worker · Docker', subtitle: 'Puppeteer + FFmpeg', caption: 'Worker in Docker: Puppeteer tritt dem Meeting bei und FFmpeg zeichnet es auf; er übernimmt Jobs mit Heartbeat und wiederholt sie mit Backoff.' },
      storage: { title: 'S3 / MinIO', subtitle: 'Aufzeichnungen', caption: 'Die Aufzeichnungen liegen in S3 / MinIO.' },
      stt: { title: 'Transkription', subtitle: 'STT', caption: 'Transkription mit Groq Whisper oder Deepgram.' },
      llm: { title: 'Resümee · LLM', subtitle: 'Mit Fallback', caption: 'Zusammenfassung mit Groq, mit Gemini als Fallback.' },
      panel: { title: 'Dashboard · KI-Chat', subtitle: 'Meetings', caption: 'Meeting-Dashboard mit einem KI-Chat zu den Meetings.' },
      ci: { title: 'CI/CD · GitHub Actions', subtitle: 'Tests · Lint · Typen · Docker → Vercel · Railway', caption: 'GitHub Actions führt Tests, Lint, Typprüfung und den Docker-Build aus; Continuous Deployment erfolgt nur von main: Web auf Vercel und Worker auf Railway.' },
    },
  },
  nutriflow: {
    label: 'NutriFlow-Architektur: Next.js-App mit Route Handlers als API, Supabase-Datenbank mit Row Level Security und Gemini für die Pläne.',
    nodes: {
      web: { title: 'Next.js 16', subtitle: 'Frontend', caption: 'Frontend in Next.js 16 (App Router), in derselben App wie die API.' },
      api: { title: 'Route Handlers', subtitle: 'API in Next.js', caption: 'Modulare API in Next.js Route Handlers, zusammen mit dem Frontend auf Vercel deployt.' },
      db: { title: 'Supabase', subtitle: 'PostgreSQL · RLS', caption: 'Datenbank mit Row Level Security: Die rollenbasierte Authentifizierung liegt in der Datenbank selbst.' },
      ai: { title: 'Gemini 2.0', subtitle: 'Pläne nach Makros', caption: 'Gemini 2.0 Flash erstellt die Ernährungspläne auf Basis von Makros.' },
    },
  },
  'clinical-ai': {
    label: 'Ablauf von Clinical AI Multi-Agent: API-Anfrage, LLM-Triage, paralleler Integrator, Agenten mit RAG über pgvector und typisierte Ausgabe.',
    nodes: {
      api: { title: 'API · FastAPI', subtitle: 'Klinischer Fall', caption: 'POST /clinical-case/analyze erhält die Fallbeschreibung in natürlicher Sprache.' },
      router: { title: 'AgentRouter', subtitle: 'LLM-Triage', caption: 'Ein LLM mit temperature=0.0 klassifiziert die Dringlichkeit und schlägt anhand des Falls die Fachagenten vor.' },
      integrator: { title: 'Integrator', subtitle: 'asyncio.gather', caption: 'Führt die ausgewählten Agenten parallel aus; fällt einer aus, liefern die übrigen trotzdem ihr Ergebnis.' },
      agents: { title: 'Agenten', subtitle: 'RAG · pgvector', caption: 'Clinical, Emergency, Cardiology und weitere: Jeder verkettet Retriever, Prompt, LLM und Parser über klinische Leitlinien in pgvector.' },
      output: { title: 'AnalyzeOutput', subtitle: 'Typisierte Ausgabe', caption: 'Integrierte Bewertung mit summary, findings, red_flags, recommendations, confidence, failed_agents und warnings.' },
    },
  },
  tallercardonal: {
    label: 'Architektur von TallerCardonal.es: React-Website mit Vite, auf Vercel deployt, mit EmailJS für den Kontakt und GA4 mit Google Ads für das Marketing.',
    nodes: {
      web: { title: 'React · Vite', subtitle: 'Eigenes CSS', caption: 'Website in React 19 mit Vite 7 und eigenem CSS, Mobile-first, mit WebP-Bildern, Lazy Loading und SEO.' },
      deploy: { title: 'Vercel', subtitle: 'Domain des Kunden', caption: 'Deployment auf Vercel unter der eigenen Domain des Kunden.' },
      contact: { title: 'EmailJS', subtitle: 'Kontakt', caption: 'Versand des Kontaktformulars über EmailJS.' },
      marketing: { title: 'GA4 · Ads', subtitle: 'Marketing', caption: 'Messung mit GA4 und Google-Ads-Kampagnen.' },
    },
  },
  jegstudio: {
    label: 'Teamworkflow von JEG Studio: feat- und fix-Branches, Pull Request mit Reviewer und Merge nach main.',
    nodes: {
      branch: { title: 'Branch', subtitle: 'feat/ · fix/', caption: 'Git Flow: Jedes Feature und jeder Fix lebt in einem eigenen Branch.' },
      pr: { title: 'Pull Request', subtitle: 'Mit Reviewer', caption: 'PRs sind Pflicht und haben mindestens einen Reviewer aus dem Team.' },
      main: { title: 'main', subtitle: 'Nur nach Review', caption: 'Nichts wurde ohne Review nach main gemergt.' },
    },
  },
  sportbarleague: {
    label: 'Architektur von SportBarLeague: React-Client mit Vite, REST-API in Flask mit JWT, SQLAlchemy und PostgreSQL.',
    nodes: {
      client: { title: 'React · Vite', subtitle: 'Client', caption: 'React-Frontend mit wiederverwendbaren Komponenten, globalem Zustand und API-Zugriff mit JWT-Tokens.' },
      api: { title: 'API · Flask', subtitle: 'REST + JWT', caption: 'REST-API mit getrennten Controllern, Validierung der Payloads sowie selbst implementierter Registrierung, Anmeldung und Refresh-Tokens.' },
      orm: { title: 'SQLAlchemy', subtitle: 'Modell · Alembic', caption: 'N:M- (Spieler-Teams) und 1:N-Beziehungen (Liga-Teams) mit Constraints und versionierten Migrationen mit Alembic.' },
      db: { title: 'PostgreSQL', subtitle: 'Datenbank', caption: 'Relationale Datenbank mit Ligen, Teams und Ergebnissen.' },
    },
  },
};

const fr: DiagramText = {
  'squaads-meeting-bot': {
    nodes: {
      calendar: { title: 'Calendar', subtitle: 'Extension · auto-join', caption: 'Auto-join avec Google Calendar et une extension de navigateur.' },
      web: { title: 'Web · Next.js', subtitle: 'OAuth · API', caption: 'Next.js avec connexion Google OAuth et API.' },
      queue: { title: 'File Postgres', subtitle: 'pending → completed', caption: "File de tâches dans Postgres avec machine à états : pending → recording → transcribing → summarizing → completed." },
      worker: { title: 'Worker · Docker', subtitle: 'Puppeteer + FFmpeg', caption: "Worker dans Docker : Puppeteer rejoint la réunion et FFmpeg l'enregistre ; il réclame les tâches avec un heartbeat et réessaie avec backoff." },
      storage: { title: 'S3 / MinIO', subtitle: 'Enregistrements', caption: 'Les enregistrements sont stockés dans S3 / MinIO.' },
      stt: { title: 'Transcription', subtitle: 'STT', caption: 'Transcription avec Groq Whisper ou Deepgram.' },
      llm: { title: 'Résumé · LLM', subtitle: 'Avec repli', caption: 'Résumé avec Groq, avec Gemini en repli.' },
      panel: { title: 'Tableau · Chat IA', subtitle: 'Réunions', caption: 'Tableau de bord des réunions avec un chat IA à leur sujet.' },
      ci: { title: 'CI/CD · GitHub Actions', subtitle: 'tests · lint · types · Docker → Vercel · Railway', caption: "GitHub Actions exécute les tests, le lint, les types et le build Docker ; le déploiement continu part uniquement de main : web sur Vercel et worker sur Railway." },
    },
  },
  nutriflow: {
    label: "Architecture de NutriFlow : application Next.js avec des Route Handlers comme API, base de données Supabase avec Row Level Security et Gemini pour les plans.",
    nodes: {
      web: { title: 'Next.js 16', subtitle: 'Frontend', caption: "Frontend en Next.js 16 (App Router), dans la même application que l'API." },
      api: { title: 'Route Handlers', subtitle: 'API dans Next.js', caption: 'API modulaire en Route Handlers Next.js, déployée sur Vercel avec le frontend.' },
      db: { title: 'Supabase', subtitle: 'PostgreSQL · RLS', caption: "Base de données avec Row Level Security : l'authentification par rôles réside dans la base elle-même." },
      ai: { title: 'Gemini 2.0', subtitle: 'Plans par macros', caption: 'Gemini 2.0 Flash génère les plans alimentaires à partir des macros.' },
    },
  },
  'clinical-ai': {
    label: "Flux de Clinical AI Multi-Agent : requête à l'API, triage par LLM, intégrateur en parallèle, agents avec RAG sur pgvector et sortie typée.",
    nodes: {
      api: { title: 'API · FastAPI', subtitle: 'Cas clinique', caption: 'POST /clinical-case/analyze reçoit la description du cas en langage naturel.' },
      router: { title: 'AgentRouter', subtitle: 'Triage par LLM', caption: "Un LLM avec temperature=0.0 classe l'urgence et suggère les agents spécialistes selon le contenu du cas." },
      integrator: { title: 'Integrator', subtitle: 'asyncio.gather', caption: "Exécute en parallèle les agents sélectionnés ; si l'un échoue, les autres renvoient quand même leur résultat." },
      agents: { title: 'Agents', subtitle: 'RAG · pgvector', caption: 'Clinical, Emergency, Cardiology et d\'autres : chacun enchaîne retriever, prompt, LLM et parser sur des recommandations cliniques dans pgvector.' },
      output: { title: 'AnalyzeOutput', subtitle: 'Sortie typée', caption: 'Évaluation intégrée avec summary, findings, red_flags, recommendations, confidence, failed_agents et warnings.' },
    },
  },
  tallercardonal: {
    label: "Architecture de TallerCardonal.es : site React avec Vite déployé sur Vercel, avec EmailJS pour le contact et GA4 avec Google Ads pour le marketing.",
    nodes: {
      web: { title: 'React · Vite', subtitle: 'CSS sur mesure', caption: 'Site en React 19 avec Vite 7 et CSS sur mesure, mobile-first, avec images WebP, lazy loading et SEO.' },
      deploy: { title: 'Vercel', subtitle: 'Domaine du client', caption: 'Déploiement sur Vercel avec le propre domaine du client.' },
      contact: { title: 'EmailJS', subtitle: 'Contact', caption: "Envoi du formulaire de contact via EmailJS." },
      marketing: { title: 'GA4 · Ads', subtitle: 'Marketing', caption: 'Mesure avec GA4 et campagnes Google Ads.' },
    },
  },
  jegstudio: {
    label: "Workflow d'équipe de JEG Studio : branches feat et fix, pull request avec reviewer et merge vers main.",
    nodes: {
      branch: { title: 'Branche', subtitle: 'feat/ · fix/', caption: 'Git Flow : chaque fonctionnalité ou correctif vit dans sa propre branche.' },
      pr: { title: 'Pull request', subtitle: 'Avec reviewer', caption: "Les PR sont obligatoires et ont au moins un reviewer de l'équipe." },
      main: { title: 'main', subtitle: 'Uniquement après revue', caption: 'Rien n\'était mergé dans main sans revue.' },
    },
  },
  sportbarleague: {
    label: "Architecture de SportBarLeague : client React avec Vite, API REST en Flask avec JWT, SQLAlchemy et PostgreSQL.",
    nodes: {
      client: { title: 'React · Vite', subtitle: 'Client', caption: "Frontend React avec composants réutilisables, état global et appels à l'API avec des tokens JWT." },
      api: { title: 'API · Flask', subtitle: 'REST + JWT', caption: "API REST avec contrôleurs séparés, validation des payloads, inscription, connexion et refresh tokens faits à la main." },
      orm: { title: 'SQLAlchemy', subtitle: 'Modèle · Alembic', caption: 'Relations N:M (joueurs-équipes) et 1:N (ligue-équipes) avec contraintes et migrations versionnées avec Alembic.' },
      db: { title: 'PostgreSQL', subtitle: 'Base de données', caption: 'Base de données relationnelle de ligues, équipes et résultats.' },
    },
  },
};

const it: DiagramText = {
  'squaads-meeting-bot': {
    nodes: {
      calendar: { title: 'Calendar', subtitle: 'Estensione · auto-join', caption: 'Auto-join con Google Calendar ed estensione del browser.' },
      web: { title: 'Web · Next.js', subtitle: 'OAuth · API', caption: 'Next.js con accesso Google OAuth e API.' },
      queue: { title: 'Coda su Postgres', subtitle: 'pending → completed', caption: 'Coda di job in Postgres con macchina a stati: pending → recording → transcribing → summarizing → completed.' },
      worker: { title: 'Worker · Docker', subtitle: 'Puppeteer + FFmpeg', caption: 'Worker in Docker: Puppeteer entra nella riunione e FFmpeg la registra; prende in carico i job con heartbeat e riprova con backoff.' },
      storage: { title: 'S3 / MinIO', subtitle: 'Registrazioni', caption: 'Le registrazioni sono archiviate in S3 / MinIO.' },
      stt: { title: 'Trascrizione', subtitle: 'STT', caption: 'Trascrizione con Groq Whisper o Deepgram.' },
      llm: { title: 'Riassunto · LLM', subtitle: 'Con fallback', caption: 'Riassunto con Groq, con Gemini come fallback.' },
      panel: { title: 'Pannello · Chat IA', subtitle: 'Riunioni', caption: 'Pannello delle riunioni con una chat IA su di esse.' },
      ci: { title: 'CI/CD · GitHub Actions', subtitle: 'test · lint · tipi · Docker → Vercel · Railway', caption: 'GitHub Actions esegue test, lint, tipi e build Docker; il deploy continuo parte solo da main: web su Vercel e worker su Railway.' },
    },
  },
  nutriflow: {
    label: "Architettura di NutriFlow: app Next.js con Route Handlers come API, database Supabase con Row Level Security e Gemini per i piani.",
    nodes: {
      web: { title: 'Next.js 16', subtitle: 'Frontend', caption: "Frontend in Next.js 16 (App Router), nella stessa app dell'API." },
      api: { title: 'Route Handlers', subtitle: 'API in Next.js', caption: 'API modulare nei Route Handlers di Next.js, distribuita su Vercel insieme al frontend.' },
      db: { title: 'Supabase', subtitle: 'PostgreSQL · RLS', caption: "Database con Row Level Security: l'autenticazione basata sui ruoli risiede nel database stesso." },
      ai: { title: 'Gemini 2.0', subtitle: 'Piani per macro', caption: 'Gemini 2.0 Flash genera i piani alimentari basati sui macro.' },
    },
  },
  'clinical-ai': {
    label: "Flusso di Clinical AI Multi-Agent: richiesta all'API, triage con LLM, integratore in parallelo, agenti con RAG su pgvector e output tipizzato.",
    nodes: {
      api: { title: 'API · FastAPI', subtitle: 'Caso clinico', caption: 'POST /clinical-case/analyze riceve la descrizione del caso in linguaggio naturale.' },
      router: { title: 'AgentRouter', subtitle: 'Triage con LLM', caption: "Un LLM con temperature=0.0 classifica l'urgenza e suggerisce gli agenti specialisti in base al contenuto del caso." },
      integrator: { title: 'Integrator', subtitle: 'asyncio.gather', caption: 'Esegue in parallelo gli agenti selezionati; se uno fallisce, gli altri restituiscono comunque il loro risultato.' },
      agents: { title: 'Agenti', subtitle: 'RAG · pgvector', caption: 'Clinical, Emergency, Cardiology e altri: ciascuno concatena retriever, prompt, LLM e parser sulle linee guida cliniche in pgvector.' },
      output: { title: 'AnalyzeOutput', subtitle: 'Output tipizzato', caption: 'Valutazione integrata con summary, findings, red_flags, recommendations, confidence, failed_agents e warnings.' },
    },
  },
  tallercardonal: {
    label: "Architettura di TallerCardonal.es: sito React con Vite distribuito su Vercel, con EmailJS per il contatto e GA4 con Google Ads per il marketing.",
    nodes: {
      web: { title: 'React · Vite', subtitle: 'CSS proprio', caption: 'Sito in React 19 con Vite 7 e CSS proprio, mobile-first, con immagini WebP, lazy loading e SEO.' },
      deploy: { title: 'Vercel', subtitle: 'Dominio del cliente', caption: 'Deploy su Vercel con il dominio proprio del cliente.' },
      contact: { title: 'EmailJS', subtitle: 'Contatto', caption: 'Invio del modulo di contatto tramite EmailJS.' },
      marketing: { title: 'GA4 · Ads', subtitle: 'Marketing', caption: 'Misurazione con GA4 e campagne Google Ads.' },
    },
  },
  jegstudio: {
    label: "Flusso di lavoro di squadra di JEG Studio: branch feat e fix, pull request con reviewer e merge su main.",
    nodes: {
      branch: { title: 'Branch', subtitle: 'feat/ · fix/', caption: 'Git Flow: ogni feature o fix vive nel proprio branch.' },
      pr: { title: 'Pull request', subtitle: 'Con reviewer', caption: 'Le PR sono obbligatorie e hanno almeno un reviewer del team.' },
      main: { title: 'main', subtitle: 'Solo con revisione', caption: 'Nulla veniva integrato in main senza revisione.' },
    },
  },
  sportbarleague: {
    label: "Architettura di SportBarLeague: client React con Vite, API REST in Flask con JWT, SQLAlchemy e PostgreSQL.",
    nodes: {
      client: { title: 'React · Vite', subtitle: 'Client', caption: "Frontend React con componenti riutilizzabili, stato globale e uso dell'API con token JWT." },
      api: { title: 'API · Flask', subtitle: 'REST + JWT', caption: 'API REST con controller separati, validazione dei payload, registrazione, login e refresh token scritti a mano.' },
      orm: { title: 'SQLAlchemy', subtitle: 'Modello · Alembic', caption: 'Relazioni N:M (giocatori-squadre) e 1:N (lega-squadre) con vincoli e migrazioni versionate con Alembic.' },
      db: { title: 'PostgreSQL', subtitle: 'Database', caption: 'Database relazionale di leghe, squadre e risultati.' },
    },
  },
};

export const diagramText: Record<Language, DiagramText> = { es, en, de, fr, it };

/** Diagram structure with its text in `language`; Spanish returns the flow untouched. */
export function localizeFlow(flow: FlowDiagramData, language: Language, id: string = flow.id): FlowDiagramData {
  const x = language === 'es' ? undefined : (diagramText[language] as Record<string, FlowText<FlowId>>)[id];
  if (!x) return flow;
  const nodeText = x.nodes as Record<string, NodeText>;
  return {
    ...flow,
    label: x.label ?? flow.label,
    nodes: flow.nodes.map((n) => ({ ...n, ...nodeText[n.id] })),
  };
}

export const getFlow = (id: string, language: Language): FlowDiagramData => localizeFlow(flows[id], language, id);

export const getFlows = (language: Language): Record<string, FlowDiagramData> =>
  Object.fromEntries(Object.entries(flows).map(([id, f]) => [id, localizeFlow(f, language, id)]));
