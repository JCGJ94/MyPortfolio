# Rendimiento y accesibilidad

Datos de laboratorio, no de campo (no hay INP real). Solo se citan números medidos. La varianza es alta (la home oscila 76-86 entre ejecuciones): se citan rangos.

## Producción (12-10-2026)

Lighthouse 13.5, móvil con throttling simulado por defecto, medianas (mín-máx entre corchetes) sobre https://www.jccode.dev.

| Página | Rendimiento | FCP | LCP | TBT | Otros |
| --- | --- | --- | --- | --- | --- |
| `/` móvil | 85 (76-86) | 2055 ms | 3502 ms | 120 ms (65-381) | SI 4642 ms, CLS 0 |
| `/cv` móvil | 79 (77-80) | 2886 ms | 3901 ms | 132 ms | |
| `/squaads` móvil | 90 (82-96) | | 3122 ms | 49 ms | |
| `/` escritorio | 100 | | 699 ms | 0 | |
| `/cv` escritorio | 98 | | 1008 ms | | |

Accesibilidad, buenas prácticas y SEO: 100 en todas las ejecuciones.

Throttling real (CDP: 1,6 Mbps, 150 ms RTT, CPU ×4, 390×844, 5 cargas en frío):

| Página | FCP | LCP |
| --- | --- | --- |
| `/` | 2428 ms | 2524 ms |
| `/cv` | 1892 ms | 1892 ms (FCP = LCP) |

Lecturas previas en producción, como contexto: antes del release i18n `/` puntuaba 92 (92/93/87); después, 86 (87/86/75), `/cv` 74 y `/squaads` 88.

## Cómo leer las cifras

- El LCP simulado (3-4 s) es un artefacto del modelo de bytes de Lighthouse (Lantern). El pintado con throttling real es ~2,0-2,5 s en `/` y ~1,3-1,9 s en `/cv`.
- El elemento LCP de `/` es la imagen del hero; su retardo de render (~425 ms) viene de la animación de asentamiento y de la capa 3D enmascarada. El coste de Style & Layout (~2,2 s sin throttling) es el candidato más probable.
- Palanca pendiente (no aplicada, cambiaría el aspecto): recortar la máscara/capa 3D del hero en móvil.
- El propietario dio por buenos el rendimiento móvil y de escritorio y cerró el tema.

## Último cambio enviado: LazyMotion

`framer-motion` se carga con `LazyMotion` estricto y componentes `m`; las funciones van en un chunk asíncrono aparte (`src/components/layout/motionFeatures.ts` exporta `domAnimation`; `MotionProvider` mantiene `MotionConfig reducedMotion="user"`). Todo `motion.*` debe ser `m.*`. Además, `prefetch={false}` en los enlaces de Navbar y Footer (quita el prefetch de ~40 KB del chunk de la home en `/cv`). Resultado: JS inicial −21 KB gzip por ruta.

A/B en builds de producción locales (`2550228` frente al candidato con solo este cambio):

| Métrica | Antes | Después |
| --- | --- | --- |
| Home móvil, rendimiento | 83 | 85 |
| Home, LCP simulado | 4216 ms | 4024 ms |
| Home, TBT | 147 ms | 98 ms |
| Home, LCP real (CDP) | 2212 ms | 2012 ms |
| `/cv`, rendimiento | 92 | 90 |
| `/cv`, LCP simulado | 3296 ms | 3607 ms |
| `/cv`, FCP = LCP real (CDP) | 1312 ms | 1272 ms |

FCP de la home igual; escritorio 99 igual; capturas con movimiento reducido idénticas píxel a píxel. El empeoramiento simulado de `/cv` no aparece con throttling real.

## Decisiones vigentes

- **Zod y EmailJS bajo demanda** (`Contact.tsx`): ~65 KB menos de JS inicial en la home.
- **Retrato con `quality={60}`** (`images.qualities: [60, 75]`): de 83 KB a 52 KB; el brillo usa una máscara WebP de 26 KB (`public/heroAvatar-mask.webp`) en lugar de un PNG de 267 KB.
- **Inter sin preload** (`display: 'swap'`, `preload: false`): quita 48 KB de la ventana previa al LCP a costa de un CLS mínimo.
- **`content-visibility: auto`** en secciones con `contain-intrinsic-size` por breakpoint; las anclas aterrizan igual.
- **Animaciones**: solo `transform`/`opacity`; bucles pausados fuera de pantalla; lluvia de código del pie en canvas, en idle.
- **Favicon**: `src/app/icon.png` de 128×128 (19.099 bytes, antes 501.457); sin duplicado en `public/`. `icon-check.mjs` lo fija.

## Descartado (no repetir)

- `experimental.inlineCss: true`: empeora la home (CSS duplicado en HTML y payload RSC).
- Eliminar CSS muerto o dividir `pv3-contact-detail.css`: < 1 KB gzip.
- Retrato por debajo de q60 o afinar `sizes`: sin retorno.
- **Cargar bajo demanda los diccionarios no españoles** (dividir `translations.ts` y `*.i18n.ts` en español estático + chunks por idioma): −30-45 KB gzip de JS por ruta, pero sin ganancia de pintado medible (home 85 frente a 85, `/cv` −2 en Lighthouse) y retrasa a los visitantes alemanes ~0,5-0,6 s (texto del nav 3907 → 4535 ms con CDP; solo −10 KB en ese camino). No se envió (solo existió en la rama local `perf/mobile-v3`).

## Cómo reproducir

```bash
bun run build && bun run start
npx lighthouse http://127.0.0.1:3000/ --form-factor=mobile --throttling-method=simulate
```

Repetir varias veces y usar la mediana. Un build local no equivale a producción.
