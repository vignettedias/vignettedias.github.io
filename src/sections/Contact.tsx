import { Github, Linkedin, Mail, Terminal } from 'lucide-react';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import ResumeButton from '../components/ResumeButton';
import { profile } from '../data/profile';
import { useUiMode } from '../hooks/uiMode';

const icons = { github: Github, linkedin: Linkedin, tryhackme: Terminal, email: Mail } as const;

export default function Contact() {
  const { recruiter } = useUiMode();
  const entries = Object.entries(profile.links).filter(([, link]) => link.href) as [
    keyof typeof icons,
    { label: string; href: string; handle: string | null },
  ][];

  return (
    <Section id="contact">
      <Reveal>
        <div className="flex items-center gap-4">
          {!recruiter && <span className="data-label text-muted tabular-nums">11</span>}
          <span className="eyebrow">Contact</span>
          <span className="hairline flex-1" aria-hidden="true" />
        </div>

        <h2 className="display mt-6 text-[clamp(2.2rem,8vw,4.5rem)] text-fg">
          Let's build something
          <br />
          <span className="text-cyan">secure.</span>
        </h2>

        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-fg-dim md:text-base">
          Open to engineering roles, security research and collaboration on systems where correctness
          actually matters. The fastest way to see how I work is the code.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          {entries.map(([key, link]) => {
            const Icon = icons[key] ?? Mail;
            return (
              <a
                key={key}
                href={link.href}
                target={key === 'email' ? undefined : '_blank'}
                rel="noreferrer noopener"
                className="data-label inline-flex items-center gap-2 border border-line-2 px-5 py-3 text-fg-dim transition-all duration-200 hover:border-cyan hover:text-cyan"
              >
                <Icon size={14} strokeWidth={1.7} aria-hidden="true" />
                {link.label}
                {link.handle && <span className="text-muted">/ {link.handle}</span>}
              </a>
            );
          })}
          <ResumeButton variant="solid" />
        </div>


      </Reveal>
    </Section>
  );
}
