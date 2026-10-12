# Guía de desarrollo / Development Guide

> **[ES]** Flujo de trabajo local y convenciones del repositorio.
> **[EN]** Local workflow and repository conventions.

## 1. Entorno local / Local setup

**[ES]** Requisitos: Bun (el gestor del repositorio, `bun.lock`) o npm, y Node.js 24.x (fijado en `engines`).
**[EN]** Requirements: Bun (the repository package manager, `bun.lock`) or npm, and Node.js 24.x (pinned in `engines`).

```bash
bun install
cp .env.example .env.local   # fill in your own values; never commit .env*
bun dev
```

| Comando / Command | Uso / Purpose |
| --- | --- |
| `bun dev` | Desarrollo / Development server |
| `bun run build` / `bun run start` | Build de producción y servidor / Production build and server |
| `bun run lint` | ESLint |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run ci` | Lint + typecheck |

## 2. Variables de entorno / Environment variables

**[ES]** Los `.env*` reales están ignorados por Git; `.env.example` sí se versiona como plantilla. La lista de variables está en [`portfolio-v3/operaciones.md`](./portfolio-v3/operaciones.md). `NEXT_PUBLIC_SITE_URL` ya no se lee: la URL del sitio está fija en `src/lib/site.ts`.
**[EN]** Real `.env*` files are ignored by Git; `.env.example` is tracked as a template. The variable list is in [`portfolio-v3/operaciones.md`](./portfolio-v3/operaciones.md). `NEXT_PUBLIC_SITE_URL` is no longer read: the site URL is hardcoded in `src/lib/site.ts`.

## 3. Calidad / Quality

- **[ES]** TypeScript estricto: sin `any`; el código debe pasar `bun run typecheck` y `bun run lint`.
- **[EN]** Strict TypeScript: no `any`; code must pass `bun run typecheck` and `bun run lint`.
- **[ES]** Comprobaciones de V3: `node scripts/portfolio-v3/<script>` (lista y variables en [`portfolio-v3/README.md`](./portfolio-v3/README.md)). Las estáticas no necesitan servidor.
- **[EN]** V3 checks: `node scripts/portfolio-v3/<script>` (list and variables in [`portfolio-v3/README.md`](./portfolio-v3/README.md)). Static ones need no server.
- **[ES]** Con `LazyMotion` estricto, todo `motion.*` debe ser `m.*`. Las variantes `dark:` de Tailwind siguen `prefers-color-scheme`, no la clase `.dark`. Claves de `translations.ts`: ver [`portfolio-v3/i18n.md`](./portfolio-v3/i18n.md).
- **[EN]** With strict `LazyMotion`, every `motion.*` must be `m.*`. Tailwind `dark:` variants follow `prefers-color-scheme`, not the `.dark` class. `translations.ts` key rules: see [`portfolio-v3/i18n.md`](./portfolio-v3/i18n.md).
- **[ES]** Movimiento: solo `transform`/`opacity`; todo estado oculto de entrada debe depender de `html.js-reveal` + `prefers-reduced-motion: no-preference` para que el contenido sea visible sin JS.
- **[EN]** Motion: `transform`/`opacity` only; any hidden entrance state must depend on `html.js-reveal` + `prefers-reduced-motion: no-preference` so content is visible without JS.

## 4. Git

- **[ES]** Ramas descriptivas (`feat/`, `fix/`, `chore/`, `docs/`), commits atómicos con mensajes convencionales (`feat:`, `fix:`, `docs:`, `chore:`, `test:`, `perf:`). Preferir `git add <ruta>` o `git add -p` a `git add .`.
- **[EN]** Descriptive branches (`feat/`, `fix/`, `chore/`, `docs/`), atomic commits with conventional messages. Prefer `git add <path>` or `git add -p` over `git add .`.
- **[ES]** `main` se despliega en producción; los cambios llegan por fusión revisada.
- **[EN]** `main` deploys to production; changes arrive through a reviewed merge.

## 5. Estructura y datos / Structure and data

**[ES]** Ver [`architecture.md`](./architecture.md). Para añadir un proyecto: añadir la entrada en `src/data/projects.ts` (con su caso), su diagrama en `src/data/diagrams.ts`, la imagen optimizada en `public/projects/`, la ruta de detalle en `src/app/<id>/page.tsx` (con `CaseHeader`) y, si se nombra una tecnología nueva, su icono en `src/data/techIcons.ts`. Solo hechos verificables; sin cifras sin fuente.
**[EN]** See [`architecture.md`](./architecture.md). To add a project: add the entry (with its case) in `src/data/projects.ts`, its diagram in `src/data/diagrams.ts`, the optimized image in `public/projects/`, the detail route in `src/app/<id>/page.tsx` (using `CaseHeader`) and, for a new technology, its icon in `src/data/techIcons.ts`. Verifiable facts only; no unsourced figures.

## 6. Despliegue / Deployment

**[ES]** Vercel (`vercel.json`: `bun install --frozen-lockfile`, `bun run build`). `main` = producción. Si un push no inicia despliegue, ver [`portfolio-v3/operaciones.md`](./portfolio-v3/operaciones.md).
**[EN]** Vercel (`vercel.json`: `bun install --frozen-lockfile`, `bun run build`). `main` = production. If a push does not start a deployment, see [`portfolio-v3/operaciones.md`](./portfolio-v3/operaciones.md).
