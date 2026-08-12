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

  // Rotating tips, greetings, and system status messages
  const contextualTips = [
    "Tip: Press Cmd + K anytime to open the Command Palette!",
    "System Status: All 8 core threads operating smoothly.",
    "Tip: Drag any widget card header (:::) to reposition it on your desktop.",
    "Greeting: Welcome to Cosmos OS! Ready for a productive session?",
    "Tip: Access Desktop Widgets & Wallpapers in System Preferences.",
    "System Status: Memory usage stable at 68% • Network 142.4 Mbps.",
  ];

  const [chatLog, setChatLog] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'car',
      text: "Greetings Commander! I am CAR :: CYBER AI. Ask me system queries or type 'help', 'status', or 'reset layout'!",
    },
  ]);

  // Rotate tips every 10 seconds in compact speech bubble
  useEffect(() => {
    const timer = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % contextualTips.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [contextualTips.length]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog, isThinking]);

  const currentTip = contextualTips[tipIndex];

  const handleCatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBouncing(true);
    setIsExpanded((prev) => !prev);
    setShowSpeech(true);
    setAvatarState((prev) => (prev === 'idle' ? 'happy' : 'idle'));
    setTimeout(() => {
      setIsBouncing(false);
      setAvatarState('idle');
    }, 1000);
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

    // Simulate AI response calculation with thinking state
    setTimeout(() => {
      let botReply = '';
      const q = query.toLowerCase();

      if (q.includes('help') || q.includes('command')) {
        botReply = "Quick Shortcuts: Cmd+K (Search/Commands), Cmd+W (Close Window), Cmd+M (Minimize), Cmd+~ (Cycle Windows).";
      } else if (q.includes('status') || q.includes('cpu') || q.includes('ram')) {
        botReply = "System Diagnostics: CPU Load 24% (Normal), RAM 68%, Battery 98%, Network 142.4 Mbps Download.";
      } else if (q.includes('weather') || q.includes('temp')) {
        botReply = "Weather details are available on the Global Node Clock card above! Cyber City Node status is 100% operational 🌐";
      } else if (q.includes('reset') || q.includes('layout')) {
        resetDashboardLayout();
        pushNotification({
          title: 'Dashboard Layout Reset',
          message: 'Restored default widget grid positions.',
          type: 'info',
          duration: 3000,
        });
        botReply = "Restored default desktop widget layout positions for you! 🐾";
      } else if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
        botReply = "Hello Commander! I am CAR :: CYBER AI, ready to assist your workflow on Cosmos OS. 🐱⚡";
      } else {
        botReply = `Purr... CAR processed '${query}'. All diagnostic channels remain nominal!`;
      }

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
    }, 1200);
  };

  return (
    <div className="fixed bottom-5 left-5 z-30 flex flex-col items-start select-none group">
      {/* Expanded Interactive CAR :: CYBER AI Chat Console */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="mb-3 w-84 h-80 rounded-2xl bg-black/90 border border-cosmos-lime/60 p-3 flex flex-col justify-between shadow-[0_0_30px_rgba(124,255,0,0.35)] backdrop-blur-xl relative"
          >
            {/* Component Header Rebranded */}
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <div className="flex items-center gap-1.5 font-bold text-xs text-white uppercase tracking-wider">
                <Icons.Sparkles className="w-4 h-4 text-cosmos-lime animate-pulse" />
                <span className="text-cosmos-lime-bright font-mono">CAR :: CYBER AI</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-white/40 hover:text-white transition-colors p-0.5"
                title="Close Chat"
              >
                <Icons.X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Message Stream */}
            <div className="flex-1 overflow-y-auto my-2 flex flex-col gap-2 p-1 font-mono text-xs scrollbar-thin">
              {chatLog.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-2 rounded-xl text-[11px] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-cosmos-lime text-black font-semibold shadow-lime-glow'
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
                  <div className="bg-white/10 border border-cosmos-lime/40 text-cosmos-lime-bright px-3 py-1.5 rounded-xl text-[11px] font-mono flex items-center gap-2 animate-pulse">
                    <span>CAR is thinking...</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cosmos-lime animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cosmos-lime animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cosmos-lime animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Prompt Input Form */}
            <form onSubmit={handleSend} className="flex gap-1.5 pt-2 border-t border-white/10">
              <div className="flex-1 flex items-center bg-black/70 border border-white/15 rounded-lg px-2 py-1 text-xs font-mono text-white focus-within:border-cosmos-lime">
                <span className="text-cosmos-lime-bright font-bold text-[10px] mr-1.5 whitespace-nowrap">
                  car@os:~$
                </span>
                <input
                  type="text"
                  placeholder="Ask CAR..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  disabled={isThinking}
                  className="w-full bg-transparent text-xs font-mono text-white focus:outline-none placeholder:text-white/30"
                />
              </div>
              <button
                type="submit"
                disabled={isThinking || !inputVal.trim()}
                className="px-3 py-1 bg-cosmos-lime text-black font-bold text-xs rounded-lg hover:bg-cosmos-lime-bright disabled:opacity-40 transition-all flex items-center justify-center"
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
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(true);
            }}
            className="mb-2 max-w-xs p-2.5 rounded-2xl bg-black/85 border border-cosmos-lime/50 text-cosmos-lime-bright text-xs font-mono shadow-[0_0_15px_rgba(124,255,0,0.25)] backdrop-blur-md relative cursor-pointer"
          >
            <div className="flex items-center justify-between gap-1.5 font-bold mb-1 text-white border-b border-white/10 pb-1">
              <div className="flex items-center gap-1.5">
                <Icons.Sparkles className="w-3.5 h-3.5 text-cosmos-lime" />
                <span className="font-mono text-cosmos-lime-bright">CAR :: CYBER AI</span>
              </div>
              <button
                onClick={(ev) => {
                  ev.stopPropagation();
                  setShowSpeech(false);
                }}
                className="text-white/40 hover:text-white"
              >
                <Icons.X className="w-3 h-3" />
              </button>
            </div>
            <p className="text-[11px] text-white/90 leading-relaxed">{currentTip}</p>
            <span className="text-[9px] font-mono text-cosmos-lime/70 block mt-1">
              Click to ask CAR a question 💬
            </span>

            {/* Speech Bubble Pointer Arrow */}
            <div className="absolute -bottom-1.5 left-5 w-3 h-3 bg-black/85 border-b border-r border-cosmos-lime/50 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cyber Cat Dynamic Avatar Character Icon */}
      <motion.div
        onClick={handleCatClick}
        animate={isBouncing ? { y: [0, -12, 0] } : { y: [0, -4, 0] }}
        transition={
          isBouncing
            ? { duration: 0.4, ease: 'easeOut' }
            : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
        className={`w-13 h-13 rounded-2xl bg-black/85 border-2 p-1.5 flex items-center justify-center relative transition-all cursor-pointer shadow-lg ${
          avatarState === 'thinking'
            ? 'border-amber-400 shadow-[0_0_25px_rgba(255,193,7,0.6)]'
            : avatarState === 'chatting'
            ? 'border-cosmos-lime shadow-[0_0_25px_rgba(124,255,0,0.6)]'
            : avatarState === 'happy'
            ? 'border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.6)]'
            : 'border-cosmos-lime/70 shadow-[0_0_20px_rgba(124,255,0,0.35)] group-hover:border-cosmos-lime group-hover:shadow-[0_0_25px_rgba(124,255,0,0.6)]'
        }`}
        title="Click CAR :: CYBER AI"
      >
        {/* Dynamic SVG Cyber Cat Avatar with Mood Expressions */}
        <svg viewBox="0 0 64 64" className="w-full h-full text-cosmos-lime fill-none stroke-current stroke-[2.5]">
          {/* Ears */}
          <polygon
            points="12,24 20,8 28,20"
            fill={avatarState === 'thinking' ? 'rgba(255,193,7,0.3)' : 'rgba(124,255,0,0.2)'}
          />
          <polygon
            points="52,24 44,8 36,20"
            fill={avatarState === 'thinking' ? 'rgba(255,193,7,0.3)' : 'rgba(124,255,0,0.2)'}
          />

          {/* Head Outline */}
          <rect x="14" y="20" width="36" height="32" rx="12" fill="rgba(0,0,0,0.9)" />

          {/* Dynamic Mood Eyes */}
          {avatarState === 'thinking' ? (
            <>
              {/* Amber Thinking Scanner Eyes */}
              <circle cx="24" cy="32" r="4" fill="#FFC107" className="animate-ping" />
              <circle cx="40" cy="32" r="4" fill="#FFC107" className="animate-ping" />
              <line x1="18" y1="32" x2="46" y2="32" stroke="#FFC107" strokeWidth="1.5" className="animate-pulse" />
            </>
          ) : avatarState === 'chatting' ? (
            <>
              {/* Bright Lime Active Chatting Eyes */}
              <circle cx="24" cy="32" r="3.5" fill="#7CFF00" />
              <circle cx="40" cy="32" r="3.5" fill="#7CFF00" />
              {/* Cute Happy Mouth */}
              <path d="M 27,39 Q 32,44 37,39" fill="none" stroke="#7CFF00" strokeWidth="2" strokeLinecap="round" />
            </>
          ) : avatarState === 'happy' ? (
            <>
              {/* Dual Star/Sparkle Eyes */}
              <circle cx="24" cy="32" r="3.5" fill="#00F0FF" />
              <circle cx="40" cy="32" r="3.5" fill="#FF2D55" />
              <path d="M 26,38 Q 32,45 38,38" fill="none" stroke="#00F0FF" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Idle Cyan Eyes */}
              <circle cx="24" cy="32" r="3.5" fill="#00F0FF" className="animate-pulse" />
              <circle cx="40" cy="32" r="3.5" fill="#00F0FF" className="animate-pulse" />
              <polygon points="32,38 29,35 35,35" fill="#7CFF00" />
            </>
          )}

          {/* Whiskers */}
          <path d="M 10,34 L 20,35 M 10,40 L 20,38" stroke="#7CFF00" strokeWidth="1.5" />
          <path d="M 54,34 L 44,35 M 54,40 L 44,38" stroke="#7CFF00" strokeWidth="1.5" />
        </svg>

        {/* Pulse Status Indicator Dot */}
        <span
          className={`absolute top-1 right-1 w-2.5 h-2.5 rounded-full animate-pulse ${
            avatarState === 'thinking'
              ? 'bg-amber-400 shadow-[0_0_8px_#FFC107]'
              : avatarState === 'happy'
              ? 'bg-cyan-400 shadow-[0_0_8px_#00F0FF]'
              : 'bg-cosmos-lime shadow-lime-glow'
          }`}
        />
      </motion.div>
    </div>
  );
};
