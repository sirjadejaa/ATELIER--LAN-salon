"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SalonLogo from "@/components/SalonLogo";
import { bookingEmitter } from "@/lib/bookingStore";
import { Menu, X, ArrowUpRight, Shield } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  id: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Gallery", href: "#gallery", id: "gallery" },
  { label: "Packages", href: "#packages", id: "packages" },
  { label: "Team", href: "#artists", id: "artists" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const isScrolledRef = useRef(false);
  const activeSectionRef = useRef("home");

  // Track scroll position, reading progress, and active section scroll spy with zero frame overhead
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const currentScroll = window.scrollY;
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;

        // Direct DOM update for reading bar (0 React re-renders while scrolling)
        if (progressBarRef.current && totalScroll > 0) {
          const progress = Math.min(100, (currentScroll / totalScroll) * 100);
          progressBarRef.current.style.width = `${progress}%`;
        }

        const nextScrolled = currentScroll > 45;
        if (nextScrolled !== isScrolledRef.current) {
          isScrolledRef.current = nextScrolled;
          setIsScrolled(nextScrolled);
        }

        // If near top of page, HOME is active
        if (currentScroll < 260) {
          if (activeSectionRef.current !== "home") {
            activeSectionRef.current = "home";
            setActiveSection("home");
          }
          return;
        }

        // Scroll Spy: Determine currently active section
        const scrollPosition = currentScroll + 140; // Offset for navbar

        for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
          const link = NAV_LINKS[i];
          if (link.id === "home") continue;

          const section = document.getElementById(link.id);
          if (section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              if (activeSectionRef.current !== link.id) {
                activeSectionRef.current = link.id;
                setActiveSection(link.id);
              }
              return;
            }
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");

    if (targetId === "home") {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setActiveSection("home");
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      if (window.__lenis) {
        window.__lenis.scrollTo(element, { offset: -80, duration: 1.2 });
      } else {
        const navOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-[72px] sm:h-[80px] flex items-center will-change-transform ${
          isScrolled
            ? "glass-nav-light shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-b border-[rgba(20,19,18,0.08)]"
            : "bg-gradient-to-b from-[#141312]/80 via-[#141312]/30 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full flex items-center justify-between">
          {/* LEFT: Compact Professional Salon Logo */}
          <SalonLogo
            theme={isScrolled ? "dark" : "light"}
            onClick={() => handleNavClick("#home")}
          />

          {/* CENTER: Complete 7-Item Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`text-xs uppercase tracking-[0.22em] font-medium relative py-1.5 transition-all duration-200 focus:outline-none ${
                    isScrolled
                      ? isActive
                        ? "text-[#141312] font-semibold"
                        : "text-[#4A4643] hover:text-[#141312]"
                      : isActive
                      ? "text-[#FBF9F5] font-semibold"
                      : "text-[#D8D2C7] hover:text-[#FBF9F5]"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A75D46] animate-pulse" />
                    )}
                    <span>{link.label}</span>
                  </span>

                  {/* Animated Active / Hover Underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#A75D46] transition-all duration-300 ${
                      isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* RIGHT: Compact Book Appointment CTA + Admin Portal */}
          <div className="hidden lg:flex items-center gap-3.5">
            <Link
              href="/admin"
              className={`p-2 rounded-full transition-all duration-200 focus:outline-none ${
                isScrolled
                  ? "text-[#6B6661] hover:text-[#141312] hover:bg-[#EBE6DC]/60"
                  : "text-[#A39E99] hover:text-[#FBF9F5] hover:bg-white/10"
              }`}
              title="Admin Management Portal"
            >
              <Shield className="w-4 h-4" />
            </Link>

            <button
              onClick={() => bookingEmitter.open()}
              className={`text-[11px] py-2 px-5 tracking-[0.18em] font-semibold rounded-full transition-all duration-300 ${
                isScrolled
                  ? "btn-luxury-dark shadow-sm"
                  : "btn-luxury-light shadow-lg hover:shadow-xl"
              }`}
            >
              <span>Book Appointment</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* MOBILE: Actions & Menu Trigger */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <button
              onClick={() => bookingEmitter.open()}
              className={`text-[10px] py-1.5 px-3.5 tracking-[0.15em] font-semibold rounded-full transition-all duration-300 ${
                isScrolled
                  ? "btn-luxury-dark"
                  : "btn-luxury-light"
              }`}
            >
              Book
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-full transition-colors focus:outline-none ${
                isScrolled
                  ? "text-[#141312] hover:bg-[#EBE6DC]/60"
                  : "text-[#FBF9F5] hover:bg-white/10"
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Real-time Page Reading Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-[#A75D46] via-[#C47D68] to-[#141312] transition-all duration-75 ease-out"
            style={{ width: "0%" }}
          />
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#141312] text-[#FBF9F5] flex flex-col justify-between p-8 sm:p-12 transition-all duration-500 lg:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <div className="pt-20">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[rgba(251,249,245,0.08)]">
            <SalonLogo theme="light" onClick={() => handleNavClick("#home")} />
            <span className="editorial-label text-[#A75D46] text-[9px]">
              ATELIER MENU
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link, idx) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`font-serif-luxury text-2xl sm:text-3xl transition-colors duration-300 flex items-center justify-between border-b border-[rgba(251,249,245,0.06)] pb-2.5 ${
                    isActive ? "text-[#A75D46]" : "text-[#FBF9F5] hover:text-[#A75D46]"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#A75D46]" />
                    )}
                    <span>{link.label}</span>
                  </span>
                  <span className="text-[10px] font-sans font-normal tracking-widest text-[#A39E99]">
                    0{idx + 1}
                  </span>
                </a>
              );
            })}

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif-luxury text-xl text-[#A39E99] hover:text-[#FBF9F5] transition-colors duration-300 flex items-center gap-2 pt-2"
            >
              <Shield className="w-4 h-4 text-[#A75D46]" />
              <span>Admin Management</span>
            </Link>
          </div>
        </div>

        <div className="border-t border-[rgba(251,249,245,0.12)] pt-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          <div>
            <p className="text-[11px] text-[#A39E99] tracking-wider">
              14, ALIPORE HERITAGE ENCLAVE, MUMBAI
            </p>
            <p className="text-[11px] text-[#FBF9F5] mt-0.5 tracking-wider">
              TUE – SUN: 10:00 AM – 08:30 PM
            </p>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              bookingEmitter.open();
            }}
            className="btn-luxury-light text-center w-full sm:w-auto py-3 px-8 text-xs tracking-[0.2em]"
          >
            BOOK AN APPOINTMENT
          </button>
        </div>
      </div>
    </>
  );
}
