import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheck } from '../context/CheckContext';
import FlagCard from '../components/results/FlagCard';
import SummaryBanner from '../components/results/SummaryBanner';
import './ResultsPage.css';

export default function ResultsPage() {
  const { checkResult, selectedService } = useCheck();
  const navigate = useNavigate();

  if (!checkResult) {
    return (
      <div className="container">
        <p className="page-subtitle">⚠️ No results yet. Please complete the upload step first.</p>
        <button className="btn btn-primary" onClick={() => navigate('/upload')}>← Upload Documents</button>
      </div>
    );
  }

  const { flags, summary, readinessStatus } = checkResult;

  return (
    <div className="container results-page">
      <h1 className="page-title">Readiness Check Results</h1>
      <p className="page-subtitle">Service: <strong>{selectedService?.name}</strong></p>

      <SummaryBanner status={readinessStatus} summary={summary} />

      <h2 className="results-section-title">Flags &amp; Evidence</h2>
      <div className="flags-list">
        {flags.length === 0 && <p className="no-flags">No issues found. Your documents look consistent!</p>}
        {flags.map((flag, i) => (
          <FlagCard key={i} flag={flag} />
        ))}
      </div>

      <div className="results-actions">
        <button className="btn btn-outline" onClick={() => navigate('/upload')}>← Re-upload</button>
        <button className="btn btn-primary" onClick={() => navigate('/checklist')}>View Checklist →</button>
      </div>

      <p className="results-disclaimer">
        ⚠️ This tool checks consistency and completeness only. It does not determine
        eligibility or guarantee approval. You are responsible for verifying each flag.
      </p>
    </div>
  );
}
