import React from 'react';

/**
 * Tiny inline SVG icon set (24x24, stroke based) — no external dependency,
 * so the app looks the same offline at a demo venue.
 */
const PATHS = {
  logo:     <><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5" /><path d="m10 15 2 2 4-4" /></>,
  file:     <><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5" /><path d="M10 13h6M10 17h6" /></>,
  upload:   <><path d="M12 16V4" /><path d="m7 9 5-5 5 5" /><path d="M5 20h14" /></>,
  search:   <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></>,
  check:    <path d="m5 12.5 4.5 4.5L19 7.5" />,
  checkCircle: <><circle cx="12" cy="12" r="9" /><path d="m8 12.3 2.8 2.8L16 9.6" /></>,
  alert:    <><path d="M12 3.5 2.8 19.5h18.4z" /><path d="M12 10v4.2M12 17.2v.1" /></>,
  xCircle:  <><circle cx="12" cy="12" r="9" /><path d="m9 9 6 6M15 9l-6 6" /></>,
  eye:      <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="2.8" /></>,
  eyeOff:   <><path d="M4 4l16 16" /><path d="M9.9 5.8A9 9 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a16 16 0 0 1-3 3.8M6.2 7.6A15.7 15.7 0 0 0 2.5 12S6 18.5 12 18.5c1.4 0 2.6-.3 3.7-.8" /></>,
  lock:     <><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /></>,
  shield:   <><path d="M12 3 4.5 6v5.5c0 4.6 3.1 8 7.5 9.5 4.4-1.5 7.5-4.9 7.5-9.5V6z" /><path d="m9 12 2.2 2.2L15.5 10" /></>,
  user:     <><circle cx="12" cy="8.5" r="3.6" /><path d="M4.5 20c.6-3.6 3.6-5.6 7.5-5.6s6.9 2 7.5 5.6" /></>,
  link:     <><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.7l1-1" /></>,
  arrowRight: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  arrowLeft:  <><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></>,
  chevronDown:<path d="m6 9 6 6 6-6" />,
  printer:  <><path d="M7 9V3.5h10V9" /><rect x="4" y="9" width="16" height="8" rx="2" /><path d="M7 14h10v6.5H7z" /></>,
  refresh:  <><path d="M20 11a8 8 0 0 0-14.3-4.5L4 8.5" /><path d="M4 4v4.5h4.5" /><path d="M4 13a8 8 0 0 0 14.3 4.5l1.7-2" /><path d="M20 20v-4.5h-4.5" /></>,
  sparkles: <><path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.3l-1.9-5.5L4.5 11 10.1 9z" /><path d="M19 3v4M17 5h4" /></>,
  trash:    <><path d="M4.5 7h15" /><path d="M9.5 7V4.5h5V7" /><path d="M6.5 7l.8 12.5h9.4L17.5 7" /></>,
  info:     <><circle cx="12" cy="12" r="9" /><path d="M12 11v5.5M12 7.7v.1" /></>,
  wheat:    <><path d="M12 21V8" /><path d="M12 8c-2.5 0-4-1.6-4-4 2.5 0 4 1.6 4 4zM12 8c2.5 0 4-1.6 4-4-2.5 0-4 1.6-4 4z" /><path d="M12 14c-2.5 0-4-1.6-4-4 2.5 0 4 1.6 4 4zM12 14c2.5 0 4-1.6 4-4-2.5 0-4 1.6-4 4z" /></>,
  cap:      <><path d="m2.5 9.5 9.5-5 9.5 5-9.5 5z" /><path d="M6.5 12v4.5c0 1.2 2.5 2.5 5.5 2.5s5.5-1.3 5.5-2.5V12" /><path d="M21.5 9.5V15" /></>,
  home:     <><path d="m3.5 11 8.5-7.5 8.5 7.5" /><path d="M5.5 9.5V20h13V9.5" /><path d="M10 20v-5.5h4V20" /></>,
  building: <><rect x="5" y="3.5" width="14" height="17" rx="1.5" /><path d="M9 8h2M13 8h2M9 12h2M13 12h2M10.5 20.5V16h3v4.5" /></>,
  clipboard:<><rect x="5.5" y="4.5" width="13" height="16" rx="2" /><path d="M9 4.5h6v3H9z" /><path d="M9 12h6M9 16h4" /></>,
  image:    <><rect x="3.5" y="4.5" width="17" height="15" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="m4 17 5-4.5 4 3.5 3-2.5 4 3.5" /></>,
  flag:     <><path d="M6 21V4" /><path d="M6 4.5h11l-2 4 2 4H6" /></>,
  phone:    <><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></>,
  list:     <><path d="M9 6.5h11M9 12h11M9 17.5h11" /><circle cx="4.7" cy="6.5" r=".9" /><circle cx="4.7" cy="12" r=".9" /><circle cx="4.7" cy="17.5" r=".9" /></>,
  message:  <><path d="M4 5.5h16v11H9.5L5.5 20v-3.5H4z" /></>,
  split:    <><path d="M6 3.5v6a4 4 0 0 0 4 4h4a4 4 0 0 1 4 4v3" /><path d="M6 3.5 3.5 6M6 3.5 8.5 6M18 20.5 15.5 18M18 20.5 20.5 18" /></>,
};

export default function Icon({ name, size = 20, strokeWidth = 1.8, className = '', ...rest }) {
  const content = PATHS[name] || PATHS.file;
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true" focusable="false" {...rest}
    >
      {content}
    </svg>
  );
}
