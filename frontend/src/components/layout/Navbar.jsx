import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

import logo from "../../assets/trophy-transparent.svg";

const navLinks = [
  { name: "HOME", path: "/" },
  { name: "RECIPIENTS", path: "/recipients" },
  { name: "CATEGORIES", path: "/categories" },
  { name: "HONOREES", path: "/honorees" },
  { name: "TEAMS", path: "/teams" },
  { name: "SPEAKERS", path: "/speakers" },
  { name: "SPONSORS", path: "/sponsors" },
  { name: "GALLERY", path: "/gallery" },
  { name: "NEWS", path: "/news" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="nav-links">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Contact Button */}
          <NavLink to="/contact" className="contact-btn">
            Contact Us
          </NavLink>

          {/* Mobile Menu Button */}
          <button
            className="mobile-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close Menu" : "Open Menu"}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="mobile-menu">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "mobile-link active" : "mobile-link"
                }
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </NavLink>
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
      <div style={{ height: "90px" }} />
    </>
  );
}