import { NutriflowContent } from './NutriflowContent';

export const metadata = {
  title: 'NutriFlow',
  description: 'SaaS B2B en fase Beta para gestión nutricional: dietas y planes de ejercicio personalizados con Gemini 2.0, frontend en Next.js y API en NestJS.',
  alternates: { canonical: '/nutriflow' },
  openGraph: { url: '/nutriflow', images: ['/opengraph-image'] },
};

export default function NutriflowPage() {
  return <NutriflowContent />;
}
