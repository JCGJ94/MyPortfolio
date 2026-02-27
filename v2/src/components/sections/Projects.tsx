'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects, type Project } from '@/data/projects';
import { ProjectHoverPreview } from '@/components/ui/ProjectHoverPreview';
import { useLanguage } from '@/context/LanguageContext';
import { MagneticPillButton } from '@/components/ui/MagneticPillButton';

export function Projects() {
  const { t } = useLanguage();
  const [activeProject, setActiveProject] = React.useState<Project | null>(null);
  const [isHovering, setIsHovering] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handlePointerEnter = (project: Project) => {
    setActiveProject(project);
    setIsHovering(true);
  };

  const handlePointerLeave = () => {
    setIsHovering(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    setPosition({ x: e.clientX + 24, y: e.clientY + 24 });
  };

  return (
    <section id="projects" className="py-6 lg:py-12 relative overflow-hidden flex flex-col justify-center min-h-[100dvh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-12 text-center">
          <motion.h2
            className="text-3xl md:text-5xl font-black tracking-tighter mb-4 relative inline-block overflow-hidden text-balance"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            {t.projects.title} <span className="text-primary">{t.projects.titleSpan}</span>
            <motion.span
              className="absolute bottom-0 left-0 w-full h-1 bg-primary/20 -z-10"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.h2>
          <motion.p
            className="text-base text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {t.projects.description}
          </motion.p>
        </div>

        <div className="flex flex-col border-t border-border" onPointerLeave={handlePointerLeave}>
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className="group relative flex flex-col md:flex-row md:items-center justify-between py-3 md:py-5 border-b border-border transition-all duration-500 hover:px-4"
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              onPointerEnter={() => handlePointerEnter(project)}
              onPointerMove={handlePointerMove}
            >
              <div className="max-w-xl transition-transform duration-500 group-hover:translate-x-2">
                {project.badge && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-black mb-2 uppercase tracking-widest
                    ${project.tier === 'flagship' ? 'bg-primary/10 text-primary border-primary/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]' :
                        project.clientProject ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                          project.teamProject ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                            'bg-secondary/50 text-muted-foreground border-border'}
                  `}>
                    <span className="mr-1">{project.badgeEmoji}</span> {project.badge}
                  </motion.div>
                )}

                <h3 className={`font-black tracking-tighter mb-1 group-hover:text-primary transition-all duration-300 ${project.tier === 'secondary' ? 'text-lg md:text-xl' : 'text-xl md:text-3xl'}`}>
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-xs md:text-sm mb-2 line-clamp-1 opacity-100 transition-all duration-500 font-medium">
                  {project.subtitle}
                </p>

                <div className="flex flex-wrap gap-2 md:mt-1">
                  {project.tags.slice(0, 5).map(tag => (
                    <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50 transition-colors group-hover:text-primary/70 border border-transparent group-hover:border-primary/10 px-1.5 py-0.5 rounded cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex shrink-0 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300">
                <MagneticPillButton
                  href={`/${project.id}`}
                  label={t.projects.viewProject}
                  variant="primary"
                  className="px-5 py-2.5 text-[10px] uppercase tracking-widest font-black"
                />
              </div>

              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </motion.div>
          ))}
        </div>

        {/* Hover Preview Overlay */}
        <ProjectHoverPreview
          activeProject={activeProject}
          isVisible={isHovering}
          position={position}
        />
      </div>

      {/* Side background decoration */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -z-10" />
    </section>
  );
}
