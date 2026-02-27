import Link from 'next/link';
import { FileText, Download, GraduationCap, Code2, Briefcase } from 'lucide-react';

export default function CVPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 bg-background overflow-hidden relative">
            <div className="container mx-auto px-4 relative z-10">
                {/* Header Section */}
                <div className="max-w-4xl mx-auto mb-16 animate-slide-up">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">C.V. <span className="text-primary">Digital</span></h1>
                    <div className="flex flex-col md:flex-row md:items-center gap-6 p-8 rounded-2xl border border-border bg-card shadow-sm">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-2">Jose Carlos González</h2>
                            <p className="text-primary font-medium mb-4 uppercase tracking-widest text-sm">Full Stack Developer | Product Mindset</p>
                            <p className="text-muted-foreground leading-relaxed italic">
                                "Desarrollador con base técnica en el ecosistema JavaScript y Python. Mi enfoque se centra en entregar soluciones prácticas y funcionales, priorizando la mantenibilidad y la experiencia de usuario real."
                            </p>
                        </div>
                        <div className="shrink-0 flex flex-col gap-3">
                            <Link
                                href="/JoseCarlos-CV.pdf"
                                target="_blank"
                                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:scale-105"
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Descargar PDF
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Skills & Education */}
                    <div className="lg:col-span-1 space-y-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
                        <section className="p-6 rounded-2xl border border-border bg-card shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <Code2 className="h-5 w-5 text-primary" />
                                <h3 className="font-bold text-lg">Tech Stack</h3>
                            </div>
                            <div className="space-y-4 text-sm">
                                <div>
                                    <p className="font-bold mb-2 text-muted-foreground uppercase text-[10px] tracking-widest">Frontend</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['React', 'Next.js', 'Tailwind', 'CSS3', 'Bootstrap'].map(s => (
                                            <span key={s} className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground font-medium text-xs">{s}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="font-bold mb-2 text-muted-foreground uppercase text-[10px] tracking-widest">Backend & DB</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['Node.js', 'Python', 'Flask', 'PostgreSQL', 'Supabase'].map(s => (
                                            <span key={s} className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground font-medium text-xs">{s}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="font-bold mb-2 text-muted-foreground uppercase text-[10px] tracking-widest">Otras</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['JWT', 'Git', 'Testing (Jest/Vitest)', 'IA Tooling'].map(s => (
                                            <span key={s} className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground font-medium text-xs">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="p-6 rounded-2xl border border-border bg-card shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <GraduationCap className="h-5 w-5 text-primary" />
                                <h3 className="font-bold text-lg">Formación</h3>
                            </div>
                            <div className="space-y-6">
                                <div className="relative pl-6 border-l-2 border-primary/20">
                                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7.5px] top-1"></div>
                                    <p className="font-bold text-sm">Bootcamp Full Stack</p>
                                    <p className="text-xs text-primary font-medium">4Geeks Academy · 2025</p>
                                </div>
                                <div className="relative pl-6 border-l-2 border-primary/20">
                                    <div className="absolute w-3 h-3 bg-primary/40 rounded-full -left-[7.5px] top-1"></div>
                                    <p className="font-bold text-sm">Técnico Microinformática</p>
                                    <p className="text-xs text-muted-foreground font-medium">FP Grado Medio · 2009 / 2024</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Full CV Content or PDF Preview */}
                    <div className="lg:col-span-2 space-y-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
                        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm overflow-hidden min-h-[600px] flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <FileText className="h-5 w-5 text-primary" />
                                    <h3 className="font-bold text-lg">Documento Original</h3>
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted px-2 py-1 rounded">Visualizador PDF</span>
                            </div>

                            <div className="flex-1 w-full rounded-xl overflow-hidden border border-border bg-white dark:bg-zinc-950 relative">
                                <iframe
                                    src="/JoseCarlos-CV.pdf#toolbar=0"
                                    className="w-full h-full min-h-[600px]"
                                    title="Jose Carlos González CV"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        </div>
    );
}
