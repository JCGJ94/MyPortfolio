import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { JsonLd } from '@/components/layout/JsonLd';
import { Footer } from '@/components/layout/Footer';
import { DevTools } from '@/components/dev/DevTools';
import { LanguageProvider } from '@/context/LanguageContext';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://mi-cv.vercel.app');

export const metadata: Metadata = {
  title: {
    default: 'JC | Full Stack · Backend Python & AI',
    template: 'JC | Full Stack · Backend Python & AI | %s'
  },
  description: 'Desarrollador Full Stack con foco en Backend Python e IA aplicada. Construyo APIs, servicios backend y productos web con Next.js que integran LLMs y automatización.',
  keywords: ['Full Stack Developer', 'Backend Python Developer', 'Python', 'FastAPI', 'Next.js', 'React', 'TypeScript', 'LLM', 'AI Developer', 'Jose Carlos González'],
  authors: [{ name: 'Jose Carlos González' }],
  creator: 'Jose Carlos González',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    title: 'JC | Full Stack · Backend Python & AI',
    description: 'Full Stack con foco en Backend Python e IA aplicada. APIs, servicios backend y productos web con LLMs.',
    siteName: 'Jose Carlos González Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JC | Full Stack · Backend Python & AI',
    description: 'Full Stack Developer con foco en Backend Python e IA aplicada.',
    creator: '@jcgj94',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} font-sans antialiased bg-background text-foreground flex flex-col min-h-screen`}>
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <JsonLd />
            <Navbar />
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
          </ThemeProvider>
        </LanguageProvider>
        {process.env.NODE_ENV === 'development' && <DevTools />}
      </body>
    </html>
  );
}
