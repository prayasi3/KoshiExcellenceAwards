import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, ChevronDown, CalendarRange } from "lucide-react";
import "./Navbar.css";

import logo from "../../assets/trophy-transparent.svg";
import { useEditions } from "../../context/useEditions";

// Each entry describes a nav item. Items with `buildEditionLink` get a
// dropdown listing every edition (year) so visitors can jump straight to
// that year's content; items without it are simple links.
const navLinks = [
  { name: "Home", path: "/" },
  {
    name: "Awarded",
    path: "/recipients",
    buildEditionLink: (edition) => `/recipients?edition=${edition.year}`,
  },
  {
    name: "Categories",
    path: "/categories",
  },
  {
    name: "Honorees",
    path: "/honorees",
    buildEditionLink: (edition) => `/honorees?edition=${edition.year}`,
  },
  { name: "Teams", path: "/teams" },
  {
    name: "Speakers",
    path: "/speakers",
    buildEditionLink: (edition) => `/speakers?edition=${edition.year}`,
  },
  {
    name: "Sponsors",
    path: "/sponsors",
    buildEditionLink: (edition) => `/sponsors?edition=${edition.year}`,
  },
  {
    name: "Gallery",
    path: "/gallery",
    buildEditionLink: (edition) => `/gallery?edition_id=${edition.id}`,
  },
  {
    name: "News",
    path: "/news",
    buildEditionLink: (edition) => `/news?year=${edition.year}`,
  },
];

function editionLabel(edition) {
  return edition.title ? `${edition.year} — ${edition.title}` : `${edition.year} Edition`;
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState(null);
  const { editions } = useEditions();

  const toggleMobileMenu = () => {
    setMobileOpen((current) => {
      const next = !current;
      if (!next) setExpandedMobile(null);
      return next;
    });
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <NavLink to="/" className="logo">
            <img
              src={logo}
              alt="Koshi Excellence Award"
              className="logo-image"
            />
            <span className="logo-text">
              Koshi 
              <br />
              <span className="logo-text__accent">Excellence</span> 
              <br />
              Award
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="nav-links">
            {navLinks.map((item) => (
              <div className="nav-item" key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  {item.name}
                  {item.buildEditionLink && (
                    <ChevronDown size={14} className="nav-link__chevron" aria-hidden="true" />
                  )}
                </NavLink>

                {item.buildEditionLink && editions.length > 0 && (
                  <div className="nav-dropdown" role="menu">
                    <Link to={item.path} className="nav-dropdown__link nav-dropdown__link--all">
                      All {item.name}
                    </Link>
                    <span className="nav-dropdown__label">
                      <CalendarRange size={13} aria-hidden="true" />
                      By edition
                    </span>
                    {editions.map((edition) => (
                      <Link
                        key={edition.id}
                        to={item.buildEditionLink(edition)}
                        className="nav-dropdown__link"
                      >
                        {editionLabel(edition)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Contact Button */}
          <NavLink to="/contact" className="contact-btn">
            Contact Us
          </NavLink>

          {/* Mobile Menu Button */}
          <button
            className="mobile-btn"
            onClick={toggleMobileMenu}
            aria-label={mobileOpen ? "Close Menu" : "Open Menu"}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="mobile-menu">
            {navLinks.map((item) => (
              <div className="mobile-item" key={item.name}>
                <div className="mobile-item__row">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "mobile-link active" : "mobile-link"
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </NavLink>

                  {item.buildEditionLink && editions.length > 0 && (
                    <button
                      type="button"
                      className={`mobile-item__toggle ${expandedMobile === item.name ? "mobile-item__toggle--open" : ""}`}
                      onClick={() =>
                        setExpandedMobile((current) =>
                          current === item.name ? null : item.name
                        )
                      }
                      aria-label={`Show ${item.name} by edition`}
                    >
                      <ChevronDown size={18} />
                    </button>
                  )}
                </div>

                {item.buildEditionLink && editions.length > 0 && expandedMobile === item.name && (
                  <div className="mobile-submenu">
                    {editions.map((edition) => (
                      <Link
                        key={edition.id}
                        to={item.buildEditionLink(edition)}
                        className="mobile-submenu__link"
                        onClick={() => setMobileOpen(false)}
                      >
                        {editionLabel(edition)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <NavLink
              to="/contact"
              className="mobile-contact"
              onClick={() => setMobileOpen(false)}
            >
              Contact Us
            </NavLink>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from hiding behind the fixed navbar */}
      <div className="navbar-spacer" />
    </>
  );
}
