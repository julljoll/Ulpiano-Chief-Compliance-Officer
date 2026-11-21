/**
 * ULPIANO CCO — Astro Static Build-Time Endpoint (/search-index.json)
 * Generates complete search index across all Content Collections & MATRIX_ROWS at build time.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { MATRIX_ROWS } from '../lib/legal.ts';
import { extractArticleSections } from '../lib/diff.ts';

export const GET: APIRoute = async () => {
  const [versions, reforms, diagrams, normativa] = await Promise.all([
    getCollection('versiones'),
    getCollection('reformas'),
    getCollection('diagramas'),
    getCollection('normativa'),
  ]);

  const entries: Array<{ kind: string; title: string; subtitle: string; href: string }> = [];

  for (const v of versions) {
    entries.push({
      kind: 'Documento',
      title: v.data.label,
      subtitle: `${v.data.type} • ${v.data.date} — ${v.data.description.slice(0, 120)}`,
      href: `/lector/${v.data.id}/`,
    });
  }

  for (const r of reforms) {
    entries.push({
      kind: 'Reforma V-1.2',
      title: r.data.article,
      subtitle: `${r.data.type} — ${r.data.summary}`,
      href: `/lector/${r.data.targetDoc}/#${r.data.targetAnchor}`,
    });
  }

  for (const row of MATRIX_ROWS) {
    const standards = row.comparativeLaw.map((c) => c.tag).join(', ');
    const constitutional = row.constitutionalBlock.map((c) => c.tag).join(', ');
    entries.push({
      kind: 'Matriz ISO/CRBV',
      title: `${row.titleId}: ${row.titleName} (${row.articles})`,
      subtitle: `${row.topic} — ${standards} | ${constitutional}`,
      href: `/matriz/#fila-${row.rowNum}`,
    });
  }

  for (const d of diagrams) {
    entries.push({
      kind: 'Diagrama SVG',
      title: d.data.name,
      subtitle: `${d.data.badge} — ${d.data.sub}`,
      href: `/diagramas/${d.data.id}/`,
    });
  }

  // Index individual articles from v1.2 so Ctrl+K finds any article directly!
  const v12Doc = normativa.find(
    (n) =>
      (n.filePath && n.filePath.toLowerCase().includes('v1.2')) ||
      n.id.toLowerCase().includes('v12')
  );
  if (v12Doc?.body) {
    const articles = extractArticleSections(v12Doc.body).filter((s) =>
      /^art[íi]culo\s+/i.test(s.heading)
    );
    for (const art of articles) {
      entries.push({
        kind: 'Artículo V-1.2',
        title: art.heading,
        subtitle: art.body.slice(0, 140),
        href: `/lector/v1.2/#${art.key}`,
      });
    }
  }

  return new Response(JSON.stringify(entries), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
