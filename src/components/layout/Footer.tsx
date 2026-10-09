'use client';

import Link from 'next/link';
import { ArrowUp, ArrowUpRight, Github, Linkedin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { FooterSignature } from '@/components/ui/FooterSignature';
import { FooterCodeRain } from '@/components/ui/FooterCodeRain';
import '@/app/pv3-footer.css';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Footer() {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();
    const footer = t.footer as typeof t.footer & { top?: string };

    const site = [
        { href: '/#hero', label: t.nav.home },
        { href: '/#projects', label: t.nav.projects },
        { href: '/#about', label: t.nav.about },
        { href: '/#stack', label: t.nav.stack },
        { href: '/dashboard', label: t.nav.cta },
    ];
    const elsewhere = [
        { href: 'https://github.com/JCGJ94', label: 'GitHub', icon: Github, external: true },
        { href: 'https://linkedin.com/in/josecgonzález', label: 'LinkedIn', icon: Linkedin, external: true },
        { href: '/JoseCarlos-CV.pdf', label: t.hero.downloadCv, icon: null, external: true },
        { href: '/#contact', label: footer.contact, icon: null, external: false },
    ];

    return (
        <footer className="pv3-foot">
            <div className="pv3-foot__inner">
                <div className="pv3-foot__top">
                    <p className="pv3-foot__avail">
                        <span className="pv3-foot__dot" aria-hidden="true" />
                        {t.hero.badge}
                    </p>
                    <a href="#hero" className="pv3-foot__up pv3-focus" aria-label={footer.top ?? 'Back to top'}>
                        <span className="pv3-foot__up-label">{footer.top ?? 'Back to top'}</span>
                        <span className="pv3-foot__up-ring" aria-hidden="true"><ArrowUp size={18} /></span>
                    </a>
                </div>

                <div className="pv3-foot__sig">
                    <FooterCodeRain />
                    <p className="pv3-term pv3-term--cmd" aria-hidden="true">
                        <span className="pv3-term__ps">$</span> <span className="pv3-term__type">whoami</span>
                    </p>
                    <FooterSignature first={t.hero.name.split(' ')[0]} accent={t.hero.name.split(' ').slice(1).join(' ')} />
                    <p className="pv3-term pv3-term--log" aria-hidden="true">
                        <span className="pv3-term__line"><span className="pv3-term__ps">&gt;</span> stack: python · fastapi · next.js · react · typescript · postgres · docker</span>
                        <span className="pv3-term__line pv3-term__line--run"><span className="pv3-term__ps">$</span> <span className="pv3-term__type">docker compose up</span><span className="pv3-term__caret" /></span>
                    </p>
                </div>
                <div className="pv3-foot__trace" aria-hidden="true" />

                <div className="pv3-foot__grid">
                    <p className="pv3-foot__about">{footer.description}</p>

                    <nav aria-label={footer.navTitle}>
                        <h2 className="pv3-foot__h">{footer.navTitle}</h2>
                        <ul className="pv3-foot__list">
                            {site.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="pv3-foot__link pv3-focus"><span>{item.label}</span></Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <h2 className="pv3-foot__h">{footer.resourcesTitle}</h2>
                        <ul className="pv3-foot__list">
                            {elsewhere.map(({ href, label, icon: Icon, external }) => (
                                <li key={href}>
                                    <a
                                        href={href}
                                        className="pv3-foot__link pv3-focus"
                                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                    >
                                        {Icon && <Icon aria-hidden="true" size={16} />}
                                        <span>{label}</span>
                                        {external && <ArrowUpRight aria-hidden="true" size={14} className="pv3-foot__arrow" />}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pv3-foot__bottom">
                    <p>© {currentYear} Jose Carlos González. {t.footer.rights}.</p>
                    <div className="pv3-foot__meta">
                        <LanguageSwitcher />
                        <p>
                            Built with <strong>Next.js</strong> &amp; <strong>Supabase</strong>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
