import { useState, useEffect, useRef } from 'react';
import { useProgress } from '../../context/ProgressContext';
import './PretestModal.css';

const PRETEST_QUESTIONS = [
  { pilar: 'Pemahaman Dasar', q: 'Saya memahami konsep dasar, cara kerja, dan keterbatasan sistem AI.' },
  { pilar: 'Pemahaman Dasar', q: 'Saya mengetahui risiko fenomena halusinasi data dan bias informasi pada AI.' },
  { pilar: 'Etika & Keamanan', q: 'Saya selalu memeriksa hak cipta sebelum mempublikasikan karya buatan AI.' },
  { pilar: 'Etika & Keamanan', q: 'Saya tidak pernah memasukkan data rahasia atau sensitif ke dalam prompt publik.' },
  { pilar: 'Prompting', q: 'Saya mampu menyusun prompt dengan konteks, instruksi, dan format yang jelas.' },
  { pilar: 'Prompting', q: 'Saya terbiasa menggunakan teknik few-shot dan persona dalam prompting.' },
  { pilar: 'Berpikir Kritis', q: 'Saya selalu melakukan fact-checking terhadap klaim dan jawaban dari AI.' },
  { pilar: 'Berpikir Kritis', q: 'Saya mampu mengenali kejanggalan visual pada gambar atau foto deepfake.' },
];

export default function PretestModal({ isOpen, onClose, canClose = false, onComplete }) {
  const { state, saveState, showToast } = useProgress();

  const [currentStep, setCurrentStep] = useState(0);
  const [radarAnswers, setRadarAnswers] = useState([null, null, null, null, null, null, null, null]);

  const autoNextTimerRef = useRef(null);

  // Clear pending timer on unmount or close
  useEffect(() => {
    return () => {
      if (autoNextTimerRef.current) {
        clearTimeout(autoNextTimerRef.current);
      }
    };
  }, []);

  if (!isOpen) return null;

  const currentQ = PRETEST_QUESTIONS[currentStep];
  const answeredCount = radarAnswers.filter((ans) => ans !== null && ans !== undefined).length;
  const progressPercentage = Math.round((answeredCount / 8) * 100);
  const isAllAnswered = answeredCount === 8;

  const clearPendingTimer = () => {
    if (autoNextTimerRef.current) {
      clearTimeout(autoNextTimerRef.current);
      autoNextTimerRef.current = null;
    }
  };

  const handleSelectAnswer = (num) => {
    clearPendingTimer();

    const newAnswers = [...radarAnswers];
    newAnswers[currentStep] = num;
    setRadarAnswers(newAnswers);

    // Auto-next logic: move to next question after 350ms
    autoNextTimerRef.current = setTimeout(() => {
      if (currentStep < 7) {
        setCurrentStep((prev) => prev + 1);
      }
    }, 350);
  };

  const handleStepChange = (targetIndex) => {
    clearPendingTimer();
    setCurrentStep(Math.max(0, Math.min(7, targetIndex)));
  };

  const handleSubmit = () => {
    clearPendingTimer();

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

    showToast('Pre-Test Berhasil Diselesaikan! Radar Readiness & Badge Pionir AI kamu telah aktif.', 'success');

    if (onComplete) {
      onComplete();
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fullscreen-pretest-overlay">
      <div className="pretest-container">
        {/* Top Brand Header */}
        <div className="pretest-brand-header">
          <div className="pretest-brand-logo">
            <i className="fa-solid fa-brain"></i>
            <span>Lit-GO Pre-Test</span>
            <span className="pretest-header-badge">AI Readiness Radar</span>
          </div>

          <div className="pretest-header-actions">
            {canClose && (
              <button
                type="button"
                className="pretest-close-btn"
                onClick={() => {
                  clearPendingTimer();
                  onClose();
                }}
                title="Tutup Modal"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>
        </div>

        {/* 2-Column MDQuiz Layout */}
        <div className="pretest-mdquiz-layout">
          {/* Left Main Card */}
          <div className="pretest-main-card">
            <div>
              <div className="pretest-card-top">
                <h2 className="pretest-title-large">AI Readiness Radar</h2>
                <span className="pretest-progress-percent">
                  {progressPercentage}%
                </span>
              </div>

              {/* Progress Bar Track */}
              <div className="pretest-progress-bar-track">
                <div
                  className="pretest-progress-bar-fill"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              {/* Question Header */}
              <div className="pretest-q-meta">
                Pertanyaan {currentStep + 1} dari 8 &nbsp;•&nbsp; Pilar: {currentQ.pilar}
              </div>
              <div key={currentStep} className="pretest-q-header">
                {currentQ.q}
              </div>

              {/* 1 to 10 Scale Circle Buttons */}
              <div className="pretest-scale-wrapper">
                <div className="pretest-scale-circles">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                    const isSelected = radarAnswers[currentStep] === num;
                    return (
                      <button
                        key={num}
                        type="button"
                        className={`scale-circle-btn ${isSelected ? 'active' : ''}`}
                        onClick={() => handleSelectAnswer(num)}
                      >
                        {num}
                      </button>
                    );
                  })}
                </div>
                <div className="pretest-scale-labels">
                  <span>1 (Sangat Tidak Setuju)</span>
                  <span>10 (Sangat Setuju)</span>
                </div>
              </div>
            </div>

            {/* Navigation Action Buttons */}
            <div className="pretest-nav-actions">
              <button
                type="button"
                className="btn-pretest-nav"
                onClick={() => handleStepChange(currentStep - 1)}
                disabled={currentStep === 0}
              >
                <i className="fa-solid fa-arrow-left"></i>
                Previous
              </button>

              {currentStep < 7 ? (
                <button
                  type="button"
                  className="btn-pretest-nav primary"
                  onClick={() => handleStepChange(currentStep + 1)}
                >
                  Next
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-pretest-nav primary"
                  onClick={handleSubmit}
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
              {PRETEST_QUESTIONS.map((q, idx) => {
                const answerVal = radarAnswers[idx];
                const isDone = answerVal !== null && answerVal !== undefined;
                const isActive = currentStep === idx;

                return (
                  <button
                    key={idx}
                    type="button"
                    className={`pretest-pill-btn ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                    onClick={() => handleStepChange(idx)}
                  >
                    <div className="pretest-pill-left">
                      <span className={`pretest-pill-icon ${isDone ? 'done' : 'pending'}`}>
                        {isDone ? <i className="fa-solid fa-check"></i> : (idx + 1)}
                      </span>
                      <span>Pertanyaan {idx + 1}</span>
                    </div>

                    {isDone && (
                      <span className="pretest-pill-score">
                        {answerVal}/10
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
