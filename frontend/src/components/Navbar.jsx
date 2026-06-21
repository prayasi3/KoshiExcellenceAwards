import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav-container">

        <div className="logo">
          Koshi Excellence Awards
        </div>

        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        <nav className={`links ${open ? "active" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/recipients">Award Recipients</Link>
          <Link to="/honorees">Honorees</Link>
          <Link to="/teams">Teams</Link>
          <Link to="/speakers">Speakers</Link>
          <Link to="/sponsors">Sponsors</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </nav>

      </div>
    </header>
  );
}