import { create } from 'zustand';
import {
  getOrInitStudentId,
  fetchCollection,
  createDocument,
  updateDocument,
  deleteDocument,
} from '../lib/api';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  isTemp?: boolean;
  isSaving?: boolean;
}

const LOCAL_STORAGE_KEY = 'cosmos_os_notes';

interface NotesStore {
  studentId: string | null;
  notes: Note[];
  activeNoteId: string | null;
  isLoading: boolean;
  isCloudSynced: boolean;

  initNotesStore: () => Promise<void>;
  setActiveNoteId: (id: string) => void;
  createNote: () => Promise<void>;
  updateNoteLocal: (id: string, title: string, content: string) => void;
  saveNoteCloud: (id: string) => Promise<boolean>;
  deleteNote: (id: string) => Promise<void>;
}

export const useNotesStore = create<NotesStore>((set, get) => ({
  studentId: null,
  notes: [],
  activeNoteId: null,
  isLoading: true,
  isCloudSynced: false,

  initNotesStore: async () => {
    set({ isLoading: true });
    // Step 1: Get or initialize studentId
    const sid = await getOrInitStudentId();
    set({ studentId: sid });

    // Step 2: Fetch notes collection from cloud API
    const docs = await fetchCollection<{ title?: string; content?: string; createdAt?: number; updatedAt?: number }>(
      sid,
      'notes'
    );

    if (docs && docs.length > 0) {
      const fetchedNotes: Note[] = docs.map((doc) => ({
        id: doc.id,
        title: doc.title || 'Untitled Note',
        content: doc.content || '',
        createdAt: doc.createdAt || Date.now(),
        updatedAt: doc.updatedAt || Date.now(),
        isTemp: false,
      }));
      set({
        notes: fetchedNotes,
        activeNoteId: fetchedNotes[0].id,
        isLoading: false,
        isCloudSynced: true,
      });
      saveToLocalStorage(fetchedNotes);
    } else {
      // Fallback to local storage if cloud is empty
      const local = loadFromLocalStorage();
      set({
        notes: local,
        activeNoteId: local[0]?.id || null,
        isLoading: false,
        isCloudSynced: true,
      });
    }
  },

  setActiveNoteId: (id: string) => set({ activeNoteId: id }),

  // Step 3: Optimistic UI creation (POST)
  createNote: async () => {
    const { studentId, notes } = get();
    const tempId = `temp-${Date.now()}`;
    const newNote: Note = {
      id: tempId,
      title: 'Untitled Note',
      content: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isTemp: true,
    };

    // Instant local state update
    const updated = [newNote, ...notes];
    set({ notes: updated, activeNoteId: tempId });
    saveToLocalStorage(updated);

    // Asynchronous backend POST
    if (studentId) {
      const documentId = await createDocument(studentId, 'notes', {
        title: newNote.title,
        content: newNote.content,
        createdAt: newNote.createdAt,
        updatedAt: newNote.updatedAt,
      });

      if (documentId) {
        // Swap temp ID with real Firestore documentId
        const synced = get().notes.map((n) =>
          n.id === tempId ? { ...n, id: documentId, isTemp: false } : n
        );
        const currentActive = get().activeNoteId === tempId ? documentId : get().activeNoteId;
        set({ notes: synced, activeNoteId: currentActive });
        saveToLocalStorage(synced);
      }
    }
  },

  // Real-time local state edit
  updateNoteLocal: (id: string, title: string, content: string) => {
    const updated = get().notes.map((n) =>
      n.id === id ? { ...n, title, content, updatedAt: Date.now() } : n
    );
    set({ notes: updated });
    saveToLocalStorage(updated);
  },

  // Manual Save (PUT)
  saveNoteCloud: async (id: string) => {
    const { studentId, notes } = get();
    const target = notes.find((n) => n.id === id);
    if (!target || target.isTemp || !studentId) return false;

    // Set saving flag
    set({
      notes: notes.map((n) => (n.id === id ? { ...n, isSaving: true } : n)),
    });

    const success = await updateDocument(studentId, 'notes', id, {
      title: target.title,
      content: target.content,
      updatedAt: Date.now(),
    });

    set({
      notes: get().notes.map((n) => (n.id === id ? { ...n, isSaving: false } : n)),
    });

    return success;
  },

  // Optimistic Deletions (DELETE)
  deleteNote: async (id: string) => {
    const { studentId, notes, activeNoteId } = get();
    const target = notes.find((n) => n.id === id);
    const remaining = notes.filter((n) => n.id !== id);
    const nextActive = activeNoteId === id ? (remaining[0]?.id || null) : activeNoteId;

    // Instant local UI feedback
    set({ notes: remaining, activeNoteId: nextActive });
    saveToLocalStorage(remaining);

    // Asynchronous backend DELETE
    if (studentId && target && !target.isTemp) {
      await deleteDocument(studentId, 'notes', id);
    }
  },
}));

function saveToLocalStorage(notes: Note[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
  } catch (e) {
    console.warn('Failed to save notes to localStorage', e);
  }
}

function loadFromLocalStorage(): Note[] {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Failed to load notes from localStorage', e);
  }
  return [
    {
      id: 'default-1',
      title: 'Cosmos OS Cloud Sync',
      content: `# Cloud Synced with VibeWQuest-BE\n\nConnected to Firestore backend via studentId. Notes create optimistically and sync to cloud.`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];
}
