import React, { useState } from 'react';
import { useSettingsStore } from '../../stores/settingsStore';
import { useWidgetStore } from '../../stores/widgetStore';
import { WallpaperPreset, AccentColor, WidgetType } from '../../types';
import { GlassPanel } from '../primitives/GlassPanel';
import * as Icons from 'lucide-react';

export const SettingsApp: React.FC = () => {
  const {
    wallpaper,
    setWallpaper,
    accentColor,
    setAccentColor,
    dockSize,
    setDockSize,
    dockAutohide,
    toggleDockAutohide,
    reducedMotion,
    toggleReducedMotion,
  } = useSettingsStore();

  const { widgets, toggleWidgetType, resetDefaultWidgets } = useWidgetStore();

  const [activeTab, setActiveTab] = useState<'wallpaper' | 'widgets' | 'appearance' | 'dock' | 'about'>('wallpaper');
  const [customUrl, setCustomUrl] = useState('');

  const wallpaperPresets: { id: WallpaperPreset; name: string; gradient: string; previewUrl?: string }[] = [
    {
      id: 'quantum-matrix',
      name: 'Quantum Data Matrix',
      gradient: 'from-[#0d0e0f] via-[#1b1c1d] to-[#121314] border-cosmos-lime/60',
      previewUrl: '/wallpapers/quantum_matrix.png',
    },
    {
      id: 'electric-grid',
      name: 'Electric Grid',
      gradient: 'from-[#0d0e0f] via-[#1b1c1d] to-[#121314] border-cosmos-lime/40',
    },
    {
      id: 'deep-space',
      name: 'Deep Space',
      gradient: 'from-[#050608] via-[#0d0f14] to-[#151922] border-indigo-500/40',
    },
    {
      id: 'nebula-flow',
      name: 'Nebula Flow',
      gradient: 'from-[#0a0a0f] via-[#14121e] to-[#0d161a] border-purple-500/40',
    },
    {
      id: 'obsidian-void',
      name: 'Obsidian Void',
      gradient: 'from-[#08090a] to-[#121314] border-white/20',
    },
  ];

  const accentColors: { id: AccentColor; name: string; class: string }[] = [
    { id: 'electric-lime', name: 'Electric Lime', class: 'bg-[#AAD622]' },
    { id: 'cyber-cyan', name: 'Cyber Cyan', class: 'bg-[#00F0FF]' },
    { id: 'neon-purple', name: 'Neon Purple', class: 'bg-[#BF5AF2]' },
    { id: 'solar-orange', name: 'Solar Orange', class: 'bg-[#FF9F0A]' },
  ];

  const availableWidgets: { type: WidgetType; name: string; icon: string; desc: string }[] = [
    { type: 'theme-display-control', name: 'Display & Theme Control', icon: 'Palette', desc: 'Visual FX toggles, wallpaper presets, & color scheme controls' },
    { type: 'network-telemetry', name: 'Network Telemetry', icon: 'Wifi', desc: 'Live UP/DOWN speed metrics & Sparkline bandwidth graph' },
    { type: 'global-node-clock', name: 'Global Node Clock', icon: 'Globe', desc: 'World vector map with tech hub pulse dots & multi-timezone readout' },
    { type: 'terminal-stream', name: 'Terminal Stream Widget', icon: 'Terminal', desc: 'Live scrolling system logs & interactive prompt' },
    { type: 'calendar', name: 'Calendar Widget', icon: 'Calendar', desc: 'Mini month calendar view highlighting today' },
    { type: 'weather', name: 'Weather Widget', icon: 'Sun', desc: 'Live temperature, condition, and location' },
    { type: 'notes', name: 'Notes Scratchpad', icon: 'FileText', desc: 'Quick note viewer on desktop' },
    { type: 'music', name: 'Music Player Widget', icon: 'Music', desc: 'Mini audio playback controls' },
    { type: 'clock', name: 'Digital Clock', icon: 'Clock', desc: 'Live time with 12/24h toggle' },
    { type: 'quick-actions', name: 'Quick Actions', icon: 'Sliders', desc: 'Wi-Fi, Bluetooth, DND toggles' },
    { type: 'system-stats', name: 'System Diagnostics', icon: 'Zap', desc: 'CPU, RAM, and Storage gauges' },
  ];

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim()) {
      setWallpaper(customUrl.trim());
    }
  };

  return (
    <div className="flex h-full w-full bg-cosmos-bg/90 text-cosmos-text-primary text-sm overflow-hidden select-none">
      {/* Sidebar Navigation */}
      <div className="w-48 bg-cosmos-container-low/60 border-r border-white/10 p-3 flex flex-col gap-1">
        <div className="px-3 py-2 text-xs font-mono uppercase text-cosmos-text-muted tracking-wider">
          System Preferences
        </div>
        <button
          onClick={() => setActiveTab('wallpaper')}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-md font-medium transition-all ${
            activeTab === 'wallpaper'
              ? 'bg-cosmos-lime/15 text-cosmos-lime-bright border border-cosmos-lime/30'
              : 'text-cosmos-text-secondary hover:bg-white/5 hover:text-white'
          }`}
        >
          <Icons.Image className="w-4 h-4" />
          <span>Wallpaper</span>
        </button>
        <button
          onClick={() => setActiveTab('widgets')}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-md font-medium transition-all ${
            activeTab === 'widgets'
              ? 'bg-cosmos-lime/15 text-cosmos-lime-bright border border-cosmos-lime/30'
              : 'text-cosmos-text-secondary hover:bg-white/5 hover:text-white'
          }`}
        >
          <Icons.Layout className="w-4 h-4 text-cyan-400" />
          <span>Desktop Widgets</span>
        </button>
        <button
          onClick={() => setActiveTab('appearance')}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-md font-medium transition-all ${
            activeTab === 'appearance'
              ? 'bg-cosmos-lime/15 text-cosmos-lime-bright border border-cosmos-lime/30'
              : 'text-cosmos-text-secondary hover:bg-white/5 hover:text-white'
          }`}
        >
          <Icons.Palette className="w-4 h-4" />
          <span>Appearance</span>
        </button>
        <button
          onClick={() => setActiveTab('dock')}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-md font-medium transition-all ${
            activeTab === 'dock'
              ? 'bg-cosmos-lime/15 text-cosmos-lime-bright border border-cosmos-lime/30'
              : 'text-cosmos-text-secondary hover:bg-white/5 hover:text-white'
          }`}
        >
          <Icons.SlidersHorizontal className="w-4 h-4" />
          <span>Dock Preferences</span>
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-md font-medium transition-all ${
            activeTab === 'about'
              ? 'bg-cosmos-lime/15 text-cosmos-lime-bright border border-cosmos-lime/30'
              : 'text-cosmos-text-secondary hover:bg-white/5 hover:text-white'
          }`}
        >
          <Icons.Info className="w-4 h-4" />
          <span>About Cosmos OS</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'wallpaper' && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-display font-bold text-white mb-1">Desktop Wallpaper</h2>
              <p className="text-xs text-cosmos-text-secondary font-mono">
                Select a high-resolution cyber preset or provide a custom image URL.
              </p>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 gap-4">
              {wallpaperPresets.map((preset) => {
                const isSelected = wallpaper === preset.id;
                return (
                  <GlassPanel
                    key={preset.id}
                    onClick={() => setWallpaper(preset.id)}
                    className={`cursor-pointer p-4 flex flex-col gap-3 transition-all duration-200 ${
                      isSelected
                        ? 'border-cosmos-lime/80 shadow-lime-glow ring-1 ring-cosmos-lime'
                        : 'hover:border-white/20'
                    }`}
                  >
                    <div
                      className={`h-24 w-full rounded-md bg-gradient-to-br ${preset.gradient} border relative overflow-hidden flex items-center justify-center bg-cover bg-center`}
                      style={preset.previewUrl ? { backgroundImage: `url(${preset.previewUrl})` } : {}}
                    >
                      {isSelected && (
                        <div className="bg-cosmos-lime text-black p-1.5 rounded-full shadow-lg z-10">
                          <Icons.Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-white">{preset.name}</span>
                      {isSelected && (
                        <span className="text-[10px] font-mono uppercase bg-cosmos-lime/20 text-cosmos-lime-bright px-2 py-0.5 rounded">
                          Active
                        </span>
                      )}
                    </div>
                  </GlassPanel>
                );
              })}
            </div>

            {/* Custom Image URL Form */}
            <GlassPanel className="p-4 flex flex-col gap-3">
              <label className="text-xs font-mono uppercase text-cosmos-text-muted">
                Custom Wallpaper Image URL
              </label>
              <form onSubmit={handleApplyCustomUrl} className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="flex-1 bg-black/50 border border-white/15 rounded-md px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cosmos-lime"
                />
                <button
                  type="submit"
                  className="bg-cosmos-lime text-black font-semibold text-xs px-4 py-2 rounded-md hover:bg-cosmos-lime-bright transition-colors"
                >
                  Apply URL
                </button>
              </form>
            </GlassPanel>
          </div>
        )}

        {activeTab === 'widgets' && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-display font-bold text-white mb-1">Desktop Widgets</h2>
                <p className="text-xs text-cosmos-text-secondary font-mono">
                  Toggle visibility for desktop widgets (Display & Theme Control, Network Telemetry, Global Node Clock, etc.)
                </p>
              </div>
              <button
                onClick={resetDefaultWidgets}
                className="px-3 py-1.5 rounded-md bg-white/10 text-xs font-mono text-white hover:bg-cosmos-lime hover:text-black transition-colors"
              >
                Reset Layout
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {availableWidgets.map((w) => {
                const activeWidget = widgets.find((item) => item.type === w.type);
                const isEnabled = activeWidget ? activeWidget.isVisible : false;
                const IconComp = (Icons as unknown as Record<string, React.FC<{ className?: string }>>)[w.icon] || Icons.Layout;

                return (
                  <GlassPanel key={w.type} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-black/40 text-cosmos-lime-bright">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white block">{w.name}</span>
                        <span className="text-xs text-cosmos-text-muted font-mono">{w.desc}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleWidgetType(w.type)}
                      className={`w-12 h-6 rounded-full transition-colors p-1 relative ${
                        isEnabled ? 'bg-cosmos-lime' : 'bg-white/10'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-black transition-transform ${
                          isEnabled ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </GlassPanel>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-display font-bold text-white mb-1">Appearance & Theme</h2>
              <p className="text-xs text-cosmos-text-secondary font-mono">
                Configure primary accent color and motion settings.
              </p>
            </div>

            {/* Accent Colors */}
            <GlassPanel className="p-4 flex flex-col gap-3">
              <span className="text-xs font-mono uppercase text-cosmos-text-muted">Accent Color</span>
              <div className="flex gap-3">
                {accentColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setAccentColor(color.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md border transition-all ${
                      accentColor === color.id
                        ? 'border-cosmos-lime bg-white/10 text-white'
                        : 'border-white/10 text-cosmos-text-secondary hover:border-white/20'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full ${color.class}`} />
                    <span className="text-xs font-mono">{color.name}</span>
                  </button>
                ))}
              </div>
            </GlassPanel>

            {/* Reduced Motion Toggle */}
            <GlassPanel className="p-4 flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-white block">Reduced Motion</span>
                <span className="text-xs text-cosmos-text-muted font-mono">
                  Disable spring animations for high accessibility
                </span>
              </div>
              <button
                onClick={toggleReducedMotion}
                className={`w-12 h-6 rounded-full transition-colors p-1 relative ${
                  reducedMotion ? 'bg-cosmos-lime' : 'bg-white/10'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-black transition-transform ${
                    reducedMotion ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </GlassPanel>
          </div>
        )}

        {activeTab === 'dock' && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-display font-bold text-white mb-1">Dock Preferences</h2>
              <p className="text-xs text-cosmos-text-secondary font-mono">
                Adjust dock sizing and auto-hide behaviors.
              </p>
            </div>

            {/* Dock Size Slider */}
            <GlassPanel className="p-4 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono uppercase text-cosmos-text-muted">Dock Icon Size</span>
                <span className="text-xs font-mono text-cosmos-lime-bright">{dockSize}px</span>
              </div>
              <input
                type="range"
                min={44}
                max={72}
                value={dockSize}
                onChange={(e) => setDockSize(Number(e.target.value))}
                className="w-full accent-cosmos-lime cursor-pointer"
              />
            </GlassPanel>

            {/* Auto-hide toggle */}
            <GlassPanel className="p-4 flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-white block">Automatically Hide Dock</span>
                <span className="text-xs text-cosmos-text-muted font-mono">
                  Reveal dock when cursor moves to screen bottom
                </span>
              </div>
              <button
                onClick={toggleDockAutohide}
                className={`w-12 h-6 rounded-full transition-colors p-1 relative ${
                  dockAutohide ? 'bg-cosmos-lime' : 'bg-white/10'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-black transition-transform ${
                    dockAutohide ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </GlassPanel>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="flex flex-col gap-4">
            <GlassPanel className="p-6 flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-cosmos-lime flex items-center justify-center text-black font-display font-extrabold text-2xl shadow-lime-glow">
                C
              </div>
              <h3 className="text-2xl font-display font-bold text-white">Cosmos OS</h3>
              <p className="text-xs font-mono text-cosmos-lime-bright">Version 1.0.0 (Cyber-Industrial Edition)</p>
              <p className="text-xs text-cosmos-text-secondary max-w-sm">
                Next-generation browser-based desktop operating system interface built with React 18, TypeScript, Tailwind CSS, and Framer Motion.
              </p>
            </GlassPanel>
          </div>
        )}
      </div>
    </div>
  );
};
