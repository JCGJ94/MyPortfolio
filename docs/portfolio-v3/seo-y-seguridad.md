# SEO, seguridad y accesibilidad

## SEO

| Tema | Estado |
| --- | --- |
| URL canónica | `siteUrl = https://www.jccode.dev` fijo en `src/lib/site.ts`. `NEXT_PUBLIC_SITE_URL` ya no se lee (una variable obsoleta filtró `mi-cv.vercel.app` en canonical, sitemap y JSON-LD) |
| Metadatos por subpágina | `pageMetadata({ path, title, description })` en `src/lib/seo.ts`: título, descripción, canonical, `openGraph` (website, siteName, `es_ES`, imagen 1200×630) y `twitter` |
| Tarjeta social | `src/app/opengraph-image.tsx` (1200×630) |
| Longitudes | Títulos 37-63 caracteres, descripciones 110-148 |
| Idioma | Solo español por diseño (el idioma es del cliente); sin `hreflang`. URLs por idioma serían un cambio mayor y opcional |
| JSON-LD | Home: `@graph` con `Person` (`#person`) y `WebSite` (`#website`); `/cv`: `ProfilePage`; en el resto, nada. `sameAs` de LinkedIn con porcentaje codificado |
| `noindex` | `/login`, `/register` y 404, sin canonical (`alternates.canonical = null`). El 404 recibe el único `noindex` de Next (no hay `robots` en los metadatos raíz) |
| `robots.txt` | Bloquea `/api/`, `/dashboard`, `/dashboard/`, `/login`, `/register` |
| Sitemap | 8 URL con `lastmod` fijo (`siteLastUpdated` en `src/lib/site.ts`: actualizarlo al cambiar contenido); sin `changefreq` ni `priority` |
| Iconos | `metadata.icons` declara `icon` (`/icon.png`) y `apple` (`/apple-icon.png`): declarar solo `apple` eliminaba el enlace del icono por convención. Sin `favicon.ico` a propósito |
| Límite aceptado | `http://jccode.dev` da dos saltos (redirección https de la plataforma y luego la del dominio) |

## Cabeceras de seguridad (`next.config.mjs`)

| Cabecera | Valor |
| --- | --- |
| `Content-Security-Policy` | `default-src 'self'`; `script-src 'self' 'unsafe-inline'` (+ `'unsafe-eval'` solo en desarrollo); `style-src 'self' 'unsafe-inline'`; `img-src 'self' data: blob: https:`; `font-src 'self' data:`; `connect-src 'self' https:` (+ `ws:` en desarrollo); `frame-src 'self'`; `frame-ancestors 'self'`; `object-src 'none'`; `base-uri 'self'`; `form-action 'self'` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `SAMEORIGIN` (`/cv` incrusta el PDF del mismo origen) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | cámara, micrófono y geolocalización desactivados |

Límite: `connect-src` admite cualquier host `https` (no se ha restringido).

## Accesibilidad

- Enlace de salto («Saltar al contenido», traducido): primera parada de Tab en toda ruta, apunta a `#main-content`.
- Selector de idioma como menú: botón `aria-haspopup="menu"`, elementos `menuitemradio`, flechas/Inicio/Fin/Escape y retorno del foco.
- Contraste: `--muted-foreground` claro `#5b6b80` (5,44:1 sobre blanco); la marca del nav oscuro usa `color-mix(accent 80%, #000)` para AA.
- Trampa: en este repositorio las variantes `dark:` de Tailwind siguen `prefers-color-scheme`, no la clase `.dark`. Usar `[.dark_&]:` o CSS en `globals.css`.
- axe (wcag2a/2aa/21aa/best-practice): 0 violaciones en 11 rutas × es/de × claro/oscuro × 390/1440 px (build de producción, movimiento reducido).
- Falsos positivos de contraste si axe muestrea durante las animaciones de entrada: esperar `networkidle` + 1500 ms o usar movimiento reducido.
