import type { Language } from '@/data/translations';

const languages = new Set<Language>(['es', 'en', 'de', 'fr', 'it']);
export const isLanguage = (value: unknown): value is Language =>
    typeof value === 'string' && languages.has(value as Language);

const spanish: Language = 'es';

export function createLanguageStore() {
    let snapshot: Language | undefined;
    let hydrated = false;
    const listeners = new Set<() => void>();

    const getSnapshot = (): Language => {
        if (snapshot !== undefined) return snapshot;
        if (!hydrated) {
            hydrated = true;
            try {
                const storage = window.localStorage;
                const saved = storage.getItem('language');
                if (isLanguage(saved)) snapshot = saved;
            } catch {
                // Storage may be unavailable; retain the Spanish in-memory fallback.
            }
        }
        snapshot ??= spanish;
        return snapshot;
    };

    return {
        getSnapshot,
        getServerSnapshot: () => spanish,
        subscribe(listener: () => void) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
        setLanguage(language: Language) {
            if (!isLanguage(language)) return;
            const changed = snapshot !== language;
            snapshot = language;
            hydrated = true;
            try {
                window.localStorage.setItem('language', language);
            } catch {
                // Keep the explicit selection in memory for this page lifetime.
            }
            if (changed) listeners.forEach((listener) => listener());
        },
    };
}
