// Translated project case text. Language-neutral fields (ids, tags, images, URLs, flags, `pending`) stay in projects.ts,
// whose Spanish text is the source of truth: the `es` entries below are read from it, never retyped.
import { projects, type Project } from '@/data/projects';
import type { Language } from '@/data/translations';

export type ProjectId = 'squaads-meeting-bot' | 'nutriflow' | 'clinical-ai' | 'tallercardonal' | 'jegstudio' | 'sportbarleague';

export type ProjectText = {
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  highlights: string[];
  case: { problem: string; solution: string; decisions: string[]; evidence: string[] };
  /** Component chain shown under the case header (tech names stay as they are). */
  chain: string[];
};

const esChain: Record<ProjectId, string[]> = {
  'squaads-meeting-bot': ['Next.js', 'Postgres · cola', 'Worker · Puppeteer + FFmpeg', 'S3 / MinIO', 'IA con fallback'],
  nutriflow: ['Next.js', 'Route Handlers', 'Supabase · RLS', 'Gemini'],
  'clinical-ai': ['Router de triage', 'Agentes en paralelo', 'RAG · pgvector', 'Salida tipada'],
  tallercardonal: ['React', 'Vite', 'Vercel'],
  jegstudio: ['React', 'Next.js', 'Git Flow'],
  sportbarleague: ['React', 'Flask · JWT', 'SQLAlchemy', 'PostgreSQL'],
};

const es = Object.fromEntries(
  projects.map((p) => [
    p.id,
    {
      title: p.title, subtitle: p.subtitle, description: p.description, badge: p.badge, highlights: p.highlights,
      case: { problem: p.case!.problem!, solution: p.case!.solution!, decisions: p.case!.decisions!, evidence: p.case!.evidence! },
      chain: esChain[p.id as ProjectId],
    },
  ]),
) as Record<ProjectId, ProjectText>;

const en: Record<ProjectId, ProjectText> = {
  'squaads-meeting-bot': {
    title: 'Squaads Meeting Bot',
    subtitle: 'Internal, self-hosted alternative to SaaS meeting recorders',
    description: "Internal bot for Squaads that records, transcribes and summarizes Google Meet and Microsoft Teams meetings on the company's own infrastructure. Bun monorepo with a Next.js web dashboard, an isolated worker with a headless browser and FFmpeg in Docker, a Postgres job queue and S3/MinIO storage. I collaborated with the team in the initial phase and then led the development almost single-handedly, including the CI/CD pipeline and the deployment.",
    badge: 'Company Project',
    highlights: [
      'Web app and worker separated, deployed independently',
      'Job state machine shared in Postgres',
      'CI with tests against a real Postgres on every PR',
    ],
    case: {
      problem: "Record, transcribe and summarize Google Meet and Microsoft Teams meetings on the company's own infrastructure, without relying on SaaS recorders.",
      solution: 'Bun monorepo: Next.js 16 web dashboard with Google OAuth (next-auth); isolated Bun worker with a headless browser (Puppeteer) and FFmpeg in Docker that joins the meetings; job queue in Postgres (Drizzle); recordings in S3/MinIO; transcription with Groq Whisper or Deepgram; summaries with several AI providers (Groq, falling back to Gemini); AI chat about the meetings; auto-join with Google Calendar and a browser extension.',
      decisions: [
        'Web app and worker separated, deployed independently',
        'Job state machine shared in Postgres (pending, recording, transcribing, summarizing, completed or error) with heartbeat and retries with backoff',
        'Multiple AI providers with fallback',
        'Hardening with RLS and authentication middleware documented in ADRs',
        'Specification-driven development',
        'CI on dev and main (every push and PR): frozen-lockfile install, database schema, tests against a real Postgres 16 service, lint, typecheck, a check that the extension ZIP matches a clean build, and a Docker build of the worker',
        'Branch governance: feature, PR to dev and PR to main; a GitHub Actions guard only accepts PRs to main from dev, and approval is required',
        'Deployment: web on Vercel with Git integration and a versioned vercel.json; worker on Railway with a Dockerfile, migrated from a VPS deployment workflow; automatic continuous deployment only from main',
      ],
      evidence: [
        'In internal production; CI on dev and main, automatic continuous deployment only from main',
        'Public repository; no demo (the development environment requires a Google login)',
      ],
    },
    chain: ['Next.js', 'Postgres · queue', 'Worker · Puppeteer + FFmpeg', 'S3 / MinIO', 'AI with fallback'],
  },
  nutriflow: {
    title: 'NutriFlow',
    subtitle: 'Intelligent Nutrition and Training Platform',
    description: 'Advanced SaaS system designed to create 100% personalized meal plans and workout routines. It integrates an AI engine to optimize the user\'s health based on biometric data and specific goals, on a full-stack Next.js architecture.',
    badge: 'Personal Project',
    highlights: [
      'Full-stack Next.js app with the API in Route Handlers',
      'Advanced security with Row Level Security',
      'Plan generation with deterministic AI logic',
    ],
    case: {
      problem: 'Meal and exercise plans built by hand by independent nutritionists.',
      solution: 'Full-stack SaaS built with Next.js 16, Supabase and Gemini 2.0 Flash.',
      decisions: ['Row Level Security in the database', 'Plan generation with deterministic AI logic'],
      evidence: ['Public demo and repository', 'Declared Beta status'],
    },
    chain: ['Next.js', 'Route Handlers', 'Supabase · RLS', 'Gemini'],
  },
  'clinical-ai': {
    title: 'Clinical AI Multi-Agent',
    subtitle: 'Multi-Agent AI Backend for Clinical Decision Support',
    description: 'Production-grade multi-agent AI backend for clinical decision support. It classifies the urgency of a case through LLM triage and triggers specialist agents in parallel that consult clinical guidelines via RAG (pgvector), returning an integrated, typed assessment. Built with async FastAPI, LangChain (LCEL) and SQLAlchemy 2.0, with tolerance to partial failures and containerized deployment.',
    badge: 'AI Backend · Production',
    highlights: [
      'Multi-agent orchestration with parallel execution (asyncio.gather)',
      'RAG over clinical guidelines with pgvector and LangChain (LCEL)',
      'Async FastAPI, SQLAlchemy 2.0, multi-stage Docker and CI/CD to GHCR',
    ],
    case: {
      problem: 'Prioritize the urgency of a clinical case and consult clinical guidelines.',
      solution: 'LLM triage and specialist agents running in parallel with RAG over pgvector.',
      decisions: ['Parallel execution with asyncio.gather and tolerance to partial failures', 'Async FastAPI and SQLAlchemy 2.0', 'Multi-stage Docker and CI/CD to GHCR'],
      evidence: ['Public repository; no demo'],
    },
    chain: ['Triage router', 'Parallel agents', 'RAG · pgvector', 'Typed output'],
  },
  tallercardonal: {
    title: 'Taller El Cardonal',
    subtitle: 'Client Project in Production',
    description: 'Complete digitalization of a local business. Development of a professional website focused on SEO, performance and user experience to attract real customers through a fast, optimized interface.',
    badge: 'Client Delivery',
    highlights: [
      'Real project in active production',
      'SEO and Core Web Vitals optimization',
      'Mobile-first responsive design with plain CSS3',
    ],
    case: {
      problem: 'A local workshop with no digital presence.',
      solution: 'React website built with Vite and custom CSS, responsive, SEO-ready and deployed on Vercel.',
      decisions: ['Mobile-first design with CSS3', 'WebP images', 'SEO metadata'],
      evidence: ['Website in production'],
    },
    chain: ['React', 'Vite', 'Vercel'],
  },
  jegstudio: {
    title: 'JEG Studio',
    subtitle: 'Platform for Freelancers and C2C Lead Generation',
    description: 'Collaborative web project focused on attracting talent, finding freelance work and growing the sector together. Aimed at generating potential client opportunities through advanced SEO optimization and strategic campaigns.',
    badge: 'Team Project',
    highlights: [
      'Platform focused on finding freelance clients',
      'Optimized SEO positioning strategies',
      'Structured collaborative development',
    ],
    case: {
      problem: 'Attracting talent and freelance clients.',
      solution: 'Collaborative platform built with React and Next.js.',
      decisions: ['Folder structure, naming conventions and data model agreed on as a team'],
      evidence: ['Public demo and repository'],
    },
    chain: ['React', 'Next.js', 'Git Flow'],
  },
  sportbarleague: {
    title: 'SportBarLeague',
    subtitle: 'Full Stack Application with Python Backend',
    description: 'Sports league management application with a complete Python backend. It implements JWT authentication, advanced relational modeling with SQLAlchemy and a REST API designed with Flask. It demonstrates solid skills in backend architecture and database design.',
    badge: 'Python Backend',
    highlights: [
      'Complete REST API with Flask and JWT authentication',
      'Complex relational database modeling with SQLAlchemy',
      'Robust backend architecture with Python',
    ],
    case: {
      problem: 'Sports league management.',
      solution: 'Python backend with Flask and a React frontend.',
      decisions: ['Hand-built JWT authentication', 'N:M and 1:N relationships with SQLAlchemy', 'Migrations with Alembic'],
      evidence: ['Public repository; no demo'],
    },
    chain: ['React', 'Flask · JWT', 'SQLAlchemy', 'PostgreSQL'],
  },
};

const de: Record<ProjectId, ProjectText> = {
  'squaads-meeting-bot': {
    title: 'Squaads Meeting Bot',
    subtitle: 'Interne, selbst gehostete Alternative zu SaaS-Meeting-Recordern',
    description: 'Interner Bot für Squaads, der Google-Meet- und Microsoft-Teams-Meetings auf der eigenen Infrastruktur des Unternehmens aufzeichnet, transkribiert und zusammenfasst. Bun-Monorepo mit Next.js-Weboberfläche, isoliertem Worker mit Headless-Browser und FFmpeg in Docker, Job-Warteschlange in Postgres und S3/MinIO-Speicher. In der Anfangsphase habe ich mit dem Team zusammengearbeitet und anschließend die Entwicklung nahezu allein geleitet, einschließlich der CI/CD-Pipeline und des Deployments.',
    badge: 'Unternehmensprojekt',
    highlights: [
      'Web-App und Worker getrennt und unabhängig deployt',
      'Gemeinsamer Zustandsautomat für Jobs in Postgres',
      'CI mit Tests gegen ein echtes Postgres bei jedem PR',
    ],
    case: {
      problem: 'Google-Meet- und Microsoft-Teams-Meetings auf der eigenen Infrastruktur des Unternehmens aufzeichnen, transkribieren und zusammenfassen, ohne auf SaaS-Recorder angewiesen zu sein.',
      solution: 'Bun-Monorepo: Next.js-16-Weboberfläche mit Google OAuth (next-auth); isolierter Bun-Worker mit Headless-Browser (Puppeteer) und FFmpeg in Docker, der den Meetings beitritt; Job-Warteschlange in Postgres (Drizzle); Aufzeichnungen in S3/MinIO; Transkription mit Groq Whisper oder Deepgram; Zusammenfassungen mit mehreren KI-Anbietern (Groq, mit Fallback auf Gemini); KI-Chat zu den Meetings; Auto-Join über Google Calendar und eine Browser-Erweiterung.',
      decisions: [
        'Web-App und Worker getrennt und unabhängig deployt',
        'Gemeinsamer Zustandsautomat für Jobs in Postgres (pending, recording, transcribing, summarizing, completed oder error) mit Heartbeat und Wiederholungsversuchen mit Backoff',
        'Mehrere KI-Anbieter mit Fallback',
        'Härtung mit RLS und Authentifizierungs-Middleware, dokumentiert in ADRs',
        'Spezifikationsgetriebene Entwicklung',
        'CI auf dev und main (bei jedem Push und PR): Installation mit eingefrorenem Lockfile, Datenbankschema, Tests gegen einen echten Postgres-16-Dienst, Lint, Typecheck, Prüfung, dass das ZIP der Erweiterung einem sauberen Build entspricht, und Docker-Build des Workers',
        'Branch-Governance: Feature, PR nach dev und PR nach main; ein GitHub-Actions-Guard lässt PRs nach main nur von dev zu, und eine Freigabe ist erforderlich',
        'Deployment: Web auf Vercel mit Git-Integration und versionierter vercel.json; Worker auf Railway mit Dockerfile, migriert von einem VPS-Deployment-Workflow; automatisches Continuous Deployment nur von main',
      ],
      evidence: [
        'Intern im Produktivbetrieb; CI auf dev und main, automatisches Continuous Deployment nur von main',
        'Öffentliches Repository; keine Demo (die Entwicklungsumgebung erfordert einen Google-Login)',
      ],
    },
    chain: ['Next.js', 'Postgres · Queue', 'Worker · Puppeteer + FFmpeg', 'S3 / MinIO', 'KI mit Fallback'],
  },
  nutriflow: {
    title: 'NutriFlow',
    subtitle: 'Intelligente Plattform für Ernährung und Training',
    description: 'Fortschrittliches SaaS-System zur Erstellung von zu 100 % personalisierten Ernährungsplänen und Trainingsroutinen. Es integriert eine KI-Engine, die die Gesundheit der Nutzer auf Basis biometrischer Daten und konkreter Ziele optimiert, auf einer Full-Stack-Architektur mit Next.js.',
    badge: 'Persönliches Projekt',
    highlights: [
      'Full-Stack-Next.js-App mit der API in Route Handlers',
      'Erweiterte Sicherheit mit Row Level Security',
      'Plangenerierung mit deterministischer KI-Logik',
    ],
    case: {
      problem: 'Ernährungs- und Trainingspläne, die unabhängige Ernährungsberater von Hand erstellen.',
      solution: 'Full-Stack-SaaS mit Next.js 16, Supabase und Gemini 2.0 Flash.',
      decisions: ['Row Level Security in der Datenbank', 'Plangenerierung mit deterministischer KI-Logik'],
      evidence: ['Öffentliche Demo und Repository', 'Beta-Status ausdrücklich angegeben'],
    },
    chain: ['Next.js', 'Route Handlers', 'Supabase · RLS', 'Gemini'],
  },
  'clinical-ai': {
    title: 'Clinical AI Multi-Agent',
    subtitle: 'Multi-Agenten-KI-Backend zur klinischen Entscheidungsunterstützung',
    description: 'Multi-Agenten-KI-Backend auf Produktionsniveau zur klinischen Entscheidungsunterstützung. Es klassifiziert die Dringlichkeit eines Falls per LLM-Triage und startet parallel Fachagenten, die klinische Leitlinien per RAG (pgvector) abfragen und eine integrierte, typisierte Bewertung zurückgeben. Entwickelt mit asynchronem FastAPI, LangChain (LCEL) und SQLAlchemy 2.0, mit Toleranz gegenüber Teilausfällen und containerisiertem Deployment.',
    badge: 'KI-Backend · Produktion',
    highlights: [
      'Multi-Agenten-Orchestrierung mit paralleler Ausführung (asyncio.gather)',
      'RAG über klinische Leitlinien mit pgvector und LangChain (LCEL)',
      'Asynchrones FastAPI, SQLAlchemy 2.0, mehrstufiges Docker und CI/CD nach GHCR',
    ],
    case: {
      problem: 'Die Dringlichkeit eines klinischen Falls priorisieren und klinische Leitlinien abfragen.',
      solution: 'LLM-Triage und parallel laufende Fachagenten mit RAG über pgvector.',
      decisions: ['Parallele Ausführung mit asyncio.gather und Toleranz gegenüber Teilausfällen', 'Asynchrones FastAPI und SQLAlchemy 2.0', 'Mehrstufiges Docker und CI/CD nach GHCR'],
      evidence: ['Öffentliches Repository; keine Demo'],
    },
    chain: ['Triage-Router', 'Parallele Agenten', 'RAG · pgvector', 'Typisierte Ausgabe'],
  },
  tallercardonal: {
    title: 'Taller El Cardonal',
    subtitle: 'Kundenprojekt im Produktivbetrieb',
    description: 'Vollständige Digitalisierung eines lokalen Betriebs. Entwicklung einer professionellen Website mit Fokus auf SEO, Performance und Nutzererfahrung, um mit einer schnellen, optimierten Oberfläche echte Kunden zu gewinnen.',
    badge: 'Kundenauftrag',
    highlights: [
      'Echtes Projekt im aktiven Produktivbetrieb',
      'SEO- und Core-Web-Vitals-Optimierung',
      'Responsives Mobile-first-Design mit reinem CSS3',
    ],
    case: {
      problem: 'Eine lokale Werkstatt ohne digitale Präsenz.',
      solution: 'Website in React mit Vite und eigenem CSS, responsiv, mit SEO, auf Vercel deployt.',
      decisions: ['Mobile-first-Design mit CSS3', 'WebP-Bilder', 'SEO-Metadaten'],
      evidence: ['Website im Produktivbetrieb'],
    },
    chain: ['React', 'Vite', 'Vercel'],
  },
  jegstudio: {
    title: 'JEG Studio',
    subtitle: 'Plattform für Freelancer und C2C-Akquise',
    description: 'Kollaboratives Webprojekt zur Gewinnung von Talenten, zur Suche nach Freelance-Aufträgen und zum gemeinsamen Wachstum der Branche. Ziel ist es, durch fortgeschrittene SEO-Optimierung und strategische Kampagnen Chancen bei potenziellen Kunden zu erzeugen.',
    badge: 'Teamprojekt',
    highlights: [
      'Plattform zur Suche nach Freelance-Kunden',
      'Optimierte SEO-Positionierungsstrategien',
      'Strukturierte Zusammenarbeit in der Entwicklung',
    ],
    case: {
      problem: 'Talente und Freelance-Kunden gewinnen.',
      solution: 'Kollaborative Plattform mit React und Next.js.',
      decisions: ['Ordnerstruktur, Namenskonventionen und Datenmodell im Team abgestimmt'],
      evidence: ['Öffentliche Demo und öffentliches Repository'],
    },
    chain: ['React', 'Next.js', 'Git Flow'],
  },
  sportbarleague: {
    title: 'SportBarLeague',
    subtitle: 'Full-Stack-Anwendung mit Python-Backend',
    description: 'Anwendung zur Verwaltung von Sportligen mit vollständigem Python-Backend. Umgesetzt wurden JWT-Authentifizierung, fortgeschrittene relationale Modellierung mit SQLAlchemy und eine mit Flask entworfene REST-API. Sie zeigt fundierte Kompetenz in Backend-Architektur und Datenbankdesign.',
    badge: 'Python-Backend',
    highlights: [
      'Vollständige REST-API mit Flask und JWT-Authentifizierung',
      'Komplexe relationale Datenbankmodellierung mit SQLAlchemy',
      'Robuste Backend-Architektur mit Python',
    ],
    case: {
      problem: 'Verwaltung von Sportligen.',
      solution: 'Python-Backend mit Flask und React-Frontend.',
      decisions: ['Selbst implementierte JWT-Authentifizierung', 'N:M- und 1:N-Beziehungen mit SQLAlchemy', 'Migrationen mit Alembic'],
      evidence: ['Öffentliches Repository; keine Demo'],
    },
    chain: ['React', 'Flask · JWT', 'SQLAlchemy', 'PostgreSQL'],
  },
};

const fr: Record<ProjectId, ProjectText> = {
  'squaads-meeting-bot': {
    title: 'Squaads Meeting Bot',
    subtitle: "Alternative interne et auto-hébergée aux enregistreurs de réunions SaaS",
    description: "Bot interne pour Squaads qui enregistre, transcrit et résume les réunions Google Meet et Microsoft Teams sur l'infrastructure propre de l'entreprise. Monorepo Bun avec un tableau de bord web Next.js, un worker isolé avec navigateur headless et FFmpeg dans Docker, une file de tâches dans Postgres et un stockage S3/MinIO. J'ai collaboré avec l'équipe lors de la phase initiale, puis j'ai dirigé le développement pratiquement seul, y compris le pipeline CI/CD et le déploiement.",
    badge: "Projet d'entreprise",
    highlights: [
      'Web et worker séparés, déployés indépendamment',
      "Machine à états des tâches partagée dans Postgres",
      'CI avec tests contre un vrai Postgres à chaque PR',
    ],
    case: {
      problem: "Enregistrer, transcrire et résumer les réunions Google Meet et Microsoft Teams sur l'infrastructure propre de l'entreprise, sans dépendre d'enregistreurs SaaS.",
      solution: "Monorepo Bun : tableau de bord web Next.js 16 avec Google OAuth (next-auth) ; worker Bun isolé avec navigateur headless (Puppeteer) et FFmpeg dans Docker qui rejoint les réunions ; file de tâches dans Postgres (Drizzle) ; enregistrements dans S3/MinIO ; transcription avec Groq Whisper ou Deepgram ; résumés avec plusieurs fournisseurs d'IA (Groq, avec repli sur Gemini) ; chat IA sur les réunions ; auto-join avec Google Calendar et une extension de navigateur.",
      decisions: [
        'Web et worker séparés, déployés indépendamment',
        'Machine à états des tâches partagée dans Postgres (pending, recording, transcribing, summarizing, completed ou error) avec heartbeat et nouvelles tentatives avec backoff',
        "Plusieurs fournisseurs d'IA avec repli",
        "Renforcement avec RLS et middleware d'authentification documentés dans des ADR",
        'Développement piloté par les spécifications',
        "CI sur dev et main (à chaque push et PR) : installation avec lockfile figé, schéma de base de données, tests contre un vrai service Postgres 16, lint, typecheck, vérification que le ZIP de l'extension correspond à un build propre et build Docker du worker",
        "Gouvernance des branches : feature, PR vers dev et PR vers main ; un garde-fou GitHub Actions n'accepte les PR vers main que depuis dev, et une approbation est exigée",
        "Déploiement : web sur Vercel avec intégration Git et un vercel.json versionné ; worker sur Railway avec un Dockerfile, migré depuis un workflow de déploiement sur VPS ; déploiement continu automatique uniquement depuis main",
      ],
      evidence: [
        'En production en interne ; CI sur dev et main, déploiement continu automatique uniquement depuis main',
        "Dépôt public ; pas de démo (l'environnement de développement exige une connexion Google)",
      ],
    },
    chain: ['Next.js', 'Postgres · file', 'Worker · Puppeteer + FFmpeg', 'S3 / MinIO', 'IA avec repli'],
  },
  nutriflow: {
    title: 'NutriFlow',
    subtitle: "Plateforme intelligente de nutrition et d'entraînement",
    description: "Système SaaS avancé conçu pour créer des plans nutritionnels et des routines d'exercice 100 % personnalisés. Il intègre un moteur d'IA qui optimise la santé de l'utilisateur à partir de données biométriques et d'objectifs précis, sur une architecture full-stack en Next.js.",
    badge: 'Projet personnel',
    highlights: [
      "Application Next.js full-stack avec l'API dans des Route Handlers",
      'Sécurité avancée avec Row Level Security',
      "Génération de plans avec une logique d'IA déterministe",
    ],
    case: {
      problem: "Plans nutritionnels et d'exercice créés à la main par des nutritionnistes indépendants.",
      solution: 'SaaS full-stack avec Next.js 16, Supabase et Gemini 2.0 Flash.',
      decisions: ['Row Level Security dans la base de données', "Génération de plans avec une logique d'IA déterministe"],
      evidence: ['Démo publique et dépôt', 'Statut Bêta déclaré'],
    },
    chain: ['Next.js', 'Route Handlers', 'Supabase · RLS', 'Gemini'],
  },
  'clinical-ai': {
    title: 'Clinical AI Multi-Agent',
    subtitle: "Backend d'IA multi-agents pour l'aide à la décision clinique",
    description: "Backend d'IA multi-agents de niveau production pour l'aide à la décision clinique. Il classe l'urgence d'un cas par un triage par LLM et déclenche en parallèle des agents spécialistes qui consultent des recommandations cliniques via RAG (pgvector), puis renvoie une évaluation intégrée et typée. Construit avec FastAPI asynchrone, LangChain (LCEL) et SQLAlchemy 2.0, avec tolérance aux pannes partielles et déploiement conteneurisé.",
    badge: 'Backend IA · Production',
    highlights: [
      "Orchestration multi-agents avec exécution parallèle (asyncio.gather)",
      'RAG sur des recommandations cliniques avec pgvector et LangChain (LCEL)',
      'FastAPI asynchrone, SQLAlchemy 2.0, Docker multi-stage et CI/CD vers GHCR',
    ],
    case: {
      problem: "Prioriser l'urgence d'un cas clinique et consulter des recommandations cliniques.",
      solution: 'Triage par LLM et agents spécialistes en parallèle avec RAG sur pgvector.',
      decisions: ["Exécution parallèle avec asyncio.gather et tolérance aux pannes partielles", 'FastAPI asynchrone et SQLAlchemy 2.0', 'Docker multi-stage et CI/CD vers GHCR'],
      evidence: ['Dépôt public ; pas de démo'],
    },
    chain: ['Routeur de triage', 'Agents en parallèle', 'RAG · pgvector', 'Sortie typée'],
  },
  tallercardonal: {
    title: 'Taller El Cardonal',
    subtitle: 'Projet client en production',
    description: "Numérisation complète d'un commerce local. Développement d'un site web professionnel axé sur le SEO, la performance et l'expérience utilisateur pour attirer de vrais clients grâce à une interface rapide et optimisée.",
    badge: 'Livraison client',
    highlights: [
      'Projet réel en production active',
      'Optimisation SEO et Core Web Vitals',
      'Design responsive mobile-first en CSS3 pur',
    ],
    case: {
      problem: "Un garage local sans présence numérique.",
      solution: 'Site en React avec Vite et CSS sur mesure, responsive, avec SEO, déployé sur Vercel.',
      decisions: ['Design mobile-first en CSS3', 'Images WebP', 'Métadonnées SEO'],
      evidence: ['Site en production'],
    },
    chain: ['React', 'Vite', 'Vercel'],
  },
  jegstudio: {
    title: 'JEG Studio',
    subtitle: 'Plateforme pour freelances et prospection C2C',
    description: "Projet web collaboratif axé sur le recrutement de talents, la recherche de missions freelance et la croissance commune du secteur. Il vise à générer des opportunités auprès de clients potentiels grâce à une optimisation SEO avancée et à des campagnes stratégiques.",
    badge: "Projet d'équipe",
    highlights: [
      'Plateforme dédiée à la recherche de clients freelance',
      'Stratégies de positionnement SEO optimisées',
      'Développement collaboratif structuré',
    ],
    case: {
      problem: 'Attirer des talents et des clients freelance.',
      solution: 'Plateforme collaborative avec React et Next.js.',
      decisions: ["Structure des dossiers, conventions de nommage et modèle de données définis en équipe"],
      evidence: ['Démo et dépôt publics'],
    },
    chain: ['React', 'Next.js', 'Git Flow'],
  },
  sportbarleague: {
    title: 'SportBarLeague',
    subtitle: 'Application full stack avec backend Python',
    description: "Application de gestion de ligues sportives avec un backend Python complet. Elle met en œuvre une authentification JWT, une modélisation relationnelle avancée avec SQLAlchemy et une API REST conçue avec Flask. Elle démontre de solides compétences en architecture backend et en conception de bases de données.",
    badge: 'Backend Python',
    highlights: [
      'API REST complète avec Flask et authentification JWT',
      'Modélisation complexe de base de données relationnelle avec SQLAlchemy',
      'Architecture backend robuste avec Python',
    ],
    case: {
      problem: 'Gestion de ligues sportives.',
      solution: 'Backend Python avec Flask et frontend React.',
      decisions: ['Authentification JWT faite à la main', 'Relations N:M et 1:N avec SQLAlchemy', 'Migrations avec Alembic'],
      evidence: ['Dépôt public ; pas de démo'],
    },
    chain: ['React', 'Flask · JWT', 'SQLAlchemy', 'PostgreSQL'],
  },
};

const it: Record<ProjectId, ProjectText> = {
  'squaads-meeting-bot': {
    title: 'Squaads Meeting Bot',
    subtitle: 'Alternativa interna e self-hosted ai registratori di riunioni SaaS',
    description: "Bot interno per Squaads che registra, trascrive e riassume le riunioni di Google Meet e Microsoft Teams sull'infrastruttura propria dell'azienda. Monorepo Bun con dashboard web in Next.js, worker isolato con browser headless e FFmpeg in Docker, coda di job in Postgres e storage S3/MinIO. Ho collaborato con il team nella fase iniziale e poi ho guidato lo sviluppo praticamente da solo, compresi la pipeline CI/CD e il deploy.",
    badge: 'Progetto aziendale',
    highlights: [
      'Web e worker separati, distribuiti in modo indipendente',
      'Macchina a stati dei job condivisa in Postgres',
      'CI con test su un vero Postgres a ogni PR',
    ],
    case: {
      problem: "Registrare, trascrivere e riassumere le riunioni di Google Meet e Microsoft Teams sull'infrastruttura propria dell'azienda, senza dipendere da registratori SaaS.",
      solution: "Monorepo Bun: dashboard web Next.js 16 con Google OAuth (next-auth); worker Bun isolato con browser headless (Puppeteer) e FFmpeg in Docker che entra nelle riunioni; coda di job in Postgres (Drizzle); registrazioni in S3/MinIO; trascrizione con Groq Whisper o Deepgram; riassunti con più provider di IA (Groq, con fallback su Gemini); chat con IA sulle riunioni; auto-join con Google Calendar ed estensione del browser.",
      decisions: [
        'Web e worker separati, distribuiti in modo indipendente',
        'Macchina a stati dei job condivisa in Postgres (pending, recording, transcribing, summarizing, completed o error) con heartbeat e nuovi tentativi con backoff',
        'Più provider di IA con fallback',
        'Hardening con RLS e middleware di autenticazione documentati in ADR',
        'Sviluppo guidato dalle specifiche',
        "CI su dev e main (a ogni push e PR): installazione con lockfile congelato, schema del database, test su un vero servizio Postgres 16, lint, typecheck, verifica che lo ZIP dell'estensione coincida con una build pulita e build Docker del worker",
        'Governance dei branch: feature, PR verso dev e PR verso main; una guardia di GitHub Actions accetta PR verso main solo da dev ed è richiesta l\'approvazione',
        'Deploy: web su Vercel con integrazione Git e vercel.json versionato; worker su Railway con Dockerfile, migrato da un workflow di deploy su VPS; deploy continuo automatico solo da main',
      ],
      evidence: [
        'In produzione internamente; CI su dev e main, deploy continuo automatico solo da main',
        "Repository pubblico; nessuna demo (l'ambiente di sviluppo richiede il login con Google)",
      ],
    },
    chain: ['Next.js', 'Postgres · coda', 'Worker · Puppeteer + FFmpeg', 'S3 / MinIO', 'IA con fallback'],
  },
  nutriflow: {
    title: 'NutriFlow',
    subtitle: 'Piattaforma intelligente per nutrizione e allenamento',
    description: "Sistema SaaS avanzato progettato per creare piani nutrizionali e routine di allenamento personalizzati al 100%. Integra un motore di IA per ottimizzare la salute dell'utente a partire da dati biometrici e obiettivi specifici, con un'architettura full-stack in Next.js.",
    badge: 'Progetto personale',
    highlights: [
      "App Next.js full-stack con l'API nei Route Handlers",
      'Sicurezza avanzata con Row Level Security',
      'Generazione dei piani con logica di IA deterministica',
    ],
    case: {
      problem: 'Piani nutrizionali e di allenamento creati a mano da nutrizionisti indipendenti.',
      solution: 'SaaS full-stack con Next.js 16, Supabase e Gemini 2.0 Flash.',
      decisions: ['Row Level Security nel database', 'Generazione dei piani con logica di IA deterministica'],
      evidence: ['Demo pubblica e repository', 'Stato Beta dichiarato'],
    },
    chain: ['Next.js', 'Route Handlers', 'Supabase · RLS', 'Gemini'],
  },
  'clinical-ai': {
    title: 'Clinical AI Multi-Agent',
    subtitle: 'Backend di IA multi-agente per il supporto clinico',
    description: "Backend di IA multi-agente di livello produzione per il supporto alle decisioni cliniche. Classifica l'urgenza di un caso tramite triage con LLM e attiva in parallelo agenti specialisti che consultano le linee guida cliniche via RAG (pgvector), restituendo una valutazione integrata e tipizzata. Costruito con FastAPI asincrono, LangChain (LCEL) e SQLAlchemy 2.0, con tolleranza ai guasti parziali e deploy containerizzato.",
    badge: 'Backend IA · Produzione',
    highlights: [
      'Orchestrazione multi-agente con esecuzione parallela (asyncio.gather)',
      'RAG sulle linee guida cliniche con pgvector e LangChain (LCEL)',
      'FastAPI asincrono, SQLAlchemy 2.0, Docker multi-stage e CI/CD verso GHCR',
    ],
    case: {
      problem: "Dare priorità all'urgenza di un caso clinico e consultare le linee guida cliniche.",
      solution: 'Triage con LLM e agenti specialisti in parallelo con RAG su pgvector.',
      decisions: ['Esecuzione parallela con asyncio.gather e tolleranza ai guasti parziali', 'FastAPI asincrono e SQLAlchemy 2.0', 'Docker multi-stage e CI/CD verso GHCR'],
      evidence: ['Repository pubblico; nessuna demo'],
    },
    chain: ['Router di triage', 'Agenti in parallelo', 'RAG · pgvector', 'Output tipizzato'],
  },
  tallercardonal: {
    title: 'Taller El Cardonal',
    subtitle: 'Progetto per un cliente in produzione',
    description: "Digitalizzazione completa di un'attività locale. Sviluppo di un sito web professionale incentrato su SEO, prestazioni ed esperienza utente per attirare clienti reali grazie a un'interfaccia veloce e ottimizzata.",
    badge: 'Consegna al cliente',
    highlights: [
      'Progetto reale in produzione attiva',
      'Ottimizzazione SEO e Core Web Vitals',
      'Design responsive mobile-first con CSS3 puro',
    ],
    case: {
      problem: 'Un\'officina locale senza presenza digitale.',
      solution: 'Sito in React con Vite e CSS proprio, responsive, con SEO, distribuito su Vercel.',
      decisions: ['Design mobile-first con CSS3', 'Immagini WebP', 'Metadati SEO'],
      evidence: ['Sito in produzione'],
    },
    chain: ['React', 'Vite', 'Vercel'],
  },
  jegstudio: {
    title: 'JEG Studio',
    subtitle: 'Piattaforma per freelance e acquisizione C2C',
    description: "Progetto web collaborativo dedicato all'acquisizione di talenti, alla ricerca di lavoro freelance e alla crescita comune del settore. Punta a generare opportunità con potenziali clienti tramite un'ottimizzazione SEO avanzata e campagne strategiche.",
    badge: 'Progetto di squadra',
    highlights: [
      'Piattaforma incentrata sulla ricerca di clienti freelance',
      'Strategie di posizionamento SEO ottimizzate',
      'Sviluppo collaborativo strutturato',
    ],
    case: {
      problem: 'Acquisire talenti e clienti freelance.',
      solution: 'Piattaforma collaborativa con React e Next.js.',
      decisions: ['Struttura delle cartelle, convenzioni di nomenclatura e modello dei dati concordati in team'],
      evidence: ['Demo e repository pubblici'],
    },
    chain: ['React', 'Next.js', 'Git Flow'],
  },
  sportbarleague: {
    title: 'SportBarLeague',
    subtitle: 'Applicazione full stack con backend Python',
    description: "Applicazione per la gestione di leghe sportive con un backend Python completo. Implementa l'autenticazione JWT, una modellazione relazionale avanzata con SQLAlchemy e un'API REST progettata con Flask. Dimostra solide competenze di architettura backend e progettazione di database.",
    badge: 'Backend Python',
    highlights: [
      'API REST completa con Flask e autenticazione JWT',
      'Modellazione complessa di database relazionale con SQLAlchemy',
      'Architettura backend robusta con Python',
    ],
    case: {
      problem: 'Gestione di leghe sportive.',
      solution: 'Backend in Python con Flask e frontend in React.',
      decisions: ['Autenticazione JWT scritta a mano', 'Relazioni N:M e 1:N con SQLAlchemy', 'Migrazioni con Alembic'],
      evidence: ['Repository pubblico; nessuna demo'],
    },
    chain: ['React', 'Flask · JWT', 'SQLAlchemy', 'PostgreSQL'],
  },
};

export const projectText: Record<Language, Record<ProjectId, ProjectText>> = { es, en, de, fr, it };

/** Project with its text in `language`; Spanish returns the project untouched. */
export function localizeProject(project: Project, language: Language): Project {
  const x = language === 'es' ? undefined : projectText[language][project.id as ProjectId];
  if (!x) return project;
  return {
    ...project,
    title: x.title, subtitle: x.subtitle, description: x.description, badge: x.badge, highlights: x.highlights,
    case: project.case && { ...project.case, ...x.case },
  };
}

export const getProjects = (language: Language): Project[] => projects.map((p) => localizeProject(p, language));

export const getProjectChain = (id: string, language: Language): string[] => projectText[language][id as ProjectId]?.chain ?? [];
