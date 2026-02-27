'use client';

import { useSectionScroll } from '@/hooks/useSectionScroll';
import { ChevronsUp, ChevronsDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SECTIONS = ['hero', 'about', 'projects', 'stack', 'contact'];

export function ScrollControls() {
    const { scrollNext, scrollPrev, isFirst, isLast } = useSectionScroll(SECTIONS);

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex flex-row gap-4">
            <AnimatePresence>
                {!isFirst && (
                    <motion.button
                        aria-label="Scroll Up"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1, backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={scrollPrev}
                        className="flex items-center justify-center w-12 h-12 rounded-full border border-border/50 bg-background/50 backdrop-blur shadow-md text-foreground transition-colors"
                    >
                        <ChevronsUp className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {!isLast && (
                    <motion.button
                        aria-label="Scroll Down"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1, backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={scrollNext}
                        className="flex items-center justify-center w-12 h-12 rounded-full border border-border/50 bg-background/50 backdrop-blur shadow-md text-foreground transition-colors"
                    >
                        <ChevronsDown className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
