import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon';

export default function NotFoundPage() {
  return (
    <div className="container page" style={{ textAlign: 'center', padding: '90px 20px' }}>
      <div style={{ display: 'grid', placeItems: 'center', width: 72, height: 72, margin: '0 auto 20px', borderRadius: 22, background: 'var(--blue-50)', color: 'var(--blue-600)' }}>
        <Icon name="search" size={34} />
      </div>
      <h1 className="page-title">Page not found</h1>
      <p className="page-subtitle" style={{ margin: '0 auto 24px' }}>The page you are looking for doesn&rsquo;t exist.</p>
      <Link to="/" className="btn btn-primary"><Icon name="arrowLeft" size={18} /> Go home</Link>
    </div>
  );
}
