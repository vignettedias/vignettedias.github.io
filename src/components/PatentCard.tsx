import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Patent } from '../data/patents';
import { accentClass } from '../lib/accent';
import { useUiMode } from '../hooks/uiMode';

interface PatentCardProps {
  patent: Patent;
  onOpenProject: (id: string) => void;
}

export default function PatentCard({ patent, onOpenProject }: PatentCardProps) {
  const prefersReduced = useReducedMotion();
  const { recruiter } = useUiMode();
  const still = prefersReduced || recruiter;

  return (
    <article
      className={`panel panel-hover ticked relative overflow-hidden p-6 sm:p-8 ${accentClass(patent.accent)}`}
    >
      {/* Document rule — the inset frame of a patent front page */}
      <div
        className="pointer-events-none absolute inset-3 border border-line-2/60"
        aria-hidden="true"
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <span className="display text-4xl text-line-2 tabular-nums sm:text-5xl">{patent.index}</span>
          <motion.span
            className={`data-label px-2.5 py-1.5 ${
              patent.stage === 'published'
                ? 'border border-accent/60 text-accent'
                : 'border border-line-2 text-fg-dim'
            }`}
            animate={still || patent.stage !== 'published' ? undefined : { opacity: [0.62, 1, 0.62] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {patent.statusLabel}
          </motion.span>
        </div>

        <h3 className="display mt-5 text-2xl text-fg sm:text-3xl">{patent.title}</h3>
        {patent.filedTitle && (
          <p className="mt-2 max-w-md text-sm leading-snug text-fg-dim">{patent.filedTitle}</p>
        )}
        <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[10px] tracking-wide text-muted">
          <div>
            <dt className="inline text-muted/70">Application </dt>
            <dd className="inline text-fg-dim">{patent.applicationNumber}</dd>
          </div>
          {patent.publicationNumber && (
            <div>
              <dt className="inline text-muted/70">Publication </dt>
              <dd className="inline text-fg-dim">{patent.publicationNumber}</dd>
            </div>
          )}
          {patent.filingDate && (
            <div>
              <dt className="inline text-muted/70">Filed </dt>
              <dd className="inline text-fg-dim">{patent.filingDate}</dd>
            </div>
          )}
          {patent.publicationDate && (
            <div>
              <dt className="inline text-muted/70">Published </dt>
              <dd className="inline text-fg-dim">{patent.publicationDate}</dd>
            </div>
          )}
          {patent.journalNumber && (
            <div>
              <dt className="inline text-muted/70">Journal </dt>
              <dd className="inline text-fg-dim">{patent.journalNumber}</dd>
            </div>
          )}
          {patent.applicant && (
            <div>
              <dt className="inline text-muted/70">Applicant </dt>
              <dd className="inline text-fg-dim">{patent.applicant}</dd>
            </div>
          )}
        </dl>

        <div className="mt-3 flex items-center gap-3">
          <span className="h-px w-6 bg-accent" aria-hidden="true" />
          <span className="font-mono text-[11px] tracking-wide text-accent">{patent.domain}</span>
        </div>

        <p className="mt-5 max-w-md text-sm leading-relaxed text-fg-dim">{patent.summary}</p>

        {patent.coInventors.length > 0 && (
          <div className="mt-5 border-t border-line pt-4">
            <span className="data-label text-muted">Co-inventors</span>
            <p className="mt-1.5 font-mono text-[11px] text-fg-dim">
              {patent.coInventors.join(' · ')}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={() => onOpenProject(patent.projectId)}
          className="data-label mt-6 inline-flex items-center gap-1.5 border border-line-2 px-3 py-2 text-fg-dim transition-colors duration-200 hover:border-accent hover:text-accent"
        >
          See the project
          <ArrowUpRight size={13} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
