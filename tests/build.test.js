import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const outputDirectory = path.resolve('dist');

async function findFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? findFiles(entryPath) : [entryPath];
  }));
  return nested.flat();
}

test('Astro build preserves all HTML entry URLs and application views', async () => {
  const files = await findFiles(outputDirectory);
  for (const route of ['index.html', 'frontend.html', 'backend.html']) {
    assert.ok(files.includes(path.join(outputDirectory, route)), `Missing /${route}`);
  }

  const index = await readFile(path.join(outputDirectory, 'index.html'), 'utf8');
  for (const view of ['dashboard', 'diagrams', 'api', 'reader', 'compare', 'matrix']) {
    assert.match(index, new RegExp(`data-view="${view}"`), `Missing ${view} navigation`);
    assert.match(index, new RegExp(`id="view-${view}"`), `Missing ${view} view`);
  }
  for (const control of [
    'reader-version-select',
    'paper-sheet',
    'floating-toc-filter',
    'btn-toggle-floating-toc',
    'btn-jump-red-highlight',
    'delta-search-input',
    'delta-explorer-tbody',
    'compare-select-left',
    'compare-select-right',
    'matrix-search-input',
    'matrix-filter-count',
    'matrix-tbody',
    'diagram-viewport-content',
    'diagram-zoom-val',
    'dashboard-svg-container',
    'sim-sign-result',
    'sim-cotejo-result',
    'sim-sorteo-result',
    'sim-ws-feed'
  ]) {
    assert.ok(index.includes(`id="${control}"`), `Missing interaction target ${control}`);
  }

  const frontend = await readFile(path.join(outputDirectory, 'frontend.html'), 'utf8');
  const backend = await readFile(path.join(outputDirectory, 'backend.html'), 'utf8');
  assert.ok(frontend.includes('href="backend.html"'));
  assert.ok(backend.includes('href="frontend.html"'));
});

test('static assets, app bundles, and all document sources ship in the production build', async () => {
  const files = await findFiles(outputDirectory);
  for (const asset of ['manifest.json', 'svg/ciberseguridad_integracion_V1.2.svg', 'svg/backend_python_api_arquitectura.svg']) {
    assert.ok(files.includes(path.join(outputDirectory, asset)), `Missing ${asset}`);
  }

  const index = await readFile(path.join(outputDirectory, 'index.html'), 'utf8');
  const assetReferences = [...index.matchAll(/(?:src|href)="([^"]*_astro\/[^"]+)"/g)].map(match => match[1]);
  assert.ok(assetReferences.some(asset => asset.endsWith('.js')), 'Missing bundled application script');
  assert.ok(assetReferences.some(asset => asset.endsWith('.css')), 'Missing bundled application styles');
  for (const asset of assetReferences) {
    assert.ok(files.includes(path.join(outputDirectory, asset.replace(/^\//, ''))), `Broken bundle reference ${asset}`);
  }

  const bundles = await Promise.all(files.filter(file => file.endsWith('.js')).map(file => readFile(file, 'utf8')));
  const documentBundle = bundles.join('\n');
  for (const phrase of ['LOCOTA 2026', 'EXPOSICIÓN DE MOTIVOS', 'ANTEPROYECTO DE LEY ORGÁNICA']) {
    assert.ok(documentBundle.includes(phrase), `Missing Markdown source content: ${phrase}`);
  }
});
