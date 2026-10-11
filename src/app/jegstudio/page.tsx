import { JegStudioContent } from './JegStudioContent';

export const metadata = {
  title: 'JEG Studio',
  description: 'Landing page y MVP desarrollados en equipo con Next.js, Git Flow y code review, participando en decisiones de arquitectura y diseño.',
  alternates: { canonical: '/jegstudio' },
  openGraph: { url: '/jegstudio', images: ['/opengraph-image'] },
};

export default function JEGStudioPage() {
  return <JegStudioContent />;
}
