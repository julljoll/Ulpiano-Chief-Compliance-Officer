/**
 * ULPIANO CCO — Python Backend FastAPI Interactive Simulators Module
 */
import { escapeHtml } from './utils.js';

export function simulateSignDocument() {
  const exp = (document.getElementById('sim-sign-exp') || {}).value || 'EXP-TSJ-SC-2026-0406';
  const court = (document.getElementById('sim-sign-court') || {}).value || 'Sala Constitucional TSJ';
  const judge = (document.getElementById('sim-sign-judge') || {}).value || 'Dr. Jull Ortiz';
  const resultEl = document.getElementById('sim-sign-result');

  if (!resultEl) return;
  resultEl.style.display = 'block';
  resultEl.innerHTML = '<span class="text-white-50"><span class="spinner-border spinner-border-sm text-primary me-2"></span>Llamando a Python 3.12 (FastAPI ASGI)... PyKCS11 HSM Token RSA-4096 / pyHanko PAdES...</span>';

  setTimeout(() => {
    const now = new Date().toISOString();
    const payload = {
      status: "SUCCESS",
      status_code: 201,
      engine: "Python 3.12 (FastAPI / pyHanko 0.25.0 / PyKCS11)",
      document_metadata: {
        expediente: exp,
        tribunal: court,
        firmante_autorizado: judge,
        fecha_certificada_tsa: now
      },
      cryptographic_verification: {
        hash_sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        hash_sha3_512: "a69f73cca23a9ac5c8b567dc185a756e97a9fb43470290779d8b0714f2910b10...",
        pades_profile: "PAdES-B-LTA (ISO 19005-2 PDF/A-2u)",
        tsa_rfc3161: "SUSCERTE Timestamping Authority (TSA-VEN-01)",
        hsm_token: "FIPS 140-2 Level 3 Secure Hardware Token",
        csv_code: "TSJ-2026-SC-0406-V12-F9A7",
        qr_validation_url: `https://jurisprudencia.tsj.gob.ve/cotejo/TSJ-2026-SC-0406-V12-F9A7`
      },
      storage: {
        vault: "MinIO S3 Object Lock (WORM)",
        retention_mode: "COMPLIANCE_PERPETUAL",
        uri: "s3://boveda-sentencias-tsj/2026/08/EXP-TSJ-SC-2026-0406.pdf"
      },
      legal_ground: "LMDyFE Arts. 4, 6, 8, 18 (G.O. 37.148) • Ley de Infogobierno Arts. 11, 23 (G.O. 40.274)"
    };

    resultEl.innerHTML = `<pre class="mb-0 text-info font-monospace">${escapeHtml(JSON.stringify(payload, null, 2))}</pre>`;
  }, 600);
}

export function simulateCotejo() {
  const csv = ((document.getElementById('sim-cotejo-input') || {}).value || '').trim();
  const resultEl = document.getElementById('sim-cotejo-result');
  if (!resultEl) return;

  resultEl.style.display = 'block';
  resultEl.innerHTML = '<span class="text-white-50"><span class="spinner-border spinner-border-sm text-success me-2"></span>Consultando Bóveda WORM en Python FastAPI...</span>';

  setTimeout(() => {
    if (csv === 'TSJ-2026-SC-0406-V12-F9A7') {
      const payload = {
        status: "DOCUMENTO_AUTENTICO",
        codigo_csv: csv,
        integridad: "INALTERADO_100%",
        documento: {
          tipo: "Sentencia Vinculante de Rango Orgánico",
          numero_resolucion: "TSJ/SC N° 0406-2026",
          sala: "Sala Constitucional del Tribunal Supremo de Justicia",
          fecha_publicacion: "2026-08-23T10:00:00-04:00",
          asunto: "Doctrina Vinculante sobre el Artículo 203 de la CRBV y la Ley Orgánica de Ciberseguridad Procesal"
        },
        certificacion_digital: {
          firmas_validas: 7,
          raiz_confianza: "SUSCERTE — Raíz de Certificación del Estado Venezolano",
          sello_tiempo_valido: true,
          estado_revocacion_ocsp: "GOOD (No Revocado)"
        },
        boveda_inmutable: {
          estado_worm: "LOCKED",
          sha256_verificado: true
        },
        aviso_legal: "Documento oficial con plena validez jurídica conforme al Art. 4 LMDyFE y Art. 27 Ley de Infogobierno."
      };
      resultEl.innerHTML = `<pre class="mb-0 text-success font-monospace">${escapeHtml(JSON.stringify(payload, null, 2))}</pre>`;
    } else {
      const payload = {
        status: "INTEGRITY_VIOLATION_OR_NOT_FOUND",
        codigo_csv: csv,
        alerta: "El código CSV no corresponde a ningún documento inmutable registrado en la Bóveda WORM del TSJ.",
        riesgo: "Posible documento apócrifo o falsificado (Alerta LPCDI Art. 12 enviada al CSIRT-Ulpiano)",
        verificacion: "FALLIDA"
      };
      resultEl.innerHTML = `<pre class="mb-0 text-danger font-monospace">${escapeHtml(JSON.stringify(payload, null, 2))}</pre>`;
    }
  }, 500);
}

export function simulateSorteo() {
  const causa = (document.getElementById('sim-sorteo-causa') || {}).value || 'CAUSA-ADM-2026-8841';
  const materia = (document.getElementById('sim-sorteo-materia') || {}).value || 'Amparo Constitucional';
  const resultEl = document.getElementById('sim-sorteo-result');
  if (!resultEl) return;

  resultEl.style.display = 'block';
  resultEl.innerHTML = '<span class="text-white-50"><span class="spinner-border spinner-border-sm text-warning me-2"></span>Ejecutando algoritmo CSPRNG criptoseguro (Web Crypto CSPRNG / secrets.SystemRandom)...</span>';

  setTimeout(() => {
    const judges = [
      "Dr. Jull Ortiz — Ponente Titular",
      "Dra. Gladys Gutiérrez — Magistrada",
      "Dr. Maikel Moreno — Magistrado",
      "Dra. Caryslia Rodríguez — Magistrada",
      "Dr. Inocencio Figueroa — Magistrado"
    ];

    // Criptoseguro: Web Crypto CSPRNG
    const rndBuf = new Uint8Array(17);
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(rndBuf);
    } else {
      for (let i = 0; i < 17; i++) rndBuf[i] = Math.floor(Math.random() * 256);
    }
    const seedHex = Array.from(rndBuf.slice(0, 16), b => b.toString(16).padStart(2, '0')).join('');
    const selected = judges[rndBuf[16] % judges.length];

    const payload = {
      status: "SORTEO_COMPLETADO_EXITOSO",
      causa_distribuida: causa,
      materia: materia,
      resultado_sorteo: {
        magistrado_ponente_asignado: selected,
        metodo_sorteo: "CSPRNG Criptoseguro (secrets.SystemRandom / WebCrypto)",
        semilla_entropia_auditada: `0x${seedHex}`,
        timestamp_utc: new Date().toISOString()
      },
      segregacion_funciones: {
        doble_aprobacion_requerida: "Art. 27 Título VII",
        auditor_sistema: "CCO-ROBOT-01 (ISO 42001)",
        merkle_tree_index: 41892
      },
      garantia_constitucional: "CRBV Art. 49 (Juez Natural e Imparcial) • Sentencia TSJ 0406/2026"
    };

    resultEl.innerHTML = `<pre class="mb-0 text-warning font-monospace">${escapeHtml(JSON.stringify(payload, null, 2))}</pre>`;
  }, 600);
}

export function simulateTriggerAnomaly() {
  const feed = document.getElementById('sim-ws-feed');
  if (!feed) return;

  const time = new Date().toLocaleTimeString();
  const anomalies = [
    `[ANOMALÍA ${time}] Intento de modificación no autorizada en expediente EXP-2026-9901 bloqueado por Bóveda WORM.`,
    `[ALERTA CCO ${time}] Retardo procesal detectado en Tribunal 4to Mercantil (+15 días de vencimiento legal Art. 257 CRBV).`,
    `[SEGURIDAD ${time}] Sesión concurrente anómala abortada en Módulo de Jueces. Token JWT revocado.`
  ];
  const picked = anomalies[Math.floor(Math.random() * anomalies.length)];

  const div = document.createElement('div');
  div.className = 'text-danger small font-monospace';
  div.textContent = `🚨 ${picked}`;
  feed.appendChild(div);
  feed.scrollTop = feed.scrollHeight;
}
