"use client";

import {
  Check,
  Users,
} from "lucide-react";


/* ============================================================
   TYPES
============================================================ */

export type PlateSize =
  | "quarter"
  | "half"
  | "full";


export interface PlateSizeOption {
  id: PlateSize;

  label: string;

  shortLabel: string;

  zones: number;

  desc: string;

  persons: string;
}


/* ============================================================
   PLATE CONFIGURATION
============================================================ */

export const PLATE_SIZES: PlateSizeOption[] = [
  {
    id: "quarter",

    label: "1/4 Plateau",

    shortLabel: "1/4",

    zones: 1,

    desc: "1 saveur",

    persons: "1–2 personnes",
  },

  {
    id: "half",

    label: "1/2 Plateau",

    shortLabel: "1/2",

    zones: 2,

    desc: "Jusqu'à 2 saveurs",

    persons: "2–3 personnes",
  },

  {
    id: "full",

    label: "Plateau Complet",

    shortLabel: "Complet",

    zones: 4,

    desc: "Jusqu'à 4 saveurs",

    persons: "4–6 personnes",
  },
];


/* ============================================================
   PROPS
============================================================ */

interface PlateSizeSelectorProps {
  selected: PlateSize;

  onChange: (
    id: PlateSize
  ) => void;
}


/* ============================================================
   PLATE ICON
============================================================ */

function PlateFormatIcon({
  type,
  active,
}: {
  type: PlateSize;

  active: boolean;
}) {
  const borderColor = active
    ? "border-white"
    : "border-red-primary";


  const separatorColor = active
    ? "bg-white/80"
    : "bg-red-primary/70";


  /* ==========================================================
     QUARTER
  ========================================================== */

  if (type === "quarter") {
    return (
      <div
        className={`
          relative

          h-12
          w-16

          overflow-hidden

          rounded-lg

          border-2

          ${borderColor}
        `}
      >
        <div
          className={`
            absolute
            inset-1

            rounded-md

            ${active
              ? "bg-white/20"
              : "bg-red-primary/10"
            }
          `}
        />
      </div>
    );
  }


  /* ==========================================================
     HALF
  ========================================================== */

  if (type === "half") {
    return (
      <div
        className={`
          relative

          h-12
          w-16

          overflow-hidden

          rounded-lg

          border-2

          ${borderColor}
        `}
      >
        {/* Top */}

        <div
          className={`
            absolute
            left-1
            right-1
            top-1

            h-[calc(50%-6px)]

            rounded-t-md

            ${active
              ? "bg-white/20"
              : "bg-red-primary/10"
            }
          `}
        />


        {/* Horizontal separator */}

        <div
          className={`
            absolute
            left-1
            right-1
            top-1/2

            h-[2px]

            -translate-y-1/2

            ${separatorColor}
          `}
        />


        {/* Bottom */}

        <div
          className={`
            absolute
            bottom-1
            left-1
            right-1

            h-[calc(50%-6px)]

            rounded-b-md

            ${active
              ? "bg-white/20"
              : "bg-red-primary/10"
            }
          `}
        />
      </div>
    );
  }


  /* ==========================================================
     FULL
  ========================================================== */

  return (
    <div
      className={`
        relative

        h-12
        w-16

        overflow-hidden

        rounded-lg

        border-2

        ${borderColor}
      `}
    >
      {/* Background */}

      <div
        className={`
          absolute
          inset-1

          rounded-md

          ${active
            ? "bg-white/20"
            : "bg-red-primary/10"
          }
        `}
      />


      {/* Vertical separator */}

      <div
        className={`
          absolute
          bottom-1
          left-1/2
          top-1

          w-[2px]

          -translate-x-1/2

          ${separatorColor}
        `}
      />


      {/* Horizontal separator */}

      <div
        className={`
          absolute
          left-1
          right-1
          top-1/2

          h-[2px]

          -translate-y-1/2

          ${separatorColor}
        `}
      />
    </div>
  );
}


/* ============================================================
   COMPONENT
============================================================ */

export default function PlateSizeSelector({
  selected,
  onChange,
}: PlateSizeSelectorProps) {
  return (
    <div className="w-full">

      {/* =====================================================
          LABEL
      ====================================================== */}

      <div className="mb-4 text-center">

        <p
          className="
            font-poppins
            text-[10px]
            font-bold
            uppercase
            tracking-[0.16em]
            text-text-secondary
          "
        >
          Choisis ton format
        </p>

      </div>


      {/* =====================================================
          OPTIONS
      ====================================================== */}

      <div
        className="
          mx-auto

          grid
          w-full
          max-w-3xl

          grid-cols-3

          gap-2

          sm:gap-3
        "
      >

        {PLATE_SIZES.map((size) => {

          const isSelected =
            selected === size.id;


          return (

            <button
              key={size.id}

              type="button"

              onClick={() =>
                onChange(size.id)
              }

              aria-pressed={isSelected}

              className={`
                group
                relative

                flex
                min-w-0
                flex-col
                items-center

                overflow-hidden

                rounded-2xl

                border-2

                px-2
                py-3

                text-center

                transition-all
                duration-300
                ease-out

                sm:px-4
                sm:py-4

                ${isSelected
                  ? `
                      -translate-y-1

                      border-red-primary

                      bg-red-primary

                      text-white

                      shadow-lg
                    `
                  : `
                      border-cream-dark

                      bg-white

                      text-black-warm

                      hover:-translate-y-0.5
                      hover:border-red-primary/40
                      hover:shadow-md
                    `
                }
              `}
            >

              {/* =================================================
                  CHECK
              ================================================== */}

              {isSelected && (

                <div
                  className="
                    absolute
                    right-1.5
                    top-1.5

                    flex
                    h-5
                    w-5
                    items-center
                    justify-center

                    rounded-full

                    bg-green-accent

                    text-white

                    shadow-md

                    sm:right-2
                    sm:top-2
                  "
                >
                  <Check size={11} strokeWidth={3} />
                </div>

              )}


              {/* =================================================
                  VISUAL PLATE
              ================================================== */}

              <div
                className="
                  mb-2

                  flex
                  h-14
                  items-center
                  justify-center

                  transition-transform
                  duration-300

                  group-hover:scale-105
                "
              >

                <PlateFormatIcon
                  type={size.id}
                  active={isSelected}
                />

              </div>


              {/* =================================================
                  LABEL
              ================================================== */}

              <h3
                className={`
                  truncate

                  font-poppins
                  text-[11px]
                  font-bold

                  sm:text-sm

                  ${isSelected
                    ? "text-white"
                    : "text-black-warm"
                  }
                `}
              >
                <span className="sm:hidden">
                  {size.shortLabel}
                </span>

                <span className="hidden sm:inline">
                  {size.label}
                </span>
              </h3>


              {/* =================================================
                  FLAVOURS
              ================================================== */}

              <p
                className={`
                  mt-1

                  font-poppins
                  text-[9px]
                  font-medium

                  sm:text-[11px]

                  ${isSelected
                    ? "text-white/85"
                    : "text-red-primary"
                  }
                `}
              >
                {size.desc}
              </p>


              {/* =================================================
                  PERSONS
              ================================================== */}

              <div
                className={`
                  mt-2

                  hidden

                  items-center
                  justify-center

                  gap-1

                  rounded-full

                  px-2
                  py-1

                  font-poppins
                  text-[9px]

                  sm:flex

                  ${isSelected
                    ? `
                        bg-white/15
                        text-white/80
                      `
                    : `
                        bg-cream
                        text-text-secondary
                      `
                  }
                `}
              >

                <Users size={10} />

                <span>
                  {size.persons}
                </span>

              </div>


              {/* =================================================
                  ACTIVE BOTTOM LINE
              ================================================== */}

              {isSelected && (

                <div
                  className="
                    absolute
                    bottom-0
                    left-1/2

                    h-1
                    w-12

                    -translate-x-1/2

                    rounded-t-full

                    bg-orange-pizza
                  "
                />

              )}

            </button>

          );
        })}

      </div>


      {/* =====================================================
          MOBILE SELECTED INFO
      ====================================================== */}

      <div
        className="
          mt-3
          text-center
          sm:hidden
        "
      >

        {PLATE_SIZES
          .filter(
            (size) =>
              size.id === selected
          )
          .map((size) => (

            <p
              key={size.id}

              className="
                inline-flex
                items-center
                gap-1.5

                rounded-full

                bg-white

                px-3
                py-1.5

                font-poppins
                text-[10px]
                text-text-secondary
              "
            >

              <Users
                size={11}
                className="text-red-primary"
              />

              {size.persons}

            </p>

          ))}

      </div>

    </div>
  );
}