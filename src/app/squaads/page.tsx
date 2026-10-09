import Image from 'next/image';
import { CaseHeader, CaseLayout, CaseSection } from '@/components/ui/CaseHeader';
import { SquaadsArchitecture } from '@/components/ui/SquaadsArchitecture';

export const metadata = {
  title: 'Squaads Meeting Bot',
  description: 'Plataforma interna y autoalojada de inteligencia de reuniones: un bot entra a Google Meet y Microsoft Teams, graba, transcribe y resume. Monorepo Bun, cola de trabajos en Postgres, CI/CD con GitHub Actions, Vercel y Railway.',
};

const pipeline = [
  'Instalación con lockfile congelado',
  'Esquema de base de datos',
  'Tests contra Postgres 16 real',
  'Lint',
  'Typecheck',
  'ZIP de la extensión = build limpia',
  'Build Docker del worker',
];

export default function SquaadsPage() {
  return (
    <main className="pv3-section pv3-detail">
      <div className="pv3-section__inner">
        <CaseHeader
          id="squaads-meeting-bot"
          tier="Proyecto de empresa"
          title="Squaads Meeting Bot"
          lede="Plataforma interna y autoalojada de inteligencia de reuniones para Squaads: un bot entra a Google Meet o Microsoft Teams, graba audio y vídeo, transcribe, resume y permite conversar con las reuniones mediante IA."
          summary={{
 kind: "Proyecto de empresa",
            role: "Colaboré con el equipo en la fase inicial y después lideré el desarrollo prácticamente en solitario, incluido el pipeline de CI/CD y el despliegue.",
            stack: [
              "Bun",
              "Next.js 16",
              "TypeScript",
              "Postgres",
              "Drizzle",
              "Docker",
              "Puppeteer",
              "FFmpeg",
              "Vercel",
              "Railway"
            ],
            proves: [
              "CI en dev y main y despliegue continuo automático solo desde main, con web en Vercel y worker en Railway.",
              "Cola de trabajos en Postgres con máquina de estados; el worker reclama trabajos con heartbeat y reintenta con backoff.",
              "Proyecto de empresa liderado casi en solitario tras la fase inicial, con ADRs y desarrollo guiado por especificaciones."
            ]
          }}
          actions={[{ label: 'Ver Repositorio', href: 'https://github.com/devs-squaads/tldv-squaads-dev' }]}
        >
          <figure className="pv3-detail__shot">
            <Image
              src="/projects/squaads-login.webp"
              alt="Pantalla de acceso de Squaads Bot en desarrollo: «Tu asistente inteligente para reuniones», botón «Continuar con Google» y lista de permisos (perfil y email, calendario, auto-join)."
              width={1111}
              height={1064}
              sizes="(min-width: 64rem) 28rem, 90vw"
              className="pv3-case__shot"
            />
          </figure>
          <SquaadsArchitecture label="Diagrama de arquitectura de Squaads Meeting Bot: calendario y extensión, web, cola en Postgres, worker con navegador y FFmpeg, almacenamiento, transcripción, resumen con IA y panel." />
        </CaseHeader>
        <p className="pv3-detail__note">Proyecto de empresa · sin demo pública: el entorno de desarrollo exige login de Google.</p>

        <CaseLayout
          stackTitle="Stack Tecnológico"
          stack={[
            ['Monorepo', 'Bun (web, worker, extensión y paquete compartido)'],
            ['Web', 'Next.js 16 · React 19 · next-auth'],
            ['Worker', 'Bun · Puppeteer · FFmpeg (Docker)'],
            ['Datos', 'Postgres · Drizzle'],
            ['Grabaciones', 'S3 / MinIO'],
            ['IA', 'Groq Whisper · Deepgram · Groq con fallback a Gemini'],
            ['Despliegue', 'Vercel (web) · Railway (worker)'],
          ]}
        >
          <CaseSection title="El Producto">
            <p className="pv3-detail__pull">
              Alternativa interna a los grabadores de reuniones SaaS, sobre la infraestructura propia de la empresa.
            </p>
            <h3 className="pv3-detail__sub">Flujo</h3>
            <ul className="pv3-detail__cards">
              <li><strong>Unirse y grabar</strong> El bot se une a la reunión y la graba con un navegador headless (Puppeteer) y FFmpeg con Xvfb y PulseAudio dentro de Docker.</li>
              <li><strong>Transcribir</strong> Con Groq Whisper o Deepgram.</li>
              <li><strong>Resumir</strong> Con Groq, con Gemini como fallback.</li>
            </ul>
            <h3 className="pv3-detail__sub">Funciones</h3>
            <ul>
              <li>Chat con IA sobre las reuniones.</li>
              <li>Auto-join con Google Calendar y extensión de navegador.</li>
              <li>Compartir reuniones por correo electrónico.</li>
              <li>Inicio de sesión con Google OAuth.</li>
            </ul>
          </CaseSection>
          <CaseSection title="Arquitectura">
            <p className="pv3-detail__pull">
              Web y worker se despliegan por separado y se coordinan mediante una <mark>cola de trabajos en Postgres</mark>.
            </p>
            <h3 className="pv3-detail__sub">Monorepo Bun</h3>
            <p>
              <code>apps/web</code> (Next.js 16, React 19 y next-auth), <code>apps/worker</code> (Bun), <code>apps/extension</code> y <code>packages/shared</code>.
            </p>
            <h3 className="pv3-detail__sub">Decisiones</h3>
            <ul className="pv3-detail__cards">
              <li><strong>Máquina de estados:</strong> <code>pending → recording → transcribing → summarizing → completed | error</code>, con Postgres y Drizzle como cola.</li>
              <li><strong>Worker robusto:</strong> reclama trabajos con heartbeat y reintenta con backoff.</li>
              <li><strong>Almacenamiento:</strong> las grabaciones viven en S3 / MinIO.</li>
              <li><strong>Acceso a datos:</strong> patrón Repository.</li>
            </ul>
          </CaseSection>
          <CaseSection title="CI/CD y Despliegue">
            <p>
              <mark>CI en dev y main; despliegue continuo automático solo desde main.</mark>
            </p>
            <h3 className="pv3-detail__sub">Pipeline</h3>
            <p>En cada push y PR a dev y main, GitHub Actions ejecuta:</p>
            <ol className="pv3-detail__pipeline" aria-label="Pasos de CI">
              {pipeline.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <h3 className="pv3-detail__sub">Gobernanza y despliegue</h3>
            <ul className="pv3-detail__cards">
              <li><strong>Gobernanza:</strong> feature, PR a dev y PR a main; un guard de GitHub Actions solo admite PRs a main desde dev del mismo repositorio, y se exige aprobación.</li>
              <li><strong>Web:</strong> Vercel con integración Git y <code>vercel.json</code> versionado.</li>
              <li><strong>Worker:</strong> Railway con Dockerfile, migrado desde workflows de despliegue en VPS.</li>
            </ul>
          </CaseSection>
          <CaseSection title="Seguridad y Proceso">
            <ul className="pv3-detail__cards">
              <li><strong>Endurecimiento</strong> RLS y middleware de autenticación, documentados en ADRs.</li>
              <li><strong>Proceso</strong> Desarrollo guiado por especificaciones, con specs de funcionalidad numeradas.</li>
            </ul>
          </CaseSection>
          <CaseSection title="Mi Rol">
            <p>
              Colaboré con el equipo en la fase inicial y después lideré el desarrollo prácticamente en solitario, incluido el pipeline de CI/CD y el despliegue.
            </p>
          </CaseSection>
        </CaseLayout>
      </div>
    </main>
  );
}
