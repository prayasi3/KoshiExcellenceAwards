import PageBanner from "../components/layout/PageBanner";
import Section from "../components/layout/Section";
import SectionHeading from "../components/layout/SectionHeading";
import TeamGrid from "../components/team/TeamGrid";

export default function Teams() {
  return (
    <>
      <Section className="bg-white">
        <SectionHeading
          eyebrow="Leadership"
          title="Our Organizing Committee"
          description="The Koshi Excellence Award is guided by experienced professionals who ensure a transparent, credible, and impactful recognition process. Meet the individuals working together to celebrate excellence across Koshi Province."
          center
        />

        <TeamGrid />
      </Section>
    </>
  );
}