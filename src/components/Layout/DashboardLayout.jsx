import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import DashboardNavbar from '../Navbar/DashboardNavbar';
import AccessibilityPanel from '../AccessibilityPanel';
import { useProgress } from '../../context/ProgressContext';
import './DashboardLayout.css';

export default function DashboardLayout() {
  const {
    pts,
    badgeCount,
    expPct,
    lv,
    toastMsg,
    toastType,
    isConfirmModalOpen,
    setConfirmModalOpen,
    handleReset,
  } = useProgress();

  return (
    <div className="layout-root">
      <div className="bg-grid"></div>
      <div className="bg-glow"></div>
      <div className="bg-glow2"></div>

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

      {/* Global Reset Modal */}
      {isConfirmModalOpen && (
        <div className="modal-overlay" id="modal-confirm">
          <div className="modal-box" style={{ maxWidth: '420px', textAlign: 'center' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '1.3rem',
                color: 'var(--red)',
              }}
            >
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div className="modal-title" style={{ justifyContent: 'center', marginBottom: '8px' }}>
              Konfirmasi Reset Data
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
              Seluruh progres, badge, dan skor akan dihapus permanen dari browser kamu. Apakah kamu yakin?
            </p>
            <div className="modal-footer" style={{ justifyContent: 'center' }}>
              <button className="btn-modal-cancel" onClick={() => setConfirmModalOpen(false)}>
                Batal
              </button>
              <button className="btn-modal-danger" onClick={handleReset}>
                Ya, Reset Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
