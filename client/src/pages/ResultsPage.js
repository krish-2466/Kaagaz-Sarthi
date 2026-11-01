import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheck } from '../context/CheckContext';
import FlagCard from '../components/results/FlagCard';
import SummaryBanner from '../components/results/SummaryBanner';
import Icon from '../components/ui/Icon';
import { STATUS_ORDER } from '../utils/status';
import './ResultsPage.css';

export default function ResultsPage() {
  const { checkResult, selectedService } = useCheck();
  const navigate = useNavigate();
  const [tab, setTab] = useState('all');

  const flags = checkResult?.flags;
  const sorted = useMemo(
    () => [...(flags || [])].sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]),
    [flags]
  );

  if (!checkResult) {
    return (
      <div className="container page page-narrow">
        <div className="alert alert-info"><Icon name="info" size={20} /><div><strong>No results yet</strong>Add your documents first to see a readiness report.</div></div>
        <p style={{ marginTop: 20 }}><button className="btn btn-primary" onClick={() => navigate(selectedService ? '/upload' : '/services')}><Icon name="arrowLeft" size={18} /> Go back</button></p>
      </div>
    );
  }

  const { summary, readinessStatus } = checkResult;
  const issues = sorted.filter((f) => f.status !== 'matched');
  const shown = tab === 'issues' ? issues : tab === 'matched' ? sorted.filter((f) => f.status === 'matched') : sorted;
  const tabs = [
    { id: 'all', label: 'All checks', n: sorted.length },
    { id: 'issues', label: 'Needs attention', n: issues.length },
    { id: 'matched', label: 'Matched', n: sorted.length - issues.length },
  ];

  return (
    <div className="container page page-narrow results">
      <span className="eyebrow">Step 3 of 4</span>
      <h1 className="page-title">Readiness report</h1>
      <p className="page-subtitle">Service: <strong>{selectedService?.name}</strong></p>

      <SummaryBanner status={readinessStatus} summary={summary} />

      <div className="res-bar">
        <h2>Checks &amp; evidence</h2>
        <div className="res-tabs" role="tablist">
          {tabs.map((t) => (
            <button key={t.id} role="tab" aria-selected={tab === t.id} className={`res-tab ${tab === t.id ? 'on' : ''}`} onClick={() => setTab(t.id)}>
              {t.label} <span>{t.n}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="res-list">
        {shown.length === 0 && (
          <div className="card res-empty"><Icon name="checkCircle" size={28} /><p>{tab === 'issues' ? 'No issues found. Your documents look consistent.' : 'Nothing to show here.'}</p></div>
        )}
        {shown.map((flag) => <FlagCard key={`${flag.ruleId}-${flag.field}-${flag.status}`} flag={flag} />)}
      </div>

      <div className="alert alert-warn res-disclaimer">
        <Icon name="info" size={20} />
        <div><strong>Please verify</strong>This tool checks consistency and completeness only. It does not determine eligibility or guarantee approval. You confirm every flag.</div>
      </div>

      <div className="res-actions">
        <button className="btn btn-outline" onClick={() => navigate('/upload')}><Icon name="arrowLeft" size={18} /> Re-upload</button>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/checklist')}>View fix checklist <Icon name="arrowRight" size={18} /></button>
      </div>
    </div>
  );
}
