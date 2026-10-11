// TallerCardonal.es case page copy. `es` is the original text, byte for byte.
import type { Language } from '@/data/translations';
import type { TallerCardonalCopy } from './types';

const stackNames = ['React 19', 'Vite 7', 'CSS 3', 'Vercel', 'EmailJS', 'GA4', 'Google Ads'];

const es: TallerCardonalCopy = {
  header: {
    tier: 'Client Delivery',
    title: 'TallerCardonal.es',
    lede: 'Proyecto real entregado a cliente. Gestión completa end-to-end: desde la toma de requisitos hasta el deploy en producción y el handoff.',
    summary: {
      kind: 'Proyecto para cliente real',
      role: 'Proyecto para cliente, gestionado de extremo a extremo: requisitos, diseño, desarrollo, deploy y entrega.',
      stack: stackNames,
      proves: [
        'Entrega real a cliente, desde la toma de requisitos hasta el handoff con documentación de uso.',
        'Web en producción con dominio propio del cliente, optimizada con WebP, lazy loading y SEO.',
        'Criterio para adaptar la arquitectura al contexto, sin sobredimensionar.',
      ],
    },
    actions: ['Ver Web en Producción'],
  },
  imageAlt: 'TallerCardonal Web',
  archTitle: 'Arquitectura',
  archLede: 'Qué piezas componen la web y a qué servicios se conecta.',
  stackTitle: 'Stack Tecnológico',
  stack: [
    ['Frontend', 'React 19 (Vite 7)'],
    ['Estilos', 'Custom CSS 3'],
    ['Deploy', 'Vercel'],
    ['Contacto', 'EmailJS'],
    ['Marketing', 'GA4 + Google Ads'],
  ],
  context: {
    title: 'El Contexto',
    pull: 'Un taller mecánico necesitaba presencia digital profesional.',
    subTitle: 'Qué debía lograr la web',
    items: ['Transmitir confianza.', 'Mostrar servicios.', 'Facilitar el contacto.', 'Funcionar perfectamente en móvil.'],
  },
  process: {
    title: 'El Proceso Profesional',
    items: [
      { lead: 'Discovery:', text: 'Reuniones con el cliente para entender el negocio, los servicios principales, la propuesta de valor y el público objetivo.' },
      { lead: 'Diseño UX:', text: 'Propuesta visual enfocada en confianza y accesibilidad, con CTA claros y navegación intuitiva.' },
      { lead: 'Desarrollo:', text: 'Implementación con React.js + Custom CSS 3. Componentes modulares y reutilizables. Responsive design mobile-first.' },
      { lead: 'Optimización:', text: 'Imágenes optimizadas en formato WebP, lazy loading, metadata SEO completamente configurada.' },
      { lead: 'Entrega:', text: 'Deploy en Vercel con dominio personalizado del cliente. Documentación de uso entregada. Periodo de soporte post-lanzamiento.' },
    ],
  },
  impact: {
    title: 'Impacto Real',
    pull: ['No todos los proyectos necesitan un monorepo y 10 microservicios. ', 'Saber adaptar la arquitectura al contexto', ' es una habilidad clave.'],
    items: [
      'Web en producción activa.',
      'Lighthouse (oct. 2026, mediana de 3 ejecuciones): Accesibilidad 98, Buenas prácticas 100 y SEO 100.',
      'Reducción a cero de la dependencia del cliente de redes sociales como única presencia digital.',
    ],
  },
};

const en: TallerCardonalCopy = {
  header: {
    tier: 'Client Delivery',
    title: 'TallerCardonal.es',
    lede: 'A real project delivered to a client. Full end-to-end management: from requirements gathering through production deployment and handoff.',
    summary: {
      kind: 'Real client project',
      role: 'Client project managed end to end: requirements, design, development, deployment and delivery.',
      stack: stackNames,
      proves: [
        'Real client delivery, from requirements gathering to a handoff with usage documentation.',
        "Website live in production on the client's own domain, optimized with WebP, lazy loading and SEO.",
        'Judgment to adapt the architecture to the context without over-engineering.',
      ],
    },
    actions: ['View Live Website'],
  },
  imageAlt: 'TallerCardonal website',
  archTitle: 'Architecture',
  archLede: 'The pieces that make up the website and the services it connects to.',
  stackTitle: 'Tech Stack',
  stack: [
    ['Frontend', 'React 19 (Vite 7)'],
    ['Styling', 'Custom CSS 3'],
    ['Deploy', 'Vercel'],
    ['Contact', 'EmailJS'],
    ['Marketing', 'GA4 + Google Ads'],
  ],
  context: {
    title: 'The Context',
    pull: 'A car repair shop needed a professional digital presence.',
    subTitle: 'What the website had to achieve',
    items: ['Build trust.', 'Showcase services.', 'Make it easy to get in touch.', 'Work flawlessly on mobile.'],
  },
  process: {
    title: 'The Professional Process',
    items: [
      { lead: 'Discovery:', text: 'Meetings with the client to understand the business, the main services, the value proposition and the target audience.' },
      { lead: 'UX design:', text: 'Visual proposal focused on trust and accessibility, with clear CTAs and intuitive navigation.' },
      { lead: 'Development:', text: 'Built with React.js + Custom CSS 3. Modular, reusable components. Mobile-first responsive design.' },
      { lead: 'Optimization:', text: 'Images optimized in WebP format, lazy loading, fully configured SEO metadata.' },
      { lead: 'Delivery:', text: "Deployment on Vercel under the client's custom domain. Usage documentation delivered. Post-launch support period." },
    ],
  },
  impact: {
    title: 'Real Impact',
    pull: ['Not every project needs a monorepo and 10 microservices. ', 'Knowing how to adapt the architecture to the context', ' is a key skill.'],
    items: [
      'Website live and active in production.',
      'Lighthouse (Oct. 2026, median of 3 runs): Accessibility 98, Best Practices 100 and SEO 100.',
      'The client no longer depends on social media as its only digital presence.',
    ],
  },
};

const de: TallerCardonalCopy = {
  header: {
    tier: 'Kundenauftrag',
    title: 'TallerCardonal.es',
    lede: 'Ein echtes, für einen Kunden umgesetztes Projekt. Vollständiges End-to-End-Management: von der Anforderungsaufnahme bis zum Produktiv-Deployment und zur Übergabe.',
    summary: {
      kind: 'Echtes Kundenprojekt',
      role: 'Kundenprojekt, von Anfang bis Ende betreut: Anforderungen, Design, Entwicklung, Deployment und Übergabe.',
      stack: stackNames,
      proves: [
        'Echte Kundenlieferung, von der Anforderungsaufnahme bis zur Übergabe mit Nutzungsdokumentation.',
        'Live geschaltete Website auf der eigenen Domain des Kunden, optimiert mit WebP, Lazy Loading und SEO.',
        'Urteilsvermögen, die Architektur an den Kontext anzupassen, ohne sie zu überdimensionieren.',
      ],
    },
    actions: ['Live-Website ansehen'],
  },
  imageAlt: 'Website von TallerCardonal',
  archTitle: 'Architektur',
  archLede: 'Aus welchen Teilen die Website besteht und mit welchen Diensten sie verbunden ist.',
  stackTitle: 'Tech-Stack',
  stack: [
    ['Frontend', 'React 19 (Vite 7)'],
    ['Styling', 'Custom CSS 3'],
    ['Deploy', 'Vercel'],
    ['Kontakt', 'EmailJS'],
    ['Marketing', 'GA4 + Google Ads'],
  ],
  context: {
    title: 'Der Kontext',
    pull: 'Eine Kfz-Werkstatt brauchte einen professionellen digitalen Auftritt.',
    subTitle: 'Was die Website leisten sollte',
    items: ['Vertrauen schaffen.', 'Leistungen präsentieren.', 'Die Kontaktaufnahme erleichtern.', 'Auf dem Smartphone einwandfrei funktionieren.'],
  },
  process: {
    title: 'Der professionelle Prozess',
    items: [
      { lead: 'Discovery:', text: 'Gespräche mit dem Kunden, um das Geschäft, die Hauptleistungen, das Wertversprechen und die Zielgruppe zu verstehen.' },
      { lead: 'UX-Design:', text: 'Visueller Entwurf mit Fokus auf Vertrauen und Barrierefreiheit, mit klaren CTAs und intuitiver Navigation.' },
      { lead: 'Entwicklung:', text: 'Umsetzung mit React.js + Custom CSS 3. Modulare, wiederverwendbare Komponenten. Mobile-first Responsive Design.' },
      { lead: 'Optimierung:', text: 'Bilder im WebP-Format optimiert, Lazy Loading, vollständig konfigurierte SEO-Metadaten.' },
      { lead: 'Übergabe:', text: 'Deployment auf Vercel mit eigener Domain des Kunden. Nutzungsdokumentation übergeben. Support-Zeitraum nach dem Launch.' },
    ],
  },
  impact: {
    title: 'Realer Nutzen',
    pull: ['Nicht jedes Projekt braucht ein Monorepo und 10 Microservices. ', 'Die Architektur an den Kontext anpassen zu können', ' ist eine Schlüsselkompetenz.'],
    items: [
      'Website aktiv im Produktivbetrieb.',
      'Lighthouse (Okt. 2026, Median aus 3 Durchläufen): Barrierefreiheit 98, Best Practices 100 und SEO 100.',
      'Der Kunde ist nicht mehr darauf angewiesen, soziale Netzwerke als einzige digitale Präsenz zu nutzen.',
    ],
  },
};

const fr: TallerCardonalCopy = {
  header: {
    tier: 'Livraison client',
    title: 'TallerCardonal.es',
    lede: "Projet réel livré à un client. Gestion complète de bout en bout : du recueil des besoins jusqu'au déploiement en production et à la passation.",
    summary: {
      kind: 'Projet pour un client réel',
      role: 'Projet client géré de bout en bout : besoins, conception, développement, déploiement et livraison.',
      stack: stackNames,
      proves: [
        "Livraison réelle à un client, du recueil des besoins à la passation avec documentation d'utilisation.",
        'Site en production sur le domaine propre du client, optimisé avec WebP, lazy loading et SEO.',
        "Discernement pour adapter l'architecture au contexte, sans la surdimensionner.",
      ],
    },
    actions: ['Voir le site en production'],
  },
  imageAlt: 'Site web de TallerCardonal',
  archTitle: 'Architecture',
  archLede: 'Les éléments qui composent le site et les services auxquels il se connecte.',
  stackTitle: 'Stack technique',
  stack: [
    ['Frontend', 'React 19 (Vite 7)'],
    ['Styles', 'Custom CSS 3'],
    ['Deploy', 'Vercel'],
    ['Contact', 'EmailJS'],
    ['Marketing', 'GA4 + Google Ads'],
  ],
  context: {
    title: 'Le contexte',
    pull: "Un garage automobile avait besoin d'une présence numérique professionnelle.",
    subTitle: 'Ce que le site devait accomplir',
    items: ['Inspirer confiance.', 'Présenter les services.', 'Faciliter la prise de contact.', 'Fonctionner parfaitement sur mobile.'],
  },
  process: {
    title: 'Le processus professionnel',
    items: [
      { lead: 'Discovery :', text: "Réunions avec le client pour comprendre l'activité, les services principaux, la proposition de valeur et le public cible." },
      { lead: 'Design UX :', text: "Proposition visuelle axée sur la confiance et l'accessibilité, avec des CTA clairs et une navigation intuitive." },
      { lead: 'Développement :', text: 'Mise en œuvre avec React.js + Custom CSS 3. Composants modulaires et réutilisables. Responsive design mobile-first.' },
      { lead: 'Optimisation :', text: 'Images optimisées au format WebP, lazy loading, métadonnées SEO entièrement configurées.' },
      { lead: 'Livraison :', text: "Déploiement sur Vercel avec le domaine personnalisé du client. Documentation d'utilisation remise. Période de support après le lancement." },
    ],
  },
  impact: {
    title: 'Impact réel',
    pull: ["Tous les projets n'ont pas besoin d'un monorepo et de 10 microservices. ", "Savoir adapter l'architecture au contexte", ' est une compétence clé.'],
    items: [
      'Site actif en production.',
      'Lighthouse (oct. 2026, médiane de 3 exécutions) : Accessibilité 98, Bonnes pratiques 100 et SEO 100.',
      'Le client ne dépend plus des réseaux sociaux comme seule présence numérique.',
    ],
  },
};

const it: TallerCardonalCopy = {
  header: {
    tier: 'Consegna al cliente',
    title: 'TallerCardonal.es',
    lede: 'Progetto reale consegnato a un cliente. Gestione completa end to end: dalla raccolta dei requisiti al deploy in produzione e al passaggio di consegne.',
    summary: {
      kind: 'Progetto per un cliente reale',
      role: 'Progetto per un cliente, gestito end to end: requisiti, design, sviluppo, deploy e consegna.',
      stack: stackNames,
      proves: [
        "Consegna reale a un cliente, dalla raccolta dei requisiti al passaggio di consegne con documentazione d'uso.",
        'Sito in produzione sul dominio proprio del cliente, ottimizzato con WebP, lazy loading e SEO.',
        "Giudizio nell'adattare l'architettura al contesto, senza sovradimensionarla.",
      ],
    },
    actions: ['Vedi il sito in produzione'],
  },
  imageAlt: 'Sito web di TallerCardonal',
  archTitle: 'Architettura',
  archLede: 'Quali componenti formano il sito e a quali servizi si collega.',
  stackTitle: 'Stack tecnologico',
  stack: [
    ['Frontend', 'React 19 (Vite 7)'],
    ['Stili', 'Custom CSS 3'],
    ['Deploy', 'Vercel'],
    ['Contatto', 'EmailJS'],
    ['Marketing', 'GA4 + Google Ads'],
  ],
  context: {
    title: 'Il contesto',
    pull: "Un'officina meccanica aveva bisogno di una presenza digitale professionale.",
    subTitle: 'Cosa doveva ottenere il sito',
    items: ['Trasmettere fiducia.', 'Mostrare i servizi.', 'Facilitare il contatto.', 'Funzionare perfettamente su mobile.'],
  },
  process: {
    title: 'Il processo professionale',
    items: [
      { lead: 'Discovery:', text: "Incontri con il cliente per capire l'attività, i servizi principali, la proposta di valore e il pubblico di riferimento." },
      { lead: 'Design UX:', text: 'Proposta visiva incentrata su fiducia e accessibilità, con CTA chiare e navigazione intuitiva.' },
      { lead: 'Sviluppo:', text: 'Implementazione con React.js + Custom CSS 3. Componenti modulari e riutilizzabili. Responsive design mobile-first.' },
      { lead: 'Ottimizzazione:', text: 'Immagini ottimizzate in formato WebP, lazy loading, metadati SEO configurati completamente.' },
      { lead: 'Consegna:', text: "Deploy su Vercel con il dominio personalizzato del cliente. Documentazione d'uso consegnata. Periodo di supporto post-lancio." },
    ],
  },
  impact: {
    title: 'Impatto reale',
    pull: ['Non tutti i progetti hanno bisogno di un monorepo e di 10 microservizi. ', "Saper adattare l'architettura al contesto", ' è una competenza chiave.'],
    items: [
      'Sito attivo in produzione.',
      'Lighthouse (ott. 2026, mediana di 3 esecuzioni): Accessibilità 98, Best practice 100 e SEO 100.',
      'Il cliente non dipende più dai social network come unica presenza digitale.',
    ],
  },
};

export const tallerCardonalCopy: Record<Language, TallerCardonalCopy> = { es, en, de, fr, it };
