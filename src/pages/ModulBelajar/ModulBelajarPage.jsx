import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import './ModulBelajarPage.css';

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

      {/* Module Modal */}
      {isModuleModalOpen && activeMod && (
        <div className="modal-overlay" id="modal-module">
          <div className="modal-box">
            <div className="modal-head">
              <div>
                <span className="modal-tag" id="mod-modal-tag">
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
                  dangerouslySetInnerHTML={{
                    __html: `<strong style="color:var(--indigo); display:block; margin-bottom:8px;"><i class="fa-solid fa-book-open mr-1"></i> Materi Pembelajaran:</strong>${activeMod.reading}`,
                  }}
                ></div>
                <div className="modal-button-wrapper">
                  <button className="btn-modal-ok" onClick={() => setShowQuizView(true)}>
                    Lanjut ke Kuis →
                  </button>
                </div>
              </div>
            ) : (
              <div id="mod-quiz-view">
                <div>
                  <div className="quiz-label">
                    Kuis Evaluasi
                  </div>
                  <p id="quiz-q">
                    {activeMod.quiz.q}
                  </p>
                  <div id="quiz-opts">
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
