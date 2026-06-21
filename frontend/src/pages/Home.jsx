import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 1,  name: "Social Work",      icon: "🤝" },
  { id: 2,  name: "Sports",           icon: "🏆" },
  { id: 3,  name: "Startup",          icon: "🚀" },
  { id: 4,  name: "Technology",       icon: "💡" },
  { id: 5,  name: "Insurance",        icon: "🛡️" },
  { id: 6,  name: "Literature",       icon: "📖" },
  { id: 7,  name: "Media",            icon: "📡" },
  { id: 8,  name: "Music",            icon: "🎵" },
  { id: 9,  name: "Agriculture",      icon: "🌾" },
  { id: 10, name: "Automobile",       icon: "🚗" },
  { id: 11, name: "Banking",          icon: "🏦" },
  { id: 12, name: "Capital Market",   icon: "📈" },
  { id: 13, name: "Corporate",        icon: "🏢" },
  { id: 14, name: "Education",        icon: "🎓" },
  { id: 15, name: "Entrepreneurship", icon: "💼" },
  { id: 16, name: "Health",           icon: "❤️" },
];

const SPONSORS = [
  { tier: "Title Sponsor",     label: "TITLE",     colorClass: "badge--gold" },
  { tier: "Gold Sponsor",      label: "GOLD",      colorClass: "badge--gold" },
  { tier: "Silver Sponsor",    label: "SILVER",    colorClass: "badge--silver" },
  { tier: "Associate Sponsor", label: "ASSOCIATE", colorClass: "badge--associate" },
];

function CategoryCard({ category }) {
  return (
    <div className="cat-card">
      <span className="cat-icon">{category.icon}</span>
      <span className="cat-name">{category.name}</span>
      <div className="cat-border" />
    </div>
  );
}

function SponsorRow({ label, colorClass }) {
  return (
    <div className="sponsor-row">
      <span className={`sponsor-badge ${colorClass}`}>{label}</span>
      <div className="sponsor-slot">
        <span className="sponsor-placeholder">Your Brand Here</span>
      </div>
    </div>
  );
}

// ─── Scroll-reveal Section wrapper ────────────────────────────────────────────

function Section({ children, className = "" }) {
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
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`section ${className} ${visible ? "section--visible" : ""}`}
    >
      {children}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="home-page">

      {/* ── Hero ── */}
      <header className="hero">
        <div className="hero-overlay" />

        <svg className="hero-deco" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <line x1="0"    y1="600" x2="800" y2="0" stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.25" />
          <line x1="-100" y1="600" x2="700" y2="0" stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.15" />
          <line x1="100"  y1="600" x2="900" y2="0" stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.15" />
        </svg>

        <div className="hero-content">
          <p className="hero-eyebrow">KOSHI PROVINCE · NEPAL · 2026</p>

          <h1 className="hero-title">
            <span className="hero-title__line">Koshi</span>
            <span className="hero-title__accent">Excellence</span>
            <span className="hero-title__line">Award</span>
          </h1>

          <p className="hero-sub">
            Recognising the achievers who shape Koshi Province across industry,
            culture, and community.
          </p>

          <div className="hero-meta">
            <div className="hero-meta__item">
              <span className="hero-meta__icon">📅</span>
              <span>March 21, 2026</span>
            </div>
            <div className="hero-divider" />
            <div className="hero-meta__item">
              <span className="hero-meta__icon">📍</span>
              <span>Soaltee Westend, Itahari</span>
            </div>
            <div className="hero-divider" />
            <div className="hero-meta__item">
              <span className="hero-meta__icon">🏅</span>
              <span>16 Award Categories</span>
            </div>
          </div>

          <div className="hero-ctas">
            <Link to="/gallery"     className="btn btn--secondary">View Gallery</Link>
          </div>
        </div>
      </header>

      {/* ── About ── */}
      <Section>
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <p className="eyebrow">ABOUT THE AWARD</p>
              <h2 className="section-title">
                Celebrating Excellence<br />Across Koshi Province
              </h2>
              <p className="body-text">
                The Koshi Excellence Award is the premier recognition programme
                for individuals and organisations driving progress in Koshi
                Province. Organised by <strong>Nayan Media Foundation</strong> and
                managed by <strong>Kafals</strong>, with media coverage by{" "}
                <strong>Prades Khabar</strong>, the awards honour those who have
                made an extraordinary impact in their field.
              </p>
              <p className="body-text">
                From grassroots social workers to technology pioneers, from
                agricultural innovators to cultural custodians, the award
                celebrates the full breadth of human achievement in our province.
              </p>
              <div className="stat-row">
                <div className="stat">
                  <span className="stat__num">16</span>
                  <span className="stat__desc">Award Categories</span>
                </div>
                <div className="stat-divider" />
                <div className="stat">
                  <span className="stat__num">2026</span>
                  <span className="stat__desc">Inaugural Edition</span>
                </div>
                <div className="stat-divider" />
                <div className="stat">
                  <span className="stat__num">1</span>
                  <span className="stat__desc">Province, One Night</span>
                </div>
              </div>
            </div>

            <div className="about-visual">
              <div className="golden-frame">
                <div className="golden-frame__inner">
                  <span className="golden-frame__icon">🏆</span>
                  <p className="golden-frame__text">
                    "Excellence is not an act, but a habit."
                  </p>
                  <p className="golden-frame__attr">— Nayan Media Foundation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Categories ── */}
      <Section className="section--dark">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">RECOGNITION ACROSS SECTORS</p>
            <h2 className="section-title section-title--white">Award Categories</h2>
            <div className="gold-rule" />
          </div>
          <div className="cat-grid">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </Section>

      {/* ── Event Details ── */}
      <Section>
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">MARK YOUR CALENDAR</p>
            <h2 className="section-title">Event Details</h2>
            <div className="gold-rule" />
          </div>
          <div className="event-grid">
            {[
              { icon: "📅", title: "Date",    val: "March 21, 2026", note: "Saturday Evening"       },
              { icon: "⏰", title: "Time",    val: "6:00 PM NPT",    note: "Doors open at 5:30 PM" },
              { icon: "📍", title: "Venue",   val: "Soaltee Westend", note: "Itahari, Koshi Province" },
              { icon: "🎟️", title: "Tickets", val: "By Invitation",  note: "Contact organisers to apply" },
            ].map((item) => (
              <div key={item.title} className="event-card">
                <span className="event-card__icon">{item.icon}</span>
                <h3 className="event-card__title">{item.title}</h3>
                <p className="event-card__val">{item.val}</p>
                <p className="event-card__note">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Sponsors ── */}
      <Section className="section--light">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">PARTNERSHIP OPPORTUNITIES</p>
            <h2 className="section-title">Our Sponsors</h2>
            <div className="gold-rule" />
            <p className="body-text body-text--centered">
              Align your brand with excellence. Sponsorship packages are
              available across four tiers.
            </p>
          </div>
          <div className="sponsor-stack">
            {SPONSORS.map((s) => (
              <SponsorRow key={s.tier} {...s} />
            ))}
          </div>
          <div className="sponsor-cta">
            <Link to="/contact" className="btn btn--primary">Become a Sponsor</Link>
          </div>
        </div>
      </Section>

      {/* ── Organisers ── */}
      <Section>
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">BEHIND THE AWARD</p>
            <h2 className="section-title">Organised By</h2>
            <div className="gold-rule" />
          </div>
          <div className="organiser-grid">
            {[
              { abbr: "NMF", name: "Nayan Media Foundation", role: "Organising Body" },
              { abbr: "KFL", name: "Kafals",                 role: "Event Management" },
              { abbr: "PK",  name: "Prades Khabar",          role: "Media Partner" },
            ].map((org) => (
              <div key={org.abbr} className="organiser-card">
                <div className="organiser-card__icon">{org.abbr}</div>
                <h3 className="organiser-card__name">{org.name}</h3>
                <p className="organiser-card__role">{org.role}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

    </div>
  );
}