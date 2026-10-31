import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheck } from '../context/CheckContext';
import { useOCR } from '../hooks/useOCR';
import { extractFields } from '../utils/ocr/fieldExtractor';
import { runCheck } from '../services/api';
import './UploadPage.css';

export default function UploadPage() {
  const { selectedService, setUploadedDocs, consentGiven, setConsentGiven, setCheckResult } = useCheck();
  const navigate = useNavigate();
  const { runOCR, loading: ocrLoading } = useOCR();

  const [docEntries, setDocEntries] = useState(
    (selectedService?.requiredDocumentTypes || []).map((dt) => ({ docType: dt, file: null, extracted: null }))
  );
  const [processing, setProcessing] = useState(false);
  const [currentOcrDoc, setCurrentOcrDoc] = useState('');

  if (!selectedService) {
    return (
      <div className="container">
        <p className="page-subtitle">⚠️ Please select a service first.</p>
        <button className="btn btn-primary" onClick={() => navigate('/services')}>← Pick a service</button>
      </div>
    );
  }

  const handleFileChange = (docType, file) => {
    setDocEntries((prev) =>
      prev.map((e) => (e.docType === docType ? { ...e, file, extracted: null } : e))
    );
  };

  const handleSubmit = async () => {
    if (!consentGiven) return alert('Please give consent before processing.');
    setProcessing(true);

    const updatedEntries = [];
    for (const entry of docEntries) {
      if (!entry.file) { updatedEntries.push(entry); continue; }
      setCurrentOcrDoc(entry.docType);
      const rawText = await runOCR(entry.file);
      const { fields, _confidence } = extractFields(rawText, entry.docType);
      updatedEntries.push({ ...entry, extracted: { ...fields, _confidence } });
    }
    setUploadedDocs(updatedEntries);

    // Build extractedFields payload (no raw images)
    const extractedFields = {};
    for (const e of updatedEntries) {
      if (e.extracted) extractedFields[e.docType] = e.extracted;
    }

    try {
      const result = await runCheck({ serviceId: selectedService._id, consentGiven: true, extractedFields });
      setCheckResult(result);
      navigate('/results');
    } catch (err) {
      alert('Check failed: ' + err.message);
    } finally {
      setProcessing(false);
      setCurrentOcrDoc('');
    }
  };

  const allUploaded = docEntries.every((e) => !!e.file);

  return (
    <div className="container upload-page">
      <h1 className="page-title">Upload Documents</h1>
      <p className="page-subtitle">
        Service: <strong>{selectedService.name}</strong>
      </p>

      {/* Consent banner */}
      <div className="consent-box card">
        <label className="consent-label">
          <input
            type="checkbox"
            checked={consentGiven}
            onChange={(e) => setConsentGiven(e.target.checked)}
          />
          <span>
            I consent to KaagazSaathi processing my documents on this device.
            I understand that raw images are not sent to any server, only extracted
            field values (with sensitive IDs masked) are used for the check.
          </span>
        </label>
      </div>

      <div className="doc-upload-list">
        {docEntries.map((entry) => (
          <div key={entry.docType} className="doc-upload-item card">
            <div className="doc-type-label">
              {entry.docType.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              <span className="doc-required">required</span>
            </div>
            <input
              type="file"
              accept="image/*,.pdf"
              disabled={!consentGiven || processing}
              onChange={(e) => handleFileChange(entry.docType, e.target.files[0])}
              className="file-input"
            />
            {entry.file && (
              <div className="doc-file-name">📎 {entry.file.name}</div>
            )}
            {entry.extracted && (
              <div className="doc-extracted">
                ✅ Fields extracted
              </div>
            )}
            {processing && currentOcrDoc === entry.docType && (
              <div className="doc-ocr-progress">🔍 Running OCR…</div>
            )}
          </div>
        ))}
      </div>

      <div className="upload-actions">
        <button className="btn btn-outline" onClick={() => navigate('/services')}>← Back</button>
        <button
          className="btn btn-primary"
          disabled={!consentGiven || !allUploaded || processing}
          onClick={handleSubmit}
        >
          {processing ? 'Processing…' : 'Check Documents →'}
        </button>
      </div>
    </div>
  );
}
