"use client";

import dynamic from "next/dynamic";

const BookingModal = dynamic(() => import("./BookingModal"), { ssr: false });

export default function BookingModalWrapper() {
  return <BookingModal />;
}
