import PageBanner from "../components/layout/PageBanner";
import Section from "../components/layout/Section";
import SectionHeading from "../components/layout/SectionHeading";
import SpeakerGrid from "../components/speakers/SpeakerGrid";

export default function Speakers() {
  return (
    <>
      <Section className="bg-white">
        <SectionHeading
          eyebrow="Event"
          title="Our Speakers"
          description="The Koshi Excellence Award brings together respected professionals, innovators, and thought leaders from diverse fields. Explore the speakers who contribute their knowledge, experience, and vision to make each edition of the event memorable."
          center
        />

        <SpeakerGrid />
      </Section>
    </>
  );
}