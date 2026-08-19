"use client";

export default function CanvasDepth() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-30 select-none"
      aria-hidden="true"
    >
      {/* Subtle Warm Ambient Glow Orbs (Pure CSS hardware-accelerated, zero JS CPU/GPU overhead) */}
      <div className="absolute top-[10%] left-[15%] w-[450px] h-[450px] rounded-full bg-[#A75D46]/8 blur-[120px] will-change-transform" />
      <div className="absolute top-[60%] right-[10%] w-[550px] h-[550px] rounded-full bg-[#241D1A]/25 blur-[140px] will-change-transform" />
      <div className="absolute top-[35%] right-[25%] w-[350px] h-[350px] rounded-full bg-[#A75D46]/5 blur-[100px] will-change-transform" />
    </div>
  );
}
