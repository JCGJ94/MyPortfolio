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
            name: "JoseC González",
            roles: [
                "Full Stack Developer",
                "Backend Developer",
                "Python & AI Systems",
                "REST API Architect",
                "Data/AI Integrations"
            ],
            description: 'Construyo APIs y servicios backend donde la arquitectura del software y la inteligencia artificial trabajan juntas para crear productos útiles y escalables.',
            techFocus: 'Python · FastAPI · Flask · REST APIs · LLMs · AI Agents',
            caseStudy: 'Ver proyecto NutriFlow',
            viewProjects: 'Ver proyectos',
            downloadCv: 'Descargar CV (PDF)'
        },
        about: {
            title: 'Sobre',
            titleSpan: 'mí.',
            subtitle: 'Desarrollador con experiencia en aplicaciones web y APIs, actualmente enfocado en el desarrollo backend con Python y el uso de inteligencia artificial en productos de software.',
            p1: 'Mi trabajo se centra en construir APIs y servicios backend mantenibles, diseñando soluciones que transforman necesidades de negocio en productos digitales funcionales y escalables.',
            p2: 'Con una base técnica que parte de mi formación en Informática (2009) y mi especialización como desarrollador Full Stack, he trabajado en proyectos de desarrollo de APIs REST, modelado de datos relacional y digitalización de procesos utilizando Python y Flask.',
            p3: 'Actualmente estoy profundizando en el desarrollo backend con Python y en la construcción de aplicaciones que integran IA generativa, explorando arquitecturas basadas en agentes, automatización inteligente y el uso práctico de modelos de lenguaje dentro del ciclo de desarrollo de software.',
            p4: 'Mi objetivo es participar en la creación de productos donde la inteligencia artificial forme parte de la arquitectura del sistema y aporte valor real a los usuarios.',
            focusTitle: 'Foco técnico actual',
            focusAreas: [
                'Backend con Python (Flask / FastAPI)',
                'APIs REST y arquitectura de servicios',
                'IA generativa y sistemas basados en agentes (LLMs)',
                'Automatización y herramientas de desarrollo asistido por IA'
            ],
            stats: {
                profile: 'Backend + AI',
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
            description: 'Tecnologías principales con las que construyo backends, APIs y sistemas inteligentes.',
            categories: {
                frontend: 'Frontend (complementario)',
                backend: 'Backend (principal)',
                database: 'Data & Infraestructura',
                infrastructure: 'Infraestructura',
                ia: 'IA & Automatización',
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
            description: 'Backend Python Developer enfocado en construir APIs, sistemas inteligentes y soluciones escalables con IA.',
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
            name: "JoseC González",
            roles: [
                "Full Stack Developer",
                "Backend Developer",
                "Python & AI Systems",
                "REST API Architect",
                "Data/AI Integrations"
            ],
            description: 'I build APIs and backend services where software architecture and artificial intelligence work together to create useful and scalable products.',
            techFocus: 'Python · FastAPI · Flask · REST APIs · LLMs · AI Agents',
            caseStudy: 'View project NutriFlow',
            viewProjects: 'View projects',
            downloadCv: 'Download CV (PDF)'
        },
        about: {
            title: 'About',
            titleSpan: 'me.',
            subtitle: 'Developer with experience in web applications and APIs, currently specialized in Python backend and AI-based systems.',
            p1: 'My experience focuses on building robust APIs and backend applications, designing architectures that transform business needs into functional, scalable digital products.',
            p2: 'With a technical foundation from my Computer Science training (2009) and my specialization as a developer, I have worked on REST API projects, relational data modeling, and process digitalization with Python and Flask.',
            p3: 'My current professional focus is on Python backend and applications powered by generative AI, exploring agent-based architectures, intelligent automation, and the strategic use of LLMs within the software development lifecycle.',
            p4: 'My goal is to contribute to building products where artificial intelligence is integrated as a core part of the software architecture.',
            focusTitle: 'Current specialization',
            focusAreas: [
                'Python Backend (Flask / FastAPI)',
                'REST APIs & microservices architecture',
                'Generative AI & agent-based systems (LLMs)',
                'Automation & AI-assisted dev tools'
            ],
            stats: {
                profile: 'Backend + AI',
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
            description: 'Core technologies I use to build backends, APIs, and intelligent systems.',
            categories: {
                frontend: 'Frontend (complementary)',
                backend: 'Backend (primary)',
                database: 'Data & Infrastructure',
                infrastructure: 'Infrastructure',
                ia: 'AI & Automation',
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
            description: 'Backend Python Developer focused on building APIs, intelligent systems, and scalable solutions with AI.',
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
            name: "JoseC González",
            roles: [
                "Full Stack Developer",
                "Backend Developer",
                "Python & AI Systems",
                "REST API Architect",
                "Data/AI Integrations"
            ],
            description: 'Ich entwickle APIs und Backend-Dienste, bei denen Softwarearchitektur und künstliche Intelligenz zusammenarbeiten, um nützliche und skalierbare Produkte zu schaffen.',
            techFocus: 'Python · FastAPI · Flask · REST APIs · LLMs · AI Agents',
            caseStudy: 'Projekt NutriFlow ansehen',
            viewProjects: 'Projekte ansehen',
            downloadCv: 'CV herunterladen (PDF)'
        },
        about: {
            title: 'Über',
            titleSpan: 'mich.',
            subtitle: 'Entwickler mit Erfahrung in Webanwendungen und APIs, derzeit spezialisiert auf Python-Backend und KI-basierte Systeme.',
            p1: 'Meine Erfahrung konzentriert sich auf den Aufbau robuster APIs und Backend-Anwendungen.',
            p2: 'Von meiner Informatik-Ausbildung (2009) bis zur Spezialisierung als Entwickler habe ich an REST-APIs, Datenmodellierung und Prozessdigitalisierung mit Python und Flask gearbeitet.',
            p3: 'Mein aktueller Fokus liegt auf Python-Backend und generativer KI, agentenbasierten Architekturen und intelligenter Automatisierung.',
            p4: 'Mein Ziel ist es, Produkte mitzugestalten, in denen KI ein zentraler Teil der Softwarearchitektur ist.',
            focusTitle: 'Aktuelle Spezialisierung',
            focusAreas: [
                'Python Backend (Flask / FastAPI)',
                'REST-APIs & Microservices-Architektur',
                'Generative KI & agentenbasierte Systeme (LLMs)',
                'Automatisierung & KI-gestützte Entwicklungstools'
            ],
            stats: {
                profile: 'Backend + KI',
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
            description: 'Kerntechnologien, mit denen ich Backends, APIs und intelligente Systeme baue.',
            categories: {
                frontend: 'Frontend (ergänzend)',
                backend: 'Backend (Hauptbereich)',
                database: 'Daten & Infrastruktur',
                infrastructure: 'Infrastruktur',
                ia: 'KI & Automatisierung',
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
            description: 'Backend Python Developer, spezialisiert auf APIs, intelligente Systeme und skalierbare Lösungen mit KI.',
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
            name: "JoseC González",
            roles: [
                "Full Stack Developer",
                "Backend Developer",
                "Python & AI Systems",
                "REST API Architect",
                "Data/AI Integrations"
            ],
            description: 'Je construis des APIs et des services backend où l\'architecture logicielle et l\'intelligence artificielle travaillent ensemble pour créer des produits utiles et évolutifs.',
            techFocus: 'Python · FastAPI · Flask · REST APIs · LLMs · AI Agents',
            caseStudy: 'Voir projet NutriFlow',
            viewProjects: 'Voir projets',
            downloadCv: 'Télécharger CV (PDF)'
        },
        about: {
            title: 'À',
            titleSpan: 'propos.',
            subtitle: 'Développeur expérimenté en applications web et APIs, spécialisé actuellement en backend Python et systèmes basés sur l\'IA.',
            p1: 'Mon expérience se concentre sur la construction d\'APIs robustes et d\'applications backend.',
            p2: 'Avec une formation en informatique (2009) et ma spécialisation comme développeur, j\'ai travaillé sur les API REST, la modélisation de données et la digitalisation avec Python et Flask.',
            p3: 'Mon focus actuel est sur le backend Python et l\'IA générative, l\'architecture agentique et l\'automatisation intelligente.',
            p4: 'Mon objectif est de contribuer à des produits où l\'IA est intégrée au cœur de l\'architecture logicielle.',
            focusTitle: 'Spécialisation actuelle',
            focusAreas: [
                'Python Backend (Flask / FastAPI)',
                'APIs REST & architecture microservices',
                'IA générative & systèmes agentiques (LLMs)',
                'Automatisation & outils de développement IA'
            ],
            stats: {
                profile: 'Backend + IA',
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
            description: 'Technologies principales pour construire des backends, APIs et systèmes intelligents.',
            categories: {
                frontend: 'Frontend (complémentaire)',
                backend: 'Backend (principal)',
                database: 'Données & Infrastructure',
                infrastructure: 'Infrastructure',
                ia: 'IA & Automatisation',
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
            description: 'Backend Python Developer spécialisé dans la construction d\'APIs, systèmes intelligents et solutions scalables avec IA.',
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
            name: "JoseC González",
            roles: [
                "Full Stack Developer",
                "Backend Developer",
                "Python & AI Systems",
                "REST API Architect",
                "Data/AI Integrations"
            ],
            description: 'Costruisco API e servizi backend in cui l\'architettura del software e l\'intelligenza artificiale lavorano insieme per creare prodotti utili e scalabili.',
            techFocus: 'Python · FastAPI · Flask · REST APIs · LLMs · AI Agents',
            caseStudy: 'Vedi progetto NutriFlow',
            viewProjects: 'Vedi progetti',
            downloadCv: 'Scarica CV (PDF)'
        },
        about: {
            title: 'Su',
            titleSpan: 'di me.',
            subtitle: 'Sviluppatore con esperienza in applicazioni web e API, attualmente specializzato in backend Python e sistemi basati sull\'IA.',
            p1: 'La mia esperienza si concentra sulla costruzione di API robuste e applicazioni backend.',
            p2: 'Con una formazione in informatica (2009) e la specializzazione come sviluppatore, ho lavorato su API REST, modellazione dati e digitalizzazione con Python e Flask.',
            p3: 'Il mio focus attuale è su backend Python e IA generativa, architetture ad agenti e automazione intelligente.',
            p4: 'Il mio obiettivo è contribuire a prodotti dove l\'IA è parte centrale dell\'architettura software.',
            focusTitle: 'Specializzazione attuale',
            focusAreas: [
                'Backend Python (Flask / FastAPI)',
                'API REST & architettura microservizi',
                'IA generativa & sistemi ad agenti (LLMs)',
                'Automazione & strumenti di sviluppo IA'
            ],
            stats: {
                profile: 'Backend + IA',
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
            description: 'Tecnologie principali per costruire backend, API e sistemi intelligenti.',
            categories: {
                frontend: 'Frontend (complementare)',
                backend: 'Backend (principale)',
                database: 'Data & Infrastruttura',
                infrastructure: 'Infrastruttura',
                ia: 'IA & Automazione',
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
            description: 'Backend Python Developer specializzato nella costruzione di API, sistemi intelligenti e soluzioni scalabili con IA.',
            navTitle: 'Navigazione',
            resourcesTitle: 'Risorse',
            contact: 'Contatto',
            rights: 'Tutti i diritti riservati'
        }
    }
};
