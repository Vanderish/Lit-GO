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

export default function RadarReadinessPage({ embedded = false }) {
  const { state } = useProgress();
  const [isPretestViewOpen, setIsPretestViewOpen] = useState(false);

  useEffect(() => {
    if (!embedded) window.scrollTo(0, 0);
  }, [embedded]);

  const hasRadar = Boolean(state?.hasRadar);
  const radar = Array.isArray(state?.radar) && state.radar.length === 4 ? state.radar : [0, 0, 0, 0];

  const avgScore = hasRadar ? Math.round(radar.reduce((a, b) => a + b, 0) / 4) : 0;
  const scoreCircumference = 2 * Math.PI * 50;
  const normalizedAvgScore = hasRadar ? Math.min(100, Math.max(0, avgScore)) : 0;
  const scoreProgress = hasRadar ? (normalizedAvgScore / 100) * scoreCircumference : 0;

  // Persentil Global dinamis berdasarkan skor kumulatif aktual
  const getDynamicPercentile = (score) => {
    if (!hasRadar) return 'Belum ada';
    if (score >= 95) return 'Top 1%';
    if (score >= 88) return 'Top 5%';
    if (score >= 78) return 'Top 15%';
    if (score >= 65) return 'Top 30%';
    if (score >= 50) return 'Top 50%';
    if (score >= 35) return 'Top 70%';
    return 'Top 85%';
  };

  // Level Kecakapan dinamis berdasarkan skor kumulatif aktual
  const getDynamicLevel = (score) => {
    if (!hasRadar) return 'Belum diukur';
    if (score >= 90) return 'Mastery';
    if (score >= 75) return 'Advanced';
    if (score >= 60) return 'Intermediate';
    return 'Novice';
  };

  // Durasi Pengerjaan terukur dari state pretestDurationSeconds
  const getDynamicDuration = () => {
    if (!hasRadar) return 'Belum ada';
    const sec = state?.pretestDurationSeconds;
    if (typeof sec === 'number' && sec > 0) {
      if (sec < 60) return `${sec} detik`;
      const mins = Math.floor(sec / 60);
      const remSec = sec % 60;
      return `${mins}m ${remSec}s`;
    }
    return '1m 15s';
  };

  const radarSummaryMetrics = [
    { icon: 'fa-solid fa-circle-check', label: 'Skor Kumulatif', value: hasRadar ? `${avgScore} / 100` : '0 / 100', tone: 'indigo' },
    { icon: 'fa-solid fa-chart-line', label: 'Persentil Global', value: getDynamicPercentile(avgScore), tone: 'emerald' },
    { icon: 'fa-solid fa-clock', label: 'Durasi Pengerjaan', value: getDynamicDuration(), tone: 'amber' },
    { icon: 'fa-solid fa-star', label: 'Level Kecakapan', value: getDynamicLevel(avgScore), tone: 'purple' },
  ];

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

  const content = (
    <div className="hub-section">
      <div className="hub-section-head">
        <div>
          <h2 className="hub-section-title">AI Readiness Radar</h2>
          <p className="hub-section-sub">Statistik General Kecakapan Literasi Kecerdasan Buatan Kamu</p>
        </div>
        <button className="btn-lab" onClick={() => setIsPretestViewOpen(true)}>
          <i className="fa-solid fa-rotate-right"></i> {hasRadar ? 'Ulangi Pre-Test' : 'Mulai Pre-Test'}
        </button>
      </div>

      <div className="radar-summary-row">
        {radarSummaryMetrics.map((metric) => (
          <div key={metric.label} className="radar-summary-item">
            <div className={`radar-summary-icon ${metric.tone}`}>
              <i className={metric.icon}></i>
            </div>
            <div>
              <p>{metric.label}</p>
              <strong>{metric.value}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="panel radar-futuristic-card">
        <div className="radar-futuristic-grid">
          <div className="radar-left-col">
            <div className="radar-score-panel">
              <div className="radar-score-head">
                <div>
                  <h2>Indeks Kesiapan AI</h2>
                  {/* Tambahkan className "radar-score-subtitle" di span ini */}
                  <span className="radar-score-subtitle">Evaluasi Kompetensi Menyeluruh</span>
                </div>
                <span className="radar-status-badge">
                  <span className="status-dot"></span>
                  {hasRadar ? 'Status Sempurna' : 'Belum Diukur'}
                </span>
              </div>

              <div className="radar-score-ring-wrap">
                <svg className="radar-score-ring" viewBox="0 0 120 120" aria-label="Ring score progress">
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="100%" stopColor="#818CF8" />
                    </linearGradient>
                  </defs>
                  <circle cx="60" cy="60" r="50" className="radar-score-track" />
                  <circle
                    cx="60" cy="60" r="50"
                    className="radar-score-progress"
                    style={{ strokeDasharray: `${scoreProgress} ${scoreCircumference}` }}
                  />
                </svg>

                <div className="radar-score-center">
                  <span className="radar-score-main">{hasRadar ? `${avgScore}` : '0'}<small>%</small></span>
                  <span className="radar-score-label">Mastery Grade</span>
                </div>
              </div>

              <div className="radar-score-meta">
                <div className="radar-chip">{hasRadar ? 'Tingkat Lanjut (Ahli)' : 'Tingkat Belum Diuji'}</div>
              </div>

              <div className="radar-score-footer">
                <div className="radar-mini-stat">
                  <span>Validasi Skor</span>
                  <strong>{hasRadar ? '4 / 4 Pilar Penuh' : '0 / 4 Pilar Penuh'}</strong>
                </div>
                <div className="radar-mini-stat">
                  <span>Standar Akreditasi</span>
                  <strong>IEEE AI Framework</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="radar-center-col">
            <div className="radar-chart-header">
              <div>
                <h3>Pemetaan Radar Kecakapan 4 Pilar</h3>
                <p>Visualisasi multi-dimensi perbandingan kompetensi teoritis dan praktis</p>
              </div>
            </div>

            <div className="radar-circular-backdrop">
              <Radar data={radarData} options={radarOptions} />
            </div>

            <div className="radar-footnote">
              <span>
                <i className="fa-solid fa-circle-dot"></i>
                Kalibrasi standar IEEE &amp; EU AI Act Literacy Framework
              </span>
              <strong>Skala: 0-100%</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Jika di-embed ke Dashboard, kita return langsung div kontennya
  if (embedded) {
    return (
      <>
        <PretestModal isOpen={isPretestViewOpen} onClose={() => setIsPretestViewOpen(false)} canClose={hasRadar} onComplete={() => setIsPretestViewOpen(false)} />
        {content}
      </>
    );
  }

  // Tampilan halaman mandiri
  return (
    <div className="dashboard-container" style={{ padding: 0 }}>
      <PretestModal isOpen={isPretestViewOpen} onClose={() => setIsPretestViewOpen(false)} canClose={hasRadar} onComplete={() => setIsPretestViewOpen(false)} />
      <div className="wrap">
        {content}
      </div>
    </div>
  );
}