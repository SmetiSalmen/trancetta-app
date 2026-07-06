import Image from "next/image";
import Link from "next/link";

import {
  type Pizza,
  type PizzaBadge,
  BADGE_CONFIG,
} from "@/lib/pizzaData";


/* ============================================================
   PROPS
============================================================ */

interface PizzaCardProps {
  pizza: Pizza;

  showPrice?:
  | "slice"
  | "quarter"
  | "half"
  | "full";

  variant?:
  | "default"
  | "compact"
  | "menu";

  className?: string;
}


/* ============================================================
   SPICE INDICATOR
============================================================ */

const SpiceIndicator = ({
  level,
}: {
  level: 0 | 1 | 2 | 3;
}) => {
  if (level === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 3 }).map((_, index) => {
        const active = index < level;

        return (
          <svg
            key={index}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill={active ? "#C23B30" : "none"}
            stroke={
              active
                ? "#C23B30"
                : "currentColor"
            }
            strokeWidth="2"
            className={`
              flex-shrink-0

              ${active
                ? "opacity-100"
                : "text-black-warm/30 opacity-25"
              }
            `}
          >
            <path
              d="M2 13c3-3 8-7 13-7s7 3 7 7c0 3-3 5-7 5s-10-2-13-5z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      })}
    </div>
  );
};


/* ============================================================
   BADGE ICONS
============================================================ */

const badgeIcons: Record<
  string,
  React.ReactNode
> = {
  "best-seller": (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="#F5C02B"
      stroke="#DCA219"
      strokeWidth="1.5"
      className="mr-1 inline-block"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),

  popular: (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="#E58D25"
      className="mr-1 inline-block"
    >
      <path d="M12 2c0 0-4 4.5-4 7.5C8 11.4 9.8 13 12 13s4-1.6 4-3.5C16 6.5 12 2 12 2z" />
    </svg>
  ),

  spicy: (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="#C23B30"
      className="mr-1 inline-block"
    >
      <path d="M2 13c3-3 8-7 13-7s7 3 7 7c0 3-3 5-7 5s-10-2-13-5z" />
    </svg>
  ),

  new: (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#168447"
      strokeWidth="3"
      strokeLinecap="round"
      className="mr-1 inline-block"
    >
      <path d="M12 2v20M2 12h20" />
    </svg>
  ),

  gourmet: (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mr-1 inline-block"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),

  végé: (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className="mr-1 inline-block"
    >
      <path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 20 2c1 2 1.2 5-1.5 9.2A8 8 0 0111 20z" />
    </svg>
  ),
};


/* ============================================================
   PRICE CELL
============================================================ */

interface PriceCellProps {
  label: string;
  price: number | null;
}


function PriceCell({
  label,
  price,
}: PriceCellProps) {
  return (
    <div
      className="
        flex
        min-h-[68px]
        flex-col
        items-center
        justify-center

        border-b
        border-r
        border-cream-dark

        px-1
        py-2.5

        text-center

        [&:nth-child(2n)]:border-r-0

        sm:border-b-0
        sm:[&:nth-child(2n)]:border-r
        sm:last:border-r-0
      "
    >
      <span
        className="
          font-poppins
          text-[8px]
          font-bold
          uppercase
          tracking-[0.04em]
          text-text-secondary

          sm:text-[9px]
        "
      >
        {label}
      </span>

      <span
        className="
          mt-1

          font-anton
          text-base
          leading-none
          text-red-primary

          sm:text-lg
        "
      >
        {price !== null
          ? `${price} DT`
          : "—"}
      </span>
    </div>
  );
}


/* ============================================================
   MENU CARD
============================================================ */

function MenuPizzaCard({
  pizza,
  className = "",
}: {
  pizza: Pizza;
  className?: string;
}) {
  return (
    <article
      className={`
        group
        relative

        overflow-hidden
        rounded-2xl

        border
        border-cream-dark

        bg-white

        shadow-sm

        transition-all
        duration-300
        ease-out

        hover:-translate-y-1
        hover:border-red-primary/30
        hover:shadow-xl

        ${className}
      `}
    >
      {/* IMAGE */}

      <div
        className="
          relative
          aspect-[3/2]
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
            duration-500
            ease-out

            group-hover:scale-105
          "
          sizes="
            (max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw
          "
        />

        {/* BADGES */}

        {pizza.badges.length > 0 && (
          <div
            className="
              absolute
              left-3
              top-3

              z-10

              flex
              flex-wrap
              gap-1.5
            "
          >
            {pizza.badges
              .slice(0, 2)
              .map(
                (
                  badge: PizzaBadge
                ) => {
                  const config =
                    BADGE_CONFIG[badge];

                  return (
                    <span
                      key={badge}
                      className="
                        inline-flex
                        items-center

                        rounded-full

                        px-2
                        py-1

                        font-poppins
                        text-[9px]
                        font-semibold

                        text-white

                        shadow-sm
                      "
                      style={{
                        backgroundColor:
                          config.color,
                      }}
                    >
                      {badgeIcons[badge]}

                      {config.label}
                    </span>
                  );
                }
              )}
          </div>
        )}

        {/* SOFT OVERLAY */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0

            bg-gradient-to-t
            from-black/10
            via-transparent
            to-transparent
          "
        />
      </div>


      {/* NAME + INGREDIENTS */}

      <div className="px-4 py-4 sm:px-5">
        <div
          className="
            flex
            items-start
            justify-between
            gap-3
          "
        >
          <h3
            className="
              font-anton
              text-xl
              uppercase
              tracking-wide
              text-red-primary

              sm:text-2xl
            "
          >
            {pizza.name}
          </h3>

          <SpiceIndicator
            level={pizza.spiceLevel}
          />
        </div>


        {/* INGREDIENT TAGS */}

        <div
          className="
            mt-3
            flex
            min-h-[52px]
            flex-wrap
            content-start
            gap-1.5
          "
        >
          {pizza.ingredients.map(
            (ingredient) => (
              <span
                key={ingredient}
                className="
                  rounded-full

                  bg-cream-dark

                  px-2.5
                  py-1

                  font-poppins
                  text-[9px]
                  font-medium
                  leading-none
                  text-text-secondary

                  sm:text-[10px]
                "
              >
                {ingredient}
              </span>
            )
          )}
        </div>
      </div>


      {/* ALL PRICES */}

      <div
        className="
          grid
          grid-cols-2

          border-t
          border-cream-dark

          sm:grid-cols-4
        "
      >
        <PriceCell
          label="Tranche"
          price={pizza.priceSlice}
        />

        <PriceCell
          label="1/4"
          price={pizza.priceQuarter}
        />

        <PriceCell
          label="1/2"
          price={pizza.priceHalf}
        />

        <PriceCell
          label="Plateau"
          price={pizza.priceFull}
        />
      </div>
    </article>
  );
}


/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function PizzaCard({
  pizza,
  showPrice = "quarter",
  variant = "default",
  className = "",
}: PizzaCardProps) {

  /* ========================================================
     SPECIAL MENU VERSION
  ======================================================== */

  if (variant === "menu") {
    return (
      <MenuPizzaCard
        pizza={pizza}
        className={className}
      />
    );
  }


  /* ========================================================
     DEFAULT / COMPACT VERSION
  ======================================================== */

  const hasSlicePrice =
    pizza.priceSlice !== null;

  const activePriceMode =
    showPrice === "slice" &&
      !hasSlicePrice
      ? "quarter"
      : showPrice;


  const priceMap = {
    slice: {
      value: pizza.priceSlice,
      label: "à la tranche",
    },

    quarter: {
      value: pizza.priceQuarter,
      label: "1/4 plateau",
    },

    half: {
      value: pizza.priceHalf,
      label: "1/2 plateau",
    },

    full: {
      value: pizza.priceFull,
      label: "plateau complet",
    },
  };


  const priceInfo =
    priceMap[activePriceMode];


  return (
    <article
      className={`
        group
        relative

        overflow-hidden
        rounded-2xl

        border
        border-cream-dark

        bg-white

        transition-all
        duration-300

        hover:-translate-y-1.5
        hover:border-red-primary/30
        hover:shadow-card-hover

        ${className}
      `}
    >
      {/* BADGES */}

      {pizza.badges.length > 0 && (
        <div
          className="
            absolute
            left-3
            top-3

            z-10

            flex
            flex-wrap
            gap-1.5
          "
        >
          {pizza.badges
            .slice(0, 2)
            .map(
              (
                badge: PizzaBadge
              ) => {
                const config =
                  BADGE_CONFIG[badge];

                return (
                  <span
                    key={badge}
                    className="
                      inline-flex
                      items-center

                      rounded-full

                      px-2
                      py-0.5

                      font-poppins
                      text-[10px]

                      text-white

                      shadow-sm
                    "
                    style={{
                      backgroundColor:
                        config.color,
                    }}
                  >
                    {badgeIcons[badge]}

                    {config.label}
                  </span>
                );
              }
            )}
        </div>
      )}


      {/* IMAGE */}

      <div
        className={`
          relative
          overflow-hidden

          ${variant === "compact"
            ? "aspect-video"
            : "aspect-[10/7]"
          }
        `}
      >
        <Image
          src={pizza.image}
          alt={pizza.name}
          fill
          className="
            object-cover

            transition-transform
            duration-500

            group-hover:scale-110
          "
          sizes="
            (max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw
          "
        />

        <div
          className="
            absolute
            inset-0

            bg-red-primary/0

            transition-colors
            duration-300

            group-hover:bg-red-primary/10
          "
        />
      </div>


      {/* CONTENT */}

      <div className="p-4">
        <div
          className="
            mb-2

            flex
            items-start
            justify-between
            gap-2
          "
        >
          <h3
            className="
              font-poppins
              text-base
              font-semibold
              text-black-warm

              transition-colors

              group-hover:text-red-primary
            "
          >
            {pizza.name}
          </h3>

          <SpiceIndicator
            level={pizza.spiceLevel}
          />
        </div>


        {/* DESCRIPTION */}

        {variant !== "compact" && (
          <p
            className="
              mb-3
              line-clamp-2

              font-poppins
              text-xs
              leading-relaxed
              text-text-secondary
            "
          >
            {pizza.description}
          </p>
        )}


        {/* INGREDIENTS */}

        {variant !== "compact" && (
          <div
            className="
              mb-4
              flex
              flex-wrap
              gap-1
            "
          >
            {pizza.ingredients
              .slice(0, 3)
              .map((ingredient) => (
                <span
                  key={ingredient}
                  className="
                    rounded-full
                    bg-cream-dark

                    px-2
                    py-0.5

                    font-poppins
                    text-[10px]
                    text-text-secondary
                  "
                >
                  {ingredient}
                </span>
              ))}


            {pizza.ingredients.length >
              3 && (
                <span
                  className="
                  px-1
                  py-0.5

                  font-poppins
                  text-[10px]
                  text-text-secondary
                "
                >
                  +
                  {pizza.ingredients.length -
                    3}
                </span>
              )}
          </div>
        )}


        {/* PRICE + CTA */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-2
          "
        >
          <div>
            <span
              className="
                font-anton
                text-xl
                text-red-primary
              "
            >
              {priceInfo.value} DT
            </span>

            <span
              className="
                ml-1

                font-poppins
                text-xs
                text-text-secondary
              "
            >
              {priceInfo.label}
            </span>
          </div>


          <Link
            href="/menu"
            className="
              rounded-full

              bg-red-primary

              px-3
              py-1.5

              font-poppins
              text-xs
              font-semibold
              text-white

              transition-colors

              hover:bg-red-dark
            "
          >
            Choisir
          </Link>
        </div>
      </div>
    </article>
  );
}