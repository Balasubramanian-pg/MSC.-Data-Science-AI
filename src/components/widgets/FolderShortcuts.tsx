import React, { useState } from 'react';
import {
  Folder,
  FolderOpen,
  ArrowRight,
  X,
  FileText,
  Cpu,
  Eye,
  Cloud,
  Box,
  Database,
  GitBranch,
  Layers,
} from 'lucide-react';
import { allLessons, Lesson } from '../../data/curriculumData';

interface TrimesterFolder {
  id: string;
  name: string;
  subject: string;
  query: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
}

const trimesterFolders: TrimesterFolder[] = [
  {
    id: 'backprop',
    name: 'Backpropagation & PyTorch',
    subject: 'Artificial Neural Networks',
    query: 'Backpropagation',
    icon: Cpu,
    count: 24,
  },
  {
    id: 'cnn',
    name: 'CNNs & Computer Vision',
    subject: 'Artificial Neural Networks',
    query: 'Convolutional',
    icon: Eye,
    count: 18,
  },
  {
    id: 'aws-vpc',
    name: 'AWS Cloud & VPC Networks',
    subject: 'Cloud Services & Platforms',
    query: 'VPC',
    icon: Cloud,
    count: 22,
  },
  {
    id: 'docker-k8s',
    name: 'Docker & Kubernetes',
    subject: 'Cloud Services & Platforms',
    query: 'Kubernetes',
    icon: Box,
    count: 20,
  },
  {
    id: 'lakehouse',
    name: 'Lakehouse & Apache Iceberg',
    subject: 'Data Stores & Pipelines',
    query: 'Iceberg',
    icon: Database,
    count: 26,
  },
  {
    id: 'airflow',
    name: 'Apache Airflow DAGs',
    subject: 'Data Stores & Pipelines',
    query: 'Airflow',
    icon: GitBranch,
    count: 19,
  },
  {
    id: 'ml-algorithms',
    name: 'Classification & Clustering',
    subject: 'Machine Learning',
    query: 'Clustering',
    icon: Layers,
    count: 25,
  },
];

interface FolderShortcutsProps {
  onOpenLesson: (lessonId: string) => void;
}

export const FolderShortcuts: React.FC<FolderShortcutsProps> = ({ onOpenLesson }) => {
  const [activeFolder, setActiveFolder] = useState<TrimesterFolder | null>(null);

  const matchedLessons: Lesson[] = activeFolder
    ? allLessons
        .filter(
          (l) =>
            l.title.toLowerCase().includes(activeFolder.query.toLowerCase()) ||
            l.summary.toLowerCase().includes(activeFolder.query.toLowerCase()) ||
            l.weekTitle.toLowerCase().includes(activeFolder.query.toLowerCase())
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
          Trimester 2 Subject Workspaces
        </span>
      </div>

      {/* Realistic folder cards row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {trimesterFolders.map((folder) => {
          const isSelected = activeFolder?.id === folder.id;
          const FolderTopicIcon = folder.icon;

          return (
            <button
              key={folder.id}
              onClick={() => setActiveFolder(isSelected ? null : folder)}
              className={`group flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200 text-center ${
                isSelected
                  ? 'bg-neutral-200/80 dark:bg-neutral-800 ring-2 ring-neutral-900 dark:ring-neutral-100 shadow-sm'
                  : 'bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-850 border border-neutral-200/70 dark:border-neutral-800 hover:shadow-card'
              }`}
            >
              {/* Skeuomorphic modern Folder Graphic with Monochrome Accent */}
              <div className="relative w-14 h-11 mb-2.5 transition-transform duration-200 group-hover:scale-105">
                {/* Back tab */}
                <div className="absolute top-0 left-1 w-6 h-3 bg-neutral-400 dark:bg-neutral-600 rounded-t-md" />
                {/* Back panel */}
                <div className="absolute top-1.5 inset-x-0 bottom-0 bg-neutral-300 dark:bg-neutral-700 rounded-lg shadow-2xs" />
                {/* Front flap */}
                <div className="absolute top-3 inset-x-0 bottom-0 bg-gradient-to-b from-neutral-200 to-neutral-400 dark:from-neutral-700 dark:to-neutral-900 rounded-lg border-t border-white/60 dark:border-neutral-600 shadow-xs flex items-center justify-center">
                  <FolderTopicIcon className="w-3.5 h-3.5 text-neutral-800 dark:text-neutral-200 opacity-80" />
                </div>
              </div>

              {/* Title */}
              <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 leading-snug group-hover:text-neutral-950 dark:group-hover:text-white line-clamp-2">
                {folder.name}
              </span>
              <span className="text-[10px] text-neutral-400 mt-1 truncate max-w-full">
                {folder.subject.split(' ')[0]}
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
              <FolderOpen className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />
              <div>
                <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  {activeFolder.name}
                </h4>
                <p className="text-[10px] text-neutral-400">{activeFolder.subject}</p>
              </div>
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
                <FileText className="w-3.5 h-3.5 text-neutral-500 mt-0.5 shrink-0" />
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
