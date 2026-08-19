"use client";

import { useState } from "react";
import SafeImage from "@/components/SafeImage";
import { bookingEmitter } from "@/lib/bookingStore";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceInterest: "Precision Cut & Styling",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        serviceInterest: "Precision Cut & Styling",
        message: "",
      });
    }, 4000);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-28 sm:py-36 bg-[#FBF9F5] text-[#141312] overflow-hidden border-b border-[rgba(20,19,18,0.08)]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Studio Details & Aesthetic Architectural Card */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-8 h-[1px] bg-[#A75D46]" />
                <span className="editorial-label text-[#A75D46]">
                  ATELIER ACCESS & CONCIERGE
                </span>
              </div>

              <h2 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-light uppercase tracking-tight mb-8 leading-[0.95]">
                LET&apos;S CREATE
                <br />
                <span className="italic font-normal text-[#241D1A]">YOUR NEXT</span>
                <br />
                LOOK.
              </h2>

              <p className="font-sans-clean text-sm sm:text-base text-[#6B6661] font-light leading-relaxed mb-10 max-w-md">
                Private appointments are reserved with generous time buffers to ensure absolute discretion and undisturbed craft.
              </p>

              {/* Information List */}
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#EBE6DC] flex items-center justify-center flex-shrink-0 text-[#141312]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="editorial-label text-[9px] text-[#A75D46] block">
                      STUDIO LOCATION
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-[#141312]">
                      14, Alipore Heritage Enclave, South Avenue, Mumbai 400001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#EBE6DC] flex items-center justify-center flex-shrink-0 text-[#141312]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="editorial-label text-[9px] text-[#A75D46] block">
                      STUDIO HOURS
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-[#141312]">
                      Tue – Sun: 10:00 AM – 08:30 PM (Mondays Reserved for Master Classes)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#EBE6DC] flex items-center justify-center flex-shrink-0 text-[#141312]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="editorial-label text-[9px] text-[#A75D46] block">
                      DIRECT DESK & WHATSAPP
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-[#141312]">
                      +91 98200 48192 / +91 98765 43210
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#EBE6DC] flex items-center justify-center flex-shrink-0 text-[#141312]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="editorial-label text-[9px] text-[#A75D46] block">
                      EMAIL INQUIRIES
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-[#141312]">
                      concierge@atelier-elan.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Architectural Location Visual Card */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-lg border border-[rgba(20,19,18,0.08)] bg-[#EBE6DC]">
              <SafeImage
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80"
                alt="Atelier Élan Mumbai Sanctuary Building"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141312]/70 via-transparent to-transparent flex items-end p-6">
                <a
                  href="https://maps.google.com/?q=Mumbai+Boutique+Salon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FBF9F5] text-[#141312] text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wider hover:bg-[#EBE6DC] transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#A75D46]" />
                  <span>OPEN IN GOOGLE MAPS</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Inquiry Form */}
          <div className="lg:col-span-6 bg-[#F5F2EA] p-8 sm:p-12 rounded-3xl border border-[rgba(20,19,18,0.08)] shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[rgba(20,19,18,0.08)]">
                <div>
                  <span className="editorial-label text-[#A75D46] block">
                    INQUIRY FORM
                  </span>
                  <h3 className="font-serif-luxury text-3xl font-light uppercase text-[#141312]">
                    PRIVATE CONSULTATION
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => bookingEmitter.open()}
                  className="text-xs uppercase tracking-wider text-[#A75D46] hover:underline font-semibold"
                >
                  Direct Booking Flow →
                </button>
              </div>

              {formSubmitted ? (
                <div className="py-16 text-center animate-fadeIn">
                  <CheckCircle2 className="w-12 h-12 text-[#A75D46] mx-auto mb-4" />
                  <h4 className="font-serif-luxury text-3xl text-[#141312] uppercase mb-2">
                    INQUIRY RECEIVED
                  </h4>
                  <p className="text-xs text-[#6B6661] max-w-sm mx-auto">
                    Thank you, {formData.name || "valued client"}. Our private concierge team will reach out within 2 hours to confirm your custom requirements.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="editorial-label text-[9px] text-[#6B6661] block mb-2">
                      YOUR FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Maya Singhania"
                      className="w-full bg-[#FBF9F5] border border-[rgba(20,19,18,0.12)] rounded-xl px-4 py-3.5 text-xs text-[#141312] placeholder-[#A39E99] focus:outline-none focus:border-[#A75D46] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="editorial-label text-[9px] text-[#6B6661] block mb-2">
                        PHONE NUMBER *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+91 98000 00000"
                        className="w-full bg-[#FBF9F5] border border-[rgba(20,19,18,0.12)] rounded-xl px-4 py-3.5 text-xs text-[#141312] placeholder-[#A39E99] focus:outline-none focus:border-[#A75D46] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="editorial-label text-[9px] text-[#6B6661] block mb-2">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="maya@example.com"
                        className="w-full bg-[#FBF9F5] border border-[rgba(20,19,18,0.12)] rounded-xl px-4 py-3.5 text-xs text-[#141312] placeholder-[#A39E99] focus:outline-none focus:border-[#A75D46] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="editorial-label text-[9px] text-[#6B6661] block mb-2">
                      PRIMARY SERVICE OF INTEREST
                    </label>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          serviceInterest: e.target.value,
                        })
                      }
                      className="w-full bg-[#FBF9F5] border border-[rgba(20,19,18,0.12)] rounded-xl px-4 py-3.5 text-xs text-[#141312] focus:outline-none focus:border-[#A75D46] transition-colors"
                    >
                      <option>Precision Cut & Architecture</option>
                      <option>French Balayage Melt</option>
                      <option>Haute Couture Single-Process Colour</option>
                      <option>Cellular Scalp Rejuvenation</option>
                      <option>The Complete Transformation Package</option>
                      <option>Masculine Grooming</option>
                      <option>Private Bridal / Editorial Styling</option>
                    </select>
                  </div>

                  <div>
                    <label className="editorial-label text-[9px] text-[#6B6661] block mb-2">
                      TRANSFORMATION NOTES / DESIRED SCHEDULE
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Share your current hair length, recent chemical treatments, or preferred appointment dates..."
                      className="w-full bg-[#FBF9F5] border border-[rgba(20,19,18,0.12)] rounded-xl px-4 py-3.5 text-xs text-[#141312] placeholder-[#A39E99] focus:outline-none focus:border-[#A75D46] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-luxury-dark w-full py-4 text-xs tracking-[0.2em]"
                  >
                    <span>SEND CONSULTATION INQUIRY</span>
                    <Send className="w-4 h-4 ml-2" />
                  </button>
                </form>
              )}
            </div>

            <div className="pt-6 mt-6 border-t border-[rgba(20,19,18,0.08)] flex items-center justify-between text-xs text-[#6B6661]">
              <span>Prefer immediate chat?</span>
              <a
                href="https://wa.me/919820048192"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#A75D46] font-semibold hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
