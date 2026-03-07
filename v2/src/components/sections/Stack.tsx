'use client';

import { motion } from 'framer-motion';
import {
    Code2,
    Server,
    Database,
    Cpu,
    Terminal,
    MessageCircle
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Stack() {
    const { t } = useLanguage();

    const technologies = [
        {
            category: t.stack.categories.backend,
            icon: <Server className="h-6 w-6 text-emerald-500" />,
            items: ['Python', 'Flask', 'FastAPI', 'REST APIs', 'JWT', 'SQLAlchemy', 'Node.js', 'NestJS']
        },
        {
            category: t.stack.categories.frontend,
            icon: <Code2 className="h-6 w-6 text-blue-500" />,
            items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS']
        },
        {
            category: t.stack.categories.database,
            icon: <Database className="h-6 w-6 text-orange-500" />,
            items: ['PostgreSQL', 'Supabase', 'SQLAlchemy', 'Relational Modeling', 'Railway', 'Vercel', 'Git']
        },
        {
            category: t.stack.categories.ia,
            icon: <Cpu className="h-6 w-6 text-amber-500" />,
            items: ['Gemini API', 'LLM Orchestration', 'Agent Architecture', 'Advanced Prompting', 'AI Automation', 'Tool Calling']
        },
        {
            category: t.stack.categories.development,
            icon: <Terminal className="h-6 w-6 text-zinc-500" />,
            items: ['GitHub', 'VSCode', 'Postman', 'Testing', 'SOLID', 'Clean Code']
        },
        {
            category: t.stack.categories.communication,
            icon: <MessageCircle className="h-6 w-6 text-pink-500" />,
            items: ['Español (Nativo)', 'Inglés (Intermedio)']
        }
    ];

    return (
        <section id="stack" className="py-10 lg:py-16 bg-background relative overflow-hidden flex flex-col justify-center min-h-[100dvh]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="mb-10 md:mb-14 text-center max-w-3xl mx-auto flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-center mb-4 animate-fade-in relative inline-block overflow-hidden text-balance">
                        {t.stack.title} <span className="text-primary">{t.stack.titleSpan}</span>
                        <motion.span
                            className="absolute bottom-0 left-0 w-full h-1 bg-primary/20 -z-10"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        />
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium max-w-xl mx-auto">
                        {t.stack.description}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-(--perspective-deep)">
                    {technologies.map((tech, i) => (
                        <motion.div
                            key={tech.category}
                            className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 group relative overflow-hidden transform-3d hover:rotate-y-6 hover:rotate-x-2 @container shadow-sm hover:shadow-xl hover:shadow-primary/5"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            {/* Animated background shape */}
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />

                            <div className="flex items-center gap-4 mb-6">
                                <motion.div
                                    className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-border shadow-sm"
                                    whileHover={{ rotate: 180 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                >
                                    {tech.icon}
                                </motion.div>
                                <h3 className="text-xl font-bold tracking-tight">{tech.category}</h3>
                            </div>

                            <ul className="flex flex-wrap gap-2 relative z-10">
                                {tech.items.map((item, j) => (
                                    <motion.li
                                        key={item}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: (i * 0.1) + (j * 0.05) }}
                                        whileHover={{ scale: 1.1 }}
                                        className="px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-sm font-medium border border-border/50 cursor-default transition-colors hover:bg-primary hover:text-white"
                                    >
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        </section>
    );
}
