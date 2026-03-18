"use client";

import { useState } from "react";
import ChatUI from "@/app/components/ChatUI";

export default function TemplateTwo() {
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-gray-50">
      
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">
        Ember Assistant
      </h1>

      {/* Chat Container */}
      <div className="w-full max-w-md sm:max-w-xl bg-white shadow-lg rounded-xl p-4 sm:p-6 flex flex-col gap-4">
        <ChatUI onLoadingChange={setLoading} />
      </div>

      {/* Footer Text */}
      <p className="text-gray-500 mt-4 text-xs sm:text-sm text-center max-w-sm">
        Dual-mode AI: Local Bot or Grok API
      </p>
    </main>
  );
}