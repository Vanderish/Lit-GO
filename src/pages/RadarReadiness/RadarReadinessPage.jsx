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
import './RadarReadiness.css';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

export default function RadarReadinessPage() {
  const navigate = useNavigate();
  const { state, saveState, showToast } = useProgress();

  const [isPretestViewOpen, setIsPretestViewOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [radarAnswers, setRadarAnswers] = useState([null, null, null, null, null, null, null, null]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    showToast('Radar Readiness berhasil diperbarui!', 'success');
  };

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
      {/* Full-Screen Pre-Test Modal inside Radar Page */}
      {isPretestViewOpen && (
        <div className="fullscreen-pretest-overlay">
          <div className="pretest-container">
            <div className="pretest-brand-header">
              <div className="pretest-brand-logo">
                <i className="fa-solid fa-brain text-indigo"></i> Lit-GO Pre-Test
              </div>
            </div>

            <div className="pretest-mdquiz-layout">
              <div className="pretest-main-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 className="pretest-title-large">AI Readiness Radar</h2>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--indigo)' }}>
                    {progressPercentage}%
                  </span>
                </div>

                <div className="pretest-progress-bar-track">
                  <div className="pretest-progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
                </div>

                <div className="pretest-q-header">
                  <span style={{ display: 'block', fontSize: '0.76rem', color: 'var(--indigo)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', marginBottom: '6px' }}>
                    Pertanyaan {currentStep + 1} dari 8 &nbsp;•&nbsp; Pilar: {currentQ.pilar}
                  </span>
                  {currentQ.q}
                </div>

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

              <div className="pretest-sidebar">
                <div className="pretest-sidebar-card">
                  <div className="pretest-sidebar-score">{progressPercentage}%</div>
                  <div className="pretest-sidebar-sub">
                    Terjawab {answeredCount} dari 8 Pertanyaan
                  </div>
                </div>

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

      {/* DEDICATED RADAR READINESS PAGE CONTENT */}
      <div className="wrap">

        <div className="hub-section-head">
          <div>
            <h1 className="hub-section-title" style={{ fontSize: '1.7rem' }}>AI Readiness Radar</h1>
            <p className="hub-section-sub">Asesmen Mandiri &amp; Diagnostik 4 Pilar Kecakapan Literasi Kecerdasan Buatan</p>
          </div>
          <button className="btn-lab" onClick={() => { setCurrentStep(0); setIsPretestViewOpen(true); }}>
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
