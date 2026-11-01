import React from 'react';
import Icon from '../ui/Icon';
import './SummaryBanner.css';

const STATUS_META = {
  ready:           { icon: 'checkCircle', label: 'Looks ready',     blurb: 'Your documents agree with each other and with the requirements.', cls: 'banner-ok' },
  needs_attention: { icon: 'alert',       label: 'Needs attention', blurb: 'A few things should be fixed or confirmed before you apply.',       cls: 'banner-warn' },
  incomplete:      { icon: 'xCircle',     label: 'Incomplete',      blurb: 'Most required documents are missing or could not be read.',          cls: 'banner-bad' },
};

const TILES = [
  { key: 'matched',    label: 'Matched',    tone: 'ok' },
  { key: 'mismatches', label: 'Mismatches', tone: 'bad' },
  { key: 'missing',    label: 'Missing',    tone: 'warn' },
  { key: 'review',     label: 'To verify',  tone: 'info' },
];

export default function SummaryBanner({ status, summary }) {
  const meta = STATUS_META[status] || STATUS_META.incomplete;
  const total = summary.matched + summary.mismatches + summary.missing + summary.review;
  const pct = total ? Math.round((summary.matched / total) * 100) : 0;
  const R = 44, C = 2 * Math.PI * R;

  return (
    <section className={`sb card ${meta.cls}`} aria-label="Readiness summary">
      <div className="sb-ring" role="img" aria-label={`${pct}% of checks passed`}>
        <svg viewBox="0 0 100 100" width="112" height="112">
          <circle cx="50" cy="50" r={R} className="ring-bg" />
          <circle cx="50" cy="50" r={R} className="ring-fg" strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)} />
        </svg>
        <div className="ring-text"><b>{pct}%</b><span>passed</span></div>
      </div>

      <div className="sb-body">
        <div className="sb-status"><Icon name={meta.icon} size={22} /> {meta.label}</div>
        <p>{meta.blurb}</p>
        <div className="sb-tiles">
          {TILES.map((t) => (
            <div key={t.key} className={`sb-tile tone-${t.tone}`}>
              <b>{summary[t.key]}</b><span>{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
