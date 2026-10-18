"use client";

import React, { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Sparkles, Brain, Loader2 } from "lucide-react";

export interface RippleLoaderProps {
  /**
   * The centered icon or element. Defaults to an AI Sparkles icon.
   */
  icon?: ReactNode;
  /**
   * Accessible loading label announced to screen readers and displayed optionally.
   */
  label?: string;
  /**
   * Preset sizes ('sm', 'md', 'lg') or numeric pixel diameter for the center hub.
   */
  size?: "sm" | "md" | "lg" | number;
  /**
   * Number of concentric ripple waves to animate (default: 3).
   */
  rippleCount?: number;
  /**
   * Base color class or hex string for ripples.
   */
  rippleColor?: string;
  /**
   * Duration of one ripple cycle in seconds (default: 2.4).
   */
  speed?: number;
  /**
   * Whether to display the text label beneath the ripple animation.
   */
  showLabel?: boolean;
  /**
   * Additional wrapper class names.
   */
  className?: string;
}

export const RippleLoader: React.FC<RippleLoaderProps> = ({
  icon,
  label = "Loading knowledge base...",
  size = "md",
  rippleCount = 3,
  rippleColor,
  speed = 2.4,
  showLabel = true,
  className,
}) => {
  // Resolve size
  let centerDiameter = 48;
  let containerSize = 160;

  if (typeof size === "number") {
    centerDiameter = size;
    containerSize = size * 3;
  } else if (size === "sm") {
    centerDiameter = 36;
    containerSize = 120;
  } else if (size === "lg") {
    centerDiameter = 64;
    containerSize = 220;
  }

  const ripples = Array.from({ length: rippleCount }, (_, i) => i);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      tabIndex={0}
      className={cn(
        "flex flex-col items-center justify-center p-6 text-center select-none focus:outline-none",
        className
      )}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: `${containerSize}px`, height: `${containerSize}px` }}
      >
        {/* Layered concentric ripples */}
        {ripples.map((index) => {
          const delay = (index * (speed / rippleCount)).toFixed(2);
          return (
            <div
              key={index}
              className={cn(
                "absolute rounded-full pointer-events-none",
                rippleColor ||
                  "border border-neutral-300 dark:border-neutral-700 bg-neutral-200/20 dark:bg-neutral-700/10"
              )}
              style={{
                width: `${centerDiameter}px`,
                height: `${centerDiameter}px`,
                animation: `ripple-expand ${speed}s cubic-bezier(0.1, 0.5, 0.4, 1) infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}

        {/* Center Hub */}
        <div
          className={cn(
            "relative z-10 rounded-full flex items-center justify-center shadow-md",
            "bg-white dark:bg-neutral-900",
            "border border-neutral-200 dark:border-neutral-800",
            "text-neutral-900 dark:text-neutral-100",
            "transition-transform duration-300"
          )}
          style={{ width: `${centerDiameter}px`, height: `${centerDiameter}px` }}
        >
          {icon || <Brain className="w-5 h-5 text-neutral-800 dark:text-neutral-200 animate-pulse" />}
        </div>
      </div>

      {showLabel && label && (
        <p className="mt-3 text-xs font-medium text-neutral-600 dark:text-neutral-400 tracking-wide animate-pulse">
          {label}
        </p>
      )}

      {/* Inline Keyframe Animation Definition */}
      <style>{`
        @keyframes ripple-expand {
          0% {
            transform: scale(0.9);
            opacity: 0.9;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: scale(3.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default RippleLoader;
