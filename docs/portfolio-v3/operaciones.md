# Operaciones: producción, entorno y comprobaciones

## Producción

| Tema | Estado |
| --- | --- |
| URL | https://www.jccode.dev (primaria). El apex `jccode.dev` redirige con 308 a `www` (ajuste de dominio en Vercel) |
| Proyecto Vercel | `my-portfolio` |
| Node | 24.x, fijado en `engines` de `package.json` |

### Variables de entorno

Las usadas por el código están en `.env.example` (versionado); los `.env*` reales están ignorados.

`NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`, `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `RESEND_API_KEY`.

### Nota de despliegue

La integración Git de Vercel a veces no inicia el despliegue tras un push a `main` (observado el 12-10-2026). Se puede lanzar un despliegue de producción desde el commit con la API de Vercel: `POST /v13/deployments` con `gitSource` `{ type: "github", repoId, ref: "main", sha }`. Verificar en vivo después.

## Comprobaciones (`scripts/portfolio-v3/*.mjs`)

Lista y variables en [`README.md`](README.md). Se ejecutan desde la raíz del repositorio.

- La mayoría de las que usan servidor leen `CHECK_URL` (p. ej. `http://localhost:3000/`).
- Las de navegador necesitan `PLAYWRIGHT_MODULE` (ruta a `playwright/index.mjs`), `CHROME_PATH`, `AUDIT_URL` y `AUDIT_OUTPUT_DIR` (fuera del repositorio).
- Las aserciones de desbordamiento de página aplican desde 320 px CSS (referencia de reflow WCAG).
- El cuerpo del CV está en `src/app/cv/CvContent.tsx`.
- `eslint src scripts` en todo el repositorio: 0 errores y 0 avisos.
- La barra de feedback del servidor de desarrollo tiene botones que fallan axe: ignorar destinos con `styles-module`, `data-no-hover` o `data-danger`.
- El servidor de desarrollo puede servir CSS obsoleto tras editar: reiniciar o verificar en un build de producción.
