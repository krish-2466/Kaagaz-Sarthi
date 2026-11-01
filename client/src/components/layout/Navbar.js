import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../ui/Icon';
import './Navbar.css';

export default function Navbar() {
  const { pathname } = useLocation();
  const onHome = pathname === '/';

  return (
    <header className={`navbar ${onHome ? 'navbar-home' : ''}`}>
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand" aria-label="KaagazSaathi home">
          <span className="navbar-logo"><Icon name="logo" size={20} strokeWidth={2} /></span>
          <span className="navbar-title">Kaagaz<span>Saathi</span></span>
        </Link>
        <div className="navbar-right">
          <span className="navbar-tag"><span className="dot" /> Build for Bharat 2026</span>
          {!onHome && <Link to="/services" className="btn btn-sm btn-outline navbar-new">New check</Link>}
        </div>
      </div>
    </header>
  );
}
