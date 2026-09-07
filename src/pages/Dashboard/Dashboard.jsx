import { useState } from 'react';
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
import PretestModal from '../../components/PretestModal/PretestModal';
import './Dashboard.css';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

export default function Dashboard() {
  const navigate = useNavigate();
  const { state } = useProgress();

  const [isManualPretestOpen, setIsManualPretestOpen] = useState(false);
  const isPretestViewOpen = !state?.hasRadar || isManualPretestOpen;



  const hasRadar = Boolean(state?.hasRadar);
  const radar = Array.isArray(state?.radar) && state.radar.length === 4 ? state.radar : [0, 0, 0, 0];

  const avgScore = hasRadar
    ? Math.round(radar.reduce((a, b) => a + b, 0) / 4)
    : 0;

  const radarData = {
    labels: ['Pemahaman Dasar', 'Etika & Keamanan', 'Prompting', 'Berpikir Kritis'],
    datasets: [
      {
        label: 'Skor Kecakapan Kamu (%)',
        data: radar,
        backgroundColor: 'rgba(99, 102, 241, 0.22)',
        borderColor: '#6366F1',
        pointBackgroundColor: '#818CF8',
        pointBorderColor: '#FFFFFF',
        pointHoverBackgroundColor: '#FFFFFF',
        pointHoverBorderColor: '#6366F1',
        pointRadius: 5,
        borderWidth: 2.5,
      },
      {
        label: 'Target Ideal (%)',
        data: [100, 100, 100, 100],
        backgroundColor: 'rgba(236, 72, 153, 0.03)',
        borderColor: 'rgba(236, 72, 153, 0.35)',
        borderDash: [4, 4],
        pointRadius: 2,
        pointBackgroundColor: '#F43F5E',
        borderWidth: 1.5,
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
          font: { size: 10.5, family: 'Plus Jakarta Sans', weight: 'bold' },
          color: '#1E293B',
        },
      },
    },
    plugins: { legend: { display: false } },
  };

  return (
    <div className="dashboard-container">
      {/* MANDATORY FULLSCREEN PRE-TEST ONBOARDING VIEW */}
      <PretestModal
        isOpen={isPretestViewOpen}
        onClose={() => setIsManualPretestOpen(false)}
        canClose={Boolean(state?.hasRadar)}
        onComplete={() => setIsManualPretestOpen(false)}
      />

      {/* DASHBOARD OVERVIEW LOBBY */}
      <div className="wrap">
        {/* LOBBY HERO & QUICK LAUNCH CARDS (OVERVIEW DISPLAY) */}
        <div className="hub-lobby" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <div className="hub-lobby-flex">

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

          </div>
        </div>

        {/* AI READINESS RADAR OVERVIEW SECTION */}
        <div className="hub-section">
          <div className="hub-section-head">
            <div>
              <div className="hub-section-title">AI Readiness Radar</div>
              <div className="hub-section-sub">Statistik General Kecakapan Literasi Kecerdasan Buatan Kamu</div>
            </div>
            <button className="btn-lab" onClick={() => setIsManualPretestOpen(true)}>
              <i className="fa-solid fa-rotate-right"></i> {state.hasRadar ? 'Ulangi Pre-Test' : 'Mulai Pre-Test'}
            </button>
          </div>

          <div className="panel radar-futuristic-card">
            <div className="radar-futuristic-grid">
              {/* 1. Left Column: Overview Metrics */}
              <div className="radar-left-col">
                <div>
                  <div className="radar-stat-tag">Total Indeks Kecakapan</div>
                  <div className="radar-stat-number">{state.hasRadar ? `${avgScore}%` : '0%'}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--emerald)', fontWeight: 700, marginTop: '4px' }}>
                    <i className="fa-solid fa-circle-check"></i> {state.hasRadar ? 'Asesmen Diselesaikan' : 'Belum Pre-Test'}
                  </div>
                </div>

                <div className="radar-left-list">
                  <div className="radar-left-item">
                    <span className="radar-left-name">
                      <span className="radar-left-dot" style={{ background: '#6366F1' }}></span> Pemahaman
                    </span>
                    <span className="radar-left-val">{radar[0]}%</span>
                  </div>
                  <div className="radar-left-item">
                    <span className="radar-left-name">
                      <span className="radar-left-dot" style={{ background: '#14B8A6' }}></span> Etika &amp; Keamanan
                    </span>
                    <span className="radar-left-val">{radar[1]}%</span>
                  </div>
                  <div className="radar-left-item">
                    <span className="radar-left-name">
                      <span className="radar-left-dot" style={{ background: '#F59E0B' }}></span> Prompting
                    </span>
                    <span className="radar-left-val">{radar[2]}%</span>
                  </div>
                  <div className="radar-left-item">
                    <span className="radar-left-name">
                      <span className="radar-left-dot" style={{ background: '#10B981' }}></span> Critical Thinking
                    </span>
                    <span className="radar-left-val">{radar[3]}%</span>
                  </div>
                </div>
              </div>

              {/* 2. Center Column: Hero Circular Radar Chart */}
              <div className="radar-center-col">
                <div className="radar-circular-backdrop">
                  <Radar data={radarData} options={radarOptions} />
                </div>
              </div>

              {/* 3. Right Column: Performance Breakdown & Donut Ring */}
              <div className="radar-right-col">
                <div className="radar-right-card">
                  <div className="radar-right-donut-wrap">
                    <svg width="68" height="68" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E2E8F0"
                        strokeWidth="3.8"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="url(#donutGradient)"
                        strokeWidth="3.8"
                        strokeDasharray={`${state.hasRadar ? avgScore : 0}, 100`}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="donutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6366F1" />
                          <stop offset="100%" stopColor="#EC4899" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <div>
                      <div className="donut-score-text">{hasRadar ? `${avgScore}%` : '0%'}</div>
                      <div className="donut-label">Skor Rata-rata 4 Pilar</div>
                    </div>
                  </div>

                  <div className="radar-right-breakdown">
                    <div className="breakdown-row">
                      <span className="breakdown-title">Pemahaman Dasar</span>
                      <span className="breakdown-score-pill blue">{radar[0]}%</span>
                    </div>
                    <div className="breakdown-row">
                      <span className="breakdown-title">Etika &amp; Keamanan</span>
                      <span className="breakdown-score-pill teal">{radar[1]}%</span>
                    </div>
                    <div className="breakdown-row">
                      <span className="breakdown-title">Prompting</span>
                      <span className="breakdown-score-pill amber">{radar[2]}%</span>
                    </div>
                    <div className="breakdown-row">
                      <span className="breakdown-title">Critical Thinking</span>
                      <span className="breakdown-score-pill emerald">{radar[3]}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed 4-Pillar Recommendations Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div className="panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(99,102,241,0.12)', color: '#6366F1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-solid fa-brain"></i>
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Pemahaman Dasar</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Skor: {radar[0]}%</span>
                </div>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                Mengukur pemahamanmu tentang definisi AI, sejarah singkat, keterbatasan sistem, dan penanganan halusinasi data.
              </p>
              <button className="btn-back-dashboard" onClick={() => navigate('/modul-belajar')} style={{ width: '100%', marginTop: '16px', fontSize: '0.78rem', justifyContent: 'center' }}>
                Pelajari Modul 1 →
              </button>
            </div>

            <div className="panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(20,184,166,0.12)', color: '#14B8A6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Etika &amp; Keamanan</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Skor: {radar[1]}%</span>
                </div>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                Mengukur kesadaran etika hak cipta, privasi data rahasia, serta kemampuan deteksi rekayasa deepfake visual.
              </p>
              <button className="btn-back-dashboard" onClick={() => navigate('/modul-belajar')} style={{ width: '100%', marginTop: '16px', fontSize: '0.78rem', justifyContent: 'center' }}>
                Pelajari Modul 2 →
              </button>
            </div>

            <div className="panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245,158,11,0.12)', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-solid fa-terminal"></i>
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Prompt Engineering</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Skor: {radar[2]}%</span>
                </div>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                Mengukur kecakapan menyusun instruksi prompt terstruktur dengan konteks, format, persona, dan teknik few-shot.
              </p>
              <button className="btn-back-dashboard" onClick={() => navigate('/modul-belajar')} style={{ width: '100%', marginTop: '16px', fontSize: '0.78rem', justifyContent: 'center' }}>
                Pelajari Modul 3 →
              </button>
            </div>

            <div className="panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(16,185,129,0.12)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Critical Thinking</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Skor: {radar[3]}%</span>
                </div>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                Mengukur kemampuan melatih skeptisisme sehat, melakukan fact-checking, dan mengevaluasi klaim buatan AI.
              </p>
              <button className="btn-back-dashboard" onClick={() => navigate('/modul-belajar')} style={{ width: '100%', marginTop: '16px', fontSize: '0.78rem', justifyContent: 'center' }}>
                Pelajari Modul 6 →
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}