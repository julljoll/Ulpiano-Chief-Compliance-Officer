/**
 * Ulpiano CCO — Legal Normative & Standards Reference Constants (TypeScript)
 */

export interface LegalFramework {
  jurisdiction: string;
  organicBasis: string;
  bindingJurisprudence: string;
  administrativeReform: string;
  internationalComparative: {
    fisma: string;
    eu: string;
    jtc: string;
  };
  isoStandards: string[];
  accessibility: string;
}

export const LEGAL_FRAMEWORK: LegalFramework = {
  jurisdiction: 'República Bolivariana de Venezuela',
  organicBasis: 'Constitución de la República Bolivariana de Venezuela (CRBV) Art. 203',
  bindingJurisprudence: 'Sentencia TSJ/SC N° 0406/2026',
  administrativeReform:
    'Ley Orgánica para la Celeridad y Optimización de Trámites Administrativos (LOCOTA 2026)',
  internationalComparative: {
    fisma:
      'Federal Information Security Modernization Act of 2014 (S.2521 / 44 U.S.C. § 3551 et seq.)',
    eu: 'Reglamento (UE) 2023/2841 sobre Ciberseguridad Institucional (CERT-EU / IICB)',
    jtc: 'Joint Technology Committee (NCSC) 2025: Zero Trust Architecture in Courts',
  },
  isoStandards: ['ISO/IEC 27001', 'ISO/IEC 27037', 'ISO/IEC 42001', 'ISO/IEC 22301'],
  accessibility: 'WCAG 2.1 AAA / USWDS 3.0 / Section 508',
};

import type { MatrixRowItem } from '../types/legal';

export const MATRIX_ROWS: MatrixRowItem[] = [
  {
    rowNum: '01',
    titleId: 'TÍTULO I',
    titleName: 'Disposiciones Generales',
    articles: 'Arts. 1° al 7°',
    topic: 'Objeto, Ámbito Pleno y Principios',
    scope:
      'Regula ciberseguridad procesal con rango orgánico. Extiende el ámbito a tribunales, fiscalía, defensa pública y a la totalidad de la administración pública generadora de actos vinculantes.',
    category: 'organica fisma',
    hierarchy: 'Orgánica',
    comparativeLaw: [
      { tag: 'UE 2023/2841', detail: 'Arts. 1-4 (Ámbito y definiciones)' },
      { tag: 'FISMA 2014', detail: '44 U.S.C. § 3552 (Definiciones de seguridad)' },
      { tag: 'ISO/IEC 27000', detail: 'Vocabulario internacional de seguridad' },
    ],
    constitutionalBlock: [
      { tag: 'CRBV Art. 203', detail: 'Ley Orgánica Transversal', isImportant: true },
      { tag: 'TSJ SC 0406/2026', detail: 'Doctrina Vinculante de Rango Orgánico' },
      { tag: 'LOCOTA 2026', detail: 'Celeridad y Trámites Administrativos' },
      { tag: 'CRBV', detail: 'Arts. 26, 28, 49, 110, 141' },
    ],
  },
  {
    rowNum: '02',
    titleId: 'TÍTULO II',
    titleName: 'Institucionalidad Sectorial',
    articles: 'Arts. 8° al 11-bis°',
    topic: 'DINCIP, CSIRT-Ulpiano y Junta',
    scope:
      'Crea la Dirección Nacional, el CSIRT especializado de justicia, la Junta de Integridad y la Evaluación Independiente Anual obligatoria con reporte a la AN y CGR.',
    category: 'fisma institucional',
    hierarchy: 'Institucional',
    comparativeLaw: [
      { tag: 'UE 2023/2841', detail: 'CERT-EU & Junta IICB (Arts. 9-11)' },
      { tag: 'FISMA 2014', detail: '§ 3555 (Evaluación Independiente Anual)' },
    ],
    constitutionalBlock: [
      { tag: 'CRBV', detail: 'Arts. 253, 254 (Autonomía TSJ)' },
      { tag: 'LOCOTA Art. 7', detail: 'Comisión Nacional de Celeridad' },
      { tag: 'CRBV', detail: 'Art. 284 (Ministerio Público)' },
    ],
  },
  {
    rowNum: '03',
    titleId: 'TÍTULO III',
    titleName: 'Estándares y Planes (PSS)',
    articles: 'Arts. 12°, 13°, 13-bis°',
    topic: 'Zero Trust, COOP y Planes de Seguridad',
    scope:
      'Segmentación de redes procesales, MFA obligatorio, continuidad operativa judicial y Plan de Seguridad del Sistema (PSS) por cada activo crítico institucional.',
    category: 'fisma tecnico',
    hierarchy: 'Técnico',
    comparativeLaw: [
      { tag: 'JTC Courts 2025', detail: 'Zero Trust, MFA y COOP Judicial' },
      { tag: 'FISMA 2014', detail: '§ 3554(b)(1) (System Security Plan / PSS)' },
      { tag: 'NIST SP 800-53', detail: 'Risk Management Framework & Controls' },
      { tag: 'ISO 27001 / 22301', detail: 'Gestión de Seguridad y Continuidad' },
    ],
    constitutionalBlock: [
      { tag: 'CRBV Art. 110', detail: 'Interés público en TIC y ciencia' },
      { tag: 'LOCOTA Arts. 5, 10', detail: 'Interoperabilidad Digital del Estado' },
      { tag: 'SUSCERTE / CNTI', detail: 'Normas Técnicas y Certificación' },
    ],
  },
  {
    rowNum: '04',
    titleId: 'TÍTULO IV',
    titleName: 'Debido Proceso Digital',
    articles: 'Arts. 14° al 16°',
    topic: 'Garantías Constitucionales Digitales',
    scope:
      'Prohibición de indefensión por falla técnica, trazabilidad inalterable de notificaciones y derecho a prueba en contrario ante sistemas automatizados o IA.',
    category: 'organica garantias',
    hierarchy: 'Garantías',
    comparativeLaw: [
      { tag: 'Directiva UE 2016/680', detail: 'Protección de datos en materia penal' },
      { tag: 'OCDE 2023', detail: 'Principios de Inteligencia Artificial Confiable' },
    ],
    constitutionalBlock: [
      { tag: 'CRBV Art. 49', detail: 'Debido Proceso y Defensa Plena', isImportant: true },
      { tag: 'CRBV Art. 28', detail: 'Habeas Data & Autodeterminación' },
      { tag: 'CRBV Art. 257', detail: 'Justicia Material sobre formalismos' },
    ],
  },
  {
    rowNum: '05',
    titleId: 'TÍTULO V',
    titleName: 'Incidentes & DOV',
    articles: 'Arts. 17°, 18°, 19-bis°',
    topic: 'Notificación 24h y Directivas Vinculantes',
    scope:
      'Taxonomía unificada de severidad, reporte obligatorio en 24h y régimen de Directivas Operativas Vinculantes (DOV) con contención en 72h y remediación en 30 días.',
    category: 'fisma operativo',
    hierarchy: 'Operativo',
    comparativeLaw: [
      { tag: 'UE 2023/2841', detail: 'Arts. 18-23 (Taxonomía y Gestión de Crisis)' },
      { tag: 'FISMA 2014', detail: '§ 3553(b) (Binding Operational Directives / CISA)' },
      { tag: 'ISO/IEC 27035', detail: 'Gestión de Incidentes de Ciberseguridad' },
    ],
    constitutionalBlock: [
      { tag: 'CRBV Art. 55', detail: 'Seguridad ciudadana y orden público' },
      { tag: 'Ley Delitos Inf.', detail: 'Arts. 6, 7 (Acceso indebido y sabotaje)' },
    ],
  },
  {
    rowNum: '06',
    titleId: 'TÍTULO VI',
    titleName: 'Régimen Probatorio Forense',
    articles: 'Arts. 19° al 23°',
    topic: 'Cadena de Custodia Digital & Peritaje',
    scope:
      'Estándares internacionales de recolección de evidencia digital, orden de volatilidad, Registro Nacional de Peritos y preparación forense continua (forensic readiness).',
    category: 'forense',
    hierarchy: 'Forense',
    comparativeLaw: [
      { tag: 'ISO/IEC 27037', detail: 'Adquisición, preservación y embalaje' },
      { tag: 'ISO 27041 / 27042', detail: 'Idoneidad de métodos y análisis forense' },
      { tag: 'ISO/IEC 27043', detail: 'Preparación forense continua' },
      { tag: 'RFC 3227 / NIST 800-86', detail: 'Orden de volatilidad y análisis' },
    ],
    constitutionalBlock: [
      { tag: 'Manual Único', detail: 'Cadena de Custodia de Evidencias (2017)' },
      { tag: 'COPP', detail: 'Arts. 181-187 (Licitud probatoria)' },
      { tag: 'Ley Mensajes Datos', detail: 'Arts. 4-8 (Eficacia legal y firma electrónica)' },
    ],
  },
  {
    rowNum: '07',
    titleId: 'TÍTULO VII ★',
    titleName: 'Integridad Procesal y Administrativa',
    articles: 'Arts. 24° al 32°',
    topic: 'Aporte Original: Justicia & Toda la Administración Pública',
    scope:
      'Tesis Central Jull Ortiz: Ciberseguridad activa y automatización anticorrupción transversal (CRBV Art. 203): sorteo aleatorio inmutable de causas y expedientes administrativos, 4 ojos digital en el Poder Público, articulación con Unidades de Celeridad (LOCOTA Art. 11) y alertas en tiempo real a Contraloría y Comisión Nacional (LOCOTA Art. 7).',
    category: 'original organica',
    hierarchy: 'Innovación',
    isStar: true,
    comparativeLaw: [
      { tag: '★ Aporte Original', detail: 'Ulpiano CCO (Jull Ortiz)', isOriginal: true },
      { tag: 'ISO 37001 / 37301', detail: 'Gestión Antisoborno y Compliance' },
      { tag: 'ISO/IEC 42001', detail: 'Gestión de Inteligencia Artificial Ética' },
    ],
    constitutionalBlock: [
      { tag: 'CRBV Art. 203', detail: 'Ley Orgánica Transversal', isImportant: true },
      { tag: 'CRBV Art. 141', detail: 'Honestidad, celeridad y rendición de cuentas' },
      { tag: 'LOCOTA Arts. 7, 11', detail: 'Comisión & Unidades de Celeridad' },
      { tag: 'Ley Anticorrupción', detail: 'Auditoría continua de procesos reglados' },
    ],
  },
  {
    rowNum: '08',
    titleId: 'TÍTULO VIII',
    titleName: 'Régimen Sancionatorio',
    articles: 'Arts. 33° al 36°',
    topic: 'Catálogo Escalonado y Garantías',
    scope:
      'Sanciones clasificadas en leves, graves y muy graves (destitución e inhabilitación de 3 a 10 años). Agravante específica por manipulación interna del sistema y responsabilidad funcionarial por dilación procesal.',
    category: 'punitivo organica',
    hierarchy: 'Punitivo',
    comparativeLaw: [
      { tag: 'UE Ciberseguridad', detail: 'Régimen de proporcionalidad de sanciones' },
      { tag: 'FISMA 2014', detail: '§§ 3553-3554 (Responsabilidad directa del titular)' },
    ],
    constitutionalBlock: [
      { tag: 'CRBV Art. 49', detail: 'Tipicidad, proporcionalidad y doble instancia' },
      { tag: 'LOCOTA Art. 11', detail: 'Responsabilidad administrativa por dilación' },
      { tag: 'Código Ética Judicial', detail: 'Inhabilitación y destitución disciplinaria' },
    ],
  },
  {
    rowNum: '09',
    titleId: 'TÍTULO IX',
    titleName: 'Cooperación y Formación',
    articles: 'Arts. 37° y 38°',
    topic: 'Capacitación y Ciberdefensa Judicial',
    scope:
      'Programa anual obligatorio de entrenamiento en higiene cibernética judicial, IA y cooperación técnica internacional para operadores de justicia y funcionarios públicos.',
    category: 'formacion',
    hierarchy: 'Formación',
    comparativeLaw: [
      { tag: 'JTC Courts 2025', detail: 'Annual Cybersecurity Training for Staff' },
      { tag: 'CERT-EU', detail: 'Simulacros y ejercicios interinstitucionales' },
    ],
    constitutionalBlock: [
      { tag: 'CRBV Art. 153', detail: 'Integración y cooperación técnica' },
      { tag: 'Escuela Magistratura', detail: 'Capacitación judicial obligatoria' },
    ],
  },
  {
    rowNum: '10',
    titleId: 'TÍTULO X',
    titleName: 'Auditoría Algorítmica',
    articles: 'Arts. 39° y 40°',
    topic: 'Transparencia y Evaluación de IA',
    scope:
      'Registro público de algoritmos empleados en justicia y administración pública, auditoría continua de sesgos e impacto en derechos fundamentales.',
    category: 'tecnico etica',
    hierarchy: 'IA Ética',
    comparativeLaw: [
      { tag: 'ISO/IEC 23894', detail: 'Gestión de Riesgos en Inteligencia Artificial' },
      { tag: 'ISO/IEC 42001', detail: 'Gobernanza de Sistemas de IA' },
      { tag: 'AI Act (UE)', detail: 'Sistemas de alto riesgo en justicia' },
    ],
    constitutionalBlock: [
      { tag: 'CRBV Art. 143', detail: 'Acceso a información pública y rendición' },
      { tag: 'CRBV Art. 60', detail: 'Protección del honor y datos personales' },
    ],
  },
  {
    rowNum: '11',
    titleId: 'TÍTULO XI',
    titleName: 'Supremacía y Disposiciones',
    articles: 'Arts. 41°, 42° + Disp.',
    topic: 'Supremacía Orgánica y Régimen Transitorio',
    scope:
      'Cláusula formal de supremacía de Ley Orgánica solo subordinada a la CRBV. Plazos de adecuación progresiva (6 a 18 meses) y derogatoria expresa de normas incompatibles.',
    category: 'organica cierre',
    hierarchy: 'Cierre',
    comparativeLaw: [
      { tag: 'UE 2023/2841', detail: 'Arts. 24-26 (Entrada en vigor y revisión periódica)' },
      { tag: 'FISMA 2014', detail: 'Régimen transitorio de adecuación y reporte' },
    ],
    constitutionalBlock: [
      { tag: 'CRBV Art. 203', detail: 'Supremacía Ley Orgánica Transversal', isImportant: true },
      { tag: 'TSJ SC 0406/2026', detail: 'Doctrina Vinculante Constitucional' },
      { tag: 'LOCOTA Disp. Derog.', detail: 'Derogatoria Expresa de normas incompatibles' },
    ],
  },
  {
    rowNum: '12',
    titleId: 'ANEXO',
    titleName: 'Glosario y Taxonomía',
    articles: '40 Definiciones',
    topic: 'Glosario Técnico-Jurídico Forense',
    scope:
      'Definiciones legales uniformes de Hash Criptográfico, Cadena de Custodia, Zero Trust, DOV, PSS, Auditoría Algorítmica y Evidencia Digital.',
    category: 'tecnico',
    hierarchy: 'Glosario',
    comparativeLaw: [
      { tag: 'ISO/IEC 27000', detail: 'Vocabulario internacional de seguridad' },
      { tag: 'FISMA 2014', detail: 'NIST SP 800-53 / 800-37 Glossaries' },
    ],
    constitutionalBlock: [
      { tag: 'SUSCERTE', detail: 'Vocabulario Forense Digital Nacional' },
      { tag: 'CNTI', detail: 'Interoperabilidad y Datos Abiertos' },
    ],
  },
];
