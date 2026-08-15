import PageBanner from "../components/layout/PageBanner";
import Section from "../components/layout/Section";

const LAST_UPDATED = "August 15, 2026";

export default function Privacy() {
  return (
    <>
      <PageBanner
        title="Privacy Policy"
        subtitle="How the Koshi Excellence Award collects, uses, and protects your information."
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Privacy Policy" },
        ]}
      />

      <Section className="bg-white">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-slate-500">Last updated: {LAST_UPDATED}</p>

          <p className="mt-6 leading-7 text-slate-600">
            This Privacy Policy explains how Nayan Media Foundation
            ("we", "us", "our"), the organizer of the Koshi Excellence
            Award, collects, uses, discloses, and safeguards information
            when you visit koshiexcellenceaward.com (the "Site"), submit a
            nomination, register as an attendee, apply as a sponsor, or
            otherwise interact with us. By using the Site, you agree to the
            practices described in this policy.
          </p>

          {/* 1 */}
          <h2 className="mt-10 font-heading text-2xl font-bold text-[#0B1F3A]">
            1. Information We Collect
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            We collect information in the following ways:
          </p>
          <ul className="mt-4 space-y-3 leading-7 text-slate-600">
            <li>
              <span className="font-semibold text-[#0B1F3A]">
                Information you provide directly —
              </span>{" "}
              name, email address, phone number, organization, job title,
              and any details submitted through our contact form,
              nomination form, sponsorship inquiry, or event registration.
            </li>
            <li>
              <span className="font-semibold text-[#0B1F3A]">
                Nomination and honoree details —
              </span>{" "}
              biographical information, achievements, photographs, and
              supporting materials submitted about nominees, recipients, or
              honorees for the purpose of evaluation and public recognition.
            </li>
            <li>
              <span className="font-semibold text-[#0B1F3A]">
                Automatically collected information —
              </span>{" "}
              IP address, browser type, device information, pages visited,
              and referring URLs, collected through standard web server
              logs and, where enabled, analytics tools.
            </li>
            <li>
              <span className="font-semibold text-[#0B1F3A]">
                Event and media content —
              </span>{" "}
              photographs and video footage captured at the Koshi
              Excellence Award ceremony and related events, which may
              feature attendees, speakers, sponsors, and honorees.
            </li>
          </ul>

          {/* 2 */}
          <h2 className="mt-10 font-heading text-2xl font-bold text-[#0B1F3A]">
            2. How We Use Your Information
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            We use the information we collect to:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600">
            <li>Process and evaluate nominations and sponsorship applications</li>
            <li>Communicate with you about the awards, ceremony, or your inquiry</li>
            <li>Publish recipient and honoree profiles on the Site and in event materials</li>
            <li>Coordinate event logistics, registration, and guest lists</li>
            <li>Improve the Site's content, functionality, and user experience</li>
            <li>Comply with applicable legal obligations</li>
          </ul>

          {/* 3 */}
          <h2 className="mt-10 font-heading text-2xl font-bold text-[#0B1F3A]">
            3. Public Recognition Content
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            The Koshi Excellence Award exists to publicly recognize
            individuals and organizations. Where you are nominated,
            selected as a recipient, or invited as an honoree, speaker,
            sponsor, or team member, certain details — including your name,
            photograph, organization, and a description of your
            achievements — may be published on the Site, in event
            materials, on our social media channels, and in press coverage.
            If you wish to request a correction or removal of such public
            content, please contact us using the details in Section 9.
          </p>

          {/* 4 */}
          <h2 className="mt-10 font-heading text-2xl font-bold text-[#0B1F3A]">
            4. Sharing of Information
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            We do not sell your personal information. We may share
            information with:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600">
            <li>
              Event partners and vendors who assist with venue operations,
              printing, photography, or ceremony production, solely for
              the purpose of delivering the event
            </li>
            <li>
              Sponsors and media partners of the Koshi Excellence Award,
              where relevant to your role as a sponsor, speaker, or partner
            </li>
            <li>
              Service providers who host the Site or process form
              submissions on our behalf
            </li>
            <li>
              Government or regulatory authorities where required by
              Nepali law
            </li>
          </ul>

          {/* 5 */}
          <h2 className="mt-10 font-heading text-2xl font-bold text-[#0B1F3A]">
            5. Data Retention
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            We retain nomination, sponsorship, and contact information for
            as long as reasonably necessary to fulfil the purposes
            described in this policy, including maintaining a historical
            record of award editions, recipients, and honorees. Public
            recognition content (such as recipient and honoree profiles)
            is generally retained indefinitely as part of the award's
            archive, unless removal is requested and legally permissible.
          </p>

          {/* 6 */}
          <h2 className="mt-10 font-heading text-2xl font-bold text-[#0B1F3A]">
            6. Cookies and Similar Technologies
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            The Site may use cookies or similar technologies to remember
            your preferences and understand how visitors use the Site. You
            can control or disable cookies through your browser settings;
            doing so may affect certain features of the Site.
          </p>

          {/* 7 */}
          <h2 className="mt-10 font-heading text-2xl font-bold text-[#0B1F3A]">
            7. Data Security
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            We take reasonable technical and organizational measures to
            protect the information we hold from unauthorized access,
            alteration, disclosure, or destruction. However, no method of
            transmission over the internet or electronic storage is
            completely secure, and we cannot guarantee absolute security.
          </p>

          {/* 8 */}
          <h2 className="mt-10 font-heading text-2xl font-bold text-[#0B1F3A]">
            8. Your Rights
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            Subject to applicable law, you may request access to, correction
            of, or deletion of your personal information, or object to
            certain uses of it. Nomination and public recognition content
            may be subject to reasonable limits on removal, given the
            award's role as a public record of recipients and honorees. To
            exercise any of these rights, contact us using the details
            below.
          </p>

          {/* 9 */}
          <h2 className="mt-10 font-heading text-2xl font-bold text-[#0B1F3A]">
            9. Contact Us
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            If you have questions about this Privacy Policy or how your
            information is handled, please contact:
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

          {/* 10 */}
          <h2 className="mt-10 font-heading text-2xl font-bold text-[#0B1F3A]">
            10. Changes to This Policy
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for legal, operational, or
            regulatory reasons. The updated version will be posted on this
            page with a revised "Last updated" date. We encourage you to
            review this page periodically.
          </p>
        </div>
      </Section>
    </>
  );
}