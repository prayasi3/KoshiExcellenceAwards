import PageBanner from "../components/layout/PageBanner";
import Section from "../components/layout/Section";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";

export default function Contact() {
  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="Have a question about the Koshi Excellence Award, nominations, or sponsorships? Send us a message and our team will get back to you."
      />

      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C9A84C]">
              Get In Touch
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-[#0B1F3A]">
              We'd Love to Hear From You
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Whether you're interested in nominating someone, becoming a
              sponsor, or just want to learn more about the awards, reach out
              using the details below or send us a message directly on
              WhatsApp.
            </p>

            <div className="mt-8">
              <ContactInfo />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}