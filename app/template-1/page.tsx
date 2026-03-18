"use client";

import { useState } from "react";
import ChatUI from "@/app/components/ChatUI";

export default function TemplateOne() {
  const [aiActive, setAiActive] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 sm:mb-10 text-center leading-tight">
        🌌 Ember AI
      </h1>

      {/* Orb */}
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mb-6 sm:mb-8">
        
        {/* Outer glowing ring */}
        <div
          className={`absolute w-full h-full rounded-full bg-blue-500 opacity-30 ${
            aiActive ? "animate-ping" : ""
          }`}
        />

        {/* Spinning border */}
        <div className="absolute w-full h-full rounded-full border border-blue-400 sm:border-2 animate-spin-slow" />

        {/* Inner pulsing orb */}
        <div
          className={`absolute w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-blue-400 opacity-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
            aiActive ? "animate-pulse" : ""
          }`}
        />
      </div>

      {/* Chat container */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl p-3 sm:p-4 bg-black/50 backdrop-blur-md rounded-xl shadow-lg">
        <ChatUI onLoadingChange={setAiActive} />
      </div>
    </main>
  );
}