import { useState, useEffect, useRef } from 'react';
import './Game1Arena.css';
import quizBank120 from '../../data/quizBank120.json';

export default function Game1Arena({ activeStep, onClose, onComplete }) {
  const { step, mod } = activeStep;
  const stepId = step?.id || '1-1';
  const [modIdStr, stepNumStr] = stepId.split('-');
  const moduleId = parseInt(modIdStr, 10) || mod?.id || 1;
  const stepIndex = parseInt(stepNumStr, 10) || step?.stepNum || 1;

  // Retrieve 5 quizzes for this module and step from quizBank120
  const modData = quizBank120.find((m) => m.moduleId === moduleId);
  const stepData = modData?.steps?.find((s) => s.stepIndex === stepIndex);
  const quizzes = stepData?.quizzes || [];

  // State management
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [autoNext, setAutoNext] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const autoNextTimerRef = useRef(null);

  // Clear pending timers on unmount
  useEffect(() => {
    return () => {
      if (autoNextTimerRef.current) {
        clearTimeout(autoNextTimerRef.current);
      }
    };
  }, []);

  const currentQuiz = quizzes[quizIdx] || quizzes[0];
  const totalQuizzes = quizzes.length || 5;

  // Progress Bar percentage
  const progressPercent = Math.min(
    100,
    Math.round(((quizIdx + (checked ? 1 : 0)) / totalQuizzes) * 100)
  );

  const handleNextQuestionDirect = (nextIdx) => {
    if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);

    if (nextIdx < totalQuizzes) {
      setQuizIdx(nextIdx);
      setSelectedOption(null);
      setChecked(false);
      setIsCorrect(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleSelectOption = (key) => {
    if (checked) return;
    setSelectedOption(key);

    if (autoNext && currentQuiz) {
      const correct = key === currentQuiz.answerKey;
      setIsCorrect(correct);
      setChecked(true);
      if (correct) {
        setScore((prev) => prev + 1);
        if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
        autoNextTimerRef.current = setTimeout(() => {
          handleNextQuestionDirect(quizIdx + 1);
        }, 1200);
      }
    }
  };

  const handleCheck = () => {
    if (checked || !selectedOption || !currentQuiz) return;

    const correct = selectedOption === currentQuiz.answerKey;
    setIsCorrect(correct);
    setChecked(true);
    if (correct) {
      setScore((prev) => prev + 1);
    }

    if (autoNext && correct) {
      if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
      autoNextTimerRef.current = setTimeout(() => {
        handleNextQuestionDirect(quizIdx + 1);
      }, 1200);
    }
  };

  const handleNextClick = () => {
    if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
    handleNextQuestionDirect(quizIdx + 1);
  };

  const handleFinalClaim = () => {
    onComplete(stepId);
  };

  const avatarImg = (stepIndex % 2 === 1)
    ? '/illustrations/duo_avatar_student.jpg'
    : '/illustrations/duo_avatar_robot.jpg';

  // Completion screen when all 5 quizzes finished
  if (isFinished) {
    const accuracy = Math.round((score / totalQuizzes) * 100);
    return (
      <div className="duo-viewport animate-fade-in" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div
          className="duo-completion-card"
          style={{
            maxWidth: '560px',
            width: '90%',
            background: '#FFFFFF',
            border: '2px solid #E2E8F0',
            borderRadius: '24px',
            padding: '36px 28px',
            textAlign: 'center',
            boxShadow: '0 20px 40px -15px rgba(37, 99, 235, 0.15)',
          }}
        >
          <div
            style={{
              width: '76px',
              height: '76px',
              margin: '0 auto 18px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #FEF08A 0%, #F59E0B 70%, #D97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.2rem',
              color: '#FFFFFF',
              boxShadow: '0 8px 24px rgba(245, 158, 11, 0.35)',
            }}
          >
            <i className="fa-solid fa-trophy"></i>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 800,
              color: '#2563EB',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}
          >
            Modul {moduleId} • Langkah {stepIndex}
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
            Langkah Pembelajaran Tuntas!
          </h2>

          <p style={{ fontSize: '0.92rem', color: '#64748B', maxWidth: '440px', margin: '0 auto 24px', lineHeight: 1.5 }}>
            Selamat! Kamu telah menyelesaikan seluruh <strong>5 Kuis Berbasis Jurnal Ilmiah</strong> untuk topik{' '}
            <em>&quot;{stepData?.stepTitle || step?.title}&quot;</em>.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              marginBottom: '28px',
            }}
          >
            <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '14px', padding: '12px 8px' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1D4ED8' }}>
                {score}/{totalQuizzes}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#60A5FA', fontWeight: 700, textTransform: 'uppercase', marginTop: '2px' }}>
                Akurasi ({accuracy}%)
              </div>
            </div>

            <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '14px', padding: '12px 8px' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669' }}>
                +100
              </div>
              <div style={{ fontSize: '0.72rem', color: '#34D399', fontWeight: 700, textTransform: 'uppercase', marginTop: '2px' }}>
                Gems Lit-GO
              </div>
            </div>

            <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: '14px', padding: '12px 8px' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#7E22CE' }}>
                +50 EXP
              </div>
              <div style={{ fontSize: '0.72rem', color: '#C084FC', fontWeight: 700, textTransform: 'uppercase', marginTop: '2px' }}>
                Penguasaan AI
              </div>
            </div>
          </div>

          <button
            type="button"
            className="duo-btn-continue"
            onClick={handleFinalClaim}
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
              borderBottom: '4px solid #1E40AF',
              color: '#FFFFFF',
              fontSize: '1rem',
              fontWeight: 800,
              borderRadius: '16px',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(37, 99, 235, 0.3)',
            }}
          >
            <i className="fa-solid fa-circle-check mr-2"></i> Klaim Hadiah &amp; Selesai
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="duo-viewport animate-fade-in">
      {/* 1. TOP HEADER BAR */}
      <header className="duo-header">
        <button className="duo-close-btn" onClick={onClose} aria-label="Tutup">
          ✕
        </button>

        <div className="duo-progress-container">
          <div className="duo-progress-track">
            <div className="duo-progress-fill" style={{ width: `${progressPercent}%` }}>
              <div className="duo-progress-highlight"></div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Auto-Next Switch Button */}
          <button
            type="button"
            onClick={() => setAutoNext((prev) => !prev)}
            style={{
              background: autoNext ? '#EFF6FF' : '#F1F5F9',
              border: autoNext ? '1px solid #3B82F6' : '1px solid #CBD5E1',
              color: autoNext ? '#1D4ED8' : '#64748B',
              padding: '5px 10px',
              borderRadius: '999px',
              fontSize: '0.74rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease',
            }}
            title={autoNext ? 'Auto-Next aktif: otomatis lanjut saat benar' : 'Klik untuk mengaktifkan auto-next'}
          >
            <i className={`fa-solid fa-bolt ${autoNext ? 'text-amber-500' : ''}`}></i>
            <span>{autoNext ? 'Auto-Next: ON' : 'Auto-Next: OFF'}</span>
          </button>

          <span style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 800, whiteSpace: 'nowrap' }}>
            Soal {quizIdx + 1} / {totalQuizzes}
          </span>
        </div>
      </header>

      {/* 2. MAIN QUESTION ARENA */}
      <main className="duo-arena-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span className="duo-category-pill">
            <i className="fa-solid fa-award"></i> Kuis #{currentQuiz?.num || quizIdx + 1} • Langkah {stepIndex}
          </span>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#64748B',
              background: '#F8FAFC',
              padding: '3px 8px',
              borderRadius: '6px',
              border: '1px solid #E2E8F0',
            }}
          >
            Rujukan Jurnal
          </span>
        </div>

        <h1 className="duo-question-title" style={{ fontSize: '1.28rem', lineHeight: 1.35 }}>
          {currentQuiz?.question}
        </h1>

        {/* Character Dialogue context card */}
        <div className="duo-dialogue-row" style={{ marginBottom: '14px' }}>
          <div className="duo-avatar-wrap" style={{ width: '56px', height: '56px', borderRadius: '14px' }}>
            <img src={avatarImg} alt="Avatar" className="duo-avatar-img" />
          </div>
          <div className="duo-speech-bubble" style={{ padding: '8px 14px', fontSize: '0.86rem' }}>
            <span>
              Pilih opsi paling tepat berdasarkan temuan riset akademik kurikulum <strong>Lit-GO</strong>:
            </span>
          </div>
        </div>

        {/* 4 Multiple Choice Options (A, B, C, D) */}
        <div className="duo-options-stack">
          {['A', 'B', 'C', 'D'].map((key) => {
            const optText = currentQuiz?.options?.[key];
            if (!optText) return null;

            const isSelected = selectedOption === key;
            const isCorrectOption = key === currentQuiz?.answerKey;

            let cardClass = 'duo-option-card';
            if (checked) {
              if (isCorrectOption) {
                cardClass += ' correct';
              } else if (isSelected && !isCorrectOption) {
                cardClass += ' wrong';
              }
            } else if (isSelected) {
              cardClass += ' selected';
            }

            return (
              <button
                key={key}
                type="button"
                className={cardClass}
                onClick={() => handleSelectOption(key)}
                disabled={checked}
                style={{
                  minHeight: '46px',
                  padding: '10px 14px',
                  fontSize: '0.9rem',
                }}
              >
                <span className="duo-option-num">{key}</span>
                <span className="duo-option-text" style={{ lineHeight: 1.4 }}>
                  {optText}
                </span>
                {checked && isCorrectOption && (
                  <i className="fa-solid fa-circle-check text-emerald" style={{ fontSize: '1.1rem', flexShrink: 0 }}></i>
                )}
                {checked && isSelected && !isCorrectOption && (
                  <i className="fa-solid fa-circle-xmark text-rose" style={{ fontSize: '1.1rem', flexShrink: 0 }}></i>
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Scientific Explanation & Reference Box */}
        {checked && currentQuiz?.explanation && (
          <div
            className="animate-fade-in"
            style={{
              marginTop: '14px',
              padding: '12px 16px',
              background: isCorrect ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.08)',
              border: isCorrect ? '1.5px solid rgba(16, 185, 129, 0.3)' : '1.5px solid rgba(244, 63, 94, 0.3)',
              borderRadius: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <i className={`fa-solid ${isCorrect ? 'fa-lightbulb text-emerald' : 'fa-triangle-exclamation text-rose'}`}></i>
              <span style={{ fontWeight: 800, fontSize: '0.82rem', color: isCorrect ? '#065F46' : '#9F1239' }}>
                Pembahasan &amp; Referensi Ilmiah:
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#334155', margin: 0, lineHeight: 1.45 }}>
              {currentQuiz.explanation}
            </p>
          </div>
        )}
      </main>

      {/* 3. BOTTOM ACTION BAR (DUOLINGO FOOTER) */}
      <footer className={`duo-footer-wrap ${checked ? (isCorrect ? 'correct' : 'wrong') : ''}`}>
        <div className="duo-footer-content">
          {!checked ? (
            <button
              type="button"
              className={`duo-btn-check ${selectedOption ? 'active' : 'disabled'}`}
              disabled={!selectedOption}
              onClick={handleCheck}
            >
              Periksa Jawaban
            </button>
          ) : (
            <>
              <div className="duo-feedback-area">
                <div className="duo-feedback-circle">
                  {isCorrect ? '✓' : '✕'}
                </div>
                <div className="duo-feedback-text-stack">
                  <div className="duo-feedback-headline">
                    {isCorrect ? 'Jawaban Benar! Luar Biasa!' : 'Jawaban Kurang Tepat!'}
                  </div>
                  <div className="duo-feedback-hint" style={{ fontSize: '0.82rem' }}>
                    {isCorrect
                      ? 'Pemahaman teoritis dan rujukannya sangat tepat.'
                      : `Jawaban yang benar adalah Opsi [${currentQuiz?.answerKey}]. Perhatikan pembahasannya.`}
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="duo-btn-continue"
                onClick={handleNextClick}
              >
                {quizIdx + 1 === totalQuizzes ? 'Selesaikan Langkah 🏆' : 'Lanjutkan →'}
              </button>
            </>
          )}
        </div>
      </footer>
    </div>
  );
}
