import PageBanner from "../components/layout/PageBanner";
import Section from "../components/layout/Section";
import SectionHeading from "../components/layout/SectionHeading";
import HonoreeGrid from "../components/honorees/HonoreeGrid";

export default function Honorees() {
  return (
    <>
      <PageBanner
        title="Award Honorees"
        subtitle="Explore the honorees of the Koshi Excellence Award."
      />
      <Section className="bg-white">
        <SectionHeading eyebrow="Recognition" title="Our Honorees" center />
        <HonoreeGrid />
      </Section>
    </>
  );
}
