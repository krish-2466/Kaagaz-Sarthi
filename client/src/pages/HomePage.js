import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HOW_IT_WORKS = [
  { num: '1', icon: '🏛️', title: 'Choose a Service', desc: 'Pick the government scheme or service you are applying for.' },
  { num: '2', icon: '📤', title: 'Upload Documents', desc: 'Add photos or scans. OCR runs in your browser — files never leave your device.' },
  { num: '3', icon: '🔍', title: 'Check & Flag', desc: 'Our rules engine compares fields across documents against the service\'s requirements.' },
  { num: '4', icon: '✅', title: 'Get a Checklist', desc: 'See exactly what to fix, with the official source for each requirement.' },
];

const PRINCIPLES = [
  { icon: '🔒', label: 'Consent first' },
  { icon: '🕶️', label: 'IDs masked' },
  { icon: '📵', label: 'On-device OCR' },
  { icon: '👤', label: 'You verify flags' },
  { icon: '🔗', label: 'Source-backed checks' },
];

export default function HomePage() {
  return (
    <div className="home-page">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-badge">📄 KaagazSaathi</div>
        <h1 className="hero-headline">
          Know your paperwork is ready —<br />
          <span className="hero-highlight">before you stand in the queue.</span>
        </h1>
        <p className="hero-sub">
          An AI-assisted co-pilot that checks your documents for consistency and completeness
          against a government service's official requirements.
        </p>
        <div className="hero-actions">
          <Link to="/services" className="btn btn-primary">Get Started →</Link>
          <a href="#how-it-works" className="btn btn-outline">How it works</a>
        </div>

        {/* Illustrative readiness card */}
        <div className="hero-demo-card card">
          <div className="demo-card-title">KaagazSaathi — Application Readiness</div>
          {[
            { label: 'Name', value: 'ASHA KUMARI', status: 'review',   badge: 'Verify' },
            { label: 'Date of Birth', value: '12 / 04 / 2001', status: 'matched', badge: 'Matched' },
            { label: 'Address proof', value: '— not found —', status: 'missing',  badge: 'Missing' },
            { label: 'Photo',         value: 'Attached',       status: 'matched', badge: 'Matched' },
          ].map((row) => (
            <div key={row.label} className="demo-row">
              <span className="demo-label">{row.label}</span>
              <span className="demo-value">{row.value}</span>
              <span className={`badge badge-${row.status}`}>{row.badge}</span>
            </div>
          ))}
          <p className="demo-footnote">Illustrative · fictional data</p>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="section">
        <h2 className="section-title">How it works</h2>
        <div className="how-grid">
          {HOW_IT_WORKS.map((step) => (
            <div key={step.num} className="how-card card">
              <div className="how-icon">{step.icon}</div>
              <div className="how-num">Step {step.num}</div>
              <div className="how-title">{step.title}</div>
              <p className="how-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Privacy principles ── */}
      <section className="section principles-section">
        <h2 className="section-title">Responsible by design</h2>
        <div className="principles-row">
          {PRINCIPLES.map((p) => (
            <div key={p.label} className="principle-chip">
              <span>{p.icon}</span> {p.label}
            </div>
          ))}
        </div>
        <p className="principles-note">
          Raw documents never leave your browser. The server holds only verified rules, not your data.
        </p>
      </section>

      <div className="home-cta">
        <Link to="/services" className="btn btn-primary">Check your documents now →</Link>
      </div>
    </div>
  );
}
