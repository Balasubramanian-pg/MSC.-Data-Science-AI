import React, { useEffect, useRef, useState, useId } from 'react';
import mermaid from 'mermaid';
import { Copy, Check, AlertCircle } from 'lucide-react';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const uniqueId = `mermaid-${useId().replace(/:/g, '')}-${Math.random().toString(36).substring(2, 7)}`;

  useEffect(() => {
    let isMounted = true;
    const isDark = document.documentElement.classList.contains('dark');

    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? 'dark' : 'neutral',
        securityLevel: 'loose',
        fontFamily: "'Abadi', 'Avenir Next Cyr', system-ui, sans-serif",
        themeVariables: isDark
          ? {
              darkMode: true,
              background: '#15161E',
              primaryColor: '#906BFF',
              primaryTextColor: '#FFFFFF',
              primaryBorderColor: 'rgba(255, 255, 255, 0.12)',
              lineColor: '#A1A1AA',
              secondaryColor: '#1E1F2B',
              tertiaryColor: '#27273A',
            }
          : {
              darkMode: false,
              background: '#FFFFFF',
              primaryColor: '#262626',
              primaryTextColor: '#18181B',
              primaryBorderColor: 'rgba(0, 0, 0, 0.15)',
              lineColor: '#52525B',
              secondaryColor: '#F4F4F5',
              tertiaryColor: '#E4E4E7',
            },
      });

      mermaid
        .render(uniqueId, chart.trim())
        .then(({ svg }) => {
          if (isMounted) {
            setSvgContent(svg);
            setHasError(false);
          }
        })
        .catch((err) => {
          console.warn('Mermaid render error:', err);
          if (isMounted) {
            setHasError(true);
          }
        });
    } catch (e) {
      console.warn('Mermaid initialization error:', e);
      if (isMounted) {
        setHasError(true);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [chart]);

  const copyChart = () => {
    navigator.clipboard.writeText(chart);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (hasError) {
    return (
      <div className="my-5 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs">
        <div className="flex items-center justify-between mb-2 text-amber-600 dark:text-amber-400 font-semibold">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" />
            <span>Mermaid Syntax Preview</span>
          </div>
          <button
            onClick={copyChart}
            className="flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{isCopied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <pre className="p-3 bg-neutral-900 text-neutral-200 rounded-xl overflow-x-auto font-mono text-[11px] leading-relaxed">
          <code>{chart}</code>
        </pre>
      </div>
    );
  }

  return (
    <div className={`relative my-6 group rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/80 backdrop-blur-sm shadow-2xs ${className}`}>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-200/60 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/40 text-[11px] text-neutral-400">
        <span className="font-semibold uppercase tracking-wider text-[10px]">
          Architecture Diagram
        </span>
        <button
          onClick={copyChart}
          className="flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-neutral-200/50 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors"
          title="Copy Mermaid source"
        >
          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{isCopied ? 'Copied' : 'Source'}</span>
        </button>
      </div>

      {/* SVG Container */}
      <div
        ref={containerRef}
        className="p-6 flex items-center justify-center overflow-x-auto min-h-[160px] [&>svg]:max-w-full [&>svg]:h-auto"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
};

export default MermaidDiagram;
