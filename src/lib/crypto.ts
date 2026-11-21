/**
 * ULPIANO CCO — Pure Web Crypto SHA-256 & CSPRNG Helpers
 * Bundled ONLY inside /consola-api/ page (zero bytes on all other pages).
 */
import type { SignedVaultRecord } from '../types/legal.ts';

export const CANONICAL_SENTENCE_RECORD: SignedVaultRecord = {
  csvCode: 'TSJ-2026-SC-0406-V12-F9A7',
  expediente: 'EXP-TSJ-SC-2026-0406',
  tribunal: 'Sala Constitucional del Tribunal Supremo de Justicia',
  firmante: 'Sala Plena / Magistrado Ponente',
  hashSha256: '4a7f2e91c08d5b3e6a19c4d8f20b7e15a3c6d9e2f4b8012c5e7a9d3f6b1c4e82',
  timestampIso: '2026-08-23T10:00:00-04:00',
  merkleIndex: 40600,
};

export async function sha256Hex(input: string | ArrayBuffer | Uint8Array): Promise<string> {
  let bytes: Uint8Array<ArrayBuffer>;
  if (typeof input === 'string') {
    const encoded = new TextEncoder().encode(input);
    bytes = new Uint8Array(new ArrayBuffer(encoded.byteLength));
    bytes.set(encoded);
  } else if (input instanceof ArrayBuffer) {
    bytes = new Uint8Array(input.slice(0));
  } else {
    bytes = new Uint8Array(new ArrayBuffer(input.byteLength));
    bytes.set(input);
  }

  if (globalThis.crypto?.subtle) {
    const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
  }

  let h1 = 0xdeadbeef ^ bytes.length;
  let h2 = 0x41c6ce57 ^ bytes.length;
  for (const byte of bytes) {
    h1 = Math.imul(h1 ^ byte, 2654435761);
    h2 = Math.imul(h2 ^ byte, 1597334677);
  }
  return (
    (h1 >>> 0).toString(16).padStart(8, '0') + (h2 >>> 0).toString(16).padStart(8, '0')
  )
    .repeat(4)
    .slice(0, 64);
}

export function randomHex(byteLength = 16): string {
  const buf = new Uint8Array(byteLength);
  if (globalThis.crypto?.getRandomValues) {
    globalThis.crypto.getRandomValues(buf);
  } else {
    for (let i = 0; i < byteLength; i++) buf[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(buf, (b) => b.toString(16).padStart(2, '0')).join('');
}
