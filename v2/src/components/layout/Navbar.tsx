'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useLanguage();

  const navItems = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.projects, href: '/#projects' },
    { name: t.nav.about, href: '/#about' },
    { name: t.nav.nutriflow, href: '/nutriflow' },
    { name: t.nav.cv, href: '/cv' },
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-500',
        scrolled || isOpen
          ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex-shrink-0 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/" className="flex items-center gap-1.5 text-xl font-bold tracking-widest group" aria-label="Página de inicio">
              <motion.div
                className="bg-primary text-white rounded-xl px-4 py-2 flex items-center justify-center font-black tracking-normal leading-none relative overflow-hidden shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{
                  scale: 1,
                  rotate: 0,
                  opacity: 1,
                  y: [0, -10, 0]
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                  boxShadow: "0 0 30px rgba(var(--primary-rgb), 0.6)",
                  transition: { duration: 0.3 }
                }}
                transition={{
                  scale: { type: "spring", stiffness: 260, damping: 20 },
                  rotate: { duration: 0.8, ease: "easeOut" },
                  y: { delay: 0.5, duration: 0.4, ease: "easeOut" }
                }}
              >
                <span className="relative z-10">JC</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-primary via-primary/80 to-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </motion.div>
              <motion.span
                className="text-foreground tracking-[0.2em] ml-1 mt-0.5 group-hover:text-primary transition-colors duration-300 font-extrabold"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                .dev
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Navegación principal">
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
              >
                <Link
                  href={item.href}
                  className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80 transition-all hover:text-foreground relative group py-2"
                >
                  <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1 inline-block">
                    {item.name}
                  </span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-[3px] bg-primary rounded-full transition-all duration-300 group-hover:w-full"
                    layoutId="navbar-underline"
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4">
            <ThemeToggle />

            <Link
              href="/dashboard"
              className="hidden md:inline-flex h-10 items-center justify-center rounded-full border-2 border-primary text-primary px-6 py-2 text-xs font-bold uppercase tracking-widest shadow-lg transition-all hover:bg-primary hover:text-primary-foreground"
            >
              {t.nav.cta}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex md:hidden items-center justify-center p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
              aria-label="Abrir menú"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-8 flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-black uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors py-2 border-b border-border/10"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground px-6 py-2 text-sm font-bold uppercase tracking-widest shadow-lg"
              >
                {t.nav.cta}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
