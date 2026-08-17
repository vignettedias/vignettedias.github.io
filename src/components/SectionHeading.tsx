import Reveal from './Reveal';
import { useUiMode } from '../hooks/uiMode';

interface SectionHeadingProps {
  /** Two-digit index — these sections are read in order, so the number carries meaning. */
  index: string;
  eyebrow: string;
  title: string;
  lede?: string;
}

export default function SectionHeading({ index, eyebrow, title, lede }: SectionHeadingProps) {
  // Recruiter mode reorders the page, so the ordinal would no longer be true.
  const { recruiter } = useUiMode();

  return (
    <Reveal className="mb-10 md:mb-14">
      <div className="flex items-baseline gap-4">
        {!recruiter && <span className="data-label text-muted tabular-nums">{index}</span>}
        <span className="eyebrow">{eyebrow}</span>
        <span className="hairline flex-1" aria-hidden="true" />
      </div>
      <h2 className="display mt-4 text-3xl text-fg sm:text-4xl md:text-5xl">{title}</h2>
      {lede && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fg-dim md:text-base">{lede}</p>}
    </Reveal>
  );
}
