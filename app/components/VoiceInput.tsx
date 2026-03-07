"use client";

import { useState } from "react";

interface Props {
  onTranscript: (text: string) => void;
}

export default function VoiceInput({ onTranscript }: Props) {
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    setListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
  };

  return (
    <button
      onClick={startListening}
      className="px-4 py-2 bg-black text-white rounded mt-2"
    >
      {listening ? "Listening..." : "🎤 Speak"}
    </button>
  );
}