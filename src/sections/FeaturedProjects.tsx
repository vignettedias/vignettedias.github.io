import { ArrowUpRight, Github, Lock, ShieldCheck } from 'lucide-react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import { patentedFeatured, projectById, type Project } from '../data/projects';
import { heloStack } from '../data/architectures';
import { accentClass } from '../lib/accent';
import { isRecent } from '../lib/time';

interface FeaturedProjectsProps {
  onOpen: (id: string) => void;
}

/** Wide card for Helo: the flagship that is not behind a patent, with its protocol stack drawn out. */
function HeloSpotlight({ project, onOpen }: { project: Project; onOpen: (id: string) => void }) {
  return (
    <article
      className={`panel panel-hover ticked grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 ${accentClass(project.accent)}`}
    >
      <div className="flex flex-col">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <span className="data-label text-accent">{project.category}</span>
          <span className="flex gap-2">
            {isRecent(project.released, 60) && (
              <span className="data-label border border-accent bg-accent/10 px-2.5 py-1.5 text-accent">New</span>
            )}
            <span className="data-label flex items-center gap-1.5 border border-accent/50 px-2.5 py-1.5 text-accent">
              <Lock size={12} strokeWidth={2} aria-hidden="true" />
              End-to-end encrypted
            </span>
          </span>
        </div>

        <h3 className="display mt-6 text-3xl text-fg sm:text-4xl">{project.title}</h3>
        {project.subtitle && (
          <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-accent uppercase">{project.subtitle}</p>
        )}
        <p className="mt-5 text-[15px] leading-relaxed text-fg-dim">{project.description}</p>

        {project.metrics && (
          <dl className="mt-6 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse bg-panel px-3 py-3">
                <dt className="mt-1 font-mono text-[10px] tracking-wide text-muted">{m.label}</dt>
                <dd className="display text-2xl text-fg">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-7">
          <button
            type="button"
            onClick={() => onOpen(project.id)}
            className="data-label inline-flex items-center gap-2 border border-accent px-4 py-2.5 text-accent transition-colors duration-200 hover:bg-accent/10"
          >
            Explore the protocol
            <ArrowUpRight size={13} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="data-label inline-flex items-center gap-2 border border-line-2 px-4 py-2.5 text-fg-dim transition-colors duration-200 hover:border-fg-dim hover:text-fg"
          >
            <Github size={13} strokeWidth={1.7} aria-hidden="true" />
            View GitHub
          </a>
        </div>
      </div>

      <figure className="flex flex-col">
        <figcaption className="eyebrow">Protocol stack · one message, top to bottom</figcaption>
        <div className="relative mt-4 flex-1">
          {/* The rail, with a packet of ciphertext running down it. */}
          <span className="absolute top-3 bottom-3 left-[15px] w-px bg-line-2" aria-hidden="true">
            <span className="packet absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_12px_2px_var(--accent)]" />
          </span>
          <ol className="relative space-y-2.5">
            {heloStack.map((layer, i) => (
              <li key={layer.name} className="flex items-center gap-4">
                <span className="relative z-10 flex h-[31px] w-[31px] shrink-0 items-center justify-center border border-line-2 bg-panel font-mono text-[10px] text-accent tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1 border border-line bg-ink/50 px-3.5 py-2.5">
                  <p className="font-display text-sm font-semibold tracking-tight text-fg">{layer.name}</p>
                  <p className="font-mono text-[10px] text-muted">{layer.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-4 font-mono text-[10px] leading-relaxed text-muted">
          Research implementation. Not post-quantum, not independently audited — and the README says so first.
        </p>
      </figure>
    </article>
  );
}

export default function FeaturedProjects({ onOpen }: FeaturedProjectsProps) {
  const helo = projectById('helo');

  return (
    <Section id="projects">
      <SectionHeading
        index="03"
        eyebrow="Flagship work"
        title="Two patents and a protocol"
        lede="One system reasons about whether an image can be trusted; another about who owns a piece of work — both are published patents. The newest carries messages across a server it assumes is hostile."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {patentedFeatured.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.08} className="h-full">
            <article
              className={`panel panel-hover ticked flex h-full flex-col p-6 sm:p-8 ${accentClass(project.accent)}`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="data-label text-accent">{project.category}</span>
                <span className="data-label flex items-center gap-1.5 border border-accent/50 px-2.5 py-1.5 text-accent">
                  <ShieldCheck size={12} strokeWidth={2} aria-hidden="true" />
                  Patented project
                </span>
              </div>

              <h3 className="display mt-6 text-3xl text-fg sm:text-4xl">{project.title}</h3>
              {project.subtitle && (
                <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-accent uppercase">
                  {project.subtitle}
                </p>
              )}

              <p className="mt-5 text-[15px] leading-relaxed text-fg-dim">{project.description}</p>

              <ul className="mt-6 flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 6).map((tech) => (
                  <li
                    key={tech}
                    className="border border-line-2 px-2 py-1 font-mono text-[10px] text-fg-dim"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-2 pt-7">
                <button
                  type="button"
                  onClick={() => onOpen(project.id)}
                  className="data-label inline-flex items-center gap-2 border border-accent px-4 py-2.5 text-accent transition-colors duration-200 hover:bg-accent/10"
                >
                  Explore architecture
                  <ArrowUpRight size={13} strokeWidth={1.8} aria-hidden="true" />
                </button>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="data-label inline-flex items-center gap-2 border border-line-2 px-4 py-2.5 text-fg-dim transition-colors duration-200 hover:border-fg-dim hover:text-fg"
                >
                  <Github size={13} strokeWidth={1.7} aria-hidden="true" />
                  View GitHub
                </a>
              </div>
            </article>
          </Reveal>
        ))}
        {helo && (
          <Reveal delay={0.12} className="lg:col-span-2">
            <HeloSpotlight project={helo} onOpen={onOpen} />
          </Reveal>
        )}
      </div>
    </Section>
  );
}
