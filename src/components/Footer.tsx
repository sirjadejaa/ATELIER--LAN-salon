"use client";

import Link from "next/link";
import SalonLogo from "@/components/SalonLogo";
import { bookingEmitter } from "@/lib/bookingStore";
import { ArrowUpRight, Shield, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";

export default function Footer() {
  const scrollTo = (href: string) => {
    const targetId = href.replace("#", "");
    if (targetId === "home") {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    const el = document.getElementById(targetId);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -80, duration: 1.2 });
      } else {
        const navOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Packages", href: "#packages" },
    { label: "Team", href: "#artists" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative w-full bg-[#141312] text-[#FBF9F5] pt-24 pb-12 overflow-hidden border-t border-[rgba(251,249,245,0.08)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Large Architectural Final Statement & CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-16 border-b border-[rgba(251,249,245,0.1)] gap-10">
          <div>
            <span className="editorial-label text-[#A75D46] block mb-4">
              RESERVE YOUR SANCTUARY SESSION
            </span>
            <h2 className="font-serif-luxury text-5xl sm:text-7xl lg:text-8xl font-light uppercase tracking-tight leading-[0.92]">
              YOUR NEXT LOOK
              <br />
              <span className="italic font-normal text-[#EBE6DC]">STARTS</span>
              <br />
              HERE.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => bookingEmitter.open()}
              className="btn-luxury-light text-xs py-4 px-8 tracking-[0.22em]"
            >
              <span>BOOK AN APPOINTMENT</span>
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </button>
            <a
              href="https://wa.me/919820048192"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury-outline text-[#FBF9F5] border-[rgba(251,249,245,0.3)] hover:bg-[#FBF9F5] hover:text-[#141312] text-xs py-4 px-8 tracking-[0.22em]"
            >
              <span>WHATSAPP CONCIERGE</span>
            </a>
          </div>
        </div>

        {/* 4-Column Navigation & Information */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16 border-b border-[rgba(251,249,245,0.08)]">
          {/* Col 1: Brand & Logo */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <SalonLogo theme="light" onClick={() => scrollTo("#home")} />
            </div>
            <p className="text-xs text-[#A39E99] font-light leading-relaxed mb-6">
              A considered sanctuary where anatomical precision, organic biodynamic formulas, and quiet luxury harmonize.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#A39E99] hover:text-[#FBF9F5] transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-[#A75D46]" />
              <span>Admin Management</span>
            </Link>
          </div>

          {/* Col 2: Studio Exploration (Full Navigation) */}
          <div>
            <span className="editorial-label text-[9px] text-[#A75D46] block mb-4">
              STUDIO EXPLORATION
            </span>
            <ul className="space-y-2.5 text-xs text-[#A39E99] font-light">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="hover:text-[#FBF9F5] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services Summary */}
          <div>
            <span className="editorial-label text-[9px] text-[#A75D46] block mb-4">
              SIGNATURE DISCIPLINES
            </span>
            <ul className="space-y-2.5 text-xs text-[#A39E99] font-light">
              <li>Architectural Precision Cut</li>
              <li>French Balayage Melt</li>
              <li>Haute Couture Gloss</li>
              <li>Cellular Scalp Rejuvenation</li>
              <li>Sculpted Editorial Blow Dry</li>
              <li>Masculine Scissor-Over-Comb</li>
            </ul>
          </div>

          {/* Col 4: Atelier Details */}
          <div>
            <span className="editorial-label text-[9px] text-[#A75D46] block mb-4">
              STUDIO LOCATION
            </span>
            <div className="space-y-3 text-xs text-[#A39E99] font-light">
              <p>14, Alipore Heritage Enclave, South Avenue, Mumbai 400001</p>
              <p className="text-[#EBE6DC] font-normal">
                Tue – Sun: 10:00 AM – 08:30 PM
              </p>
              <p>+91 98200 48192 / concierge@atelier-elan.com</p>
              <div className="flex gap-4 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#241D1A] flex items-center justify-center text-[#FBF9F5] hover:bg-[#A75D46] transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/919820048192"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#241D1A] flex items-center justify-center text-[#FBF9F5] hover:bg-[#A75D46] transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Fine Print */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6B6661] gap-4">
          <p>© {new Date().getFullYear()} ATELIER ÉLAN HAUTE COIFFURE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <span className="hover:text-[#A39E99] cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-[#A39E99] cursor-pointer">TERMS OF SANCTUARY</span>
            <span className="hover:text-[#A39E99] cursor-pointer">CLIENT CHARTER</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
