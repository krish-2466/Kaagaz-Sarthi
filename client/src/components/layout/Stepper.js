import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCheck } from '../../context/CheckContext';
import Icon from '../ui/Icon';
import './Stepper.css';

const STEPS = [
  { path: '/services',  label: 'Choose service' },
  { path: '/upload',    label: 'Add documents' },
  { path: '/results',   label: 'Review flags' },
  { path: '/checklist', label: 'Fix checklist' },
];

/** Progress bar shown under the navbar on every step of the flow. */
export default function Stepper() {
  const { pathname } = useLocation();
  const { selectedService, checkResult } = useCheck();
  const current = STEPS.findIndex((s) => s.path === pathname);
  if (current === -1) return null;

  // A finished step is only a link if its data still exists.
  const reachable = (i) =>
    i < current && (i === 0 || (i === 1 && selectedService) || (i === 2 && checkResult));

  return (
    <nav className="flow-steps" aria-label="Progress">
      <ol className="container flow-steps-list">
        {STEPS.map((s, i) => {
          const state = i < current ? 'done' : i === current ? 'active' : 'todo';
          const inner = (
            <>
              <span className="fs-dot">{state === 'done' ? <Icon name="check" size={14} strokeWidth={3} /> : i + 1}</span>
              <span className="fs-label">{s.label}</span>
            </>
          );
          return (
            <li key={s.path} className={`fs-item fs-${state}`} aria-current={state === 'active' ? 'step' : undefined}>
              {reachable(i) ? <Link to={s.path} className="fs-link">{inner}</Link> : <span className="fs-link">{inner}</span>}
              {i < STEPS.length - 1 && <span className="fs-bar" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
