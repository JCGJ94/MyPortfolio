'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Typewriter } from '@/components/ui/Typewriter';
import { MagneticPillButton } from '@/components/ui/MagneticPillButton';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32 flex flex-col justify-center min-h-[100dvh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" id="hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left animate-slide-up">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-8 animate-fade-in shadow-sm" style={{ animationDelay: '100ms' }}>
              <span className="flex h-2 w-2 rounded-full bg-primary mr-3 shadow-[0_0_8px_var(--color-primary)]"></span>
              {t.hero.badge}
            </div>

            <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-4 text-balance leading-[0.9]">
              <span className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">{t.hero.name}</span>
            </h1>

            <div className="text-2xl md:text-4xl font-bold mb-6 text-primary h-[1.2em] flex items-center justify-center lg:justify-start">
              <Typewriter words={t.hero.roles} className="inline-block" />
            </div>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto lg:mx-0 text-balance animate-fade-in leading-relaxed" style={{ animationDelay: '200ms' }}>
              {t.hero.description}
            </p>

            <p className="mt-8 text-sm md:text-base font-semibold text-muted-foreground/90 tracking-[0.2em] px-2 py-1 mx-auto lg:mx-0 animate-fade-in text-balance" style={{ animationDelay: '250ms' }}>
              {t.hero.techFocus}
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '300ms' }}>
              <MagneticPillButton
                href="/nutriflow"
                label={t.hero.caseStudy}
                variant="primary"
                className="py-3 px-8 text-sm shadow-2xl shadow-primary/20 min-w-[180px]"
              />
              <MagneticPillButton
                href="/#projects"
                label={t.hero.viewProjects}
                variant="ghost"
                className="py-3 px-8 text-sm min-w-[180px] bg-white/5 border-white/10"
              />
            </div>
          </div>

          {/* Avatar Image */}
          <div className="flex-1 w-full max-w-lg mx-auto lg:max-w-none animate-fade-in relative z-20 @container" style={{ animationDelay: '400ms' }}>
            <div className="relative w-full aspect-square flex items-center justify-center perspective-(--perspective-deep)">
              {/* Complex Bloom Effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[120px] scale-75 animate-pulse"></div>
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[80px] -translate-x-10 translate-y-10"></div>

              <Image
                src="/heroAvatar.png"
                alt="Jose Carlos Avatar"
                width={550}
                height={550}
                priority
                style={{ width: '100%', height: 'auto' }}
                className="relative z-10 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform-3d transition-all duration-1000 ease-out hover:rotate-y-12 hover:rotate-x-6 hover:-translate-y-6 will-change-transform cursor-pointer"
              />
            </div>
          </div>

        </div>
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-[20%] left-[10%] animate-bounce opacity-25 text-blue-500" style={{ animationDuration: '4s' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></svg>
        </div>
        <div className="absolute top-[10%] right-[5%] w-[40%] h-[40%] opacity-20 filter blur-3xl animate-float">
          <Image src="/tech-abstract.png" alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain" />
        </div>
        <div className="absolute bottom-[5%] left-[5%] w-[35%] h-[35%] opacity-15 filter blur-2xl animate-float-slow">
          <Image src="/tech-abstract.png" alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain -rotate-12" />
        </div>
      </div>
    </section>
  );
}
