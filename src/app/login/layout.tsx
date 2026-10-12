// canonical: null overrides the root layout's canonical so noindex pages do not point at the home.
export const metadata = { alternates: { canonical: null }, robots: { index: false, follow: false } };

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
