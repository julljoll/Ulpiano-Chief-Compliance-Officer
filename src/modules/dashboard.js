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

  if (heroTitle)
    heroTitle.textContent = `Auditoría de Integridad y Control de ${latest.shortLabel || latest.label}`;
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

  if (reformsLabel)
    reformsLabel.textContent =
      latest.changesLabel || `Cláusulas Mejoradas (${latest.shortLabel || latest.id})`;
  if (reformsNum) reformsNum.textContent = latest.changes !== undefined ? latest.changes : 14;
  if (reformsTag)
    reformsTag.textContent =
      latest.changesTag || (latest.changes > 0 ? 'Marcadas en Azul y Rojo' : 'Texto Base');

  if (hierarchyNum) hierarchyNum.textContent = latest.hierarchy || latest.type || 'Orgánica';
  if (hierarchyTag) hierarchyTag.textContent = latest.hierarchySub || 'Art. 203 CRBV';

  if (coverageNum) coverageNum.textContent = latest.coverage || '100% Pleno';
  if (coverageTag)
    coverageTag.textContent = latest.coverageSub || 'Judicial + Adm. Pública + LOCOTA';

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
    titleEl.textContent = `Desglose de las ${count} Grandes Reformas Estructurales (${latest.shortLabel || latest.label})`;
  }

  // If already rendered by Astro SSR, preserve the USWDS markup
  if (grid.children.length > 0) return;

  const reforms = latest.coreReforms || [];
  if (reforms.length === 0) {
    grid.innerHTML = `<li class="usa-card"><div class="usa-card__container padding-3"><p class="usa-intro font-sans-xs">No hay desglose de reformas configurado para esta versión.</p></div></li>`;
    return;
  }

  let html = '';
  reforms.forEach((ref) => {
    html += `
      <li class="usa-card tablet:grid-col-4">
        <div class="usa-card__container">
          <header class="usa-card__header">
            <div class="display-flex flex-justify flex-align-center margin-bottom-1">
              <span class="usa-tag">${escapeHtml(ref.tag)}</span>
              <span class="font-sans-2xs text-base">${escapeHtml(ref.articles)}</span>
            </div>
            <h3 class="usa-card__heading font-sans-md">${escapeHtml(ref.title)}</h3>
          </header>
          <div class="usa-card__body">
            <p class="font-sans-xs text-base margin-bottom-2">${escapeHtml(ref.desc)}</p>
            <div class="padding-2 bg-base-lightest border-1px border-base-lighter margin-bottom-2">
              <p class="font-sans-2xs margin-0 margin-bottom-1">
                <strong>Antes:</strong> ${escapeHtml(ref.before)}
              </p>
              <p class="font-sans-2xs margin-0">
                <strong>Ahora:</strong> ${escapeHtml(ref.after)}
              </p>
            </div>
          </div>
          <div class="usa-card__footer">
            <span class="font-sans-2xs text-bold text-primary">${escapeHtml(ref.benefit)}</span>
          </div>
        </div>
      </li>
    `;
  });

  grid.innerHTML = html;
}

export function buildDashboardVersionCards() {
  const grid = document.getElementById('version-cards-grid');
  if (!grid) return;

  // If already rendered by Astro SSR, preserve the USWDS markup
  if (grid.children.length > 0) return;

  const docs = DocRegistry.getAll();
  let html = '';

  docs.forEach((doc) => {
    const isRed = doc.changes > 0;
    const highlightsHtml = (doc.highlights || [])
      .map((h) => `<span class="usa-tag margin-right-05 margin-bottom-05">${escapeHtml(h)}</span>`)
      .join('');

    html += `
      <li class="usa-card tablet:grid-col-4">
        <div class="usa-card__container">
          <header class="usa-card__header">
            <div class="display-flex flex-justify flex-align-center margin-bottom-1">
              <span class="usa-tag">${escapeHtml(doc.shortLabel || doc.label)}</span>
              <span class="font-sans-2xs text-base">${doc.date || ''}</span>
            </div>
            <h3 class="usa-card__heading font-sans-md">${escapeHtml(doc.label)}</h3>
          </header>
          <div class="usa-card__body">
            <p class="font-sans-xs text-base">${escapeHtml(doc.description || '')}</p>
            <div class="display-flex flex-wrap margin-top-2">
              ${highlightsHtml}
            </div>
          </div>
          <div class="usa-card__footer display-flex flex-justify flex-align-center">
            <button type="button" class="usa-button usa-button--small" onclick="window.UlpianoDash?.loadDoc('${doc.id}')">
              Abrir en Lector
            </button>
            ${isRed ? `<span class="usa-tag">${doc.changes} Reformas</span>` : '<span class="font-sans-2xs text-base">Texto Base</span>'}
          </div>
        </div>
      </li>
    `;
  });

  grid.innerHTML = html;
}

export function buildVersionSelectors() {
  const docs = DocRegistry.getAll();
  const allSelects = document.querySelectorAll(
    '.version-select-auto, #reader-version-select, #compare-select-left, #compare-select-right'
  );

  allSelects.forEach((select) => {
    const currentVal = select.value;
    select.innerHTML = docs
      .map((doc) => `<option value="${doc.id}">${escapeHtml(doc.badgeText || doc.label)}</option>`)
      .join('');

    if (currentVal && docs.find((d) => d.id === currentVal)) {
      select.value = currentVal;
    } else if (select.id === 'compare-select-left') {
      const oldest = docs[docs.length - 1];
      select.value = oldest ? oldest.id : docs[0] ? docs[0].id : '';
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

  const existingButtons = tbody.querySelectorAll('.btn-jump-article');
  if (existingButtons.length > 0) {
    existingButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetDoc = btn.getAttribute('data-doc') || 'v1.2';
        state.currentDocKey = targetDoc;
        switchView('reader');
      });
    });
    return;
  }

  let html = '';
  REFORMS_CATALOG.forEach((item) => {
    const beforeTag = item.beforeTag || 'V1.0';
    const afterTag = item.afterTag || 'V1.2';
    html += `
      <tr>
        <td>
          <span class="text-bold text-ink">${escapeHtml(item.article)}</span>
          <div class="margin-top-05">
            <span class="usa-tag">${escapeHtml(item.type)}</span>
          </div>
        </td>
        <td>
          <div class="text-bold text-ink margin-bottom-05">${escapeHtml(item.summary)}</div>
          <div class="font-sans-2xs text-base-dark">${escapeHtml(item.impact)}</div>
        </td>
        <td>
          <div class="margin-bottom-05 font-sans-2xs">
            <span class="usa-tag bg-secondary-lighter text-secondary-darker margin-right-05">${beforeTag}</span>
            <span class="text-base-dark">${escapeHtml(item.before)}</span>
          </div>
          <div class="font-sans-2xs">
            <span class="usa-tag bg-primary-lighter text-primary-darker margin-right-05">${afterTag}</span>
            <span class="text-ink text-bold">${escapeHtml(item.after)}</span>
          </div>
        </td>
        <td class="text-right">
          <button
            type="button"
            class="usa-button usa-button--outline usa-button--small btn-jump-article"
            data-article="${item.article}"
            data-doc="${item.targetDoc || 'v1.2'}"
          >
            Ver en Texto
          </button>
        </td>
      </tr>
    `;
  });
  tbody.innerHTML = html;

  tbody.querySelectorAll('.btn-jump-article').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetDoc = btn.getAttribute('data-doc') || 'v1.2';
      state.currentDocKey = targetDoc;
      switchView('reader');
    });
  });
}
