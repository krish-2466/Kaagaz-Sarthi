import { useState, useEffect, useCallback } from 'react';
import { fetchServices } from '../services/api';

/**
 * useFetchServices — fetches the list of active services from the API.
 * Exposes `retry` so the UI can offer a "Try again" button if the server is down.
 */
export function useFetchServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchServices()
      .then((data) => { if (!cancelled) setServices(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { services, loading, error, retry };
}
