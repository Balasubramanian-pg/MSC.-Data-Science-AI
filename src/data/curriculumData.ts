// Auto-generated curriculum data for Trimester 2
import curriculumJson from './curriculumData.json';
import searchIndexJson from './searchIndex.json';

export interface Lesson {
  id: string;
  title: string;
  subjectId: string;
  subjectTitle: string;
  weekId: string;
  weekTitle: string;
  rawPath: string;
  summary: string;
  readingTime: string;
  words: number;
  size: number;
  content: string;
}

export interface Week {
  id: string;
  weekNum: number;
  title: string;
  lessons: Lesson[];
}

export interface Subject {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  color: string;
  badge: string;
  totalLessons: number;
  weeks: Week[];
}

export interface SearchItem {
  id: string;
  title: string;
  subjectId: string;
  subjectTitle: string;
  weekTitle: string;
  summary: string;
  readingTime: string;
}

export const curriculumData: Subject[] = curriculumJson as Subject[];
export const searchIndex: SearchItem[] = searchIndexJson as SearchItem[];

export const allLessons: Lesson[] = curriculumData.flatMap(s => 
  s.weeks.flatMap(w => w.lessons)
);

export function getLessonById(id: string): Lesson | undefined {
  return allLessons.find(l => l.id === id);
}

export function getSubjectById(id: string): Subject | undefined {
  return curriculumData.find(s => s.id === id);
}
