import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useUiMode } from '../hooks/uiMode';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Horizontal offset instead of vertical, for side panels. */
  from?: 'below' | 'left' | 'right';
}

/** Scroll-triggered entrance. Collapses to a plain div when motion is reduced. */
export default function Reveal({ children, delay = 0, className, from = 'below' }: RevealProps) {
  const prefersReduced = useReducedMotion();
  const { recruiter } = useUiMode();
  const still = prefersReduced || recruiter;

  if (still) return <div className={className}>{children}</div>;

  const offset =
    from === 'below' ? { y: 22, x: 0 } : from === 'left' ? { x: -22, y: 0 } : { x: 22, y: 0 };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
