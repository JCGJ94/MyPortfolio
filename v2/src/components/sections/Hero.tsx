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
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32 flex flex-col justify-center min-h-[100dvh]" id="hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-8">

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left animate-slide-up">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              {t.hero.badge}
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-balance">
              <span className="block text-3xl md:text-4xl text-muted-foreground font-medium mb-2">{t.hero.title}</span>
              {t.hero.name}
            </h1>
            <div className="text-2xl md:text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 h-[1.5em] flex items-center justify-center lg:justify-start">
              <Typewriter words={t.hero.roles} className="inline-block" />
            </div>

            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 text-balance animate-fade-in" style={{ animationDelay: '200ms' }}>
              {t.hero.description}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '300ms' }}>
              <MagneticPillButton
                href="/nutriflow"
                label={t.hero.caseStudy}
                variant="primary"
                className="py-3 px-8 text-base shadow-xl min-w-[200px]"
              />
              <MagneticPillButton
                href="/#projects"
                label={t.hero.viewProjects}
                variant="primary"
                className="py-3 px-8 text-base shadow-xl min-w-[200px]"
              />
            </div>
          </div>

          {/* Avatar Image */}
          <div className="flex-1 w-full max-w-lg mx-auto lg:max-w-none animate-fade-in relative z-20" style={{ animationDelay: '400ms' }}>
            <div className="relative w-full aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-blue-500/30 rounded-full blur-3xl scale-90 animate-pulse"></div>

              <Image
                src="/heroAvatarCombined.svg"
                alt="Jose Carlos Avatar"
                width={500}
                height={500}
                priority
                className="relative z-10 object-contain drop-shadow-2xl hover:-translate-y-4 transition-transform duration-700 ease-out will-change-transform"
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
          <Image src="/tech-abstract.png" alt="" fill className="object-contain" />
        </div>
        <div className="absolute bottom-[5%] left-[5%] w-[35%] h-[35%] opacity-15 filter blur-2xl animate-float-slow">
          <Image src="/tech-abstract.png" alt="" fill className="object-contain -rotate-12" />
        </div>
      </div>
    </section>
  );
}
