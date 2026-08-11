import React from 'react';
import { useMusicStore } from '../stores/musicStore';
import * as Icons from 'lucide-react';

export const MusicWidget: React.FC = () => {
  const { playlist, currentTrackId, isPlaying, currentTime, setCurrentTime, togglePlay, nextTrack } = useMusicStore();
  const currentTrack = playlist.find((t) => t.id === currentTrackId) || playlist[0];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = currentTrack.duration > 0 ? Math.min((currentTime / currentTrack.duration) * 100, 100) : 0;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-2 w-48 font-mono text-xs select-none"
    >
      <div className="flex justify-between items-center text-[10px] text-cosmos-text-muted border-b border-white/10 pb-1">
        <span className="uppercase tracking-wider font-bold text-white">MINI PLAYER</span>
        {isPlaying && (
          <span className="text-[9px] font-bold text-[#00E5FF] uppercase tracking-wider animate-pulse">
            PLAYING
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full border border-white/20 bg-black flex items-center justify-center relative shadow-md ${
            isPlaying ? 'animate-[spin_6s_linear_infinite]' : ''
          }`}
        >
          <Icons.Music className="w-4 h-4 text-cosmos-lime-bright" />
          <div className="absolute inset-0 rounded-full border border-[#00E5FF]/30 pointer-events-none" />
        </div>
        <div className="flex-1 truncate">
          <span className="font-bold text-white block truncate text-[11px]">{currentTrack.title}</span>
          <span className="text-[10px] text-cosmos-text-muted truncate block">{currentTrack.artist}</span>
        </div>
      </div>

      {/* Seek Progress Bar */}
      <div className="w-full flex flex-col gap-0.5 px-0.5">
        <div
          className="w-full h-1.5 bg-black/60 rounded-full border border-white/10 overflow-hidden cursor-pointer relative"
          onClick={(e) => {
            e.stopPropagation();
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newTime = (clickX / rect.width) * currentTrack.duration;
            setCurrentTime(newTime);
          }}
        >
          <div
            className="h-full bg-gradient-to-r from-cosmos-lime to-[#00E5FF] transition-all duration-200"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-[9px] font-mono text-cosmos-text-muted">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(currentTrack.duration)}</span>
        </div>
      </div>

      {/* 8-Bar Dynamic Neon Equalizer Visualizer */}
      <div className="flex items-end justify-center gap-1.5 h-5 w-full py-1 overflow-hidden bg-black/40 rounded border border-white/5">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((barNum) => (
          <div
            key={barNum}
            className={`w-1.5 rounded-t transition-all ${
              isPlaying
                ? `bg-gradient-to-t from-[#7CFF00] to-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-eq-bar-${barNum}`
                : 'h-1 bg-white/20 opacity-30'
            }`}
          />
        ))}
      </div>

      {/* Playback Controls */}
      <div className="flex justify-end items-center gap-2 pt-1 border-t border-white/5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="p-1.5 rounded-md bg-cosmos-lime text-black hover:bg-cosmos-lime-bright transition-colors shadow-lime-glow flex items-center justify-center"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Icons.Pause className="w-3.5 h-3.5 fill-black" /> : <Icons.Play className="w-3.5 h-3.5 fill-black translate-x-0.5" />}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextTrack();
          }}
          className="p-1.5 rounded-md bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
          title="Next Track"
        >
          <Icons.SkipForward className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
