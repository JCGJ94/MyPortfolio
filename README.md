# José Carlos — Portfolio (V3)

Portafolio de ingeniería de software: una landing con seis casos de proyecto, rutas de detalle y currículum. Rediseño V3 en la rama `feat/portfolio-v3`; `main` es producción (Vercel).

## Stack

- Next.js 16.1.6 (App Router, Turbopack), React 19.2.3, TypeScript
- Tailwind CSS 4, framer-motion 12, next-themes, Inter (`next/font`), Lucide
- Zod y EmailJS (formulario de contacto, cargados bajo demanda), Resend (`/api/contact`), Supabase (`@supabase/ssr`, autenticación)
- Despliegue en Vercel
- Bun como gestor (`bun.lock`); los scripts también funcionan con npm

## Rutas

| Ruta | Contenido |
| --- | --- |
| `/` | Hero, Proyectos (un caso a la vez, enlaces `/#caso-<id>`), Sobre mí, Stack 3D, Contacto y pie |
| `/squaads` | Squaads Meeting Bot (proyecto de empresa, sin demo pública) |
| `/nutriflow`, `/clinical-ai`, `/sportbarleague`, `/jegstudio`, `/tallercardonal` | Casos de proyecto |
| `/cv` | Currículum con vista previa del PDF |
| `/login`, `/register`, `/dashboard` | Autenticación y panel |
| `/api/contact`, `/api/auth/signout` | APIs |

## Características

- Hero con nombre tecleado, retrato de cristal 3D y una única entrada cinematográfica.
- Diagramas de arquitectura automáticos y no interactivos por caso; iconos oficiales de marca (Simple Icons, CC0).
- Tema oscuro por defecto, con selector claro/oscuro.
- Cinco idiomas de interfaz: español, inglés, alemán, francés e italiano.
- `prefers-reduced-motion` respetado (el texto tecleado se mantiene; la entrada es solo opacidad).

Limitaciones conocidas: los textos de los casos, el Stack y los diagramas están solo en español; `<html lang>` es siempre `es`; el rendimiento móvil de la home no alcanza el objetivo (78; ver [`docs/portfolio-v3/rendimiento.md`](./docs/portfolio-v3/rendimiento.md)).

## Desarrollo

```bash
bun install
cp .env.example .env.local   # completa tus propios valores
bun dev                      # desarrollo
bun run build                # build de producción
bun run start                # servir el build
bun run lint
bun run typecheck
bun run ci                   # lint + typecheck
```

Comprobaciones específicas de V3: `node scripts/portfolio-v3/<script>` (lista en [`docs/portfolio-v3/README.md`](./docs/portfolio-v3/README.md)).

## Despliegue

Vercel (`vercel.json`: `bun install --frozen-lockfile`, `bun run build`, framework Next.js). `main` = producción. No hay pipelines de CI/CD definidos en el repositorio más allá de esa configuración.

## Documentación

- [Portfolio V3](./docs/portfolio-v3/README.md): estado, dirección de diseño, scripts, [secciones](./docs/portfolio-v3/secciones.md), [rendimiento](./docs/portfolio-v3/rendimiento.md) e [investigación del Stack 3D](./docs/portfolio-v3/stack-3d-research.md)
- [Arquitectura](./docs/architecture.md), [guía de desarrollo](./docs/development-guide.md) y [visión y estrategia](./docs/vision-and-strategy.md)
