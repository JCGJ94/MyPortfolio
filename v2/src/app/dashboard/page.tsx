import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import {
  Database, Shield, Activity, LogOut, Settings, User,
  Clock, Cpu, Globe, GitBranch, Zap, BarChart3, Code2
} from 'lucide-react';
import Link from 'next/link';
import { Certifications } from '@/components/dashboard/Certifications';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  const createdAt = user.created_at
    ? new Date(user.created_at).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    : 'N/A';

  const lastSignIn = user.last_sign_in_at
    ? new Date(user.last_sign_in_at).toLocaleString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
    : 'N/A';

  const emailConfirmed = !!user.email_confirmed_at;

  const techStack = [
    { name: 'Next.js 16', icon: Globe, color: 'text-foreground' },
    { name: 'React 19', icon: Code2, color: 'text-blue-500' },
    { name: 'TypeScript 5', icon: Cpu, color: 'text-blue-600' },
    { name: 'Supabase', icon: Database, color: 'text-emerald-500' },
    { name: 'Framer Motion', icon: Zap, color: 'text-purple-500' },
    { name: 'Tailwind 4', icon: BarChart3, color: 'text-cyan-500' },
  ];

  return (
    <div className="min-h-screen bg-secondary/10 pt-24 pb-20">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Panel Técnico</h1>
            <p className="text-muted-foreground italic">Entorno de gestión y monitoreo de arquitectura.</p>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center justify-center rounded-xl bg-background border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted transition-all">
              <Settings className="mr-2 h-4 w-4" />
              Configuración
            </button>
            <form action="/api/auth/signout" method="post">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-destructive/10 text-destructive border border-destructive/20 px-4 py-2.5 text-sm font-medium hover:bg-destructive/20 transition-all"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </button>
            </form>
          </div>
        </header>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Auth Status */}
          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-500 px-2.5 py-1 rounded-lg">
                {emailConfirmed ? 'Verificado' : 'Pendiente'}
              </span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Sesión Activa</h3>
            <p className="text-lg font-bold truncate">{user.email}</p>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              Último acceso: {lastSignIn}
            </p>
          </div>

          {/* User Profile */}
          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <User className="h-6 w-6 text-blue-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-500/10 text-blue-500 px-2.5 py-1 rounded-lg">Perfil</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Cuenta creada</h3>
            <p className="text-lg font-bold">{createdAt}</p>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
              <Shield className="h-3 w-3" />
              Provider: {user.app_metadata?.provider || 'email'}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <GitBranch className="h-6 w-6 text-orange-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest bg-orange-500/10 text-orange-500 px-2.5 py-1 rounded-lg">Stack</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Tecnologías</h3>
            <p className="text-lg font-bold">6 Core</p>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
              <Activity className="h-3 w-3" />
              Producción activa
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tech Stack Grid */}
          <div className="bg-card border border-border rounded-2xl">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="font-bold flex items-center gap-2">
                <Code2 className="h-4 w-4 text-primary" />
                Stack Tecnológico
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-3">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/40 hover:bg-muted/60 transition-colors"
                  >
                    <tech.icon className={`h-5 w-5 ${tech.color}`} />
                    <span className="text-sm font-medium">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Logs */}
          <div className="bg-card border border-border rounded-2xl">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="font-bold flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-500" />
                Logs de Actividad
              </h2>
              <span className="text-xs text-muted-foreground">Últimas acciones</span>
            </div>
            <div className="p-6 space-y-4">
              {[
                { event: 'Supabase Auth Handshake', status: 'SUCCESS', time: 'ahora' },
                { event: `JWT Verified: ${user.email?.slice(0, 12)}...`, status: 'VALID', time: 'hace 1s' },
                { event: 'Server Component Render', status: '200 OK', time: 'hace 2s' },
                { event: 'Middleware Session Refresh', status: 'ACTIVE', time: 'hace 3s' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-border/50 last:border-0 font-mono">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-muted-foreground text-xs">[{log.time}]</span>
                    <span className="text-xs sm:text-sm">{log.event}</span>
                  </div>
                  <span className="text-emerald-500 font-bold text-xs px-2 py-0.5 bg-emerald-500/5 rounded-lg border border-emerald-500/20 shrink-0 ml-2">
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="mt-8 bg-card border border-border rounded-2xl">
          <div className="p-6 border-b border-border">
            <h2 className="font-bold flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              Roadmap de Implementación
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Auth Layer (JWT + SSR)', progress: 100, color: 'bg-emerald-500' },
                { title: 'PostgreSQL Real-time Sync', progress: 85, color: 'bg-blue-500' },
                { title: 'IA Agents Orchestrator', progress: 40, color: 'bg-purple-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-3 p-4 rounded-xl bg-muted/20 border border-border/40">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-muted-foreground">{item.title}</span>
                    <span className="font-bold">{item.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all duration-1000`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <p className="text-xs text-blue-500 flex items-center mb-2 font-bold uppercase tracking-wider">
                <Activity className="h-3 w-3 mr-2" />
                Nota técnica
              </p>
              <p className="text-sm text-balance">
                Este panel es una demostración técnica de la integración de Supabase en un entorno Next.js 16 con Server Components. Los datos del usuario son reales y provienen de la sesión JWT autenticada.
              </p>
            </div>
          </div>
        </div>

        {/* Certificaciones */}
        <div className="mt-12">
          <Certifications />
        </div>
      </main>
    </div>
  );
}
