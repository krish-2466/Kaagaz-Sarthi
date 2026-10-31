import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheck } from '../context/CheckContext';
import './ChecklistPage.css';

export default function ChecklistPage() {
  const { checkResult, selectedService, resetSession } = useCheck();
  const navigate = useNavigate();

  // Track which items the user has confirmed
  const [confirmed, setConfirmed] = useState({});

  if (!checkResult) {
    return (
      <div className="container">
        <p className="page-subtitle">⚠️ No check results available.</p>
        <button className="btn btn-primary" onClick={() => navigate('/services')}>Start over</button>
      </div>
    );
  }

  const issueFlags = checkResult.flags.filter((f) => f.status !== 'matched');
  const allConfirmed = issueFlags.length > 0 && issueFlags.every((_, i) => confirmed[i]);

  const toggleConfirm = (i) =>
    setConfirmed((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="container checklist-page">
      <h1 className="page-title">Correction Checklist</h1>
      <p className="page-subtitle">
        Review each issue below, correct your documents, then re-upload and re-check.
      </p>

      {issueFlags.length === 0 ? (
        <div className="checklist-all-good card">
          <span className="checklist-ok-icon">🎉</span>
          <div>
            <div className="checklist-ok-title">All documents look consistent!</div>
            <p>No corrections needed for <strong>{selectedService?.name}</strong>.</p>
          </div>
        </div>
      ) : (
        <div className="checklist-items">
          {issueFlags.map((flag, i) => (
            <div key={i} className={`checklist-item card ${confirmed[i] ? 'item-done' : ''}`}>
              <label className="checklist-label">
                <input
                  type="checkbox"
                  checked={!!confirmed[i]}
                  onChange={() => toggleConfirm(i)}
                />
                <div className="checklist-content">
                  <div className="checklist-field">
                    {flag.status === 'missing' ? '⚠️' : '❌'}{' '}
                    {flag.field?.replace(/_/g, ' ')}
                    <span className={`badge badge-${flag.status} checklist-badge`}>{flag.status}</span>
                  </div>
                  <p className="checklist-desc">{flag.description}</p>
                  {flag.sourceReference && (
                    <a
                      href={flag.sourceReference}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="checklist-source"
                    >
                      📎 View official requirement
                    </a>
                  )}
                </div>
              </label>
            </div>
          ))}
        </div>
      )}

      <div className="checklist-actions">
        <button className="btn btn-outline" onClick={() => navigate('/results')}>← Back to Results</button>
        <button
          className="btn btn-primary"
          onClick={() => { resetSession(); navigate('/services'); }}
        >
          Start a new check
        </button>
        {issueFlags.length > 0 && (
          <button
            className="btn btn-outline"
            onClick={() => navigate('/upload')}
          >
            Re-upload & re-check
          </button>
        )}
      </div>

      {issueFlags.length > 0 && allConfirmed && (
        <p className="checklist-reminder">
          ✅ You have reviewed all issues. After correcting your documents, re-upload and re-check.
        </p>
      )}
    </div>
  );
}
