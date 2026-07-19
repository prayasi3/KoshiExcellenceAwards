import PageBanner from "../components/layout/PageBanner";
import Section from "../components/layout/Section";
import SectionHeading from "../components/layout/SectionHeading";

export default function Gallery() {
  return (
    <>
      <PageBanner
        title="Award Gallery"
        subtitle="Explore moments from the Koshi Excellence Award."
      />
      <Section className="bg-white">
        <SectionHeading eyebrow="Highlights" title="Our Gallery" center />
        <p className="py-20 text-center text-slate-500">No gallery items available.</p>
      </Section>
    </>
  );
}
