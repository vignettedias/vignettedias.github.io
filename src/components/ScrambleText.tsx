import { useEffect, useState } from 'react';
import { useStill } from '../hooks/uiMode';

const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#$%&@';

interface ScrambleTextProps {
  text: string;
  /** Seconds before the decode starts. */
  delay?: number;
  /** Seconds for the whole string to resolve. */
  duration?: number;
}

/**
 * Decodes `text` left to right out of random glyphs, like a cipher resolving.
 * Screen readers get the real text immediately; the animated copy is hidden
 * from them. With motion reduced, the text is simply there.
 */
export default function ScrambleText({ text, delay = 0, duration = 1.1 }: ScrambleTextProps) {
  const still = useStill();
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (still) {
      setShown(text);
      return;
    }

    let frame = 0;
    let begin = 0;
    const scramble = (resolved: number) =>
      [...text]
        .map((ch, i) =>
          i < resolved || ch === ' ' ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        )
        .join('');

    setShown(scramble(0));
    const tick = (now: number) => {
      if (!begin) begin = now + delay * 1000;
      const progress = Math.max(0, (now - begin) / (duration * 1000));
      const resolved = Math.floor(progress * text.length);
      setShown(resolved >= text.length ? text : scramble(resolved));
      if (resolved < text.length) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [text, delay, duration, still]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{shown}</span>
    </>
  );
}
