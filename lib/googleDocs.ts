import crypto from 'crypto';

/**
 * Registry of simulated / mock Google Docs for testing and offline development.
 */
const mockDocsRegistry = new Map<
  string,
  { title?: string; content: string; revisionId: string }
>();

/**
 * Register or update a simulated Google Doc in memory (for testing/mocking).
 */
export function setMockGoogleDoc(
  docId: string,
  data: { title?: string; content: string; revisionId?: string }
) {
  const cleanId = extractDocId(docId);
  const rev =
    data.revisionId ||
    `rev_${crypto.createHash('sha256').update(data.content).digest('hex').substring(0, 12)}`;
  mockDocsRegistry.set(cleanId, {
    title: data.title,
    content: data.content,
    revisionId: rev,
  });
}

/**
 * Get a simulated Google Doc from memory.
 */
export function getMockGoogleDoc(docId: string) {
  const cleanId = extractDocId(docId);
  return mockDocsRegistry.get(cleanId);
}

/**
 * Extract clean 44-character Google Doc ID from a URL or raw ID string.
 */
export function extractDocId(input: string): string {
  if (!input) return '';
  const trimmed = input.trim();
  const urlMatch = trimmed.match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1];
  }
  return trimmed;
}

/**
 * Convert Google Docs exported HTML to clean, semantic editorial Markdown.
 */
export function convertGoogleDocsHtmlToMarkdown(html: string): string {
  if (!html) return '';

  let text = html;

  // Extract body content if full HTML document
  const bodyMatch = text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    text = bodyMatch[1];
  }

  // Remove <style>, <script>, <meta> tags
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<meta[^>]*>/gi, '');

  // Convert Headings
  text = text.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n\n# $1\n\n');
  text = text.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n\n## $1\n\n');
  text = text.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n\n### $1\n\n');
  text = text.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n\n#### $1\n\n');
  text = text.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, '\n\n##### $1\n\n');
  text = text.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, '\n\n###### $1\n\n');

  // Convert Blockquotes
  text = text.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (match, p1) => {
    const cleanLines = p1
      .trim()
      .split('\n')
      .map((l: string) => `> ${l.trim()}`)
      .join('\n');
    return `\n\n${cleanLines}\n\n`;
  });

  // Convert Bold & Italic
  text = text.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/(strong|b)>/gi, '**$2**');
  text = text.replace(/<(em|i)[^>]*>([\s\S]*?)<\/(em|i)>/gi, '*$2*');

  // Convert Links
  text = text.replace(/<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi, (match, href, label) => {
    // Strip google redirect if present
    const cleanHref = href.replace(/^https:\/\/www\.google\.com\/url\?q=([^&]+)&.*/, '$1');
    const cleanLabel = label.replace(/<[^>]+>/g, '').trim();
    return cleanLabel ? `[${cleanLabel}](${cleanHref})` : '';
  });

  // Convert Tables
  text = text.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (match, tableContent) => {
    const rows = tableContent.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];
    if (rows.length === 0) return '';

    let mdTable = '\n\n';
    rows.forEach((row: string, rowIndex: number) => {
      const cells = row.match(/<(th|td)[^>]*>([\s\S]*?)<\/(th|td)>/gi) || [];
      const cellTexts = cells.map((cell: string) => {
        return cell
          .replace(/<(th|td)[^>]*>/gi, '')
          .replace(/<\/(th|td)>/gi, '')
          .replace(/<[^>]+>/g, '')
          .trim();
      });

      mdTable += `| ${cellTexts.join(' | ')} |\n`;

      if (rowIndex === 0) {
        const separators = cellTexts.map(() => '---');
        mdTable += `| ${separators.join(' | ')} |\n`;
      }
    });

    return mdTable + '\n';
  });

  // Convert Unordered Lists
  text = text.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (match, listContent) => {
    const items = listContent.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
    const mdItems = items.map((item: string) => {
      const clean = item.replace(/<li[^>]*>/gi, '').replace(/<\/li>/gi, '').trim();
      return `* ${clean}`;
    });
    return `\n\n${mdItems.join('\n')}\n\n`;
  });

  // Convert Ordered Lists
  text = text.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (match, listContent) => {
    const items = listContent.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
    const mdItems = items.map((item: string, idx: number) => {
      const clean = item.replace(/<li[^>]*>/gi, '').replace(/<\/li>/gi, '').trim();
      return `${idx + 1}. ${clean}`;
    });
    return `\n\n${mdItems.join('\n')}\n\n`;
  });

  // Convert Paragraphs & Line Breaks
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n\n$1\n\n');

  // Strip remaining HTML tags
  text = text.replace(/<[^>]+>/g, '');

  // Decode common HTML entities
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  // Clean excessive whitespace and blank lines
  text = text.replace(/\n{3,}/g, '\n\n').trim();

  return text;
}

/**
 * Fetch and convert content from a Google Doc.
 * Supports registered mock docs, live public Google Doc exports, and custom force updates.
 */
export async function fetchGoogleDoc(
  docIdOrUrl: string
): Promise<{ title?: string; content: string; revisionId: string }> {
  const docId = extractDocId(docIdOrUrl);
  if (!docId) {
    throw new Error('Google Doc ID atau URL tidak valid.');
  }

  // 1. Check in-memory mock registry (for tests and simulation)
  const mock = mockDocsRegistry.get(docId);
  if (mock) {
    return {
      title: mock.title,
      content: mock.content,
      revisionId: mock.revisionId,
    };
  }

  // 2. Fetch live Google Docs export (HTML)
  try {
    const exportUrl = `https://docs.google.com/document/d/${docId}/export?format=html`;
    const response = await fetch(exportUrl, {
      headers: {
        'User-Agent': 'ZETARAZ-Knowledge-Sync/1.0',
      },
      // Short timeout to fail fast if offline
      signal: AbortSignal.timeout(6000),
    });

    if (!response.ok) {
      throw new Error(
        `Gagal mengunduh dokumen Google Docs (HTTP ${response.status}: ${response.statusText}). Pastikan link dapat diakses publik atau izin dibagikan.`
      );
    }

    const html = await response.text();

    // Extract title if present
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/ - Google Docs$/, '').trim() : undefined;

    // Convert HTML to Markdown
    const markdown = convertGoogleDocsHtmlToMarkdown(html);

    // Compute revision hash for idempotency
    const revisionId = `rev_${crypto.createHash('sha256').update(markdown).digest('hex').substring(0, 16)}`;

    return {
      title,
      content: markdown,
      revisionId,
    };
  } catch (err: any) {
    // If network fetch fails and no mock is present, throw detailed error
    throw new Error(
      `Sinkronisasi Google Docs gagal: ${err.message || 'Koneksi ke dokumen terputus'}`
    );
  }
}
