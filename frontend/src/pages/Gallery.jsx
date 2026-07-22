import PageBanner from "../components/layout/PageBanner";
import Section from "../components/layout/Section";
import SectionHeading from "../components/layout/SectionHeading";
import GalleryGrid from "../components/gallery/GalleryGrid";

export default function Gallery() {
  return (
    <>
      <Section className="bg-white">
        <SectionHeading eyebrow="Highlights" title="Moments that inspire" subtitle="Revisit the people, pride, and celebration behind the Koshi Excellence Awards." center />
        <GalleryGrid />
      </Section>
    </>
  );
}
