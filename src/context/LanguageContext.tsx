'use client';

import React, { createContext, useContext, useSyncExternalStore } from 'react';
import { type Language, translations } from '@/data/translations';
import { createLanguageStore } from './language-store';

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: typeof translations.es;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const languageStore = createLanguageStore();

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const language = useSyncExternalStore(
        languageStore.subscribe,
        languageStore.getSnapshot,
        languageStore.getServerSnapshot,
    );
    const setLanguage = languageStore.setLanguage;

    const value = {
        language,
        setLanguage,
        t: translations[language]
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
