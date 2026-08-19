"use client";

import { useState } from "react";
import SafeImage from "@/components/SafeImage";
import { INITIAL_GALLERY } from "@/lib/data";
import { GalleryImageItem } from "@/lib/types";
import { X, ZoomIn } from "lucide-react";

export default function EditorialGallery({
  initialItems = INITIAL_GALLERY,
}: {
  initialItems?: GalleryImageItem[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedImage, setSelectedImage] = useState<GalleryImageItem | null>(null);

  const categories = ["ALL", "INTERIOR", "CRAFT", "DETAILS", "PORTRAIT"];

  const filteredItems = initialItems.filter((item) =>
    activeCategory === "ALL" ? true : item.category === activeCategory
  );

  return (
    <section
      id="gallery"
      className="relative w-full py-28 sm:py-36 bg-[#141312] text-[#FBF9F5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 pb-8 border-b border-[rgba(251,249,245,0.1)]">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#A75D46]" />
              <span className="editorial-label text-[#A75D46]">
                VISUAL ARCHIVE
              </span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight uppercase">
              THE
              <span className="italic font-normal text-[#EBE6DC] ml-3">
                GALLERY.
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] tracking-[0.2em] uppercase px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#A75D46] text-[#FBF9F5]"
                    : "bg-[#241D1A] text-[#A39E99] hover:text-[#FBF9F5] border border-[rgba(251,249,245,0.08)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredItems.map((item, idx) => {
            const isTall = idx === 0 || idx === 3;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-[#241D1A] border border-[rgba(251,249,245,0.08)] transition-all duration-500 hover:shadow-2xl hover:border-[#A75D46]/50 ${
                  isTall ? "md:row-span-2 aspect-[3/4]" : "aspect-[4/3]"
                }`}
              >
                <SafeImage
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141312]/80 via-[#141312]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="flex justify-end">
                    <span className="w-9 h-9 rounded-full bg-[#141312]/70 backdrop-blur-md flex items-center justify-center text-[#FBF9F5]">
                      <ZoomIn className="w-4 h-4" />
                    </span>
                  </div>
                  <div>
                    <span className="editorial-label text-[8px] text-[#A75D46] block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-serif-luxury text-xl text-[#FBF9F5] font-light uppercase">
                      {item.title}
                    </h3>
                    {item.caption && (
                      <p className="text-xs text-[#A39E99] font-light mt-1 line-clamp-1">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-[#141312]/95 backdrop-blur-xl flex items-center justify-center p-6 sm:p-12 animate-fadeIn"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#241D1A] text-[#FBF9F5] flex items-center justify-center hover:bg-[#A75D46] transition-colors"
            aria-label="Close image preview"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
          >
            <div className="relative w-full h-[70vh] rounded-xl overflow-hidden shadow-2xl bg-[#241D1A]">
              <SafeImage
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-4 text-center">
              <span className="editorial-label text-[9px] text-[#A75D46] block">
                {selectedImage.category}
              </span>
              <h3 className="font-serif-luxury text-2xl text-[#FBF9F5] uppercase">
                {selectedImage.title}
              </h3>
              {selectedImage.caption && (
                <p className="text-xs text-[#A39E99] font-light mt-1">
                  {selectedImage.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
