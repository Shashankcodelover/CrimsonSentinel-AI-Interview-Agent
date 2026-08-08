const PREFS_KEY = "crimson-sentinel-prefs";
const NOTES_KEY = "crimson-sentinel-notes";
const BOOKMARKS_KEY = "crimson-sentinel-bookmarks";

export type UiPrefs = {
  focusMode: boolean;
  reduceMotion: boolean;
};

const defaultPrefs: UiPrefs = { focusMode: false, reduceMotion: false };

export function loadPrefs(): UiPrefs {
  if (typeof window === "undefined") return defaultPrefs;
  try {
    const raw = sessionStorage.getItem(PREFS_KEY);
    if (!raw) return defaultPrefs;
    return { ...defaultPrefs, ...(JSON.parse(raw) as Partial<UiPrefs>) };
  } catch {
    return defaultPrefs;
  }
}

export function savePrefs(prefs: UiPrefs): void {
  sessionStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  document.documentElement.dataset.reduceMotion = prefs.reduceMotion
    ? "true"
    : "false";
  document.documentElement.dataset.focusMode = prefs.focusMode ? "true" : "false";
}

export function loadNotes(sessionId: string): string {
  try {
    const raw = sessionStorage.getItem(`${NOTES_KEY}:${sessionId}`);
    return raw ?? "";
  } catch {
    return "";
  }
}

export function saveNotes(sessionId: string, notes: string): void {
  sessionStorage.setItem(`${NOTES_KEY}:${sessionId}`, notes);
}

export function loadBookmarks(sessionId: string): number[] {
  try {
    const raw = sessionStorage.getItem(`${BOOKMARKS_KEY}:${sessionId}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as number[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveBookmarks(sessionId: string, indexes: number[]): void {
  sessionStorage.setItem(`${BOOKMARKS_KEY}:${sessionId}`, JSON.stringify(indexes));
}

export function toggleBookmark(sessionId: string, index: number): number[] {
  const cur = loadBookmarks(sessionId);
  const next = cur.includes(index)
    ? cur.filter((i) => i !== index)
    : [...cur, index].sort((a, b) => a - b);
  saveBookmarks(sessionId, next);
  return next;
}

export function sessionStorageHealthy(): boolean {
  try {
    const k = "__crimson_probe__";
    sessionStorage.setItem(k, "1");
    sessionStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}
