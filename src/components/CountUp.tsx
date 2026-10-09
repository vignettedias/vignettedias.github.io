import { useEffect, useRef, useState } from 'react';
import { useStill } from '../hooks/uiMode';

interface CountUpProps {
  value: number;
  decimals?: number;
  /** Zero-pad the integer part to this many digits. */
  pad?: number;
  delay?: number;
}

const format = (n: number, decimals: number, pad: number) => {
  const fixed = n.toFixed(decimals);
  const [int, frac] = fixed.split('.');
  return `${int.padStart(pad, '0')}${frac ? `.${frac}` : ''}`;
};

/**
 * Counts up to `value` once on mount, and eases to any new value it is given
 * later (the live repository count, for instance).
 */
export default function CountUp({ value, decimals = 0, pad = 0, delay = 0 }: CountUpProps) {
  const still = useStill();
  const [display, setDisplay] = useState(still ? value : 0);
  const from = useRef(still ? value : 0);

  useEffect(() => {
    if (still) {
      from.current = value;
      setDisplay(value);
      return;
    }

    let frame = 0;
    let begin = 0;
    const start = from.current;
    const duration = 1100;
    const tick = (now: number) => {
      if (!begin) begin = now + delay * 1000;
      const t = Math.min(1, Math.max(0, (now - begin) / duration));
      const eased = 1 - Math.pow(1 - t, 3);
      const current = start + (value - start) * eased;
      from.current = current;
      setDisplay(current);
      if (t < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [value, delay, still]);

  return (
    <>
      <span className="sr-only">{format(value, decimals, pad)}</span>
      <span aria-hidden="true">{format(display, decimals, pad)}</span>
    </>
  );
}
