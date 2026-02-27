'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-10 lg:py-16 bg-secondary/30 relative flex flex-col justify-center min-h-[100dvh] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center mb-8">
            <motion.h2
              className="text-3xl md:text-5xl font-black tracking-tighter text-balance overflow-hidden"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.span
                className="block"
                variants={{
                  initial: { x: -100, opacity: 0 },
                  animate: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
                }}
              >
                {t.about.title}
              </motion.span>
              <motion.span
                className="block text-primary"
                variants={{
                  initial: { x: 100, opacity: 0 },
                  animate: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
                }}
              >
                {t.about.titleSpan}
              </motion.span>
            </motion.h2>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="space-y-4 text-balance">
              <p className="text-base md:text-lg leading-relaxed">
                Mi trabajo se centra en <span className="text-foreground font-bold">construir sistemas</span> donde la <span className="text-foreground font-bold">lógica de negocio</span> y la <span className="text-foreground font-bold">experiencia de usuario</span> se unen para resolver necesidades reales.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Con una base técnica que evoluciona desde mi formación inicial en <span className="text-foreground font-bold">Informática (2009)</span> hasta mi reciente especialización como <span className="text-foreground font-bold">Full Stack Developer</span>, entrego soluciones funcionales integrando <span className="text-foreground font-bold">Frontend y Backend</span>.
              </p>
            </div>
            <div className="space-y-4 text-balance">
              <p className="text-base md:text-lg leading-relaxed">
                He trabajado en el desarrollo de <span className="text-foreground font-bold">APIs REST robustas</span> y la <span className="text-foreground font-bold">digitalización de negocios</span>, priorizando siempre la simplicidad y el código mantenible.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Actualmente creciendo con <span className="text-foreground font-bold">Next.js y TypeScript</span>, utilizando la <span className="text-foreground font-bold">Inteligencia Artificial</span> como un apoyo estratégico para mejorar la calidad y velocidad de mis entregas.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border/50">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">Full Stack</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">{t.about.stats.profile}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">PostgreSQL</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">{t.about.stats.modeling}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">Cloud / 24/7</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">{t.about.stats.production}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">IA Tooling</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">{t.about.stats.workflow}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
