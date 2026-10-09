# Secciones y rutas — qué es, por qué y qué debe cumplirse

Cada entrada resume el estado final de la sección, la razón del diseño y los invariantes que las comprobaciones de `scripts/portfolio-v3/` (ver [`README.md`](README.md)) protegen.

## Reglas transversales

- **Base de sección**: `.pv3-section` aplica el padding vertical por token, el ancho de contenido y `scroll-margin-top` para la barra fija. Las secciones `#about`, `#projects`, `#stack` y `#contact` son bandas con línea superior y marca azul; About y Stack alternan la superficie `--pv3-color-band`. `SectionLabel` («01 — Sobre mí») es común.
- **Traza**: `.pv3-trace` / `.pv3-trace__node` (regla vertical con nodos) enlaza los pasos de un caso; `.pv3-focus` da foco visible.
- **Movimiento**: solo `transform`, `opacity` y `stroke`. `ScrollReveal` (IntersectionObserver, una vez) añade `.is-in`; el estado oculto exige `html.js-reveal` y `prefers-reduced-motion: no-preference`, de modo que sin JS o con movimiento reducido el contenido siempre es visible. `MotionProvider` aplica `reducedMotion="user"` a Framer Motion. Sin scroll hijacking ni cursor propio.
- **Tema**: `<html className="dark">` en SSR (oscuro por defecto, sin destello); next-themes lo sustituye si el usuario eligió claro.
- **Contenido**: solo hechos del repositorio o aportados por el autor; sin cifras sin fuente en la home; etiquetas ≥ 13 px; sin desbordamiento horizontal entre 360 y 1440 px en ambos temas.
- **Idioma**: la interfaz está en es/en/de/fr/it; los textos de los casos, el Stack y los diagramas son solo español (limitación declarada).

## Hero

Nombre tecleado con JavaScript (70 ms por letra, cursor) y retrato de cristal en 3D hecho con CSS: cara (imagen enmascarada al círculo central), esquirlas (misma imagen con máscara inversa a `translateZ`, balanceo continuo) y resplandor. Una sola línea de tiempo de ~2 s: cuadrícula y badge, nombre, rol rotativo (cinco roles de `hero.roles`), texto y CTA «Ver proyectos», ensamblado de fragmentos, indicador de scroll y barrido de luz.

Invariantes:
- El retrato (LCP) nunca parte de `opacity: 0`; ambas capas usan la misma URL optimizada, con prioridad alta.
- Nombre completo en `sr-only` y letras `aria-hidden`; sin JS el HTML SSR muestra todo (respaldo CSS a los 3,5 s).
- Con `prefers-reduced-motion`: el nombre y los roles siguen tecleándose, la entrada es solo opacidad, no hay balanceo ni inclinación 3D y un destello de luz sin movimiento de capas recorre el retrato. Razón: el texto tecleado no es un disparador vestibular.
- Los bucles se pausan fuera de pantalla; el parallax del puntero solo en puntero fino.
- Barra de navegación: marca a la izquierda, «Área técnica», menú y tema a la derecha; `aria-expanded`/`aria-controls`, cierre con Escape o selección, objetivos táctiles de 44 px; `NavTrace` anima el borde solo con CSS. Un velo (`.portfolio-nav-veil`, `aria-hidden`) evita ver el contenido bajo el navbar translúcido.

## Proyectos

Los casos son un `tablist` WAI-ARIA (`role="tab"` sobre enlaces `#caso-<id>`, tabindex itinerante, flechas, Inicio/Fin) y cada caso es un `tabpanel`; solo el seleccionado es visible (por defecto el 01, Squaads). Desde 64 rem el escenario tiene altura fija y el caso se lee sin salir de la vista; en móvil, chips pegajosos bajo la barra y un caso debajo. Cada caso muestra captura o diagrama, cuatro pasos (problema, solución, decisiones, evidencia) sobre la traza y CTAs siempre visibles; los pasos sin documentar se muestran como «Pendiente de documentar».

Casos y tipo de proyecto (de `src/data/projects.ts`): Squaads Meeting Bot (proyecto de empresa), NutriFlow y Clinical AI (personales), SportBarLeague (bootcamp), Taller El Cardonal (cliente real) y JEG Studio (trabajo en equipo). NutriFlow no recibe énfasis especial.

Squaads Meeting Bot: sin demo; se enlaza el repositorio público `devs-squaads/tldv-squaads-dev`. Se describe sin datos privados (sin logo, compañeros, hosts ni métricas); el medio principal es una captura de la pantalla de acceso del entorno de desarrollo (`public/projects/squaads-login.webp`, sin datos personales) con pestañas «Producto / Arquitectura». CI en dev y main; despliegue continuo automático solo desde main.

Invariantes:
- Los seis `tabpanel` están en el HTML SSR y sin JS se ven apilados; `hidden` se aplica solo tras hidratar.
- Los enlaces `#caso-<id>` (Stack, cabeceras de detalle) seleccionan el caso; elegir un caso actualiza el hash con `history.replaceState`.
- La altura de la sección no cambia al cambiar de caso; el caso 01 cabe en el escenario a 1440×900.
- Decisiones técnicas más allá de la tercera dentro de `<details>`.

## Diagramas de arquitectura

`FlowDiagram` (`src/components/ui/FlowDiagram.tsx`, `src/data/diagrams.ts`, `src/app/pv3-diagrams.css`): nodos de cristal con iconos de marca y flechas con puntos en movimiento; bucle automático (1,8 s por paso, 2,4 s de pausa). Hay uno por caso, en la pestaña Arquitectura y en la ruta de detalle. Son no interactivos por decisión del propietario; para mitigar WCAG 2.2.2 se pausan fuera de pantalla y con la pestaña oculta, y con movimiento reducido quedan flechas estáticas y resaltado de color. Una lista oculta describe el flujo a lectores de pantalla. Algunas conexiones (NestJS→Gemini en NutriFlow, el abanico de Taller El Cardonal) son lectura de la lista de stack, no hechos explícitos.

## Sobre mí

Dos columnas desde 64 rem: título, subtítulo y tres hechos (formación, stack, número de proyectos) a la izquierda; tesis como cita y bloques con línea de tiempo (2009 / Full Stack / Hoy) a la derecha, con frases clave subrayadas (`about.marks`, máximo 2 por texto). Sin Framer: contenido visible en SSR. Se retiraron los KPI sin respaldo («Cloud / 24/7»).

Invariantes: texto de About intacto (cada marca es una frase real de su idioma); sin cifras nuevas; entradas escalonadas solo con `no-preference`.

## Stack

`Stack3D.tsx` + `src/app/pv3-stack.css`: pila de capas (Frontend, Backend, IA, Datos, Herramientas) en vista isométrica explosionada desde 64 rem, con separación que se abre con el scroll, traza vertical 3D y autociclo en reposo (se pausa 9 s al interactuar). Clic, toque, Enter o Espacio sobre una tecnología lleva su tarjeta al frente y la gira de cara al lector (`--face`, 850 ms); clic en la misma, Escape o clic en el escenario vuelven a la pose neutra. Un panel plano lista las tecnologías (botones reales) y los casos donde se usan, enlazando por los `tags` de `projects.ts`. Cada chip lleva su icono oficial de `techIcons.ts` (color de marca solo con contraste ≥ 3:1; si no, `currentColor`). Decisión y alternativas en [`stack-3d-research.md`](stack-3d-research.md).

Invariantes: solo `transform`; rAF que se detiene al converger y no corre fuera de pantalla; el DOM es una lista anidada; sin JS el panel lista todas las capas y casos; con movimiento reducido, pose estática sin vuelo; sin niveles de dominio inventados; las tecnologías sin casos no enlazan.

## Contacto

Panel enmarcado con dos zonas desde 64 rem: invitación (disponibilidad, correo con botón copiar, GitHub, LinkedIn, CV, con iconos) y formulario con etiquetas flotantes, validación en línea, contador, barra de progreso de envío y panel de éxito. Errores de validación y de envío en los cinco idiomas.

Invariantes: esquema zod, los dos `emailjs.send`, variables `NEXT_PUBLIC_EMAILJS_*`, `id`/`name` y el contenido enviado no cambian; zod y EmailJS se cargan bajo demanda; la animación de envío respeta movimiento reducido; no hay promesas de servicio sin respaldo.

## Pie de página

Firma «JoseC González» (del nombre del hero) que se teclea una vez al entrar en pantalla, con nombre completo en `sr-only`; capa de código (`FooterCodeRain.tsx`, canvas montado en idle, pausado fuera de pantalla y con pestaña oculta, ~30 fps) con vocabulario del stack y líneas de terminal `aria-hidden`; con movimiento reducido solo hay textura estática. Navegación y recursos se muestran lado a lado en móvil. Estilos en `src/app/pv3-footer.css`.

## Rutas de detalle y `/cv`

`/squaads`, `/nutriflow`, `/clinical-ai`, `/tallercardonal`, `/jegstudio` y `/sportbarleague` comparten `CaseHeader`/`CaseLayout`/`CaseSection` (`src/components/ui/CaseHeader.tsx`): volver a `/#caso-<id>`, nivel como texto, bloque «De un vistazo» (`CaseAtAGlance`: tipo, rol, stack, enlaces y qué demuestra), secciones numeradas sobre la traza y mini índice lateral desde 80 rem. El diagrama de flujo de Clinical AI se conserva en un `<pre>` con scroll interno enfocable. Los enlaces externos llevan `noopener noreferrer`. El sitemap (`src/app/sitemap.ts`) lista hoy `/`, `/nutriflow`, `/clinical-ai`, `/squaads`, `/login` y `/register`; faltan `/tallercardonal`, `/jegstudio`, `/sportbarleague` y `/cv`.

`/cv` muestra una vista previa del PDF (`public/JoseCarlos-CV.pdf`), tiene landmark `main` y enlace de descarga con contraste revisado.

## Accesibilidad y contraste

Pasada final: nombre accesible del enlace de marca, landmark `main` en `/cv` y contraste del CTA de caso, de la pestaña seleccionada y de la descarga del CV (`t05-perf-a11y-check.mjs`). Resultado de laboratorio en [`rendimiento.md`](rendimiento.md).
