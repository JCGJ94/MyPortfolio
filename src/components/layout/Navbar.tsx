'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { NavTrace } from './NavTrace';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const menuToggleRef = React.useRef<HTMLButtonElement>(null);
  const { t } = useLanguage();

  const navItems = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.projects, href: '/#projects' },
    { name: t.nav.about, href: '/#about' },
    { name: t.nav.stack, href: '/#stack' },
    { name: t.nav.cv, href: '/cv' },
  ];

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      menuToggleRef.current?.focus();
      setIsOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  const mobileNavigationId = 'portfolio-mobile-navigation';

  return (
    <>
    <div className="portfolio-nav-veil" aria-hidden="true" />
    <header className={cn('portfolio-nav', scrolled && 'is-scrolled', isOpen && 'is-open')}>
      <NavTrace />
      <div className="portfolio-nav__inner">
        <Link href="/" className="portfolio-nav__brand" aria-label="JC.dev, página de inicio">
          <span className="portfolio-nav__mark">JC</span>
          <span className="portfolio-nav__domain">.dev</span>
        </Link>

        <nav className="portfolio-nav__links" aria-label="Navegación principal">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="portfolio-nav__link">
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="portfolio-nav__tools">
          <Link href="/dashboard" className="portfolio-nav__technical-link">
            {t.nav.cta}
          </Link>
          <button
            ref={menuToggleRef}
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="portfolio-nav__toggle"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
            aria-controls={mobileNavigationId}
          >
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
          <ThemeToggle />
        </div>
      </div>

      {isOpen && (
        <nav
          id={mobileNavigationId}
          aria-label="Navegación móvil"
          className="portfolio-nav__mobile"
        >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="portfolio-nav__mobile-link"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="portfolio-nav__mobile-link portfolio-nav__mobile-link--technical"
              onClick={() => setIsOpen(false)}
            >
              {t.nav.cta}
            </Link>
        </nav>
      )}
    </header>
    </>
  );
}
