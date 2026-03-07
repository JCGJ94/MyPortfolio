import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { MagneticPillButton } from '@/components/ui/MagneticPillButton';

export default function TallerCardonalPage() {
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
                            <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500">
                                🤝 Client Delivery
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">TallerCardonal.es</h1>
                            <p className="text-xl text-muted-foreground">
                                Proyecto real entregado a cliente. Gestión completa end-to-end: desde la toma de requisitos hasta el deploy en producción y el handoff.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <MagneticPillButton
                                    href="https://www.tallercardonal.es/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    label="Ver Web en Producción"
                                    variant="primary"
                                    className="px-6 py-2.5"
                                />
                            </div>
                        </div>

                        <div className="flex-1 relative aspect-video bg-muted rounded-2xl overflow-hidden border border-border shadow-2xl">
                            <Image
                                src="/projects/taller-demo.png"
                                alt="TallerCardonal Web"
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
                                <span className="font-medium">React 19 (Vite 7)</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Estilos</span>
                                <span className="font-medium">Custom CSS 3</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Deploy</span>
                                <span className="font-medium">Vercel</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Contacto</span>
                                <span className="font-medium">EmailJS</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Marketing</span>
                                <span className="font-medium">GA4 + Google Ads</span>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">El Contexto</h2>
                            <div className="prose prose-lg dark:prose-invert text-muted-foreground">
                                <p>
                                    Un taller mecánico necesitaba presencia digital profesional: una web que transmitiese confianza, mostrara servicios, facilitara el contacto y funcionase perfectamente en móvil (el 80%+ de su tráfico esperado).
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">El Proceso Profesional</h2>
                            <div className="prose prose-lg dark:prose-invert text-muted-foreground">
                                <ul>
                                    <li><strong>Discovery:</strong> Reuniones con el cliente para entender el negocio, los servicios principales, la propuesta de valor y el público objetivo.</li>
                                    <li><strong>Diseño UX:</strong> Propuesta visual enfocada en confianza y accesibilidad, con CTA claros y navegación intuitiva.</li>
                                    <li><strong>Desarrollo:</strong> Implementación con React.js + Custom CSS 3. Componentes modulares y reutilizables. Responsive design mobile-first.</li>
                                    <li><strong>Optimización:</strong> Lighthouse &gt; 90 en todas las categorías. Imágenes optimizadas en formato WebP, lazy loading, metadata SEO completamente configurada.</li>
                                    <li><strong>Entrega:</strong> Deploy en Vercel con dominio personalizado del cliente. Documentación de uso entregada. Periodo de soporte post-lanzamiento.</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">Impacto Real</h2>
                            <div className="prose prose-lg dark:prose-invert text-muted-foreground">
                                <p>
                                    No todos los proyectos necesitan un monorepo y 10 microservicios. <strong>Saber adaptar la arquitectura al contexto</strong> es una habilidad clave.
                                </p>
                                <ul>
                                    <li>Web en producción activa con tráfico real.</li>
                                    <li>Lighthouse 90+ en Performance, Accessibility, SEO, Best Practices.</li>
                                    <li>Reducción a cero de la dependencia del cliente de redes sociales como única presencia digital.</li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
