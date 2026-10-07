import { useTheme } from './hooks/useAnimations';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { DomainSection } from './sections/DomainSection';
import { ModulesSection } from './sections/ModulesSection';
import { MilestonesSection } from './sections/MilestonesSection';
import { DocumentsSection, PresentationsSection } from './sections/DocumentsSection';
import { TeamSection } from './sections/TeamSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './sections/Footer';

export default function App() {
  const [theme, toggleTheme] = useTheme();

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main id="main-content">
        <HeroSection />
        <DomainSection />
        <ModulesSection />
        <MilestonesSection />
        <DocumentsSection />
        <PresentationsSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
