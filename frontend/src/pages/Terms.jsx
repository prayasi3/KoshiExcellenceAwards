import PageBanner from "../components/layout/PageBanner";
import Section from "../components/layout/Section";

const LAST_UPDATED = "August 15, 2026";

export default function Terms() {
  return (
    <>
      <PageBanner
        title="Terms of Use"
        subtitle="The terms that govern your use of the Koshi Excellence Award website and participation in the awards."
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Terms of Use" },
        ]}
      />

      <Section className="bg-white">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-slate-500">Last updated: {LAST_UPDATED}</p>

          <p className="mt-6 leading-7 text-slate-600">
            These Terms of Use ("Terms") govern your access to and use of
            koshiexcellenceaward.com (the "Site"), operated by Nayan Media
            Foundation ("we", "us", "our") in connection with the Koshi
            Excellence Award. By accessing or using the Site, submitting a
            nomination, or registering for the event, you agree to be bound
            by these Terms. If you do not agree, please do not use the
            Site.
          </p>

          {/* 1 */}
          <h2 className="mt-10 font-heading text-2xl font-bold text-[#0B1F3A]">
            1. About the Koshi Excellence Award
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            The Koshi Excellence Award is organized by Nayan Media
            Foundation to recognize individuals and organizations whose
            work has positively contributed to communities across Koshi
            Province, Nepal. The Site provides information about award
            categories, recipients, honorees, speakers, sponsors, and
            related events.
          </p>

          {/* 2 */}
          <h2 className="mt-10 font-heading text-2xl font-bold text-[#0B1F3A]">
            2. Eligibility and Use of the Site
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            You may use the Site only for lawful purposes and in accordance
            with these Terms. You agree not to:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600">
            <li>Use the Site in any way that violates applicable Nepali or international law</li>
            <li>Attempt to gain unauthorized access to the Site, its servers, or any connected systems</li>
            <li>Submit false, misleading, or fraudulent information in a nomination, registration, or sponsorship form</li>
            <li>Interfere with or disrupt the Site's functionality, including through malware, scraping, or automated data collection</li>
            <li>Use content from the Site for commercial purposes without our prior written consent</li>
          </ul>

          {/* 3 */}
          <h2 className="mt-10 font-heading text-2xl font-bold text-[#0B1F3A]">
            3. Nominations and Selection
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            Nominations submitted through the Site are reviewed by the
            Koshi Excellence Award organizing committee. Submitting a
            nomination does not guarantee selection as a recipient or
            honoree. We reserve the right, at our sole discretion, to:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600">
            <li>Accept, reject, or request clarification on any nomination</li>
            <li>Verify the accuracy of information submitted about a nominee</li>
            <li>Modify award categories, criteria, or the number of recipients between editions</li>
            <li>Postpone, reschedule, or modify the format of the award ceremony</li>
          </ul>

          {/* 4 */}
          <h2 className="mt-10 font-heading text-2xl font-bold text-[#0B1F3A]">
            4. Event Registration and Conduct
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            If you register to attend, sponsor, or speak at the Koshi
            Excellence Award ceremony, you agree to provide accurate
            registration details and to comply with the venue's rules and
            any event-specific guidelines communicated to you. We reserve
            the right to refuse entry or remove any attendee whose conduct
            is disruptive, unlawful, or unsafe.
          </p>

          {/* 5 */}
          <h2 className="mt-10 font-heading text-2xl font-bold text-[#0B1F3A]">
            5. Intellectual Property
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            All content on the Site — including the Koshi Excellence Award
            name, logo, trophy design, text, graphics, layout, and
            photography — is owned by or licensed to Nayan Media
            Foundation and is protected by applicable copyright and
            trademark laws. You may view and share content from the Site
            for personal, non-commercial purposes, but may not reproduce,
            modify, distribute, or use it for commercial purposes without
            our prior written permission.
          </p>

          {/* 6 */}
          <h2 className="mt-10 font-heading text-2xl font-bold text-[#0B1F3A]">
            6. Photography and Media Release
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            By attending the Koshi Excellence Award ceremony or related
            events, or by being featured as a recipient, honoree, speaker,
            or sponsor, you grant Nayan Media Foundation a non-exclusive,
            royalty-free right to use your name, likeness, photograph, and
            video footage captured at the event for promotional,
            editorial, and archival purposes on the Site, in event
            materials, and across our social media channels, unless you
            notify us otherwise in writing in advance.
          </p>

          {/* 7 */}
          <h2 className="mt-10 font-heading text-2xl font-bold text-[#0B1F3A]">
            7. Third-Party Links
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            The Site may contain links to third-party websites, including
            sponsor and partner sites, that are not owned or controlled by
            us. We are not responsible for the content, privacy practices,
            or terms of any third-party website, and you access them at
            your own risk.
          </p>

          {/* 8 */}
          <h2 className="mt-10 font-heading text-2xl font-bold text-[#0B1F3A]">
            8. Disclaimer of Warranties
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            The Site and its content are provided "as is" and "as
            available" without warranties of any kind, whether express or
            implied. While we strive to keep information about categories,
            recipients, honorees, and events accurate and up to date, we do
            not warrant that the Site will be error-free, uninterrupted, or
            free of viruses or other harmful components.
          </p>

          {/* 9 */}
          <h2 className="mt-10 font-heading text-2xl font-bold text-[#0B1F3A]">
            9. Limitation of Liability
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            To the fullest extent permitted by applicable law, Nayan Media
            Foundation shall not be liable for any indirect, incidental,
            special, or consequential damages arising out of or in
            connection with your use of the Site, your nomination or
            application, or your attendance at the Koshi Excellence Award
            ceremony.
          </p>

          {/* 10 */}
          <h2 className="mt-10 font-heading text-2xl font-bold text-[#0B1F3A]">
            10. Changes to These Terms
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            We may revise these Terms from time to time. Changes will take
            effect once posted on this page with an updated "Last updated"
            date. Your continued use of the Site after changes are posted
            constitutes acceptance of the revised Terms.
          </p>

          {/* 11 */}
          <h2 className="mt-10 font-heading text-2xl font-bold text-[#0B1F3A]">
            11. Governing Law
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            These Terms are governed by and construed in accordance with
            the laws of Nepal, without regard to conflict of law
            principles. Any disputes arising from these Terms or your use
            of the Site shall be subject to the exclusive jurisdiction of
            the competent courts of Nepal.
          </p>

          {/* 12 */}
          <h2 className="mt-10 font-heading text-2xl font-bold text-[#0B1F3A]">
            12. Contact Us
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            Questions about these Terms can be directed to:
          </p>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 leading-7 text-slate-600">
            <p className="font-semibold text-[#0B1F3A]">
              Nayan Media Foundation
            </p>
            <p>Koshi Excellence Award</p>
            <p>Soaltee Westend, Itahari, Koshi Province, Nepal</p>
            <p>
              Email:{" "}
              
                < a href="mailto:info@koshiexcellenceaward.com"
                className="text-[#0B1F3A] underline decoration-[#C9A84C] underline-offset-2 hover:text-[#C9A84C]"
              >
                info@koshiexcellenceaward.com
              </a>
            </p>
            <p>
              Phone:{" "}
              
                < a href="tel:+97714000000"
                className="text-[#0B1F3A] underline decoration-[#C9A84C] underline-offset-2 hover:text-[#C9A84C]"
              >
                +977-1-4000000
              </a>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}