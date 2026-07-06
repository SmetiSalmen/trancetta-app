"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGSAP } from "@/lib/animations";
import { BRAND, OPENING_HOURS } from "@/lib/constants";
import { Phone, MapPin, Clock, Navigation } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.fromTo(Array.from(leftRef.current.children),
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: leftRef.current, start: "top 80%" },
          }
        );
      }

      if (rightRef.current) {
        gsap.fromTo(rightRef.current,
          { opacity: 0, scale: 0.95, x: 40 },
          {
            opacity: 1, scale: 1, x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: rightRef.current, start: "top 80%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const today = new Date().toLocaleDateString("fr-FR", { weekday: "long" });
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <section id="localisation" ref={sectionRef} className="section-padding bg-cream overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — Info */}
          <div ref={leftRef}>
            <div className="inline-flex items-center gap-2 bg-red-primary/10 border border-red-primary/20 rounded-full px-4 py-1.5 mb-5">
              <span className="font-poppins text-red-primary text-xs font-semibold tracking-wider uppercase">
                Horaires & Localisation
              </span>
            </div>

            <h2 className="font-anton text-black-warm mb-6" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
              RETROUVEZ-NOUS<br />
              <span className="text-red-primary">CHAQUE JOUR.</span>
            </h2>

            {/* Contact info cards */}
            <div className="space-y-4 mb-8">
              <a
                href={`tel:${BRAND.phone}`}
                className="flex items-center gap-4 p-4 bg-cream-dark rounded-2xl hover:bg-red-primary/8 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-red-primary/10 flex items-center justify-center text-red-primary group-hover:bg-red-primary group-hover:text-white transition-colors flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="font-poppins text-xs text-text-secondary">Téléphone</div>
                  <div className="font-poppins font-semibold text-black-warm">{BRAND.phone}</div>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 bg-cream-dark rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-orange-pizza/10 flex items-center justify-center text-orange-pizza flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="font-poppins text-xs text-text-secondary">Adresse</div>
                  <div className="font-poppins font-semibold text-black-warm">{BRAND.address}</div>
                </div>
              </div>
            </div>

            {/* Hours table */}
            <div className="bg-cream-dark rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={18} className="text-red-primary" />
                <h3 className="font-poppins font-semibold text-black-warm text-sm">Horaires d&apos;ouverture</h3>
              </div>
              <div className="space-y-2">
                {OPENING_HOURS.map((item) => {
                  const isToday = item.day === todayCapitalized;
                  return (
                    <div
                      key={item.day}
                      className={`flex justify-between items-center text-sm rounded-lg px-2 py-1 ${
                        isToday ? "bg-red-primary/10" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isToday && (
                          <span className="w-1.5 h-1.5 rounded-full bg-green-accent animate-pulse flex-shrink-0" />
                        )}
                        <span className={`font-poppins ${isToday ? "font-semibold text-black-warm" : "text-text-secondary"}`}>
                          {item.day}
                        </span>
                      </div>
                      <span className={`font-poppins ${isToday ? "font-semibold text-red-primary" : "text-text-secondary"}`}>
                        {item.open ? item.hours : "Fermé"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Directions button */}
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(BRAND.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Navigation size={16} />
              Obtenir l&apos;itinéraire
            </a>
          </div>

          {/* Right — Map */}
          <div ref={rightRef} className="opacity-0">
            <div className="relative rounded-3xl overflow-hidden shadow-pizza border-4 border-cream-dark"
              style={{ height: "min(480px, 50vw)", minHeight: "320px" }}
            >
              <iframe
                src={BRAND.mapEmbedUrl}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Trancetta Pizza House — Localisation"
              />
            </div>

            {/* Info card below map */}
            <div className="mt-4 bg-red-primary rounded-2xl p-5 text-white flex items-center justify-between">
              <div>
                <div className="font-poppins text-xs text-white/70 mb-1">Trancetta Pizza House</div>
                <div className="font-anton text-lg">OUVERT AUJOURD&apos;HUI</div>
                <div className="font-poppins text-sm text-white/80">
                  {OPENING_HOURS.find((h) => h.day === todayCapitalized)?.hours ?? "11h00 — 23h00"}
                </div>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-accent animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
