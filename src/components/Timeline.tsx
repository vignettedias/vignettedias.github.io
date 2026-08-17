import { journey } from '../data/journey';
import { accentClass } from '../lib/accent';
import Reveal from './Reveal';

export default function Timeline() {
  return (
    <ol className="relative border-l border-line pl-6 sm:pl-8">
      {journey.map((entry, i) => (
        <li key={entry.id} className={`relative pb-9 last:pb-0 ${accentClass(entry.accent)}`}>
          <span
            className="absolute top-1.5 -left-[25px] h-2 w-2 border border-accent bg-ink sm:-left-[33px]"
            aria-hidden="true"
          />
          <Reveal delay={i * 0.04}>
            <span className="data-label text-accent">{entry.category}</span>
            <h3 className="display mt-2 text-lg text-fg">{entry.title}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-dim">{entry.body}</p>
            {entry.links && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {entry.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="border border-line-2 px-2 py-1 font-mono text-[10px] text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
