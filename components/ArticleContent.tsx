'use client';

import React from 'react';
import { slugify } from '@/lib/utils';

interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  // Parse markdown content into structured blocks
  const parseMarkdown = (md: string) => {
    const lines = md.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBuffer: string[] = [];
    let tableBuffer: string[] = [];
    let listBuffer: string[] = [];
    let listType: 'ul' | 'ol' = 'ul';

    const flushCode = (key: string) => {
      if (codeBuffer.length > 0) {
        elements.push(
          <pre key={key} className="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs sm:text-sm font-mono my-6 border border-slate-800">
            <code>{codeBuffer.join('\n')}</code>
          </pre>
        );
        codeBuffer = [];
      }
    };

    const flushTable = (key: string) => {
      if (tableBuffer.length > 0) {
        const rows = tableBuffer.map((r) =>
          r
            .split('|')
            .map((c) => c.trim())
            .filter((c, i, arr) => i > 0 && i < arr.length - 1)
        );

        if (rows.length >= 2) {
          const header = rows[0];
          const body = rows.slice(2); // Skip separator row

          elements.push(
            <div key={key} className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {header.map((col, idx) => (
                      <th
                        key={idx}
                        className="px-4 py-3 text-left font-bold text-slate-800 tracking-wider text-xs uppercase"
                        dangerouslySetInnerHTML={{ __html: formatInline(col) }}
                      />
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {body.map((row, rIdx) => (
                    <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className="px-4 py-3 text-slate-700 text-xs sm:text-sm"
                          dangerouslySetInnerHTML={{ __html: formatInline(cell) }}
                        />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        tableBuffer = [];
      }
    };

    const flushList = (key: string) => {
      if (listBuffer.length > 0) {
        if (listType === 'ul') {
          elements.push(
            <ul key={key} className="list-disc pl-6 space-y-1.5 my-4 text-slate-700 text-base">
              {listBuffer.map((item, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
              ))}
            </ul>
          );
        } else {
          elements.push(
            <ol key={key} className="list-decimal pl-6 space-y-1.5 my-4 text-slate-700 text-base">
              {listBuffer.map((item, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
              ))}
            </ol>
          );
        }
        listBuffer = [];
      }
    };

    const formatInline = (text: string): string => {
      return text
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        .replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-teal-700 font-mono text-xs px-1.5 py-0.5 rounded border border-slate-200">$1</code>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-brand-blue hover:underline font-semibold" target="_blank" rel="noopener noreferrer">$1</a>');
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Code blocks ```
      if (trimmed.startsWith('```')) {
        if (inCodeBlock) {
          flushCode(`code-${index}`);
          inCodeBlock = false;
        } else {
          flushTable(`table-${index}`);
          flushList(`list-${index}`);
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      // Tables
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        flushList(`list-${index}`);
        tableBuffer.push(trimmed);
        return;
      } else {
        flushTable(`table-${index}`);
      }

      // Lists
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        listType = 'ul';
        listBuffer.push(trimmed.slice(2));
        return;
      } else if (/^\d+\.\s+/.test(trimmed)) {
        listType = 'ol';
        listBuffer.push(trimmed.replace(/^\d+\.\s+/, ''));
        return;
      } else {
        flushList(`list-${index}`);
      }

      // Headings
      if (trimmed.startsWith('## ')) {
        const text = trimmed.slice(3).replace(/\*\*/g, '');
        const id = slugify(text);
        elements.push(
          <h2
            key={`h2-${index}`}
            id={id}
            className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 mt-10 mb-4 pt-4 border-b border-slate-200 pb-2 scroll-mt-24"
          >
            {text}
          </h2>
        );
        return;
      }

      if (trimmed.startsWith('### ')) {
        const text = trimmed.slice(4).replace(/\*\*/g, '');
        const id = slugify(text);
        elements.push(
          <h3
            key={`h3-${index}`}
            id={id}
            className="font-heading font-bold text-xl sm:text-2xl text-slate-800 mt-8 mb-3 scroll-mt-24"
          >
            {text}
          </h3>
        );
        return;
      }

      if (trimmed.startsWith('#### ')) {
        const text = trimmed.slice(5).replace(/\*\*/g, '');
        elements.push(
          <h4 key={`h4-${index}`} className="font-heading font-bold text-lg text-slate-800 mt-6 mb-2">
            {text}
          </h4>
        );
        return;
      }

      // Blockquote
      if (trimmed.startsWith('> ')) {
        elements.push(
          <blockquote
            key={`quote-${index}`}
            className="border-l-4 border-brand-teal bg-teal-50/70 p-4 rounded-r-xl my-6 text-slate-800 text-sm sm:text-base italic leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatInline(trimmed.slice(2)) }}
          />
        );
        return;
      }

      // Divider
      if (trimmed === '---') {
        elements.push(<hr key={`hr-${index}`} className="my-8 border-slate-200" />);
        return;
      }

      // Empty line
      if (!trimmed) {
        return;
      }

      // Standard Paragraph
      elements.push(
        <p
          key={`p-${index}`}
          className="text-slate-700 text-base sm:text-lg leading-relaxed my-4"
          dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
        />
      );
    });

    flushCode('code-end');
    flushTable('table-end');
    flushList('list-end');

    return elements;
  };

  return <div className="article-prose">{parseMarkdown(content)}</div>;
}
