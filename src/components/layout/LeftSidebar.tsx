import React from 'react';
import {
  Search,
  Home,
  CheckSquare,
  Calendar,
  Users,
  FileText,
  Bot,
  BarChart3,
  Plus,
  GripVertical,
  Settings,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  Layers,
  ChevronRight,
  Sun,
  Moon,
  Bookmark,
  Sparkles,
} from 'lucide-react';
import { SimpleIcon } from '../icons/SimpleIcon';
import { curriculumData } from '../../data/curriculumData';

interface LeftSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  selectedSubjectId: string | null;
  onSubjectSelect: (subjectId: string | null) => void;
  onSearchOpen: () => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  activeTab,
  onTabChange,
  selectedSubjectId,
  onSubjectSelect,
  onSearchOpen,
  theme,
  onThemeToggle,
  collapsed = false,
}) => {
  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 flex flex-col justify-between border-r border-neutral-200/80 dark:border-neutral-800 bg-[#FAF9F6]/80 dark:bg-dark-panel/90 backdrop-blur-md p-4 overflow-y-auto select-none">
      {/* Top Section */}
      <div className="space-y-5">
        {/* Profile Card */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">
                Balasubramanian
              </h2>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500 truncate">
                MSc Data Science & AI
              </p>
            </div>
          </div>
          <button
            onClick={onThemeToggle}
            title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Search Bar Input Trigger */}
        <button
          onClick={onSearchOpen}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-neutral-800/80 border border-neutral-200/70 dark:border-neutral-700/70 text-xs text-neutral-400 dark:text-neutral-500 shadow-2xs hover:border-neutral-300 dark:hover:border-neutral-600 transition-all text-left group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors" />
            <span className="group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
              Search notes...
            </span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-neutral-100 dark:bg-neutral-700/80 text-neutral-500 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-600">
            ⌘F
          </kbd>
        </button>

        {/* Essentials Group */}
        <div>
          <span className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-2 block mb-1">
            Essentials
          </span>
          <nav className="space-y-0.5">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'tasks', label: 'Tasks', icon: CheckSquare },
              { id: 'calendar', label: 'Calendar', icon: Calendar },
              { id: 'team', label: 'Team', icon: Users },
              { id: 'docs', label: 'Docs', icon: FileText },
              { id: 'automations', label: 'Automations', icon: Bot },
              { id: 'reporting', label: 'Reporting', icon: BarChart3 },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    if (item.id === 'docs') onSubjectSelect(null);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-2xs border border-neutral-200/60 dark:border-neutral-700'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-80" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Projects / Trimester 2 Courses */}
        <div>
          <div className="flex items-center justify-between px-2 mb-1">
            <span className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
              Trimester 2 Courses
            </span>
            <div className="flex items-center gap-1 text-neutral-400">
              <Plus className="w-3 h-3 hover:text-neutral-600 cursor-pointer" />
              <GripVertical className="w-3 h-3 hover:text-neutral-600 cursor-pointer" />
            </div>
          </div>
          <nav className="space-y-0.5">
            {curriculumData.map((subj) => {
              const isSelected = selectedSubjectId === subj.id && activeTab === 'docs';
              return (
                <button
                  key={subj.id}
                  onClick={() => {
                    onTabChange('docs');
                    onSubjectSelect(subj.id);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-2xs border border-neutral-200/60 dark:border-neutral-700'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: subj.color }}
                    />
                    <span className="truncate">{subj.shortTitle}</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 dark:text-neutral-500 shrink-0 font-mono">
                    {subj.totalLessons}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Management Group */}
        <div>
          <div className="flex items-center justify-between px-2 mb-1">
            <span className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
              Management
            </span>
            <ChevronDown className="w-3 h-3 text-neutral-400" />
          </div>
          <nav className="space-y-0.5">
            {[
              { id: 'viva', label: 'Viva & Assessments' },
              { id: 'labs', label: 'Hands-on Labs & Code' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => onTabChange(m.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeTab === m.id
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-2xs border border-neutral-200/60 dark:border-neutral-700'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40'
                }`}
              >
                <Layers className="w-3.5 h-3.5 opacity-70" />
                <span>{m.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom Section: Apps & Attributions */}
      <div className="pt-4 border-t border-neutral-200/70 dark:border-neutral-800 space-y-2">
        <div className="px-2 mb-1">
          <span className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
            Apps & Source
          </span>
        </div>

        <div className="space-y-1">
          <a
            href="https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI/tree/main/Trimester%202"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-1.5 rounded-xl text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40 transition-colors"
          >
            <div className="flex items-center gap-2">
              <SimpleIcon name="siGithub" size={14} />
              <span>GitHub Repo</span>
            </div>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          <a
            href="https://notebooklm.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-1.5 rounded-xl text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40 transition-colors"
          >
            <div className="flex items-center gap-2">
              <SimpleIcon name="notebooklm" size={14} />
              <span>NotebookLM Companion</span>
            </div>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>

        <div className="pt-2 text-[10px] text-neutral-400 dark:text-neutral-500 px-2 leading-tight">
          Trimester 2 Learning Portal · <span className="font-semibold">Abadi Typography</span>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
