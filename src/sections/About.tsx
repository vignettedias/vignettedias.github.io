import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import TerminalPanel from '../components/TerminalPanel';
import { profile } from '../data/profile';
import { useUiMode } from '../hooks/uiMode';

export default function About() {
  const { recruiter } = useUiMode();

  return (
    <Section id="about">
      <SectionHeading
        index="01"
        eyebrow="About"
        title="What I actually build"
        lede={profile.statement}
      />

      <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
        <Reveal className="space-y-5">
          {profile.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-[15px] leading-relaxed text-fg-dim md:text-base">
              {paragraph}
            </p>
          ))}
        </Reveal>

        {!recruiter && (
          <Reveal from="right" delay={0.1}>
            <TerminalPanel />
            <p className="mt-3 font-mono text-[10px] leading-relaxed text-muted">
              Front-end simulation with a fixed command table. Nothing is evaluated or executed.
            </p>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
