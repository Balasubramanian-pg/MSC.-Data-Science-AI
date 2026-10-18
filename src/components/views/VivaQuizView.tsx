import React, { useState } from 'react';
import { Sparkles, CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizQuestion {
  id: number;
  subject: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const quizData: QuizQuestion[] = [
  {
    id: 1,
    subject: 'Artificial Neural Networks',
    question: 'Why does the vanishing gradient problem primarily occur in deep networks using Sigmoid or Tanh activation functions?',
    options: [
      'The derivative of the activation function approaches zero for large absolute input values, causing gradients to diminish exponentially through chain rule multiplication.',
      'The learning rate dynamically scales down to zero as network depth increases.',
      'Weights in early layers automatically initialize to negative infinity.',
      'Loss functions cannot compute cross-entropy over more than three layers.',
    ],
    correctIndex: 0,
    explanation: 'The derivative of Sigmoid reaches a maximum of 0.25 (and Tanh at 1.0). In deep networks, multiplying these small fractions repeatedly through backpropagation chain rule results in near-zero updates for early layers.',
  },
  {
    id: 2,
    subject: 'Cloud Services and Platforms',
    question: 'In AWS VPC architecture, which component enables instances in a private subnet to initiate outbound internet traffic (e.g. for OS patches) while blocking inbound traffic?',
    options: [
      'Internet Gateway (IGW)',
      'NAT Gateway (placed in a public subnet with Elastic IP)',
      'Network Access Control List (NACL) in egress-only mode',
      'Virtual Private Gateway (VGW)',
    ],
    correctIndex: 1,
    explanation: 'A NAT Gateway deployed into a public subnet with an allocated Elastic IP allows private subnet EC2 instances to initiate outbound connections without exposing them to unsolicited incoming connections.',
  },
  {
    id: 3,
    subject: 'Data Stores & Pipelines',
    question: 'What is the primary architectural advantage of open table formats like Apache Iceberg and Delta Lake over traditional Hive metastore tables?',
    options: [
      'They replace Parquet files with uncompressed CSVs for human readability.',
      'They provide ACID transactions, schema evolution, and time-travel querying via metadata manifest trees rather than file-system directory listings.',
      'They completely eliminate the need for compute engines like Spark or Trino.',
      'They force all tables to be stored exclusively in volatile RAM.',
    ],
    correctIndex: 1,
    explanation: 'Modern table formats track snapshots using snapshot manifests and metadata files, enabling snapshot isolation, ACID transactions, partitioning without directory mutations, and time travel.',
  },
  {
    id: 4,
    subject: 'Machine Learning',
    question: 'When using DBSCAN clustering, how does the algorithm distinguish between core points, border points, and noise?',
    options: [
      'By randomly assigning points into K predefined cluster centroids and computing Euclidean distance.',
      'A core point has at least minPts within radius eps; border points fall within eps of a core point but have fewer than minPts; noise points are neither.',
      'DBSCAN builds a decision tree and isolates outliers using entropy cuts.',
      'Noise points are determined purely by computing Mahalanobis distance from the mean.',
    ],
    correctIndex: 1,
    explanation: 'DBSCAN uses density-reachability: core points have >= minPts within radius eps; border points are in the eps-neighborhood of a core point; points belonging to neither category are marked as noise.',
  },
];

export const VivaQuizView: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});

  const handleSelect = (questionId: number, optionIdx: number) => {
    if (submitted[questionId]) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmit = (questionId: number) => {
    setSubmitted((prev) => ({ ...prev, [questionId]: true }));
    const q = quizData.find((item) => item.id === questionId);
    if (q && selectedAnswers[questionId] === q.correctIndex) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleReset = (questionId: number) => {
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
    setSubmitted((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Trimester 2 Practice & Viva Simulator
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Scenario-based technical questions and interview assessments across ANN, Cloud, Lakehouse, and ML.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {quizData.map((q) => {
          const isAnswered = selectedAnswers[q.id] !== undefined;
          const isSubmitted = submitted[q.id];
          const isCorrect = isSubmitted && selectedAnswers[q.id] === q.correctIndex;

          return (
            <div
              key={q.id}
              className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  {q.subject}
                </span>
                <span className="text-xs text-neutral-400 font-mono">Question {q.id} of {quizData.length}</span>
              </div>

              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4 leading-relaxed">
                {q.question}
              </h3>

              {/* Options */}
              <div className="space-y-2 mb-4">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[q.id] === optIdx;
                  let optionClass = 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/60';

                  if (isSubmitted) {
                    if (optIdx === q.correctIndex) {
                      optionClass = 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200';
                    } else if (isSelected) {
                      optionClass = 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200';
                    }
                  } else if (isSelected) {
                    optionClass = 'border-neutral-900 dark:border-white bg-neutral-100 dark:bg-neutral-800';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx)}
                      disabled={isSubmitted}
                      className={`w-full flex items-start gap-3 p-3 rounded-xl border text-xs text-left transition-all ${optionClass}`}
                    >
                      <span className="w-5 h-5 rounded-md bg-neutral-200/60 dark:bg-neutral-800 flex items-center justify-center font-mono font-bold shrink-0 mt-0.5 text-[10px]">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation card on submit */}
              {isSubmitted && (
                <div
                  className={`p-3.5 rounded-xl text-xs mb-4 ${
                    isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200'
                      : 'bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-rose-900 dark:text-rose-200'
                  }`}
                >
                  <div className="font-semibold mb-1 flex items-center gap-1.5">
                    {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
                    <span>{isCorrect ? 'Correct Architectural Rationale' : 'Incorrect Assessment'}</span>
                  </div>
                  <p className="leading-relaxed opacity-90">{q.explanation}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                {isSubmitted ? (
                  <button
                    onClick={() => handleReset(q.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Again</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleSubmit(q.id)}
                    disabled={!isAnswered}
                    className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 disabled:opacity-40 transition-opacity"
                  >
                    Verify Answer
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VivaQuizView;
