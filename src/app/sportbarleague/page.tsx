import { SportBarLeagueContent } from './SportBarLeagueContent';

export const metadata = {
  title: 'SportBarLeague',
  description: 'Plataforma full-stack de ligas y eventos deportivos en bares con React, Flask, PostgreSQL y autenticación JWT.',
  alternates: { canonical: '/sportbarleague' },
  openGraph: { url: '/sportbarleague', images: ['/opengraph-image'] },
};

export default function SportBarLeaguePage() {
  return <SportBarLeagueContent />;
}
