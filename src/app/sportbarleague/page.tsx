import Image from 'next/image';
import { FlowDiagram } from '@/components/ui/FlowDiagram';
import { sportbarFlow } from '@/data/diagrams';
import { CaseHeader, CaseLayout, CaseSection } from '@/components/ui/CaseHeader';

export default function SportBarLeaguePage() {
  return (
    <main className="pv3-section pv3-detail">
      <div className="pv3-section__inner">
        <CaseHeader
          id="sportbarleague"
          tier="Technical Foundation"
          title="SportBarLeague"
          lede="Plataforma full-stack para la gestión de eventos deportivos y ligas en bares. Sistema completo de autenticación JWT, CRUD avanzado, modelado relacional robusto y gestión de imágenes con Cloudinary. La base técnica sólida que consolidó los fundamentos del desarrollo backend profesional."
          summary={{
 kind: "Proyecto de bootcamp",
            role: "Proyecto de bootcamp que consolidó los fundamentos del desarrollo backend, con frontend y API propios.",
            stack: [
              "React 18 (Vite)",
              "Flask (Python 3.13)",
              "PostgreSQL",
              "SQLAlchemy",
              "Alembic",
              "JWT",
              "Docker"
            ],
            proves: [
              "Autenticación JWT con refresh tokens construida a mano, sin servicio de Auth en la nube.",
              "Modelado relacional con relaciones N:M y 1:N, constraints y migraciones versionadas con Alembic.",
              "API REST con separación de controladores, validación de payloads y manejo de errores consistente."
            ]
          }}
          actions={[
            { label: 'Ver Repositorio', href: 'https://github.com/JCGJ94/JCGJ94-SportBarLeague' },
          ]}
        >
          <Image
            src="/projects/sportbar-league-captura.png"
            alt="SportBarLeague Interface"
            width={1362}
            height={925}
            className="pv3-detail__img"
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority
          />
        </CaseHeader>

        <section className="pv3-detail__api pv3-detail__arch">
          <h2 className="pv3-detail__label">Arquitectura</h2>
          <p className="pv3-detail__apilede">De la interfaz React a la base de datos relacional.</p>
          <FlowDiagram data={sportbarFlow} label={sportbarFlow.label ?? ''} className="pv3-case__diagram" />
        </section>

        <CaseLayout
          stackTitle="Stack Tecnológico"
          stack={[
            ['Frontend', 'React 18 (Vite)'],
            ['Estilos', 'Sass + Bootstrap 5'],
            ['Backend API', 'Flask (Python 3.13)'],
            ['Base de Datos', 'PostgreSQL + SQLAlchemy'],
            ['Deploy', 'Render (Docker)'],
          ]}
        >
          <CaseSection title="El Concepto">
              <p className="pv3-detail__pull">
              Plataforma para gestión de ligas deportivas en bares/pubs.
              </p>
              <h3 className="pv3-detail__sub">Qué permite</h3>
              <ul className="pv3-detail__cards">
              <li>Crear ligas y registrar equipos.</li>
              <li>Gestionar resultados y seguir clasificaciones.</li>
              </ul>
              <h3 className="pv3-detail__sub">Qué exigía</h3>
              <p>Un sistema completo de autenticación y un modelo de datos relacional robusto.</p>
          </CaseSection>
          <CaseSection title="Decisiones Técnicas">
              <ul className="pv3-detail__cards">
              <li><strong>Autenticación JWT manual:</strong> Registro, login, protección de rutas y refresh tokens estructurados desde cero, sin depender de un servicio de Auth en la nube.</li>
              <li><strong>API REST con Flask:</strong> Endpoints diseñados profesionalmente, con separación de controladores, validación exhaustiva de payloads y manejo de errores consistente.</li>
              <li><strong>Modelado Relacional (SQLAlchemy):</strong> Relaciones complejas N:M (jugadores-equipos), 1:N (liga-equipos), foreign keys correctas y uso de constraints. Migraciones versionadas vía Alembic.</li>
              <li><strong>Frontend integrado:</strong> Componentes reutilizables React, manejo de estado global, consumo de API e intercepción de tokens JSON Web.</li>
              </ul>
          </CaseSection>
          <CaseSection title="La Evolución Profesional">
              <p className="pv3-detail__pull">
              SportBarLeague fue el proyecto que <mark>consolidó los fundamentos imprescindibles del desarrollo backend serio</mark>.
              </p>
              <p>
              Después de orquestar autenticación, bases de datos relacionales y API REST de forma manual, el salto hacia arquitecturas más abstractas en proyectos superiores fue completamente natural: cada decisión avanzada en nuevos sistemas tiene sus raíces en lo asimilado aquí.
              </p>
          </CaseSection>
        </CaseLayout>
      </div>
    </main>
  );
}
