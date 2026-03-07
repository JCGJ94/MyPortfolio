'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ArrowUpRight, Github } from 'lucide-react';
import { type Project } from '@/data/projects';
import { cn } from '@/lib/utils';

interface ProjectHoverPreviewProps {
  activeProject: Project | null;
  isVisible: boolean;
  position: { x: number; y: number };
}

export function ProjectHoverPreview({
  activeProject,
  isVisible,
  position,
}: ProjectHoverPreviewProps) {
  const [mounted, setMounted] = React.useState(false);
  const previewRef = React.useRef<HTMLDivElement>(null);
  const currentPos = React.useRef({ x: 0, y: 0 });
  const targetPos = React.useRef({ x: 0, y: 0 });
  const rafId = React.useRef<number>(0);

  // Initialize portal
  React.useEffect(() => {
    setMounted(true);
    let root = document.getElementById('hover-preview-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'hover-preview-root';
      document.body.appendChild(root);
    }
  }, []);

  // Sync positions
  React.useEffect(() => {
    targetPos.current = position;
  }, [position]);

  // Handle animation loop
  React.useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Provide immediate snap if reduced motion
    if (isReducedMotion && previewRef.current) {
      previewRef.current.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
      return;
    }

    const loop = () => {
      const { x: curX, y: curY } = currentPos.current;
      const { x: tarX, y: tarY } = targetPos.current;

      // Easing function (lerp)
      currentPos.current.x += (tarX - curX) * 0.15;
      currentPos.current.y += (tarY - curY) * 0.15;

      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    if (isVisible) {
      if (Math.abs(currentPos.current.x) < 1 && Math.abs(currentPos.current.y) < 1) {
        // initial snap to avoid flying from 0,0
        currentPos.current.x = targetPos.current.x;
        currentPos.current.y = targetPos.current.y;
      }
      rafId.current = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(rafId.current);
    };
  }, [isVisible, position]);

  if (!mounted) return null;

  const root = document.getElementById('hover-preview-root');
  if (!root) return null;

  return createPortal(
    <div
      ref={previewRef}
      className={cn(
        'fixed top-0 left-0 z-50 pointer-events-none hidden lg:block overflow-hidden rounded-xl border border-border/50 bg-background/80 backdrop-blur-md shadow-xl transition-opacity duration-300 w-[340px]',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      style={{ willChange: 'transform' }}
    >
      {activeProject && (
        <div className="flex flex-col">
          <div className="relative h-[200px] w-full bg-muted/20 overflow-hidden">
            <Image
              src={activeProject.image || '/images/placeholder.webp'}
              alt={activeProject.title}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="340px"
              priority
            />
          </div>
          <div className="p-4 space-y-3">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                {activeProject.title}
                {activeProject.badgeEmoji && <span className="text-sm" title={activeProject.badge}>{activeProject.badgeEmoji}</span>}
              </h3>
              <p className="text-xs font-medium text-primary mt-0.5">{activeProject.subtitle}</p>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-3 leading-relaxed">{activeProject.description}</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {activeProject.tags.slice(0, 4).map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-semibold text-primary/80">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-1">
              {activeProject.demoUrl && (
                <a href={activeProject.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-[11px] font-bold text-primary pointer-events-auto hover:text-primary/80" aria-label={`Ver demostración del proyecto ${activeProject.title}`}>
                  DEMO <ArrowUpRight className="ml-0.5 h-3 w-3" aria-hidden="true" />
                </a>
              )}
              {activeProject.repoUrl && (
                <a href={activeProject.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-[11px] font-bold text-muted-foreground pointer-events-auto hover:text-foreground" aria-label={`Ver repositorio del proyecto ${activeProject.title}`}>
                  REPO <Github className="ml-0.5 h-3 w-3" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>,
    root
  );
}
