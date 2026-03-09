# 💻 Development & Integration Guide / Guía de Desarrollo e Integración

> **[ES]** Esta guía establece los estándares de desarrollo, flujos de trabajo locales y protocolos de integración que mantienen la integridad del Portafolio v2.
> **[EN]** This guide establishes the development standards, local workflows, and integration protocols that maintain Portfolio v2's integrity.

## 1. Local Environment Setup / Entorno Local

**[ES]** Prerrequisitos: **Bun** (`>= 1.0`) y PostgreSQL/Supabase CLI.
**[EN]** Prerequisites: **Bun** (`>= 1.0`) and PostgreSQL/Supabase CLI.

```bash
# [ES] Instalación limpia | [EN] Clean installation
bun install

# [ES] Configurar variables de entorno | [EN] Set up environment variables
cp .env.example .env.local

# [ES] Arrancar servidor Edge local | [EN] Start local Edge server
bun dev
```

## 2. Standards & Quality Control / Estándares y Control de Calidad

- **Zero `any` Tolerance**: 
  - **[ES]** Prohibido usar `any`. Definir Types estrictos.
  - **[EN]** Use of `any` is forbidden. Define strict Types.
- **Strict Linting & TSC**:
  - **[ES]** El código debe superar `bun x tsc --noEmit` antes del commit.
  - **[EN]** Code must pass `bun x tsc --noEmit` before committing.
- **Zod Validation**:
  - **[ES]** Toda manipulación HTTP/DB debe validarse en `src/lib/validations`.
  - **[EN]** All HTTP/DB manipulations must be validated in `src/lib/validations`.

## 3. Git Workflow & Commits / Flujo de Git

- **[ES]** **Ramas Descriptivas**: `feat/`, `fix/`, `chore/`, `refactor/`.
- **[EN]** **Descriptive Branches**: `feat/`, `fix/`, `chore/`, `refactor/`.
- **[ES]** **Commit Sentinel**: Usar `git add -p` en lugar de `git add .` para aislar agrupaciones lógicas. Commits Atómicos.
- **[EN]** **Commit Sentinel**: Use `git add -p` instead of `git add .` to isolate logical groupings. Atomic Commits.

## 4. Estructura del Proyecto / Project Structure

- **`/app`**: 
  - **[ES]** Enrutamiento, Layouts y Meta-data (App Router). No debe contener lógica de negocio masiva.
  - **[EN]** Routing, Layouts, and Meta-data (App Router). Should not contain massive business logic.
- **`/components/ui`**: 
  - **[ES]** Componentes Agnósticos (Design System). Re-usabilidad pura.
  - **[EN]** Agnostic Components (Design System). Pure reusability.
- **`/components/*`**: 
  - **[ES]** Componentes acoplados al dominio (`sections`, `auth`).
  - **[EN]** Domain-coupled components (`sections`, `auth`).
- **`/lib` & `/data`**: 
  - **[ES]** Scripts de clientes, validaciones Zod, diccionarios y data estática.
  - **[EN]** Client scripts, Zod validations, dictionaries, and static data.

## 5. Escalabilidad (Añadir Proyectos) / Scaling (Adding Projects)

1. **[ES/EN]** Update `src/data/projects.ts` adhering to the strict interface.
2. **[ES/EN]** Add optimized images (WebP/AVIF) in `public/images/projects`.
3. **[ES/EN]** Use React 19 Server Actions & RLS policies for handling any sensitive data reads/writes for the new project.

## 6. Despliegue / Deployment (Vercel)

- **[ES]** La rama `main` se despliega en Vercel. Las variables de producción (`NEXT_PUBLIC_SUPABASE_URL`, Resend keys) se manejan por entorno cifrado.
- **[EN]** The `main` branch deploys to Vercel. Production variables (`NEXT_PUBLIC_SUPABASE_URL`, Resend keys) are managed via encrypted environment configs.
