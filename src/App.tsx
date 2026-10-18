import React, { useState } from 'react';
import { useWikiState } from './lib/wikiState';
import { LeftSidebar } from './components/layout/LeftSidebar';
import { RightSidebar } from './components/layout/RightSidebar';
import { DocsDashboardView } from './components/views/DocsDashboardView';
import { ReaderView } from './components/reader/ReaderView';
import { VivaQuizView } from './components/views/VivaQuizView';
import { LabsView } from './components/views/LabsView';
import { TasksView } from './components/views/TasksView';
import { ReportingView } from './components/views/ReportingView';
import { SearchModal } from './components/widgets/SearchModal';
import { RippleLoader } from './components/ui/ripple-loader';
import { Sparkles, Calendar } from 'lucide-react';

export const App: React.FC = () => {
  const {
    theme,
    toggleTheme,
    completedLessonIds,
    toggleComplete,
    bookmarkedIds,
    toggleBookmark,
    pomoState,
    startPomodoro,
    activeTab,
    setActiveTab,
    selectedSubjectId,
    setSelectedSubjectId,
    activeLessonId,
    setActiveLessonId,
    openLesson,
    closeLesson,
    isSearchOpen,
    setIsSearchOpen,
  } = useWikiState();

  const [isLoading, setIsLoading] = useState(false);
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);

  const handleOpenLesson = (lessonId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      openLesson(lessonId);
      setIsLoading(false);
    }, 280);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-dark-canvas text-neutral-900 dark:text-neutral-100 flex flex-row">
      {/* Left Sidebar (Collapsible, no search input, Viva & Labs in Essentials, no Team/Automations) */}
      <LeftSidebar
        activeTab={activeTab === 'reader' ? 'home' : activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab !== 'reader') setActiveLessonId(null);
        }}
        selectedSubjectId={selectedSubjectId}
        onSubjectSelect={(subjId) => {
          setSelectedSubjectId(subjId);
          setActiveTab('home');
          setActiveLessonId(null);
        }}
        theme={theme}
        onThemeToggle={toggleTheme}
        isCollapsed={isLeftCollapsed}
        onToggleCollapse={() => setIsLeftCollapsed(!isLeftCollapsed)}
      />

      {/* Main Center Area */}
      <main className="flex-1 min-w-0 h-screen overflow-y-auto px-4 sm:px-8 py-6">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <RippleLoader
              size="md"
              label="Synthesizing Trimester 2 Curriculum..."
              icon={<Sparkles className="w-5 h-5 text-neutral-900 dark:text-white animate-spin" />}
            />
          </div>
        ) : activeLessonId && activeTab === 'reader' ? (
          <ReaderView
            lessonId={activeLessonId}
            onBack={closeLesson}
            onSelectLesson={handleOpenLesson}
            isCompleted={completedLessonIds.includes(activeLessonId)}
            onToggleComplete={toggleComplete}
            isBookmarked={bookmarkedIds.includes(activeLessonId)}
            onToggleBookmark={toggleBookmark}
            pomoState={pomoState}
            onStartPomodoro={startPomodoro}
            onSearchOpen={() => setIsSearchOpen(true)}
          />
        ) : activeTab === 'viva' ? (
          <VivaQuizView />
        ) : activeTab === 'labs' ? (
          <LabsView />
        ) : activeTab === 'tasks' ? (
          <TasksView />
        ) : activeTab === 'calendar' ? (
          <div className="max-w-4xl mx-auto py-8">
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
                <h2 className="text-lg font-bold">Academic Calendar · Trimester 2</h2>
              </div>
              <p className="text-xs text-neutral-500 mb-6">
                Key dates for mid-term assessments, lab examinations, and coursework presentations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700">
                  <span className="text-[10px] uppercase font-semibold text-neutral-400">Week 06</span>
                  <h4 className="font-bold text-sm mt-1">Midterm Continuous Assessment</h4>
                  <p className="text-neutral-500 mt-1">Neural networks & AWS cloud foundational tests</p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700">
                  <span className="text-[10px] uppercase font-semibold text-neutral-400">Week 10</span>
                  <h4 className="font-bold text-sm mt-1">Hands-on Laboratory Evaluation</h4>
                  <p className="text-neutral-500 mt-1">Docker/K8s deployment & Airflow DAG pipeline demo</p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700">
                  <span className="text-[10px] uppercase font-semibold text-neutral-400">Week 13</span>
                  <h4 className="font-bold text-sm mt-1">Comprehensive Viva Voce</h4>
                  <p className="text-neutral-500 mt-1">End-term oral examination & capstone reviews</p>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'reporting' ? (
          <ReportingView
            completedLessonIds={completedLessonIds}
            bookmarkedIds={bookmarkedIds}
          />
        ) : (
          <DocsDashboardView
            onOpenLesson={handleOpenLesson}
            selectedSubjectId={selectedSubjectId}
            onSelectSubject={setSelectedSubjectId}
            onSearchOpen={() => setIsSearchOpen(true)}
            completedLessonIds={completedLessonIds}
          />
        )}
      </main>

      {/* Right Sidebar (Collapsible with icon rail option) */}
      <RightSidebar
        onOpenLesson={handleOpenLesson}
        bookmarkedIds={bookmarkedIds}
        completedLessonIds={completedLessonIds}
        isCollapsed={isRightCollapsed}
        onToggleCollapse={() => setIsRightCollapsed(!isRightCollapsed)}
      />

      {/* Global Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLesson={handleOpenLesson}
      />
    </div>
  );
};

export default App;
