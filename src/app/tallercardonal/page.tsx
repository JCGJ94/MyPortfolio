import { TallerCardonalContent } from './TallerCardonalContent';

export const metadata = {
  title: 'TallerCardonal.es',
  description: 'Proyecto real entregado a cliente de extremo a extremo con React, Vite y Vercel: requisitos, desarrollo, deploy y handoff.',
  alternates: { canonical: '/tallercardonal' },
  openGraph: { url: '/tallercardonal', images: ['/opengraph-image'] },
};

export default function TallerCardonalPage() {
  return <TallerCardonalContent />;
}
