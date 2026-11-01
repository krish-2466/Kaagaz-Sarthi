import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to the top on every page change (the router doesn't do this by itself). */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
