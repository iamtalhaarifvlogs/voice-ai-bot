// components/VoiceInput.tsx
"use client";

interface VoiceInputProps {
  onResult: (transcript: string) => void;
}

export default function VoiceInput({ onResult }: VoiceInputProps) {
  const handleVoice = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition!");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };
    recognition.start();
  };

  return (
    <button
      onClick={handleVoice}
      className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700"
    >
      🎤
    </button>
  );
}