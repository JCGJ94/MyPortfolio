'use server';

import { createClient } from '@/lib/supabase/server';
import type { AuthState } from '@/app/login/actions';

export async function registerAction(
    _prevState: AuthState,
    formData: FormData
): Promise<AuthState> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { error: 'required' };
    }

    if (password.length < 6) {
        return { error: 'password_short' };
    }

    try {
        const supabase = await createClient();

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            const errorMap: Record<string, string> = {
                'User already registered': 'user_exists',
                'Password should be at least 6 characters': 'password_short',
                'Too many requests': 'register_too_many_requests',
                'Signup requires a valid password': 'invalid_password',
            };
            return { error: errorMap[error.message] || error.message };
        }
    } catch (err) {
        console.error('[REGISTER_ACTION]', err);
        return { error: 'unreachable' };
    }

    return { success: 'account_created' };
}
