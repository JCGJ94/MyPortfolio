'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

// `error` and `success` carry stable message codes (see t.auth.failures / t.auth.success); the client translates them.
// An unmapped Supabase message is passed through as is.
export type AuthState = {
    error?: string;
    success?: string;
};

export async function loginAction(
    _prevState: AuthState,
    formData: FormData
): Promise<AuthState> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { error: 'required' };
    }

    try {
        const supabase = await createClient();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            // Map common Supabase errors to message codes
            const errorMap: Record<string, string> = {
                'Invalid login credentials': 'invalid_credentials',
                'Email not confirmed': 'email_not_confirmed',
                'Too many requests': 'too_many_requests',
            };
            return { error: errorMap[error.message] || error.message };
        }
    } catch (err) {
        console.error('[LOGIN_ACTION]', err);
        return { error: 'unreachable' };
    }

    redirect('/dashboard');
}
