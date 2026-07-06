"use client";

import Image from "next/image";
import { useDraggable } from "@dnd-kit/core";
import { GripVertical } from "lucide-react";

import { type Pizza } from "@/lib/pizzaData";


/* ============================================================
   BADGE ICONS
============================================================ */

const badgeIcons: Record<string, React.ReactNode> = {
  "best-seller": (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="#F5C02B"
      stroke="#DCA219"
      strokeWidth="1.5"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),

  popular: (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2s-4 4.5-4 7.5C8 11.4 9.8 13 12 13s4-1.6 4-3.5C16 6.5 12 2 12 2z" />
    </svg>
  ),

  spicy: (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M2 13c3-3 8-7 13-7s7 3 7 7c0 3-3 5-7 5S5 16 2 13z" />
    </svg>
  ),

  new: (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    >
      <path d="M12 2v20M2 12h20" />
    </svg>
  ),

  gourmet: (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),

  végé: (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 20 2c1 2 1.2 5-1.5 9.2A8 8 0 0111 20z" />
    </svg>
  ),
};


/* ============================================================
   BADGE STYLE
============================================================ */

function getBadgeClass(badge: string): string {
  switch (badge) {
    case "best-seller":
    case "popular":
      return "bg-red-primary text-white";

    case "spicy":
      return "bg-orange-pizza text-white";

    case "new":
    case "végé":
      return "bg-green-accent text-white";

    default:
      return "bg-black-warm text-white";
  }
}


/* ============================================================
   DRAGGABLE PIZZA CARD
============================================================ */

interface DraggablePizzaCardProps {
  pizza: Pizza;
  isDragging?: boolean;
}


function DraggablePizzaCard({
  pizza,
  isDragging = false,
}: DraggablePizzaCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
  } = useDraggable({
    id: `pizza-${pizza.id}`,

    data: {
      pizza,
      type: "pizza",
    },
  });


  const firstBadge = pizza.badges?.[0] ?? null;


  return (
    <article
      ref={setNodeRef}
      {...attributes}
      {...listeners}

      className={`
        group
        relative

        w-full
        flex-shrink-0

        aspect-[3/2]

        overflow-hidden
        rounded-2xl

        border
        bg-white

        cursor-grab
        select-none

        active:cursor-grabbing

        transition-all
        duration-300
        ease-out

        ${isDragging
          ? `
              scale-[0.97]
              border-red-primary/40
              opacity-35
            `
          : `
              border-cream-dark

              hover:-translate-y-1
              hover:border-red-primary/30
              hover:shadow-xl
            `
        }
      `}
    >

      {/* =====================================================
          IMAGE
      ====================================================== */}

      <div
        className="
          relative

          h-[72%]
          w-full

          overflow-hidden

          bg-cream-dark
        "
      >

        <Image
          src={pizza.image}
          alt={pizza.name}

          fill

          draggable={false}

          className="
            pointer-events-none

            object-cover

            transition-transform
            duration-500
            ease-out

            group-hover:scale-105
          "

          sizes="
            (min-width: 1280px) 260px,
            230px
          "
        />


        {/* Gradient */}

        <div
          className="
            pointer-events-none

            absolute
            inset-0

            bg-gradient-to-t

            from-black/25
            via-transparent
            to-transparent
          "
        />


        {/* =================================================
            BADGE
        ================================================== */}

        {firstBadge && (

          <div
            className={`
              absolute
              left-2
              top-2

              flex
              items-center
              gap-1

              rounded-full

              px-2
              py-1

              font-poppins
              text-[8px]
              font-bold
              uppercase
              tracking-wide

              shadow-md

              ${getBadgeClass(firstBadge)}
            `}
          >

            {badgeIcons[firstBadge]}

            <span>
              {firstBadge.replace("-", " ")}
            </span>

          </div>

        )}


        {/* =================================================
            DRAG ICON
        ================================================== */}

        <div
          className="
            absolute
            right-2
            top-2

            flex
            h-7
            w-7
            items-center
            justify-center

            rounded-full

            bg-white/90

            text-text-secondary

            shadow-md

            backdrop-blur-sm

            opacity-0
            translate-y-1

            transition-all
            duration-200

            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >

          <GripVertical size={14} />

        </div>


        {/* =================================================
            DRAG HINT
        ================================================== */}

        <div
          className="
            absolute

            bottom-2
            left-1/2

            -translate-x-1/2
            translate-y-1

            whitespace-nowrap

            rounded-full

            bg-black-warm/75

            px-2.5
            py-1

            font-poppins
            text-[8px]
            font-medium
            text-white

            opacity-0

            backdrop-blur-sm

            transition-all
            duration-200

            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          Glisse vers le plateau
        </div>

      </div>


      {/* =====================================================
          NAME + PRICE
      ====================================================== */}

      <div
        className="
          flex

          h-[28%]

          items-center
          justify-between

          gap-2

          px-3
        "
      >

        {/* Pizza name */}

        <h3
          className="
            min-w-0

            truncate

            font-poppins
            text-xs
            font-bold
            text-black-warm
          "
        >
          {pizza.name}
        </h3>


        {/* Price */}

        <span
          className="
            flex-shrink-0

            font-anton
            text-lg
            leading-none
            text-red-primary
          "
        >
          {pizza.priceQuarter}

          <span
            className="
              ml-1
              text-xs
            "
          >
            DT
          </span>

        </span>

      </div>

    </article>
  );
}


/* ============================================================
   SIDEBAR PROPS
============================================================ */

interface PizzaSidebarProps {
  pizzas: Pizza[];

  side: "left" | "right";

  draggingId: string | null;
}


/* ============================================================
   SIDEBAR COMPONENT
============================================================ */

export default function PizzaSidebar({
  pizzas,
  side,
  draggingId,
}: PizzaSidebarProps) {

  return (

    <div
      className="
        flex
        h-full
        min-h-0
        flex-col
      "
    >

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div
        className="
          flex-shrink-0

          border-b
          border-cream-dark

          pb-3
          pt-1

          text-center
        "
      >

        <p
          className="
            font-poppins
            text-[10px]
            font-bold
            uppercase
            tracking-[0.12em]
            text-black-warm
          "
        >
          Choisis ta pizza
        </p>


        <p
          className="
            mt-1

            font-poppins
            text-[9px]
            text-text-secondary
          "
        >
          {side === "left"
            ? "Glisse vers le plateau →"
            : "← Glisse vers le plateau"}
        </p>

      </div>


      {/* =====================================================
          SCROLLABLE PIZZA LIST
      ====================================================== */}

      <div
        className="
          mt-3
          flex
          min-h-0
          flex-1
          flex-col
          gap-3
          overflow-y-auto
          overflow-x-hidden
          pr-1.5
          overscroll-contain
          scrollbar-thin
        "
      >

        {pizzas.length > 0 ? (

          pizzas.map((pizza) => (

            <DraggablePizzaCard
              key={pizza.id}

              pizza={pizza}

              isDragging={
                draggingId ===
                `pizza-${pizza.id}`
              }
            />

          ))

        ) : (

          <div
            className="
              flex
              flex-1

              items-center
              justify-center

              px-4

              text-center
            "
          >

            <p
              className="
                font-poppins
                text-xs
                text-text-secondary
              "
            >
              Aucune pizza dans cette catégorie.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}


/* ============================================================
   DRAG PIZZA OVERLAY
============================================================ */

export function DragPizzaOverlay({
  pizza,
}: {
  pizza: Pizza | null;
}) {

  if (!pizza) {
    return null;
  }


  return (

    <div
      className="
        pointer-events-none

        w-[220px]

        rotate-2

        overflow-hidden

        rounded-2xl

        border-2
        border-red-primary

        bg-white

        shadow-2xl
      "
    >

      {/* IMAGE */}

      <div
        className="
          relative

          h-[105px]
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
          "

          sizes="220px"
        />


        <div
          className="
            absolute
            inset-0

            bg-gradient-to-t

            from-black/40
            via-transparent
            to-transparent
          "
        />

      </div>


      {/* NAME + PRICE */}

      <div
        className="
          flex
          items-center
          justify-between

          gap-2

          px-3
          py-2.5
        "
      >

        <p
          className="
            min-w-0

            truncate

            font-poppins
            text-xs
            font-bold
            text-black-warm
          "
        >
          {pizza.name}
        </p>


        <span
          className="
            flex-shrink-0

            font-anton
            text-lg
            text-red-primary
          "
        >
          {pizza.priceQuarter} DT
        </span>

      </div>

    </div>
  );
}