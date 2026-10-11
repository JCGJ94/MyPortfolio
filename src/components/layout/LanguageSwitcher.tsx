'use client';

import * as React from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Languages, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'fr', name: 'Français' },
    { code: 'it', name: 'Italiano' },
] as const;

export function LanguageSwitcher() {
    const { language, setLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = React.useState(false);
    const rootRef = React.useRef<HTMLDivElement>(null);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const menuId = React.useId();

    const currentLang = languages.find(l => l.code === language) || languages[0];

    const items = () => Array.from(rootRef.current?.querySelectorAll<HTMLElement>('[role="menuitemradio"]') ?? []);

    // Move focus to the selected language when the menu opens.
    React.useEffect(() => {
        if (!isOpen) return;
        (items().find(el => el.getAttribute('aria-checked') === 'true') ?? items()[0])?.focus();
    }, [isOpen]);

    // Click outside closes the menu.
    React.useEffect(() => {
        if (!isOpen) return;
        const onPointerDown = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
        };
        document.addEventListener('pointerdown', onPointerDown);
        return () => document.removeEventListener('pointerdown', onPointerDown);
    }, [isOpen]);

    const close = (restoreFocus: boolean) => {
        setIsOpen(false);
        if (restoreFocus) triggerRef.current?.focus();
    };

    const onMenuKeyDown = (event: React.KeyboardEvent) => {
        const list = items();
        const i = list.indexOf(document.activeElement as HTMLElement);
        let next = -1;
        if (event.key === 'ArrowDown') next = (i + 1) % list.length;
        else if (event.key === 'ArrowUp') next = (i - 1 + list.length) % list.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = list.length - 1;
        else if (event.key === 'Escape') {
            event.preventDefault();
            close(true);
            return;
        } else if (event.key === 'Tab') {
            close(false);
            return;
        }
        if (next < 0) return;
        event.preventDefault();
        list[next]?.focus();
    };

    return (
        <div className="relative" ref={rootRef}>
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={(event) => {
                    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                        event.preventDefault();
                        setIsOpen(true);
                    } else if (event.key === 'Escape' && isOpen) {
                        close(true);
                    }
                }}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-controls={isOpen ? menuId : undefined}
                aria-label={`${t.nav.language}: ${currentLang.name}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 hover:border-primary hover:text-primary transition-all text-sm font-bold uppercase tracking-widest cursor-pointer"
            >
                <Languages className="h-4 w-4" aria-hidden="true" />
                <span>{currentLang.code}</span>
                <ChevronUp aria-hidden="true" className={cn("h-4 w-4 transition-transform", isOpen ? "rotate-0" : "rotate-180")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <m.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full mb-2 left-0 min-w-[140px] bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-[60]"
                    >
                        <div
                            id={menuId}
                            role="menu"
                            aria-label={t.nav.language}
                            className="py-2"
                            onKeyDown={onMenuKeyDown}
                        >
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    type="button"
                                    role="menuitemradio"
                                    aria-checked={language === lang.code}
                                    lang={lang.code}
                                    tabIndex={language === lang.code ? 0 : -1}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        close(true);
                                    }}
                                    className={cn(
                                        "w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10",
                                        language === lang.code ? "text-primary bg-primary/5" : "text-muted-foreground"
                                    )}
                                >
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
}
