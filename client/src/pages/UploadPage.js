import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheck } from '../context/CheckContext';
import { useOCR } from '../hooks/useOCR';
import { extractFields } from '../utils/ocr/fieldExtractor';
import { buildDemoFields } from '../utils/demoData';
import { prettyField } from '../utils/status';
import { runCheck } from '../services/api';
import DocDropzone from '../components/upload/DocDropzone';
import Icon from '../components/ui/Icon';
import './UploadPage.css';

const initEntries = (service) =>
  (service?.requiredDocumentTypes || []).map((dt) => ({ docType: dt, file: null, preview: null, status: 'empty' }));

export default function UploadPage() {
  const { selectedService, setUploadedDocs, consentGiven, setConsentGiven, setCheckResult } = useCheck();
  const navigate = useNavigate();
  const { runOCR, progress } = useOCR();

  const [entries, setEntries] = useState(() => initEntries(selectedService));
  const [processing, setProcessing] = useState(false);
  const [stage, setStage] = useState('');
  const [error, setError] = useState('');
  const previews = useRef([]);

  // Free object URLs when leaving the page.
  useEffect(() => () => previews.current.forEach((u) => URL.revokeObjectURL(u)), []);

  if (!selectedService) {
    return (
      <div className="container page page-narrow">
        <div className="alert alert-info"><Icon name="info" size={20} /><div><strong>Choose a service first</strong>We need to know which requirements to check against.</div></div>
        <p style={{ marginTop: 20 }}><button className="btn btn-primary" onClick={() => navigate('/services')}><Icon name="arrowLeft" size={18} /> Pick a service</button></p>
      </div>
    );
  }

  const patch = (docType, changes) =>
    setEntries((prev) => prev.map((e) => (e.docType === docType ? { ...e, ...changes } : e)));

  const handleFile = (docType, file) => {
    const url = URL.createObjectURL(file);
    previews.current.push(url);
    setError('');
    patch(docType, { file, preview: url, status: 'ready', extracted: null });
  };
  const handleRemove = (docType) => patch(docType, { file: null, preview: null, status: 'empty', extracted: null });

  const total = entries.length;
  const ready = entries.filter((e) => e.file).length;
  const allReady = ready === total;

  const submit = async (extractedFields) => {
    setStage('Running the rules engine…');
    const result = await runCheck({ serviceId: selectedService._id, consentGiven: true, extractedFields });
    setCheckResult(result);
    navigate('/results');
  };

  const handleCheck = async () => {
    if (!consentGiven) { setError('Please give consent before processing.'); return; }
    setProcessing(true); setError('');
    try {
      const updated = [];
      for (const entry of entries) {
        if (!entry.file) { updated.push(entry); continue; }
        setStage(`Reading ${prettyField(entry.docType)}…`);
        patch(entry.docType, { status: 'reading' });
        const rawText = await runOCR(entry.file);
        const { fields, _confidence } = extractFields(rawText, entry.docType);
        const ok = rawText && Object.keys(fields).length > 0;
        patch(entry.docType, { status: ok ? 'done' : 'failed' });
        updated.push({ ...entry, extracted: { ...fields, _confidence } });
      }
      setUploadedDocs(updated);
      const extractedFields = {};
      updated.forEach((e) => { if (e.extracted) extractedFields[e.docType] = e.extracted; });
      await submit(extractedFields);
    } catch (err) {
      setError(`The check could not be completed. ${err.response?.data?.error || err.message}`);
    } finally {
      setProcessing(false); setStage('');
    }
  };

  const handleDemo = async () => {
    if (!consentGiven) { setError('Please give consent before processing.'); return; }
    setProcessing(true); setError('');
    try {
      setStage('Loading fictional sample documents…');
      await new Promise((r) => setTimeout(r, 700));
      await submit(buildDemoFields(selectedService.requiredDocumentTypes));
    } catch (err) {
      setError(`The check could not be completed. ${err.response?.data?.error || err.message}`);
    } finally {
      setProcessing(false); setStage('');
    }
  };

  return (
    <div className="container page">
      <span className="eyebrow">Step 2 of 4</span>
      <h1 className="page-title">Add your documents</h1>
      <p className="page-subtitle">
        Checking for <strong>{selectedService.name}</strong>. Add one clear photo for each document below.
      </p>

      <div className="up-layout">
        <div className="up-main">
          <label className={`consent card ${consentGiven ? 'consent-on' : ''}`}>
            <input type="checkbox" checked={consentGiven} disabled={processing} onChange={(e) => setConsentGiven(e.target.checked)} />
            <span className="consent-box" aria-hidden="true"><Icon name="check" size={16} strokeWidth={3} /></span>
            <span className="consent-text">
              <strong><Icon name="lock" size={15} /> I consent to processing my documents on this device</strong>
              Raw images are never sent to a server. Only the extracted field values, with sensitive IDs masked, are used for the check.
            </span>
          </label>

          <div className="up-docs">
            {entries.map((entry, i) => (
              <DocDropzone
                key={entry.docType} docType={entry.docType} index={i} entry={entry}
                locked={!consentGiven || processing} progress={progress}
                onFile={handleFile} onRemove={handleRemove}
              />
            ))}
          </div>
        </div>

        <aside className="up-side">
          <div className="card up-summary">
            <h2>Your check</h2>
            <div className="up-service">{selectedService.name}</div>
            <div className="up-meter" aria-label={`${ready} of ${total} documents added`}>
              <div style={{ width: `${(ready / total) * 100}%` }} />
            </div>
            <div className="up-count"><b>{ready}</b> of {total} documents added</div>

            {error && <div className="alert alert-error" role="alert"><Icon name="alert" size={18} /><div>{error}</div></div>}

            <button className="btn btn-primary btn-lg up-go" disabled={!consentGiven || !allReady || processing} onClick={handleCheck}>
              {processing ? (<><span className="spinner" /> {stage || 'Processing…'}</>) : (<>Check documents <Icon name="arrowRight" size={18} /></>)}
            </button>

            <div className="up-or"><span>or</span></div>
            <button className="btn btn-outline up-demo" disabled={!consentGiven || processing} onClick={handleDemo}>
              <Icon name="sparkles" size={17} /> Try with sample documents
            </button>
            <p className="up-hint">Uses fictional data for “Asha Kumari”, so you can see the full flow instantly.</p>

            <button className="btn btn-ghost btn-sm up-back" disabled={processing} onClick={() => navigate('/services')}>
              <Icon name="arrowLeft" size={16} /> Change service
            </button>
          </div>

          <div className="up-privacy">
            <Icon name="shield" size={18} />
            <p>Your images stay on this device. The server holds rules, not documents.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
