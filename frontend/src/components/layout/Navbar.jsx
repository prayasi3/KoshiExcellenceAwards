import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Container from "./Container";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Recipients", path: "/recipients" },
  { name: "Categories", path: "/categories" },
  { name: "Honorees", path: "/honorees" },
  { name: "Speakers", path: "/speakers" },
  { name: "Sponsors", path: "/sponsors" },
  { name: "Gallery", path: "/gallery" },
  { name: "News", path: "/news" },
  { name: "About", path: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0B1F3A] shadow-lg"
            : "bg-[#0B1F3A]/95 backdrop-blur"
        }`}
      >
        <Container>
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}

            <NavLink
              to="/"
              className="text-2xl font-bold text-white tracking-wide"
            >
              <span className="text-[#C9A84C]">Koshi</span> Excellence
            </NavLink>

            {/* Desktop */}

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative pb-1 text-sm uppercase tracking-wider font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-[#C9A84C]"
                        : "text-[#C9A84C] hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}

                      {isActive && (
                        <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#C9A84C]" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Mobile Button */}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-[#C9A84C]"
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu */}

      {mobileOpen && (
        <div className="fixed top-20 left-0 right-0 bg-[#0B1F3A] lg:hidden z-40 shadow-xl">
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-4 border-b border-white/10 transition-colors duration-300 ${
                  isActive
                    ? "text-white bg-[#C9A84C]/10"
                    : "text-[#C9A84C] hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}

      {/* Spacer */}

      <div className="h-20" />
    </>
  );
}