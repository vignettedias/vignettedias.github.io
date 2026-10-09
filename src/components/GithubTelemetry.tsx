import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { githubUser, snapshotDate } from '../data/github';
import { languageShares, useGithub } from '../hooks/useGithub';
import { relativeTime } from '../lib/time';

const snapshotLabel = new Date(`${snapshotDate}T00:00:00Z`).toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/**
 * Public GitHub activity, read from the API on page load. Before it answers —
 * or if it never does — the dated snapshot in data/github.ts is shown, and the
 * header says which one you are looking at.
 */
export default function GithubTelemetry() {
  const { repos, source } = useGithub();
  const shares = languageShares(repos);
  const [inspected, setInspected] = useState<string | null>(null);
  const focus = shares.find((s) => s.language === inspected) ?? shares[0];
  const max = shares[0]?.repos.length ?? 1;
  const latest = repos[0];

  return (
    <section aria-labelledby="telemetry-title" className="panel accent-cyan ticked">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <h3 id="telemetry-title" className="eyebrow">
          Repository telemetry · github.com/{githubUser}
        </h3>
        {source === 'live' ? (
          <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-lime">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="pulse-ring absolute inset-0 rounded-full bg-lime" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-lime" />
            </span>
            LIVE · GITHUB API
          </span>
        ) : (
          <span className="font-mono text-[10px] tracking-[0.14em] text-muted">SNAPSHOT · {snapshotLabel.toUpperCase()}</span>
        )}
      </header>

      <dl className="grid grid-cols-2 gap-px border-b border-line bg-line sm:grid-cols-3">
        <div className="flex flex-col-reverse bg-panel px-5 py-4">
          <dt className="data-label mt-1.5 text-muted">Public repositories</dt>
          <dd className="display text-3xl text-fg">{repos.length}</dd>
        </div>
        <div className="flex flex-col-reverse bg-panel px-5 py-4">
          <dt className="data-label mt-1.5 text-muted">Languages</dt>
          <dd className="display text-3xl text-fg">{shares.length}</dd>
        </div>
        <div className="col-span-2 flex min-w-0 flex-col-reverse bg-panel px-5 py-4 sm:col-span-1">
          <dt className="data-label mt-1.5 truncate text-muted">
            {source === 'live' ? 'Last push' : 'Last activity'}
            {latest && <span className="normal-case tracking-normal"> · {latest.name}</span>}
          </dt>
          <dd className="display truncate text-3xl text-fg">{latest ? relativeTime(latest.activeAt) : '—'}</dd>
        </div>
      </dl>

      <div className="grid gap-px bg-line lg:grid-cols-[1.25fr_0.75fr]">
        {/* Languages: one series, so one hue — ranked, with the value at each bar's tip. */}
        <div className="bg-panel px-5 py-5">
          <h4 className="data-label text-cyan">Primary language by repository</h4>
          <ul className="mt-4 space-y-1">
            {shares.map((share) => {
              const active = share.language === focus?.language;
              return (
                <li key={share.language}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onMouseEnter={() => setInspected(share.language)}
                    onFocus={() => setInspected(share.language)}
                    onClick={() => setInspected(share.language)}
                    className="grid w-full grid-cols-[88px_1fr] items-center gap-3 py-1 text-left sm:grid-cols-[104px_1fr]"
                  >
                    <span className={`truncate font-mono text-[11px] ${active ? 'text-fg' : 'text-fg-dim'}`}>
                      {share.language}
                    </span>
                    <span className="flex items-center gap-2.5">
                      <span
                        className={`h-2 rounded-r-[4px] transition-[background-color,width] duration-500 ${
                          active ? 'bg-cyan' : 'bg-cyan/45'
                        }`}
                        style={{ width: `${(share.repos.length / max) * 100}%`, maxWidth: 'calc(100% - 1.75rem)' }}
                        aria-hidden="true"
                      />
                      <span className="font-mono text-[11px] text-fg tabular-nums">{share.repos.length}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          {focus && (
            <p className="mt-4 border-t border-line pt-3 font-mono text-[10px] leading-relaxed text-muted" aria-live="polite">
              <span className="text-fg-dim">{focus.language}</span> — {focus.repos.join(' · ')}
            </p>
          )}
        </div>

        <div className="bg-panel px-5 py-5">
          <h4 className="data-label text-cyan">Recently active</h4>
          <ol className="mt-4 space-y-px">
            {repos.slice(0, 6).map((repo) => (
              <li key={repo.name}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center gap-3 border-b border-line py-2.5 last:border-b-0"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-fg-dim transition-colors group-hover:text-cyan">
                      {repo.name}
                    </span>
                    <span className="block font-mono text-[10px] text-muted">
                      {[repo.language, relativeTime(repo.activeAt)].filter(Boolean).join(' · ')}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.7}
                    aria-hidden="true"
                    className="shrink-0 text-muted transition-colors group-hover:text-cyan"
                  />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
