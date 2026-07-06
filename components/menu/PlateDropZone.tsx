"use client";

import Image from "next/image";

import {
  useDroppable,
} from "@dnd-kit/core";

import {
  Check,
  Plus,
  RefreshCw,
  X,
} from "lucide-react";

import {
  type Pizza,
} from "@/lib/pizzaData";


/* ============================================================
   TYPES
============================================================ */

interface PlateDropZoneProps {
  zoneId: string;

  zoneIndex: number;

  pizza: Pizza | null;

  onRemove: (
    zoneId: string
  ) => void;

  isActive: boolean;
}


/* ============================================================
   COMPONENT
============================================================ */

export default function PlateDropZone({
  zoneId,
  zoneIndex,
  pizza,
  onRemove,
  isActive,
}: PlateDropZoneProps) {

  /* ==========================================================
     DND KIT
  ========================================================== */

  const {
    isOver,
    setNodeRef,
  } = useDroppable({
    id: zoneId,

    data: {
      type: "plate-zone",
      zoneId,
      zoneIndex,
    },
  });


  const isEmpty =
    pizza === null;


  const isHighlighted =
    isOver || isActive;


  /* ==========================================================
     RENDER
  ========================================================== */

  return (

    <div
      ref={setNodeRef}

      data-zone-id={zoneId}

      className={`
        group
        relative

        flex-1
        min-h-0
        min-w-0

        overflow-hidden

        transition-all
        duration-300
        ease-out

        ${isEmpty
          ? isHighlighted
            ? `
                bg-red-primary/10

                ring-2
                ring-inset
                ring-red-primary
              `
            : `
                bg-cream/70

                ring-1
                ring-inset
                ring-brown/20
              `
          : isOver
            ? `
                ring-4
                ring-inset
                ring-orange-pizza
              `
            : `
                ring-1
                ring-inset
                ring-white/20
              `
        }
      `}
    >

      {/* =====================================================
          EMPTY ZONE
      ====================================================== */}

      {isEmpty ? (

        <div
          className="
            absolute
            inset-0

            flex
            flex-col
            items-center
            justify-center

            p-3

            text-center
          "
        >

          {/* -----------------------------------------------
              DROP ACTIVE
          ------------------------------------------------ */}

          {isOver ? (

            <div
              className="
                flex
                flex-col
                items-center

                gap-2

                animate-pulse
              "
            >

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center

                  rounded-full

                  bg-red-primary

                  text-white

                  shadow-lg
                "
              >
                <Plus
                  size={22}
                  strokeWidth={2.5}
                />
              </div>


              <div>

                <p
                  className="
                    font-poppins
                    text-xs
                    font-bold
                    text-red-primary
                  "
                >
                  Dépose ici !
                </p>


                <p
                  className="
                    mt-0.5

                    font-poppins
                    text-[9px]
                    text-text-secondary
                  "
                >
                  Zone {zoneIndex + 1}
                </p>

              </div>

            </div>

          ) : (

            /* -----------------------------------------------
                NORMAL EMPTY STATE
            ------------------------------------------------ */

            <div
              className="
                flex
                flex-col
                items-center

                gap-2

                transition-transform
                duration-300

                group-hover:scale-105
              "
            >

              {/* Plus circle */}

              <div
                className={`
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center

                  rounded-full

                  border-2
                  border-dashed

                  transition-all
                  duration-300

                  ${isActive
                    ? `
                        border-red-primary

                        bg-red-primary

                        text-white

                        shadow-md
                      `
                    : `
                        border-brown/30

                        bg-white/60

                        text-brown/50
                      `
                  }
                `}
              >
                <Plus size={18} />
              </div>


              {/* Text */}

              <div>

                <p
                  className={`
                    font-poppins
                    text-[10px]
                    font-semibold

                    ${isActive
                      ? "text-red-primary"
                      : "text-text-secondary"
                    }
                  `}
                >
                  Glisse ta pizza ici
                </p>


                <p
                  className="
                    mt-0.5

                    font-poppins
                    text-[9px]
                    text-text-secondary/60
                  "
                >
                  Zone {zoneIndex + 1}
                </p>

              </div>

            </div>

          )}


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

              bg-white/80

              font-poppins
              text-[9px]
              font-bold
              text-brown

              shadow-sm

              backdrop-blur-sm
            "
          >
            {zoneIndex + 1}
          </div>

        </div>

      ) : (

        /* =====================================================
            FILLED ZONE
        ====================================================== */

        <div
          className="
            relative
            h-full
            w-full

            overflow-hidden
          "
        >

          {/* Pizza image */}

          <Image
            src={pizza.image}

            alt={pizza.name}

            fill

            draggable={false}

            className="
              pointer-events-none

              object-cover

              transition-transform
              duration-700
              ease-out

              group-hover:scale-105
            "

            sizes="
              (min-width: 1024px) 320px,
              280px
            "
          />


          {/* Image depth */}

          <div
            className="
              pointer-events-none

              absolute
              inset-0

              bg-gradient-to-t

              from-black/80
              via-black/5
              to-black/10
            "
          />


          {/* -----------------------------------------------
              ZONE BADGE
          ------------------------------------------------ */}

          <div
            className="
              absolute
              left-2
              top-2

              flex
              h-7
              w-7
              items-center
              justify-center

              rounded-full

              border
              border-white/30

              bg-black-warm/50

              font-poppins
              text-[10px]
              font-bold
              text-white

              shadow-md

              backdrop-blur-md
            "
          >
            {zoneIndex + 1}
          </div>


          {/* -----------------------------------------------
              REMOVE BUTTON
          ------------------------------------------------ */}

          <button
            type="button"

            onClick={(event) => {
              event.stopPropagation();

              onRemove(zoneId);
            }}

            aria-label={
              `Supprimer ${pizza.name} de la zone ${zoneIndex + 1}`
            }

            className="
              absolute
              right-2
              top-2
              z-20

              flex
              h-7
              w-7
              items-center
              justify-center

              rounded-full

              bg-red-primary

              text-white

              shadow-lg

              opacity-100

              transition-all
              duration-200

              hover:scale-110
              hover:bg-red-dark

              active:scale-95

              lg:translate-y-1
              lg:opacity-0

              lg:group-hover:translate-y-0
              lg:group-hover:opacity-100
            "
          >
            <X
              size={13}
              strokeWidth={2.5}
            />
          </button>


          {/* -----------------------------------------------
              PIZZA INFO
          ------------------------------------------------ */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0

              z-10

              p-3

              transition-transform
              duration-300
            "
          >

            <div
              className="
                flex
                items-end
                justify-between

                gap-2
              "
            >

              <div className="min-w-0">

                <p
                  className="
                    truncate

                    font-poppins
                    text-xs
                    font-bold
                    text-white

                    drop-shadow-md
                  "
                >
                  {pizza.name}
                </p>


                <p
                  className="
                    mt-0.5

                    font-poppins
                    text-[9px]
                    text-white/70
                  "
                >
                  Tranche 1/4
                </p>

              </div>


              <span
                className="
                  flex-shrink-0

                  font-anton
                  text-sm
                  text-orange-pizza

                  drop-shadow-md
                "
              >
                {pizza.priceQuarter} DT
              </span>

            </div>

          </div>


          {/* =================================================
              REPLACE OVERLAY
          ================================================== */}

          {isOver && (

            <div
              className="
                absolute
                inset-0
                z-30

                flex
                items-center
                justify-center

                bg-orange-pizza/65

                backdrop-blur-[2px]
              "
            >

              <div
                className="
                  flex
                  items-center

                  gap-2

                  rounded-full

                  bg-white

                  px-4
                  py-2.5

                  shadow-xl
                "
              >

                <RefreshCw
                  size={14}

                  className="
                    text-orange-pizza
                  "
                />


                <span
                  className="
                    font-poppins
                    text-[11px]
                    font-bold
                    text-orange-pizza
                  "
                >
                  Remplacer
                </span>

              </div>

            </div>

          )}


          {/* =================================================
              SELECTED / ACTIVE INDICATOR
          ================================================== */}

          {isActive && !isOver && (

            <div
              className="
                pointer-events-none

                absolute
                inset-0
                z-20

                ring-3
                ring-inset
                ring-red-primary
              "
            >

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2

                  flex
                  -translate-x-1/2
                  -translate-y-1/2

                  items-center

                  gap-1.5

                  rounded-full

                  bg-white/95

                  px-3
                  py-1.5

                  shadow-lg

                  backdrop-blur-sm
                "
              >

                <Check
                  size={12}

                  className="
                    text-green-accent
                  "
                />


                <span
                  className="
                    font-poppins
                    text-[10px]
                    font-bold
                    text-black-warm
                  "
                >
                  Sélectionnée
                </span>

              </div>

            </div>

          )}

        </div>

      )}


      {/* =====================================================
          DROP GLOW
      ====================================================== */}

      {isOver && (

        <div
          className="
            pointer-events-none

            absolute
            inset-0
            z-40

            animate-pulse

            ring-4
            ring-inset
            ring-orange-pizza
          "
        />

      )}

    </div>
  );
}