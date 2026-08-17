import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Github } from 'lucide-react';
import { profile } from '../data/profile';
import { useUiMode } from '../hooks/uiMode';
import NetworkVisualization from './NetworkVisualization';
import ResumeButton from './ResumeButton';

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const { recruiter } = useUiMode();
  const still = prefersReduced || recruiter;

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
        <div>
          <motion.div {...rise(0)} className="flex items-center gap-3">
            <span className="h-px w-8 bg-cyan" aria-hidden="true" />
            <span className="eyebrow text-cyan">{profile.role}</span>
          </motion.div>

          <motion.h1
            {...rise(0.08)}
            className="display mt-5 text-[clamp(2.6rem,10vw,5.6rem)] text-fg"
          >
            Vighnesh
            <br />
            Das
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
              className="data-label inline-flex items-center gap-2 border border-cyan bg-cyan px-5 py-3 text-ink transition-colors duration-200 hover:bg-cyan/85"
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
            {profile.stats.map((stat) => (
              <div key={stat.label} className="bg-panel px-4 py-4">
                <dt className="data-label text-muted">{stat.label}</dt>
                <dd className="display mt-2 text-2xl text-fg tabular-nums sm:text-3xl">{stat.value}</dd>
              </div>
            ))}
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
