import { SquaadsContent } from './SquaadsContent';

export const metadata = {
  title: 'Squaads Meeting Bot',
  description: 'Plataforma interna y autoalojada de inteligencia de reuniones: un bot entra a Google Meet y Microsoft Teams, graba, transcribe y resume. Monorepo Bun, cola de trabajos en Postgres, CI/CD con GitHub Actions, Vercel y Railway.',
  alternates: { canonical: '/squaads' },
  openGraph: { url: '/squaads', images: ['/opengraph-image'] },
};

export default function SquaadsPage() {
  return <SquaadsContent />;
}
