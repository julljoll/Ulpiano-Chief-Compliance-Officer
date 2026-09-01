/**
 * ULPIANO CCO — Dashboard UI Rendering Module
 */
import { DocRegistry, REFORMS_CATALOG } from './registry.js';
import { escapeHtml } from './utils.js';
import { state } from './state.js';
import { switchView } from './router.js';

export function updateDashboardStats() {
  const latest = DocRegistry.getLatest();
  if (!latest) return;

  // 1. Hero banner texts
  const heroTitle = document.getElementById('kpi-hero-title');
  const heroDesc = document.getElementById('kpi-hero-desc');
  const heroBtnLabel = document.getElementById('kpi-hero-btn-label');
  const heroBreadcrumb = document.getElementById('kpi-hero-breadcrumb');

  if (heroTitle) heroTitle.textContent = `Auditoría de Integridad y Control de ${latest.shortLabel || latest.label}`;
  if (heroDesc) heroDesc.textContent = latest.description || '';
  if (heroBtnLabel) heroBtnLabel.textContent = `Abrir Texto ${latest.shortLabel || latest.label}`;
  if (heroBreadcrumb) heroBreadcrumb.textContent = latest.label;

  // 2. 4 KPI Stat Tiles
  const articlesNum = document.getElementById('kpi-articles-num');
  const articlesTag = document.getElementById('kpi-articles-tag');
  const reformsLabel = document.getElementById('kpi-reforms-label');
  const reformsNum = document.getElementById('kpi-reforms-num');
  const reformsTag = document.getElementById('kpi-reforms-tag');
  const hierarchyNum = document.getElementById('kpi-hierarchy-num');
  const hierarchyTag = document.getElementById('kpi-hierarchy-tag');
  const coverageNum = document.getElementById('kpi-coverage-num');
  const coverageTag = document.getElementById('kpi-coverage-tag');

  if (articlesNum) articlesNum.textContent = latest.articlesCount || 47;
  if (articlesTag) articlesTag.textContent = latest.titlesCount || '11 Títulos + Anexo';

  if (reformsLabel) reformsLabel.textContent = latest.changesLabel || `Cláusulas Mejoradas (${latest.shortLabel || latest.id})`;
  if (reformsNum) reformsNum.textContent = latest.changes !== undefined ? latest.changes : 14;
  if (reformsTag) reformsTag.textContent = latest.changesTag || (latest.changes > 0 ? 'Marcadas en Azul y Rojo' : 'Texto Base');

  if (hierarchyNum) hierarchyNum.textContent = latest.hierarchy || latest.type || 'Orgánica';
  if (hierarchyTag) hierarchyTag.textContent = latest.hierarchySub || 'Art. 203 CRBV';

  if (coverageNum) coverageNum.textContent = latest.coverage || '100% Pleno';
  if (coverageTag) coverageTag.textContent = latest.coverageSub || 'Judicial + Adm. Pública + LOCOTA';

  // 3. Chart version tag
  const chartTag = document.getElementById('chart-reforms-version-tag');
  if (chartTag) chartTag.textContent = latest.shortLabel || latest.label;

  // 4. Core Structural Reforms
  renderCoreReforms();
}

export function renderCoreReforms() {
  const grid = document.getElementById('core-reforms-grid');
  const titleEl = document.getElementById('core-reforms-section-title');
  if (!grid) return;

  const latest = DocRegistry.getLatest();
  if (!latest) return;

  if (titleEl) {
    const count = (latest.coreReforms && latest.coreReforms.length) || 3;
    titleEl.innerHTML = `<span class="material-symbols-outlined text-primary">shield</span> Desglose de las ${count} Grandes Reformas Estructurales (${escapeHtml(latest.shortLabel || latest.label)})`;
  }

  const reforms = latest.coreReforms || [];
  if (reforms.length === 0) {
    grid.innerHTML = `<div class="col-12"><div class="alert alert-info">No hay desglose de reformas configurado para esta versión.</div></div>`;
    return;
  }

  const colClass = reforms.length === 3 ? 'col-12 col-lg-4' : (reforms.length === 2 ? 'col-12 col-md-6' : 'col-12 col-lg-4');

  let html = '';
  reforms.forEach(ref => {
    html += `
      <div class="${colClass}">
        <div class="dc3-card ${ref.accentClass || 'dc3-card-accent-top'} h-100 d-flex flex-column justify-content-between">
          <div>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span class="${ref.tagClass || 'dc3-tag'}">${escapeHtml(ref.tag)}</span>
              <span class="text-muted small">${escapeHtml(ref.articles)}</span>
            </div>
            <h5 class="fw-bold text-dark">${escapeHtml(ref.title)}</h5>
            <p class="text-muted small mb-3">
              ${escapeHtml(ref.desc)}
            </p>
            <div class="p-3 bg-light border rounded mb-3">
              <div class="small mb-1"><strong class="text-danger">❌ Antes:</strong> ${escapeHtml(ref.before)}</div>
              <div class="small"><strong class="text-success">✅ Ahora:</strong> ${escapeHtml(ref.after)}</div>
            </div>
          </div>
          <div class="small ${ref.benefitClass || 'text-primary'} fw-bold pt-2 border-top">
            <span class="material-symbols-outlined me-1" style="font-size: 1.1rem; vertical-align: -2px;">${ref.benefitIcon || 'check_circle'}</span> ${escapeHtml(ref.benefit)}
          </div>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;
}

export function buildDashboardVersionCards() {
  const grid = document.getElementById('version-cards-grid');
  if (!grid) return;

  const docs = DocRegistry.getAll();
  let html = '';

  docs.forEach(doc => {
    const isRed = doc.changes > 0;
    const accentClass = isRed ? 'dc3-card-accent-top' : 'dc3-card-accent-top';
    const badgeClass = doc.badgeClass || 'dc3-tag';

    const highlightsHtml = (doc.highlights || []).map(h => 
      `<span class="dc3-tag me-1 mb-1">${escapeHtml(h)}</span>`
    ).join('');

    html += `
      <div class="col-12 col-md-6 col-xl-4">
        <div class="dc3-card version-card ${accentClass}">
          <div class="version-card-header">
            <span class="${badgeClass}"><span class="material-symbols-outlined me-1" style="font-size: 0.95rem;">article</span> ${escapeHtml(doc.shortLabel || doc.label)}</span>
            <span class="text-muted small">${doc.date || ''}</span>
          </div>
          <div class="version-card-title mb-2">
            <span class="material-symbols-outlined text-primary me-1">${doc.icon || 'article'}</span>
            ${escapeHtml(doc.label)}
          </div>
          <div class="version-card-desc mb-3">
            ${escapeHtml(doc.description || '')}
          </div>
          <div class="d-flex flex-wrap mb-3">
            ${highlightsHtml}
          </div>
          <div class="version-card-footer">
            <button class="btn btn-sm btn-primary fw-semibold px-3" onclick="UlpianoDash.loadDoc('${doc.id}')">
              <span class="material-symbols-outlined me-1">menu_book</span> Abrir en Lector
            </button>
            ${isRed ? `<span class="badge bg-danger text-white">${doc.changes} Reformas</span>` : '<span class="text-muted small">Texto Oficial</span>'}
          </div>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;
}

export function buildVersionSelectors() {
  const docs = DocRegistry.getAll();
  const allSelects = document.querySelectorAll('.version-select-auto, #reader-version-select, #compare-select-left, #compare-select-right');

  allSelects.forEach(select => {
    const currentVal = select.value;
    select.innerHTML = docs.map(doc =>
      `<option value="${doc.id}">${escapeHtml(doc.badgeText || doc.label)}</option>`
    ).join('');

    if (currentVal && docs.find(d => d.id === currentVal)) {
      select.value = currentVal;
    } else if (select.id === 'compare-select-left') {
      const oldest = docs[docs.length - 1];
      select.value = oldest ? oldest.id : (docs[0] ? docs[0].id : '');
    } else if (select.id === 'compare-select-right') {
      select.value = docs[0] ? docs[0].id : '';
    } else {
      select.value = state.currentDocKey;
    }
  });
}

export async function renderDashboardDiagram() {
  const container = document.getElementById('dashboard-svg-container');
  if (!container) return;
  if (container.hasChildNodes() && container.querySelector('svg')) return;

  const tpl = document.getElementById('svg-architecture-diagram');
  if (tpl && tpl.innerHTML.trim().length > 0) {
    container.innerHTML = tpl.innerHTML;
    return;
  }

  try {
    const res = await fetch('./svg/ciberseguridad_integracion_V1.2.svg');
    if (res.ok) {
      container.innerHTML = await res.text();
    }
  } catch (e) {
    console.warn('renderDashboardDiagram fetch fallback error:', e);
  }
}

export function renderDeltaExplorer() {
  const tbody = document.getElementById('delta-explorer-tbody');
  if (!tbody) return;

  let html = '';
  REFORMS_CATALOG.forEach(item => {
    const beforeTag = item.beforeTag || 'V1.0';
    const afterTag = item.afterTag || 'V1.2';
    html += `
      <tr>
        <td>
          <strong class="text-dark">${escapeHtml(item.article)}</strong>
          <div class="mt-1"><span class="${item.badgeClass}">${escapeHtml(item.type)}</span></div>
        </td>
        <td>
          <div class="fw-bold text-dark">${escapeHtml(item.summary)}</div>
          <div class="small text-muted mt-1">${escapeHtml(item.impact)}</div>
        </td>
        <td>
          <div class="mb-1"><span class="diff-tag-before">${beforeTag}:</span> <small class="text-muted">${escapeHtml(item.before)}</small></div>
          <div><span class="diff-tag-after">${afterTag}:</span> <small class="text-dark">${escapeHtml(item.after)}</small></div>
        </td>
        <td class="text-end">
          <button class="btn btn-sm btn-outline-primary btn-jump-article" data-article="${item.article}" data-doc="${item.targetDoc || 'v1.2'}">
            <span class="material-symbols-outlined me-1" style="font-size: 1rem;">open_in_new</span> Ver en Texto
          </button>
        </td>
      </tr>
    `;
  });
  tbody.innerHTML = html;

  tbody.querySelectorAll('.btn-jump-article').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetDoc = btn.getAttribute('data-doc') || 'v1.2';
      state.currentDocKey = targetDoc;
      switchView('reader');
    });
  });
}
