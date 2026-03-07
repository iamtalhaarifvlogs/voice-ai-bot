// components/VoicePlayer.ts
export default function VoicePlayer(text: string) {
  if (!text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}