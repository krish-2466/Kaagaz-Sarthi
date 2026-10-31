import React, { createContext, useContext, useState } from 'react';

const CheckContext = createContext(null);

/**
 * CheckProvider — global state for the active check session.
 *
 * State shape:
 *  selectedService  — the service object chosen on /services
 *  uploadedDocs     — [{ docType, file, extractedFields, confidence }]
 *  consentGiven     — boolean (consent modal on upload page)
 *  checkResult      — { sessionId, readinessStatus, summary, flags } from API
 */
export function CheckProvider({ children }) {
  const [selectedService, setSelectedService] = useState(null);
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [consentGiven, setConsentGiven] = useState(false);
  const [checkResult, setCheckResult] = useState(null);

  const resetSession = () => {
    setSelectedService(null);
    setUploadedDocs([]);
    setConsentGiven(false);
    setCheckResult(null);
  };

  return (
    <CheckContext.Provider value={{
      selectedService, setSelectedService,
      uploadedDocs, setUploadedDocs,
      consentGiven, setConsentGiven,
      checkResult, setCheckResult,
      resetSession,
    }}>
      {children}
    </CheckContext.Provider>
  );
}

export function useCheck() {
  const ctx = useContext(CheckContext);
  if (!ctx) throw new Error('useCheck must be used within a CheckProvider');
  return ctx;
}
