import { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        '',
        '/cv',
        '/nutriflow',
        '/clinical-ai',
        '/squaads',
        '/tallercardonal',
        '/jegstudio',
        '/sportbarleague',
    ].map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
