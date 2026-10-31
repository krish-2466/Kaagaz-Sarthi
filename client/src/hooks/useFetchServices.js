import { useState, useEffect } from 'react';
import { fetchServices } from '../services/api';

/**
 * useFetchServices — fetches the list of active services from the API.
 */
export function useFetchServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices()
      .then(setServices)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { services, loading, error };
}
