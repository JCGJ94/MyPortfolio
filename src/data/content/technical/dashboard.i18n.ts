// Dashboard ("Panel Técnico") copy per language. Spanish is the source of truth; keys are enforced by the type.
// Technical identifiers (log events, status codes, stack names) stay in DashboardContent.
import type { Language } from '@/data/translations';

export type DashboardCopy = {
  title: string;
  subtitle: string;
  settings: string;
  signOut: string;
  verified: string;
  pending: string;
  activeSession: string;
  lastAccess: string;
  profile: string;
  accountCreated: string;
  provider: string;
  stack: string;
  technologies: string;
  coreCount: string;
  productionActive: string;
  stackTitle: string;
  logsTitle: string;
  latestActions: string;
  /** Relative times of the four log lines, in order. */
  logTimes: [string, string, string, string];
  roadmapTitle: string;
  /** Titles of the three roadmap items, in order. */
  roadmap: [string, string, string];
  noteLabel: string;
  note: string;
  /** BCP 47 locale used to format the account dates. */
  locale: string;
};

export const dashboardCopy: Record<Language, DashboardCopy> = {
  es: {
    title: 'Panel Técnico',
    subtitle: 'Entorno de gestión y monitoreo de arquitectura.',
    settings: 'Configuración',
    signOut: 'Cerrar Sesión',
    verified: 'Verificado',
    pending: 'Pendiente',
    activeSession: 'Sesión Activa',
    lastAccess: 'Último acceso',
    profile: 'Perfil',
    accountCreated: 'Cuenta creada',
    provider: 'Provider',
    stack: 'Stack',
    technologies: 'Tecnologías',
    coreCount: '6 Core',
    productionActive: 'Producción activa',
    stackTitle: 'Stack Tecnológico',
    logsTitle: 'Logs de Actividad',
    latestActions: 'Últimas acciones',
    logTimes: ['ahora', 'hace 1s', 'hace 2s', 'hace 3s'],
    roadmapTitle: 'Roadmap de Implementación',
    roadmap: ['Auth Layer (JWT + SSR)', 'PostgreSQL Real-time Sync', 'IA Agents Orchestrator'],
    noteLabel: 'Nota técnica',
    note: 'Este panel es una demostración técnica de la integración de Supabase en un entorno Next.js 16 con Server Components. Los datos del usuario son reales y provienen de la sesión JWT autenticada.',
    locale: 'es-ES',
  },
  en: {
    title: 'Technical Dashboard',
    subtitle: 'Architecture management and monitoring environment.',
    settings: 'Settings',
    signOut: 'Sign Out',
    verified: 'Verified',
    pending: 'Pending',
    activeSession: 'Active Session',
    lastAccess: 'Last sign-in',
    profile: 'Profile',
    accountCreated: 'Account created',
    provider: 'Provider',
    stack: 'Stack',
    technologies: 'Technologies',
    coreCount: '6 Core',
    productionActive: 'Live in production',
    stackTitle: 'Technology Stack',
    logsTitle: 'Activity Logs',
    latestActions: 'Latest actions',
    logTimes: ['now', '1s ago', '2s ago', '3s ago'],
    roadmapTitle: 'Implementation Roadmap',
    roadmap: ['Auth Layer (JWT + SSR)', 'PostgreSQL Real-time Sync', 'AI Agents Orchestrator'],
    noteLabel: 'Technical note',
    note: 'This dashboard is a technical demonstration of integrating Supabase into a Next.js 16 environment with Server Components. The user data is real and comes from the authenticated JWT session.',
    locale: 'en-GB',
  },
  de: {
    title: 'Technisches Dashboard',
    subtitle: 'Umgebung zur Verwaltung und Überwachung der Architektur.',
    settings: 'Einstellungen',
    signOut: 'Abmelden',
    verified: 'Verifiziert',
    pending: 'Ausstehend',
    activeSession: 'Aktive Sitzung',
    lastAccess: 'Letzte Anmeldung',
    profile: 'Profil',
    accountCreated: 'Konto erstellt',
    provider: 'Anbieter',
    stack: 'Stack',
    technologies: 'Technologien',
    coreCount: '6 Kern',
    productionActive: 'Produktiv im Einsatz',
    stackTitle: 'Technologie-Stack',
    logsTitle: 'Aktivitätsprotokoll',
    latestActions: 'Letzte Aktionen',
    logTimes: ['jetzt', 'vor 1 s', 'vor 2 s', 'vor 3 s'],
    roadmapTitle: 'Implementierungs-Roadmap',
    roadmap: ['Auth Layer (JWT + SSR)', 'PostgreSQL Real-time Sync', 'KI-Agenten-Orchestrator'],
    noteLabel: 'Technischer Hinweis',
    note: 'Dieses Dashboard ist eine technische Demonstration der Supabase-Integration in einer Next.js-16-Umgebung mit Server Components. Die Nutzerdaten sind echt und stammen aus der authentifizierten JWT-Sitzung.',
    locale: 'de-DE',
  },
  fr: {
    title: 'Tableau de bord technique',
    subtitle: "Environnement de gestion et de supervision de l'architecture.",
    settings: 'Paramètres',
    signOut: 'Se déconnecter',
    verified: 'Vérifié',
    pending: 'En attente',
    activeSession: 'Session active',
    lastAccess: 'Dernière connexion',
    profile: 'Profil',
    accountCreated: 'Compte créé',
    provider: 'Fournisseur',
    stack: 'Stack',
    technologies: 'Technologies',
    coreCount: '6 essentielles',
    productionActive: 'En production',
    stackTitle: 'Stack technologique',
    logsTitle: "Journal d'activité",
    latestActions: 'Dernières actions',
    logTimes: ['maintenant', 'il y a 1 s', 'il y a 2 s', 'il y a 3 s'],
    roadmapTitle: "Feuille de route d'implémentation",
    roadmap: ['Auth Layer (JWT + SSR)', 'PostgreSQL Real-time Sync', "Orchestrateur d'agents IA"],
    noteLabel: 'Note technique',
    note: "Ce tableau de bord est une démonstration technique de l'intégration de Supabase dans un environnement Next.js 16 avec Server Components. Les données de l'utilisateur sont réelles et proviennent de la session JWT authentifiée.",
    locale: 'fr-FR',
  },
  it: {
    title: 'Pannello tecnico',
    subtitle: "Ambiente di gestione e monitoraggio dell'architettura.",
    settings: 'Impostazioni',
    signOut: 'Esci',
    verified: 'Verificato',
    pending: 'In attesa',
    activeSession: 'Sessione attiva',
    lastAccess: 'Ultimo accesso',
    profile: 'Profilo',
    accountCreated: 'Account creato',
    provider: 'Provider',
    stack: 'Stack',
    technologies: 'Tecnologie',
    coreCount: '6 principali',
    productionActive: 'In produzione',
    stackTitle: 'Stack tecnologico',
    logsTitle: 'Log di attività',
    latestActions: 'Ultime azioni',
    logTimes: ['adesso', '1 s fa', '2 s fa', '3 s fa'],
    roadmapTitle: 'Roadmap di implementazione',
    roadmap: ['Auth Layer (JWT + SSR)', 'PostgreSQL Real-time Sync', 'Orchestratore di agenti IA'],
    noteLabel: 'Nota tecnica',
    note: "Questo pannello è una dimostrazione tecnica dell'integrazione di Supabase in un ambiente Next.js 16 con Server Components. I dati dell'utente sono reali e provengono dalla sessione JWT autenticata.",
    locale: 'it-IT',
  },
};
