"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { registerGSAP } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   FORMAT OPTIONS
============================================================ */

const FORMAT_OPTIONS = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-orange-pizza"
      >
        <path d="M15 11h.01M11 15h.01M16 16h.01m-10.7-3.3C4.2 8.4 8.4 4.2 12.7 5.3c5 1.2 7 6.7 4 10.4-2.2 2.7-6.2 3.3-9.1 1.6l-3.3.9.9-3.2z" />
      </svg>
    ),
    label: "En Tranche",
    desc: "Idéal solo",
  },
  {
    icon: (
      <span className="font-anton text-xl text-red-primary">
        ¼
      </span>
    ),
    label: "Quart Plateau",
    desc: "2-3 personnes",
  },
  {
    icon: (
      <span className="font-anton text-xl text-red-primary">
        ½
      </span>
    ),
    label: "Demi Plateau",
    desc: "3-4 personnes",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-orange-pizza"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="2"
        />

        <line
          x1="3"
          y1="12"
          x2="21"
          y2="12"
          strokeDasharray="3 3"
        />

        <line
          x1="12"
          y1="3"
          x2="12"
          y2="21"
          strokeDasharray="3 3"
        />
      </svg>
    ),
    label: "Plateau Complet",
    desc: "4-6 personnes",
  },
];

/* ============================================================
   COMPONENT
============================================================ */

export default function ConceptSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  /* ==========================================================
     GSAP ANIMATIONS
  ========================================================== */

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      /* LEFT VISUAL */

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            opacity: 0,
            x: -60,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      /* RIGHT TEXT */

      if (textRef.current) {
        gsap.fromTo(
          Array.from(textRef.current.children),
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      /* FORMAT CARDS */

      if (cardsRef.current) {
        gsap.fromTo(
          Array.from(cardsRef.current.children),
          {
            opacity: 0,
            y: 35,
            scale: 0.94,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <section
      id="concept"
      ref={sectionRef}
      className="
        section-padding
        overflow-x-hidden
        overflow-y-visible
        bg-cream-dark
      "
    >
      <div className="container-custom">
        <div
          className="
            grid
            items-center
            gap-20

            lg:grid-cols-2
            lg:gap-16

            xl:gap-20
          "
        >
          {/* =================================================
              LEFT SIDE
          ================================================== */}

          <div
            ref={imageRef}
            className="
              relative
              order-2
              opacity-0
              overflow-visible
              pb-10

              lg:order-1
              lg:pb-0
            "
          >
            {/* ===============================================
                MAIN IMAGE CARD
            ================================================ */}

            <div
              className="
                relative
                min-h-[400px]
                overflow-hidden

                rounded-[32px]

                border
                border-white/60

                bg-gradient-to-br
                from-[#F8F3EE]
                via-[#F3E9E0]
                to-[#E8D8CC]

                shadow-pizza

                sm:min-h-[460px]
                lg:min-h-[500px]
              "
            >
              {/* BACKGROUND DECORATION */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                "
                aria-hidden="true"
              >
                {/* RED GLOW */}

                <div
                  className="
                    absolute
                    -left-28
                    -top-28

                    h-72
                    w-72

                    rounded-full

                    bg-red-primary/10

                    blur-3xl
                  "
                />

                {/* ORANGE GLOW */}

                <div
                  className="
                    absolute
                    -bottom-28
                    -right-28

                    h-72
                    w-72

                    rounded-full

                    bg-orange-pizza/15

                    blur-3xl
                  "
                />

                {/* BIG CIRCLE */}

                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2

                    h-[340px]
                    w-[340px]

                    -translate-x-1/2
                    -translate-y-1/2

                    rounded-full

                    border
                    border-red-primary/10

                    sm:h-[400px]
                    sm:w-[400px]
                  "
                />

                {/* INNER CIRCLE */}

                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2

                    h-[250px]
                    w-[250px]

                    -translate-x-1/2
                    -translate-y-1/2

                    rounded-full

                    bg-white/20
                  "
                />

                {/* DOT PATTERN */}

                <div
                  className="
                    absolute
                    left-6
                    top-6

                    grid
                    grid-cols-4
                    gap-2

                    opacity-30
                  "
                >
                  {Array.from({ length: 16 }).map((_, index) => (
                    <span
                      key={index}
                      className="
                        h-1.5
                        w-1.5

                        rounded-full

                        bg-orange-pizza
                      "
                    />
                  ))}
                </div>
              </div>

              {/* =============================================
                  PLATE IMAGE
              ============================================== */}

              <div
                className="
                  absolute
                  inset-x-2
                  bottom-10
                  top-8

                  z-10

                  sm:inset-x-4

                  lg:inset-x-0
                  lg:bottom-8
                  lg:top-6
                "
              >
                <Image
                  src="/images/plat.png"
                  alt="Grand plateau rectangulaire Trancetta"
                  fill
                  priority
                  sizes="
                    (max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    600px
                  "
                  className="
                    object-contain

                    drop-shadow-[0_30px_25px_rgba(10,8,8,0.28)]

                    transition-transform
                    duration-700

                    hover:scale-[1.03]
                  "
                />
              </div>

              {/* BOTTOM GRADIENT */}

              <div
                className="
                  pointer-events-none

                  absolute
                  inset-x-0
                  bottom-0

                  z-20

                  h-28

                  bg-gradient-to-t
                  from-black-warm/65
                  via-black-warm/20
                  to-transparent
                "
              />
            </div>

            {/* ===============================================
                FLOATING TEXT
            ================================================ */}

            <div
              className="
                absolute
                -bottom-1
                left-5

                z-40

                max-w-[75%]

                sm:left-8
              "
            >
              <div
                className="
                  rounded-2xl

                  border
                  border-white/10

                  bg-black-warm/90

                  px-5
                  py-3

                  shadow-2xl

                  backdrop-blur-md
                "
              >
                <p
                  className="
                    font-caveat

                    text-lg
                    leading-tight

                    text-white

                    sm:text-xl
                    lg:text-2xl
                  "
                >
                  Le plateau qui fait tourner les têtes !
                </p>
              </div>
            </div>

            {/* ===============================================
                FLOATING SPECIALITY BADGE
            ================================================ */}

            <div
              className="
                absolute
                -right-2
                -top-5

                z-50

                flex
                h-[90px]
                w-[90px]

                rotate-12

                flex-col
                items-center
                justify-center
                gap-1

                rounded-full

                border-[5px]
                border-cream-dark

                bg-red-primary

                text-white

                shadow-2xl

                transition-all
                duration-300

                hover:rotate-6
                hover:scale-105

                sm:-right-5
                sm:-top-7
                sm:h-[105px]
                sm:w-[105px]
              "
            >
              <span
                className="
                  px-2

                  text-center

                  font-poppins

                  text-[9px]
                  font-bold

                  uppercase

                  leading-[1.15]

                  sm:text-[10px]
                "
              >
                Notre
                <br />
                Spécialité
              </span>

              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#F5C02B"
                stroke="#DCA219"
                strokeWidth="1.5"
                className="animate-pulse"
                aria-hidden="true"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>

            {/* ===============================================
                FLOATING 4 FORMATS BADGE
            ================================================ */}

            <div
              className="
                absolute
                -bottom-8
                right-4

                z-50

                rounded-2xl

                border
                border-cream-dark

                bg-white

                px-4
                py-3

                shadow-2xl

                sm:right-6
                sm:px-5
                sm:py-4
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                {/* ICON */}

                <div
                  className="
                    flex
                    h-10
                    w-10

                    flex-shrink-0

                    items-center
                    justify-center

                    rounded-full

                    bg-orange-pizza/10

                    text-orange-pizza
                  "
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 11h.01M11 15h.01M16 16h.01m-10.7-3.3C4.2 8.4 8.4 4.2 12.7 5.3c5 1.2 7 6.7 4 10.4-2.2 2.7-6.2 3.3-9.1 1.6l-3.3.9.9-3.2z" />
                  </svg>
                </div>

                {/* TEXT */}

                <div>
                  <p
                    className="
                      font-poppins

                      text-[10px]

                      leading-tight

                      text-text-secondary

                      sm:text-[11px]
                    "
                  >
                    Disponible en
                  </p>

                  <p
                    className="
                      mt-1

                      whitespace-nowrap

                      font-anton

                      text-base

                      leading-none

                      text-black-warm

                      sm:text-lg
                    "
                  >
                    4 FORMATS
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================== */}

          <div
            ref={textRef}
            className="
              order-1

              lg:order-2
            "
          >
            {/* BADGE */}

            <div
              className="
                mb-5

                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-red-primary/20

                bg-red-primary/10

                px-4
                py-1.5
              "
            >
              <span
                className="
                  h-2
                  w-2

                  rounded-full

                  bg-red-primary
                "
              />

              <span
                className="
                  font-poppins

                  text-xs
                  font-semibold

                  uppercase

                  tracking-wider

                  text-red-primary
                "
              >
                Le Concept
              </span>
            </div>

            {/* TITLE */}

            <h2
              className="
                mb-4

                font-anton

                leading-[1.05]

                text-black-warm
              "
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              }}
            >
              LA PIZZA{" "}
              <span className="text-red-primary">
                AUTREMENT.
              </span>
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mb-6

                font-poppins

                text-base
                leading-relaxed

                text-text-secondary
              "
            >
              Chez Trancetta, la pizza se découvre en tranche et
              se partage en plateau. Choisis tes saveurs préférées,
              compose ton plateau et profite de plusieurs recettes
              autour d&apos;une même table.
            </p>

            <p
              className="
                mb-8

                font-poppins

                text-base
                leading-relaxed

                text-text-secondary
              "
            >
              Une tranche pour toi. Un plateau pour la squadra.
            </p>

            {/* ===============================================
                FORMAT CARDS
            ================================================ */}

            <div
              ref={cardsRef}
              className="
                mb-8

                grid
                grid-cols-2
                gap-3
              "
            >
              {FORMAT_OPTIONS.map((format) => (
                <div
                  key={format.label}
                  className="
                    group

                    rounded-2xl

                    border
                    border-cream-dark

                    bg-white

                    p-4

                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:border-red-primary/40
                    hover:shadow-card
                  "
                >
                  <div
                    className="
                      mb-2

                      text-2xl

                      transition-transform
                      duration-200

                      group-hover:scale-110
                    "
                  >
                    {format.icon}
                  </div>

                  <div
                    className="
                      font-poppins

                      text-sm
                      font-semibold

                      text-black-warm
                    "
                  >
                    {format.label}
                  </div>

                  <div
                    className="
                      mt-0.5

                      font-poppins

                      text-xs

                      text-text-secondary
                    "
                  >
                    {format.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* ===============================================
                CTA
            ================================================ */}

            <Link
              href="/menu"
              className="
                btn-primary

                inline-flex
                items-center
                justify-center
              "
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
                aria-hidden="true"
              >
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