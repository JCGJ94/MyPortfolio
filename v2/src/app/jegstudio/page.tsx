import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { MagneticPillButton } from '@/components/ui/MagneticPillButton';

export default function JEGStudioPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                <Link
                    href="/#projects"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8 animate-fade-in"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a Proyectos
                </Link>
                <section className="mb-20 animate-slide-up" style={{ animationDelay: '100ms' }}>
                    <div className="flex flex-col lg:flex-row gap-12 lg:items-center">
                        <div className="flex-1 space-y-6">
                            <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500">
                                👥 Team Project
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">JEG Studio</h1>
                            <p className="text-xl text-muted-foreground">
                                Landing page profesional y MVP para un equipo de desarrolladores y creativos. Proyecto colaborativo con control de versiones profesional, code review y participación activa en decisiones de arquitectura y diseño.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <MagneticPillButton
                                    href="https://www.jegsdev.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    label="Ver Demo"
                                    variant="primary"
                                    className="px-6 py-2.5"
                                />
                                <MagneticPillButton
                                    href="https://github.com/JCGJ94/CodeNinja"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    label="Ver Repositorio"
                                    variant="ghost"
                                    className="px-6 py-2.5"
                                />
                            </div>
                        </div>

                        <div className="flex-1 relative aspect-video bg-muted rounded-2xl overflow-hidden border border-border shadow-2xl">
                            <Image
                                src="/projects/JegStudio.png"
                                alt="JEG Studio Project"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        </div>
                    </div>
                </section>

                <div className="grid md:grid-cols-3 gap-12 border-t border-border pt-20 animate-slide-up" style={{ animationDelay: '200ms' }}>
                    <div className="md:col-span-1 border-r border-border pr-8">
                        <h3 className="text-lg font-bold mb-6">Stack & Prácticas</h3>
                        <ul className="space-y-4">
                            <li className="flex justify-between items-center border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Framework</span>
                                <span className="font-medium">Next.js 14 (React 18)</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Estilos</span>
                                <span className="font-medium">Tailwind CSS 3.4</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Flujo</span>
                                <span className="font-medium">Git Flow</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Calidad</span>
                                <span className="font-medium">Code Review</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Deploy</span>
                                <span className="font-medium">Vercel</span>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">El Contexto</h2>
                            <div className="prose prose-lg dark:prose-invert text-muted-foreground">
                                <p>
                                    Proyecto colaborativo con otros desarrolladores donde el objetivo era construir una solución web completa trabajando como un equipo de desarrollo real, no como individuos que juntan código al final.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">Dinámica de Equipo</h2>
                            <div className="prose prose-lg dark:prose-invert text-muted-foreground">
                                <ul>
                                    <li><strong>Git Flow profesional:</strong> Branches por feature (<code>feat/</code>), por fix (<code>fix/</code>), PRs obligatorios con al menos un reviewer. Nada se mergeaba a <code>main</code> sin revisión.</li>
                                    <li><strong>Decisiones compartidas:</strong> Definición de estructura de carpetas, convenciones de naming, estrategia de estilado y modelo de datos consensuados en equipo.</li>
                                    <li><strong>Coordinación técnica:</strong> Sincronización diaria sobre el estado de cada feature, resolución proactiva de conflictos, y pair programming para módulos críticos.</li>
                                    <li><strong>Responsabilidad individual:</strong> Cada miembro tenía ownership de features completas, pero el equipo revisaba y aprobaba todo.</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">Habilidades Demostradas</h2>
                            <div className="prose prose-lg dark:prose-invert text-muted-foreground">
                                <ul>
                                    <li>Capacidad real de colaboración, excediendo el "trabajar solo y subir a un repo compartido".</li>
                                    <li>Experiencia con flujos de trabajo profesionales que replican entornos organizacionales (PRs, Issues, agile).</li>
                                    <li>Habilidad para comunicar decisiones técnicas y defender propuestas de arquitectura ante colegas.</li>
                                    <li>Empatía técnica: adaptar el código propio para que otros lo entiendan y lo puedan mantener a futuro.</li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
