import React from 'react';
import './ModuleModal.css'

export default function ModuleModal({ activeModule, doneSteps, onClose, onOpenModule, onStartStep }) {
  if (!activeModule) return null;

  const completedCount = activeModule.steps.filter(s => doneSteps.includes(s.id)).length;
  const progressPercent = (completedCount / activeModule.steps.length) * 100;

  const stepIcons = {
    '1-1': 'fa-comments', '1-2': 'fa-diagram-successor', '1-3': 'fa-image', '1-4': 'fa-bug',
    '2-1': 'fa-sliders', '2-2': 'fa-image', '2-3': 'fa-gamepad', '2-4': 'fa-stamp',
    '3-1': 'fa-puzzle-piece', '3-2': 'fa-image', '3-3': 'fa-user-shield', '3-4': 'fa-screwdriver-wrench',
    '4-1': 'fa-image', '4-2': 'fa-layer-group', '4-3': 'fa-table-columns', '4-4': 'fa-stopwatch',
    '5-1': 'fa-image', '5-2': 'fa-file-signature', '5-3': 'fa-stamp', '5-4': 'fa-diagram-project',
    '6-1': 'fa-compass', '6-2': 'fa-sliders', '6-3': 'fa-image', '6-4': 'fa-award',
  };

  return (
    <>
      <div aria-hidden="true" className="md-modal-backdrop" onClick={onClose}></div>
      <div className="md-modal-wrapper">
        <main className="md-modal-box" data-purpose="learning-module-popup">
          <button 
            aria-label="Tutup Popup Modal" 
            className="md-close-btn" 
            type="button"
            onClick={onClose}
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
                      {completedCount} / {activeModule.steps.length} Selesai
                    </span>
                  </div>
                  <div className="md-progress-bar-bg">
                    <div 
                      className="md-progress-bar-fill" 
                      style={{ width: `${progressPercent}%` }}
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
                  onClick={() => {
                    onOpenModule(activeModule.id);
                  }}
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

                    return (
                      <article 
                        key={step.id}
                        className={`md-step-card ${isStepDone ? 'done' : ''}`}
                        onClick={() => onStartStep(activeModule, step)}
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
                            <p className="md-desc">
                              {step.desc || 'Tuntaskan tahapan ini secara berurutan untuk melengkapi poin dan lencana keterampilan.'}
                            </p>
                          </div>
                          
                          <div className="md-step-action">
                            <span className="md-step-badge">5 Kuis Jurnal</span>
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
  );
}