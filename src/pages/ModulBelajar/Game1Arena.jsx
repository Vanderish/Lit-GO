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

  // Timer state
  const [timeLeft, setTimeLeft] = useState(10);
  const timerRef = useRef(null);

  function handleTimeUp() {
    if (checked) return;
    setIsCorrect(false);
    setChecked(true);
    if (autoNext) {
      if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
      autoNextTimerRef.current = setTimeout(() => {
        handleNextQuestionDirect(quizIdx + 1);
      }, 2000); // give a bit more time to read explanation if timed out
    }
  }

  // Timer logic
  useEffect(() => {
    if (isFinished || checked) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizIdx, checked, isFinished]);
  function handleNextQuestionDirect(nextIdx) {
    if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);

    if (nextIdx < totalQuizzes) {
      setQuizIdx(nextIdx);
      setSelectedOption(null);
      setChecked(false);
      setIsCorrect(false);
      setTimeLeft(10);
    } else {
      setIsFinished(true);
    }
  }

  const handleSelectOption = (key) => {
    if (checked) return;
    setSelectedOption(key);

    if (autoNext && currentQuiz) {
      const correct = key === currentQuiz.answerKey;
      setIsCorrect(correct);
      setChecked(true);
      if (timerRef.current) clearInterval(timerRef.current);
      
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
    if (checked || !currentQuiz) return;
    // If no option selected and check is clicked (maybe from time out? Actually button is disabled, but just in case)
    if (!selectedOption && timeLeft > 0) return;

    if (timerRef.current) clearInterval(timerRef.current);
    
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
            Selamat! Kamu telah menyelesaikan seluruh <strong>5 Kuis Pemahaman Materi</strong> untuk topik{' '}
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

  // Define Themes for each Step
  const getThemeConfig = (step) => {
    switch(step) {
      case 1: return { 
        id: 'theme-history', 
        name: 'Sejarah & Arsitektur', 
        icons: ['fa-building-columns', 'fa-scroll', 'fa-monument', 'fa-landmark'] 
      };
      case 2: return { 
        id: 'theme-tech', 
        name: 'Teknologi & AI', 
        icons: ['fa-microchip', 'fa-robot', 'fa-network-wired', 'fa-satellite'] 
      };
      case 3: return { 
        id: 'theme-nature', 
        name: 'Alam & Lingkungan', 
        icons: ['fa-leaf', 'fa-tree', 'fa-earth-americas', 'fa-seedling'] 
      };
      case 4: return { 
        id: 'theme-space', 
        name: 'Antariksa & Cosmos', 
        icons: ['fa-rocket', 'fa-user-astronaut', 'fa-meteor', 'fa-star'] 
      };
      default: return { 
        id: 'theme-history', 
        name: 'Sejarah & Arsitektur', 
        icons: ['fa-building-columns', 'fa-scroll', 'fa-monument', 'fa-landmark'] 
      };
    }
  };

  const themeConfig = getThemeConfig(stepIndex);

  return (
    <div className={`duo-viewport animate-fade-in theme-stack ${themeConfig.id}`}>
      
      {/* Decorative Background Icons */}
      <div className="theme-bg-decorations">
        <i className={`fa-solid ${themeConfig.icons[0]} decor-1`}></i>
        <i className={`fa-solid ${themeConfig.icons[1]} decor-2`}></i>
        <i className={`fa-solid ${themeConfig.icons[2]} decor-3`}></i>
        <i className={`fa-solid ${themeConfig.icons[3]} decor-4`}></i>
      </div>

      {/* 1. TOP HEADER BAR */}
      <header className="duo-header">
        <button className="duo-close-btn" onClick={onClose} aria-label="Tutup">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="duo-progress-container">
          <div className="duo-progress-track">
            <div className="duo-progress-fill" style={{ width: `${progressPercent}%` }}>
              <div className="duo-progress-highlight"></div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className={`quiz-timer ${timeLeft <= 3 ? 'danger' : ''}`}>
            <i className="fa-solid fa-stopwatch"></i> {timeLeft}s
          </div>

          {/* Auto-Next Switch Button */}
          <button
            type="button"
            className={`auto-next-btn ${autoNext ? 'active' : ''}`}
            onClick={() => setAutoNext((prev) => !prev)}
            title={autoNext ? 'Auto-Next aktif' : 'Auto-Next non-aktif'}
          >
            <i className={`fa-solid fa-bolt ${autoNext ? 'text-amber-300' : ''}`}></i>
            <span className="hidden sm:inline">{autoNext ? 'Auto: ON' : 'Auto: OFF'}</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN QUESTION ARENA */}
      <main className="duo-arena-body">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span className="duo-category-pill" style={{ marginBottom: '12px', display: 'inline-block' }}>
            Question {quizIdx + 1} / {totalQuizzes}
          </span>
          <h1 className="duo-question-title" style={{ fontSize: '1.4rem', lineHeight: 1.4, color: '#0F172A', fontWeight: 800 }}>
            {currentQuiz?.question}
          </h1>
        </div>

        {/* Dynamic Layout Options */}
        <div className="duo-options-container">
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
              >
                <div className="opt-indicator">
                  <span className="duo-option-num">{key}</span>
                </div>
                <span className="duo-option-text">
                  {optText}
                </span>
                
                <div className="opt-icon-status">
                  {checked && isCorrectOption && (
                    <i className="fa-solid fa-circle-check text-emerald"></i>
                  )}
                  {checked && isSelected && !isCorrectOption && (
                    <i className="fa-solid fa-circle-xmark text-rose"></i>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Explanation & Reference Box */}
        {checked && currentQuiz?.explanation && (
          <div
            className="animate-fade-in"
            style={{
              marginTop: '24px',
              padding: '16px',
              background: isCorrect ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.08)',
              border: isCorrect ? '1.5px solid rgba(16, 185, 129, 0.3)' : '1.5px solid rgba(244, 63, 94, 0.3)',
              borderRadius: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <i className={`fa-solid ${isCorrect ? 'fa-lightbulb text-emerald' : 'fa-triangle-exclamation text-rose'}`} style={{ fontSize: '1.2rem' }}></i>
              <span style={{ fontWeight: 800, fontSize: '0.9rem', color: isCorrect ? '#065F46' : '#9F1239' }}>
                Pembahasan Modul
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#334155', margin: 0, lineHeight: 1.5 }}>
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
                    {isCorrect ? 'Jawaban Benar! Luar Biasa!' : (!selectedOption ? 'Waktu Habis!' : 'Jawaban Kurang Tepat!')}
                  </div>
                  <div className="duo-feedback-hint" style={{ fontSize: '0.86rem' }}>
                    {isCorrect
                      ? 'Pemahaman konsep modul kamu sudah sangat tepat!'
                      : `Jawaban yang benar adalah Opsi [${currentQuiz?.answerKey}]. Perhatikan pembahasannya.`}
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="duo-btn-continue"
                onClick={handleNextClick}
              >
                {quizIdx + 1 === totalQuizzes ? 'Selesai 🏆' : 'Lanjut →'}
              </button>
            </>
          )}
        </div>
      </footer>
    </div>
  );
}
