import { pageMetadata } from '@/lib/seo';
import { TallerCardonalContent } from './TallerCardonalContent';

export const metadata = pageMetadata({
  path: '/tallercardonal',
  title: 'TallerCardonal.es',
  description: 'Proyecto real entregado a cliente de extremo a extremo con React, Vite y Vercel: requisitos, desarrollo, deploy y handoff.',
});

export default function TallerCardonalPage() {
  return <TallerCardonalContent />;
}
