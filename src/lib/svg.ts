/**
 * ULPIANO CCO — Build-Time Inline SVG Reader (Server/Build Only — 0 KB to browser)
 * Reads static diagrams from public/svg/ during `astro build` and strips any unsafe script tags.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

export function readPublicSvgInline(publicRelativePath: string, ariaLabel: string): string {
  const normalized = publicRelativePath.replace(/^\.?\//, '');
  const fullPath = path.resolve('public', normalized);
  const raw = readFileSync(fullPath, 'utf8');

  // Defense-in-depth build-time strip of any <script> or inline event attributes
  const cleaned = raw
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*')/gi, '');

  const escapedLabel = ariaLabel.replace(/"/g, '&quot;');
  return cleaned.replace(
    /<svg\b([^>]*)>/i,
    `<svg$1 role="img" aria-label="${escapedLabel}">`
  );
}
