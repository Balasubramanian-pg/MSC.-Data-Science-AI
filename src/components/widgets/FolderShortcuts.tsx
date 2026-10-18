import React, { useState } from 'react';
import {
  Folder,
  FolderOpen,
  ArrowRight,
  X,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { allLessons, Lesson } from '../../data/curriculumData';

interface FolderItem {
  id: string;
  name: string;
  query: string;
  count: number;
}

const folders: FolderItem[] = [
  { id: 'research', name: 'Research & Testing', query: 'Evaluation', count: 28 },
  { id: 'integrations', name: 'Integrations & Webhooks', query: 'Docker', count: 34 },
  { id: 'api-specs', name: 'API Specs & References', query: 'Architecture', count: 42 },
  { id: 'analytics', name: 'Analytics & Metrics', query: 'Clustering', count: 39 },
  { id: 'security', name: 'Security & Compliance', query: 'IAM', count: 22 },
  { id: 'roadmaps', name: 'Roadmaps & OKRs', query: 'Foundations', count: 31 },
  { id: 'archived', name: 'Archived Projects', query: 'Summary', count: 45 },
];

interface FolderShortcutsProps {
  onOpenLesson: (lessonId: string) => void;
}

export const FolderShortcuts: React.FC<FolderShortcutsProps> = ({ onOpenLesson }) => {
  const [activeFolder, setActiveFolder] = useState<FolderItem | null>(null);

  const matchedLessons: Lesson[] = activeFolder
    ? allLessons
        .filter(
          (l) =>
            l.title.toLowerCase().includes(activeFolder.query.toLowerCase()) ||
            l.summary.toLowerCase().includes(activeFolder.query.toLowerCase())
        )
        .slice(0, 6)
    : [];

  return (
    <div className="w-full my-6 select-none">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Shortcut
        </h3>
        <span className="text-xs text-neutral-400 dark:text-neutral-500">
          Curated Coursework Workspaces
        </span>
      </div>

      {/* Realistic folder cards row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {folders.map((folder) => {
          const isSelected = activeFolder?.id === folder.id;

          return (
            <button
              key={folder.id}
              onClick={() => setActiveFolder(isSelected ? null : folder)}
              className={`group flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200 text-center ${
                isSelected
                  ? 'bg-neutral-200/80 dark:bg-neutral-800 ring-2 ring-neutral-900 dark:ring-neutral-100 shadow-sm'
                  : 'bg-white/60 dark:bg-neutral-800/40 hover:bg-white dark:hover:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 hover:shadow-card'
              }`}
            >
              {/* Skeuomorphic modern Folder Graphic */}
              <div className="relative w-14 h-11 mb-2.5 transition-transform duration-200 group-hover:scale-105">
                {/* Back tab */}
                <div className="absolute top-0 left-1 w-6 h-3 bg-neutral-400 dark:bg-neutral-600 rounded-t-md" />
                {/* Back panel */}
                <div className="absolute top-1.5 inset-x-0 bottom-0 bg-neutral-300 dark:bg-neutral-700 rounded-lg shadow-2xs" />
                {/* Front flap with soft gradient & shadow */}
                <div className="absolute top-3 inset-x-0 bottom-0 bg-gradient-to-b from-neutral-200 to-neutral-400 dark:from-neutral-600 dark:to-neutral-800 rounded-lg border-t border-white/60 dark:border-neutral-500 shadow-xs flex items-center justify-center">
                  <div className="w-4 h-0.5 bg-neutral-400/50 dark:bg-neutral-500/50 rounded-full" />
                </div>
              </div>

              {/* Title */}
              <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 leading-tight group-hover:text-neutral-900 dark:group-hover:text-white line-clamp-2">
                {folder.name}
              </span>
              <span className="text-[10px] text-neutral-400 mt-1">
                {folder.count} files
              </span>
            </button>
          );
        })}
      </div>

      {/* Expanded Folder Drawer / Filter Result */}
      {activeFolder && (
        <div className="mt-4 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-card animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
              <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                {activeFolder.name} ({matchedLessons.length} modules found)
              </h4>
            </div>
            <button
              onClick={() => setActiveFolder(null)}
              className="p-1 rounded-md text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {matchedLessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => onOpenLesson(lesson.id)}
                className="flex items-start gap-2 p-2.5 rounded-xl text-left bg-neutral-50 dark:bg-neutral-800/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors border border-neutral-200/50 dark:border-neutral-700/50"
              >
                <FileText className="w-3.5 h-3.5 text-neutral-400 mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                    {lesson.title}
                  </div>
                  <div className="text-[10px] text-neutral-400 truncate">
                    {lesson.subjectTitle} · {lesson.readingTime}
                  </div>
                </div>
                <ArrowRight className="w-3 h-3 text-neutral-400 shrink-0 self-center" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderShortcuts;
