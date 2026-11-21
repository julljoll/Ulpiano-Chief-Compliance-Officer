#!/usr/bin/env node
/**
 * ULPIANO CCO — Automated Architecture, Astro-Native Zero-JS Budget, Light-Only & CSP Audit
 */
import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';

const errors = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : [full];
    })
  );
  return nested.flat();
}

async function fileExists(relPath) {
  try {
    await access(path.resolve(relPath));
    return true;
  } catch {
    return false;
  }
}

const EMOJI_REGEX = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;

// 1. Ensure legacy SPA directories do not creep back in
for (const legacyDir of ['src/modules', 'src/scripts', 'public/assets/uswds/js']) {
  if (await fileExists(legacyDir)) {
    errors.push(`[Astro-Native] Legacy client directory should not exist: ${legacyDir}`);
  }
}

// 2. Check all src/ files for Light-Only, emojis, inline handlers, and <script is:inline>
const srcFiles = await walk('src');
for (const file of srcFiles) {
  const content = await readFile(file, 'utf8');
  if (file.endsWith('.astro')) {
    if (/\bon(?:click|change|input|submit|load)\s*=/i.test(content)) {
      errors.push(`[CSP] Inline event handler detected in ${file}`);
    }
    if (/<script\b[^>]*is:inline/i.test(content)) {
      errors.push(`[CSP/Astro] Forbidden <script is:inline> detected in ${file}`);
    }
  }
  if (/prefers-color-scheme\s*:\s*dark/i.test(content)) {
    errors.push(`[Light-Only] Forbidden dark mode media query in ${file}`);
  }
  if (EMOJI_REGEX.test(content)) {
    errors.push(`[Design System] Forbidden emoji detected in ${file}`);
  }
}

// 3. Check all public/svg/*.svg files for emojis, dark mode, and external @import
const svgFiles = (await walk('public/svg')).filter((f) => f.endsWith('.svg'));
for (const svg of svgFiles) {
  const content = await readFile(svg, 'utf8');
  if (/prefers-color-scheme\s*:\s*dark/i.test(content)) {
    errors.push(`[Light-Only] Forbidden dark mode rule in SVG ${svg}`);
  }
  if (EMOJI_REGEX.test(content)) {
    errors.push(`[Design System] Forbidden emoji detected in SVG ${svg}`);
  }
  if (/@import\s+url\(['"]?https?:\/\//i.test(content)) {
    errors.push(`[CSP] External network @import detected in SVG ${svg}`);
  }
}

// 4. Verify registry.json docs and src/data/diagrams.json SVGs exist on disk (no orphan SVGs)
const registry = JSON.parse(await readFile('registry.json', 'utf8'));
for (const doc of registry) {
  if (!(await fileExists(doc.sourceFile))) {
    errors.push(`[Registry] Missing Markdown source file: ${doc.sourceFile}`);
  }
}

const diagrams = JSON.parse(await readFile('src/data/diagrams.json', 'utf8'));
const registeredSvgs = new Set(
  diagrams.map((d) => path.join('public', d.file.replace(/^\/+/, '')))
);
for (const regSvg of registeredSvgs) {
  if (!(await fileExists(regSvg))) {
    errors.push(`[Diagrams] Registered SVG missing on disk: ${regSvg}`);
  }
}
for (const diskSvg of svgFiles) {
  if (!registeredSvgs.has(diskSvg)) {
    errors.push(`[Diagrams] Unregistered orphan SVG in public/svg: ${diskSvg}`);
  }
}

// 5. Verify required public assets
for (const required of [
  'public/.htaccess',
  'public/openapi.json',
  'public/favicon.svg',
  'public/manifest.json',
  'public/robots.txt',
  'public/sw.js',
]) {
  if (!(await fileExists(required))) {
    errors.push(`[Static Asset] Missing required public file: ${required}`);
  }
}

if (errors.length > 0) {
  console.error(`Audit failed with ${errors.length} violation(s):`);
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
}

console.info(
  `Ulpiano CCO Astro-Native Audit PASSED: ${srcFiles.length} src files, ${svgFiles.length} SVGs (all registered), ${registry.length} docs, 0 CSP/Light-Only/Legacy-JS violations.`
);
