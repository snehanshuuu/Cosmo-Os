import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

export const CyberCatCompanion: React.FC = () => {
  const [speech, setSpeech] = useState<string>('');
  const [isBouncing, setIsBouncing] = useState(false);
  const [showSpeech, setShowSpeech] = useState(true);

  // Generate smart contextual messages based on system status & time
  const getContextualMessage = () => {
    const hour = new Date().getHours();
    const isNight = hour >= 22 || hour < 6;
    const isMorning = hour >= 6 && hour < 12;

    const messages: string[] = [];

    // Time-based messages
    if (isNight) {
      messages.push("It's getting late... Remember to get some sleep tonight! 🌙✨");
      messages.push("Night time in Cyber City. Rest well, Commander! 🌌");
    } else if (isMorning) {
      messages.push("Good morning! Ready for a productive session on Cosmos OS? ☕☀️");
      messages.push("Fresh start! All systems operational. 🚀");
    } else {
      messages.push("Systems running smooth & green! 🟢");
      messages.push("Everything's optimal in Cyber City today. 🏙️");
    }

    // Weather & System Telemetry messages
    messages.push("Cyber City Weather: 72°F · Clear Cyber Sky ☀️");
    messages.push("CPU Load: 24% (Normal) • All cores cool & quiet ❄️");
    messages.push("Battery Status: 98% (Fully Charged & Ready) 🔋");

    // Random cute cat statements
    messages.push("Purr... Click me anytime to check diagnostic telemetry! 🐾");
    messages.push("Cosmos AI Companion active & listening! 🐱⚡");

    return messages[Math.floor(Math.random() * messages.length)];
  };

  useEffect(() => {
    setSpeech(getContextualMessage());
    // Auto-update speech message every 12 seconds
    const interval = setInterval(() => {
      setSpeech(getContextualMessage());
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBouncing(true);
    setShowSpeech(true);
    setSpeech(getContextualMessage());
    setTimeout(() => setIsBouncing(false), 500);
  };

  return (
    <div
      onClick={handleClick}
      className="fixed bottom-20 left-6 z-30 flex flex-col items-start cursor-pointer select-none group"
      title="Click Cyber Cat Companion for system status!"
    >
      {/* Speech Bubble Box */}
      <AnimatePresence>
        {showSpeech && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-2 max-w-xs p-3 rounded-2xl bg-black/80 border border-cosmos-lime/40 text-cosmos-lime-bright text-xs font-mono shadow-[0_0_15px_rgba(124,255,0,0.2)] backdrop-blur-md relative"
          >
            <div className="flex items-center gap-1.5 font-bold mb-1 text-white border-b border-white/10 pb-1">
              <Icons.Sparkles className="w-3.5 h-3.5 text-cosmos-lime" />
              <span>COSMOS CYBER CAT</span>
            </div>
            <p className="text-[11px] text-white/90 leading-relaxed">{speech}</p>

            {/* Speech Bubble Pointer Arrow */}
            <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-black/80 border-b border-r border-cosmos-lime/40 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cyber Cat Character Icon */}
      <motion.div
        animate={isBouncing ? { y: [0, -12, 0] } : { y: [0, -4, 0] }}
        transition={
          isBouncing
            ? { duration: 0.4, ease: 'easeOut' }
            : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
        className="w-14 h-14 rounded-2xl bg-black/70 border-2 border-cosmos-lime/60 p-2 flex items-center justify-center relative shadow-[0_0_20px_rgba(124,255,0,0.3)] group-hover:border-cosmos-lime group-hover:shadow-[0_0_25px_rgba(124,255,0,0.5)] transition-all"
      >
        {/* Cat SVG Illustration with Glowing Neon Eyes */}
        <svg viewBox="0 0 64 64" className="w-full h-full text-cosmos-lime fill-none stroke-current stroke-[2.5]">
          {/* Ears */}
          <polygon points="12,24 20,8 28,20" fill="rgba(124,255,0,0.2)" />
          <polygon points="52,24 44,8 36,20" fill="rgba(124,255,0,0.2)" />
          {/* Head Outline */}
          <rect x="14" y="20" width="36" height="32" rx="12" fill="rgba(0,0,0,0.8)" />
          {/* Glowing Eyes */}
          <circle cx="24" cy="32" r="3.5" fill="#00F0FF" className="animate-pulse" />
          <circle cx="40" cy="32" r="3.5" fill="#00F0FF" className="animate-pulse" />
          {/* Cute Nose & Whiskers */}
          <polygon points="32,38 29,35 35,35" fill="#7CFF00" />
          <path d="M 10,34 L 20,35 M 10,40 L 20,38" stroke="#7CFF00" strokeWidth="1.5" />
          <path d="M 54,34 L 44,35 M 54,40 L 44,38" stroke="#7CFF00" strokeWidth="1.5" />
        </svg>

        {/* Pulse Status Dot */}
        <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-cosmos-lime shadow-lime-glow animate-pulse" />
      </motion.div>
    </div>
  );
};
