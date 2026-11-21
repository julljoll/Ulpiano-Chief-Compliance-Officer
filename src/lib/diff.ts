/**
 * ULPIANO CCO — Build-Time Semantic Legislative Article Parser & Word-Level Diff Engine
 * Runs ONLY during `astro build` (0 KB sent to the browser!).
 */
import type { ArticleDiffItem, ArticleSection, DiffToken } from '../types/legal.ts';
import { slugify } from './format.ts';

function stripInlineHtmlAndMd(text: string): string {
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractArticleSections(markdown: string): ArticleSection[] {
  const lines = markdown.split(/\r?\n/);
  const sections: ArticleSection[] = [];
  let currentHeading = 'Encabezado y Exposición Preliminar';
  let currentKey = 'encabezado-preliminar';
  let buffer: string[] = [];

  const articleRegex =
    /^(?:#{1,4}\s*)?(?:\*\*)?(?:<[^>]+>)*\s*(Art[íi]culo\s+\d+(?:-bis)?°?|Disposici[óo]n\s+(?:Final|Transitoria|Derogatoria)\s+\w+|EXPOSICI[ÓO]N DE MOTIVOS|T[ÍI]TULO\s+[IVXLC]+|ANEXO[^\n]*)(.*)/i;

  const flush = () => {
    const body = stripInlineHtmlAndMd(buffer.join(' '));
    if (body.length > 0) {
      sections.push({ key: currentKey, heading: currentHeading, body });
    }
    buffer = [];
  };

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();
    const match = trimmed.match(articleRegex);
    if (match) {
      flush();
      const rawIdentifier = match[1].trim();
      const cleanFullHeading = stripInlineHtmlAndMd(trimmed.replace(/^#+\s*/, ''));
      currentHeading = cleanFullHeading.slice(0, 140);
      currentKey = slugify(rawIdentifier);
      buffer.push(trimmed);
    } else if (trimmed.length > 0 && !trimmed.startsWith('---')) {
      buffer.push(trimmed);
    }
  }
  flush();

  const seen = new Map<string, number>();
  return sections.map((sec) => {
    const count = seen.get(sec.key) ?? 0;
    seen.set(sec.key, count + 1);
    return count === 0 ? sec : { ...sec, key: `${sec.key}-${count + 1}` };
  });
}

export function diffWords(oldText: string, newText: string): DiffToken[] {
  if (oldText === newText) {
    return oldText ? [{ type: 'equal', value: oldText }] : [];
  }
  const a = oldText.split(/\s+/).filter(Boolean);
  const b = newText.split(/\s+/).filter(Boolean);

  if (a.length * b.length > 180_000) {
    return [
      ...(oldText ? [{ type: 'del' as const, value: oldText }] : []),
      ...(newText ? [{ type: 'add' as const, value: newText }] : []),
    ];
  }

  const m = a.length;
  const n = b.length;
  const dp: Uint16Array[] = Array.from({ length: m + 1 }, () => new Uint16Array(n + 1));

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (a[i] === b[j]) {
        dp[i][j] = dp[i + 1][j + 1] + 1;
      } else {
        dp[i][j] = dp[i + 1][j] >= dp[i][j + 1] ? dp[i + 1][j] : dp[i][j + 1];
      }
    }
  }

  const rawTokens: DiffToken[] = [];
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (a[i] === b[j]) {
      rawTokens.push({ type: 'equal', value: a[i] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      rawTokens.push({ type: 'del', value: a[i] });
      i++;
    } else {
      rawTokens.push({ type: 'add', value: b[j] });
      j++;
    }
  }
  while (i < m) rawTokens.push({ type: 'del', value: a[i++] });
  while (j < n) rawTokens.push({ type: 'add', value: b[j++] });

  const merged: DiffToken[] = [];
  for (const tok of rawTokens) {
    const prev = merged[merged.length - 1];
    if (prev && prev.type === tok.type) {
      prev.value = `${prev.value} ${tok.value}`;
    } else {
      merged.push({ ...tok });
    }
  }
  return merged;
}

export function compareLegislativeMarkdown(leftMd: string, rightMd: string): ArticleDiffItem[] {
  const leftSections = extractArticleSections(leftMd);
  const rightSections = extractArticleSections(rightMd);

  const leftMap = new Map(leftSections.map((s) => [s.key, s]));
  const rightMap = new Map(rightSections.map((s) => [s.key, s]));

  const orderedKeys: string[] = [];
  for (const s of rightSections) {
    if (!orderedKeys.includes(s.key)) orderedKeys.push(s.key);
  }
  for (const s of leftSections) {
    if (!orderedKeys.includes(s.key)) orderedKeys.push(s.key);
  }

  return orderedKeys.map((key) => {
    const left = leftMap.get(key);
    const right = rightMap.get(key);

    if (!left && right) {
      return {
        key,
        heading: right.heading,
        status: 'added',
        leftText: '',
        rightText: right.body,
        tokens: [{ type: 'add', value: right.body }],
      };
    }
    if (left && !right) {
      return {
        key,
        heading: left.heading,
        status: 'removed',
        leftText: left.body,
        rightText: '',
        tokens: [{ type: 'del', value: left.body }],
      };
    }

    const lBody = left!.body;
    const rBody = right!.body;
    if (lBody === rBody) {
      return {
        key,
        heading: right!.heading,
        status: 'unchanged',
        leftText: lBody,
        rightText: rBody,
        tokens: [{ type: 'equal', value: rBody }],
      };
    }
    return {
      key,
      heading: right!.heading,
      status: 'modified',
      leftText: lBody,
      rightText: rBody,
      tokens: diffWords(lBody, rBody),
    };
  });
}
