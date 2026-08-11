import React, { useEffect, useRef } from 'react';
import { useMusicStore } from '../../stores/musicStore';

export const GlobalAudioPlayer: React.FC = () => {
  const {
    playlist,
    currentTrackId,
    isPlaying,
    volume,
    isRepeat,
    setCurrentTime,
    nextTrack,
  } = useMusicStore();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = playlist.find((t) => t.id === currentTrackId) || playlist[0];

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;
    if (audio.src !== currentTrack.src) {
      audio.src = currentTrack.src;
    }
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

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackId]);

  // Handle Play / Pause state
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.warn('Global Audio playback interrupted:', err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackId]);

  // Handle Volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return null;
};
