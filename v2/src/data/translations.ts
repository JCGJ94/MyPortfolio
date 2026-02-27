export type Language = 'es' | 'en' | 'de' | 'fr' | 'it';

export const translations = {
    es: {
        nav: {
            home: 'Inicio',
            projects: 'Proyectos',
            about: 'Sobre mí',
            nutriflow: 'NutriFlow',
            cv: 'CV',
            cta: 'Área Técnica'
        },
        hero: {
            badge: 'Disponible para nuevas oportunidades en equipos técnicos',
            title: "Hola, soy",
            name: "JoseC González,",
            roles: [
                "Full Stack Developer",
                "Frontend Developer (React.js, Next.js)",
                "Python & Flask Developer",
                "Node.js Backend Developer",
                "PostgreSQL & REST API Builder"
            ],
            titleSpan: 'Full Stack',
            titleEnd: 'con foco en producto.',
            description: 'Desarrollador Full Stack con una base técnica y mentalidad orientada a producto. Combino la rigurosidad de la arquitectura moderna (Node.js o Python) con la experiencia práctica de entregar proyectos reales a clientes finales. Mi enfoque se centra en construir soluciones que no solo funcionen, sino que sean mantenibles y seguras, integrando la Inteligencia Artificial como catalizador para optimizar flujos de desarrollo y calidad de entrega.',
            caseStudy: 'Ver Caso NutriFlow',
            viewProjects: 'Ver Proyectos',
            downloadCv: 'Descargar CV (PDF)'
        },
        about: {
            title: 'Desarrollo de Software',
            titleSpan: 'enfocado en resultados.',
            p1: 'Mi trabajo se centra en construir sistemas donde la lógica de negocio y la experiencia de usuario se unen para resolver necesidades reales.',
            p2: 'Con una base técnica que evoluciona desde mi formación inicial en Informática (2009) hasta mi reciente especialización como Full Stack Developer, entrego soluciones funcionales integrando Frontend y Backend.',
            p3: 'He trabajado en el desarrollo de APIs REST robustas y la digitalización de negocios, priorizando siempre la simplicidad y el código que se pueda mantener sin complicaciones.',
            p4: 'Actualmente creciendo con Next.js y TypeScript, utilizando la Inteligencia Artificial como un apoyo estratégico para mejorar la calidad y velocidad de mis entregas.',
            stats: {
                profile: 'Perfil Profesional',
                modeling: 'Modelado de Datos',
                production: 'Sistemas en Producción',
                workflow: 'Workflow Moderno'
            }
        },
        projects: {
            title: 'Proyectos',
            titleSpan: 'Destacados',
            description: 'Sistemas que he diseñado, arquitectado y construido con un enfoque en escalabilidad, seguridad y UX real.',
            viewProject: 'Ver Proyecto'
        },
        stack: {
            title: 'Stack',
            titleSpan: 'Técnico',
            description: 'Tecnologías y herramientas que utilizo para construir sistemas robustos, mejoradas con flujos de trabajo eficientes.',
            categories: {
                frontend: 'Frontend',
                backend: 'Backend',
                database: 'Base de Datos',
                infrastructure: 'Infraestructura',
                ia: 'Herramientas de IA',
                development: 'Desarrollo & Herramientas',
                marketing: 'Marketing Digital',
                communication: 'Comunicación & Idiomas'
            }
        },
        contact: {
            title: 'Empezar un',
            titleSpan: 'proyecto',
            description: 'Si estás interesado en trabajar juntos en tu próximo gran producto, llena el formulario y hablemos.',
            guarantee: 'Respuesta garantizada en menos de 24h',
            writeMe: 'Escríbeme',
            chat: 'WhatsApp / Telegram',
            chatStatus: 'Disponible para chat técnico',
            coffee: '¿Prefieres un café?',
            location: 'Residente en el Sur de Tenerife, España.',
            formName: 'Nombre',
            formNamePlaceholder: 'Tu nombre completo',
            formEmail: 'Email',
            formEmailPlaceholder: 'tu@email.com',
            formMessage: '¿Cómo puedo ayudarte?',
            formMessagePlaceholder: 'Cuéntame sobre tu proyecto...',
            formSubmit: 'Enviar Mensaje',
            formSubmitting: 'Trabajando en ello...',
            successTitle: '¡Mensaje Recibido!',
            successMsg: (name: string) => `Gracias por contactarme, ${name}. He enviado un correo de confirmación automática y me pondré en contacto contigo personalmente muy pronto.`,
            sendAnother: 'Enviar otro mensaje'
        },
        footer: {
            description: 'Desarrollador Full Stack especializado en construir soluciones digitales escalables y centradas en el usuario.',
            navTitle: 'Navegación',
            resourcesTitle: 'Recursos',
            contact: 'Contacto',
            rights: 'Todos los derechos reservados'
        }
    },
    en: {
        nav: {
            home: 'Home',
            projects: 'Projects',
            about: 'About',
            nutriflow: 'NutriFlow',
            cv: 'CV',
            cta: 'Technical Area'
        },
        hero: {
            badge: 'Available for new opportunities in technical teams',
            title: "Hi, I'm",
            name: "JoseC González,",
            roles: [
                "Full Stack Developer",
                "Frontend Developer (React.js, Next.js)",
                "Python & Flask Developer",
                "Node.js Backend Developer",
                "PostgreSQL & REST API Builder"
            ],
            titleSpan: 'Development',
            titleEnd: 'with product focus.',
            description: 'Full Stack Developer with a technical foundation and product-oriented mindset. I combine modern architecture rigor (Node.js or Python) with hands-on experience delivering real projects to end clients. My focus is on building solutions that not only work but are maintainable and secure, integrating Artificial Intelligence as a catalyst to optimize development workflows and delivery quality.',
            caseStudy: 'View Case NutriFlow',
            viewProjects: 'View Projects',
            downloadCv: 'Download CV (PDF)'
        },
        about: {
            title: 'Software Development',
            titleSpan: 'focused on results.',
            p1: 'My work focuses on building systems where business logic and user experience come together to solve real needs.',
            p2: 'With a technical base evolving from my initial computer science training (2009) to my recent specialization as a Full Stack Developer, I deliver functional solutions integrating Frontend and Backend.',
            p3: 'I have worked on developing robust REST APIs and business digitalization, always prioritizing simplicity and maintainable code.',
            p4: 'Currently growing with Next.js and TypeScript, using AI as a strategic support to improve delivery quality and speed.',
            stats: {
                profile: 'Professional Profile',
                modeling: 'Data Modeling',
                production: 'Production Systems',
                workflow: 'Modern Workflow'
            }
        },
        projects: {
            title: 'Featured',
            titleSpan: 'Projects',
            description: 'Systems I have designed, architected, and built with a focus on scalability, security, and real UX.',
            viewProject: 'View Project'
        },
        stack: {
            title: 'Technical',
            titleSpan: 'Stack',
            description: 'Technologies and tools I use to build robust systems, enhanced with efficient workflows.',
            categories: {
                frontend: 'Frontend',
                backend: 'Backend',
                database: 'Database',
                infrastructure: 'Infrastructure',
                ia: 'AI Tooling',
                development: 'Development & Tools',
                marketing: 'Digital Marketing',
                communication: 'Communication & Languages'
            }
        },
        contact: {
            title: 'Start a',
            titleSpan: 'project',
            description: 'If you are interested in working together on your next big product, fill out the form and let\'s talk.',
            guarantee: 'Guaranteed response in less than 24h',
            writeMe: 'Write me',
            chat: 'WhatsApp / Telegram',
            chatStatus: 'Available for technical chat',
            coffee: 'Prefer a coffee?',
            location: 'Resident in South Tenerife, Spain.',
            formName: 'Name',
            formNamePlaceholder: 'Your full name',
            formEmail: 'Email',
            formEmailPlaceholder: 'your@email.com',
            formMessage: 'How can I help you?',
            formMessagePlaceholder: 'Tell me about your project...',
            formSubmit: 'Send Message',
            formSubmitting: 'Working on it...',
            successTitle: 'Message Received!',
            successMsg: (name: string) => `Thank you for contacting me, ${name}. I have sent an automatic confirmation and will get in touch personally very soon.`,
            sendAnother: 'Send another message'
        },
        footer: {
            description: 'Full Stack Developer specialized in building scalable and user-centered digital solutions.',
            navTitle: 'Navigation',
            resourcesTitle: 'Resources',
            contact: 'Contact',
            rights: 'All rights reserved'
        }
    },
    de: {
        nav: { home: 'Start', projects: 'Projekte', about: 'Über mich', nutriflow: 'NutriFlow', cv: 'CV', cta: 'Technikbereich' },
        hero: {
            badge: 'Verfügbar für neue Möglichkeiten in technischen Teams',
            title: "Hallo, ich bin",
            name: "JoseC González,",
            roles: [
                "Full Stack Developer",
                "Frontend Developer (React.js, Next.js)",
                "Python & Flask Developer",
                "Node.js Backend Developer",
                "PostgreSQL & REST API Builder"
            ],
            titleSpan: 'Entwicklung',
            titleEnd: 'mit Produktfokus.',
            description: 'Ich verwandle Ideen in funktionale digitale Lösungen. Spezialisiert auf das JavaScript-Ökosystem (React.js, Node.js, Next.js) und Python (Flask), mit Praxiserfahrung und Engagement für Best Practices.',
            caseStudy: 'NutriFlow Fallstudie',
            viewProjects: 'Projekte ansehen',
            downloadCv: 'CV herunterladen (PDF)'
        },
        about: {
            title: 'Softwareentwicklung',
            titleSpan: 'ergebnisorientiert.',
            p1: 'Meine Arbeit konzentriert sich darauf, Systeme zu bauen, in denen Geschäftslogik und Benutzererfahrung zusammenkommen.',
            p2: 'Von der Ausbildung 2009 bis zur Spezialisierung als Full Stack Developer liefere ich funktionale Lösungen.',
            p3: 'Ich habe robuste REST-APIs entwickelt und Unternehmen digitalisiert.',
            p4: 'Derzeit wachse ich mit Next.js und TypeScript, unterstützt durch KI.',
            stats: {
                profile: 'Beruflicher Werdegang',
                modeling: 'Datenmodellierung',
                production: 'Produktionssysteme',
                workflow: 'Moderner Workflow'
            }
        },
        projects: {
            title: 'Ausgewählte',
            titleSpan: 'Projekte',
            description: 'Systeme, die ich mit Fokus auf Skalierbarkeit, Sicherheit und echte UX entworfen habe.',
            viewProject: 'Projekt ansehen'
        },
        stack: {
            title: 'Tech',
            titleSpan: 'Stack',
            description: 'Technologien und Tools, die ich für robuste Systeme nutze.',
            categories: {
                frontend: 'Frontend',
                backend: 'Backend',
                database: 'Datenbank',
                infrastructure: 'Infrastruktur',
                ia: 'KI-Tools',
                development: 'Entwicklung & Tools',
                marketing: 'Digitales Marketing',
                communication: 'Kommunikation & Sprachen'
            }
        },
        contact: {
            title: 'Projekt',
            titleSpan: 'starten',
            description: 'Interessiert an einer Zusammenarbeit? Füllen Sie das Formular aus.',
            guarantee: 'Antwort in weniger als 24 Std.',
            writeMe: 'Schreiben Sie mir',
            chat: 'WhatsApp / Telegram',
            chatStatus: 'Verfügbar für Chat',
            coffee: 'Lieber einen Kaffee?',
            location: 'Wohnhaft im Süden von Teneriffa, Spanien.',
            formName: 'Name',
            formNamePlaceholder: 'Vollständiger Name',
            formEmail: 'Email',
            formEmailPlaceholder: 'ihre@email.de',
            formMessage: 'Wie kann ich helfen?',
            formMessagePlaceholder: 'Erzählen Sie mir von Ihrem Projekt...',
            formSubmit: 'Nachricht senden',
            formSubmitting: 'Wird gesendet...',
            successTitle: 'Nachricht erhalten!',
            successMsg: (name: string) => `Danke, ${name}. Ich melde mich bald persönlich.`,
            sendAnother: 'Weitere Nachricht'
        },
        footer: {
            description: 'Full-Stack-Entwickler, spezialisiert auf skalierbare und benutzerzentrierte digitale Lösungen.',
            navTitle: 'Navigation',
            resourcesTitle: 'Ressourcen',
            contact: 'Kontakt',
            rights: 'Alle Rechte vorbehalten'
        }
    },
    fr: {
        nav: { home: 'Accueil', projects: 'Projets', about: 'À propos', nutriflow: 'NutriFlow', cv: 'CV', cta: 'Zone Technique' },
        hero: {
            badge: 'Disponible pour de nouvelles opportunités',
            title: "Bonjour, je suis",
            name: "JoseC González,",
            roles: [
                "Full Stack Developer",
                "Frontend Developer (React.js, Next.js)",
                "Python & Flask Developer",
                "Node.js Backend Developer",
                "PostgreSQL & REST API Builder"
            ],
            titleSpan: 'Full Stack',
            titleEnd: 'axé sur le produit.',
            description: 'Je transforme des idées en solutions numériques. Spécialisé en JavaScript (React.js, Node.js, Next.js) et Python (Flask).',
            caseStudy: 'Voir NutriFlow',
            viewProjects: 'Voir Projets',
            downloadCv: 'Télécharger CV (PDF)'
        },
        about: {
            title: 'Développement Logiciel',
            titleSpan: 'axé sur les résultats.',
            p1: 'Mon travail se concentre sur la création de systèmes où la logique métier et l\'expérience utilisateur s\'unissent.',
            p2: 'De ma formation en 2009 à ma spécialisation Full Stack, je fournis des solutions fonctionnelles.',
            p3: 'J\'ai développé des API REST robustes et numérisé des entreprises.',
            p4: 'Actuellement, je progresse avec Next.js et TypeScript, en utilisant l\'IA comme soutien.',
            stats: {
                profile: 'Profil Professionnel',
                modeling: 'Modélisation de Données',
                production: 'Systèmes en Production',
                workflow: 'Workflow Moderne'
            }
        },
        projects: {
            title: 'Projets',
            titleSpan: 'Vedettes',
            description: 'Systèmes conçus avec un accent sur l\'évolutivité et l\'UX réelle.',
            viewProject: 'Voir le Projet'
        },
        stack: {
            title: 'Stack',
            titleSpan: 'Technique',
            description: 'Technologies et outils utilisés pour des systèmes robustes.',
            categories: {
                frontend: 'Frontend',
                backend: 'Backend',
                database: 'Base de données',
                infrastructure: 'Infrastructure',
                ia: 'Outils IA',
                development: 'Développement & Outils',
                marketing: 'Marketing Digital',
                communication: 'Communication & Langues'
            }
        },
        contact: {
            title: 'Démarrer un',
            titleSpan: 'projet',
            description: 'Intéressé par une collaboration ? Remplissez le formulaire.',
            guarantee: 'Réponse en moins de 24h',
            writeMe: 'Contactez-moi',
            chat: 'WhatsApp / Telegram',
            chatStatus: 'Disponible',
            coffee: 'Un café ?',
            location: 'Résident dans le sud de Tenerife, Espagne.',
            formName: 'Nom',
            formNamePlaceholder: 'Nom complet',
            formEmail: 'Email',
            formEmailPlaceholder: 'votre@email.fr',
            formMessage: 'Comment aider ?',
            formMessagePlaceholder: 'Parlez-moi de votre projet...',
            formSubmit: 'Envoyer',
            formSubmitting: 'Envoi...',
            successTitle: 'Message reçu !',
            successMsg: (name: string) => `Merci ${name}. Je vous recontacte très bientôt.`,
            sendAnother: 'Envoyer un autre'
        },
        footer: {
            description: 'Développeur Full Stack spécialisé en solutions digitales évolutives et centrées sur l\'utilisateur.',
            navTitle: 'Navigation',
            resourcesTitle: 'Ressources',
            contact: 'Contact',
            rights: 'Tous droits réservés'
        }
    },
    it: {
        nav: { home: 'Inizio', projects: 'Progetti', about: 'Su di me', nutriflow: 'NutriFlow', cv: 'CV', cta: 'Area Tecnica' },
        hero: {
            badge: 'Disponibile per nuove opportunità',
            title: "Ciao, sono",
            name: "JoseC González,",
            roles: [
                "Full Stack Developer",
                "Frontend Developer (React.js, Next.js)",
                "Python & Flask Developer",
                "Node.js Backend Developer",
                "PostgreSQL & REST API Builder"
            ],
            titleSpan: 'Full Stack',
            titleEnd: 'orientato al prodotto.',
            description: 'Trasformo idee in soluzioni digitali. Specializzato in JavaScript (React.js, Node.js, Next.js) e Python (Flask).',
            caseStudy: 'Vedi NutriFlow',
            viewProjects: 'Vedi Progetti',
            downloadCv: 'Scarica CV (PDF)'
        },
        about: {
            title: 'Sviluppo Software',
            titleSpan: 'focalizzato sui risultati.',
            p1: 'Il mio lavoro si concentra sulla costruzione di sistemi dove logica e UX si uniscono.',
            p2: 'Dalla formazione nel 2009 alla specializzazione Full Stack, offro soluzioni funzionali.',
            p3: 'Ho sviluppato API REST robuste e digitalizzato aziende.',
            p4: 'Attualmente cresco con Next.js e TypeScript, usando l\'IA.',
            stats: {
                profile: 'Profilo Professionale',
                modeling: 'Modellazione Dati',
                production: 'Sistemi in Produzione',
                workflow: 'Workflow Moderno'
            }
        },
        projects: {
            title: 'Progetti',
            titleSpan: 'In Evidenza',
            description: 'Sistemi progettati con focus su scalabilità e UX reale.',
            viewProject: 'Vedi Progetto'
        },
        stack: {
            title: 'Stack',
            titleSpan: 'Tecnico',
            description: 'Tecnologie e strumenti per sistemi robusti.',
            categories: {
                frontend: 'Frontend',
                backend: 'Backend',
                database: 'Database',
                infrastructure: 'Infrastruttura',
                ia: 'Strumenti IA',
                development: 'Sviluppo & Strumenti',
                marketing: 'Marketing Digitale',
                communication: 'Comunicazione & Lingue'
            }
        },
        contact: {
            title: 'Inizia un',
            titleSpan: 'progetto',
            description: 'Interessato a collaborare? Compila il modulo.',
            guarantee: 'Risposta in meno di 24h',
            writeMe: 'Scrivimi',
            chat: 'WhatsApp / Telegram',
            chatStatus: 'Disponibile',
            coffee: 'Caffè?',
            location: 'Residente nel sud di Tenerife, Spagna.',
            formName: 'Nome',
            formNamePlaceholder: 'Nome completo',
            formEmail: 'Email',
            formEmailPlaceholder: 'tua@email.it',
            formMessage: 'Come posso aiutare?',
            formMessagePlaceholder: 'Parlami del tuo progetto...',
            formSubmit: 'Invia',
            formSubmitting: 'Invio...',
            successTitle: 'Messaggio Ricevuto!',
            successMsg: (name: string) => `Grazie ${name}. Ti contatterò presto personalmente.`,
            sendAnother: 'Invia un altro'
        },
        footer: {
            description: 'Sviluppatore Full Stack specializzato nella creazione di soluzioni digitali scalabili e centrate sull\'utente.',
            navTitle: 'Navigazione',
            resourcesTitle: 'Risorse',
            contact: 'Contatto',
            rights: 'Tutti i diritti riservati'
        }
    }
};
