import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { MagneticPillButton } from '@/components/ui/MagneticPillButton';

export default function NutriflowPage() {
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
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                SaaS B2B
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">NutriFlow</h1>
              <p className="text-xl text-muted-foreground">
                NutriFlow — Plataforma SaaS inteligente y en fase de crecimiento (Beta) diseñada para la gestión integral de la salud nutricional.
                Permite a los usuarios recibir dietas personalizadas y planes de ejercicio adaptados en tiempo real mediante el motor de IA Gemini 2.0.
                Actualmente el producto se encuentra en fase de expansión, optimizando la experiencia de usuario y la escalabilidad del sistema.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <MagneticPillButton
                  href="https://nutri-flow-mu.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  label="Probar Demo"
                  variant="primary"
                  className="px-6 py-2.5"
                />
                <MagneticPillButton
                  href="https://github.com/JCGJ94/NutriFlow-Project"
                  target="_blank"
                  rel="noopener noreferrer"
                  label="Ver Código"
                  variant="ghost"
                  className="px-6 py-2.5"
                />
              </div>
            </div>

            <div className="flex-1 relative aspect-video bg-muted rounded-2xl overflow-hidden border border-border shadow-2xl">
              <Image
                src="/projects/nutriflow.png"
                alt="NutriFlow Dashboard"
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
                <span className="font-medium">Next.js 16 (React 19)</span>
              </li>
              <li className="flex justify-between items-center border-b border-border/50 pb-2">
                <span className="text-muted-foreground">Backend API</span>
                <span className="font-medium">NestJS 11 (Railway)</span>
              </li>
              <li className="flex justify-between items-center border-b border-border/50 pb-2">
                <span className="text-muted-foreground">Estilos</span>
                <span className="font-medium">Tailwind CSS 3.4</span>
              </li>
              <li className="flex justify-between items-center border-b border-border/50 pb-2">
                <span className="text-muted-foreground">Base de Datos</span>
                <span className="font-medium">Supabase (PostgreSQL)</span>
              </li>
              <li className="flex justify-between items-center border-b border-border/50 pb-2">
                <span className="text-muted-foreground">IA Engine</span>
                <span className="font-medium">Gemini 2.0 Flash</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4">El Problema</h2>
              <div className="prose prose-lg dark:prose-invert text-muted-foreground">
                <p>
                  Los nutricionistas independientes invierten cerca del 40% de su tiempo en tareas administrativas
                  como armar planes de alimentación manualmente, recordatorios de citas y gestión de pagos.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">La Solución Tecnológica</h2>
              <div className="prose prose-lg dark:prose-invert text-muted-foreground">
                <p>
                  Desarrollé un sistema centralizado aprovechando el ecosistema de <strong>Next.js 16</strong> para una velocidad de carga excepcional y <strong>NestJS 11</strong> en el backend para una arquitectura modular y escalable en Railway.
                  La inteligencia del sistema reside en la integración con <strong>Gemini 2.0 Flash</strong> y el motor en tiempo real de <strong>Supabase</strong>.
                </p>
                <ul>
                  <li>Arquitectura <em>Serverless</em> que reduce el costo de infraestructura en un 80%.</li>
                  <li>Autenticación por roles usando <strong>RLS (Row Level Security)</strong> directamente en la base de datos para garantizar la privacidad de los pacientes.</li>
                  <li>Generador de planes de alimentación automatizado basado en macros.</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div >
  );
}
