/**
 * ULPIANO CCO — SPA Router & Navigation Module
 */
import { state } from './state.js';

export const VIEW_TITLES = {
  dashboard: 'Dashboard de Control — Ulpiano CCO',
  diagrams:  'Diagramas de Arquitectura — Ulpiano CCO',
  api:       'Consola API Python (FastAPI) — Ulpiano CCO',
  reader:    'Lector de Versiones — Ulpiano CCO',
  compare:   'Comparador de Versiones — Ulpiano CCO',
  matrix:    'Matriz de Trazabilidad Normativa — Ulpiano CCO'
};

export const viewInitCallbacks = {};

/**
 * Switches the active SPA view, handles history, updates tabs & accessibility attributes.
 * @param {string} viewName 
 * @param {boolean} pushState 
 */
export function switchView(viewName, pushState = true) {
  state.currentView = viewName;
  document.title = VIEW_TITLES[viewName] || 'Ulpiano CCO';

  // Toggle nav tabs and accessibility attributes
  document.querySelectorAll('.dc3-nav-tab').forEach(pill => {
    const isActive = pill.getAttribute('data-view') === viewName;
    pill.classList.toggle('active', isActive);
    pill.setAttribute('aria-selected', String(isActive));
  });

  // Toggle view sections with hidden attribute
  const views = ['dashboard', 'diagrams', 'api', 'reader', 'compare', 'matrix'];
  views.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    if (el) {
      if (v === viewName) {
        el.removeAttribute('hidden');
        el.style.display = 'block';
      } else {
        el.setAttribute('hidden', '');
        el.style.display = 'none';
      }
    }
  });

  if (pushState && window.location.hash !== `#${viewName}`) {
    history.pushState({ view: viewName }, '', `#${viewName}`);
  }

  if (viewInitCallbacks[viewName]) {
    viewInitCallbacks[viewName]();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Browser Back/Forward history listener
window.addEventListener('popstate', e => {
  if (e.state?.view) {
    switchView(e.state.view, false);
  } else {
    const hash = window.location.hash.replace('#', '');
    if (hash && VIEW_TITLES[hash]) {
      switchView(hash, false);
    }
  }
});

/**
 * Checks URL hash on initial page load and routes accordingly.
 */
export function initFromHash() {
  const hash = window.location.hash.replace('#', '');
  if (hash && VIEW_TITLES[hash]) {
    switchView(hash, false);
    return true;
  }
  return false;
}
