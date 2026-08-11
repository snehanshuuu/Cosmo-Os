import React, { useState } from 'react';
import * as Icons from 'lucide-react';

interface HistoryItem {
  url: string;
  title: string;
}

export const BrowserApp: React.FC = () => {
  const [urlInput, setUrlInput] = useState('https://cosmos.os/welcome');
  const [currentUrl, setCurrentUrl] = useState('https://cosmos.os/welcome');
  const [history, setHistory] = useState<HistoryItem[]>([
    { url: 'https://cosmos.os/welcome', title: 'Cosmos OS — Next Gen' },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const navigateTo = (newUrl: string, title?: string) => {
    let formatted = newUrl.trim();
    if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      formatted = `https://${formatted}`;
    }
    setUrlInput(formatted);
    setCurrentUrl(formatted);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ url: formatted, title: title || formatted });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const prev = historyIndex - 1;
      setHistoryIndex(prev);
      setCurrentUrl(history[prev].url);
      setUrlInput(history[prev].url);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const next = historyIndex + 1;
      setHistoryIndex(next);
      setCurrentUrl(history[next].url);
      setUrlInput(history[next].url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo(urlInput);
  };

  return (
    <div className="flex flex-col h-full w-full bg-cosmos-bg/95 text-cosmos-text-primary text-xs select-none">
      {/* Address Bar Controls */}
      <div className="h-10 border-b border-white/10 px-3 flex items-center gap-2 bg-black/60 font-mono">
        <div className="flex gap-1.5 text-cosmos-text-muted">
          <button
            onClick={handleBack}
            disabled={historyIndex <= 0}
            className="p-1 rounded hover:text-white disabled:opacity-30"
            title="Back"
          >
            <Icons.ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleForward}
            disabled={historyIndex >= history.length - 1}
            className="p-1 rounded hover:text-white disabled:opacity-30"
            title="Forward"
          >
            <Icons.ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentUrl(currentUrl)}
            className="p-1 rounded hover:text-white"
            title="Reload"
          >
            <Icons.RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex items-center">
          <div className="w-full bg-white/5 border border-white/10 rounded px-3 py-1 text-cosmos-lime-bright flex items-center gap-2 focus-within:border-cosmos-lime">
            <Icons.Lock className="w-3 h-3 text-cosmos-lime" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 bg-transparent font-mono text-xs text-white focus:outline-none"
            />
          </div>
        </form>
      </div>

      {/* Rendered Web Content */}
      <div className="flex-1 p-6 overflow-y-auto bg-black/40">
        {currentUrl.includes('cosmos.os') ? (
          <div className="max-w-xl mx-auto flex flex-col items-center text-center gap-4 py-8">
            <div className="w-14 h-14 rounded-2xl bg-cosmos-lime text-black flex items-center justify-center font-bold text-2xl shadow-lime-glow">
              C
            </div>
            <h1 className="text-2xl font-display font-bold text-white">Cosmos Web Network</h1>
            <p className="text-xs font-mono text-cosmos-text-secondary">
              Explore featured sandbox destinations or enter any URL above.
            </p>
            <div className="grid grid-cols-3 gap-3 w-full mt-4">
              <button
                onClick={() => navigateTo('https://github.com', 'GitHub Repository')}
                className="p-3 rounded-lg border border-white/10 bg-white/5 hover:border-cosmos-lime/50 hover:bg-cosmos-lime/10 transition-all text-left"
              >
                <Icons.Code className="w-5 h-5 text-cosmos-lime mb-2" />
                <span className="font-mono text-xs font-bold text-white block">GitHub</span>
                <span className="text-[10px] text-cosmos-text-muted">Source Code</span>
              </button>

              <button
                onClick={() => navigateTo('https://news.ycombinator.com', 'Hacker News')}
                className="p-3 rounded-lg border border-white/10 bg-white/5 hover:border-amber-400/50 hover:bg-amber-400/10 transition-all text-left"
              >
                <Icons.Globe className="w-5 h-5 text-amber-400 mb-2" />
                <span className="font-mono text-xs font-bold text-white block">Hacker News</span>
                <span className="text-[10px] text-cosmos-text-muted">Tech Feed</span>
              </button>

              <button
                onClick={() => navigateTo('https://wikipedia.org', 'Wikipedia')}
                className="p-3 rounded-lg border border-white/10 bg-white/5 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all text-left"
              >
                <Icons.FileText className="w-5 h-5 text-cyan-400 mb-2" />
                <span className="font-mono text-xs font-bold text-white block">Wikipedia</span>
                <span className="text-[10px] text-cosmos-text-muted">Knowledge</span>
              </button>
            </div>
          </div>
        ) : currentUrl.includes('github') ? (
          <div className="flex flex-col gap-4 font-mono">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Icons.Code className="w-5 h-5 text-white" />
              <span className="text-base font-bold text-white">cosmos-os / core</span>
              <span className="text-xs bg-white/10 text-cosmos-lime px-2 py-0.5 rounded">Public</span>
            </div>
            <p className="text-xs text-cosmos-text-secondary">
              Next-generation browser-based desktop operating system built with React 18, TypeScript & Tailwind.
            </p>
            <div className="border border-white/10 rounded-lg overflow-hidden bg-black/60">
              <div className="p-3 border-b border-white/10 bg-white/5 font-bold text-white">Files</div>
              <div className="p-3 flex flex-col gap-2">
                <div className="flex justify-between hover:text-cosmos-lime cursor-pointer">
                  <span>src/components/shell/WindowManager.tsx</span>
                  <span className="text-cosmos-text-muted">1 hour ago</span>
                </div>
                <div className="flex justify-between hover:text-cosmos-lime cursor-pointer">
                  <span>src/stores/windowStore.ts</span>
                  <span className="text-cosmos-text-muted">2 hours ago</span>
                </div>
                <div className="flex justify-between hover:text-cosmos-lime cursor-pointer">
                  <span>package.json</span>
                  <span className="text-cosmos-text-muted">Yesterday</span>
                </div>
              </div>
            </div>
          </div>
        ) : currentUrl.includes('news.ycombinator') ? (
          <div className="flex flex-col gap-3 font-mono">
            <div className="bg-amber-600/30 border border-amber-500/40 p-2.5 rounded text-amber-300 font-bold">
              Hacker News — Tech & Cybernetics
            </div>
            <div className="flex flex-col gap-2">
              <div className="p-2 border-b border-white/10">
                <a className="text-white hover:underline font-bold text-sm block">
                  1. Cosmos OS: Web-based Desktop Architecture
                </a>
                <span className="text-[10px] text-cosmos-text-muted">245 points by cyberdev 2 hours ago | 88 comments</span>
              </div>
              <div className="p-2 border-b border-white/10">
                <a className="text-white hover:underline font-bold text-sm block">
                  2. React 19 Concurrent Rendering Insights
                </a>
                <span className="text-[10px] text-cosmos-text-muted">180 points by reactfan 4 hours ago | 42 comments</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3 font-mono">
            <Icons.Globe className="w-10 h-10 text-cosmos-lime-bright animate-pulse" />
            <h3 className="text-lg font-bold text-white">Navigated to {currentUrl}</h3>
            <p className="text-xs text-cosmos-text-muted max-w-sm">
              Sandbox browser frame loaded successfully.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
