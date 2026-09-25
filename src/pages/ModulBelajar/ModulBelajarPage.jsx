import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import './ModulBelajarPage.css';
import HandbookReader from './HandbookReader';
import Game1Arena from './Game1Arena';

export default function ModulBelajarPage() {
  const { state, saveState, showToast, MODULES } = useProgress();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeStep, setActiveStep] = useState(null); // Selected step (triggers Full-Screen Gamified View)
  const [isModuleOpen, setModuleOpen] = useState(false);
  const [activeModId, setActiveModId] = useState(null);
  const [showQuizView, setShowQuizView] = useState(false);
  const [selectedAnsIndex, setSelectedAnsIndex] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState({ show: false, correct: false, msg: '' });

  // Sinkronisasi modul aktif via URL query param (?mod=1..6)
  const modIdParam = searchParams.get('mod');
  const activeModule = modIdParam ? MODULES.find((m) => String(m.id) === String(modIdParam)) || null : null;

  useEffect(() => {
    if (modIdParam) {
      const targetMod = MODULES.find((m) => String(m.id) === String(modIdParam));
      if (targetMod && state.lastVisitedModuleId !== targetMod.id) {
        saveState({ ...state, lastVisitedModuleId: targetMod.id });
      }
    }
  }, [modIdParam, MODULES, saveState, state]);

  const activeMod = MODULES.find((m) => m.id === activeModId);

  const openModule = (id) => {
    setActiveModId(id);
    setShowQuizView(false);
    setSelectedAnsIndex(null);
    setQuizFeedback({ show: false, correct: false, msg: '' });
    setModuleOpen(true);
  };

  const handleQuizSubmit = () => {
    if (selectedAnsIndex === null || !activeMod || !activeMod.quiz) return;
    
    const isCorrect = selectedAnsIndex === activeMod.quiz.ans;
    
    if (isCorrect) {
      setQuizFeedback({ show: true, correct: true, msg: 'Jawaban Benar! Modul Selesai!' });
      
      let newDone = [...(state.doneModules || [])];
      if (!newDone.includes(activeModId)) newDone.push(activeModId);

      let newBadges = [...(state.badges || [])];
      const mod1Done = ['1-1', '1-2', '1-3', '1-4'].every((s) => newDone.includes(s)) || newDone.includes(1);
      const mod2Done = ['2-1', '2-2', '2-3', '2-4'].every((s) => newDone.includes(s)) || newDone.includes(2);
      const mod3Done = ['3-1', '3-2', '3-3', '3-4'].every((s) => newDone.includes(s)) || newDone.includes(3);
      const mod4Done = ['4-1', '4-2', '4-3', '4-4'].every((s) => newDone.includes(s)) || newDone.includes(4);
      const mod5Done = ['5-1', '5-2', '5-3', '5-4'].every((s) => newDone.includes(s)) || newDone.includes(5);
      const mod6Done = ['6-1', '6-2', '6-3', '6-4'].every((s) => newDone.includes(s)) || newDone.includes(6);

      if (mod1Done && !newBadges.includes(1)) newBadges.push(1);
      if (mod2Done && !newBadges.includes(2)) newBadges.push(2);
      if (mod3Done && !newBadges.includes(3)) newBadges.push(3);
      if (mod4Done && mod5Done && !newBadges.includes(4)) newBadges.push(4);
      const allModulesDone = mod1Done && mod2Done && mod3Done && mod4Done && mod5Done && mod6Done;
      if (allModulesDone && state.hasRadar && !newBadges.includes(5)) newBadges.push(5);

      const now = Date.now();
      const newAct = {
        id: now,
        text: `Menuntaskan Kuis Evaluasi ${activeMod.tag}: ${activeMod.title} 🎓`,
        icon: 'fa-solid fa-graduation-cap',
        tone: 'indigo',
        time: 'Baru saja',
        timestamp: now,
      };
      const currentActs = Array.isArray(state.activities) ? state.activities : [];

      saveState({ 
        ...state, 
        doneModules: newDone, 
        badges: newBadges,
        activities: [newAct, ...currentActs.slice(0, 9)],
      });
      
      showToast('Kuis Berhasil Diselesaikan! +150 EXP & Modul Tuntas. 🎉', 'success');
      
      setTimeout(() => {
        setModuleOpen(false);
      }, 2500);
    } else {
      setQuizFeedback({
        show: true,
        correct: false,
        msg: 'Jawaban kurang tepat. Coba periksa konsep ilmiah di bawah ini.',
      });
    }
  };


  const doneSteps = state.doneModules || [];

  // Launch Full-Screen Gamified Lesson Overlay
  const startGamifiedLesson = (mod, step) => {
    setActiveStep({ mod, step });
  };

  const finishStepAndReward = (stepId) => {
    let newDone = [...doneSteps];
    if (!newDone.includes(stepId)) {
      newDone.push(stepId);
    }

    let newBadges = [...(state.badges || [])];
    const mod1Done = ['1-1', '1-2', '1-3', '1-4'].every((s) => newDone.includes(s)) || newDone.includes(1);
    const mod2Done = ['2-1', '2-2', '2-3', '2-4'].every((s) => newDone.includes(s)) || newDone.includes(2);
    const mod3Done = ['3-1', '3-2', '3-3', '3-4'].every((s) => newDone.includes(s)) || newDone.includes(3);
    const mod4Done = ['4-1', '4-2', '4-3', '4-4'].every((s) => newDone.includes(s)) || newDone.includes(4);
    const mod5Done = ['5-1', '5-2', '5-3', '5-4'].every((s) => newDone.includes(s)) || newDone.includes(5);
    const mod6Done = ['6-1', '6-2', '6-3', '6-4'].every((s) => newDone.includes(s)) || newDone.includes(6);

    if (mod1Done && !newBadges.includes(1)) newBadges.push(1);
    if (mod2Done && !newBadges.includes(2)) newBadges.push(2);
    if (mod3Done && !newBadges.includes(3)) newBadges.push(3);
    if (mod4Done && mod5Done && !newBadges.includes(4)) newBadges.push(4);
    const allModulesDone = mod1Done && mod2Done && mod3Done && mod4Done && mod5Done && mod6Done;
    if (allModulesDone && state.hasRadar && !newBadges.includes(5)) newBadges.push(5);

    saveState({
      ...state,
      doneModules: newDone,
      badges: newBadges,
    });

    setTimeout(() => {
      setActiveStep(null);
      showToast('Langkah tuntas! +100 Gems & EXP bertambah.', 'success');
    }, 1200);
  };

  return (
    <div className="page-wrap">
      <div className="hub-section-head" style={{ marginBottom: '28px' }}>
        <div>
          <h1 className="hub-section-title" style={{ fontSize: '1.65rem' }}>Modul Belajar Literasi AI</h1>
          <p className="hub-section-sub">
            6 Modul Utama dengan 24 Game Interaktif &amp; Tebak Gambar Full-Screen (Terverifikasi UNESCO, IEEE, &amp; NIST)
          </p>
        </div>
      </div>

      {/* 6 MAIN MODULE CARDS (Grid Layout) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '24px' }}>
        {MODULES.map((mod) => {
          const modTotalSteps = mod.steps.length;
          const modCompletedSteps = mod.steps.filter((s) => doneSteps.includes(s.id)).length;
          const isDone = modCompletedSteps === modTotalSteps;

          return (
            <div
              key={mod.id}
              className={`mod-carousel-card mod-card-theme-${mod.id}`}
              onClick={() => {
                setSearchParams({ mod: String(mod.id) });
                if (state.lastVisitedModuleId !== mod.id) {
                  saveState({ ...state, lastVisitedModuleId: mod.id });
                }
              }}
              style={{ width: '100%', cursor: 'pointer', position: 'relative' }}
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
                      <i className="fa-solid fa-circle-check"></i> Modul Tuntas
                    </>
                  ) : (
                    <>
                      Buka Modul ({modCompletedSteps}/4) <i className="fa-solid fa-arrow-right"></i>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODULE DRAWER MODAL (4 Steps per Module) */}
      {activeModule && !activeStep && (
        <>
          <div aria-hidden="true" className="md-modal-backdrop" onClick={() => setSearchParams({})}></div>
          <div className="md-modal-wrapper">
            <main className="md-modal-box" data-purpose="learning-module-popup">
              <button 
                aria-label="Tutup Popup Modal" 
                className="md-close-btn" 
                type="button"
                onClick={() => setSearchParams({})}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

              <div className="md-grid">
                {/* LEFT PANEL */}
                <aside className="md-left-panel" data-purpose="module-overview-hero">
                  <div className="md-glow-blue"></div>
                  <div className="md-glow-indigo"></div>
                  
                  <div className="md-panel-content">
                    <div className="md-header-flex">
                      <div className="md-icon-box" style={{ background: activeModule.iconBg || 'linear-gradient(to top right, #2563eb, #3b82f6, #6366f1)' }}>
                        <i className={`fa-solid ${activeModule.icon || 'fa-brain'}`}></i>
                      </div>
                      <div>
                        <div className="md-badge-row">
                          <span className="md-badge-level">
                            <span className="md-badge-level-dot"></span>
                            {activeModule.tag || `Modul ${activeModule.id}`}
                          </span>
                          <span className="md-badge-activity">
                            {activeModule.steps.length} Aktivitas
                          </span>
                        </div>
                        <p className="md-subtitle">{activeModule.topics || 'Dasar Kecerdasan Artifisial'}</p>
                      </div>
                    </div>

                    <h1 className="md-title">{activeModule.title}</h1>
                    <p className="md-desc">
                      Jelajahi bagaimana model AI memproses informasi, struktur token, dan mekanisme verifikasi fakta melalui serangkaian simulasi interaktif.
                    </p>

                    <div className="md-progress-widget">
                      <div className="md-progress-top">
                        <span className="md-progress-label">
                          <span className="md-progress-label-dot"></span>
                          Progres Kurikulum
                        </span>
                        <span className="md-progress-value">
                          {activeModule.steps.filter(s => doneSteps.includes(s.id)).length} / {activeModule.steps.length} Selesai
                        </span>
                      </div>
                      <div className="md-progress-bar-bg">
                        <div 
                          className="md-progress-bar-fill" 
                          style={{ width: `${(activeModule.steps.filter(s => doneSteps.includes(s.id)).length / activeModule.steps.length) * 100}%` }}
                        ></div>
                      </div>
                      <div className="md-progress-bottom">
                        <span>Estimasi: 45 Menit</span>
                        <span className="md-progress-status">Tersedia</span>
                      </div>
                    </div>
                  </div>

                  <div className="md-spotlight-card">
                    <div className="md-spotlight-header">
                      <div className="md-spotlight-icon">
                        <i className="fa-solid fa-book-open"></i>
                      </div>
                      <div className="md-spotlight-body">
                        <div className="md-spotlight-title-row">
                          <h2 className="md-spotlight-title">Ringkasan Teori &amp; Kuis</h2>
                          <span className="md-spotlight-tag">Wajib</span>
                        </div>
                        <p className="md-spotlight-desc">
                          Baca materi kurikulum terstruktur dan ikuti kuis evaluasi singkat.
                        </p>
                      </div>
                    </div>
                    <button 
                      className="md-spotlight-btn" 
                      type="button"
                      onClick={() => openModule(activeModule.id)}
                    >
                      <span>Buka Materi &amp; Kuis</span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </aside>

                {/* RIGHT PANEL */}
                <section className="md-right-panel" data-purpose="learning-path-flow">
                  <div>
                    <div className="md-flow-header">
                      <div>
                        <div className="md-flow-tags">
                          <span className="md-flow-tag-main">Alur Interaktif</span>
                        </div>
                        <h2 className="md-flow-title">{activeModule.steps.length} Langkah Aktivitas Full-Screen</h2>
                      </div>
                    </div>

                    <div className="md-steps-list">
                      {activeModule.steps.map((step, idx) => {
                        const isStepDone = doneSteps.includes(step.id);
                        const stepIcons = {
                          '1-1': 'fa-comments', '1-2': 'fa-diagram-successor', '1-3': 'fa-image', '1-4': 'fa-bug',
                          '2-1': 'fa-sliders', '2-2': 'fa-image', '2-3': 'fa-gamepad', '2-4': 'fa-stamp',
                          '3-1': 'fa-puzzle-piece', '3-2': 'fa-image', '3-3': 'fa-user-shield', '3-4': 'fa-screwdriver-wrench',
                          '4-1': 'fa-image', '4-2': 'fa-layer-group', '4-3': 'fa-table-columns', '4-4': 'fa-stopwatch',
                          '5-1': 'fa-image', '5-2': 'fa-file-signature', '5-3': 'fa-stamp', '5-4': 'fa-diagram-project',
                          '6-1': 'fa-compass', '6-2': 'fa-sliders', '6-3': 'fa-image', '6-4': 'fa-award',
                        };

                        return (
                          <article 
                            key={step.id}
                            className={`md-step-card ${isStepDone ? 'done' : ''}`}
                            onClick={() => startGamifiedLesson(activeModule, step)}
                          >
                            <span className="md-step-node">
                              {isStepDone ? <i className="fa-solid fa-check"></i> : `0${idx + 1}`}
                            </span>
                            <div className="md-step-content">
                              <div className="md-step-info">
                                <div className="md-step-tags">
                                  <span className="md-step-tag">
                                    <i className={`fa-solid ${stepIcons[step.id] || 'fa-star'}`}></i>
                                    {step.tag || `Langkah ${step.stepNum}`}
                                  </span>
                                  {isStepDone && (
                                    <span className="md-step-status-tag done">Tuntas</span>
                                  )}
                                </div>
                                <h3 className="md-step-title">{step.title}</h3>
                                {step.desc ? (
                                  <p className="md-step-desc">{step.desc}</p>
                                ) : (
                                  <p className="md-step-desc">Tuntaskan tahapan ini secara berurutan untuk melengkapi poin dan lencana keterampilan.</p>
                                )}
                              </div>
                              
                              <div className="md-step-action">
                                <span className="md-step-badge">
                                  5 Kuis Jurnal
                                </span>
                                <div className="md-step-icon">
                                  {isStepDone ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-chevron-right"></i>}
                                </div>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>

                  <div className="md-footer">
                    <span className="md-footer-version">Modul Interaktif v1.4</span>
                  </div>
                </section>
              </div>
            </main>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* FULL-SCREEN GAMIFIED 5-QUIZ LESSON OVERLAY */}
      {/* Setiap Langkah berisi 5 Kuis Interaktif Berbasis Jurnal Riset (Total 20 per Modul) */}
      {/* ========================================================================= */}
      {activeStep && (
        <Game1Arena
          key={activeStep.step?.id}
          activeStep={activeStep}
          onClose={() => setActiveStep(null)}
          onComplete={(stepId) => finishStepAndReward(stepId)}
        />
      )}

      {/* FULL PAGE OVERLAY MODUL (ILLUSTRATED HANDBOOK & EVALUATION QUIZ) */}
      {isModuleOpen && activeMod && (
        <div className="fp-container">
          <header className="fp-header">
            <div className="fp-header-left">
              <h1 className="fp-header-title">Lit-GO AI Handbook: {activeMod.tag} - {activeMod.title}</h1>
            </div>
            <button className="fp-close-btn" onClick={() => setModuleOpen(false)} aria-label="Close">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </header>

          <main className="fp-main">
            <div className={`fp-content-wrapper ${!showQuizView ? 'handbook-mode' : ''}`}>
              {!showQuizView ? (
                <HandbookReader 
                  moduleId={activeMod.id} 
                  onProceedToQuiz={() => setShowQuizView(true)} 
                  onClose={() => setModuleOpen(false)} 
                />
              ) : (
                <div className="fp-view-section">
                  <div className="fp-heading-area">
                    <h2 className="fp-section-title">Kuis Evaluasi Modul</h2>
                    <p className="fp-section-subtitle">Uji Pemahaman: {activeMod.title}</p>
                  </div>
                  
                  {activeMod.quiz && (
                    <>
                      <div className="fp-quiz-question">
                        <h3>{activeMod.quiz.q}</h3>
                      </div>

                      <div className="fp-quiz-options">
                        {activeMod.quiz.opts.map((opt, i) => {
                          const isSelected = selectedAnsIndex === i;
                          const isCorrectAns = activeMod.quiz.ans === i;
                          let statusClass = '';
                          if (quizFeedback.show) {
                            if (isSelected && !quizFeedback.correct) statusClass = 'is-wrong';
                            if (isCorrectAns) statusClass = 'is-correct';
                          } else if (isSelected) {
                            statusClass = 'selected';
                          }

                          return (
                            <label 
                              key={i} 
                              className={`fp-quiz-option-card ${statusClass}`}
                              onClick={() => {
                                if (quizFeedback.show && quizFeedback.correct) return;
                                setSelectedAnsIndex(i);
                                setQuizFeedback({ show: false, correct: false, msg: '' });
                              }}
                            >
                              <input className="sr-only" name="quiz_answer" type="radio" value={i} readOnly checked={selectedAnsIndex === i} />
                              <span className="fp-quiz-option-text">{opt}</span>
                              {quizFeedback.show && isCorrectAns && (
                                <i className="fa-solid fa-circle-check text-emerald ml-2" style={{ fontSize: '1.2rem', color: '#10B981' }}></i>
                              )}
                              {quizFeedback.show && isSelected && !quizFeedback.correct && (
                                <i className="fa-solid fa-circle-xmark text-red ml-2" style={{ fontSize: '1.2rem', color: '#EF4444' }}></i>
                              )}
                            </label>
                          );
                        })}
                      </div>

                      {quizFeedback.show && (
                        <div className={`fp-quiz-feedback ${quizFeedback.correct ? 'correct' : 'wrong'}`}>
                          <div className="fp-feedback-title">
                            <i className={`fa-solid ${quizFeedback.correct ? 'fa-circle-check' : 'fa-triangle-exclamation'}`}></i>
                            {quizFeedback.correct ? 'Jawaban Tepat! Modul Selesai 🎉' : 'Jawaban Belum Tepat 🤔'}
                          </div>
                          <div className="fp-feedback-expl">
                            {activeMod.quiz.explanation || quizFeedback.msg}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </main>

          {showQuizView && (
            <nav className="fp-bottom-nav">
              <button className="btn-fp-nav btn-fp-back" onClick={() => setShowQuizView(false)}>
                <i className="fa-solid fa-chevron-left"></i> Kembali ke Materi
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
                Submit Jawaban <i className="fa-solid fa-check ml-1"></i>
              </button>
            </nav>
          )}
        </div>
      )}


    </div>
  );
}
