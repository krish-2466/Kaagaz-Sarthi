import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon';
import './HomePage.css';

const DEMO_ROWS = [
  { label: 'Name',          value: 'ASHA KUMARI',    tone: 'review',  badge: 'Verify',  icon: 'eye' },
  { label: 'Date of birth', value: '12 / 04 / 2001', tone: 'matched', badge: 'Matched', icon: 'checkCircle' },
  { label: 'Address proof', value: 'not found',      tone: 'missing', badge: 'Missing', icon: 'alert' },
  { label: 'Photo',         value: 'Attached',       tone: 'matched', badge: 'Matched', icon: 'checkCircle' },
];

const PROBLEMS = [
  { icon: 'alert',  title: 'Missing requirements',   desc: 'A required document is noticed only at the counter.' },
  { icon: 'split',  title: 'Inconsistent fields',    desc: 'Name, date or address variants go unnoticed across documents.' },
  { icon: 'message',title: 'Unclear correction steps', desc: "You can't tell what to fix, or which rule says so." },
];

const STEPS = [
  { icon: 'building', title: 'Choose a service',   desc: 'Pick the scheme you are applying for from a supported list.' },
  { icon: 'upload',   title: 'Add your documents', desc: 'Photos or scans. Text is read in your browser. Images never leave your device.' },
  { icon: 'search',   title: 'Extract and check',  desc: "A rules engine compares fields across documents and against the service's rules." },
  { icon: 'list',     title: 'Get a checklist',    desc: 'See what to fix, in order, with the official source for each check.' },
];

const COMPARE = [
  { who: 'Simple checklist', q: 'Which documents do I need?',                      us: false },
  { who: 'Generic chatbot',  q: 'Free-text answers about schemes.',                us: false },
  { who: 'KaagazSaathi',     q: 'Do my documents agree with each other, and with this service’s requirements?', us: true },
];

const PRINCIPLES = [
  { icon: 'lock',   title: 'Consent first',        desc: 'Nothing is processed until you agree.' },
  { icon: 'eyeOff', title: 'Sensitive IDs masked', desc: 'Aadhaar-type numbers are hidden in views and logs.' },
  { icon: 'phone',  title: 'On-device reading',    desc: 'OCR runs in your browser. Raw images stay with you.' },
  { icon: 'user',   title: 'You verify every flag',desc: 'Low-confidence results go to human review.' },
  { icon: 'link',   title: 'Source-backed checks', desc: 'Each check links to the official requirement.' },
];

export default function HomePage() {
  return (
    <div className="home">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy rise">
            <span className="hero-pill"><Icon name="sparkles" size={14} /> Paperwork co-pilot · Software Track</span>
            <h1>
              Know your paperwork is ready,
              <span> before you stand in the queue.</span>
            </h1>
            <p className="hero-sub">
              KaagazSaathi checks your documents against a government service&rsquo;s published
              requirements. It finds missing papers and mismatched details, and tells you exactly what to fix.
            </p>
            <div className="hero-actions">
              <Link to="/services" className="btn btn-lg btn-light">Check my documents <Icon name="arrowRight" size={18} /></Link>
              <a href="#problem" className="btn btn-lg btn-on-dark">See the problem</a>
            </div>
            <ul className="hero-trust">
              <li><Icon name="shield" size={16} /> Runs on your device</li>
              <li><Icon name="link" size={16} /> Evidence for every flag</li>
              <li><Icon name="user" size={16} /> You stay in control</li>
            </ul>
          </div>

          <div className="hero-card-wrap rise" style={{ animationDelay: '.15s' }}>
            <div className="demo-card" role="img" aria-label="Example readiness report for a fictional applicant">
              <div className="demo-head">
                <span className="demo-title">Application readiness</span>
                <span className="demo-pill">Illustrative</span>
              </div>
              {DEMO_ROWS.map((r, i) => (
                <div key={r.label} className="demo-row" style={{ animationDelay: `${.45 + i * .15}s` }}>
                  <div>
                    <div className="demo-label">{r.label}</div>
                    <div className="demo-value">{r.value}</div>
                  </div>
                  <span className={`badge badge-${r.tone}`}><Icon name={r.icon} size={14} strokeWidth={2.2} />{r.badge}</span>
                </div>
              ))}
              <div className="demo-foot"><Icon name="info" size={14} /> Fictional data. The tool never decides eligibility.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section id="problem" className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The problem</span>
            <h2>One small mismatch can stall an application</h2>
          </div>
          <div className="problem-grid">
            <div className="compare card">
              <div className="compare-doc">
                <div className="cd-title"><Icon name="file" size={16} /> Identity document</div>
                <dl>
                  <div><dt>Name</dt><dd className="diff">ASHA KUMARI</dd></div>
                  <div><dt>Date of birth</dt><dd>12 / 04 / 2001</dd></div>
                  <div><dt>Address</dt><dd>Ward 5, Sample Nagar</dd></div>
                </dl>
              </div>
              <div className="compare-neq" aria-label="does not match">≠</div>
              <div className="compare-doc">
                <div className="cd-title"><Icon name="cap" size={16} /> Education certificate</div>
                <dl>
                  <div><dt>Name</dt><dd className="diff">ASHA KUMAR</dd></div>
                  <div><dt>Date of birth</dt><dd>12 / 04 / 2001</dd></div>
                  <div><dt>Address</dt><dd className="empty">missing</dd></div>
                </dl>
              </div>
              <p className="compare-note">Illustrative example · all values fictional</p>
            </div>
            <ul className="problem-list">
              {PROBLEMS.map((p) => (
                <li key={p.title} className="card">
                  <span className="pi"><Icon name={p.icon} size={20} /></span>
                  <div><strong>{p.title}</strong><p>{p.desc}</p></div>
                </li>
              ))}
              <li className="problem-journey">
                <span>Gather documents</span><Icon name="arrowRight" size={14} />
                <span>Mismatch found late</span><Icon name="arrowRight" size={14} />
                <span>Unclear fix</span><Icon name="arrowRight" size={14} />
                <span>Extra visit</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="section section-tint">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>From service to evidence-backed checklist</h2>
          </div>
          <ol className="steps-grid">
            {STEPS.map((s, i) => (
              <li key={s.title} className="step-card card">
                <span className="step-num">{i + 1}</span>
                <span className="step-icon"><Icon name={s.icon} size={22} /></span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Different ── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What makes it different</span>
            <h2>Consistency checking, not another chatbot</h2>
          </div>
          <div className="compare-grid">
            {COMPARE.map((c) => (
              <div key={c.who} className={`cmp card ${c.us ? 'cmp-us' : ''}`}>
                <span className="cmp-who">{c.who}</span>
                <span className="cmp-label">What it answers</span>
                <p>{c.q}</p>
              </div>
            ))}
          </div>
          <div className="match-example card">
            <Icon name="sparkles" size={18} />
            <span className="me-pair"><b>Rajesh Kumar Sharma</b> <i>↔</i> <b>R. K. Sharma</b></span>
            <span className="badge badge-review"><Icon name="eye" size={14} strokeWidth={2.2} />Likely same person, flagged to verify</span>
          </div>
        </div>
      </section>

      {/* ── Responsible ── */}
      <section className="section section-navy">
        <div className="container">
          <div className="section-head section-head-light">
            <span className="eyebrow">Responsible AI by design</span>
            <h2>AI helps read. Reviewed rules decide.</h2>
            <p>No eligibility decisions. No approval guarantees.</p>
          </div>
          <ul className="principles">
            {PRINCIPLES.map((p) => (
              <li key={p.title}>
                <span className="pr-icon"><Icon name={p.icon} size={20} /></span>
                <strong>{p.title}</strong>
                <p>{p.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <h2>Ready to check your paperwork?</h2>
          <Link to="/services" className="btn btn-lg btn-primary">Start a check <Icon name="arrowRight" size={18} /></Link>
        </div>
      </section>
    </div>
  );
}
