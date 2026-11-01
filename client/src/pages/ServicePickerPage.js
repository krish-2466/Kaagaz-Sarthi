import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheck } from '../context/CheckContext';
import { useFetchServices } from '../hooks/useFetchServices';
import Icon from '../components/ui/Icon';
import { prettyField } from '../utils/status';
import './ServicePickerPage.css';

const CATEGORY_ICONS = {
  'Food & Civil Supplies': 'wheat',
  Education: 'cap',
  Housing: 'home',
};

export default function ServicePickerPage() {
  const { setSelectedService } = useCheck();
  const { services, loading, error, retry } = useFetchServices();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return services;
    return services.filter((s) =>
      [s.name, s.category, s.description].some((t) => (t || '').toLowerCase().includes(q))
    );
  }, [services, query]);

  const handleSelect = (service) => {
    setSelectedService(service);
    navigate('/upload');
  };

  return (
    <div className="container page">
      <span className="eyebrow">Step 1 of 4</span>
      <h1 className="page-title">Which service are you applying for?</h1>
      <p className="page-subtitle">
        KaagazSaathi checks your documents against that service&rsquo;s published requirements.
      </p>

      {!loading && !error && services.length > 0 && (
        <div className="svc-search">
          <Icon name="search" size={18} />
          <input
            type="search" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, e.g. scholarship, ration, housing"
            aria-label="Search services"
          />
        </div>
      )}

      {loading && (
        <div className="svc-grid" aria-busy="true" aria-label="Loading services">
          {[0, 1, 2].map((i) => <div key={i} className="svc-skel card"><div className="skeleton" /><div className="skeleton" /><div className="skeleton" /></div>)}
        </div>
      )}

      {error && (
        <div className="alert alert-error svc-error" role="alert">
          <Icon name="alert" size={20} />
          <div>
            <strong>Couldn&rsquo;t load services</strong>
            Check that the server is running and the database is reachable. ({error})
            <div><button className="btn btn-sm btn-outline" onClick={retry}><Icon name="refresh" size={15} /> Try again</button></div>
          </div>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="svc-empty card">
          <Icon name="search" size={28} />
          <p>{services.length === 0 ? 'No services are available yet. Run the seed script.' : `No service matches “${query}”.`}</p>
        </div>
      )}

      <div className="svc-grid">
        {filtered.map((svc, i) => (
          <button key={svc._id} className="svc-card card rise" style={{ animationDelay: `${i * 70}ms` }} onClick={() => handleSelect(svc)}>
            <span className="svc-icon"><Icon name={CATEGORY_ICONS[svc.category] || 'clipboard'} size={24} /></span>
            <span className="svc-cat">{svc.category}</span>
            <span className="svc-name">{svc.name}</span>
            <span className="svc-desc">{svc.description}</span>
            <span className="svc-docs-label">{svc.requiredDocumentTypes.length} documents checked</span>
            <span className="svc-docs">
              {svc.requiredDocumentTypes.map((d) => <span key={d} className="doc-chip">{prettyField(d)}</span>)}
            </span>
            <span className="svc-go">Start check <Icon name="arrowRight" size={16} /></span>
          </button>
        ))}
      </div>
    </div>
  );
}
