import { pageMetadata } from '@/lib/seo';
import { ClinicalAiContent } from './ClinicalAiContent';

export const metadata = pageMetadata({
  path: '/clinical-ai',
  title: 'Clinical AI Multi-Agent',
  description: 'Backend de IA multi-agente para soporte clínico: triage por LLM, agentes especialistas en paralelo y RAG con pgvector. FastAPI async y LangChain.',
});

export default function ClinicalAiPage() {
    return <ClinicalAiContent />;
}
