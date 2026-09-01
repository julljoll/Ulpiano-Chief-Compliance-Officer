/**
 * ULPIANO CCO — Reader & Document Viewer Module
 */
import { state } from './state.js';
import { escapeHtml, applyTypography } from './utils.js';
import { DocRegistry } from './registry.js';

const docCache = {};

/**
 * Parses markdown into HTML with inline SVG diagram support.
 * @param {string} md 
 * @returns {string}
 */
export function parseMarkdown(md) {
  let html = '';
  if (typeof marked !== 'undefined' && typeof marked.parse === 'function') {
    marked.setOptions({ gfm: true, breaks: true });
    html = marked.parse(md);
  } else {
    html = md
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\n/gim, '<br />');
  }

  // Convert inline style red to .reforma-rojo
  html = html.replace(/<span style="color:\s*red">([\s\S]*?)<\/span>/gi, '<span class="reforma-rojo">$1</span>');

  return html;
}

/**
 * Loads document content from precompiled HTML or markdown source with sessionStorage caching.
 * @param {string} key 
 * @returns {Promise<string>}
 */
export async function getDocContent(key) {
  if (docCache[key]) return docCache[key];

  const sessionKey = `doc_cache_${key}`;
  const stored = sessionStorage.getItem(sessionKey);
  if (stored) {
    docCache[key] = stored;
    return stored;
  }

  const docMeta = DocRegistry.get(key);
  if (!docMeta) return '<div class="alert alert-warning my-4">Documento no registrado.</div>';

  // 1. Try precompiled HTML component
  if (docMeta.file) {
    try {
      const res = await fetch(docMeta.file);
      if (res.ok) {
        const html = await res.text();
        docCache[key] = html;
        try { sessionStorage.setItem(sessionKey, html); } catch {}
        return html;
      }
    } catch (e) {
      console.warn(`No se pudo cargar el componente HTML ${docMeta.file}, intentando Markdown.`, e);
    }
  }

  // 2. Fallback: Try raw Markdown source
  if (docMeta.sourceFile) {
    try {
      const res = await fetch(docMeta.sourceFile);
      if (res.ok) {
        const rawMd = await res.text();
        const parsed = parseMarkdown(rawMd);
        docCache[key] = parsed;
        try { sessionStorage.setItem(sessionKey, parsed); } catch {}
        return parsed;
      }
    } catch (e) {
      console.warn(`No se pudo cargar el Markdown ${docMeta.sourceFile}.`, e);
    }
  }

  // 3. Fallback: Embedded element if present
  const embeddedEl = document.getElementById(`doc-content-${key}`);
  if (embeddedEl && embeddedEl.textContent.trim().length > 0) {
    const parsed = parseMarkdown(embeddedEl.textContent.trim());
    docCache[key] = parsed;
    return parsed;
  }

  return '<div class="alert alert-warning my-4"><span class="material-symbols-outlined me-1">warning</span> No se pudo cargar el contenido del documento. Verifique la conexión o abra el proyecto con Live Server.</div>';
}

/**
 * Renders the reader view for the active document.
 */
export async function renderReaderDoc() {
  const paper = document.getElementById('paper-sheet');
  const titleBadge = document.getElementById('reader-doc-badge');
  const titleText = document.getElementById('reader-doc-title');
  const activeDoc = DocRegistry.get(state.currentDocKey);

  if (!paper || !activeDoc) return;

  if (titleBadge) {
    titleBadge.className = activeDoc.badgeClass || 'dc3-tag';
    titleBadge.innerHTML = `<span class="material-symbols-outlined me-1" style="font-size: 1rem;">${activeDoc.icon || 'article'}</span> ${escapeHtml(activeDoc.badgeText || activeDoc.label)}`;
  }
  if (titleText) {
    titleText.textContent = activeDoc.label;
  }

  // Display skeleton loading
  paper.innerHTML = `
    <div class="p-4">
      <div class="skeleton skeleton-title mb-4"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text" style="width:85%"></div>
      <div class="skeleton skeleton-text" style="width:90%"></div>
      <div class="skeleton skeleton-text" style="width:75%"></div>
      <div class="skeleton skeleton-card mt-4"></div>
    </div>
  `;

  const contentHtml = await getDocContent(state.currentDocKey);
  paper.innerHTML = contentHtml;

  applyTypography(state.fontFamily, state.fontSize);
  buildFloatingLeftTOC();
  setupRedHighlights();

  const versionSelect = document.getElementById('reader-version-select');
  if (versionSelect) versionSelect.value = state.currentDocKey;
}

let activeTocObserver = null;

/**
 * Builds the floating table of contents and observes scroll position to highlight active section.
 */
export function buildFloatingLeftTOC() {
  const tocList = document.getElementById('floating-toc-list');
  const tocCount = document.getElementById('toc-count-badge');
  const paper = document.getElementById('paper-sheet');
  if (!tocList || !paper) return;

  if (activeTocObserver) {
    activeTocObserver.disconnect();
    activeTocObserver = null;
  }

  const headings = paper.querySelectorAll('h1, h2, h3, h4');
  if (headings.length === 0) {
    tocList.innerHTML = '<div class="text-muted small p-2">Sin encabezados detectados.</div>';
    if (tocCount) tocCount.textContent = '0';
    return;
  }

  if (tocCount) tocCount.textContent = headings.length;

  let html = '';
  headings.forEach((h, idx) => {
    const id = h.id || `head-${idx}`;
    h.id = id;
    const tag = h.tagName.toLowerCase();
    const text = h.textContent.replace(/^#+\s*/, '').trim();
    const level = tag === 'h1' ? '1' : tag === 'h2' ? '2' : (tag === 'h3' ? '3' : '4');
    const icon = tag === 'h1' ? '🏛️ ' : tag === 'h2' ? '📌 ' : (tag === 'h3' ? '▪️ ' : '▫️ ');

    html += `
      <a href="#${id}" class="floating-toc-item toc-level-${level}" data-target="${id}">
        <span>${icon}${escapeHtml(text)}</span>
      </a>
    `;
  });

  tocList.innerHTML = html;

  // Smooth scroll listener
  tocList.querySelectorAll('.floating-toc-item').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        tocList.querySelectorAll('.floating-toc-item').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // IntersectionObserver for active heading on scroll
  activeTocObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        document.querySelectorAll('#floating-toc-list .floating-toc-item').forEach(l => {
          l.classList.toggle('active', l.getAttribute('data-target') === id);
        });
      }
    });
  }, { rootMargin: '-10% 0px -75% 0px', threshold: 0 });

  headings.forEach(h => activeTocObserver.observe(h));
}

/**
 * Initializes and counts red highlights in the loaded document.
 */
export function setupRedHighlights() {
  const paper = document.getElementById('paper-sheet');
  const counterEl = document.getElementById('red-badge-counter');
  if (!paper) return;

  state.redSpans = Array.from(paper.querySelectorAll('.reforma-rojo, span[style*="color:red"], span[style*="color: red"]'));
  state.currentRedIndex = -1;

  if (counterEl) {
    counterEl.textContent = `${state.redSpans.length} Reformas en Rojo`;
  }
}

/**
 * Jumps to the next red highlight with smooth scrolling and brief glow effect.
 */
export function jumpToNextRedHighlight() {
  if (!state.redSpans || state.redSpans.length === 0) return;
  state.currentRedIndex = (state.currentRedIndex + 1) % state.redSpans.length;
  const target = state.redSpans[state.currentRedIndex];
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    target.style.transition = 'all 0.3s ease';
    target.style.outline = '3px solid #df7e00';
    target.style.backgroundColor = 'rgba(223, 126, 0, 0.25)';
    setTimeout(() => { 
      target.style.outline = 'none';
      target.style.backgroundColor = '';
    }, 1600);
  }
}
