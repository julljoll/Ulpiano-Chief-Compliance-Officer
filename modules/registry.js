/**
 * ULPIANO CCO — Document Registry & Reforms Catalog Module
 * The single source of truth is registry.json.
 */

export const REFORMS_CATALOG = [
  {
    article: 'Artículo 10-bis° (FISMA 2014 § 3555)',
    type: 'Gobernanza & Auditoría',
    badgeClass: 'dc3-tag dc3-tag-green',
    summary: 'Auditoría Independiente Anual de Ciberseguridad Procesal obligatoria contratada por DINCIP con reporte a AN, CGR y TSJ.',
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
    article: 'Artículo 7° Atribuciones DINCIP (Nums. 7 y 8)',
    type: 'Potestad Normativa',
    badgeClass: 'dc3-tag dc3-tag-purple',
    summary: 'Emisión de Directivas Vinculantes e Inventario Nacional de Sistemas de Información Procesales y Administrativos.',
    impact: 'Dota a la DINCIP de facultades ejecutivas de control sobre todos los órganos del Poder Público.',
    before: 'V1.1: Atribuciones generales de estandarización técnica sin facultad expresa de emitir DOVs ni inventario nacional.',
    beforeTag: 'V1.1',
    after: 'V1.2: Emisión vinculante de DOVs y publicación anual obligatoria del Inventario Nacional de Sistemas.',
    afterTag: 'V1.2',
    targetDoc: 'v1.2'
  },
  {
    article: 'Artículos 3°, 4° y 11° (LOCOTA 2026)',
    type: 'Interoperabilidad & Celeridad',
    badgeClass: 'dc3-tag dc3-tag-gold',
    summary: 'Articulación con Unidades de Celeridad (Art. 11 LOCOTA) y la Comisión Nacional para la Celeridad (Art. 7 LOCOTA).',
    impact: 'Alinea los sistemas con la optimización de trámites y garantiza cero dilaciones indebidas.',
    before: 'V1.1: Referencia orgánica genérica sin articulación con el ecosistema de celeridad de trámites ni ventanillas únicas.',
    beforeTag: 'V1.1',
    after: 'V1.2: Integración con Unidades de Celeridad, ventanillas únicas y Comisión Nacional para la Celeridad.',
    afterTag: 'V1.2',
    targetDoc: 'v1.2'
  },
  {
    article: 'Supremacía Orgánica (TSJ 0406/2026 & Art. 203 CRBV)',
    type: 'Blindaje Constitucional',
    badgeClass: 'dc3-tag dc3-tag-red',
    summary: 'Fundamentación formal en la Sentencia TSJ/SC N° 0406/2026 que desarrolla los Arts. 141 y 257 CRBV.',
    impact: 'Garantiza jerarquía preferente como Ley Orgánica sobre cualquier ley ordinaria posterior.',
    before: 'V1.0: Proyecto calificado como Ley Especial subordinada a leyes orgánicas preexistentes.',
    beforeTag: 'V1.0',
    after: 'V1.2: Rango formal de Ley Orgánica material amparado en jurisprudencia vinculante del TSJ y Art. 203 CRBV.',
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
    article: 'Arquitectura Backend en Python 3.12 (FastAPI)',
    type: 'Arquitectura Tecnológica',
    badgeClass: 'dc3-tag dc3-tag-green',
    summary: 'Servidor API asíncrono con PyKCS11 HSM FIPS 140-2 L3, pyHanko PAdES, Celery, pgvector y MinIO S3 WORM.',
    impact: 'Provee soberanía tecnológica, rendimiento asíncrono y criptografía judicial de alta fidelidad.',
    before: 'V1.0: Lógica monolítica genérica sin separación estricta de backend criptográfico.',
    beforeTag: 'V1.0',
    after: 'V1.2: Servidor API desacoplado 100% en Python 3.12 (FastAPI) con OpenAPI 3.1 REST y WebSockets (WSS).',
    afterTag: 'V1.2',
    targetDoc: 'v1.2'
  },
  {
    article: 'Arquitectura Frontend en Next.js 15 (App Router)',
    type: 'Experiencia Ciudadana',
    badgeClass: 'dc3-tag dc3-tag-blue',
    summary: 'Cliente web judicial con visor forense React-PDF, accesibilidad universal WCAG 2.1 AAA y FIDO2 WebAuthn.',
    impact: 'Garantiza acceso universal, cotejo público transparente y cero barreras de acceso a la justicia.',
    before: 'V1.0: Portal web tradicional sin visor forense nativo ni soporte integral de accesibilidad AAA.',
    beforeTag: 'V1.0',
    after: 'V1.2: Portal Next.js 15 con tokens USWDS 3.0, lector CSV/QR y comunicación tipada hacia Python.',
    afterTag: 'V1.2',
    targetDoc: 'v1.2'
  },
  {
    article: 'Título VII Art. 26: Sorteo Criptoseguro Algorítmico',
    type: 'Integridad Procesal',
    badgeClass: 'dc3-tag dc3-tag-red',
    summary: 'Asignación determinística de ponencias mediante CSPRNG (secrets.SystemRandom) e indexación en Árbol de Merkle.',
    impact: 'Erradica la asignación manual discrecional y la manipulación de causas en tribunales.',
    before: 'V1.0: Sorteos manuales o sistemas aleatorios sin auditoría de entropía criptográfica.',
    beforeTag: 'V1.0',
    after: 'V1.2: Sorteo algorítmico inmutable con semilla de entropía registrada y auditable por el CCO.',
    afterTag: 'V1.2',
    targetDoc: 'v1.2'
  },
  {
    article: 'Título VII Art. 27: Segregación "4 Ojos" Digital',
    type: 'Anticorrupción Interna',
    badgeClass: 'dc3-tag dc3-tag-red',
    summary: 'Doble firma obligatoria e indivisible (Juez + Secretario) para autos, sentencias y resoluciones críticas.',
    impact: 'Impide la modificación unilateral de expedientes y asegura la corresponsabilidad funcional.',
    before: 'V1.0: Credenciales individuales que permitían registrar actuaciones sin doble verificación.',
    beforeTag: 'V1.0',
    after: 'V1.2: Bloqueo de sistema ante intentos de firma solitaria en resoluciones judiciales y administrativas.',
    afterTag: 'V1.2',
    targetDoc: 'v1.2'
  },
  {
    article: 'Título VII Art. 28: Sellado Criptográfico e Inalterabilidad WORM',
    type: 'Cadena de Custodia Digital',
    badgeClass: 'dc3-tag dc3-tag-gold',
    summary: 'Hash dual SHA-256/SHA3-512, sellado de tiempo TSA RFC 3161 y almacenamiento inmutable Object Lock.',
    impact: 'Garantiza que ningún administrador de bases de datos pueda alterar retroactivamente un fallo.',
    before: 'V1.0: Almacenamiento en bases de datos relacionales estándar vulnerables a modificación por DBAs.',
    beforeTag: 'V1.0',
    after: 'V1.2: Bóveda WORM inmutable en MinIO S3 con cadena de custodia conforme a ISO/IEC 27037.',
    afterTag: 'V1.2',
    targetDoc: 'v1.2'
  },
  {
    article: 'Título VII Arts. 25, 29-31: IA Ética y Alertas Tempranas',
    type: 'Inteligencia Artificial',
    badgeClass: 'dc3-tag dc3-tag-purple',
    summary: 'Supervisión humana obligatoria (ISO 42001) y canal de alertas de retardo y anomalías hacia CGR y SUNAI.',
    impact: 'Prohíbe sentencias automáticas y transforma la IA en un radar de cumplimiento anticorrupción.',
    before: 'V1.0: Sin regulación expresa sobre el uso ético ni delimitación estricta de la IA judicial.',
    beforeTag: 'V1.0',
    after: 'V1.2: Alertas tempranas en tiempo real para órganos de control y prohibición estricta de fallos sin juez humano.',
    afterTag: 'V1.2',
    targetDoc: 'v1.2'
  },
  {
    article: 'Título VIII Arts. 32-37: Régimen Sancionatorio Graduado',
    type: 'Garantías Punitivas',
    badgeClass: 'dc3-tag dc3-tag-red',
    summary: 'Tipicidad estricta de faltas leves, graves y gravísimas con sanciones administrativas, disciplinarias y penales.',
    impact: 'Asegura proporcionalidad y pleno respeto al debido proceso y doble instancia (Art. 49 CRBV).',
    before: 'V1.0: Remisiones sancionatorias genéricas sin tipificación escalonada ni garantías expresas de defensa.',
    beforeTag: 'V1.0',
    after: 'V1.2: Catálogo autónomo tipificado con destitución e inhabilitación para actos graves de corrupción digital.',
    afterTag: 'V1.2',
    targetDoc: 'v1.2'
  }
];

export const DocRegistry = {
  docs: [],

  async load() {
    try {
      const res = await fetch('./registry.json');
      if (res.ok) {
        const remoteDocs = await res.json();
        if (Array.isArray(remoteDocs) && remoteDocs.length > 0) {
          this.docs = remoteDocs;
          return this.docs;
        }
      }
    } catch (e) {
      console.info('DocRegistry: error cargando registry.json.', e);
    }
    return this.docs;
  },

  get(id) {
    return this.docs.find(d => d.id === id) || this.docs[0] || null;
  },

  getLatest() {
    return this.docs[0] || null;
  },

  getAll() {
    return this.docs;
  }
};
