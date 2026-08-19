"use client";

import { bookingEmitter } from "@/lib/bookingStore";
import { INITIAL_PACKAGES } from "@/lib/data";
import { PackageItem } from "@/lib/types";
import { Check, ArrowUpRight } from "lucide-react";

export default function PackagesSection({
  initialPackages = INITIAL_PACKAGES,
}: {
  initialPackages?: PackageItem[];
}) {
  return (
    <section
      id="packages"
      className="relative w-full py-28 sm:py-36 bg-[#FBF9F5] text-[#141312] overflow-hidden border-b border-[rgba(20,19,18,0.08)]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#A75D46]" />
            <span className="editorial-label text-[#A75D46]">
              CURATED RITUALS
            </span>
            <span className="w-6 h-[1px] bg-[#A75D46]" />
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight uppercase">
            THE
            <span className="italic font-normal text-[#241D1A] ml-3">
              PACKAGES.
            </span>
          </h2>
          <p className="font-sans-clean text-xs sm:text-sm text-[#6B6661] font-light mt-4 tracking-wide">
            Designed for those seeking comprehensive transformations with seamless harmony and extended private studio attention.
          </p>
        </div>

        {/* 3 Editorial Tier Containers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {initialPackages.map((pkg, idx) => {
            const isFeatured = idx === 1; // Signature package highlighted
            const serviceList = Array.isArray(pkg.includedServices)
              ? pkg.includedServices
              : typeof pkg.includedServices === "string"
              ? JSON.parse(pkg.includedServices || "[]")
              : [];

            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-400 ${
                  isFeatured
                    ? "bg-[#141312] text-[#FBF9F5] shadow-2xl scale-100 lg:-translate-y-2 border border-[#A75D46]/40"
                    : "bg-[#F5F2EA] text-[#141312] border border-[rgba(20,19,18,0.08)] shadow-sm hover:shadow-md"
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#A75D46] text-[#FBF9F5] px-4 py-1 rounded-full text-[9px] tracking-[0.25em] uppercase font-bold">
                    MOST REQUESTED
                  </div>
                )}

                <div>
                  {/* Package Name & Duration */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`editorial-label text-[10px] ${
                        isFeatured ? "text-[#A75D46]" : "text-[#6B6661]"
                      }`}
                    >
                      RITUAL 0{idx + 1}
                    </span>
                    <span
                      className={`text-xs tracking-wider uppercase font-mono ${
                        isFeatured ? "text-[#A39E99]" : "text-[#6B6661]"
                      }`}
                    >
                      {pkg.duration} MINS
                    </span>
                  </div>

                  <h3
                    className={`font-serif-luxury text-3xl font-light uppercase tracking-tight mb-4 ${
                      isFeatured ? "text-[#FBF9F5]" : "text-[#141312]"
                    }`}
                  >
                    {pkg.name}
                  </h3>

                  <p
                    className={`text-xs font-light leading-relaxed mb-8 ${
                      isFeatured ? "text-[#A39E99]" : "text-[#6B6661]"
                    }`}
                  >
                    {pkg.description}
                  </p>

                  {/* Price Block */}
                  <div className="mb-8 pb-6 border-b border-[rgba(20,19,18,0.08)]">
                    <span
                      className={`font-serif-luxury text-4xl sm:text-5xl font-normal ${
                        isFeatured ? "text-[#FBF9F5]" : "text-[#141312]"
                      }`}
                    >
                      ₹{pkg.price.toLocaleString("en-IN")}
                    </span>
                    <span
                      className={`text-xs ml-2 uppercase tracking-widest ${
                        isFeatured ? "text-[#A39E99]" : "text-[#6B6661]"
                      }`}
                    >
                      ALL-INCLUSIVE
                    </span>
                  </div>

                  {/* Inclusions List */}
                  <div className="space-y-3 mb-10">
                    <span
                      className={`editorial-label text-[8px] block mb-3 ${
                        isFeatured ? "text-[#EBE6DC]" : "text-[#383532]"
                      }`}
                    >
                      INCLUDED IN THIS SESSION:
                    </span>
                    {serviceList.map((srv: string) => (
                      <div key={srv} className="flex items-start gap-3 text-xs font-light">
                        <Check
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            isFeatured ? "text-[#A75D46]" : "text-[#241D1A]"
                          }`}
                        />
                        <span
                          className={
                            isFeatured ? "text-[#EBE6DC]" : "text-[#383532]"
                          }
                        >
                          {srv}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking Button */}
                <button
                  onClick={() => bookingEmitter.open({ packageId: pkg.id })}
                  className={`w-full py-3.5 text-xs tracking-[0.2em] font-semibold uppercase rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${
                    isFeatured
                      ? "btn-luxury-light"
                      : "btn-luxury-dark"
                  }`}
                >
                  <span>RESERVE RITUAL</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
