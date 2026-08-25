import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { useProgress } from '../../context/ProgressContext';
import './Dashboard.css';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

export default function Dashboard() {
  const navigate = useNavigate();
  const { state, saveState, showToast } = useProgress();

  const [isRadarModalOpen, setRadarModalOpen] = useState(false);
  const [radarAnswers, setRadarAnswers] = useState([3, 2, 3, 4, 2, 2, 3, 3]);

  const handleRadarSubmit = () => {
    const vals = radarAnswers;
    const newRadar = [
      Math.round(((vals[0] + vals[1]) / 10) * 100),
      Math.round(((vals[2] + vals[3]) / 10) * 100),
      Math.round(((vals[4] + vals[5]) / 10) * 100),
      Math.round(((vals[6] + vals[7]) / 10) * 100),
    ];
    let newBadges = [...state.badges];
    if (!newBadges.includes(1)) newBadges.push(1);
    saveState({ ...state, radar: newRadar, hasRadar: true, badges: newBadges });
    setRadarModalOpen(false);
    showToast('Pre-Test tersimpan! Radar kecakapan diperbarui.', 'success');
  };

  const radarData = {
    labels: ['Pemahaman Dasar', 'Etika & Keamanan', 'Prompting', 'Berpikir Kritis'],
    datasets: [
      {
        label: 'Skor (%)',
        data: state.radar || [0, 0, 0, 0],
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        borderColor: '#3B82F6',
        pointBackgroundColor: '#F59E0B',
        borderWidth: 2,
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        min: 0,
        max: 100,
        grid: { color: '#E2E8F0' },
        angleLines: { color: '#E2E8F0' },
        ticks: { display: false },
        pointLabels: {
          font: { size: 10, family: 'Space Grotesk', weight: 'bold' },
          color: '#334155',
        },
      },
    },
    plugins: { legend: { display: false } },
  };

  return (
    <div className="dashboard-container" style={{ padding: 0 }}>
      <div className="wrap">
        {/* LOBBY HERO & QUICK LAUNCH CARDS */}
        <div className="hub-lobby" style={{ marginBottom: '40px' }}>
          <div className="hub-lobby-grid">
            {/* Navigasi Group */}
            <div>
              <div
                style={{
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--indigo)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 600,
                  marginBottom: '10px',
                }}
              >
                NAVIGASI LITERASI
              </div>
              <div className="hub-nav-list">
                <button className="hub-nav-btn" onClick={() => navigate('/radar-readiness')}>
                  <div className="hub-nav-icon" style={{ background: 'rgba(59,130,246,0.1)', color: 'var(--indigo)' }}>
                    <i className="fa-solid fa-chart-line"></i>
                  </div>
                  <div>
                    <div className="hub-nav-title">Radar Readiness</div>
                    <div className="hub-nav-sub">Asesmen 4 Pilar</div>
                  </div>
                </button>
                <button className="hub-nav-btn" onClick={() => navigate('/modul-belajar')}>
                  <div className="hub-nav-icon" style={{ background: 'rgba(245,158,11,0.1)', color: 'var(--amber)' }}>
                    <i className="fa-solid fa-book-open"></i>
                  </div>
                  <div>
                    <div className="hub-nav-title">Modul Belajar</div>
                    <div className="hub-nav-sub">6 Modul Silabus</div>
                  </div>
                </button>
                <button className="hub-nav-btn" onClick={() => navigate('/koleksi-badge')}>
                  <div className="hub-nav-icon" style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--emerald)' }}>
                    <i className="fa-solid fa-trophy"></i>
                  </div>
                  <div>
                    <div className="hub-nav-title">Koleksi Badge</div>
                    <div className="hub-nav-sub">&amp; E-Sertifikat</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Mascot Room Center */}
            <div className="hub-center">
              <div className="mascot-dialog">
                <i className="fa-solid fa-quote-left" style={{ color: 'var(--indigo)', marginRight: '6px' }}></i>
                Halo! Selamat datang di Lit-GO. Yuk mulai dari Radar Readiness untuk kenali level literasi AI kamu!
              </div>
              <div className="mascot-slot-hub">[ ruang maskot — diisi kemudian ]</div>
              <button className="btn-hub-start" onClick={() => navigate('/sandbox/deepfake-detective')}>
                <i className="fa-solid fa-play"></i> Mulai Jelajahi Lab
              </button>
            </div>

            {/* Sandbox Lab Group */}
            <div>
              <div
                style={{
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--teal)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 600,
                  marginBottom: '10px',
                }}
              >
                SANDBOX LAB
              </div>
              <div className="hub-nav-list">
                <button className="hub-nav-btn" onClick={() => navigate('/sandbox/deepfake-detective')}>
                  <div className="hub-nav-icon" style={{ background: 'rgba(20,184,166,0.1)', color: 'var(--teal)' }}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <div>
                    <div className="hub-nav-title">Deepfake Detective</div>
                    <div className="hub-nav-sub">Inspeksi Artefak Visual</div>
                  </div>
                </button>
                <button className="hub-nav-btn" onClick={() => navigate('/sandbox/bias-breaker')}>
                  <div className="hub-nav-icon" style={{ background: 'rgba(245,158,11,0.1)', color: 'var(--amber)' }}>
                    <i className="fa-solid fa-bug"></i>
                  </div>
                  <div>
                    <div className="hub-nav-title">Bias Breaker</div>
                    <div className="hub-nav-sub">Deteksi Halusinasi Teks</div>
                  </div>
                </button>
                <button className="hub-nav-btn" onClick={() => navigate('/sandbox/ethical-dilemma')}>
                  <div className="hub-nav-icon" style={{ background: 'rgba(59,130,246,0.1)', color: 'var(--indigo)' }}>
                    <i className="fa-solid fa-scale-balanced"></i>
                  </div>
                  <div>
                    <div className="hub-nav-title">Ethical Dilemma</div>
                    <div className="hub-nav-sub">Simulasi Keputusan</div>
                  </div>
                </button>
                <button className="hub-nav-btn" onClick={() => navigate('/sandbox/prompt-safety')}>
                  <div className="hub-nav-icon" style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--emerald)' }}>
                    <i className="fa-solid fa-terminal"></i>
                  </div>
                  <div>
                    <div className="hub-nav-title">Prompt Safety Lab</div>
                    <div className="hub-nav-sub">Parser Anatomi Prompt</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI READINESS RADAR PREVIEW SECTION (Featured on Dashboard) */}
        <div className="hub-section">
          <div className="hub-section-head">
            <div>
              <div className="hub-section-title">AI Readiness Radar</div>
              <div className="hub-section-sub">Preview Tingkat Kecakapan Literasi Kecerdasan Buatan Kamu</div>
            </div>
            <button className="btn-lab" onClick={() => setRadarModalOpen(true)}>
              <i className="fa-solid fa-clipboard-check mr-1"></i> {state.hasRadar ? 'Ulangi Pre-Test' : 'Mulai Pre-Test'}
            </button>
          </div>
          <div className="panel" style={{ padding: '24px' }}>
            <div className="radar-hub-grid">
              <div className="radar-chart-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Radar data={radarData} options={radarOptions} />
              </div>
              <div>
                <div className="radar-pillar-list">
                  <div>
                    <div className="pillar-item-label" style={{ color: 'var(--indigo)' }}>
                      <span><i className="fa-solid fa-brain mr-1"></i> Pemahaman Dasar</span>
                      <strong>{state.radar[0]}%</strong>
                    </div>
                    <div className="pillar-item-track">
                      <div className="pillar-item-fill" style={{ width: `${state.radar[0]}%`, background: 'var(--indigo)' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="pillar-item-label" style={{ color: 'var(--teal)' }}>
                      <span><i className="fa-solid fa-shield-halved mr-1"></i> Etika &amp; Keamanan</span>
                      <strong>{state.radar[1]}%</strong>
                    </div>
                    <div className="pillar-item-track">
                      <div className="pillar-item-fill" style={{ width: `${state.radar[1]}%`, background: 'var(--teal)' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="pillar-item-label" style={{ color: 'var(--amber)' }}>
                      <span><i className="fa-solid fa-terminal mr-1"></i> Prompting</span>
                      <strong>{state.radar[2]}%</strong>
                    </div>
                    <div className="pillar-item-track">
                      <div className="pillar-item-fill" style={{ width: `${state.radar[2]}%`, background: 'var(--amber)' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="pillar-item-label" style={{ color: 'var(--emerald)' }}>
                      <span><i className="fa-solid fa-magnifying-glass mr-1"></i> Critical Thinking</span>
                      <strong>{state.radar[3]}%</strong>
                    </div>
                    <div className="pillar-item-track">
                      <div className="pillar-item-fill" style={{ width: `${state.radar[3]}%`, background: 'var(--emerald)' }}></div>
                    </div>
                  </div>
                </div>
                <div className="radar-rec">
                  {state.hasRadar
                    ? `Skor rata-rata kecakapan kamu adalah ${Math.round(
                        state.radar.reduce((a, b) => a + b, 0) / 4
                      )}%. Pelajari modul rekomendasi untuk meningkatkan pilar terendah.`
                    : 'Lakukan Pre-Test untuk mengukur titik awal kecakapan AI kamu sebelum membuka modul.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-Test Modal */}
      {isRadarModalOpen && (
        <div className="modal-overlay" id="modal-radar">
          <div className="modal-box">
            <div className="modal-head">
              <div className="modal-title">Pre-Test Asesmen Radar</div>
              <button className="modal-close" onClick={() => setRadarModalOpen(false)}>
                ✕
              </button>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', marginBottom: '20px' }}>
              Jawab 8 pertanyaan (skala 1–5) untuk mengkalibrasi radar kecakapan awal kamu.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.84rem' }}>
              {[
                'Saya memahami konsep dasar dan keterbatasan sistem AI.',
                'Saya mengetahui risiko fenomena halusinasi data pada AI.',
                'Saya selalu memeriksa hak cipta sebelum mempublikasikan konten.',
                'Saya tidak pernah memasukkan data rahasia ke dalam prompt publik.',
                'Saya mampu menyusun prompt dengan konteks, instruksi & format jelas.',
                'Saya terbiasa menggunakan teknik few-shot & persona dalam prompting.',
                'Saya selalu melakukan fact-checking terhadap klaim dari AI.',
                'Saya mampu mengenali kejanggalan visual pada foto deepfake.',
              ].map((q, i) => (
                <div key={i}>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    {i + 1}. {q}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={radarAnswers[i]}
                    onChange={(e) => {
                      const newAns = [...radarAnswers];
                      newAns[i] = parseInt(e.target.value);
                      setRadarAnswers(newAns);
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button className="btn-modal-cancel" onClick={() => setRadarModalOpen(false)}>
                Batal
              </button>
              <button className="btn-modal-ok" onClick={handleRadarSubmit}>
                Simpan &amp; Update Radar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}