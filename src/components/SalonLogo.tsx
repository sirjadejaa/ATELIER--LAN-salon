"use client";

import Link from "next/link";

interface SalonLogoProps {
  theme?: "light" | "dark" | "scrolled";
  className?: string;
  onClick?: () => void;
}

export default function SalonLogo({
  theme = "dark",
  className = "",
  onClick,
}: SalonLogoProps) {
  // theme "light" -> light ivory text for dark backgrounds (Hero)
  // theme "dark" -> dark charcoal text for light backgrounds (scrolled header / cards)
  const isLight = theme === "light";

  return (
    <Link
      href="/"
      onClick={(e) => {
        if (onClick) {
          onClick();
        } else if (typeof window !== "undefined" && window.location.pathname === "/") {
          e.preventDefault();
          if (window.__lenis) {
            window.__lenis.scrollTo(0, { duration: 1.2 });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }
      }}
      className={`group inline-flex items-center gap-2.5 sm:gap-3 focus:outline-none transition-all duration-300 ${className}`}
      aria-label="Atelier Élan — Home"
    >
      {/* Compact Geometric Monogram / Salon Crest Icon */}
      <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center border border-[rgba(167,93,70,0.35)] bg-gradient-to-br from-[#A75D46]/20 via-[#241D1A]/10 to-transparent group-hover:border-[#A75D46] transition-all duration-300 shadow-sm flex-shrink-0">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="w-5 h-5 transition-transform duration-300 group-hover:scale-105"
        >
          {/* Abstract stylized luxury shears & botanical crest */}
          <path
            d="M9 7L16 16M23 7L16 16M16 16V25"
            stroke="#A75D46"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="10" cy="24" r="2.5" stroke="#A75D46" strokeWidth="1.5" />
          <circle cx="22" cy="24" r="2.5" stroke="#A75D46" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="1.5" fill="#A75D46" />
        </svg>
      </div>

      {/* Clean Brand Typography without Subtitle */}
      <div className="flex flex-col text-left leading-none justify-center">
        <span
          className={`font-serif-luxury text-lg sm:text-xl font-normal tracking-tight transition-colors duration-300 ${
            isLight
              ? "text-[#FBF9F5] group-hover:text-[#EBE6DC]"
              : "text-[#141312] group-hover:text-[#A75D46]"
          }`}
        >
          ATELIER ÉLAN
        </span>
      </div>
    </Link>
  );
}
