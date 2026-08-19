"use client";

import { useState, useRef, useCallback } from "react";
import SafeImage from "@/components/SafeImage";
import { bookingEmitter } from "@/lib/bookingStore";
import { INITIAL_BEFORE_AFTER } from "@/lib/data";
import { BeforeAfterItem } from "@/lib/types";
import { MoveHorizontal, Scissors, Sparkles, ArrowUpRight } from "lucide-react";

export default function BeforeAfterSection({
  initialItems = INITIAL_BEFORE_AFTER,
}: {
  initialItems?: BeforeAfterItem[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const categories = ["ALL", "BALAYAGE", "CUT", "COLOUR", "TRANSFORMATION"];

  const filteredItems = initialItems.filter((item) =>
    activeCategory === "ALL" ? true : item.category === activeCategory
  );

  const currentItem = filteredItems[selectedItemIndex] || filteredItems[0] || initialItems[0];

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updatePosition(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      updatePosition(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  return (
    <section
      id="transformations"
      className="relative w-full py-28 sm:py-36 bg-[#141312] text-[#FBF9F5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#A75D46]" />
              <span className="editorial-label text-[#A75D46]">
                CASE STUDIES
              </span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight uppercase">
              THE
              <span className="italic font-normal text-[#EBE6DC] ml-3">
                TRANSFORMATION.
              </span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedItemIndex(0);
                }}
                className={`text-[10px] tracking-[0.2em] uppercase px-4 py-2 rounded-full border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#FBF9F5] text-[#141312] border-[#FBF9F5] font-semibold"
                    : "bg-transparent text-[#A39E99] border-[rgba(251,249,245,0.15)] hover:border-[#FBF9F5] hover:text-[#FBF9F5]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Split-Screen Comparison Slider */}
        {currentItem && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Interactive Image Split Container */}
            <div className="lg:col-span-8">
              <div
                ref={containerRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                style={{ touchAction: "none" }}
                className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-2xl select-none cursor-ew-resize border border-[rgba(251,249,245,0.12)] bg-[#241D1A]"
              >
                {/* AFTER Image (Full Background) */}
                <SafeImage
                  src={currentItem.afterImageUrl}
                  alt={`${currentItem.title} - After`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover object-center pointer-events-none"
                  loading="lazy"
                />

                {/* AFTER Label Badge */}
                <div className="absolute top-4 right-4 bg-[#141312]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[rgba(251,249,245,0.15)] text-[9px] tracking-[0.2em] uppercase font-semibold text-[#EBE6DC] pointer-events-none">
                  AFTER · REFINED
                </div>

                {/* BEFORE Image (Hardware-accelerated clip-path) */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                  }}
                >
                  <SafeImage
                    src={currentItem.beforeImageUrl}
                    alt={`${currentItem.title} - Before`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover object-center"
                    loading="lazy"
                  />
                </div>

                {/* BEFORE Label Badge */}
                <div className="absolute top-4 left-4 bg-[#141312]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[rgba(251,249,245,0.15)] text-[9px] tracking-[0.2em] uppercase font-semibold text-[#A39E99] pointer-events-none">
                  BEFORE · INITIAL
                </div>

                {/* Divider Line & Draggable Handle */}
                <div
                  className="absolute top-0 bottom-0 w-[2px] bg-[#FBF9F5] pointer-events-none shadow-[0_0_12px_rgba(0,0,0,0.8)]"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#FBF9F5] text-[#141312] shadow-2xl flex items-center justify-center border-2 border-[#141312] transition-transform duration-200 hover:scale-110 active:scale-95">
                    <MoveHorizontal className="w-4 h-4 text-[#141312]" />
                  </div>
                </div>
              </div>

              {/* Slider Instructional Prompt */}
              <div className="flex items-center justify-between mt-4 px-2">
                <span className="editorial-label text-[8px] text-[#A39E99]">
                  DRAG SLIDER TO REVEAL METAMORPHOSIS
                </span>
                <span className="editorial-label text-[8px] text-[#A75D46]">
                  {Math.round(sliderPosition)}% REVEALED
                </span>
              </div>
            </div>

            {/* Case Study Metadata Details */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="editorial-label text-[9px] text-[#A75D46]">
                    {currentItem.category}
                  </span>
                  <span className="text-[#A39E99] text-xs">·</span>
                  <span className="editorial-label text-[9px] text-[#A39E99]">
                    STUDIO ARCHIVE
                  </span>
                </div>

                <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#FBF9F5] font-light uppercase tracking-tight">
                  {currentItem.title}
                </h3>

                <p className="font-sans-clean text-xs sm:text-sm text-[#A39E99] font-light leading-relaxed">
                  {currentItem.description}
                </p>

                {/* Stylist & Technique Metadata */}
                <div className="bg-[#1A1817] p-5 rounded-xl border border-[rgba(251,249,245,0.08)] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#A39E99] flex items-center gap-1.5">
                      <Scissors className="w-3.5 h-3.5 text-[#A75D46]" />
                      <span>Master Stylist:</span>
                    </span>
                    <span className="text-[#FBF9F5] font-medium tracking-wide">
                      {currentItem.stylist?.name || currentItem.stylistName || "Master Stylist"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#A39E99] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#A75D46]" />
                      <span>Formulation / Technique:</span>
                    </span>
                    <span className="text-[#EBE6DC] text-right font-light">
                      {currentItem.technique || currentItem.serviceName || "Bespoke Technique"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => bookingEmitter.open()}
                  className="w-full btn-luxury-light text-xs py-4 px-6 tracking-[0.2em]"
                >
                  <span>REQUEST SIMILAR TRANSFORMATION</span>
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Thumbnail Selector Carousel */}
        {filteredItems.length > 1 && (
          <div className="mt-12 pt-8 border-t border-[rgba(251,249,245,0.08)]">
            <span className="editorial-label text-[9px] text-[#A39E99] block mb-4">
              MORE TRANSFORMATION STORIES ({filteredItems.length})
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {filteredItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedItemIndex(idx);
                    setSliderPosition(50);
                  }}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    idx === selectedItemIndex
                      ? "bg-[#241D1A] border-[#A75D46]"
                      : "bg-[#1A1817] border-[rgba(251,249,245,0.08)] hover:border-[rgba(251,249,245,0.2)]"
                  }`}
                >
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-2 bg-[#141312]">
                    <SafeImage
                      src={item.afterImageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-serif-luxury text-sm text-[#FBF9F5] block truncate font-light">
                    {item.title}
                  </span>
                  <span className="editorial-label text-[8px] text-[#A75D46] block mt-0.5">
                    {item.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
