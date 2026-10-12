import { pageMetadata } from '@/lib/seo';
import { SquaadsContent } from './SquaadsContent';

export const metadata = pageMetadata({
  path: '/squaads',
  title: 'Squaads Meeting Bot',
  description: 'Plataforma autoalojada de inteligencia de reuniones: un bot entra a Google Meet y Teams, graba, transcribe y resume. Monorepo Bun, Postgres y CI/CD.',
});

export default function SquaadsPage() {
  return <SquaadsContent />;
}
