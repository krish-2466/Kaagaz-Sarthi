import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '60px 16px' }}>
      <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📄</div>
      <h1 className="page-title">Page Not Found</h1>
      <p className="page-subtitle">The page you are looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">← Go Home</Link>
    </div>
  );
}
