import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Github, Search } from 'lucide-react';
import { navSections, profile } from '../data/profile';
import { useActiveSection, useScrollProgress } from '../hooks/useSite';
import { useUiMode } from '../hooks/uiMode';

const sectionIds = navSections.map((s) => s.id);
const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent);

function ModeToggles({ compact = false }: { compact?: boolean }) {
  const { recruiter, toggleRecruiter, deepDive, toggleDeepDive } = useUiMode();

  const base =
    'data-label border px-2.5 py-1.5 transition-colors duration-200 whitespace-nowrap';

  return (
    <div className={compact ? 'flex gap-2' : 'hidden gap-2 lg:flex'}>
      <button
        type="button"
        onClick={toggleRecruiter}
        aria-pressed={recruiter}
        className={`${base} ${
          recruiter
            ? 'border-lime bg-lime/10 text-lime'
            : 'border-line-2 text-muted hover:border-lime/50 hover:text-lime'
        }`}
      >
        Recruiter
      </button>
      <button
        type="button"
        onClick={toggleDeepDive}
        aria-pressed={deepDive}
        className={`${base} ${
          deepDive
            ? 'border-cyan bg-cyan/10 text-cyan'
            : 'border-line-2 text-muted hover:border-cyan/50 hover:text-cyan'
        }`}
      >
        Deep dive
      </button>
    </div>
  );
}

export default function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const active = useActiveSection(sectionIds);
  const progress = useScrollProgress();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Section the user tapped, held until the menu has finished collapsing.
  const pendingNav = useRef<string | null>(null);

  /**
   * The native anchor jump is cancelled when the menu collapses out from under
   * it, so the mobile menu drives the scroll itself: record the target, close
   * the menu, then scroll once the exit animation is done and layout is stable.
   */
  const handleMobileNav = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    pendingNav.current = id;
    setOpen(false);
  };

  const flushPendingNav = () => {
    const id = pendingNav.current;
    pendingNav.current = null;
    if (!id) return;
    // No `behavior` — this inherits scroll-behavior from CSS, which is already
    // switched to `auto` under prefers-reduced-motion.
    document.getElementById(id)?.scrollIntoView({ block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-line bg-ink/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#home"
          className="group flex items-baseline gap-2.5"
          aria-label={`${profile.name} — back to top`}
        >
          <span className="font-display text-[15px] font-bold tracking-tight text-fg">VD</span>
          <span className="hidden font-mono text-[10px] tracking-[0.2em] text-muted transition-colors group-hover:text-cyan sm:inline">
            VIGHNESH_DAS
          </span>
        </a>

        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navSections.map((section) => {
              const isActive = active === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`data-label relative block px-3 py-2 transition-colors duration-200 ${
                      isActive ? 'text-cyan' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {section.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-2.5 -bottom-px h-px bg-cyan"
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            aria-keyshortcuts={isMac ? 'Meta+K' : 'Control+K'}
            className="group flex items-center gap-2 border border-line-2 px-2.5 py-1.5 text-muted transition-colors hover:border-cyan/60 hover:text-cyan"
          >
            <Search size={13} strokeWidth={1.8} aria-hidden="true" />
            <kbd className="hidden font-mono text-[10px] tracking-wider sm:inline">{isMac ? '⌘K' : 'Ctrl K'}</kbd>
          </button>
          <ModeToggles />
          {profile.links.github.href && (
            <a
              href={profile.links.github.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub profile"
              className="hidden text-muted transition-colors hover:text-cyan sm:block"
            >
              <Github size={17} strokeWidth={1.6} aria-hidden="true" />
            </a>
          )}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="border border-line-2 p-2 text-fg transition-colors hover:border-cyan/60 hover:text-cyan md:hidden"
          >
            {open ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Scroll progress */}
      <div className="h-px w-full bg-line" aria-hidden="true">
        <div
          className="h-px bg-gradient-to-r from-cyan to-violet transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <AnimatePresence onExitComplete={flushPendingNav}>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-line bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <nav aria-label="Sections" className="px-5 py-4 sm:px-8">
              <ul className="grid grid-cols-2 gap-x-4">
                {navSections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={(event) => handleMobileNav(event, section.id)}
                      className={`data-label block border-b border-line py-3 transition-colors ${
                        active === section.id ? 'text-cyan' : 'text-fg-dim'
                      }`}
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <ModeToggles compact />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
