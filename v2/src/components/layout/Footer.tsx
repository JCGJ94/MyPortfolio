'use client';

import Link from 'next/link';
import { Github, Linkedin, FileText, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { IconOrbitButton } from '@/components/ui/IconOrbitButton';

export function Footer() {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-12 mb-12">
                    {/* Logo & Info */}
                    <div className="col-span-2">
                        <h3 className="text-xl font-bold tracking-tight mb-4">Jose Carlos González</h3>
                        <p className="text-muted-foreground text-balance max-w-sm mb-6">
                            {t.footer.description}
                        </p>
                        <div className="flex gap-4">
                            <IconOrbitButton
                                href="https://linkedin.com/in/josecgonzález"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                icon={<Linkedin className="h-5 w-5" />}
                                hoverIcon={<Linkedin className="h-5 w-5" />}
                            />
                            <IconOrbitButton
                                href="https://github.com/JCGJ94"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                icon={<Github className="h-5 w-5" />}
                                hoverIcon={<Github className="h-5 w-5" />}
                            />
                        </div>
                    </div>

                    {/* Sitemaps */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">{t.footer.navTitle}</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/#hero" className="hover:text-primary transition-colors">{t.nav.home}</Link>
                            </li>
                            <li>
                                <Link href="/#projects" className="hover:text-primary transition-colors">{t.nav.projects}</Link>
                            </li>
                            <li>
                                <Link href="/nutriflow" className="hover:text-primary transition-colors">{t.nav.nutriflow}</Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="hover:text-primary transition-colors">{t.nav.cta}</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">{t.footer.resourcesTitle}</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link
                                    href="/JoseCarlos-CV.pdf"
                                    target="_blank"
                                    className="flex items-center hover:text-primary transition-colors"
                                >
                                    <FileText className="mr-2 h-4 w-4" />
                                    {t.hero.downloadCv}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://nutri-flow-mu.vercel.app/"
                                    target="_blank"
                                    className="flex items-center hover:text-primary transition-colors"
                                >
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    NutriFlow Demo
                                </Link>
                            </li>
                            <li>
                                <Link href="/#contact" className="hover:text-primary transition-colors">{t.footer.contact}</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-muted-foreground">
                    <p>© {currentYear} Jose Carlos González. {t.footer.rights}.</p>

                    <div className="flex items-center gap-6">
                        <LanguageSwitcher />

                        <div className="flex items-center gap-1">
                            <span>Built with</span>
                            <span className="font-semibold text-foreground">Next.js</span>
                            <span>&</span>
                            <span className="font-semibold text-foreground">Supabase</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
