'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const focusIcons: Record<number, string> = {
  0: 'M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18', // lightbulb - Python Backend
  1: 'M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5', // arrows exchange - APIs
  2: 'M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z', // sparkles - IA
  3: 'M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085', // wrench - Automatización
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.6 + i * 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function About() {
  const { t } = useLanguage();

  // Type-safe access to the new fields
  const about = t.about as typeof t.about & {
    subtitle?: string;
    focusTitle?: string;
    focusAreas?: string[];
  };

  return (
    <section
      id="about"
      className="py-16 lg:py-24 relative flex flex-col justify-center min-h-[100dvh] overflow-hidden"
    >
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-float-slow" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* ── Header ── */}
          <motion.div className="mb-14" variants={itemVariants}>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-balance">
              <span>{about.title} </span>
              <span className="text-primary">{about.titleSpan}</span>
            </h2>
            {about.subtitle && (
              <p className="mt-4 text-lg md:text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
                {about.subtitle}
              </p>
            )}
          </motion.div>

          {/* ── Body paragraphs ── */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-muted-foreground mb-16"
            variants={itemVariants}
          >
            <div className="space-y-5">
              <p className="text-base md:text-lg leading-relaxed text-balance">
                {about.p1}
              </p>
              <p className="text-base md:text-lg leading-relaxed text-balance">
                {about.p2}
              </p>
            </div>
            <div className="space-y-5">
              <p className="text-base md:text-lg leading-relaxed text-balance">
                {about.p3}
              </p>
              <p className="text-base md:text-lg leading-relaxed text-balance font-medium text-foreground/80">
                {about.p4}
              </p>
            </div>
          </motion.div>

          {/* ── Focus Areas (Pills) ── */}
          {about.focusAreas && about.focusAreas.length > 0 && (
            <motion.div
              className="mb-16"
              variants={itemVariants}
            >
              <div className="relative rounded-3xl border border-border/60 bg-card/40 backdrop-blur-xl p-8 md:p-10 overflow-hidden">
                {/* Subtle gradient shimmer */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-primary/[0.02] pointer-events-none"
                  aria-hidden="true"
                />

                <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-6 relative">
                  {about.focusTitle}
                </h3>

                <div className="flex flex-wrap gap-3 relative">
                  {about.focusAreas.map((area, i) => (
                    <motion.span
                      key={area}
                      className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium
                        bg-gradient-to-r from-primary/10 to-primary/5
                        border border-primary/20
                        text-foreground
                        hover:from-primary/20 hover:to-primary/10
                        hover:border-primary/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]
                        transition-all duration-300 ease-out cursor-default"
                      custom={i}
                      variants={pillVariants}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform duration-300"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d={focusIcons[i] ?? focusIcons[0]} />
                      </svg>
                      {area}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Stats bar ── */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-border/50"
            variants={itemVariants}
          >
            {[
              { value: 'Full Stack', label: about.stats.profile },
              { value: 'PostgreSQL', label: about.stats.modeling },
              { value: 'Cloud / 24/7', label: about.stats.production },
              { value: 'IA Tooling', label: about.stats.workflow },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <p className="text-2xl md:text-3xl font-bold text-primary group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-300">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1.5">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
