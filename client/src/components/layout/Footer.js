import React from 'react';
import Icon from '../ui/Icon';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer no-print">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo"><Icon name="logo" size={16} strokeWidth={2} /></span>
          <strong>KaagazSaathi</strong>
          <span className="footer-sep">·</span>
          <span>Know your paperwork is ready, before you stand in the queue.</span>
        </div>
        <p className="footer-disclaimer">
          Checks consistency and completeness only. It does not decide eligibility or guarantee approval.
        </p>
        <p className="footer-team">Build for Bharat 2026 · Software Track · KIET Deemed to be University</p>
      </div>
    </footer>
  );
}
