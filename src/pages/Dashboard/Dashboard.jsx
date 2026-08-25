import React, { useState, useEffect } from 'react';
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

  const [isPretestViewOpen, setIsPretestViewOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  // Default kosong (null) agar pengguna wajib memilih
  const [radarAnswers, setRadarAnswers] = useState([null, null, null, null, null, null, null, null]);

  // Wajib: Otomatis tampilkan halaman Pre-Test Fullscreen jika pengguna belum menyelesaikan asesmen
  useEffect(() => {
    if (!state.hasRadar) {
      setIsPretestViewOpen(true);
    }
  }, [state.hasRadar]);

  const handleCircleSelect = (questionIndex, val) => {
    const newAns = [...radarAnswers];
    newAns[questionIndex] = val;
    setRadarAnswers(newAns);
  };

  const isAllAnswered = radarAnswers.every((ans) => ans !== null && ans !== undefined);
  const answeredCount = radarAnswers.filter((ans) => ans !== null && ans !== undefined).length;
  const progressPercentage = Math.round((answeredCount / 8) * 100);

  const handleRadarSubmit = () => {
    if (!isAllAnswered) {
      showToast('Harap jawab seluruh 8 pertanyaan sebelum menyimpan.', 'error');
      return;
    }

    const vals = radarAnswers;
    // Skala 1-10 (2 soal per pilar, total maksimum 20 poin = 100%)
    const newRadar = [
      Math.round(((vals[0] + vals[1]) / 20) * 100),
      Math.round(((vals[2] + vals[3]) / 20) * 100),
      Math.round(((vals[4] + vals[5]) / 20) * 100),
      Math.round(((vals[6] + vals[7]) / 20) * 100),
    ];

    let newBadges = [...(state.badges || [])];
    if (!newBadges.includes(1)) newBadges.push(1);

    const newPts = (state.pts || 0) + 50;
    const newLv = Math.floor(newPts / 100) + 1;
    const newExpPct = newPts % 100;

    saveState({
      ...state,
      radar: newRadar,
      hasRadar: true,
      badges: newBadges,
      pts: newPts,
      lv: newLv,
      expPct: newExpPct,
    });

    setIsPretestViewOpen(false);
    showToast('Pre-Test Berhasil Diselesaikan! Radar Readiness & Badge Pionir AI kamu telah aktif.', 'success');
  };

  const avgScore = state.hasRadar
    ? Math.round(state.radar.reduce((a, b) => a + b, 0) / 4)
    : 0;

  const radarData = {
    labels: ['Pemahaman Dasar', 'Etika & Keamanan', 'Prompting', 'Berpikir Kritis'],
    datasets: [
      {
        label: 'Skor Kecakapan Kamu (%)',
        data: state.radar || [0, 0, 0, 0],
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

  const pretestQuestions = [
    { pilar: 'Pemahaman Dasar', q: 'Saya memahami konsep dasar, cara kerja, dan keterbatasan sistem AI.' },
    { pilar: 'Pemahaman Dasar', q: 'Saya mengetahui risiko fenomena halusinasi data dan bias informasi pada AI.' },
    { pilar: 'Etika & Keamanan', q: 'Saya selalu memeriksa hak cipta sebelum mempublikasikan karya buatan AI.' },
    { pilar: 'Etika & Keamanan', q: 'Saya tidak pernah memasukkan data rahasia atau sensitif ke dalam prompt publik.' },
    { pilar: 'Prompting', q: 'Saya mampu menyusun prompt dengan konteks, instruksi, dan format yang jelas.' },
    { pilar: 'Prompting', q: 'Saya terbiasa menggunakan teknik few-shot dan persona dalam prompting.' },
    { pilar: 'Berpikir Kritis', q: 'Saya selalu melakukan fact-checking terhadap klaim dan jawaban dari AI.' },
    { pilar: 'Berpikir Kritis', q: 'Saya mampu mengenali kejanggalan visual pada gambar atau foto deepfake.' },
  ];

  const currentQ = pretestQuestions[currentStep];

  return (
    <div className="dashboard-container" style={{ padding: 0 }}>
      {/* MANDATORY FULLSCREEN PRE-TEST ONBOARDING VIEW (MDQuiz Inspired Layout) */}
      {isPretestViewOpen && (
        <div className="fullscreen-pretest-overlay">
          <div className="pretest-container">
            {/* Top Brand Header */}
            <div className="pretest-brand-header">
              <div className="pretest-brand-logo">
                <i className="fa-solid fa-brain text-indigo"></i> Lit-GO Pre-Test
              </div>
            </div>

            {/* MDQuiz 2-Column Layout */}
            <div className="pretest-mdquiz-layout">
              {/* Left Main Card Area */}
              <div className="pretest-main-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 className="pretest-title-large">AI Readiness Radar</h2>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--indigo)' }}>
                    {progressPercentage}%
                  </span>
                </div>

                {/* Progress Bar Fill Track */}
                <div className="pretest-progress-bar-track">
                  <div className="pretest-progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
                </div>

                {/* Question Header */}
                <div className="pretest-q-header">
                  <span style={{ display: 'block', fontSize: '0.76rem', color: 'var(--indigo)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', marginBottom: '6px' }}>
                    Pertanyaan {currentStep + 1} dari 8 &nbsp;•&nbsp; Pilar: {currentQ.pilar}
                  </span>
                  {currentQ.q}
                </div>

                {/* 1 to 10 Circle Buttons */}
                <div className="pretest-scale-wrapper">
                  <div className="pretest-scale-circles">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <button
                        key={num}
                        type="button"
                        className={`scale-circle-btn ${radarAnswers[currentStep] === num ? 'active' : ''}`}
                        onClick={() => handleCircleSelect(currentStep, num)}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <div className="pretest-scale-labels">
                    <span>1 (Sangat Tidak Setuju)</span>
                    <span>10 (Sangat Setuju)</span>
                  </div>
                </div>

                {/* Navigation Action Buttons */}
                <div className="pretest-nav-actions">
                  <button
                    type="button"
                    className="btn-pretest-nav"
                    onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </button>

                  {currentStep < 7 ? (
                    <button
                      type="button"
                      className="btn-pretest-nav primary"
                      onClick={() => setCurrentStep((prev) => Math.min(7, prev + 1))}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn-pretest-nav primary"
                      onClick={handleRadarSubmit}
                      disabled={!isAllAnswered}
                    >
                      {isAllAnswered ? 'Selesaikan Pre-Test' : `Jawab (${answeredCount}/8)`}
                    </button>
                  )}
                </div>
              </div>

              {/* Right Sidebar Navigator */}
              <div className="pretest-sidebar">
                <div className="pretest-sidebar-card">
                  <div className="pretest-sidebar-score">{progressPercentage}%</div>
                  <div className="pretest-sidebar-sub">
                    Terjawab {answeredCount} dari 8 Pertanyaan
                  </div>
                </div>

                {/* List of 8 Question Pill Buttons */}
                <div className="pretest-nav-pills">
                  {pretestQuestions.map((q, idx) => {
                    const isDone = radarAnswers[idx] !== null && radarAnswers[idx] !== undefined;
                    const isActive = currentStep === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={`pretest-pill-btn ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                        onClick={() => setCurrentStep(idx)}
                      >
                        <span className={`pretest-pill-icon ${isDone ? 'done' : 'pending'}`}>
                          {isDone ? <i className="fa-solid fa-check"></i> : ''}
                        </span>
                        <span>Question {idx + 1}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD OVERVIEW LOBBY */}
      <div className="wrap">
        {/* LOBBY HERO & QUICK LAUNCH CARDS (OVERVIEW DISPLAY) */}
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
                PUSAT LITERASI
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

        {/* AI READINESS RADAR OVERVIEW SECTION */}
        <div className="hub-section">
          <div className="hub-section-head">
            <div>
              <div className="hub-section-title">AI Readiness Radar</div>
              <div className="hub-section-sub">Statistik General Kecakapan Literasi Kecerdasan Buatan Kamu</div>
            </div>
            <button className="btn-lab" onClick={() => { setCurrentStep(0); setIsPretestViewOpen(true); }}>
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
                    <span className="radar-left-val">{state.radar[0]}%</span>
                  </div>
                  <div className="radar-left-item">
                    <span className="radar-left-name">
                      <span className="radar-left-dot" style={{ background: '#14B8A6' }}></span> Etika &amp; Keamanan
                    </span>
                    <span className="radar-left-val">{state.radar[1]}%</span>
                  </div>
                  <div className="radar-left-item">
                    <span className="radar-left-name">
                      <span className="radar-left-dot" style={{ background: '#F59E0B' }}></span> Prompting
                    </span>
                    <span className="radar-left-val">{state.radar[2]}%</span>
                  </div>
                  <div className="radar-left-item">
                    <span className="radar-left-name">
                      <span className="radar-left-dot" style={{ background: '#10B981' }}></span> Critical Thinking
                    </span>
                    <span className="radar-left-val">{state.radar[3]}%</span>
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
                      <div className="donut-score-text">{state.hasRadar ? `${avgScore}%` : '0%'}</div>
                      <div className="donut-label">Skor Rata-rata 4 Pilar</div>
                    </div>
                  </div>

                  <div className="radar-right-breakdown">
                    <div className="breakdown-row">
                      <span className="breakdown-title">Pemahaman Dasar</span>
                      <span className="breakdown-score-pill blue">{state.radar[0]}%</span>
                    </div>
                    <div className="breakdown-row">
                      <span className="breakdown-title">Etika &amp; Keamanan</span>
                      <span className="breakdown-score-pill teal">{state.radar[1]}%</span>
                    </div>
                    <div className="breakdown-row">
                      <span className="breakdown-title">Prompting</span>
                      <span className="breakdown-score-pill amber">{state.radar[2]}%</span>
                    </div>
                    <div className="breakdown-row">
                      <span className="breakdown-title">Critical Thinking</span>
                      <span className="breakdown-score-pill emerald">{state.radar[3]}%</span>
                    </div>
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