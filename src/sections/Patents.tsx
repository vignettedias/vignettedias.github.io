import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import PatentCard from '../components/PatentCard';
import { patents, publishedCount } from '../data/patents';

interface PatentsProps {
  onOpenProject: (id: string) => void;
}

export default function Patents({ onOpenProject }: PatentsProps) {
  return (
    <Section id="patents">
      <SectionHeading
        index="07"
        eyebrow="Intellectual property"
        title={`${publishedCount} published patents`}
        lede="Both grew out of systems in this portfolio rather than being filed separately from the engineering. Co-inventors are credited here."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {patents.map((patent, i) => (
          <Reveal key={patent.index} delay={i * 0.1} className="h-full">
            <PatentCard patent={patent} onOpenProject={onOpenProject} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <p className="mt-6 max-w-3xl font-mono text-[10px] leading-relaxed text-muted">
          Application numbers and publication status are stated as supplied by the inventor. No filing
          dates, jurisdictions or grant status are asserted, and nothing here represents legal
          verification of either application.
        </p>
      </Reveal>
    </Section>
  );
}
