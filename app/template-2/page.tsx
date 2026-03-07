"use client";

import { useState } from "react";
import ChatUI from "@/app/components/ChatUI";

export default function TemplateTwo() {
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-10">
      <h1 className="text-4xl font-bold mb-6">Ember Assistant</h1>

      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4">
        <ChatUI onLoadingChange={setLoading} />
      </div>

      <p className="text-gray-500 mt-4 text-sm text-center">
        Dual-mode AI: Local Bot or Grok API
      </p>
    </main>
  );
}