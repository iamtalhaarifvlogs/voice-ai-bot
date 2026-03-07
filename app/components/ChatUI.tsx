// components/ChatUI.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Message } from "@/app/types/chat";
import { getBotReply } from "./localBot";
import VoiceInput from "./VoiceInput";
import VoicePlayer from "./VoicePlayer";
import MessageBubble from "./MessageBubble";

interface ChatUIProps {
  useGrok?: boolean;
  grokApiKey?: string;
  onLoadingChange?: (loading: boolean) => void; // optional
}

export default function ChatUI({
  useGrok = false,
  grokApiKey,
  onLoadingChange,
}: ChatUIProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (onLoadingChange) onLoadingChange(loading);
  }, [loading, onLoadingChange]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    let reply: string = "";

    try {
      if (useGrok && grokApiKey) {
        reply = await fetchGrokResponse(text, grokApiKey);
      } else {
        reply = getBotReply(text);
      }

      setMessages((prev) => [...prev, { role: "ai", content: reply }]);
      VoicePlayer(reply);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Oops! Something went wrong. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col h-full p-4 bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-xl">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} content={m.content} />
        ))}
        <div ref={scrollRef}></div>
      </div>

      {/* Input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
          className="flex-1 p-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
          disabled={loading}
        />
        <button
          onClick={() => handleSend(input)}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          Send
        </button>
        <VoiceInput
          onResult={(transcript: string) => {
            setInput(transcript);
            handleSend(transcript);
          }}
        />
      </div>

      {loading && (
        <p className="text-gray-400 mt-2 animate-pulse">Ember is thinking...</p>
      )}
    </div>
  );
}

// Helper function for Grok
async function fetchGrokResponse(prompt: string, apiKey: string) {
  const res = await fetch("/api/route", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) throw new Error("Grok API error");

  const data = await res.json();
  return data.reply || "Hmm, I didn't get that.";
}