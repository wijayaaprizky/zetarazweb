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
          <pre key={key}>
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
            <div key={key} className="table-wrap">
              <table>
                <thead>
                  <tr>
                    {header.map((col, idx) => (
                      <th
                        key={idx}
                        dangerouslySetInnerHTML={{ __html: formatInline(col) }}
                      />
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {body.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
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
            <ul key={key}>
              {listBuffer.map((item, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
              ))}
            </ul>
          );
        } else {
          elements.push(
            <ol key={key}>
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
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" loading="lazy" />')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
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
          >
            {text}
          </h3>
        );
        return;
      }

      if (trimmed.startsWith('#### ')) {
        const text = trimmed.slice(5).replace(/\*\*/g, '');
        elements.push(
          <h4 key={`h4-${index}`}>
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
            dangerouslySetInnerHTML={{ __html: formatInline(trimmed.slice(2)) }}
          />
        );
        return;
      }

      // Divider
      if (trimmed === '---') {
        elements.push(<hr key={`hr-${index}`} />);
        return;
      }

      // Markdown Image ![alt](url)
      const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imgMatch) {
        const alt = imgMatch[1];
        const src = imgMatch[2];
        elements.push(
          <figure key={`img-${index}`}>
            <img
              src={src}
              alt={alt || 'Ilustrasi artikel'}
              loading="lazy"
            />
            {alt && (
              <figcaption>
                {alt}
              </figcaption>
            )}
          </figure>
        );
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
