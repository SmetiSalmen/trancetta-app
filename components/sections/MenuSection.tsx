"use client";

import { useMemo, useState } from "react";

import PizzaCard from "@/components/ui/PizzaCard";

import {
    PIZZAS,
    DRINKS,
    type PizzaCategory,
} from "@/lib/pizzaData";


/* ============================================================
   TYPES
============================================================ */

type CategoryFilter =
    | "all"
    | PizzaCategory;


/* ============================================================
   CATEGORY CONFIG
============================================================ */

const CATEGORIES: {
    id: CategoryFilter;
    label: string;
}[] = [
        {
            id: "all",
            label: "Toutes",
        },

        {
            id: "classique",
            label: "Classiques",
        },

        {
            id: "signature",
            label: "Signatures",
        },

        {
            id: "premium",
            label: "Premium",
        },

        {
            id: "vegetarienne",
            label: "Végétariennes",
        },
    ];


/* ============================================================
   DRINK ICON
============================================================ */

function DrinkIcon() {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M7 2h10" />
            <path d="M8 2l1 4" />
            <path d="M16 2l-1 4" />
            <path d="M7 6h10l-1 16H8L7 6z" />
            <path d="M9 11h6" />
        </svg>
    );
}


/* ============================================================
   PIZZA ICON
============================================================ */

function PizzaIcon() {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M12 2C7 4 3.5 8 2 13l10 9 10-9C20.5 8 17 4 12 2z" />

            <path d="M4.5 11.5c5-2.5 10-2.5 15 0" />

            <circle
                cx="9"
                cy="10"
                r="1"
            />

            <circle
                cx="14"
                cy="8"
                r="1"
            />

            <circle
                cx="15"
                cy="13"
                r="1"
            />
        </svg>
    );
}


/* ============================================================
   DECORATIVE DOTS
============================================================ */

function DecorativeDots() {
    return (
        <div
            className="
        pointer-events-none

        absolute
        right-6
        top-16

        hidden

        grid-cols-4
        gap-2

        opacity-30

        lg:grid
      "
            aria-hidden="true"
        >
            {Array.from({
                length: 16,
            }).map((_, index) => (
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
    );
}


/* ============================================================
   MENU SECTION
============================================================ */

export default function MenuSection() {
    const [
        activeCategory,
        setActiveCategory,
    ] = useState<CategoryFilter>("all");


    /* ========================================================
       FILTERED PIZZAS
    ======================================================== */

    const filteredPizzas = useMemo(() => {
        if (activeCategory === "all") {
            return PIZZAS.filter(
                (pizza) => pizza.isAvailable
            );
        }

        return PIZZAS.filter(
            (pizza) =>
                pizza.isAvailable &&
                pizza.category ===
                activeCategory
        );
    }, [activeCategory]);


    return (
        <section
            id="menu"
            className="
        relative
        overflow-hidden
        bg-cream

        py-16

        sm:py-20
        lg:py-24
      "
        >
            <DecorativeDots />


            {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

            <div
                className="
          pointer-events-none

          absolute
          -left-32
          top-1/3

          h-72
          w-72

          rounded-full

          bg-red-primary/5

          blur-3xl
        "
            />

            <div
                className="
          pointer-events-none

          absolute
          -right-32
          bottom-1/4

          h-72
          w-72

          rounded-full

          bg-orange-pizza/10

          blur-3xl
        "
            />


            <div
                className="
          container-custom
          relative
          z-10
        "
            >

                {/* ===================================================
            HEADER
        ==================================================== */}

                <header
                    className="
            mx-auto
            mb-10
            max-w-3xl
            text-center

            lg:mb-14
          "
                >
                    <span
                        className="
              inline-block

              font-caveat
              text-xl
              text-green-accent

              sm:text-2xl
            "
                    >
                        È l&apos;ora della pizza !
                    </span>


                    <h2
                        className="
              mt-1

              font-anton
              text-5xl
              uppercase
              leading-none
              text-black-warm

              sm:text-6xl
              lg:text-7xl
            "
                    >
                        Notre{" "}

                        <span className="text-red-primary">
                            Menu
                        </span>
                    </h2>


                    <p
                        className="
              mx-auto
              mt-4
              max-w-xl

              font-poppins
              text-sm
              leading-relaxed
              text-text-secondary

              sm:text-base
            "
                    >
                        Découvre toutes nos pizzas,
                        disponibles en tranche,
                        1/4 plateau, 1/2 plateau
                        ou plateau complet.
                    </p>
                </header>


                {/* ===================================================
            FORMAT INFORMATION
        ==================================================== */}

                <div
                    className="
            mx-auto
            mb-8

            grid
            max-w-4xl
            grid-cols-2

            overflow-hidden
            rounded-2xl

            border
            border-cream-dark

            bg-white

            shadow-sm

            sm:grid-cols-4
          "
                >
                    {[
                        {
                            title: "Tranche",
                            subtitle: "Pour une petite faim",
                        },

                        {
                            title: "1/4 Plateau",
                            subtitle: "Une saveur",
                        },

                        {
                            title: "1/2 Plateau",
                            subtitle: "À partager",
                        },

                        {
                            title: "Plateau",
                            subtitle: "Pour toute la squadra",
                        },
                    ].map(
                        (
                            format,
                            index
                        ) => (
                            <div
                                key={format.title}
                                className={`
                  flex
                  min-h-[76px]
                  flex-col
                  items-center
                  justify-center

                  px-3
                  py-3

                  text-center

                  ${index !== 3
                                        ? "sm:border-r sm:border-cream-dark"
                                        : ""
                                    }

                  ${index < 2
                                        ? "border-b border-cream-dark sm:border-b-0"
                                        : ""
                                    }

                  ${index % 2 === 0
                                        ? "border-r border-cream-dark sm:border-r"
                                        : ""
                                    }
                `}
                            >
                                <span
                                    className="
                    font-anton
                    text-lg
                    uppercase
                    text-red-primary
                  "
                                >
                                    {format.title}
                                </span>

                                <span
                                    className="
                    mt-0.5

                    font-poppins
                    text-[9px]
                    text-text-secondary

                    sm:text-[10px]
                  "
                                >
                                    {format.subtitle}
                                </span>
                            </div>
                        )
                    )}
                </div>


                {/* ===================================================
            CATEGORY FILTER
        ==================================================== */}

                <div
                    className="
            mb-10

            flex
            flex-wrap
            items-center
            justify-center
            gap-2

            lg:mb-12
          "
                >
                    {CATEGORIES.map(
                        (category) => {
                            const isActive =
                                activeCategory ===
                                category.id;

                            return (
                                <button
                                    key={category.id}
                                    type="button"
                                    onClick={() =>
                                        setActiveCategory(
                                            category.id
                                        )
                                    }
                                    className={`
                    rounded-full

                    border

                    px-4
                    py-2.5

                    font-poppins
                    text-xs
                    font-semibold

                    transition-all
                    duration-200

                    sm:px-5

                    ${isActive
                                            ? `
                          border-red-primary
                          bg-red-primary
                          text-white
                          shadow-md
                        `
                                            : `
                          border-cream-dark
                          bg-white
                          text-text-secondary

                          hover:border-red-primary/40
                          hover:text-red-primary
                        `
                                        }
                  `}
                                >
                                    {category.label}
                                </button>
                            );
                        }
                    )}
                </div>


                {/* ===================================================
            SECTION TITLE
        ==================================================== */}

                <div
                    className="
            mb-6

            flex
            items-center
            gap-3

            sm:mb-8
          "
                >
                    <div
                        className="
              flex
              h-11
              w-11
              flex-shrink-0
              items-center
              justify-center

              rounded-xl

              bg-red-primary

              text-white

              shadow-md
            "
                    >
                        <PizzaIcon />
                    </div>


                    <div>
                        <h3
                            className="
                font-anton
                text-2xl
                uppercase
                text-black-warm

                sm:text-3xl
              "
                        >
                            Nos{" "}

                            <span className="text-red-primary">
                                Pizzas
                            </span>
                        </h3>

                        <p
                            className="
                font-poppins
                text-[10px]
                text-text-secondary

                sm:text-xs
              "
                        >
                            Choisis ta pizza et le
                            format qui te convient.
                        </p>
                    </div>


                    <div
                        className="
              ml-auto
              hidden

              font-poppins
              text-xs
              text-text-secondary

              sm:block
            "
                    >
                        {filteredPizzas.length}{" "}
                        {filteredPizzas.length > 1
                            ? "pizzas"
                            : "pizza"}
                    </div>
                </div>


                {/* ===================================================
            PIZZA GRID
        ==================================================== */}

                {filteredPizzas.length > 0 ? (
                    <div
                        className="
              grid
              grid-cols-1

              gap-5

              md:grid-cols-2

              xl:grid-cols-3

              lg:gap-6
            "
                    >
                        {filteredPizzas.map(
                            (pizza) => (
                                <PizzaCard
                                    key={pizza.id}
                                    pizza={pizza}
                                    variant="menu"
                                />
                            )
                        )}
                    </div>
                ) : (
                    <div
                        className="
              flex
              min-h-[250px]
              items-center
              justify-center

              rounded-3xl

              border
              border-dashed
              border-cream-dark

              bg-white/60

              px-6
              text-center
            "
                    >
                        <div>
                            <span className="text-4xl">
                                🍕
                            </span>

                            <p
                                className="
                  mt-3

                  font-poppins
                  text-sm
                  text-text-secondary
                "
                            >
                                Aucune pizza disponible
                                dans cette catégorie.
                            </p>
                        </div>
                    </div>
                )}


                {/* ===================================================
            DRINKS SECTION
        ==================================================== */}

                <div
                    className="
            mt-16

            lg:mt-24
          "
                >
                    {/* DRINK HEADER */}

                    <div
                        className="
              mb-6

              flex
              items-center
              gap-3

              sm:mb-8
            "
                    >
                        <div
                            className="
                flex
                h-11
                w-11
                flex-shrink-0
                items-center
                justify-center

                rounded-xl

                bg-green-accent

                text-white

                shadow-md
              "
                        >
                            <DrinkIcon />
                        </div>


                        <div>
                            <h3
                                className="
                  font-anton
                  text-2xl
                  uppercase
                  text-black-warm

                  sm:text-3xl
                "
                            >
                                Nos{" "}

                                <span className="text-green-accent">
                                    Boissons
                                </span>
                            </h3>

                            <p
                                className="
                  font-poppins
                  text-[10px]
                  text-text-secondary

                  sm:text-xs
                "
                            >
                                Pour accompagner ta pizza.
                            </p>
                        </div>
                    </div>


                    {/* DRINK GRID */}

                    <div
                        className="
              grid
              grid-cols-1

              gap-3

              sm:grid-cols-2

              lg:grid-cols-3
            "
                    >
                        {DRINKS.map(
                            (drink) => (
                                <article
                                    key={drink.id}
                                    className="
                    group

                    flex
                    items-center
                    justify-between
                    gap-4

                    rounded-2xl

                    border
                    border-cream-dark

                    bg-white

                    px-5
                    py-4

                    shadow-sm

                    transition-all
                    duration-200

                    hover:-translate-y-0.5
                    hover:border-green-accent/30
                    hover:shadow-md
                  "
                                >
                                    <div
                                        className="
                      flex
                      items-center
                      gap-3
                    "
                                    >
                                        <div
                                            className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center

                        rounded-full

                        bg-green-accent/10

                        text-green-accent

                        transition-colors

                        group-hover:bg-green-accent
                        group-hover:text-white
                      "
                                        >
                                            <DrinkIcon />
                                        </div>


                                        <h4
                                            className="
                        font-poppins
                        text-sm
                        font-semibold
                        text-black-warm
                      "
                                        >
                                            {drink.name}
                                        </h4>
                                    </div>


                                    <span
                                        className="
                      flex-shrink-0

                      font-anton
                      text-xl
                      text-red-primary
                    "
                                    >
                                        {drink.price
                                            .toFixed(3)
                                            .replace(".", ",")}{" "}
                                        DT
                                    </span>
                                </article>
                            )
                        )}
                    </div>
                </div>


                {/* ===================================================
            BOTTOM MESSAGE
        ==================================================== */}

                <div
                    className="
            mx-auto
            mt-12
            max-w-2xl

            rounded-2xl

            border
            border-orange-pizza/20

            bg-orange-pizza/5

            px-5
            py-4

            text-center
          "
                >
                    <p
                        className="
              font-caveat
              text-xl
              text-red-primary

              sm:text-2xl
            "
                    >
                        Une tranche pour toi,
                        un plateau pour la squadra 🍕
                    </p>
                </div>

            </div>
        </section>
    );
}