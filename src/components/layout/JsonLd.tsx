import React from 'react';

export function JsonLd() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Jose Carlos',
        jobTitle: 'Full Stack Developer',
        url: 'https://mi-cv.vercel.app',
        sameAs: [
            'https://github.com/jcgj94',
            'https://linkedin.com/in/jcgj94', // Asumiendo estos slugs
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
