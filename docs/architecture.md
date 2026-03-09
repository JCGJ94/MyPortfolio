# 🏗 System Architecture & Design / Arquitectura y Diseño del Sistema

> **[ES]** Este documento detalla las decisiones arquitectónicas del Portafolio v2. El sistema está diseñado como una plataforma escalable y modular, construida sobre estándares de la industria (2026).
> **[EN]** This document details the architectural decisions of Portfolio v2. The system is designed as a scalable and modular platform, built on industry standards (2026).

## 1. Visión del Sistema / System Vision

**[ES]** La transición de una arquitectura SPA estática a un entorno Server-Side Rendering (SSR) dinámico responde a la necesidad de construir un sistema con capacidades transaccionales y manejo de estado robusto.
**[EN]** The transition from a static SPA architecture to a dynamic Server-Side Rendering (SSR) environment responds to the need to build a system with transactional capabilities and robust state management.

## 2. Infrastructure & Edge Strategy / Infraestructura y Estrategia Edge

- **Next.js 16 (App Router)**:
  - **[ES]** Arquitectura basada en componentes de servidor (`RSC`). El cálculo pesado ocurre en la capa del servidor/Edge, reduciendo el peso del bundle JavaScript y logrando métricas Lighthouse >95.
  - **[EN]** Architecture based on Server Components (`RSC`). Heavy computation happens on the Server/Edge layer, reducing the JavaScript bundle size and achieving Lighthouse metrics >95.
- **Server Actions**:
  - **[ES]** Las mutaciones (ej. formularios, auth) se manejan orgánicamente. Se eliminan las rutas API REST innecesarias, logrando alta cohesión.
  - **[EN]** Mutations (e.g. forms, auth) are handled organically. Unnecessary REST API routes are eliminated, achieving high cohesion.

## 3. Data & Auth Layer / Capa de Datos y Autenticación (Supabase)

### Autenticación Segura / Secure Authentication
- **[ES]** Implementación de `@supabase/ssr` para manejo de sesión persistente con cookies seguras. Segmentación de rutas mediante Next.js Middleware.
- **[EN]** `@supabase/ssr` implementation for persistent session management using secure cookies. Route segmentation via Next.js Middleware.

### Base de Datos PostgreSQL / PostgreSQL Database
- **[ES]** **Esquema Core**: Tablas relacionales como `users` y `profiles`. **Seguridad Zero-Trust**: Implementación de políticas de Row Level Security (RLS).
- **[EN]** **Core Schema**: Relational tables like `users` and `profiles`. **Zero-Trust Security**: Implementation of Row Level Security (RLS) policies.

## 4. UI Architecture & Motion / Arquitectura UI y Animaciones

- **Atomic Components / Componentes Atómicos**:
  - **[ES]** Separación estricta entre componentes de presentación (`/components/ui`) y lógicos (`/components/auth`).
  - **[EN]** Strict separation between presentation (`/components/ui`) and logical components (`/components/auth`).
- **Tailwind CSS 4.0**:
  - **[ES]** Implementación "CSS-first" que garantiza configuraciones de diseño mediante tokens.
  - **[EN]** "CSS-first" implementation ensuring design configurations through tokens.
- **Framer Motion**:
  - **[ES]** Sistema de interacciones basado en *requestAnimationFrame* garantizando 60fps constantes.
  - **[EN]** Interaction system based on *requestAnimationFrame* ensuring a constant 60fps.

## 5. Security & Stability / Seguridad y Estabilidad

- **Zod Validations / Validaciones Zod**:
  - **[ES]** End-to-End Type Safety. Las peticiones son validadas en runtime mediante esquemas estrictos de Zod.
  - **[EN]** End-to-End Type Safety. Requests are validated at runtime using strict Zod schemas.
- **Resilience & Rate-Limiting**:
  - **[ES]** Interacciones externas (ej. emails) incluyen validaciones en el servidor para evitar abusos.
  - **[EN]** External interactions (e.g. emails) include server-side validations to prevent abuse.

## 6. Escalabilidad Futura / Future Scalability

- **[ES]** Integración de un Headless CMS (MDX/Sanity) e integraciones automatizadas impulsadas por IA.
- **[EN]** Headless CMS (MDX/Sanity) integration and automated AI-driven integrations.
