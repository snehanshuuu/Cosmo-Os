import React, { useRef, useEffect } from 'react';
import { useMusicStore } from '../../stores/musicStore';
import * as Icons from 'lucide-react';

export const MusicPlayerApp: React.FC = () => {
  const {
    playlist,
    currentTrackId,
    isPlaying,
    currentTime,
    volume,
    isShuffle,
    isRepeat,
    togglePlay,
    nextTrack,
    prevTrack,
    setVolume,
    setCurrentTime,
    toggleShuffle,
    toggleRepeat,
    playTrack,
    addTracks,
  } = useMusicStore();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentTrack = playlist.find((t) => t.id === currentTrackId) || playlist[0];

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;
    audio.src = currentTrack.src;
    audio.volume = volume;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        nextTrack();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackId]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.play().catch(() => {});
      else audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setCurrentTime(time);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addTracks(e.target.files);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full w-full bg-cosmos-bg/95 p-5 text-cosmos-text-primary select-none overflow-y-auto">
      {/* Hidden File Input for MP3 / MP4 upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="audio/*,video/*"
        multiple
        className="hidden"
      />

      {/* Header with Upload Button */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-cosmos-lime-bright bg-cosmos-lime/10 px-2 py-0.5 rounded border border-cosmos-lime/20">
          AUDIO PLAYER
        </span>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 text-xs font-mono text-white hover:bg-cosmos-lime hover:text-black transition-colors"
          title="Upload local MP3 or MP4"
        >
          <Icons.Upload className="w-3.5 h-3.5" />
          <span>Upload Audio</span>
        </button>
      </div>

      {/* Rotating CD Visualizer */}
      <div className="flex flex-col items-center justify-center my-2">
        <div className="relative">
          <div
            className={`w-28 h-28 rounded-full border-4 border-white/20 bg-gradient-to-tr from-cosmos-surface-bright to-black flex items-center justify-center shadow-lime-glow transition-all ${
              isPlaying ? 'animate-[spin_8s_linear_infinite]' : ''
            }`}
          >
            <div className="w-8 h-8 rounded-full border-2 border-white/40 bg-cosmos-bg flex items-center justify-center">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  isPlaying ? 'bg-cosmos-lime shadow-lime-glow' : 'bg-white/40'
                }`}
              />
            </div>
          </div>
        </div>

        <h3 className="text-base font-display font-bold text-white mt-3 truncate max-w-full">
          {currentTrack.title}
        </h3>
        <p className="text-xs font-mono text-cosmos-text-secondary truncate max-w-full mb-2">
          {currentTrack.artist} • {currentTrack.album}
        </p>

        {/* 8-Bar Dynamic Neon Equalizer Visualizer Underneath Track Title */}
        <div className="flex items-end justify-center gap-1.5 h-7 w-48 my-1 overflow-hidden bg-black/50 rounded-lg p-1 border border-white/10">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((barNum) => (
            <div
              key={barNum}
              className={`w-2 rounded-t transition-all ${
                isPlaying
                  ? `bg-gradient-to-t from-[#7CFF00] to-[#00E5FF] shadow-[0_0_10px_#00E5FF] animate-eq-bar-${barNum}`
                  : 'h-1 bg-white/20 opacity-30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Seek Progress Bar */}
      <div className="w-full flex flex-col gap-1 mb-3">
        <input
          type="range"
          min={0}
          max={currentTrack.duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full accent-cosmos-lime cursor-pointer h-1.5"
        />
        <div className="flex justify-between text-[10px] font-mono text-cosmos-text-muted">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(currentTrack.duration)}</span>
        </div>
      </div>

      {/* Playback Control Buttons */}
      <div className="flex items-center justify-between mb-4 px-4">
        <button
          onClick={toggleShuffle}
          className={`p-1.5 rounded transition-colors ${
            isShuffle ? 'text-cosmos-lime-bright bg-cosmos-lime/20' : 'text-cosmos-text-muted hover:text-white'
          }`}
          title="Shuffle"
        >
          <Icons.Shuffle className="w-4 h-4" />
        </button>

        <button onClick={prevTrack} className="text-cosmos-text-muted hover:text-white transition-colors">
          <Icons.SkipBack className="w-5 h-5" />
        </button>

        <button
          onClick={togglePlay}
          className="w-11 h-11 rounded-full bg-cosmos-lime text-black flex items-center justify-center shadow-lime-glow hover:bg-cosmos-lime-bright transition-all"
        >
          {isPlaying ? (
            <Icons.Pause className="w-5 h-5 fill-black" />
          ) : (
            <Icons.Play className="w-5 h-5 fill-black translate-x-0.5" />
          )}
        </button>

        <button onClick={nextTrack} className="text-cosmos-text-muted hover:text-white transition-colors">
          <Icons.SkipForward className="w-5 h-5" />
        </button>

        <button
          onClick={toggleRepeat}
          className={`p-1.5 rounded transition-colors ${
            isRepeat ? 'text-cosmos-lime-bright bg-cosmos-lime/20' : 'text-cosmos-text-muted hover:text-white'
          }`}
          title="Repeat"
        >
          <Icons.Repeat className="w-4 h-4" />
        </button>
      </div>

      {/* Volume Slider */}
      <div className="flex items-center gap-2 mb-4 px-2">
        <Icons.Volume2 className="w-4 h-4 text-cosmos-text-muted" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full accent-cosmos-lime cursor-pointer h-1"
        />
      </div>

      {/* Playlist Section */}
      <div className="flex-1 border-t border-white/10 pt-3">
        <span className="text-[11px] font-mono uppercase text-cosmos-text-muted block mb-2">Playlist</span>
        <div className="flex flex-col gap-1 max-h-32 overflow-y-auto">
          {playlist.map((track) => {
            const isSelected = track.id === currentTrackId;
            return (
              <div
                key={track.id}
                onClick={() => playTrack(track.id)}
                className={`p-2 rounded flex items-center justify-between cursor-pointer text-xs font-mono transition-colors ${
                  isSelected
                    ? 'bg-cosmos-lime/20 text-cosmos-lime-bright font-bold'
                    : 'hover:bg-white/5 text-cosmos-text-secondary'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {isSelected && <Icons.Music className="w-3.5 h-3.5 animate-pulse" />}
                  <span className="truncate">{track.title}</span>
                </div>
                <span className="text-[10px] text-cosmos-text-muted">{formatTime(track.duration)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
