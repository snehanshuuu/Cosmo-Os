import { create } from 'zustand';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  src: string; // URL or object URL
  isCustom?: boolean;
}

const DEFAULT_TRACKS: Track[] = [
  {
    id: 'track-1',
    title: 'Cybernetic Horizons',
    artist: 'Cosmos Soundscape',
    album: 'Deep Space OST',
    duration: 215,
    src: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=cyberpunk-2099-10701.mp3',
  },
  {
    id: 'track-2',
    title: 'Neon Circuitry',
    artist: 'Synthetix',
    album: 'Obsidian Void',
    duration: 184,
    src: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio-[#c8c502b4d9].mp3?filename=synthwave-80s-110045.mp3',
  },
  {
    id: 'track-3',
    title: 'Quantum Drift',
    artist: 'Aether Wave',
    album: 'Pulse Protocol',
    duration: 240,
    src: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=ambient-space-10901.mp3',
  },
];

interface MusicStore {
  playlist: Track[];
  currentTrackId: string;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  isShuffle: boolean;
  isRepeat: boolean;

  playTrack: (id?: string) => void;
  pauseTrack: () => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: (vol: number) => void;
  setCurrentTime: (time: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  addTracks: (files: FileList) => void;
}

export const useMusicStore = create<MusicStore>((set, get) => ({
  playlist: DEFAULT_TRACKS,
  currentTrackId: DEFAULT_TRACKS[0].id,
  isPlaying: false,
  currentTime: 0,
  volume: 0.7,
  isShuffle: false,
  isRepeat: false,

  playTrack: (id?: string) => {
    if (id) {
      set({ currentTrackId: id, isPlaying: true, currentTime: 0 });
    } else {
      set({ isPlaying: true });
    }
  },

  pauseTrack: () => set({ isPlaying: false }),

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

  nextTrack: () => {
    const { playlist, currentTrackId, isShuffle } = get();
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      set({ currentTrackId: playlist[randomIndex].id, currentTime: 0 });
    } else {
      const currentIndex = playlist.findIndex((t) => t.id === currentTrackId);
      const nextIndex = (currentIndex + 1) % playlist.length;
      set({ currentTrackId: playlist[nextIndex].id, currentTime: 0 });
    }
  },

  prevTrack: () => {
    const { playlist, currentTrackId } = get();
    const currentIndex = playlist.findIndex((t) => t.id === currentTrackId);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    set({ currentTrackId: playlist[prevIndex].id, currentTime: 0 });
  },

  setVolume: (volume: number) => set({ volume }),

  setCurrentTime: (currentTime: number) => set({ currentTime }),

  toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),

  toggleRepeat: () => set((state) => ({ isRepeat: !state.isRepeat })),

  addTracks: (files: FileList) => {
    const newTracks: Track[] = Array.from(files).map((file, idx) => ({
      id: `custom-track-${Date.now()}-${idx}`,
      title: file.name.replace(/\.[^/.]+$/, ''),
      artist: 'Local Media Upload',
      album: 'Uploaded Tracks',
      duration: 180,
      src: URL.createObjectURL(file),
      isCustom: true,
    }));

    set((state) => ({
      playlist: [...state.playlist, ...newTracks],
      currentTrackId: newTracks[0].id,
      isPlaying: true,
      currentTime: 0,
    }));
  },
}));
