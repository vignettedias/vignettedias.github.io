import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { skillGroups } from '../data/skills';
import { accentClass } from '../lib/accent';
import { useUiMode } from '../hooks/uiMode';

/**
 * No percentage bars — a self-assigned 87% means nothing. Instead each skill
 * carries the repository it is demonstrated in, which is checkable.
 */
export default function SkillMatrix() {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const prefersReduced = useReducedMotion();
  const { recruiter } = useUiMode();
  const still = prefersReduced || recruiter;

  const active = skillGroups.find((g) => g.id === activeId) ?? skillGroups[0];

  // Recruiter mode shows everything at once — no clicking to find the list.
  if (recruiter) {
    return (
      <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.id} className={`bg-panel p-5 ${accentClass(group.accent)}`}>
            <h3 className="data-label text-accent">{group.name}</h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="border border-line-2 px-2 py-1 font-mono text-[10px] text-fg-dim"
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <div role="tablist" aria-label="Skill categories" className="flex flex-col gap-px bg-line">
        {skillGroups.map((group) => {
          const isActive = group.id === activeId;
          return (
            <button
              key={group.id}
              type="button"
              role="tab"
              id={`skill-tab-${group.id}`}
              aria-selected={isActive}
              aria-controls={`skill-panel-${group.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(group.id)}
              onKeyDown={(e) => {
                const i = skillGroups.findIndex((g) => g.id === activeId);
                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                  e.preventDefault();
                  setActiveId(skillGroups[(i + 1) % skillGroups.length].id);
                } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                  e.preventDefault();
                  setActiveId(skillGroups[(i - 1 + skillGroups.length) % skillGroups.length].id);
                }
              }}
              className={`${accentClass(group.accent)} flex items-center justify-between gap-3 bg-panel px-4 py-3.5 text-left transition-colors duration-200 ${
                isActive ? 'text-accent' : 'text-fg-dim hover:text-fg'
              }`}
            >
              <span className="data-label">{group.name}</span>
              <span className="font-mono text-[10px] text-muted tabular-nums">
                {String(group.skills.length).padStart(2, '0')}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          role="tabpanel"
          id={`skill-panel-${active.id}`}
          aria-labelledby={`skill-tab-${active.id}`}
          initial={still ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={still ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className={`panel ticked p-5 ${accentClass(active.accent)}`}
        >
          <h3 className="display text-xl text-fg">{active.name}</h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-fg-dim">{active.context}</p>

          <ul className="mt-5 grid gap-px bg-line sm:grid-cols-2">
            {active.skills.map((skill) => (
              <li key={skill.name} className="flex flex-col gap-1 bg-panel px-3.5 py-3">
                <span className="text-sm text-fg">{skill.name}</span>
                {skill.evidence ? (
                  <span className="font-mono text-[10px] tracking-wide text-accent/85">
                    {skill.evidence}
                  </span>
                ) : (
                  <span className="font-mono text-[10px] tracking-wide text-muted/70">
                    coursework / lab tooling
                  </span>
                )}
              </li>
            ))}
          </ul>

          <p className="mt-4 font-mono text-[10px] leading-relaxed text-muted">
            Coloured labels name the repository where the skill is demonstrated. Unlabelled entries are
            tooling used in coursework and lab work rather than in a public repository.
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
