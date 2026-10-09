import { stackTicker } from '../data/skills';
import { accentHex } from '../lib/accent';

const dots = [accentHex.cyan, accentHex.lime, accentHex.violet, accentHex.magenta];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {stackTicker.map((tech, i) => (
        <li key={tech} className="flex items-center gap-3 px-5 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
          <span className="h-1 w-1 rotate-45" style={{ background: dots[i % dots.length] }} aria-hidden="true" />
          {tech}
        </li>
      ))}
    </ul>
  );
}

/** The stack, scrolling past under the hero. Pauses on hover; still under reduced motion. */
export default function TechMarquee() {
  return (
    <div className="border-y border-line bg-ink/40 py-4 backdrop-blur-sm">
      <div className="marquee overflow-hidden">
        <div className="marquee-track flex">
          <Row />
          <Row hidden />
        </div>
      </div>
      <p className="sr-only">Technologies used across these projects: {stackTicker.join(', ')}.</p>
    </div>
  );
}
