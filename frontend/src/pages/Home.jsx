import { useEffect, useRef, useState } from "react";
import {
  Award,
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  Mic,
  Newspaper,
  Share2,
  Ticket,
  Quote,
  Users,
  UserCheck,
  Sparkles,
} from "lucide-react";

import trophy from "../assets/trophy-transparent.svg";
import organizerLogo from "../assets/organizer.png";
import managerLogo from "../assets/manager.png";
import pradesKhabarLogo from "../assets/prades-khabar.png";
import aboutImage from "../assets/about-event.jpg";

import Button from "../components/common/Button";
import CategoryCard from "../components/categories/CategoryCard";
import { fetchItems } from "../lib/api";

const SPONSOR_TIERS = [
  { tier: "Title Sponsor", label: "Title" },
  { tier: "Gold Sponsor", label: "Gold" },
  { tier: "Silver Sponsor", label: "Silver" },
  { tier: "Associate Sponsor", label: "Associate" },
];

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
        <img
          key={slide.id ?? index}
          src={slide.photo_url}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1800ms] ease-in-out ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    let isMounted = true;

    fetchItems("/categories?limit=100")
      .then((items) => isMounted && setCategories(items))
      .catch(() => {})
      .finally(() => isMounted && setCategoriesLoading(false));

    fetchItems("/recipients?limit=12")
      .then((items) => isMounted && setRecipients(items))
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const slideshowRecipients = recipients.filter((recipient) => Boolean(recipient.photo_url));
  const featuredCategories = categories.slice(0, 8);

  const stats = [
    { value: "16+", label: "Award Categories", icon: Award },
    { value: "15+", label: "Honorees", icon: Users },
    { value: "575+", label: "Participants", icon: UserCheck },
    { value: "15+", label: "Speakers", icon: Mic },
    { value: "75+", label: "Digital & Print Reach", icon: Newspaper },
    { value: "5M+", label: "Social Media Reach", icon: Share2 },
  ];

  return (
    <div>
      {/* ── Hero ── */}
      <header className="relative flex min-h-[92vh] items-center overflow-hidden bg-[#0B1F3A] text-white">
        <HeroSlideshow slides={slideshowRecipients} />

        {/* Overlay for legibility + brand radial gold accent */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/85 to-[#0B1F3A]/60" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 75% at 80% 10%, rgba(201,168,76,0.35) 0%, rgba(201,168,76,0) 60%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-7xl px-5 py-24 md:px-10">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A84C]">
              <Sparkles size={16} aria-hidden="true" />
              The Most Prestigious Award of Koshi Province
            </p>

            <h1 className="mt-6 font-heading text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
              Koshi <span className="text-[#C9A84C]">Excellence</span> Award
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-200">
              Recognising the achievers who shape Koshi Province across industry,
              culture, and community.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button to="/recipients" icon={ArrowRight}>
                View Recipients
              </Button>
              <Button to="/news" variant="ghost">
                Explore news coverage
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Stats strip (overlaps the hero, like the reference design) ── */}
<section className="relative z-10 mx-auto -mt-16 w-full max-w-6xl px-5 md:px-10">
  <Reveal className="flex flex-wrap justify-center gap-y-8 rounded-3xl bg-white px-6 py-9 shadow-xl sm:px-10 lg:flex-nowrap lg:justify-between">
    {stats.map((stat) => (
      <div key={stat.label} className="min-w-[130px] flex-1 px-3 text-center">
        <p className="font-heading text-3xl font-bold text-[#0B1F3A] sm:text-4xl">
          {stat.value}
        </p>
        <p className="mt-1.5 whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-slate-500">
          {stat.label}
        </p>
      </div>
    ))}
  </Reveal>
</section>

      {/* ── About ── */}
      <section className="bg-white py-20 sm:py-24">
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
            <Button to="/categories" variant="outline" className="mt-8" icon={ArrowRight}>
              View Categories
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
      <section className="bg-[#0B1F3A] py-20 text-white sm:py-24">
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
                {featuredCategories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
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
      <section className="bg-white py-20 sm:py-24">
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
                  <h3 className="mt-5 text-sm font-semibold uppercase tracking-wider text-gray-500">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-heading text-xl font-bold text-[#0B1F3A]">{item.value}</p>
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
      <section className="bg-[#F2F4F7] py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 md:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C9A84C]">
              Partnership Opportunities
            </p>
            <h2 className="mt-3 font-heading text-4xl font-bold text-[#0B1F3A]">Our Sponsors</h2>
            <p className="mt-4 leading-7 text-gray-600">
              Align your brand with excellence. Sponsorship packages are
              available across four tiers.
            </p>
          </Reveal>

          <Reveal className="mt-12 space-y-4">
            {SPONSOR_TIERS.map((sponsor) => (
              <div
                key={sponsor.tier}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm"
              >
                <span className="rounded-full bg-[#F5ECD0] px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-[#9A7A25]">
                  {sponsor.label}
                </span>
                <span className="text-gray-400">Your brand here</span>
              </div>
            ))}
          </Reveal>

          <div className="mt-10 text-center">
            <Button to="/sponsors" icon={ArrowRight}>
              Explore our sponsors
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