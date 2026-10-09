'use client';

import { useEffect, useState } from 'react';

interface TypewriterProps {
  words: string[];
  /** Hold the animation until true (e.g. until the name finished typing). */
  start?: boolean;
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
  className?: string;
}

/**
 * V2-style typewriter: type, pause, delete, next word. Runs under reduced motion too
 * (text changing in place is not vestibular motion); the caret blinks at 1 Hz.
 * The longest word is rendered invisibly in the same grid cell, so the box never resizes.
 * The animated text is aria-hidden: pair it with a static sr-only copy.
 */
export function Typewriter({ words, start = true, typingSpeed = 70, deletingSpeed = 35, pause = 1800, className }: TypewriterProps) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const word = words[index % words.length];
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '');

  useEffect(() => {
    if (!start) return;
    let delay = deleting ? deletingSpeed : typingSpeed;
    if (!deleting && text === word) delay = pause;
    const timer = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === '') { setDeleting(false); setIndex((i) => i + 1); }
      else setText(deleting ? text.slice(0, -1) : word.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(timer);
  }, [start, text, deleting, word, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={`hw-type${className ? ` ${className}` : ''}`} aria-hidden="true">
      <span className="hw-type__space">{longest}</span>
      <span className="hw-type__text">{text}<span className="hw-type__caret" /></span>
    </span>
  );
}
