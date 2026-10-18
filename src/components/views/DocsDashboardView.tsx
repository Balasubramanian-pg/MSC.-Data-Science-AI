import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Filter,
  Sparkles,
  ChevronDown,
  Layers,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { FluidExpandingGrid, FluidGridItem } from '../ui/fluid-expanding-grid';
import { FolderShortcuts } from '../widgets/FolderShortcuts';
import { AnalyticsSection } from '../widgets/AnalyticsSection';
import { curriculumData, Subject, Lesson, Week } from '../../data/curriculumData';
import { SimpleIcon } from '../icons/SimpleIcon';

interface DocsDashboardViewProps {
  onOpenLesson: (lessonId: string) => void;
  selectedSubjectId: string | null;
  onSelectSubject: (id: string | null) => void;
  onSearchOpen: () => void;
  completedLessonIds: string[];
}

export const DocsDashboardView: React.FC<DocsDashboardViewProps> = ({
  onOpenLesson,
  selectedSubjectId,
  onSelectSubject,
  onSearchOpen,
  completedLessonIds,
}) => {
  const [expandedWeekId, setExpandedWeekId] = useState<string | null>(null);

  const activeSubject = selectedSubjectId
    ? curriculumData.find((s) => s.id === selectedSubjectId)
    : null;

  // Custom FluidGridItems configured with Trimester 2 courses and simple-icons
  const gridItems: FluidGridItem[] = [
    {
      id: 'ann',
      title: 'Artificial Neural Networks',
      category: 'Deep Learning Foundations',
      description:
        'Perceptrons, Multi-Layer Perceptrons, backpropagation dynamics, CNN architectures, sequence modeling, and explainable AI.',
      badge: '13 Weeks · PyTorch',
      badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
      icon: <SimpleIcon name="siPytorch" size={20} color="#EE4C2C" />,
      actionText: 'Connect',
      details: {
        topics: [
          'Biological vs Artificial Neuron',
          'Linear Algebra & Numerical Stability',
          'Backpropagation & Gradient Flow',
          'Convolutional Neural Networks',
          'Sequence Models & Attention',
        ],
        weeksCount: 13,
        completion: 72,
        highlights: ['85 Comprehensive Notes', 'PyTorch Lab Notebooks', 'Assessment Question Banks'],
      },
      onAction: () => onSelectSubject('ann'),
    },
    {
      id: 'cloud',
      title: 'Cloud Services and Platforms',
      category: 'Cloud Architecture & DevOps',
      description:
        'Enterprise AWS foundations, IAM, EC2 compute, VPC networking, Docker, Kubernetes container orchestration, S3, RDS, Serverless Lambda, and Terraform IaC.',
      badge: '13 Weeks · AWS & K8s',
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
      icon: <SimpleIcon name="aws" size={20} color="#FF9900" />,
      actionText: 'Connect',
      details: {
        topics: [
          'AWS IAM & Well-Architected Security',
          'EC2 & Virtualization Internals',
          'VPC Networking & Subnetting',
          'Docker Containers & Kubernetes Deployments',
          'Serverless Lambda & API Gateway',
          'Infrastructure as Code with Terraform',
        ],
        weeksCount: 13,
        completion: 85,
        highlights: ['93 In-depth Modules', 'Enterprise Architecture', 'Container Registries'],
      },
      onAction: () => onSelectSubject('cloud'),
    },
    {
      id: 'data-stores',
      title: 'Data Stores & Pipelines',
      category: 'Lakehouse & Data Engineering',
      description:
        'Modern data warehousing, lakehouses, Iceberg/Delta Lake formats, batch/streaming ingestion, and Apache Airflow orchestration.',
      badge: '13 Weeks · Lakehouse',
      badgeColor: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
      icon: <SimpleIcon name="siApacheairflow" size={20} color="#017CEE" />,
      actionText: 'Connect',
      details: {
        topics: [
          'Storage Paradigms: OLTP vs OLAP',
          'Modern Data Warehousing',
          'Table Formats: Apache Iceberg & Delta',
          'Batch & Streaming Ingestion Architectures',
          'Apache Airflow DAG Pipelines',
          'Data Governance, Security & Lineage',
        ],
        weeksCount: 13,
        completion: 60,
        highlights: ['112 Curriculum Guides', 'ETL vs ELT Workflows', 'CI/CD for Data Pipelines'],
      },
      onAction: () => onSelectSubject('data-stores'),
    },
    {
      id: 'ml',
      title: 'Machine Learning',
      category: 'Statistical Algorithms',
      description:
        'Supervised & unsupervised learning algorithms, decision trees, rule-based classification, k-NN, ensemble methods, clustering, and association rule mining.',
      badge: '13 Weeks · Scikit-Learn',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
      icon: <SimpleIcon name="siScikitlearn" size={20} color="#F7931E" />,
      actionText: 'Connect',
      details: {
        topics: [
          'Data Preprocessing & Normalization',
          'Decision Trees & Entropy Splits',
          'k-Nearest Neighbour Classifiers',
          'Ensemble Learning & Random Forests',
          'K-Means, Hierarchical & DBSCAN Clustering',
          'Association Rule Mining (Apriori)',
        ],
        weeksCount: 13,
        completion: 92,
        highlights: ['40 In-depth Notes', 'Scikit-Learn Workflows', 'Algorithmic Formulations'],
      },
      onAction: () => onSelectSubject('ml'),
    },
    {
      id: 'product-specs',
      title: 'Product Specs & Syllabus',
      category: 'Curriculum Specification',
      description:
        'Centralized documentation for Trimester 2 learning objectives, evaluation rubrics, course competencies, and exam blueprints.',
      badge: 'Official Scope',
      badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
      icon: <BookOpen className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />,
      actionText: 'Connect',
      details: {
        topics: [
          'Trimester 2 Learning Outcomes',
          'Continuous Assessment Weights',
          'Midterm & End-term Examination Rubrics',
          'Academic Reference Texts',
        ],
        weeksCount: 13,
        completion: 100,
        highlights: ['Verified Syllabus', 'Outcome Matrix', 'Faculty Recommended Papers'],
      },
      onAction: () => onSelectSubject('ann'),
    },
    {
      id: 'engineering-guidelines',
      title: 'Engineering Guidelines',
      category: 'Best Practices & Standards',
      description:
        'Best practices, coding standards, and architecture decisions to keep deep learning and data engineering implementations consistent.',
      badge: 'Standards',
      badgeColor: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300',
      icon: <Sparkles className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />,
      actionText: 'Connect',
      details: {
        topics: [
          'PEP 8 & Type Hints for Machine Learning',
          'PyTorch Seed Determinism Rules',
          'AWS IAM Least Privilege Principles',
          'Data Contract & Schema Evolution Policies',
        ],
        weeksCount: 13,
        completion: 95,
        highlights: ['Production Standards', 'Clean Architecture', 'Reproducibility Protocols'],
      },
      onAction: () => onSelectSubject('cloud'),
    },
  ];

  return (
    <div className="w-full select-none">
      {/* Top Header Matching Screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200/80 dark:border-neutral-800">
        <div>
          <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
            {activeSubject ? `Docs / ${activeSubject.title}` : 'Docs'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight mt-0.5">
            {activeSubject ? activeSubject.title : 'Docs'}
          </h1>
        </div>

        {/* Top Right Search Bar */}
        <div className="flex items-center gap-3">
          <button
            onClick={onSearchOpen}
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 shadow-2xs hover:border-neutral-300 transition-all min-w-[200px] justify-between"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-neutral-400" />
              <span>Search</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-600">
              ⌘F
            </kbd>
          </button>
        </div>
      </div>

      {/* If a subject is selected, show its deep curriculum view */}
      {activeSubject ? (
        <div className="my-6 space-y-6">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: activeSubject.color }}
              >
                <SimpleIcon name={activeSubject.icon} size={22} color="#FFFFFF" />
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase text-neutral-400 tracking-wider">
                  Course Deep Dive
                </span>
                <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                  {activeSubject.title} ({activeSubject.weeks.length} Weeks)
                </h2>
              </div>
            </div>
            <button
              onClick={() => onSelectSubject(null)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              View All Courses
            </button>
          </div>

          {/* Weeks List */}
          <div className="space-y-3">
            {activeSubject.weeks.map((week) => {
              const isWeekOpen = expandedWeekId === week.id || expandedWeekId === null;
              const weekCompletedCount = week.lessons.filter((l) =>
                completedLessonIds.includes(l.id)
              ).length;

              return (
                <div
                  key={week.id}
                  className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedWeekId(expandedWeekId === week.id ? null : week.id)
                    }
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 font-mono text-xs font-bold text-neutral-700 dark:text-neutral-300 flex items-center justify-center">
                        W{week.weekNum.toString().padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                          {week.title}
                        </h3>
                        <p className="text-[11px] text-neutral-400 mt-0.5">
                          {week.lessons.length} notes · {weekCompletedCount} of {week.lessons.length} completed
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                        isWeekOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Lessons list */}
                  {isWeekOpen && (
                    <div className="p-3 pt-0 grid grid-cols-1 md:grid-cols-2 gap-2 border-t border-neutral-100 dark:border-neutral-800/60">
                      {week.lessons.map((lesson) => {
                        const isDone = completedLessonIds.includes(lesson.id);

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => onOpenLesson(lesson.id)}
                            className="flex items-start gap-2.5 p-3 rounded-xl text-left bg-neutral-50/60 dark:bg-neutral-800/40 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 transition-all group"
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            ) : (
                              <BookOpen className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors" />
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate group-hover:text-neutral-950 dark:group-hover:text-white">
                                {lesson.title}
                              </h4>
                              <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                                {lesson.summary}
                              </p>
                            </div>
                            <span className="text-[10px] text-neutral-400 shrink-0 self-center font-mono">
                              {lesson.readingTime}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          {/* Main Cards Row: Fluid Expanding Grid */}
          <div className="my-6">
            <FluidExpandingGrid items={gridItems} />
          </div>

          {/* Shortcut Row with Realistic Modern Folder Icons */}
          <FolderShortcuts onOpenLesson={onOpenLesson} />

          {/* Analytics Visualizations: Documentation Engagement Trend & Donut Gauge */}
          <AnalyticsSection completedLessonIds={completedLessonIds} />
        </>
      )}
    </div>
  );
};

export default DocsDashboardView;
