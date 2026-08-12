import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWidgetStore } from '../../stores/widgetStore';
import { useWindowStore } from '../../stores/windowStore';
import { useMusicStore } from '../../stores/musicStore';
import { useNotificationStore } from '../../stores/notificationStore';
import { AppId } from '../../types';
import * as Icons from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'car' | 'user';
  text: string;
}

type AvatarMoodState = 'idle' | 'thinking' | 'chatting' | 'happy';

export const CyberCatCompanion: React.FC = () => {
  const { resetDashboardLayout } = useWidgetStore();
  const { openApp } = useWindowStore();
  const { togglePlay, isPlaying } = useMusicStore();
  const { push: pushNotification } = useNotificationStore();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [showSpeech, setShowSpeech] = useState(true);
  const [tipIndex, setTipIndex] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [avatarState, setAvatarState] = useState<AvatarMoodState>('idle');

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Rotating tips, greetings, and system status messages
  const contextualTips = [
    "C.A.R. Voice Mode Available! Click the Mic icon 🎙️ or ask me anything!",
    "Voice Command Tip: Say 'Open Calculator' or 'Open Music' to launch apps!",
    "Tip: Press Cmd + K anytime to open the Command Palette!",
    "Greeting: Welcome to Cosmos OS! How can C.A.R. assist you today?",
    "Tip: Drag any widget card header (:::) to reposition it on your desktop.",
    "System Status: Memory usage stable at 68% • Network 142.4 Mbps.",
  ];

  const [chatLog, setChatLog] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'car',
      text: "Hello Commander! I am C.A.R. (Cybernetic Assistant Companion). Speak or type any command (e.g., 'open calculator', 'play music', 'status')!",
    },
  ]);

  // Check Web Speech API Availability
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setVoiceSupported(true);
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsListening(true);
        setAvatarState('thinking');
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputVal(transcript);
          processCARCommand(transcript);
        }
      };

      rec.onerror = (err: any) => {
        console.warn('Voice Recognition Error:', err);
        setIsListening(false);
        setAvatarState('idle');
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Text-to-Speech (TTS) response aloud
  const speakCARText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/[^\w\s\.,!\?]/gi, ''));
      utterance.rate = 1.0;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Toggle Voice Recognition Listening
  const toggleVoiceListening = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!voiceSupported) {
      pushNotification({
        title: 'Voice Not Supported',
        message: 'Your browser does not support Web Speech API.',
        type: 'warning',
        duration: 3000,
      });
      return;
    }

    if (!isExpanded) {
      setIsExpanded(true);
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
      } catch (err) {
        console.warn('Could not start speech recognition:', err);
      }
    }
  };

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

  // Comprehensive C.A.R. Intelligent Voice & Text Command Engine
  const generateCARAnswer = (query: string): string => {
    const q = query.toLowerCase();

    // Voice / App Opening Directives
    if (q.includes('open') || q.includes('launch') || q.includes('show')) {
      const appMap: Record<string, { id: AppId; title: string }> = {
        calculator: { id: 'calculator', title: 'Calculator' },
        notes: { id: 'notes', title: 'Cosmos Notes' },
        terminal: { id: 'terminal', title: 'Cosmos Terminal' },
        browser: { id: 'browser', title: 'Web Browser' },
        music: { id: 'music-player', title: 'Music Player' },
        player: { id: 'music-player', title: 'Music Player' },
        song: { id: 'music-player', title: 'Music Player' },
        settings: { id: 'settings', title: 'System Settings' },
        preferences: { id: 'settings', title: 'System Settings' },
        calendar: { id: 'calendar', title: 'Calendar' },
        gallery: { id: 'gallery', title: 'Media Gallery' },
        photos: { id: 'gallery', title: 'Media Gallery' },
        file: { id: 'file-explorer', title: 'File Explorer' },
        explorer: { id: 'file-explorer', title: 'File Explorer' },
      };

      for (const [key, app] of Object.entries(appMap)) {
        if (q.includes(key)) {
          openApp(app.id, app.title);
          return `Voice Command Accepted :: Launching ${app.title} window for you! 🚀`;
        }
      }
    }

    // Music playback voice directive
    if (q.includes('play music') || q.includes('pause music') || q.includes('toggle music')) {
      togglePlay();
      openApp('music-player', 'Music Player');
      return isPlaying ? "Pausing audio track playback 🎵" : "Playing audio track in Mini Player 🎵";
    }

    // 1. System Shortcuts & Commands
    if (q.includes('help') || q.includes('command') || q.includes('shortcut')) {
      return "C.A.R. Voice Directives :: Try saying 'open calculator', 'open music', 'open terminal', 'status', or 'reset layout'!";
    }

    // 2. Telemetry & Diagnostics
    if (q.includes('status') || q.includes('cpu') || q.includes('ram') || q.includes('system') || q.includes('battery')) {
      return "C.A.R. Telemetry :: CPU Load: 24% | RAM: 68% | Battery: 98% | Network: 142.4 Mbps.";
    }

    // 3. Reset Layout Command
    if (q.includes('reset') || q.includes('layout')) {
      resetDashboardLayout();
      pushNotification({
        title: 'Layout Reset',
        message: 'Default desktop widget grid restored by C.A.R.',
        type: 'info',
        duration: 3000,
      });
      return "Restored default desktop widget grid layout for you! 🐾";
    }

    // 4. Time / Clock
    if (q.includes('time') || q.includes('clock') || q.includes('date')) {
      return `Current Local Time is ${new Date().toLocaleTimeString()} ⏰`;
    }

    // 5. Weather
    if (q.includes('weather') || q.includes('temp')) {
      return "Cyber City Weather: 72°F and Clear ☀️";
    }

    // 6. About C.A.R. / Who are you
    if (q.includes('who are you') || q.includes('car') || q.includes('name')) {
      return "I am C.A.R. — your Cybernetic Assistant Companion on Cosmos OS! 🐱⚡";
    }

    // 7. About Cosmos OS
    if (q.includes('cosmos') || q.includes('os') || q.includes('desktop')) {
      return "Cosmos OS is a next-gen cybernetic operating system with floating glass widgets and 3D Fiber background!";
    }

    // 8. Greetings & Small Talk
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('good morning') || q.includes('good evening')) {
      return "Hello Commander! C.A.R. is online and listening. How can I help you today? ☕✨";
    }

    // 9. Math / Calculator assistance
    if (q.match(/^[\d\s\+\-\*\/\(\)\.]+$/)) {
      try {
        const result = new Function(`return (${query})`)();
        return `C.A.R. Math Result: ${query} = ${result}`;
      } catch (err) {
        return "C.A.R. encountered a math evaluation error.";
      }
    }

    // 10. General AI Query Fallbacks
    const fallbackAnswers = [
      `C.A.R. AI Analysis :: Voice query '${query}' processed cleanly!`,
      `I've logged '${query}' in system memory. All diagnostic threads remain nominal!`,
      `C.A.R. Response :: Cross-referenced '${query}' with Cosmos OS telemetry.`,
    ];

    return fallbackAnswers[Math.floor(Math.random() * fallbackAnswers.length)];
  };

  const processCARCommand = (rawQuery: string) => {
    const query = rawQuery.trim();
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
      speakCARText(botReply);
      setTimeout(() => setAvatarState('idle'), 2500);
    }, 900);
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    processCARCommand(inputVal);
  };

  return (
    <div className="fixed bottom-4 left-4 z-30 flex flex-col items-start select-none group">
      {/* Expanded Interactive C.A.R. Chat Panel (350px * 320px) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="mb-3 w-[350px] h-[320px] rounded-2xl bg-black/90 border border-cosmos-lime/60 p-3 flex flex-col justify-between shadow-[0_0_30px_rgba(124,255,0,0.35)] backdrop-blur-xl relative pointer-events-auto"
          >
            {/* Component Header with Voice Indicator */}
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <div className="flex items-center gap-1.5 font-bold text-xs text-white uppercase tracking-wider">
                <Icons.Sparkles className="w-4 h-4 text-cosmos-lime animate-pulse" />
                <span className="text-cosmos-lime-bright font-mono">C.A.R. :: CYBER AI</span>
                {isListening && (
                  <span className="ml-2 px-1.5 py-0.5 rounded bg-red-500/20 border border-red-500/60 text-red-400 text-[9px] font-mono animate-pulse flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    Listening...
                  </span>
                )}
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
                    <span>C.A.R. is thinking...</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cosmos-lime animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cosmos-lime animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cosmos-lime animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Prompt Input Form & Voice Microphone Button */}
            <form onSubmit={handleSend} className="flex gap-1.5 pt-2 border-t border-white/10">
              <div className="flex-1 flex items-center bg-black/70 border border-white/15 rounded-lg px-2.5 py-1 text-xs font-mono text-white focus-within:border-cosmos-lime">
                <span className="text-cosmos-lime-bright font-bold text-[10px] mr-1.5 whitespace-nowrap">
                  car@cosmos:~$
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={isListening ? "Listening to your voice command..." : "Ask or say 'open calculator'..."}
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  disabled={isThinking}
                  className="w-full bg-transparent text-xs font-mono text-white focus:outline-none placeholder:text-white/40"
                />
              </div>

              {/* Mic Voice Command Button */}
              <button
                type="button"
                onClick={toggleVoiceListening}
                className={`px-2.5 py-1 rounded-lg border font-bold text-xs transition-all flex items-center justify-center ${
                  isListening
                    ? 'bg-red-500/30 border-red-500 text-red-400 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                    : 'bg-white/10 border-white/20 text-white hover:bg-cosmos-lime/20 hover:border-cosmos-lime hover:text-cosmos-lime'
                }`}
                title={isListening ? "Listening... Click to stop" : "Click to give Voice Command"}
              >
                {isListening ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="1" y1="1" x2="23" y2="23"/>
                    <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V5a3 3 0 0 0-5.94-.6"/>
                    <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/>
                    <line x1="12" y1="19" x2="12" y2="22"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                    <line x1="12" y1="19" x2="12" y2="22"/>
                  </svg>
                )}
              </button>

              <button
                type="submit"
                disabled={isThinking || !inputVal.trim()}
                className="px-3 py-1 bg-cosmos-lime text-black font-bold text-xs rounded-lg hover:bg-cosmos-lime-bright disabled:opacity-40 transition-all flex items-center justify-center shadow-lime-glow"
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
            className="mb-2 max-w-[240px] p-2.5 rounded-2xl bg-black/85 border border-cosmos-lime/50 text-cosmos-lime-bright text-xs font-mono shadow-[0_0_15px_rgba(124,255,0,0.25)] backdrop-blur-md relative cursor-pointer pointer-events-auto"
          >
            <div className="flex items-center justify-between gap-1.5 font-bold mb-1 text-white border-b border-white/10 pb-1">
              <div className="flex items-center gap-1.5">
                <Icons.Sparkles className="w-3.5 h-3.5 text-cosmos-lime" />
                <span className="font-mono text-cosmos-lime-bright">C.A.R. :: CYBER AI</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={toggleVoiceListening}
                  className={`p-0.5 rounded transition-colors ${
                    isListening ? 'text-red-400 animate-pulse' : 'text-cosmos-lime hover:text-white'
                  }`}
                  title="Voice Command Mode"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                    <line x1="12" y1="19" x2="12" y2="22"/>
                  </svg>
                </button>
                <button
                  onClick={(ev) => {
                    ev.stopPropagation();
                    setShowSpeech(false);
                  }}
                  className="text-white/40 hover:text-white p-0.5"
                >
                  <Icons.X className="w-3 h-3" />
                </button>
              </div>
            </div>
            <p className="text-[11px] text-white/90 leading-relaxed">{currentTip}</p>
            <span className="text-[9px] font-mono text-cosmos-lime/70 block mt-1 flex items-center gap-1">
              Click to chat or use Voice Commands 🎙️
            </span>

            {/* Speech Bubble Pointer Arrow */}
            <div className="absolute -bottom-1.5 left-5 w-3 h-3 bg-black/85 border-b border-r border-cosmos-lime/50 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* C.A.R. Medium Cyber Cat Avatar Icon (45px * 45px) */}
      <motion.div
        onClick={handleCatClick}
        animate={isBouncing ? { y: [0, -10, 0] } : { y: [0, -3, 0] }}
        transition={
          isBouncing
            ? { duration: 0.4, ease: 'easeOut' }
            : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
        className={`w-[45px] h-[45px] rounded-2xl bg-black/85 border-2 p-1.5 flex items-center justify-center relative transition-all cursor-pointer shadow-lg pointer-events-auto ${
          isListening
            ? 'border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.7)] animate-pulse'
            : avatarState === 'thinking'
            ? 'border-amber-400 shadow-[0_0_25px_rgba(255,193,7,0.6)]'
            : avatarState === 'chatting'
            ? 'border-cosmos-lime shadow-[0_0_25px_rgba(124,255,0,0.6)]'
            : avatarState === 'happy'
            ? 'border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.6)]'
            : 'border-cosmos-lime/70 shadow-[0_0_20px_rgba(124,255,0,0.35)] group-hover:border-cosmos-lime group-hover:shadow-[0_0_25px_rgba(124,255,0,0.6)]'
        }`}
        title="Click to chat or trigger Voice Commands"
      >
        {/* Dynamic SVG Cyber Cat Avatar */}
        <svg viewBox="0 0 64 64" className="w-full h-full text-cosmos-lime fill-none stroke-current stroke-[2.5]">
          {/* Ears */}
          <polygon
            points="12,24 20,8 28,20"
            fill={isListening ? 'rgba(239,68,68,0.3)' : avatarState === 'thinking' ? 'rgba(255,193,7,0.3)' : 'rgba(124,255,0,0.2)'}
          />
          <polygon
            points="52,24 44,8 36,20"
            fill={isListening ? 'rgba(239,68,68,0.3)' : avatarState === 'thinking' ? 'rgba(255,193,7,0.3)' : 'rgba(124,255,0,0.2)'}
          />

          {/* Head Outline */}
          <rect x="14" y="20" width="36" height="32" rx="12" fill="rgba(0,0,0,0.9)" />

          {/* Dynamic Mood Eyes */}
          {isListening ? (
            <>
              {/* Red Pulse Listening Visor */}
              <circle cx="24" cy="32" r="4" fill="#EF4444" className="animate-ping" />
              <circle cx="40" cy="32" r="4" fill="#EF4444" className="animate-ping" />
              <line x1="18" y1="32" x2="46" y2="32" stroke="#EF4444" strokeWidth="2" className="animate-pulse" />
            </>
          ) : avatarState === 'thinking' ? (
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
            isListening
              ? 'bg-red-500 shadow-[0_0_8px_#EF4444]'
              : avatarState === 'thinking'
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
