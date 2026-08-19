"use client";

import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { bookingEmitter } from "@/lib/bookingStore";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: "CONSULTATIONS",
    question: "What is included in the Atelier anatomical consultation?",
    answer:
      "Every session begins with a 15-minute diagnostic analysis where our Creative Directors evaluate your natural hair growth vectors, cranial geometry, face shape, and lifestyle demands before shears or color formulas touch your hair.",
  },
  {
    category: "FORMULATIONS",
    question: "Do you use ammonia-free and organic color systems?",
    answer:
      "Yes. We exclusively use biodynamic, ammonia-free European organic color pigments, micro-peptide bond builders, and cold-pressed botanical sealing oils to ensure maximum color depth without scalp irritation or structural hair degradation.",
  },
  {
    category: "BALAYAGE & LONGEVITY",
    question: "How long does French Balayage last before needing a refresh?",
    answer:
      "Our hand-painted French Balayage technique is engineered for seamless, natural regrowth. Most clients enjoy soft, dimensional color for 4 to 6 months with only an intermittent gloss glaze treatment needed at the 8-week mark.",
  },
  {
    category: "PRIVATE SUITES",
    question: "Are private wash suites and VIP booths available?",
    answer:
      "Yes. Atelier Élan features acoustically insulated private styling booths and darkened botanical head spa suites designed for clients seeking serene confidentiality and peaceful quiet luxury.",
  },
  {
    category: "RESERVATIONS",
    question: "What is the cancellation and rescheduling policy?",
    answer:
      "We request at least 24 hours notice for standard appointments and 48 hours for bespoke bridal / full transformation packages to accommodate clients on our private waitlist.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative w-full py-28 sm:py-36 bg-[#FBF9F5] text-[#141312] overflow-hidden border-b border-[rgba(20,19,18,0.06)]"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#A75D46]" />
            <span className="editorial-label text-[#A75D46]">
              CLIENT INQUIRIES & DETAILS
            </span>
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-6xl font-light tracking-tight uppercase mb-4">
            FREQUENTLY ASKED
            <span className="italic font-normal text-[#241D1A] ml-3">QUESTIONS</span>
          </h2>
          <p className="font-sans-clean text-sm sm:text-base text-[#6B6661] font-light leading-relaxed">
            Everything you need to know about our philosophy, bespoke consultations, botanical formulations, and reservation protocols.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="divide-y divide-[rgba(20,19,18,0.08)] border-y border-[rgba(20,19,18,0.08)]">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="py-6 sm:py-8 transition-all duration-300">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-start justify-between text-left gap-6 group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <span className="editorial-label text-xs text-[#A75D46] font-mono mt-1 w-6 flex-shrink-0">
                      0{index + 1}
                    </span>
                    <div>
                      <span className="editorial-label text-[8px] text-[#A75D46] block mb-1">
                        {faq.category}
                      </span>
                      <h3 className="font-serif-luxury text-xl sm:text-2xl font-light text-[#141312] group-hover:text-[#A75D46] transition-colors duration-300">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div className="w-9 h-9 rounded-full border border-[rgba(20,19,18,0.15)] flex items-center justify-center text-[#141312] group-hover:border-[#A75D46] group-hover:text-[#A75D46] transition-all duration-300 flex-shrink-0 mt-1">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#A75D46]" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Animated Answer Body */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 mt-4"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden pl-10 sm:pl-12">
                    <p className="font-sans-clean text-xs sm:text-sm text-[#4A4643] font-light leading-relaxed max-w-3xl pr-4 sm:pr-12">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#EBE6DC]/40 border border-[rgba(20,19,18,0.06)] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="font-serif-luxury text-xl text-[#141312]">
              Have a bespoke request or private bridal inquiry?
            </h4>
            <p className="text-xs text-[#6B6661] mt-1 font-light">
              Our concierge team is available Tuesday through Sunday for personal accommodations.
            </p>
          </div>
          <button
            onClick={() => bookingEmitter.open()}
            className="btn-luxury-dark text-xs py-3 px-7 tracking-[0.18em] flex-shrink-0"
          >
            INQUIRE WITH CONCIERGE
          </button>
        </div>
      </div>
    </section>
  );
}
