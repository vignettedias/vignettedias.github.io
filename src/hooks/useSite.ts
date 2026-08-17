import { useEffect, useState } from 'react';

/** Tracks which section is currently in the reading position. */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.15, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/** Document scroll progress, 0 → 1. */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return progress;
}

export type ResumeState = 'checking' | 'available' | 'missing';

/**
 * The résumé PDF is optional. If public/resume.pdf has not been added yet the
 * download control degrades to a disabled state instead of a broken link.
 */
export function useResumeAvailability(path: string): ResumeState {
  const [state, setState] = useState<ResumeState>('checking');

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    fetch(path, { method: 'HEAD', signal: controller.signal })
      .then((res) => {
        if (cancelled) return;
        const type = res.headers.get('content-type') ?? '';
        const looksLikePdf = type.includes('pdf') || type === '';
        setState(res.ok && looksLikePdf ? 'available' : 'missing');
      })
      .catch(() => {
        if (!cancelled) setState('missing');
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [path]);

  return state;
}

/** Freezes background scroll while a modal is open. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}

/** True once the viewport is at least `px` wide. */
export function useMinWidth(px: number): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? true : window.matchMedia(`(min-width: ${px}px)`).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${px}px)`);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [px]);

  return matches;
}
