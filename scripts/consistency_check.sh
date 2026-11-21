#!/usr/bin/env bash
# ==============================================================================
# ULPIANO CCO — Unified Consistency & Compliance Check
# Executes TypeScript/Astro checks, ESLint, Design System/CSP Audit, Build & Tests.
# ==============================================================================
set -euo pipefail

echo "=== 1. Astro & TypeScript Check ==="
npm run check

echo "=== 2. ESLint (TS, JS, Astro) ==="
npm run lint

echo "=== 3. Design System Light-Only, CSP & DOM Contract Audit ==="
npm run audit

echo "=== 4. Static Production Build ==="
npm run build

echo "=== 5. Automated Test Suite ==="
npm run test:all

echo "=== Consistency check passed ==="
