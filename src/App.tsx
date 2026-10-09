import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import CommandPalette from './components/CommandPalette';
import TechMarquee from './components/TechMarquee';
import About from './sections/About';
import EngineeringDNA from './sections/EngineeringDNA';
import FeaturedProjects from './sections/FeaturedProjects';
import { DynastyDeepDive, MmaifaDeepDive } from './sections/DeepDives';
import AllProjects from './sections/AllProjects';
import Patents from './sections/Patents';
import Skills from './sections/Skills';
import Journey from './sections/Journey';
import SecurityConcept from './sections/SecurityConcept';
import Contact from './sections/Contact';
import { projectById } from './data/projects';
import { UiModeProvider, useStill, useUiMode } from './hooks/uiMode';

/** Feeds the pointer position to whichever card is under it, for the CSS spotlight. */
function useCardSpotlight(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    let current: HTMLElement | null = null;

    const clear = () => {
      current?.style.removeProperty('--mx');
      current?.style.removeProperty('--my');
      current = null;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const card = (e.target as Element | null)?.closest?.<HTMLElement>('.panel-hover') ?? null;
      if (card !== current) clear();
      if (!card) return;
      current = card;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', clear);
    return () => {
      clear();
      document.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', clear);
    };
  }, [enabled]);
}

function Site() {
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef(0);
  const { recruiter } = useUiMode();
  const still = useStill();
  useCardSpotlight(!still);

  const open = useCallback((id: string) => setOpenProjectId(id), []);
  const close = useCallback(() => setOpenProjectId(null), []);
  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);
  const showToast = useCallback((message: string) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  }, []);

  // ⌘K / Ctrl+K anywhere opens the palette (and closes it again).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpenProjectId(null);
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className={recruiter ? 'calm' : undefined}>
      <Background />

      <a
        href="#main"
        className="data-label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:border focus:border-cyan focus:bg-ink focus:px-4 focus:py-3 focus:text-cyan"
      >
        Skip to content
      </a>

      <Navbar onOpenPalette={openPalette} />

      <main id="main" className="overflow-x-clip">
        <Hero />
        {!recruiter && <TechMarquee />}

        {recruiter ? (
          /* Recruiter mode: the résumé-shaped reading order — work, IP, skills, then background. */
          <>
            <FeaturedProjects onOpen={open} />
            <Patents onOpenProject={open} />
            <Skills />
            <AllProjects onOpen={open} />
            <About />
            <Journey />
          </>
        ) : (
          <>
            <About />
            <EngineeringDNA />
            <FeaturedProjects onOpen={open} />
            <MmaifaDeepDive />
            <DynastyDeepDive />
            <AllProjects onOpen={open} />
            <Patents onOpenProject={open} />
            <Skills />
            <Journey />
            <SecurityConcept />
          </>
        )}

        <Contact />
      </main>

      <Footer />

      <ProjectModal project={openProjectId ? (projectById(openProjectId) ?? null) : null} onClose={close} />
      <CommandPalette open={paletteOpen} onClose={closePalette} onOpenProject={open} onToast={showToast} />

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4">
        <AnimatePresence>
          {toast && (
            <motion.p
              key={toast}
              initial={still ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={still ? undefined : { opacity: 0, y: 6 }}
              className="panel accent-lime border-lime/50 px-4 py-2.5 font-mono text-[11px] text-lime"
            >
              {toast}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <UiModeProvider>
      <Site />
    </UiModeProvider>
  );
}
