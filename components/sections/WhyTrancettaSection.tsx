"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGSAP } from "@/lib/animations";
import { WHY_TRANCETTA } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

// SVG Icons for each advantage
const ICONS: Record<string, React.ReactNode> = {
  slice: (
    <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 56L32 8l24 48H8z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" fill="none"/>
      <path d="M16 40h32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="32" cy="24" r="3" fill="currentColor" opacity="0.6"/>
      <circle cx="24" cy="36" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="40" cy="36" r="2" fill="currentColor" opacity="0.5"/>
    </svg>
  ),
  plateau: (
    <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="14" width="48" height="36" rx="4" stroke="currentColor" strokeWidth="3"/>
      <line x1="32" y1="14" x2="32" y2="50" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 2"/>
      <line x1="8" y1="32" x2="56" y2="32" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 2"/>
      <circle cx="20" cy="23" r="2.5" fill="currentColor" opacity="0.6"/>
      <circle cx="44" cy="23" r="2.5" fill="currentColor" opacity="0.6"/>
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 52C12 52 20 20 52 12C52 12 44 44 12 52Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M12 52L32 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="36" cy="24" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="44" cy="32" r="2" fill="currentColor" opacity="0.4"/>
    </svg>
  ),
  fire: (
    <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8C32 8 44 20 44 32C44 42 36 52 32 52C28 52 20 42 20 32C20 22 28 8 32 8Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M32 28C32 28 36 34 36 38C36 42 34 46 32 46C30 46 28 42 28 38C28 34 32 28 32 28Z" fill="currentColor" opacity="0.4"/>
    </svg>
  ),
};

export default function WhyTrancettaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(Array.from(titleRef.current.children),
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
          }
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(Array.from(cardsRef.current.children),
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "back.out(1.5)",
            scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="avantages" ref={sectionRef} className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0A0808 0%, #1a0505 50%, #7E1D10 100%)" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-red-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-orange-pizza/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] text-white w-[35vw] h-[35vw]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
            <path d="M15 11h.01M11 15h.01M16 16h.01m-10.7-3.3C4.2 8.4 8.4 4.2 12.7 5.3c5 1.2 7 6.7 4 10.4-2.2 2.7-6.2 3.3-9.1 1.6l-3.3.9.9-3.2z" />
          </svg>
        </div>
      </div>

      <div className="container-custom relative z-10">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-orange-pizza animate-pulse" />
            <span className="font-poppins text-orange-pizza text-xs font-semibold tracking-wider uppercase">
              Pourquoi Trancetta ?
            </span>
          </div>

          <h2 className="font-anton text-white mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
            CE QUI NOUS REND<br />
            <span className="text-orange-pizza">UNIQUES.</span>
          </h2>

          <p className="font-poppins text-white/60 text-base max-w-xl mx-auto">
            Chez Trancetta, chaque détail compte. Voici pourquoi des milliers de clients
            reviennent encore et encore.
          </p>
        </div>

        {/* Cards grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_TRANCETTA.map((item, i) => (
            <div
              key={item.id}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-7
                hover:bg-white/10 hover:border-white/25 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Number */}
              <div className="absolute top-4 right-4 font-anton text-white/10 text-5xl select-none">
                0{i + 1}
              </div>

              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${item.color}22`, color: item.color }}
              >
                {ICONS[item.icon]}
              </div>

              {/* Content */}
              <h3 className="font-poppins font-bold text-white text-base mb-3 leading-tight">
                {item.title}
              </h3>
              <p className="font-poppins text-white/60 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Bottom accent */}
              <div
                className="mt-5 h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: item.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
