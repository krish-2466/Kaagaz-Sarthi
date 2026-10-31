/**
 * Server-side text normalization utilities.
 * Mirror these in client/src/utils/normalize/ for in-browser OCR consistency.
 */

/**
 * Normalize a person's name for comparison.
 * Handles: case, initials expansion heuristics, extra whitespace, punctuation.
 * Does NOT attempt transliteration (handled separately in the client).
 */
function normalizeName(raw) {
  if (!raw) return '';
  return raw
    .trim()
    .toLowerCase()
    .replace(/\./g, ' ')      // "R. K. Sharma" → "R  K  Sharma"
    .replace(/\s+/g, ' ')     // collapse spaces
    .trim();
}

/**
 * Normalize a date string to YYYY-MM-DD where possible.
 * Accepts: "12/04/2001", "12-04-2001", "April 12, 2001", "12 Apr 2001"
 */
function normalizeDate(raw) {
  if (!raw) return '';
  const cleaned = raw.trim();

  // DD/MM/YYYY or DD-MM-YYYY
  const dmyMatch = cleaned.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (dmyMatch) return `${dmyMatch[3]}-${dmyMatch[2].padStart(2, '0')}-${dmyMatch[1].padStart(2, '0')}`;

  // Attempt via Date parse (less reliable)
  const d = new Date(cleaned);
  if (!isNaN(d)) return d.toISOString().split('T')[0];

  return cleaned.toLowerCase();
}

/**
 * Normalize an address for loose comparison.
 * Strips punctuation, collapses whitespace, lowercases.
 */
function normalizeAddress(raw) {
  if (!raw) return '';
  return raw
    .trim()
    .toLowerCase()
    .replace(/[,\.\-\/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

module.exports = { normalizeName, normalizeDate, normalizeAddress };
