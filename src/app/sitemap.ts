import { MetadataRoute } from 'next';
import { siteUrl, siteLastUpdated } from '@/lib/site';

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
        lastModified: siteLastUpdated,
    }));

    return routes;
}
