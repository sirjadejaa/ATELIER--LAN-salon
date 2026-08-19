"use client";

import SafeImage from "@/components/SafeImage";
import { ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";

export default function InstagramSection() {
  const posts = [
    {
      id: "ig-1",
      image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80",
      caption: "Dimensional sunlit balayage melt in the natural afternoon studio light.",
    },
    {
      id: "ig-2",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      caption: "Layered razor texture for effortless movement.",
    },
    {
      id: "ig-3",
      image: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=800&q=80",
      caption: "Travertine and quiet morning light in Suite 02.",
    },
    {
      id: "ig-4",
      image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
      caption: "Cellular scalp rejuvenation ritual with cold-pressed botanical oils.",
    },
    {
      id: "ig-5",
      image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80",
      caption: "Molten espresso tones and mirror acid glaze.",
    },
    {
      id: "ig-6",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
      caption: "Scissor angle precision with Creative Director Aarav.",
    },
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#141312] text-[#FBF9F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6 pb-6 border-b border-[rgba(251,249,245,0.08)]">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <InstagramIcon className="w-4 h-4 text-[#A75D46]" />
              <span className="editorial-label text-[#A75D46]">
                @ATELIER.ELAN
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light uppercase tracking-tight">
              FOLLOW THE
              <span className="italic font-normal text-[#EBE6DC] ml-2">
                PROCESS.
              </span>
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#EBE6DC] hover:text-[#A75D46] transition-colors"
          >
            <span>JOIN THE DIALOGUE</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* 6-Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xl overflow-hidden bg-[#241D1A] border border-[rgba(251,249,245,0.08)]"
            >
              <SafeImage
                src={post.image}
                alt={post.caption}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#141312]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 text-center">
                <InstagramIcon className="w-6 h-6 text-[#FBF9F5]" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
