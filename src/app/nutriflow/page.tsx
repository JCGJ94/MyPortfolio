import Image from 'next/image';
import { FlowDiagram } from '@/components/ui/FlowDiagram';
import { nutriflowFlow } from '@/data/diagrams';
import { CaseHeader, CaseLayout, CaseSection } from '@/components/ui/CaseHeader';

export default function NutriflowPage() {
  return (
    <main className="pv3-section pv3-detail">
      <div className="pv3-section__inner">
        <CaseHeader
          id="nutriflow"
          tier="SaaS B2B"
          title="NutriFlow"
          lede="NutriFlow — Plataforma SaaS inteligente y en fase de crecimiento (Beta) diseñada para la gestión integral de la salud nutricional. Permite a los usuarios recibir dietas personalizadas y planes de ejercicio adaptados en tiempo real mediante el motor de IA Gemini 2.0. Actualmente el producto se encuentra en fase de expansión, optimizando la experiencia de usuario y la escalabilidad del sistema."
          summary={{
 kind: "Proyecto personal",
            role: "Proyecto personal: SaaS B2B en fase Beta, con frontend, API y base de datos propios.",
            stack: [
              "Next.js 16",
              "NestJS 11",
              "Supabase (PostgreSQL)",
              "Gemini 2.0 Flash",
              "Tailwind CSS",
              "Railway"
            ],
            proves: [
              "Arquitectura separada: frontend en Next.js 16 y API modular en NestJS 11 desplegada en Railway.",
              "Autenticación por roles con Row Level Security directamente en la base de datos.",
              "Integración de IA generativa (Gemini) para generar planes de alimentación basados en macros."
            ]
          }}
          actions={[
            { label: 'Probar Demo', href: 'https://nutri-flow-mu.vercel.app/' },
            { label: 'Ver Código', href: 'https://github.com/JCGJ94/NutriFlow-Project' },
          ]}
        >
          <Image
            src="/projects/nutriflow.png"
            alt="NutriFlow Dashboard"
            width={1485}
            height={1075}
            className="pv3-detail__img"
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority
          />
        </CaseHeader>

        <section className="pv3-detail__api pv3-detail__arch">
          <h2 className="pv3-detail__label">Arquitectura</h2>
          <p className="pv3-detail__apilede">Cómo se conectan el frontend, la API, la base de datos y el motor de IA.</p>
          <FlowDiagram data={nutriflowFlow} label={nutriflowFlow.label ?? ''} className="pv3-case__diagram" />
        </section>

        <CaseLayout
          stackTitle="Stack Tecnológico"
          stack={[
            ['Frontend', 'Next.js 16 (React 19)'],
            ['Backend API', 'NestJS 11 (Railway)'],
            ['Estilos', 'Tailwind CSS 3.4'],
            ['Base de Datos', 'Supabase (PostgreSQL)'],
            ['IA Engine', 'Gemini 2.0 Flash'],
          ]}
        >
          <CaseSection title="El Problema">
            <p className="pv3-detail__pull">
              Los nutricionistas independientes dedican parte de su tiempo a tareas administrativas.
            </p>
            <ul className="pv3-detail__cards">
              <li>Armar planes de alimentación manualmente.</li>
              <li>Recordatorios de citas.</li>
              <li>Gestión de pagos.</li>
            </ul>
          </CaseSection>
          <CaseSection title="La Solución Tecnológica">
            <p className="pv3-detail__pull">Un sistema centralizado, con la inteligencia en <strong>Gemini 2.0 Flash</strong> y el motor en tiempo real de <strong>Supabase</strong>.</p>
            <ul className="pv3-detail__cards">
              <li><strong>Frontend</strong> Ecosistema de <strong>Next.js 16</strong> para una velocidad de carga excepcional.</li>
              <li><strong>Backend</strong> <strong>NestJS 11</strong> para una arquitectura modular y escalable en Railway.</li>
              <li>Autenticación por roles usando <strong>RLS (Row Level Security)</strong> directamente en la base de datos para garantizar la privacidad de los pacientes.</li>
              <li>Generador de planes de alimentación automatizado basado en macros.</li>
            </ul>
          </CaseSection>
        </CaseLayout>
      </div>
    </main>
  );
}
