// SportBarLeague case page copy. `es` is the original text, byte for byte.
import type { Language } from '@/data/translations';
import type { SportBarLeagueCopy } from './types';

const stackNames = ['React 18 (Vite)', 'Flask (Python 3.13)', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'JWT', 'Docker'];

const es: SportBarLeagueCopy = {
  header: {
    tier: 'Technical Foundation',
    title: 'SportBarLeague',
    lede: 'Plataforma full-stack para la gestión de eventos deportivos y ligas en bares. Sistema completo de autenticación JWT, CRUD avanzado, modelado relacional robusto y gestión de imágenes con Cloudinary. La base técnica sólida que consolidó los fundamentos del desarrollo backend profesional.',
    summary: {
      kind: 'Proyecto de bootcamp',
      role: 'Proyecto de bootcamp que consolidó los fundamentos del desarrollo backend, con frontend y API propios.',
      stack: stackNames,
      proves: [
        'Autenticación JWT con refresh tokens construida a mano, sin servicio de Auth en la nube.',
        'Modelado relacional con relaciones N:M y 1:N, constraints y migraciones versionadas con Alembic.',
        'API REST con separación de controladores, validación de payloads y manejo de errores consistente.',
      ],
    },
    actions: ['Ver Repositorio'],
  },
  imageAlt: 'SportBarLeague Interface',
  archTitle: 'Arquitectura',
  archLede: 'De la interfaz React a la base de datos relacional.',
  stackTitle: 'Stack Tecnológico',
  stack: [
    ['Frontend', 'React 18 (Vite)'],
    ['Estilos', 'Sass + Bootstrap 5'],
    ['Backend API', 'Flask (Python 3.13)'],
    ['Base de Datos', 'PostgreSQL + SQLAlchemy'],
    ['Deploy', 'Render (Docker)'],
  ],
  concept: {
    title: 'El Concepto',
    pull: 'Plataforma para gestión de ligas deportivas en bares/pubs.',
    allowsTitle: 'Qué permite',
    allows: ['Crear ligas y registrar equipos.', 'Gestionar resultados y seguir clasificaciones.'],
    requiresTitle: 'Qué exigía',
    requires: 'Un sistema completo de autenticación y un modelo de datos relacional robusto.',
  },
  decisions: {
    title: 'Decisiones Técnicas',
    items: [
      { lead: 'Autenticación JWT manual:', text: 'Registro, login, protección de rutas y refresh tokens estructurados desde cero, sin depender de un servicio de Auth en la nube.' },
      { lead: 'API REST con Flask:', text: 'Endpoints diseñados profesionalmente, con separación de controladores, validación exhaustiva de payloads y manejo de errores consistente.' },
      { lead: 'Modelado Relacional (SQLAlchemy):', text: 'Relaciones complejas N:M (jugadores-equipos), 1:N (liga-equipos), foreign keys correctas y uso de constraints. Migraciones versionadas vía Alembic.' },
      { lead: 'Frontend integrado:', text: 'Componentes reutilizables React, manejo de estado global, consumo de API e intercepción de tokens JSON Web.' },
    ],
  },
  evolution: {
    title: 'La Evolución Profesional',
    pull: ['SportBarLeague fue el proyecto que ', 'consolidó los fundamentos imprescindibles del desarrollo backend serio', '.'],
    text: 'Después de orquestar autenticación, bases de datos relacionales y API REST de forma manual, el salto hacia arquitecturas más abstractas en proyectos superiores fue completamente natural: cada decisión avanzada en nuevos sistemas tiene sus raíces en lo asimilado aquí.',
  },
};

const en: SportBarLeagueCopy = {
  header: {
    tier: 'Technical Foundation',
    title: 'SportBarLeague',
    lede: 'Full-stack platform for managing sports events and leagues in bars. A complete JWT authentication system, advanced CRUD, robust relational modeling and image management with Cloudinary. The solid technical foundation that consolidated the fundamentals of professional backend development.',
    summary: {
      kind: 'Bootcamp project',
      role: 'Bootcamp project that consolidated the fundamentals of backend development, with its own frontend and API.',
      stack: stackNames,
      proves: [
        'JWT authentication with refresh tokens built by hand, without a cloud Auth service.',
        'Relational modeling with N:M and 1:N relationships, constraints and migrations versioned with Alembic.',
        'REST API with separated controllers, payload validation and consistent error handling.',
      ],
    },
    actions: ['View Repository'],
  },
  imageAlt: 'SportBarLeague interface',
  archTitle: 'Architecture',
  archLede: 'From the React interface to the relational database.',
  stackTitle: 'Tech Stack',
  stack: [
    ['Frontend', 'React 18 (Vite)'],
    ['Styling', 'Sass + Bootstrap 5'],
    ['Backend API', 'Flask (Python 3.13)'],
    ['Database', 'PostgreSQL + SQLAlchemy'],
    ['Deploy', 'Render (Docker)'],
  ],
  concept: {
    title: 'The Concept',
    pull: 'A platform for managing sports leagues in bars and pubs.',
    allowsTitle: 'What it allows',
    allows: ['Create leagues and register teams.', 'Manage results and follow standings.'],
    requiresTitle: 'What it demanded',
    requires: 'A complete authentication system and a robust relational data model.',
  },
  decisions: {
    title: 'Technical Decisions',
    items: [
      { lead: 'Manual JWT authentication:', text: 'Registration, login, route protection and refresh tokens structured from scratch, without relying on a cloud Auth service.' },
      { lead: 'REST API with Flask:', text: 'Professionally designed endpoints, with separated controllers, exhaustive payload validation and consistent error handling.' },
      { lead: 'Relational Modeling (SQLAlchemy):', text: 'Complex N:M (players-teams) and 1:N (league-teams) relationships, correct foreign keys and use of constraints. Migrations versioned through Alembic.' },
      { lead: 'Integrated frontend:', text: 'Reusable React components, global state management, API consumption and interception of JSON Web Tokens.' },
    ],
  },
  evolution: {
    title: 'The Professional Evolution',
    pull: ['SportBarLeague was the project that ', 'consolidated the essential fundamentals of serious backend development', '.'],
    text: 'After manually orchestrating authentication, relational databases and a REST API, the leap to more abstract architectures in later projects was completely natural: every advanced decision in newer systems has its roots in what was learned here.',
  },
};

const de: SportBarLeagueCopy = {
  header: {
    tier: 'Technisches Fundament',
    title: 'SportBarLeague',
    lede: 'Full-Stack-Plattform zur Verwaltung von Sportevents und Ligen in Bars. Ein vollständiges JWT-Authentifizierungssystem, fortgeschrittenes CRUD, robuste relationale Modellierung und Bildverwaltung mit Cloudinary. Das solide technische Fundament, das die Grundlagen der professionellen Backend-Entwicklung gefestigt hat.',
    summary: {
      kind: 'Bootcamp-Projekt',
      role: 'Bootcamp-Projekt, das die Grundlagen der Backend-Entwicklung gefestigt hat, mit eigenem Frontend und eigener API.',
      stack: stackNames,
      proves: [
        'JWT-Authentifizierung mit Refresh-Tokens, von Hand gebaut, ohne Cloud-Auth-Dienst.',
        'Relationale Modellierung mit N:M- und 1:N-Beziehungen, Constraints und mit Alembic versionierten Migrationen.',
        'REST-API mit getrennten Controllern, Payload-Validierung und konsistenter Fehlerbehandlung.',
      ],
    },
    actions: ['Repository ansehen'],
  },
  imageAlt: 'Oberfläche von SportBarLeague',
  archTitle: 'Architektur',
  archLede: 'Von der React-Oberfläche bis zur relationalen Datenbank.',
  stackTitle: 'Tech-Stack',
  stack: [
    ['Frontend', 'React 18 (Vite)'],
    ['Styling', 'Sass + Bootstrap 5'],
    ['Backend-API', 'Flask (Python 3.13)'],
    ['Datenbank', 'PostgreSQL + SQLAlchemy'],
    ['Deploy', 'Render (Docker)'],
  ],
  concept: {
    title: 'Das Konzept',
    pull: 'Plattform zur Verwaltung von Sportligen in Bars und Pubs.',
    allowsTitle: 'Was sie ermöglicht',
    allows: ['Ligen erstellen und Teams registrieren.', 'Ergebnisse verwalten und Tabellen verfolgen.'],
    requiresTitle: 'Was sie erforderte',
    requires: 'Ein vollständiges Authentifizierungssystem und ein robustes relationales Datenmodell.',
  },
  decisions: {
    title: 'Technische Entscheidungen',
    items: [
      { lead: 'Manuelle JWT-Authentifizierung:', text: 'Registrierung, Login, Routenschutz und Refresh-Tokens von Grund auf aufgebaut, ohne sich auf einen Cloud-Auth-Dienst zu stützen.' },
      { lead: 'REST-API mit Flask:', text: 'Professionell gestaltete Endpoints mit getrennten Controllern, umfassender Payload-Validierung und konsistenter Fehlerbehandlung.' },
      { lead: 'Relationale Modellierung (SQLAlchemy):', text: 'Komplexe N:M- (Spieler-Teams) und 1:N-Beziehungen (Liga-Teams), korrekte Foreign Keys und Einsatz von Constraints. Migrationen versioniert über Alembic.' },
      { lead: 'Integriertes Frontend:', text: 'Wiederverwendbare React-Komponenten, globales State-Management, API-Anbindung und Abfangen von JSON Web Tokens.' },
    ],
  },
  evolution: {
    title: 'Die berufliche Entwicklung',
    pull: ['SportBarLeague war das Projekt, das ', 'die unverzichtbaren Grundlagen ernsthafter Backend-Entwicklung gefestigt hat', '.'],
    text: 'Nachdem Authentifizierung, relationale Datenbanken und REST-API von Hand orchestriert worden waren, war der Sprung zu abstrakteren Architekturen in späteren Projekten völlig natürlich: Jede fortgeschrittene Entscheidung in neueren Systemen wurzelt in dem, was hier verinnerlicht wurde.',
  },
};

const fr: SportBarLeagueCopy = {
  header: {
    tier: 'Socle technique',
    title: 'SportBarLeague',
    lede: "Plateforme full-stack de gestion d'événements sportifs et de ligues dans les bars. Système complet d'authentification JWT, CRUD avancé, modélisation relationnelle robuste et gestion d'images avec Cloudinary. Le socle technique solide qui a consolidé les fondamentaux du développement backend professionnel.",
    summary: {
      kind: 'Projet de bootcamp',
      role: 'Projet de bootcamp qui a consolidé les fondamentaux du développement backend, avec son propre frontend et sa propre API.',
      stack: stackNames,
      proves: [
        "Authentification JWT avec refresh tokens construite à la main, sans service d'Auth dans le cloud.",
        'Modélisation relationnelle avec relations N:M et 1:N, contraintes et migrations versionnées avec Alembic.',
        "API REST avec séparation des contrôleurs, validation des payloads et gestion cohérente des erreurs.",
      ],
    },
    actions: ['Voir le repository'],
  },
  imageAlt: 'Interface de SportBarLeague',
  archTitle: 'Architecture',
  archLede: "De l'interface React à la base de données relationnelle.",
  stackTitle: 'Stack technique',
  stack: [
    ['Frontend', 'React 18 (Vite)'],
    ['Styles', 'Sass + Bootstrap 5'],
    ['API backend', 'Flask (Python 3.13)'],
    ['Base de données', 'PostgreSQL + SQLAlchemy'],
    ['Deploy', 'Render (Docker)'],
  ],
  concept: {
    title: 'Le concept',
    pull: 'Plateforme de gestion de ligues sportives dans les bars et les pubs.',
    allowsTitle: 'Ce qu\'elle permet',
    allows: ['Créer des ligues et inscrire des équipes.', 'Gérer les résultats et suivre les classements.'],
    requiresTitle: 'Ce qu\'elle exigeait',
    requires: "Un système d'authentification complet et un modèle de données relationnel robuste.",
  },
  decisions: {
    title: 'Décisions techniques',
    items: [
      { lead: 'Authentification JWT manuelle :', text: "Inscription, connexion, protection des routes et refresh tokens structurés de zéro, sans dépendre d'un service d'Auth dans le cloud." },
      { lead: 'API REST avec Flask :', text: 'Endpoints conçus de façon professionnelle, avec séparation des contrôleurs, validation exhaustive des payloads et gestion cohérente des erreurs.' },
      { lead: 'Modélisation relationnelle (SQLAlchemy) :', text: 'Relations complexes N:M (joueurs-équipes), 1:N (ligue-équipes), clés étrangères correctes et usage de contraintes. Migrations versionnées via Alembic.' },
      { lead: 'Frontend intégré :', text: "Composants React réutilisables, gestion d'état global, consommation de l'API et interception des JSON Web Tokens." },
    ],
  },
  evolution: {
    title: "L'évolution professionnelle",
    pull: ['SportBarLeague est le projet qui a ', 'consolidé les fondamentaux indispensables du développement backend sérieux', '.'],
    text: "Après avoir orchestré à la main l'authentification, les bases de données relationnelles et l'API REST, le saut vers des architectures plus abstraites dans les projets suivants a été tout naturel : chaque décision avancée dans les nouveaux systèmes a ses racines dans ce qui a été assimilé ici.",
  },
};

const it: SportBarLeagueCopy = {
  header: {
    tier: 'Base tecnica',
    title: 'SportBarLeague',
    lede: "Piattaforma full-stack per la gestione di eventi sportivi e leghe nei bar. Sistema completo di autenticazione JWT, CRUD avanzato, modellazione relazionale robusta e gestione delle immagini con Cloudinary. La solida base tecnica che ha consolidato i fondamenti dello sviluppo backend professionale.",
    summary: {
      kind: 'Progetto di bootcamp',
      role: 'Progetto di bootcamp che ha consolidato i fondamenti dello sviluppo backend, con frontend e API propri.',
      stack: stackNames,
      proves: [
        'Autenticazione JWT con refresh token costruita a mano, senza un servizio di Auth nel cloud.',
        'Modellazione relazionale con relazioni N:M e 1:N, vincoli e migrazioni versionate con Alembic.',
        'API REST con separazione dei controller, validazione dei payload e gestione coerente degli errori.',
      ],
    },
    actions: ['Vedi il repository'],
  },
  imageAlt: "Interfaccia di SportBarLeague",
  archTitle: 'Architettura',
  archLede: "Dall'interfaccia React al database relazionale.",
  stackTitle: 'Stack tecnologico',
  stack: [
    ['Frontend', 'React 18 (Vite)'],
    ['Stili', 'Sass + Bootstrap 5'],
    ['API backend', 'Flask (Python 3.13)'],
    ['Database', 'PostgreSQL + SQLAlchemy'],
    ['Deploy', 'Render (Docker)'],
  ],
  concept: {
    title: 'Il concetto',
    pull: 'Piattaforma per la gestione di leghe sportive in bar e pub.',
    allowsTitle: 'Cosa permette',
    allows: ['Creare leghe e registrare squadre.', 'Gestire i risultati e seguire le classifiche.'],
    requiresTitle: 'Cosa richiedeva',
    requires: 'Un sistema completo di autenticazione e un modello di dati relazionale robusto.',
  },
  decisions: {
    title: 'Decisioni tecniche',
    items: [
      { lead: 'Autenticazione JWT manuale:', text: 'Registrazione, login, protezione delle rotte e refresh token strutturati da zero, senza dipendere da un servizio di Auth nel cloud.' },
      { lead: 'API REST con Flask:', text: 'Endpoint progettati in modo professionale, con separazione dei controller, validazione esaustiva dei payload e gestione coerente degli errori.' },
      { lead: 'Modellazione relazionale (SQLAlchemy):', text: 'Relazioni complesse N:M (giocatori-squadre), 1:N (lega-squadre), foreign key corrette e uso di vincoli. Migrazioni versionate tramite Alembic.' },
      { lead: 'Frontend integrato:', text: "Componenti React riutilizzabili, gestione dello stato globale, consumo delle API e intercettazione dei JSON Web Token." },
    ],
  },
  evolution: {
    title: "L'evoluzione professionale",
    pull: ['SportBarLeague è stato il progetto che ha ', 'consolidato i fondamenti imprescindibili dello sviluppo backend serio', '.'],
    text: "Dopo aver orchestrato a mano autenticazione, database relazionali e API REST, il salto verso architetture più astratte nei progetti successivi è stato del tutto naturale: ogni decisione avanzata nei nuovi sistemi affonda le radici in quanto assimilato qui.",
  },
};

export const sportBarLeagueCopy: Record<Language, SportBarLeagueCopy> = { es, en, de, fr, it };
