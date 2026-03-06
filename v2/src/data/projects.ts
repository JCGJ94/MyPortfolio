export type ProjectTier = 'flagship' | 'primary' | 'secondary';

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
    clientProject?: boolean;
    teamProject?: boolean;
};

export const projects: Project[] = [
    {
        id: 'nutriflow',
        title: 'NutriFlow',
        subtitle: 'Plataforma Inteligente de Nutrición y Entrenamiento',
        description: 'SISTEMA SaaS avanzado diseñado para la creación de planes nutricionales y rutinas de ejercicio 100% personalizados. Integra un motor de IA para optimizar la salud del usuario, basándose en datos biométricos y objetivos específicos con una arquitectura robusta en NestJS y Next.js.',
        image: '/projects/nutriflow.png',
        tags: ['Next.js', 'NestJS', 'TypeScript', 'Supabase', 'PostgreSQL', 'IA', 'Testing'],
        badge: 'Proyecto Flagship',
        badgeEmoji: '🚀',
        tier: 'flagship',
        highlights: [
            'Arquitectura monorepo escalable',
            'Seguridad avanzada con Row Level Security',
            'Generación de planes con lógica de IA determinista'
        ],
        demoUrl: 'https://nutri-flow-mu.vercel.app/',
        repoUrl: 'https://github.com/JCGJ94/NutriFlow-Project',
    },
    {
        id: 'tallercardonal',
        title: 'Taller El Cardonal',
        subtitle: 'Proyecto para Cliente en Producción',
        description: 'Digitalización completa de negocio local. Desarrollo de web profesional con enfoque en SEO, rendimiento y experiencia de usuario para atraer clientes reales mediante una interfaz rápida y optimizada.',
        image: '/projects/taller-demo.png',
        tags: ['React', 'TypeScript', 'CSS3', 'Vercel', 'SEO', 'Google Ads'],
        badge: 'Entrega a Cliente',
        badgeEmoji: '🤝',
        tier: 'primary',
        highlights: [
            'Proyecto real en producción activa',
            'Optimización SEO y Core Web Vitals (Lighthouse > 90)',
            'Diseño responsive mobile-first con CSS3 puro'
        ],
        demoUrl: 'https://www.tallercardonal.es/',
        clientProject: true,
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
    }
];
