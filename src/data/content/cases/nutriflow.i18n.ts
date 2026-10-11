// NutriFlow case page copy. `es` is the original text, byte for byte.
import type { Language } from '@/data/translations';
import type { NutriflowCopy } from './types';

const es: NutriflowCopy = {
  header: {
    tier: 'SaaS B2B',
    title: 'NutriFlow',
    lede: 'NutriFlow — Plataforma SaaS inteligente y en fase de crecimiento (Beta) diseñada para la gestión integral de la salud nutricional. Permite a los usuarios recibir dietas personalizadas y planes de ejercicio adaptados en tiempo real mediante el motor de IA Gemini 2.0. Actualmente el producto se encuentra en fase de expansión, optimizando la experiencia de usuario y la escalabilidad del sistema.',
    summary: {
      kind: 'Proyecto personal',
      role: 'Proyecto personal: SaaS B2B en fase Beta, con frontend, API y base de datos propios.',
      stack: ['Next.js 16', 'NestJS 11', 'Supabase (PostgreSQL)', 'Gemini 2.0 Flash', 'Tailwind CSS', 'Railway'],
      proves: [
        'Arquitectura separada: frontend en Next.js 16 y API modular en NestJS 11 desplegada en Railway.',
        'Autenticación por roles con Row Level Security directamente en la base de datos.',
        'Integración de IA generativa (Gemini) para generar planes de alimentación basados en macros.',
      ],
    },
    actions: ['Probar Demo', 'Ver Código'],
  },
  imageAlt: 'NutriFlow Dashboard',
  archTitle: 'Arquitectura',
  archLede: 'Cómo se conectan el frontend, la API, la base de datos y el motor de IA.',
  stackTitle: 'Stack Tecnológico',
  stack: [
    ['Frontend', 'Next.js 16 (React 19)'],
    ['Backend API', 'NestJS 11 (Railway)'],
    ['Estilos', 'Tailwind CSS 3.4'],
    ['Base de Datos', 'Supabase (PostgreSQL)'],
    ['IA Engine', 'Gemini 2.0 Flash'],
  ],
  problem: {
    title: 'El Problema',
    pull: 'Los nutricionistas independientes dedican parte de su tiempo a tareas administrativas.',
    items: ['Armar planes de alimentación manualmente.', 'Recordatorios de citas.', 'Gestión de pagos.'],
  },
  solution: {
    title: 'La Solución Tecnológica',
    pull: ['Un sistema centralizado, con la inteligencia en ', ' y el motor en tiempo real de ', '.'],
    frontend: { lead: 'Frontend', before: 'Ecosistema de ', after: ' para una velocidad de carga excepcional.' },
    backend: { lead: 'Backend', after: ' para una arquitectura modular y escalable en Railway.' },
    auth: ['Autenticación por roles usando ', ' directamente en la base de datos para garantizar la privacidad de los pacientes.'],
    generator: 'Generador de planes de alimentación automatizado basado en macros.',
  },
};

const en: NutriflowCopy = {
  header: {
    tier: 'B2B SaaS',
    title: 'NutriFlow',
    lede: 'NutriFlow — Smart SaaS platform in a growth phase (Beta), designed for comprehensive management of nutritional health. It lets users receive personalized diets and exercise plans adapted in real time through the Gemini 2.0 AI engine. The product is currently in an expansion phase, optimizing the user experience and the scalability of the system.',
    summary: {
      kind: 'Personal project',
      role: 'Personal project: B2B SaaS in Beta, with its own frontend, API and database.',
      stack: ['Next.js 16', 'NestJS 11', 'Supabase (PostgreSQL)', 'Gemini 2.0 Flash', 'Tailwind CSS', 'Railway'],
      proves: [
        'Separated architecture: Next.js 16 frontend and a modular NestJS 11 API deployed on Railway.',
        'Role-based authentication with Row Level Security directly in the database.',
        'Generative AI integration (Gemini) to generate macro-based meal plans.',
      ],
    },
    actions: ['Try Demo', 'View Code'],
  },
  imageAlt: 'NutriFlow Dashboard',
  archTitle: 'Architecture',
  archLede: 'How the frontend, the API, the database and the AI engine connect.',
  stackTitle: 'Tech Stack',
  stack: [
    ['Frontend', 'Next.js 16 (React 19)'],
    ['Backend API', 'NestJS 11 (Railway)'],
    ['Styling', 'Tailwind CSS 3.4'],
    ['Database', 'Supabase (PostgreSQL)'],
    ['AI Engine', 'Gemini 2.0 Flash'],
  ],
  problem: {
    title: 'The Problem',
    pull: 'Independent nutritionists spend part of their time on administrative tasks.',
    items: ['Building meal plans by hand.', 'Appointment reminders.', 'Payment management.'],
  },
  solution: {
    title: 'The Technical Solution',
    pull: ['A centralized system, with the intelligence in ', ' and the real-time engine of ', '.'],
    frontend: { lead: 'Frontend', before: 'The ', after: ' ecosystem for exceptional load speed.' },
    backend: { lead: 'Backend', after: ' for a modular, scalable architecture on Railway.' },
    auth: ['Role-based authentication using ', ' directly in the database to guarantee patient privacy.'],
    generator: 'Automated meal plan generator based on macros.',
  },
};

const de: NutriflowCopy = {
  header: {
    tier: 'B2B-SaaS',
    title: 'NutriFlow',
    lede: 'NutriFlow — Intelligente SaaS-Plattform in der Wachstumsphase (Beta) für das ganzheitliche Management der Ernährungsgesundheit. Sie ermöglicht es Nutzern, personalisierte Ernährungs- und Trainingspläne zu erhalten, die in Echtzeit durch die KI-Engine Gemini 2.0 angepasst werden. Das Produkt befindet sich derzeit in einer Ausbauphase und optimiert die Nutzererfahrung und die Skalierbarkeit des Systems.',
    summary: {
      kind: 'Persönliches Projekt',
      role: 'Persönliches Projekt: B2B-SaaS in der Beta-Phase, mit eigenem Frontend, eigener API und eigener Datenbank.',
      stack: ['Next.js 16', 'NestJS 11', 'Supabase (PostgreSQL)', 'Gemini 2.0 Flash', 'Tailwind CSS', 'Railway'],
      proves: [
        'Getrennte Architektur: Frontend in Next.js 16 und modulare API in NestJS 11, auf Railway deployt.',
        'Rollenbasierte Authentifizierung mit Row Level Security direkt in der Datenbank.',
        'Integration generativer KI (Gemini) zur Erstellung von Ernährungsplänen auf Makrobasis.',
      ],
    },
    actions: ['Demo ausprobieren', 'Code ansehen'],
  },
  imageAlt: 'NutriFlow Dashboard',
  archTitle: 'Architektur',
  archLede: 'Wie Frontend, API, Datenbank und KI-Engine zusammenhängen.',
  stackTitle: 'Tech-Stack',
  stack: [
    ['Frontend', 'Next.js 16 (React 19)'],
    ['Backend API', 'NestJS 11 (Railway)'],
    ['Styling', 'Tailwind CSS 3.4'],
    ['Datenbank', 'Supabase (PostgreSQL)'],
    ['KI-Engine', 'Gemini 2.0 Flash'],
  ],
  problem: {
    title: 'Das Problem',
    pull: 'Selbstständige Ernährungsberater verbringen einen Teil ihrer Zeit mit administrativen Aufgaben.',
    items: ['Ernährungspläne von Hand erstellen.', 'Terminerinnerungen.', 'Zahlungsverwaltung.'],
  },
  solution: {
    title: 'Die technische Lösung',
    pull: ['Ein zentrales System, dessen Intelligenz in ', ' und der Echtzeit-Engine von ', ' steckt.'],
    frontend: { lead: 'Frontend', before: 'Das ', after: '-Ökosystem für außergewöhnlich schnelle Ladezeiten.' },
    backend: { lead: 'Backend', after: ' für eine modulare und skalierbare Architektur auf Railway.' },
    auth: ['Rollenbasierte Authentifizierung mit ', ' direkt in der Datenbank, um die Privatsphäre der Patienten zu gewährleisten.'],
    generator: 'Automatisierter Generator für Ernährungspläne auf Makrobasis.',
  },
};

const fr: NutriflowCopy = {
  header: {
    tier: 'SaaS B2B',
    title: 'NutriFlow',
    lede: "NutriFlow — Plateforme SaaS intelligente en phase de croissance (Beta), conçue pour la gestion globale de la santé nutritionnelle. Elle permet aux utilisateurs de recevoir des régimes personnalisés et des programmes d'exercice adaptés en temps réel grâce au moteur d'IA Gemini 2.0. Le produit est actuellement en phase d'expansion, en optimisant l'expérience utilisateur et la scalabilité du système.",
    summary: {
      kind: 'Projet personnel',
      role: "Projet personnel : SaaS B2B en phase Beta, avec son propre frontend, sa propre API et sa propre base de données.",
      stack: ['Next.js 16', 'NestJS 11', 'Supabase (PostgreSQL)', 'Gemini 2.0 Flash', 'Tailwind CSS', 'Railway'],
      proves: [
        'Architecture séparée : frontend en Next.js 16 et API modulaire en NestJS 11 déployée sur Railway.',
        "Authentification par rôles avec Row Level Security directement dans la base de données.",
        "Intégration d'IA générative (Gemini) pour générer des plans alimentaires basés sur les macros.",
      ],
    },
    actions: ['Essayer la démo', 'Voir le code'],
  },
  imageAlt: 'NutriFlow Dashboard',
  archTitle: 'Architecture',
  archLede: "Comment le frontend, l'API, la base de données et le moteur d'IA sont connectés.",
  stackTitle: 'Stack technique',
  stack: [
    ['Frontend', 'Next.js 16 (React 19)'],
    ['Backend API', 'NestJS 11 (Railway)'],
    ['Styles', 'Tailwind CSS 3.4'],
    ['Base de données', 'Supabase (PostgreSQL)'],
    ['Moteur IA', 'Gemini 2.0 Flash'],
  ],
  problem: {
    title: 'Le problème',
    pull: 'Les nutritionnistes indépendants consacrent une partie de leur temps à des tâches administratives.',
    items: ['Élaborer les plans alimentaires à la main.', 'Rappels de rendez-vous.', 'Gestion des paiements.'],
  },
  solution: {
    title: 'La solution technologique',
    pull: ["Un système centralisé, avec l'intelligence dans ", ' et le moteur temps réel de ', '.'],
    frontend: { lead: 'Frontend', before: "L'écosystème ", after: ' pour une vitesse de chargement exceptionnelle.' },
    backend: { lead: 'Backend', after: ' pour une architecture modulaire et scalable sur Railway.' },
    auth: ['Authentification par rôles avec ', ' directement dans la base de données pour garantir la confidentialité des patients.'],
    generator: 'Générateur automatisé de plans alimentaires basé sur les macros.',
  },
};

const it: NutriflowCopy = {
  header: {
    tier: 'SaaS B2B',
    title: 'NutriFlow',
    lede: "NutriFlow — Piattaforma SaaS intelligente in fase di crescita (Beta), progettata per la gestione integrale della salute nutrizionale. Permette agli utenti di ricevere diete personalizzate e piani di allenamento adattati in tempo reale grazie al motore di IA Gemini 2.0. Attualmente il prodotto è in fase di espansione, ottimizzando l'esperienza utente e la scalabilità del sistema.",
    summary: {
      kind: 'Progetto personale',
      role: 'Progetto personale: SaaS B2B in fase Beta, con frontend, API e database propri.',
      stack: ['Next.js 16', 'NestJS 11', 'Supabase (PostgreSQL)', 'Gemini 2.0 Flash', 'Tailwind CSS', 'Railway'],
      proves: [
        'Architettura separata: frontend in Next.js 16 e API modulare in NestJS 11 distribuita su Railway.',
        'Autenticazione basata sui ruoli con Row Level Security direttamente nel database.',
        "Integrazione di IA generativa (Gemini) per generare piani alimentari basati sui macro.",
      ],
    },
    actions: ['Prova la demo', 'Vedi il codice'],
  },
  imageAlt: 'NutriFlow Dashboard',
  archTitle: 'Architettura',
  archLede: "Come si collegano il frontend, l'API, il database e il motore di IA.",
  stackTitle: 'Stack tecnologico',
  stack: [
    ['Frontend', 'Next.js 16 (React 19)'],
    ['Backend API', 'NestJS 11 (Railway)'],
    ['Stili', 'Tailwind CSS 3.4'],
    ['Database', 'Supabase (PostgreSQL)'],
    ['Motore IA', 'Gemini 2.0 Flash'],
  ],
  problem: {
    title: 'Il problema',
    pull: 'I nutrizionisti indipendenti dedicano parte del loro tempo ad attività amministrative.',
    items: ['Preparare i piani alimentari a mano.', 'Promemoria degli appuntamenti.', 'Gestione dei pagamenti.'],
  },
  solution: {
    title: 'La soluzione tecnologica',
    pull: ["Un sistema centralizzato, con l'intelligenza in ", ' e il motore in tempo reale di ', '.'],
    frontend: { lead: 'Frontend', before: "L'ecosistema ", after: ' per una velocità di caricamento eccezionale.' },
    backend: { lead: 'Backend', after: ' per un\'architettura modulare e scalabile su Railway.' },
    auth: ['Autenticazione basata sui ruoli con ', ' direttamente nel database per garantire la privacy dei pazienti.'],
    generator: 'Generatore automatizzato di piani alimentari basato sui macro.',
  },
};

export const nutriflowCopy: Record<Language, NutriflowCopy> = { es, en, de, fr, it };
