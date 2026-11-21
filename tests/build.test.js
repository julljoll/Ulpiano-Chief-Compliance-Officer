import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const outputDirectory = path.resolve('dist');

async function findFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? findFiles(entryPath) : [entryPath];
    })
  );
  return nested.flat();
}

test('Astro MPA build generates all ~26 static routes, endpoints, redirects, and strict CSP compliance', async () => {
  const files = await findFiles(outputDirectory);
  const relFiles = new Set(files.map((f) => path.relative(outputDirectory, f)));

  for (const route of [
    'index.html',
    'lector/index.html',
    'lector/v1.2/index.html',
    'lector/v1.1/index.html',
    'lector/v1.0/index.html',
    'lector/rag-catalog/index.html',
    'comparador/index.html',
    'comparador/v1.0-vs-v1.2/index.html',
    'comparador/v1.1-vs-v1.2/index.html',
    'comparador/v1.0-vs-v1.1/index.html',
    'comparador/v1.2-vs-v1.0/index.html',
    'diagramas/index.html',
    'diagramas/master/index.html',
    'diagramas/comparative_law/index.html',
    'diagramas/backend_python/index.html',
    'diagramas/tsj_sentences_security/index.html',
    'diagramas/tsj_backend_blueprint/index.html',
    'matriz/index.html',
    'matriz/trazabilidad.csv',
    'consola-api/index.html',
    'backend/index.html',
    'frontend/index.html',
    'backend.html',
    'frontend.html',
    'search-index.json',
    '.htaccess',
    'openapi.json',
    'favicon.svg',
    'manifest.json',
    'robots.txt',
    'sw.js',
    'sitemap-index.xml',
  ]) {
    assert.ok(relFiles.has(route), `Missing generated route/asset: ${route}`);
  }

  // Zero uswds.min.js or duplicate uswds.min.css in dist
  assert.ok(
    !files.some((f) => f.includes('uswds.min.js') || f.includes('uswds-init.min.js')),
    'Legacy USWDS JS must not ship in dist/'
  );

  // Check strict CSP and pure static HTML rendering on key pages
  const indexHtml = await readFile(path.join(outputDirectory, 'index.html'), 'utf8');
  const readerV12 = await readFile(path.join(outputDirectory, 'lector/v1.2/index.html'), 'utf8');
  const compareV10V12 = await readFile(
    path.join(outputDirectory, 'comparador/v1.0-vs-v1.2/index.html'),
    'utf8'
  );
  const diagramMaster = await readFile(
    path.join(outputDirectory, 'diagramas/master/index.html'),
    'utf8'
  );

  for (const [name, html] of [
    ['index.html', indexHtml],
    ['lector/v1.2/index.html', readerV12],
    ['comparador/v1.0-vs-v1.2/index.html', compareV10V12],
    ['diagramas/master/index.html', diagramMaster],
  ]) {
    assert.doesNotMatch(html, /\bonclick=/i, `Inline onclick found in ${name}`);
    assert.doesNotMatch(
      html,
      /<script(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/i,
      `Inline <script> without src= found in ${name} (would violate strict CSP script-src 'self')`
    );
    assert.ok(html.includes('manifest.json'), `Missing PWA manifest in ${name}`);
    assert.ok(html.includes('favicon.svg'), `Missing favicon in ${name}`);
  }

  // Verify build-time SVG charts (zero <canvas> Chart.js on index!)
  assert.ok(!indexHtml.includes('<canvas'), 'Dashboard must use build-time SVG charts, not Chart.js canvas');
  assert.ok(indexHtml.includes('bar-chart-title'), 'Missing build-time SVG bar chart');
  assert.ok(indexHtml.includes('donut-chart-title'), 'Missing build-time SVG donut chart');

  // Verify build-time pre-rendered Markdown, TOC, article IDs, and semantic diff
  assert.ok(readerV12.includes('id="articulo-10-bis"'), 'HAST plugin must emit #articulo-10-bis anchor');
  assert.ok(readerV12.includes('class="reforma-rojo"'), 'HAST plugin must convert inline red to .reforma-rojo');
  assert.ok(readerV12.includes('class="reforma-v12"'), 'Reader must preserve .reforma-v12 highlights');
  assert.ok(compareV10V12.includes('ulp-diff-ins'), 'Comparator must pre-render semantic diff insertions');
  assert.ok(diagramMaster.includes('<svg'), 'Diagrams page must inline SVG at build time');

  // Verify static endpoints contain real data
  const searchIndex = JSON.parse(await readFile(path.join(outputDirectory, 'search-index.json'), 'utf8'));
  assert.ok(searchIndex.length >= 60, `Expected >=60 search index entries, got ${searchIndex.length}`);
  const csv = await readFile(path.join(outputDirectory, 'matriz/trazabilidad.csv'), 'utf8');
  assert.ok(csv.startsWith('\uFEFF') && csv.includes('TÍTULO VII'), 'Static CSV endpoint must include UTF-8 BOM and matrix rows');
});

test('Zero-JS budget: Home page (index.html) ships < 10 KB of client JS total', async () => {
  const indexHtml = await readFile(path.join(outputDirectory, 'index.html'), 'utf8');
  const scriptSrcs = [...indexHtml.matchAll(/<script[^>]+src="([^"]+\.js)"/g)].map((m) => m[1]);
  let totalBytes = 0;
  for (const src of scriptSrcs) {
    const filePath = path.join(outputDirectory, src.replace(/^\/+/, ''));
    const info = await stat(filePath);
    totalBytes += info.size;
  }
  assert.ok(
    totalBytes < 10 * 1024,
    `Home JS budget exceeded! Expected <10KB, got ${(totalBytes / 1024).toFixed(2)}KB (${scriptSrcs.join(', ')})`
  );
});
