"use client";

import { useEffect, useRef } from "react";
import { Pizza, Layers3, Leaf, Flame } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { registerGSAP } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   DATA
============================================================ */

const FEATURES = [
    {
        id: 1,
        icon: Pizza,
        line1: "PIZZA EN",
        line2: "TRANCHE",
    },
    {
        id: 2,
        icon: Layers3,
        line1: "PLATEAUX",
        line2: "À PARTAGER",
    },
    {
        id: 3,
        icon: Leaf,
        line1: "INGRÉDIENTS",
        line2: "DE QUALITÉ",
    },
    {
        id: 4,
        icon: Flame,
        line1: "CUISSON",
        line2: "MAÎTRISÉE",
    },
];

/* ============================================================
   COMPONENT
============================================================ */

export default function HeroFeaturesBar() {
    const sectionRef = useRef<HTMLElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        registerGSAP();

        const ctx = gsap.context(() => {
            if (!featuresRef.current) return;

            gsap.fromTo(
                Array.from(featuresRef.current.children),
                {
                    opacity: 0,
                    y: 25,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.65,
                    stagger: 0.12,
                    ease: "power3.out",

                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 92%",
                        once: true,
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="
        relative
        z-20
        overflow-hidden
        bg-red-primary
      "
        >
            {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

            <div
                className="
          pointer-events-none
          absolute
          inset-0
        "
                aria-hidden="true"
            >
                {/* Dark gradient */}

                <div
                    className="
            absolute
            inset-0
            bg-gradient-to-r
            from-red-dark/25
            via-transparent
            to-red-dark/20
          "
                />

                {/* Light glow */}

                <div
                    className="
            absolute
            -top-20
            left-1/2
            h-40
            w-[500px]
            -translate-x-1/2
            rounded-full
            bg-orange-pizza/10
            blur-3xl
          "
                />

                {/* Decorative circles */}

                <div
                    className="
            absolute
            -bottom-24
            -left-24
            h-48
            w-48
            rounded-full
            border
            border-white/5
          "
                />

                <div
                    className="
            absolute
            -right-16
            -top-20
            h-48
            w-48
            rounded-full
            border
            border-white/5
          "
                />
            </div>

            {/* =====================================================
          FEATURES
      ====================================================== */}

            <div className="container-custom relative z-10">
                <div
                    ref={featuresRef}
                    className="
            grid
            grid-cols-2
            lg:grid-cols-4
          "
                >
                    {FEATURES.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.id}
                                className={`
                  group
                  relative
 
                  flex
                  min-h-[105px]
                  items-center
                  justify-start
 
                  gap-3
 
                  px-3
                  py-5
 
                  sm:gap-5
                  sm:px-6
 
                  lg:min-h-[120px]
                  lg:px-7
 
                  ${index === 0 || index === 2
                                        ? "border-r border-white/25"
                                        : ""
                                    }
 
                  ${index < 2
                                        ? "border-b border-white/20 lg:border-b-0"
                                        : ""
                                    }
 
                  ${index > 0
                                        ? "lg:border-l lg:border-white/25"
                                        : ""
                                    }
                `}
                            >
                                {/* ===========================================
                    ICON
                ============================================ */}

                                <div
                                    className="
                    flex
                    h-12
                    w-12
                    flex-shrink-0
                    items-center
                    justify-center
 
                    text-orange-pizza
 
                    transition-all
                    duration-300
 
                    group-hover:-translate-y-1
                    group-hover:scale-110
 
                    sm:h-14
                    sm:w-14
                  "
                                >
                                    <Icon
                                        size={46}
                                        strokeWidth={1.4}
                                        aria-hidden="true"
                                    />
                                </div>

                                {/* ===========================================
                    TEXT
                ============================================ */}

                                <div className="min-w-0">
                                    <p
                                        className="
                      font-anton
                      text-[15px]
                      uppercase
                      leading-[1.35]
                      tracking-wide
                      text-white

                      sm:text-lg

                      lg:text-[19px]

                      xl:text-[21px]
                    "
                                    >
                                        <span className="block">
                                            {feature.line1}
                                        </span>

                                        <span className="block">
                                            {feature.line2}
                                        </span>
                                    </p>
                                </div>

                                {/* ===========================================
                    MOBILE HOVER LINE
                ============================================ */}

                                <div
                                    className="
                    absolute
                    bottom-0
                    left-1/2
 
                    h-[3px]
                    w-0
 
                    -translate-x-1/2
 
                    bg-orange-pizza
 
                    transition-all
                    duration-300
 
                    group-hover:w-1/2
                  "
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
