import { ArrowUpRight, Github, ShieldCheck } from 'lucide-react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import { featuredProjects } from '../data/projects';
import { accentClass } from '../lib/accent';

interface FeaturedProjectsProps {
  onOpen: (id: string) => void;
}

export default function FeaturedProjects({ onOpen }: FeaturedProjectsProps) {
  return (
    <Section id="projects">
      <SectionHeading
        index="03"
        eyebrow="Flagship work"
        title="Two systems, two patents"
        lede="One reasons about whether an image can be trusted. The other reasons about who owns a piece of work. Both are published patents."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {featuredProjects.map((project, i) => (
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
      </div>
    </Section>
  );
}
