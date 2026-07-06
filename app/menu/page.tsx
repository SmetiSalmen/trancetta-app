"use client";

import {
  useState,
  useCallback,
  useEffect,
} from "react";

import Image from "next/image";

import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  closestCenter,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";

import {
  PIZZAS,
  type Pizza,
} from "@/lib/pizzaData";

import {
  PLATE_SIZES,
} from "@/components/menu/PlateSizeSelector";

import PlateSizeSelector from "@/components/menu/PlateSizeSelector";

import PizzaSidebar, {
  DragPizzaOverlay,
} from "@/components/menu/PizzaSidebar";

import PlateBuilder from "@/components/menu/PlateBuilder";

import OrderSummary from "@/components/menu/OrderSummary";

import MobilePizzaSelector from "@/components/menu/MobilePizzaSelector";

import MenuSection from "@/components/sections/MenuSection";


import Footer from "@/components/layout/Footer";

import {
  ChevronDown,
} from "lucide-react";

import Link from "next/link";
import logo from "@/public/images/logo.png";


/* ============================================================
   TYPES
============================================================ */

type PlateSize =
  | "quarter"
  | "half"
  | "full";


/* ============================================================
   INITIAL SELECTIONS
============================================================ */

function getInitialSelections(
  size: PlateSize
): Record<string, Pizza | null> {

  const config =
    PLATE_SIZES.find(
      (plate) =>
        plate.id === size
    );


  if (!config) {
    return {
      "zone-0": null,
    };
  }


  return Object.fromEntries(
    Array.from(
      {
        length: config.zones,
      },
      (_, index) => [
        `zone-${index}`,
        null,
      ]
    )
  );
}


/* ============================================================
   PAGE
============================================================ */

export default function MenuPage() {

  /* ==========================================================
     STATE
  ========================================================== */

  const [
    plateSize,
    setPlateSize,
  ] = useState<PlateSize>(
    "full"
  );


  const [
    selections,
    setSelections,
  ] = useState<
    Record<string, Pizza | null>
  >(
    getInitialSelections("full")
  );


  const [
    draggingPizza,
    setDraggingPizza,
  ] = useState<Pizza | null>(
    null
  );


  const [
    draggingId,
    setDraggingId,
  ] = useState<string | null>(
    null
  );


  const [
    activeDropZone,
    setActiveDropZone,
  ] = useState<string | null>(
    null
  );


  const [
    mobileActiveZone,
    setMobileActiveZone,
  ] = useState<number | null>(
    null
  );


  const [
    mounted,
    setMounted,
  ] = useState(false);


  /* ==========================================================
     MOUNTED
     Important pour éviter le hydration mismatch de dnd-kit
  ========================================================== */

  useEffect(() => {
    setMounted(true);
  }, []);


  /* ==========================================================
     DND SENSORS
  ========================================================== */

  const sensors = useSensors(

    useSensor(
      PointerSensor,
      {
        activationConstraint: {
          distance: 8,
        },
      }
    ),

    useSensor(
      TouchSensor,
      {
        activationConstraint: {
          delay: 200,
          tolerance: 5,
        },
      }
    )

  );


  /* ==========================================================
     CHANGE PLATE SIZE
  ========================================================== */

  const handlePlateSizeChange =
    useCallback(
      (
        newSize: PlateSize
      ) => {

        setPlateSize(
          newSize
        );


        setSelections(
          getInitialSelections(
            newSize
          )
        );


        setMobileActiveZone(
          null
        );


        setActiveDropZone(
          null
        );

      },
      []
    );


  /* ==========================================================
     DRAG START
  ========================================================== */

  const handleDragStart =
    useCallback(
      (
        event: DragStartEvent
      ) => {

        const {
          data,
          id,
        } = event.active;


        if (
          data.current?.pizza
        ) {

          setDraggingPizza(
            data.current
              .pizza as Pizza
          );


          setDraggingId(
            String(id)
          );

        }

      },
      []
    );


  /* ==========================================================
     DRAG END
  ========================================================== */

  const handleDragEnd =
    useCallback(
      (
        event: DragEndEvent
      ) => {

        const {
          active,
          over,
        } = event;


        setDraggingPizza(
          null
        );


        setDraggingId(
          null
        );


        setActiveDropZone(
          null
        );


        if (!over) {
          return;
        }


        const pizza =
          active.data.current
            ?.pizza as
          | Pizza
          | undefined;


        const zoneId =
          String(
            over.id
          );


        if (
          pizza &&
          zoneId.startsWith(
            "zone-"
          )
        ) {

          setSelections(
            (
              previous
            ) => ({
              ...previous,

              [zoneId]:
                pizza,
            })
          );

        }

      },
      []
    );


  /* ==========================================================
     REMOVE PIZZA
  ========================================================== */

  const handleRemove =
    useCallback(
      (
        zoneId: string
      ) => {

        setSelections(
          (
            previous
          ) => ({
            ...previous,

            [zoneId]:
              null,
          })
        );

      },
      []
    );


  /* ==========================================================
     CLEAR PLATE
  ========================================================== */

  const handleClear =
    useCallback(
      () => {

        setSelections(
          getInitialSelections(
            plateSize
          )
        );


        setMobileActiveZone(
          null
        );


        setActiveDropZone(
          null
        );

      },
      [
        plateSize,
      ]
    );


  /* ==========================================================
     MOBILE SELECT PIZZA
  ========================================================== */

  const handleMobileSelectPizza =
    useCallback(
      (
        pizza: Pizza
      ) => {

        if (
          mobileActiveZone ===
          null
        ) {
          return;
        }


        const zoneId =
          `zone-${mobileActiveZone}`;


        setSelections(
          (
            previous
          ) => ({
            ...previous,

            [zoneId]:
              pizza,
          })
        );


        const config =
          PLATE_SIZES.find(
            (plate) =>
              plate.id ===
              plateSize
          );


        if (!config) {
          return;
        }


        const nextEmpty =
          Array.from(
            {
              length:
                config.zones,
            },
            (
              _,
              index
            ) => index
          ).find(
            (index) =>
              index !==
              mobileActiveZone &&
              !selections[
              `zone-${index}`
              ]
          );


        setMobileActiveZone(
          nextEmpty ??
          null
        );

      },
      [
        mobileActiveZone,
        plateSize,
        selections,
      ]
    );


  /* ==========================================================
     PIZZAS FOR DESKTOP SIDEBARS
  ========================================================== */

  const availablePizzas =
    PIZZAS.filter(
      (pizza) =>
        pizza.isAvailable
    );


  const leftPizzas =
    availablePizzas.filter(
      (
        _,
        index
      ) =>
        index % 2 === 0
    );


  const rightPizzas =
    availablePizzas.filter(
      (
        _,
        index
      ) =>
        index % 2 !== 0
    );


  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <>
      {/* Simple menu header */}
      <header className="bg-cream border-b border-cream-dark px-6 py-4">
        <div className="container-custom flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-12 h-12">
              <Image src={logo} alt="Trancetta" fill sizes="48px" className="object-contain" priority />
            </div>
            <span className="font-anton text-black-warm text-lg tracking-wider hidden sm:block">TRANCETTA</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-red-primary hover:bg-red-dark text-white font-anton tracking-wider text-sm px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Retour
          </Link>
        </div>
      </header>


      <main
        className="
          min-h-screen
          bg-cream
        "
      >

        {/* ===================================================
            HERO MENU
        ==================================================== */}

        <section
          className="
            relative
            overflow-hidden

            pb-16
            pt-20
          "

          style={{
            background:
              "linear-gradient(135deg, #F8F3EE 0%, #ECE2DA 100%)",
          }}
        >

          {/* Background decoration */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              overflow-hidden
            "
          >

            <div
              className="
                absolute
                right-0
                top-0

                h-80
                w-80

                rounded-full

                bg-red-primary/5

                blur-3xl
              "
            />

          </div>


          <div
            className="
              container-custom

              relative
              z-10

              text-center
            "
          >

            {/* Badge */}

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
                  font-poppins
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-red-primary
                "
              >
                Notre Carte
              </span>

            </div>


            {/* Title */}

            <h1
              className="
                mb-4

                font-anton
                text-black-warm
              "

              style={{
                fontSize:
                  "clamp(2.5rem, 6vw, 5rem)",
              }}
            >
              LE MENU{" "}

              <span
                className="
                  text-red-primary
                "
              >
                TRANCETTA
              </span>

            </h1>


            {/* Subtitle */}

            <p
              className="
                mb-8

                font-caveat
                text-text-secondary
              "

              style={{
                fontSize:
                  "clamp(1.2rem, 2.5vw, 1.8rem)",
              }}
            >
              Choisis tes saveurs
              et compose ton plateau
              sur mesure !
            </p>


            {/* Scroll link */}

            <a
              href="#configurateur"

              className="
                group

                inline-flex
                flex-col
                items-center
                gap-1

                text-text-secondary

                transition-colors

                hover:text-red-primary
              "
            >

              <span
                className="
                  font-poppins
                  text-xs
                  font-medium
                "
              >
                Composer mon plateau
              </span>


              <ChevronDown
                size={20}

                className="
                  animate-bounce
                "
              />

            </a>

          </div>

        </section>


        {/* ===================================================
            NOUVEAU MENU PRINCIPAL
        ==================================================== */}

        <MenuSection />


        {/* ===================================================
            CONFIGURATEUR
            LOGIQUE DND ORIGINALE CONSERVÉE
        ==================================================== */}

        <section
          id="configurateur"

          className="
            section-padding

            overflow-hidden

            bg-cream-dark
          "
        >

          <div
            className="
              container-custom
            "
          >

            {/* ===============================================
                HEADER
            ================================================ */}

            <div
              className="
                mb-10
                text-center
              "
            >

              {/* Mascot + dialog */}

              <div
                className="
                  mb-4

                  inline-flex
                  items-center
                  gap-3
                "
              >

                <Image
                  src="/images/mascotte/mascotte3.png"

                  alt="Mascotte Trancetta"

                  width={60}
                  height={66}

                  className="
                    object-contain
                  "
                />


                <div
                  className="
                    relative

                    rounded-2xl

                    border
                    border-cream-dark

                    bg-white

                    px-4
                    py-2.5

                    shadow-md
                  "
                >

                  {/* Dialog arrow */}

                  <div
                    className="
                      absolute
                      -left-2
                      top-1/2

                      h-0
                      w-0

                      -translate-y-1/2

                      border-b-4
                      border-r-8
                      border-t-4

                      border-transparent
                      border-r-white
                    "
                  />


                  <p
                    className="
                      font-caveat
                      text-lg
                      text-red-primary
                    "
                  >
                    Compose ton mood
                  </p>

                </div>

              </div>


              {/* Title */}

              <h2
                className="
                  mb-3

                  font-anton
                  text-black-warm
                "

                style={{
                  fontSize:
                    "clamp(1.8rem, 4vw, 3.2rem)",
                }}
              >
                COMPOSE{" "}

                <span
                  className="
                    text-red-primary
                  "
                >
                  TON PLATEAU
                </span>

              </h2>


              {/* Description */}

              <p
                className="
                  mb-8

                  font-poppins
                  text-sm
                  text-text-secondary
                "
              >
                Glisse tes pizzas
                préférées sur le plateau
                — mélange jusqu&apos;à 4
                saveurs différentes !
              </p>


              {/* SIZE SELECTOR */}

              <PlateSizeSelector
                selected={
                  plateSize
                }

                onChange={
                  handlePlateSizeChange
                }
              />

            </div>


            {/* ===============================================
                DESKTOP DND
            ================================================ */}

            {mounted ? (

              <DndContext
                sensors={
                  sensors
                }

                collisionDetection={
                  closestCenter
                }

                onDragStart={
                  handleDragStart
                }

                onDragEnd={
                  handleDragEnd
                }
              >

                <div
                  className="
                    hidden

                    items-start

                    gap-6

                    lg:grid
                    lg:grid-cols-[1fr_320px_1fr]
                  "
                >

                  {/* =========================================
                      LEFT SIDEBAR
                  ========================================== */}

                  <div
                    className="
                      flex
                      h-[580px]
                      flex-col

                      rounded-2xl

                      border
                      border-cream-dark

                      bg-white

                      p-4
                    "
                  >

                    <PizzaSidebar
                      pizzas={
                        leftPizzas
                      }

                      side="left"

                      draggingId={
                        draggingId
                      }
                    />

                  </div>


                  {/* =========================================
                      CENTER
                  ========================================== */}

                  <div
                    className="
                      flex
                      flex-col
                      gap-4
                    "
                  >

                    {/* PLATE */}

                    <div
                      className="
                        rounded-2xl

                        border
                        border-cream-dark

                        bg-white

                        p-4
                      "

                      style={{
                        height:
                          "440px",
                      }}
                    >

                      <PlateBuilder
                        plateSize={
                          plateSize
                        }

                        selections={
                          selections
                        }

                        onRemove={
                          handleRemove
                        }

                        activeDropZone={
                          activeDropZone
                        }
                      />

                    </div>


                    {/* SUMMARY */}

                    <OrderSummary
                      plateSize={
                        plateSize
                      }

                      selections={
                        selections
                      }

                      onClear={
                        handleClear
                      }
                    />

                  </div>


                  {/* =========================================
                      RIGHT SIDEBAR
                  ========================================== */}

                  <div
                    className="
                      flex
                      h-[580px]
                      flex-col

                      rounded-2xl

                      border
                      border-cream-dark

                      bg-white

                      p-4
                    "
                  >

                    <PizzaSidebar
                      pizzas={
                        rightPizzas
                      }

                      side="right"

                      draggingId={
                        draggingId
                      }
                    />

                  </div>

                </div>


                {/* ===========================================
                    DRAG OVERLAY
                ============================================ */}

                <DragOverlay>

                  <DragPizzaOverlay
                    pizza={
                      draggingPizza
                    }
                  />

                </DragOverlay>

              </DndContext>

            ) : (

              /* =============================================
                  SSR SKELETON
              ============================================== */

              <div
                className="
                  hidden

                  items-start
                  gap-6

                  lg:grid
                  lg:grid-cols-[1fr_320px_1fr]
                "
              >

                <div
                  className="
                    h-[580px]

                    animate-pulse

                    rounded-2xl

                    border
                    border-cream-dark

                    bg-white

                    p-4
                  "
                />


                <div
                  className="
                    flex
                    flex-col
                    gap-4
                  "
                >

                  <div
                    className="
                      h-[440px]

                      animate-pulse

                      rounded-2xl

                      border
                      border-cream-dark

                      bg-white

                      p-4
                    "
                  />


                  <div
                    className="
                      h-32

                      animate-pulse

                      rounded-2xl

                      border
                      border-cream-dark

                      bg-white

                      p-4
                    "
                  />

                </div>


                <div
                  className="
                    h-[580px]

                    animate-pulse

                    rounded-2xl

                    border
                    border-cream-dark

                    bg-white

                    p-4
                  "
                />

              </div>

            )}


            {/* ===============================================
                MOBILE / TABLET
            ================================================ */}

            {mounted && (

              <div
                className="
                  space-y-6
                  lg:hidden
                "
              >

                {/* MOBILE PLATE */}

                <div
                  className="
                    rounded-2xl

                    border
                    border-cream-dark

                    bg-white

                    p-4
                  "

                  style={{
                    height:
                      "320px",
                  }}
                >

                  <PlateBuilder
                    plateSize={
                      plateSize
                    }

                    selections={
                      selections
                    }

                    onRemove={
                      handleRemove
                    }

                    activeDropZone={
                      null
                    }
                  />

                </div>


                {/* MOBILE SELECTOR */}

                <div
                  className="
                    rounded-2xl

                    border
                    border-cream-dark

                    bg-white

                    p-4
                  "
                >

                  <MobilePizzaSelector
                    pizzas={
                      availablePizzas
                    }

                    plateSize={
                      plateSize
                    }

                    onSelectZone={
                      (
                        index
                      ) =>
                        setMobileActiveZone(
                          index
                        )
                    }

                    onSelectPizza={
                      handleMobileSelectPizza
                    }

                    activeZone={
                      mobileActiveZone
                    }

                    selections={
                      selections
                    }
                  />

                </div>


                {/* MOBILE SUMMARY */}

                <OrderSummary
                  plateSize={
                    plateSize
                  }

                  selections={
                    selections
                  }

                  onClear={
                    handleClear
                  }
                />

              </div>

            )}

          </div>

        </section>

      </main>


      <Footer />
    </>
  );
}