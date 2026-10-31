import React, { useState } from 'react';
import './FlagCard.css';

const STATUS_ICONS = { matched: '✅', mismatch: '❌', missing: '⚠️', review: '🔍' };

export default function FlagCard({ flag }) {
  const [expanded, setExpanded] = useState(flag.status !== 'matched');

  return (
    <div className={`flag-card card flag-${flag.status}`}>
      <button className="flag-header" onClick={() => setExpanded((e) => !e)}>
        <div className="flag-header-left">
          <span className="flag-icon">{STATUS_ICONS[flag.status]}</span>
          <div>
            <div className="flag-field">{flag.field?.replace(/_/g, ' ')}</div>
            <div className="flag-desc">{flag.description}</div>
          </div>
        </div>
        <div className="flag-header-right">
          <span className={`badge badge-${flag.status}`}>{flag.status}</span>
          <span className="flag-toggle">{expanded ? '▲' : '▼'}</span>
        </div>
      </button>

      {expanded && (
        <div className="flag-body">
          {/* Evidence */}
          {flag.evidence && flag.evidence.length > 0 && (
            <table className="evidence-table">
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Extracted Value</th>
                  <th>Confidence</th>
                </tr>
              </thead>
              <tbody>
                {flag.evidence.map((ev, i) => (
                  <tr key={i}>
                    <td className="ev-doc">{ev.documentType?.replace(/_/g, ' ')}</td>
                    <td className="ev-val">{ev.extractedValue || '—'}</td>
                    <td className="ev-conf">
                      {ev.confidence != null ? `${Math.round(ev.confidence * 100)}%` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Source */}
          {flag.sourceReference && (
            <p className="flag-source">
              📎 Official source:{' '}
              <a href={flag.sourceReference} target="_blank" rel="noopener noreferrer">
                {flag.sourceReference}
              </a>
            </p>
          )}

          {/* Severity */}
          <p className="flag-severity">Severity: <strong>{flag.severity}</strong></p>
        </div>
      )}
    </div>
  );
}
