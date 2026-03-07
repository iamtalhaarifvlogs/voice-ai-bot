"use client";

interface OrbProps {
  active: boolean;
}

export default function Orb({ active }: OrbProps) {
  return (
    <div className="relative w-80 h-80">
      <div
        className={`absolute w-full h-full rounded-full bg-blue-500 opacity-30 ${
          active ? "animate-ping" : ""
        }`}
      ></div>
      <div className="absolute w-full h-full rounded-full border-2 border-blue-400 animate-spin-slow"></div>
      <div
        className={`absolute w-32 h-32 rounded-full bg-blue-400 opacity-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          active ? "animate-pulse" : ""
        }`}
      ></div>
    </div>
  );
}