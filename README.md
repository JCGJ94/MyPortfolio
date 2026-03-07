# José Carlos - Software Engineer Portfolio v2

> **"Este desarrollador no solo hace páginas. Construye sistemas."**

Bienvenido al código fuente de mi portafolio v2. Este proyecto nació con una visión clara: dejar de ser un currículum digital estático para convertirse en **una plataforma interactiva que funciona como un producto real**.

## 🚀 La Evolución (De v1 a v2)

La primera versión de este portafolio fue construida como una Single Page Application (SPA) tradicional utilizando React y Vite. Cumplía su función, pero no reflejaba mi progreso técnico real hacia el desarrollo Full Stack avanzado orientado a IA y la construcción de sistemas robustos.

Esta **versión 2** es una reescritura completa desde cero enfocada en la escalabilidad, el rendimiento y la integración completa de un Backend (BaaS) con arquitecturas de próxima generación.

## 🛠 Stack Técnico (2026 Standards)

Este proyecto está construido siguiendo los más altos estándares modernos (Gemini Elite Core Standards):

### Core & Framework
- **Next.js 16.1** (App Router)
- **React 19.2** (Server Components, Actions)
- **TypeScript** (Estricto)

### Styling & UI
- **Tailwind CSS 4.0** (CSS-First, optimizado)
- **Framer Motion** (Animaciones a 60fps con control preciso, ej. efecto *.monks*)
- Componentes altamente modulares y accesibles

### Backend & Datos
- **Supabase** (Auth & PostgreSQL DB)
- Autenticación real (Login, Registro, Persistencia de sesión y Cookies seguras)
- Edge-ready data fetching

### Herramientas & Calidad
- **Bun** (Runtime y Package Manager)
- **Zod** (Validación de esquemas)
- **Resend** (Integración de emails)
- Strict Linting & Type Checking

## 🏗 Arquitectura

El proyecto emplea una arquitectura modular basada en las mejores prácticas de Next.js App Router:

- **`/app`**: Rutas de la aplicación (Landing, Proyectos, flujos de Autenticación).
- **`/components`**: UI reutilizable organizada atómicamente (`/ui`, `/sections`, `/layout`).
- **`/lib`**: Utilidades core (instancias de Supabase Clients, validaciones, mailers).
- **`/data`**: Orígenes de datos estáticos y sincronización.

Para más detalles, revisa la [Documentación de Arquitectura](./docs/architecture.md).

## 🏃‍♂️ Quick Start

Si deseas ejecutar este proyecto localmente:

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd mi-cv/v2

# 2. Instalar dependencias con Bun (recomendado)
bun install

# 3. Configurar variables de entorno (Supabase, Resend)
cp .env.example .env.local

# 4. Iniciar el servidor de desarrollo
bun dev
```

## 📚 Documentación Adicional

- [Architecture & System Design](./docs/architecture.md)
- [Recruiter's Guide: Entendiendo el Perfil](./docs/recruiters-guide.md)
- [Plan de Refinamiento Original](./docs/cv-refinement-plan.md)

---
*Diseñado y desarrollado por José Carlos - 2026*
