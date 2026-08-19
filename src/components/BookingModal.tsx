"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { bookingEmitter } from "@/lib/bookingStore";
import { INITIAL_SERVICES, INITIAL_STAFF, INITIAL_SETTINGS } from "@/lib/data";
import { ServiceItem, StaffItem, BookingItem } from "@/lib/types";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  Clock,
  Sparkles,
  Download,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [staffList, setStaffList] = useState<StaffItem[]>(INITIAL_STAFF);

  // Booking selections
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<StaffItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingItem | null>(null);

  const servicesRef = useRef(services);
  const staffListRef = useRef(staffList);

  useEffect(() => {
    servicesRef.current = services;
  }, [services]);

  useEffect(() => {
    staffListRef.current = staffList;
  }, [staffList]);

  // 1. Fetch dynamic services and staff once on mount
  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setServices(data);
      })
      .catch(() => {});

    fetch("/api/staff")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setStaffList(data);
      })
      .catch(() => {});
  }, []);

  // 2. Subscribe to booking emitter events
  useEffect(() => {
    const unsubscribe = bookingEmitter.subscribe((state) => {
      setIsOpen(state.isOpen);
      if (state.isOpen) {
        setStep(1);
        setConfirmedBooking(null);
        if (state.serviceId) {
          const match = servicesRef.current.find((s) => s.id === state.serviceId);
          if (match) {
            setSelectedService(match);
            setStep(2);
          }
        }
        if (state.staffId) {
          const match = staffListRef.current.find((s) => s.id === state.staffId);
          if (match) {
            setSelectedStaff(match);
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Generate next 14 bookable dates (excluding Mondays)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 21; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      // Exclude Mondays (day 1) as private atelier days
      if (d.getDay() !== 1) {
        dates.push({
          dateString: d.toISOString().split("T")[0],
          dayName: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
          dayNum: d.getDate(),
          monthName: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
        });
      }
    }
    return dates;
  };

  const timeSlots = [
    "10:00 AM",
    "11:30 AM",
    "01:00 PM",
    "02:30 PM",
    "04:00 PM",
    "05:30 PM",
    "07:00 PM",
  ];

  const handleNext = () => {
    if (step === 1 && !selectedService) return;
    if (step === 2) {
      // If no staff chosen, default to first available
    }
    if (step === 3 && !selectedDate) return;
    if (step === 4 && !selectedTime) return;
    if (step === 5) {
      handleFinalSubmit();
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleFinalSubmit = async () => {
    if (!customerDetails.name || !customerDetails.phone) {
      alert("Please provide your Name and Phone number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        customerName: customerDetails.name,
        customerEmail: customerDetails.email,
        customerPhone: customerDetails.phone,
        date: selectedDate,
        timeSlot: selectedTime,
        serviceId: selectedService?.id,
        staffId: selectedStaff?.id,
        notes: customerDetails.notes,
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setConfirmedBooking(data);
        setStep(6);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#A75D46", "#EBE6DC", "#FBF9F5", "#241D1A"],
          });
        } catch {}
      } else {
        alert(data.error || "Failed to reserve appointment. Please try again.");
      }
    } catch (e) {
      console.error(e);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate .ics calendar file
  const downloadCalendarFile = () => {
    if (!confirmedBooking) return;
    const title = `Atelier Élan Appointment - ${selectedService?.name || "Hair Ritual"}`;
    const description = `Your appointment with ${selectedStaff?.name || "Master Stylist"} at Atelier Élan. Ref: ${confirmedBooking.bookingNumber}`;
    const location = INITIAL_SETTINGS.address;

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Atelier Elan//Booking System//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `atelier-elan-appointment-${confirmedBooking.bookingNumber}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getWhatsAppConfirmationLink = () => {
    if (!confirmedBooking) return "#";
    const msg = encodeURIComponent(
      `Hello Atelier Élan Concierge, my appointment ref is ${confirmedBooking.bookingNumber} for ${selectedService?.name} on ${selectedDate} at ${selectedTime} with ${selectedStaff?.name || "Master Stylist"}. Looking forward to my session!`
    );
    return `https://wa.me/919820048192?text=${msg}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#141312]/80 backdrop-blur-md animate-fadeIn">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#FBF9F5] text-[#141312] rounded-3xl shadow-2xl overflow-hidden border border-[rgba(20,19,18,0.1)] flex flex-col max-h-[90vh]"
      >
        {/* Header Bar */}
        <div className="px-6 sm:px-8 py-5 border-b border-[rgba(20,19,18,0.08)] flex items-center justify-between bg-[#F5F2EA]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#A75D46]" />
            <div>
              <span className="editorial-label text-[9px] text-[#A75D46] block">
                STEP 0{step} OF 06
              </span>
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-light uppercase tracking-tight text-[#141312]">
                {step === 1 && "Select Service Discipline"}
                {step === 2 && "Select Master Artist"}
                {step === 3 && "Select Appointment Date"}
                {step === 4 && "Select Time Slot"}
                {step === 5 && "Your Contact Details"}
                {step === 6 && "Appointment Confirmed"}
              </h3>
            </div>
          </div>

          <button
            onClick={() => bookingEmitter.close()}
            className="w-9 h-9 rounded-full bg-[#EBE6DC] flex items-center justify-center text-[#141312] hover:bg-[#141312] hover:text-[#FBF9F5] transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Content Area (Scrollable) */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {/* STEP 1: SERVICE SELECTION */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-xs text-[#6B6661] font-light mb-4">
                Choose the primary ritual you wish to reserve:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((srv) => {
                  const isSelected = selectedService?.id === srv.id;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedService(srv)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? "border-[#A75D46] bg-[#EBE6DC]/70 shadow-sm"
                          : "border-[rgba(20,19,18,0.08)] bg-[#F5F2EA] hover:border-[#141312]"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="editorial-label text-[8px] text-[#A75D46] block">
                            {srv.category}
                          </span>
                          <h4 className="font-serif-luxury text-lg font-light uppercase text-[#141312]">
                            {srv.name}
                          </h4>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#A75D46] flex items-center justify-center text-[#FBF9F5]">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs text-[#6B6661] pt-3 border-t border-[rgba(20,19,18,0.06)]">
                        <span>{srv.duration} MINS</span>
                        <span className="font-serif-luxury text-base text-[#141312] font-medium">
                          ₹{srv.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: STYLIST SELECTION */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-xs text-[#6B6661] font-light mb-4">
                Select your preferred master artist or choose First Available:
              </p>

              {/* First Available Stylist Pill */}
              <div
                onClick={() => setSelectedStaff(null)}
                className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between mb-4 ${
                  selectedStaff === null
                    ? "border-[#A75D46] bg-[#EBE6DC]/70"
                    : "border-[rgba(20,19,18,0.08)] bg-[#F5F2EA] hover:border-[#141312]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#141312] text-[#FBF9F5] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#A75D46]" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury text-lg font-light uppercase">
                      FIRST AVAILABLE MASTER ARTIST
                    </h4>
                    <p className="text-[11px] text-[#6B6661]">
                      Optimized for earliest schedule availability
                    </p>
                  </div>
                </div>
                {selectedStaff === null && (
                  <div className="w-5 h-5 rounded-full bg-[#A75D46] flex items-center justify-center text-[#FBF9F5]">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>

              {/* Specific Staff Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {staffList.map((stf) => {
                  const isSelected = selectedStaff?.id === stf.id;
                  return (
                    <div
                      key={stf.id}
                      onClick={() => setSelectedStaff(stf)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${
                        isSelected
                          ? "border-[#A75D46] bg-[#EBE6DC]/70 shadow-sm"
                          : "border-[rgba(20,19,18,0.08)] bg-[#F5F2EA] hover:border-[#141312]"
                      }`}
                    >
                      <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-[#241D1A]">
                        <Image
                          src={stf.imageUrl}
                          alt={stf.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <span className="editorial-label text-[8px] text-[#A75D46] block">
                          {stf.experience}
                        </span>
                        <h4 className="font-serif-luxury text-base font-light uppercase text-[#141312]">
                          {stf.name}
                        </h4>
                        <p className="text-[10px] text-[#6B6661] line-clamp-1">
                          {stf.role}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#A75D46] flex items-center justify-center text-[#FBF9F5]">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: DATE SELECTION */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-xs text-[#6B6661] font-light mb-4">
                Select your preferred appointment date (Mondays reserved for private studio training):
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {getAvailableDates().map((d) => {
                  const isSelected = selectedDate === d.dateString;
                  return (
                    <button
                      key={d.dateString}
                      onClick={() => setSelectedDate(d.dateString)}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                        isSelected
                          ? "border-[#A75D46] bg-[#141312] text-[#FBF9F5] shadow-md"
                          : "border-[rgba(20,19,18,0.08)] bg-[#F5F2EA] hover:border-[#141312] text-[#141312]"
                      }`}
                    >
                      <span className="text-[9px] uppercase tracking-wider font-semibold opacity-70">
                        {d.dayName}
                      </span>
                      <span className="font-serif-luxury text-2xl font-light my-0.5">
                        {d.dayNum}
                      </span>
                      <span className="text-[8px] uppercase tracking-widest opacity-60">
                        {d.monthName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: TIME SLOT SELECTION */}
          {step === 4 && (
            <div className="space-y-4">
              <p className="text-xs text-[#6B6661] font-light mb-4">
                Available slots for {selectedDate}:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`p-4 rounded-xl border flex items-center justify-center font-serif-luxury text-lg tracking-wide transition-all ${
                        isSelected
                          ? "border-[#A75D46] bg-[#141312] text-[#FBF9F5] shadow-md"
                          : "border-[rgba(20,19,18,0.08)] bg-[#F5F2EA] hover:border-[#141312] text-[#141312]"
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 mr-2 opacity-60" />
                      <span>{slot}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: CLIENT DETAILS */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="bg-[#EBE6DC] p-4 rounded-xl border border-[rgba(20,19,18,0.08)] flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <span className="text-[#6B6661] block">RITUAL:</span>
                  <span className="font-medium text-[#141312]">
                    {selectedService?.name} (₹{selectedService?.price.toLocaleString("en-IN")})
                  </span>
                </div>
                <div>
                  <span className="text-[#6B6661] block">ARTIST:</span>
                  <span className="font-medium text-[#141312]">
                    {selectedStaff?.name || "First Available Artist"}
                  </span>
                </div>
                <div>
                  <span className="text-[#6B6661] block">SCHEDULE:</span>
                  <span className="font-medium text-[#141312]">
                    {selectedDate} at {selectedTime}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="editorial-label text-[9px] text-[#6B6661] block mb-1.5">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerDetails.name}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g. Radhika Singhania"
                    className="w-full bg-[#F5F2EA] border border-[rgba(20,19,18,0.12)] rounded-xl px-4 py-3 text-xs text-[#141312] focus:outline-none focus:border-[#A75D46]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="editorial-label text-[9px] text-[#6B6661] block mb-1.5">
                      PHONE NUMBER *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerDetails.phone}
                      onChange={(e) =>
                        setCustomerDetails({
                          ...customerDetails,
                          phone: e.target.value,
                        })
                      }
                      placeholder="+91 98000 00000"
                      className="w-full bg-[#F5F2EA] border border-[rgba(20,19,18,0.12)] rounded-xl px-4 py-3 text-xs text-[#141312] focus:outline-none focus:border-[#A75D46]"
                    />
                  </div>

                  <div>
                    <label className="editorial-label text-[9px] text-[#6B6661] block mb-1.5">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      value={customerDetails.email}
                      onChange={(e) =>
                        setCustomerDetails({
                          ...customerDetails,
                          email: e.target.value,
                        })
                      }
                      placeholder="radhika@example.com"
                      className="w-full bg-[#F5F2EA] border border-[rgba(20,19,18,0.12)] rounded-xl px-4 py-3 text-xs text-[#141312] focus:outline-none focus:border-[#A75D46]"
                    />
                  </div>
                </div>

                <div>
                  <label className="editorial-label text-[9px] text-[#6B6661] block mb-1.5">
                    SPECIFIC HAIR NOTES / REQUESTS
                  </label>
                  <textarea
                    rows={2}
                    value={customerDetails.notes}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        notes: e.target.value,
                      })
                    }
                    placeholder="Mention current hair length, scalp sensitivities, or previous color treatments..."
                    className="w-full bg-[#F5F2EA] border border-[rgba(20,19,18,0.12)] rounded-xl px-4 py-3 text-xs text-[#141312] focus:outline-none focus:border-[#A75D46] resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: CONFIRMATION */}
          {step === 6 && confirmedBooking && (
            <div className="py-6 text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#A75D46]/10 text-[#A75D46] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="editorial-label text-[9px] text-[#A75D46] block mb-1">
                  BOOKING REFERENCE: {confirmedBooking.bookingNumber}
                </span>
                <h3 className="font-serif-luxury text-4xl sm:text-5xl font-light uppercase text-[#141312]">
                  YOUR APPOINTMENT
                  <br />
                  <span className="italic font-normal text-[#241D1A]">
                    IS CONFIRMED.
                  </span>
                </h3>
              </div>

              <div className="bg-[#F5F2EA] p-6 rounded-2xl border border-[rgba(20,19,18,0.08)] max-w-lg mx-auto text-left space-y-3 text-xs">
                <div className="flex justify-between border-b border-[rgba(20,19,18,0.06)] pb-2">
                  <span className="text-[#6B6661]">CLIENT:</span>
                  <span className="font-medium text-[#141312]">
                    {confirmedBooking.customerName}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[rgba(20,19,18,0.06)] pb-2">
                  <span className="text-[#6B6661]">RITUAL:</span>
                  <span className="font-medium text-[#141312]">
                    {selectedService?.name}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[rgba(20,19,18,0.06)] pb-2">
                  <span className="text-[#6B6661]">ARTIST:</span>
                  <span className="font-medium text-[#141312]">
                    {selectedStaff?.name || "Master Artist"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[rgba(20,19,18,0.06)] pb-2">
                  <span className="text-[#6B6661]">DATE & TIME:</span>
                  <span className="font-medium text-[#141312]">
                    {confirmedBooking.date} at {confirmedBooking.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#6B6661]">LOCATION:</span>
                  <span className="font-medium text-[#141312] text-right">
                    14, Alipore Heritage Enclave, Mumbai
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto">
                <button
                  onClick={downloadCalendarFile}
                  className="btn-luxury-dark w-full sm:w-auto text-[10px] py-3 px-6 tracking-[0.2em]"
                >
                  <Download className="w-3.5 h-3.5 mr-2" />
                  <span>ADD TO CALENDAR</span>
                </button>

                <a
                  href={getWhatsAppConfirmationLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury-outline w-full sm:w-auto text-[10px] py-3 px-6 tracking-[0.2em] flex items-center justify-center"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-2 text-[#A75D46]" />
                  <span>WHATSAPP CONCIERGE</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        {step < 6 && (
          <div className="px-6 sm:px-8 py-4 border-t border-[rgba(20,19,18,0.08)] bg-[#F5F2EA] flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="inline-flex items-center text-xs uppercase tracking-wider text-[#6B6661] hover:text-[#141312] font-semibold"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                <span>BACK</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className="btn-luxury-dark text-[11px] py-2.5 px-7 tracking-[0.2em]"
            >
              {isSubmitting ? (
                "CONFIRMING..."
              ) : step === 5 ? (
                "CONFIRM APPOINTMENT"
              ) : (
                <>
                  <span>CONTINUE</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
