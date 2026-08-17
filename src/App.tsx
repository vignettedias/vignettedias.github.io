import { useCallback, useState } from 'react';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
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
import { UiModeProvider, useUiMode } from './hooks/uiMode';

function Site() {
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const { recruiter } = useUiMode();

  const open = useCallback((id: string) => setOpenProjectId(id), []);
  const close = useCallback(() => setOpenProjectId(null), []);

  return (
    <div className={recruiter ? 'calm' : undefined}>
      <Background />

      <a
        href="#main"
        className="data-label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:border focus:border-cyan focus:bg-ink focus:px-4 focus:py-3 focus:text-cyan"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />

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
