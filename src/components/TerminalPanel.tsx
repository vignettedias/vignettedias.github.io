import { useEffect, useRef, useState, type FormEvent } from 'react';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { skillGroups } from '../data/skills';
import { patents, publishedCount } from '../data/patents';
import type { RepoSummary } from '../data/github';
import { useGithub } from '../hooks/useGithub';
import { relativeTime } from '../lib/time';

/** `pre` lines keep their spacing and scroll sideways instead of wrapping. */
type Line = { kind: 'in' | 'out' | 'err' | 'pre'; text: string };

const COMMANDS = [
  'help',
  'whoami',
  'about',
  'neofetch',
  'ls',
  'projects',
  'repos',
  'skills',
  'patents',
  'github',
  'contact',
  'hire',
  'date',
  'clear',
] as const;

const LOGO = [
  '__     ______  ',
  '\\ \\   / /  _ \\ ',
  ' \\ \\ / /| | | |',
  '  \\ V / | |_| |',
  '   \\_/  |____/ ',
  '               ',
  '               ',
];

function neofetch(repos: RepoSummary[]): Line[] {
  const languages = new Set(repos.map((r) => r.language).filter(Boolean)).size;
  const info = [
    'vighnesh@vd-console',
    '-------------------',
    'Role:    B.Tech Cyber Security',
    'Host:    VIT Vellore · CGPA 8.91',
    `Patents: ${publishedCount} published`,
    `Repos:   ${repos.length} public · ${languages} languages`,
    'Focus:   security × AI × systems',
  ];
  return LOGO.map((row, i) => ({ kind: 'pre' as const, text: `${row}  ${info[i] ?? ''}` }));
}

/**
 * A fixed command table. No evaluation, no shell, nothing dynamic — the entire
 * surface is the strings below. Only the first word is read.
 */
function run(input: string, repos: RepoSummary[]): Line[] | 'clear' {
  const cmd = input.trim().toLowerCase().split(/\s+/)[0] ?? '';

  if (cmd === 'sudo') {
    return [{ kind: 'err', text: 'vighnesh is not in the sudoers file. This incident will be reported.' }];
  }

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
    case 'neofetch':
      return neofetch(repos);
    case 'ls':
      return [
        {
          kind: 'out',
          text: projects.map((p) => `${p.id}/`).join('  '),
        },
      ];
    case 'repos':
      return [
        { kind: 'out', text: `${repos.length} public repositories — most recent first` },
        ...repos.map((r) => ({
          kind: 'pre' as const,
          text: `${r.name.padEnd(30)} ${(r.language ?? '—').padEnd(11)} ${relativeTime(r.activeAt)}`,
        })),
      ];
    case 'hire':
      return [
        { kind: 'out', text: 'Open to engineering roles, security research and collaboration.' },
        ...(profile.links.email.handle ? [{ kind: 'out' as const, text: `→ ${profile.links.email.handle}` }] : []),
        { kind: 'out', text: `→ résumé: ${profile.siteUrl.replace(/\/$/, '')}${profile.resumePath}` },
      ];
    case 'date':
      return [{ kind: 'out', text: new Date().toString() }];
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
  const { repos } = useGithub();
  const [lines, setLines] = useState<Line[]>([
    { kind: 'out', text: "vd-console — type 'help' to list commands, or try 'neofetch'" },
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
    const result = run(entry, repos);
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
              line.kind === 'in'
                ? 'text-fg'
                : line.kind === 'err'
                  ? 'text-magenta'
                  : line.kind === 'pre'
                    ? 'overflow-x-auto text-lime/90'
                    : 'text-fg-dim'
            }
          >
            {line.kind === 'in' && <span className="text-lime">$ </span>}
            <span className={line.kind === 'pre' ? 'whitespace-pre' : 'break-words whitespace-pre-wrap'}>
              {line.text}
            </span>
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
            if (e.key === 'Tab') {
              // Complete the command name; list the options when it is ambiguous.
              const partial = value.trim().toLowerCase();
              if (!partial) return;
              e.preventDefault();
              const options = COMMANDS.filter((c) => c.startsWith(partial));
              if (options.length === 1) setValue(options[0]);
              else if (options.length > 1) {
                setLines((prev) => [...prev, { kind: 'in', text: value }, { kind: 'out', text: options.join('  ') }]);
              }
            } else if (e.key === 'ArrowUp' && history.length > 0) {
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
