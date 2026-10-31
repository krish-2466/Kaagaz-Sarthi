import React from 'react';
import './SummaryBanner.css';

const STATUS_META = {
  ready:           { icon: '✅', label: 'Ready to Apply',   cls: 'banner-success' },
  needs_attention: { icon: '⚠️', label: 'Needs Attention',  cls: 'banner-warning' },
  incomplete:      { icon: '❌', label: 'Incomplete',        cls: 'banner-error' },
};

export default function SummaryBanner({ status, summary }) {
  const meta = STATUS_META[status] || STATUS_META.incomplete;
  return (
    <div className={`summary-banner ${meta.cls}`}>
      <div className="summary-status">
        <span className="summary-icon">{meta.icon}</span>
        <span className="summary-label">{meta.label}</span>
      </div>
      <div className="summary-counts">
        <div className="summary-count matched">
          <span className="count-num">{summary.matched}</span>
          <span className="count-label">Matched</span>
        </div>
        <div className="summary-count mismatch">
          <span className="count-num">{summary.mismatches}</span>
          <span className="count-label">Mismatches</span>
        </div>
        <div className="summary-count missing">
          <span className="count-num">{summary.missing}</span>
          <span className="count-label">Missing</span>
        </div>
        <div className="summary-count review">
          <span className="count-num">{summary.review}</span>
          <span className="count-label">Review</span>
        </div>
      </div>
    </div>
  );
}
