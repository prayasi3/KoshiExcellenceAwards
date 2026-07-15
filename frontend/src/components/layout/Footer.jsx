import { NavLink } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-[#0B1F3A] text-white mt-20">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">

          {/* About */}

          <div>
            <h3 className="text-2xl font-bold">
              <span className="text-[#C9A84C]">Koshi</span> Excellence
            </h3>

            <p className="mt-5 text-gray-300 leading-7">
              Recognising extraordinary individuals and organizations
              whose work has positively transformed communities across
              Koshi Province.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h4 className="text-lg font-semibold text-[#C9A84C] mb-5">
              Quick Links
            </h4>

            <div className="flex flex-col gap-3">
              <NavLink to="/" className="hover:text-[#C9A84C]">
                Home
              </NavLink>

              <NavLink to="/about" className="hover:text-[#C9A84C]">
                About
              </NavLink>

              <NavLink to="/recipients" className="hover:text-[#C9A84C]">
                Recipients
              </NavLink>

              <NavLink to="/honorees" className="hover:text-[#C9A84C]">
                Honorees
              </NavLink>

              <NavLink to="/gallery" className="hover:text-[#C9A84C]">
                Gallery
              </NavLink>

              <NavLink to="/contact" className="hover:text-[#C9A84C]">
                Contact
              </NavLink>
            </div>
          </div>

          {/* Contact */}

          <div>
            <h4 className="text-lg font-semibold text-[#C9A84C] mb-5">
              Contact
            </h4>

            <div className="space-y-4 text-gray-300">

              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1" />
                <span>Koshi Province, Nepal</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>+977-9800000000</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>info@koshiexcellenceawards.com</span>
              </div>

            </div>
          </div>

          {/* Social */}

          <div>
            <h4 className="text-lg font-semibold text-[#C9A84C] mb-5">
              Follow Us
            </h4>

            <div className="flex gap-4">

              <a
                href="#"
                className="rounded-full border border-white/20 p-3 hover:bg-[#C9A84C] hover:text-[#0B1F3A] transition"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="rounded-full border border-white/20 p-3 hover:bg-[#C9A84C] hover:text-[#0B1F3A] transition"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="rounded-full border border-white/20 p-3 hover:bg-[#C9A84C] hover:text-[#0B1F3A] transition"
              >
                <FaLinkedinIn size={18} />
              </a>

            </div>

            <p className="mt-6 text-gray-400 text-sm leading-6">
              Celebrating excellence, inspiring future generations,
              and recognising remarkable contributions to society.
            </p>
          </div>

        </div>
      </Container>

      {/* Bottom Bar */}

      <div className="border-t border-white/10">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 py-6 text-sm text-gray-400 md:flex-row">
            <p>
              © {new Date().getFullYear()} Koshi Excellence Awards. All rights reserved.
            </p>

            <div className="flex gap-6">
              <NavLink to="/privacy" className="hover:text-[#C9A84C]">
                Privacy Policy
              </NavLink>

              <NavLink to="/terms" className="hover:text-[#C9A84C]">
                Terms of Use
              </NavLink>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}