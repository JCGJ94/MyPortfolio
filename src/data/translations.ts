export type Language = 'es' | 'en' | 'de' | 'fr' | 'it';

export const translations = {
    es: {
        nav: {
            home: 'Inicio',
            projects: 'Proyectos',
            about: 'Sobre mí',
            nutriflow: 'NutriFlow',
            stack: 'Stack',
            cv: 'CV',
            cta: 'Área Técnica'
        },
        hero: {
            badge: 'Disponible para roles Full Stack / Backend Python',
            name: "JoseC González",
            roles: [
                "Full Stack Developer",
                "Backend Python Developer",
                "AI Application Developer",
                "Next.js & React",
                "LLM Integrations"
            ],
            description: 'Construyo APIs, servicios backend y productos web que integran LLMs, automatización y workflows modernos de desarrollo.',
            techFocus: 'Python · FastAPI · Next.js · React · REST APIs · LLMs',
            caseStudy: 'Ver proyecto NutriFlow',
            viewProjects: 'Ver proyectos',
            downloadCv: 'Descargar CV (PDF)'
        },
        sectionLabel: {
            about: 'Sobre mí',
            projects: 'Proyectos',
            stack: 'Stack',
            contact: 'Contacto'
        },
        about: {
            facts: {
                education: 'Informática (2009)',
                stack: 'Python / Flask / FastAPI',
                projects: '6 proyectos públicos'
            },
            title: 'Sobre',
            titleSpan: 'mí.',
            subtitle: 'Desarrollador Full Stack con foco en backend Python e IA aplicada. Construyo APIs, servicios backend y productos web que integran modelos de lenguaje y automatización.',
            p1: 'Mi trabajo se centra en construir APIs y servicios backend mantenibles, diseñando soluciones que transforman necesidades de negocio en productos digitales funcionales y escalables.',
            p2: 'Con una base técnica que parte de mi formación en Informática (2009) y mi especialización como desarrollador Full Stack, he trabajado en proyectos de desarrollo de APIs REST, modelado de datos relacional y digitalización de procesos utilizando Python y Flask.',
            p3: 'Actualmente estoy profundizando en el desarrollo backend con Python y en la construcción de aplicaciones que integran IA generativa, explorando arquitecturas basadas en agentes, automatización inteligente y el uso práctico de modelos de lenguaje dentro del ciclo de desarrollo de software.',
            p4: 'Mi objetivo es participar en la creación de productos donde la inteligencia artificial forme parte de la arquitectura del sistema y aporte valor real a los usuarios.',
            kickers: ['Enfoque', 'Trayectoria', 'Ahora'],
            timeline: [
                { tag: '2009', label: 'Informática' },
                { tag: 'Full Stack', label: 'Especialización' },
                { tag: 'Hoy', label: 'Backend Python + IA' }
            ],
            marks: 'APIs y servicios backend mantenibles|productos digitales funcionales y escalables|Informática (2009)|APIs REST|modelado de datos relacional|Python y Flask|backend con Python|IA generativa|arquitecturas basadas en agentes|automatización inteligente|inteligencia artificial|forme parte de la arquitectura del sistema|valor real a los usuarios',
            focusTitle: 'Foco técnico actual',
            focusAreas: [
                'Backend con Python (Flask / FastAPI)',
                'APIs REST y arquitectura de servicios',
                'IA generativa y sistemas basados en agentes (LLMs)',
                'Automatización y herramientas de desarrollo asistido por IA'
            ],
            stats: {
                profile: 'Full Stack + AI',
                modeling: 'Modelado de Datos',
                production: 'Sistemas en Producción',
                workflow: 'Workflow Moderno'
            }
        },
        projects: {
            title: 'Proyectos',
            titleSpan: 'Destacados',
            description: 'Sistemas que he diseñado, arquitectado y construido con un enfoque en escalabilidad, seguridad y UX real.',
            viewProject: 'Ver Proyecto',
            case: {
                index: 'Casos',
                problem: 'Problema',
                solution: 'Solución',
                decisions: 'Decisiones técnicas',
                evidence: 'Resultado verificable',
                pending: 'Pendiente de documentar',
                internal: 'Proyecto de empresa · sin demo pública',
                tabProduct: 'Producto',
                tabArchitecture: 'Arquitectura',
                screenshotAlt: 'Pantalla de acceso de Squaads Bot en desarrollo: «Tu asistente inteligente para reuniones», botón «Continuar con Google» y lista de permisos (perfil y email, calendario, auto-join).',
                diagramAlt: 'Diagrama de arquitectura de Squaads Meeting Bot: calendario y extensión, web, cola en Postgres, worker con navegador y FFmpeg, almacenamiento, transcripción, resumen con IA y panel.',
                moreDecisions: 'Ver {n} decisiones más',
                spanishOnly: 'Contenido de los casos disponible solo en español.'
            }
        },
        stack: {
            roles: {
                backend: 'Backend',
                frontend: 'Frontend',
                data: 'Datos',
                ai: 'IA',
                tools: 'Herramientas',
                languages: 'Idiomas'
            },
            usedIn: 'Usado en',
            items: {
                relationalModeling: 'Modelado relacional',
                llmOrchestration: 'Orquestación de LLM',
                agentArchitecture: 'Arquitectura de agentes',
                prompting: 'Prompting avanzado',
                aiAutomation: 'Automatización con IA',
                toolCalling: 'Tool calling',
                testing: 'Testing',
                languageEs: 'Español (nativo)',
                languageEn: 'Inglés (intermedio)'
            },
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
            title: '¿Tienes un proyecto, una vacante o una idea?',
            titleSpan: 'Hablemos.',
            description: 'Ya sea una oferta de trabajo, una colaboración o un producto por construir, cuéntame qué necesitas y vemos cómo puedo aportar.',
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
            sendAnother: 'Enviar otro mensaje',
            copyEmail: 'Copiar email',
            copied: 'Copiado',
            elsewhere: 'También en',
            hintMin: 'mín. 10 caracteres',
            errors: {
                name: "El nombre debe tener al menos 2 caracteres",
                email: "Correo electrónico no válido",
                message: "El mensaje debe tener al menos 10 caracteres",
                submit: "Hubo un problema al enviar el mensaje. Inténtalo de nuevo más tarde o escríbeme por correo."
            }
        },
        footer: {
            description: 'Full Stack Developer con foco en backend Python e IA aplicada. Construyo APIs, servicios backend y productos web modernos.',
            navTitle: 'Navegación',
            resourcesTitle: 'Recursos',
            contact: 'Contacto',
            rights: 'Todos los derechos reservados',
            top: 'Volver arriba'
        }
    },
    en: {
        nav: {
            home: 'Home',
            projects: 'Projects',
            about: 'About',
            nutriflow: 'NutriFlow',
            stack: 'Stack',
            cv: 'CV',
            cta: 'Technical Area'
        },
        hero: {
            badge: 'Open to Full Stack / Backend Python roles',
            name: "JoseC González",
            roles: [
                "Full Stack Developer",
                "Backend Python Developer",
                "AI Application Developer",
                "Next.js & React",
                "LLM Integrations"
            ],
            description: 'I build APIs, backend services and web products that integrate LLMs, automation and modern development workflows.',
            techFocus: 'Python · FastAPI · Next.js · React · REST APIs · LLMs',
            caseStudy: 'View project NutriFlow',
            viewProjects: 'View projects',
            downloadCv: 'Download CV (PDF)'
        },
        sectionLabel: {
            about: 'About',
            projects: 'Projects',
            stack: 'Stack',
            contact: 'Contact'
        },
        about: {
            facts: {
                education: 'Computer Science (2009)',
                stack: 'Python / Flask / FastAPI',
                projects: '6 public projects'
            },
            title: 'About',
            titleSpan: 'me.',
            subtitle: 'Full Stack Developer with a focus on Python backend and applied AI. I build APIs, backend services and web products that integrate language models and automation.',
            p1: 'My experience focuses on building robust APIs and backend applications, designing architectures that transform business needs into functional, scalable digital products.',
            p2: 'With a technical foundation from my Computer Science training (2009) and my specialization as a developer, I have worked on REST API projects, relational data modeling, and process digitalization with Python and Flask.',
            p3: 'My current professional focus is on Python backend and applications powered by generative AI, exploring agent-based architectures, intelligent automation, and the strategic use of LLMs within the software development lifecycle.',
            p4: 'My goal is to contribute to building products where artificial intelligence is integrated as a core part of the software architecture.',
            kickers: ['Approach', 'Path', 'Now'],
            timeline: [
                { tag: '2009', label: 'Computer Science' },
                { tag: 'Full Stack', label: 'Specialization' },
                { tag: 'Now', label: 'Python backend + AI' }
            ],
            marks: 'robust APIs and backend applications|functional, scalable digital products|Computer Science training (2009)|REST API|relational data modeling|Python and Flask|Python backend|generative AI|agent-based architectures|intelligent automation|artificial intelligence|core part of the software architecture',
            focusTitle: 'Current specialization',
            focusAreas: [
                'Python Backend (Flask / FastAPI)',
                'REST APIs & microservices architecture',
                'Generative AI & agent-based systems (LLMs)',
                'Automation & AI-assisted dev tools'
            ],
            stats: {
                profile: 'Full Stack + AI',
                modeling: 'Data Modeling',
                production: 'Production Systems',
                workflow: 'Modern Workflow'
            }
        },
        projects: {
            title: 'Featured',
            titleSpan: 'Projects',
            description: 'Systems I have designed, architected, and built with a focus on scalability, security, and real UX.',
            viewProject: 'View Project',
            case: {
                index: 'Cases',
                problem: 'Problem',
                solution: 'Solution',
                decisions: 'Technical decisions',
                evidence: 'Verifiable result',
                pending: 'Pending documentation',
                internal: 'Company project · no public demo',
                tabProduct: 'Product',
                tabArchitecture: 'Architecture',
                screenshotAlt: 'Squaads Bot sign-in screen in development: "Your smart assistant for meetings" (in Spanish), a "Continue with Google" button and a permissions list (profile and email, calendar, auto-join).',
                diagramAlt: 'Architecture diagram of Squaads Meeting Bot: calendar and extension, web app, Postgres queue, worker with browser and FFmpeg, storage, transcription, AI summary and dashboard.',
                moreDecisions: "Show {n} more decisions",
                spanishOnly: 'Case content is available in Spanish only.'
            }
        },
        stack: {
            roles: {
                backend: 'Backend',
                frontend: 'Frontend',
                data: 'Data',
                ai: 'AI',
                tools: 'Tools',
                languages: 'Languages'
            },
            usedIn: 'Used in',
            items: {
                relationalModeling: 'Relational modeling',
                llmOrchestration: 'LLM orchestration',
                agentArchitecture: 'Agent architecture',
                prompting: 'Advanced prompting',
                aiAutomation: 'AI automation',
                toolCalling: 'Tool calling',
                testing: 'Testing',
                languageEs: 'Spanish (native)',
                languageEn: 'English (intermediate)'
            },
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
            title: 'Got a project, a role or an idea?',
            titleSpan: 'Let\'s talk.',
            description: 'Whether it is a job offer, a collaboration or a product to build, tell me what you need and let\'s see how I can contribute.',
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
            sendAnother: 'Send another message',
            copyEmail: 'Copy email',
            copied: 'Copied',
            elsewhere: 'Elsewhere',
            hintMin: 'min. 10 characters',
            errors: {
                name: "Name must be at least 2 characters",
                email: "Invalid email address",
                message: "Message must be at least 10 characters",
                submit: "There was a problem sending the message. Please try again later or email me directly."
            }
        },
        footer: {
            description: 'Full Stack Developer with a focus on Python backend and applied AI. I build APIs, backend services and modern web products.',
            navTitle: 'Navigation',
            resourcesTitle: 'Resources',
            contact: 'Contact',
            rights: 'All rights reserved',
            top: 'Back to top'
        }
    },
    de: {
        nav: { home: 'Start', projects: 'Projekte', about: 'Über mich', nutriflow: 'NutriFlow', stack: 'Stack', cv: 'CV', cta: 'Technikbereich' },
        hero: {
            badge: 'Offen für Full Stack / Backend Python Rollen',
            name: "JoseC González",
            roles: [
                "Full Stack Developer",
                "Backend Python Developer",
                "AI Application Developer",
                "Next.js & React",
                "LLM Integrations"
            ],
            description: 'Ich entwickle APIs, Backend-Dienste und Webprodukte, die LLMs, Automatisierung und moderne Entwicklungs-Workflows integrieren.',
            techFocus: 'Python · FastAPI · Next.js · React · REST APIs · LLMs',
            caseStudy: 'Projekt NutriFlow ansehen',
            viewProjects: 'Projekte ansehen',
            downloadCv: 'CV herunterladen (PDF)'
        },
        sectionLabel: {
            about: 'Über mich',
            projects: 'Projekte',
            stack: 'Stack',
            contact: 'Kontakt'
        },
        about: {
            facts: {
                education: 'Informatik (2009)',
                stack: 'Python / Flask / FastAPI',
                projects: '6 öffentliche Projekte'
            },
            title: 'Über',
            titleSpan: 'mich.',
            subtitle: 'Full Stack Developer mit Fokus auf Python-Backend und angewandte KI. Ich entwickle APIs, Backend-Dienste und Webprodukte, die Sprachmodelle und Automatisierung integrieren.',
            p1: 'Meine Erfahrung konzentriert sich auf den Aufbau robuster APIs und Backend-Anwendungen.',
            p2: 'Von meiner Informatik-Ausbildung (2009) bis zur Spezialisierung als Entwickler habe ich an REST-APIs, Datenmodellierung und Prozessdigitalisierung mit Python und Flask gearbeitet.',
            p3: 'Mein aktueller Fokus liegt auf Python-Backend und generativer KI, agentenbasierten Architekturen und intelligenter Automatisierung.',
            p4: 'Mein Ziel ist es, Produkte mitzugestalten, in denen KI ein zentraler Teil der Softwarearchitektur ist.',
            kickers: ['Fokus', 'Werdegang', 'Heute'],
            timeline: [
                { tag: '2009', label: 'Informatik' },
                { tag: 'Full Stack', label: 'Spezialisierung' },
                { tag: 'Heute', label: 'Python-Backend + KI' }
            ],
            marks: 'robuster APIs und Backend-Anwendungen|Informatik-Ausbildung (2009)|REST-APIs|Datenmodellierung|Python und Flask|Python-Backend|generativer KI|agentenbasierten Architekturen|intelligenter Automatisierung|zentraler Teil der Softwarearchitektur',
            focusTitle: 'Aktuelle Spezialisierung',
            focusAreas: [
                'Python Backend (Flask / FastAPI)',
                'REST-APIs & Microservices-Architektur',
                'Generative KI & agentenbasierte Systeme (LLMs)',
                'Automatisierung & KI-gestützte Entwicklungstools'
            ],
            stats: {
                profile: 'Full Stack + KI',
                modeling: 'Datenmodellierung',
                production: 'Produktionssysteme',
                workflow: 'Moderner Workflow'
            }
        },
        projects: {
            title: 'Ausgewählte',
            titleSpan: 'Projekte',
            description: 'Systeme, die ich mit Fokus auf Skalierbarkeit, Sicherheit und echte UX entworfen habe.',
            viewProject: 'Projekt ansehen',
            case: {
                index: 'Fälle',
                problem: 'Problem',
                solution: 'Lösung',
                decisions: 'Technische Entscheidungen',
                evidence: 'Überprüfbares Ergebnis',
                pending: 'Dokumentation ausstehend',
                internal: 'Unternehmensprojekt · keine öffentliche Demo',
                tabProduct: 'Produkt',
                tabArchitecture: 'Architektur',
                screenshotAlt: 'Anmeldebildschirm von Squaads Bot in der Entwicklung (auf Spanisch): „Tu asistente inteligente para reuniones“, Schaltfläche „Continuar con Google“ und Liste der Berechtigungen (Profil und E-Mail, Kalender, Auto-Join).',
                diagramAlt: 'Architekturdiagramm von Squaads Meeting Bot: Kalender und Erweiterung, Web-App, Postgres-Warteschlange, Worker mit Browser und FFmpeg, Speicher, Transkription, KI-Zusammenfassung und Dashboard.',
                moreDecisions: "{n} weitere Entscheidungen anzeigen",
                spanishOnly: 'Die Fallinhalte sind nur auf Spanisch verfügbar.'
            }
        },
        stack: {
            roles: {
                backend: 'Backend',
                frontend: 'Frontend',
                data: 'Daten',
                ai: 'KI',
                tools: 'Werkzeuge',
                languages: 'Sprachen'
            },
            usedIn: 'Verwendet in',
            items: {
                relationalModeling: 'Relationale Modellierung',
                llmOrchestration: 'LLM-Orchestrierung',
                agentArchitecture: 'Agentenarchitektur',
                prompting: 'Fortgeschrittenes Prompting',
                aiAutomation: 'KI-Automatisierung',
                toolCalling: 'Tool Calling',
                testing: 'Tests',
                languageEs: 'Spanisch (Muttersprache)',
                languageEn: 'Englisch (Mittelstufe)'
            },
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
            title: 'Ein Projekt, eine Stelle oder eine Idee?',
            titleSpan: 'Sprechen wir.',
            description: 'Ob Stellenangebot, Zusammenarbeit oder ein Produkt, das entstehen soll: Erzählen Sie mir, was Sie brauchen, und wir finden heraus, wie ich beitragen kann.',
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
            sendAnother: 'Weitere Nachricht',
            copyEmail: 'E-Mail kopieren',
            copied: 'Kopiert',
            elsewhere: 'Auch hier',
            hintMin: 'mind. 10 Zeichen',
            errors: {
                name: "Der Name muss mindestens 2 Zeichen lang sein",
                email: "Ungültige E-Mail-Adresse",
                message: "Die Nachricht muss mindestens 10 Zeichen lang sein",
                submit: "Beim Senden ist ein Problem aufgetreten. Bitte versuche es später erneut oder schreibe mir per E-Mail."
            }
        },
        footer: {
            description: 'Full Stack Developer mit Fokus auf Python-Backend und angewandte KI. Ich entwickle APIs, Backend-Dienste und moderne Webprodukte.',
            navTitle: 'Navigation',
            resourcesTitle: 'Ressourcen',
            contact: 'Kontakt',
            rights: 'Alle Rechte vorbehalten',
            top: 'Nach oben'
        }
    },
    fr: {
        nav: { home: 'Accueil', projects: 'Projets', about: 'À propos', nutriflow: 'NutriFlow', stack: 'Stack', cv: 'CV', cta: 'Zone Technique' },
        hero: {
            badge: 'Ouvert aux postes Full Stack / Backend Python',
            name: "JoseC González",
            roles: [
                "Full Stack Developer",
                "Backend Python Developer",
                "AI Application Developer",
                "Next.js & React",
                "LLM Integrations"
            ],
            description: 'Je construis des APIs, des services backend et des produits web qui intègrent des LLMs, de l\'automatisation et des workflows de développement modernes.',
            techFocus: 'Python · FastAPI · Next.js · React · REST APIs · LLMs',
            caseStudy: 'Voir projet NutriFlow',
            viewProjects: 'Voir projets',
            downloadCv: 'Télécharger CV (PDF)'
        },
        sectionLabel: {
            about: 'À propos',
            projects: 'Projets',
            stack: 'Stack',
            contact: 'Contact'
        },
        about: {
            facts: {
                education: 'Informatique (2009)',
                stack: 'Python / Flask / FastAPI',
                projects: '6 projets publics'
            },
            title: 'À',
            titleSpan: 'propos.',
            subtitle: 'Développeur Full Stack avec un focus sur le backend Python et l\'IA appliquée. Je construis des APIs, des services backend et des produits web qui intègrent des modèles de langage et de l\'automatisation.',
            p1: 'Mon expérience se concentre sur la construction d\'APIs robustes et d\'applications backend.',
            p2: 'Avec une formation en informatique (2009) et ma spécialisation comme développeur, j\'ai travaillé sur les API REST, la modélisation de données et la digitalisation avec Python et Flask.',
            p3: 'Mon focus actuel est sur le backend Python et l\'IA générative, l\'architecture agentique et l\'automatisation intelligente.',
            p4: 'Mon objectif est de contribuer à des produits où l\'IA est intégrée au cœur de l\'architecture logicielle.',
            kickers: ['Approche', 'Parcours', 'Aujourd\'hui'],
            timeline: [
                { tag: '2009', label: 'Informatique' },
                { tag: 'Full Stack', label: 'Spécialisation' },
                { tag: 'Aujourd\'hui', label: 'Backend Python + IA' }
            ],
            marks: 'APIs robustes|formation en informatique (2009)|API REST|modélisation de données|Python et Flask|backend Python|IA générative|architecture agentique|automatisation intelligente|cœur de l\'architecture logicielle',
            focusTitle: 'Spécialisation actuelle',
            focusAreas: [
                'Python Backend (Flask / FastAPI)',
                'APIs REST & architecture microservices',
                'IA générative & systèmes agentiques (LLMs)',
                'Automatisation & outils de développement IA'
            ],
            stats: {
                profile: 'Full Stack + IA',
                modeling: 'Modélisation de Données',
                production: 'Systèmes en Production',
                workflow: 'Workflow Moderne'
            }
        },
        projects: {
            title: 'Projets',
            titleSpan: 'Vedettes',
            description: 'Systèmes conçus avec un accent sur l\'évolutivité et l\'UX réelle.',
            viewProject: 'Voir le Projet',
            case: {
                index: 'Cas',
                problem: 'Problème',
                solution: 'Solution',
                decisions: 'Décisions techniques',
                evidence: 'Résultat vérifiable',
                pending: 'Documentation en attente',
                internal: "Projet d'entreprise · sans démo publique",
                tabProduct: 'Produit',
                tabArchitecture: 'Architecture',
                screenshotAlt: "Écran de connexion de Squaads Bot en développement (en espagnol) : « Tu asistente inteligente para reuniones », bouton « Continuar con Google » et liste des autorisations (profil et e-mail, calendrier, auto-join).",
                diagramAlt: "Schéma d'architecture de Squaads Meeting Bot : calendrier et extension, application web, file Postgres, worker avec navigateur et FFmpeg, stockage, transcription, résumé IA et tableau de bord.",
                moreDecisions: "Voir {n} décisions de plus",
                spanishOnly: "Le contenu des cas n'est disponible qu'en espagnol."
            }
        },
        stack: {
            roles: {
                backend: 'Backend',
                frontend: 'Frontend',
                data: 'Données',
                ai: 'IA',
                tools: 'Outils',
                languages: 'Langues'
            },
            usedIn: 'Utilisé dans',
            items: {
                relationalModeling: 'Modélisation relationnelle',
                llmOrchestration: 'Orchestration de LLM',
                agentArchitecture: 'Architecture d’agents',
                prompting: 'Prompting avancé',
                aiAutomation: 'Automatisation par IA',
                toolCalling: 'Tool calling',
                testing: 'Tests',
                languageEs: 'Espagnol (langue maternelle)',
                languageEn: 'Anglais (intermédiaire)'
            },
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
            title: 'Un projet, un poste ou une idée ?',
            titleSpan: 'Parlons-en.',
            description: 'Offre d\'emploi, collaboration ou produit à construire : dites-moi ce dont vous avez besoin et voyons comment je peux contribuer.',
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
            sendAnother: 'Envoyer un autre',
            copyEmail: "Copier l'e-mail",
            copied: 'Copié',
            elsewhere: 'Aussi sur',
            hintMin: 'min. 10 caractères',
            errors: {
                name: "Le nom doit comporter au moins 2 caractères",
                email: "Adresse e-mail non valide",
                message: "Le message doit comporter au moins 10 caractères",
                submit: "Un problème est survenu lors de l'envoi. Réessayez plus tard ou écrivez-moi par e-mail."
            }
        },
        footer: {
            description: 'Développeur Full Stack avec un focus sur le backend Python et l\'IA appliquée. Je construis des APIs, des services backend et des produits web modernes.',
            navTitle: 'Navigation',
            resourcesTitle: 'Ressources',
            contact: 'Contact',
            rights: 'Tous droits réservés',
            top: 'Haut de page'
        }
    },
    it: {
        nav: { home: 'Inizio', projects: 'Progetti', about: 'Su di me', nutriflow: 'NutriFlow', stack: 'Stack', cv: 'CV', cta: 'Area Tecnica' },
        hero: {
            badge: 'Disponibile per ruoli Full Stack / Backend Python',
            name: "JoseC González",
            roles: [
                "Full Stack Developer",
                "Backend Python Developer",
                "AI Application Developer",
                "Next.js & React",
                "LLM Integrations"
            ],
            description: 'Costruisco API, servizi backend e prodotti web che integrano LLM, automazione e workflow di sviluppo moderni.',
            techFocus: 'Python · FastAPI · Next.js · React · REST APIs · LLMs',
            caseStudy: 'Vedi progetto NutriFlow',
            viewProjects: 'Vedi progetti',
            downloadCv: 'Scarica CV (PDF)'
        },
        sectionLabel: {
            about: 'Chi sono',
            projects: 'Progetti',
            stack: 'Stack',
            contact: 'Contatto'
        },
        about: {
            facts: {
                education: 'Informatica (2009)',
                stack: 'Python / Flask / FastAPI',
                projects: '6 progetti pubblici'
            },
            title: 'Su',
            titleSpan: 'di me.',
            subtitle: 'Sviluppatore Full Stack con focus su backend Python e IA applicata. Costruisco API, servizi backend e prodotti web che integrano modelli linguistici e automazione.',
            p1: 'La mia esperienza si concentra sulla costruzione di API robuste e applicazioni backend.',
            p2: 'Con una formazione in informatica (2009) e la specializzazione come sviluppatore, ho lavorato su API REST, modellazione dati e digitalizzazione con Python e Flask.',
            p3: 'Il mio focus attuale è su backend Python e IA generativa, architetture ad agenti e automazione intelligente.',
            p4: 'Il mio obiettivo è contribuire a prodotti dove l\'IA è parte centrale dell\'architettura software.',
            kickers: ['Approccio', 'Percorso', 'Oggi'],
            timeline: [
                { tag: '2009', label: 'Informatica' },
                { tag: 'Full Stack', label: 'Specializzazione' },
                { tag: 'Oggi', label: 'Backend Python + IA' }
            ],
            marks: 'API robuste e applicazioni backend|formazione in informatica (2009)|API REST|modellazione dati|Python e Flask|backend Python|IA generativa|architetture ad agenti|automazione intelligente|parte centrale dell\'architettura software',
            focusTitle: 'Specializzazione attuale',
            focusAreas: [
                'Backend Python (Flask / FastAPI)',
                'API REST & architettura microservizi',
                'IA generativa & sistemi ad agenti (LLMs)',
                'Automazione & strumenti di sviluppo IA'
            ],
            stats: {
                profile: 'Full Stack + IA',
                modeling: 'Modellazione Dati',
                production: 'Sistemi in Produzione',
                workflow: 'Workflow Moderno'
            }
        },
        projects: {
            title: 'Progetti',
            titleSpan: 'In Evidenza',
            description: 'Sistemi progettati con focus su scalabilità e UX reale.',
            viewProject: 'Vedi Progetto',
            case: {
                index: 'Casi',
                problem: 'Problema',
                solution: 'Soluzione',
                decisions: 'Decisioni tecniche',
                evidence: 'Risultato verificabile',
                pending: 'Documentazione in sospeso',
                internal: 'Progetto aziendale · senza demo pubblica',
                tabProduct: 'Prodotto',
                tabArchitecture: 'Architettura',
                screenshotAlt: "Schermata di accesso di Squaads Bot in sviluppo (in spagnolo): «Tu asistente inteligente para reuniones», pulsante «Continuar con Google» ed elenco dei permessi (profilo ed email, calendario, auto-join).",
                diagramAlt: "Diagramma dell'architettura di Squaads Meeting Bot: calendario ed estensione, app web, coda Postgres, worker con browser e FFmpeg, archiviazione, trascrizione, riassunto IA e dashboard.",
                moreDecisions: "Mostra altre {n} decisioni",
                spanishOnly: 'Il contenuto dei casi è disponibile solo in spagnolo.'
            }
        },
        stack: {
            roles: {
                backend: 'Backend',
                frontend: 'Frontend',
                data: 'Dati',
                ai: 'IA',
                tools: 'Strumenti',
                languages: 'Lingue'
            },
            usedIn: 'Usato in',
            items: {
                relationalModeling: 'Modellazione relazionale',
                llmOrchestration: 'Orchestrazione di LLM',
                agentArchitecture: 'Architettura ad agenti',
                prompting: 'Prompting avanzato',
                aiAutomation: 'Automazione con IA',
                toolCalling: 'Tool calling',
                testing: 'Testing',
                languageEs: 'Spagnolo (madrelingua)',
                languageEn: 'Inglese (intermedio)'
            },
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
            title: 'Un progetto, un ruolo o un\'idea?',
            titleSpan: 'Parliamone.',
            description: 'Che si tratti di un\'offerta di lavoro, di una collaborazione o di un prodotto da costruire, dimmi di cosa hai bisogno e vediamo come posso contribuire.',
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
            sendAnother: 'Invia un altro',
            copyEmail: 'Copia email',
            copied: 'Copiato',
            elsewhere: 'Anche qui',
            hintMin: 'min. 10 caratteri',
            errors: {
                name: "Il nome deve avere almeno 2 caratteri",
                email: "Indirizzo e-mail non valido",
                message: "Il messaggio deve avere almeno 10 caratteri",
                submit: "Si è verificato un problema durante l'invio. Riprova più tardi o scrivimi per e-mail."
            }
        },
        footer: {
            description: 'Full Stack Developer con focus su backend Python e IA applicata. Costruisco API, servizi backend e prodotti web moderni.',
            navTitle: 'Navigazione',
            resourcesTitle: 'Risorse',
            contact: 'Contatto',
            rights: 'Tutti i diritti riservati',
            top: 'Torna su'
        }
    }
};
