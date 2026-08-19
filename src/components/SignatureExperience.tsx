"use client";

import { useEffect, useRef } from "react";
import SafeImage from "@/components/SafeImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Compass, Scissors, Sparkles } from "lucide-react";

export default function SignatureExperience() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollWrapperRef = useRef<HTMLDivElement | null>(null);

  const stages = [
    {
      num: "01",
      title: "CONSULTATION",
      subtitle: "Understand your style.",
      description:
        "Every transformation begins with an unhurried dialogue. We examine your facial architecture, natural growth vectors, skin undertones, and daily routine to architect a bespoke silhouette.",
      icon: Compass,
      imageUrl:
        "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1400&q=85",
      tags: ["FACIAL DIAGNOSTICS", "LIFESTYLE MAPPING", "TEXTURE ANALYSIS"],
    },
    {
      num: "02",
      title: "CRAFT",
      subtitle: "Precision meets technique.",
      description:
        "Japanese texturizing shears and bespoke French color formulas are applied with millimetric accuracy. We work with the organic density of your hair to ensure effortless natural movement.",
      icon: Scissors,
      imageUrl:
        "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1400&q=85",
      tags: ["DRY SCISSORS TECHNIQUE", "AMMONIA-FREE GLOSS", "CELLULAR BONDING"],
    },
    {
      num: "03",
      title: "FINISH",
      subtitle: "Every detail matters.",
      description:
        "Micro-peptide steam infusion, cold-blast setting, and cold-pressed botanical oils lock in mirror radiance and long-lasting volume that looks sublime for weeks post-appointment.",
      icon: Sparkles,
      imageUrl:
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1400&q=85",
      tags: ["COLD-BLAST LOCK", "ORGANIC RADIANCE", "HOME CARE PRESCRIPTION"],
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Only apply horizontal scroll on desktop (min-width: 1024px)
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (containerRef.current && scrollWrapperRef.current) {
        const sections = gsap.utils.toArray<HTMLElement>(".exp-slide");
        
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + ((containerRef.current?.offsetWidth || 1200) * 2.5),
          },
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full bg-[#FBF9F5] text-[#141312] overflow-hidden border-b border-[rgba(20,19,18,0.08)]"
    >
      {/* Desktop Horizontal Scroll Experience */}
      <div className="hidden lg:flex min-h-screen items-center">
        <div
          ref={scrollWrapperRef}
          className="flex flex-nowrap w-full h-screen items-center"
        >
          {/* Introductory Pinned Slide */}
          <div className="exp-slide w-screen h-screen flex-shrink-0 flex items-center px-12 xl:px-20 bg-[#FBF9F5]">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-[1px] bg-[#A75D46]" />
                <span className="editorial-label text-[#A75D46]">
                  SIGNATURE METHODOLOGY
                </span>
              </div>
              <h2 className="font-serif-luxury text-6xl xl:text-7xl font-light uppercase tracking-tight mb-6">
                THE THREE
                <br />
                <span className="italic font-normal text-[#241D1A]">PILLARS OF</span>
                <br />
                ÉLAN.
              </h2>
              <p className="font-sans-clean text-base text-[#383532] font-light leading-relaxed mb-8">
                We believe true artistry lives in the harmony between disciplined technical execution and intuitive personalization. Scroll to explore our 3-stage signature journey.
              </p>
              <div className="inline-flex items-center gap-3 text-xs tracking-widest uppercase font-semibold text-[#A75D46]">
                <span>SCROLL TO EXPLORE</span>
                <ArrowRight className="w-4 h-4 animate-pulse" />
              </div>
            </div>
          </div>

          {/* 3 Stages */}
          {stages.map((stage) => {
            return (
              <div
                key={stage.num}
                className="exp-slide w-screen h-screen flex-shrink-0 flex items-center justify-between px-12 xl:px-20 bg-[#F5F2EA] border-l border-[rgba(20,19,18,0.08)]"
              >
                <div className="max-w-lg pr-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-serif-luxury text-5xl text-[#A75D46] font-light">
                      {stage.num}
                    </span>
                    <span className="h-6 w-[1px] bg-[#A75D46]/40" />
                    <span className="editorial-label text-xs text-[#6B6661]">
                      PHASE {stage.num}
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-5xl xl:text-6xl font-light uppercase tracking-tight text-[#141312] mb-3">
                    {stage.title}
                  </h3>
                  <p className="font-serif-luxury text-2xl italic text-[#241D1A] font-normal mb-6">
                    &ldquo;{stage.subtitle}&rdquo;
                  </p>

                  <p className="font-sans-clean text-sm xl:text-base text-[#383532] font-light leading-relaxed mb-8">
                    {stage.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {stage.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#EBE6DC] text-[#383532] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative w-[45vw] h-[75vh] rounded-2xl overflow-hidden shadow-2xl bg-[#EBE6DC]">
                  <SafeImage
                    src={stage.imageUrl}
                    alt={stage.title}
                    fill
                    sizes="50vw"
                    className="object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141312]/40 via-transparent to-transparent" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Vertical Storytelling Layout */}
      <div className="lg:hidden py-24 px-6 sm:px-10">
        <div className="mb-12">
          <span className="editorial-label text-[#A75D46] block mb-2">
            SIGNATURE METHODOLOGY
          </span>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl font-light uppercase tracking-tight">
            THE THREE PILLARS OF ÉLAN
          </h2>
        </div>

        <div className="space-y-16">
          {stages.map((stage) => {
            return (
              <div
                key={stage.num}
                className="bg-[#F5F2EA] p-6 sm:p-8 rounded-2xl border border-[rgba(20,19,18,0.06)] shadow-sm"
              >
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-6 bg-[#EBE6DC]">
                  <SafeImage
                    src={stage.imageUrl}
                    alt={stage.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center"
                    loading="lazy"
                  />
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <span className="font-serif-luxury text-3xl text-[#A75D46]">
                    {stage.num}
                  </span>
                  <h3 className="font-serif-luxury text-2xl font-light uppercase tracking-wide">
                    {stage.title}
                  </h3>
                </div>

                <p className="font-serif-luxury text-lg italic text-[#241D1A] mb-3">
                  &ldquo;{stage.subtitle}&rdquo;
                </p>

                <p className="text-xs text-[#383532] font-light leading-relaxed mb-6">
                  {stage.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {stage.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#EBE6DC] text-[#383532]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
