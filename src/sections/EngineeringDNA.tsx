import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import { principles } from '../data/journey';

export default function EngineeringDNA() {
  return (
    <Section continued>
      <SectionHeading
        index="02"
        eyebrow="Method"
        title="Engineering DNA"
        lede="Five commitments that show up in every repository, whether the artefact is a forensic pipeline or a 4-bit datapath."
      />

      <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((principle, i) => (
          <Reveal key={principle.id} delay={i * 0.05} className="h-full">
            <div className="accent-cyan flex h-full flex-col bg-panel p-6 transition-colors duration-300 hover:bg-panel-2">
              <span className="font-mono text-[11px] text-cyan tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="display mt-3 text-xl text-fg">{principle.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-dim">{principle.body}</p>
            </div>
          </Reveal>
        ))}
        <div className="hidden bg-panel lg:block" aria-hidden="true" />
      </div>
    </Section>
  );
}
