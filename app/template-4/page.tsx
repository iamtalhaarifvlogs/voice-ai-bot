"use client";

import { useState } from "react";
import ChatUI from "@/app/components/ChatUI";

export default function TemplateFour() {
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-black text-green-400 font-mono flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 text-center">
        Ember Console
      </h1>

      {/* Console */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl bg-black shadow-inner p-3 sm:p-4 md:p-6 border border-green-600 rounded flex flex-col gap-4 overflow-y-auto max-h-[60vh] sm:max-h-[65vh]">
        <ChatUI onLoadingChange={setLoading} />
      </div>

      {/* Footer */}
      <p className="text-green-300 mt-4 text-xs sm:text-sm text-center max-w-sm">
        Dual-mode AI: Local Bot or Grok API
      </p>
    </main>
  );
}