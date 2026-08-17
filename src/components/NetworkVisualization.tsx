import { useState } from 'react';
import { heroNodes } from '../data/architectures';
import { accentClass } from '../lib/accent';
import { useUiMode } from '../hooks/uiMode';

/** Every discipline connects to every other — that overlap is the point. */
const edges: [string, string][] = [
  ['ai', 'security'],
  ['ai', 'software'],
  ['security', 'software'],
  ['security', 'systems'],
  ['software', 'systems'],
  ['ai', 'systems'],
];

export default function NetworkVisualization() {
  const [activeId, setActiveId] = useState<string>('security');
  const { recruiter } = useUiMode();
  const active = heroNodes.find((n) => n.id === activeId) ?? heroNodes[0];
  const position = (id: string) => heroNodes.find((n) => n.id === id)!;

  return (
    <div className="panel accent-cyan ticked p-5">
      <div className="flex items-center justify-between">
        <span className="eyebrow">Domain map</span>
        <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-muted">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />
          ONLINE
        </span>
      </div>

      <div className="relative mt-4 aspect-square w-full">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {edges.map(([a, b]) => {
            const from = position(a);
            const to = position(b);
            const live = !recruiter && (activeId === a || activeId === b);
            return (
              <line
                key={`${a}-${b}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={live ? 'rgba(58,231,255,0.55)' : 'rgba(120,145,170,0.16)'}
                strokeWidth={live ? 0.45 : 0.3}
                vectorEffect="non-scaling-stroke"
                className={live ? 'edge-live' : undefined}
              />
            );
          })}
        </svg>

        {heroNodes.map((node) => {
          const isActive = node.id === activeId;
          return (
            <div
              key={node.id}
              className={`absolute ${accentClass(node.accent)}`}
              style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%,-50%)' }}
            >
              {isActive && !recruiter && (
                <span
                  className="pulse-ring absolute inset-0 -z-10 rounded-full border border-accent"
                  aria-hidden="true"
                />
              )}
              <button
                type="button"
                data-active={isActive}
                onMouseEnter={() => setActiveId(node.id)}
                onFocus={() => setActiveId(node.id)}
                onClick={() => setActiveId(node.id)}
                aria-pressed={isActive}
                className="node-btn data-label whitespace-nowrap px-3 py-2 text-fg-dim"
              >
                {node.label}
              </button>
            </div>
          );
        })}
      </div>

      <div className={`mt-4 border-t border-line pt-4 ${accentClass(active.accent)}`}>
        <div className="data-label text-accent">{active.label}</div>
        <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5">
          {active.items.map((item) => (
            <li key={item} className="font-mono text-[11px] text-fg-dim">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
