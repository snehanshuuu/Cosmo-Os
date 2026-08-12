import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWidgetStore } from '../../stores/widgetStore';
import { useNotificationStore } from '../../stores/notificationStore';
import * as Icons from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'car' | 'user';
  text: string;
}

type AvatarMoodState = 'idle' | 'thinking' | 'chatting' | 'happy';

export const CyberCatCompanion: React.FC = () => {
  const { resetDashboardLayout } = useWidgetStore();
  const { push: pushNotification } = useNotificationStore();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [showSpeech, setShowSpeech] = useState(true);
  const [tipIndex, setTipIndex] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [avatarState, setAvatarState] = useState<AvatarMoodState>('idle');

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Rotating tips, greetings, and system status messages
  const contextualTips = [
    "C.A.R. Status: All cores nominal. Ask me anything!",
    "Tip: Press Cmd + K to open Command Search!",
    "Tip: Drag widget headers (:::) to position.",
    "Greeting: Welcome! How can C.A.R. assist today?",
    "Tip: Customize Wallpapers in Preferences.",
    "Status: RAM 68% • Network 142.4 Mbps.",
  ];

  const [chatLog, setChatLog] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'car',
      text: "Hello! I am C.A.R. (Cybernetic Assistant Companion). Click & ask me anything!",
    },
  ]);

  // Rotate tips every 10 seconds in compact speech bubble
  useEffect(() => {
    const timer = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % contextualTips.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [contextualTips.length]);

  // Auto-scroll chat log and auto-focus input when expanded
  useEffect(() => {
    if (isExpanded) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isExpanded, chatLog, isThinking]);

  const currentTip = contextualTips[tipIndex];

  const handleCatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBouncing(true);
    setIsExpanded((prev) => !prev);
    setShowSpeech(true);
    setAvatarState('happy');
    setTimeout(() => {
      setIsBouncing(false);
      setAvatarState('idle');
    }, 1000);
  };

  // Comprehensive C.A.R. Intelligent AI Response Engine
  const generateCARAnswer = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('help') || q.includes('command') || q.includes('shortcut')) {
      return "Shortcuts: Cmd+K (Search), Cmd+W (Close), Cmd+M (Minimize), Cmd+~ (Switch). Commands: status, reset layout, time.";
    }

    if (q.includes('status') || q.includes('cpu') || q.includes('ram') || q.includes('system') || q.includes('battery')) {
      return "Telemetry: CPU 24% | RAM 68% | Battery 98% | Network 142.4 Mbps.";
    }

    if (q.includes('reset') || q.includes('layout')) {
      resetDashboardLayout();
      pushNotification({
        title: 'Layout Reset',
        message: 'Default desktop grid restored.',
        type: 'info',
        duration: 3000,
      });
      return "Restored default desktop layout! 🐾";
    }

    if (q.includes('time') || q.includes('clock') || q.includes('date')) {
      return `Time: ${new Date().toLocaleTimeString()} ⏰`;
    }

    if (q.includes('weather') || q.includes('temp')) {
      return "Cyber City: 72°F · Clear ☀️ (See Global Clock for details).";
    }

    if (q.includes('who are you') || q.includes('car') || q.includes('name')) {
      return "I am C.A.R. — your Cybernetic Assistant Companion on Cosmos OS! 🐱⚡";
    }

    if (q.includes('cosmos') || q.includes('os')) {
      return "Cosmos OS: Cybernetic OS with floating glass widgets and 3D background!";
    }

    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return "Hello Commander! C.A.R. is ready to assist. ☕✨";
    }

    if (q.match(/^[\d\s\+\-\*\/\(\)\.]+$/)) {
      try {
        const result = new Function(`return (${query})`)();
        return `Result: ${query} = ${result}`;
      } catch (err) {
        return "Invalid math expression.";
      }
    }

    return `Query '${query}' logged. All system channels operating normally!`;
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputVal.trim();
    if (!query || isThinking) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
    };

    setChatLog((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsThinking(true);
    setAvatarState('thinking');

    setTimeout(() => {
      const botReply = generateCARAnswer(query);

      setChatLog((prev) => [
        ...prev,
        {
          id: `car-${Date.now()}`,
          sender: 'car',
          text: botReply,
        },
      ]);

      setIsThinking(false);
      setAvatarState('chatting');
      setTimeout(() => setAvatarState('idle'), 2500);
    }, 800);
  };

  return (
    <div className="fixed bottom-2.5 left-2.5 z-30 flex flex-col items-start select-none group">
      {/* Expanded Ultra-Compact C.A.R. Chat Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="mb-2 w-56 h-52 rounded-lg bg-black/90 border border-cosmos-lime/60 p-2 flex flex-col justify-between shadow-[0_0_20px_rgba(124,255,0,0.3)] backdrop-blur-xl relative pointer-events-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/10 pb-1">
              <div className="flex items-center gap-1 font-bold text-[10px] text-white uppercase tracking-wider">
                <Icons.Sparkles className="w-3 h-3 text-cosmos-lime animate-pulse" />
                <span className="text-cosmos-lime-bright font-mono text-[9px]">C.A.R. :: CYBER AI</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-white/40 hover:text-white transition-colors p-0.5"
                title="Close Chat"
              >
                <Icons.X className="w-3 h-3" />
              </button>
            </div>

            {/* Chat Message Stream */}
            <div className="flex-1 overflow-y-auto my-1 flex flex-col gap-1 p-0.5 font-mono text-[10px] scrollbar-thin">
              {chatLog.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[90%] p-1.5 rounded text-[9px] leading-tight ${
                      msg.sender === 'user'
                        ? 'bg-cosmos-lime text-black font-semibold'
                        : 'bg-white/10 border border-white/15 text-white'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing State Indicator */}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-white/10 border border-cosmos-lime/40 text-cosmos-lime-bright px-2 py-0.5 rounded text-[9px] font-mono flex items-center gap-1 animate-pulse">
                    <span>Thinking...</span>
                    <span className="w-1 h-1 rounded-full bg-cosmos-lime animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Prompt Input Form */}
            <form onSubmit={handleSend} className="flex gap-1 pt-1 border-t border-white/10">
              <div className="flex-1 flex items-center bg-black/70 border border-white/15 rounded px-1.5 py-0.5 text-[9px] font-mono text-white focus-within:border-cosmos-lime">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask C.A.R..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  disabled={isThinking}
                  className="w-full bg-transparent text-[9px] font-mono text-white focus:outline-none placeholder:text-white/30"
                />
              </div>
              <button
                type="submit"
                disabled={isThinking || !inputVal.trim()}
                className="px-2 py-0.5 bg-cosmos-lime text-black font-bold text-[9px] rounded hover:bg-cosmos-lime-bright disabled:opacity-40 transition-all flex items-center justify-center shadow-lime-glow"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact Rotating Speech Bubble (Shown when not expanded) */}
      <AnimatePresence>
        {!isExpanded && showSpeech && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(true);
            }}
            className="mb-1 max-w-[170px] p-1.5 rounded-lg bg-black/85 border border-cosmos-lime/50 text-cosmos-lime-bright text-[9px] font-mono shadow-[0_0_10px_rgba(124,255,0,0.2)] backdrop-blur-md relative cursor-pointer pointer-events-auto"
          >
            <div className="flex items-center justify-between gap-1 font-bold mb-0.5 text-white border-b border-white/10 pb-0.5">
              <div className="flex items-center gap-1">
                <Icons.Sparkles className="w-2.5 h-2.5 text-cosmos-lime" />
                <span className="font-mono text-cosmos-lime-bright text-[8px]">C.A.R. AI</span>
              </div>
              <button
                onClick={(ev) => {
                  ev.stopPropagation();
                  setShowSpeech(false);
                }}
                className="text-white/40 hover:text-white p-0.5"
              >
                <Icons.X className="w-2.5 h-2.5" />
              </button>
            </div>
            <p className="text-[9px] text-white/90 leading-tight">{currentTip}</p>

            {/* Speech Bubble Pointer Arrow */}
            <div className="absolute -bottom-1 left-3 w-2 h-2 bg-black/85 border-b border-r border-cosmos-lime/50 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* C.A.R. Ultra-Compact Cyber Cat Avatar Icon (28px x 28px) */}
      <motion.div
        onClick={handleCatClick}
        animate={isBouncing ? { y: [0, -6, 0] } : { y: [0, -2, 0] }}
        transition={
          isBouncing
            ? { duration: 0.3, ease: 'easeOut' }
            : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
        className={`w-7 h-7 rounded-lg bg-black/90 border p-0.5 flex items-center justify-center relative transition-all cursor-pointer shadow-md pointer-events-auto ${
          avatarState === 'thinking'
            ? 'border-amber-400 shadow-[0_0_15px_rgba(255,193,7,0.6)]'
            : avatarState === 'chatting'
            ? 'border-cosmos-lime shadow-[0_0_15px_rgba(124,255,0,0.6)]'
            : avatarState === 'happy'
            ? 'border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.6)]'
            : 'border-cosmos-lime/70 shadow-[0_0_10px_rgba(124,255,0,0.3)] group-hover:border-cosmos-lime group-hover:shadow-[0_0_15px_rgba(124,255,0,0.5)]'
        }`}
        title="Click to chat with C.A.R. AI"
      >
        {/* Dynamic SVG Cyber Cat Avatar */}
        <svg viewBox="0 0 64 64" className="w-full h-full text-cosmos-lime fill-none stroke-current stroke-[2.5]">
          <polygon
            points="12,24 20,8 28,20"
            fill={avatarState === 'thinking' ? 'rgba(255,193,7,0.3)' : 'rgba(124,255,0,0.2)'}
          />
          <polygon
            points="52,24 44,8 36,20"
            fill={avatarState === 'thinking' ? 'rgba(255,193,7,0.3)' : 'rgba(124,255,0,0.2)'}
          />
          <rect x="14" y="20" width="36" height="32" rx="12" fill="rgba(0,0,0,0.9)" />
          {avatarState === 'thinking' ? (
            <>
              <circle cx="24" cy="32" r="4" fill="#FFC107" className="animate-ping" />
              <circle cx="40" cy="32" r="4" fill="#FFC107" className="animate-ping" />
            </>
          ) : avatarState === 'chatting' ? (
            <>
              <circle cx="24" cy="32" r="3.5" fill="#7CFF00" />
              <circle cx="40" cy="32" r="3.5" fill="#7CFF00" />
              <path d="M 27,39 Q 32,44 37,39" fill="none" stroke="#7CFF00" strokeWidth="2" strokeLinecap="round" />
            </>
          ) : avatarState === 'happy' ? (
            <>
              <circle cx="24" cy="32" r="3.5" fill="#00F0FF" />
              <circle cx="40" cy="32" r="3.5" fill="#FF2D55" />
              <path d="M 26,38 Q 32,45 38,38" fill="none" stroke="#00F0FF" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="24" cy="32" r="3.5" fill="#00F0FF" className="animate-pulse" />
              <circle cx="40" cy="32" r="3.5" fill="#00F0FF" className="animate-pulse" />
              <polygon points="32,38 29,35 35,35" fill="#7CFF00" />
            </>
          )}
          <path d="M 10,34 L 20,35 M 10,40 L 20,38" stroke="#7CFF00" strokeWidth="1.5" />
          <path d="M 54,34 L 44,35 M 54,40 L 44,38" stroke="#7CFF00" strokeWidth="1.5" />
        </svg>

        {/* Pulse Status Indicator Dot */}
        <span
          className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full animate-pulse ${
            avatarState === 'thinking'
              ? 'bg-amber-400 shadow-[0_0_4px_#FFC107]'
              : avatarState === 'happy'
              ? 'bg-cyan-400 shadow-[0_0_4px_#00F0FF]'
              : 'bg-cosmos-lime shadow-lime-glow'
          }`}
        />
      </motion.div>
    </div>
  );
};
