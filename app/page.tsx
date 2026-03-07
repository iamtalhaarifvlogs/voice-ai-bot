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
  const [volume, setVolume] = useState(0); // volume 0-1 for reactive UI
  const router = useRouter();
  const { transcript } = useSpeechRecognition();

  // Voice commands navigation
  useEffect(() => {
    if (!transcript) return;
    const match = templates.find((t) => transcript.toLowerCase().includes(t.name.toLowerCase()));
    if (match) router.push(match.href);
  }, [transcript, router]);

  // Listen to microphone volume for reactive UI
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
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length / 255;
        setVolume(avg);
      };
      loop();
    });
  }, []);

  const handleClick = (id: number, href: string) => {
    setSelected(id);
    setTimeout(() => router.push(href), 400); // allow animation
  };

  return (
    <main
      className={`min-h-screen flex flex-col items-center p-10 overflow-hidden relative`}
      style={{
        background: `radial-gradient(circle at center, rgba(10,10,30,1) ${volume * 30}%, rgba(0,0,0,1) 100%)`,
      }}
    >
      {/* Voice-reactive particles */}
      <VoiceParticles />

      {/* Hero */}
      <div className="text-center mb-16 z-10 relative">
        <h1 className="text-6xl font-extrabold mb-4 animate-pulse">🌌 Ember AI Hub</h1>
        <p className="text-gray-300 text-lg max-w-xl mx-auto">
          Explore templates and interact with Ember. Hover or speak, the UI responds to you.
        </p>
      </div>

      {/* Template Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl z-10 relative">
        {templates.map((t) => (
          <AnimatePresence key={t.id}>
            {!selected || selected === t.id ? (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.7, y: 50 }}
                animate={{
                  opacity: 1,
                  scale:
                    hovered === t.id
                      ? 1.1 + volume * 0.3 // pulse with volume
                      : 1 + volume * 0.1,
                  y: 0,
                }}
                exit={{ opacity: 0, scale: 0.5, y: -50 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                onMouseEnter={() => setHovered(t.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleClick(t.id, t.href)}
                className={`relative p-6 rounded-2xl shadow-lg cursor-pointer bg-gradient-to-br ${t.color}`}
              >
                <h2 className="text-2xl font-bold mb-2">{t.name}</h2>
                <p className="text-gray-200">
                  {hovered === t.id
                    ? "Click to open this premium template and interact with Ember."
                    : "Preview & explore"}
                </p>

                {/* Hover orb */}
                <motion.div
                  className="absolute -top-6 -right-6 w-12 h-12 bg-blue-400 rounded-full opacity-50 pointer-events-none"
                  animate={{
                    scale: hovered === t.id ? 1 + volume : 1,
                    opacity: hovered === t.id ? 0.8 : 0.5,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        ))}
      </div>

      {/* Footer */}
      <p className="mt-16 text-gray-500 text-sm text-center z-10 relative">
        All templates feature dual-mode AI, voice input/output, streaming responses, and reactive futuristic UI. Built by Talha & Ember ❤️
      </p>
    </main>
  );
}