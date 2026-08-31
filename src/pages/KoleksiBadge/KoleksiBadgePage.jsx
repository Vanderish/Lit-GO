import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import './KoleksiBadgePage.css';

export default function KoleksiBadgePage() {
  const navigate = useNavigate();
  const { state, showToast, BADGE_DATA } = useProgress();
  const [certName, setCertName] = useState('');

  const unlockedCount = state.badges ? state.badges.length : 0;

  return (
    <div className="page-wrap">

      <div className="hub-section-head koleksi-badge-header">
        <div>
          <h1 className="hub-section-title koleksi-badge-title">Koleksi Badge &amp; E-Sertifikat</h1>
          <p className="hub-section-sub">Kumpulkan 5 Badge Literasi &amp; Unduh Sertifikat Kelulusan Digital</p>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="badges-grid" id="badges-grid">
        {BADGE_DATA.map((b) => {
          const unlocked = state.badges.includes(b.id);
          return (
            <div key={b.id} className={`badge-hub-card ${unlocked ? 'unlocked' : ''}`}>
              <div
                className={`badge-hub-icon ${unlocked ? 'unlocked' : 'locked'}`}
                style={unlocked ? { background: b.bg } : {}}
              >
                {unlocked ? <i className={`fa-solid ${b.icon}`}></i> : <i className="fa-solid fa-lock"></i>}
              </div>
              <div className="badge-hub-name">{b.name}</div>
              <div className="badge-hub-req">{b.req}</div>
              <div className={`badge-hub-status ${unlocked ? 'unlocked' : 'locked'}`}>
                {unlocked ? (
                  <>
                    <i className="fa-solid fa-circle-check"></i> Terbuka
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-lock"></i> Terkunci
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
            Generator E-Sertifikat Digital Lit-GO
          </div>
          <div className="cert-panel-subtitle">
            Syarat pembukaan: Kumpulkan minimum 4 badge kecakapan literasi. (Terkumpul: <span className="cert-panel-count">{unlockedCount}/5</span>)
          </div>
        </div>
        <div className="cert-form-row">
          <input
            type="text"
            id="cert-name"
            className="cert-input"
            placeholder="Nama Lengkap Kamu"
            value={certName}
            onChange={(e) => setCertName(e.target.value)}
          />
          <button
            className="btn-cert"
            id="cert-btn"
            onClick={() => {
              if (!certName) {
                showToast('Masukkan nama lengkap terlebih dahulu!', 'error');
              } else {
                showToast(`🎓 Selamat ${certName}! Sertifikat Lit-GO berhasil dibuat.`, 'success');
              }
            }}
            disabled={unlockedCount < 4}
          >
            <i className="fa-solid fa-download"></i> Unduh Sertifikat
          </button>
        </div>
      </div>
    </div>
  );
}
