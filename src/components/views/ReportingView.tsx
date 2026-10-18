import React from 'react';
import { AnalyticsSection } from '../widgets/AnalyticsSection';
import { BarChart3, TrendingUp, CheckCircle, BookOpen, Clock } from 'lucide-react';
import { curriculumData } from '../../data/curriculumData';

interface ReportingViewProps {
  completedLessonIds: string[];
  bookmarkedIds: string[];
}

export const ReportingView: React.FC<ReportingViewProps> = ({
  completedLessonIds,
  bookmarkedIds,
}) => {
  const totalLessons = 330;
  const completedCount = completedLessonIds.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalLessons) * 100));

  return (
    <div className="w-full max-w-5xl mx-auto py-6 space-y-6 select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200/80 dark:border-neutral-800">
        <div>
          <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
            Analytics & Progress
          </span>
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight mt-0.5">
            Reporting & Velocity
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Realtime study engagement, completion trajectories, and topic retention curves.
          </p>
        </div>

        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <div className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs text-xs font-mono">
            <span className="text-neutral-400">Total Completion: </span>
            <span className="font-bold text-neutral-900 dark:text-neutral-100">{progressPercent}%</span>
          </div>
        </div>
      </div>

      {/* Analytics Bento Section (Moved from Docs) */}
      <AnalyticsSection completedLessonIds={completedLessonIds} />

      {/* Detailed Metrics Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Curriculum Notes</div>
          <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100 mt-1">330</div>
          <div className="text-[11px] text-neutral-400 mt-0.5">Indexed across 52 weeks</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Completed Notes</div>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            {completedCount}
          </div>
          <div className="text-[11px] text-neutral-400 mt-0.5">{progressPercent}% of Trimester 2</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Saved Bookmarks</div>
          <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100 mt-1">
            {bookmarkedIds.length}
          </div>
          <div className="text-[11px] text-neutral-400 mt-0.5">Quick retrieval items</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Est. Study Hours</div>
          <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100 mt-1">
            {(completedCount * 0.45).toFixed(1)}h
          </div>
          <div className="text-[11px] text-neutral-400 mt-0.5">Reading & comprehension</div>
        </div>
      </div>
    </div>
  );
};

export default ReportingView;
