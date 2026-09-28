// LocalStorage State Management Utility for UPPRPB Master
import { ErrorNote, RunningLogEntry, Question } from '../types';

const STORAGE_KEYS = {
  LANGUAGE: 'upprpb_lang',
  THEME: 'upprpb_theme',
  BOOKMARKS: 'upprpb_bookmarks',
  ERROR_NOTES: 'upprpb_errors',
  FLASHCARDS_STATE: 'upprpb_flashcards',
  RUNNING_LOGS: 'upprpb_running_logs',
  MOCK_RESULTS: 'upprpb_mock_results',
  PLANNER_CONFIG: 'upprpb_planner'
};

export const getStoredTheme = (): 'dark' | 'light' => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === 'dark' || saved === 'light') return saved;
    // Default to dark for police navy theme, unless user system preference is explicitly light
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  } catch {
    // fallback
  }
  return 'dark';
};

export const setStoredTheme = (theme: 'dark' | 'light') => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch {
    // ignore
  }
};

export const getStoredLanguage = (): 'hi' | 'en' => {
  const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
  return (saved === 'en' || saved === 'hi') ? saved : 'hi';
};

export const setStoredLanguage = (lang: 'hi' | 'en') => {
  localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
};

export const getBookmarkedIds = (): string[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const toggleBookmark = (questionId: string): boolean => {
  const current = getBookmarkedIds();
  let updated: string[];
  let isBookmarked = false;
  if (current.includes(questionId)) {
    updated = current.filter(id => id !== questionId);
  } else {
    updated = [...current, questionId];
    isBookmarked = true;
  }
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
  return isBookmarked;
};

export const getErrorNotes = (): ErrorNote[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ERROR_NOTES);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveErrorNote = (question: Question, selectedAnswer: number) => {
  const current = getErrorNotes();
  const existingIndex = current.findIndex(e => e.questionId === question.id);
  const note: ErrorNote = {
    questionId: question.id,
    question,
    selectedAnswer,
    timestamp: Date.now(),
    status: 'unresolved'
  };
  if (existingIndex >= 0) {
    current[existingIndex] = note;
  } else {
    current.unshift(note);
  }
  localStorage.setItem(STORAGE_KEYS.ERROR_NOTES, JSON.stringify(current.slice(0, 300)));
};

export const removeErrorNote = (questionId: string) => {
  const current = getErrorNotes().filter(e => e.questionId !== questionId);
  localStorage.setItem(STORAGE_KEYS.ERROR_NOTES, JSON.stringify(current));
};

export const getRunningLogs = (): RunningLogEntry[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RUNNING_LOGS);
    if (data) return JSON.parse(data);
    // Initial sample entry for motivation
    const initial: RunningLogEntry[] = [
      {
        id: 'run-init-1',
        date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
        distanceKm: 3.5,
        timeSeconds: 1260, // 21 min
        paceMinPerKm: 6.0,
        notes: 'Track lap training, moderate effort',
        targetMet: true
      },
      {
        id: 'run-init-2',
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        distanceKm: 4.8,
        timeSeconds: 1560, // 26 min
        paceMinPerKm: 5.4,
        notes: 'Constable distance test, good breathing cadence',
        targetMet: true
      }
    ];
    localStorage.setItem(STORAGE_KEYS.RUNNING_LOGS, JSON.stringify(initial));
    return initial;
  } catch {
    return [];
  }
};

export const addRunningLog = (entry: Omit<RunningLogEntry, 'id'>) => {
  const current = getRunningLogs();
  const newEntry: RunningLogEntry = {
    ...entry,
    id: `run-${Date.now()}`
  };
  current.unshift(newEntry);
  localStorage.setItem(STORAGE_KEYS.RUNNING_LOGS, JSON.stringify(current));
  return current;
};

export const getFlashcardsState = (): Record<string, 'known' | 'learning' | 'review_later'> => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FLASHCARDS_STATE);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

export const setFlashcardStatus = (id: string, status: 'known' | 'learning' | 'review_later') => {
  const current = getFlashcardsState();
  current[id] = status;
  localStorage.setItem(STORAGE_KEYS.FLASHCARDS_STATE, JSON.stringify(current));
};
