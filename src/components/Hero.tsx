import { motion } from 'framer-motion';
import { ArrowDown, Github } from 'lucide-react';
import { profile } from '../data/profile';
import { useStill } from '../hooks/uiMode';
import { useGithub } from '../hooks/useGithub';
import { relativeTime } from '../lib/time';
import NetworkVisualization from './NetworkVisualization';
import ResumeButton from './ResumeButton';
import ScrambleText from './ScrambleText';
import CountUp from './CountUp';

/** The most recent push on GitHub, live when the API answers. */
function LastPush() {
  const { repos, source } = useGithub();
  const latest = repos[0];
  if (!latest) return null;

  return (
    <a
      href={latest.url}
      target="_blank"
      rel="noreferrer noopener"
      className="group inline-flex max-w-full items-center gap-2.5 border border-line-2 bg-ink/60 px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-muted backdrop-blur transition-colors hover:border-lime/60"
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
        <span className="pulse-ring absolute inset-0 rounded-full bg-lime" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-lime" />
      </span>
      <span className="shrink-0 text-lime">{source === 'live' ? 'LAST PUSH' : 'LAST ACTIVITY'}</span>
      <span className="truncate text-fg-dim transition-colors group-hover:text-fg">{latest.name}</span>
      <span className="shrink-0">· {relativeTime(latest.activeAt)}</span>
    </a>
  );
}

export default function Hero() {
  const still = useStill();
  const { repos, source } = useGithub();

  const rise = (delay: number) =>
    still
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="home" className="relative scroll-mt-16 px-5 pt-28 pb-16 sm:px-8 md:pt-36 md:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="min-w-0">
          <motion.div {...rise(0)}>
            <LastPush />
          </motion.div>

          <motion.div {...rise(0.04)} className="mt-6 flex items-center gap-3">
            <span className="h-px w-8 bg-cyan" aria-hidden="true" />
            <span className="eyebrow text-cyan">{profile.role}</span>
          </motion.div>

          <motion.h1 {...rise(0.08)} className="display mt-5 text-[clamp(2.6rem,10vw,5.6rem)] text-fg">
            <span className="glitch-hover block w-fit">
              <ScrambleText text="Vighnesh" delay={0.15} />
            </span>
            <span className="text-gradient block w-fit pr-[0.04em]">
              <ScrambleText text="Das" delay={0.45} duration={0.7} />
            </span>
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-base font-medium tracking-tight text-fg-dim sm:text-lg"
          >
            {profile.disciplines.map((d, i) => (
              <span key={d} className="flex items-center gap-3">
                {i > 0 && <span className="text-line-2" aria-hidden="true">×</span>}
                {d}
              </span>
            ))}
          </motion.p>

          <motion.p {...rise(0.24)} className="mt-6 max-w-xl text-[15px] leading-relaxed text-fg-dim md:text-base">
            {profile.tagline} Two of them are behind published patents.
          </motion.p>

          <motion.div {...rise(0.32)} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="btn-sheen data-label inline-flex items-center gap-2 border border-cyan bg-cyan px-5 py-3 text-ink transition-colors duration-200 hover:bg-cyan/85"
            >
              Explore my work
              <ArrowDown size={14} strokeWidth={2} aria-hidden="true" />
            </a>
            <ResumeButton />
            {profile.links.github.href && (
              <a
                href={profile.links.github.href}
                target="_blank"
                rel="noreferrer noopener"
                className="data-label inline-flex items-center gap-2 border border-line-2 px-5 py-3 text-fg-dim transition-all duration-200 hover:border-lime hover:text-lime"
              >
                <Github size={14} strokeWidth={1.7} aria-hidden="true" />
                GitHub
              </a>
            )}
          </motion.div>

          <motion.dl {...rise(0.4)} className="mt-10 grid max-w-lg grid-cols-3 gap-px border border-line bg-line">
            {profile.stats.map((stat, i) => {
              const live = stat.id === 'repos';
              const value = live ? repos.length : stat.value;
              return (
                <div key={stat.id} className="flex flex-col justify-between bg-panel px-4 py-4" title={stat.note}>
                  <dt className="data-label flex items-center gap-1.5 text-muted">
                    {stat.label}
                    {live && source === 'live' && (
                      <span className="h-1 w-1 rounded-full bg-lime" title="Live from the GitHub API" />
                    )}
                  </dt>
                  <dd className="display mt-2 text-2xl text-fg tabular-nums sm:text-3xl">
                    <CountUp value={value} decimals={stat.decimals} pad={stat.pad} delay={0.5 + i * 0.12} />
                  </dd>
                </div>
              );
            })}
          </motion.dl>
        </div>

        <motion.div
          {...(still ? {} : { initial: { opacity: 0, scale: 0.97 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] as const } })}
        >
          <NetworkVisualization />
        </motion.div>
      </div>
    </section>
  );
}
