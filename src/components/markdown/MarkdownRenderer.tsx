import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { MermaidDiagram } from './MermaidDiagram';
import { Copy, Check, ExternalLink } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedText(code);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="prose-custom max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          // Code & Mermaid handling
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const lang = match ? match[1] : '';
            const codeString = String(children).replace(/\n$/, '');

            if (!inline && lang === 'mermaid') {
              return <MermaidDiagram chart={codeString} />;
            }

            if (!inline) {
              const isCopied = copiedText === codeString;
              return (
                <div className="relative my-4 group rounded-xl overflow-hidden border border-neutral-800 bg-[#141416] shadow-sm">
                  <div className="flex items-center justify-between px-4 py-1.5 bg-[#1C1C1F] text-[11px] text-neutral-400 font-mono border-b border-neutral-800">
                    <span className="uppercase text-[10px] tracking-wider font-semibold text-neutral-400">
                      {lang || 'code'}
                    </span>
                    <button
                      onClick={() => copyCode(codeString)}
                      className="flex items-center gap-1 hover:text-white transition-colors"
                      title="Copy code"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-neutral-200 overflow-x-auto leading-relaxed">
                    <code className={className} {...props}>
                      {codeString}
                    </code>
                  </pre>
                </div>
              );
            }

            return (
              <code
                className="px-1.5 py-0.5 rounded font-mono text-[0.875em] bg-neutral-200/70 dark:bg-neutral-800 text-purple-700 dark:text-purple-300 font-semibold"
                {...props}
              >
                {children}
              </code>
            );
          },

          // Tables
          table({ children, ...props }) {
            return (
              <div className="my-6 w-full overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-2xs">
                <table className="w-full text-xs text-left border-collapse" {...props}>
                  {children}
                </table>
              </div>
            );
          },
          thead({ children, ...props }) {
            return (
              <thead className="bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-800 dark:text-neutral-200 border-b border-neutral-200 dark:border-neutral-800 uppercase tracking-wider text-[11px] font-bold" {...props}>
                {children}
              </thead>
            );
          },
          tbody({ children, ...props }) {
            return <tbody className="divide-y divide-neutral-200/60 dark:divide-neutral-800" {...props}>{children}</tbody>;
          },
          tr({ children, ...props }) {
            return (
              <tr className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40 transition-colors" {...props}>
                {children}
              </tr>
            );
          },
          th({ children, ...props }) {
            return (
              <th className="px-4 py-3 font-bold text-neutral-900 dark:text-neutral-100" {...props}>
                {children}
              </th>
            );
          },
          td({ children, ...props }) {
            return (
              <td className="px-4 py-2.5 text-neutral-700 dark:text-neutral-300 leading-relaxed align-top" {...props}>
                {children}
              </td>
            );
          },

          // Typography
          h1({ children, ...props }) {
            return (
              <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 mt-8 mb-4 tracking-tight leading-tight" {...props}>
                {children}
              </h1>
            );
          },
          h2({ children, ...props }) {
            return (
              <h2 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-7 mb-3 pb-1.5 border-b border-neutral-200/80 dark:border-neutral-800 tracking-tight" {...props}>
                {children}
              </h2>
            );
          },
          h3({ children, ...props }) {
            return (
              <h3 className="text-base md:text-lg font-bold text-neutral-800 dark:text-neutral-200 mt-5 mb-2" {...props}>
                {children}
              </h3>
            );
          },
          h4({ children, ...props }) {
            return (
              <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mt-4 mb-1.5" {...props}>
                {children}
              </h4>
            );
          },
          p({ children, ...props }) {
            return (
              <p className="text-sm text-neutral-700 dark:text-neutral-300 my-2.5 leading-relaxed" {...props}>
                {children}
              </p>
            );
          },
          strong({ children, ...props }) {
            return (
              <strong className="font-bold text-neutral-900 dark:text-neutral-100" {...props}>
                {children}
              </strong>
            );
          },
          em({ children, ...props }) {
            return (
              <em className="italic text-neutral-800 dark:text-neutral-200" {...props}>
                {children}
              </em>
            );
          },
          blockquote({ children, ...props }) {
            return (
              <blockquote className="border-l-3 border-[#906BFF] bg-[#906BFF]/5 dark:bg-[#906BFF]/10 px-4 py-2.5 rounded-r-xl my-4 text-sm text-neutral-700 dark:text-neutral-300 italic shadow-2xs" {...props}>
                {children}
              </blockquote>
            );
          },
          ul({ children, ...props }) {
            return (
              <ul className="list-disc ml-5 my-2.5 space-y-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed" {...props}>
                {children}
              </ul>
            );
          },
          ol({ children, ...props }) {
            return (
              <ol className="list-decimal ml-5 my-2.5 space-y-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed" {...props}>
                {children}
              </ol>
            );
          },
          li({ children, ...props }) {
            return (
              <li className="my-0.5" {...props}>
                {children}
              </li>
            );
          },
          a({ href, children, ...props }) {
            const isExternal = href?.startsWith('http');
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-0.5 font-medium text-[#906BFF] hover:underline"
                {...props}
              >
                <span>{children}</span>
                {isExternal && <ExternalLink className="w-3 h-3 opacity-70" />}
              </a>
            );
          },
          img({ src, alt, ...props }) {
            return (
              <div className="my-6 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-card bg-white dark:bg-neutral-900 flex justify-center">
                <img src={src} alt={alt || 'Figure diagram'} className="max-w-full h-auto object-contain max-h-[500px]" {...props} />
              </div>
            );
          },
          hr({ ...props }) {
            return <hr className="my-8 border-neutral-200 dark:border-neutral-800" {...props} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
