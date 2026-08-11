import { create } from 'zustand';

export interface CalendarEvent {
  id: string;
  title: string;
  dateStr: string; // YYYY-MM-DD
  timeStr: string; // HH:MM AM/PM
  category: 'work' | 'personal' | 'quest' | 'reminder';
}

const LOCAL_STORAGE_KEY = 'cosmos_os_calendar_events';

const now = new Date();
const todayStr = now.toISOString().split('T')[0];

const DEFAULT_EVENTS: CalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'Cosmos OS Architecture Review',
    dateStr: todayStr,
    timeStr: '10:00 AM',
    category: 'work',
  },
  {
    id: 'evt-2',
    title: 'Quest IT Technology Demo',
    dateStr: todayStr,
    timeStr: '02:30 PM',
    category: 'quest',
  },
  {
    id: 'evt-3',
    title: 'UI/UX Glassmorphism Sprint',
    dateStr: todayStr,
    timeStr: '05:00 PM',
    category: 'personal',
  },
];

const loadEvents = (): CalendarEvent[] => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Failed to load calendar events from localStorage', e);
  }
  return DEFAULT_EVENTS;
};

interface CalendarStore {
  events: CalendarEvent[];
  selectedDateStr: string;
  setSelectedDateStr: (dateStr: string) => void;
  addEvent: (title: string, dateStr: string, timeStr: string, category: CalendarEvent['category']) => void;
  deleteEvent: (id: string) => void;
}

export const useCalendarStore = create<CalendarStore>((set, get) => ({
  events: loadEvents(),
  selectedDateStr: todayStr,

  setSelectedDateStr: (dateStr: string) => set({ selectedDateStr: dateStr }),

  addEvent: (title, dateStr, timeStr, category) => {
    const newEvt: CalendarEvent = {
      id: `evt-${Date.now()}`,
      title,
      dateStr,
      timeStr,
      category,
    };
    const updated = [newEvt, ...get().events];
    set({ events: updated, selectedDateStr: dateStr });
    saveEvents(updated);
  },

  deleteEvent: (id: string) => {
    const updated = get().events.filter((e) => e.id !== id);
    set({ events: updated });
    saveEvents(updated);
  },
}));

function saveEvents(events: CalendarEvent[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
  } catch (e) {
    console.warn('Failed to save calendar events to localStorage', e);
  }
}
