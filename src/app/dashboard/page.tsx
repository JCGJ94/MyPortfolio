import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { DashboardContent } from './DashboardContent';

export const metadata = { title: 'Dashboard', robots: { index: false, follow: false } };

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  return (
    <DashboardContent
      user={{
        email: user.email,
        createdAt: user.created_at,
        lastSignInAt: user.last_sign_in_at,
        emailConfirmed: !!user.email_confirmed_at,
        provider: user.app_metadata?.provider,
      }}
    />
  );
}
