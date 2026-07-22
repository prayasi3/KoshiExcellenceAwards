import PageBanner from "../components/layout/PageBanner";
import Section from "../components/layout/Section";
import SectionHeading from "../components/layout/SectionHeading";
import RecipientGrid from "../components/recipients/RecipientGrid";

export default function Recipients() {
  return (
    <>
      <Section className="bg-white">
        <SectionHeading
          eyebrow="Celebrating Excellence"
          title="Honouring Remarkable Achievements"
          subtitle="Every recipient represents a story of dedication and meaningful impact.
          We proudly celebrate their contributions to our communities and beyond."
          center
        />

        <RecipientGrid />
      </Section>
    </>
  );
}
