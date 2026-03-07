"use client";

import { useState } from "react";
import ChatUI from "@/app/components/ChatUI";

export default function TemplateOne() {
  const [aiActive, setAiActive] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Title */}
      <h1 className="text-5xl font-extrabold mb-10 animate-pulse">🌌 Ember AI</h1>

      {/* Orb */}
      <div className="relative w-80 h-80 mb-6">
        {/* Outer glowing ring */}
        <div
          className={`absolute w-full h-full rounded-full bg-blue-500 opacity-30 ${
            aiActive ? "animate-ping" : ""
          }`}
        ></div>
        {/* Spinning border */}
        <div className="absolute w-full h-full rounded-full border-2 border-blue-400 animate-spin-slow"></div>
        {/* Inner pulsing orb */}
        <div
          className={`absolute w-32 h-32 rounded-full bg-blue-400 opacity-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
            aiActive ? "animate-pulse" : ""
          }`}
        ></div>
      </div>

      {/* Chat container */}
      <div className="w-full max-w-2xl p-4 bg-black/50 rounded-xl shadow-lg">
        <ChatUI onLoadingChange={setAiActive} />
      </div>
    </main>
  );
}