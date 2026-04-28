"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="app-nav" style={{ borderBottomColor: scrolled ? "var(--border-strong)" : "var(--border)" }}>
      <div className="app-nav-inner">
        <a href="#home" className="app-brand">
          <span className="app-avatar" aria-hidden={!scrolled}>
            <Image
              src="/ibrar.png"
              alt="Muhammad Ibrar avatar"
              fill
              sizes="34px"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </span>
          <span style={{ opacity: scrolled ? 1 : 0.85 }}>Muhammad Ibrar</span>
        </a>

        <div className="app-nav-links" role="navigation" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="app-nav-link">
              {link.label}
            </a>
          ))}
          <a href="/resume/Muhammad%20Ibrar%20Flutter.pdf" target="_blank" rel="noopener noreferrer" className="btn-accent">
            Resume
          </a>
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="mobile-menu-button"
          aria-label="Toggle mobile menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} role="navigation" aria-label="Mobile navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
        <a
          href="/resume/Muhammad%20Ibrar%20Flutter.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
        >
          Resume
        </a>
      </div>
    </nav>
  );
}
