import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import { securityDiagram } from '../data/architectures';

export default function SecurityConcept() {
  return (
    <Section continued>
      <SectionHeading
        index="10"
        eyebrow="Security / systems concept"
        title="The shape security keeps taking"
        lede="A reference model, not a deployment. It shows how the controls in SourceForm and SecureDocs relate to each other — one ingress, verification before logic, and a store that assumes the layers above it will eventually fail."
      />

      <Reveal>
        <div className="mx-auto max-w-3xl">
          <ArchitectureDiagram
            diagram={securityDiagram}
            caption="Reference topology"
            disclaimer="Illustrative reference model. Individual projects implement subsets of this; no single deployment matches it exactly."
          />
        </div>
      </Reveal>
    </Section>
  );
}
