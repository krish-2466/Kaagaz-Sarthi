import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CheckProvider } from './context/CheckContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ServicePickerPage from './pages/ServicePickerPage';
import UploadPage from './pages/UploadPage';
import ResultsPage from './pages/ResultsPage';
import ChecklistPage from './pages/ChecklistPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <CheckProvider>
        <div className="app-shell">
          <Navbar />
          <main className="app-main">
            <Routes>
              <Route path="/"                element={<HomePage />} />
              <Route path="/services"        element={<ServicePickerPage />} />
              <Route path="/upload"          element={<UploadPage />} />
              <Route path="/results"         element={<ResultsPage />} />
              <Route path="/checklist"       element={<ChecklistPage />} />
              <Route path="*"               element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CheckProvider>
    </BrowserRouter>
  );
}

export default App;
