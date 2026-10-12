import type { Metadata } from 'next';

const ogImage = '/opengraph-image';

export function pageMetadata({ path, title, description }: { path: string; title: string; description: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: 'Jose Carlos González Portfolio',
      locale: 'es_ES',
      url: path,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@jcgj94',
    },
  };
}
