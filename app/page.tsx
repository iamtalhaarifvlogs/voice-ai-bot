"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSpeechRecognition } from "@/app/components/VoiceCommands";
import VoiceParticles from "@/app/components/VoiceParticles";

const templates = [
  { id: 1, name: "Futuristic Orb", href: "/template-1", color: "from-blue-500 to-blue-800" },
  { id: 2, name: "ChatGPT Style", href: "/template-2", color: "from-gray-400 to-gray-600" },
  { id: 3, name: "Jarvis HUD", href: "/template-3", color: "from-green-400 to-green-800" },
  { id: 4, name: "Terminal Console", href: "/template-4", color: "from-black to-gray-900" },
  { id: 5, name: "Floating Widget", href: "/template-5", color: "from-pink-400 to-pink-600" },
];

export default function HomePage() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [volume, setVolume] = useState(0);
  const router = useRouter();
  const { transcript } = useSpeechRecognition();

  // Voice navigation
  useEffect(() => {
    if (!transcript) return;
    const match = templates.find((t) =>
      transcript.toLowerCase().includes(t.name.toLowerCase())
    );
    if (match) router.push(match.href);
  }, [transcript, router]);

  // Mic volume
  useEffect(() => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const loop = () => {
        requestAnimationFrame(loop);
        analyser.getByteFrequencyData(dataArray);
        const avg =
          dataArray.reduce((a, b) => a + b, 0) /
          dataArray.length /
          255;
        setVolume(avg);
      };
      loop();
    });
  }, []);

  const handleClick = (id: number, href: string) => {
    setSelected(id);
    setTimeout(() => router.push(href), 300);
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 lg:px-10 py-8 sm:py-12 overflow-hidden relative"
      style={{
        background: `radial-gradient(circle at center, rgba(10,10,30,1) ${volume * 30}%, rgba(0,0,0,1) 100%)`,
      }}
    >
      {/* Particles */}
      <VoiceParticles />

      {/* Hero */}
      <div className="text-center mb-10 sm:mb-16 z-10 relative">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
          🌌 Ember AI Hub
        </h1>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-md sm:max-w-xl mx-auto">
          Explore templates and interact with Ember. Tap or speak — the UI responds to you.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 w-full max-w-6xl z-10 relative">
        {templates.map((t) => (
          <AnimatePresence key={t.id}>
            {!selected || selected === t.id ? (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{
                  opacity: 1,
                  scale: 1 + volume * 0.05,
                  y: 0,
                }}
                exit={{ opacity: 0, scale: 0.7, y: -30 }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                onClick={() => handleClick(t.id, t.href)}
                className={`relative p-5 sm:p-6 min-h-[140px] sm:min-h-[160px] rounded-2xl shadow-xl cursor-pointer bg-gradient-to-br ${t.color} active:scale-95 transition`}
              >
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                  {t.name}
                </h2>
                <p className="text-gray-200 text-sm sm:text-base">
                  Tap to explore this template
                </p>

                {/* Reactive orb */}
                <motion.div
                  className="absolute -top-4 -right-4 w-10 h-10 sm:w-12 sm:h-12 bg-blue-400 rounded-full opacity-50 pointer-events-none"
                  animate={{
                    scale: 1 + volume,
                    opacity: 0.5 + volume * 0.5,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-10 sm:mt-16 pb-6 text-center z-10 relative">
        <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto">
          All templates feature dual-mode AI, voice input/output, streaming responses, and reactive UI.
        </p>
        <p className="text-gray-600 text-xs mt-2">
          Built by Talha & Ember ❤️
        </p>
      </div>
    </main>
  );
}