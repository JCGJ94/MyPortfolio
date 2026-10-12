import { ProfilePageJsonLd } from '@/components/layout/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { CvContent } from './CvContent';

export const metadata = pageMetadata({
  path: '/cv',
  title: 'C.V. Digital',
  description: 'Currículum de Jose Carlos González, desarrollador Full Stack con base en JavaScript y Python, con formación, experiencia y descarga del PDF.',
});

export default function CVPage() {
    return (
        <>
            <ProfilePageJsonLd />
            <CvContent />
        </>
    );
}
