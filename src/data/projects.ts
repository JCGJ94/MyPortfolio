export type ProjectTier = 'flagship' | 'primary' | 'secondary';

export type CaseStep = 'problem' | 'solution' | 'decisions' | 'evidence';

// Facts from the repo only (Spanish). Steps with gaps are listed in `pending`; never invent figures.
export type ProjectCase = {
    problem?: string;
    solution?: string;
    decisions?: string[];
    evidence?: string[];
    pending: CaseStep[];
};

export type Project = {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    caseStudy?: string;
    image: string;
    tags: string[];
    badge: string;
    badgeEmoji: string;
    tier: 'flagship' | 'primary' | 'secondary';
    highlights: string[];
    demoUrl?: string;
    repoUrl?: string;
    case?: ProjectCase;
    media?: 'diagram';
    internalProject?: boolean;
    detailPath?: string;
    clientProject?: boolean;
    teamProject?: boolean;
};

export const projects: Project[] = [
    {
        id: 'squaads-meeting-bot',
        title: 'Squaads Meeting Bot',
        subtitle: 'Alternativa interna y autoalojada a los grabadores de reuniones SaaS',
        description: 'Bot interno para Squaads que graba, transcribe y resume reuniones de Google Meet y Microsoft Teams sobre la infraestructura propia de la empresa. Monorepo Bun con panel web en Next.js, worker aislado con navegador headless y FFmpeg en Docker, cola de trabajos en Postgres y almacenamiento S3/MinIO. Colaboré con el equipo en la fase inicial y después lideré el desarrollo prácticamente en solitario, incluido el pipeline de CI/CD y el despliegue.',
        image: '',
        media: 'diagram',
        internalProject: true,
        detailPath: '/squaads',
        tags: ['Bun', 'Next.js', 'TypeScript', 'Puppeteer', 'FFmpeg', 'Postgres', 'Docker', 'Vercel', 'Railway', 'Gemini', 'IA'],
        badge: 'Proyecto de Empresa',
        badgeEmoji: '🏢',
        tier: 'flagship',
        highlights: [
            'Web y worker separados, desplegados de forma independiente',
            'Máquina de estados de trabajos compartida en Postgres',
            'CI con tests contra Postgres real en cada PR'
        ],
        repoUrl: 'https://github.com/devs-squaads/tldv-squaads-dev',
        case: {
            problem: 'Grabar, transcribir y resumir reuniones de Google Meet y Microsoft Teams sobre la infraestructura propia de la empresa, sin depender de grabadores SaaS.',
            solution: 'Monorepo Bun: panel web en Next.js 16 con Google OAuth (next-auth); worker Bun aislado con navegador headless (Puppeteer) y FFmpeg en Docker que se une a las reuniones; cola de trabajos en Postgres (Drizzle); grabaciones en S3/MinIO; transcripción con Groq Whisper o Deepgram; resúmenes con varios proveedores de IA (Groq, con fallback a Gemini); chat con IA sobre las reuniones; auto-join con Google Calendar y extensión de navegador.',
            decisions: [
                'Web y worker separados, desplegados de forma independiente',
                'Máquina de estados de trabajos compartida en Postgres (pending, recording, transcribing, summarizing, completed o error) con heartbeat y reintentos con backoff',
                'Proveedores de IA múltiples con fallback',
                'Endurecimiento con RLS y middleware de autenticación documentados en ADRs',
                'Desarrollo guiado por especificaciones',
                'CI en dev y main (cada push y PR): instalación con lockfile congelado, esquema de base de datos, tests contra un servicio Postgres 16 real, lint, typecheck, verificación de que el ZIP de la extensión coincide con una build limpia y build Docker del worker',
                'Gobernanza de ramas: feature, PR a dev y PR a main; un guard de GitHub Actions solo admite PRs a main desde dev y se exige aprobación',
                'Despliegue: web en Vercel con integración Git y vercel.json versionado; worker en Railway con Dockerfile, migrado desde un workflow de despliegue en VPS; despliegue continuo automático solo desde main'
            ],
            evidence: ['En producción de forma interna; CI en dev y main, despliegue continuo automático solo desde main', 'Repositorio público; sin demo (el entorno de desarrollo exige login de Google)'],
            pending: ['evidence'],
        },
    },
    {
        id: 'nutriflow',
        title: 'NutriFlow',
        subtitle: 'Plataforma Inteligente de Nutrición y Entrenamiento',
        description: 'SISTEMA SaaS avanzado diseñado para la creación de planes nutricionales y rutinas de ejercicio 100% personalizados. Integra un motor de IA para optimizar la salud del usuario, basándose en datos biométricos y objetivos específicos con una arquitectura robusta en NestJS y Next.js.',
        image: '/projects/nutriflow.png',
        tags: ['Next.js', 'NestJS', 'TypeScript', 'Supabase', 'PostgreSQL', 'Gemini', 'Railway', 'IA', 'Testing'],
        badge: 'Proyecto Personal',
        badgeEmoji: '🚀',
        tier: 'flagship',
        highlights: [
            'Frontend Next.js y API NestJS separados',
            'Seguridad avanzada con Row Level Security',
            'Generación de planes con lógica de IA determinista'
        ],
        demoUrl: 'https://nutri-flow-mu.vercel.app/',
        repoUrl: 'https://github.com/JCGJ94/NutriFlow-Project',
        case: {
            problem: 'Planes nutricionales y de ejercicio creados a mano por nutricionistas independientes.',
            solution: 'SaaS con Next.js 16, NestJS 11, Supabase y Gemini 2.0 Flash.',
            decisions: ['Row Level Security en la base de datos', 'Generación de planes con lógica de IA determinista'],
            evidence: ['Demo pública y repositorio', 'Estado Beta declarado'],
            pending: ['evidence'],
        },
    },
    {
        id: 'clinical-ai',
        title: 'Clinical AI Multi-Agent',
        subtitle: 'Backend Multi-Agente de IA para Soporte Clínico',
        description: 'Backend de IA multi-agente de nivel producción para soporte en decisión clínica. Clasifica la urgencia de un caso mediante triage con LLM y activa agentes especialistas en paralelo que consultan guías clínicas vía RAG (pgvector), devolviendo una evaluación integrada y tipada. Construido con FastAPI async, LangChain (LCEL) y SQLAlchemy 2.0, con tolerancia a fallos parciales y despliegue containerizado.',
        image: '/projects/clinical-ai.png',
        tags: ['Python', 'FastAPI', 'LangChain', 'pgvector', 'PostgreSQL', 'RAG', 'Docker'],
        badge: 'Backend IA · Producción',
        badgeEmoji: '🤖',
        tier: 'flagship',
        highlights: [
            'Orquestación multi-agente con ejecución paralela (asyncio.gather)',
            'RAG sobre guías clínicas con pgvector y LangChain (LCEL)',
            'FastAPI async, SQLAlchemy 2.0, Docker multi-stage y CI/CD a GHCR'
        ],
        repoUrl: 'https://github.com/JCGJ94/Clinical-AI-Multi-Agent',
        case: {
            problem: 'Priorizar la urgencia de un caso clínico y consultar guías clínicas.',
            solution: 'Triage con LLM y agentes especialistas en paralelo con RAG sobre pgvector.',
            decisions: ['Ejecución paralela con asyncio.gather y tolerancia a fallos parciales', 'FastAPI async y SQLAlchemy 2.0', 'Docker multi-stage y CI/CD a GHCR'],
            evidence: ['Repositorio público; sin demo'],
            pending: ['evidence'],
        },
    },
    {
        id: 'tallercardonal',
        title: 'Taller El Cardonal',
        subtitle: 'Proyecto para Cliente en Producción',
        description: 'Digitalización completa de negocio local. Desarrollo de web profesional con enfoque en SEO, rendimiento y experiencia de usuario para atraer clientes reales mediante una interfaz rápida y optimizada.',
        image: '/projects/taller-demo.png',
        tags: ['React', 'Vite', 'CSS3', 'Vercel', 'SEO', 'Google Ads'],
        badge: 'Entrega a Cliente',
        badgeEmoji: '🤝',
        tier: 'primary',
        highlights: [
            'Proyecto real en producción activa',
            'Optimización SEO y Core Web Vitals',
            'Diseño responsive mobile-first con CSS3 puro'
        ],
        demoUrl: 'https://www.tallercardonal.es/',
        clientProject: true,
        case: {
            problem: 'Taller local sin presencia digital.',
            solution: 'Web en React con Vite y CSS propio, responsive, con SEO, desplegada en Vercel.',
            decisions: ['Diseño mobile-first con CSS3', 'Imágenes WebP', 'Metadatos SEO'],
            evidence: ['Web en producción'],
            pending: ['evidence'],
        },
    },
    {
        id: 'jegstudio',
        title: 'JEG Studio',
        subtitle: 'Plataforma para Freelance y Captación C2C',
        description: 'Proyecto web colaborativo enfocado a la captación de talento, búsqueda de trabajo freelance y crecimiento conjunto del sector. Orientado a generar oportunidades de clientes potenciales mediante optimización SEO avanzada y ejecución de campañas estratégicas.',
        image: '/projects/JegStudio.png',
        tags: ['React', 'Next.js', 'JavaScript', 'Git Flow', 'Colaboración', 'SEO', 'Marketing'],
        badge: 'Proyecto en Equipo',
        badgeEmoji: '👥',
        tier: 'primary',
        highlights: [
            'Plataforma enfocada en búsqueda de clientes freelance',
            'Estrategias de posicionamiento SEO optimizado',
            'Desarrollo colaborativo estructurado'
        ],
        demoUrl: 'https://www.jegsdev.com/',
        repoUrl: 'https://github.com/JCGJ94/JEG-Studio',
        teamProject: true,
        case: {
            problem: 'Captación de talento y de clientes freelance.',
            solution: 'Plataforma colaborativa con React y Next.js.',
            decisions: ['Estructura de carpetas, nomenclatura y modelo de datos acordados en equipo'],
            evidence: ['Demo y repositorio públicos'],
            pending: ['evidence'],
        },
    },
    {
        id: 'sportbarleague',
        title: 'SportBarLeague',
        subtitle: 'Full Stack Application with Python Backend',
        description: 'Aplicación de gestión de ligas deportivas con backend completo en Python. Implementación de autenticación JWT, modelado relacional avanzado con SQLAlchemy y API REST diseñada con Flask. Demuestra competencia sólida en arquitectura backend y diseño de bases de datos.',
        image: '/projects/sportbar-league-captura.png',
        tags: ['Python', 'Flask', 'SQLAlchemy', 'PostgreSQL', 'JWT', 'REST API'],
        badge: 'Python Backend',
        badgeEmoji: '🐍',
        tier: 'primary',
        highlights: [
            'API REST completa con Flask y autenticación JWT',
            'Modelado de base de datos relacional complejo con SQLAlchemy',
            'Arquitectura backend robusta con Python'
        ],
        repoUrl: 'https://github.com/JCGJ94/SportBarLeague',
        case: {
            problem: 'Gestión de ligas deportivas.',
            solution: 'Backend en Python con Flask y frontend en React.',
            decisions: ['Autenticación JWT manual', 'Relaciones N:M y 1:N con SQLAlchemy', 'Migraciones con Alembic'],
            evidence: ['Repositorio público; sin demo'],
            pending: ['evidence'],
        },
    }
];
