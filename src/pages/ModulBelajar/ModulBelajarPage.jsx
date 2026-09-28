import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import './ModulBelajarPage.css';
import HandbookReader from './HandbookReader';
import Game1Arena from './Game1Arena';
import ModuleModal from '../../components/ModuleModal/ModuleModal';

export default function ModulBelajarPage() {
  const { state, saveState, showToast, MODULES } = useProgress();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeStep, setActiveStep] = useState(null);
  const [isModuleOpen, setModuleOpen] = useState(false);
  const [activeModId, setActiveModId] = useState(null);
  const [showQuizView, setShowQuizView] = useState(false);
  const [selectedAnsIndex, setSelectedAnsIndex] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState({ show: false, correct: false, msg: '' });

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
    setSearchParams({});
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
        text: `Menuntaskan Kuis Evaluasi ${activeMod.tag}: ${activeMod.title} ⚡`,
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

      {/* 6 MAIN MODULE CARDS */}
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

      {/* MODULE DRAWER MODAL (Dipisah ke komponen ModuleModal) */}
      {activeModule && !activeStep && (
        <ModuleModal 
          activeModule={activeModule}
          doneSteps={doneSteps}
          onClose={() => setSearchParams({})}
          onOpenModule={(id) => openModule(id)}
          onStartStep={(mod, step) => startGamifiedLesson(mod, step)}
        />
      )}

      {/* FULL-SCREEN GAMIFIED 5-QUIZ LESSON OVERLAY */}
      {activeStep && (
        <Game1Arena
          key={activeStep.step?.id}
          activeStep={activeStep}
          onClose={() => setActiveStep(null)}
          onComplete={(stepId) => finishStepAndReward(stepId)}
        />
      )}

      {/* FULL PAGE OVERLAY MODUL (HANDBOOK & EVALUATION QUIZ) */}
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
                            {quizFeedback.correct ? 'Jawaban Tepat! Modul Selesai 🎉' : 'Jawaban Belum Tepat ⚠️'}
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