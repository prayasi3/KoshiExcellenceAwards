import PageBanner from "../components/layout/PageBanner";
import Section from "../components/layout/Section";
import SectionHeading from "../components/layout/SectionHeading";

export default function Speakers() {
  return (
    <>
      <PageBanner
        title="Award Speakers"
        subtitle="Explore the speakers of the Koshi Excellence Award."
      />
      <Section className="bg-white">
        <SectionHeading eyebrow="Event" title="Our Speakers" center />
        <p className="py-20 text-center text-slate-500">No speakers available.</p>
      </Section>
    </>
  );
}
