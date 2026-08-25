import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Context Provider
import { ProgressProvider } from './context/ProgressContext';

// Layout & Protected Route
import ProtectedRoute from './routes/ProtectedRoutes';
import DashboardLayout from './components/Layout/DashboardLayout';

// Pages
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import ProgresPage from './pages/Progres/ProgresPage';
import RadarReadinessPage from './pages/RadarReadiness/RadarReadinessPage';
import ModulBelajarPage from './pages/ModulBelajar/ModulBelajarPage';
import KoleksiBadgePage from './pages/KoleksiBadge/KoleksiBadgePage';
import DeepfakeDetectivePage from './pages/Sandbox/DeepfakeDetectivePage';
import BiasBreakerPage from './pages/Sandbox/BiasBreakerPage';
import EthicalDilemmaPage from './pages/Sandbox/EthicalDilemmaPage';
import PromptSafetyPage from './pages/Sandbox/PromptSafetyPage';

function App() {
  return (
    <ProgressProvider>
      <Router>
        <Routes>
          {/* Route Publik */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          {/* Route yang Dilindungi */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/progres" element={<ProgresPage />} />
              <Route path="/radar-readiness" element={<RadarReadinessPage />} />
              <Route path="/modul-belajar" element={<ModulBelajarPage />} />
              <Route path="/koleksi-badge" element={<KoleksiBadgePage />} />
              <Route path="/sandbox/deepfake-detective" element={<DeepfakeDetectivePage />} />
              <Route path="/sandbox/bias-breaker" element={<BiasBreakerPage />} />
              <Route path="/sandbox/ethical-dilemma" element={<EthicalDilemmaPage />} />
              <Route path="/sandbox/prompt-safety" element={<PromptSafetyPage />} />
            </Route>
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ProgressProvider>
  );
}

export default App;