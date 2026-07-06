"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGSAP } from "@/lib/animations";
import { GALLERY_IMAGES } from "@/lib/constants";
import { Eye } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(Array.from(titleRef.current.children),
          { opacity: 0, y: 25 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
          }
        );
      }

      if (gridRef.current) {
        const items = Array.from(gridRef.current.children);
        items.forEach((item, i) => {
          gsap.fromTo(item,
            { opacity: 0, scale: 0.9, y: 30 },
            {
              opacity: 1, scale: 1, y: 0,
              duration: 0.6,
              delay: i * 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 90%" },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const galleryItems = [
    { src: "/images/plat.png", alt: "Plateau complet Trancetta 4 saveurs", className: "col-span-2 row-span-1", height: "280px" },
    { src: "/images/gallery-prep.png", alt: "Préparation de la pâte", className: "col-span-1 row-span-2", height: "100%" },
    { src: "/images/pizza-margherita.png", alt: "Pizza Margherita", className: "col-span-1", height: "200px" },
    { src: "/images/gallery-platter.png", alt: "Plateau partagé", className: "col-span-1", height: "200px" },
    { src: "/images/pizza-pepperoni.png", alt: "Tranche Pepperoni", className: "col-span-1", height: "220px" },
    { src: "/images/restaurant-ambiance.png", alt: "Ambiance restaurant", className: "col-span-2", height: "220px" },
  ];

  return (
    <section id="galerie" ref={sectionRef} className="section-padding bg-cream-dark overflow-hidden">
      <div className="container-custom">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-primary/10 border border-red-primary/20 rounded-full px-4 py-1.5 mb-5">
            <span className="font-poppins text-red-primary text-xs font-semibold tracking-wider uppercase">Notre Galerie</span>
          </div>

          <h2 className="font-anton text-black-warm mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
            L&apos;ART DE LA <span className="text-red-primary">PIZZA</span><br />EN IMAGES.
          </h2>

          <p className="font-poppins text-text-secondary text-base max-w-lg mx-auto">
            De la préparation à la dégustation, chaque moment chez Trancetta mérite d&apos;être célébré.
          </p>
        </div>

        {/* Masonry-style Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto"
        >
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${item.className}`}
              style={{ minHeight: item.height }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-108"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-red-primary/0 group-hover:bg-red-primary/40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                  <div className="bg-white/90 rounded-full p-3 shadow-lg">
                    <Eye size={22} className="text-red-primary" />
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black-warm/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-poppins text-white text-sm font-medium">{item.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center mt-10">
          <a
            href="https://instagram.com/trancetta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-poppins font-semibold text-sm text-text-secondary hover:text-red-primary transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
            </svg>
            Suivez-nous sur Instagram pour plus de contenu
            <span className="text-red-primary">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
