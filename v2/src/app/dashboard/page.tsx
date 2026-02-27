import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Database, Shield, Activity, LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { Certifications } from '@/components/dashboard/Certifications';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-secondary/10 pt-24 pb-20">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Panel Técnico</h1>
            <p className="text-muted-foreground italic">Entorno de gestión y monitoreo de arquitectura.</p>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center justify-center rounded-md bg-background border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-all">
              <Settings className="mr-2 h-4 w-4" />
              Configuración
            </button>
            <form action="/api/auth/signout" method="post">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-destructive/10 text-destructive border border-destructive/20 px-4 py-2 text-sm font-medium hover:bg-destructive/20 transition-all"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </button>
            </form>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card: Auth Status */}
          <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded">Activo</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Estado de Sesión</h3>
            <p className="text-xl font-bold truncate">{user.email}</p>
          </div>

          {/* Card: Database Status */}
          <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Database className="h-6 w-6 text-blue-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded">Conectado</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Supabase PostgreSQL</h3>
            <p className="text-xl font-bold">Latency: 12ms</p>
          </div>

          {/* Card: Technical Activity */}
          <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Activity className="h-6 w-6 text-orange-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest bg-orange-500/10 text-orange-500 px-2 py-1 rounded">Live</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Eventos del Sistema</h3>
            <p className="text-xl font-bold">3 peticiones / seg</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Logs Section */}
          <div className="bg-card border border-border rounded-xl">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="font-bold">Logs de Actividad Técnica</h2>
              <button className="text-xs text-primary hover:underline">Ver todos</button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { event: 'Supabase Auth Handshake', status: 'SUCCESS', time: 'hace 2 min' },
                { event: 'GET /api/projects', status: '200 OK', time: 'hace 5 min' },
                { event: 'Database Health Check', status: 'HEALTHY', time: 'hace 12 min' },
                { event: 'Middleware JWT Verification', status: 'VALID', time: 'hace 15 min' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-border/50 last:border-0 font-mono">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-muted-foreground">[{log.time}]</span>
                    <span>{log.event}</span>
                  </div>
                  <span className="text-emerald-500 font-bold px-2 py-0.5 bg-emerald-500/5 rounded border border-emerald-500/20">{log.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Roadmap */}
          <div className="bg-card border border-border rounded-xl">
            <div className="p-6 border-b border-border">
              <h2 className="font-bold">Roadmap de Implementación</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {[
                  { title: 'Auth Layer (JWT + SSR)', progress: 100 },
                  { title: 'PostgreSQL Real-time Sync', progress: 85 },
                  { title: 'IA Agents Orchestrator', progress: 40 },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-muted-foreground">{item.title}</span>
                      <span className="font-bold">{item.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-1000"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                <p className="text-xs text-blue-500 flex items-center mb-2 font-bold uppercase tracking-wider">
                  <Activity className="h-3 w-3 mr-2" />
                  Nota técnica
                </p>
                <p className="text-sm text-balance">
                  Este panel es una demostración técnica de la integración de Supabase en un entorno Next.js con Server Components. Los datos visualizados demuestran el control sobre el flujo de autenticación y la persistencia de datos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Certificaciones Section */}
        <div className="mt-12">
          <Certifications />
        </div>
      </main>
    </div>
  );
}
