"use client";

import SafeImage from "@/components/SafeImage";
import { bookingEmitter } from "@/lib/bookingStore";
import { INITIAL_STAFF } from "@/lib/data";
import { StaffItem } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";

export default function ArtistsSection({
  initialStaff = INITIAL_STAFF,
}: {
  initialStaff?: StaffItem[];
}) {
  return (
    <section
      id="artists"
      className="relative w-full py-28 sm:py-36 bg-[#FBF9F5] text-[#141312] overflow-hidden border-b border-[rgba(20,19,18,0.08)]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#A75D46]" />
              <span className="editorial-label text-[#A75D46]">
                MASTERS OF THE CRAFT
              </span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight uppercase">
              THE
              <span className="italic font-normal text-[#241D1A] ml-3">
                ARTISTS.
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6B6661] font-light max-w-md tracking-wide">
            Trained across London, Milan and Tokyo. Each master artist operates with dedicated private studio focus and deliberate restraint.
          </p>
        </div>

        {/* Editorial Artist Cards (Grid with large portraits) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {initialStaff.map((artist) => {
            const specialtiesList = Array.isArray(artist.specialties)
              ? artist.specialties
              : typeof artist.specialties === "string"
              ? artist.specialties.split(",").map((s) => s.trim())
              : [];

            return (
              <div
                key={artist.id}
                className="group flex flex-col justify-between bg-[#F5F2EA] rounded-2xl overflow-hidden border border-[rgba(20,19,18,0.06)] p-4 sm:p-5 transition-all duration-400 hover:shadow-xl hover:-translate-y-1.5"
              >
                <div>
                  {/* Large Editorial Portrait */}
                  <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden mb-6 bg-[#EBE6DC]">
                    <SafeImage
                      src={artist.imageUrl}
                      alt={artist.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141312]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Experience Badge */}
                    <div className="absolute top-3 right-3 bg-[#141312]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] tracking-widest uppercase font-semibold text-[#FBF9F5]">
                      {artist.experience}
                    </div>
                  </div>

                  {/* Staff Identity */}
                  <div className="mb-4">
                    <span className="editorial-label text-[9px] text-[#A75D46] block mb-1">
                      {artist.role}
                    </span>
                    <h3 className="font-serif-luxury text-2xl text-[#141312] font-light uppercase tracking-tight">
                      {artist.name}
                    </h3>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-[#6B6661] font-light leading-relaxed mb-6">
                    {artist.bio}
                  </p>

                  {/* Specialties Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {specialtiesList.map((spec) => (
                      <span
                        key={spec}
                        className="text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#EBE6DC] text-[#383532]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Booking Trigger */}
                <div className="pt-4 border-t border-[rgba(20,19,18,0.06)]">
                  <button
                    onClick={() =>
                      bookingEmitter.open({ staffId: artist.id })
                    }
                    className="w-full flex items-center justify-between text-xs uppercase tracking-[0.18em] font-semibold text-[#141312] hover:text-[#A75D46] transition-colors py-2 group/btn"
                  >
                    <span>BOOK WITH {artist.name.split(" ")[0]}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
