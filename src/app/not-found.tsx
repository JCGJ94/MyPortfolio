import Link from 'next/link';

export const metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main-content" className="pv3-section pv3-detail">
      <div className="pv3-section__inner">
        <h1 className="pv3-detail__label">404</h1>
        <p className="pv3-detail__pull">Esta página no existe o se ha movido.</p>
        <Link href="/" className="pv3-detail__back pv3-focus">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
