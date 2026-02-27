import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://mi-cv.vercel.app';

    // En aplicaciones reales, podrías obtener los IDs de proyectos de una DB
    // Por ahora los definimos estáticamente basados en el PRD

    const routes = [
        '',
        '/nutriflow',
        '/login',
        '/register',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
