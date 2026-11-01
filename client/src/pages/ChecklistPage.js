import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheck } from '../context/CheckContext';
import Icon from '../components/ui/Icon';
import { STATUS_META, STATUS_ORDER, prettyField, hostOf, fixHint } from '../utils/status';
import './ChecklistPage.css';

export default function ChecklistPage() {
  const { checkResult, selectedService, resetSession } = useCheck();
  const navigate = useNavigate();
  const [done, setDone] = useState({});

  // "What to fix, in order": most urgent first.
  const items = useMemo(
    () => (checkResult?.flags || [])
      .filter((f) => f.status !== 'matched')
      .sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]),
    [checkResult]
  );

  if (!checkResult) {
    return (
      <div className="container page page-narrow">
        <div className="alert alert-info"><Icon name="info" size={20} /><div><strong>No check results yet</strong>Run a check to get a personalised checklist.</div></div>
        <p style={{ marginTop: 20 }}><button className="btn btn-primary" onClick={() => navigate('/services')}>Start a check <Icon name="arrowRight" size={18} /></button></p>
      </div>
    );
  }

  const doneCount = items.filter((_, i) => done[i]).length;
  const pct = items.length ? Math.round((doneCount / items.length) * 100) : 100;
  const toggle = (i) => setDone((p) => ({ ...p, [i]: !p[i] }));

  return (
    <div className="container page page-narrow checklist">
      <span className="eyebrow">Step 4 of 4</span>
      <h1 className="page-title">Your correction checklist</h1>
      <p className="page-subtitle">
        {items.length === 0
          ? <>Nothing to fix for <strong>{selectedService?.name}</strong>.</>
          : <>Fix these in order for <strong>{selectedService?.name}</strong>, then re-upload and check again.</>}
      </p>

      {items.length === 0 ? (
        <div className="card cl-allgood">
          <span><Icon name="checkCircle" size={34} /></span>
          <div><h2>All documents look consistent</h2><p>No corrections needed. Please still verify the details yourself before applying.</p></div>
        </div>
      ) : (
        <>
          <div className="card cl-progress">
            <div className="cl-prog-text"><p><b>{doneCount}</b> of {items.length} fixed</p><span>{pct}%</span></div>
            <div className="cl-bar"><div style={{ width: `${pct}%` }} /></div>
          </div>

          <ol className="cl-list">
            {items.map((flag, i) => {
              const meta = STATUS_META[flag.status];
              return (
                <li key={`${flag.ruleId}-${i}`} className={`cl-item card tone-${meta.tone} ${done[i] ? 'is-done' : ''}`}>
                  <button className="cl-check" onClick={() => toggle(i)} aria-pressed={!!done[i]} aria-label={`Mark "${prettyField(flag.field)}" as fixed`}>
                    {done[i] ? <Icon name="check" size={18} strokeWidth={3} /> : <span>{i + 1}</span>}
                  </button>
                  <div className="cl-content">
                    <div className="cl-top">
                      <b>{prettyField(flag.field)}</b>
                      <span className={`badge badge-${flag.status}`}><Icon name={meta.icon} size={13} strokeWidth={2.2} />{meta.label}</span>
                    </div>
                    <p className="cl-why">{flag.description}</p>
                    <p className="cl-fix"><Icon name="arrowRight" size={15} /> {fixHint(flag)}</p>
                    {flag.sourceReference && (
                      <a className="cl-source" href={flag.sourceReference} target="_blank" rel="noopener noreferrer">
                        <Icon name="link" size={14} /> Official requirement · {hostOf(flag.sourceReference)}
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
          {doneCount === items.length && (
            <div className="alert alert-info cl-reminder"><Icon name="checkCircle" size={20} /><div><strong>All reviewed</strong>Once your documents are corrected, re-upload them and run the check again.</div></div>
          )}
        </>
      )}

      <div className="cl-actions no-print">
        <button className="btn btn-outline" onClick={() => navigate('/results')}><Icon name="arrowLeft" size={18} /> Back to report</button>
        <button className="btn btn-outline" onClick={() => window.print()}><Icon name="printer" size={18} /> Print checklist</button>
        {items.length > 0 && <button className="btn btn-primary" onClick={() => navigate('/upload')}><Icon name="refresh" size={18} /> Re-upload &amp; re-check</button>}
        <button className="btn btn-ghost" onClick={() => { resetSession(); navigate('/services'); }}>Start a new check</button>
      </div>
    </div>
  );
}
