// VibeWQuest-BE API Client (docs/Backend.md)

export const API_BASE = 'https://vibewquest-be.onrender.com/api/v1';
export const STUDENT_ID_KEY = 'cosmos_notes_studentId';

export interface InitResponse {
  studentId: string;
  apiUrl: string;
}

export interface DocumentsResponse<T> {
  documents: (T & { id: string })[];
}

export interface PostResponse {
  success: boolean;
  message: string;
  documentId: string;
}

/**
 * Ensures studentId exists in localStorage or fetches a new one from GET /init
 */
export async function getOrInitStudentId(): Promise<string> {
  try {
    const saved = localStorage.getItem(STUDENT_ID_KEY);
    if (saved) return saved;

    const res = await fetch(`${API_BASE}/init`);
    if (!res.ok) throw new Error(`Init failed with status ${res.status}`);
    const data: InitResponse = await res.json();
    if (data.studentId) {
      localStorage.setItem(STUDENT_ID_KEY, data.studentId);
      return data.studentId;
    }
  } catch (e) {
    console.warn('API Init error, falling back to local generated studentId', e);
  }
  
  const fallbackId = `local-${Math.random().toString(36).substr(2, 8)}`;
  localStorage.setItem(STUDENT_ID_KEY, fallbackId);
  return fallbackId;
}

/**
 * GET /:studentId/:collection
 */
export async function fetchCollection<T>(studentId: string, collection: string): Promise<(T & { id: string })[]> {
  try {
    const res = await fetch(`${API_BASE}/${studentId}/${collection}`);
    if (!res.ok) return [];
    const data: DocumentsResponse<T> = await res.json();
    return data.documents || [];
  } catch (e) {
    console.warn(`Failed to fetch collection ${collection}`, e);
    return [];
  }
}

/**
 * POST /:studentId/:collection
 */
export async function createDocument<T extends object>(studentId: string, collection: string, payload: T): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE}/${studentId}/${collection}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return null;
    const data: PostResponse = await res.json();
    return data.documentId || null;
  } catch (e) {
    console.warn(`Failed to create document in ${collection}`, e);
    return null;
  }
}

/**
 * PUT /:studentId/:collection/:documentId
 */
export async function updateDocument<T extends object>(studentId: string, collection: string, documentId: string, payload: T): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/${studentId}/${collection}/${documentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch (e) {
    console.warn(`Failed to update document ${documentId}`, e);
    return false;
  }
}

/**
 * DELETE /:studentId/:collection/:documentId
 */
export async function deleteDocument(studentId: string, collection: string, documentId: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/${studentId}/${collection}/${documentId}`, {
      method: 'DELETE',
    });
    return res.ok;
  } catch (e) {
    console.warn(`Failed to delete document ${documentId}`, e);
    return false;
  }
}
