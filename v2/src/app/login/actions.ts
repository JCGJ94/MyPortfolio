'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

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
        return { error: 'Email y contraseña son obligatorios.' };
    }

    try {
        const supabase = await createClient();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            // Map common Supabase errors to Spanish
            const errorMap: Record<string, string> = {
                'Invalid login credentials': 'Credenciales incorrectas. Verifica tu email y contraseña.',
                'Email not confirmed': 'Tu email aún no ha sido verificado. Revisa tu bandeja de entrada.',
                'Too many requests': 'Demasiados intentos. Espera un momento antes de volver a intentar.',
            };
            return { error: errorMap[error.message] || error.message };
        }
    } catch (err) {
        console.error('[LOGIN_ACTION]', err);
        return { error: 'No se pudo conectar con el servidor de autenticación. Verifica que el servicio de Supabase está activo.' };
    }

    redirect('/dashboard');
}
