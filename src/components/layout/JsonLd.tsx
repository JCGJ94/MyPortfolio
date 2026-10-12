import React from 'react';
import { siteUrl } from '@/lib/site';

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

function JsonLdScript({ data }: { data: object }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

export function JsonLd() {
    const schema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Person',
                '@id': personId,
                name: 'Jose Carlos González',
                jobTitle: 'Full Stack Developer',
                url: siteUrl,
                image: `${siteUrl}/opengraph-image`,
                sameAs: [
                    'https://github.com/JCGJ94',
                    'https://www.linkedin.com/in/josecgonz%C3%A1lez',
                ],
                description: 'Full Stack Developer con foco en Backend Python e IA aplicada. Construyo APIs, servicios backend y productos web que integran LLMs y automatización.',
                knowsAbout: [
                    'Full Stack Development',
                    'Backend Development',
                    'Python',
                    'FastAPI',
                    'REST APIs',
                    'LLMs',
                    'AI Integration',
                    'React',
                    'Next.js',
                    'TypeScript',
                    'Node.js'
                ],
            },
            {
                '@type': 'WebSite',
                '@id': websiteId,
                url: siteUrl,
                name: 'Jose Carlos González Portfolio',
                inLanguage: 'es',
                publisher: { '@id': personId },
                about: { '@id': personId },
            },
        ],
    };

    return <JsonLdScript data={schema} />;
}

export function ProfilePageJsonLd() {
    return (
        <JsonLdScript
            data={{
                '@context': 'https://schema.org',
                '@type': 'ProfilePage',
                '@id': `${siteUrl}/cv#profilepage`,
                url: `${siteUrl}/cv`,
                name: 'C.V. Digital',
                inLanguage: 'es',
                isPartOf: { '@id': websiteId },
                mainEntity: { '@id': personId },
            }}
        />
    );
}
