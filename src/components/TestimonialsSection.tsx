"use client";

import { useState, useEffect, useRef } from "react";
import SafeImage from "@/components/SafeImage";
import { INITIAL_TESTIMONIALS } from "@/lib/data";
import { TestimonialItem } from "@/lib/types";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function TestimonialsSection({
  initialTestimonials = INITIAL_TESTIMONIALS,
}: {
  initialTestimonials?: TestimonialItem[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play interval with pause-on-hover
  useEffect(() => {
    if (isPaused || initialTestimonials.length <= 1) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % initialTestimonials.length);
    }, 6000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, initialTestimonials.length]);

  const prev = () => {
    setCurrentIndex((prevIdx) =>
      prevIdx === 0 ? initialTestimonials.length - 1 : prevIdx - 1
    );
  };

  const next = () => {
    setCurrentIndex((prevIdx) =>
      (prevIdx + 1) % initialTestimonials.length
    );
  };

  const current = initialTestimonials[currentIndex] || initialTestimonials[0];

  return (
    <section
      id="testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full py-28 sm:py-36 bg-[#F5F2EA] text-[#141312] overflow-hidden border-b border-[rgba(20,19,18,0.08)]"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-6 h-[1px] bg-[#A75D46]" />
          <span className="editorial-label text-[#A75D46]">
            CLIENT TESTIMONIALS
          </span>
          <span className="w-6 h-[1px] bg-[#A75D46]" />
        </div>

        {/* 5-Star Rating */}
        <div className="flex items-center justify-center gap-1.5 mb-8 text-[#A75D46]">
          {[...Array(current.rating || 5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#A75D46]" />
          ))}
        </div>

        {/* Large Centered Editorial Quote with Smooth Transition */}
        <div className="relative mb-12 min-h-[160px] flex items-center justify-center">
          <Quote className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 text-[#A75D46]/15 pointer-events-none" />
          <blockquote className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl font-light italic text-[#141312] leading-snug max-w-4xl mx-auto transition-opacity duration-500">
            &ldquo;{current.quote}&rdquo;
          </blockquote>
        </div>

        {/* Client Bio & Portrait */}
        <div className="flex flex-col items-center justify-center transition-all duration-300">
          {current.clientImageUrl && (
            <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3.5 border-2 border-[#A75D46]/40 shadow-md bg-[#EBE6DC]">
              <SafeImage
                src={current.clientImageUrl}
                alt={current.clientName}
                fill
                sizes="64px"
                className="object-cover"
                loading="lazy"
              />
            </div>
          )}
          <h4 className="font-serif-luxury text-2xl font-light uppercase tracking-wide text-[#141312]">
            {current.clientName}
          </h4>
          {current.clientRole && (
            <span className="editorial-label text-[9px] text-[#6B6661] mt-1">
              {current.clientRole}
            </span>
          )}
          {current.serviceName && (
            <span className="text-[10px] text-[#A75D46] tracking-wider uppercase mt-1">
              {current.serviceName}
            </span>
          )}
        </div>

        {/* Navigation Controls & Pagination Dots */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-11 h-11 rounded-full border border-[rgba(20,19,18,0.2)] flex items-center justify-center text-[#141312] hover:bg-[#141312] hover:text-[#FBF9F5] transition-all duration-300 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {initialTestimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  currentIndex === idx
                    ? "w-7 bg-[#A75D46]"
                    : "w-1.5 bg-[#141312]/20 hover:bg-[#141312]/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-11 h-11 rounded-full border border-[rgba(20,19,18,0.2)] flex items-center justify-center text-[#141312] hover:bg-[#141312] hover:text-[#FBF9F5] transition-all duration-300 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
