import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Bookmark,
  Share2,
  Copy,
  Check,
  Clock,
  BookOpen,
  ArrowRight,
  Flame,
  ExternalLink,
  Search,
} from 'lucide-react';
import { SimpleIcon } from '../icons/SimpleIcon';
import { Lesson, allLessons } from '../../data/curriculumData';
import { PomoState } from '../../lib/wikiState';

interface ReaderViewProps {
  lessonId: string;
  onBack: () => void;
  onSelectLesson: (id: string) => void;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  pomoState: PomoState;
  onStartPomodoro: () => void;
  onSearchOpen: () => void;
}

export const ReaderView: React.FC<ReaderViewProps> = ({
  lessonId,
  onBack,
  onSelectLesson,
  isCompleted,
  onToggleComplete,
  isBookmarked,
  onToggleBookmark,
  pomoState,
  onStartPomodoro,
  onSearchOpen,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const lesson = allLessons.find((l) => l.id === lessonId);
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  if (!lesson) {
    return (
      <div className="p-12 text-center">
        <p className="text-neutral-500">Lesson not found.</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs"
        >
          Return to Docs
        </button>
      </div>
    );
  }

  // Format pomodoro time
  const pomoMins = Math.floor(pomoState.remainingSeconds / 60);
  const pomoSecs = pomoState.remainingSeconds % 60;
  const pomoFormatted = `${pomoMins.toString().padStart(2, '0')}:${pomoSecs.toString().padStart(2, '0')}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Simple, robust markdown line parser
  const renderMarkdown = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBuffer: string[] = [];
    let codeLang = '';

    lines.forEach((line, i) => {
      // Code block toggle
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLang = line.trim().replace('```', '') || 'code';
          codeBuffer = [];
        } else {
          inCodeBlock = false;
          const fullCode = codeBuffer.join('\n');
          const isCopied = copiedCode === fullCode;

          elements.push(
            <div key={`code-${i}`} className="relative my-4 group rounded-xl overflow-hidden border border-neutral-800 bg-[#141416]">
              <div className="flex items-center justify-between px-4 py-1.5 bg-[#1C1C1F] text-[11px] text-neutral-400 font-mono border-b border-neutral-800">
                <span>{codeLang}</span>
                <button
                  onClick={() => copyToClipboard(fullCode)}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-neutral-200 overflow-x-auto leading-relaxed">
                <code>{fullCode}</code>
              </pre>
            </div>
          );
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      const trimmed = line.trim();

      // Heading 1
      if (trimmed.startsWith('# ')) {
        elements.push(
          <h1 key={i} className="text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 mt-6 mb-3 tracking-tight">
            {trimmed.replace('# ', '')}
          </h1>
        );
      }
      // Heading 2
      else if (trimmed.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-lg md:text-xl font-bold text-neutral-900 dark:text-neutral-100 mt-6 mb-2 pb-1 border-b border-neutral-200 dark:border-neutral-800 tracking-tight">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      // Heading 3
      else if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="text-base font-semibold text-neutral-800 dark:text-neutral-200 mt-4 mb-1.5">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      // Blockquote
      else if (trimmed.startsWith('> ')) {
        elements.push(
          <blockquote key={i} className="border-l-3 border-[#906BFF] bg-[#906BFF]/5 dark:bg-[#906BFF]/10 px-4 py-2 rounded-r-lg my-3 text-sm text-neutral-700 dark:text-neutral-300 italic">
            {trimmed.replace('> ', '')}
          </blockquote>
        );
      }
      // Bullet list
      else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        elements.push(
          <li key={i} className="ml-5 list-disc text-sm text-neutral-700 dark:text-neutral-300 my-1 leading-relaxed">
            {trimmed.substring(2)}
          </li>
        );
      }
      // Image
      else if (trimmed.startsWith('<img') || trimmed.startsWith('![')) {
        const srcMatch = trimmed.match(/src="([^"]+)"/) || trimmed.match(/!\[.*?\]\((.*?)\)/);
        if (srcMatch && srcMatch[1]) {
          elements.push(
            <div key={i} className="my-4 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
              <img src={srcMatch[1]} alt="Diagram illustration" className="w-full object-contain max-h-96" />
            </div>
          );
        }
      }
      // Standard paragraph
      else if (trimmed.length > 0) {
        elements.push(
          <p key={i} className="text-sm text-neutral-700 dark:text-neutral-300 my-2 leading-relaxed">
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-24">
      {/* Canonical Reader Top Bar Layout adhering to /repo-wiki-design-system */}
      <header className="sticky top-0 z-30 mb-6 py-3 px-4 rounded-2xl bg-white/80 dark:bg-dark-panel/90 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800 shadow-2xs flex items-center justify-between gap-4">
        {/* Left: Back button + Search */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Docs</span>
          </button>

          <button
            onClick={onSearchOpen}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search notes...</span>
            <kbd className="text-[10px] font-mono px-1 rounded bg-white dark:bg-neutral-700">⌘F</kbd>
          </button>
        </div>

        {/* Right: Actions, Simple Icons, and Floating Pomodoro Pill */}
        <div className="flex items-center gap-3">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="p-1.5 rounded-lg text-neutral-500 hover:text-[#0A66C2] transition-colors"
          >
            <SimpleIcon name="linkedin" size={16} />
          </a>

          <a
            href="https://github.com/Balasubramanian-pg/MSC.-Data-Science-AI"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Repository"
            className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <SimpleIcon name="siGithub" size={16} />
          </a>

          <a
            href="https://notebooklm.google.com"
            target="_blank"
            rel="noopener noreferrer"
            title="NotebookLM AI Study Companion"
            className="p-1.5 rounded-lg text-neutral-500 hover:text-[#4285F4] transition-colors"
          >
            <SimpleIcon name="notebooklm" size={16} />
          </a>

          {/* Floating Pomodoro Pill */}
          <button
            onClick={onStartPomodoro}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border transition-all ${
              pomoState.status === 'running'
                ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900/60 shadow-xs'
                : 'bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700'
            }`}
            title="Focus Pomodoro Timer"
          >
            <Flame className={`w-3.5 h-3.5 ${pomoState.status === 'running' ? 'text-rose-500 animate-pulse' : 'text-neutral-400'}`} />
            <span>{pomoFormatted}</span>
          </button>
        </div>
      </header>

      {/* Lesson Metadata Header */}
      <div className="mb-6 pb-4 border-b border-neutral-200/80 dark:border-neutral-800">
        <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span className="px-2.5 py-0.5 rounded-md font-medium bg-neutral-200/70 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
            {lesson.subjectTitle}
          </span>
          <span className="text-neutral-400">/</span>
          <span className="text-neutral-500 dark:text-neutral-400">
            {lesson.weekTitle}
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight leading-tight">
          {lesson.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-neutral-400 dark:text-neutral-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {lesson.readingTime}
          </span>
          <span>·</span>
          <span>{lesson.words} words</span>
          <span>·</span>
          <span className="font-mono">{Math.round(lesson.size / 1024)} KB</span>
        </div>
      </div>

      {/* Markdown Body */}
      <article className="prose-custom min-w-0">
        {renderMarkdown(lesson.content)}
      </article>

      {/* Sticky Bottom Action Bar with Confetti Completion */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-elevated">
        <button
          onClick={() => onToggleComplete(lesson.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all ${
            isCompleted
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isCompleted ? 'Completed ✓' : 'Mark as Complete'}</span>
        </button>

        <button
          onClick={() => onToggleBookmark(lesson.id)}
          className={`p-2 rounded-xl border transition-colors ${
            isBookmarked
              ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/60'
              : 'border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
          }`}
          title="Bookmark Note"
        >
          <Bookmark className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-neutral-200 dark:bg-neutral-800 mx-1" />

        {prevLesson && (
          <button
            onClick={() => onSelectLesson(prevLesson.id)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            ← Prev
          </button>
        )}

        {nextLesson && (
          <button
            onClick={() => onSelectLesson(nextLesson.id)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <span>Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ReaderView;
