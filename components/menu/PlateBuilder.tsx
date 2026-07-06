"use client";

import { type Pizza } from "@/lib/pizzaData";
import { PLATE_SIZES } from "./PlateSizeSelector";
import PlateDropZone from "./PlateDropZone";

type PlateSize = "quarter" | "half" | "full";

interface PlateBuilderProps {
  plateSize: PlateSize;
  selections: Record<string, Pizza | null>;
  onRemove: (zoneId: string) => void;
  activeDropZone: string | null;
}

export default function PlateBuilder({
  plateSize,
  selections,
  onRemove,
  activeDropZone,
}: PlateBuilderProps) {
  const config = PLATE_SIZES.find((size) => size.id === plateSize);

  if (!config) {
    return null;
  }

  const zones = Array.from(
    { length: config.zones },
    (_, index) => `zone-${index}`
  );

  /*
   * quarter = 1 grande zone
   *
   * ┌─────────────┐
   * │             │
   * │   ZONE 1    │
   * │             │
   * └─────────────┘
   *
   *
   * half = 2 zones horizontales
   *
   * ┌─────────────┐
   * │   ZONE 1    │
   * ├─────────────┤
   * │   ZONE 2    │
   * └─────────────┘
   *
   *
   * full = grille 2 × 2
   *
   * ┌──────┬──────┐
   * │ Z 1  │ Z 2  │
   * ├──────┼──────┤
   * │ Z 3  │ Z 4  │
   * └──────┴──────┘
   */

  const gridLayout: Record<PlateSize, string> = {
    quarter: "grid-cols-1 grid-rows-1",
    half: "grid-cols-1 grid-rows-2",
    full: "grid-cols-2 grid-rows-2",
  };

  return (
    <div className="flex h-full w-full flex-col">
      {/* =========================
          PLATEAU EN BOIS
      ========================== */}

      <div
        className="
          relative
          flex-1
          overflow-hidden
          rounded-[28px]
          border-[6px]
          shadow-2xl
        "
        style={{
          background:
            "linear-gradient(145deg, #6B3A2A 0%, #8B4513 30%, #A0522D 60%, #7B3826 100%)",

          borderColor: "#5C2E1A",

          boxShadow:
            "0 25px 60px rgba(58, 25, 12, 0.30), inset 0 2px 4px rgba(255,255,255,0.15)",
        }}
      >
        {/* Texture bois horizontale */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-30
          "
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                2deg,
                transparent 0px,
                transparent 10px,
                rgba(0,0,0,0.12) 10px,
                rgba(0,0,0,0.12) 11px
              )
            `,
          }}
        />

        {/* Effet lumière bois */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
          "
          style={{
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.10), transparent 35%, rgba(0,0,0,0.12))",
          }}
        />

        {/* =========================
            ZONES DE PIZZA
        ========================== */}

        <div
          className={`
            relative
            z-10
            grid
            h-full
            w-full
            gap-[6px]
            p-4

            ${gridLayout[plateSize]}
          `}
        >
          {zones.map((zoneId, index) => (
            <PlateDropZone
              key={zoneId}
              zoneId={zoneId}
              zoneIndex={index}
              pizza={selections[zoneId] ?? null}
              onRemove={onRemove}
              isActive={activeDropZone === zoneId}
            />
          ))}
        </div>

        {/* Branding gravé */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-2
            right-5
            z-20

            select-none

            font-anton
            text-xs
            tracking-[0.25em]

            text-white/20
          "
        >
          TRANCETTA
        </div>
      </div>

      {/* =========================
          INFORMATIONS FORMAT
      ========================== */}

      <div className="mt-4 text-center">
        <p className="font-poppins text-xs text-text-secondary">
          <span className="font-semibold text-black-warm">
            {config.label}
          </span>

          <span className="mx-2">•</span>

          {config.zones} zone{config.zones > 1 ? "s" : ""}

          <span className="mx-2">•</span>

          {config.desc}
        </p>
      </div>
    </div>
  );
}