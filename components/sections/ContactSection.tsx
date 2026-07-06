"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGSAP } from "@/lib/animations";
import { BRAND } from "@/lib/constants";
import { Phone, Mail, MapPin } from "lucide-react";

const FacebookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      [titleRef, cardsRef, socialRef].forEach((ref, i) => {
        if (ref.current) {
          gsap.fromTo(Array.from(ref.current.children),
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0,
              duration: 0.6,
              stagger: 0.1,
              delay: i * 0.15,
              ease: "power3.out",
              scrollTrigger: { trigger: ref.current, start: "top 85%" },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactItems = [
    {
      icon: <Phone size={22} />,
      label: "Téléphone",
      value: BRAND.phone,
      href: `tel:${BRAND.phone}`,
      color: "#BC2325",
      bg: "#BC232515",
    },
    BRAND.secondaryPhone ? {
      icon: <Phone size={22} />,
      label: "Téléphone (Alt)",
      value: BRAND.secondaryPhone,
      href: `tel:${BRAND.secondaryPhone}`,
      color: "#C23B30",
      bg: "#C23B3015",
    } : null,
    BRAND.email ? {
      icon: <Mail size={22} />,
      label: "E-mail",
      value: BRAND.email,
      href: `mailto:${BRAND.email}`,
      color: "#E58D25",
      bg: "#E58D2515",
    } : null,
    {
      icon: <MapPin size={22} />,
      label: "Adresse",
      value: BRAND.address,
      href: `https://maps.google.com/?q=${encodeURIComponent(BRAND.address)}`,
      color: "#168447",
      bg: "#16844715",
    },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string; href: string; color: string; bg: string }[];

  const socialLinks = [
    {
      href: BRAND.social.facebook,
      label: "Facebook",
      icon: <FacebookIcon />,
      bg: "#1877F2",
    },
    {
      href: BRAND.social.instagram,
      label: "Instagram",
      icon: <InstagramIcon />,
      bg: "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
    },
    BRAND.social.tiktok ? {
      href: BRAND.social.tiktok,
      label: "TikTok",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.15a8.16 8.16 0 004.77 1.52V7.24a4.85 4.85 0 01-1-.55z" />
        </svg>
      ),
      bg: "#000",
    } : null,
  ].filter(Boolean) as { href: string; label: string; icon: React.ReactNode; bg: string }[];

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-cream-dark overflow-hidden">
      <div className="container-custom">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-14 flex flex-col items-center justify-center">
          <div className="flex flex-col md:flex-row items-center gap-6 justify-center mb-4">
            <div className="w-24 md:w-32 animate-float">
              <Image
                src="/images/mascotte/mascotte4.png"
                alt="Mascotte au mégaphone"
                width={130}
                height={150}
                className="object-contain"
              />
            </div>
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-red-primary/10 border border-red-primary/20 rounded-full px-4 py-1.5 mb-3">
                <span className="font-poppins text-red-primary text-xs font-semibold tracking-wider uppercase">Contact</span>
              </div>

              <h2 className="font-anton text-black-warm leading-none mb-2" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
                UNE QUESTION ?<br />
                <span className="text-red-primary">UNE ENVIE DE PIZZA ?</span>
              </h2>
            </div>
          </div>

          <p className="font-poppins text-text-secondary text-base max-w-xl mx-auto mt-2">
            On est là pour vous ! Appelez-nous, envoyez-nous un message ou passez nous voir directement.
            On adore parler pizza.
          </p>
        </div>

        {/* Contact cards */}
        <div
          ref={cardsRef}
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
            mb-10
          "
        >
          {contactItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.label === "Adresse" ? "_blank" : undefined}
              rel={
                item.label === "Adresse"
                  ? "noopener noreferrer"
                  : undefined
              }
              className="
                group
                bg-white
                rounded-2xl
                p-6
                border
                border-cream-dark

                hover:border-transparent
                hover:shadow-card-hover
                hover:-translate-y-1.5

                transition-all
                duration-300

                flex
                flex-col
                items-center
                justify-center
                text-center
              "
            >
              <div
                className="
                  w-14
                  h-14
                  rounded-2xl

                  flex
                  items-center
                  justify-center

                  mb-4

                  transition-transform
                  duration-300

                  group-hover:scale-110
                "
                style={{
                  backgroundColor: item.bg,
                  color: item.color,
                }}
              >
                {item.icon}
              </div>

              <div
                className="
                  font-poppins
                  text-xs
                  text-text-secondary
                  mb-1
                  uppercase
                  tracking-wider
                "
              >
                {item.label}
              </div>

              <div
                className="
                  font-poppins
                  font-semibold
                  text-black-warm
                  text-sm

                  group-hover:text-red-primary
                  transition-colors
                "
              >
                {item.value}
              </div>
            </a>
          ))}
        </div>
        {/* WhatsApp CTA - big */}
        <div className="bg-white rounded-3xl p-8 border border-cream-dark text-center mb-10">
          <p className="font-caveat text-2xl text-text-secondary mb-3">
            La façon la plus rapide de nous joindre ?
          </p>
          <h3 className="font-anton text-black-warm text-2xl mb-5">
            COMMANDEZ SUR <span className="text-green-accent">WHATSAPP</span> !
          </h3>
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Bonjour Trancetta! Je voudrais commander...")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-accent hover:bg-green-700 text-white font-poppins font-semibold px-8 py-4 rounded-full text-base transition-all duration-200 hover:scale-105 hover:shadow-lg shadow-green-accent/30"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Commander sur WhatsApp
          </a>
        </div>

        {/* Social links */}
        <div ref={socialRef} className="text-center">
          <p className="font-poppins text-text-secondary text-sm mb-5">Suivez-nous sur nos réseaux</p>
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="group relative w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-md"
                style={{ background: s.bg }}
              >
                {s.icon}
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 font-poppins text-xs text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {s.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
