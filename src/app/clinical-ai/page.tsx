import Image from 'next/image';
import { FlowDiagram } from '@/components/ui/FlowDiagram';
import { clinicalFlow } from '@/data/diagrams';
import { CaseHeader, CaseLayout, CaseSection } from '@/components/ui/CaseHeader';

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
        <main className="pv3-section pv3-detail">
            <div className="pv3-section__inner">
                <CaseHeader
                    id="clinical-ai"
                    tier="Backend IA · Producción"
                    title="Clinical AI Multi-Agent"
                    lede="Backend de IA multi-agente de nivel producción para soporte en decisión clínica. Recibe la descripción de un caso, clasifica la urgencia mediante triage con LLM, activa agentes especialistas en paralelo y devuelve una evaluación integrada y tipada, con tolerancia a fallos parciales."
                    summary={{
 kind: "Proyecto personal",
                      role: "Proyecto personal de backend con IA aplicada, diseñado y construido de extremo a extremo.",
                      stack: [
                        "Python",
                        "FastAPI (async)",
                        "LangChain LCEL",
                        "pgvector",
                        "PostgreSQL",
                        "SQLAlchemy 2.0",
                        "Pydantic v2",
                        "Docker"
                      ],
                      proves: [
                        "Orquestación asíncrona: agentes especialistas en paralelo con asyncio.gather y tolerancia a fallos parciales.",
                        "RAG por agente sobre pgvector y respuestas tipadas con Pydantic.",
                        "Servicio pensado para producción: Docker multi-stage, integración continua hacia GHCR y despliegue con Traefik."
                      ]
                    }}
                    actions={[{ label: 'Ver Repositorio', href: 'https://github.com/JCGJ94/Clinical-AI-Multi-Agent' }]}
                >
                    <pre className="pv3-detail__code" role="group" tabIndex={0} aria-label="Flujo de la API: AgentRouter, Integrator, agentes especialistas y AnalyzeOutput">
                        <code>{architecture}</code>
                    </pre>
                </CaseHeader>

                <section className="pv3-detail__api">
                    <h2 className="pv3-detail__label">La API · OpenAPI</h2>
                    <p className="pv3-detail__apilede">Superficie REST documentada con esquemas tipados: triage, análisis multi-agente y consulta de casos.</p>
                    <div className="pv3-detail__media pv3-detail__media--light">
                        <Image
                            src="/projects/clinical-ai.png"
                            alt="Documentación OpenAPI (Swagger UI) de Clinical AI Multi-Agent: endpoints de triage, análisis y casos clínicos con esquemas tipados"
                            width={1491}
                            height={1222}
                            className="pv3-detail__img"
                            sizes="(max-width: 1024px) 100vw, 1024px"
                        />
                    </div>
                </section>

                <section className="pv3-detail__api pv3-detail__arch">
                  <h2 className="pv3-detail__label">Arquitectura</h2>
                  <p className="pv3-detail__apilede">Recorrido de una petición: del endpoint al resultado tipado.</p>
                  <FlowDiagram data={clinicalFlow} label={clinicalFlow.label ?? ''} className="pv3-case__diagram" />
                </section>

                <CaseLayout
                    stackTitle="Stack Tecnológico"
                    stack={[
                        ['API', 'FastAPI 0.136 (async)'],
                        ['Agentes', 'LangChain LCEL'],
                        ['LLM', 'Nvidia NIM · Groq · OpenAI'],
                        ['Vector store', 'pgvector (RAG)'],
                        ['Base de Datos', 'PostgreSQL · SQLAlchemy 2.0 · Alembic'],
                        ['Validación', 'Pydantic v2'],
                        ['Deploy', 'Docker · GHCR · Traefik'],
                    ]}
                >
                    <CaseSection title="El Concepto">
                        <p className="pv3-detail__pull">
                            Un único endpoint recibe un caso clínico en lenguaje natural.
                        </p>
                        <ul className="pv3-detail__cards">
                            <li><strong>Router</strong> Un router basado en LLM clasifica la urgencia y decide qué agentes especialistas (emergencias, cardiología, farmacología, radiología…) necesita el caso según su contenido semántico, no solo según el nivel de urgencia.</li>
                            <li><strong>Agentes</strong> Cada agente ejecuta su propia cadena RAG independiente.</li>
                            <li><strong>Integrator</strong> Combina los resultados en una única evaluación tipada.</li>
                        </ul>
                    </CaseSection>
                    <CaseSection title="Decisiones Técnicas">
                        <ul className="pv3-detail__cards">
                            <li><strong>Triage determinista:</strong> el router corre a <code>temperature=0.0</code> para que la clasificación de urgencia y la selección de agentes sean reproducibles, no aleatorias.</li>
                            <li><strong>Activación por contenido:</strong> los agentes especialistas se activan por el contenido del caso (una lectura de ECG activa cardiología) y no por el nivel de urgencia.</li>
                            <li><strong>Ejecución paralela:</strong> todos los agentes seleccionados corren concurrentemente con <code>asyncio.gather</code>; tres agentes de ~2 s tardan ~2 s en total, no 6 s.</li>
                            <li><strong>RAG por agente:</strong> cada agente recupera guías clínicas relevantes desde pgvector vía LangChain (<code>retriever | prompt | llm | parser</code>) y parsea una respuesta tipada con Pydantic.</li>
                            <li><strong>Resiliencia:</strong> con <code>return_exceptions=True</code>, si un agente falla o expira, el resto devuelve igual su resultado; los campos <code>failed_agents</code> y <code>warnings</code> hacen explícita la degradación parcial.</li>
                            <li><strong>Proveedores intercambiables:</strong> LLM y embeddings son agnósticos del proveedor (Nvidia NIM, Groq, OpenAI, LM Studio) mediante una capa compatible con OpenAI.</li>
                        </ul>
                    </CaseSection>
                    <CaseSection title="Lo que Demuestra">
                        <p className="pv3-detail__pull">
                            Es la pieza donde la arquitectura backend y la IA aplicada se encuentran. <mark>No es una demo de LLM, es un servicio diseñado para producción.</mark>
                        </p>
                        <ul className="pv3-detail__cards">
                            <li><strong>Backend</strong> Orquestación asíncrona, recuperación semántica, contratos de datos tipados y resiliencia ante fallos parciales.</li>
                            <li><strong>Empaquetado</strong> Docker multi-stage, integración continua hacia GHCR y despliegue en VPS con Traefik y TLS automático.</li>
                        </ul>
                    </CaseSection>
                </CaseLayout>
            </div>
        </main>
    );
}
