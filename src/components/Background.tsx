import { useUiMode } from '../hooks/uiMode';

/**
 * Fixed background stack: flat near-black, a very quiet technical grid,
 * two soft radial glows, and scanlines. Nothing here is an image.
 */
export default function Background() {
  const { recruiter } = useUiMode();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-ink">
      <div className="absolute inset-0 grid-layer" />
      {!recruiter && (
        <>
          <div className="ambient glow-cyan absolute -top-40 left-1/2 h-[560px] w-[860px] -translate-x-1/2 opacity-[0.16] blur-3xl" />
          <div className="ambient glow-violet absolute top-[42%] -right-40 h-[520px] w-[520px] opacity-[0.10] blur-3xl" />
        </>
      )}
      <div className="scanline-layer absolute inset-0 opacity-60" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
