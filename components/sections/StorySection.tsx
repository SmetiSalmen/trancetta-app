"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGSAP, animateCounter } from "@/lib/animations";
import { STATS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(Array.from(textRef.current.children),
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: textRef.current, start: "top 80%" },
          }
        );
      }

      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { opacity: 0, x: 60, scale: 0.95 },
          {
            opacity: 1, x: 0, scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: imageRef.current, start: "top 80%" },
          }
        );
      }

      // Animate counters
      counterRefs.current.forEach((el, i) => {
        if (el) {
          animateCounter(el, STATS[i].value, {
            duration: 2.5,
            suffix: STATS[i].suffix,
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="histoire" ref={sectionRef} className="section-padding bg-cream overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text LEFT */}
          <div ref={textRef}>
            <div className="inline-flex items-center gap-2 bg-orange-pizza/15 border border-orange-pizza/30 rounded-full px-4 py-1.5 mb-5">
              <span className="font-poppins text-orange-pizza text-xs font-semibold tracking-wider uppercase">Notre Histoire</span>
            </div>

            <h2 className="font-anton text-black-warm mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
              UNE PASSION POUR LA PIZZA,<br />
              UN CONCEPT PENSÉ <span className="text-orange-pizza">POUR LE PARTAGE</span>.
            </h2>

            <p className="font-poppins text-text-secondary text-base leading-relaxed mb-6">
              Trancetta propose une expérience différente autour de la pizza : des recettes gourmandes servies en tranches et des plateaux à composer selon les envies. Une approche conviviale, généreuse et inspirée de l’univers italien.
            </p>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-primary flex items-center justify-center text-white text-xl shadow-md">
                👨‍🍳
              </div>
              <div>
                <p className="font-poppins font-semibold text-black-warm text-sm">L&apos;équipe Trancetta</p>
                <p className="font-caveat text-text-secondary text-base">La passion du goût</p>
              </div>
            </div>
          </div>

          {/* Image RIGHT */}
          <div ref={imageRef} className="opacity-0">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-pizza aspect-[4/3]">
                <Image
                  src="/images/restaurant-ambiance.png"
                  alt="Ambiance du restaurant Trancetta"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Mascot peek */}
              <div className="absolute -bottom-10 -left-10 w-24">
                <Image
                  src="/images/mascotte/mascotte2.png"
                  alt="Mascotte Trancetta"
                  width={100}
                  height={110}
                  className="object-contain drop-shadow-lg"
                />
              </div>

              {/* Quote bubble */}
              <div className="absolute top-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-lg border border-cream-dark max-w-44">
                <p className="font-caveat text-red-primary text-base text-center leading-tight">
                  "Chaque tranche, une histoire !"
                </p>
              </div>
            </div>

            {/* Stats grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-4 mt-16">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="bg-cream-dark rounded-2xl p-5 border border-cream-dark hover:border-red-primary/30 transition-colors text-center"
                >
                  <div className="font-anton text-red-primary mb-1" style={{ fontSize: "2rem" }}>
                    <span
                      ref={(el) => { counterRefs.current[i] = el; }}
                      className="tabular-nums"
                    >
                      0{stat.suffix}
                    </span>
                  </div>
                  <div className="font-poppins text-text-secondary text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
