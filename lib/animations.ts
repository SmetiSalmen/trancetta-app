// ============================================================
// TRANCETTA — GSAP Animation Helpers
// Used in client components with "use client"
// ============================================================

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function registerGSAP() {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }
}

// Fade up reveal for elements entering viewport
export function fadeUpReveal(
  targets: string | Element | Element[],
  options: {
    stagger?: number;
    delay?: number;
    duration?: number;
    trigger?: string | Element;
    start?: string;
  } = {}
) {
  const {
    stagger = 0.1,
    delay = 0,
    duration = 0.7,
    trigger,
    start = "top 85%",
  } = options;

  return gsap.fromTo(
    targets,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: "power3.out",
      scrollTrigger: trigger
        ? {
            trigger,
            start,
            toggleActions: "play none none none",
          }
        : undefined,
    }
  );
}

// Fade in from side
export function fadeFromLeft(
  targets: string | Element | Element[],
  options: { trigger?: string | Element; delay?: number; duration?: number } = {}
) {
  const { trigger, delay = 0, duration = 0.8 } = options;

  return gsap.fromTo(
    targets,
    { opacity: 0, x: -50 },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: trigger
        ? { trigger, start: "top 80%", toggleActions: "play none none none" }
        : undefined,
    }
  );
}

export function fadeFromRight(
  targets: string | Element | Element[],
  options: { trigger?: string | Element; delay?: number; duration?: number } = {}
) {
  const { trigger, delay = 0, duration = 0.8 } = options;

  return gsap.fromTo(
    targets,
    { opacity: 0, x: 50 },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: trigger
        ? { trigger, start: "top 80%", toggleActions: "play none none none" }
        : undefined,
    }
  );
}

// Clip-path image reveal
export function imageReveal(
  targets: string | Element | Element[],
  options: { trigger?: string | Element; delay?: number } = {}
) {
  const { trigger, delay = 0 } = options;

  return gsap.fromTo(
    targets,
    { clipPath: "inset(0 100% 0 0)", opacity: 0 },
    {
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      duration: 1,
      delay,
      ease: "power4.inOut",
      scrollTrigger: trigger
        ? { trigger, start: "top 80%", toggleActions: "play none none none" }
        : undefined,
    }
  );
}

// Animated counter
export function animateCounter(
  element: Element,
  target: number,
  options: { duration?: number; suffix?: string } = {}
) {
  const { duration = 2, suffix = "" } = options;
  const obj = { value: 0 };

  return gsap.to(obj, {
    value: target,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      element.textContent =
        Math.round(obj.value).toLocaleString("fr-FR") + suffix;
    },
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
}

// Parallax on scroll
export function parallaxElement(
  targets: string | Element | Element[],
  options: { speed?: number; trigger?: string | Element } = {}
) {
  const { speed = -50, trigger } = options;

  return gsap.to(targets, {
    y: speed,
    ease: "none",
    scrollTrigger: {
      trigger: trigger || (targets as string),
      scrub: 1.5,
    },
  });
}

// Hero entrance timeline
export function heroEntrance(elements: {
  badge?: Element | null;
  title?: Element | null;
  subtitle?: Element | null;
  slogan?: Element | null;
  text?: Element | null;
  buttons?: Element | null;
  image?: Element | null;
  mascot?: Element | null;
}) {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  if (elements.badge) {
    tl.fromTo(elements.badge, { opacity: 0, y: 20, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.5 });
  }
  if (elements.title) {
    tl.fromTo(elements.title, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.2");
  }
  if (elements.subtitle) {
    tl.fromTo(elements.subtitle, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
  }
  if (elements.slogan) {
    tl.fromTo(elements.slogan, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 }, "-=0.3");
  }
  if (elements.text) {
    tl.fromTo(elements.text, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2");
  }
  if (elements.buttons) {
    tl.fromTo(elements.buttons, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");
  }
  if (elements.image) {
    tl.fromTo(elements.image, { opacity: 0, scale: 0.85, rotation: -5 }, { opacity: 1, scale: 1, rotation: -3, duration: 1, ease: "back.out(1.2)" }, "-=0.8");
  }
  if (elements.mascot) {
    tl.fromTo(elements.mascot, { opacity: 0, x: 40, y: 20 }, { opacity: 1, x: 0, y: 0, duration: 0.7, ease: "back.out(2)" }, "-=0.4");
  }

  return tl;
}
