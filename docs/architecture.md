# 🏗 Architecture & System Design

Este documento detalla las decisiones arquitectónicas del Portafolio v2, diseñado no como un simple escaparate de proyectos, sino como un **producto digital completo** y escalable.

## 1. Visión del Sistema

La meta principal era migrar de un entorno estático (Vite/React SPA - v1) a un entorno SSR/SSG dinámico, con capacidades transaccionales (Auth) y un modelo mental enfocado en el "Product Delivery".

El portafolio actúa como una plataforma SaaS minimalista, donde los usuarios (y reclutadores) pueden explorar proyectos, interactuar con el entorno y, eventualmente, consumir contenido protegido.

## 2. Infrastructure & Edge Strategy

- **Next.js 16 (App Router)**: Utilizamos componentes de servidor (`RSC`) por defecto para empujar la mayor cantidad de trabajo al servidor. Esto reduce drásticamente el peso del JavaScript en el cliente, logrando un Lighthouse Score de >95.
- **Server Actions**: Las mutaciones (ej. envío de formularios de contacto) se manejan nativamente a través de Server Actions de React 19, eliminando la necesidad de rutas API monolíticas, logrando una cohesión directa entre UI y Lógica.

## 3. Data & Auth Layer (Supabase)

El sistema integra **Supabase** como Backend as a Service (BaaS):

### Autenticación Segura
- Utilizamos `@supabase/ssr` para un manejo de cookies de sesión seguro, resistente a ataques comunes.
- El ciclo de autenticación está integrado con middlewares en Next.js para proteger rutas (ej. `/dashboard`).

### Base de Datos Postgres
- **Tablas Core**: `users` (auth nativo), `profiles` (datos públicos/extendidos del usuario).
- **Zero-Trust**: Se han implementado Row Level Security (RLS) policies en la DB para asegurar que ningún endpoint exponga datos que no pertenecen estrictamente al portafolio y a la sesión del usuario.

## 4. UI Architecture & Motion Identity

El portafolio tiene una identidad visual definida influenciada por estudios de alto nivel creativo (ej. Media.Monks):

- **Atomic Components**: Separación estricta entre componentes de presentación (`/components/ui`) y lógicos (`/components/auth`, `/components/sections`).
- **Tailwind CSS 4.0**: Styling "CSS-first", garantizando el menor footprint posible.
- **Framer Motion (Hover Preview System)**: Implementación técnica clave en la sección de proyectos. Un sistema de *requestAnimationFrame* y portales de React para lograr layouts de seguimiento del cursor (Hover Transitions flotantes) que son extremadamente performantes a 60fps constantes sin repintados forzados.

## 5. Security & Stability

- **Zod Validations**: Cada input que entra al servidor es validado en runtime mediante schemas de Zod, garantizando Type Safety tanto en el servidor como en el navegador.
- **Rate-Limiting & Honeypots**: Las interacciones externas (como correos mediante Resend) están cubiertas contra spam básico.

## 6. Evolución Futura

La arquitectura soporta nativamente la adición de futuras entidades (blogs dinámicos, casos de estudio detallados descargados vía Markdown CMS, e integraciones de IA con capacidades Edge) sin necesidad de reescribir la base del código.
