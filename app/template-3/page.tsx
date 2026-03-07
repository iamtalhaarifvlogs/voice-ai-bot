"use client";

import { useState } from "react";
import ChatUI from "@/app/components/ChatUI";

export default function TemplateThree() {
  const [aiActive, setAiActive] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 font-mono">
      <h1 className="text-5xl mb-8 tracking-widest animate-pulse">EMBER HUD</h1>

      {/* HUD Orb */}
      <div className="relative w-96 h-96 mb-6 flex items-center justify-center">
        <div
          className={`absolute w-full h-full rounded-full border-2 border-green-400 ${
            aiActive ? "animate-spin-slow" : "animate-spin-slower"
          }`}
        ></div>
        <div
          className={`absolute w-64 h-64 rounded-full border-4 border-green-400 ${
            aiActive ? "animate-spin-slower" : ""
          }`}
        ></div>
        <div
          className={`absolute w-32 h-32 rounded-full bg-green-400 opacity-30 ${
            aiActive ? "animate-pulse" : ""
          }`}
        ></div>
      </div>

      <div className="w-full max-w-2xl p-4 bg-black/60 rounded-xl shadow-lg">
        <ChatUI onLoadingChange={setAiActive} />
      </div>

      <p className="text-green-300 mt-4 text-sm text-center">
        Dual-mode AI: Local Bot or Grok API
      </p>
    </main>
  );
}