import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheck } from '../context/CheckContext';
import { useFetchServices } from '../hooks/useFetchServices';
import './ServicePickerPage.css';

const CATEGORY_ICONS = {
  'Food & Civil Supplies': '🌾',
  'Education': '🎓',
  'Housing': '🏠',
  'General': '📋',
};

export default function ServicePickerPage() {
  const { setSelectedService } = useCheck();
  const { services, loading, error } = useFetchServices();
  const navigate = useNavigate();

  const handleSelect = (service) => {
    setSelectedService(service);
    navigate('/upload');
  };

  return (
    <div className="container">
      <h1 className="page-title">Choose a Service</h1>
      <p className="page-subtitle">
        Select the government scheme or service you are applying for. KaagazSaathi will
        check your documents against that service's official requirements.
      </p>

      {loading && <div className="spinner" aria-label="Loading services…" />}
      {error && <p className="error-msg">⚠️ Could not load services: {error}</p>}

      <div className="service-grid">
        {services.map((svc) => (
          <button
            key={svc._id}
            className="service-card card"
            onClick={() => handleSelect(svc)}
          >
            <div className="service-icon">
              {CATEGORY_ICONS[svc.category] || '📋'}
            </div>
            <div className="service-info">
              <div className="service-name">{svc.name}</div>
              <div className="service-category">{svc.category}</div>
              <p className="service-desc">{svc.description}</p>
              <div className="service-docs">
                {svc.requiredDocumentTypes.map((d) => (
                  <span key={d} className="doc-chip">{d.replace(/_/g, ' ')}</span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
