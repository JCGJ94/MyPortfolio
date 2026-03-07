import React from 'react';

export function JsonLd() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Jose Carlos',
        jobTitle: 'Senior Software Engineer',
        url: 'https://mi-cv.vercel.app',
        sameAs: [
            'https://github.com/jcgj94',
            'https://linkedin.com/in/jcgj94', // Asumiendo estos slugs
        ],
        description: 'Senior Software Engineer enfocado en desarrollar productos interactivos de alto rendimiento, escalables y con un UX premium.',
        knowsAbout: [
            'Software Engineering',
            'Web Development',
            'React',
            'Next.js',
            'TypeScript',
            'Supabase',
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
