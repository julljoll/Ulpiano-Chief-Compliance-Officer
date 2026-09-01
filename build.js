/**
 * ULPIANO CCO — Build Script (Node.js)
 * Convierte los archivos .md a componentes HTML autónomos en components/docs/
 * Soporta modo normal, watch (--watch) y producción (--prod)
 * Uso: node build.js [--watch] [--prod]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\x1b[36m====================================================\x1b[0m');
console.log('\x1b[37m ⚖️ ULPIANO CCO — Compilador de Componentes HTML \x1b[0m');
console.log('\x1b[36m====================================================\x1b[0m');

const registryPath = path.join(__dirname, 'registry.json');
if (!fs.existsSync(registryPath)) {
  console.error('\x1b[31mError: registry.json no encontrado.\x1b[0m');
  process.exit(1);
}

const outDir = path.join(__dirname, 'components', 'docs');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function convertMdToHtml(md) {
  let text = md.replace(/\r\n/g, '\n');

  // Convert inline color:red spans to .reforma-rojo before any parsing
  text = text.replace(/<span style="color:\s*red">([\s\S]*?)<\/span>/gi, '<span class="reforma-rojo">$1</span>');

  // Code blocks (fenced)
  text = text.replace(/```([a-zA-Z0-9_]*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');

  // Blockquotes
  text = text.replace(/^\>\s+(.*)$/gm, '<blockquote>$1</blockquote>');

  // Headings
  text = text.replace(/^###### (.*)$/gm, '<h6>$1</h6>');
  text = text.replace(/^##### (.*)$/gm, '<h5>$1</h5>');
  text = text.replace(/^#### (.*)$/gm, '<h4>$1</h4>');
  text = text.replace(/^### (.*)$/gm, '<h3>$1</h3>');
  text = text.replace(/^## (.*)$/gm, '<h2>$1</h2>');
  text = text.replace(/^# (.*)$/gm, '<h1>$1</h1>');

  // Bold & Italic
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/(?<!\*)\*([^\*\n]+?)\*(?!\*)/g, '<em>$1</em>');

  // Horizontal rules
  text = text.replace(/^---+$/gm, '<hr class="my-4">');

  // Ordered list items
  text = text.replace(/^\s*(\d+)\.\s+(.*)$/gm, '<li value="$1">$2</li>');

  // Bullet items
  text = text.replace(/^\s*-\s+(.*)$/gm, '<li>$1</li>');
  text = text.replace(/(<li>[\s\S]*?<\/li>(\s*<li>[\s\S]*?<\/li>)*)/g, '<ul>$1</ul>');

  // Paragraphs & Tables
  const blocks = text.split(/\n\s*\n/);
  const processed = blocks.map(block => {
    const b = block.trim();
    if (!b) return '';

    // Markdown Table Detection
    const lines = b.split('\n').filter(l => l.trim().length > 0);
    if (lines.length >= 2 && lines[0].trim().startsWith('|') && lines[0].trim().endsWith('|') && /^\s*\|[\s\:\-\|]+\|\s*$/.test(lines[1])) {
      const headerCells = lines[0].trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
      const thHtml = headerCells.map(c => `<th>${c}</th>`).join('');
      const rowsHtml = [];

      for (let i = 2; i < lines.length; i++) {
        const rowLine = lines[i].trim();
        if (!rowLine.startsWith('|') || !rowLine.endsWith('|')) continue;
        const cells = rowLine.replace(/^\||\|$/g, '').split('|').map(c => c.trim());
        const tdHtml = cells.map(c => `<td>${c}</td>`).join('');
        rowsHtml.push(`<tr>${tdHtml}</tr>`);
      }

      return `<div class="table-responsive my-4">\n<table class="matrix-doc-table">\n<thead>\n<tr>${thHtml}</tr>\n</thead>\n<tbody>\n${rowsHtml.join('\n')}\n</tbody>\n</table>\n</div>`;
    }

    if (/^<(h[1-6]|ul|ol|hr|div|table|blockquote|article|section|pre|p|figure|img)/.test(b)) {
      return b;
    }
    return `<p>${b.replace(/\n/g, '<br>\n')}</p>`;
  }).filter(Boolean);

  return processed.join('\n\n');
}

export function buildDocs() {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  registry.forEach(doc => {
    if (!doc.sourceFile) return;
    const sourcePath = path.join(__dirname, doc.sourceFile);
    if (!fs.existsSync(sourcePath)) {
      console.warn(`\x1b[33mArchivo fuente no encontrado: ${doc.sourceFile}\x1b[0m`);
      return;
    }

    const rawMd = fs.readFileSync(sourcePath, 'utf8');
    const htmlBody = convertMdToHtml(rawMd);

    const componentHtml = `<!-- =========================================================================
     COMPONENTE DE DOCUMENTO: ${doc.id}
     Título: ${doc.label}
     Generado automáticamente desde: ${doc.sourceFile}
     ========================================================================= -->
<article class="doc-component" data-doc-id="${doc.id}">
${htmlBody}
</article>`;

    const outPath = path.join(__dirname, doc.file);
    const parentDir = path.dirname(outPath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }

    fs.writeFileSync(outPath, componentHtml, 'utf8');
    console.log(`\x1b[32m✅ Componente generado: ${doc.file} <- ${doc.sourceFile}\x1b[0m`);
  });
  console.log('\n\x1b[36m🎉 Compilación finalizada con éxito.\x1b[0m');
}

buildDocs();

if (process.argv.includes('--watch')) {
  console.log('\x1b[35m👀 Modo Watch activo. Monitoreando docs/ y registry.json...\x1b[0m');
  const docsDir = path.join(__dirname, 'docs');
  if (fs.existsSync(docsDir)) {
    fs.watch(docsDir, { recursive: true }, (event, filename) => {
      if (filename && filename.endsWith('.md')) {
        console.log(`\x1b[33m[Watch] Cambio en ${filename}. Recompilando...\x1b[0m`);
        buildDocs();
      }
    });
  }
}
