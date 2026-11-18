/**
 * ULPIANO CCO — TypeScript Type Definitions
 * Tipado estricto para el ecosistema de planillas y módulos normativos
 */

export type ViewKey = 'dashboard' | 'diagrams' | 'api' | 'reader' | 'compare' | 'matrix';

export interface ReformItem {
  article: string;
  type: string;
  badgeClass?: string;
  summary: string;
  impact: string;
  before: string;
  beforeTag: string;
  after: string;
  afterTag: string;
  targetDoc: string;
}

export interface DocumentEntry {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeClass?: string;
  date: string;
  pages: number;
  wordCount: number;
  hash: string;
  content: string;
}

export interface DiagramLayer {
  number: number;
  name: string;
  tech: string;
  desc: string;
  legal: string;
  badgeColor?: string;
}

export interface DiagramItem {
  id: string;
  title: string;
  sub: string;
  badge: string;
  file: string;
  layers: DiagramLayer[];
}

export interface MatrixTagItem {
  tag: string;
  detail: string;
  isOriginal?: boolean;
  isImportant?: boolean;
}

export interface MatrixRowItem {
  rowNum: string;
  titleId: string;
  titleName: string;
  articles: string;
  topic: string;
  scope: string;
  category: string;
  hierarchy: string;
  isStar?: boolean;
  comparativeLaw: MatrixTagItem[];
  constitutionalBlock: MatrixTagItem[];
}

export interface SimulationResult {
  ok: boolean;
  timestamp: string;
  action: string;
  hash?: string;
  details: Record<string, unknown>;
}
