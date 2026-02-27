'use client';

import dynamic from 'next/dynamic';

const Agentation = dynamic(
    () => import('agentation').then((mod) => ({ default: mod.Agentation })),
    { ssr: false }
);

/**
 * DevTools: Renders development-only tools.
 * Currently includes Agentation for visual AI feedback.
 * This component should only be mounted in development.
 */
export function DevTools() {
    if (process.env.NODE_ENV !== 'development') return null;

    return <Agentation />;
}
