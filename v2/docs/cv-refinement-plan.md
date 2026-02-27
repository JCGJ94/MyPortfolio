# 📋 Plan de Refinamiento: Digital CV Hub & Professional UI

Este plan detalla las mejoras para alinear tu CV digital con tu perfil real, mejorando la narrativa y la interfaz visual (inspirada en Media.Monks pero adaptada).

## 1. Alineación de Perfil Profesional (Copy)
Sustituiremos el discurso "Senior" por uno de "Competencia Real y Evolución".
- **Concepto:** Full Stack Developer | Product Focus | Practical Execution.
- **Narrativa:** Destacar la FP antigua (base) + Bootcamp (actualización) + Proyectos Reales (ejecución).

## 2. Reestructuración de Proyectos (Data & UI)
Asegurar que los 4 proyectos estratégicos tengan la jerarquía y assets correctos.
- **NutriFlow:** Flagship (Arquitectura moderna).
- **TallerCardonal:** Client Delivery (Impacto real).
- **JEG Studio:** Team Project (Colaboración).
- **SportBarLeague:** Foundation (Bases técnicas).

## 3. Mejoras UI/UX (Estilo Media.Monks)
Implementar una sección de proyectos más sofisticada:
- **Hover Transitions:** Escalado de imagen suave (transform: scale(1.05)).
- **Interactive Badges:** Badges que indiquen el tipo de proyecto (🚀, 🤝, 👥, 🧱).
- **Responsive Hub:** Layout adaptable que mantenga la legibilidad en móviles.

## 4. Evolución del CV Hub (/cv)
Pasar de un simple iframe a un panel interactivo:
- **Secciones:** Resumen, Skills (JS/Node/Python/Flask/Tailwind), Educación (FP 2009 -> Bootcamp 2025).
- **CTA:** Botón de descarga de PDF siempre visible y estilizado.

## Pasos de Implementación

### Fase 1: Datos y Narrativa
- [ ] Actualizar `src/data/projects.ts` con descripciones honestas y precisas.
- [ ] Refinar el `About.tsx` con el nuevo perfil profesional.

### Fase 2: UI de Proyectos
- [ ] Modificar `src/components/sections/Projects.tsx` para incluir el efecto de hover mejorado.
- [ ] Asegurar que las imágenes de `v2/public/projects` se carguen correctamente.

### Fase 3: CV Hub Interactivo
- [ ] Rediseñar `src/app/cv/page.tsx` para mostrar la información estructurada además del PDF.
