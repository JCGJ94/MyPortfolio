'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Download, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const certs = [
    {
        title: 'Python Backend con Flask',
        org: 'Udemy',
        year: '2025',
        link: '#',
    },
    {
        title: 'Full Stack Developer',
        org: '4Geeks Academy',
        year: '2025',
        link: '/certificates/Bootcamp-4geeks.pdf',
    },
    {
        title: 'Técnico en Microinformática y Redes',
        org: 'MINISTERIO FORMACIÓN PROFESIONAL',
        year: '2024',
        link: '/certificates/homologacion-informatica.pdf',
    },
];

const education = [
    {
        title: 'Bootcamp Full Stack',
        org: '4Geeks Academy',
        year: '2025',
        detail: 'React, JS, APIs REST, Flask y SQL.',
    },
    {
        title: 'Cursos Complementarios',
        org: 'Varios',
        year: '2023–2025',
        detail: 'Git, Testing, Accesibilidad, Despliegue.',
    },
];

export function Certifications() {
    return (
        <section className="py-8 w-full">
            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold tracking-tight text-orange-500 mb-2">
                    Certificaciones & Formación
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
                        <h3 className="text-xl font-bold">Certificaciones</h3>
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
                                        Ver credencial
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
                        <h3 className="text-xl font-bold">Formación</h3>
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
                        <Link
                            href="/JoseCarlos-CV.pdf"
                            target="_blank"
                            className="inline-flex items-center text-sm text-foreground hover:text-primary transition-colors"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Descargar CV (PDF)
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
