/**
 * ULPIANO CCO — Shared Utility Helpers
 */

/**
 * Escapes special HTML characters to prevent XSS.
 * @param {string} str 
 * @returns {string}
 */
export function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[m]));
}

/**
 * Applies typography styles (font family and font size) to the reader paper sheet.
 * @param {string} fontFamily 
 * @param {number} fontSize 
 */
export function applyTypography(fontFamily = 'serif', fontSize = 17) {
  const paper = document.getElementById('paper-sheet');
  if (!paper) return;
  paper.className = `reader-paper markdown-body ${fontFamily === 'sans' ? 'font-sans' : ''}`;
  paper.style.fontSize = `${fontSize}px`;
}
