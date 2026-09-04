import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import { marked } from 'marked';
import './ModulBelajarPage.css';

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
      if (state.hasRadar && !newBadges.includes(1)) newBadges.push(1);
      if (newDone.includes(2) && !newBadges.includes(2)) newBadges.push(2);
      if (newDone.includes(3) && !newBadges.includes(3)) newBadges.push(3);
      if (newDone.includes(4) && newDone.includes(5) && !newBadges.includes(4)) newBadges.push(4);
      if (newDone.length >= 6 && state.hasRadar && !newBadges.includes(5)) newBadges.push(5);

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
    const mod1Done = ['1-1', '1-2', '1-3', '1-4'].every((s) => newDone.includes(s));
    const mod2Done = ['2-1', '2-2', '2-3', '2-4'].every((s) => newDone.includes(s));
    const mod3Done = ['3-1', '3-2', '3-3', '3-4'].every((s) => newDone.includes(s));
    const mod4Done = ['4-1', '4-2', '4-3', '4-4'].every((s) => newDone.includes(s));
    const mod5Done = ['5-1', '5-2', '5-3', '5-4'].every((s) => newDone.includes(s));
    const mod6Done = ['6-1', '6-2', '6-3', '6-4'].every((s) => newDone.includes(s));

    if (mod1Done && !newBadges.includes(1)) newBadges.push(1);
    if (mod2Done && !newBadges.includes(2)) newBadges.push(2);
    if (mod3Done && !newBadges.includes(3)) newBadges.push(3);
    if (mod4Done && mod5Done && !newBadges.includes(4)) newBadges.push(4);
    if (newDone.length === 24 && state.hasRadar && !newBadges.includes(5)) newBadges.push(5);

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

                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--navy)', marginBottom: '4px' }}>
                      {step.title}
                    </div>

                    <div style={{ fontSize: '0.76rem', color: 'var(--text-dim)' }}>
                      {isStepDone ? 'Tuntas (+100 Gems)' : 'Mainkan Game Full-Screen 🖼️ 🎮 →'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FULL-SCREEN 100vw / 100vh DUOLINGO / MIMO / TEBAK GAMBAR OVERLAY */}
      {/* ========================================================================= */}
      {activeStep && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 99999,
            background: '#0F172A',
            color: '#F8FAFC',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              padding: '16px 24px',
              background: '#1E293B',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <button
              onClick={() => setActiveStep(null)}
              style={{ background: 'transparent', border: 'none', color: '#94A3B8', fontSize: '1.3rem', cursor: 'pointer' }}
            >
              ✕
            </button>

            <div style={{ flex: 1, maxWidth: '400px', margin: '0 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 700, color: '#38BDF8', marginBottom: '4px' }}>
                <span>GAMIFIED LESSON &amp; TEBAK GAMBAR</span>
                <span>{activeStep.step.tag}</span>
              </div>
              <div className="pillar-item-track" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <div className="pillar-item-fill" style={{ width: '100%', background: 'linear-gradient(90deg, #10B981, #3B82F6)' }}></div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(245,158,11,0.2)', padding: '6px 12px', borderRadius: '20px', color: '#FBBF24', fontSize: '0.82rem', fontWeight: 700 }}>
              <span>💎</span> +100 Gems
            </div>
          </div>

          {/* Game Arena Body (Center Scrollable) */}
          <div
            style={{
              flex: 1,
              padding: '32px 24px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '850px',
              margin: '0 auto',
              width: '100%',
            }}
          >
            {/* GAME TEBAK GAMBAR AI (RENDERER FOR TYPES: tebakgambar1, tebakgambar2, tebakgambar3, tebakgambar4, tebakgambar5, tebakgambar6) */}
            {activeStep.step.type?.startsWith('tebakgambar') && (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FBBF24', marginBottom: '10px' }}>
                  🖼️ GAME TEBAK GAMBAR LITERASI AI
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '20px' }}>
                  Perhatikan 3 ikon petunjuk visual di bawah dan tebak jawaban yang paling tepat!
                </p>

                {/* Visual Clue Box */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, #1E293B, #0F172A)',
                    border: '2px solid #F59E0B',
                    borderRadius: '20px',
                    padding: '28px',
                    marginBottom: '24px',
                    boxShadow: '0 10px 30px rgba(245,158,11,0.2)',
                  }}
                >
                  <div style={{ fontSize: '3.5rem', display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '12px' }}>
                    {activeStep.step.clueIcons?.map((icon, idx) => (
                      <span key={idx} style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))' }}>{icon}</span>
                    ))}
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FCD34D', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    [CLUE VISUAL]: {activeStep.step.clueText}
                  </div>
                </div>

                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#F8FAFC', marginBottom: '16px', textAlign: 'left' }}>
                  {activeStep.step.q}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  {activeStep.step.opts?.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => setTebakAns(oIdx)}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        background: tebakAns === oIdx ? (oIdx === activeStep.step.ans ? '#10B981' : '#EF4444') : '#1E293B',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <button
                  className="btn-lab"
                  disabled={tebakAns === null}
                  onClick={() => {
                    if (tebakAns === activeStep.step.ans) {
                      finishStepAndReward(activeStep.step.id);
                    } else {
                      setFeedback({ show: true, correct: false, msg: 'Tebakan kurang tepat! Perhatikan ikon petunjuk visual kembali.' });
                    }
                  }}
                  style={{ padding: '12px 28px', fontSize: '0.95rem' }}
                >
                  {tebakAns === activeStep.step.ans ? 'Tebakan Benar! Selesaikan →' : 'Periksa Tebakan Gambar →'}
                </button>
              </div>
            )}

            {/* STEP 1-1: DUOLINGO INTERACTIVE STORY DIALOGUE */}
            {activeStep.step.id === '1-1' && (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🤖</div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38BDF8', marginBottom: '16px' }}>
                  Percakapan Interaktif: Anatomi "Otak" AI
                </h2>

                <div
                  style={{
                    background: '#1E293B',
                    border: '2px solid #3B82F6',
                    borderRadius: '16px',
                    padding: '24px',
                    textAlign: 'left',
                    marginBottom: '24px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                  }}
                >
                  <div style={{ fontWeight: 700, color: '#10B981', marginBottom: '8px' }}>
                    <i className="fa-solid fa-robot mr-2"></i> Tutor AI Lit-GO:
                  </div>
                  <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#F1F5F9' }}>
                    {dialogueIdx === 0 && 'Tahukah kamu? Menurut UNESCO AI Framework (2024), AI berbasis LLM sebenarnya bekerja dengan memprediksi kata berikutnya berbasis statistik probabilitas!'}
                    {dialogueIdx === 1 && 'Artinya, AI tidak memiliki kesadaran sejati. Fenomena paling berbahaya pada AI adalah Halusinasi Data — di mana AI mencetuskan fakta atau nomor UU palsu!'}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                  <button
                    className="btn-lab"
                    onClick={() => {
                      if (dialogueIdx === 0) setDialogueIdx(1);
                      else finishStepAndReward('1-1');
                    }}
                    style={{ padding: '12px 28px', fontSize: '0.95rem' }}
                  >
                    {dialogueIdx === 0 ? 'Lanjutkan Percakapan →' : 'Pahami Fakta & Tuntaskan →'}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 1-2: MIMO CARD MATCHING GAME */}
            {activeStep.step.id === '1-2' && (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#38BDF8', marginBottom: '10px' }}>
                  🎴 Mimo Card Matching Game
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '20px' }}>
                  Pasangkan istilah di sebelah kiri dengan definisinya di sebelah kanan:
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {activeStep.step.pairs.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedLeft(idx)}
                        style={{
                          padding: '16px',
                          borderRadius: '12px',
                          background: selectedLeft === idx ? '#3B82F6' : '#1E293B',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                        }}
                      >
                        {p.left} {matchedPairs[idx] !== undefined ? '✅' : ''}
                      </button>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {activeStep.step.pairs.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (selectedLeft !== null && selectedLeft === idx) {
                            setMatchedPairs({ ...matchedPairs, [idx]: true });
                            setSelectedLeft(null);
                          }
                        }}
                        style={{
                          padding: '16px',
                          borderRadius: '12px',
                          background: matchedPairs[idx] ? '#10B981' : '#1E293B',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                        }}
                      >
                        {p.right}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  className="btn-lab"
                  disabled={Object.keys(matchedPairs).length < 3}
                  onClick={() => finishStepAndReward('1-2')}
                  style={{ padding: '12px 28px', fontSize: '0.95rem' }}
                >
                  {Object.keys(matchedPairs).length >= 3 ? 'Pasangan Cocok! Selesaikan →' : 'Cocokkan 3 Pasangan Kartu'}
                </button>
              </div>
            )}

            {/* STEP 1-4: DUOLINGO BUG HUNTER GAME */}
            {activeStep.step.id === '1-4' && (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#EF4444', marginBottom: '10px' }}>
                  🐛 Duolingo Spot-The-Error Bug Hunter
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '20px' }}>
                  Klik 2 frasa di dalam teks yang kamu curigai sebagai <strong>Halusinasi Hukum AI</strong>!
                </p>

                <div style={{ background: '#1E293B', border: '2px solid #334155', borderRadius: '16px', padding: '24px', lineHeight: 2, fontSize: '1rem', marginBottom: '24px' }}>
                  "Berdasarkan{' '}
                  <span
                    onClick={() => setBugFound({ ...bugFound, b1: !bugFound.b1 })}
                    style={{
                      background: bugFound.b1 ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.1)',
                      border: bugFound.b1 ? '2px solid #EF4444' : '1px solid transparent',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 700,
                      color: bugFound.b1 ? '#FCA5A5' : 'inherit',
                    }}
                  >
                    Pasal 999 UU Literasi Digital 1945
                  </span>
                  , seluruh penggunaan AI di Indonesia wajib dilaporkan ke{' '}
                  <span
                    onClick={() => setBugFound({ ...bugFound, b2: !bugFound.b2 })}
                    style={{
                      background: bugFound.b2 ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.1)',
                      border: bugFound.b2 ? '2px solid #EF4444' : '1px solid transparent',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 700,
                      color: bugFound.b2 ? '#FCA5A5' : 'inherit',
                    }}
                  >
                    Kementerian Kebudayaan Kuno
                  </span>
                  {' '}dengan sanksi pidana."
                </div>

                <button
                  className="btn-lab"
                  disabled={!bugFound.b1 || !bugFound.b2}
                  onClick={() => finishStepAndReward('1-4')}
                  style={{ padding: '12px 28px', fontSize: '0.95rem' }}
                >
                  {bugFound.b1 && bugFound.b2 ? 'Dua Halusinasi Ditemukan! Selesaikan →' : 'Klik 2 Frasa Halusinasi'}
                </button>
              </div>
            )}

            {/* STEP 2-1: DUOLINGO SWIPE BIN GAME */}
            {activeStep.step.id === '2-1' && (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#38BDF8', marginBottom: '10px' }}>
                  📲 Duolingo Data Privacy Shredder Game
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '20px' }}>
                  Pilah item data di bawah menjadi <strong>RAHASIA / SHRED</strong> vs <strong>AMAN UNTUK AI</strong>:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                  {[
                    { id: 'k1', label: 'NIK, Kredensial Password, & Rekam Medis' },
                    { id: 'k2', label: 'Ringkasan Cerita Rakyat & Makalah Umum' },
                  ].map((item) => (
                    <div key={item.id} style={{ background: '#1E293B', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.label}</span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          className="btn-lab-ghost"
                          style={{ background: swipeBinAns[item.id] === 'shred' ? '#EF4444' : 'rgba(255,255,255,0.1)', color: 'white', padding: '6px 12px', fontSize: '0.78rem' }}
                          onClick={() => setSwipeBinAns({ ...swipeBinAns, [item.id]: 'shred' })}
                        >
                          🚫 Rahasia / Destroy
                        </button>
                        <button
                          type="button"
                          className="btn-lab-ghost"
                          style={{ background: swipeBinAns[item.id] === 'safe' ? '#10B981' : 'rgba(255,255,255,0.1)', color: 'white', padding: '6px 12px', fontSize: '0.78rem' }}
                          onClick={() => setSwipeBinAns({ ...swipeBinAns, [item.id]: 'safe' })}
                        >
                          ✅ Aman untuk AI
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="btn-lab"
                  disabled={swipeBinAns.k1 !== 'shred' || swipeBinAns.k2 !== 'safe'}
                  onClick={() => finishStepAndReward('2-1')}
                  style={{ padding: '12px 28px', fontSize: '0.95rem' }}
                >
                  {swipeBinAns.k1 === 'shred' && swipeBinAns.k2 === 'safe' ? 'Pemilahan Benar! Selesaikan →' : 'Pilah Kedua Data di Atas'}
                </button>
              </div>
            )}

            {/* STEP 2-3: DUOLINGO RPG CHOICE TREE */}
            {activeStep.step.id === '2-3' && (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#38BDF8', marginBottom: '10px' }}>
                  ⚖️ RPG Choice Tree: Dilema Etika Kantor
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '20px' }}>
                  Atasan meminta kamu merangkum laporan keuangan rahasia perusahaan menggunakan AI gratisan online:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  {[
                    { id: 1, label: 'A. Unggah 100% file PDF asli tanpa disensor.', ok: false },
                    { id: 2, label: 'B. Anonimkan data sensitif & gunakan AI lokal terenkripsi.', ok: true },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setRpgChoice(opt.id)}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        background: rpgChoice === opt.id ? (opt.ok ? '#10B981' : '#EF4444') : '#1E293B',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <button
                  className="btn-lab"
                  disabled={rpgChoice !== 2}
                  onClick={() => finishStepAndReward('2-3')}
                  style={{ padding: '12px 28px', fontSize: '0.95rem' }}
                >
                  {rpgChoice === 2 ? 'Keputusan Etis Tepat! Selesaikan →' : 'Pilih Keputusan Terbaik'}
                </button>
              </div>
            )}

            {/* STEP 2-4: MIMO STAMPING STUDIO */}
            {(activeStep.step.id === '2-4' || activeStep.step.id === '5-3') && (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10B981', marginBottom: '10px' }}>
                  🎨 Hologram Watermark Stamping Studio
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '20px' }}>
                  Aktifkan 3 Stempel Hologram Transparansi Etis di bawah:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  {[
                    { key: 's1', label: '[AI-Generated Content Label] - Transparansi Buatan AI' },
                    { key: 's2', label: '[Prompt Log Disclosed] - Rekam Instruksi Transparan' },
                    { key: 's3', label: '[No Copyright Infringement] - Bebas Hak Cipta' },
                  ].map((st) => (
                    <label key={st.key} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px', borderRadius: '10px', background: '#1E293B', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}>
                      <input type="checkbox" checked={stampsPlaced[st.key]} onChange={(e) => setStampsPlaced({ ...stampsPlaced, [st.key]: e.target.checked })} style={{ width: '20px', height: '20px' }} />
                      <span>{st.label}</span>
                    </label>
                  ))}
                </div>

                <button
                  className="btn-lab"
                  disabled={!Object.values(stampsPlaced).every(Boolean)}
                  onClick={() => finishStepAndReward(activeStep.step.id)}
                  style={{ padding: '12px 28px', fontSize: '0.95rem' }}
                >
                  {Object.values(stampsPlaced).every(Boolean) ? 'Stempel Etis Terbit! Selesaikan →' : 'Centang 3 Stempel Hologram'}
                </button>
              </div>
            )}

            {/* STEP 3-1: MIMO DRAG-TO-SLOT PROMPT PUZZLE */}
            {activeStep.step.id === '3-1' && (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#6366F1', marginBottom: '10px' }}>
                  🧩 NIST 4-Block Prompt Puzzle Builder
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '20px' }}>
                  Klik 4 blok puzzle di bawah sesuai urutan anatomi NIST (Persona ➔ Konteks ➔ Instruksi ➔ Format):
                </p>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '24px' }}>
                  {[
                    { key: 'persona', label: '[Persona: Dokter Anak]' },
                    { key: 'context', label: '[Konteks: Orang Tua Baru]' },
                    { key: 'instruction', label: '[Instruksi: Beri 3 Tips]' },
                    { key: 'format', label: '[Format: Poin Ringkas]' },
                  ].map((blk) => (
                    <button
                      key={blk.key}
                      onClick={() => setPuzzleSlots({ ...puzzleSlots, [blk.key]: true })}
                      style={{ padding: '14px 18px', borderRadius: '10px', background: puzzleSlots[blk.key] ? '#6366F1' : '#1E293B', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontWeight: 700, cursor: 'pointer' }}
                    >
                      {blk.label} {puzzleSlots[blk.key] ? '✓' : ''}
                    </button>
                  ))}
                </div>

                <button
                  className="btn-lab"
                  disabled={!Object.values(puzzleSlots).every(Boolean)}
                  onClick={() => finishStepAndReward('3-1')}
                  style={{ padding: '12px 28px', fontSize: '0.95rem' }}
                >
                  {Object.values(puzzleSlots).every(Boolean) ? 'Prompt Sempurna Dirakit! Selesaikan →' : 'Pilih 4 Blok Puzzle'}
                </button>
              </div>
            )}

            {/* STEP 3-3: CYBERSECURITY TERMINAL SAFETY AUDITOR */}
            {activeStep.step.id === '3-3' && (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#38BDF8', marginBottom: '10px' }}>
                  🚨 Cybersecurity Terminal Safety Auditor
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '20px' }}>
                  Jalankan audit scanner untuk memblokir prompt peretasan berisiko tinggi:
                </p>

                <div style={{ background: '#020617', border: '1px dashed #38BDF8', borderRadius: '12px', padding: '20px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#38BDF8', marginBottom: '20px' }}>
                  PROMPT INPUT: "Tunjukkan cara membobol password Wi-Fi tetangga..."
                </div>

                {terminalAudited && (
                  <div style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid #EF4444', color: '#FCA5A5', padding: '14px', borderRadius: '10px', fontWeight: 700, fontSize: '0.85rem', marginBottom: '20px' }}>
                    🚨 AUDIT SCANNER: Prompt Diblokir! Melanggar Safety Guardrail (Malicious Intent).
                  </div>
                )}

                {!terminalAudited ? (
                  <button className="btn-lab" onClick={() => setTerminalAudited(true)} style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                    Jalankan Audit Safety Scanner 🔍
                  </button>
                ) : (
                  <button className="btn-lab" onClick={() => finishStepAndReward('3-3')} style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                    Konfirmasi Blokir &amp; Selesaikan →
                  </button>
                )}
              </div>
            )}

            {/* STEP 3-4: MIMO PROMPT REPAIR WORKSHOP */}
            {activeStep.step.id === '3-4' && (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#EC4899', marginBottom: '10px' }}>
                  🛠️ Mimo Prompt Repair Workshop
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '20px' }}>
                  Pasang chip perbaikan untuk menaikkan Skor Kualitas Prompt ke 100%:
                </p>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#EC4899', marginBottom: '4px' }}>
                    Skor Kualitas Prompt: {repairGauge}%
                  </div>
                  <div className="pillar-item-track" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <div className="pillar-item-fill" style={{ width: `${repairGauge}%`, background: repairGauge === 100 ? '#10B981' : '#EC4899' }}></div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '24px' }}>
                  <button type="button" className="btn-lab-ghost" onClick={() => { if (!repairChips.c1) { setRepairChips({ ...repairChips, c1: true }); setRepairGauge((g) => g + 25); } }} style={{ background: repairChips.c1 ? '#EC4899' : 'rgba(255,255,255,0.1)', color: 'white' }}>
                    + Tambahkan Persona (Pakar)
                  </button>
                  <button type="button" className="btn-lab-ghost" onClick={() => { if (!repairChips.c2) { setRepairChips({ ...repairChips, c2: true }); setRepairGauge((g) => g + 25); } }} style={{ background: repairChips.c2 ? '#EC4899' : 'rgba(255,255,255,0.1)', color: 'white' }}>
                    + Tambahkan Format (Tabel)
                  </button>
                  <button type="button" className="btn-lab-ghost" onClick={() => { if (!repairChips.c3) { setRepairChips({ ...repairChips, c3: true }); setRepairGauge((g) => g + 30); } }} style={{ background: repairChips.c3 ? '#EC4899' : 'rgba(255,255,255,0.1)', color: 'white' }}>
                    + Batasan Anti-Bias
                  </button>
                </div>

                <button className="btn-lab" disabled={repairGauge < 100} onClick={() => finishStepAndReward('3-4')} style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                  {repairGauge >= 100 ? 'Prompt 100% Sempurna! Selesaikan →' : 'Capai Skor 100%'}
                </button>
              </div>
            )}

            {/* STEP 4-2: MIMO TILE REORDER GAME */}
            {activeStep.step.id === '4-2' && (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10B981', marginBottom: '10px' }}>
                  🧩 Mimo Tile Reorder Protocol
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '20px' }}>
                  Ketuk ubin protokol di bawah sesuai urutan prioritas verifikasi (1 ➔ 2 ➔ 3):
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  {activeStep.step.checkpoints.map((cp, idx) => {
                    const pos = tileOrder.indexOf(idx);
                    const selected = pos !== -1;

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if (selected) setTileOrder(tileOrder.filter((i) => i !== idx));
                          else setTileOrder([...tileOrder, idx]);
                        }}
                        style={{
                          padding: '16px',
                          borderRadius: '12px',
                          background: selected ? '#3B82F6' : '#1E293B',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span>{cp}</span>
                        {selected && (
                          <span style={{ background: '#10B981', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem' }}>
                            {pos + 1}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <button
                  className="btn-lab"
                  disabled={tileOrder.length < 3}
                  onClick={() => finishStepAndReward('4-2')}
                  style={{ padding: '12px 28px', fontSize: '0.95rem' }}
                >
                  {tileOrder.length >= 3 ? 'Rantai Protokol Tuntas! Selesaikan →' : 'Urutkan 3 Protokol'}
                </button>
              </div>
            )}

            {/* STEP 4-3: SPLIT-SCREEN OUTPUT SLIDER */}
            {activeStep.step.id === '4-3' && (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#38BDF8', marginBottom: '10px' }}>
                  🎚️ Zero-Shot vs Few-Shot Split Slider
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '20px' }}>
                  Geser slider di bawah untuk melihat perbedaan kualitas output tanpa contoh vs dengan contoh:
                </p>

                <input type="range" min="0" max="100" value={splitSliderPos} onChange={(e) => setSplitSliderPos(parseInt(e.target.value))} style={{ width: '100%', marginBottom: '20px', accentColor: '#38BDF8' }} />

                <div style={{ background: '#1E293B', borderRadius: '12px', padding: '20px', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '24px' }}>
                  {splitSliderPos < 50 ? (
                    <div>
                      <strong style={{ color: '#EF4444' }}>Zero-Shot Output:</strong> Teks abstrak, umum, dan berisiko halusinasi tinggi.
                    </div>
                  ) : (
                    <div>
                      <strong style={{ color: '#10B981' }}>Few-Shot Output:</strong> Teks 70% lebih presisi, akurat, dan sesuai kebutuhan.
                    </div>
                  )}
                </div>

                <button className="btn-lab" onClick={() => finishStepAndReward('4-3')} style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                  Pahami Perbedaan &amp; Selesaikan →
                </button>
              </div>
            )}

            {/* STEP 5-2: ACADEMIC INTEGRITY CITATION STUDIO */}
            {activeStep.step.id === '5-2' && (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10B981', marginBottom: '10px' }}>
                  📜 UNESCO Academic Integrity Citation Studio
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '20px' }}>
                  Isikan judul karya untuk menerbitkan pernyataan transparansi akademis UNESCO:
                </p>

                <input type="text" className="form-input" placeholder="Judul Tugas / Karya Tulis Kamu" value={citationTitle} onChange={(e) => setCitationTitle(e.target.value)} style={{ marginBottom: '16px', background: '#1E293B', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }} />

                {citationDone && (
                  <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid #10B981', borderRadius: '12px', padding: '16px', fontSize: '0.85rem', lineHeight: 1.6, color: '#A7F3D0', marginBottom: '20px' }}>
                    <strong>DEKLARASI ETIKA AI UNESCO:</strong><br/>
                    "Karya <i>'{citationTitle || 'Tugas AI'}'</i> disusun dengan AI sebatas alat bantu brainstorm tanpa plagiarisme."
                  </div>
                )}

                {!citationDone ? (
                  <button className="btn-lab" disabled={!citationTitle} onClick={() => setCitationDone(true)} style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                    Terbitkan Deklarasi Etis 📜
                  </button>
                ) : (
                  <button className="btn-lab" onClick={() => finishStepAndReward('5-2')} style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                    Selesaikan Step Integritas →
                  </button>
                )}
              </div>
            )}

            {/* STEP 6-1: DUOLINGO COCKPIT STEERING WHEEL */}
            {activeStep.step.id === '6-1' && (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10B981', marginBottom: '10px' }}>
                  ✈️ Pilot vs Copilot Cockpit Console
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '20px' }}>
                  Petakan tugas mana yang wajib dipimpin <strong>MANUSIA (PILOT)</strong> vs <strong>AI (COPILOT)</strong>:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  {[
                    { id: 'w1', label: 'Evaluasi Etis & Keputusan Moral Akhir' },
                    { id: 'w2', label: 'Otomatisasi Draf Email & Merapikan Teks' },
                  ].map((item) => (
                    <div key={item.id} style={{ background: '#1E293B', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.label}</span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button type="button" className="btn-lab-ghost" style={{ background: cockpitWheel[item.id] === 'pilot' ? '#10B981' : 'rgba(255,255,255,0.1)', color: 'white', padding: '6px 12px', fontSize: '0.78rem' }} onClick={() => setCockpitWheel({ ...cockpitWheel, [item.id]: 'pilot' })}>
                          🧑‍✈️ Manusia (Pilot)
                        </button>
                        <button type="button" className="btn-lab-ghost" style={{ background: cockpitWheel[item.id] === 'copilot' ? '#3B82F6' : 'rgba(255,255,255,0.1)', color: 'white', padding: '6px 12px', fontSize: '0.78rem' }} onClick={() => setCockpitWheel({ ...cockpitWheel, [item.id]: 'copilot' })}>
                          🤖 AI (Copilot)
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="btn-lab" disabled={cockpitWheel.w1 !== 'pilot' || cockpitWheel.w2 !== 'copilot'} onClick={() => finishStepAndReward('6-1')} style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                  {cockpitWheel.w1 === 'pilot' && cockpitWheel.w2 === 'copilot' ? 'Kemudi Tepat! Selesaikan →' : 'Petakan Kedua Tugas'}
                </button>
              </div>
            )}

            {/* STEP 6-2: MIMO EQUALIZER RATING SLIDERS */}
            {activeStep.step.id === '6-2' && (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#F59E0B', marginBottom: '10px' }}>
                  🎛️ Human-AI Skill Matrix Equalizer
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '20px' }}>
                  Kalibrasikan perbandingan keunggulan manusia vs AI pada slider equalizer:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: '#10B981', marginBottom: '4px' }}>
                      <span>Empati &amp; Moralitas Manusia</span>
                      <span>{equalizerValues.empathy}%</span>
                    </div>
                    <input type="range" min="50" max="100" value={equalizerValues.empathy} onChange={(e) => setEqualizerValues({ ...equalizerValues, empathy: parseInt(e.target.value) })} style={{ width: '100%', accentColor: '#10B981' }} />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: '#38BDF8', marginBottom: '4px' }}>
                      <span>Pemikiran Kritis (Fact-Checking)</span>
                      <span>{equalizerValues.critical}%</span>
                    </div>
                    <input type="range" min="50" max="100" value={equalizerValues.critical} onChange={(e) => setEqualizerValues({ ...equalizerValues, critical: parseInt(e.target.value) })} style={{ width: '100%', accentColor: '#38BDF8' }} />
                  </div>
                </div>

                <button className="btn-lab" onClick={() => finishStepAndReward('6-2')} style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                  Simpan Kalibrasi Equalizer →
                </button>
              </div>
            )}

            {/* STEP 6-4: DUOLINGO SIGNATURE PAD & PLEDGE CEREMONY */}
            {activeStep.step.id === '6-4' && (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#F59E0B', marginBottom: '10px' }}>
                  🏆 Digital Signature &amp; Pledge Ceremony
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '16px' }}>
                  Ketikkan nama &amp; centang 3 ikrar etika digital untuk mengklaim E-Badge Cendekia Digital:
                </p>

                <input type="text" className="form-input" placeholder="Nama Lengkap Penandatangan" value={sigName} onChange={(e) => setSigName(e.target.value)} style={{ marginBottom: '16px', background: '#1E293B', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left', marginBottom: '24px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.83rem', color: '#CBD5E1' }}>
                    <input type="checkbox" checked={pledges.p1} onChange={(e) => setPledges({ ...pledges, p1: e.target.checked })} style={{ width: '18px', height: '18px' }} />
                    <span>Saya berjanji selalu melakukan fact-checking terhadap informasi buatan AI.</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.83rem', color: '#CBD5E1' }}>
                    <input type="checkbox" checked={pledges.p2} onChange={(e) => setPledges({ ...pledges, p2: e.target.checked })} style={{ width: '18px', height: '18px' }} />
                    <span>Saya tidak akan menggunakan AI untuk plagiarisme atau fitnah deepfake.</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.83rem', color: '#CBD5E1' }}>
                    <input type="checkbox" checked={pledges.p3} onChange={(e) => setPledges({ ...pledges, p3: e.target.checked })} style={{ width: '18px', height: '18px' }} />
                    <span>Saya menjadikan AI sebagai Copilot dan mempertahankan diri sebagai Pilot utama.</span>
                  </label>
                </div>

                <button className="btn-lab" disabled={!sigName || !Object.values(pledges).every(Boolean)} onClick={() => finishStepAndReward('6-4')} style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                  {sigName && Object.values(pledges).every(Boolean) ? 'Tandatangani & Klaim E-Badge 🏆' : 'Isi Nama & Centang 3 Ikrar'}
                </button>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div
            style={{
              padding: '16px 24px',
              background: '#1E293B',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
              Mode Belajar Full-Screen Gamifikasi Lit-GO &amp; Tebak Gambar
            </div>
            {feedback.show && (
              <span style={{ color: feedback.correct ? '#10B981' : '#EF4444', fontWeight: 700, fontSize: '0.85rem' }}>
                {feedback.msg}
              </span>
            )}
          </div>
        </div>
      )}
    
      {/* FULL PAGE OVERLAY MODUL (MARKDOWN & EVALUATION QUIZ) */}
      {isModuleOpen && activeMod && (
        <div className="fp-container">
          <header className="fp-header">
            <div className="fp-header-left">
              <h1 className="fp-header-title">Lit-GO: {activeMod.tag} - {activeMod.title}</h1>
            </div>
            <button className="fp-close-btn" onClick={() => setModuleOpen(false)} aria-label="Close">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </header>

          <main className="fp-main">
            <div className="fp-content-wrapper">
              {!showQuizView ? (
                <div className="fp-view-section">
                  <div className="fp-heading-area">
                    <h2 className="fp-section-title">{activeMod.title}</h2>
                    <p className="fp-section-subtitle">{activeMod.topics}</p>
                  </div>
                  
                  {/* Konten hasil file Markdown */}
                  <div 
                    className="fp-reading-content"
                    dangerouslySetInnerHTML={{ __html: parsedHtmlContent }}
                  ></div>
                </div>
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
                  Submit Jawaban <i className="fa-solid fa-check ml-1"></i>
                </button>
              </>
            )}
          </nav>
        </div>
      )}

    </div>
  );
}
