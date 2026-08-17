import { profile } from '../data/profile';

export default function Footer() {
  const links = Object.values(profile.links).filter((l) => l.href);

  return (
    <footer className="border-t border-line px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="display text-lg text-fg">{profile.name}</p>
          <p className="mt-1.5 font-mono text-[11px] tracking-wide text-muted">
            Computer Science × Cyber Security × AI
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          {links.length > 0 && (
            <ul className="flex flex-wrap gap-4">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href!}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="data-label text-muted transition-colors hover:text-cyan"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <p className="font-mono text-[10px] tracking-wide text-muted/70">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
