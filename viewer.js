/**
 * ULPIANO CCO — CYBER FORENSICS & COMPLIANCE PORTAL ENGINE
 * Modular ESModule Architecture with Single Top Navigation Website Style
 */
import { state } from './modules/state.js';
import { DocRegistry, REFORMS_CATALOG } from './modules/registry.js';
import { switchView, viewInitCallbacks, initFromHash, VIEW_TITLES } from './modules/router.js';
import {
  updateDashboardStats,
  renderCoreReforms,
  buildDashboardVersionCards,
  buildVersionSelectors,
  renderDashboardDiagram,
  renderDeltaExplorer
} from './modules/dashboard.js';
import { initDashboardCharts } from './modules/charts.js';
import {
  renderReaderDoc,
  jumpToNextRedHighlight,
  buildFloatingLeftTOC,
  setupRedHighlights
} from './modules/reader.js';
import {
  renderCompareView,
  runCompare,
  swapComparePanels
} from './modules/compare.js';
import {
  renderDiagramsView,
  switchDiagramTab,
  zoomDiagram,
  resetDiagramZoom,
  toggleDiagramFullscreen,
  downloadActiveDiagram,
  openActiveDiagramNewTab
} from './modules/diagrams.js';
import {
  exportMatrixCSV,
  copyMatrixTable,
  filterMatrixBySheet
} from './modules/matrix.js';
import {
  simulateSignDocument,
  simulateCotejo,
  simulateSorteo,
  simulateTriggerAnomaly
} from './modules/api-sim.js';

// Setup view initialization callbacks
viewInitCallbacks.dashboard = () => {
  updateDashboardStats();
  initDashboardCharts();
  renderDashboardDiagram();
  buildDashboardVersionCards();
};

viewInitCallbacks.reader = () => {
  renderReaderDoc();
};

viewInitCallbacks.compare = () => {
  renderCompareView();
};

viewInitCallbacks.diagrams = () => {
  renderDiagramsView();
};

// Global App Initialization
document.addEventListener('DOMContentLoaded', async () => {
  // 1. Load document registry
  await DocRegistry.load();

  // Attach syncUI method
  DocRegistry.syncUI = () => {
    buildVersionSelectors();
    buildDashboardVersionCards();
    renderCoreReforms();
    updateDashboardStats();
  };

  DocRegistry.syncUI();
  renderDeltaExplorer();
  renderDashboardDiagram();

  // 2. Navigation tab click handlers
  document.querySelectorAll('.dc3-nav-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetView = btn.getAttribute('data-view');
      if (targetView) switchView(targetView);
    });
  });

  // 3. Reader version selector change listener
  const versionSelect = document.getElementById('reader-version-select');
  if (versionSelect) {
    versionSelect.addEventListener('change', e => {
      state.currentDocKey = e.target.value;
      renderReaderDoc();
    });
  }

  // 4. Floating Index (TOC) filter search
  const tocFilter = document.getElementById('floating-toc-filter');
  if (tocFilter) {
    tocFilter.addEventListener('input', e => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('#floating-toc-list .floating-toc-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(q)) {
          item.removeAttribute('hidden');
          item.style.display = '';
        } else {
          item.setAttribute('hidden', '');
          item.style.display = 'none';
        }
      });
    });
  }

  // 5. Toggle Floating TOC Visibility
  const btnToggleToc = document.getElementById('btn-toggle-floating-toc');
  const tocCol = document.getElementById('floating-toc-col');
  const paperCol = document.getElementById('reader-paper-col');
  if (btnToggleToc && tocCol && paperCol) {
    let isTocVisible = true;
    btnToggleToc.addEventListener('click', () => {
      isTocVisible = !isTocVisible;
      if (isTocVisible) {
        tocCol.removeAttribute('hidden');
        tocCol.style.display = '';
      } else {
        tocCol.setAttribute('hidden', '');
        tocCol.style.display = 'none';
      }
      paperCol.className = isTocVisible ? 'col-12 col-lg-8 col-xl-9' : 'col-12';
      btnToggleToc.classList.toggle('btn-primary', !isTocVisible);
      btnToggleToc.classList.toggle('btn-outline-primary', isTocVisible);
    });
  }

  // 6. Red Jump Highlight Button
  const btnNextRed = document.getElementById('btn-jump-red-highlight');
  if (btnNextRed) {
    btnNextRed.addEventListener('click', jumpToNextRedHighlight);
  }

  // 7. Quick filter search in Delta Explorer
  const deltaSearch = document.getElementById('delta-search-input');
  if (deltaSearch) {
    deltaSearch.addEventListener('input', e => {
      const query = e.target.value.toLowerCase();
      document.querySelectorAll('#delta-explorer-tbody tr').forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(query)) {
          row.removeAttribute('hidden');
          row.style.display = '';
        } else {
          row.setAttribute('hidden', '');
          row.style.display = 'none';
        }
      });
    });
  }

  // 8. Quick filter search in Matriz de Trazabilidad
  const matrixSearch = document.getElementById('matrix-search-input');
  const matrixFilterCount = document.getElementById('matrix-filter-count');
  if (matrixSearch) {
    matrixSearch.addEventListener('input', e => {
      const query = e.target.value.toLowerCase().trim();
      const rows = document.querySelectorAll('#matrix-tbody tr');
      let visibleCount = 0;
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const matches = !query || text.includes(query);
        if (matches) {
          row.removeAttribute('hidden');
          row.style.display = '';
          visibleCount++;
        } else {
          row.setAttribute('hidden', '');
          row.style.display = 'none';
        }
      });
      if (matrixFilterCount) {
        matrixFilterCount.innerHTML = query 
          ? `Encontradas <strong>${visibleCount}</strong> de <strong>${rows.length}</strong> secciones`
          : `Mostrando <strong>${rows.length}</strong> filas normativas en cuadrícula`;
      }
    });
  }

  // 9. Start in URL hash view or Dashboard view
  if (!initFromHash()) {
    switchView('dashboard');
  }
});

// Global API Object (ensures 100% backwards-compatibility with HTML onclick handlers)
window.UlpianoDash = {
  switchView,
  loadDoc: key => {
    state.currentDocKey = key;
    switchView('reader');
  },
  openLatestDoc: () => {
    const latest = DocRegistry.getLatest();
    state.currentDocKey = latest ? latest.id : 'v1.2';
    switchView('reader');
  },
  runCompare,
  swapComparePanels,
  jumpToNextRedHighlight,
  exportMatrixCSV,
  copyMatrixTable,
  filterMatrixBySheet,
  switchDiagramTab,
  zoomDiagram,
  resetDiagramZoom,
  toggleDiagramFullscreen,
  downloadActiveDiagram,
  openActiveDiagramNewTab,
  simulateSignDocument,
  simulateCotejo,
  simulateSorteo,
  simulateTriggerAnomaly,
  DocRegistry,
  REFORMS_CATALOG
};
