/**
 * Single source of truth for how a flag status looks and reads.
 * (API statuses: matched | mismatch | missing | review)
 */
export const STATUS_META = {
  matched:  { label: 'Matched',  icon: 'checkCircle', tone: 'ok'   },
  mismatch: { label: 'Mismatch', icon: 'xCircle',     tone: 'bad'  },
  missing:  { label: 'Missing',  icon: 'alert',       tone: 'warn' },
  review:   { label: 'Verify',   icon: 'eye',         tone: 'info' },
};

// Most urgent first — used to sort flags and to order the correction checklist.
export const STATUS_ORDER = { mismatch: 0, missing: 1, review: 2, matched: 3 };

export const prettyField = (s = '') =>
  s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export const hostOf = (url = '') => {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return url; }
};

/** Plain-language "what to do" shown on the checklist, per status. */
export function fixHint(flag) {
  switch (flag.status) {
    case 'missing':
      return flag.type === 'presence'
        ? `Collect a clear copy of the ${prettyField(flag.field).toLowerCase()} and upload it.`
        : 'Not enough documents were readable to compare this. Upload the missing document.';
    case 'mismatch':
      return 'Check which document has the correct value and ask the issuing office to correct the other one.';
    case 'review':
      return 'The reading was not certain. Compare the original documents yourself and confirm they agree.';
    default:
      return '';
  }
}
