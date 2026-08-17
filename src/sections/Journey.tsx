import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import Timeline from '../components/Timeline';
import { credentials, education } from '../data/profile';

export default function Journey() {
  return (
    <Section id="journey">
      <SectionHeading
        index="09"
        eyebrow="Engineering journey"
        title="How the work fits together"
        lede="Dated where a date exists; the rest grouped by discipline rather than invented chronology."
      />

      <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-12">
        <Timeline />

        <Reveal from="right" delay={0.1} className="space-y-6">
          <div className="panel accent-cyan ticked p-5">
            <h3 className="data-label text-cyan">Education</h3>
            <ul className="mt-4 space-y-5">
              {education.map((entry) => (
                <li key={entry.degree}>
                  <p className="text-sm leading-snug font-medium text-fg">{entry.degree}</p>
                  <p className="mt-1 text-xs text-fg-dim">{entry.institution}</p>
                  {(entry.period || entry.detail) && (
                    <p className="mt-1.5 font-mono text-[10px] tracking-wide text-muted">
                      {[entry.period, entry.detail].filter(Boolean).join('  ·  ')}
                    </p>
                  )}
                  {entry.coursework.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {entry.coursework.map((course) => (
                        <li
                          key={course}
                          className="border border-line-2 px-2 py-1 font-mono text-[10px] text-fg-dim"
                        >
                          {course}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="panel accent-lime ticked p-5">
            <h3 className="data-label text-lime">Certifications & awards</h3>
            <ul className="mt-4 space-y-4">
              {credentials.map((item) => (
                <li key={item.title}>
                  <p className="text-sm leading-snug text-fg">{item.title}</p>
                  <p className="mt-1 font-mono text-[10px] tracking-wide text-muted">
                    {[item.issuer, item.period].filter(Boolean).join('  ·  ')}
                  </p>
                  {item.detail && <p className="mt-1.5 text-xs leading-relaxed text-fg-dim">{item.detail}</p>}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
