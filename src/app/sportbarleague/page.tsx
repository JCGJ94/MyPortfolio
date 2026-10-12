import { pageMetadata } from '@/lib/seo';
import { SportBarLeagueContent } from './SportBarLeagueContent';

export const metadata = pageMetadata({
  path: '/sportbarleague',
  title: 'SportBarLeague',
  description: 'Plataforma full-stack de ligas y eventos deportivos en bares con React, Flask, PostgreSQL y autenticación JWT.',
});

export default function SportBarLeaguePage() {
  return <SportBarLeagueContent />;
}
