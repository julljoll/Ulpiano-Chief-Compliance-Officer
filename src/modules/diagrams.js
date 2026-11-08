/**
 * ULPIANO CCO — Diagrams Suite Controller Module
 */
import { state } from './state.js';
import { escapeHtml } from './utils.js';
import { DIAGRAMS_REGISTRY } from './diagrams-registry.js';

const svgDiagramCache = {};

export async function loadDiagramSvg(tabKey) {
  const diag = DIAGRAMS_REGISTRY[tabKey] || DIAGRAMS_REGISTRY.master;
  if (svgDiagramCache[diag.id]) return svgDiagramCache[diag.id];

  const sessionKey = `svg_cache_${diag.id}`;
  const stored = sessionStorage.getItem(sessionKey);
  if (stored) {
    svgDiagramCache[diag.id] = stored;
    return stored;
  }

  if (diag.file) {
    try {
      const res = await fetch(diag.file);
      if (res.ok) {
        const svgContent = await res.text();
        svgDiagramCache[diag.id] = svgContent;
        try { sessionStorage.setItem(sessionKey, svgContent); } catch {}
        return svgContent;
      }
    } catch (e) {
      console.warn(`No se pudo cargar el SVG desde ${diag.file}:`, e);
    }
  }

  if (diag.fallbackTpl) {
    const tpl = document.getElementById(diag.fallbackTpl);
    if (tpl && tpl.innerHTML) {
      svgDiagramCache[diag.id] = tpl.innerHTML;
      return tpl.innerHTML;
    }
  }

  return '<div class="alert alert-warning my-4">No se pudo cargar el diagrama vectorial. Verifique la ruta del archivo SVG.</div>';
}

export async function renderDiagramsView(tabKey) {
  if (tabKey) state.currentDiagramTab = tabKey;
  const activeKey = state.currentDiagramTab || 'master';
  const diag = DIAGRAMS_REGISTRY[activeKey] || DIAGRAMS_REGISTRY.master;

  // 1. Update sub-nav tabs active state
  document.querySelectorAll('#diagram-nav-tabs .diagram-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === activeKey);
  });

  // 2. Update toolbar texts
  const titleNameEl = document.getElementById('diagram-active-name');
  const titleIconEl = document.getElementById('diagram-active-icon');
  const titleSubEl = document.getElementById('diagram-active-sub');
  const breadcrumbTitleEl = document.getElementById('diagram-breadcrumb-title');

  if (titleNameEl) titleNameEl.textContent = diag.name;
  if (titleIconEl) titleIconEl.textContent = diag.icon;
  if (titleSubEl) titleSubEl.textContent = diag.sub;
  if (breadcrumbTitleEl) breadcrumbTitleEl.textContent = diag.name;

  // 3. Render SVG viewport content
  const viewportContent = document.getElementById('diagram-viewport-content');
  if (viewportContent) {
    viewportContent.innerHTML = '<div class="text-center py-5 text-muted"><div class="spinner-border text-primary mb-3"></div><p>Cargando diagrama vectorial en alta resolución...</p></div>';
    const svgText = await loadDiagramSvg(activeKey);
    viewportContent.innerHTML = svgText;
    applyDiagramZoom();
  }

  // 4. Render Breakdown Cards below diagram
  const breakdownContainer = document.getElementById('diagram-breakdown-section');
  if (breakdownContainer && Array.isArray(diag.breakdown)) {
    let html = '<div class="row g-4">';
    diag.breakdown.forEach(item => {
      html += `
        <div class="col-12 col-md-6 col-xl-3">
          <div class="diagram-card-info">
            <div class="diagram-card-info-header">
              <div class="diagram-card-info-icon" style="background-color: var(--usa-color-blue-5); color: var(--dc3-navy-primary);">
                <span class="material-symbols-outlined">${item.icon || 'info'}</span>
              </div>
              <div>
                <h6 class="fw-bold text-dark mb-0" style="font-size: 0.95rem;">${escapeHtml(item.title)}</h6>
                <span class="diagram-legal-ref ${item.badgeClass || 'diagram-legal-ref-eu'}">${escapeHtml(item.badge || '')}</span>
              </div>
            </div>
            <p class="text-muted small mb-0" style="line-height: 1.5;">${escapeHtml(item.desc)}</p>
          </div>
        </div>
      `;
    });
    html += '</div>';
    breakdownContainer.innerHTML = html;
  }
}

export function switchDiagramTab(tabKey) {
  state.currentDiagramTab = tabKey;
  resetDiagramZoom();
  renderDiagramsView(tabKey);
}

export function applyDiagramZoom() {
  const viewportContent = document.getElementById('diagram-viewport-content');
  const zoomValEl = document.getElementById('diagram-zoom-val');
  if (viewportContent) {
    viewportContent.style.transform = `scale(${state.diagramZoom})`;
  }
  if (zoomValEl) {
    zoomValEl.textContent = `${Math.round(state.diagramZoom * 100)}%`;
  }
}

export function zoomDiagram(delta) {
  state.diagramZoom = Math.max(0.5, Math.min(2.5, state.diagramZoom + delta));
  applyDiagramZoom();
}

export function resetDiagramZoom() {
  state.diagramZoom = 1.0;
  applyDiagramZoom();
}

let escapeFullscreenListener = null;

export function toggleDiagramFullscreen() {
  const card = document.getElementById('main-diagram-viewer-card');
  const btn = document.getElementById('btn-diagram-fullscreen');
  if (!card) return;

  const isFull = card.classList.toggle('is-fullscreen');
  if (btn) {
    btn.innerHTML = isFull 
      ? '<span class="material-symbols-outlined" style="font-size:1rem;">fullscreen_exit</span> Salir de Pantalla Completa'
      : '<span class="material-symbols-outlined" style="font-size:1rem;">fullscreen</span> Pantalla Completa';
    btn.setAttribute('aria-pressed', String(isFull));
  }

  if (isFull) {
    escapeFullscreenListener = e => {
      if (e.key === 'Escape') toggleDiagramFullscreen();
    };
    document.addEventListener('keydown', escapeFullscreenListener);
  } else if (escapeFullscreenListener) {
    document.removeEventListener('keydown', escapeFullscreenListener);
    escapeFullscreenListener = null;
  }
}

export function downloadActiveDiagram() {
  const activeKey = state.currentDiagramTab || 'master';
  const diag = DIAGRAMS_REGISTRY[activeKey] || DIAGRAMS_REGISTRY.master;
  const link = document.createElement('a');
  link.href = diag.file;
  link.download = diag.file.split('/').pop();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function openActiveDiagramNewTab() {
  const activeKey = state.currentDiagramTab || 'master';
  const diag = DIAGRAMS_REGISTRY[activeKey] || DIAGRAMS_REGISTRY.master;
  window.open(diag.file, '_blank');
}
