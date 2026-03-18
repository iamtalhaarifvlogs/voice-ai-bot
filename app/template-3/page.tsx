"use client";

import { useState } from "react";
import ChatUI from "@/app/components/ChatUI";

export default function TemplateThree() {
  const [aiActive, setAiActive] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 bg-black text-green-400 font-mono overflow-hidden">
      
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-5xl mb-6 sm:mb-8 tracking-widest text-center animate-pulse">
        EMBER HUD
      </h1>

      {/* HUD Orb */}
      <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 mb-6 flex items-center justify-center">
        
        {/* Outer Ring */}
        <div
          className={`absolute w-full h-full rounded-full border border-green-400 sm:border-2 ${
            aiActive ? "animate-spin-slow" : "animate-spin-slower"
          }`}
        />

        {/* Middle Ring */}
        <div
          className={`absolute w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full border-2 sm:border-4 border-green-400 ${
            aiActive ? "animate-spin-slower" : ""
          }`}
        />

        {/* Inner Core */}
        <div
          className={`absolute w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-green-400 opacity-30 ${
            aiActive ? "animate-pulse" : ""
          }`}
        />
      </div>

      {/* Chat Container */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl p-3 sm:p-4 bg-black/60 backdrop-blur-md rounded-xl shadow-lg">
        <ChatUI onLoadingChange={setAiActive} />
      </div>

      {/* Footer */}
      <p className="text-green-300 mt-4 text-xs sm:text-sm text-center max-w-sm">
        Dual-mode AI: Local Bot or Grok API
      </p>
    </main>
  );
}