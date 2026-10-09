import Image from 'next/image';
import { FlowDiagram } from '@/components/ui/FlowDiagram';
import { tallerFlow } from '@/data/diagrams';
import { CaseHeader, CaseLayout, CaseSection } from '@/components/ui/CaseHeader';

export default function TallerCardonalPage() {
  return (
    <main className="pv3-section pv3-detail">
      <div className="pv3-section__inner">
        <CaseHeader
          id="tallercardonal"
          tier="Client Delivery"
          title="TallerCardonal.es"
          lede="Proyecto real entregado a cliente. Gestión completa end-to-end: desde la toma de requisitos hasta el deploy en producción y el handoff."
          summary={{
 kind: "Proyecto para cliente real",
            role: "Proyecto para cliente, gestionado de extremo a extremo: requisitos, diseño, desarrollo, deploy y entrega.",
            stack: [
              "React 19",
              "Vite 7",
              "CSS 3",
              "Vercel",
              "EmailJS",
              "GA4",
              "Google Ads"
            ],
            proves: [
              "Entrega real a cliente, desde la toma de requisitos hasta el handoff con documentación de uso.",
              "Web en producción con dominio propio del cliente, optimizada con WebP, lazy loading y SEO.",
              "Criterio para adaptar la arquitectura al contexto, sin sobredimensionar."
            ]
          }}
          actions={[
            { label: 'Ver Web en Producción', href: 'https://www.tallercardonal.es/' },
          ]}
        >
          <Image
            src="/projects/taller-demo.png"
            alt="TallerCardonal Web"
            width={1094}
            height={896}
            className="pv3-detail__img"
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority
          />
        </CaseHeader>

        <section className="pv3-detail__api pv3-detail__arch">
          <h2 className="pv3-detail__label">Arquitectura</h2>
          <p className="pv3-detail__apilede">Qué piezas componen la web y a qué servicios se conecta.</p>
          <FlowDiagram data={tallerFlow} label={tallerFlow.label ?? ''} className="pv3-case__diagram" />
        </section>

        <CaseLayout
          stackTitle="Stack Tecnológico"
          stack={[
            ['Frontend', 'React 19 (Vite 7)'],
            ['Estilos', 'Custom CSS 3'],
            ['Deploy', 'Vercel'],
            ['Contacto', 'EmailJS'],
            ['Marketing', 'GA4 + Google Ads'],
          ]}
        >
          <CaseSection title="El Contexto">
              <p className="pv3-detail__pull">
              Un taller mecánico necesitaba presencia digital profesional.
              </p>
              <h3 className="pv3-detail__sub">Qué debía lograr la web</h3>
              <ul className="pv3-detail__cards">
              <li>Transmitir confianza.</li>
              <li>Mostrar servicios.</li>
              <li>Facilitar el contacto.</li>
              <li>Funcionar perfectamente en móvil.</li>
              </ul>
          </CaseSection>
          <CaseSection title="El Proceso Profesional">
              <ul className="pv3-detail__cards">
              <li><strong>Discovery:</strong> Reuniones con el cliente para entender el negocio, los servicios principales, la propuesta de valor y el público objetivo.</li>
              <li><strong>Diseño UX:</strong> Propuesta visual enfocada en confianza y accesibilidad, con CTA claros y navegación intuitiva.</li>
              <li><strong>Desarrollo:</strong> Implementación con React.js + Custom CSS 3. Componentes modulares y reutilizables. Responsive design mobile-first.</li>
              <li><strong>Optimización:</strong> Imágenes optimizadas en formato WebP, lazy loading, metadata SEO completamente configurada.</li>
              <li><strong>Entrega:</strong> Deploy en Vercel con dominio personalizado del cliente. Documentación de uso entregada. Periodo de soporte post-lanzamiento.</li>
              </ul>
          </CaseSection>
          <CaseSection title="Impacto Real">
              <p>
              No todos los proyectos necesitan un monorepo y 10 microservicios. <strong>Saber adaptar la arquitectura al contexto</strong> es una habilidad clave.
              </p>
              <ul className="pv3-detail__cards">
              <li>Web en producción activa con tráfico real.</li>
              <li>Lighthouse (oct. 2026, mediana de 3 ejecuciones): Accesibilidad 98, Buenas prácticas 100 y SEO 100.</li>
              <li>Reducción a cero de la dependencia del cliente de redes sociales como única presencia digital.</li>
              </ul>
          </CaseSection>
        </CaseLayout>
      </div>
    </main>
  );
}
