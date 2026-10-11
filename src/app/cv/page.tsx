import { CvContent } from './CvContent';

export const metadata = {
    title: 'C.V. Digital',
    description: 'Currículum de Jose Carlos González, desarrollador Full Stack con base en JavaScript y Python, con formación, experiencia y descarga del PDF.',
    alternates: { canonical: '/cv' },
    openGraph: { url: '/cv', images: ['/opengraph-image'] },
};

export default function CVPage() {
    return <CvContent />;
}
