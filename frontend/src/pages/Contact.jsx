import PageBanner from "../components/layout/PageBanner";
import Section from "../components/layout/Section";
import SectionHeading from "../components/layout/SectionHeading";

export default function Contact() {
  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="Get in touch with the Koshi Excellence Award."
      />
      <Section className="bg-white">
        <SectionHeading eyebrow="Connect" title="Contact Us" center />
        <p className="py-20 text-center text-slate-500">
          No contact information available.
        </p>
      </Section>
    </>
  );
}
