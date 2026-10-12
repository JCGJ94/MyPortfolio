import { pageMetadata } from '@/lib/seo';
import { JegStudioContent } from './JegStudioContent';

export const metadata = pageMetadata({
  path: '/jegstudio',
  title: 'JEG Studio',
  description: 'Landing page y MVP desarrollados en equipo con Next.js, Git Flow y code review, participando en decisiones de arquitectura y diseño.',
});

export default function JEGStudioPage() {
  return <JegStudioContent />;
}
