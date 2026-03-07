"use client";

import { useState } from "react";
import ChatUI from "@/app/components/ChatUI";

export default function TemplateFive() {
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      {/* Floating widget */}
      <div className="fixed bottom-8 right-8 w-80 bg-white shadow-xl rounded-xl p-4">
        <h2 className="text-xl font-bold mb-2">Ember Support</h2>
        <ChatUI onLoadingChange={setLoading} />
        {loading && (
          <div className="flex gap-1 mt-2 h-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-1 bg-green-400 rounded transition-all duration-150 h-${
                  [2, 4, 6, 8, 10][i]
                }`}
              ></div>
            ))}
          </div>
        )}
      </div>

      <div className="text-gray-500 text-center">
        <p className="mb-2">
          Example page content. Ember floats above as your AI assistant.
        </p>
        <p className="text-sm">Users can choose Local Bot or Grok API.</p>
      </div>
    </main>
  );
}