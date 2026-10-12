# José Carlos — Portfolio (V3)

Portafolio de ingeniería de software: una landing con seis casos de proyecto, rutas de detalle y currículum. V3 está publicado en https://www.jccode.dev (`main`, Vercel, Node 24.x).

## Stack

- Next.js 16.1.6 (App Router, Turbopack), React 19.2.3, TypeScript
- Tailwind CSS 4, framer-motion 12 (`LazyMotion`), next-themes, Inter (`next/font`), Lucide
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

Rendimiento móvil de la home en producción: 85 (76-86), con accesibilidad, buenas prácticas y SEO en 100 ([`rendimiento.md`](./docs/portfolio-v3/rendimiento.md)). Limitaciones: el primer pintado es siempre en español, sin detección del idioma del navegador ([`i18n.md`](./docs/portfolio-v3/i18n.md)).

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

Vercel, proyecto `my-portfolio` (`vercel.json`: `bun install --frozen-lockfile`, `bun run build`, framework Next.js). `main` = producción; sin pipelines de CI/CD más allá de esa configuración. Dominio, variables de entorno y nota de despliegue en [`operaciones.md`](./docs/portfolio-v3/operaciones.md).

## Documentación

- [Portfolio V3](./docs/portfolio-v3/README.md): estado, dirección de diseño, scripts, [secciones](./docs/portfolio-v3/secciones.md), [rendimiento](./docs/portfolio-v3/rendimiento.md), [i18n](./docs/portfolio-v3/i18n.md), [SEO, seguridad y accesibilidad](./docs/portfolio-v3/seo-y-seguridad.md), [operaciones](./docs/portfolio-v3/operaciones.md) e [investigación del Stack 3D](./docs/portfolio-v3/stack-3d-research.md)
- [Arquitectura](./docs/architecture.md), [guía de desarrollo](./docs/development-guide.md) y [visión y estrategia](./docs/vision-and-strategy.md)
