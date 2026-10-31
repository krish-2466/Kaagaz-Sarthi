/**
 * Client-side text normalization — mirrors server/src/utils/normalizer.js
 */

export function normalizeName(raw = '') {
  return raw.trim().toLowerCase().replace(/\./g, ' ').replace(/\s+/g, ' ').trim();
}

export function normalizeDate(raw = '') {
  const cleaned = raw.trim();
  const dmyMatch = cleaned.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (dmyMatch) return `${dmyMatch[3]}-${dmyMatch[2].padStart(2, '0')}-${dmyMatch[1].padStart(2, '0')}`;
  const d = new Date(cleaned);
  if (!isNaN(d)) return d.toISOString().split('T')[0];
  return cleaned.toLowerCase();
}

export function normalizeAddress(raw = '') {
  return raw.trim().toLowerCase().replace(/[,.\-/]/g, ' ').replace(/\s+/g, ' ').trim();
}
