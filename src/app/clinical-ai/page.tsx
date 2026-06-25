import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MagneticPillButton } from '@/components/ui/MagneticPillButton';

export const metadata = {
    title: 'Clinical AI Multi-Agent',
    description: 'Backend de IA multi-agente de nivel producción para soporte en decisión clínica: triage por LLM, agentes especialistas en paralelo y RAG con pgvector. FastAPI async, LangChain (LCEL), SQLAlchemy 2.0 y despliegue containerizado.',
};

const architecture = `POST /clinical-case/analyze
        │
        ▼
   AgentRouter   ── triage LLM (temp=0.0)
   urgencia + agentes sugeridos
        │
        ▼
   Integrator ── asyncio.gather (paralelo)
   ┌───────────────┬───────────────┐
   ClinicalAgent   EmergencyAgent  CardiologyAgent ...
   │   cada agente: retriever | prompt | llm | parser
   │   (RAG sobre guías clínicas en pgvector)
   └───────────────┴───────────────┘
        │
        ▼
   AnalyzeOutput
   summary · findings · red_flags ·
   recommendations · confidence ·
   failed_agents · warnings`;

export default function ClinicalAiPage() {
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
                                🤖 Backend IA · Producción
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Clinical AI Multi-Agent</h1>
                            <p className="text-xl text-muted-foreground">
                                Backend de IA multi-agente de nivel producción para soporte en decisión clínica. Recibe la descripción de un caso, clasifica la urgencia mediante triage con LLM, activa agentes especialistas en paralelo y devuelve una evaluación integrada y tipada, con tolerancia a fallos parciales.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <MagneticPillButton
                                    href="https://github.com/JCGJ94/Clinical-AI-Multi-Agent"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    label="Ver Repositorio"
                                    variant="primary"
                                    className="px-6 py-2.5"
                                />
                            </div>
                        </div>

                        <div className="flex-1 relative rounded-2xl overflow-hidden border border-border shadow-2xl bg-muted/30">
                            <pre className="overflow-x-auto p-5 text-[11px] md:text-xs leading-relaxed font-mono text-muted-foreground">
                                <code>{architecture}</code>
                            </pre>
                        </div>
                    </div>
                </section>

                <section className="mb-20 animate-slide-up" style={{ animationDelay: '150ms' }}>
                    <h2 className="text-2xl font-bold mb-2">La API · OpenAPI</h2>
                    <p className="text-muted-foreground mb-6">Superficie REST documentada con esquemas tipados: triage, análisis multi-agente y consulta de casos.</p>
                    <div className="rounded-2xl overflow-hidden border border-border shadow-xl bg-white">
                        <Image
                            src="/projects/clinical-ai.png"
                            alt="Documentación OpenAPI (Swagger UI) de Clinical AI Multi-Agent: endpoints de triage, análisis y casos clínicos con esquemas tipados"
                            width={1491}
                            height={1222}
                            className="w-full h-auto"
                            sizes="(max-width: 1024px) 100vw, 1024px"
                        />
                    </div>
                </section>

                <div className="grid md:grid-cols-3 gap-12 border-t border-border pt-20 animate-slide-up" style={{ animationDelay: '200ms' }}>
                    <div className="md:col-span-1 border-r border-border pr-8">
                        <h3 className="text-lg font-bold mb-6">Stack Tecnológico</h3>
                        <ul className="space-y-4">
                            <li className="flex justify-between items-center border-b border-border/50 pb-2 gap-4">
                                <span className="text-muted-foreground shrink-0">API</span>
                                <span className="font-medium text-right">FastAPI 0.136 (async)</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-border/50 pb-2 gap-4">
                                <span className="text-muted-foreground shrink-0">Agentes</span>
                                <span className="font-medium text-right">LangChain LCEL</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-border/50 pb-2 gap-4">
                                <span className="text-muted-foreground shrink-0">LLM</span>
                                <span className="font-medium text-right">Nvidia NIM · Groq · OpenAI</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-border/50 pb-2 gap-4">
                                <span className="text-muted-foreground shrink-0">Vector store</span>
                                <span className="font-medium text-right">pgvector (RAG)</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-border/50 pb-2 gap-4">
                                <span className="text-muted-foreground shrink-0">Base de Datos</span>
                                <span className="font-medium text-right">PostgreSQL · SQLAlchemy 2.0 · Alembic</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-border/50 pb-2 gap-4">
                                <span className="text-muted-foreground shrink-0">Validación</span>
                                <span className="font-medium text-right">Pydantic v2</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-border/50 pb-2 gap-4">
                                <span className="text-muted-foreground shrink-0">Deploy</span>
                                <span className="font-medium text-right">Docker · GHCR · Traefik</span>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">El Concepto</h2>
                            <div className="prose prose-lg dark:prose-invert text-muted-foreground">
                                <p>
                                    Un único endpoint recibe un caso clínico en lenguaje natural. Un router basado en LLM clasifica la urgencia y decide qué agentes especialistas (emergencias, cardiología, farmacología, radiología…) necesita el caso según su contenido semántico, no solo según el nivel de urgencia. Cada agente ejecuta su propia cadena RAG independiente y el Integrator combina los resultados en una única evaluación tipada.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">Decisiones Técnicas</h2>
                            <div className="prose prose-lg dark:prose-invert text-muted-foreground">
                                <ul>
                                    <li><strong>Triage determinista:</strong> el router corre a <code>temperature=0.0</code> para que la clasificación de urgencia y la selección de agentes sean reproducibles, no aleatorias.</li>
                                    <li><strong>Activación por contenido:</strong> los agentes especialistas se activan por el contenido del caso (una lectura de ECG activa cardiología) y no por el nivel de urgencia.</li>
                                    <li><strong>Ejecución paralela:</strong> todos los agentes seleccionados corren concurrentemente con <code>asyncio.gather</code>; tres agentes de ~2 s tardan ~2 s en total, no 6 s.</li>
                                    <li><strong>RAG por agente:</strong> cada agente recupera guías clínicas relevantes desde pgvector vía LangChain (<code>retriever | prompt | llm | parser</code>) y parsea una respuesta tipada con Pydantic.</li>
                                    <li><strong>Resiliencia:</strong> con <code>return_exceptions=True</code>, si un agente falla o expira, el resto devuelve igual su resultado; los campos <code>failed_agents</code> y <code>warnings</code> hacen explícita la degradación parcial.</li>
                                    <li><strong>Proveedores intercambiables:</strong> LLM y embeddings son agnósticos del proveedor (Nvidia NIM, Groq, OpenAI, LM Studio) mediante una capa compatible con OpenAI.</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">Lo que Demuestra</h2>
                            <div className="prose prose-lg dark:prose-invert text-muted-foreground">
                                <p>
                                    Es la pieza donde la arquitectura backend y la IA aplicada se encuentran: orquestación asíncrona, recuperación semántica, contratos de datos tipados y resiliencia ante fallos parciales, todo empaquetado con Docker multi-stage, integración continua hacia GHCR y despliegue en VPS con Traefik y TLS automático. No es una demo de LLM, es un servicio diseñado para producción.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
