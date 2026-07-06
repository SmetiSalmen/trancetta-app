"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroEntrance, registerGSAP } from "@/lib/animations";
import { BRAND } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const sloganRef = useRef<HTMLParagraphElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 15;
      const yPos = (clientY / window.innerHeight - 0.5) * 15;

      gsap.to(imageRef.current, {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power2.out"
      });
      gsap.to(mascotRef.current, {
        x: -xPos * 1.5,
        y: -yPos * 1.5,
        duration: 1.2,
        ease: "power2.out"
      });
      gsap.to(".parallax-blob-1", {
        x: -xPos * 0.4,
        y: -yPos * 0.4,
        duration: 1.8,
        ease: "power2.out"
      });
      gsap.to(".parallax-blob-2", {
        x: xPos * 0.6,
        y: yPos * 0.6,
        duration: 1.8,
        ease: "power2.out"
      });
    };

    const ctx = gsap.context(() => {
      // Hero entrance animation
      heroEntrance({
        badge: badgeRef.current,
        title: titleRef.current,
        subtitle: subtitleRef.current,
        slogan: sloganRef.current,
        text: textRef.current,
        buttons: buttonsRef.current,
        image: imageRef.current,
        mascot: mascotRef.current,
      });

      // Floating mascot
      if (mascotRef.current) {
        gsap.to(mascotRef.current, {
          y: -14,
          duration: 2.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // Subtle rotation of the plat image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          rotation: -2,
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // Floating animations for individual vector ingredients
      if (document.querySelector(".floating-item-1")) {
        gsap.to(".floating-item-1", {
          y: -15,
          x: 8,
          rotation: 12,
          duration: 3.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    }, sectionRef);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <section
        id="accueil"
        ref={sectionRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "#F8F3EE" }}
      >
        {/* Background patterns & SVG blobs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          {/* Pizza Ingredients SVG Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pizza-pattern" width="130" height="130" patternUnits="userSpaceOnUse">
                {/* Pizza Slice */}
                <g transform="translate(10, 10) scale(0.7)" stroke="var(--color-brown)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 5,5 L 45,15 C 47,15.5 47.5,18 46,19 L 32,32 C 31,33 29,33.5 28,32.5 L 6,10 C 4.5,8.5 4,6 5,5 Z" />
                  <path d="M 45,15 C 42,22 32,32 32,32" />
                  <circle cx="20" cy="15" r="1.5" fill="var(--color-brown)" />
                  <circle cx="30" cy="22" r="1.5" fill="var(--color-brown)" />
                </g>

                {/* Mushroom */}
                <g transform="translate(80, 20) scale(0.65)" stroke="var(--color-brown)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 12,25 C 12,12 38,12 38,25 C 38,28 35,30 32,30 L 18,30 C 15,30 12,28 12,25 Z" />
                  <path d="M 21,30 L 21,42 C 21,44 23,46 25,46 C 27,46 29,44 29,42 L 29,30" />
                </g>

                {/* Basil Leaf */}
                <g transform="translate(20, 75) scale(0.7)" stroke="var(--color-brown)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 30,10 C 15,15 10,35 25,45 C 40,55 45,25 30,10 Z" />
                  <path d="M 30,10 C 27,22 23,32 25,45" />
                </g>

                {/* Tomato Slice */}
                <g transform="translate(75, 75) scale(0.75)" stroke="var(--color-brown)" strokeWidth="1.2" fill="none">
                  <circle cx="25" cy="25" r="18" />
                  <circle cx="25" cy="25" r="14" strokeDasharray="2 3" />
                  <circle cx="18" cy="18" r="2" fill="var(--color-brown)" />
                  <circle cx="32" cy="18" r="2" fill="var(--color-brown)" />
                  <circle cx="18" cy="32" r="2" fill="var(--color-brown)" />
                  <circle cx="32" cy="32" r="2" fill="var(--color-brown)" />
                </g>

                {/* Olive */}
                <g transform="translate(110, 110) scale(0.6)" stroke="var(--color-brown)" strokeWidth="1.2" fill="none">
                  <circle cx="10" cy="10" r="8" />
                  <circle cx="10" cy="10" r="3.5" />
                </g>

                {/* Pepperoni */}
                <g transform="translate(10, 110) scale(0.65)" stroke="var(--color-brown)" strokeWidth="1.2" fill="none">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="8" cy="8" r="1.5" fill="var(--color-brown)" />
                  <circle cx="15" cy="9" r="1.5" fill="var(--color-brown)" />
                  <circle cx="11" cy="15" r="1.5" fill="var(--color-brown)" />
                </g>

                {/* Wheat ear */}
                <g transform="translate(110, 50) scale(0.55) rotate(45)" stroke="var(--color-brown)" strokeWidth="1.2" fill="none" strokeLinecap="round">
                  <line x1="10" y1="40" x2="10" y2="10" />
                  <path d="M10,10 C15,8 18,12 10,18" />
                  <path d="M10,10 C5,8 2,12 10,18" />
                  <path d="M10,20 C15,18 18,22 10,28" />
                  <path d="M10,20 C5,18 2,22 10,28" />
                  <path d="M10,30 C15,28 18,32 10,38" />
                  <path d="M10,30 C5,28 2,32 10,38" />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pizza-pattern)" />
          </svg>

          {/* Red Blobs (Abstract SVG Shapes) with Parallax Classes */}
          {/* Top Left Blob */}
          <svg viewBox="0 0 500 500" className="parallax-blob-1 absolute -top-48 -left-48 w-[600px] h-[600px]">
            <path fill="var(--color-red-primary)" opacity="0.06" d="M380,180Q420,260,370,330Q320,400,240,390Q160,380,130,300Q100,220,160,160Q220,100,300,140Q380,180,380,180Z" />
          </svg>

          {/* Center Right / Behind Plat Image Blob */}
          <svg viewBox="0 0 500 500" className="parallax-blob-2 absolute -top-10 -right-24 w-[750px] h-[750px]">
            <path fill="var(--color-red-primary)" opacity="0.05" d="M390,200Q440,280,380,350Q320,420,230,400Q140,380,120,290Q100,200,170,140Q240,80,315,140Q390,200,390,200Z" />
          </svg>

          {/* Bottom Left Blob */}
          <svg viewBox="0 0 500 500" className="parallax-blob-3 absolute -bottom-36 left-16 w-[450px] h-[450px]">
            <path fill="var(--color-red-dark)" opacity="0.04" d="M350,150Q430,220,390,310Q350,400,250,380Q150,360,130,270Q110,180,190,130Q270,80,350,150Z" />
          </svg>
        </div>

        <div className="container-custom relative z-35 pt-28 pb-32 lg:pb-40">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* LEFT — Text content */}
            <div className="relative">
              {/* Main title */}
              <h1
                ref={titleRef}
                className="font-anton text-black-warm leading-[0.85] mb-2 opacity-0 relative uppercase"
                style={{ fontSize: "clamp(3.5rem, 7.5vw, 6.5rem)" }}
              >
                <span className="relative z-10">La Pizza</span>
                <br />
                <span className="text-red-primary relative z-10">Autrement.</span>
                <br />
                <span className="text-red-primary text-[0.45em] tracking-wide block mt-2 font-anton">
                  EN TRANCHE. EN PLATEAU.
                </span>
              </h1>

              {/* Cursive Slogan/Sub-heading with underline */}
              <div ref={subtitleRef} className="opacity-0 mb-6 relative">
                <p className="font-caveat text-red-primary text-4xl md:text-5xl rotate-[-3deg] inline-block mb-1">
                  É l'ora della pizza!
                </p>
                {/* Yellow/Orange hand-drawn underline SVG */}
                <div className="w-56 h-3 text-orange-pizza -mt-1 opacity-80">
                  <svg viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M2,8 C30,3 70,3 98,8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Description / Sub-heading text with green word */}
              <p
                ref={sloganRef}
                className="font-poppins text-text-secondary text-base md:text-lg mb-8 opacity-0 relative z-20"
              >
                La qualité prima di <span className="text-green-accent font-bold">tutto !</span>
              </p>

              {/* Red Hand-drawn Arrow pointing to the mascot */}
              <div className="absolute left-[200px] bottom-[80px] w-24 h-16 text-red-primary hidden lg:block opacity-85 select-none pointer-events-none z-10">
                <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M10,10 C35,12 60,25 75,40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
                  <path d="M63,38 L76,41 L73,28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Buttons */}
              <div ref={buttonsRef} className="flex flex-wrap items-center gap-4 opacity-0 z-20 relative">
                <Link
                  href="/menu"
                  className="bg-red-primary hover:bg-red-dark text-white font-anton tracking-wider text-sm px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 shadow-md transform hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <path d="M15 11h.01M11 15h.01M16 16h.01m-10.7-3.3C4.2 8.4 8.4 4.2 12.7 5.3c5 1.2 7 6.7 4 10.4-2.2 2.7-6.2 3.3-9.1 1.6l-3.3.9.9-3.2z" />
                  </svg>
                  VOIR LE MENU
                </Link>
                <a
                  href={`https://wa.me/${BRAND.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#F8F3EE] border-2 border-green-accent text-green-accent hover:bg-green-accent hover:text-white font-anton tracking-wider text-sm px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 shadow-sm transform hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  COMMANDER SUR WHATSAPP
                </a>
              </div>
            </div>

            {/* RIGHT — Visual with stickers and floating elements */}
            <div className="relative flex items-center justify-end pt-10 lg:pt-0">

              {/* Plat image wrapper with ref */}
              <div
                ref={imageRef}
                className="relative opacity-0 z-10 translate-x-16"
              >
                <div className="relative">
                  <Image
                    src="/images/plat.png"
                    alt="Plateau rectangulaire Trancetta 4 saveurs"
                    width={1280}
                    height={920}
                    className="object-contain w-full h-auto scale-[2] origin-center translate-x-50"
                    priority
                    quality={95}
                  />
                </div>

                {/* Badge sur l'image */}
                <div className="absolute -top-4 -left-4 bg-red-primary text-white rounded-2xl px-16 py-3 shadow-md rotate-[-4deg]">
                  <div className="font-caveat text-xl leading-tight text-center">
                    La qualité<br />prima di tout!
                  </div>
                </div>
              </div>

              {/* Mascot - larger peeking mascot with floating animation */}
              <div
                ref={mascotRef}
                className="absolute -bottom-40 left-6 md:left-12 lg:-left-8 z-25 pointer-events-none select-none w-96 md:w-96 lg:w-[660px]"
              >
                <Image
                  src="/images/mascotte/mascotte1.png"
                  alt="Mascotte Trancetta"
                  width={960}
                  height={1080}
                  loading="eager"
                  className="object-contain w-full h-auto drop-shadow-xl"
                />
              </div>

            </div>
          </div>
        </div>

        {/* Curved wave transition to HeroFeaturesBar */}
        <div className="absolute bottom-0 left-0 right-0 w-full translate-y-[2px] z-20 pointer-events-none">
          <svg viewBox="0 0 1440 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0,80 Q720,160 1440,80 L1440,220 L0,220 Z" fill="#BC2325" />
          </svg>
        </div>
      </section>
    </>
  );
}
