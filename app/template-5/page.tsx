"use client";

import { useState } from "react";
import ChatUI from "@/app/components/ChatUI";

export default function TemplateFive() {
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 py-8 relative">
      
      {/* Floating widget */}
      <div className="
        fixed 
        bottom-4 right-4 
        sm:bottom-6 sm:right-6 
        w-[90%] max-w-sm 
        sm:w-80 
        bg-white shadow-xl rounded-xl 
        p-3 sm:p-4 
        z-50
      ">
        <h2 className="text-base sm:text-lg font-bold mb-2">
          Ember Support
        </h2>

        {/* Chat */}
        <div className="max-h-[50vh] sm:max-h-[60vh] overflow-y-auto">
          <ChatUI onLoadingChange={setLoading} />
        </div>

        {/* Loading bars */}
        {loading && (
          <div className="flex gap-1 mt-2 h-4 items-end">
            {[2, 4, 6, 8, 10].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h * 4}px` }}
                className="w-1 bg-green-400 rounded transition-all duration-150"
              />
            ))}
          </div>
        )}
      </div>

      {/* Background content */}
      <div className="text-gray-500 text-center max-w-md">
        <p className="mb-2 text-sm sm:text-base">
          Example page content. Ember floats above as your AI assistant.
        </p>
        <p className="text-xs sm:text-sm">
          Users can choose Local Bot or Grok API.
        </p>
      </div>
    </main>
  );
}