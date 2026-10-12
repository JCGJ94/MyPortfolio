import { pageMetadata } from '@/lib/seo';
import { NutriflowContent } from './NutriflowContent';

export const metadata = pageMetadata({
  path: '/nutriflow',
  title: 'NutriFlow',
  description: 'SaaS B2B en fase Beta para gestión nutricional: dietas y planes de ejercicio personalizados con Gemini 2.0, frontend en Next.js y API en NestJS.',
});

export default function NutriflowPage() {
  return <NutriflowContent />;
}
