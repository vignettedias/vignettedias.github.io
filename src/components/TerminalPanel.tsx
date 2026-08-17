import { useEffect, useRef, useState, type FormEvent } from 'react';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { skillGroups } from '../data/skills';
import { patents } from '../data/patents';

type Line = { kind: 'in' | 'out' | 'err'; text: string };

const COMMANDS = ['help', 'whoami', 'about', 'skills', 'projects', 'patents', 'github', 'contact', 'clear'] as const;

/**
 * A fixed command table. No evaluation, no shell, nothing dynamic — the entire
 * surface is the nine strings below.
 */
function run(input: string): Line[] | 'clear' {
  const cmd = input.trim().toLowerCase();

  switch (cmd) {
    case '':
      return [];
    case 'clear':
      return 'clear';
    case 'help':
      return [
        { kind: 'out', text: 'Available commands:' },
        { kind: 'out', text: COMMANDS.join('  ') },
      ];
    case 'whoami':
      return [{ kind: 'out', text: 'vighnesh_das' }];
    case 'about':
      return [
        { kind: 'out', text: `${profile.name} — ${profile.role}` },
        { kind: 'out', text: profile.disciplines.join(' · ') },
        { kind: 'out', text: profile.statement },
      ];
    case 'skills':
      return skillGroups.map((g) => ({
        kind: 'out' as const,
        text: `${g.name.padEnd(22)} ${g.skills.length} entries`,
      }));
    case 'projects':
      return projects.map((p) => ({
        kind: 'out' as const,
        text: `${p.patented ? '[patented] ' : '            '}${p.title} — ${p.category}`,
      }));
    case 'patents':
      return [
        { kind: 'out', text: `${patents.length} patents on file` },
        ...patents.map((p) => ({
          kind: 'out' as const,
          text: `${p.index}  ${p.title.padEnd(9)} ${p.statusLabel.padEnd(24)} ${p.applicationNumber}`,
        })),
      ];
    case 'github':
      return [{ kind: 'out', text: profile.links.github.href ?? 'not provided' }];
    case 'contact': {
      const available = Object.values(profile.links).filter((l) => l.href);
      if (available.length === 0) return [{ kind: 'out', text: 'No contact links published yet.' }];
      return available.map((l) => ({ kind: 'out' as const, text: `${l.label.padEnd(10)} ${l.href}` }));
    }
    default:
      return [{ kind: 'err', text: `command not found: ${cmd} — type 'help'` }];
  }
}

export default function TerminalPanel() {
  const [lines, setLines] = useState<Line[]>([
    { kind: 'out', text: "vd-console — type 'help' to list commands" },
  ]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [lines]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const entry = value;
    const result = run(entry);
    setHistory((h) => (entry.trim() ? [entry, ...h] : h));
    setHistoryIndex(-1);

    if (result === 'clear') {
      setLines([]);
    } else {
      setLines((prev) => [...prev, { kind: 'in', text: entry }, ...result]);
    }
    setValue('');
  };

  return (
    <div
      className="panel accent-lime ticked font-mono text-xs"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="eyebrow">vd-console</span>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-line-2" />
          <span className="h-1.5 w-1.5 rounded-full bg-line-2" />
          <span className="h-1.5 w-1.5 rounded-full bg-lime/70" />
        </span>
      </div>

      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
        className="h-56 overflow-y-auto px-4 py-3 leading-relaxed"
      >
        {lines.map((line, i) => (
          <p
            key={`${i}-${line.text}`}
            className={
              line.kind === 'in' ? 'text-fg' : line.kind === 'err' ? 'text-magenta' : 'text-fg-dim'
            }
          >
            {line.kind === 'in' && <span className="text-lime">$ </span>}
            <span className="break-words whitespace-pre-wrap">{line.text}</span>
          </p>
        ))}
      </div>

      <form onSubmit={submit} className="flex items-center gap-2 border-t border-line px-4 py-2.5">
        <label htmlFor="terminal-input" className="text-lime" aria-label="Terminal prompt">
          $
        </label>
        <input
          id="terminal-input"
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp' && history.length > 0) {
              e.preventDefault();
              const next = Math.min(historyIndex + 1, history.length - 1);
              setHistoryIndex(next);
              setValue(history[next]);
            } else if (e.key === 'ArrowDown') {
              e.preventDefault();
              const next = historyIndex - 1;
              setHistoryIndex(next);
              setValue(next >= 0 ? history[next] : '');
            }
          }}
          autoComplete="off"
          spellCheck={false}
          placeholder="help"
          aria-label="Enter a command"
          className="w-full bg-transparent text-fg outline-none placeholder:text-muted/50"
        />
      </form>
    </div>
  );
}
