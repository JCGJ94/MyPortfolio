// Canonical production origin. Deliberately not read from an env var: a stale NEXT_PUBLIC_SITE_URL on Vercel
// once leaked mi-cv.vercel.app into canonical, sitemap and JSON-LD.
export const siteUrl = 'https://www.jccode.dev';
