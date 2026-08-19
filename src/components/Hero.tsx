"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { bookingEmitter } from "@/lib/bookingStore";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // 1. Guaranteed Autoplay Handling across all modern browsers & iOS Safari
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsVideoLoaded(true);
          })
          .catch(() => {
            // If browser autoplay policy blocked, retry on first user interaction
            const handleFirstInteraction = () => {
              video.play().catch(() => {});
              setIsVideoLoaded(true);
              window.removeEventListener("touchstart", handleFirstInteraction);
              window.removeEventListener("click", handleFirstInteraction);
              window.removeEventListener("scroll", handleFirstInteraction);
            };

            window.addEventListener("touchstart", handleFirstInteraction, { passive: true, once: true });
            window.addEventListener("click", handleFirstInteraction, { passive: true, once: true });
            window.addEventListener("scroll", handleFirstInteraction, { passive: true, once: true });
          });
      }
    }
  }, []);

  // 2. GSAP Entrance Animations & Scroll-Driven Parallax Depth
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-label-wrap",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1 }
      )
        .fromTo(
          ".hero-headline-wrap",
          { opacity: 0, y: 40, skewY: 1.5 },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 1.0,
          },
          "-=0.4"
        )
        .fromTo(
          ".hero-support-wrap",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ".hero-ctas",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
        );

      // Scroll-controlled 3D parallax depth effect
      if (heroRef.current && videoContainerRef.current) {
        gsap.to(videoContainerRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
          scale: 0.92,
          yPercent: 10,
          opacity: 0.35,
          ease: "none",
        });

        if (contentRef.current) {
          gsap.to(contentRef.current, {
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
            },
            yPercent: -20,
            opacity: 0.15,
            ease: "none",
          });
        }
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleExploreClick = () => {
    const target = document.querySelector("#intro");
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#141312] text-[#FBF9F5] pt-24 pb-20 selection:bg-[#A75D46] selection:text-[#FBF9F5]"
    >
      {/* Background Visual Container (Seamless Video Hero without Player UI) */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
      >
        {/* Instant Lightweight WebP Poster (Guarantees zero blank screen while video connects) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/hero-poster.webp"
            alt="Atelier Élan 5-Star Luxury Hair Atelier Mumbai"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center brightness-90 contrast-105"
          />
        </div>

        {/* Real Cinematic Background Video (Muted, AutoPlay, Looping, Fullscreen) */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          controls={false}
          preload="auto"
          onPlaying={() => setIsVideoLoaded(true)}
          onCanPlay={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center brightness-90 contrast-105 transition-opacity duration-1000 ease-out ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/videos/hero-desktop.mp4" type="video/mp4" />
          <source src="/videos/hero-desktop.webm" type="video/webm" />
        </video>

        {/* Luxury Film Gradients & Ambient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-[#141312]/45 to-[#141312]/65" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(20,19,18,0.7)_100%)]" />
      </div>

      {/* Hero Content Layer */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 w-full text-center flex flex-col items-center justify-center my-auto pt-8 sm:pt-12"
      >
        {/* Studio Identifier Pill */}
        <div className="hero-label-wrap inline-flex items-center gap-3 mb-6 sm:mb-8 border border-[rgba(251,249,245,0.15)] bg-[#141312]/65 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A75D46] animate-pulse" />
          <span className="editorial-label text-[#EBE6DC] text-[9px] sm:text-[10px] tracking-[0.25em]">
            5-STAR HAIR STUDIO & SANCTUARY · MUMBAI
          </span>
        </div>

        {/* Grand Editorial Headline */}
        <h1 className="hero-headline-wrap font-serif-luxury text-5xl sm:text-7xl md:text-8xl lg:text-[96px] xl:text-[104px] font-light leading-[0.92] tracking-tight uppercase max-w-5xl mb-8">
          <span className="block">STEP INTO</span>
          <span className="block italic text-[#EBE6DC] font-normal">THE LUXURY</span>
          <span className="block">EXPERIENCE.</span>
        </h1>

        {/* Supporting Narrative */}
        <p className="hero-support-wrap font-sans-clean text-sm sm:text-base md:text-lg text-[#A39E99] font-light max-w-xl mx-auto leading-relaxed mb-10 sm:mb-12">
          An architectural sanctuary in the heart of Mumbai. High-end aesthetic, bespoke consultations, and 5-star hair artistry.
        </p>

        {/* CTA Actions */}
        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md">
          <button
            onClick={() => bookingEmitter.open()}
            className="btn-luxury-light w-full sm:w-auto text-xs py-4 px-8 tracking-[0.2em]"
          >
            <span>BOOK AN APPOINTMENT</span>
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </button>

          <button
            onClick={handleExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full border border-[rgba(251,249,245,0.25)] text-[#FBF9F5] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#FBF9F5]/10 transition-all duration-300"
          >
            EXPLORE THE ATELIER
          </button>
        </div>
      </div>

      {/* Scroll Indicator (Bottom Center) */}
      <button
        onClick={handleExploreClick}
        aria-label="Scroll to content"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#A39E99] hover:text-[#FBF9F5] transition-colors duration-300 focus:outline-none"
      >
        <span className="editorial-label text-[8px] tracking-[0.3em]">
          SCROLL
        </span>
        <div className="w-5 h-8 border border-[rgba(251,249,245,0.25)] rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-[#A75D46] rounded-full animate-bounce" />
        </div>
      </button>

      {/* Location Badge (Bottom Right) */}
      <div className="absolute bottom-8 right-8 z-20 hidden lg:block text-right">
        <span className="editorial-label text-[8px] text-[#A75D46] block mb-0.5">
          FLAGSHIP STUDIO
        </span>
        <span className="text-xs font-light tracking-widest text-[#EBE6DC]">
          SOUTH AVENUE, MUMBAI
        </span>
      </div>
    </section>
  );
}
