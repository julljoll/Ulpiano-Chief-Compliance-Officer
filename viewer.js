/**
 * ULPIANO CCO — CYBER FORENSICS & COMPLIANCE PORTAL ENGINE
 * Single Top Navigation Website Style (Light Mode Only)
 * Component-Based Architecture with Automatic Version Discovery & Dynamic Statistics
 */

(function () {
  'use strict';

  // --- App State ---
  const state = {
    currentView: 'dashboard', // 'dashboard', 'reader', 'compare', 'matrix'
    currentDocKey: 'v1.1',
    fontFamily: 'serif',
    fontSize: 17,
    searchQuery: '',
    currentRedIndex: -1,
    redSpans: []
  };

  // --- Central Document Registry Module ---
  const DocRegistry = {
    docs: [
      {
        id: 'v1.1',
        label: 'Ley Orgánica V-1.1 (Con Reformas)',
        shortLabel: 'V-1.1 Orgánica',
        file: 'components/docs/v1.1.html',
        sourceFile: 'docs/ciberseguridadprocesal_v1.1.md',
        type: 'Ley Orgánica',
        hierarchy: 'Orgánica',
        hierarchySub: 'Art. 203 CRBV',
        articlesCount: 42,
        titlesCount: '11 Títulos + Anexo',
        coverage: '100% Pleno',
        coverageSub: 'Judicial + Administrativo',
        badge: 'reform',
        badgeClass: 'dc3-tag',
        badgeText: 'Versión 1.1 Orgánica',
        date: '2025-08-23',
        changes: 28,
        changesLabel: 'Cláusulas Mejoradas (v1.1)',
        changesTag: 'Marcadas en Rojo',
        description: 'Evolución técnico-legislativa del anteproyecto de ciberseguridad procesal: rango de Ley Orgánica (CRBV art. 203), cobertura integral de la Administración Pública y régimen sancionatorio escalonado con plenas garantías de debido proceso.',
        highlights: [
          'Ámbito Administrativo',
          'Rango Orgánico Art. 203 CRBV',
          'Sanciones Escalonadas',
          'Disposiciones Finales'
        ],
        icon: 'article',
        reformsDistribution: {
          labels: ['Título I (Gral)', 'Título II (Institucional)', 'Título III (Técnico)', 'Título IV (Garantías)', 'Título VII (Integridad)', 'Título VIII (Sanciones)', 'Título XI (Supremacía)'],
          data: [6, 4, 3, 2, 4, 8, 5]
        }
      },
      {
        id: 'v1.0',
        label: 'Ley Especial V-1.0 (Base Original)',
        shortLabel: 'V-1.0 Base',
        file: 'components/docs/v1.0.html',
        sourceFile: 'docs/ciberseguridadprocesal_V1.0.md',
        type: 'Ley Especial',
        hierarchy: 'Especial',
        hierarchySub: 'Ámbito Sectorial',
        articlesCount: 42,
        titlesCount: '11 Títulos',
        coverage: 'Sector Judicial',
        coverageSub: 'Tribunales y Cortes',
        badge: 'base',
        badgeClass: 'dc3-tag',
        badgeText: 'Versión 1.0 Base',
        date: '2025-01-01',
        changes: 0,
        changesLabel: 'Cláusulas Base (v1.0)',
        changesTag: 'Texto Original',
        description: 'Versión base de investigación técnica preliminar orientada al sistema de justicia y tribunales.',
        highlights: [
          'CSIRT-Ulpiano',
          'ISO 27037 Forense',
          'Zero Trust en Cortes'
        ],
        icon: 'article',
        reformsDistribution: {
          labels: ['Título I (Gral)', 'Título II (Institucional)', 'Título III (Técnico)', 'Título IV (Garantías)', 'Título VII (Integridad)', 'Título VIII (Sanciones)', 'Título XI (Supremacía)'],
          data: [0, 0, 0, 0, 0, 0, 0]
        }
      }
    ],

    async load() {
      try {
        const res = await fetch('./registry.json');
        if (res.ok) {
          const remoteDocs = await res.json();
          if (Array.isArray(remoteDocs) && remoteDocs.length > 0) {
            this.docs = remoteDocs;
          }
        }
      } catch (e) {
        console.info('DocRegistry: usando snapshot inicial de registro.', e);
      }
      this.syncUI();
      return this.docs;
    },

    get(id) {
      return this.docs.find(d => d.id === id) || this.docs[0];
    },

    getLatest() {
      return this.docs[0] || null;
    },

    getAll() {
      return this.docs;
    },

    syncUI() {
      buildVersionSelectors();
      buildDashboardVersionCards();
      updateDashboardStats();
    }
  };

  // Detailed catalog of all modifications in V1.1 for the Delta Inspector
  const REFORMS_CATALOG = [
    {
      article: 'Título y Portada',
      type: 'Técnica Legislativa',
      badgeClass: 'dc3-tag',
      summary: 'Denominación de Ley Orgánica y adición expresa del ámbito de la Administración Pública.',
      impact: 'Eleva el rango normativo y formaliza la cobertura integral de la vida jurídica.',
      before: 'ANTEPROYECTO DE LEY ESPECIAL DE CIBERSEGURIDAD PROCESAL E INTEGRIDAD DEL SISTEMA DE JUSTICIA.',
      after: 'ANTEPROYECTO DE LEY ORGÁNICA DE CIBERSEGURIDAD PROCESAL E INTEGRIDAD DEL SISTEMA DE JUSTICIA Y DE LA ADMINISTRACIÓN PÚBLICA.'
    },
    {
      article: 'Exposición de Motivos',
      type: 'Fundamento Constitucional',
      badgeClass: 'dc3-tag dc3-tag-gold',
      summary: 'Incorporación de justificación orgánica (CRBV art. 203) y principio de supremacía solo subordinada a la CRBV.',
      impact: 'Blindaje de jerarquía normativa: ninguna ley ordinaria puede contradecirla ni derogarla.',
      before: 'Enfoque de ley especial con fundamentación estándar en ciencia y tecnología.',
      after: 'Invocación del art. 203 CRBV por organizar poderes públicos y desarrollar derechos constitucionales (arts. 28, 49, 141).'
    },
    {
      article: 'Artículo 1°. Objeto',
      type: 'Ámbito Material',
      badgeClass: 'dc3-tag dc3-tag-green',
      summary: 'Inclusión de procedimientos administrativos que produzcan efectos jurídicos y carácter orgánico expreso.',
      impact: 'Protege a los ciudadanos frente a actos administrativos viciados o manipulados digitalmente.',
      before: 'Limitado a la función jurisdiccional y de investigación penal en tribunales.',
      after: 'Extendido a la totalidad de los órganos del Poder Público que generen actos administrativos vinculantes.'
    },
    {
      article: 'Artículo 2°. Ámbito de Aplicación',
      type: 'Sujetos Obligados',
      badgeClass: 'dc3-tag dc3-tag-green',
      summary: 'Numerales 5 y 6: Inclusión expresa de órganos de la Administración Pública Nacional, Estadal y Municipal.',
      impact: 'Cierra la brecha donde los fraudes ocurrían en instancias administrativas previas al juicio.',
      before: 'Solo aplicaba a tribunales, fiscalía, defensa pública y peritos forenses.',
      after: 'Aplica a todo el Estado venezolano en procedimientos con efectos sobre los ciudadanos.'
    },
    {
      article: 'Artículo 3°. Articulación Normativa',
      type: 'Jerarquía',
      badgeClass: 'dc3-tag dc3-tag-gold',
      summary: 'Integración expresa con la LOPA y supremacía de Ley Orgánica.',
      impact: 'Prevalencia formal en caso de colisión con normativas sectoriales o decretos.',
      before: 'Articulación simple con leyes ordinarias.',
      after: 'Supremacía orgánica vinculada a la Disposición Final Primera.'
    },
    {
      article: 'Título VIII. Régimen Sancionatorio',
      type: 'Graduación Punitiva',
      badgeClass: 'dc3-tag dc3-tag-red',
      summary: 'Tipificación detallada de faltas leves, graves y gravísimas con sanciones administrativas, disciplinarias y penales.',
      impact: 'Proporcionalidad y tipicidad garantizada conforme al art. 49 CRBV.',
      before: 'Sanciones genéricas con remisión a leyes preexistentes.',
      after: 'Catálogo autónomo y escalonado con destitución e inhabilitación para actos graves de corrupción digital.'
    },
    {
      article: 'Disposiciones Finales',
      type: 'Cláusula de Cierre',
      badgeClass: 'dc3-tag dc3-tag-red',
      summary: 'Declaratoria formal de carácter orgánico (CRBV art. 203) y derogatoria expresa de normas incompatibles.',
      impact: 'Garantiza que ninguna ley ordinaria posterior derogue tácitamente sus disposiciones de integridad.',
      before: 'Disposiciones finales genéricas sin cláusula formal de supremacía orgánica.',
      after: 'Capítulo II de Disposiciones Finales con supremacía orgánica y derogatoria expresa.'
    }
  ];

  const docCache = {};

  // --- Dynamic Dashboard Statistics Updater ---
  function updateDashboardStats() {
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

    if (articlesNum) articlesNum.textContent = latest.articlesCount || 42;
    if (articlesTag) articlesTag.textContent = latest.titlesCount || '11 Títulos + Anexo';

    if (reformsLabel) reformsLabel.textContent = latest.changesLabel || `Cláusulas Mejoradas (${latest.shortLabel || latest.id})`;
    if (reformsNum) reformsNum.textContent = latest.changes !== undefined ? latest.changes : 28;
    if (reformsTag) reformsTag.textContent = latest.changesTag || (latest.changes > 0 ? 'Marcadas en Rojo' : 'Texto Base');

    if (hierarchyNum) hierarchyNum.textContent = latest.hierarchy || latest.type || 'Orgánica';
    if (hierarchyTag) hierarchyTag.textContent = latest.hierarchySub || 'Art. 203 CRBV';

    if (coverageNum) coverageNum.textContent = latest.coverage || '100% Pleno';
    if (coverageTag) coverageTag.textContent = latest.coverageSub || 'Judicial + Administrativo';

    // 3. Chart version tag
    const chartTag = document.getElementById('chart-reforms-version-tag');
    if (chartTag) chartTag.textContent = latest.shortLabel || latest.label;
  }

  // --- Dynamic Dashboard Version Cards Generator ---
  function buildDashboardVersionCards() {
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
        <div class="col-12 col-md-6 col-xl-6">
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
              ${isRed ? `<span class="badge bg-danger text-white">${doc.changes} Reformas en Rojo</span>` : '<span class="text-muted small">Texto Oficial</span>'}
            </div>
          </div>
        </div>
      `;
    });

    grid.innerHTML = html;
  }

  // --- Dynamic Version Selectors Builder ---
  function buildVersionSelectors() {
    const selects = document.querySelectorAll('.version-select-auto, #reader-version-select');
    const docs = DocRegistry.getAll();

    selects.forEach(select => {
      const currentVal = select.value || state.currentDocKey;
      select.innerHTML = docs.map(doc => 
        `<option value="${doc.id}">${escapeHtml(doc.badgeText || doc.label)}</option>`
      ).join('');
      select.value = currentVal;
    });
  }

  // --- Markdown Parser with Automatic Inline SVG Resolver ---
  function parseMarkdown(md) {
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

    // Replace any SVG image tag with the inline SVG template for 100% reliable rendering
    const svgTpl = document.getElementById('svg-architecture-diagram');
    if (svgTpl && svgTpl.innerHTML) {
      const inlineSvg = `
        <div class="svg-diagram-wrapper my-4 text-center p-3 bg-dark rounded shadow-sm overflow-auto" style="max-width: 100%; border: 1px solid var(--dc3-border-color);">
          ${svgTpl.innerHTML}
        </div>
      `;
      html = html.replace(/<img[^>]*src=["'][^"']*ciberseguridad_integracion[^"']*["'][^>]*>/gi, inlineSvg);
      html = html.replace(/<p align=["']center["']>\s*<img[^>]*src=["'][^"']*ciberseguridad_integracion[^"']*["'][^>]*>\s*<\/p>/gi, inlineSvg);
    }

    return html;
  }

  // --- Load Document Component or Fallback Markdown ---
  async function getDocContent(key) {
    if (docCache[key]) return docCache[key];

    const docMeta = DocRegistry.get(key);
    if (!docMeta) return '<p>Documento no registrado.</p>';

    // 1. Try to fetch precompiled HTML component
    if (docMeta.file) {
      try {
        const res = await fetch(docMeta.file);
        if (res.ok) {
          const html = await res.text();
          docCache[key] = html;
          return html;
        }
      } catch (e) {
        console.warn(`No se pudo cargar el componente HTML ${docMeta.file}, intentando fuente Markdown.`);
      }
    }

    // 2. Fallback: Try to fetch raw Markdown source file
    if (docMeta.sourceFile) {
      try {
        const res = await fetch(docMeta.sourceFile);
        if (res.ok) {
          const rawMd = await res.text();
          const parsed = parseMarkdown(rawMd);
          docCache[key] = parsed;
          return parsed;
        }
      } catch (e) {
        console.warn(`No se pudo cargar el Markdown ${docMeta.sourceFile}.`);
      }
    }

    // 3. Fallback: Embedded template if available
    const embeddedEl = document.getElementById(`doc-content-${key}`);
    if (embeddedEl && embeddedEl.textContent.trim().length > 0) {
      const parsed = parseMarkdown(embeddedEl.textContent.trim());
      docCache[key] = parsed;
      return parsed;
    }

    return '<div class="alert alert-warning my-4"><span class="material-symbols-outlined me-1">warning</span> No se pudo cargar el contenido del documento. Verifique la conexión o abra el proyecto con Live Server.</div>';
  }

  // --- View Switcher ---
  function switchView(viewName) {
    state.currentView = viewName;

    // Toggle navigation tabs in single top menu
    document.querySelectorAll('.dc3-nav-tab').forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-view') === viewName);
    });

    // Toggle View Sections
    const views = ['dashboard', 'reader', 'compare', 'matrix'];
    views.forEach(v => {
      const el = document.getElementById(`view-${v}`);
      if (el) {
        el.style.display = (v === viewName) ? 'block' : 'none';
      }
    });

    if (viewName === 'reader') {
      renderReaderDoc();
    } else if (viewName === 'compare') {
      renderCompareView();
    } else if (viewName === 'dashboard') {
      updateDashboardStats();
      initDashboardCharts();
      renderDashboardDiagram();
      buildDashboardVersionCards();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- Render Inline SVG Diagram in Dashboard ---
  function renderDashboardDiagram() {
    const container = document.getElementById('dashboard-svg-container');
    const svgTpl = document.getElementById('svg-architecture-diagram');
    if (container && svgTpl && !container.hasChildNodes()) {
      container.innerHTML = svgTpl.innerHTML;
    }
  }

  // --- Render Reader Document ---
  async function renderReaderDoc() {
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

    paper.innerHTML = '<div class="text-center py-5 text-muted"><div class="spinner-border text-primary mb-3"></div><p>Cargando componente de documento...</p></div>';

    const contentHtml = await getDocContent(state.currentDocKey);
    paper.innerHTML = contentHtml;

    applyTypography();
    buildFloatingLeftTOC();
    setupRedHighlights();

    const versionSelect = document.getElementById('reader-version-select');
    if (versionSelect) versionSelect.value = state.currentDocKey;
  }

  // --- Build Floating Left Index (TOC) ---
  function buildFloatingLeftTOC() {
    const tocList = document.getElementById('floating-toc-list');
    const tocCount = document.getElementById('toc-count-badge');
    const paper = document.getElementById('paper-sheet');
    if (!tocList || !paper) return;

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

    // Smooth scroll on click
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
  }

  // --- Render Compare View ---
  async function renderCompareView() {
    const left = document.getElementById('compare-v10-content');
    const right = document.getElementById('compare-v11-content');
    if (!left || !right) return;

    left.innerHTML = '<div class="text-center py-4 text-muted">Cargando Versión 1.0 Base...</div>';
    right.innerHTML = '<div class="text-center py-4 text-muted">Cargando Versión 1.1 Orgánica...</div>';

    const v10 = await getDocContent('v1.0');
    const v11 = await getDocContent('v1.1');

    left.innerHTML = v10;
    right.innerHTML = v11;
  }

  // --- Red Highlights Navigation ---
  function setupRedHighlights() {
    const paper = document.getElementById('paper-sheet');
    const counterEl = document.getElementById('red-badge-counter');
    if (!paper) return;

    state.redSpans = Array.from(paper.querySelectorAll('.reforma-rojo, span[style*="color:red"], span[style*="color: red"]'));
    state.currentRedIndex = -1;

    if (counterEl) {
      counterEl.textContent = `${state.redSpans.length} Reformas en Rojo`;
    }
  }

  function jumpToNextRedHighlight() {
    if (state.redSpans.length === 0) return;
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

  // --- Delta Explorer (Dashboard Table) ---
  function renderDeltaExplorer() {
    const tbody = document.getElementById('delta-explorer-tbody');
    if (!tbody) return;

    let html = '';
    REFORMS_CATALOG.forEach(item => {
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
            <div class="mb-1"><span class="diff-tag-before">V1.0:</span> <small class="text-muted">${escapeHtml(item.before)}</small></div>
            <div><span class="diff-tag-after">V1.1:</span> <small class="text-dark">${escapeHtml(item.after)}</small></div>
          </td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-primary btn-jump-article" data-article="${item.article}">
              <span class="material-symbols-outlined me-1" style="font-size: 1rem;">open_in_new</span> Ver en Texto
            </button>
          </td>
        </tr>
      `;
    });
    tbody.innerHTML = html;

    tbody.querySelectorAll('.btn-jump-article').forEach(btn => {
      btn.addEventListener('click', () => {
        state.currentDocKey = 'v1.1';
        switchView('reader');
        setTimeout(() => {
          jumpToNextRedHighlight();
        }, 300);
      });
    });
  }

  // --- Initialize Dashboard Charts (Chart.js) ---
  let chartDistribution = null;
  let chartScope = null;

  function initDashboardCharts() {
    if (typeof Chart === 'undefined') return;

    const latest = DocRegistry.getLatest() || {};
    const defaultLabels = ['Título I (Gral)', 'Título II (Institucional)', 'Título III (Técnico)', 'Título IV (Garantías)', 'Título VII (Integridad)', 'Título VIII (Sanciones)', 'Título XI (Supremacía)'];
    const defaultData = [6, 4, 3, 2, 4, 8, 5];

    const chartLabels = (latest.reformsDistribution && latest.reformsDistribution.labels) || defaultLabels;
    const chartData = (latest.reformsDistribution && latest.reformsDistribution.data) || defaultData;
    const chartDatasetLabel = `Modificaciones Introducidas (${latest.shortLabel || latest.id || 'V1.1'})`;

    // 1. Distribution of changes chart
    const ctxDist = document.getElementById('chartReformsDistribution');
    if (ctxDist) {
      if (chartDistribution) chartDistribution.destroy();
      chartDistribution = new Chart(ctxDist, {
        type: 'bar',
        data: {
          labels: chartLabels,
          datasets: [{
            label: chartDatasetLabel,
            data: chartData,
            backgroundColor: '#004987',
            borderColor: '#0b1b3d',
            borderWidth: 1,
            borderRadius: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.06)' } },
            x: { grid: { display: false } }
          }
        }
      });
    }

    // 2. Scope distribution chart
    const ctxScope = document.getElementById('chartScope');
    if (ctxScope) {
      if (chartScope) chartScope.destroy();
      chartScope = new Chart(ctxScope, {
        type: 'doughnut',
        data: {
          labels: ['Poder Judicial (TSJ y Cortes)', 'Administración Pública Nacional/Estadal', 'Ministerio Público', 'Defensa Pública', 'Auxiliares y Forenses'],
          datasets: [{
            data: [35, 30, 15, 10, 10],
            backgroundColor: ['#004987', '#2e8540', '#df7e00', '#28a0e0', '#5c6b7e'],
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } }
          }
        }
      });
    }
  }

  // --- Typography Helpers ---
  function applyTypography() {
    const paper = document.getElementById('paper-sheet');
    if (!paper) return;
    paper.className = `reader-paper markdown-body ${state.fontFamily === 'sans' ? 'font-sans' : ''}`;
    paper.style.fontSize = `${state.fontSize}px`;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
  }

  // --- Event Initialization ---
  document.addEventListener('DOMContentLoaded', async () => {
    // 1. Load registry and sync UI
    await DocRegistry.load();

    // 2. Initialize Dashboard widgets
    renderDeltaExplorer();
    renderDashboardDiagram();

    // 3. Setup views in single top navigation
    document.querySelectorAll('.dc3-nav-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetView = btn.getAttribute('data-view');
        if (targetView) switchView(targetView);
      });
    });

    // 4. Version selector in Reader toolbar
    const versionSelect = document.getElementById('reader-version-select');
    if (versionSelect) {
      versionSelect.addEventListener('change', e => {
        state.currentDocKey = e.target.value;
        renderReaderDoc();
      });
    }

    // 5. Floating Index (TOC) Filter Search
    const tocFilter = document.getElementById('floating-toc-filter');
    if (tocFilter) {
      tocFilter.addEventListener('input', e => {
        const q = e.target.value.toLowerCase();
        document.querySelectorAll('#floating-toc-list .floating-toc-item').forEach(item => {
          const text = item.textContent.toLowerCase();
          item.style.display = text.includes(q) ? '' : 'none';
        });
      });
    }

    // 6. Toggle Floating Index (TOC) Visibility
    const btnToggleToc = document.getElementById('btn-toggle-floating-toc');
    const tocCol = document.getElementById('floating-toc-col');
    const paperCol = document.getElementById('reader-paper-col');
    if (btnToggleToc && tocCol && paperCol) {
      let isTocVisible = true;
      btnToggleToc.addEventListener('click', () => {
        isTocVisible = !isTocVisible;
        tocCol.style.display = isTocVisible ? '' : 'none';
        paperCol.className = isTocVisible ? 'col-12 col-lg-8 col-xl-9' : 'col-12';
        btnToggleToc.classList.toggle('btn-primary', !isTocVisible);
        btnToggleToc.classList.toggle('btn-outline-primary', isTocVisible);
      });
    }

    // 7. Red Jump Button
    const btnNextRed = document.getElementById('btn-jump-red-highlight');
    if (btnNextRed) {
      btnNextRed.addEventListener('click', jumpToNextRedHighlight);
    }

    // 9. Quick filter search in Delta Explorer
    const deltaSearch = document.getElementById('delta-search-input');
    if (deltaSearch) {
      deltaSearch.addEventListener('input', e => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('#delta-explorer-tbody tr').forEach(row => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(query) ? '' : 'none';
        });
      });
    }

    // 10. Start in Dashboard View
    switchView('dashboard');
  });

  // Global API
  window.UlpianoDash = {
    switchView,
    loadDoc: key => {
      state.currentDocKey = key;
      switchView('reader');
    },
    openLatestDoc: () => {
      const latest = DocRegistry.getLatest();
      state.currentDocKey = latest ? latest.id : 'v1.1';
      switchView('reader');
    },
    jumpToNextRedHighlight,
    DocRegistry
  };
})();
