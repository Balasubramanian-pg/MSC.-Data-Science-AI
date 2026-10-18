import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { searchIndex, SearchItem } from '../../data/curriculumData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        // Toggle search
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results: SearchItem[] = query.trim()
    ? searchIndex
        .filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.subjectTitle.toLowerCase().includes(query.toLowerCase()) ||
            item.weekTitle.toLowerCase().includes(query.toLowerCase()) ||
            item.summary.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 10)
    : searchIndex.slice(0, 6);

  const conceptChips = [
    'Docker',
    'Kubernetes',
    'Serverless',
    'Backpropagation',
    'CNN',
    'Iceberg',
    'Delta Lake',
    'Airflow',
    'K-means',
    'Decision Trees',
    'S3',
    'IAM',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-sm animate-in fade-in-50 duration-150">
      <div
        className="w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-200 dark:border-neutral-800">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Trimester 2 topics, weeks, labs, and formulas..."
            className="flex-1 bg-transparent text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-neutral-400 hover:text-neutral-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="px-2 py-0.5 text-[10px] font-mono rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 border border-neutral-200 dark:border-neutral-700">
            ESC
          </kbd>
        </div>

        {/* Concept Chips */}
        <div className="p-3 bg-neutral-50/60 dark:bg-neutral-950/40 border-b border-neutral-200/60 dark:border-neutral-800 flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] uppercase font-semibold text-neutral-400 mr-1">
            Concepts:
          </span>
          {conceptChips.map((chip) => (
            <button
              key={chip}
              onClick={() => setQuery(chip)}
              className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-700 hover:border-neutral-400 transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-neutral-100 dark:divide-neutral-800/60">
          {results.length === 0 ? (
            <div className="p-8 text-center text-xs text-neutral-400">
              No curriculum results found for "{query}".
            </div>
          ) : (
            results.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectLesson(item.id);
                  onClose();
                }}
                className="w-full flex items-start gap-3 p-3 rounded-xl text-left hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-200/60 dark:bg-neutral-800 flex items-center justify-center shrink-0 mt-0.5 text-neutral-600 dark:text-neutral-300 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-neutral-900 transition-colors">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-neutral-200/50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                      {item.subjectTitle}
                    </span>
                    <span className="text-[10px] text-neutral-400 truncate">
                      {item.weekTitle}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate group-hover:text-neutral-700 dark:group-hover:text-neutral-200">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                    {item.summary}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 shrink-0 self-center transition-colors" />
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
          <span>Total Trimester 2 Indexed Documents: 330</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
