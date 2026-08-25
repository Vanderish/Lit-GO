import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';

export default function ModulBelajarPage() {
  const navigate = useNavigate();
  const { state, saveState, showToast, MODULES } = useProgress();

  const [isModuleModalOpen, setModuleModalOpen] = useState(false);
  const [activeModId, setActiveModId] = useState(null);
  const [showQuizView, setShowQuizView] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState({ show: false, correct: false, msg: '' });

  const activeMod = MODULES.find((m) => m.id === activeModId);

  const openModule = (id) => {
    setActiveModId(id);
    setShowQuizView(false);
    setQuizFeedback({ show: false, correct: false, msg: '' });
    setModuleModalOpen(true);
  };

  const answerQuiz = (isCorrect) => {
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
        setModuleModalOpen(false);
        showToast('Modul selesai! EXP & Gems bertambah.', 'success');
      }, 1400);
    } else {
      setQuizFeedback({
        show: true,
        correct: false,
        msg: 'Jawaban kurang tepat. Baca ulang materi dan coba lagi.',
      });
    }
  };

  return (
    <div className="page-wrap">
      {/* Back to Dashboard Button */}
      <div style={{ marginBottom: '16px' }}>
        <button
          className="btn-lab-ghost"
          onClick={() => navigate('/dashboard')}
          style={{ padding: '8px 16px', fontSize: '0.85rem', fontWeight: 600 }}
        >
          <i className="fa-solid fa-arrow-left mr-2"></i> Kembali ke Dashboard
        </button>
      </div>

      <div className="hub-section-head" style={{ marginBottom: '24px' }}>
        <div>
          <h1 className="hub-section-title" style={{ fontSize: '1.6rem' }}>Modul Belajar Literasi AI</h1>
          <p className="hub-section-sub">6 Modul Silabus Terstruktur dengan Evaluasi Kuis &amp; Reward E-Badge</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {MODULES.map((mod) => {
          const isDone = state.doneModules.includes(mod.id);
          return (
            <div
              key={mod.id}
              className={`mod-carousel-card mod-card-theme-${mod.id}`}
              onClick={() => openModule(mod.id)}
              style={{ width: '100%', cursor: 'pointer' }}
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

      {/* Module Modal */}
      {isModuleModalOpen && activeMod && (
        <div className="modal-overlay" id="modal-module">
          <div className="modal-box">
            <div className="modal-head">
              <div>
                <span
                  id="mod-modal-tag"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    background: 'rgba(59,130,246,0.1)',
                    color: 'var(--indigo)',
                    padding: '4px 9px',
                    borderRadius: '6px',
                    marginRight: '8px',
                    fontWeight: 600,
                  }}
                >
                  {activeMod.tag}
                </span>
                <span className="modal-title" id="mod-modal-title">
                  {activeMod.title}
                </span>
              </div>
              <button className="modal-close" onClick={() => setModuleModalOpen(false)}>
                ✕
              </button>
            </div>

            {!showQuizView ? (
              <div id="mod-read-view">
                <div
                  id="mod-modal-content"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--line)',
                    borderRadius: '12px',
                    padding: '18px',
                    fontSize: '0.88rem',
                    color: 'var(--navy-light)',
                    lineHeight: 1.7,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: `<strong style="color:var(--indigo); display:block; margin-bottom:8px;"><i class="fa-solid fa-book-open mr-1"></i> Materi Pembelajaran:</strong>${activeMod.reading}`,
                  }}
                ></div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button className="btn-modal-ok" onClick={() => setShowQuizView(true)}>
                    Lanjut ke Kuis →
                  </button>
                </div>
              </div>
            ) : (
              <div id="mod-quiz-view">
                <div style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: '12px', padding: '18px' }}>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--amber)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.07em',
                      marginBottom: '8px',
                    }}
                  >
                    Kuis Evaluasi
                  </div>
                  <p id="quiz-q" style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--navy)', marginBottom: '14px' }}>
                    {activeMod.quiz.q}
                  </p>
                  <div id="quiz-opts" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {activeMod.quiz.opts.map((opt, i) => (
                      <button key={i} className="quiz-option" onClick={() => answerQuiz(i === activeMod.quiz.ans)}>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {quizFeedback.show && (
                    <div
                      id="quiz-fb"
                      className={`quiz-feedback ${quizFeedback.correct ? 'correct' : 'wrong'}`}
                      style={{ marginTop: '14px', display: 'block' }}
                    >
                      {quizFeedback.correct ? (
                        <>
                          <i className="fa-solid fa-circle-check mr-1"></i> {quizFeedback.msg}
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-triangle-exclamation mr-1"></i> {quizFeedback.msg}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
