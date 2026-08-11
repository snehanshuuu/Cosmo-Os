import React, { useState } from 'react';
import { useSettingsStore } from '../../stores/settingsStore';
import { useNotificationStore } from '../../stores/notificationStore';
import { WallpaperPreset } from '../../types';
import { GlassPanel } from '../primitives/GlassPanel';
import * as Icons from 'lucide-react';

interface GalleryWallpaper {
  id: WallpaperPreset;
  title: string;
  category: string;
  color: string;
  previewUrl?: string;
}

export const GalleryApp: React.FC = () => {
  const { wallpaper, setWallpaper } = useSettingsStore();
  const { push: pushNotification } = useNotificationStore();
  const [customUrl, setCustomUrl] = useState('');

  const wallpapers: GalleryWallpaper[] = [
    {
      id: 'quantum-matrix',
      title: 'Quantum Data Matrix',
      category: 'Unreal Engine 5 Render',
      color: 'from-[#0d0e0f] via-[#1b1c1d] to-[#121314]',
      previewUrl: '/wallpapers/quantum_matrix.png',
    },
    {
      id: 'electric-grid',
      title: 'Electric Grid',
      category: 'Cyber Preset',
      color: 'from-[#0d0e0f] via-[#1b1c1d] to-[#121314]',
    },
    {
      id: 'deep-space',
      title: 'Deep Space',
      category: 'Cosmic Gradient',
      color: 'from-[#050608] via-[#0d0f14] to-[#151922]',
    },
    {
      id: 'nebula-flow',
      title: 'Nebula Flow',
      category: 'Space Aurora',
      color: 'from-[#0a0a0f] via-[#14121e] to-[#0d161a]',
    },
    {
      id: 'obsidian-void',
      title: 'Obsidian Void',
      category: 'Minimalist Dark',
      color: 'from-[#08090a] to-[#121314]',
    },
  ];

  const handleSelectWallpaper = (id: string, name: string) => {
    setWallpaper(id);
    pushNotification({
      title: 'Wallpaper Updated',
      message: `Desktop wallpaper changed to ${name}.`,
      type: 'success',
      duration: 3000,
    });
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim()) {
      setWallpaper(customUrl.trim());
      pushNotification({
        title: 'Custom Wallpaper Applied',
        message: 'Loaded custom image URL as desktop background.',
        type: 'success',
        duration: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-cosmos-bg/90 text-cosmos-text-primary p-6 select-none overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-display font-bold text-white">Media Gallery</h2>
          <p className="text-xs font-mono text-cosmos-text-secondary">
            Select any wallpaper below to apply it directly to your desktop.
          </p>
        </div>
      </div>

      {/* Wallpapers Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {wallpapers.map((img) => {
          const isActive = wallpaper === img.id;
          return (
            <div
              key={img.id}
              onClick={() => handleSelectWallpaper(img.id, img.title)}
              className={`group rounded-xl border overflow-hidden cursor-pointer transition-all duration-200 ${
                isActive
                  ? 'border-cosmos-lime/80 shadow-lime-glow ring-1 ring-cosmos-lime bg-black/60'
                  : 'border-white/10 bg-black/40 hover:border-cosmos-lime/50'
              }`}
            >
              {/* Preview Box */}
              <div
                className={`h-40 w-full bg-gradient-to-br ${img.color} relative flex items-center justify-center overflow-hidden bg-cover bg-center`}
                style={img.previewUrl ? { backgroundImage: `url(${img.previewUrl})` } : {}}
              >
                {!img.previewUrl && (
                  <Icons.Image
                    className={`w-8 h-8 transition-all ${
                      isActive
                        ? 'text-cosmos-lime-bright scale-110'
                        : 'text-white/40 group-hover:scale-110 group-hover:text-white'
                    }`}
                  />
                )}

                {isActive && (
                  <div className="absolute top-3 right-3 bg-cosmos-lime text-black px-2 py-0.5 rounded-full font-mono text-[10px] font-bold flex items-center gap-1 shadow-lg z-10">
                    <Icons.Check className="w-3 h-3 stroke-[3]" />
                    <span>Active</span>
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="p-3 flex justify-between items-center border-t border-white/5 bg-black/40">
                <div>
                  <span className="font-mono text-xs font-bold text-white block">{img.title}</span>
                  <span className="text-[10px] font-mono text-cosmos-text-muted">{img.category}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectWallpaper(img.id, img.title);
                  }}
                  className={`px-3 py-1 rounded text-xs font-mono font-semibold transition-all ${
                    isActive
                      ? 'bg-cosmos-lime text-black'
                      : 'bg-white/10 text-white hover:bg-cosmos-lime hover:text-black'
                  }`}
                >
                  {isActive ? 'Applied' : 'Set Wallpaper'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Image URL Form in Gallery */}
      <GlassPanel className="p-4 flex flex-col gap-3">
        <span className="text-xs font-mono uppercase text-cosmos-text-muted">
          Add Custom Image URL Wallpaper
        </span>
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
            Apply Wallpaper
          </button>
        </form>
      </GlassPanel>
    </div>
  );
};
