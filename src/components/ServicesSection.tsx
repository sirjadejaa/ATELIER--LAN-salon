"use client";

import { useState, useRef, useEffect } from "react";
import SafeImage from "@/components/SafeImage";
import { bookingEmitter } from "@/lib/bookingStore";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { INITIAL_SERVICES } from "@/lib/data";
import { ServiceItem } from "@/lib/types";

export default function ServicesSection({
  initialServices = INITIAL_SERVICES,
}: {
  initialServices?: ServiceItem[];
}) {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const [expandedMobileId, setExpandedMobileId] = useState<string | null>(
    initialServices[0]?.id || null
  );

  const previewRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Direct GPU Transform for cursor preview (zero React state re-renders on mousemove)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId: number;
    const onMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (previewRef.current) {
          previewRef.current.style.transform = `translate3d(${e.clientX + 30}px, ${e.clientY - 120}px, 0) rotate(2deg)`;
        }
      });
    };

    section.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      section.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      onMouseLeave={() => setActiveService(null)}
      className="relative w-full py-28 sm:py-36 bg-[#141312] text-[#FBF9F5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[rgba(251,249,245,0.1)] gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#A75D46]" />
              <span className="editorial-label text-[#A75D46]">SERVICES MENU</span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight uppercase text-[#FBF9F5]">
              PRECISION &
              <span className="italic font-normal text-[#EBE6DC] ml-3">FORMULATION</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#A39E99] font-light max-w-sm tracking-wide">
            Each ritual includes a comprehensive stylistic diagnosis, organic botanical wash, and tailored home prescription.
          </p>
        </div>

        {/* Desktop Editorial Table */}
        <div className="hidden lg:block divide-y divide-[rgba(251,249,245,0.08)]">
          {initialServices.map((service, index) => {
            const isCurrent = activeService?.id === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveService(service)}
                onClick={() => bookingEmitter.open({ serviceId: service.id })}
                className={`group py-8 px-6 flex items-center justify-between transition-all duration-300 cursor-pointer ${
                  isCurrent ? "bg-[#241D1A]/50 pl-10" : "hover:bg-[#241D1A]/20"
                }`}
              >
                {/* Left: Index & Service Info */}
                <div className="flex items-start gap-8 max-w-xl">
                  <span className="editorial-label text-[#A75D46] text-xs pt-1">
                    0{index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="editorial-label text-[8px] text-[#A75D46] px-2.5 py-0.5 rounded-full bg-[#A75D46]/10 border border-[#A75D46]/30">
                        {service.category}
                      </span>
                      {service.featured && (
                        <span className="editorial-label text-[8px] text-[#EBE6DC] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/15">
                          SIGNATURE
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif-luxury text-2xl xl:text-3xl text-[#FBF9F5] group-hover:text-[#EBE6DC] transition-colors font-light uppercase">
                      {service.name}
                    </h3>
                    <p className="text-xs text-[#A39E99] font-light mt-1.5 line-clamp-1">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Right: Duration, Price, and Booking Trigger */}
                <div className="flex items-center gap-10">
                  <div className="text-right">
                    <span className="text-xs font-light text-[#A39E99] block tracking-wider">
                      {service.duration} MINS
                    </span>
                    <span className="font-serif-luxury text-xl text-[#FBF9F5] font-normal block">
                      ₹{service.price.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      bookingEmitter.open({ serviceId: service.id });
                    }}
                    className="w-12 h-12 rounded-full border border-[rgba(251,249,245,0.2)] flex items-center justify-center text-[#FBF9F5] group-hover:border-[#A75D46] group-hover:bg-[#A75D46] group-hover:text-[#FBF9F5] transition-all duration-300"
                    aria-label={`Book ${service.name}`}
                  >
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating 3D Cursor Preview Image on Desktop (GPU Accelerated, zero React re-render) */}
        <div
          ref={previewRef}
          className={`hidden lg:block pointer-events-none fixed top-0 left-0 z-30 transition-opacity duration-200 ease-out will-change-transform ${
            activeService ? "opacity-100" : "opacity-0"
          }`}
        >
          {activeService && (
            <div className="relative w-64 h-80 rounded-xl overflow-hidden shadow-2xl border border-[rgba(251,249,245,0.2)] bg-[#241D1A]">
              <SafeImage
                src={activeService.imageUrl}
                alt={activeService.name}
                fill
                sizes="256px"
                className="object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141312]/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="editorial-label text-[8px] text-[#A75D46] block">
                  {activeService.category}
                </span>
                <span className="font-serif-luxury text-sm text-[#FBF9F5] block font-light">
                  {activeService.name}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Accordion View */}
        <div className="lg:hidden divide-y divide-[rgba(251,249,245,0.08)]">
          {initialServices.map((service, index) => {
            const isExpanded = expandedMobileId === service.id;
            return (
              <div key={service.id} className="py-5">
                <button
                  onClick={() =>
                    setExpandedMobileId(isExpanded ? null : service.id)
                  }
                  className="w-full flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <span className="editorial-label text-[#A75D46] text-[10px]">
                      0{index + 1}
                    </span>
                    <span className="font-serif-luxury text-lg text-[#FBF9F5] font-light uppercase">
                      {service.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#A75D46] font-medium">
                      ₹{service.price.toLocaleString("en-IN")}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-[#241D1A] flex items-center justify-center text-[#A39E99]">
                      {isExpanded ? (
                        <Minus className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="pt-4 pb-2 pl-8 pr-2 space-y-4">
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#241D1A]">
                      <SafeImage
                        src={service.imageUrl}
                        alt={service.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 500px"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-xs text-[#A39E99] font-light leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-[#6B6661] tracking-wider uppercase">
                        DURATION: {service.duration} MINS
                      </span>
                      <button
                        onClick={() =>
                          bookingEmitter.open({ serviceId: service.id })
                        }
                        className="btn-luxury-light text-[10px] py-2 px-5 tracking-wider"
                      >
                        BOOK THIS
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
