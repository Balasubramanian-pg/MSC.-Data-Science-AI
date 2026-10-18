"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { cn } from "../../lib/utils";
import {
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
  ArrowUpRight,
  BookOpen,
  Code2,
  Cpu,
  Database,
  Cloud,
  CheckCircle2,
} from "lucide-react";

export interface FluidGridItem {
  id: string;
  title: string;
  description: string;
  category?: string;
  icon?: ReactNode;
  badge?: string;
  badgeColor?: string;
  actionText?: string;
  details?: {
    topics?: string[];
    weeksCount?: number;
    completion?: number;
    highlights?: string[];
  };
  onAction?: (item: FluidGridItem) => void;
}

export interface FluidExpandingGridProps {
  items?: FluidGridItem[];
  selectedId?: string | null;
  onItemSelect?: (item: FluidGridItem) => void;
  className?: string;
  allowMultiple?: boolean;
}

const defaultItems: FluidGridItem[] = [
  {
    id: "ann",
    title: "Artificial Neural Networks",
    category: "Deep Learning Foundations",
    description:
      "Perceptrons, Multi-Layer Perceptrons, backpropagation dynamics, CNN architectures, sequence modeling, and explainable AI.",
    badge: "13 Weeks",
    badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    icon: <Cpu className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />,
    actionText: "Connect",
    details: {
      topics: [
        "Biological vs Artificial Neuron",
        "Linear Algebra & Gradient Flow",
        "Backprop & Loss Functions",
        "Convolutional Neural Networks",
        "Sequence Models & Attention",
      ],
      weeksCount: 13,
      completion: 68,
      highlights: [
        "85 Markdown Notes",
        "PyTorch Implementations",
        "Exam Assessment Archives",
      ],
    },
  },
  {
    id: "cloud",
    title: "Cloud Services and Platforms",
    category: "Cloud Engineering",
    description:
      "Enterprise AWS foundations, IAM, EC2 compute, VPC networking, Docker, Kubernetes container orchestration, S3, RDS, Serverless Lambda, and Terraform IaC.",
    badge: "AWS Focused",
    badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    icon: <Cloud className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />,
    actionText: "Connect",
    details: {
      topics: [
        "Cloud Architecture & Design",
        "AWS IAM & Security Posture",
        "Docker & Kubernetes in Prod",
        "S3 Storage & Life Cycle Rules",
        "Serverless Lambda & API Gateway",
        "Infrastructure as Code (Terraform)",
      ],
      weeksCount: 13,
      completion: 82,
      highlights: [
        "93 Curriculum Modules",
        "Container Best Practices",
        "Cloud Architecture Blueprints",
      ],
    },
  },
  {
    id: "data-stores",
    title: "Data Stores & Pipelines",
    category: "Data Engineering",
    description:
      "Modern data warehousing, lakehouses, Iceberg/Delta Lake formats, batch/streaming ingestion, and Apache Airflow orchestration.",
    badge: "Lakehouse Core",
    badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    icon: <Database className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />,
    actionText: "Connect",
    details: {
      topics: [
        "Storage Paradigms: OLTP vs OLAP",
        "Modern Data Warehousing",
        "Apache Iceberg & Delta Lake",
        "Batch & Streaming Ingestion",
        "Airflow Directed Acyclic Graphs",
        "Data Governance & Monitoring",
      ],
      weeksCount: 13,
      completion: 54,
      highlights: [
        "112 Comprehensive Notes",
        "ETL vs ELT Workflows",
        "CI/CD for Data Pipelines",
      ],
    },
  },
  {
    id: "ml",
    title: "Machine Learning",
    category: "Core Algorithms",
    description:
      "Supervised & unsupervised learning algorithms, decision trees, rule-based classification, k-NN, ensemble methods, clustering, and association rule mining.",
    badge: "Algorithms",
    badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
    icon: <Layers className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />,
    actionText: "Connect",
    details: {
      topics: [
        "Data Preprocessing & Scaling",
        "Decision Trees & Information Gain",
        "k-Nearest Neighbour & Metrics",
        "Ensemble Learning: RF & Boosting",
        "K-means, Hierarchical & DBSCAN",
        "Apriori & Association Mining",
      ],
      weeksCount: 13,
      completion: 90,
      highlights: [
        "40 Algorithm Guides",
        "Scikit-Learn Workflows",
        "Mathematical Formulations",
      ],
    },
  },
  {
    id: "labs",
    title: "Practical Labs & Code",
    category: "Hands-on Implementation",
    description:
      "Jupyter Notebooks, model training pipelines, AWS containerization recipes, and Airflow DAGs built for Trimester 2 practical coursework.",
    badge: "Interactive Code",
    badgeColor: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300",
    icon: <Code2 className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />,
    actionText: "Connect",
    details: {
      topics: [
        "PyTorch Neural Net Training",
        "Docker Multi-stage Builds",
        "S3 Boto3 API Ingestion",
        "Airflow Data Pipelines",
        "Scikit-Learn Pipelines",
      ],
      weeksCount: 12,
      completion: 75,
      highlights: [
        "Reproducible Scripts",
        "Dockerized Environments",
        "Dataset Preprocessing",
      ],
    },
  },
  {
    id: "viva",
    title: "Sprint Archives & Assessments",
    category: "Revision & Exam Prep",
    description:
      "Curated assessment summaries, viva voce question banks, revision flashcards, and high-yield technical interview retrospectives.",
    badge: "Exam Ready",
    badgeColor: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
    icon: <Sparkles className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />,
    actionText: "Connect",
    details: {
      topics: [
        "Deep Learning Viva Questions",
        "AWS Well-Architected Q&A",
        "Lakehouse Architecture Scenarios",
        "Machine Learning Algorithm Tradeoffs",
      ],
      weeksCount: 13,
      completion: 80,
      highlights: [
        "Self-Assessment Quizzes",
        "Scenario Case Studies",
        "Summary Cheat Sheets",
      ],
    },
  },
];

export const FluidExpandingGrid: React.FC<FluidExpandingGridProps> = ({
  items = defaultItems,
  selectedId: controlledSelectedId,
  onItemSelect,
  className,
  allowMultiple = false,
}) => {
  const [internalExpandedId, setInternalExpandedId] = useState<string | null>(null);
  const activeExpandedId = controlledSelectedId !== undefined ? controlledSelectedId : internalExpandedId;

  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Handle escape key to collapse
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeExpandedId) {
        if (controlledSelectedId === undefined) {
          setInternalExpandedId(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeExpandedId, controlledSelectedId]);

  const toggleExpand = (item: FluidGridItem) => {
    const nextId = activeExpandedId === item.id ? null : item.id;
    if (controlledSelectedId === undefined) {
      setInternalExpandedId(nextId);
    }
    if (onItemSelect) {
      onItemSelect(item);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, item: FluidGridItem) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleExpand(item);
    }
  };

  return (
    <div
      role="grid"
      aria-label="Trimester 2 Coursework and Curriculum Modules"
      className={cn("w-full transition-all duration-300", className)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          const isExpanded = activeExpandedId === item.id;

          return (
            <div
              key={item.id}
              ref={(el) => {
                if (el) cardRefs.current.set(item.id, el);
                else cardRefs.current.delete(item.id);
              }}
              role="gridcell"
              tabIndex={0}
              aria-expanded={isExpanded}
              onKeyDown={(e) => handleKeyDown(e, item)}
              onClick={() => toggleExpand(item)}
              className={cn(
                "group relative rounded-2xl p-5 cursor-pointer text-left",
                "bg-white dark:bg-neutral-900",
                "border border-neutral-200/90 dark:border-neutral-800",
                "text-neutral-900 dark:text-neutral-100",
                "shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]",
                "transition-all duration-300 ease-out",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600",
                isExpanded && [
                  "ring-1 ring-neutral-400 dark:ring-neutral-700 shadow-md",
                  "md:col-span-2 lg:col-span-3 bg-neutral-50/70 dark:bg-neutral-900/95"
                ]
              )}
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* Top Bar: Icon Badge + Badges */}
                  <div className="flex items-start justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105">
                        {item.icon || <BookOpen className="w-5 h-5 text-white dark:text-neutral-900" />}
                      </div>
                      <div>
                        {item.category && (
                          <span className="text-[11px] font-medium tracking-wide uppercase text-neutral-400 dark:text-neutral-500 block">
                            {item.category}
                          </span>
                        )}
                        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight leading-snug">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {item.badge && (
                      <span
                        className={cn(
                          "px-2 py-0.5 text-[11px] font-medium rounded-full shrink-0",
                          item.badgeColor || "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400 mb-4 line-clamp-2 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                    {item.description}
                  </p>
                </div>

                {/* Expanded Details section */}
                {isExpanded && item.details && (
                  <div className="my-3 pt-3 border-t border-neutral-200/80 dark:border-neutral-800 animate-in fade-in-50 duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5 uppercase tracking-wider text-[10px]">
                          Key Curriculum Modules:
                        </span>
                        <ul className="space-y-1">
                          {item.details.topics?.map((topic, i) => (
                            <li key={i} className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5 uppercase tracking-wider text-[10px]">
                          Curriculum Resources:
                        </span>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {item.details.highlights?.map((h, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded bg-neutral-200/70 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-[11px]"
                            >
                              {h}
                            </span>
                          ))}
                        </div>

                        {item.details.completion !== undefined && (
                          <div className="mt-2">
                            <div className="flex justify-between text-[11px] text-neutral-500 mb-1">
                              <span>Estimated Readiness</span>
                              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                                {item.details.completion}%
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-neutral-900 dark:bg-neutral-100 rounded-full transition-all duration-500"
                                style={{ width: `${item.details.completion}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Action Footer */}
                <div className="pt-2 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800/60 mt-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.onAction) {
                        item.onAction(item);
                      } else {
                        toggleExpand(item);
                      }
                    }}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium",
                      "border border-neutral-200 dark:border-neutral-800",
                      "bg-white dark:bg-neutral-800/80 text-neutral-800 dark:text-neutral-200",
                      "hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-neutral-900",
                      "transition-colors shadow-2xs"
                    )}
                  >
                    <span>{item.actionText || "Connect"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                  </button>

                  <div className="text-[11px] text-neutral-400 dark:text-neutral-500 flex items-center gap-1 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                    <span>{isExpanded ? "Collapse" : "Explore"}</span>
                    <ChevronRight
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200",
                        isExpanded && "rotate-90"
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FluidExpandingGrid;
