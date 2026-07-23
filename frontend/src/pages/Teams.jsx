import PageBanner from "../components/layout/PageBanner";
import Section from "../components/layout/Section";
import TeamGrid from "../components/team/TeamGrid";

export default function Teams() {
  return (
    <>
      <Section className="bg-white">
        <TeamGrid />
      </Section>
    </>
  );
}