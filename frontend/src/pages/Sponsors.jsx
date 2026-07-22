import PageBanner from "../components/layout/PageBanner";
import Section from "../components/layout/Section";
import SectionHeading from "../components/layout/SectionHeading";
import SponsorGrid from "../components/sponsors/SponsorGrid";

export default function Sponsors() {
  return (
    <>
      <Section className="bg-white">
        <SectionHeading eyebrow="Partners in excellence" title="Supporting a stronger Koshi" subtitle="Our partners share a belief in celebrating achievement, inspiring ambition, and creating a meaningful impact across Koshi Province." center />
        <SponsorGrid />
      </Section>
    </>
  );
}
