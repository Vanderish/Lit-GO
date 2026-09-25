import { useState, useEffect } from 'react';
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
import './RadarReadiness.css';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

export default function RadarReadinessPage({ embedded = false }) {
  const { state } = useProgress();
  const navigate = useNavigate();
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

  // Skor sebelumnya & Delta Progres
  const prevAvgScore = typeof state?.previousAvgScore === 'number' ? state.previousAvgScore : null;
  const scoreDelta = (hasRadar && prevAvgScore !== null) ? (avgScore - prevAvgScore) : null;

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
    {
      icon: 'fa-regular fa-circle-check',
      label: 'SKOR KUMULATIF',
      valMain: hasRadar ? `${avgScore}` : '0',
      valSub: '/100',
      valDelta: scoreDelta !== null && scoreDelta !== 0 ? (scoreDelta > 0 ? `+${scoreDelta}` : `${scoreDelta}`) : null,
      tone: 'indigo',
    },
    {
      icon: 'fa-solid fa-arrow-trend-up',
      label: 'PERSENTIL GLOBAL',
      valMain: getDynamicPercentile(avgScore),
      valSub: '',
      tone: 'emerald',
    },
    {
      icon: 'fa-regular fa-clock',
      label: 'DURASI PENGERJAAN',
      valMain: getDynamicDuration(),
      valSub: '',
      tone: 'amber',
    },
    {
      icon: 'fa-regular fa-star',
      label: 'LEVEL KECAKAPAN',
      valMain: getDynamicLevel(avgScore),
      valSub: '',
      tone: 'purple',
    },
  ];

  const pillarMeta = [
    { id: 0, label: 'Pemahaman Dasar', score: radar[0], color: '#4F46E5', modId: 1, tag: 'Level 1', modTitle: 'Kenalan dengan "Otak" Buatan', icon: 'fa-brain' },
    { id: 1, label: 'Etika & Keamanan', score: radar[1], color: '#10B981', modId: 2, tag: 'Level 2', modTitle: 'Kompas Etika, Keamanan & Privasi', icon: 'fa-shield-halved' },
    { id: 2, label: 'Prompting', score: radar[2], color: '#F59E0B', modId: 3, tag: 'Level 3', modTitle: 'Seni Berbicara dengan Mesin', icon: 'fa-terminal' },
    { id: 3, label: 'Berpikir Kritis', score: radar[3], color: '#EC4899', modId: 4, tag: 'Level 4', modTitle: 'AI sebagai Asisten Produktivitas', icon: 'fa-magnifying-glass' },
  ];

  const sortedPillars = [...pillarMeta].sort((a, b) => b.score - a.score);
  const strongestPillar = sortedPillars[0];
  const weakestPillar = sortedPillars[sortedPillars.length - 1];

  const getInsightContent = () => {
    if (!hasRadar) {
      return {
        title: 'Asesmen Diagnostik Belum Diambil',
        text: 'Ikuti asesmen pre-test 8 pertanyaan untuk memetakan kekuatan kompetensi literasi AI dan mendapatkan arahan belajar yang tepat sasaran.',
        tag: 'Panduan Awal',
        status: 'pending',
      };
    }

    if (weakestPillar.score >= 85) {
      return {
        title: 'Kompetensi Sangat Prima & Merata 🌟',
        text: `Luar biasa! Seluruh 4 pilar literasi AI kamu telah berada di tingkat mahir (${avgScore}%). Pertahankan konsistensi berpikir kritis dan eksplorasi studi kasus mendalam.`,
        tag: 'Tingkat Mahir',
        status: 'mastery',
      };
    }

    return {
      title: `Kekuatan di ${strongestPillar.label}, Peluang di ${weakestPillar.label}`,
      text: `Analisis menunjukkan kamu paling unggul di ${strongestPillar.label} (${strongestPillar.score}%), namun masih memiliki ruang peningkatan di ${weakestPillar.label} (${weakestPillar.score}%). Pelajari modul terkait untuk menyeimbangkan skor radarmu.`,
      tag: 'Rekomendasi Diagnostik',
      status: 'growth',
    };
  };

  const insightData = getInsightContent();

  const pillars = pillarMeta.map((p) => ({
    label: p.label,
    value: p.score,
    color: p.color,
  }));

  const radarData = {
    labels: ['Pemahaman Dasar', 'Etika & Keamanan', 'Prompting', 'Berpikir Kritis'],
    datasets: [
      {
        label: 'Skor Kecakapan Kamu (%)',
        data: radar,
        backgroundColor: 'rgba(99, 102, 241, 0.18)',
        borderColor: '#4F46E5',
        pointBackgroundColor: ['#4F46E5', '#10B981', '#F59E0B', '#EC4899'],
        pointBorderColor: '#FFFFFF',
        pointHoverBackgroundColor: '#FFFFFF',
        pointHoverBorderColor: '#4F46E5',
        pointRadius: 5,
        pointBorderWidth: 2,
        borderWidth: 2.5,
      },
      {
        label: 'Rata-rata Pengguna',
        data: [60, 55, 65, 58],
        backgroundColor: 'rgba(148, 163, 184, 0.08)',
        borderColor: '#94A3B8',
        borderDash: [4, 4],
        pointRadius: 0,
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
        grid: { color: '#E2E8F0', lineWidth: 1 },
        angleLines: { color: '#E2E8F0', lineWidth: 1 },
        ticks: { display: false, stepSize: 20 },
        pointLabels: {
          font: { size: 11, family: 'Plus Jakarta Sans', weight: '700' },
          color: '#1E293B',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          usePointStyle: true,
          pointStyle: 'circle',
          font: { size: 11, family: 'Plus Jakarta Sans', weight: '600' },
          color: '#64748B',
          padding: 12,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.dataset.label}: ${context.parsed.r}%`,
        },
      },
    },
  };

  const content = (
    <div className="hub-section">
      <div className="radar-hub-head">
        <div>
          <h2 className="hub-section-title">AI Readiness Radar</h2>
          <p className="hub-section-sub">Statistik General Kecakapan Literasi Kecerdasan Buatan Kamu</p>
        </div>
        <button className="btn-radar-pretest" onClick={() => setIsPretestViewOpen(true)}>
          <i className="fa-solid fa-rotate-right"></i> {hasRadar ? 'Ulangi Pre-Test' : 'Mulai Pre-Test'}
        </button>
      </div>

      <div className="radar-summary-row">
        {radarSummaryMetrics.map((metric) => (
          <div key={metric.label} className="radar-summary-item">
            <div className={`radar-summary-icon ${metric.tone}`}>
              <i className={metric.icon}></i>
            </div>
            <div className="radar-summary-info">
              <p>{metric.label}</p>
              <strong>
                {metric.valMain}
                {metric.valSub && <span className="radar-val-sub">{metric.valSub}</span>}
              </strong>
              {metric.valDelta && (
                <span className="radar-metric-delta">
                  <i className="fa-solid fa-arrow-trend-up"></i> {metric.valDelta}% vs sebelumnya
                </span>
              )}
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

            <div className="radar-pillar-breakdown">
              {pillars.map((p) => (
                <div key={p.label} className="pillar-row">
                  <span className="pillar-name">{p.label}</span>
                  <div className="pillar-bar-track">
                    <div className="pillar-bar-fill" style={{ width: `${p.value}%`, background: p.color }} />
                  </div>
                  <span className="pillar-score" style={{ color: p.color }}>{p.value}%</span>
                </div>
              ))}
            </div>

            <div className="radar-footnote">
              <span>
                <i className="fa-solid fa-circle" style={{ color: '#10B981', fontSize: '0.45rem', verticalAlign: 'middle', marginRight: '6px' }}></i>
                Kalibrasi standar IEEE &amp; EU AI Act Literacy Framework
              </span>
              <strong>Skala: 0–100%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 3. COHESIVE DIRECTIVE & SMART LEARNING ACTION BANNER */}
      <div className="panel radar-directive-card animate-fade-in">
        <div className="radar-directive-header">
          <div className="radar-directive-title-group">
            <div className="radar-directive-badge-row">
              <img src="/illustrations/mascot_lito_3d.jpg" alt="Lito AI Navigator" className="radar-directive-mascot-avatar" />
              <span className="radar-directive-kicker">
                <i className="fa-solid fa-compass"></i> Arahan Navigator Lito
              </span>
            </div>
            <h3 className="radar-directive-heading">Rencana Aksi Pembelajaran Terarah</h3>
          </div>
          {scoreDelta !== null && scoreDelta !== 0 && (
            <div className={`radar-delta-pill ${scoreDelta > 0 ? 'up' : 'down'}`}>
              <i className={`fa-solid ${scoreDelta > 0 ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down'}`}></i>
              <span>{scoreDelta > 0 ? `+${scoreDelta}%` : `${scoreDelta}%`} vs Pre-Test Terakhir</span>
            </div>
          )}
        </div>

        <div className="radar-directive-grid">
          {/* Left Column: Analytical Assessment Summary */}
          <div className="radar-analysis-pane">
            <p className="radar-analysis-text">
              {hasRadar ? (
                <>
                  Berdasarkan pemetaan radar, pilar <strong style={{ color: strongestPillar.color }}>{strongestPillar.label} ({strongestPillar.score}%)</strong> menjadi kekuatan utama kamu. Untuk mencapai profil kompetensi yang seimbang, prioritaskan penguasaan pada pilar <strong style={{ color: weakestPillar.color }}>{weakestPillar.label} ({weakestPillar.score}%)</strong>.
                </>
              ) : (
                'Selesaikan asesmen awal untuk memetakan kekuatan kompetensi literasi AI dan membuka rekomendasi modul belajar yang terpersonalisasi.'
              )}
            </p>

            {hasRadar && (
              <div className="radar-pinnacle-meters">
                <div className="pinnacle-row top">
                  <div className="pinnacle-icon-wrap" style={{ background: `${strongestPillar.color}15`, color: strongestPillar.color }}>
                    <i className={`fa-solid ${strongestPillar.icon}`}></i>
                  </div>
                  <div className="pinnacle-info">
                    <div className="pinnacle-label-row">
                      <span className="pinnacle-type">Kekuatan Tertinggi</span>
                      <span className="pinnacle-score" style={{ color: strongestPillar.color }}>{strongestPillar.score}%</span>
                    </div>
                    <div className="pinnacle-bar-track">
                      <div className="pinnacle-bar-fill" style={{ width: `${strongestPillar.score}%`, background: strongestPillar.color }}></div>
                    </div>
                  </div>
                </div>

                <div className="pinnacle-row growth">
                  <div className="pinnacle-icon-wrap" style={{ background: `${weakestPillar.color}15`, color: weakestPillar.color }}>
                    <i className={`fa-solid ${weakestPillar.icon}`}></i>
                  </div>
                  <div className="pinnacle-info">
                    <div className="pinnacle-label-row">
                      <span className="pinnacle-type">Fokus Akselerasi</span>
                      <span className="pinnacle-score" style={{ color: weakestPillar.color }}>{weakestPillar.score}%</span>
                    </div>
                    <div className="pinnacle-bar-track">
                      <div className="pinnacle-bar-fill" style={{ width: `${weakestPillar.score}%`, background: weakestPillar.color }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Hero Recommended Course Card */}
          <div className="radar-course-hero-card">
            <div className="course-hero-top">
              <div className="course-hero-badge-group">
                <span className="course-level-tag">{hasRadar ? weakestPillar.tag : 'Level 1'}</span>
                <span className="course-rec-tag">Modul Prioritas</span>
              </div>
              <div className="course-icon-badge" style={{ background: hasRadar ? `${weakestPillar.color}20` : '#EFF6FF', color: hasRadar ? weakestPillar.color : '#2563EB' }}>
                <i className={`fa-solid ${hasRadar ? weakestPillar.icon : 'fa-brain'}`}></i>
              </div>
            </div>

            <div className="course-hero-body">
              <h4 className="course-hero-title">
                {hasRadar ? weakestPillar.modTitle : 'Kenalan dengan "Otak" Buatan'}
              </h4>
              <p className="course-hero-desc">
                {hasRadar
                  ? `Kuasai materi esensial pilar ${weakestPillar.label} melalui 4 langkah latihan interaktif dan selesaikan kuis kelulusan.`
                  : 'Pelajari dasar arsitektur AI, logika token, dan audit halusinasi untuk memulai perjalanan literasi digital kamu.'}
              </p>
            </div>

            <div className="course-hero-footer">
              <button
                type="button"
                className="btn-course-launch"
                onClick={() => navigate(hasRadar ? `/modul-belajar?mod=${weakestPillar.modId}` : '/modul-belajar?mod=1')}
              >
                <span>{hasRadar ? `Perkuat ${weakestPillar.label}` : 'Mulai Modul Fondasi'}</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
              <button
                type="button"
                className="btn-course-catalog-link"
                onClick={() => navigate('/modul-belajar')}
              >
                Jelajahi 6 Modul Kurikulum
              </button>
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