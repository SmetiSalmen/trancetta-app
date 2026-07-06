"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChefHat } from "lucide-react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  registerGSAP,
  animateCounter,
} from "@/lib/animations";

import { STATS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const counterRefs =
    useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      /* =====================================================
         TEXT ANIMATION
      ====================================================== */

      if (textRef.current) {
        gsap.fromTo(
          Array.from(textRef.current.children),
          {
            opacity: 0,
            x: -40,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",

            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      /* =====================================================
         IMAGE ANIMATION
      ====================================================== */

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            opacity: 0,
            x: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",

            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      /* =====================================================
         COUNTERS
      ====================================================== */

      counterRefs.current.forEach((el, i) => {
        if (el && STATS[i]) {
          animateCounter(
            el,
            STATS[i].value,
            {
              duration: 2.5,
              suffix: STATS[i].suffix,
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="histoire"
      ref={sectionRef}
      className="
        section-padding
        overflow-x-hidden
        overflow-y-visible
        bg-cream
      "
    >
      <div className="container-custom">
        <div
          className="
            grid
            items-center
            gap-14

            lg:grid-cols-2
            lg:gap-20
          "
        >
          {/* =================================================
              TEXT LEFT
          ================================================== */}

          <div ref={textRef}>
            {/* LABEL */}

            <div
              className="
                mb-5

                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-orange-pizza/30

                bg-orange-pizza/15

                px-4
                py-1.5
              "
            >
              <span
                className="
                  font-poppins
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-orange-pizza
                "
              >
                Notre Histoire
              </span>
            </div>

            {/* TITLE */}

            <h2
              className="
                mb-5

                font-anton

                leading-[1.15]

                text-black-warm
              "
              style={{
                fontSize:
                  "clamp(2.2rem, 5vw, 3.8rem)",
              }}
            >
              UNE PASSION POUR LA PIZZA,
              <br />

              UN CONCEPT PENSÉ{" "}

              <span className="text-orange-pizza">
                POUR LE PARTAGE
              </span>
              .
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mb-7

                max-w-2xl

                font-poppins

                text-base
                leading-relaxed

                text-text-secondary
              "
            >
              Trancetta propose une expérience différente
              autour de la pizza : des recettes gourmandes
              servies en tranches et des plateaux à composer
              selon les envies. Une approche conviviale,
              généreuse et inspirée de l&apos;univers italien.
            </p>

            {/* =================================================
                TEAM SIGNATURE
            ================================================== */}

            <div
              className="
                flex
                items-center
                gap-4
              "
            >
              {/* CHEF ICON */}

              <div
                className="
                  flex
                  h-14
                  w-14
                  flex-shrink-0

                  items-center
                  justify-center

                  rounded-full

                  bg-red-primary

                  text-white

                  shadow-lg
                  shadow-red-primary/20

                  transition-transform
                  duration-300

                  hover:scale-105
                  hover:-rotate-6
                "
              >
                <ChefHat
                  size={28}
                  strokeWidth={1.8}
                />
              </div>

              {/* TEXT */}

              <div>
                <p
                  className="
                    font-poppins
                    text-sm
                    font-semibold
                    text-black-warm
                  "
                >
                  L&apos;équipe Trancetta
                </p>

                <p
                  className="
                    mt-0.5

                    font-caveat

                    text-lg

                    text-text-secondary
                  "
                >
                  La passion du goût
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              VISUAL RIGHT
          ================================================== */}

          <div
            ref={imageRef}
            className="
              overflow-visible
              opacity-0
            "
          >
            <div className="relative overflow-visible">
              {/* IMAGE */}

              <div
                className="
                  relative

                  aspect-[4/3]

                  overflow-hidden

                  rounded-3xl

                  shadow-pizza
                "
              >
                <Image
                  src="/images/restaurant-ambiance.png"
                  alt="Ambiance du restaurant Trancetta"
                  fill
                  sizes="
                    (max-width: 1024px) 100vw,
                    50vw
                  "
                  className="
                    object-cover

                    transition-transform
                    duration-700

                    hover:scale-[1.03]
                  "
                />
              </div>

              {/* =================================================
                  BIGGER MASCOT
              ================================================== */}

              <div
                className="
                  absolute

                  -bottom-14
                  -left-8

                  z-30

                  w-32

                  sm:-bottom-16
                  sm:-left-12
                  sm:w-40

                  lg:-bottom-20
                  lg:-left-14
                  lg:w-44
                "
              >
                <Image
                  src="/images/mascotte/mascotte2.png"
                  alt="Mascotte Trancetta"
                  width={220}
                  height={260}

                  className="
                    h-auto
                    w-full

                    object-contain

                    drop-shadow-[0_15px_15px_rgba(0,0,0,0.25)]

                    transition-transform
                    duration-500

                    hover:-rotate-6
                    hover:scale-105
                  "
                />
              </div>

              {/* =================================================
                  QUOTE BUBBLE
              ================================================== */}

              <div
                className="
                  absolute

                  right-3
                  top-4

                  z-30

                  max-w-[150px]

                  rounded-2xl

                  border
                  border-cream-dark

                  bg-white

                  px-4
                  py-3

                  shadow-xl

                  sm:-right-4
                  sm:max-w-44
                "
              >
                <p
                  className="
                    text-center

                    font-caveat

                    text-base
                    leading-tight

                    text-red-primary
                  "
                >
                  &quot;Chaque tranche,
                  une histoire !&quot;
                </p>

                {/* BUBBLE POINTER */}

                <span
                  className="
                    absolute
                    -bottom-2
                    left-8

                    h-4
                    w-4

                    rotate-45

                    border-b
                    border-r
                    border-cream-dark

                    bg-white
                  "
                />
              </div>
            </div>

            {/* =================================================
                STATS GRID
            ================================================== */}

            <div
              ref={statsRef}
              className="
                mt-20

                grid
                grid-cols-2

                gap-4

                lg:mt-20
              "
            >
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="
                    group

                    rounded-2xl

                    border
                    border-cream-dark

                    bg-cream-dark

                    p-5

                    text-center

                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:border-red-primary/30
                    hover:shadow-lg
                  "
                >
                  {/* NUMBER */}

                  <div
                    className="
                      mb-1

                      font-anton

                      text-red-primary

                      transition-transform
                      duration-300

                      group-hover:scale-105
                    "
                    style={{
                      fontSize: "2rem",
                    }}
                  >
                    <span
                      ref={(el) => {
                        counterRefs.current[i] = el;
                      }}
                      className="tabular-nums"
                    >
                      0{stat.suffix}
                    </span>
                  </div>

                  {/* LABEL */}

                  <div
                    className="
                      font-poppins

                      text-xs

                      text-text-secondary
                    "
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}