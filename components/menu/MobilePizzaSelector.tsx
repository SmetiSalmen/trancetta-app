"use client";

import { useRef } from "react";
import Image from "next/image";

import {
  ChevronLeft,
  ChevronRight,
  Check,
  Plus,
} from "lucide-react";

import {
  type Pizza,
} from "@/lib/pizzaData";

import {
  PLATE_SIZES,
} from "./PlateSizeSelector";


/* ============================================================
   TYPES
============================================================ */

type PlateSize =
  | "quarter"
  | "half"
  | "full";


interface MobilePizzaSelectorProps {
  pizzas: Pizza[];

  plateSize: PlateSize;

  onSelectZone: (
    zoneIndex: number
  ) => void;

  onSelectPizza: (
    pizza: Pizza
  ) => void;

  activeZone: number | null;

  selections: Record<
    string,
    Pizza | null
  >;
}


/* ============================================================
   COMPONENT
============================================================ */

export default function MobilePizzaSelector({
  pizzas,
  plateSize,
  onSelectZone,
  onSelectPizza,
  activeZone,
  selections,
}: MobilePizzaSelectorProps) {

  const scrollRef =
    useRef<HTMLDivElement>(null);


  const config =
    PLATE_SIZES.find(
      (size) => size.id === plateSize
    );


  if (!config) {
    return null;
  }


  const zones = Array.from(
    {
      length: config.zones,
    },

    (_, index) => index
  );


  /* ============================================================
     SCROLL PIZZAS
  ============================================================ */

  const scroll = (
    direction: "left" | "right"
  ) => {

    if (!scrollRef.current) {
      return;
    }


    scrollRef.current.scrollBy({
      left:
        direction === "left"
          ? -260
          : 260,

      behavior: "smooth",
    });
  };


  /* ============================================================
     PLATE GRID
  ============================================================ */

  const plateGridClass:
    Record<PlateSize, string> = {

    quarter:
      "grid-cols-1 grid-rows-1",

    half:
      "grid-cols-1 grid-rows-2",

    full:
      "grid-cols-2 grid-rows-2",
  };


  return (

    <div className="space-y-6">


      {/* =====================================================
          STEP 1 — SELECT ZONE
      ====================================================== */}

      <section>

        {/* Header */}

        <div className="mb-4 text-center">

          <div
            className="
              mx-auto
              mb-2

              flex
              h-7
              w-7
              items-center
              justify-center

              rounded-full

              bg-red-primary

              font-poppins
              text-xs
              font-bold
              text-white
            "
          >
            1
          </div>


          <h3
            className="
              font-poppins
              text-sm
              font-bold
              text-black-warm
            "
          >
            Choisis une partie du plateau
          </h3>


          <p
            className="
              mt-1
              font-poppins
              text-[11px]
              text-text-secondary
            "
          >
            Appuie sur la zone que tu veux remplir
          </p>

        </div>


        {/* =================================================
            MINI PLATE
        ================================================== */}

        <div
          className="
            mx-auto
            w-full
            max-w-[280px]
          "
        >

          {/* Wood board */}

          <div
            className="
              relative

              aspect-[3/4]

              overflow-hidden

              rounded-[26px]

              border-[5px]

              p-3

              shadow-xl
            "

            style={{
              background:
                "linear-gradient(145deg, #6B3A2A 0%, #8B4513 35%, #A0522D 65%, #7B3826 100%)",

              borderColor: "#5C2E1A",

              boxShadow:
                "0 16px 35px rgba(58,25,12,0.25)",
            }}
          >

            {/* Wood texture */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-25
              "

              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    2deg,
                    transparent 0px,
                    transparent 9px,
                    rgba(0,0,0,0.14) 9px,
                    rgba(0,0,0,0.14) 10px
                  )
                `,
              }}
            />


            {/* Zones */}

            <div
              className={`
                relative
                z-10

                grid
                h-full
                w-full

                gap-1.5

                ${plateGridClass[plateSize]}
              `}
            >

              {zones.map((index) => {

                const pizza =
                  selections[
                  `zone-${index}`
                  ];


                const isActive =
                  activeZone === index;


                return (

                  <button
                    key={index}

                    type="button"

                    onClick={() =>
                      onSelectZone(index)
                    }

                    aria-label={
                      `Sélectionner la zone ${index + 1
                      }`
                    }

                    className={`
                      group
                      relative

                      min-h-0
                      min-w-0

                      overflow-hidden

                      border-2

                      transition-all
                      duration-200

                      ${isActive
                        ? `
                            z-20
                            scale-[1.02]
                            border-red-primary
                            ring-4
                            ring-red-primary/25
                          `
                        : pizza
                          ? `
                            border-white/30
                          `
                          : `
                            border-dashed
                            border-white/40
                            bg-cream/90
                          `
                      }
                    `}
                  >

                    {/* =========================
                        FILLED ZONE
                    ========================== */}

                    {pizza ? (

                      <>

                        <Image
                          src={pizza.image}

                          alt={pizza.name}

                          fill

                          className="
                            object-cover

                            transition-transform
                            duration-300

                            group-active:scale-105
                          "

                          sizes="140px"
                        />


                        {/* Dark gradient */}

                        <div
                          className="
                            absolute
                            inset-0

                            bg-gradient-to-t

                            from-black/75
                            via-black/10
                            to-transparent
                          "
                        />


                        {/* Zone number */}

                        <div
                          className="
                            absolute
                            left-2
                            top-2

                            flex
                            h-6
                            w-6
                            items-center
                            justify-center

                            rounded-full

                            bg-white/90

                            font-poppins
                            text-[10px]
                            font-bold
                            text-red-primary

                            shadow-sm
                          "
                        >
                          {index + 1}
                        </div>


                        {/* Pizza name */}

                        <div
                          className="
                            absolute
                            inset-x-0
                            bottom-0

                            p-2
                          "
                        >

                          <p
                            className="
                              truncate

                              font-poppins
                              text-[10px]
                              font-bold
                              text-white
                            "
                          >
                            {pizza.name}
                          </p>


                          <p
                            className="
                              font-anton
                              text-xs
                              text-orange-pizza
                            "
                          >
                            {pizza.priceQuarter} DT
                          </p>

                        </div>


                        {/* Active overlay */}

                        {isActive && (

                          <div
                            className="
                              pointer-events-none

                              absolute
                              inset-0

                              flex
                              items-center
                              justify-center

                              bg-red-primary/15
                            "
                          >

                            <div
                              className="
                                rounded-full

                                bg-white

                                px-2.5
                                py-1

                                font-poppins
                                text-[9px]
                                font-bold
                                text-red-primary

                                shadow-lg
                              "
                            >
                              Modifier
                            </div>

                          </div>

                        )}

                      </>

                    ) : (

                      /* =========================
                          EMPTY ZONE
                      ========================== */

                      <div
                        className="
                          absolute
                          inset-0

                          flex
                          flex-col
                          items-center
                          justify-center

                          gap-1.5

                          p-2
                        "
                      >

                        <div
                          className={`
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center

                            rounded-full

                            transition-all

                            ${isActive
                              ? `
                                  bg-red-primary
                                  text-white
                                  shadow-md
                                `
                              : `
                                  border
                                  border-dashed
                                  border-brown/40

                                  bg-white/70
                                  text-brown
                                `
                            }
                          `}
                        >

                          <Plus size={16} />

                        </div>


                        <span
                          className={`
                            font-poppins
                            text-[9px]
                            font-semibold

                            ${isActive
                              ? "text-red-primary"
                              : "text-text-secondary"
                            }
                          `}
                        >
                          Zone {index + 1}
                        </span>

                      </div>

                    )}


                    {/* Active border */}

                    {isActive && (

                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0

                          border-2
                          border-red-primary
                        "
                      />

                    )}

                  </button>

                );
              })}

            </div>


            {/* Branding */}

            <div
              className="
                pointer-events-none

                absolute
                bottom-1.5
                right-4

                z-20

                font-anton
                text-[8px]
                tracking-[0.2em]
                text-white/20
              "
            >
              TRANCETTA
            </div>

          </div>

        </div>


        {/* Active instruction */}

        <div
          className="
            mt-4
            min-h-[42px]

            text-center
          "
        >

          {activeZone !== null ? (

            <div
              className="
                inline-flex
                items-center
                gap-2

                rounded-full

                bg-red-primary/10

                px-4
                py-2
              "
            >

              <span
                className="
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center

                  rounded-full

                  bg-red-primary

                  font-poppins
                  text-[9px]
                  font-bold
                  text-white
                "
              >
                {activeZone + 1}
              </span>


              <p
                className="
                  font-poppins
                  text-[11px]
                  font-semibold
                  text-red-primary
                "
              >
                Choisis maintenant ta pizza ↓
              </p>

            </div>

          ) : (

            <p
              className="
                font-poppins
                text-[11px]
                text-text-secondary
              "
            >
              Sélectionne d&apos;abord une zone
            </p>

          )}

        </div>

      </section>


      {/* =====================================================
          STEP 2 — SELECT PIZZA
      ====================================================== */}

      <section>

        {/* Header */}

        <div className="mb-3 text-center">

          <div
            className="
              mx-auto
              mb-2

              flex
              h-7
              w-7
              items-center
              justify-center

              rounded-full

              bg-orange-pizza

              font-poppins
              text-xs
              font-bold
              text-white
            "
          >
            2
          </div>


          <h3
            className="
              font-poppins
              text-sm
              font-bold
              text-black-warm
            "
          >
            Choisis ta pizza
          </h3>

        </div>


        {/* Pizza slider */}

        <div className="relative">


          {/* LEFT BUTTON */}

          <button
            type="button"

            onClick={() =>
              scroll("left")
            }

            aria-label="Pizzas précédentes"

            className="
              absolute
              left-0
              top-1/2
              z-20

              flex
              h-9
              w-9

              -translate-y-1/2

              items-center
              justify-center

              rounded-full

              border
              border-cream-dark

              bg-white

              text-text-secondary

              shadow-lg

              transition-all

              hover:text-red-primary
              active:scale-95
            "
          >
            <ChevronLeft size={18} />
          </button>


          {/* CARDS */}

          <div
            ref={scrollRef}

            className="
              flex
              gap-3

              overflow-x-auto

              px-11
              pb-3

              scrollbar-none

              overscroll-x-contain
            "

            style={{
              scrollSnapType: "x mandatory",
            }}
          >

            {pizzas.map((pizza) => {

              const isAlreadySelected =
                Object.values(
                  selections
                ).some(
                  (selectedPizza) =>
                    selectedPizza?.id ===
                    pizza.id
                );


              const disabled =
                activeZone === null;


              return (

                <button
                  key={pizza.id}

                  type="button"

                  disabled={disabled}

                  onClick={() => {
                    if (!disabled) {
                      onSelectPizza(pizza);
                    }
                  }}

                  className={`
                    group
                    relative

                    w-36
                    flex-shrink-0

                    overflow-hidden

                    rounded-2xl

                    border-2

                    bg-white

                    text-left

                    transition-all
                    duration-200

                    ${disabled
                      ? `
                          cursor-not-allowed
                          border-cream-dark
                          opacity-45
                        `
                      : isAlreadySelected
                        ? `
                          cursor-pointer
                          border-green-accent
                          shadow-md
                        `
                        : `
                          cursor-pointer
                          border-cream-dark

                          active:scale-[0.97]
                        `
                    }
                  `}

                  style={{
                    scrollSnapAlign: "start",
                  }}
                >

                  {/* Image */}

                  <div
                    className="
                      relative
                      h-24
                      overflow-hidden
                      bg-cream-dark
                    "
                  >

                    <Image
                      src={pizza.image}

                      alt={pizza.name}

                      fill

                      className="
                        object-cover

                        transition-transform
                        duration-300

                        group-active:scale-105
                      "

                      sizes="144px"
                    />


                    <div
                      className="
                        pointer-events-none

                        absolute
                        inset-0

                        bg-gradient-to-t

                        from-black/30
                        to-transparent
                      "
                    />


                    {/* Selected indicator */}

                    {isAlreadySelected && (

                      <div
                        className="
                          absolute
                          right-2
                          top-2

                          flex
                          h-6
                          w-6
                          items-center
                          justify-center

                          rounded-full

                          bg-green-accent

                          text-white

                          shadow-md
                        "
                      >
                        <Check size={13} />
                      </div>

                    )}

                  </div>


                  {/* Info */}

                  <div className="p-2.5">

                    <p
                      className="
                        truncate

                        font-poppins
                        text-[11px]
                        font-bold
                        text-black-warm
                      "
                    >
                      {pizza.name}
                    </p>


                    <div
                      className="
                        mt-1.5

                        flex
                        items-end
                        justify-between
                      "
                    >

                      <span
                        className="
                          font-anton
                          text-base
                          leading-none
                          text-red-primary
                        "
                      >
                        {pizza.priceQuarter}
                        <span className="ml-0.5 text-xs">
                          DT
                        </span>
                      </span>


                      <span
                        className="
                          font-poppins
                          text-[8px]
                          text-text-secondary
                        "
                      >
                        1/4
                      </span>

                    </div>

                  </div>

                </button>

              );
            })}

          </div>


          {/* RIGHT BUTTON */}

          <button
            type="button"

            onClick={() =>
              scroll("right")
            }

            aria-label="Pizzas suivantes"

            className="
              absolute
              right-0
              top-1/2
              z-20

              flex
              h-9
              w-9

              -translate-y-1/2

              items-center
              justify-center

              rounded-full

              border
              border-cream-dark

              bg-white

              text-text-secondary

              shadow-lg

              transition-all

              hover:text-red-primary
              active:scale-95
            "
          >
            <ChevronRight size={18} />
          </button>

        </div>

      </section>

    </div>
  );
}