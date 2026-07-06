"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { registerGSAP } from "@/lib/animations";
import { BEST_SELLERS } from "@/lib/pizzaData";

gsap.registerPlugin(ScrollTrigger);

export default function BestSellersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      /* TITLE ANIMATION */

      if (titleRef.current) {
        gsap.fromTo(
          Array.from(titleRef.current.children),
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
            },
          }
        );
      }

      /* CARDS ANIMATION */

      if (gridRef.current) {
        gsap.fromTo(
          Array.from(gridRef.current.children),
          {
            opacity: 0,
            y: 60,
            scale: 0.94,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.12,
            ease: "back.out(1.3)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 82%",
            },
          }
        );
      }

      /* CTA ANIMATION */

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pizzas"
      ref={sectionRef}
      className="relative section-padding bg-cream overflow-hidden"
    >
      {/* BACKGROUND DECORATION */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-red-primary/5 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-orange-pizza/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* =========================
            TITLE
        ========================== */}

        <div
          ref={titleRef}
          className="text-center mb-12 lg:mb-16"
        >
          {/* Badge */}

          <div className="inline-flex items-center gap-2 bg-red-primary/10 border border-red-primary/20 rounded-full px-4 py-1.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-red-primary animate-pulse" />

            <span className="font-poppins text-red-primary text-xs font-semibold tracking-wider uppercase">
              Les préférées
            </span>
          </div>

          {/* Title */}

          <h2
            className="font-anton text-black-warm uppercase leading-[1.05] mb-5"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
            }}
          >
            LES STARS DE
            <br />

            <span className="text-red-primary">
              TRANCETTA
            </span>
          </h2>

          {/* Description */}

          <p className="font-poppins text-text-secondary text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Les recettes qui font craquer tout le monde.
            Choisis ta préférée ou mélange plusieurs saveurs
            dans ton plateau.
          </p>
        </div>

        {/* =========================
            BEST SELLERS GRID
        ========================== */}

        <div
          ref={gridRef}
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
            lg:gap-8
            max-w-6xl
            mx-auto
          "
        >
          {BEST_SELLERS.slice(0, 3).map((pizza, index) => (
            <article
              key={pizza.id}
              className="
                group
                relative
                bg-white
                rounded-[28px]
                overflow-hidden
                border
                border-cream-dark
                shadow-sm
                hover:shadow-xl
                transition-all
                duration-500
                hover:-translate-y-2
              "
            >
              {/* IMAGE */}

              <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
                <Image
                  src={pizza.image}
                  alt={pizza.name}
                  fill
                  sizes="
                    (max-width: 768px) 100vw,
                    (max-width: 1200px) 33vw,
                    380px
                  "
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />

                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Ranking */}

                <div
                  className="
                    absolute
                    top-4
                    left-4

                    w-10
                    h-10

                    rounded-full

                    bg-red-primary
                    text-white

                    flex
                    items-center
                    justify-center

                    font-anton
                    text-lg

                    shadow-lg
                  "
                >
                  {index + 1}
                </div>

                {/* Best seller badge */}

                <div
                  className="
                    absolute
                    bottom-4
                    left-4

                    bg-white/95
                    backdrop-blur-sm

                    rounded-full

                    px-3
                    py-1.5

                    font-poppins
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider

                    text-red-primary
                  "
                >
                  🔥 Best Seller
                </div>
              </div>

              {/* CONTENT */}

              <div className="p-5 lg:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3
                      className="
                        font-anton
                        text-black-warm
                        text-xl
                        lg:text-2xl
                        uppercase
                        tracking-wide
                        transition-colors
                        group-hover:text-red-primary
                      "
                    >
                      {pizza.name}
                    </h3>

                    {pizza.ingredients && (
                      <p
                        className="
                          font-poppins
                          text-text-secondary
                          text-xs
                          leading-relaxed
                          mt-2

                          line-clamp-2
                        "
                      >
                        {pizza.ingredients}
                      </p>
                    )}
                  </div>
                </div>

                {/* PRICE */}

                <div className="flex items-end justify-between mt-5 pt-4 border-t border-cream-dark">
                  <div>
                    <span className="block font-poppins text-[10px] text-text-secondary uppercase tracking-wide mb-1">
                      À partir de
                    </span>

                    <span className="font-anton text-red-primary text-xl">
                      {pizza.priceQuarter} DT
                    </span>
                  </div>

                  <Link
                    href="/menu#configurateur"
                    className="
                      w-11
                      h-11

                      rounded-full

                      bg-cream-dark
                      text-red-primary

                      flex
                      items-center
                      justify-center

                      transition-all
                      duration-300

                      group-hover:bg-red-primary
                      group-hover:text-white
                      group-hover:rotate-12
                    "
                    aria-label={`Composer avec ${pizza.name}`}
                  >
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* =========================
            CTA
        ========================== */}

        <div
          ref={ctaRef}
          className="text-center mt-12 lg:mt-16"
        >
          <div className="inline-flex flex-col items-center gap-4">
            <p className="font-caveat text-text-secondary text-xl lg:text-2xl">
              Il y en a encore beaucoup à goûter...
            </p>

            <Link
              href="/menu"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-3

                bg-red-primary
                text-white

                rounded-full

                px-7
                py-3.5

                font-poppins
                font-semibold
                text-sm

                shadow-lg
                shadow-red-primary/20

                transition-all
                duration-300

                hover:bg-red-dark
                hover:-translate-y-1
                hover:shadow-xl
              "
            >
              Voir toute la carte

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}