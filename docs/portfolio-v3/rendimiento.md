# Rendimiento y accesibilidad

Datos de laboratorio, no de campo (no hay INP real). Solo se citan números medidos.

## Medición final

Condiciones: octubre de 2026, rama `feat/portfolio-v3`, build de producción servido en local (`next build` + `next start`), Lighthouse 13.5, móvil con throttling simulado (RTT 150 ms, 1638,4 Kbps, CPU ×4), salvo la fila de escritorio.

| Página | Rendimiento |
| --- | --- |
| `/` móvil | 78 |
| `/` escritorio | 99 |
| `/squaads` móvil | 92 |
| `/clinical-ai` móvil | 93 |
| `/cv` móvil | 93 |

Home móvil: LCP 5,3 s simulado (observado sin simular ≈ 370 ms), TBT 140 ms, CLS 0, accesibilidad 100 tras la pasada final (nombre del enlace de marca, landmark `main` en `/cv` y contraste del CTA de caso, de la pestaña seleccionada y de la descarga del CV). Buenas prácticas y SEO: 100.

## Objetivos no cumplidos

Los objetivos eran rendimiento móvil ≥ 90 y LCP ≤ 2,5 s. **No se cumplen en la home móvil** (78 y 5,3 s simulados). El LCP es el retrato del hero; la diferencia entre el valor observado (≈ 370 ms) y el simulado indica que pesan los bytes y el trabajo previo al primer pintado, no el retardo de la propia imagen: Lighthouse simula la suma de las peticiones anteriores al LCP más el trabajo del hilo principal ×4.

Palancas conocidas (no aplicadas o no concluyentes):
- **Framer Motion con `LazyMotion`**: una prueba anterior sobre una versión previa de la home ahorró unos 4 KB y no cambió el LCP; conviene repetirla ahora que el hero y la sección Proyectos pesan más.
- **CSS bloqueante del renderizado**: el CSS se sirve como hoja externa antes del primer pintado; `experimental.inlineCss` empeoró la home en una prueba anterior (el CSS se duplicaba en HTML y payload RSC).
- **Coste del hero**: retrato 3D de varias capas, entrada tecleada y bucles; es el candidato principal a revisar.

## Decisiones de rendimiento vigentes

- **Zod y EmailJS bajo demanda** (`Contact.tsx`): `import('zod')` en el primer foco del formulario o al enviar; `@emailjs/browser` se importa al enviar. Sacó unos 65 KB de JS de la carga inicial de la home.
- **Retrato con `quality={60}`** (`images.qualities: [60, 75]`): de 83 KB a 52 KB, mismo archivo; el brillo del hero usa una máscara WebP solo con canal alfa de 26 KB (`public/heroAvatar-mask.webp`) en lugar de un PNG de 267 KB.
- **Fuente Inter sin preload** (`display: 'swap'`, `preload: false`): quita 48 KB de la ventana previa al LCP a costa de un CLS mínimo por el swap.
- **`content-visibility: auto`** en secciones, con `contain-intrinsic-size` medido por breakpoint; las anclas `/#projects`, `/#about`, `/#contact` y `/#caso-*` aterrizan igual que sin la regla.
- **Animaciones**: solo `transform`/`opacity`; bucles pausados fuera de pantalla y con la pestaña oculta; lluvia de código del pie en canvas, montada en idle.
- **Favicon**: `src/app/icon.png` de 128×128 (19.099 bytes, antes 640×640 y 501.457 bytes); se retiró el duplicado `public/icon.png`, que interceptaba la ruta `/icon.png` y servía el original. `public/apple-icon.png` no cambia. `icon-check.mjs` fija estas condiciones.

## Descartado

- `experimental.inlineCss: true`: empeora la home.
- Eliminar CSS muerto o dividir `pv3-contact-detail.css` por ruta: ganancia inferior a 1 KB gzip.
- Bajar el retrato por debajo de q60 y afinar `sizes`: sin retorno.

## Cómo reproducir

```bash
npm run build && npm run start
npx lighthouse http://127.0.0.1:3000/ --form-factor=mobile --throttling-method=simulate
```

Repetir tres veces y usar la mediana. Los resultados dependen de la carga del equipo y no equivalen a producción.
