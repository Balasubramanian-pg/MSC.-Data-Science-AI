import React, { useState } from 'react';
import { CheckSquare, Calendar, Plus, Clock, Tag, ArrowRight } from 'lucide-react';

interface TaskItem {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

const defaultTasks: TaskItem[] = [
  {
    id: 't1',
    title: 'Implement Convolutional Neural Network with PyTorch on CIFAR-10',
    subject: 'Artificial Neural Networks',
    dueDate: 'Week 8 Milestone',
    priority: 'high',
    completed: true,
  },
  {
    id: 't2',
    title: 'Deploy Multi-container Microservice with Docker & Kubernetes',
    subject: 'Cloud Services & Platforms',
    dueDate: 'Week 7 Lab',
    priority: 'high',
    completed: true,
  },
  {
    id: 't3',
    title: 'Design Apache Iceberg Table Format Schema & Partition Evolution',
    subject: 'Data Stores & Pipelines',
    dueDate: 'Week 5 Assignment',
    priority: 'medium',
    completed: false,
  },
  {
    id: 't4',
    title: 'Compare DBSCAN vs K-Means on Non-Convex Spatial Datasets',
    subject: 'Machine Learning',
    dueDate: 'Week 12 Exercise',
    priority: 'medium',
    completed: false,
  },
  {
    id: 't5',
    title: 'Prepare AWS Serverless Architecture & IAM Least Privilege Presentation',
    subject: 'Cloud Services & Platforms',
    dueDate: 'Week 10 Milestone',
    priority: 'low',
    completed: false,
  },
];

export const TasksView: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>(defaultTasks);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <div className="w-full max-w-4xl mx-auto py-6 space-y-6 select-none">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Trimester 2 Coursework Tasks & Deadlines
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Track weekly lab deliverables, research assignments, and exam review milestones.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-xs">
          {(['all', 'pending', 'completed'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`px-3 py-1 rounded-lg capitalize font-medium transition-all ${
                filter === mode
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => {}}
                className="w-4 h-4 rounded text-neutral-900 focus:ring-0 cursor-pointer"
              />
              <div>
                <h3
                  className={`text-xs font-semibold ${
                    task.completed
                      ? 'line-through text-neutral-400 dark:text-neutral-500'
                      : 'text-neutral-900 dark:text-neutral-100'
                  }`}
                >
                  {task.title}
                </h3>
                <div className="flex items-center gap-3 mt-1 text-[11px] text-neutral-400">
                  <span className="font-medium text-neutral-600 dark:text-neutral-400">
                    {task.subject}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {task.dueDate}
                  </span>
                </div>
              </div>
            </div>

            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                task.priority === 'high'
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400'
                  : task.priority === 'medium'
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                  : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
              }`}
            >
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksView;
