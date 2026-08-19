"use client";

import { useEffect, useRef, useState } from "react";
import SafeImage from "@/components/SafeImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function StudioIntro() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  // Counter States
  const [organicCount, setOrganicCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Image subtle parallax
      if (imageRef.current && sectionRef.current) {
        gsap.to(imageRef.current, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Text staggered reveal
      if (textRef.current && sectionRef.current) {
        gsap.from(textRef.current.children, {
          y: 35,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        });
      }

      // Counter animation
      if (sectionRef.current) {
        const counterObj = { organic: 0, years: 0, clients: 0 };
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
          onEnter: () => {
            gsap.to(counterObj, {
              organic: 100,
              years: 12,
              clients: 30,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => {
                setOrganicCount(Math.round(counterObj.organic));
                setYearsCount(Math.round(counterObj.years));
                setClientsCount(Math.round(counterObj.clients));
              },
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 bg-[#FBF9F5] text-[#141312] overflow-hidden border-b border-[rgba(20,19,18,0.06)]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline & Manifesto */}
          <div ref={textRef} className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-[1px] bg-[#A75D46]" />
              <span className="editorial-label text-[#A75D46]">THE STUDIO</span>
            </div>

            <h2 className="font-serif-luxury text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-light leading-[0.94] tracking-tight uppercase mb-8">
              MORE THAN
              <br />
              <span className="italic font-normal text-[#241D1A]">A HAIRCUT.</span>
            </h2>

            <p className="font-sans-clean text-base sm:text-lg text-[#383532] font-light leading-relaxed mb-8 max-w-lg">
              A considered space where modern technique, personal style and quiet luxury come together. Every session begins with an anatomical consultation to honor your lifestyle, natural hair vectors, and bone structure.
            </p>

            {/* Animated Number Statistics */}
            <div className="grid grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-[rgba(20,19,18,0.08)] max-w-xl">
              <div>
                <span className="font-serif-luxury text-2xl sm:text-3xl text-[#141312] block font-light">
                  {organicCount}%
                </span>
                <span className="editorial-label text-[7.5px] sm:text-[8px] text-[#6B6661] block mt-1">
                  ORGANIC FORMULAE
                </span>
              </div>
              <div>
                <span className="font-serif-luxury text-2xl sm:text-3xl text-[#141312] block font-light">
                  1:1
                </span>
                <span className="editorial-label text-[7.5px] sm:text-[8px] text-[#6B6661] block mt-1">
                  PRIVATE SUITES
                </span>
              </div>
              <div>
                <span className="font-serif-luxury text-2xl sm:text-3xl text-[#141312] block font-light">
                  {yearsCount}+
                </span>
                <span className="editorial-label text-[7.5px] sm:text-[8px] text-[#6B6661] block mt-1">
                  YEARS MASTERY
                </span>
              </div>
              <div>
                <span className="font-serif-luxury text-2xl sm:text-3xl text-[#141312] block font-light">
                  {clientsCount}k+
                </span>
                <span className="editorial-label text-[7.5px] sm:text-[8px] text-[#6B6661] block mt-1">
                  TRANSFORMATIONS
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Parallax Architecture & Salon Craft Photo */}
          <div className="lg:col-span-6 relative">
            <div
              ref={imageRef}
              className="relative aspect-[4/5] sm:aspect-[5/6] w-full rounded-2xl overflow-hidden shadow-2xl bg-[#EBE6DC] will-change-transform"
            >
              <SafeImage
                src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=1400&q=85"
                alt="Atelier Élan Luxury Salon Interior and Architecture"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141312]/30 via-transparent to-transparent" />
            </div>

            {/* Floating Editorial Badge (Corner) */}
            <div className="absolute -bottom-6 -left-6 sm:bottom-6 sm:-left-8 bg-[#141312] text-[#FBF9F5] p-5 sm:p-6 rounded-xl shadow-2xl max-w-[220px] border border-[rgba(251,249,245,0.12)]">
              <span className="editorial-label text-[8px] text-[#A75D46] block mb-1">
                ATELIER PHILOSOPHY
              </span>
              <p className="text-xs font-light text-[#EBE6DC] leading-relaxed">
                Quiet luxury is not about excess. It is about precision that feels effortless.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
