import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Diagram } from '../data/architectures';
import { accentClass } from '../lib/accent';
import { useUiMode } from '../hooks/uiMode';

interface ArchitectureDiagramProps {
  diagram: Diagram;
  /** Shown above the canvas. */
  caption: string;
  /** Clarifies what the diagram is and is not claiming. */
  disclaimer?: string;
}

/**
 * Nodes are real controls: click or tab to one and the panel below explains
 * that subsystem. The diagram is the explanation, not an illustration of it.
 */
export default function ArchitectureDiagram({ diagram, caption, disclaimer }: ArchitectureDiagramProps) {
  const [selectedId, setSelectedId] = useState<string>(diagram.nodes[0].id);
  const prefersReduced = useReducedMotion();
  const { recruiter } = useUiMode();
  const still = prefersReduced || recruiter;

  const selected = diagram.nodes.find((n) => n.id === selectedId) ?? diagram.nodes[0];
  const nodeById = (id: string) => diagram.nodes.find((n) => n.id === id)!;
  const isConnected = (a: string, b: string) => selectedId === a || selectedId === b;

  return (
    <div className="panel accent-cyan">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
        <span className="eyebrow">{caption}</span>
        <span className="font-mono text-[10px] tracking-[0.14em] text-muted">
          {diagram.nodes.length} stages · select to inspect
        </span>
      </div>

      <div className="overflow-x-auto overscroll-x-contain px-4 py-6">
        <div
          className="relative mx-auto"
          style={{ minWidth: `${Math.min(diagram.width, 720)}px`, height: `${diagram.height}px`, maxWidth: `${diagram.width}px` }}
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {diagram.edges.map(({ from, to }) => {
              const a = nodeById(from);
              const b = nodeById(to);
              const live = isConnected(from, to);
              return (
                <line
                  key={`${from}-${to}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={live ? 'rgba(58,231,255,0.6)' : 'rgba(120,145,170,0.18)'}
                  strokeWidth={live ? 1.4 : 1}
                  vectorEffect="non-scaling-stroke"
                  className={live && !still ? 'edge-live' : undefined}
                />
              );
            })}
          </svg>

          {diagram.nodes.map((node) => {
            const isSelected = node.id === selectedId;
            return (
              <div
                key={node.id}
                className={`absolute ${accentClass(node.accent)}`}
                style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%,-50%)' }}
              >
                <button
                  type="button"
                  data-active={isSelected}
                  onClick={() => setSelectedId(node.id)}
                  onFocus={() => setSelectedId(node.id)}
                  aria-pressed={isSelected}
                  aria-label={`${node.label} — show detail`}
                  className={`node-btn whitespace-nowrap px-3.5 py-2.5 text-fg-dim ${
                    node.kind === 'terminal' || node.kind === 'input'
                      ? 'font-display text-[13px] font-semibold tracking-tight'
                      : 'data-label'
                  }`}
                >
                  {node.label}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`border-t border-line px-4 py-4 ${accentClass(selected.accent)}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={still ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={still ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
          >
            <div className="data-label text-accent">{selected.label}</div>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-fg-dim">{selected.detail}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {disclaimer && (
        <p className="border-t border-line px-4 py-3 font-mono text-[10px] leading-relaxed text-muted">
          {disclaimer}
        </p>
      )}
    </div>
  );
}
