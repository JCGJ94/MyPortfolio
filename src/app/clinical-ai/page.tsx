import { ClinicalAiContent } from './ClinicalAiContent';

export const metadata = {
    title: 'Clinical AI Multi-Agent',
    description: 'Backend de IA multi-agente de nivel producción para soporte en decisión clínica: triage por LLM, agentes especialistas en paralelo y RAG con pgvector. FastAPI async, LangChain (LCEL), SQLAlchemy 2.0 y despliegue containerizado.',
    alternates: { canonical: '/clinical-ai' },
    openGraph: { url: '/clinical-ai', images: ['/opengraph-image'] },
};

export default function ClinicalAiPage() {
    return <ClinicalAiContent />;
}
