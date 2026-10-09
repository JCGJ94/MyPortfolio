import Image from 'next/image';
import { FlowDiagram } from '@/components/ui/FlowDiagram';
import { jegFlow } from '@/data/diagrams';
import { CaseHeader, CaseLayout, CaseSection } from '@/components/ui/CaseHeader';

export default function JEGStudioPage() {
  return (
    <main className="pv3-section pv3-detail">
      <div className="pv3-section__inner">
        <CaseHeader
          id="jegstudio"
          tier="Proyecto en equipo"
          title="JEG Studio"
          lede="Landing page profesional y MVP para un equipo de desarrolladores y creativos. Proyecto colaborativo con control de versiones profesional, code review y participación activa en decisiones de arquitectura y diseño."
          summary={{
 kind: "Proyecto en equipo",
            role: "Proyecto en equipo con ownership de features completas y participación en decisiones de arquitectura y diseño.",
            stack: [
              "Next.js 14",
              "React 18",
              "Tailwind CSS",
              "Git Flow",
              "Vercel"
            ],
            proves: [
              "Trabajo en equipo con Git Flow: ramas feat/ y fix/ y PRs con al menos un reviewer.",
              "Decisiones compartidas sobre estructura, naming, estilado y modelo de datos.",
              "Comunicación técnica: defender propuestas de arquitectura y escribir código que otros puedan mantener."
            ]
          }}
          actions={[
            { label: 'Ver Demo', href: 'https://www.jegsdev.com/' },
            { label: 'Ver Repositorio', href: 'https://github.com/JCGJ94/CodeNinja' },
          ]}
        >
          <Image
            src="/projects/JegStudio.png"
            alt="JEG Studio Project"
            width={951}
            height={711}
            className="pv3-detail__img"
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority
          />
        </CaseHeader>

        <section className="pv3-detail__api pv3-detail__arch">
          <h2 className="pv3-detail__label">Flujo de Trabajo</h2>
          <p className="pv3-detail__apilede">Cómo viaja el trabajo del equipo desde una rama hasta main.</p>
          <FlowDiagram data={jegFlow} label={jegFlow.label ?? ''} className="pv3-case__diagram" />
        </section>

        <CaseLayout
          stackTitle="Stack &amp; Prácticas"
          stack={[
            ['Framework', 'Next.js 14 (React 18)'],
            ['Estilos', 'Tailwind CSS 3.4'],
            ['Flujo', 'Git Flow'],
            ['Calidad', 'Code Review'],
            ['Deploy', 'Vercel'],
          ]}
        >
          <CaseSection title="El Contexto">
              <p className="pv3-detail__pull">
              Proyecto colaborativo con otros desarrolladores.
              </p>
              <p>El objetivo era construir una solución web completa <mark>trabajando como un equipo de desarrollo real</mark>, no como individuos que juntan código al final.</p>
          </CaseSection>
          <CaseSection title="Dinámica de Equipo">
              <ul className="pv3-detail__cards">
              <li><strong>Git Flow profesional:</strong> Branches por feature (<code>feat/</code>), por fix (<code>fix/</code>), PRs obligatorios con al menos un reviewer. Nada se mergeaba a <code>main</code> sin revisión.</li>
              <li><strong>Decisiones compartidas:</strong> Definición de estructura de carpetas, convenciones de naming, estrategia de estilado y modelo de datos consensuados en equipo.</li>
              <li><strong>Coordinación técnica:</strong> Sincronización diaria sobre el estado de cada feature, resolución proactiva de conflictos, y pair programming para módulos críticos.</li>
              <li><strong>Responsabilidad individual:</strong> Cada miembro tenía ownership de features completas, pero el equipo revisaba y aprobaba todo.</li>
              </ul>
          </CaseSection>
          <CaseSection title="Habilidades Demostradas">
              <ul className="pv3-detail__cards">
              <li>Capacidad real de colaboración, excediendo el &quot;trabajar solo y subir a un repo compartido&quot;.</li>
              <li>Experiencia con flujos de trabajo profesionales que replican entornos organizacionales (PRs, Issues, agile).</li>
              <li>Habilidad para comunicar decisiones técnicas y defender propuestas de arquitectura ante colegas.</li>
              <li>Empatía técnica: adaptar el código propio para que otros lo entiendan y lo puedan mantener a futuro.</li>
              </ul>
          </CaseSection>
        </CaseLayout>
      </div>
    </main>
  );
}
