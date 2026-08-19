"use client";

import { useState, useRef } from "react";
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

  // Floating cursor follower state for desktop
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      id="services"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveService(null);
      }}
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

        {/* Desktop Editorial Interactive List */}
        <div className="hidden lg:block divide-y divide-[rgba(251,249,245,0.08)]">
          {initialServices.map((service, index) => {
            const isCurrent = activeService?.id === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveService(service)}
                className={`group py-8 transition-all duration-300 cursor-pointer flex items-center justify-between ${
                  isCurrent ? "opacity-100 pl-4" : "opacity-75 hover:opacity-100"
                }`}
              >
                {/* Left: Number & Service Name */}
                <div className="flex items-center gap-10">
                  <span className="editorial-label text-xs text-[#A75D46] font-mono w-6">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-serif-luxury text-3xl xl:text-4xl text-[#FBF9F5] group-hover:text-[#A75D46] transition-colors duration-300 font-light uppercase">
                      {service.name}
                    </h3>
                    <p className="text-xs text-[#A39E99] font-light mt-1 max-w-md line-clamp-1">
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

        {/* Floating 3D Cursor Preview Image on Desktop */}
        {activeService && isHovered && (
          <div
            className="hidden lg:block pointer-events-none fixed z-30 transition-transform duration-100 ease-out will-change-transform"
            style={{
              left: cursorPos.x + 40,
              top: cursorPos.y - 120,
              transform: `translate3d(0, 0, 0) rotate(3deg)`,
            }}
          >
            <div className="relative w-64 h-80 rounded-xl overflow-hidden shadow-2xl border border-[rgba(251,249,245,0.2)] bg-[#241D1A]">
              <SafeImage
                src={activeService.imageUrl}
                alt={activeService.name}
                fill
                sizes="256px"
                className="object-cover object-center"
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
          </div>
        )}

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
                  <div className="flex items-center gap-3">
                    <span className="editorial-label text-[10px] text-[#A75D46] font-mono">
                      0{index + 1}
                    </span>
                    <h3 className="font-serif-luxury text-xl text-[#FBF9F5] font-light uppercase">
                      {service.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-serif-luxury text-base text-[#EBE6DC]">
                      ₹{service.price.toLocaleString("en-IN")}
                    </span>
                    {isExpanded ? (
                      <Minus className="w-4 h-4 text-[#A75D46]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#A39E99]" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="mt-4 pt-3 space-y-4 animate-fadeIn">
                    <div className="relative w-full h-48 rounded-xl overflow-hidden bg-[#241D1A]">
                      <SafeImage
                        src={service.imageUrl}
                        alt={service.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-xs text-[#A39E99] font-light leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-[#A39E99] tracking-wider">
                        DURATION: {service.duration} MINS
                      </span>
                      <button
                        onClick={() =>
                          bookingEmitter.open({ serviceId: service.id })
                        }
                        className="btn-luxury-light py-2 px-5 text-[10px] tracking-[0.2em]"
                      >
                        BOOK THIS SERVICE
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
