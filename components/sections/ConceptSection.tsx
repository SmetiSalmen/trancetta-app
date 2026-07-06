"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGSAP } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

const FORMAT_OPTIONS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-pizza">
        <path d="M15 11h.01M11 15h.01M16 16h.01m-10.7-3.3C4.2 8.4 8.4 4.2 12.7 5.3c5 1.2 7 6.7 4 10.4-2.2 2.7-6.2 3.3-9.1 1.6l-3.3.9.9-3.2z" />
      </svg>
    ),
    label: "En Tranche",
    desc: "Idéal solo"
  },
  {
    icon: <span className="font-anton text-red-primary text-xl">¼</span>,
    label: "Quart Plateau",
    desc: "2-3 personnes"
  },
  {
    icon: <span className="font-anton text-red-primary text-xl">½</span>,
    label: "Demi Plateau",
    desc: "3-4 personnes"
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-pizza">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="12" x2="21" y2="12" strokeDasharray="3 3" />
        <line x1="12" y1="3" x2="12" y2="21" strokeDasharray="3 3" />
      </svg>
    ),
    label: "Plateau Complet",
    desc: "4-6 personnes"
  },
];

export default function ConceptSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { opacity: 0, x: -60, clipPath: "inset(0 30% 0 0)" },
          {
            opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)",
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: { trigger: imageRef.current, start: "top 80%" },
          }
        );
      }

      if (textRef.current) {
        gsap.fromTo(textRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: textRef.current, start: "top 80%" },
          }
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.children,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.5)",
            scrollTrigger: { trigger: cardsRef.current, start: "top 85%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="concept" ref={sectionRef} className="section-padding bg-cream-dark overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image LEFT */}
          <div ref={imageRef} className="relative opacity-0 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-pizza">
              <Image
                src="/images/plat.png"
                alt="Grand plateau rectangulaire Trancetta"
                width={600}
                height={420}
                className="object-cover w-full"
              />
              {/* Overlay accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black-warm/60 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-caveat text-white text-xl">Le plateau qui fait tourner les têtes !</p>
              </div>
            </div>

            {/* Floating badge — Notre Spécialité */}
            <div className="absolute -top-6 -right-4 bg-red-primary text-white w-[88px] h-[88px] rounded-full flex flex-col items-center justify-center shadow-xl rotate-12 gap-1 z-10">
              <span className="font-poppins text-[10px] font-bold text-center leading-tight px-1">Notre<br/>Spécialité</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#F5C02B" stroke="#DCA219" strokeWidth="1.5" className="animate-pulse">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>

            {/* Stats badge — Disponible en 4 FORMATS */}
            <div className="absolute -bottom-5 left-4 bg-white rounded-2xl px-4 py-3 shadow-lg border border-cream-dark z-10">
              <div className="flex items-center gap-2">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E58D25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 11h.01M11 15h.01M16 16h.01m-10.7-3.3C4.2 8.4 8.4 4.2 12.7 5.3c5 1.2 7 6.7 4 10.4-2.2 2.7-6.2 3.3-9.1 1.6l-3.3.9.9-3.2z" />
                </svg>
                <div>
                  <div className="font-poppins text-[11px] text-text-secondary leading-tight">Disponible en</div>
                  <div className="font-anton text-sm text-black-warm leading-tight">4 FORMATS</div>
                </div>
              </div>
            </div>
          </div>

          {/* Text RIGHT */}
          <div ref={textRef} className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-red-primary/10 border border-red-primary/20 rounded-full px-4 py-1.5 mb-5">
              <span className="w-2 h-2 rounded-full bg-red-primary" />
              <span className="font-poppins text-red-primary text-xs font-semibold tracking-wider uppercase">Le Concept</span>
            </div>

            <h2 className="font-anton text-black-warm mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
              LA PIZZA <span className="text-red-primary">AUTREMENT.</span>
            </h2>

            <p className="font-poppins text-text-secondary text-base leading-relaxed mb-6">
              Chez Trancetta, la pizza se découvre en tranche et se partage en plateau. Choisis tes saveurs préférées, compose ton plateau et profite de plusieurs recettes autour d’une même table.
            </p>

            <p className="font-poppins text-text-secondary text-base leading-relaxed mb-8">
              Une tranche pour toi. Un plateau pour la squadra.
            </p>

            {/* Format cards */}
            <div ref={cardsRef} className="grid grid-cols-2 gap-3 mb-8">
              {FORMAT_OPTIONS.map((f) => (
                <div
                  key={f.label}
                  className="bg-white rounded-2xl p-4 border border-cream-dark hover:border-red-primary/40 transition-all duration-300 hover:shadow-card group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">{f.icon}</div>
                  <div className="font-poppins font-semibold text-sm text-black-warm">{f.label}</div>
                  <div className="font-poppins text-xs text-text-secondary mt-0.5">{f.desc}</div>
                </div>
              ))}
            </div>

            <Link href="/menu" className="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M15 11h.01M11 15h.01M16 16h.01m-10.7-3.3C4.2 8.4 8.4 4.2 12.7 5.3c5 1.2 7 6.7 4 10.4-2.2 2.7-6.2 3.3-9.1 1.6l-3.3.9.9-3.2z" />
              </svg>
              Composer mon plateau
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
