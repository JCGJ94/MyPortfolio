'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypewriterProps {
    words: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    delayBeforeDelete?: number;
    className?: string;
}

export function Typewriter({
    words,
    typingSpeed = 100,
    deletingSpeed = 60,
    delayBeforeDelete = 1500,
    className
}: TypewriterProps) {
    const [text, setText] = React.useState("");
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [loopIndex, setLoopIndex] = React.useState(0);

    React.useEffect(() => {
        const currentWord = words[loopIndex % words.length];
        const speed = isDeleting ? deletingSpeed : typingSpeed;

        const timeout = setTimeout(() => {
            setText(prev =>
                isDeleting
                    ? prev.slice(0, -1)
                    : currentWord.slice(0, prev.length + 1)
            );

            if (!isDeleting && text === currentWord) {
                setTimeout(() => setIsDeleting(true), delayBeforeDelete);
            } else if (isDeleting && text === "") {
                setIsDeleting(false);
                setLoopIndex(prev => prev + 1);
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, loopIndex, words, typingSpeed, deletingSpeed, delayBeforeDelete]);

    return (
        <span className={className}>
            {text}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-baseline"
            />
        </span>
    );
}
