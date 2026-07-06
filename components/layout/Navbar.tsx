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
            <a
              href={`https://wa.me/${BRAND.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-primary hover:bg-red-dark text-white rounded-xl py-2 px-4.5 hidden sm:flex items-center gap-2.5 transition-all duration-300 font-anton tracking-wider leading-none shadow-md hover:scale-105 active:scale-95"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <div className="text-left font-anton tracking-wide">
                <div className="text-[10px] leading-[1.1]">COMMANDER</div>
                <div className="text-[9px] leading-[1.1] opacity-90">SUR WHATSAPP</div>
              </div>
            </a>

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
