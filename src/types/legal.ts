/**
 * ULPIANO CCO — Strict TypeScript Type Definitions
 * Tipado estricto compartido entre plantillas Astro, módulos interactivos y pruebas.
 */

export type ViewKey = 'dashboard' | 'diagrams' | 'api' | 'reader' | 'compare' | 'matrix';

export type SemanticVariant = 'primary' | 'success' | 'warning' | 'error' | 'forensic';

export type DiagramCategory = 'all' | 'gobernanza' | 'normativa' | 'arquitectura';

export interface CoreReform {
  tag: string;
  variant?: SemanticVariant;
  articles: string;
  title: string;
  desc: string;
  before: string;
  after: string;
  benefit: string;
}

export interface ReformsDistribution {
  labels: string[];
  data: number[];
}

export interface DocumentMeta {
  id: string;
  kind?: 'normative' | 'catalog';
  label: string;
  shortLabel: string;
  sourceFile: string;
  type: string;
  hierarchy: string;
  hierarchySub: string;
  articlesCount: number;
  titlesCount: string;
  coverage: string;
  coverageSub: string;
  badge: string;
  badgeText: string;
  date: string;
  changes: number;
  changesLabel: string;
  changesTag: string;
  description: string;
  highlights: string[];
  coreReforms: CoreReform[];
  reformsDistribution: ReformsDistribution;
}

export interface ReformItem {
  article: string;
  type: string;
  variant: SemanticVariant;
  summary: string;
  impact: string;
  before: string;
  beforeTag: string;
  after: string;
  afterTag: string;
  targetDoc: string;
  targetQuery: string;
}

export interface DiagramBreakdownItem {
  title: string;
  badge: string;
  variant: SemanticVariant;
  desc: string;
}

export interface DiagramItem {
  id: string;
  category: Exclude<DiagramCategory, 'all'>;
  name: string;
  shortName: string;
  badge: string;
  sub: string;
  file: string;
  breakdown: DiagramBreakdownItem[];
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

export interface SignedVaultRecord {
  csvCode: string;
  expediente: string;
  tribunal: string;
  firmante: string;
  hashSha256: string;
  timestampIso: string;
  fileName?: string;
  merkleIndex: number;
}

export interface ArticleSection {
  key: string;
  heading: string;
  body: string;
}

export interface DiffToken {
  type: 'equal' | 'add' | 'del';
  value: string;
}

export interface ArticleDiffItem {
  key: string;
  heading: string;
  status: 'added' | 'removed' | 'modified' | 'unchanged';
  leftText: string;
  rightText: string;
  tokens: DiffToken[];
}

export interface SearchResultEntry {
  kind: 'reforma' | 'matriz' | 'diagrama' | 'documento';
  title: string;
  subtitle: string;
  view: ViewKey;
  docId?: string;
  query?: string;
  diagramId?: string;
}

export interface AppState {
  currentView: ViewKey;
  currentDocKey: string;
  currentDiagramTab: string;
  currentDiagramCategory: DiagramCategory;
  diagramZoom: number;
  fontFamily: 'serif' | 'sans';
  fontSize: number;
  matrixSheet: string;
  matrixQuery: string;
  highlightFilter: 'all' | 'v11' | 'v12';
  currentHighlightIndex: number;
  highlightSpans: HTMLElement[];
  compareMode: 'parallel' | 'diff';
  compareOnlyChanges: boolean;
  compareSyncScroll: boolean;
}

export interface ArchLayerItem {
  badge: string;
  title: string;
  tech: string;
  desc: string;
  legal: string;
}
