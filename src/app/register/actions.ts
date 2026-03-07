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
        return { error: 'Email y contraseña son obligatorios.' };
    }

    if (password.length < 6) {
        return { error: 'La contraseña debe tener al menos 6 caracteres.' };
    }

    try {
        const supabase = await createClient();

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            const errorMap: Record<string, string> = {
                'User already registered': 'Este email ya tiene una cuenta registrada.',
                'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres.',
                'Too many requests': 'Demasiados intentos. Espera un momento.',
                'Signup requires a valid password': 'Proporciona una contraseña válida.',
            };
            return { error: errorMap[error.message] || error.message };
        }
    } catch (err) {
        console.error('[REGISTER_ACTION]', err);
        return { error: 'No se pudo conectar con el servidor de autenticación. Verifica que el servicio de Supabase está activo.' };
    }

    return { success: '¡Cuenta creada! Revisa tu email para confirmar tu cuenta.' };
}
