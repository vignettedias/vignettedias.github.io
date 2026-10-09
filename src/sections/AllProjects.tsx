import { useState } from 'react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import ProjectCard from '../components/ProjectCard';
import GithubTelemetry from '../components/GithubTelemetry';
import { secondaryProjects } from '../data/projects';

interface AllProjectsProps {
  onOpen: (id: string) => void;
}

const filters = ['All', 'Security', 'AI', 'Systems'] as const;

const matches = (category: string, filter: (typeof filters)[number]) => {
  if (filter === 'All') return true;
  if (filter === 'Security') return /Security|Cryptography|Backend|Secure/i.test(category);
  if (filter === 'AI') return /AI|Forensics/i.test(category);
  return /Robotics|Hardware|Systems|Logic|C\+\+|Reverse/i.test(category);
};

export default function AllProjects({ onOpen }: AllProjectsProps) {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const visible = secondaryProjects.filter((p) => matches(p.category, filter));

  return (
    <Section continued>
      <SectionHeading
        index="06"
        eyebrow="Project explorer"
        title="The rest of the work"
        lede="Secure backends, cryptographic engines, robots, a 4-bit datapath, and two delisted Android games brought back to life — one of which turned out to have a camera ordering bug."
      />

      <Reveal className="mb-6">
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {filters.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              aria-pressed={filter === option}
              className={`data-label border px-3 py-2 transition-colors duration-200 ${
                filter === option
                  ? 'border-cyan bg-cyan/10 text-cyan'
                  : 'border-line-2 text-muted hover:border-fg-dim hover:text-fg'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <Reveal key={project.id} delay={Math.min(i, 5) * 0.05} className="h-full">
            <ProjectCard project={project} onOpen={onOpen} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <GithubTelemetry />
      </Reveal>
    </Section>
  );
}
