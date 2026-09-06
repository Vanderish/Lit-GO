import React, { useState } from 'react';
import { HANDBOOK_MODULES } from './HandbookData';

export default function HandbookReader({ moduleId, onProceedToQuiz, onClose }) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [viewMode, setViewMode] = useState('booklet'); // 'booklet' | 'continuous'
  const [activeMythTab, setActiveMythTab] = useState(null);

  const moduleData = HANDBOOK_MODULES[moduleId] || HANDBOOK_MODULES[1];
  const pages = moduleData.pages || [];
  const currentPage = pages[currentPageIndex] || pages[0];
  const totalPages = pages.length;

  const handleNext = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onProceedToQuiz();
    }
  };

  const handlePrev = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const progressPercent = Math.round(((currentPageIndex + 1) / totalPages) * 100);

  return (
    <div className="handbook-root">
      {/* HANDBOOK COVER / TOP HEADER CARD */}
      <div className="handbook-cover-banner">
        <div className="handbook-cover-left">
          <div className="handbook-badge-row">
            <span className="hb-pill hb-pill-level">
              {moduleData.tag}
            </span>
            <span className="hb-pill hb-pill-edition">
              Lit-GO Handbook Edisi 2026
            </span>
            <span className="hb-pill hb-pill-time">
              {moduleData.readingTime}
            </span>
          </div>

          <h1 className="handbook-main-title">{moduleData.title}</h1>
          <p className="handbook-main-subtitle">{moduleData.subtitle}</p>
          <div className="handbook-standard-tag">
            Terverifikasi: <strong>{moduleData.standardTag}</strong>
          </div>

          {/* Handbook Key Stats Banner */}
          {moduleData.stats && (
            <div className="handbook-stats-grid">
              {moduleData.stats.map((stat, idx) => (
                <div key={idx} className="handbook-stat-item">
                  <div className="hb-stat-label">{stat.label}</div>
                  <div className="hb-stat-value">{stat.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lead Thematic Illustration on Cover */}
        <div className="handbook-cover-right">
          <div className="handbook-lead-img-wrap">
            <img 
              src={moduleData.coverImg} 
              alt={moduleData.title} 
              className="handbook-lead-img"
              loading="lazy"
            />
            <div className="hb-img-reflection-line"></div>
          </div>
        </div>
      </div>

      {/* READING MODE & PAGE SELECTOR BAR */}
      <div className="handbook-nav-controls">
        <div className="hb-tab-list">
          {pages.map((p, idx) => (
            <button
              key={idx}
              className={`hb-page-tab-btn ${currentPageIndex === idx && viewMode === 'booklet' ? 'active' : ''}`}
              onClick={() => {
                setCurrentPageIndex(idx);
                setViewMode('booklet');
              }}
            >
              <span className="hb-tab-num">{p.pageNumber}</span>
              <span className="hb-tab-title">{p.title.split('&')[0].trim()}</span>
            </button>
          ))}
        </div>

        <div className="hb-viewmode-toggle">
          <button 
            className={`hb-mode-btn ${viewMode === 'booklet' ? 'active' : ''}`}
            onClick={() => setViewMode('booklet')}
            title="Tampilan Lembar Booklet"
          >
            Booklet
          </button>
          <button 
            className={`hb-mode-btn ${viewMode === 'continuous' ? 'active' : ''}`}
            onClick={() => setViewMode('continuous')}
            title="Tampilan Baca Menyeluruh"
          >
            Semua Halaman
          </button>
        </div>
      </div>

      {/* READING PROGRESS BAR */}
      <div className="handbook-progress-tracker">
        <div className="hb-progress-bar-bg">
          <div className="hb-progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <div className="hb-progress-text">
          <span>Halaman <strong>{currentPageIndex + 1}</strong> dari <strong>{totalPages}</strong></span>
          <span className="hb-progress-badge">{progressPercent}% Dibaca</span>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      {viewMode === 'booklet' ? (
        // MODE BOOKLET (Halaman Tunggal Berstruktur Rapi)
        <div className="handbook-sheet animate-fade-in" key={currentPageIndex}>
          <HandbookPageRender 
            page={currentPage} 
            activeMythTab={activeMythTab} 
            setActiveMythTab={setActiveMythTab}
          />
        </div>
      ) : (
        // MODE CONTINUOUS (Semua Halaman Berurutan)
        <div className="handbook-continuous-flow">
          {pages.map((pg, idx) => (
            <div key={idx} className="handbook-sheet handbook-sheet-flow">
              <div className="hb-flow-divider">
                <span className="hb-flow-badge">Bagian {pg.pageNumber}</span>
              </div>
              <HandbookPageRender 
                page={pg} 
                activeMythTab={activeMythTab} 
                setActiveMythTab={setActiveMythTab}
              />
            </div>
          ))}
        </div>
      )}

      {/* FOOTER ACTION BAR */}
      <div className="handbook-bottom-nav">
        <button 
          className="btn-hb-back" 
          onClick={handlePrev}
          disabled={currentPageIndex === 0}
        >
          <span className="hb-btn-arrow">←</span>
          <span>Halaman Sebelumnya</span>
        </button>

        <div className="hb-dots-indicator">
          {pages.map((_, i) => (
            <div 
              key={i} 
              className={`hb-dot ${currentPageIndex === i ? 'active' : ''}`}
              onClick={() => setCurrentPageIndex(i)}
            ></div>
          ))}
        </div>

        <button 
          className="btn-hb-next" 
          onClick={handleNext}
        >
          {currentPageIndex === totalPages - 1 ? (
            <>
              <span>Lanjut ke Kuis Evaluasi</span>
              <span className="hb-btn-arrow">→</span>
            </>
          ) : (
            <>
              <span>Halaman Selanjutnya</span>
              <span className="hb-btn-arrow">→</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Subkomponen untuk merender isi tiap halaman dengan layout editorial 2-kolom & infografis
function HandbookPageRender({ page, activeMythTab, setActiveMythTab }) {
  return (
    <div className="hb-page-content">
      {/* Chapter Number Badge & Header */}
      <div className="hb-chapter-header">
        <div className="hb-chapter-number-pill">{page.pageNumber}</div>
        <div className="hb-chapter-title-group">
          <h2 className="hb-chapter-title">{page.title}</h2>
          <p className="hb-chapter-tagline">{page.tagline}</p>
        </div>
      </div>

      {/* Editorial 2-Column Split: Image on side, rich content alongside */}
      <div className="hb-editorial-grid">
        {/* Left Column: Visual Illustration & Infographic Badge */}
        <div className="hb-visual-column">
          <div className="hb-image-card">
            <div className="hb-image-frame">
              <img 
                src={page.img} 
                alt={page.title} 
                className="hb-illustration-media"
                loading="lazy"
              />
            </div>
            {page.imgCaption && (
              <div className="hb-illustration-caption">
                {page.imgCaption}
              </div>
            )}
          </div>

          {/* Extra Visual Note if available */}
          {page.quote && (
            <div className="hb-quote-card">
              <i className="fa-solid fa-quote-left hb-quote-icon"></i>
              <p className="hb-quote-text">{page.quote}</p>
            </div>
          )}
        </div>

        {/* Right Column: In-depth Explanations & Interactive Cards */}
        <div className="hb-text-column">
          {/* Paragraph Sections */}
          {page.contentSections && page.contentSections.map((sec, idx) => (
            <div key={idx} className="hb-paragraph-block">
              <h3 className="hb-block-heading">{sec.heading}</h3>
              <p className="hb-block-text">{sec.text}</p>
            </div>
          ))}

          {/* Callout Box (UNESCO, Standard, etc.) */}
          {page.callout && (
            <div className={`hb-callout-box hb-callout-${page.callout.type}`}>
              <div className="hb-callout-head">
                <strong>{page.callout.title}</strong>
              </div>
              <p className="hb-callout-desc">{page.callout.text}</p>
            </div>
          )}

          {/* Comparisons Matrix (Mitos vs Fakta) */}
          {page.comparisons && (
            <div className="hb-comparisons-wrapper">
              <div className="hb-comparison-intro">
                <strong>Tabel Komparasi Ilmiah Mitos vs Realitas</strong>
              </div>
              <div className="hb-comparison-cards-list">
                {page.comparisons.map((item, cIdx) => (
                  <div key={cIdx} className="hb-comparison-card">
                    <div className="hb-comp-side hb-comp-myth">
                      <div className="hb-comp-label">
                        <span className="hb-cross-icon"><i className="fa-solid fa-xmark"></i></span> Mitos Umum
                      </div>
                      <p className="hb-comp-text">{item.myth}</p>
                    </div>
                    <div className="hb-comp-vs">VS</div>
                    <div className="hb-comp-side hb-comp-fact">
                      <div className="hb-comp-label">
                        <span className="hb-check-icon"><i className="fa-solid fa-check"></i></span> Fakta Ilmiah
                      </div>
                      <p className="hb-comp-text">{item.fact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warning Box (Halusinasi AI) */}
          {page.warningBox && (
            <div className="hb-warning-box">
              <div className="hb-warning-header">
                <div className="hb-warning-icon-pill">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div>
                  <h4 className="hb-warning-title">{page.warningBox.title}</h4>
                  <p className="hb-warning-desc">{page.warningBox.desc}</p>
                </div>
              </div>

              {page.whyHappens && (
                <div className="hb-why-happens-card">
                  <div className="hb-why-title">
                    {page.whyHappens.title}
                  </div>
                  <p className="hb-why-text">{page.whyHappens.text}</p>
                </div>
              )}

              {/* Step by Step Protocol */}
              {page.protocolSteps && (
                <div className="hb-protocol-container">
                  <div className="hb-protocol-title">
                    Protokol 3 Langkah Menghindari Halusinasi:
                  </div>
                  <div className="hb-protocol-grid">
                    {page.protocolSteps.map((step, sIdx) => (
                      <div key={sIdx} className="hb-protocol-item">
                        <div className="hb-protocol-num">{step.num}</div>
                        <div className="hb-protocol-info">
                          <h5 className="hb-protocol-name">{step.title}</h5>
                          <p className="hb-protocol-desc">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Pilot vs Co-pilot Analogy & Conclusion */}
          {page.pilotAnalogy && (
            <div className="hb-pilot-container">
              <div className="hb-pilot-hero-card">
                <div className="hb-pilot-badge">
                  {page.pilotAnalogy.title}
                </div>
                <blockquote className="hb-pilot-quote">
                  "{page.pilotAnalogy.quote}"
                </blockquote>
                <p className="hb-pilot-desc">{page.pilotAnalogy.desc}</p>
              </div>

              {page.keyPillars && (
                <div className="hb-pillars-grid">
                  {page.keyPillars.map((pillar, pIdx) => (
                    <div key={pIdx} className="hb-pillar-card">
                      <div className="hb-pillar-icon">
                        <i className={`fa-solid ${pillar.icon}`}></i>
                      </div>
                      <h4 className="hb-pillar-title">{pillar.title}</h4>
                      <p className="hb-pillar-desc">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {page.frameworkSeal && (
                <div className="hb-seal-footer">
                  {page.frameworkSeal}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
