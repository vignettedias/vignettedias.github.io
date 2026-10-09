import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';

interface UiModeValue {
  /** Recruiter mode: quieter motion, denser information, CV-shaped reading order. */
  recruiter: boolean;
  toggleRecruiter: () => void;
  /** Deep dive: architecture detail and engineering internals expanded by default. */
  deepDive: boolean;
  toggleDeepDive: () => void;
}

const UiModeContext = createContext<UiModeValue | null>(null);

export function UiModeProvider({ children }: { children: ReactNode }) {
  const [recruiter, setRecruiter] = useState(false);
  const [deepDive, setDeepDive] = useState(false);

  const toggleRecruiter = useCallback(() => {
    setRecruiter((r) => {
      if (!r) setDeepDive(false);
      return !r;
    });
  }, []);

  const toggleDeepDive = useCallback(() => {
    setDeepDive((d) => {
      if (!d) setRecruiter(false);
      return !d;
    });
  }, []);

  const value = useMemo(
    () => ({ recruiter, toggleRecruiter, deepDive, toggleDeepDive }),
    [recruiter, toggleRecruiter, deepDive, toggleDeepDive],
  );

  return <UiModeContext.Provider value={value}>{children}</UiModeContext.Provider>;
}

export function useUiMode(): UiModeValue {
  const ctx = useContext(UiModeContext);
  if (!ctx) throw new Error('useUiMode must be used inside UiModeProvider');
  return ctx;
}

/** True when ambient motion should stop: the OS asks for reduced motion, or Recruiter mode is on. */
export function useStill(): boolean {
  const prefersReduced = useReducedMotion();
  return Boolean(prefersReduced) || useUiMode().recruiter;
}
