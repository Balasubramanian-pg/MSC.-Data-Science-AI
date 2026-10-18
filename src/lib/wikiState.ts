import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { allLessons, Lesson } from '../data/curriculumData';

const COMPLETED_KEY = 'msc_t2_completed_lessons';
const BOOKMARKS_KEY = 'msc_t2_bookmarks';
const POMO_KEY = 'msc_t2_pomo_state';
const THEME_KEY = 'msc_t2_theme';

export interface PomoState {
  status: 'idle' | 'running' | 'paused';
  remainingSeconds: number;
  totalSeconds: number;
  targetEndTime: number | null;
  mode: 'focus' | 'break';
}

export function useWikiState() {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light'; // Default to light matching user screenshot
  });

  // Completed lessons state
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(COMPLETED_KEY);
      return saved ? JSON.parse(saved) : ['ann-w01-1', 'ann-w01-2', 'cloud-w01-1', 'ml-w01-1'];
    } catch {
      return [];
    }
  });

  // Bookmarks state
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(BOOKMARKS_KEY);
      return saved ? JSON.parse(saved) : ['cloud-w07-1', 'ann-w08-1'];
    } catch {
      return [];
    }
  });

  // Resilient Pomodoro State
  const [pomoState, setPomoState] = useState<PomoState>(() => {
    try {
      const saved = localStorage.getItem(POMO_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.status === 'running' && parsed.targetEndTime) {
          const diff = Math.max(0, Math.floor((parsed.targetEndTime - Date.now()) / 1000));
          return {
            ...parsed,
            remainingSeconds: diff,
            status: diff > 0 ? 'running' : 'idle',
          };
        }
        return parsed;
      }
    } catch {}
    return {
      status: 'idle',
      remainingSeconds: 25 * 60,
      totalSeconds: 25 * 60,
      targetEndTime: null,
      mode: 'focus',
    };
  });

  // Navigation state
  const [activeTab, setActiveTab] = useState<string>('docs');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Apply theme to html root
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Sync completed lessons to localStorage
  useEffect(() => {
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(completedLessonIds));
  }, [completedLessonIds]);

  // Sync bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  // Timer loop for resilient Pomodoro
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (pomoState.status === 'running' && pomoState.targetEndTime) {
      interval = setInterval(() => {
        const diff = Math.max(0, Math.floor((pomoState.targetEndTime! - Date.now()) / 1000));
        if (diff <= 0) {
          setPomoState((prev) => ({
            ...prev,
            status: 'idle',
            remainingSeconds: prev.mode === 'focus' ? 5 * 60 : 25 * 60,
            mode: prev.mode === 'focus' ? 'break' : 'focus',
            targetEndTime: null,
          }));
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } else {
          setPomoState((prev) => ({
            ...prev,
            remainingSeconds: diff,
          }));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [pomoState.status, pomoState.targetEndTime]);

  // Actions
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleComplete = (lessonId: string) => {
    const isCompleted = completedLessonIds.includes(lessonId);
    if (!isCompleted) {
      setCompletedLessonIds((prev) => [...prev, lessonId]);
      // Trigger festive celebration
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#34D399', '#906BFF', '#F87171'],
      });
    } else {
      setCompletedLessonIds((prev) => prev.filter((id) => id !== lessonId));
    }
  };

  const toggleBookmark = (lessonId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  const startPomodoro = () => {
    const targetEnd = Date.now() + pomoState.remainingSeconds * 1000;
    const nextState: PomoState = {
      ...pomoState,
      status: 'running',
      targetEndTime: targetEnd,
    };
    setPomoState(nextState);
    localStorage.setItem(POMO_KEY, JSON.stringify(nextState));
  };

  const pausePomodoro = () => {
    const nextState: PomoState = {
      ...pomoState,
      status: 'paused',
      targetEndTime: null,
    };
    setPomoState(nextState);
    localStorage.setItem(POMO_KEY, JSON.stringify(nextState));
  };

  const resetPomodoro = () => {
    const defaultSecs = 25 * 60;
    const nextState: PomoState = {
      status: 'idle',
      remainingSeconds: defaultSecs,
      totalSeconds: defaultSecs,
      targetEndTime: null,
      mode: 'focus',
    };
    setPomoState(nextState);
    localStorage.setItem(POMO_KEY, JSON.stringify(nextState));
  };

  const openLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setActiveTab('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeLesson = () => {
    setActiveLessonId(null);
    setActiveTab('docs');
  };

  return {
    theme,
    toggleTheme,
    completedLessonIds,
    toggleComplete,
    bookmarkedIds,
    toggleBookmark,
    pomoState,
    startPomodoro,
    pausePomodoro,
    resetPomodoro,
    activeTab,
    setActiveTab,
    selectedSubjectId,
    setSelectedSubjectId,
    activeLessonId,
    setActiveLessonId,
    openLesson,
    closeLesson,
    searchQuery,
    setSearchQuery,
    isSearchOpen,
    setIsSearchOpen,
  };
}
