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

export const metadata: Metadata = {
  title: {
    default: 'JC | F.S Developer',
    template: 'JC | F.S Developer | %s'
  },
  description: 'Desarrollador de Software Full Stack especializado en React, Next.js y Node.js. Enfoque en arquitectura escalable y productos en producción.',
  keywords: ['Software Developer', 'Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Jose Carlos González', 'Node.js', 'PostgreSQL'],
  authors: [{ name: 'Jose Carlos González' }],
  creator: 'Jose Carlos González',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://mi-cv.vercel.app',
    title: 'JC | F.S Developer',
    description: 'Construyendo sistemas de alto rendimiento y arquitecturas escalables.',
    siteName: 'Jose Carlos González Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JC | F.S Developer',
    description: 'Desarrollador Full Stack enfocado en desarrollar productos interactivos de alto rendimiento.',
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
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground flex flex-col min-h-screen`}>
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
        <DevTools />
      </body>
    </html>
  );
}
