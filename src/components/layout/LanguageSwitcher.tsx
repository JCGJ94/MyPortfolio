'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = React.useState(false);

    const languages = [
        { code: 'es', name: 'Español' },
        { code: 'en', name: 'English' },
        { code: 'de', name: 'Deutsch' },
        { code: 'fr', name: 'Français' },
        { code: 'it', name: 'Italiano' },
    ] as const;

    const currentLang = languages.find(l => l.code === language) || languages[0];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 hover:border-primary hover:text-primary transition-all text-sm font-bold uppercase tracking-widest cursor-pointer"
            >
                <Languages className="h-4 w-4" />
                <span>{currentLang.code}</span>
                <ChevronUp className={cn("h-4 w-4 transition-transform", isOpen ? "rotate-0" : "rotate-180")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full mb-2 left-0 min-w-[140px] bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-[60]"
                    >
                        <div className="py-2">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setIsOpen(false);
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
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
