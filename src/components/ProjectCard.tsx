import { ArrowUpRight, Github, ShieldCheck } from 'lucide-react';
import type { Project } from '../data/projects';
import { accentClass } from '../lib/accent';
import { useUiMode } from '../hooks/uiMode';

interface ProjectCardProps {
  project: Project;
  onOpen: (id: string) => void;
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const { recruiter } = useUiMode();
  const techLimit = recruiter ? 6 : 4;
  const shown = project.technologies.slice(0, techLimit);
  const remaining = project.technologies.length - shown.length;

  return (
    <article
      className={`panel panel-hover ticked group flex h-full flex-col p-5 ${accentClass(project.accent)}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="data-label text-accent">{project.category}</span>
        {project.patented && (
          <span className="data-label flex items-center gap-1.5 border border-accent/50 px-2 py-1 text-accent">
            <ShieldCheck size={11} strokeWidth={2} aria-hidden="true" />
            Patented
          </span>
        )}
      </div>

      <h3 className="display mt-4 text-xl text-fg">{project.title}</h3>
      {project.subtitle && (
        <p className="mt-1 font-mono text-[11px] tracking-wide text-muted">{project.subtitle}</p>
      )}

      <p className="mt-3 text-sm leading-relaxed text-fg-dim">{project.description}</p>

      {project.status && (
        <p className="mt-3 font-mono text-[10px] tracking-wide text-muted">
          <span className="text-accent">STATUS</span> · {project.status}
        </p>
      )}

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {shown.map((tech) => (
          <li key={tech} className="border border-line-2 px-2 py-1 font-mono text-[10px] text-fg-dim">
            {tech}
          </li>
        ))}
        {remaining > 0 && (
          <li className="px-2 py-1 font-mono text-[10px] text-muted">+{remaining}</li>
        )}
      </ul>

      <div className="mt-auto flex items-center gap-2 pt-5">
        <button
          type="button"
          onClick={() => onOpen(project.id)}
          className="data-label flex items-center gap-1.5 border border-line-2 px-3 py-2 text-fg-dim transition-colors duration-200 hover:border-accent hover:text-accent"
        >
          View project
          <ArrowUpRight size={13} strokeWidth={1.8} aria-hidden="true" />
        </button>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`${project.title} on GitHub`}
          className="data-label flex items-center gap-1.5 border border-line-2 px-3 py-2 text-muted transition-colors duration-200 hover:border-fg-dim hover:text-fg"
        >
          <Github size={13} strokeWidth={1.7} aria-hidden="true" />
          Code
        </a>
      </div>
    </article>
  );
}
