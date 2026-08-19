"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }

      setIsVisible(currentScroll > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const strokeDashoffset = 100 - scrollProgress;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      className={`fixed bottom-24 right-6 sm:bottom-28 sm:right-8 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#141312]/85 hover:bg-[#141312] text-[#FBF9F5] backdrop-blur-md shadow-2xl border border-[rgba(251,249,245,0.15)] flex items-center justify-center transition-all duration-400 group focus:outline-none ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {/* Circular SVG Scroll Progress Ring */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
        viewBox="0 0 36 36"
      >
        <path
          className="text-white/15"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="text-[#A75D46] transition-all duration-150"
          strokeDasharray="100, 100"
          strokeDashoffset={strokeDashoffset}
          strokeWidth="2.2"
          strokeLinecap="round"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>

      <ArrowUp className="w-4 h-4 text-[#FBF9F5] transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
