import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Github, X } from 'lucide-react';
import type { Project } from '../data/projects';
import { accentClass } from '../lib/accent';
import { useScrollLock } from '../hooks/useSite';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line pt-5">
      <h4 className="data-label text-accent">{title}</h4>
      <div className="mt-2.5 text-sm leading-relaxed text-fg-dim">{children}</div>
    </section>
  );
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prefersReduced = useReducedMotion();
  useScrollLock(Boolean(project));

  useEffect(() => {
    if (!project) return;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto overscroll-contain bg-ink/85 p-4 backdrop-blur-sm sm:p-8"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className={`panel my-auto w-full max-w-3xl ${accentClass(project.accent)}`}
            initial={prefersReduced ? false : { opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReduced ? undefined : { opacity: 0, y: 8, scale: 0.99 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-panel px-5 py-4 sm:px-7">
              <div>
                <span className="data-label text-accent">{project.category}</span>
                <h3 id="project-modal-title" className="display mt-2 text-2xl text-fg sm:text-3xl">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p className="mt-1 font-mono text-[11px] tracking-wide text-muted">{project.subtitle}</p>
                )}
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="shrink-0 border border-line-2 p-2 text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <X size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </header>

            <div className="space-y-5 px-5 py-5 sm:px-7 sm:py-6">
              <p className="text-[15px] leading-relaxed text-fg">{project.description}</p>

              {project.metrics && (
                <dl className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col-reverse bg-panel px-3 py-3">
                      <dt className="mt-1 font-mono text-[10px] tracking-wide text-muted">{m.label}</dt>
                      <dd className="display text-xl text-fg">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {project.status && (
                <p className="font-mono text-[10px] tracking-wide text-muted">
                  <span className="text-accent">STATUS</span> · {project.status}
                </p>
              )}

              <Block title="The problem">
                <p>{project.problem}</p>
              </Block>

              <Block title="The approach">
                <p>{project.approach}</p>
              </Block>

              <Block title="Architecture">
                <ol className="space-y-2">
                  {project.architecture.map((step, i) => (
                    <li key={step} className="flex gap-3">
                      <span className="mt-0.5 font-mono text-[10px] text-accent tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </Block>

              <Block title="Engineering highlights">
                <ul className="space-y-2">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title="Technologies">
                <ul className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <li key={tech} className="border border-line-2 px-2 py-1 font-mono text-[10px] text-fg-dim">
                      {tech}
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title="My contribution">
                <p>{project.contribution}</p>
              </Block>

              <div className="flex flex-wrap gap-2 border-t border-line pt-5">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="data-label inline-flex items-center gap-2 border border-accent px-4 py-2.5 text-accent transition-colors hover:bg-accent/10"
                >
                  <Github size={13} strokeWidth={1.7} aria-hidden="true" />
                  Open repository
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
