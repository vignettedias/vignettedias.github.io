import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import SkillMatrix from '../components/SkillMatrix';

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        index="08"
        eyebrow="Technical skills"
        title="Where each of these was used"
        lede="No percentages. Every entry names the repository that demonstrates it, so the claim can be checked rather than trusted."
      />
      <Reveal>
        <SkillMatrix />
      </Reveal>
    </Section>
  );
}
