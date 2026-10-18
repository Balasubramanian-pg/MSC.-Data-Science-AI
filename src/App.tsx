import React, { useState } from 'react';
import { useWikiState } from './lib/wikiState';
import { LeftSidebar } from './components/layout/LeftSidebar';
import { RightSidebar } from './components/layout/RightSidebar';
import { DocsDashboardView } from './components/views/DocsDashboardView';
import { ReaderView } from './components/reader/ReaderView';
import { VivaQuizView } from './components/views/VivaQuizView';
import { LabsView } from './components/views/LabsView';
import { TasksView } from './components/views/TasksView';
import { SearchModal } from './components/widgets/SearchModal';
import { RippleLoader } from './components/ui/ripple-loader';
import { SimpleIcon } from './components/icons/SimpleIcon';
import { Sparkles, Bot, BarChart3, Calendar, Users } from 'lucide-react';

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
    resetPomodoro,
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

  const handleOpenLesson = (lessonId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      openLesson(lessonId);
      setIsLoading(false);
    }, 280);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-dark-canvas text-neutral-900 dark:text-neutral-100 flex flex-row">
      {/* Left Sidebar */}
      <LeftSidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab !== 'reader') setActiveLessonId(null);
        }}
        selectedSubjectId={selectedSubjectId}
        onSubjectSelect={(subjId) => {
          setSelectedSubjectId(subjId);
          setActiveTab('docs');
          setActiveLessonId(null);
        }}
        onSearchOpen={() => setIsSearchOpen(true)}
        theme={theme}
        onThemeToggle={toggleTheme}
      />

      {/* Main Center Area */}
      <main className="flex-1 min-w-0 h-screen overflow-y-auto px-4 sm:px-8 py-6">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <RippleLoader
              size="md"
              label="Synthesizing Trimester 2 Curriculum..."
              icon={<Sparkles className="w-5 h-5 text-neutral-800 dark:text-neutral-200 animate-spin" />}
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
                <Calendar className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
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
        ) : activeTab === 'team' ? (
          <div className="max-w-4xl mx-auto py-8">
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                <h2 className="text-lg font-bold">MSc Data Science & AI Cohort</h2>
              </div>
              <p className="text-xs text-neutral-500 mb-6">
                Coursework repository maintained by Balasubramanian P G with peer study group synchronization.
              </p>
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm">Balasubramanian P G</h4>
                  <p className="text-xs text-neutral-400">MSc Data Science & AI · Lead Maintainer</p>
                </div>
                <a
                  href="https://github.com/Balasubramanian-pg"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                >
                  GitHub Profile
                </a>
              </div>
            </div>
          </div>
        ) : activeTab === 'automations' ? (
          <div className="max-w-4xl mx-auto py-8">
            <div className="p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs text-center flex flex-col items-center">
              <RippleLoader
                size="lg"
                label="Automated Study Engine & Git Sync Active"
                icon={<Bot className="w-6 h-6 text-neutral-800 dark:text-neutral-200" />}
              />
              <p className="text-xs text-neutral-500 max-w-md mt-4">
                Background cron pipelines routinely parse upstream lecture updates, format markdown equations, and regenerate client-side search indexes.
              </p>
            </div>
          </div>
        ) : activeTab === 'reporting' ? (
          <div className="max-w-4xl mx-auto py-8">
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                <h2 className="text-lg font-bold">Learning Analytics & Telemetry</h2>
              </div>
              <p className="text-xs text-neutral-500 mb-6">
                Client-side anonymity compliant with /repo-wiki-framework standards. Zero tracking cookies or third-party beacons.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60">
                  <div className="text-2xl font-bold font-mono">330</div>
                  <div className="text-[10px] uppercase text-neutral-400 mt-1">Total Notes</div>
                </div>
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60">
                  <div className="text-2xl font-bold font-mono text-emerald-600">
                    {completedLessonIds.length}
                  </div>
                  <div className="text-[10px] uppercase text-neutral-400 mt-1">Completed</div>
                </div>
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60">
                  <div className="text-2xl font-bold font-mono text-[#906BFF]">
                    {bookmarkedIds.length}
                  </div>
                  <div className="text-[10px] uppercase text-neutral-400 mt-1">Bookmarked</div>
                </div>
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60">
                  <div className="text-2xl font-bold font-mono text-rose-600">52</div>
                  <div className="text-[10px] uppercase text-neutral-400 mt-1">Course Weeks</div>
                </div>
              </div>
            </div>
          </div>
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

      {/* Right Sidebar (Matching mockup Sprint Archives) */}
      <RightSidebar
        onOpenLesson={handleOpenLesson}
        bookmarkedIds={bookmarkedIds}
        completedLessonIds={completedLessonIds}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLesson={handleOpenLesson}
      />
    </div>
  );
};

export default App;
