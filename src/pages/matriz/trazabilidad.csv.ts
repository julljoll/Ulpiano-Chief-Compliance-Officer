/**
 * ULPIANO CCO — Astro Static Build-Time Endpoint (/matriz/trazabilidad.csv)
 * Allows zero-JS direct Excel-compatible UTF-8 BOM CSV download.
 */
import type { APIRoute } from 'astro';
import { MATRIX_ROWS } from '../../lib/legal.ts';
import { serializeMatrixRowsToCsv } from '../../lib/format.ts';

export const GET: APIRoute = () => {
  const csv = serializeMatrixRowsToCsv(MATRIX_ROWS);
  return new Response(csv, {
    headers: { 'Content-Type': 'text/csv; charset=utf-8' },
  });
};
