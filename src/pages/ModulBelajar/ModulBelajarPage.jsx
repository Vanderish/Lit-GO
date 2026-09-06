import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import { marked } from 'marked';
import './ModulBelajarPage.css';
import HandbookReader from './HandbookReader';
import DuolingoGameArena from './DuolingoGameArena';

// Import file markdown luar menggunakan fitur raw Vite (?raw)
import mdModul1 from '../../content/modul-1.md?raw';
import mdModul2 from '../../content/modul-2.md?raw';
import mdModul3 from '../../content/modul-3.md?raw';
import mdModul4 from '../../content/modul-4.md?raw';
import mdModul5 from '../../content/modul-5.md?raw';
import mdModul6 from '../../content/modul-6.md?raw';

const markdownContents = {
  1: mdModul1,
  2: mdModul2,
  3: mdModul3,
  4: mdModul4,
  5: mdModul5,
  6: mdModul6,
};


export default function ModulBelajarPage() {
  const navigate = useNavigate();
  const { state, saveState, showToast, MODULES } = useProgress();

  const [activeModule, setActiveModule] = useState(null); // Selected module card
  const [activeStep, setActiveStep] = useState(null); // Selected step (triggers Full-Screen Gamified View)
  const [isModuleOpen, setModuleOpen] = useState(false);
  const [activeModId, setActiveModId] = useState(null);
  const [showQuizView, setShowQuizView] = useState(false);
  const [selectedAnsIndex, setSelectedAnsIndex] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState({ show: false, correct: false, msg: '' });
  const [parsedHtmlContent, setParsedHtmlContent] = useState('');

  const activeMod = MODULES.find((m) => m.id === activeModId);

  const openModule = (id) => {
    setActiveModId(id);
    setShowQuizView(false);
    setSelectedAnsIndex(null);
    setQuizFeedback({ show: false, correct: false, msg: '' });

    const rawMarkdown = markdownContents[id] || 'Materi belum tersedia.';
    const htmlContent = marked.parse(rawMarkdown);
    setParsedHtmlContent(htmlContent);

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


  // Duolingo, Mimo, & Tebak Gambar Interactive States
  const [dialogueIdx, setDialogueIdx] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [bugFound, setBugFound] = useState({ b1: false, b2: false });
  const [tileOrder, setTileOrder] = useState([]);
  const [swipeBinAns, setSwipeBinAns] = useState({});
  const [tebakAns, setTebakAns] = useState(null);
  const [rpgChoice, setRpgChoice] = useState(null);
  const [stampsPlaced, setStampsPlaced] = useState({ s1: false, s2: false, s3: false });
  const [puzzleSlots, setPuzzleSlots] = useState({ persona: null, context: null, instruction: null, format: null });
  const [splitSliderPos, setSplitSliderPos] = useState(50);
  const [terminalAudited, setTerminalAudited] = useState(false);
  const [repairGauge, setRepairGauge] = useState(20);
  const [repairChips, setRepairChips] = useState({ c1: false, c2: false, c3: false });
  const [cockpitWheel, setCockpitWheel] = useState({});
  const [equalizerValues, setEqualizerValues] = useState({ empathy: 90, critical: 85, speed: 40 });
  const [citationTitle, setCitationTitle] = useState('');
  const [citationDone, setCitationDone] = useState(false);
  const [sigName, setSigName] = useState('');
  const [pledges, setPledges] = useState({ p1: false, p2: false, p3: false });

  const [feedback, setFeedback] = useState({ show: false, correct: false, msg: '' });

  const doneSteps = state.doneModules || [];

  // Launch Full-Screen Gamified Lesson Overlay
  const startGamifiedLesson = (mod, step) => {
    setActiveStep({ mod, step });
    setFeedback({ show: false, correct: false, msg: '' });
    setDialogueIdx(0);
    setMatchedPairs({});
    setSelectedLeft(null);
    setBugFound({ b1: false, b2: false });
    setTileOrder([]);
    setSwipeBinAns({});
    setTebakAns(null);
    setRpgChoice(null);
    setStampsPlaced({ s1: false, s2: false, s3: false });
    setPuzzleSlots({ persona: null, context: null, instruction: null, format: null });
    setSplitSliderPos(50);
    setTerminalAudited(false);
    setRepairGauge(20);
    setRepairChips({ c1: false, c2: false, c3: false });
    setCockpitWheel({});
    setEqualizerValues({ empathy: 90, critical: 85, speed: 40 });
    setCitationTitle('');
    setCitationDone(false);
    setSigName('');
    setPledges({ p1: false, p2: false, p3: false });
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

    setFeedback({
      show: true,
      correct: true,
      msg: '🎉 LUAR BIASA! Langkah Gamifikasi Tuntas (+100 Gems & EXP)!',
    });

    setTimeout(() => {
      setActiveStep(null);
      showToast('Langkah tuntas! +100 Gems & EXP bertambah.', 'success');
    }, 1200);
  };

  return (
    <div className="page-wrap">
      {/* Top Header */}
      <div style={{ marginBottom: '16px' }}>
        <button
          className="btn-lab-ghost"
          onClick={() => navigate('/dashboard')}
          style={{ padding: '8px 16px', fontSize: '0.85rem', fontWeight: 600 }}
        >
          <i className="fa-solid fa-arrow-left mr-2"></i> Kembali ke Dashboard
        </button>
      </div>

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
              onClick={() => setActiveModule(mod)}
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
        <div className="modal-overlay" id="modal-module-drawer">
          <div className="modal-box" style={{ maxWidth: '720px' }}>
            <div className="modal-head">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: activeModule.iconBg,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.15rem',
                  }}
                >
                  <i className={`fa-solid ${activeModule.icon}`}></i>
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--indigo)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    {activeModule.tag}
                  </span>
                  <div className="modal-title" style={{ fontSize: '1.2rem' }}>
                    {activeModule.title}
                  </div>
                </div>
              </div>
              <button className="modal-close" onClick={() => setActiveModule(null)}>
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', marginBottom: '18px' }}>
              
            {/* Quick Link to Markdown Theory & Quiz */}
            <div style={{ marginBottom: '18px', padding: '14px 18px', background: 'rgba(99, 102, 241, 0.08)', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--navy)' }}>
                  <i className="fa-solid fa-book-open mr-2 text-indigo"></i> Ringkasan Teori &amp; Kuis Evaluasi
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                  Baca materi kurikulum terstruktur dan ikuti kuis evaluasi singkat.
                </div>
              </div>
              <button
                type="button"
                className="btn-lab"
                onClick={() => openModule(activeModule.id)}
                style={{ padding: '8px 16px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
              >
                Buka Materi &amp; Kuis →
              </button>
            </div>

            Pilih salah satu dari <strong>4 Langkah Aktivitas Full-Screen</strong> di bawah ini untuk bermain game interaktif &amp; Tebak Gambar:
            </p>

            {/* 4 Step Cards per Module */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              {activeModule.steps.map((step) => {
                const isStepDone = doneSteps.includes(step.id);
                const stepIcons = {
                  '1-1': 'fa-comments',
                  '1-2': 'fa-diagram-successor',
                  '1-3': 'fa-image',
                  '1-4': 'fa-bug',
                  '2-1': 'fa-sliders',
                  '2-2': 'fa-image',
                  '2-3': 'fa-gamepad',
                  '2-4': 'fa-stamp',
                  '3-1': 'fa-puzzle-piece',
                  '3-2': 'fa-image',
                  '3-3': 'fa-user-shield',
                  '3-4': 'fa-screwdriver-wrench',
                  '4-1': 'fa-image',
                  '4-2': 'fa-layer-group',
                  '4-3': 'fa-table-columns',
                  '4-4': 'fa-stopwatch',
                  '5-1': 'fa-image',
                  '5-2': 'fa-file-signature',
                  '5-3': 'fa-stamp',
                  '5-4': 'fa-diagram-project',
                  '6-1': 'fa-compass',
                  '6-2': 'fa-sliders',
                  '6-3': 'fa-image',
                  '6-4': 'fa-award',
                };

                return (
                  <div
                    key={step.id}
                    onClick={() => startGamifiedLesson(activeModule, step)}
                    style={{
                      padding: '18px',
                      background: isStepDone ? 'rgba(16,185,129,0.04)' : 'var(--bg)',
                      border: isStepDone ? '1px solid rgba(16,185,129,0.3)' : '1px solid var(--line)',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    className="step-card-hover"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          color: 'var(--indigo)',
                        }}
                      >
                        <i className={`fa-solid ${stepIcons[step.id] || 'fa-star'} mr-1`}></i> {step.tag}
                      </span>
                      {isStepDone ? (
                        <i className="fa-solid fa-circle-check text-emerald"></i>
                      ) : (
                        <i className="fa-solid fa-chevron-right text-dim" style={{ fontSize: '0.8rem' }}></i>
                      )}
                    </div>

                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--navy)', marginBottom: isStepDone ? '4px' : '0px' }}>
                      {step.title}
                    </div>

                    {isStepDone && (
                      <div style={{ fontSize: '0.76rem', color: 'var(--emerald)', fontWeight: 600 }}>
                        Tuntas (+100 Gems)
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FULL-SCREEN DUOLINGO GAMIFIED LESSON OVERLAY */}
      {/* ========================================================================= */}
      {activeStep && (
        <DuolingoGameArena
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
                        {activeMod.quiz.opts.map((opt, i) => (
                          <label 
                            key={i} 
                            className={`fp-quiz-option-card ${selectedAnsIndex === i ? 'selected' : ''}`}
                            onClick={() => {
                              setSelectedAnsIndex(i);
                              setQuizFeedback({ show: false, correct: false, msg: '' });
                            }}
                          >
                            <input className="sr-only" name="quiz_answer" type="radio" value={i} readOnly checked={selectedAnsIndex === i} />
                            <span className="fp-quiz-option-text">{opt}</span>
                          </label>
                        ))}
                      </div>

                      {quizFeedback.show && (
                        <div className={`fp-quiz-feedback ${quizFeedback.correct ? 'correct' : 'wrong'}`}>
                          <i className={`fa-solid ${quizFeedback.correct ? 'fa-circle-check' : 'fa-triangle-exclamation'} mr-2`}></i>
                          {quizFeedback.msg}
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
