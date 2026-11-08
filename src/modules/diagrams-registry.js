/**
 * ULPIANO CCO — Vector Diagrams Registry
 */
export const DIAGRAMS_REGISTRY = {
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
  },
  workflows: {
    id: 'workflows',
    name: 'CMS Compliance Officer: Motor de Workflows & Alertas IA',
    icon: 'account_tree',
    badge: 'Code-Based (Sin GUI)',
    sub: 'Arquitectura modular programática (/workflows/, /triggers/, /actions/, /guards/) para publicación Cuatro Ojos, sorteo, cadena de custodia e IA para alertas tempranas.',
    file: './svg/cms_compliance_workflows_arquitectura.svg',
    breakdown: [
      {
        title: '1. /triggers/ — Disparadores de Evento',
        icon: 'bolt',
        badge: 'Event-Driven',
        badgeClass: 'diagram-legal-ref-fisma',
        desc: 'Ingesta mediante Webhooks Next.js, PostgreSQL LISTEN/NOTIFY, colas BullMQ/Redis y cron jobs programados.'
      },
      {
        title: '2. /guards/ — Guardias de Seguridad & RBAC',
        icon: 'security',
        badge: 'Cuatro Ojos & MFA',
        badgeClass: 'diagram-legal-ref-crbv',
        desc: 'Segregación obligatoria de funciones (Art. 22), validación de elegibilidad de jueces, comprobación MIME y supervisión humana (Art. 25).'
      },
      {
        title: '3. /workflows/ — Orquestación Secuencial',
        icon: 'schema',
        badge: 'BPMN 2.0 en Código',
        badgeClass: 'diagram-legal-ref-locota',
        desc: 'Pipelines programáticos sin GUI (Temporal.io / TypeScript): publicación Cuatro Ojos, sorteo determinístico, custodia forense y alertas IA.'
      },
      {
        title: '4. /actions/ — Ejecución Criptográfica Atómica',
        icon: 'fingerprint',
        badge: 'HSM / SHA3 / TSA',
        badgeClass: 'diagram-legal-ref-eu',
        desc: 'Firma PAdES SUSCERTE, Hash dual (SHA-256 + SHA3-512), sellado TSA RFC 3161 y almacenamiento inmutable WORM.'
      }
    ]
  },
  organigram: {
    id: 'organigram',
    name: 'Organigrama Funcional Descendente: CMS Compliance Officer',
    icon: 'corporate_fare',
    badge: 'Jerarquía de Control',
    sub: 'Estructura jerárquica descendente: Dirección Superior -> Bifurcación (Workflows vs IA) -> 4 Estratos (/triggers/, /guards/, /workflows/, /actions/) -> Salidas Judiciales.',
    file: './svg/cms_compliance_organigrama_descendente.svg',
    breakdown: [
      {
        title: 'Nivel 1: Dirección Nacional de Compliance TSJ',
        icon: 'corporate_fare',
        badge: 'Órgano Rector',
        badgeClass: 'diagram-legal-ref-crbv',
        desc: 'Supervisión integral, gobernanza tecnológica, marco CRBV 203, doctrina TSJ 0406/2026 y FISMA 2014.'
      },
      {
        title: 'Nivel 2: Dos Pilares (Automatización vs IA)',
        icon: 'alt_route',
        badge: 'Doble Rama',
        badgeClass: 'diagram-legal-ref-fisma',
        desc: 'Bifurcación clara: Rama A (Workflows code-based sin GUI) vs Rama B (IA exclusivamente para alertas tempranas).'
      },
      {
        title: 'Niveles 3-4: 4 Estratos Funcionales',
        icon: 'layers',
        badge: 'Arquitectura Modular',
        badgeClass: 'diagram-legal-ref-locota',
        desc: 'Cascada secuencial: /triggers/ (ingesta) -> /guards/ (segregación) -> /workflows/ (pipelines) -> /actions/ (cripto).'
      },
      {
        title: 'Nivel 5: Servicios y Salidas Institucionales',
        icon: 'verified',
        badge: 'Impacto Ciudadano',
        badgeClass: 'diagram-legal-ref-eu',
        desc: 'Portal público firmado, sorteo imparcial, bóveda forense WORM y alertas en tiempo real a Inspectoría.'
      }
    ]
  },
  backend_python: {
    id: 'backend_python',
    name: 'Arquitectura Backend TSJ: Servidor API en Python 3.12 (FastAPI)',
    icon: 'code',
    badge: 'FastAPI + SUSCERTE PKI',
    sub: 'Arquitectura del Servidor API desacoplado en Python 3.12 (FastAPI/Uvicorn), PKI SUSCERTE, Celery/Redis, pgvector RAG y Bóveda WORM, preparado para conectar con Next.js vía REST/WebSockets.',
    file: './svg/backend_python_api_arquitectura.svg',
    breakdown: [
      {
        title: 'Capa 1: Ingress, Reverse Proxy & ASGI Gateway',
        icon: 'router',
        badge: 'FastAPI / TLS 1.3',
        badgeClass: 'diagram-legal-ref-fisma',
        desc: 'Terminación TLS 1.3, HSTS, Rate Limiting, ASGI AsyncIO (uvloop), OpenAPI 3.1, Pydantic v2 y autenticación OAuth2 FIDO2.'
      },
      {
        title: 'Capa 2: Motor Criptográfico Judicial & PKI SUSCERTE',
        icon: 'fingerprint',
        badge: 'PyKCS11 / pyHanko',
        badgeClass: 'diagram-legal-ref-crbv',
        desc: 'Tokens HSM FIPS 140-2 Nivel 3, firma PAdES-B-LTA (ISO 19005-2), Sellado de Tiempo TSA RFC 3161 y Hash dual SHA-256 + SHA3-512.'
      },
      {
        title: 'Capa 3: Workers Asíncronos, IA Ética & RAG Normativo',
        icon: 'psychology',
        badge: 'Celery / Redis / RAG',
        badgeClass: 'diagram-legal-ref-locota',
        desc: 'Colas Celery para sellado masivo, IA de alertas tempranas CGR/SUNAI (ISO 42001), sorteo criptoseguro y LlamaIndex/LangChain RAG.'
      },
      {
        title: 'Capa 4: Persistencia PostgreSQL 16 & Bóveda WORM S3',
        icon: 'database',
        badge: 'AsyncPG & MinIO S3',
        badgeClass: 'diagram-legal-ref-eu',
        desc: 'PostgreSQL 16 con extensión pgvector, SQLAlchemy 2.0, Bóveda WORM MinIO con Object Lock inmutable y bitácora forense Merkle Tree.'
      }
    ]
  },
  frontend_nextjs: {
    id: 'frontend_nextjs',
    name: 'Portal Judicial TSJ: Frontend Web en Next.js 15 (App Router)',
    icon: 'web',
    badge: 'Next.js + React-PDF',
    sub: 'Arquitectura del Cliente Web desacoplado en Next.js 15 (App Router), Visor Forense React-PDF, tokens USWDS 3.0, accesibilidad WCAG 2.1 AAA y conexión API REST / WebSockets hacia el backend en Python FastAPI.',
    file: './svg/tsj_arquitectura_frontend.svg',
    breakdown: [
      {
        title: 'Capa 1: UX Judicial, USWDS 3.0 & Accesibilidad AAA',
        icon: 'accessibility_new',
        badge: 'USWDS / WCAG AAA',
        badgeClass: 'diagram-legal-ref-fisma',
        desc: 'Diseño sin barreras cognitivas ni motrices, fuentes Public Sans / Roboto Mono, contraste >7:1 y compatibilidad ARIA universal.'
      },
      {
        title: 'Capa 2: Visor Forense React-PDF & Cotejo CSV/QR',
        icon: 'picture_as_pdf',
        badge: 'React-PDF / PDF.js',
        badgeClass: 'diagram-legal-ref-crbv',
        desc: 'Renderizado de sentencias PDF/A-2u, inspección de firmas PAdES, lectura de QR y cotejo público universal con Código CSV.'
      },
      {
        title: 'Capa 3: Tablero CCO & Segregación 4 Ojos (Art. 27)',
        icon: 'dashboard_customize',
        badge: 'Panel Compliance',
        badgeClass: 'diagram-legal-ref-locota',
        desc: 'Monitoreo de causas judiciales, alertas tempranas de retardo procesal hacia CGR/SUNAI y flujo de doble firma Juez + Secretario.'
      },
      {
        title: 'Capa 4: Conexión API REST & WebSockets (FastAPI)',
        icon: 'sync_alt',
        badge: 'OpenAPI 3.1 & WSS',
        badgeClass: 'diagram-legal-ref-eu',
        desc: 'Consumo autenticado de endpoints REST con Bearer JWT FIDO2, canal WSS para alertas en vivo y cabeceras CSP con Nonce.'
      }
    ]
  }
};
