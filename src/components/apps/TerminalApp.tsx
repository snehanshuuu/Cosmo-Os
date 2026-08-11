import React, { useState, useRef, useEffect } from 'react';

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
}

export const TerminalApp: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: 'neofetch',
      output: (
        <div className="pl-2 text-cosmos-text-secondary whitespace-pre font-mono leading-relaxed text-[11px] my-1">
{`    /\\___/\\      OS: Cosmos OS 1.0.0 x86_64
   (  o.o  )     Host: Browser Sandbox (React 18 + Vite)
    > ^ <      Kernel: 5.15.0-cosmos-cyber
                 Uptime: 1 hour, 12 mins
                 Packages: 8 (Zustand + Framer Motion)
                 Shell: cosmos-sh 1.0
                 Theme: Obsidian / Electric Lime`}
        </div>
      ),
    },
  ]);

  const [cmdHistory, setCmdHistory] = useState<string[]>(['neofetch']);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const rawCmd = cmdStr.trim();
    const cmd = rawCmd.toLowerCase();

    if (!rawCmd) return;

    setCmdHistory((prev) => [...prev, rawCmd]);
    setHistoryIdx(-1);

    if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="flex flex-col gap-1 text-cosmos-text-secondary text-[11px] py-1">
            <span className="text-cosmos-lime-bright font-bold">Built-in Commands:</span>
            <span>  help         - Show available commands</span>
            <span>  clear        - Clear terminal output</span>
            <span>  about        - Display Cosmos OS system overview</span>
            <span>  whoami       - Display current active user</span>
            <span>  version      - Display system version info</span>
            <span>  projects     - List active workspace projects</span>
            <span>  skills       - Display core technical skills</span>
            <span>  neofetch     - Display system info banner</span>
            <span className="text-cosmos-lime-bright font-bold mt-2">Quest IT Commands:</span>
            <span>  quest it tech     - View Quest IT technology domain</span>
            <span>  quest it content  - View Quest IT content domain</span>
            <span>  quest it design   - View Quest IT design domain</span>
            <span>  quest it events   - View Quest IT upcoming events</span>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="text-cosmos-text-secondary text-[11px] py-1">
            Cosmos OS — Next-Generation browser-based desktop operating system interface. Designed with Glassmorphic aesthetics, floating multi-window management, and real-time state persistence.
          </div>
        );
        break;

      case 'whoami':
        output = <div className="text-cosmos-lime-bright font-bold py-1">cosmos_user (Administrator)</div>;
        break;

      case 'version':
        output = <div className="text-cosmos-text-secondary py-1">Cosmos OS v1.0.0 (x86_64-pc-cosmos-os)</div>;
        break;

      case 'projects':
        output = (
          <div className="flex flex-col gap-1 text-cosmos-text-secondary text-[11px] py-1">
            <span>[1] Cosmos OS - Cyber-Industrial Desktop Operating System</span>
            <span>[2] Neural Dashboard - Interactive System Monitoring Suite</span>
            <span>[3] Vision Matrix - High-performance WebGL Engine</span>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="flex flex-col gap-1 text-cosmos-text-secondary text-[11px] py-1">
            <span>• Frontend: React 18, TypeScript, Tailwind CSS, Framer Motion, Zustand</span>
            <span>• Architecture: Component Design Systems, State Persistence, Window Systems</span>
            <span>• Tooling: Vite, Node.js, Git, CI/CD</span>
          </div>
        );
        break;

      case 'neofetch':
        output = (
          <div className="pl-2 text-cosmos-text-secondary whitespace-pre font-mono leading-relaxed text-[11px] my-1">
{`    /\\___/\\      OS: Cosmos OS 1.0.0 x86_64
   (  o.o  )     Host: Browser Sandbox (React 18 + Vite)
    > ^ <      Kernel: 5.15.0-cosmos-cyber
                 Uptime: 1 hour, 12 mins
                 Packages: 8 (Zustand + Framer Motion)
                 Shell: cosmos-sh 1.0
                 Theme: Obsidian / Electric Lime`}
          </div>
        );
        break;

      case 'quest it tech':
        output = (
          <div className="flex flex-col gap-1 text-cosmos-text-secondary text-[11px] py-1">
            <span className="text-cosmos-lime-bright font-bold">[Quest IT — Tech Domain]</span>
            <span>Specialization: Web Development, Mobile Apps, AI System Integration & Cloud Ops</span>
            <span>Lead: Quest IT Technology Team</span>
          </div>
        );
        break;

      case 'quest it content':
        output = (
          <div className="flex flex-col gap-1 text-cosmos-text-secondary text-[11px] py-1">
            <span className="text-cosmos-lime-bright font-bold">[Quest IT — Content Domain]</span>
            <span>Specialization: Technical Writing, Documentation, Copywriting & Media Production</span>
            <span>Lead: Quest IT Content Team</span>
          </div>
        );
        break;

      case 'quest it design':
        output = (
          <div className="flex flex-col gap-1 text-cosmos-text-secondary text-[11px] py-1">
            <span className="text-cosmos-lime-bright font-bold">[Quest IT — Design Domain]</span>
            <span>Specialization: UI/UX, Glassmorphism Aesthetics, Brand Systems & Motion Graphics</span>
            <span>Lead: Quest IT Design Team</span>
          </div>
        );
        break;

      case 'quest it events':
        output = (
          <div className="flex flex-col gap-1 text-cosmos-text-secondary text-[11px] py-1">
            <span className="text-cosmos-lime-bright font-bold">[Quest IT — Upcoming Events]</span>
            <span>• HackQuest 2026 — 48hr Cyber Hackathon</span>
            <span>• TechTalks: Building Modern Browser Operating Systems</span>
            <span>• Design Workshop: Advanced Glassmorphism and UI Tokens</span>
          </div>
        );
        break;

      default:
        output = (
          <div className="text-rose-400 text-[11px] py-1">
            command not found: {rawCmd}. Type 'help' for available commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: rawCmd, output }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIdx < cmdHistory.length - 1 ? historyIdx + 1 : historyIdx;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || '');
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0a0b0d] p-4 text-cosmos-text-primary font-mono text-xs select-text overflow-y-auto">
      <div className="text-cosmos-lime-bright mb-2">
        Cosmos Shell v1.0.0 (x86_64-pc-cosmos-os)
      </div>
      <div className="text-cosmos-text-muted mb-4">
        Type 'help' to view available built-in & Quest IT commands.
      </div>

      <div className="flex flex-col gap-3">
        {history.map((entry, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <span className="text-cosmos-lime">cosmos@os:~$</span>
              <span className="text-white">{entry.command}</span>
            </div>
            {entry.output}
          </div>
        ))}

        {/* Input Prompt */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-cosmos-lime">cosmos@os:~$</span>
          <input
            type="text"
            autoFocus
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent font-mono text-xs text-white focus:outline-none"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
