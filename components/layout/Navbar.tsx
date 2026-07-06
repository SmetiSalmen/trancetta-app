"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo.png";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
          }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="relative w-24 h-24">
              <Image
                src={logo}
                alt="Trancetta Pizza House"
                fill
                sizes="100px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-4 py-2 font-poppins font-medium text-sm transition-colors duration-200 rounded-full group
                      ${isActive ? "text-red-primary" : "text-text-primary hover:text-red-primary"}
                    `}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-red-primary rounded-full transition-all duration-300
                        ${isActive ? "w-6" : "w-0 group-hover:w-4"}
                      `}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/menu"
              className="bg-red-primary hover:bg-red-dark text-white font-anton tracking-wider text-sm px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 shadow-md transform hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                <path d="M15 11h.01M11 15h.01M16 16h.01m-10.7-3.3C4.2 8.4 8.4 4.2 12.7 5.3c5 1.2 7 6.7 4 10.4-2.2 2.7-6.2 3.3-9.1 1.6l-3.3.9.9-3.2z" />
              </svg>
              VOIR LE MENU
            </Link>

            {/* Hamburger - mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-xl text-text-primary hover:text-red-primary hover:bg-red-primary/10 transition-all duration-200"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-0 left-0 w-full transition-all duration-300 ${menuOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
                    }`}
                >
                  <X size={24} />
                </span>
                <span
                  className={`absolute top-0 left-0 w-full transition-all duration-300 ${menuOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"
                    }`}
                >
                  <Menu size={24} />
                </span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          className="absolute inset-0 bg-black-warm/50 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 max-w-full bg-cream shadow-2xl transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Mobile menu header */}
          <div className="p-6 border-b border-cream-dark flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/images/logo.png" alt="Trancetta" width={40} height={40} className="object-contain" />
              <div>
                <div className="font-anton text-black-warm text-lg leading-none">TRANCETTA</div>
                <div className="font-poppins text-green-accent text-xs font-semibold tracking-wider">Pizza House</div>
              </div>
            </div>
            <button onClick={() => setMenuOpen(false)} className="p-2 hover:text-red-primary">
              <X size={20} />
            </button>
          </div>

          {/* Mobile links */}
          <ul className="p-6 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl font-poppins font-medium text-text-primary hover:text-red-primary hover:bg-red-primary/8 transition-all duration-200 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="px-6">
            <Link
              href="/menu"
              className="btn-primary w-full justify-center"
              onClick={() => setMenuOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2 -mt-0.5">
                <path d="M15 11h.01M11 15h.01M16 16h.01m-10.7-3.3C4.2 8.4 8.4 4.2 12.7 5.3c5 1.2 7 6.7 4 10.4-2.2 2.7-6.2 3.3-9.1 1.6l-3.3.9.9-3.2z" />
              </svg>
              Voir le menu
            </Link>
          </div>

          {/* Mascot decoration */}
          <div className="absolute bottom-8 right-4 opacity-10">
            <Image src="/images/mascotte/mascotte1.png" alt="" width={100} height={100} className="object-contain" />
          </div>
        </div>
      </div>
    </>
  );
}
