import { useState } from 'react';
import { useProgress } from '../../context/ProgressContext';
import CertificateModal from '../../components/CertificateModal/CertificateModal';
import './KoleksiBadgePage.css';

export default function KoleksiBadgePage() {
  const { state, showToast, BADGE_DATA, isEnglish } = useProgress();
  const [certName, setCertName] = useState(() => {
    try {
      const userData = localStorage.getItem('user_data');
      if (userData) {
        const parsed = JSON.parse(userData);
        if (parsed && parsed.name) {
          return parsed.name;
        }
      }
    } catch {
      // ignore JSON parse errors
    }
    return '';
  });
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const unlockedCount = state.badges ? state.badges.length : 0;
  const isEligible = unlockedCount >= 4;

  const handleOpenCertificate = () => {
    if (!certName.trim()) {
      showToast(isEnglish ? 'Please enter your full name!' : 'Masukkan nama lengkap terlebih dahulu!', 'error');
      return;
    }
    setIsCertModalOpen(true);
  };

  return (
    <div className="page-wrap">
      <div className="hub-section-head koleksi-badge-header">
        <div>
          <h1 className="hub-section-title koleksi-badge-title">
            {isEnglish ? 'Badge Collection & E-Certificate' : 'Koleksi Badge & E-Sertifikat'}
          </h1>
          <p className="hub-section-sub">
            {isEnglish
              ? 'Collect 5 Literacy Badges & Download Your Digital Certificate of Completion'
              : 'Kumpulkan 5 Badge Literasi & Unduh Sertifikat Kelulusan Digital'}
          </p>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="badges-grid" id="badges-grid">
        {BADGE_DATA.map((b) => {
          const unlocked = state.badges && state.badges.includes(b.id);
          return (
            <div key={b.id} className={`badge-hub-card ${unlocked ? 'unlocked' : ''}`}>
              <div
                className={`badge-hub-icon ${unlocked ? 'unlocked' : 'locked'}`}
                style={{
                  background: unlocked ? b.bg : 'rgba(30,41,59,0.06)',
                  color: unlocked ? '#FFF' : 'var(--text-dim)',
                  boxShadow: unlocked ? '0 4px 14px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                {unlocked ? <i className={`fa-solid ${b.icon}`}></i> : <i className="fa-solid fa-lock"></i>}
              </div>
              <div className="badge-hub-name">{b.name}</div>
              <div className="badge-hub-req">{b.req}</div>
              <div className={`badge-hub-status ${unlocked ? 'unlocked' : 'locked'}`}>
                {unlocked ? (
                  <>
                    <i className="fa-solid fa-circle-check"></i> {isEnglish ? 'Unlocked' : 'Terbuka'}
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-lock"></i> {isEnglish ? 'Locked' : 'Terkunci'}
                  </>
                )}
              </div>
              <div className="badge-hub-desc">{b.desc}</div>
            </div>
          );
        })}
      </div>

      {/* Certificate Generator Panel */}
      <div className="cert-panel-wrapper">
        <div>
          <div className="cert-panel-title">
            {isEnglish ? 'Official Lit-GO Digital Certificate Generator' : 'Generator E-Sertifikat Digital Lit-GO'}
          </div>
          <div className="cert-panel-subtitle">
            {isEnglish
              ? `Requirements: Collect at least 4 literacy badges. (Collected: ${unlockedCount}/5)`
              : `Syarat pembukaan: Kumpulkan minimum 4 badge kecakapan literasi. (Terkumpul: `}
            {!isEnglish && <span className="cert-panel-count">{unlockedCount}/5</span>}
            {!isEnglish && ')'}
          </div>
        </div>
        <div className="cert-form-row">
          <input
            type="text"
            id="cert-name"
            className="cert-input"
            placeholder={isEnglish ? 'Your Full Name' : 'Nama Lengkap Kamu'}
            value={certName}
            onChange={(e) => setCertName(e.target.value)}
          />
          <button
            className="btn-cert"
            id="cert-btn"
            onClick={handleOpenCertificate}
            disabled={!isEligible}
            title={!isEligible ? (isEnglish ? 'Unlock at least 4 badges to generate certificate' : 'Buka minimal 4 badge untuk mencetak sertifikat') : ''}
          >
            <i className="fa-solid fa-certificate"></i> {isEnglish ? 'Preview & Print Certificate' : 'Lihat & Cetak Sertifikat'}
          </button>
        </div>
      </div>

      {/* Certificate Preview Modal */}
      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        recipientName={certName}
      />
    </div>
  );
}
