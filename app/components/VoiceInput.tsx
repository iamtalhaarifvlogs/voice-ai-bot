"use client";

interface VoiceInputProps {
  onResult: (transcript: string) => void;
}

export default function VoiceInput({ onResult }: VoiceInputProps) {

  const handleVoice = () => {

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = true;          // IMPORTANT
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      alert("🎤 Listening...");
    };

    recognition.onresult = (event: any) => {

      const results = event.results;
      const last = results.length - 1;

      if (!results[last] || !results[last][0]) {
        alert("No speech detected in results.");
        return;
      }

      const transcript = results[last][0].transcript;

      alert("Voice detected: " + transcript);

      recognition.stop(); // stop after getting result

      onResult(transcript);
    };

    recognition.onerror = (event: any) => {
      alert("Speech recognition error: " + event.error);
    };

    recognition.onend = () => {
      alert("Speech recognition ended");
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