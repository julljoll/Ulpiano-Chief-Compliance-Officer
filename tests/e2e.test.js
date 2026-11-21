import assert from 'node:assert/strict';
import { existsSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import test from 'node:test';
import { chromium } from 'playwright-core';

const distDir = path.resolve('dist');
const axePath = path.resolve('node_modules/axe-core/axe.min.js');

const CHROME_CANDIDATES = [
  process.env.PLAYWRIGHT_CHROME_PATH,
  '/usr/bin/chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
].filter(Boolean);

const executablePath = CHROME_CANDIDATES.find((p) => existsSync(p));

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.csv': 'text/csv; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

const STRICT_CSP =
  "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; object-src 'self'; connect-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';";

function startStaticServer() {
  return new Promise((resolve) => {
    const server = http.createServer(async (req, res) => {
      const reqUrl = new URL(req.url || '/', 'http://127.0.0.1');
      if (reqUrl.pathname === '/__axe.js') {
        const body = await readFile(axePath);
        res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
        res.end(body);
        return;
      }

      const cleanPath = reqUrl.pathname.replace(/^\/+/, '');
      let filePath = path.join(distDir, cleanPath || 'index.html');
      if (existsSync(filePath) && statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      } else if (!existsSync(filePath) && existsSync(path.join(filePath, 'index.html'))) {
        filePath = path.join(filePath, 'index.html');
      }

      if (!filePath.startsWith(distDir) || !existsSync(filePath)) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const body = await readFile(filePath);
      res.writeHead(200, {
        'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
        'Content-Security-Policy': STRICT_CSP,
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
      });
      res.end(body);
    });

    server.listen(0, '127.0.0.1', () => {
      const addr = server.address();
      resolve({ server, baseUrl: `http://127.0.0.1:${addr.port}` });
    });
  });
}

test(
  'E2E Zero-JS (javaScriptEnabled: false): All core reading, charts, diff, diagrams, and matrix pages render completely without JS',
  { skip: !executablePath && 'No Chromium binary installed' },
  async () => {
    const { server, baseUrl } = await startStaticServer();
    const browser = await chromium.launch({
      executablePath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const context = await browser.newContext({
        viewport: { width: 1366, height: 900 },
        javaScriptEnabled: false,
      });
      const page = await context.newPage();

      // 1. Dashboard: SVG charts + inline master SVG + real article links
      await page.goto(`${baseUrl}/`, { waitUntil: 'load' });
      assert.equal(await page.locator('svg.ulp-svg-chart').count(), 1);
      assert.equal(await page.locator('svg.ulp-svg-donut').count(), 1);
      assert.equal(await page.locator('#dashboard-svg-container svg').count(), 1);
      assert.ok((await page.locator('a[href="/lector/v1.2/#articulo-10-bis"]').count()) >= 1);

      // 2. Reader: pre-rendered prose, static TOC, V1.1 & V1.2 reforms, RAG table
      await page.goto(`${baseUrl}/lector/v1.2/`, { waitUntil: 'load' });
      assert.ok((await page.textContent('#paper-sheet')).includes('EXPOSICIÓN DE MOTIVOS'));
      assert.ok((await page.locator('#floating-toc-list li.usa-sidenav__item a').count()) > 10);
      assert.ok((await page.locator('#paper-sheet .reforma-rojo').count()) > 5);
      assert.ok((await page.locator('#paper-sheet .reforma-v12').count()) > 3);

      await page.goto(`${baseUrl}/lector/rag-catalog/`, { waitUntil: 'load' });
      assert.ok((await page.locator('#paper-sheet table.usa-table').count()) > 0);

      // 3. Comparator: pre-rendered parallel texts AND pre-computed semantic diff
      await page.goto(`${baseUrl}/comparador/v1.0-vs-v1.2/`, { waitUntil: 'load' });
      assert.ok((await page.textContent('#compare-left-paper')).includes('Artículo 1'));
      assert.ok((await page.textContent('#compare-right-paper')).includes('Artículo 10-bis'));
      assert.ok((await page.locator('#compare-diff-list .ulp-diff-article').count()) > 15);

      // 4. Diagrams: build-time inlined SVG without client fetch
      await page.goto(`${baseUrl}/diagramas/comparative_law/`, { waitUntil: 'load' });
      assert.equal(await page.locator('[data-svg-viewport] svg').count(), 1);

      // 5. Matrix: static table + direct zero-JS CSV endpoint
      await page.goto(`${baseUrl}/matriz/`, { waitUntil: 'load' });
      assert.equal(await page.locator('#matrix-tbody tr').count(), 12);
      const csvResp = await page.request.get(`${baseUrl}/matriz/trazabilidad.csv`);
      assert.equal(csvResp.status(), 200);
      assert.ok((await csvResp.text()).includes('TÍTULO VII'));
    } finally {
      await browser.close();
      server.close();
    }
  }
);

test(
  'E2E Interactive + Strict CSP + axe-core WCAG 2.1 AA across all multi-page routes',
  { skip: !executablePath && 'No Chromium binary installed' },
  async () => {
    const { server, baseUrl } = await startStaticServer();
    const browser = await chromium.launch({
      executablePath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const pageErrors = [];
    const consoleErrors = [];

    try {
      const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
      const page = await context.newPage();

      page.on('pageerror', (err) => pageErrors.push(err.message));
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      const runAxe = async (label) => {
        await page.addScriptTag({ url: `${baseUrl}/__axe.js` });
        const res = await page.evaluate(async () =>
          window.axe.run(document, {
            runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
          })
        );
        assert.equal(
          res.violations.length,
          0,
          `WCAG violations on ${label}:\n${JSON.stringify(
            res.violations.map((v) => ({
              id: v.id,
              impact: v.impact,
              nodes: v.nodes.map((n) => n.target),
            })),
            null,
            2
          )}`
        );
      };

      // 1. Dashboard + Global Search (Ctrl+K lazy fetch /search-index.json) + Delta Filter + axe
      await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
      await page.fill('#delta-search-input', '19-bis');
      assert.equal(await page.locator('#delta-explorer-tbody tr:not([hidden])').count(), 1);
      await page.fill('#delta-search-input', '');

      await page.click('#btn-open-global-search');
      await page.fill('#global-search-input', '19-bis');
      await page.waitForFunction(
        () => document.querySelectorAll('#global-search-results .ulp-search-result-btn').length >= 1
      );
      await page.click('[data-close-search]');
      await runAxe('/');

      // 2. Legacy hash redirect backwards-compatibility (#reader -> /lector/v1.2/)
      await page.goto(`${baseUrl}/#reader`);
      await page.waitForURL('**/lector/v1.2/**');
      assert.ok(page.url().includes('/lector/v1.2/'), `Expected redirect to /lector/v1.2/, got ${page.url()}`);

      // 3. Reader interactive controls + axe
      await page.click('#btn-font-inc');
      assert.equal(await page.textContent('#reader-font-size-val'), '18px');
      await page.click('#btn-jump-highlight');
      assert.ok((await page.textContent('#highlight-counter')).includes('Reforma 1/'));
      await runAxe('/lector/v1.2/');

      // 4. Comparator mode toggle + only-changes filter + axe
      await page.goto(`${baseUrl}/comparador/v1.0-vs-v1.2/`, { waitUntil: 'networkidle' });
      await page.click('#btn-compare-mode-diff');
      assert.equal(await page.locator('#compare-diff-container').isVisible(), true);
      await runAxe('/comparador/v1.0-vs-v1.2/');

      // 5. Diagrams zoom, fullscreen + axe
      await page.goto(`${baseUrl}/diagramas/master/`, { waitUntil: 'networkidle' });
      await page.click('[data-zoom="0.15"]');
      assert.equal(await page.textContent('[data-zoom-label]'), '115%');
      await page.click('[data-fullscreen]');
      assert.equal(await page.locator('[data-svg-viewer].ulp-fullscreen-active').count(), 1);
      await page.keyboard.press('Escape');
      await runAxe('/diagramas/master/');

      // 6. Matrix composite filtering + axe
      await page.goto(`${baseUrl}/matriz/`, { waitUntil: 'networkidle' });
      await page.click('button[data-sheet="fisma"]');
      await page.fill('#matrix-search-input', '72h');
      assert.equal(await page.locator('#matrix-tbody tr:not([hidden])').count(), 1);
      await page.click('button[data-sheet="original"]');
      assert.equal(await page.locator('#matrix-tbody tr:not([hidden])').count(), 0);
      await page.click('button[data-sheet="all"]');
      await page.fill('#matrix-search-input', '');
      await runAxe('/matriz/');

      // 7. Isolated API Console: real Web Crypto SHA-256 -> QR SVG -> WORM Vault Cotejo + Sorteo + axe
      await page.goto(`${baseUrl}/consola-api/`, { waitUntil: 'networkidle' });
      await page.click('#btn-sim-sign');
      await page.waitForFunction(() =>
        (document.getElementById('sim-sign-result')?.textContent || '').includes('"status": "SUCCESS"')
      );
      assert.equal(await page.locator('#sim-sign-qr-svg svg').count(), 1);
      await page.click('#btn-verify-signed-csv');
      assert.ok((await page.textContent('#sim-cotejo-result')).includes('DOCUMENTO_AUTENTICO'));
      await page.click('#btn-sim-sorteo');
      assert.ok((await page.textContent('#sim-sorteo-result')).includes('SORTEO_COMPLETADO_EXITOSO'));
      await runAxe('/consola-api/');

      // 8. Standalone Backend & Frontend architecture pages + legacy .html redirects + axe
      for (const route of ['/backend/', '/frontend/']) {
        await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
        assert.equal(await page.locator('[data-svg-viewport] svg').count(), 1);
        await page.click('[data-zoom="0.15"]');
        assert.equal(await page.textContent('[data-zoom-label]'), '115%');
        await runAxe(route);
      }

      assert.deepEqual(pageErrors, [], `Uncaught page errors: ${pageErrors.join('; ')}`);
      assert.deepEqual(consoleErrors, [], `Console/CSP errors: ${consoleErrors.join('; ')}`);
    } finally {
      await browser.close();
      server.close();
    }
  }
);
