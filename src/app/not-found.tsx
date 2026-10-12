import { NotFoundContent } from '@/components/ui/CaseHeader';

export const metadata = {
  title: 'Página no encontrada',
  alternates: { canonical: null },
};

export default function NotFound() {
  return <NotFoundContent />;
}
