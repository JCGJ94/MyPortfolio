# Stack en 3D: investigación y decisión

Contexto: una primera versión del Stack como árbol no se leía como sistema; se buscó una representación en 3D que mostrara todo el stack. Estado final de la sección en [`secciones.md`](secciones.md).

## Referencias

| # | Referencia | Técnica | Coste | Accesibilidad |
|---|---|---|---|---|
| 1 | [Icon Cloud (SikandarJODD)](https://www.mintlify.com/SikandarJODD/animations/components/icon-cloud) | Esfera de Fibonacci proyectada a 2D en canvas; ordena de atrás a delante; cerca = más grande y opaco | Bucle rAF continuo + canvas | Mala: iconos en canvas, sin texto ni foco |
| 2 | [Spinning Icon Sphere (Framer)](https://www.framer.com/community/marketplace/components/spinning-icon-sphere/) | Esfera de iconos con rotación automática | Bucle continuo | Solo decorativa |
| 3 | [adrianhajdin/project_3D_developer_portfolio](https://github.com/adrianhajdin/project_3D_developer_portfolio) | Three.js / react-three-fiber: bolas 3D con logos | +600 KB de JS, WebGL, TBT alto | Canvas opaco, sin fallback |
| 4 | [CSS Exploded UI Using 3D Transforms (aktagon)](https://play.aktagon.com/plays/css-3d-transform-ui-exploded-view/) | Vista explosionada: `translateZ = nivel x separación`, `preserve-3d` en cada nivel | Solo transform, sin JS | Buena: el texto sigue siendo DOM |
| 5 | [Isometric layout with 3D transforms (Tuts+)](https://webdesign.tutsplus.com/create-an-isometric-layout-with-3d-transforms--cms-27134t) | `rotateX(60deg) rotateZ(-45deg)` sobre planos apilados | Solo transform | Texto deformado en isométrico puro |
| 6 | [CSS Meets Voxel Art (Codrops)](https://tympanus.net/codrops/?p=88123) | `perspective` grande (8000px) para look casi isométrico y `preserve-3d` en toda la escena | Muchos nodos; GPU | N/A |

## Algoritmos aprendidos

**Esfera de Fibonacci** (ref. 1-2): para `i` en `0..n-1`: `y = 1 - 2(i+0.5)/n`, `r = sqrt(1-y^2)`, `theta = i * pi * (3 - sqrt5)`, punto `(r cos theta, y, r sin theta)`. Rotación por puntero con inercia (lerp hacia el objetivo) y profundidad `z` mapeada a escala y opacidad.

**Vista explosionada** (ref. 4-6): cada plano recibe `translateZ(nivel * separación)`; la separación es una variable que se anima (0 = colapsado, 1 = explosionado). La escena (`perspective` en el contenedor, `preserve-3d` en el rig) rota con `rotateX/Y` derivados del puntero.

## Decisión: pila de capas de arquitectura (vista explosionada)

Una esfera de etiquetas mezcla roles y es el patrón más repetido en portfolios; además, a 40 tecnologías el texto se solapa y se lee mal. La pila de capas (Frontend, Backend, IA, Datos, Herramientas) cuenta cómo se construye un sistema, encaja con la identidad de "traza / ingeniería" del portfolio y mantiene el texto real en el DOM (lectura, foco, lectores de pantalla).

Implementación: CSS 3D (`perspective`, `preserve-3d`) sin dependencias. JS mínimo: puntero y scroll escriben variables CSS (`--px`, `--py`, `--sc`, `--ex`) en un rAF con inercia que se detiene al converger (sin bucle continuo, nada se calcula fuera de pantalla). Solo `transform`/`opacity`. Three.js se descarta: peso de JS y canvas sin fallback accesible para 40 etiquetas de texto.

Accesibilidad: las capas son una lista semántica; las tecnologías con casos son botones (`aria-pressed`) y el foco adelanta su capa; el panel lateral lista los casos vinculados (sin JS muestra todos). Movimiento reducido: pose 3D estática, sin rAF.
