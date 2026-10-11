import React from 'react';
import { siteUrl } from '@/lib/site';

export function JsonLd() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Jose Carlos González',
        jobTitle: 'Full Stack Developer',
        url: siteUrl,
        sameAs: [
            'https://github.com/JCGJ94',
            'https://www.linkedin.com/in/josecgonzález',
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
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
