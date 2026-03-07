"use client";

import { useEffect, useState } from "react";

export function useSpeechRecognition() {
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const current = Array.from(event.results)
        .map((r: any) => r[0].transcript)
        .join("");
      setTranscript(current);
    };

    recognition.start();

    return () => recognition.stop();
  }, []);

  return { transcript };
}