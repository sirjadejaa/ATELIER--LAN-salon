"use client";

import SafeImage from "@/components/SafeImage";
import { bookingEmitter } from "@/lib/bookingStore";
import { ArrowUpRight, ShieldCheck, Leaf } from "lucide-react";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full py-28 sm:py-36 bg-[#141312] text-[#FBF9F5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Layered Editorial Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl bg-[#241D1A]">
              <SafeImage
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1400&q=85"
                alt="Atelier Élan Salon Atmosphere and Private Wash Suites"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141312]/60 via-transparent to-transparent" />
            </div>

            {/* Overlapping Small Supporting Inset */}
            <div className="hidden sm:block absolute -bottom-8 -right-8 w-60 h-72 rounded-xl overflow-hidden shadow-2xl border-2 border-[#141312] bg-[#241D1A]">
              <SafeImage
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
                alt="Botanical formulation and essential scalp care"
                fill
                sizes="240px"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Values */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-[1px] bg-[#A75D46]" />
              <span className="editorial-label text-[#A75D46]">
                OUR MANIFESTO
              </span>
            </div>

            <h2 className="font-serif-luxury text-5xl sm:text-6xl lg:text-7xl font-light uppercase tracking-tight mb-8 leading-[0.95]">
              CRAFTED
              <br />
              <span className="italic font-normal text-[#EBE6DC]">AROUND</span>
              <br />
              YOU.
            </h2>

            <p className="font-sans-clean text-sm sm:text-base text-[#A39E99] font-light leading-relaxed mb-6">
              Founded in 2018, Atelier Élan was conceived as an antidote to frantic commercial salon spaces. We built a sanctuary where silence is celebrated, consultations are thorough, and craftsmanship is held to haute-couture standards.
            </p>

            <p className="font-sans-clean text-sm sm:text-base text-[#A39E99] font-light leading-relaxed mb-10">
              We exclusively use ammonia-free biodynamic colors, cold-pressed Amazonian and Nordic botanical oils, and micro-peptide bond builders that restore natural hair vitality without toxic synthetic residue.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[rgba(251,249,245,0.08)] mb-10">
              <div className="flex items-start gap-3">
                <Leaf className="w-5 h-5 text-[#A75D46] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#FBF9F5]">
                    BIODYNAMIC FORMULAE
                  </h4>
                  <p className="text-[11px] text-[#A39E99] font-light mt-1">
                    Free from ammonia, parabens & synthetic fragrances.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#A75D46] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#FBF9F5]">
                    ACOUSTIC SERENITY
                  </h4>
                  <p className="text-[11px] text-[#A39E99] font-light mt-1">
                    Sound-dampened travertine private styling stations.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => bookingEmitter.open()}
                className="btn-luxury-light text-xs py-3.5 px-8 tracking-[0.2em]"
              >
                <span>EXPERIENCE THE ATELIER</span>
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
