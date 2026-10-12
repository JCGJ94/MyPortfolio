# Portfolio V3 — documentación

Rediseño del portafolio, publicado en https://www.jccode.dev (`main`, Vercel).

## Estado

V3 está en producción: hero, Proyectos, Sobre mí, Stack, Contacto, pie, rutas de detalle y `/cv`, en cinco idiomas. Rendimiento móvil de la home 85 (76-86); accesibilidad, buenas prácticas y SEO en 100. El propietario lo dio por bueno; cifras y palancas en [`rendimiento.md`](rendimiento.md).

## Documentos

| Documento | Contenido |
| --- | --- |
| [`secciones.md`](secciones.md) | Por sección: qué es, por qué y qué debe seguir cumpliéndose |
| [`rendimiento.md`](rendimiento.md) | Mediciones con fecha y condiciones, decisiones de rendimiento y objetivos no cumplidos |
| [`i18n.md`](i18n.md) | Arquitectura de idiomas y reglas de las traducciones |
| [`seo-y-seguridad.md`](seo-y-seguridad.md) | SEO, cabeceras de seguridad y accesibilidad |
| [`operaciones.md`](operaciones.md) | Producción, variables de entorno, despliegue y notas de las comprobaciones |
| [`stack-3d-research.md`](stack-3d-research.md) | Investigación y decisión del Stack en 3D |

## Dirección de diseño

- **Mesa de trabajo de ingeniería**: primero el perfil, el foco técnico y las acciones; el retrato conserva su identidad pero queda subordinado al mensaje.
- **Un solo recurso de firma: la traza** (regla fina vertical con nodos) que enlaza los pasos de cada caso y los divisores de sección. Sin tarjetas con sombra, sin glass decorativo y sin blobs.
- Se conservan JC.dev, Inter, azul `#1d4ed8` (claro) / `#3b82f6` (oscuro), tema oscuro por defecto con selector claro/oscuro y los cinco idiomas.
- Tokens `--pv3-*` en `tokens.css` (espacios, anchos, radio, duración, easing); clases con prefijo `pv3-` en `src/app/globals.css` y hojas `pv3-*.css` por área.
- Sin dependencias de 3D ni vídeo: el 3D (retrato del hero, Stack) es CSS (`perspective`, `preserve-3d`) con `transform`/`opacity` únicamente.
- Contenido: solo hechos presentes en el repositorio o aportados por el autor; sin métricas inventadas.

## Funcionalidades

- **Hero**: nombre tecleado, retrato de cristal 3D (cara, esquirlas y resplandor) y una única línea de tiempo de entrada (~2 s); un solo CTA «Ver proyectos».
- **Proyectos**: lista de casos como `tablist` WAI-ARIA, un caso visible a la vez, enlaces profundos `/#caso-<id>`. Squaads Meeting Bot es el caso 01; seis casos con rutas de detalle.
- **Diagramas de arquitectura**: `FlowDiagram` (`src/components/ui/FlowDiagram.tsx`) alimentado por `src/data/diagrams.ts`; bucle automático, sin interacción, en pausa fuera de pantalla y calmado con `prefers-reduced-motion`.
- **Stack 3D**: `Stack3D.tsx`; al hacer clic una tarjeta gira hasta quedar de frente al lector.
- **Iconos de marca**: `src/data/techIcons.ts` (trazados de Simple Icons v16.34.0, CC0), `TechIcon`/`TechLabel` y resolución de alias.
- **Sobre mí**, **Contacto** (EmailJS + zod, con iconos), **pie** (firma tecleada, lluvia de código y líneas de terminal), **velo del navbar** y **`/cv`** con vista previa del PDF.
- **Movimiento reducido**: el texto tecleado sigue escribiéndose, la entrada del hero es solo opacidad y se apagan las rotaciones 3D y los bucles.

## Limitaciones conocidas

- Cinco idiomas (es/en/de/fr/it) sin detección del navegador: el primer pintado es siempre español. Metadatos y JSON-LD solo en español. Traducciones sin revisión nativa. Ver [`i18n.md`](i18n.md).
- La inicialización de EmailJS accede a `localStorage` al evaluar el módulo; si el almacenamiento está bloqueado en toda la página, aparece un error de página (el store de idioma sí tolera el bloqueo).
- Algunas rutas de detalle conservan cifras declaradas por el autor sin fuente verificable en el repositorio (NutriFlow, Taller El Cardonal); no se usan en la home.
- Rendimiento móvil con alta varianza entre ejecuciones (ver [`rendimiento.md`](rendimiento.md)).

## Scripts de comprobación

Todos están en `scripts/portfolio-v3/`. Se ejecutan con `node scripts/portfolio-v3/<nombre>` desde la raíz del repositorio.

Comprobaciones estáticas (leen fuente, CSS y datos; no necesitan servidor):

| Script | Comprueba |
| --- | --- |
| `t04-data-check.mjs` | Tokens, base de sección, modelo de casos y paridad de claves i18n |
| `t04-sections-check.mjs [m\|u4\|u5\|u6\|a2\|a3\|a5\|x10 ...]` | Proyectos compacto en móvil, Sobre mí, Stack, Contacto y entrada del hero (sin argumentos: todas) |
| `t05-contact-check.mjs` | Iconos y glifos del formulario de Contacto |
| `t05-diagrams-check.mjs` | `FlowDiagram` basado en datos para los seis casos |
| `t05-footer-check.mjs` | Capa de código del pie (lluvia, líneas de terminal) |
| `t05-nav-fade-check.mjs` | Velo del navbar |
| `t05-perf-a11y-check.mjs` | Nombres accesibles, landmarks, contraste y ausencia de dependencias nuevas |
| `t05-site-icons-check.mjs` | Iconos de marca en todo el sitio (`TechLabel`, `resolveTechIconKey`) |
| `t05-stack-focus-check.mjs` | Interacción de clic-al-frente del Stack |
| `t05-stack-icons-check.mjs` | Iconos del Stack |
| `language-context-check.mjs` | Store de idioma (lista blanca, tolerancia a fallos de `localStorage`, SSR en español) |
| `button-check.mjs` | `IconOrbitButton`/`MagneticPillButton`: botón sin `href`, enlace con `href`, SSR y variantes |
| `button-props-check.tsx` | Tipos de props de botón/enlace (se valida con `tsc`) |
| `icon-check.mjs` | Favicon `src/app/icon.png` de 128×128 y ≤ 30 KiB, sin duplicado en `public/` |

Con servidor opcional (también validan el HTML servido si se define la variable):

| Script | Variable | Uso |
| --- | --- | --- |
| `t04-projects-check.mjs` | `CHECK_URL` | `CHECK_URL=http://127.0.0.1:3000/ node scripts/portfolio-v3/t04-projects-check.mjs` |
| `t04-routes-check.mjs [u7\|u8\|sq\|d1 ...]` | `CHECK_URL` | Rutas de detalle: cabecera común y hechos |
| `icon-check.mjs` | `ICON_CHECK_URL` | Comprueba también `/icon.png` servido |

Con navegador (requieren un servidor en marcha y Playwright; no forman parte de la comprobación estática):

| Script | Variables | Comprueba |
| --- | --- | --- |
| `hero-preview-check.mjs` | `AUDIT_URL`, `AUDIT_OUTPUT_DIR`, `AUDIT_GROUPS`, `PLAYWRIGHT_MODULE`, `NODE_PATH`, `CHROME_PATH` | Barrido de hero, layout, navegación, tema, foco y movimiento a 360–1440 px en ambos temas. Sus expectativas datan del hero anterior a la entrada cinematográfica: revisarlas antes de depender de él |
| `language-browser-check.mjs` | `AUDIT_URL`, `PLAYWRIGHT_MODULE`, `CHROME_PATH`, `AUDIT_OUTPUT_DIR`, `AUDIT_SCOPE` (`language` o `full`) | Idioma: SSR en español sin JS, los cinco idiomas, persistencia, valores inválidos y fallos de `localStorage`. Con `AUDIT_SCOPE=full` añade un diagnóstico de página completa que falla por la inicialización de EmailJS (ver limitaciones) |

Calidad general: `npm run lint`, `npm run typecheck` y `npm run build` (ver [`../development-guide.md`](../development-guide.md)).
