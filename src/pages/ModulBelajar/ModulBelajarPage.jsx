import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import './ModulBelajarPage.css';

export default function ModulBelajarPage() {
  const navigate = useNavigate();
  const { state, saveState, showToast, MODULES } = useProgress();

  const [isModuleOpen, setModuleOpen] = useState(false);
  const [activeModId, setActiveModId] = useState(null);
  const [showQuizView, setShowQuizView] = useState(false);
  const [selectedAnsIndex, setSelectedAnsIndex] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState({ show: false, correct: false, msg: '' });

  const activeMod = MODULES.find((m) => m.id === activeModId);

  const openModule = (id) => {
    setActiveModId(id);
    setShowQuizView(false);
    setSelectedAnsIndex(null);
    setQuizFeedback({ show: false, correct: false, msg: '' });
    setModuleOpen(true);
  };

  const handleQuizSubmit = () => {
    if (selectedAnsIndex === null) return;
    
    const isCorrect = selectedAnsIndex === activeMod.quiz.ans;
    
    if (isCorrect) {
      setQuizFeedback({ show: true, correct: true, msg: 'Jawaban Benar! Modul Selesai!' });
      
      let newDone = [...state.doneModules];
      if (!newDone.includes(activeModId)) newDone.push(activeModId);

      let newBadges = [...state.badges];
      if (state.hasRadar && !newBadges.includes(1)) newBadges.push(1);
      if (newDone.includes(2) && !newBadges.includes(2)) newBadges.push(2);
      if (newDone.includes(3) && !newBadges.includes(3)) newBadges.push(3);
      if (newDone.includes(4) && newDone.includes(5) && !newBadges.includes(4)) newBadges.push(4);
      if (newDone.length === 6 && state.hasRadar && !newBadges.includes(5)) newBadges.push(5);

      saveState({ ...state, doneModules: newDone, badges: newBadges });
      
      setTimeout(() => {
        setModuleOpen(false);
        showToast('Modul selesai! EXP & Gems bertambah.', 'success');
      }, 1500);
    } else {
      setQuizFeedback({
        show: true,
        correct: false,
        msg: 'Jawaban kurang tepat. Coba periksa kembali.',
      });
    }
  };

  return (
    <div className="page-wrap wrap" style={{ paddingTop: '28px' }}>
      <div className="hub-section-head modul-belajar-header">
        <div>
          <h1 className="hub-section-title modul-belajar-title">Modul Belajar Literasi AI</h1>
          <p className="hub-section-sub">6 Modul Silabus Terstruktur dengan Evaluasi Kuis &amp; Reward E-Badge</p>
        </div>
      </div>

      <div className="modul-grid">
        {MODULES.map((mod) => {
          const isDone = state.doneModules.includes(mod.id);
          return (
            <div
              key={mod.id}
              className={`mod-carousel-card mod-card-theme-${mod.id}`}
              onClick={() => openModule(mod.id)}
            >
              <div className="mod-card-level">{mod.id}</div>
              <div className="mod-card-icon" style={{ background: mod.iconBg }}>
                <i className={`fa-solid ${mod.icon}`}></i>
              </div>
              <div className="mod-card-title">{mod.title}</div>
              <div className="mod-card-desc">{mod.topics}</div>
              <div className="mod-card-footer">
                <button className={`mod-card-btn ${isDone ? 'done' : ''}`}>
                  {isDone ? (
                    <>
                      <i className="fa-solid fa-circle-check"></i> Selesai
                    </>
                  ) : (
                    <>
                      Mulai Belajar <i className="fa-solid fa-arrow-right"></i>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* FULL PAGE OVERLAY (Menggantikan Modal Popup) */}
      {isModuleOpen && activeMod && (
        <div className="fp-container">
          
          {/* Header Aplikasi (Mirip mockup) */}
          <header className="fp-header">
            <div className="fp-header-left">
              <h1 className="fp-header-title">Deepfake Lab: Module {activeMod.id}01</h1>
            </div>
            <button className="fp-close-btn" onClick={() => setModuleOpen(false)} aria-label="Close">
              <span className="material-symbols-outlined"><i className="fa-solid fa-xmark"></i></span>
            </button>
          </header>

          {/* Canvas Konten Utama */}
          <main className="fp-main">
            <div className="fp-content-wrapper">
              
              {!showQuizView ? (
                // --- TAMPILAN MATERI BELAJAR ---
                <div className="fp-view-section">
                  <div className="fp-heading-area">
                    <h2 className="fp-section-title">{activeMod.title}</h2>
                    <p className="fp-section-subtitle">{activeMod.topics}</p>
                  </div>
                  <div 
                    className="fp-reading-content"
                    dangerouslySetInnerHTML={{ __html: activeMod.reading }}
                  ></div>
                </div>
              ) : (
                // --- TAMPILAN KUIS (Desain Baru) ---
                <div className="fp-view-section">
                  <div className="fp-heading-area">
                    <h2 className="fp-section-title">Kuis Evaluasi</h2>
                    <p className="fp-section-subtitle">Uji Pemahaman Topik</p>
                  </div>
                  
                  <div className="fp-quiz-question">
                    <h3>{activeMod.quiz.q}</h3>
                  </div>

                  <div className="fp-quiz-options">
                    {activeMod.quiz.opts.map((opt, i) => (
                      <label 
                        key={i} 
                        className={`fp-quiz-option-card ${selectedAnsIndex === i ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedAnsIndex(i);
                          setQuizFeedback({ show: false }); // Reset error kalau milih opsi lain
                        }}
                      >
                        <input className="sr-only" name="quiz_answer" type="radio" value={i} />
                        <span className="fp-quiz-option-text">{opt}</span>
                      </label>
                    ))}
                  </div>

                  {/* Feedback Box Inline */}
                  {quizFeedback.show && (
                    <div className={`fp-quiz-feedback ${quizFeedback.correct ? 'correct' : 'wrong'}`}>
                      <i className={`fa-solid ${quizFeedback.correct ? 'fa-circle-check' : 'fa-triangle-exclamation'} mr-2`}></i>
                      {quizFeedback.msg}
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>

          {/* Navigasi Bawah (Bottom Nav Shell) */}
          <nav className="fp-bottom-nav">
            {!showQuizView ? (
              <>
                <button className="btn-fp-nav btn-fp-back" onClick={() => setModuleOpen(false)}>
                  <i className="fa-solid fa-chevron-left"></i> Kembali
                </button>
                <div className="fp-progress-dots">
                  <div className="fp-dot active"></div>
                  <div className="fp-dot"></div>
                </div>
                <button className="btn-fp-nav btn-fp-next" onClick={() => setShowQuizView(true)}>
                  Lanjut Kuis <i className="fa-solid fa-chevron-right"></i>
                </button>
              </>
            ) : (
              <>
                <button className="btn-fp-nav btn-fp-back" onClick={() => setShowQuizView(false)}>
                  <i className="fa-solid fa-chevron-left"></i> Materi
                </button>
                <div className="fp-progress-dots">
                  <div className="fp-dot"></div>
                  <div className="fp-dot active"></div>
                </div>
                <button 
                  className="btn-fp-nav btn-fp-next" 
                  onClick={handleQuizSubmit}
                  disabled={selectedAnsIndex === null || quizFeedback.correct}
                >
                  Submit <i className="fa-solid fa-check ml-1"></i>
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}