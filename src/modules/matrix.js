/**
 * ULPIANO CCO — Normative Traceability Matrix Module
 */

export function exportMatrixCSV() {
  const rows = document.querySelectorAll('#matrix-tbody tr');
  let csv = '\uFEFF'; // UTF-8 BOM for Excel
  csv += '"Fila";"Título & Artículos";"Materia Regulada & Alcance";"Derecho Comparado / Estándares";"Bloque Constitucional & Nacional";"Jerarquía"\r\n';

  rows.forEach(row => {
    if (row.hidden || row.style.display === 'none') return;
    const cells = row.querySelectorAll('td');
    if (cells.length < 6) return;

    const rowNum = cells[0].textContent.trim();
    const colA = cells[1].innerText.replace(/\r?\n|\r/g, ' ').replace(/"/g, '""').trim();
    const colB = cells[2].innerText.replace(/\r?\n|\r/g, ' ').replace(/"/g, '""').trim();
    const colC = cells[3].innerText.replace(/\r?\n|\r/g, ' | ').replace(/"/g, '""').trim();
    const colD = cells[4].innerText.replace(/\r?\n|\r/g, ' | ').replace(/"/g, '""').trim();
    const colE = cells[5].innerText.replace(/\r?\n|\r/g, ' ').replace(/"/g, '""').trim();

    csv += `"${rowNum}";"${colA}";"${colB}";"${colC}";"${colD}";"${colE}"\r\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'Matriz_Trazabilidad_Normativa_V1.2.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function copyMatrixTable() {
  const rows = document.querySelectorAll('#matrix-tbody tr');
  let tsv = 'Fila\tTítulo & Artículos\tMateria Regulada\tDerecho Comparado / Estándares\tBloque Constitucional & Nacional\tJerarquía\n';

  rows.forEach(row => {
    if (row.hidden || row.style.display === 'none') return;
    const cells = row.querySelectorAll('td');
    if (cells.length < 6) return;

    const rowNum = cells[0].textContent.trim();
    const colA = cells[1].innerText.replace(/\r?\n|\r/g, ' ').trim();
    const colB = cells[2].innerText.replace(/\r?\n|\r/g, ' ').trim();
    const colC = cells[3].innerText.replace(/\r?\n|\r/g, ' | ').trim();
    const colD = cells[4].innerText.replace(/\r?\n|\r/g, ' | ').trim();
    const colE = cells[5].innerText.replace(/\r?\n|\r/g, ' ').trim();

    tsv += `${rowNum}\t${colA}\t${colB}\t${colC}\t${colD}\t${colE}\n`;
  });

  navigator.clipboard.writeText(tsv).then(() => {
    alert('✅ Matriz copiada al portapapeles en formato tabular Excel. ¡Puedes pegarla directamente (Ctrl+V) en Excel o Google Sheets!');
  }).catch(err => {
    console.error('Error al copiar matriz:', err);
  });
}

export function filterMatrixBySheet(sheetType) {
  const rows = document.querySelectorAll('#matrix-tbody tr');
  const tabs = document.querySelectorAll('.excel-sheet-tab');
  tabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-sheet') === sheetType));

  let visibleCount = 0;
  rows.forEach(row => {
    const category = (row.getAttribute('data-category') || '').toLowerCase();
    const text = row.textContent.toLowerCase();
    let show = false;

    if (sheetType === 'all') {
      show = true;
    } else if (sheetType === 'organica') {
      show = category.includes('organica') || category.includes('cierre') || text.includes('0406') || text.includes('203');
    } else if (sheetType === 'fisma') {
      show = category.includes('fisma') || text.includes('fisma') || text.includes('2023/2841');
    } else if (sheetType === 'original') {
      show = category.includes('original') || text.includes('aporte original') || text.includes('título vii');
    } else if (sheetType === 'forense') {
      show = category.includes('forense') || category.includes('punitivo') || text.includes('27037') || text.includes('sancionatorio');
    }

    if (show) {
      row.removeAttribute('hidden');
      row.style.display = '';
      visibleCount++;
    } else {
      row.setAttribute('hidden', '');
      row.style.display = 'none';
    }
  });

  const filterCountEl = document.getElementById('matrix-filter-count');
  if (filterCountEl) {
    filterCountEl.innerHTML = `Hoja seleccionada: Mostrando <strong>${visibleCount}</strong> de <strong>${rows.length}</strong> filas`;
  }
}
