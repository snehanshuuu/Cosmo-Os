import React, { useState, useEffect, useRef } from 'react';

interface LogLine {
  id: string;
  type: 'system' | 'user' | 'response' | 'error';
  text: string;
}

export const TerminalStreamWidget: React.FC = () => {
  const [logs, setLogs] = useState<LogLine[]>([
    { id: '1', type: 'system', text: 'SYS_INIT :: OK' },
    { id: '2', type: 'system', text: 'NET_PING :: 14ms' },
    { id: '3', type: 'system', text: 'MEM_ALLOC :: 0x7FFF' },
    { id: '4', type: 'system', text: 'KERNEL :: NOMINAL' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Simulated live log generator stream
  useEffect(() => {
    const sampleLogs = [
      'SYS_INIT :: OK',
      'NET_PING :: 14ms',
      'MEM_ALLOC :: 0x7FFF',
      'IPC_SYNC :: COMPLETED',
      'GPU_RASTER :: 120 FPS',
      'SECURITY :: ENFORCED',
      'DAEMON :: ACTIVE',
    ];

    const interval = setInterval(() => {
      const randomText = sampleLogs[Math.floor(Math.random() * sampleLogs.length)];
      setLogs((prev) => [
        ...prev.slice(-15),
        { id: `log-${Date.now()}`, type: 'system', text: randomText },
      ]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom of log stream
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    setInputVal('');

    const userEntry: LogLine = { id: `u-${Date.now()}`, type: 'user', text: `cosmo@os:~$ ${cmd}` };

    let responseEntry: LogLine;

    const lower = cmd.toLowerCase();
    if (lower === 'help') {
      responseEntry = {
        id: `r-${Date.now()}`,
        type: 'response',
        text: 'COMMANDS: help, clear, ping, status, echo <msg>',
      };
    } else if (lower === 'clear') {
      setLogs([]);
      return;
    } else if (lower === 'ping') {
      responseEntry = {
        id: `r-${Date.now()}`,
        type: 'response',
        text: 'PONG :: 12ms [vibewquest-be.onrender.com]',
      };
    } else if (lower === 'status') {
      responseEntry = {
        id: `r-${Date.now()}`,
        type: 'response',
        text: 'STATUS :: ALL SYSTEMS OPTIMAL',
      };
    } else if (lower.startsWith('echo ')) {
      responseEntry = {
        id: `r-${Date.now()}`,
        type: 'response',
        text: cmd.slice(5),
      };
    } else {
      responseEntry = {
        id: `r-${Date.now()}`,
        type: 'error',
        text: `Command not found: ${cmd}. Type 'help'`,
      };
    }

    setLogs((prev) => [...prev, userEntry, responseEntry]);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-1.5 w-60 font-mono text-[11px] select-none"
    >
      {/* Widget Header */}
      <div className="flex justify-between items-center text-[10px] text-cosmos-text-muted border-b border-white/10 pb-1">
        <span className="uppercase tracking-wider font-bold text-cosmos-lime-bright">
          TERMINAL STREAM
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-cosmos-lime animate-ping" />
      </div>

      {/* Log Output Box */}
      <div
        ref={logContainerRef}
        className="h-28 overflow-y-auto bg-black/80 border border-white/10 rounded p-2 flex flex-col gap-1 text-[10px] leading-relaxed scrollbar-thin"
      >
        {logs.map((log) => (
          <div
            key={log.id}
            className={
              log.type === 'system'
                ? 'text-emerald-400 font-mono'
                : log.type === 'user'
                ? 'text-white font-bold'
                : log.type === 'response'
                ? 'text-cyan-300 font-mono'
                : 'text-rose-400 font-mono'
            }
          >
            {log.text}
          </div>
        ))}
      </div>

      {/* Inline Input Prompt */}
      <form onSubmit={handleCommandSubmit} className="flex items-center gap-1 bg-black/90 border border-white/15 rounded px-2 py-1">
        <span className="text-cosmos-lime-bright font-bold text-[10px] whitespace-nowrap">
          cosmo@os:~$
        </span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="help, ping..."
          className="flex-1 bg-transparent text-[10px] font-mono text-white focus:outline-none placeholder:text-cosmos-text-muted/60"
        />
      </form>
    </div>
  );
};
