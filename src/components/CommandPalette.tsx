import { useEffect, useMemo, useRef, useState, type ComponentType } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Copy,
  CornerDownLeft,
  Download,
  FolderGit2,
  Hash,
  Search,
  ToggleLeft,
  type LucideProps,
} from 'lucide-react';
import { navSections, profile } from '../data/profile';
import { projects } from '../data/projects';
import { useScrollLock } from '../hooks/useSite';
import { useStill, useUiMode } from '../hooks/uiMode';

interface Command {
  id: string;
  group: 'Jump to' | 'Projects' | 'Links' | 'Actions';
  label: string;
  hint?: string;
  icon: ComponentType<LucideProps>;
  run: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onOpenProject: (id: string) => void;
  /** Shows a short confirmation once the palette has closed. */
  onToast: (message: string) => void;
}

const jumpTo = (id: string) => {
  // After the palette's scroll lock has been released.
  window.requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
  });
};

export default function CommandPalette({ open, onClose, onOpenProject, onToast }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const { recruiter, toggleRecruiter, deepDive, toggleDeepDive } = useUiMode();
  const still = useStill();
  useScrollLock(open);

  const commands = useMemo<Command[]>(() => {
    const links = Object.entries(profile.links).filter(([key, link]) => link.href && key !== 'email');
    const email = profile.links.email;

    return [
      ...navSections.map((s) => ({
        id: `jump-${s.id}`,
        group: 'Jump to' as const,
        label: s.label,
        icon: Hash,
        run: () => jumpTo(s.id),
      })),
      ...projects.map((p) => ({
        id: `project-${p.id}`,
        group: 'Projects' as const,
        label: p.title,
        hint: p.category,
        icon: FolderGit2,
        run: () => onOpenProject(p.id),
      })),
      ...links.map(([key, link]) => ({
        id: `link-${key}`,
        group: 'Links' as const,
        label: link.label,
        hint: link.handle ?? undefined,
        icon: ArrowUpRight,
        run: () => window.open(link.href!, '_blank', 'noopener,noreferrer'),
      })),
      ...(email.handle
        ? [
            {
              id: 'copy-email',
              group: 'Actions' as const,
              label: 'Copy email address',
              hint: email.handle,
              icon: Copy,
              run: () => {
                navigator.clipboard
                  ?.writeText(email.handle!)
                  .then(() => onToast(`Copied ${email.handle}`))
                  .catch(() => onToast('Clipboard unavailable — email is in the Contact section'));
              },
            },
          ]
        : []),
      {
        id: 'resume',
        group: 'Actions' as const,
        label: 'Download résumé',
        hint: 'PDF',
        icon: Download,
        run: () => {
          const a = document.createElement('a');
          a.href = profile.resumePath;
          a.download = '';
          a.click();
        },
      },
      {
        id: 'recruiter',
        group: 'Actions' as const,
        label: recruiter ? 'Leave Recruiter mode' : 'Switch to Recruiter mode',
        hint: 'calm, CV-ordered',
        icon: ToggleLeft,
        run: toggleRecruiter,
      },
      {
        id: 'deepdive',
        group: 'Actions' as const,
        label: deepDive ? 'Collapse Deep dive' : 'Expand Deep dive',
        hint: 'engineering internals',
        icon: ToggleLeft,
        run: toggleDeepDive,
      },
    ];
  }, [onOpenProject, onToast, recruiter, toggleRecruiter, deepDive, toggleDeepDive]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return commands;
    return commands.filter((c) => {
      const haystack = `${c.label} ${c.hint ?? ''} ${c.group}`.toLowerCase();
      return terms.every((t) => haystack.includes(t));
    });
  }, [commands, query]);

  // Reset on open; give focus back to whatever had it on close.
  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setQuery('');
      setActive(0);
      window.requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      // Hand focus back only if nothing else (the project modal, say) has claimed it.
      const current = document.activeElement;
      if (!current || current === document.body || dialogRef.current?.contains(current)) {
        returnFocus.current?.focus?.();
      }
      returnFocus.current = null;
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const execute = (command: Command | undefined) => {
    if (!command) return;
    onClose();
    command.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActive(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActive(Math.max(0, results.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      execute(results[active]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'Tab') {
      // The input is the only focus stop; options are reached with the arrows.
      e.preventDefault();
    }
  };

  let lastGroup = '';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-ink/80 px-4 pt-[12vh] backdrop-blur-sm"
          initial={still ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={still ? undefined : { opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="panel accent-cyan ticked w-full max-w-xl shadow-[0_30px_80px_-30px_rgba(58,231,255,0.35)]"
            initial={still ? false : { opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={still ? undefined : { opacity: 0, y: -6, scale: 0.99 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
              <Search size={15} strokeWidth={1.8} className="shrink-0 text-cyan" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                role="combobox"
                aria-expanded="true"
                aria-controls="command-results"
                aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
                aria-autocomplete="list"
                autoComplete="off"
                spellCheck={false}
                placeholder="Jump to a section, open a project, copy my email…"
                className="w-full bg-transparent font-mono text-[13px] text-fg outline-none placeholder:text-muted/60"
              />
              <kbd className="shrink-0 border border-line-2 px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
            </div>

            <ul
              ref={listRef}
              id="command-results"
              role="listbox"
              aria-label="Commands"
              className="max-h-[52vh] overflow-y-auto overscroll-contain py-2"
            >
              {results.length === 0 && (
                <li className="px-4 py-6 text-center font-mono text-[11px] text-muted" role="presentation">
                  No matches for “{query}”
                </li>
              )}
              {results.map((command, i) => {
                const heading = command.group !== lastGroup ? command.group : null;
                lastGroup = command.group;
                const Icon = command.icon;
                const isActive = i === active;
                return (
                  <li key={command.id} role="presentation">
                    {heading && (
                      <div className="eyebrow px-4 pt-3 pb-1.5" role="presentation">
                        {heading}
                      </div>
                    )}
                    <div
                      id={`cmd-${command.id}`}
                      role="option"
                      aria-selected={isActive}
                      data-index={i}
                      onMouseMove={() => !isActive && setActive(i)}
                      onClick={() => execute(command)}
                      className={`mx-2 flex cursor-pointer items-center gap-3 border-l-2 px-3 py-2.5 transition-colors duration-100 ${
                        isActive ? 'border-cyan bg-cyan/[0.07] text-fg' : 'border-transparent text-fg-dim'
                      }`}
                    >
                      <Icon
                        size={14}
                        strokeWidth={1.7}
                        aria-hidden="true"
                        className={isActive ? 'text-cyan' : 'text-muted'}
                      />
                      <span className="text-sm">{command.label}</span>
                      {command.hint && (
                        <span className="ml-auto truncate pl-3 font-mono text-[10px] text-muted">{command.hint}</span>
                      )}
                      {isActive && (
                        <CornerDownLeft
                          size={12}
                          strokeWidth={1.8}
                          aria-hidden="true"
                          className={`shrink-0 text-cyan ${command.hint ? '' : 'ml-auto'}`}
                        />
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-2.5 font-mono text-[10px] text-muted">
              <span>↑↓ navigate · ↵ select</span>
              <span>
                {results.length} {results.length === 1 ? 'command' : 'commands'}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
