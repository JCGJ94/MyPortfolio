'use client';

import { LazyMotion, MotionConfig } from 'framer-motion';

// Features load as a separate async chunk, off the critical path.
const loadFeatures = () => import('./motionFeatures').then((mod) => mod.default);

// Honors the OS "reduce motion" setting for every framer-motion component.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>{children}</LazyMotion>
    </MotionConfig>
  );
}
