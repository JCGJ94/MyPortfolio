// Clinical AI Multi-Agent case page copy. `es` is the original text, byte for byte.
import type { Language } from '@/data/translations';
import type { ClinicalAiCopy } from './types';

// Request-flow sketch: only the five comment fragments are translated; identifiers stay as written.
const sketch = (l: { triage: string; urgency: string; parallel: string; each: string; rag: string }) => `POST /clinical-case/analyze
        │
        ▼
   AgentRouter   ── ${l.triage} (temp=0.0)
   ${l.urgency}
        │
        ▼
   Integrator ── asyncio.gather (${l.parallel})
   ┌───────────────┬───────────────┐
   ClinicalAgent   EmergencyAgent  CardiologyAgent ...
   │   ${l.each}: retriever | prompt | llm | parser
   │   (${l.rag})
   └───────────────┴───────────────┘
        │
        ▼
   AnalyzeOutput
   summary · findings · red_flags ·
   recommendations · confidence ·
   failed_agents · warnings`;

const es: ClinicalAiCopy = {
  header: {
    tier: 'Backend IA · Producción',
    title: 'Clinical AI Multi-Agent',
    lede: 'Backend de IA multi-agente de nivel producción para soporte en decisión clínica. Recibe la descripción de un caso, clasifica la urgencia mediante triage con LLM, activa agentes especialistas en paralelo y devuelve una evaluación integrada y tipada, con tolerancia a fallos parciales.',
    summary: {
      kind: 'Proyecto personal',
      role: 'Proyecto personal de backend con IA aplicada, diseñado y construido de extremo a extremo.',
      stack: ['Python', 'FastAPI (async)', 'LangChain LCEL', 'pgvector', 'PostgreSQL', 'SQLAlchemy 2.0', 'Pydantic v2', 'Docker'],
      proves: [
        'Orquestación asíncrona: agentes especialistas en paralelo con asyncio.gather y tolerancia a fallos parciales.',
        'RAG por agente sobre pgvector y respuestas tipadas con Pydantic.',
        'Servicio pensado para producción: Docker multi-stage, integración continua hacia GHCR y despliegue con Traefik.',
      ],
    },
    actions: ['Ver Repositorio'],
  },
  architecture: sketch({ triage: 'triage LLM', urgency: 'urgencia + agentes sugeridos', parallel: 'paralelo', each: 'cada agente', rag: 'RAG sobre guías clínicas en pgvector' }),
  codeLabel: 'Flujo de la API: AgentRouter, Integrator, agentes especialistas y AnalyzeOutput',
  apiTitle: 'La API · OpenAPI',
  apiLede: 'Superficie REST documentada con esquemas tipados: triage, análisis multi-agente y consulta de casos.',
  apiImageAlt: 'Documentación OpenAPI (Swagger UI) de Clinical AI Multi-Agent: endpoints de triage, análisis y casos clínicos con esquemas tipados',
  archTitle: 'Arquitectura',
  archLede: 'Recorrido de una petición: del endpoint al resultado tipado.',
  stackTitle: 'Stack Tecnológico',
  stack: [
    ['API', 'FastAPI 0.136 (async)'],
    ['Agentes', 'LangChain LCEL'],
    ['LLM', 'Nvidia NIM · Groq · OpenAI'],
    ['Vector store', 'pgvector (RAG)'],
    ['Base de Datos', 'PostgreSQL · SQLAlchemy 2.0 · Alembic'],
    ['Validación', 'Pydantic v2'],
    ['Deploy', 'Docker · GHCR · Traefik'],
  ],
  concept: {
    title: 'El Concepto',
    pull: 'Un único endpoint recibe un caso clínico en lenguaje natural.',
    items: [
      { lead: 'Router', text: 'Un router basado en LLM clasifica la urgencia y decide qué agentes especialistas (emergencias, cardiología, farmacología, radiología…) necesita el caso según su contenido semántico, no solo según el nivel de urgencia.' },
      { lead: 'Agentes', text: 'Cada agente ejecuta su propia cadena RAG independiente.' },
      { lead: 'Integrator', text: 'Combina los resultados en una única evaluación tipada.' },
    ],
  },
  decisions: {
    title: 'Decisiones Técnicas',
    triage: { lead: 'Triage determinista:', before: 'el router corre a ', after: ' para que la clasificación de urgencia y la selección de agentes sean reproducibles, no aleatorias.' },
    content: { lead: 'Activación por contenido:', text: 'los agentes especialistas se activan por el contenido del caso (una lectura de ECG activa cardiología) y no por el nivel de urgencia.' },
    parallel: { lead: 'Ejecución paralela:', before: 'todos los agentes seleccionados corren concurrentemente con ', after: '; tres agentes de ~2 s tardan ~2 s en total, no 6 s.' },
    rag: { lead: 'RAG por agente:', before: 'cada agente recupera guías clínicas relevantes desde pgvector vía LangChain (', after: ') y parsea una respuesta tipada con Pydantic.' },
    resilience: { lead: 'Resiliencia:', before: 'con ', mid: ', si un agente falla o expira, el resto devuelve igual su resultado; los campos ', and: ' y ', after: ' hacen explícita la degradación parcial.' },
    providers: { lead: 'Proveedores intercambiables:', text: 'LLM y embeddings son agnósticos del proveedor (Nvidia NIM, Groq, OpenAI, LM Studio) mediante una capa compatible con OpenAI.' },
  },
  proves: {
    title: 'Lo que Demuestra',
    pull: ['Es la pieza donde la arquitectura backend y la IA aplicada se encuentran.', 'No es una demo de LLM, es un servicio diseñado para producción.'],
    items: [
      { lead: 'Backend', text: 'Orquestación asíncrona, recuperación semántica, contratos de datos tipados y resiliencia ante fallos parciales.' },
      { lead: 'Empaquetado', text: 'Docker multi-stage, integración continua hacia GHCR y despliegue en VPS con Traefik y TLS automático.' },
    ],
  },
};

const en: ClinicalAiCopy = {
  header: {
    tier: 'AI Backend · Production',
    title: 'Clinical AI Multi-Agent',
    lede: 'Production-grade multi-agent AI backend for clinical decision support. It receives the description of a case, classifies urgency through LLM triage, activates specialist agents in parallel and returns an integrated, typed assessment, tolerant to partial failures.',
    summary: {
      kind: 'Personal project',
      role: 'Personal backend project with applied AI, designed and built end to end.',
      stack: ['Python', 'FastAPI (async)', 'LangChain LCEL', 'pgvector', 'PostgreSQL', 'SQLAlchemy 2.0', 'Pydantic v2', 'Docker'],
      proves: [
        'Asynchronous orchestration: specialist agents in parallel with asyncio.gather and tolerance to partial failures.',
        'Per-agent RAG over pgvector and typed responses with Pydantic.',
        'A service built for production: multi-stage Docker, continuous integration to GHCR and deployment with Traefik.',
      ],
    },
    actions: ['View Repository'],
  },
  architecture: sketch({ triage: 'LLM triage', urgency: 'urgency + suggested agents', parallel: 'parallel', each: 'each agent', rag: 'RAG over clinical guidelines in pgvector' }),
  codeLabel: 'API flow: AgentRouter, Integrator, specialist agents and AnalyzeOutput',
  apiTitle: 'The API · OpenAPI',
  apiLede: 'REST surface documented with typed schemas: triage, multi-agent analysis and case lookup.',
  apiImageAlt: 'OpenAPI documentation (Swagger UI) of Clinical AI Multi-Agent: triage, analysis and clinical case endpoints with typed schemas',
  archTitle: 'Architecture',
  archLede: 'Journey of a request: from the endpoint to the typed result.',
  stackTitle: 'Tech Stack',
  stack: [
    ['API', 'FastAPI 0.136 (async)'],
    ['Agents', 'LangChain LCEL'],
    ['LLM', 'Nvidia NIM · Groq · OpenAI'],
    ['Vector store', 'pgvector (RAG)'],
    ['Database', 'PostgreSQL · SQLAlchemy 2.0 · Alembic'],
    ['Validation', 'Pydantic v2'],
    ['Deploy', 'Docker · GHCR · Traefik'],
  ],
  concept: {
    title: 'The Concept',
    pull: 'A single endpoint receives a clinical case in natural language.',
    items: [
      { lead: 'Router', text: 'An LLM-based router classifies urgency and decides which specialist agents (emergency, cardiology, pharmacology, radiology…) the case needs based on its semantic content, not just on the urgency level.' },
      { lead: 'Agents', text: 'Each agent runs its own independent RAG chain.' },
      { lead: 'Integrator', text: 'Combines the results into a single typed assessment.' },
    ],
  },
  decisions: {
    title: 'Technical Decisions',
    triage: { lead: 'Deterministic triage:', before: 'the router runs at ', after: ' so that urgency classification and agent selection are reproducible, not random.' },
    content: { lead: 'Content-based activation:', text: 'specialist agents are activated by the content of the case (an ECG reading activates cardiology) and not by the urgency level.' },
    parallel: { lead: 'Parallel execution:', before: 'all selected agents run concurrently with ', after: '; three agents of ~2 s take ~2 s in total, not 6 s.' },
    rag: { lead: 'Per-agent RAG:', before: 'each agent retrieves relevant clinical guidelines from pgvector via LangChain (', after: ') and parses a typed response with Pydantic.' },
    resilience: { lead: 'Resilience:', before: 'with ', mid: ', if an agent fails or times out, the rest still return their result; the ', and: ' and ', after: ' fields make the partial degradation explicit.' },
    providers: { lead: 'Interchangeable providers:', text: 'LLM and embeddings are provider-agnostic (Nvidia NIM, Groq, OpenAI, LM Studio) through an OpenAI-compatible layer.' },
  },
  proves: {
    title: 'What It Demonstrates',
    pull: ['It is the piece where backend architecture and applied AI meet.', 'It is not an LLM demo, it is a service designed for production.'],
    items: [
      { lead: 'Backend', text: 'Asynchronous orchestration, semantic retrieval, typed data contracts and resilience to partial failures.' },
      { lead: 'Packaging', text: 'Multi-stage Docker, continuous integration to GHCR and VPS deployment with Traefik and automatic TLS.' },
    ],
  },
};

const de: ClinicalAiCopy = {
  header: {
    tier: 'KI-Backend · Produktion',
    title: 'Clinical AI Multi-Agent',
    lede: 'Produktionsreifes Multi-Agent-KI-Backend zur Unterstützung klinischer Entscheidungen. Es nimmt die Beschreibung eines Falls entgegen, klassifiziert die Dringlichkeit per LLM-Triage, aktiviert spezialisierte Agenten parallel und liefert eine integrierte, typisierte Bewertung, die gegenüber Teilausfällen tolerant ist.',
    summary: {
      kind: 'Persönliches Projekt',
      role: 'Persönliches Backend-Projekt mit angewandter KI, von Anfang bis Ende entworfen und gebaut.',
      stack: ['Python', 'FastAPI (async)', 'LangChain LCEL', 'pgvector', 'PostgreSQL', 'SQLAlchemy 2.0', 'Pydantic v2', 'Docker'],
      proves: [
        'Asynchrone Orchestrierung: spezialisierte Agenten parallel mit asyncio.gather und Toleranz gegenüber Teilausfällen.',
        'RAG pro Agent über pgvector und typisierte Antworten mit Pydantic.',
        'Ein für die Produktion gedachter Service: Multi-Stage-Docker, Continuous Integration nach GHCR und Deployment mit Traefik.',
      ],
    },
    actions: ['Repository ansehen'],
  },
  architecture: sketch({ triage: 'LLM-Triage', urgency: 'Dringlichkeit + vorgeschlagene Agenten', parallel: 'parallel', each: 'jeder Agent', rag: 'RAG über klinische Leitlinien in pgvector' }),
  codeLabel: 'API-Ablauf: AgentRouter, Integrator, spezialisierte Agenten und AnalyzeOutput',
  apiTitle: 'Die API · OpenAPI',
  apiLede: 'Dokumentierte REST-Oberfläche mit typisierten Schemas: Triage, Multi-Agent-Analyse und Fallabfrage.',
  apiImageAlt: 'OpenAPI-Dokumentation (Swagger UI) von Clinical AI Multi-Agent: Endpoints für Triage, Analyse und klinische Fälle mit typisierten Schemas',
  archTitle: 'Architektur',
  archLede: 'Weg einer Anfrage: vom Endpoint zum typisierten Ergebnis.',
  stackTitle: 'Tech-Stack',
  stack: [
    ['API', 'FastAPI 0.136 (async)'],
    ['Agenten', 'LangChain LCEL'],
    ['LLM', 'Nvidia NIM · Groq · OpenAI'],
    ['Vector store', 'pgvector (RAG)'],
    ['Datenbank', 'PostgreSQL · SQLAlchemy 2.0 · Alembic'],
    ['Validierung', 'Pydantic v2'],
    ['Deploy', 'Docker · GHCR · Traefik'],
  ],
  concept: {
    title: 'Das Konzept',
    pull: 'Ein einziger Endpoint nimmt einen klinischen Fall in natürlicher Sprache entgegen.',
    items: [
      { lead: 'Router', text: 'Ein LLM-basierter Router klassifiziert die Dringlichkeit und entscheidet anhand des semantischen Inhalts, welche spezialisierten Agenten (Notfallmedizin, Kardiologie, Pharmakologie, Radiologie …) der Fall braucht, nicht nur anhand der Dringlichkeitsstufe.' },
      { lead: 'Agenten', text: 'Jeder Agent führt seine eigene, unabhängige RAG-Kette aus.' },
      { lead: 'Integrator', text: 'Führt die Ergebnisse zu einer einzigen typisierten Bewertung zusammen.' },
    ],
  },
  decisions: {
    title: 'Technische Entscheidungen',
    triage: { lead: 'Deterministische Triage:', before: 'Der Router läuft mit ', after: ', damit die Dringlichkeitsklassifizierung und die Agentenauswahl reproduzierbar und nicht zufällig sind.' },
    content: { lead: 'Aktivierung nach Inhalt:', text: 'Die spezialisierten Agenten werden durch den Inhalt des Falls aktiviert (eine EKG-Auswertung aktiviert die Kardiologie) und nicht durch die Dringlichkeitsstufe.' },
    parallel: { lead: 'Parallele Ausführung:', before: 'Alle ausgewählten Agenten laufen gleichzeitig mit ', after: '; drei Agenten mit je ~2 s brauchen insgesamt ~2 s, nicht 6 s.' },
    rag: { lead: 'RAG pro Agent:', before: 'Jeder Agent ruft relevante klinische Leitlinien aus pgvector über LangChain ab (', after: ') und parst eine typisierte Antwort mit Pydantic.' },
    resilience: { lead: 'Resilienz:', before: 'Mit ', mid: ' liefern die übrigen Agenten ihr Ergebnis trotzdem, wenn ein Agent ausfällt oder ein Timeout erreicht; die Felder ', and: ' und ', after: ' machen die teilweise Degradation explizit.' },
    providers: { lead: 'Austauschbare Anbieter:', text: 'LLM und Embeddings sind über eine OpenAI-kompatible Schicht anbieterunabhängig (Nvidia NIM, Groq, OpenAI, LM Studio).' },
  },
  proves: {
    title: 'Was es zeigt',
    pull: ['Es ist der Punkt, an dem Backend-Architektur und angewandte KI zusammentreffen.', 'Es ist keine LLM-Demo, sondern ein für die Produktion entworfener Service.'],
    items: [
      { lead: 'Backend', text: 'Asynchrone Orchestrierung, semantische Suche, typisierte Datenverträge und Resilienz gegenüber Teilausfällen.' },
      { lead: 'Packaging', text: 'Multi-Stage-Docker, Continuous Integration nach GHCR und VPS-Deployment mit Traefik und automatischem TLS.' },
    ],
  },
};

const fr: ClinicalAiCopy = {
  header: {
    tier: 'Backend IA · Production',
    title: 'Clinical AI Multi-Agent',
    lede: "Backend d'IA multi-agent de niveau production pour l'aide à la décision clinique. Il reçoit la description d'un cas, classe l'urgence par un triage par LLM, active des agents spécialistes en parallèle et renvoie une évaluation intégrée et typée, tolérante aux pannes partielles.",
    summary: {
      kind: 'Projet personnel',
      role: "Projet personnel de backend avec IA appliquée, conçu et construit de bout en bout.",
      stack: ['Python', 'FastAPI (async)', 'LangChain LCEL', 'pgvector', 'PostgreSQL', 'SQLAlchemy 2.0', 'Pydantic v2', 'Docker'],
      proves: [
        'Orchestration asynchrone : agents spécialistes en parallèle avec asyncio.gather et tolérance aux pannes partielles.',
        'RAG par agent sur pgvector et réponses typées avec Pydantic.',
        "Service pensé pour la production : Docker multi-stage, intégration continue vers GHCR et déploiement avec Traefik.",
      ],
    },
    actions: ['Voir le dépôt'],
  },
  architecture: sketch({ triage: 'triage LLM', urgency: 'urgence + agents suggérés', parallel: 'parallèle', each: 'chaque agent', rag: 'RAG sur les guides cliniques dans pgvector' }),
  codeLabel: "Flux de l'API : AgentRouter, Integrator, agents spécialistes et AnalyzeOutput",
  apiTitle: "L'API · OpenAPI",
  apiLede: "Surface REST documentée avec des schémas typés : triage, analyse multi-agent et consultation des cas.",
  apiImageAlt: "Documentation OpenAPI (Swagger UI) de Clinical AI Multi-Agent : endpoints de triage, d'analyse et de cas cliniques avec schémas typés",
  archTitle: 'Architecture',
  archLede: "Parcours d'une requête : de l'endpoint au résultat typé.",
  stackTitle: 'Stack technique',
  stack: [
    ['API', 'FastAPI 0.136 (async)'],
    ['Agents', 'LangChain LCEL'],
    ['LLM', 'Nvidia NIM · Groq · OpenAI'],
    ['Vector store', 'pgvector (RAG)'],
    ['Base de données', 'PostgreSQL · SQLAlchemy 2.0 · Alembic'],
    ['Validation', 'Pydantic v2'],
    ['Deploy', 'Docker · GHCR · Traefik'],
  ],
  concept: {
    title: 'Le concept',
    pull: 'Un unique endpoint reçoit un cas clinique en langage naturel.',
    items: [
      { lead: 'Router', text: "Un router basé sur un LLM classe l'urgence et décide de quels agents spécialistes (urgences, cardiologie, pharmacologie, radiologie…) le cas a besoin selon son contenu sémantique, et pas seulement selon le niveau d'urgence." },
      { lead: 'Agents', text: 'Chaque agent exécute sa propre chaîne RAG indépendante.' },
      { lead: 'Integrator', text: 'Combine les résultats en une seule évaluation typée.' },
    ],
  },
  decisions: {
    title: 'Décisions techniques',
    triage: { lead: 'Triage déterministe :', before: 'le router tourne à ', after: " pour que la classification de l'urgence et la sélection des agents soient reproductibles, et non aléatoires." },
    content: { lead: 'Activation par le contenu :', text: "les agents spécialistes sont activés par le contenu du cas (une lecture d'ECG active la cardiologie) et non par le niveau d'urgence." },
    parallel: { lead: 'Exécution parallèle :', before: 'tous les agents sélectionnés s\'exécutent en concurrence avec ', after: ' ; trois agents de ~2 s prennent ~2 s au total, et non 6 s.' },
    rag: { lead: 'RAG par agent :', before: 'chaque agent récupère les guides cliniques pertinents depuis pgvector via LangChain (', after: ') et analyse une réponse typée avec Pydantic.' },
    resilience: { lead: 'Résilience :', before: 'avec ', mid: ", si un agent échoue ou expire, les autres renvoient quand même leur résultat ; les champs ", and: ' et ', after: ' rendent la dégradation partielle explicite.' },
    providers: { lead: 'Fournisseurs interchangeables :', text: "le LLM et les embeddings sont agnostiques du fournisseur (Nvidia NIM, Groq, OpenAI, LM Studio) grâce à une couche compatible avec OpenAI." },
  },
  proves: {
    title: 'Ce que cela démontre',
    pull: ["C'est la pièce où l'architecture backend et l'IA appliquée se rencontrent.", "Ce n'est pas une démo de LLM, c'est un service conçu pour la production."],
    items: [
      { lead: 'Backend', text: 'Orchestration asynchrone, récupération sémantique, contrats de données typés et résilience face aux pannes partielles.' },
      { lead: 'Packaging', text: 'Docker multi-stage, intégration continue vers GHCR et déploiement sur VPS avec Traefik et TLS automatique.' },
    ],
  },
};

const it: ClinicalAiCopy = {
  header: {
    tier: 'Backend IA · Produzione',
    title: 'Clinical AI Multi-Agent',
    lede: "Backend di IA multi-agente di livello produzione per il supporto alle decisioni cliniche. Riceve la descrizione di un caso, classifica l'urgenza tramite triage con LLM, attiva agenti specialisti in parallelo e restituisce una valutazione integrata e tipizzata, con tolleranza ai guasti parziali.",
    summary: {
      kind: 'Progetto personale',
      role: 'Progetto personale di backend con IA applicata, progettato e realizzato end to end.',
      stack: ['Python', 'FastAPI (async)', 'LangChain LCEL', 'pgvector', 'PostgreSQL', 'SQLAlchemy 2.0', 'Pydantic v2', 'Docker'],
      proves: [
        'Orchestrazione asincrona: agenti specialisti in parallelo con asyncio.gather e tolleranza ai guasti parziali.',
        'RAG per agente su pgvector e risposte tipizzate con Pydantic.',
        'Servizio pensato per la produzione: Docker multi-stage, integrazione continua verso GHCR e deploy con Traefik.',
      ],
    },
    actions: ['Vedi il repository'],
  },
  architecture: sketch({ triage: 'triage LLM', urgency: 'urgenza + agenti suggeriti', parallel: 'parallelo', each: 'ogni agente', rag: 'RAG sulle linee guida cliniche in pgvector' }),
  codeLabel: "Flusso dell'API: AgentRouter, Integrator, agenti specialisti e AnalyzeOutput",
  apiTitle: "L'API · OpenAPI",
  apiLede: 'Superficie REST documentata con schemi tipizzati: triage, analisi multi-agente e consultazione dei casi.',
  apiImageAlt: 'Documentazione OpenAPI (Swagger UI) di Clinical AI Multi-Agent: endpoint di triage, analisi e casi clinici con schemi tipizzati',
  archTitle: 'Architettura',
  archLede: "Percorso di una richiesta: dall'endpoint al risultato tipizzato.",
  stackTitle: 'Stack tecnologico',
  stack: [
    ['API', 'FastAPI 0.136 (async)'],
    ['Agenti', 'LangChain LCEL'],
    ['LLM', 'Nvidia NIM · Groq · OpenAI'],
    ['Vector store', 'pgvector (RAG)'],
    ['Database', 'PostgreSQL · SQLAlchemy 2.0 · Alembic'],
    ['Validazione', 'Pydantic v2'],
    ['Deploy', 'Docker · GHCR · Traefik'],
  ],
  concept: {
    title: 'Il concetto',
    pull: 'Un unico endpoint riceve un caso clinico in linguaggio naturale.',
    items: [
      { lead: 'Router', text: "Un router basato su LLM classifica l'urgenza e decide di quali agenti specialisti (emergenza, cardiologia, farmacologia, radiologia…) il caso ha bisogno in base al suo contenuto semantico, non solo in base al livello di urgenza." },
      { lead: 'Agenti', text: 'Ogni agente esegue la propria catena RAG indipendente.' },
      { lead: 'Integrator', text: "Combina i risultati in un'unica valutazione tipizzata." },
    ],
  },
  decisions: {
    title: 'Decisioni tecniche',
    triage: { lead: 'Triage deterministico:', before: 'il router gira a ', after: " affinché la classificazione dell'urgenza e la selezione degli agenti siano riproducibili, non casuali." },
    content: { lead: "Attivazione in base al contenuto:", text: "gli agenti specialisti vengono attivati dal contenuto del caso (la lettura di un ECG attiva la cardiologia) e non dal livello di urgenza." },
    parallel: { lead: 'Esecuzione parallela:', before: 'tutti gli agenti selezionati girano in modo concorrente con ', after: '; tre agenti da ~2 s impiegano ~2 s in totale, non 6 s.' },
    rag: { lead: 'RAG per agente:', before: 'ogni agente recupera le linee guida cliniche rilevanti da pgvector tramite LangChain (', after: ') e analizza una risposta tipizzata con Pydantic.' },
    resilience: { lead: 'Resilienza:', before: 'con ', mid: ', se un agente fallisce o va in timeout, gli altri restituiscono comunque il proprio risultato; i campi ', and: ' e ', after: ' rendono esplicita la degradazione parziale.' },
    providers: { lead: 'Provider intercambiabili:', text: "LLM ed embedding sono indipendenti dal provider (Nvidia NIM, Groq, OpenAI, LM Studio) tramite un livello compatibile con OpenAI." },
  },
  proves: {
    title: 'Cosa dimostra',
    pull: ["È il pezzo in cui l'architettura backend e l'IA applicata si incontrano.", 'Non è una demo di LLM, è un servizio progettato per la produzione.'],
    items: [
      { lead: 'Backend', text: 'Orchestrazione asincrona, recupero semantico, contratti dati tipizzati e resilienza ai guasti parziali.' },
      { lead: 'Packaging', text: 'Docker multi-stage, integrazione continua verso GHCR e deploy su VPS con Traefik e TLS automatico.' },
    ],
  },
};

export const clinicalAiCopy: Record<Language, ClinicalAiCopy> = { es, en, de, fr, it };
