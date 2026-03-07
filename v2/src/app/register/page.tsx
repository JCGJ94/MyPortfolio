'use client';

import { useActionState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, AlertCircle, CheckCircle2, UserPlus } from 'lucide-react';
import { registerAction } from './actions';
import type { AuthState } from '@/app/login/actions';

const initialState: AuthState = {};

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-emerald-500/[0.02] blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <motion.div
            className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <UserPlus className="h-7 w-7 text-emerald-500" />
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Crear Cuenta
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Únete al entorno técnico de gestión
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl shadow-xl shadow-black/[0.03] p-8">
          {/* Error message */}
          {state.error && (
            <motion.div
              className="mb-6 flex items-center gap-3 rounded-xl bg-destructive/5 border border-destructive/15 p-4 text-sm text-destructive"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              {state.error}
            </motion.div>
          )}

          {/* Success message */}
          {state.success && (
            <motion.div
              className="mb-6 flex items-center gap-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15 p-4 text-sm text-emerald-600 dark:text-emerald-400"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              {state.success}
            </motion.div>
          )}

          <form action={formAction} className="space-y-5">
            {/* Email Field */}
            <div className="group relative">
              <label
                htmlFor="register-email"
                className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 transition-colors group-focus-within:text-emerald-500" />
                <input
                  ref={emailRef}
                  id="register-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="tu@email.com"
                  className="block w-full rounded-xl border border-border/60 bg-muted/30 py-3.5 pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 focus:border-emerald-500/40 focus:bg-muted/50 focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group relative">
              <label
                htmlFor="register-password"
                className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground"
              >
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 transition-colors group-focus-within:text-emerald-500" />
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  placeholder="Mínimo 6 caracteres"
                  className="block w-full rounded-xl border border-border/60 bg-muted/30 py-3.5 pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 focus:border-emerald-500/40 focus:bg-muted/50 focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground/60">
                Mínimo 6 caracteres
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:opacity-60 disabled:pointer-events-none"
            >
              {isPending ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  Crear Cuenta
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-border/60" />
            <span className="text-xs text-muted-foreground">o</span>
            <div className="h-px flex-1 bg-border/60" />
          </div>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{' '}
            <Link
              href="/login"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Inicia sesión
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-muted-foreground/60">
          Protegido por Supabase Auth · JWT + SSR
        </p>
      </motion.div>
    </div>
  );
}
