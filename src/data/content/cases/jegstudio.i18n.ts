// JEG Studio case page copy. `es` is the original text, byte for byte.
import type { Language } from '@/data/translations';
import type { JegStudioCopy } from './types';

const stackNames = ['Next.js 14', 'React 18', 'Tailwind CSS', 'Git Flow', 'Vercel'];

const es: JegStudioCopy = {
  header: {
    tier: 'Proyecto en equipo',
    title: 'JEG Studio',
    lede: 'Landing page profesional y MVP para un equipo de desarrolladores y creativos. Proyecto colaborativo con control de versiones profesional, code review y participación activa en decisiones de arquitectura y diseño.',
    summary: {
      kind: 'Proyecto en equipo',
      role: 'Proyecto en equipo con ownership de features completas y participación en decisiones de arquitectura y diseño.',
      stack: stackNames,
      proves: [
        'Trabajo en equipo con Git Flow: ramas feat/ y fix/ y PRs con al menos un reviewer.',
        'Decisiones compartidas sobre estructura, naming, estilado y modelo de datos.',
        'Comunicación técnica: defender propuestas de arquitectura y escribir código que otros puedan mantener.',
      ],
    },
    actions: ['Ver Demo', 'Ver Repositorio'],
  },
  imageAlt: 'JEG Studio Project',
  flowTitle: 'Flujo de Trabajo',
  flowLede: 'Cómo viaja el trabajo del equipo desde una rama hasta main.',
  stackTitle: 'Stack & Prácticas',
  stack: [
    ['Framework', 'Next.js 14 (React 18)'],
    ['Estilos', 'Tailwind CSS 3.4'],
    ['Flujo', 'Git Flow'],
    ['Calidad', 'Code Review'],
    ['Deploy', 'Vercel'],
  ],
  context: {
    title: 'El Contexto',
    pull: 'Proyecto colaborativo con otros desarrolladores.',
    text: ['El objetivo era construir una solución web completa ', 'trabajando como un equipo de desarrollo real', ', no como individuos que juntan código al final.'],
  },
  team: {
    title: 'Dinámica de Equipo',
    gitFlow: {
      lead: 'Git Flow profesional:',
      parts: ['Branches por feature (', '), por fix (', '), PRs obligatorios con al menos un reviewer. Nada se mergeaba a ', ' sin revisión.'],
    },
    decisions: { lead: 'Decisiones compartidas:', text: 'Definición de estructura de carpetas, convenciones de naming, estrategia de estilado y modelo de datos consensuados en equipo.' },
    coordination: { lead: 'Coordinación técnica:', text: 'Sincronización diaria sobre el estado de cada feature, resolución proactiva de conflictos, y pair programming para módulos críticos.' },
    responsibility: { lead: 'Responsabilidad individual:', text: 'Cada miembro tenía ownership de features completas, pero el equipo revisaba y aprobaba todo.' },
  },
  skills: {
    title: 'Habilidades Demostradas',
    items: [
      'Capacidad real de colaboración, excediendo el "trabajar solo y subir a un repo compartido".',
      'Experiencia con flujos de trabajo profesionales que replican entornos organizacionales (PRs, Issues, agile).',
      'Habilidad para comunicar decisiones técnicas y defender propuestas de arquitectura ante colegas.',
      'Empatía técnica: adaptar el código propio para que otros lo entiendan y lo puedan mantener a futuro.',
    ],
  },
};

const en: JegStudioCopy = {
  header: {
    tier: 'Team Project',
    title: 'JEG Studio',
    lede: 'Professional landing page and MVP for a team of developers and creatives. A collaborative project with professional version control, code review and active involvement in architecture and design decisions.',
    summary: {
      kind: 'Team project',
      role: 'Team project with ownership of complete features and a share in architecture and design decisions.',
      stack: stackNames,
      proves: [
        'Teamwork with Git Flow: feat/ and fix/ branches and PRs with at least one reviewer.',
        'Shared decisions on structure, naming, styling and data model.',
        'Technical communication: defending architecture proposals and writing code that others can maintain.',
      ],
    },
    actions: ['View Demo', 'View Repository'],
  },
  imageAlt: 'JEG Studio project',
  flowTitle: 'Workflow',
  flowLede: "How the team's work travels from a branch to main.",
  stackTitle: 'Stack & Practices',
  stack: [
    ['Framework', 'Next.js 14 (React 18)'],
    ['Styling', 'Tailwind CSS 3.4'],
    ['Workflow', 'Git Flow'],
    ['Quality', 'Code Review'],
    ['Deploy', 'Vercel'],
  ],
  context: {
    title: 'The Context',
    pull: 'A collaborative project with other developers.',
    text: ['The goal was to build a complete web solution ', 'working as a real development team', ', not as individuals who merge their code together at the end.'],
  },
  team: {
    title: 'Team Dynamics',
    gitFlow: {
      lead: 'Professional Git Flow:',
      parts: ['Branches per feature (', '), per fix (', '), mandatory PRs with at least one reviewer. Nothing was merged into ', ' without a review.'],
    },
    decisions: { lead: 'Shared decisions:', text: 'Folder structure, naming conventions, styling strategy and data model were all agreed on as a team.' },
    coordination: { lead: 'Technical coordination:', text: 'Daily syncs on the status of each feature, proactive conflict resolution, and pair programming for critical modules.' },
    responsibility: { lead: 'Individual responsibility:', text: 'Each member owned complete features, but the team reviewed and approved everything.' },
  },
  skills: {
    title: 'Skills Demonstrated',
    items: [
      'Real ability to collaborate, going beyond "working alone and pushing to a shared repo".',
      'Experience with professional workflows that mirror organizational environments (PRs, Issues, agile).',
      'Ability to communicate technical decisions and defend architecture proposals in front of colleagues.',
      'Technical empathy: adapting your own code so that others can understand it and maintain it in the future.',
    ],
  },
};

const de: JegStudioCopy = {
  header: {
    tier: 'Teamprojekt',
    title: 'JEG Studio',
    lede: 'Professionelle Landingpage und MVP für ein Team aus Entwicklern und Kreativen. Gemeinschaftsprojekt mit professioneller Versionskontrolle, Code-Review und aktiver Beteiligung an Architektur- und Designentscheidungen.',
    summary: {
      kind: 'Teamprojekt',
      role: 'Teamprojekt mit Ownership für komplette Features und Beteiligung an Architektur- und Designentscheidungen.',
      stack: stackNames,
      proves: [
        'Teamarbeit mit Git Flow: feat/- und fix/-Branches und PRs mit mindestens einem Reviewer.',
        'Gemeinsame Entscheidungen zu Struktur, Naming, Styling und Datenmodell.',
        'Technische Kommunikation: Architekturvorschläge vertreten und Code schreiben, den andere pflegen können.',
      ],
    },
    actions: ['Demo ansehen', 'Repository ansehen'],
  },
  imageAlt: 'JEG-Studio-Projekt',
  flowTitle: 'Workflow',
  flowLede: 'Wie die Arbeit des Teams von einem Branch bis in main gelangt.',
  stackTitle: 'Stack & Praktiken',
  stack: [
    ['Framework', 'Next.js 14 (React 18)'],
    ['Styling', 'Tailwind CSS 3.4'],
    ['Workflow', 'Git Flow'],
    ['Qualität', 'Code Review'],
    ['Deploy', 'Vercel'],
  ],
  context: {
    title: 'Der Kontext',
    pull: 'Ein Gemeinschaftsprojekt mit anderen Entwicklern.',
    text: ['Das Ziel war, eine komplette Weblösung zu bauen und dabei ', 'wie ein echtes Entwicklungsteam zu arbeiten', ', nicht als Einzelpersonen, die ihren Code erst am Ende zusammenwerfen.'],
  },
  team: {
    title: 'Teamdynamik',
    gitFlow: {
      lead: 'Professioneller Git Flow:',
      parts: ['Branches pro Feature (', ') und pro Fix (', '), verpflichtende PRs mit mindestens einem Reviewer. Nichts wurde ohne Review in ', ' gemergt.'],
    },
    decisions: { lead: 'Gemeinsame Entscheidungen:', text: 'Ordnerstruktur, Naming-Konventionen, Styling-Strategie und Datenmodell wurden im Team gemeinsam festgelegt.' },
    coordination: { lead: 'Technische Abstimmung:', text: 'Tägliche Abstimmung zum Stand jedes Features, proaktive Konfliktlösung und Pair Programming für kritische Module.' },
    responsibility: { lead: 'Individuelle Verantwortung:', text: 'Jedes Mitglied hatte die Ownership für komplette Features, aber das Team prüfte und genehmigte alles.' },
  },
  skills: {
    title: 'Nachgewiesene Fähigkeiten',
    items: [
      'Echte Zusammenarbeit, die über „allein arbeiten und in ein gemeinsames Repo pushen“ hinausgeht.',
      'Erfahrung mit professionellen Workflows, die organisatorische Umgebungen abbilden (PRs, Issues, Agile).',
      'Fähigkeit, technische Entscheidungen zu vermitteln und Architekturvorschläge vor Kollegen zu vertreten.',
      'Technische Empathie: den eigenen Code so anpassen, dass andere ihn verstehen und künftig pflegen können.',
    ],
  },
};

const fr: JegStudioCopy = {
  header: {
    tier: "Projet d'équipe",
    title: 'JEG Studio',
    lede: "Landing page professionnelle et MVP pour une équipe de développeurs et de créatifs. Projet collaboratif avec gestion de versions professionnelle, code review et participation active aux décisions d'architecture et de design.",
    summary: {
      kind: "Projet d'équipe",
      role: "Projet d'équipe avec ownership de fonctionnalités complètes et participation aux décisions d'architecture et de design.",
      stack: stackNames,
      proves: [
        'Travail en équipe avec Git Flow : branches feat/ et fix/ et PR avec au moins un reviewer.',
        'Décisions partagées sur la structure, le nommage, le style et le modèle de données.',
        "Communication technique : défendre des propositions d'architecture et écrire du code que d'autres peuvent maintenir.",
      ],
    },
    actions: ['Voir la démo', 'Voir le repository'],
  },
  imageAlt: 'Projet JEG Studio',
  flowTitle: 'Flux de travail',
  flowLede: "Comment le travail de l'équipe voyage d'une branche jusqu'à main.",
  stackTitle: 'Stack & pratiques',
  stack: [
    ['Framework', 'Next.js 14 (React 18)'],
    ['Styles', 'Tailwind CSS 3.4'],
    ['Flux', 'Git Flow'],
    ['Qualité', 'Code Review'],
    ['Deploy', 'Vercel'],
  ],
  context: {
    title: 'Le contexte',
    pull: "Projet collaboratif avec d'autres développeurs.",
    text: ["L'objectif était de construire une solution web complète en ", "travaillant comme une véritable équipe de développement", ", et non comme des individus qui assemblent leur code à la fin."],
  },
  team: {
    title: "Dynamique d'équipe",
    gitFlow: {
      lead: 'Git Flow professionnel :',
      parts: ['Branches par fonctionnalité (', '), par correctif (', '), PR obligatoires avec au moins un reviewer. Rien n\'était fusionné dans ', ' sans relecture.'],
    },
    decisions: { lead: 'Décisions partagées :', text: "Structure des dossiers, conventions de nommage, stratégie de style et modèle de données définis d'un commun accord au sein de l'équipe." },
    coordination: { lead: 'Coordination technique :', text: "Point quotidien sur l'avancement de chaque fonctionnalité, résolution proactive des conflits et pair programming pour les modules critiques." },
    responsibility: { lead: 'Responsabilité individuelle :', text: "Chaque membre avait l'ownership de fonctionnalités complètes, mais l'équipe relisait et validait tout." },
  },
  skills: {
    title: 'Compétences démontrées',
    items: [
      'Vraie capacité de collaboration, bien au-delà de « travailler seul et pousser sur un dépôt partagé ».',
      "Expérience de flux de travail professionnels qui reproduisent les environnements d'entreprise (PR, issues, agile).",
      "Capacité à communiquer des décisions techniques et à défendre des propositions d'architecture devant des collègues.",
      "Empathie technique : adapter son propre code pour que les autres le comprennent et puissent le maintenir à l'avenir.",
    ],
  },
};

const it: JegStudioCopy = {
  header: {
    tier: 'Progetto di squadra',
    title: 'JEG Studio',
    lede: "Landing page professionale e MVP per un team di sviluppatori e creativi. Progetto collaborativo con controllo di versione professionale, code review e partecipazione attiva alle decisioni di architettura e di design.",
    summary: {
      kind: 'Progetto di squadra',
      role: 'Progetto di squadra con ownership di feature complete e partecipazione alle decisioni di architettura e di design.',
      stack: stackNames,
      proves: [
        'Lavoro di squadra con Git Flow: branch feat/ e fix/ e PR con almeno un reviewer.',
        'Decisioni condivise su struttura, naming, stile e modello dei dati.',
        'Comunicazione tecnica: difendere proposte di architettura e scrivere codice che altri possano mantenere.',
      ],
    },
    actions: ['Vedi la demo', 'Vedi il repository'],
  },
  imageAlt: 'Progetto JEG Studio',
  flowTitle: 'Flusso di lavoro',
  flowLede: 'Come il lavoro del team viaggia da un branch fino a main.',
  stackTitle: 'Stack e pratiche',
  stack: [
    ['Framework', 'Next.js 14 (React 18)'],
    ['Stili', 'Tailwind CSS 3.4'],
    ['Flusso', 'Git Flow'],
    ['Qualità', 'Code Review'],
    ['Deploy', 'Vercel'],
  ],
  context: {
    title: 'Il contesto',
    pull: 'Progetto collaborativo con altri sviluppatori.',
    text: ["L'obiettivo era costruire una soluzione web completa ", 'lavorando come un vero team di sviluppo', ', non come singoli che mettono insieme il codice alla fine.'],
  },
  team: {
    title: 'Dinamiche di squadra',
    gitFlow: {
      lead: 'Git Flow professionale:',
      parts: ['Branch per feature (', '), per fix (', '), PR obbligatorie con almeno un reviewer. Nulla veniva unito in ', ' senza revisione.'],
    },
    decisions: { lead: 'Decisioni condivise:', text: 'Struttura delle cartelle, convenzioni di naming, strategia di stile e modello dei dati concordati insieme dal team.' },
    coordination: { lead: 'Coordinamento tecnico:', text: 'Sincronizzazione quotidiana sullo stato di ogni feature, risoluzione proattiva dei conflitti e pair programming per i moduli critici.' },
    responsibility: { lead: 'Responsabilità individuale:', text: 'Ogni membro aveva la ownership di feature complete, ma il team rivedeva e approvava tutto.' },
  },
  skills: {
    title: 'Competenze dimostrate',
    items: [
      'Reale capacità di collaborazione, che va oltre il «lavorare da soli e fare push su un repository condiviso».',
      'Esperienza con flussi di lavoro professionali che replicano gli ambienti aziendali (PR, issue, agile).',
      'Capacità di comunicare le decisioni tecniche e difendere proposte di architettura davanti ai colleghi.',
      'Empatia tecnica: adattare il proprio codice perché gli altri lo capiscano e possano mantenerlo in futuro.',
    ],
  },
};

export const jegStudioCopy: Record<Language, JegStudioCopy> = { es, en, de, fr, it };
