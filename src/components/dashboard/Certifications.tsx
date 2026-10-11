'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Download, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export function Certifications() {
    const { t } = useLanguage();
    const c = t.certs;
    const certs = [
        { title: c.python, org: 'Udemy', year: '2025', link: '#' },
        { title: 'Full Stack Developer', org: '4Geeks Academy', year: '2025', link: '/certificates/Bootcamp-4geeks.pdf' },
        { title: c.micro, org: c.ministry, year: '2024', link: '/certificates/homologacion-informatica.pdf' },
    ];
    const education = [
        { title: c.bootcamp, org: '4Geeks Academy', year: '2025', detail: c.bootcampDetail },
        { title: c.courses, org: c.several, year: '2023–2025', detail: c.coursesDetail },
    ];

    return (
        <section className="py-8 w-full">
            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold tracking-tight text-orange-500 mb-2">
                    {c.heading}
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Cerificaciones Panel */}
                <motion.div
                    className="border-l-4 border-emerald-500 bg-card/60 backdrop-blur-sm shadow-sm rounded-r-2xl rounded-bl-2xl p-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Award className="h-6 w-6 text-yellow-500" />
                        <h3 className="text-xl font-bold">{c.certsTitle}</h3>
                    </div>

                    <div className="space-y-6">
                        {certs.map((cert, index) => (
                            <div key={index} className="flex flex-col border-b border-border/50 pb-4 last:border-0 last:pb-0">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-medium text-foreground">
                                        {cert.title} <span className="text-muted-foreground font-normal">— {cert.org}</span>
                                    </h4>
                                    <span className="text-xs bg-secondary py-1 px-2 rounded-md font-medium text-secondary-foreground shrink-0 ml-2">
                                        {cert.year}
                                    </span>
                                </div>
                                {cert.link !== '#' && (
                                    <Link
                                        href={cert.link}
                                        target="_blank"
                                        className="text-xs text-blue-500 hover:text-blue-600 flex items-center mt-1 w-fit"
                                    >
                                        {c.view}
                                        <ExternalLink className="h-3 w-3 ml-1" />
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Formación Panel */}
                <motion.div
                    className="border-l-4 border-cyan-500 bg-card/60 backdrop-blur-sm shadow-sm rounded-r-2xl rounded-bl-2xl p-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <GraduationCap className="h-6 w-6 text-cyan-500" />
                        <h3 className="text-xl font-bold">{c.eduTitle}</h3>
                    </div>

                    <div className="space-y-6">
                        {education.map((edu, index) => (
                            <div key={index} className="flex flex-col border-b border-border/50 pb-4 last:border-0 last:pb-0">
                                <h4 className="font-medium text-foreground mb-1">
                                    {edu.title} <span className="text-muted-foreground font-normal">— {edu.org}</span>
                                </h4>
                                <p className="text-sm text-muted-foreground flex items-center gap-2">
                                    <span className="text-xs">{edu.year}</span>
                                    <span className="w-1 h-1 rounded-full bg-border"></span>
                                    {edu.detail}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-4 border-t border-border/30">
                        <a
                            href="/JoseCarlos-CV.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-foreground hover:text-primary transition-colors"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            {c.download}
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
