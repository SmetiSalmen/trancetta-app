"use client";

import {
  Check,
  MessageCircle,
  RotateCcw,
  ShoppingBag,
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


interface OrderSummaryProps {
  plateSize: PlateSize;

  selections: Record<
    string,
    Pizza | null
  >;

  onClear: () => void;
}


/* ============================================================
   WHATSAPP CONFIG
============================================================ */

/*
  Numéro Trancetta au format international
  sans + ni espaces.
*/

const WHATSAPP_NUMBER = "21628336008";


/* ============================================================
   COMPONENT
============================================================ */

export default function OrderSummary({
  plateSize,
  selections,
  onClear,
}: OrderSummaryProps) {

  /* ==========================================================
     CONFIG
  ========================================================== */

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

    (_, index) =>
      `zone-${index}`
  );


  /* ==========================================================
     SELECTED PIZZAS
  ========================================================== */

  const selectedPizzas =
    zones
      .map(
        (zoneId) =>
          selections[zoneId]
      )
      .filter(
        (
          pizza
        ): pizza is Pizza =>
          pizza !== null &&
          pizza !== undefined
      );


  /* ==========================================================
     TOTAL
  ========================================================== */

  const total =
    selectedPizzas.reduce(
      (sum, pizza) =>
        sum + pizza.priceQuarter,

      0
    );


  /* ==========================================================
     PROGRESS
  ========================================================== */

  const selectedCount =
    selectedPizzas.length;


  const remainingCount =
    config.zones - selectedCount;


  const isComplete =
    selectedCount === config.zones;


  const progress =
    config.zones > 0
      ? (
        selectedCount /
        config.zones
      ) * 100
      : 0;


  /* ==========================================================
     WHATSAPP MESSAGE
  ========================================================== */

  const buildWhatsAppMessage = () => {

    const pizzaLines =
      zones
        .map(
          (zoneId, index) => {

            const pizza =
              selections[zoneId];


            if (!pizza) {
              return null;
            }


            return (
              `${index + 1}. ${pizza.name} — ` +
              `${pizza.priceQuarter} DT`
            );
          }
        )
        .filter(Boolean)
        .join("\n");


    return [
      "🍕 Bonjour Trancetta !",
      "",
      "Je souhaite commander un plateau personnalisé.",
      "",
      `📦 Format : ${config.label}`,
      "",
      "🍕 Mes choix :",
      pizzaLines,
      "",
      `💰 Total : ${total.toFixed(3)} DT`,
      "",
      "Merci de me confirmer la disponibilité et le délai de préparation. 🙏",
    ].join("\n");
  };


  /* ==========================================================
     ORDER
  ========================================================== */

  const handleOrder = () => {

    if (!isComplete) {
      return;
    }


    const message =
      buildWhatsAppMessage();


    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}` +
      `?text=${encodeURIComponent(message)}`;


    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };


  /* ==========================================================
     FORMAT LABEL
  ========================================================== */

  const getShortFormatLabel = () => {

    switch (plateSize) {

      case "quarter":
        return "1/4 Plateau";

      case "half":
        return "1/2 Plateau";

      case "full":
        return "Plateau Complet";

      default:
        return config.label;
    }
  };


  /* ==========================================================
     RENDER
  ========================================================== */

  return (

    <div
      className="
        overflow-hidden

        rounded-3xl

        border
        border-cream-dark

        bg-white

        shadow-sm
      "
    >


      {/* =====================================================
          HEADER
      ====================================================== */}

      <div
        className="
          flex
          items-center
          justify-between

          border-b
          border-cream-dark

          bg-cream/60

          px-4
          py-3.5

          sm:px-5
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

              rounded-xl

              bg-red-primary/10

              text-red-primary
            "
          >
            <ShoppingBag size={18} />
          </div>


          <div>

            <h3
              className="
                font-poppins
                text-sm
                font-bold
                text-black-warm
              "
            >
              Ton plateau
            </h3>


            <p
              className="
                mt-0.5

                font-poppins
                text-[10px]
                text-text-secondary
              "
            >
              {getShortFormatLabel()}
            </p>

          </div>

        </div>


        {/* Progress number */}

        <div
          className={`
            rounded-full

            px-3
            py-1.5

            font-poppins
            text-[10px]
            font-bold

            ${isComplete
              ? `
                  bg-green-accent/10
                  text-green-accent
                `
              : `
                  bg-orange-pizza/10
                  text-orange-pizza
                `
            }
          `}
        >
          {selectedCount}/{config.zones}
        </div>

      </div>


      {/* =====================================================
          PIZZA CHOICES
      ====================================================== */}

      <div className="px-4 pt-3 sm:px-5">

        <div
          className="
            grid
            gap-1
          "
        >

          {zones.map(
            (zoneId, index) => {

              const pizza =
                selections[zoneId];


              return (

                <div
                  key={zoneId}

                  className={`
                    flex
                    items-center
                    justify-between

                    gap-3

                    rounded-xl

                    px-2
                    py-2

                    transition-colors

                    ${pizza
                      ? "bg-cream/60"
                      : "opacity-50"
                    }
                  `}
                >

                  {/* LEFT */}

                  <div
                    className="
                      flex
                      min-w-0
                      items-center
                      gap-2.5
                    "
                  >

                    {/* Zone number */}

                    <div
                      className={`
                        flex
                        h-7
                        w-7
                        flex-shrink-0
                        items-center
                        justify-center

                        rounded-full

                        font-poppins
                        text-[10px]
                        font-bold

                        ${pizza
                          ? `
                              bg-red-primary
                              text-white
                            `
                          : `
                              bg-cream-dark
                              text-text-secondary
                            `
                        }
                      `}
                    >

                      {pizza ? (
                        <Check size={13} />
                      ) : (
                        index + 1
                      )}

                    </div>


                    {/* Pizza name */}

                    <div className="min-w-0">

                      <p
                        className={`
                          truncate

                          font-poppins
                          text-xs

                          ${pizza
                            ? `
                                font-semibold
                                text-black-warm
                              `
                            : `
                                text-text-secondary
                              `
                          }
                        `}
                      >
                        {pizza
                          ? pizza.name
                          : `Zone ${index + 1} à remplir`}
                      </p>


                      {pizza && (

                        <p
                          className="
                            mt-0.5

                            font-poppins
                            text-[9px]
                            text-text-secondary
                          "
                        >
                          1/4 plateau
                        </p>

                      )}

                    </div>

                  </div>


                  {/* PRICE */}

                  {pizza && (

                    <span
                      className="
                        flex-shrink-0

                        font-anton
                        text-sm
                        text-red-primary
                      "
                    >
                      {pizza.priceQuarter} DT
                    </span>

                  )}

                </div>

              );
            }
          )}

        </div>

      </div>


      {/* =====================================================
          PROGRESS
      ====================================================== */}

      <div className="px-4 pt-4 sm:px-5">

        <div
          className="
            mb-1.5

            flex
            items-center
            justify-between
          "
        >

          <span
            className="
              font-poppins
              text-[9px]
              font-medium
              text-text-secondary
            "
          >
            Progression
          </span>


          <span
            className="
              font-poppins
              text-[9px]
              font-semibold
              text-black-warm
            "
          >
            {Math.round(progress)}%
          </span>

        </div>


        <div
          className="
            h-1.5
            overflow-hidden
            rounded-full
            bg-cream-dark
          "
        >

          <div
            className={`
              h-full

              rounded-full

              transition-all
              duration-500
              ease-out

              ${isComplete
                ? "bg-green-accent"
                : "bg-red-primary"
              }
            `}

            style={{
              width: `${progress}%`,
            }}
          />

        </div>


        {/* Status text */}

        <div className="mt-2 text-center">

          {isComplete ? (

            <p
              className="
                font-poppins
                text-[10px]
                font-semibold
                text-green-accent
              "
            >
              ✓ Ton plateau est prêt à commander !
            </p>

          ) : (

            <p
              className="
                font-poppins
                text-[10px]
                text-text-secondary
              "
            >
              Encore{" "}

              <span className="font-bold text-red-primary">
                {remainingCount}
              </span>

              {" "}
              choix
              {remainingCount > 1 ? " à faire" : " à faire"}
            </p>

          )}

        </div>

      </div>


      {/* =====================================================
          TOTAL
      ====================================================== */}

      <div
        className="
          mx-4
          mt-4

          flex
          items-center
          justify-between

          border-y
          border-dashed
          border-cream-dark

          py-3

          sm:mx-5
        "
      >

        <div>

          <p
            className="
              font-poppins
              text-[10px]
              font-medium
              uppercase
              tracking-wider
              text-text-secondary
            "
          >
            Total estimé
          </p>


          <p
            className="
              mt-0.5

              font-poppins
              text-[9px]
              text-text-secondary
            "
          >
            {selectedCount} tranche
            {selectedCount > 1 ? "s" : ""}
          </p>

        </div>


        <div className="text-right">

          <span
            className="
              font-anton
              text-2xl
              leading-none
              text-red-primary
            "
          >
            {total.toFixed(3)}
          </span>


          <span
            className="
              ml-1

              font-anton
              text-sm
              text-red-primary
            "
          >
            DT
          </span>

        </div>

      </div>


      {/* =====================================================
          ACTIONS
      ====================================================== */}

      <div className="p-4 sm:p-5">

        {/* WhatsApp CTA */}

        <button
          type="button"

          disabled={!isComplete}

          onClick={handleOrder}

          className={`
            flex
            w-full
            items-center
            justify-center

            gap-2.5

            rounded-xl

            py-3.5

            font-poppins
            text-sm
            font-bold

            transition-all
            duration-200

            ${isComplete
              ? `
                  cursor-pointer

                  bg-green-accent
                  text-white

                  shadow-lg

                  hover:-translate-y-0.5
                  hover:shadow-xl

                  active:translate-y-0
                  active:scale-[0.98]
                `
              : `
                  cursor-not-allowed

                  bg-cream-dark
                  text-text-secondary
                `
            }
          `}
        >

          {isComplete ? (
            <>
              <MessageCircle size={19} />

              Commander sur WhatsApp
            </>
          ) : (
            <>
              <ShoppingBag size={18} />

              Encore {remainingCount} choix
            </>
          )}

        </button>


        {/* Clear */}

        {selectedCount > 0 && (

          <button
            type="button"

            onClick={onClear}

            className="
              mt-2.5

              flex
              w-full
              items-center
              justify-center

              gap-1.5

              rounded-lg

              py-2

              font-poppins
              text-[11px]
              font-medium
              text-text-secondary

              transition-colors

              hover:bg-red-primary/5
              hover:text-red-primary
            "
          >

            <RotateCcw size={13} />

            Recommencer le plateau

          </button>

        )}

      </div>

    </div>
  );
}