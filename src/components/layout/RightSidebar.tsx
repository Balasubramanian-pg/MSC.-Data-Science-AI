import React, { useState } from 'react';
import {
  Bookmark,
  Edit3,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  BookOpen,
} from 'lucide-react';
import { allLessons, Lesson } from '../../data/curriculumData';

interface RightSidebarProps {
  onOpenLesson: (lessonId: string) => void;
  bookmarkedIds: string[];
  completedLessonIds: string[];
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  onOpenLesson,
  bookmarkedIds,
  completedLessonIds,
  isCollapsed,
  onToggleCollapse,
}) => {
  const [filterMode, setFilterMode] = useState<'highYield' | 'bookmarks'>('highYield');

  // Curate 6 top high-yield / sprint archive lessons from the real curriculum
  const highYieldLessons: Lesson[] = [
    allLessons.find((l) => l.rawPath.includes('W10 : Serverless Computing')) || allLessons[10],
    allLessons.find((l) => l.rawPath.includes('W07: Containers') && l.title.includes('Kubernetes')) || allLessons[15],
    allLessons.find((l) => l.rawPath.includes('W08: Convolutional Neural')) || allLessons[25],
    allLessons.find((l) => l.rawPath.includes('W05: Modern Table Formats')) || allLessons[40],
    allLessons.find((l) => l.rawPath.includes('Unsupervised Learning: K-means')) || allLessons[55],
    allLessons.find((l) => l.rawPath.includes('W08: AWS Storage Services')) || allLessons[70],
  ].filter(Boolean) as Lesson[];

  const bookmarkedLessons = allLessons.filter((l) => bookmarkedIds.includes(l.id));
  const displayList = filterMode === 'bookmarks' ? bookmarkedLessons : highYieldLessons;

  if (isCollapsed) {
    return (
      <aside className="w-14 shrink-0 h-screen sticky top-0 hidden lg:flex flex-col items-center justify-between border-l border-neutral-200/80 dark:border-neutral-800 bg-[#FAF9F6]/90 dark:bg-dark-panel/90 backdrop-blur-md p-2 select-none z-20">
        <div className="flex flex-col items-center gap-3 pt-2">
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title="Expand Sprint Archives"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setFilterMode('highYield');
              onToggleCollapse();
            }}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title="Sprint Archives"
          >
            <Bookmark className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setFilterMode('bookmarks');
              onToggleCollapse();
            }}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title="Bookmarked Notes"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 shrink-0 h-screen sticky top-0 hidden xl:flex flex-col border-l border-neutral-200/80 dark:border-neutral-800 bg-[#FAF9F6]/90 dark:bg-dark-panel/90 backdrop-blur-md p-5 overflow-y-auto select-none z-20 transition-all duration-300">
      {/* Top Action Bar with Collapse Button */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200/70 dark:border-neutral-800">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilterMode('highYield')}
            className={`p-2 rounded-xl transition-all ${
              filterMode === 'highYield'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-2xs border border-neutral-200/60 dark:border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
            }`}
            title="Sprint Archives & High-Yield Notes"
          >
            <Bookmark className="w-4 h-4 text-neutral-900 dark:text-white" />
          </button>
          <button
            onClick={() => setFilterMode('bookmarks')}
            className={`p-2 rounded-xl transition-all ${
              filterMode === 'bookmarks'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-2xs border border-neutral-200/60 dark:border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
            }`}
            title="Bookmarked Notes"
          >
            <Edit3 className="w-4 h-4 text-neutral-900 dark:text-white" />
          </button>
        </div>

        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          title="Collapse Sidebar"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Title & Subtitle */}
      <div className="pt-4 pb-4">
        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          {filterMode === 'bookmarks' ? 'Saved Study Notes' : 'Sprint Archives'}
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
          {filterMode === 'bookmarks'
            ? 'Your handpicked revision notes and curriculum modules for quick retrieval.'
            : 'Past sprint plans, retrospectives, and key decisions for tracking team velocity and iteration history.'}
        </p>
      </div>

      {/* Archives / File Cards List */}
      <div className="space-y-3 flex-1">
        {displayList.length === 0 ? (
          <div className="p-6 text-center text-xs text-neutral-400 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800">
            No items found. Click bookmark icons across lessons to pin them here!
          </div>
        ) : (
          displayList.map((lesson) => {
            const isCompleted = completedLessonIds.includes(lesson.id);
            const sizeKb = Math.max(12, Math.round(lesson.size / 1024));

            return (
              <div
                key={lesson.id}
                className="group p-3.5 rounded-xl bg-white dark:bg-dark-panel border border-neutral-200/80 dark:border-neutral-800 shadow-2xs hover:shadow-card hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-400 block truncate">
                      {lesson.subjectTitle} · {lesson.weekTitle.slice(0, 15)}...
                    </span>
                    <h4 className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate mt-0.5 group-hover:text-neutral-700 dark:group-hover:text-white transition-colors">
                      {lesson.title}
                    </h4>
                  </div>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-neutral-900 dark:text-white shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 shrink-0 mt-0.5" />
                  )}
                </div>

                {/* Metadata */}
                <div className="space-y-0.5 text-[11px] text-neutral-400 dark:text-neutral-400">
                  <p className="truncate">
                    Shared By: <span className="text-neutral-600 dark:text-neutral-300">Balasubramanian</span>
                  </p>
                  <p>
                    Size: <span className="text-neutral-600 dark:text-neutral-300">{sizeKb} KB</span> · {lesson.readingTime}
                  </p>
                  <p>
                    Created Time: <span className="text-neutral-600 dark:text-neutral-300">Trimester 2</span>
                  </p>
                </div>

                {/* Details Button */}
                <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <button
                    onClick={() => onOpenLesson(lesson.id)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3 opacity-70" />
                  </button>
                  <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">
                    {lesson.words} words
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer hint */}
      <div className="pt-4 border-t border-neutral-200/70 dark:border-neutral-800 text-[11px] text-neutral-400 text-center">
        <span>Click any card to read full markdown notes</span>
      </div>
    </aside>
  );
};

export default RightSidebar;
