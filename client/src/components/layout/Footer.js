import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>
          <strong>KaagazSaathi</strong> — Know your paperwork is ready, before you stand in the queue.
        </p>
        <p className="footer-disclaimer">
          This tool checks consistency and completeness only. It does not determine eligibility or guarantee approval.
          All checks are backed by official sources.
        </p>
        <p className="footer-team">
          Built for Bharat 2026 · KIET Deemed to be University
        </p>
      </div>
    </footer>
  );
}
