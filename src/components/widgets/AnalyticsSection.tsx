import React, { useState } from 'react';
import { Sparkles, TrendingUp, CheckCircle, Info } from 'lucide-react';
import { curriculumData } from '../../data/curriculumData';

interface AnalyticsSectionProps {
  completedLessonIds: string[];
}

export const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ completedLessonIds }) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Compute stats per subject
  const totalLessonsCount = 330;
  const completedCount = completedLessonIds.length;
  const completionPercent = Math.min(100, Math.round((completedCount / totalLessonsCount) * 100));

  // Points for Documentation Engagement Trend
  // Coordinates in SVG viewBox 0 0 600 200
  const points = [
    { x: 20, y: 160, day: 'Mon', score: 14, hours: '1.2h' },
    { x: 70, y: 140, day: 'Tue', score: 22, hours: '1.8h' },
    { x: 120, y: 155, day: 'Wed', score: 18, hours: '1.4h' },
    { x: 170, y: 175, day: 'Thu', score: 12, hours: '0.9h' },
    { x: 220, y: 145, day: 'Fri', score: 28, hours: '2.4h' },
    { x: 270, y: 130, day: 'Sat', score: 36, hours: '3.1h' },
    { x: 320, y: 80, day: 'Sun', score: 62, hours: '4.8h' },
    { x: 370, y: 95, day: 'Mon', score: 55, hours: '3.9h' },
    { x: 420, y: 85, day: 'Tue', score: 64, hours: '4.5h' },
    { x: 470, y: 110, day: 'Wed', score: 48, hours: '3.2h' },
    { x: 520, y: 88, day: 'Thu', score: 58, hours: '4.1h' },
    { x: 570, y: 72, day: 'Fri', score: 75, hours: '5.2h' },
  ];

  // Build smooth cubic bezier SVG path
  const generateSplinePath = () => {
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      const cpY2 = p1.y;
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  const splinePath = generateSplinePath();
  const areaPath = `${splinePath} L ${points[points.length - 1].x} 190 L ${points[0].x} 190 Z`;

  // Secondary dashed light trend line (as seen in screenshot)
  const secondaryPath = "M 20 170 C 100 170, 200 160, 300 110 C 400 60, 500 90, 570 65";

  // Circular gauge values
  const radius = 62;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  // Let circumference portion match completion or the screenshot aesthetic
  const arcLength = circumference * (Math.max(15, completionPercent) / 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 select-none my-6">
      {/* Left Card: Documentation Engagement Trend */}
      <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              Documentation Engagement Trend
            </h3>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
              Daily study frequency, reading velocity, and concept mastery curves
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
              <TrendingUp className="w-3 h-3" />
              +24% velocity
            </span>
          </div>
        </div>

        {/* SVG Spline Chart */}
        <div className="relative w-full h-44 overflow-hidden">
          <svg
            viewBox="0 0 600 200"
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E75A4E" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#E75A4E" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Subtle background horizontal grid lines */}
            <line x1="20" y1="50" x2="580" y2="50" stroke="currentColor" strokeOpacity="0.05" strokeDasharray="3 3" />
            <line x1="20" y1="100" x2="580" y2="100" stroke="currentColor" strokeOpacity="0.05" strokeDasharray="3 3" />
            <line x1="20" y1="150" x2="580" y2="150" stroke="currentColor" strokeOpacity="0.05" strokeDasharray="3 3" />

            {/* Light secondary dashed curve */}
            <path
              d={secondaryPath}
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.15"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Gradient Fill under primary spline */}
            <path d={areaPath} fill="url(#areaGrad)" />

            {/* Main Spline Wave Curve (matches screenshot coral/red color) */}
            <path
              d={splinePath}
              fill="none"
              stroke="#E75A4E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {points.map((p, idx) => {
              const isHovered = hoveredPoint === idx;
              return (
                <g key={idx}>
                  {/* Outer circle */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isHovered ? 6 : 4}
                    fill="#FFFFFF"
                    stroke="#E75A4E"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-150"
                    onMouseEnter={() => setHoveredPoint(idx)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  {/* Center dot */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={2}
                    fill="#E75A4E"
                  />
                </g>
              );
            })}
          </svg>

          {/* Hover Tooltip */}
          {hoveredPoint !== null && (
            <div
              className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-full px-2.5 py-1 rounded-lg bg-neutral-900 text-white text-[11px] font-mono shadow-md"
              style={{
                left: `${(points[hoveredPoint].x / 600) * 100}%`,
                top: `${(points[hoveredPoint].y / 200) * 100 - 10}%`,
              }}
            >
              <span>{points[hoveredPoint].day}: {points[hoveredPoint].hours}</span>
            </div>
          )}
        </div>

        {/* Bottom Legend */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E75A4E]" />
              Completed Study Sprints
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-neutral-300 dark:bg-neutral-600" />
              Baseline Target
            </span>
          </div>
          <span>Updated realtime via local state</span>
        </div>
      </div>

      {/* Right Card: Views & Edits by Week / Module Completion */}
      <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              Views & Edits by Week
            </h3>
            <span className="text-[11px] font-mono text-neutral-400">
              {completedCount} / {totalLessonsCount}
            </span>
          </div>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-4">
            Trimester 2 Module Completion Breakdown
          </p>
        </div>

        {/* Circular Donut Gauge (matching screenshot) */}
        <div className="flex items-center justify-center py-2">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              {/* Background Track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-neutral-200 dark:stroke-neutral-800"
                strokeWidth={strokeWidth}
                fill="none"
              />
              {/* Active Segment (matching dark/black arc in screenshot) */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-neutral-900 dark:stroke-neutral-100 transition-all duration-700 ease-out"
                strokeWidth={strokeWidth}
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Inner Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                {completionPercent}%
              </span>
              <span className="text-[10px] uppercase font-semibold text-neutral-400 tracking-wider">
                Progress
              </span>
            </div>
          </div>
        </div>

        {/* Subject Mini Progress Indicators */}
        <div className="space-y-1.5 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs">
          {curriculumData.map((subj) => {
            const subjCompleted = completedLessonIds.filter((id) => id.startsWith(subj.id)).length;
            const pct = Math.round((subjCompleted / subj.totalLessons) * 100);

            return (
              <div key={subj.id} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: subj.color }} />
                  <span className="text-neutral-600 dark:text-neutral-300 truncate">{subj.shortTitle}</span>
                </div>
                <span className="font-mono text-neutral-500">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
