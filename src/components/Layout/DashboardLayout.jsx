import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import DashboardNavbar from '../Navbar/DashboardNavbar';
import AccessibilityPanel from '../AccessibilityPanel';
import PretestModal from '../PretestModal/PretestModal';
import { useProgress } from '../../context/ProgressContext';
import './DashboardLayout.css';

export default function DashboardLayout() {
  const {
    state,
    pts,
    badgeCount,
    expPct,
    lv,
    toastMsg,
    toastType,
    isConfirmModalOpen,
    setConfirmModalOpen,
    handleReset,
    loadDemoPreset,
  } = useProgress();

  const [isGlobalPretestOpen, setIsGlobalPretestOpen] = useState(false);

  useEffect(() => {
    if (!state.hasRadar) {
      setIsGlobalPretestOpen(true);
    } else {
      setIsGlobalPretestOpen(false);
    }
  }, [state.hasRadar]);

  return (
    <div className="layout-root">
      <div className="bg-grid"></div>
      <div className="bg-glow"></div>
      <div className="bg-glow2"></div>

      {/* Global Pretest Modal */}
      <PretestModal 
        isOpen={isGlobalPretestOpen} 
        onClose={() => setIsGlobalPretestOpen(false)} 
        canClose={state.hasRadar} 
        onComplete={() => setIsGlobalPretestOpen(false)} 
      />

      {/* Sidebar on the Left */}
      <Sidebar />

      {/* Main Content Container on the Right */}
      <div className="layout-main">
        {/* Top Navbar */}
        <DashboardNavbar
          pts={pts}
          badgeCount={badgeCount}
          expPct={expPct}
          lv={lv}
          onRequestReset={() => setConfirmModalOpen(true)}
        />

        {/* Global Toast */}
        {toastMsg && (
          <div id="toast-container" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="toast" style={{ opacity: 1 }}>
              <span className="toast-icon">
                {toastType === 'success' ? (
                  <i className="fa-solid fa-circle-check text-emerald"></i>
                ) : toastType === 'amber' ? (
                  <i className="fa-solid fa-award text-amber"></i>
                ) : toastType === 'error' ? (
                  <i className="fa-solid fa-triangle-exclamation text-red"></i>
                ) : (
                  <i className="fa-solid fa-circle-info text-indigo"></i>
                )}
              </span>
              <span>{toastMsg}</span>
            </div>
          </div>
        )}

        {/* Page Content Rendered Here */}
        <main className="layout-content">
          <Outlet />
        </main>
      </div>

      {/* Floating Global Accessibility Panel */}
      <AccessibilityPanel />

      {/* Skenario Demo & Reset Modal */}
      {isConfirmModalOpen && (
        <div className="modal-overlay" id="modal-confirm">
          <div className="modal-box" style={{ maxWidth: '460px', textAlign: 'center' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'rgba(37,99,235,0.1)',
                border: '1px solid rgba(37,99,235,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '1.3rem',
                color: 'var(--indigo, #2563EB)',
              }}
            >
              <i className="fa-solid fa-sliders"></i>
            </div>
            <div className="modal-title" style={{ justifyContent: 'center', marginBottom: '8px' }}>
              Kelola Skenario Demo & Data
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: '20px' }}>
              Pilih skenario presentasi untuk juri atau reset seluruh data kembali ke kondisi awal (cold-start).
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              <button
                onClick={loadDemoPreset}
                style={{
                  background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(37,99,235,0.25)',
                  transition: 'all 0.2s ease',
                }}
              >
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                Muat Skenario Demo Showcase (Siap Juri)
              </button>

              <button
                onClick={handleReset}
                style={{
                  background: 'rgba(239,68,68,0.08)',
                  color: 'var(--red, #EF4444)',
                  border: '1px solid rgba(239,68,68,0.25)',
                  padding: '10px 16px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                }}
              >
                <i className="fa-solid fa-rotate-right"></i>
                Reset Bersih ke Cold-Start (State 0)
              </button>
            </div>

            <div className="modal-footer" style={{ justifyContent: 'center', paddingTop: '8px' }}>
              <button className="btn-modal-cancel" onClick={() => setConfirmModalOpen(false)}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
