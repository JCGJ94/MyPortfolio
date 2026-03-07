import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { MagneticPillButton } from '@/components/ui/MagneticPillButton';

export default function SportBarLeaguePage() {
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
                            <div className="inline-flex items-center rounded-full border border-secondary bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                                🧱 Technical Foundation
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">SportBarLeague</h1>
                            <p className="text-xl text-muted-foreground">
                                Plataforma full-stack para la gestión de eventos deportivos y ligas en bares. Sistema completo de autenticación JWT, CRUD avanzado, modelado relacional robusto y gestión de imágenes con Cloudinary. La base técnica sólida que consolidó los fundamentos del desarrollo backend profesional.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <MagneticPillButton
                                    href="https://github.com/JCGJ94/JCGJ94-SportBarLeague"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    label="Ver Repositorio"
                                    variant="primary"
                                    className="px-6 py-2.5"
                                />
                            </div>
                        </div>

                        <div className="flex-1 relative aspect-video bg-muted rounded-2xl overflow-hidden border border-border shadow-2xl">
                            <Image
                                src="/projects/sportbar-league-captura.png"
                                alt="SportBarLeague Interface"
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
                        <h3 className="text-lg font-bold mb-6">Stack Tecnológico</h3>
                        <ul className="space-y-4">
                            <li className="flex justify-between items-center border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Frontend</span>
                                <span className="font-medium">React 18 (Vite)</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Estilos</span>
                                <span className="font-medium">Sass + Bootstrap 5</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Backend API</span>
                                <span className="font-medium">Flask (Python 3.13)</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Base de Datos</span>
                                <span className="font-medium">PostgreSQL + SQLAlchemy</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Deploy</span>
                                <span className="font-medium">Render (Docker)</span>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">El Concepto</h2>
                            <div className="prose prose-lg dark:prose-invert text-muted-foreground">
                                <p>
                                    Plataforma para gestión de ligas deportivas en bares/pubs. Los usuarios pueden crear ligas, registrar equipos, gestionar resultados y seguir clasificaciones. El proyecto exigía un sistema completo de autenticación y un modelo de datos relacional robusto.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">Decisiones Técnicas</h2>
                            <div className="prose prose-lg dark:prose-invert text-muted-foreground">
                                <ul>
                                    <li><strong>Autenticación JWT manual:</strong> Registro, login, protección de rutas y refresh tokens estructurados desde cero, sin depender de un servicio de Auth en la nube.</li>
                                    <li><strong>API REST con Flask:</strong> Endpoints diseñados profesionalmente, con separación de controladores, validación exhaustiva de payloads y manejo de errores consistente.</li>
                                    <li><strong>Modelado Relacional (SQLAlchemy):</strong> Relaciones complejas N:M (jugadores-equipos), 1:N (liga-equipos), foreign keys correctas y uso de constraints. Migraciones versionadas vía Alembic.</li>
                                    <li><strong>Frontend integrado:</strong> Componentes reutilizables React, manejo de estado global, consumo de API e intercepción de tokens JSON Web.</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">La Evolución Profesional</h2>
                            <div className="prose prose-lg dark:prose-invert text-muted-foreground">
                                <p>
                                    SportBarLeague fue el proyecto que consolidó todos los fundamentos imprescindibles del desarrollo backend serio. Después de orquestar autenticación, bases de datos relacionales y API REST de forma manual, el salto hacia arquitecturas más abstractas en proyectos superiores fue completamente natural: cada decisión avanzada en nuevos sistemas tiene sus raíces en lo asimilado aquí.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
