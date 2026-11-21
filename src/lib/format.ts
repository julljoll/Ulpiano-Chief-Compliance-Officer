/**
 * ULPIANO CCO — Pure Formatting, CSV Serialization & Filtering Helpers (Isomorphic)
 */
import type { MatrixRowItem, SemanticVariant } from '../types/legal.ts';

const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#039;',
};

export function escapeHtml(str: unknown): string {
  if (str === null || str === undefined) return '';
  return String(str).replace(/[&<>"']/g, (m) => HTML_ESCAPE_MAP[m] ?? m);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
}

export function variantTagClass(variant?: SemanticVariant): string {
  switch (variant) {
    case 'success':
      return 'usa-tag ulp-tag-success';
    case 'warning':
      return 'usa-tag ulp-tag-warning';
    case 'error':
      return 'usa-tag ulp-tag-v11';
    case 'forensic':
      return 'usa-tag ulp-tag-forensic';
    default:
      return 'usa-tag ulp-tag-v12';
  }
}

export function matchesMatrixSheet(category: string, text: string, sheetType: string): boolean {
  if (sheetType === 'all') return true;
  if (sheetType === 'organica') {
    return (
      category.includes('organica') ||
      category.includes('cierre') ||
      text.includes('0406') ||
      text.includes('203')
    );
  }
  if (sheetType === 'fisma') {
    return category.includes('fisma') || text.includes('fisma') || text.includes('2023/2841');
  }
  if (sheetType === 'original') {
    return (
      category.includes('original') ||
      text.includes('aporte original') ||
      text.includes('título vii')
    );
  }
  if (sheetType === 'forense') {
    return (
      category.includes('forense') ||
      category.includes('punitivo') ||
      text.includes('27037') ||
      text.includes('sancionatorio')
    );
  }
  return true;
}

/**
 * Generates an Excel-compatible UTF-8 BOM CSV directly from MATRIX_ROWS in build-time endpoint.
 */
export function serializeMatrixRowsToCsv(rows: MatrixRowItem[]): string {
  const quote = (val: string) => `"${val.replace(/"/g, '""').replace(/\r?\n/g, ' ').trim()}"`;
  let csv = '\uFEFF';
  csv +=
    '"Fila";"Título & Artículos";"Materia Regulada & Alcance";"Derecho Comparado / Estándares";"Bloque Constitucional & Nacional";"Jerarquía"\r\n';

  for (const row of rows) {
    const titleCol = `${row.titleId} ${row.titleName} (${row.articles})`;
    const scopeCol = `${row.topic} — ${row.scope}`;
    const compCol = row.comparativeLaw.map((c) => `${c.tag}: ${c.detail}`).join(' | ');
    const constCol = row.constitutionalBlock.map((c) => `${c.tag}: ${c.detail}`).join(' | ');
    csv += [
      quote(row.rowNum),
      quote(titleCol),
      quote(scopeCol),
      quote(compCol),
      quote(constCol),
      quote(row.hierarchy),
    ].join(';');
    csv += '\r\n';
  }

  return csv;
}

/**
 * Maps a registry.json sourceFile ("docs/ciberseguridadprocesal_v1.2.md") to Astro Content Collection entry ID.
 */
export function sourceFileToCollectionId(sourceFile: string): string {
  return sourceFile
    .replace(/^docs\//, '')
    .replace(/\.md$/i, '')
    .toLowerCase();
}
