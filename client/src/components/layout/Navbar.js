import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const NAV_STEPS = [
  { path: '/services', label: 'Pick Service' },
  { path: '/upload',   label: 'Upload Docs' },
  { path: '/results',  label: 'View Results' },
  { path: '/checklist',label: 'Checklist' },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="navbar-logo">📄</span>
          <span className="navbar-title">KaagazSaathi</span>
        </Link>

        <nav className="navbar-steps">
          {NAV_STEPS.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              className={`navbar-step ${pathname === s.path ? 'active' : ''}`}
            >
              {s.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
