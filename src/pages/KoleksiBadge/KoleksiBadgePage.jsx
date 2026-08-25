import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';

export default function KoleksiBadgePage() {
  const navigate = useNavigate();
  const { state, showToast, BADGE_DATA } = useProgress();
  const [certName, setCertName] = useState('');

  const unlockedCount = state.badges ? state.badges.length : 0;

  return (
    <div className="page-wrap">
      {/* Back to Dashboard Button */}
      <div style={{ marginBottom: '16px' }}>
        <button
          className="btn-lab-ghost"
          onClick={() => navigate('/dashboard')}
          style={{ padding: '8px 16px', fontSize: '0.85rem', fontWeight: 600 }}
        >
          <i className="fa-solid fa-arrow-left mr-2"></i> Kembali ke Dashboard
        </button>
      </div>

      <div className="hub-section-head" style={{ marginBottom: '24px' }}>
        <div>
          <h1 className="hub-section-title" style={{ fontSize: '1.6rem' }}>Koleksi Badge &amp; E-Sertifikat</h1>
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
                className="badge-hub-icon"
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
      <div
        className="panel"
        style={{
          padding: '28px',
          marginTop: '28px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '20px',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.15rem', marginBottom: '4px' }}>
            Generator E-Sertifikat Digital Lit-GO
          </div>
          <div style={{ fontSize: '0.84rem', color: 'var(--text-dim)' }}>
            Syarat pembukaan: Kumpulkan minimum 4 badge kecakapan literasi. (Terkumpul: <strong>{unlockedCount}/5</strong>)
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
