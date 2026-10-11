import { NotFoundContent } from '@/components/ui/CaseHeader';

export const metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundContent />;
}
