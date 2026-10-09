import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import { dynastyDiagram, mmaifaDiagram } from '../data/architectures';
import { projectById } from '../data/projects';
import { accentClass } from '../lib/accent';
import { useUiMode } from '../hooks/uiMode';

function Internals({ projectId }: { projectId: string }) {
  const project = projectById(projectId)!;
  const { deepDive, recruiter } = useUiMode();
  const [open, setOpen] = useState(false);
  const prefersReduced = useReducedMotion();
  const expanded = deepDive || open;

  if (recruiter) return null;

  return (
    <div className={`panel mt-4 ${accentClass(project.accent)}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={expanded}
        className="data-label flex w-full items-center justify-between gap-3 px-4 py-3.5 text-fg-dim transition-colors hover:text-accent"
      >
        Engineering internals
        <ChevronDown
          size={15}
          strokeWidth={1.8}
          aria-hidden="true"
          className={`transition-transform duration-300 ${expanded ? 'rotate-180 text-accent' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={prefersReduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={prefersReduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="space-y-2.5 border-t border-line px-4 py-4">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-fg-dim">
                  <span className="mt-2 h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MmaifaDeepDive() {
  const project = projectById('mmaifa')!;

  return (
    <Section continued>
      <SectionHeading
        index="04"
        eyebrow="Deep dive · MMAIFA"
        title="Reasoning about images that lie"
        lede="Pixel realism stopped being evidence. MMAIFA runs four independent evidence streams, fuses them probabilistically, and is permitted to answer that it does not know."
      />

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
        <Reveal from="left" className="min-w-0">
          <div className="space-y-5">
            <div>
              <h3 className="data-label text-cyan">The problem</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-fg-dim">{project.problem}</p>
            </div>
            <div>
              <h3 className="data-label text-cyan">The approach</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-fg-dim">{project.approach}</p>
            </div>
            <Internals projectId="mmaifa" />
          </div>
        </Reveal>

        <Reveal from="right" delay={0.1} className="min-w-0">
          <ArchitectureDiagram
            diagram={mmaifaDiagram}
            caption="MMAIFA — forensic pipeline"
            disclaimer="Diagram reflects the architecture described in the AI-MMAIFA repository. The project is active research; false positives and false negatives remain under investigation."
          />
        </Reveal>
      </div>
    </Section>
  );
}

export function DynastyDeepDive() {
  const project = projectById('dynasty')!;

  return (
    <Section continued>
      <SectionHeading
        index="05"
        eyebrow="Deep dive · Dynasty"
        title="From the maker to the ledger"
        lede="An artisan mints a piece, the chain records it, and the buyer settles from their own wallet. The interesting part is what happens between those three events."
      />

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        <Reveal from="left" className="min-w-0">
          <div className="space-y-5">
            <div>
              <h3 className="data-label text-violet">The problem</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-fg-dim">{project.problem}</p>
            </div>
            <div>
              <h3 className="data-label text-violet">The approach</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-fg-dim">{project.approach}</p>
            </div>
            <Internals projectId="dynasty" />
          </div>
        </Reveal>

        <Reveal from="right" delay={0.1} className="min-w-0">
          <ArchitectureDiagram
            diagram={dynastyDiagram}
            caption="Dynasty — mint to settlement"
            disclaimer="Flow reflects the pages and modules present in the Dynasty repository. Wallet operations target the Sepolia test network."
          />
        </Reveal>
      </div>
    </Section>
  );
}
