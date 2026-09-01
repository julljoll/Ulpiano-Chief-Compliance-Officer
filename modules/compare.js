/**
 * ULPIANO CCO — Version Comparison Module
 */
import { DocRegistry } from './registry.js';
import { getDocContent } from './reader.js';
import { escapeHtml } from './utils.js';
import { buildVersionSelectors } from './dashboard.js';

export function renderCompareView() {
  buildVersionSelectors();
  const statusMsg = document.getElementById('compare-status-msg');
  if (statusMsg) {
    statusMsg.textContent = 'Selecciona las versiones en los menús y haz clic en «Comparar versiones».';
  }
}

export async function runCompare() {
  const selectLeft  = document.getElementById('compare-select-left');
  const selectRight = document.getElementById('compare-select-right');
  const leftKey  = selectLeft  ? selectLeft.value  : 'v1.0';
  const rightKey = selectRight ? selectRight.value : 'v1.1';

  const leftMeta  = DocRegistry.get(leftKey);
  const rightMeta = DocRegistry.get(rightKey);

  const leftContent  = document.getElementById('compare-left-content');
  const rightContent = document.getElementById('compare-right-content');
  const statusMsg    = document.getElementById('compare-status-msg');

  const titleLeft  = document.getElementById('compare-title-left');
  const subLeft    = document.getElementById('compare-sub-left');
  const badgeLeft  = document.getElementById('compare-badge-left');
  const titleRight = document.getElementById('compare-title-right');
  const subRight   = document.getElementById('compare-sub-right');
  const badgeRight = document.getElementById('compare-badge-right');

  if (titleLeft)  titleLeft.innerHTML  = `<span class="material-symbols-outlined me-1" style="font-size:1.1rem;vertical-align:-2px;">article</span> ${escapeHtml(leftMeta ? leftMeta.label : leftKey)}`;
  if (subLeft)    subLeft.textContent  = (leftMeta && leftMeta.type) || '';
  if (badgeLeft)  badgeLeft.textContent = (leftMeta && (leftMeta.shortLabel || leftMeta.id)) || leftKey;

  if (titleRight) titleRight.innerHTML = `<span class="material-symbols-outlined me-1" style="font-size:1.1rem;vertical-align:-2px;">article</span> ${escapeHtml(rightMeta ? rightMeta.label : rightKey)}`;
  if (subRight)   subRight.textContent = (rightMeta && rightMeta.type) || '';
  if (badgeRight) badgeRight.textContent = (rightMeta && (rightMeta.shortLabel || rightMeta.id)) || rightKey;

  const loadingHtml = key => `<div class="text-center py-5 text-muted"><div class="spinner-border spinner-border-sm text-primary mb-3"></div><p class="small">Cargando ${escapeHtml(key)}...</p></div>`;
  if (leftContent)  leftContent.innerHTML  = loadingHtml(leftKey);
  if (rightContent) rightContent.innerHTML = loadingHtml(rightKey);
  if (statusMsg) statusMsg.textContent = 'Cargando documentos…';

  try {
    const [leftHtml, rightHtml] = await Promise.all([
      getDocContent(leftKey),
      getDocContent(rightKey)
    ]);
    if (leftContent)  leftContent.innerHTML  = leftHtml;
    if (rightContent) rightContent.innerHTML = rightHtml;
    if (statusMsg) {
      const leftShort = leftMeta ? leftMeta.shortLabel : leftKey;
      const rightShort = rightMeta ? rightMeta.shortLabel : rightKey;
      statusMsg.innerHTML = `<span class="text-success"><span class="material-symbols-outlined me-1" style="font-size:1rem;vertical-align:-3px;">check_circle</span>Mostrando: <strong>${escapeHtml(leftShort)}</strong> vs <strong>${escapeHtml(rightShort)}</strong></span>`;
    }
  } catch (err) {
    if (statusMsg) {
      statusMsg.innerHTML = `<span class="text-danger"><span class="material-symbols-outlined me-1">error</span>Error al cargar los documentos. Verifica Live Server.</span>`;
    }
  }
}

export function swapComparePanels() {
  const selectLeft  = document.getElementById('compare-select-left');
  const selectRight = document.getElementById('compare-select-right');
  if (!selectLeft || !selectRight) return;
  const tmp = selectLeft.value;
  selectLeft.value  = selectRight.value;
  selectRight.value = tmp;
}
