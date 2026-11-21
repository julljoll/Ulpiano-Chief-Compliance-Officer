import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { createSatteriMarkdownProcessor } from '@astrojs/markdown-satteri';

import { compareLegislativeMarkdown, diffWords, extractArticleSections } from '../src/lib/diff.ts';
import { sha256Hex, CANONICAL_SENTENCE_RECORD } from '../src/lib/crypto.ts';
import { escapeHtml, slugify, matchesMatrixSheet, serializeMatrixRowsToCsv } from '../src/lib/format.ts';
import { MATRIX_ROWS, validateRegistrySchema } from '../src/lib/legal.ts';
import { createUlpianoHastPlugin } from '../src/plugins/ulpiano-hast.ts';

test('sha256Hex computes authentic NIST FIPS 180-4 SHA-256 digests', async () => {
  assert.equal(
    await sha256Hex(''),
    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  );
  assert.equal(
    await sha256Hex('abc'),
    'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
  );
});

test('Astro 7 Sätteri HAST plugin converts red spans, wraps USWDS tables, and adds article anchors', async () => {
  const proc = await createSatteriMarkdownProcessor({
    hastPlugins: [createUlpianoHastPlugin()],
  });
  const md = [
    '# Título I',
    '',
    '**Artículo 10-bis°.** Texto <span style="color:red">reforma V1.1</span> y <span class="reforma-v12">cláusula FISMA</span>.',
    '',
    '| Norma | Ámbito |',
    '| :--- | :--- |',
    '| FISMA | Auditoría Anual |',
  ].join('\n');

  const { code } = await proc.render(md);
  assert.ok(code.includes('id="articulo-10-bis"'), 'Must emit deterministic article ID');
  assert.ok(code.includes('class="reforma-rojo"'), 'Must convert style="color:red" to .reforma-rojo');
  assert.ok(code.includes('class="reforma-v12"'), 'Must preserve .reforma-v12');
  assert.ok(code.includes('usa-table-container--scrollable'), 'Must wrap tables in accessible USWDS container');
});

test('build-time semantic legislative diff engine accurately classifies added, modified, and unchanged articles', async () => {
  const v10 = await readFile('docs/ciberseguridadprocesal_V1.0.md', 'utf8');
  const v12 = await readFile('docs/ciberseguridadprocesal_v1.2.md', 'utf8');

  const sectionsV12 = extractArticleSections(v12);
  assert.ok(sectionsV12.length >= 25, `Expected >=25 sections, got ${sectionsV12.length}`);

  const diffs = compareLegislativeMarkdown(v10, v12);
  assert.ok(diffs.some((d) => d.status === 'added'));
  assert.ok(diffs.some((d) => d.status === 'modified'));

  const wordDiff = diffWords('Ley Especial de Ciberseguridad', 'Ley Orgánica de Ciberseguridad Procesal');
  assert.ok(wordDiff.some((t) => t.type === 'del' && t.value.includes('Especial')));
  assert.ok(wordDiff.some((t) => t.type === 'add' && t.value.includes('Orgánica')));
});

test('formatting, matrix filters, and static CSV serialization work accurately', () => {
  assert.equal(escapeHtml('<script>"x"</script>'), '&lt;script&gt;&quot;x&quot;&lt;/script&gt;');
  assert.equal(slugify('Artículo 10-bis°: Auditoría'), 'articulo-10-bis-auditoria');
  assert.equal(matchesMatrixSheet('organica fisma', 'art. 203 crbv', 'organica'), true);
  assert.equal(matchesMatrixSheet('forense', 'iso/iec 27037', 'fisma'), false);

  const csv = serializeMatrixRowsToCsv(MATRIX_ROWS);
  assert.ok(csv.startsWith('\uFEFF'), 'CSV must start with UTF-8 BOM');
  assert.equal(csv.trim().split('\n').length, MATRIX_ROWS.length + 1);
});

test('JSON collections (registry, diagrams, reforms) are complete and schema-valid', async () => {
  const docs = validateRegistrySchema(JSON.parse(await readFile('registry.json', 'utf8')));
  assert.equal(docs.length, 4);

  const diagrams = JSON.parse(await readFile('src/data/diagrams.json', 'utf8'));
  assert.equal(diagrams.length, 12);

  const reforms = JSON.parse(await readFile('src/data/reforms.json', 'utf8'));
  assert.equal(reforms.length, 14);
  assert.equal(CANONICAL_SENTENCE_RECORD.csvCode, 'TSJ-2026-SC-0406-V12-F9A7');
});
