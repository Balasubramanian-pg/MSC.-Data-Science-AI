import React from 'react';
import {
  Home,
  CheckSquare,
  Calendar,
  Sparkles,
  Layers,
  Code2,
  BarChart3,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { SimpleIcon } from '../icons/SimpleIcon';
import { curriculumData } from '../../data/curriculumData';

interface LeftSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  selectedSubjectId: string | null;
  onSubjectSelect: (subjectId: string | null) => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const getSubjectIconName = (subjectId: string, defaultIcon?: string): string => {
  switch (subjectId) {
    case 'ann':
      return 'siPytorch';
    case 'cloud':
      return 'aws';
    case 'data-stores':
      return 'siApacheairflow';
    case 'ml':
      return 'siScikitlearn';
    default:
      return defaultIcon || 'siPython';
  }
};

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  activeTab,
  onTabChange,
  selectedSubjectId,
  onSubjectSelect,
  theme,
  onThemeToggle,
  isCollapsed,
  onToggleCollapse,
}) => {
  // Navigation items: Home, Tasks, Calendar, Viva & Assessments, Hands-on Labs, Reporting
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'viva', label: 'Viva & Assessments', icon: Sparkles },
    { id: 'labs', label: 'Hands-on Labs', icon: Code2 },
    { id: 'reporting', label: 'Reporting', icon: BarChart3 },
  ];

  return (
    <aside
      className={`shrink-0 h-screen sticky top-0 flex flex-col justify-between border-r border-neutral-200/80 dark:border-neutral-800 bg-[#FAF9F6]/90 dark:bg-dark-panel/90 backdrop-blur-md transition-all duration-300 z-30 select-none ${
        isCollapsed ? 'w-16 p-2.5' : 'w-64 p-4'
      }`}
    >
      {/* Top Section */}
      <div className="space-y-4">
        {/* Profile Card & Collapse Toggle */}
        <div
          className={`flex items-center rounded-xl bg-white/80 dark:bg-dark-panel border border-neutral-200/60 dark:border-neutral-800 shadow-2xs ${
            isCollapsed ? 'p-1.5 justify-center flex-col gap-2' : 'p-2 justify-between'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <h2 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">
                  Balasubramanian
                </h2>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 truncate">
                  MSc Data Science & AI
                </p>
              </div>
            )}
          </div>

          <div className={`flex items-center ${isCollapsed ? 'flex-col gap-1' : 'gap-1'}`}>
            <button
              onClick={onThemeToggle}
              title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onToggleCollapse}
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Essentials Group */}
        <div>
          {!isCollapsed && (
            <span className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-2 block mb-1">
              Essentials
            </span>
          )}
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    if (item.id === 'home') onSubjectSelect(null);
                  }}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center rounded-xl text-xs font-medium transition-all ${
                    isCollapsed ? 'justify-center p-2' : 'gap-2.5 px-3 py-1.5'
                  } ${
                    isActive
                      ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-2xs border border-neutral-200/60 dark:border-neutral-700'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-80 shrink-0 text-neutral-900 dark:text-white" />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Trimester 2 Courses */}
        <div>
          {!isCollapsed && (
            <span className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-2 block mb-1">
              Trimester 2 Courses
            </span>
          )}
          <nav className="space-y-0.5">
            {curriculumData.map((subj) => {
              const isSelected = selectedSubjectId === subj.id && activeTab === 'home';
              return (
                <button
                  key={subj.id}
                  onClick={() => {
                    onTabChange('home');
                    onSubjectSelect(subj.id);
                  }}
                  title={isCollapsed ? `${subj.shortTitle} (${subj.totalLessons} notes)` : undefined}
                  className={`w-full flex items-center rounded-xl text-xs font-medium transition-all ${
                    isCollapsed ? 'justify-center p-2' : 'justify-between px-3 py-1.5'
                  } ${
                    isSelected
                      ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-2xs border border-neutral-200/60 dark:border-neutral-700'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <SimpleIcon
                      name={getSubjectIconName(subj.id, subj.icon)}
                      size={15}
                      className="shrink-0 text-neutral-900 dark:text-white"
                    />
                    {!isCollapsed && <span className="truncate">{subj.shortTitle}</span>}
                  </div>
                  {!isCollapsed && (
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500 shrink-0 font-mono">
                      {subj.totalLessons}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Section: Apps & Source (Typography text completely removed) */}
      <div className="pt-3 border-t border-neutral-200/70 dark:border-neutral-800 space-y-1">
        {!isCollapsed && (
          <div className="px-2 mb-1">
            <span className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
              Apps & Source
            </span>
          </div>
        )}

        <div className="space-y-0.5">
          <a
            href="https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Repository"
            className={`flex items-center rounded-xl text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40 transition-colors ${
              isCollapsed ? 'justify-center p-2' : 'justify-between px-3 py-1.5'
            }`}
          >
            <div className="flex items-center gap-2">
              <SimpleIcon name="siGithub" size={14} className="text-neutral-900 dark:text-white" />
              {!isCollapsed && <span>GitHub Repo</span>}
            </div>
            {!isCollapsed && <ExternalLink className="w-3 h-3 opacity-60" />}
          </a>

          <a
            href="https://notebooklm.google.com"
            target="_blank"
            rel="noopener noreferrer"
            title="NotebookLM AI Study Companion"
            className={`flex items-center rounded-xl text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40 transition-colors ${
              isCollapsed ? 'justify-center p-2' : 'justify-between px-3 py-1.5'
            }`}
          >
            <div className="flex items-center gap-2">
              <SimpleIcon name="notebooklm" size={14} className="text-neutral-900 dark:text-white" />
              {!isCollapsed && <span>NotebookLM</span>}
            </div>
            {!isCollapsed && <ExternalLink className="w-3 h-3 opacity-60" />}
          </a>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
