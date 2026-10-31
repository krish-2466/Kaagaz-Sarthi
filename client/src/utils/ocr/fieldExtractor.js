/**
 * fieldExtractor.js
 *
 * Heuristic field extraction from raw OCR text for common Indian government documents.
 * Returns extracted fields with confidence scores (0–1).
 *
 * NOTE: Aadhaar numbers are masked before being included in any output that
 * leaves the device.
 */

import { normalizeName } from '../normalize/normalizer';

const MASK = '****';

// ── Name ────────────────────────────────────────────────────
function extractName(text) {
  // Patterns: "Name: Asha Kumar", "ASHA KUMAR", line after "Name"
  const patterns = [
    /(?:name|नाम)[:\s]+([A-Za-z\s]{3,50})/i,
    /^([A-Z][a-z]+(?:\s[A-Z][a-z]+){1,3})\s*$/m,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) return { value: normalizeName(m[1].trim()), confidence: 0.85 };
  }
  return { value: '', confidence: 0 };
}

// ── Date of Birth ────────────────────────────────────────────
function extractDOB(text) {
  const p = /(?:d(?:ate)?\s*(?:of)?\s*b(?:irth)?|DOB|जन्म\s*तिथि)[:\s]*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i;
  const m = text.match(p) || text.match(/\b(\d{2}[\/\-]\d{2}[\/\-]\d{4})\b/);
  if (m) return { value: m[1], confidence: 0.9 };
  return { value: '', confidence: 0 };
}

// ── Address ──────────────────────────────────────────────────
function extractAddress(text) {
  const p = /(?:address|पता)[:\s]+([^\n]{10,120})/i;
  const m = text.match(p);
  if (m) return { value: m[1].trim(), confidence: 0.75 };
  return { value: '', confidence: 0 };
}

// ── Aadhaar number — extracted but MASKED immediately ────────
function extractAadhaar(text) {
  const p = /\b(\d{4})\s*(\d{4})\s*(\d{4})\b/;
  const m = text.match(p);
  if (m) return { value: `${MASK} ${MASK} ${m[3]}`, confidence: 0.95 }; // last 4 digits only
  return { value: '', confidence: 0 };
}

/**
 * Extract fields from OCR text based on document type.
 * @param {string} rawText  - Full OCR output
 * @param {string} docType  - e.g. "aadhaar", "marksheet", "caste_certificate"
 * @returns {{ fields: Object, confidence: Object }}
 */
export function extractFields(rawText, docType) {
  const fields = {};
  const confidence = {};

  const addField = (key, result) => {
    if (result.value) {
      fields[key] = result.value;
      confidence[key] = result.confidence;
    }
  };

  addField('name', extractName(rawText));
  addField('date_of_birth', extractDOB(rawText));
  addField('address', extractAddress(rawText));

  if (docType === 'aadhaar') {
    addField('aadhaar_number', extractAadhaar(rawText));
  }

  return { fields, _confidence: confidence };
}
