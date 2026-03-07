"use client";

import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { Message } from "@/app/types/chat";
import MessageBubble from "./MessageBubble";
import VoiceInput from "./VoiceInput";
import { speak } from "./VoicePlayer";

interface ChatUIProps {
  onLoadingChange?: Dispatch<SetStateAction<boolean>>; // <-- Add this
}

export default function ChatUI({ onLoadingChange }: ChatUIProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"local" | "grok">("local");
  const [streamingText, setStreamingText] = useState("");
  const abortController = useRef<AbortController | null>(null);

  useEffect(() => {
    if (onLoadingChange) onLoadingChange(loading); // notify parent
  }, [loading, onLoadingChange]);

  const sendMessage = async (text: string) => {
    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setStreamingText("");

    try {
      if (mode === "grok") {
        abortController.current = new AbortController();
        const res = await fetch("/api/ai", {
          method: "POST",
          body: JSON.stringify({ message: text, mode }),
          signal: abortController.current.signal,
        });

        const data = await res.json();

        let charIndex = 0;
        const interval = setInterval(() => {
          setStreamingText((prev) => prev + (data.reply[charIndex] || ""));
          charIndex++;
          if (charIndex >= data.reply.length) {
            clearInterval(interval);
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: data.reply },
            ]);
            setStreamingText("");
            speak(data.reply);
            setLoading(false);
          }
        }, 25);
      } else {
        const reply = await fetch("/api/ai", {
          method: "POST",
          body: JSON.stringify({ message: text, mode }),
        }).then((r) => r.json());

        setMessages((prev) => [...prev, { role: "assistant", content: reply.reply }]);
        speak(reply.reply);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Mode toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode("local")}
          className={`px-3 py-1 rounded ${
            mode === "local" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Local Bot
        </button>
        <button
          onClick={() => setMode("grok")}
          className={`px-3 py-1 rounded ${
            mode === "grok" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Grok API
        </button>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-2 relative">
        {messages.map((msg, i) => (
          <MessageBubble key={i} {...msg} />
        ))}
        {streamingText && (
          <MessageBubble role="assistant" content={streamingText + "▌"} />
        )}
      </div>

      {loading && <p className="text-gray-500 animate-pulse">AI is thinking...</p>}

      {/* Voice Input */}
      <VoiceInput onTranscript={sendMessage} />
    </div>
  );
}