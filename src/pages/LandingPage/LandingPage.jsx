import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Pastikan CSS ini ada

export default function LandingPage() {
  const [radar, setRadar] = useState([0, 0, 0, 0]);
  const [hasRadar, setHasRadar] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const s = localStorage.getItem('litgo_complete_v1');
    if (s) {
      const state = JSON.parse(s);
      setRadar(state.radar || [0, 0, 0, 0]);
      setHasRadar(state.hasRadar || false);
    }
  }, []);

  const handleStartLearning = () => {
    navigate('/dashboard');
  };

  const requestReset = () => {
    console.log("Reset requested");
    // Tambahkan logika reset state di sini
  };

  return (
    <>
      {/* Background Layer */}
      <div className="bg-grid"></div>
      <div className="bg-glow"></div>
      <div className="bg-glow2"></div>

      <nav>
        <div className="nav-inner">
          <div className="logo">
            <div className="logo-mark">L</div>
            Lit - GO
          </div>
          <div className="nav-links">
            <a href="#section-labs">Sandbox Lab</a>
            <a href="#section-modules">Modul</a>
            <a href="#section-gamifikasi">E&#8209;Badge</a>
            <a href="#section-akses">Aksesibilitas</a>
          </div>
          <div className="nav-hud">
            <button className="btn-nav-cta" onClick={handleStartLearning}>Mulai Belajar</button>
            <button className="btn-reset" onClick={requestReset} title="Reset Progres Platform">
              <i className="fa-solid fa-rotate-right"></i>
            </button>
          </div>
        </div>
      </nav>

      <div id="toast-container"></div>

      <main>
        <header className="hero">
          <div className="wrap">
            <div className="hero-grid">
              <div>
                <h1 className="hero-title">
                  Paham AI bukan cuma bisa <span className="accent">pakai</span>, tapi bisa <span className="accent">nilai</span>.
                </h1>
                <p className="hero-sub">
                  Lit-GO melatih kepekaan kritis terhadap kecerdasan buatan lewat simulasi nyata: kenali halusinasi, deteksi deepfake, dan susun prompt yang aman — semua berjalan langsung di browser kamu, tanpa server.
                </p>
                <div className="hero-actions">
                  <button className="btn-primary" onClick={() => {/* Logika ke tab simulasi */}}>
                    Coba Sandbox Lab &nbsp;→
                  </button>
                  <button className="btn-secondary-ghost" onClick={() => {/* Logika scroll down */}}>
                    Lihat Silabus
                  </button>
                </div>
                <div className="hero-stats">
                  <div>
                    <div className="stat-num">98%</div>
                    <div className="stat-label">responden tertarik pakai platform ini</div>
                  </div>
                  <div>
                    <div className="stat-num">6</div>
                    <div className="stat-label">modul + lab interaktif</div>
                  </div>
                  <div>
                    <div className="stat-num">100%</div>
                    <div className="stat-label">client-side, tanpa database</div>
                  </div>
                </div>
              </div>
              <div className="radar-preview">
                <div className="radar-preview-head">
                  <h3>AI Readiness Radar</h3>
                  <span style={{fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)'}}>
                    PRE&#8209;TEST
                  </span>
                </div>
                <div className="mascot-slot">[ ruang maskot — diisi kemudian ]</div>
                <div className="pillar-row">
                  <span className="pillar-name">Pemahaman Dasar</span>
                  <div className="pillar-bar-track">
                    <div className="pillar-bar-fill" id="lp-p1" style={{width: `${radar[0]}%`, background: 'var(--indigo)'}}></div>
                  </div>
                  <span className="pillar-val" id="lp-p1-val">{hasRadar ? `${radar[0]}%` : '—'}</span>
                </div>
                <div className="pillar-row">
                  <span className="pillar-name">Etika & Keamanan</span>
                  <div className="pillar-bar-track">
                    <div className="pillar-bar-fill" id="lp-p2" style={{width: `${radar[1]}%`, background: 'var(--teal)'}}></div>
                  </div>
                  <span className="pillar-val" id="lp-p2-val">{hasRadar ? `${radar[1]}%` : '—'}</span>
                </div>
                <div className="pillar-row">
                  <span className="pillar-name">Prompting</span>
                  <div className="pillar-bar-track">
                    <div className="pillar-bar-fill" id="lp-p3" style={{width: `${radar[2]}%`, background: 'var(--amber)'}}></div>
                  </div>
                  <span className="pillar-val" id="lp-p3-val">{hasRadar ? `${radar[2]}%` : '—'}</span>
                </div>
                <div className="pillar-row">
                  <span className="pillar-name">Critical Thinking</span>
                  <div className="pillar-bar-track">
                    <div className="pillar-bar-fill" id="lp-p4" style={{width: `${radar[3]}%`, background: 'var(--emerald)'}}></div>
                  </div>
                  <span className="pillar-val" id="lp-p4-val">{hasRadar ? `${radar[3]}%` : '—'}</span>
                </div>
              </div>
            </div>
          </div>
        </header>
      </main>
    </>
  );
}