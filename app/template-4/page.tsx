"use client";

import { useState } from "react";
import ChatUI from "@/app/components/ChatUI";

export default function TemplateFour() {
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-black text-green-400 font-mono flex flex-col items-center justify-start p-10">
      <h1 className="text-4xl mb-6">Ember Console</h1>

      <div className="w-full max-w-2xl bg-black shadow-inner p-6 border border-green-600 rounded flex flex-col gap-4 overflow-y-auto max-h-[500px]">
        <ChatUI onLoadingChange={setLoading} />
      </div>

      <p className="text-green-300 mt-4 text-sm text-center">
        Dual-mode AI: Local Bot or Grok API
      </p>
    </main>
  );
}