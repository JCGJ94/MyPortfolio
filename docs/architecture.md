# Arquitectura / Architecture

> **[ES]** Descripción de la arquitectura actual (V3). El estado del rediseño y sus decisiones de diseño están en [`portfolio-v3/README.md`](./portfolio-v3/README.md).
> **[EN]** Description of the current architecture (V3). Redesign status and design decisions are in [`portfolio-v3/README.md`](./portfolio-v3/README.md).

## 1. Aplicación / Application

- **[ES]** Next.js 16.1.6 (App Router) con React 19 y TypeScript. Las páginas son Server Components por defecto; los componentes con estado o animación son Client Components (`'use client'`).
- **[EN]** Next.js 16.1.6 (App Router) with React 19 and TypeScript. Pages are Server Components by default; stateful or animated components are Client Components (`'use client'`).

## 2. Estructura / Structure

| Ruta / Path | Contenido / Content |
| --- | --- |
| `src/app` | Rutas, layouts, metadatos, `sitemap.ts`, `robots.ts` y hojas `pv3-*.css` / Routes, layouts, metadata and `pv3-*.css` sheets |
| `src/components/sections` | Hero, About, Projects, Stack, Contact |
| `src/components/ui` | Piezas reutilizables: `FlowDiagram`, `Stack3D`, `TechIcon`/`TechLabel`, `CaseHeader`, `CaseAtAGlance`, `Typewriter`, `ScrollReveal`... / Reusable pieces |
| `src/components/layout` | Navbar, Footer, proveedores de tema y movimiento, JSON-LD / Navbar, Footer, theme and motion providers, JSON-LD |
| `src/data` | `projects.ts` (casos), `translations.ts` (5 idiomas), `diagrams.ts`, `techIcons.ts` / case data, translations, diagram data, tech icons |
| `src/context` | Idioma: `language-store.ts` (store externo con `useSyncExternalStore`) y `LanguageContext.tsx` / Language store and context |
| `src/lib/supabase` | Clientes de Supabase (navegador, servidor, proxy de sesión) / Supabase clients |
| `src/proxy.ts` | Refresco de sesión de Supabase / Supabase session refresh |
| `tokens.css` | Tokens de diseño `--pv3-*` / Design tokens |

## 3. Datos y diseño / Data and design

- **[ES]** Los casos viven en `src/data/projects.ts`; los diagramas en `src/data/diagrams.ts`; los iconos de marca en `src/data/techIcons.ts` (Simple Icons v16.34.0, CC0, sin dependencia). Las rutas de detalle y los diagramas se alimentan de estos datos.
- **[EN]** Cases live in `src/data/projects.ts`; diagrams in `src/data/diagrams.ts`; brand icons in `src/data/techIcons.ts` (Simple Icons v16.34.0, CC0, no dependency). Detail routes and diagrams are fed from this data.
- **[ES]** Tailwind CSS 4 con tokens `--pv3-*` y clases `pv3-*`. El 3D (retrato del hero, Stack) es CSS puro; las animaciones usan `transform`/`opacity` y respetan `prefers-reduced-motion`.
- **[EN]** Tailwind CSS 4 with `--pv3-*` tokens and `pv3-*` classes. 3D (hero portrait, Stack) is plain CSS; animations use `transform`/`opacity` and honour `prefers-reduced-motion`.

## 4. Idioma / Language

- **[ES]** Cinco idiomas (es/en/de/fr/it) en `src/data/translations.ts`. La preferencia se guarda en `localStorage` y se valida contra una lista blanca; el SSR siempre renderiza español. Limitaciones: los textos de los casos, el Stack y los diagramas están solo en español, y `<html lang>` es siempre `es`.
- **[EN]** Five languages (es/en/de/fr/it) in `src/data/translations.ts`. The preference is stored in `localStorage` and validated against an allow-list; SSR always renders Spanish. Limitations: case texts, Stack and diagrams are Spanish-only, and `<html lang>` is always `es`.

## 5. Contacto, autenticación y datos / Contact, auth and data

- **[ES]** El formulario de la UI envía con EmailJS (cargado bajo demanda, validado con Zod). Existe además `POST /api/contact`, que envía con Resend (necesita `RESEND_API_KEY`).
- **[EN]** The UI form sends through EmailJS (lazy-loaded, validated with Zod). There is also `POST /api/contact`, which sends through Resend (needs `RESEND_API_KEY`).
- **[ES]** Autenticación con `@supabase/ssr` (cookies de sesión) y Server Actions en `login`/`register`. La migración `supabase/migrations/20260224000000_profiles_schema.sql` crea `public.profiles` con Row Level Security y políticas de lectura y actualización del propio perfil.
- **[EN]** Authentication with `@supabase/ssr` (session cookies) and Server Actions in `login`/`register`. The migration `supabase/migrations/20260224000000_profiles_schema.sql` creates `public.profiles` with Row Level Security and read/update-own-profile policies.

## 6. Despliegue / Deployment

- **[ES]** Vercel (`vercel.json`). `main` es producción. No hay pipelines de CI/CD en el repositorio más allá de esa configuración.
- **[EN]** Vercel (`vercel.json`). `main` is production. There are no CI/CD pipelines in the repository beyond that configuration.
