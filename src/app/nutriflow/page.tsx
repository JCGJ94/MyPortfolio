import { pageMetadata } from '@/lib/seo';
import { NutriflowContent } from './NutriflowContent';

export const metadata = pageMetadata({
  path: '/nutriflow',
  title: 'NutriFlow',
  description: 'SaaS B2B en fase Beta para gestión nutricional: dietas y planes de ejercicio personalizados con Gemini 2.0, sobre una app full-stack en Next.js y Supabase.',
});

export default function NutriflowPage() {
  return <NutriflowContent />;
}
