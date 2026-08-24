/**
 * ULPIANO CCO — CYBER FORENSICS & COMPLIANCE PORTAL ENGINE
 * Single Top Navigation Website Style (Light Mode Only)
 * Component-Based Architecture with Automatic Version Discovery & Dynamic Statistics
 */

(function () {
  'use strict';

  // --- App State ---
  const state = {
    currentView: 'dashboard', // 'dashboard', 'diagrams', 'reader', 'compare', 'matrix'
    currentDocKey: 'v1.2',
    currentDiagramTab: 'master', // 'master', 'technical', 'international', 'national', 'original'
    diagramZoom: 1.0,
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
        id: 'v1.2',
        label: 'Ley Orgánica V-1.2 (FISMA 2014 + LOCOTA 2026 — Auditoría + DOV)',
        shortLabel: 'V-1.2 FISMA & LOCOTA',
        file: 'components/docs/v1.2.html',
        sourceFile: 'docs/ciberseguridadprocesal_v1.2.md',
        type: 'Ley Orgánica',
        hierarchy: 'Orgánica',
        hierarchySub: 'Art. 203 CRBV (TSJ 0406/2026)',
        articlesCount: 47,
        titlesCount: '11 Títulos + Anexo',
        coverage: '100% Pleno',
        coverageSub: 'Judicial + Adm. Pública + LOCOTA',
        badge: 'reform',
        badgeClass: 'dc3-tag',
        badgeText: 'Versión 1.2 FISMA & LOCOTA',
        date: '2026-08-23',
        changes: 14,
        changesLabel: 'Cláusulas FISMA 2014 & LOCOTA 2026 (v1.2)',
        changesTag: 'Marcadas en Azul y Rojo',
        description: 'Versión 1.2 de gobernanza estratégica e interoperabilidad: integra la Ley Federal de Modernización de la Seguridad de la Información (S.2521 — FISMA 2014), la doctrina de la Sentencia TSJ/SC N° 0406 (2026) sobre el Art. 203 CRBV y la Ley Orgánica para la Celeridad y Optimización de Trámites Administrativos (LOCOTA 2026). Introduce la Auditoría Independiente Anual (Art. 10-bis), el Plan de Seguridad del Sistema (Art. 13-bis), Directivas Operativas Vinculantes (Art. 19-bis), articulación con Unidades de Celeridad (Art. 11 LOCOTA) y la Comisión Nacional de Celeridad (Art. 7 LOCOTA).',
        highlights: [
          'FISMA 2014 — S.2521',
          'LOCOTA 2026 & Sentencia TSJ 0406/2026',
          'Directivas Operativas Vinculantes (DOV)',
          'Auditoría Independiente Anual (Art. 10-bis)',
          'Unidades de Celeridad (Art. 11 LOCOTA) & PSS'
        ],
        icon: 'article',
        coreReforms: [
          {
            tag: 'Gobernanza Federal FISMA',
            tagClass: 'dc3-tag dc3-tag-green',
            accentClass: 'dc3-card-accent-green',
            articles: 'Arts. 10-bis, 13-bis, 19-bis',
            title: 'Gobernanza FISMA 2014, Auditoría Anual y DOV',
            desc: 'Adopción de la Ley Federal de Modernización de la Seguridad de la Información (S.2521 FISMA 2014): Auditoría Independiente Anual obligatoria (Art. 10-bis), Planes de Seguridad del Sistema - PSS (Art. 13-bis) y Directivas Operativas Vinculantes - DOV de cumplimiento perentorio en 72 horas dictadas por DINCIP (Art. 19-bis).',
            before: 'V-1.1: Sin mandato expreso de auditoría independiente periódica ni directivas técnicas de remediación vinculante inmediata.',
            after: 'V-1.2: Auditoría anual independiente por el Poder Ciudadano, PSS por cada sistema crítico y DOVs vinculantes con fuerza ejecutiva.',
            benefit: 'Gobernanza estratégica permanente y remediación obligatoria de incidentes.',
            benefitIcon: 'verified_user',
            benefitClass: 'text-success'
          },
          {
            tag: 'Celeridad & Jerarquía Constitucional',
            tagClass: 'dc3-tag dc3-tag-gold',
            accentClass: 'dc3-card-accent-top',
            articles: 'Arts. 3°, 4°, 11 LOCOTA & Art. 203 CRBV',
            title: 'Interoperabilidad LOCOTA 2026 & Doctrina TSJ 0406',
            desc: 'Articulación obligatoria con la Ley Orgánica para la Celeridad y Optimización de Trámites Administrativos (LOCOTA 2026), interconexión con Unidades de Celeridad (Art. 11 LOCOTA), ventanillas únicas y fundamentación formal en la Sentencia TSJ/SC N° 0406/2026 para blindar su rango de Ley Orgánica.',
            before: 'V-1.1: Rango orgánico genérico sin articulación expresa con el nuevo régimen LOCOTA 2026 ni doctrina vinculante TSJ 0406.',
            after: 'V-1.2: Interoperabilidad directa con Unidades de Celeridad y blindaje de jerarquía preferente sobre cualquier ley ordinaria.',
            benefit: 'Cero dilaciones indebidas e interoperabilidad procesal transversal del Estado.',
            benefitIcon: 'account_balance',
            benefitClass: 'text-primary'
          },
          {
            tag: 'Integridad Procesal & Sanciones',
            tagClass: 'dc3-tag dc3-tag-red',
            accentClass: 'dc3-card-accent-red',
            articles: 'Título VII & Título VIII (Arts. 26°-37°)',
            title: 'Integridad Procesal y Régimen Sancionatorio Garantista',
            desc: 'Reducción de la discrecionalidad humana mediante sorteo automatizado, trazabilidad forense (ISO 27037) y catálogo completo de sanciones clasificadas (Leves, Graves y Muy Graves) con plenas garantías de debido proceso y doble instancia (Art. 49 CRBV).',
            before: 'V-1.0: Ámbito limitado exclusivamente a tribunales y régimen sancionatorio incompleto sin tipicidad escalonada.',
            after: 'V-1.2: Cobertura integral en sede judicial y administrativa con régimen disciplinario y sancionatorio tipificado.',
            benefit: 'Trazabilidad forense inalterable y responsabilidad administrativa garantista.',
            benefitIcon: 'gavel',
            benefitClass: 'text-danger'
          }
        ],
        reformsDistribution: {
          labels: ['Título I (Principios+Def.)', 'Título II (DINCIP+Auditoría)', 'Título III (Estándares+PSS)', 'Título V (Incidentes+DOV)', 'Título VII (Integridad)', 'Título VIII (Sanciones)', 'Títulos IX-XI (Coop/Form/Trans.)'],
          data: [3, 3, 2, 2, 1, 3, 2]
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
      renderCoreReforms();
      updateDashboardStats();
    }
  };

  // Detailed catalog of all modifications in V1.1 and V1.2 for the Delta Inspector
  const REFORMS_CATALOG = [
    {
      article: 'Artículo 10-bis° (FISMA 2014 § 3555)',
      type: 'Gobernanza & Auditoría',
      badgeClass: 'dc3-tag dc3-tag-green',
      summary: 'Auditoría Independiente Anual de Ciberseguridad Procesal obligatoria contratada por DINCIP con reporte a AN y CGR.',
      impact: 'Establece control y evaluación independiente anual obligatoria con rendición de cuentas al poder legislativo.',
      before: 'V1.1: Auditorías internas periódicas sin mandato anual independiente ni reporte obligado a la Asamblea Nacional.',
      beforeTag: 'V1.1',
      after: 'V1.2: Auditoría anual independiente por el Poder Ciudadano con informe vinculante en 90 días a la AN, CGR y TSJ.',
      afterTag: 'V1.2',
      targetDoc: 'v1.2'
    },
    {
      article: 'Artículo 13-bis° (FISMA 2014 § 3554)',
      type: 'Gestión de Riesgos',
      badgeClass: 'dc3-tag dc3-tag-gold',
      summary: 'Plan de Seguridad del Sistema (PSS) obligatorio por cada sistema de información crítico con actualización anual.',
      impact: 'Asigna propietarios institucionales y técnicos responsables nominalmente por la seguridad de cada plataforma.',
      before: 'V1.1: Disposiciones generales de seguridad sin ficha técnica individualizada ni planes PSS registrados.',
      beforeTag: 'V1.1',
      after: 'V1.2: PSS anual registrado en DINCIP con clasificación NIST SP 800-30 y cronograma de remediación.',
      afterTag: 'V1.2',
      targetDoc: 'v1.2'
    },
    {
      article: 'Artículo 19-bis° (FISMA 2014 § 3553 / CISA)',
      type: 'Respuesta Vinculante',
      badgeClass: 'dc3-tag dc3-tag-red',
      summary: 'Directivas Operativas Vinculantes (DOV) de cumplimiento obligatorio e inmediato en 72 horas ante incidentes críticos.',
      impact: 'Otorga potestad coercitiva a la DINCIP para ordenar contención inmediata de incidentes de seguridad.',
      before: 'V1.1: Alertas y recomendaciones del CSIRT sin fuerza vinculante inmediata ni plazos perentorios de 72 horas.',
      beforeTag: 'V1.1',
      after: 'V1.2: DOV ejecutivas con plazo perentorio de 72h para contención y 30 días para remediación estructural.',
      afterTag: 'V1.2',
      targetDoc: 'v1.2'
    },
    {
      article: 'Artículo 3° y 4° (LOCOTA 2026 & TSJ 0406)',
      type: 'Interoperabilidad & Rango',
      badgeClass: 'dc3-tag',
      summary: 'Articulación con Unidades de Celeridad (Art. 11 LOCOTA) y doctrina vinculante de la Sentencia TSJ/SC N° 0406/2026.',
      impact: 'Alinea los sistemas con la optimización de trámites y blinda la supremacía como Ley Orgánica transversal.',
      before: 'V1.1: Referencia orgánica genérica sin articulación con el ecosistema de celeridad de trámites ni doctrina TSJ 0406.',
      beforeTag: 'V1.1',
      after: 'V1.2: Integración con Unidades de Celeridad, ventanillas únicas y doctrina vinculante constitucional.',
      afterTag: 'V1.2',
      targetDoc: 'v1.2'
    },
    {
      article: 'Artículo 11°. Estándares NIST SP 800-37/53',
      type: 'Estándares Técnicos',
      badgeClass: 'dc3-tag dc3-tag-blue',
      summary: 'Adopción de marcos de gestión de riesgos y controles NIST SP 800-37 y NIST SP 800-53 en armonía con ISO/IEC 27001.',
      impact: 'Estandariza los controles técnicos de seguridad con los referentes más avanzados de derecho comparado.',
      before: 'V1.1: Solo estándares ISO/IEC 27001, 27035 y 22301.',
      beforeTag: 'V1.1',
      after: 'V1.2: Integración complementaria de NIST SP 800-37 (RMF) y NIST SP 800-53 (Security Controls).',
      afterTag: 'V1.2',
      targetDoc: 'v1.2'
    },
    {
      article: 'Título y Portada',
      type: 'Técnica Legislativa',
      badgeClass: 'dc3-tag',
      summary: 'Denominación de Ley Orgánica y adición expresa del ámbito de la Administración Pública.',
      impact: 'Eleva el rango normativo y formaliza la cobertura integral de la vida jurídica.',
      before: 'V1.0: ANTEPROYECTO DE LEY ESPECIAL DE CIBERSEGURIDAD PROCESAL E INTEGRIDAD DEL SISTEMA DE JUSTICIA.',
      beforeTag: 'V1.0',
      after: 'V1.1: ANTEPROYECTO DE LEY ORGÁNICA DE CIBERSEGURIDAD PROCESAL E INTEGRIDAD DEL SISTEMA DE JUSTICIA Y DE LA ADMINISTRACIÓN PÚBLICA.',
      afterTag: 'V1.1',
      targetDoc: 'v1.1'
    },
    {
      article: 'Artículo 1°. Objeto',
      type: 'Ámbito Material',
      badgeClass: 'dc3-tag dc3-tag-green',
      summary: 'Inclusión de procedimientos administrativos que produzcan efectos jurídicos y carácter orgánico expreso.',
      impact: 'Protege a los ciudadanos frente a actos administrativos viciados o manipulados digitalmente.',
      before: 'V1.0: Limitado a la función jurisdiccional y de investigación penal en tribunales.',
      beforeTag: 'V1.0',
      after: 'V1.1: Extendido a la totalidad de los órganos del Poder Público que generen actos administrativos vinculantes.',
      afterTag: 'V1.1',
      targetDoc: 'v1.1'
    },
    {
      article: 'Artículo 2°. Ámbito de Aplicación',
      type: 'Sujetos Obligados',
      badgeClass: 'dc3-tag dc3-tag-green',
      summary: 'Numerales 5 y 6: Inclusión expresa de órganos de la Administración Pública Nacional, Estadal y Municipal.',
      impact: 'Cierra la brecha donde los fraudes ocurrían en instancias administrativas previas al juicio.',
      before: 'V1.0: Solo aplicaba a tribunales, fiscalía, defensa pública y peritos forenses.',
      beforeTag: 'V1.0',
      after: 'V1.1: Aplica a todo el Estado venezolano en procedimientos con efectos sobre los ciudadanos.',
      afterTag: 'V1.1',
      targetDoc: 'v1.1'
    },
    {
      article: 'Título VIII. Régimen Sancionatorio',
      type: 'Graduación Punitiva',
      badgeClass: 'dc3-tag dc3-tag-red',
      summary: 'Tipificación detallada de faltas leves, graves y gravísimas con sanciones administrativas, disciplinarias y penales.',
      impact: 'Proporcionalidad y tipicidad garantizada conforme al art. 49 CRBV.',
      before: 'V1.0: Sanciones genéricas con remisión a leyes preexistentes.',
      beforeTag: 'V1.0',
      after: 'V1.1: Catálogo autónomo y escalonado con destitución e inhabilitación para actos graves de corrupción digital.',
      afterTag: 'V1.1',
      targetDoc: 'v1.1'
    },
    {
      article: 'Disposiciones Finales',
      type: 'Cláusula de Cierre',
      badgeClass: 'dc3-tag dc3-tag-red',
      summary: 'Declaratoria formal de carácter orgánico (CRBV art. 203) y derogatoria expresa de normas incompatibles.',
      impact: 'Garantiza que ninguna ley ordinaria posterior derogue tácitamente sus disposiciones de integridad.',
      before: 'V1.0: Disposiciones finales genéricas sin cláusula formal de supremacía orgánica.',
      beforeTag: 'V1.0',
      after: 'V1.1: Capítulo II de Disposiciones Finales con supremacía orgánica y derogatoria expresa.',
      afterTag: 'V1.1',
      targetDoc: 'v1.1'
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

  // --- Dynamic Dashboard Core Structural Reforms Cards Generator ---
  function renderCoreReforms() {
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
        // Default: panel izquierdo = versión más antigua (la última del array)
        const oldest = docs[docs.length - 1];
        select.value = oldest ? oldest.id : (docs[0] ? docs[0].id : '');
      } else if (select.id === 'compare-select-right') {
        // Default: panel derecho = versión más reciente (la primera del array)
        select.value = docs[0] ? docs[0].id : '';
      } else {
        select.value = state.currentDocKey;
      }
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
        <div class="svg-diagram-wrapper my-4 text-center p-3 bg-white rounded shadow-sm overflow-auto" style="max-width: 100%; border: 1px solid var(--dc3-border-color);">
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
    const views = ['dashboard', 'diagrams', 'reader', 'compare', 'matrix'];
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
    } else if (viewName === 'diagrams') {
      renderDiagramsView();
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

  // --- Render Compare View (init only — carga con botón) ---
  function renderCompareView() {
    // Asegura que los selectores estén poblados con las versiones disponibles
    buildVersionSelectors();
    const statusMsg = document.getElementById('compare-status-msg');
    if (statusMsg) statusMsg.textContent = 'Selecciona las versiones en los menús y haz clic en «Comparar versiones».';
  }

  // --- Run Compare: carga los documentos seleccionados en los paneles ---
  async function runCompare() {
    const selectLeft  = document.getElementById('compare-select-left');
    const selectRight = document.getElementById('compare-select-right');
    const leftKey  = selectLeft  ? selectLeft.value  : 'v1.0';
    const rightKey = selectRight ? selectRight.value : 'v1.1';

    const leftMeta  = DocRegistry.get(leftKey);
    const rightMeta = DocRegistry.get(rightKey);

    const leftContent  = document.getElementById('compare-left-content');
    const rightContent = document.getElementById('compare-right-content');
    const statusMsg    = document.getElementById('compare-status-msg');

    // Actualizar títulos y badges de cabecera
    const titleLeft  = document.getElementById('compare-title-left');
    const subLeft    = document.getElementById('compare-sub-left');
    const badgeLeft  = document.getElementById('compare-badge-left');
    const titleRight = document.getElementById('compare-title-right');
    const subRight   = document.getElementById('compare-sub-right');
    const badgeRight = document.getElementById('compare-badge-right');

    if (titleLeft)  titleLeft.innerHTML  = `<span class="material-symbols-outlined me-1" style="font-size:1.1rem;vertical-align:-2px;">article</span> ${escapeHtml(leftMeta.label)}`;
    if (subLeft)    subLeft.textContent  = leftMeta.type || '';
    if (badgeLeft)  badgeLeft.textContent = leftMeta.shortLabel || leftMeta.id;

    if (titleRight) titleRight.innerHTML = `<span class="material-symbols-outlined me-1" style="font-size:1.1rem;vertical-align:-2px;">article</span> ${escapeHtml(rightMeta.label)}`;
    if (subRight)   subRight.textContent = rightMeta.type || '';
    if (badgeRight) badgeRight.textContent = rightMeta.shortLabel || rightMeta.id;

    // Mostrar spinners de carga
    const loadingHtml = key => `<div class="text-center py-5 text-muted"><div class="spinner-border spinner-border-sm text-primary mb-3"></div><p class="small">Cargando ${escapeHtml(key)}...</p></div>`;
    if (leftContent)  leftContent.innerHTML  = loadingHtml(leftKey);
    if (rightContent) rightContent.innerHTML = loadingHtml(rightKey);
    if (statusMsg) statusMsg.textContent = 'Cargando documentos…';

    // Cargar ambos documentos en paralelo
    try {
      const [leftHtml, rightHtml] = await Promise.all([
        getDocContent(leftKey),
        getDocContent(rightKey)
      ]);
      if (leftContent)  leftContent.innerHTML  = leftHtml;
      if (rightContent) rightContent.innerHTML = rightHtml;
      if (statusMsg) statusMsg.innerHTML = `<span class="text-success"><span class="material-symbols-outlined me-1" style="font-size:1rem;vertical-align:-3px;">check_circle</span>Mostrando: <strong>${escapeHtml(leftMeta.shortLabel)}</strong> vs <strong>${escapeHtml(rightMeta.shortLabel)}</strong></span>`;
    } catch (err) {
      if (statusMsg) statusMsg.innerHTML = `<span class="text-danger"><span class="material-symbols-outlined me-1">error</span>Error al cargar los documentos. Verifica Live Server.</span>`;
    }
  }

  // --- Swap Compare Panels: intercambia los valores de los selectores ---
  function swapComparePanels() {
    const selectLeft  = document.getElementById('compare-select-left');
    const selectRight = document.getElementById('compare-select-right');
    if (!selectLeft || !selectRight) return;
    const tmp = selectLeft.value;
    selectLeft.value  = selectRight.value;
    selectRight.value = tmp;
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

    // 10. Quick filter search in Matriz de Trazabilidad
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
          row.style.display = matches ? '' : 'none';
          if (matches) visibleCount++;
        });
        if (matrixFilterCount) {
          matrixFilterCount.innerHTML = query 
            ? `Encontradas <strong>${visibleCount}</strong> de <strong>${rows.length}</strong> secciones`
            : `Mostrando <strong>${rows.length}</strong> filas normativas en cuadrícula`;
        }
      });
    }

    // 11. Start in Dashboard View
    switchView('dashboard');
  });

  // --- Excel Spreadsheet Matrix Helpers ---
  function exportMatrixCSV() {
    const rows = document.querySelectorAll('#matrix-tbody tr');
    let csv = '\uFEFF'; // UTF-8 BOM for Excel
    csv += '"Fila";"Título & Artículos";"Materia Regulada & Alcance";"Derecho Comparado / Estándares";"Bloque Constitucional & Nacional";"Jerarquía"\r\n';

    rows.forEach(row => {
      if (row.style.display === 'none') return;
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
  }

  function copyMatrixTable() {
    const rows = document.querySelectorAll('#matrix-tbody tr');
    let tsv = 'Fila\tTítulo & Artículos\tMateria Regulada\tDerecho Comparado / Estándares\tBloque Constitucional & Nacional\tJerarquía\n';

    rows.forEach(row => {
      if (row.style.display === 'none') return;
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
      console.error('Error al copiar:', err);
    });
  }

  function filterMatrixBySheet(sheetType) {
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

      row.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    const filterCountEl = document.getElementById('matrix-filter-count');
    if (filterCountEl) {
      filterCountEl.innerHTML = `Hoja seleccionada: Mostrando <strong>${visibleCount}</strong> de <strong>${rows.length}</strong> filas`;
    }
  }

  // =========================================================================
  // DIAGRAMS SUITE MODULE (V-1.2: INTEGRAL, TÉCNICA, INTL, NACIONAL, ORIGINAL)
  // =========================================================================
  const DIAGRAMS_REGISTRY = {
    master: {
      id: 'master',
      name: 'Arquitectura de Integración V-1.2 (Maestra Integral)',
      icon: 'account_tree',
      badge: 'V-1.2 Todo-en-Uno',
      sub: 'Mapeo comparado de los 4 grandes bloques: Reglamento UE 2023/2841, FISMA 2014 S.2521, JTC Courts 2025 y Aporte Original Título VII.',
      file: './svg/ciberseguridad_integracion_V1.2.svg',
      fallbackTpl: 'svg-architecture-diagram',
      breakdown: [
        {
          title: '🇪🇺 Bloque UE: Gobernanza Sectorial',
          icon: 'hub',
          badge: 'UE 2023/2841',
          badgeClass: 'diagram-legal-ref-eu',
          desc: 'CERT-EU adaptado como CSIRT-Ulpiano judicial (Arts. 8-9), Junta Interinstitucional IICB (Art. 10) y taxonomía unificada de severidad de incidentes (Art. 18).'
        },
        {
          title: '🇺🇸 Bloque FISMA 2014: Gobernanza Federal',
          icon: 'verified_user',
          badge: 'S.2521 / PL 113-283',
          badgeClass: 'diagram-legal-ref-fisma',
          desc: 'Evaluación Independiente Anual obligatoria (Art. 10-bis), Planes de Seguridad del Sistema - PSS (Art. 13-bis) y Directivas Operativas Vinculantes en 72h (Art. 19-bis).'
        },
        {
          title: '🏛️ Bloque JTC: Resiliencia en Cortes',
          icon: 'gavel',
          badge: 'NCSC 2025',
          badgeClass: 'diagram-legal-ref-iso',
          desc: 'Arquitectura Zero Trust, autenticación MFA criptográfica (Art. 12) y Continuidad Operativa Judicial (COOP - Art. 13) para causas de flagrancia y amparos.'
        },
        {
          title: '⭐ Aporte Original: Integridad Título VII',
          icon: 'star',
          badge: 'Anticorrupción',
          badgeClass: 'diagram-legal-ref-crbv',
          desc: 'Doble frente de protección, sorteo aleatorio algorítmico inmutable (Art. 26), segregación "4 ojos digital" (Art. 27), sellado criptográfico (Art. 28) e IA ética (Arts. 25, 29-31).'
        }
      ]
    },
    technical: {
      id: 'technical',
      name: 'Arquitectura Técnica & Ciberseguridad Forense V-1.2',
      icon: 'memory',
      badge: 'Defensa por Capas',
      sub: 'Infraestructura tecnológica, capas de defensa Zero Trust, CSIRT-Ulpiano, cadena de custodia ISO 27037, sellado SHA-256 e IA de cumplimiento.',
      file: './svg/arquitectura_tecnica_v1.2.svg',
      breakdown: [
        {
          title: 'Capa 1: Identidad Digital & Zero Trust',
          icon: 'vpn_key',
          badge: 'NIST SP 800-207',
          badgeClass: 'diagram-legal-ref-fisma',
          desc: 'MFA biométrico/criptográfico FIDO2 (Art. 12), micro-segmentación de redes procesales, Planes de Seguridad PSS (Art. 13-bis) y continuidad COOP (Art. 13).'
        },
        {
          title: 'Capa 2: CSIRT & Directivas DOV',
          icon: 'security',
          badge: 'UE 2023/2841 & FISMA',
          badgeClass: 'diagram-legal-ref-eu',
          desc: 'CSIRT-Ulpiano 24/7 (Art. 8), taxonomía de incidentes (Art. 18), Directivas Operativas Vinculantes en 72h (Art. 19-bis) y Auditoría Anual Independiente (Art. 10-bis).'
        },
        {
          title: 'Capa 3: Informática Forense & Hashes',
          icon: 'fingerprint',
          badge: 'ISO/IEC 27037 & RFC 3227',
          badgeClass: 'diagram-legal-ref-iso',
          desc: 'Cadena de custodia forense estandarizada (Art. 20), orden de volatilidad (Art. 21), sellado criptográfico SHA-256 inmutable (Art. 28) y bitácoras WORM inalterables.'
        },
        {
          title: 'Capa 4: Motor Algorítmico & IA Ética',
          icon: 'smart_toy',
          badge: 'ISO/IEC 42001 & ISO 37001',
          badgeClass: 'diagram-legal-ref-locota',
          desc: 'Sorteo aleatorio público certificado (Art. 26), segregación dual 4 ojos (Art. 27), supervisión humana obligatoria (Art. 25) y alertas API en tiempo real (Arts. 29-31).'
        }
      ]
    },
    international: {
      id: 'international',
      name: 'Marco Legal Internacional & Derecho Comparado V-1.2',
      icon: 'public',
      badge: 'Estándares Globales',
      sub: 'Articulación sistemática con el Reglamento (UE) 2023/2841, Directiva NIS2, FISMA 2014 (S.2521), JTC NCSC 2025 y Normas ISO/IEC / NIST.',
      file: './svg/marco_legal_internacional_v1.2.svg',
      breakdown: [
        {
          title: '🇪🇺 Unión Europea: Gobernanza & NIS2',
          icon: 'hub',
          badge: 'UE 2023/2841 & NIS2',
          badgeClass: 'diagram-legal-ref-eu',
          desc: 'Ecosistema de ciberseguridad CERT-EU/IICB, Directiva de datos en materia penal 2016/680, deber de diligencia NIS2 y principio de privacidad desde el diseño (GDPR).'
        },
        {
          title: '🇺🇸 Estados Unidos: FISMA 2014 & NIST',
          icon: 'verified_user',
          badge: 'S.2521 / PL 113-283',
          badgeClass: 'diagram-legal-ref-fisma',
          desc: 'Adopción de los tres pilares FISMA 2014: Auditoría Anual Independiente (§ 3555), PSS por activo crítico (§ 3554) y DOVs perentorias (§ 3553) bajo controles NIST SP 800-53.'
        },
        {
          title: '🏛️ Resiliencia en Cortes: JTC NCSC 2025',
          icon: 'gavel',
          badge: 'COSCA / NCSC 2025',
          badgeClass: 'diagram-legal-ref-iso',
          desc: 'Estándares de ciberdefensa judicial, planes de continuidad COOP, copias de seguridad desconectadas (air-gapped) anti-ransomware y capacitación procesal.'
        },
        {
          title: '🌐 Estándares ISO/IEC & Compliance',
          icon: 'shield',
          badge: 'ISO 27001 / 27037 / 42001',
          badgeClass: 'diagram-legal-ref-locota',
          desc: 'SGSI (27001), Gestión de Incidentes (27035), Evidencia Forense (27037/42), Continuidad (22301), Antisoborno (37001), Compliance (37301) e IA Ética (42001).'
        }
      ]
    },
    national: {
      id: 'national',
      name: 'Marco Legal Nacional & Bloque Constitucional V-1.2',
      icon: 'balance',
      badge: 'Art. 203 CRBV Orgánico',
      sub: 'Pirámide de jerarquía de Ley Orgánica preferente transversal, doctrina vinculante TSJ/SC 0406/2026, articulación con LOCOTA 2026 y garantías procesales.',
      file: './svg/marco_legal_nacional_v1.2.svg',
      breakdown: [
        {
          title: '🇻🇪 Bloque Constitucional (CRBV)',
          icon: 'balance',
          badge: 'Art. 203 CRBV',
          badgeClass: 'diagram-legal-ref-crbv',
          desc: 'Rango de Ley Orgánica transversal preferente sobre leyes ordinarias, tutela efectiva (Art. 26), debido proceso (Art. 49), habeas data (Art. 28) e interés público TIC (Art. 110).'
        },
        {
          title: '⚖️ Doctrina Vinculante TSJ/SC N° 0406',
          icon: 'gavel',
          badge: 'Sentencia 0406/2026',
          badgeClass: 'diagram-legal-ref-fisma',
          desc: 'Interpretación jurisprudencial vinculante que blinda el carácter orgánico de la ciberseguridad procesal, convalida el sorteo digital y exige supervisión humana indelegable.'
        },
        {
          title: '📜 Celeridad & Trámites: LOCOTA 2026',
          icon: 'bolt',
          badge: 'LOCOTA Arts. 7 & 11',
          badgeClass: 'diagram-legal-ref-locota',
          desc: 'Interconexión con Unidades de Celeridad (Art. 11 LOCOTA), articulación con Comisión Nacional (Art. 7 LOCOTA), Ley de Infogobierno y Manual de Cadena de Custodia.'
        },
        {
          title: '🛡️ Régimen Sancionatorio & Garantías',
          icon: 'policy',
          badge: 'Título VIII (Arts. 32-37)',
          badgeClass: 'diagram-legal-ref-iso',
          desc: 'Tipicidad escalonada (Leves, Graves, Muy Graves), penas proporcionales, doble instancia administrativa y judicial asegurada y debido proceso garantista.'
        }
      ]
    },
    original: {
      id: 'original',
      name: 'Aporte de Valor Original: Régimen de Integridad (Título VII)',
      icon: 'star',
      badge: 'Anticorrupción & IA',
      sub: 'Tesis innovadora: Ciberseguridad activa no solo perimetral externa sino como mecanismo auditor interno anticorrupción y anticretardo en justicia y entes públicos.',
      file: './svg/titulo_vii_idea_de_valor_v1.2.svg',
      breakdown: [
        {
          title: '🛡️ Doble Frente (Honeste Vivere)',
          icon: 'security',
          badge: 'Judicial & Administrativo',
          badgeClass: 'diagram-legal-ref-crbv',
          desc: 'Protección perimetral externa frente a hackers y auditoría interna a operadores para evitar alteración de causas, extravío de pruebas o dilación indebida.'
        },
        {
          title: '🎲 Sorteo Aleatorio (Suum Cuique Tribuere)',
          icon: 'shuffle',
          badge: 'Art. 26 Anteproyecto',
          badgeClass: 'diagram-legal-ref-fisma',
          desc: 'Algoritmo público y auditable que elimina la asignación manual de causas, trámites y licitaciones, generando registro criptográfico inmutable.'
        },
        {
          title: '🔒 Segregación "4 Ojos" (Alterum Non Laedere)',
          icon: 'lock',
          badge: 'Arts. 27-28 Anteproyecto',
          badgeClass: 'diagram-legal-ref-locota',
          desc: 'Ningún funcionario o servidor público puede aprobar actos críticos en solitario. Bitácoras protegidas con Hashes inalterables incluso por DBAs.'
        },
        {
          title: '🤖 IA Anticorrupción & Supervisión',
          icon: 'smart_toy',
          badge: 'Arts. 25, 29-31',
          badgeClass: 'diagram-legal-ref-iso',
          desc: 'Alertas en tiempo real vía API para Contraloría e Inspectoría General, detección automática de anomalías y prohibición de fallos 100% autónomos sin juez responsable.'
        }
      ]
    }
  };

  const svgDiagramCache = {};

  async function loadDiagramSvg(tabKey) {
    const diag = DIAGRAMS_REGISTRY[tabKey] || DIAGRAMS_REGISTRY.master;
    if (svgDiagramCache[diag.id]) return svgDiagramCache[diag.id];

    if (diag.file) {
      try {
        const res = await fetch(diag.file);
        if (res.ok) {
          const svgContent = await res.text();
          svgDiagramCache[diag.id] = svgContent;
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

  async function renderDiagramsView(tabKey) {
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

  function switchDiagramTab(tabKey) {
    state.currentDiagramTab = tabKey;
    resetDiagramZoom();
    renderDiagramsView(tabKey);
  }

  function applyDiagramZoom() {
    const viewportContent = document.getElementById('diagram-viewport-content');
    const zoomValEl = document.getElementById('diagram-zoom-val');
    if (viewportContent) {
      viewportContent.style.transform = `scale(${state.diagramZoom})`;
    }
    if (zoomValEl) {
      zoomValEl.textContent = `${Math.round(state.diagramZoom * 100)}%`;
    }
  }

  function zoomDiagram(delta) {
    state.diagramZoom = Math.max(0.5, Math.min(2.5, state.diagramZoom + delta));
    applyDiagramZoom();
  }

  function resetDiagramZoom() {
    state.diagramZoom = 1.0;
    applyDiagramZoom();
  }

  function toggleDiagramFullscreen() {
    const card = document.getElementById('main-diagram-viewer-card');
    const btn = document.getElementById('btn-diagram-fullscreen');
    if (!card) return;

    const isFull = card.classList.toggle('is-fullscreen');
    if (btn) {
      btn.innerHTML = isFull 
        ? '<span class="material-symbols-outlined" style="font-size:1rem;">fullscreen_exit</span> Salir de Pantalla Completa'
        : '<span class="material-symbols-outlined" style="font-size:1rem;">fullscreen</span> Pantalla Completa';
    }
  }

  function downloadActiveDiagram() {
    const activeKey = state.currentDiagramTab || 'master';
    const diag = DIAGRAMS_REGISTRY[activeKey] || DIAGRAMS_REGISTRY.master;
    const link = document.createElement('a');
    link.href = diag.file;
    link.download = diag.file.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function openActiveDiagramNewTab() {
    const activeKey = state.currentDiagramTab || 'master';
    const diag = DIAGRAMS_REGISTRY[activeKey] || DIAGRAMS_REGISTRY.master;
    window.open(diag.file, '_blank');
  }

  // Global API
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
    DocRegistry
  };
})();
