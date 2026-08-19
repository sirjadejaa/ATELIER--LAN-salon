"use client";

import { useEffect } from "react";
import { bookingEmitter } from "@/lib/bookingStore";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function BookPage() {

  useEffect(() => {
    bookingEmitter.open();
  }, []);

  return (
    <div className="min-h-screen bg-[#141312] text-[#FBF9F5] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#A75D46]/20 text-[#A75D46] flex items-center justify-center mx-auto animate-pulse">
          <Sparkles className="w-8 h-8" />
        </div>
        <span className="editorial-label text-[#A75D46] block">
          ATELIER ÉLAN APPOINTMENTS
        </span>
        <h1 className="font-serif-luxury text-4xl font-light uppercase">
          RESERVE YOUR PRIVATE SANCTUARY SESSION
        </h1>
        <p className="text-xs text-[#A39E99] leading-relaxed font-light">
          The booking concierge modal is active. If not opened, click below.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            onClick={() => bookingEmitter.open()}
            className="btn-luxury-light text-xs py-3 px-8 tracking-[0.2em]"
          >
            OPEN BOOKING CONCIERGE
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#A39E99] hover:text-[#FBF9F5]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Studio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
