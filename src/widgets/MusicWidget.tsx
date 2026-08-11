import React from 'react';
import { useMusicStore } from '../stores/musicStore';
import * as Icons from 'lucide-react';

export const MusicWidget: React.FC = () => {
  const { playlist, currentTrackId, isPlaying, togglePlay, nextTrack } = useMusicStore();
  const currentTrack = playlist.find((t) => t.id === currentTrackId) || playlist[0];

  return (
    <div className="flex flex-col gap-2 w-48 font-mono text-xs">
      <div className="flex justify-between items-center text-[10px] text-cosmos-text-muted border-b border-white/10 pb-1">
        <span className="uppercase tracking-wider">MINI PLAYER</span>
      </div>
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-full border border-white/20 bg-black flex items-center justify-center ${
            isPlaying ? 'animate-spin' : ''
          }`}
        >
          <Icons.Music className="w-4 h-4 text-cosmos-lime-bright" />
        </div>
        <div className="flex-1 truncate">
          <span className="font-bold text-white block truncate">{currentTrack.title}</span>
          <span className="text-[10px] text-cosmos-text-muted truncate block">{currentTrack.artist}</span>
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-1 border-t border-white/5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="p-1 rounded bg-cosmos-lime text-black hover:bg-cosmos-lime-bright"
        >
          {isPlaying ? <Icons.Pause className="w-3.5 h-3.5" /> : <Icons.Play className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextTrack();
          }}
          className="p-1 rounded bg-white/10 text-white hover:bg-white/20"
        >
          <Icons.SkipForward className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
