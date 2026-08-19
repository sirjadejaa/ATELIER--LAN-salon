"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollEffects() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    const ctx = gsap.context(() => {
      // 1. Staggered reveal for section headers (Badge -> Heading -> Description)
      const sections = document.querySelectorAll("section:not(#home)");

      sections.forEach((section) => {
        const badge = section.querySelector(".editorial-label");
        const heading = section.querySelector("h2");
        const paragraphs = section.querySelectorAll("p");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });

        if (badge) {
          tl.fromTo(
            badge,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
            0
          );
        }

        if (heading) {
          tl.fromTo(
            heading,
            { y: 35, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
            0.1
          );
        }

        if (paragraphs.length > 0) {
          tl.fromTo(
            paragraphs,
            { y: 25, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
            },
            0.2
          );
        }
      });

      // 2. Subtle image scale reveals on viewport entry
      const imageContainers = document.querySelectorAll(".scroll-image-reveal");
      imageContainers.forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.05, opacity: 0.85 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return null;
}
