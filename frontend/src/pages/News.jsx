import PageBanner from "../components/layout/PageBanner";
import Section from "../components/layout/Section";
import SectionHeading from "../components/layout/SectionHeading";
import NewsList from "../components/news/NewsList";

export default function News() {
  return (
    <>
      <PageBanner title="News & Updates" subtitle="Stay connected with the latest announcements, stories, and milestones from the Koshi Excellence Awards." />
      <Section className="bg-white">
        <SectionHeading eyebrow="From the awards" title="Latest stories" subtitle="Discover the people, partnerships, and moments shaping this celebration of excellence." center />
        <NewsList />
      </Section>
    </>
  );
}
