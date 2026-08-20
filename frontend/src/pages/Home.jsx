import { useEffect, useRef, useState } from "react";
import {
  Award,
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  Ticket,
  Quote,
  Users,
  Sparkles,
} from "lucide-react";

import trophy from "../assets/trophy-transparent.svg";
import organizerLogo from "../assets/organizer.png";
import managerLogo from "../assets/manager.png";
import pradesKhabarLogo from "../assets/prades-khabar.png";
import aboutImage from "../assets/about-event.jpg";

import Button from "../components/common/Button";
import CategoryCard from "../components/categories/CategoryCard";
import HeroVideo from "../components/home/HeroVideo";
import FacebookMedia from "../components/common/FacebookMedia";
import { fetchItems, getCategorySlug } from "../lib/api";

const EVENT_DETAILS = [
  { icon: CalendarDays, title: "Date", value: "March 21, 2026", note: "Saturday Evening" },
  { icon: Clock, title: "Time", value: "6:00 PM NPT", note: "Doors open at 5:30 PM" },
  { icon: MapPin, title: "Venue", value: "Soaltee Westend", note: "Itahari, Koshi Province" },
  { icon: Ticket, title: "Tickets", value: "By Invitation", note: "Contact organisers to apply" },
];

// ─── Scroll-reveal wrapper ───────────────────────────────────────────────
function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Hero photo slideshow ────────────────────────────────────────────────
function HeroSlideshow({ slides }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return undefined;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [slides.length]);

  if (!slides.length) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A] via-[#122a4d] to-[#0B1F3A]" />
    );
  }

  return (
    <div className="absolute inset-0">
      {slides.map((slide, index) => (
        <FacebookMedia
          key={`slide-${slide.id ?? slide.full_name ?? "recipient"}-${index}`}
          src={slide.photo_url}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1800ms] ease-in-out ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
          placeholder={<div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A] via-[#122a4d] to-[#0B1F3A]" />}
        />
      ))}
    </div>
  );
}

function sponsorInitials(name = "") {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "KEA"
  );
}

function SponsorLogo({ sponsor }) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasLogo = sponsor.logo_url && !imageFailed;

  const content = hasLogo ? (
    <FacebookMedia
      src={sponsor.logo_url}
      alt={sponsor.sponsor_name}
      onError={() => setImageFailed(true)}
      className="max-h-12 max-w-full object-contain"
      placeholder={
        <span className="font-heading text-lg font-bold text-[#0B1F3A]">
          {sponsorInitials(sponsor.sponsor_name)}
        </span>
      }
    />
  ) : (
    <span className="font-heading text-lg font-bold text-[#0B1F3A]">
      {sponsorInitials(sponsor.sponsor_name)}
    </span>
  );

  const className =
    "mx-4 flex h-24 w-48 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 grayscale transition duration-300 hover:grayscale-0 hover:shadow-md";

  return sponsor.website ? (
    <a href={sponsor.website} target="_blank" rel="noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [recipients, setRecipients] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [sponsorsLoading, setSponsorsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchItems("/categories?limit=100")
      .then((items) => isMounted && setCategories(items))
      .catch(() => {})
      .finally(() => isMounted && setCategoriesLoading(false));

    fetchItems("/recipients?limit=12")
      .then((items) => isMounted && setRecipients(items))
      .catch(() => {});

    fetchItems("/sponsors?limit=100")
      .then((items) => {
        if (!isMounted) return;
        setSponsors(
          items.slice().sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
        );
      })
      .catch(() => {})
      .finally(() => isMounted && setSponsorsLoading(false));

    return () => {
      isMounted = false;
    };
  }, []);

  const slideshowRecipients = recipients.filter((recipient) => Boolean(recipient.photo_url));
  const featuredCategories = categories.slice(0, 8);

  const stats = [
    { value: "16+", label: "Categories" },
    { value: "15+", label: "Honorees" },
    { value: "575+", label: "Participants" },
    { value: "5", label: "Hours of Event" },
    { value: "15+", label: "Speakers" },
    { value: "75+", label: "Digital & Print" },
    { value: "5M+", label: "Social Reach" },
  ];

  return (
    <div>
      {/* ── Hero ── */}
      <header className="relative flex min-h-[92vh] items-center overflow-hidden bg-[#0B1F3A] text-white">
        <HeroVideo src="/videos/award-finalized.mp4" poster={aboutImage} />

        {/* Overlay for legibility + brand radial gold accent */}
        <div
          className="relative mx-auto flex w-full max-w-7xl items-center px-5 py-24 md:px-10"
          style={{ textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}
        ></div>

        <div className="relative mx-auto flex w-full max-w-7xl items-center px-5 py-24 md:px-10">
          <div className="max-w-3xl">
            

            
          </div>

          
        </div>
      </header>

      {/* ── Stats strip (overlaps the hero, like the reference design) ── */}
      <section className="relative z-10 mx-3 -mt-16 sm:mx-6 lg:mx-10">
        <Reveal className="grid grid-cols-2 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl sm:grid-cols-3 lg:grid-cols-7">
          {stats.map((stat) => (
            <div key={stat.label} className="border-b border-r border-slate-100 px-4 py-6 text-center last:border-r-0 sm:px-5 lg:border-b-0 lg:py-8">
              <p className="font-sans text-3xl font-extrabold tracking-tight text-[#0B1F3A] sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                {stat.label}
              </p>
            </div>
        ))}
        </Reveal>
      </section>

      {/* ── About ── */}
      <section className="bg-gradient-to-b from-[#F8F4E7] via-white to-white pb-20 pt-16 sm:pb-24 sm:pt-20">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C9A84C]">
              About the Award
            </p>
            <h2 className="mt-3 font-heading text-4xl font-bold text-[#0B1F3A]">
              Celebrating Excellence Across Koshi Province
            </h2>
            <p className="mt-6 leading-7 text-gray-600">
              The Koshi Excellence Award is the premier recognition programme
              for individuals and organisations driving progress in Koshi
              Province. Organised by <strong>Nayan Media Foundation</strong> and
              managed by <strong>Kafals</strong>, with media coverage by{" "}
              <strong>Prades Khabar</strong>, the awards honour those who have
              made an extraordinary impact in their field.
            </p>
            <p className="mt-4 leading-7 text-gray-600">
              From grassroots social workers to technology pioneers, from
              agricultural innovators to cultural custodians, the award
              celebrates the full breadth of human achievement in our province.
            </p>
            <Button to="/teams" variant="outline" className="mt-8" icon={ArrowRight}>
              Meet Our Team
            </Button>
          </Reveal>

          <Reveal className="relative">
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src={aboutImage}
                alt="Koshi Excellence Award ceremony"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-6 hidden max-w-xs rounded-2xl border border-[#C9A84C]/30 bg-white p-6 shadow-xl sm:block">
              <Quote className="text-[#C9A84C]" size={26} aria-hidden="true" />
              <p className="mt-3 font-heading text-lg italic text-[#0B1F3A]">
                "Excellence is not an act, but a habit."
              </p>
              <p className="mt-2 text-sm text-gray-500">— Nayan Media Foundation</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Award Categories ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1F3A] via-[#0B1F3A] to-[#162D50] py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C9A84C]">
              Recognition Across Sectors
            </p>
            <h2 className="mt-3 font-heading text-4xl font-bold">Award Categories</h2>
            <p className="mt-4 leading-7 text-gray-300">
              Select a category to meet every recipient who has been honoured
              in it, across all editions of the Koshi Excellence Award.
            </p>
          </Reveal>

          <Reveal className="mt-14">
            {categoriesLoading ? (
              <p className="text-center text-gray-300">Loading categories...</p>
            ) : featuredCategories.length ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {featuredCategories.map((category, index) => (
                  <CategoryCard
                    key={`category-${category.id ?? getCategorySlug(category) ?? "item"}-${index}`}
                    category={category}
                    hideDescription
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-300">Categories will be announced soon.</p>
            )}
          </Reveal>

          {categories.length > 0 && (
            <div className="mt-12 text-center">
              <Button to="/categories" variant="outline">
                View All Categories
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ── Event Details ── */}
      <section className="bg-gradient-to-b from-[#F7F8FA] to-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C9A84C]">
              Mark Your Calendar
            </p>
            <h2 className="mt-3 font-heading text-4xl font-bold text-[#0B1F3A]">Event Details</h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {EVENT_DETAILS.map((item) => (
              <Reveal key={item.title}>
                <div className="h-full rounded-2xl border border-slate-200 p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F5ECD0] text-[#0B1F3A]">
                    <item.icon size={26} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
  {item.title}
                  </h3>
                  <p className="mt-2 font-sans text-lg font-bold tracking-tight text-[#0B1F3A]">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">{item.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="relative overflow-hidden bg-[#0B1F3A] py-20 text-center text-white">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 0%, rgba(201,168,76,0.3) 0%, rgba(201,168,76,0) 65%)",
          }}
          aria-hidden="true"
        />
        <Reveal className="relative mx-auto max-w-3xl px-5">
          <Award className="mx-auto text-[#C9A84C]" size={40} aria-hidden="true" />
          <h2 className="mt-5 font-heading text-3xl font-bold sm:text-4xl">
            Celebrating Brilliance, Leadership, and Innovation
          </h2>
          <p className="mt-4 leading-7 text-gray-300">
            Join us in honouring the exceptional individuals who are driving
            progress and excellence in Koshi Province.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button to="/recipients" icon={ArrowRight}>
              Meet the Recipients
            </Button>
            <Button to="/honorees" variant="ghost" icon={Users} iconPosition="left">
              Distinguished Honorees
            </Button>
          </div>
        </Reveal>
      </section>

      {/* ── Sponsors ── */}
      <section className="bg-gradient-to-b from-[#F2F4F7] to-[#F8F4E7] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C9A84C]">
              Our Sponsors
            </p>
            <h2 className="mt-3 font-heading text-4xl font-bold text-[#0B1F3A]">
              Sponsors We're Proud Of
            </h2>
            <p className="mt-4 leading-7 text-gray-600">
              Trusted by leading organisations across Koshi Province who make
              this award possible.
            </p>
          </Reveal>

          <Reveal className="mt-14">
            {sponsorsLoading ? (
              <p className="text-center text-slate-500">Loading sponsors...</p>
            ) : sponsors.length ? (
              <div className="sponsor-marquee">
                <div className="sponsor-marquee__track">
                  {[...sponsors, ...sponsors].map((sponsor, index) => (
                    <SponsorLogo key={`${sponsor.id}-${index}`} sponsor={sponsor} />
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-slate-500">
                Sponsors will be announced soon.
              </p>
            )}
          </Reveal>

          <div className="mt-14 text-center">
            <Button to="/contact" icon={ArrowRight}>
              Become a Sponsor
            </Button>
          </div>
        </div>
      </section>

      {/* ── Organisers ── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C9A84C]">
              Behind the Award
            </p>
            <h2 className="mt-3 font-heading text-4xl font-bold text-[#0B1F3A]">
              Event Sponsors &amp; Associates
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {[
              { name: "Nayan Media Foundation", role: "Organising Body", logo: organizerLogo },
              { name: "Kafals", role: "Event Management", logo: managerLogo },
              { name: "Prades Khabar", role: "Media Partner", logo: pradesKhabarLogo },
            ].map((org) => (
              <Reveal key={org.name}>
                <div className="rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-slate-50">
                    <img className="h-14 w-14 object-contain" src={org.logo} alt={`${org.name} logo`} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#0B1F3A]">{org.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{org.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery CTA ── */}
      <section className="relative overflow-hidden bg-[#0B1F3A] py-20 text-center text-white">
        <img
          src={trophy}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/2 h-64 w-64 -translate-y-1/2 opacity-10"
        />
        <Reveal className="relative mx-auto max-w-2xl px-5">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Relive the Moments</h2>
          <p className="mt-4 leading-7 text-gray-300">
            Browse through the official event gallery to see the highlights,
            the winners, and the unforgettable moments from the Koshi
            Excellence Award ceremony.
          </p>
          <Button to="/gallery" className="mt-8" icon={ArrowRight}>
            View Event Gallery
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
