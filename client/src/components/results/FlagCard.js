import React, { useState } from 'react';
import Icon from '../ui/Icon';
import { STATUS_META, prettyField, hostOf } from '../../utils/status';
import './FlagCard.css';

const confLevel = (c) => (c >= 0.85 ? 'High' : c >= 0.7 ? 'Medium' : 'Low');

export default function FlagCard({ flag }) {
  const meta = STATUS_META[flag.status] || STATUS_META.review;
  const [open, setOpen] = useState(flag.status !== 'matched');
  // The API returns evidence in two shapes (review flags use docType/raw). Accept both.
  const evidence = (flag.evidence || []).map((ev) => ({
    documentType: ev.documentType ?? ev.docType,
    extractedValue: ev.extractedValue ?? ev.raw,
    confidence: ev.confidence,
  }));
  const showConf = flag.type !== 'presence';

  return (
    <article className={`fc card fc-${meta.tone}`}>
      <button className="fc-head" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="fc-icon"><Icon name={meta.icon} size={20} /></span>
        <span className="fc-title">
          <b>{prettyField(flag.field)}</b>
          <small>{flag.description}</small>
        </span>
        <span className={`badge badge-${flag.status}`}>{meta.label}</span>
        <Icon name="chevronDown" size={18} className={`fc-chev ${open ? 'open' : ''}`} />
      </button>

      {open && (
        <div className="fc-body">
          {flag.status === 'review' && (
            <div className="fc-note"><Icon name="eye" size={16} /><span>Reading confidence is low. <b>Human review recommended</b>: please compare the original documents.</span></div>
          )}

          {evidence.length > 0 && (
            <div className="fc-evidence">
              <div className={`fc-ev-head ${showConf ? '' : 'no-conf'}`}><span>Document</span><span>{showConf ? 'Value found' : 'Status'}</span>{showConf && <span>Confidence</span>}</div>
              {evidence.map((ev, i) => (
                <div key={i} className={`fc-ev-row ${showConf ? '' : 'no-conf'}`}>
                  <span className="ev-doc">{prettyField(ev.documentType)}</span>
                  <span className={`ev-val ${!ev.extractedValue || ev.extractedValue === 'not found' ? 'ev-none' : ''} ${ev.extractedValue === 'present' ? 'ev-ok' : ''}`}>{ev.extractedValue === 'present' ? 'Provided' : (ev.extractedValue || 'not found')}</span>
                  {showConf && <span className="ev-conf">
                    {ev.confidence != null ? (
                      <>
                        <span className="ev-bar"><i style={{ width: `${Math.round(ev.confidence * 100)}%` }} className={`lv-${confLevel(ev.confidence).toLowerCase()}`} /></span>
                        <em>{confLevel(ev.confidence)} · {Math.round(ev.confidence * 100)}%</em>
                      </>
                    ) : '—'}
                  </span>}
                </div>
              ))}
            </div>
          )}

          <div className="fc-foot">
            {flag.sourceReference && (
              <a href={flag.sourceReference} target="_blank" rel="noopener noreferrer" className="fc-source">
                <Icon name="link" size={14} /> Official source · {hostOf(flag.sourceReference)}
              </a>
            )}
            <span className="fc-sev">Severity: <b>{flag.severity}</b></span>
          </div>
        </div>
      )}
    </article>
  );
}
