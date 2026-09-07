import { useState, useEffect } from 'react';
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
import './RadarReadiness.css';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

export default function RadarReadinessPage() {
  const { state } = useProgress();

  const [isPretestViewOpen, setIsPretestViewOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          font: { size: 11, family: 'Plus Jakarta Sans', weight: 'bold' },
          color: '#1E293B',
        },
      },
    },
    plugins: { legend: { display: false } },
  };

  return (
    <div className="dashboard-container" style={{ padding: 0 }}>
      {/* Reusable Pre-Test Modal inside Radar Page */}
      <PretestModal
        isOpen={isPretestViewOpen}
        onClose={() => setIsPretestViewOpen(false)}
        canClose={true}
        onComplete={() => setIsPretestViewOpen(false)}
      />

      {/* DEDICATED RADAR READINESS PAGE CONTENT */}
      <div className="wrap">

        <div className="hub-section-head">
          <div>
            <h1 className="hub-section-title" style={{ fontSize: '1.7rem' }}>AI Readiness Radar</h1>
            <p className="hub-section-sub">Asesmen Mandiri &amp; Diagnostik 4 Pilar Kecakapan Literasi Kecerdasan Buatan</p>
          </div>
          <button className="btn-lab" onClick={() => setIsPretestViewOpen(true)}>
            <i className="fa-solid fa-rotate-right"></i> {state.hasRadar ? 'Ulangi Pre-Test' : 'Mulai Pre-Test'}
          </button>
        </div>

        {/* Futuristic General Statistics Card */}
        <div className="panel radar-futuristic-card" style={{ marginBottom: '32px' }}>
          <div className="radar-futuristic-grid">
            {/* Left Column */}
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

            {/* Center Column */}
            <div className="radar-center-col">
              <div className="radar-circular-backdrop">
                <Radar data={radarData} options={radarOptions} />
              </div>
            </div>

            {/* Right Column */}
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
                      stroke="url(#donutGradient2)"
                      strokeWidth="3.8"
                      strokeDasharray={`${state.hasRadar ? avgScore : 0}, 100`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="donutGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
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

      </div>
    </div>
  );
}
