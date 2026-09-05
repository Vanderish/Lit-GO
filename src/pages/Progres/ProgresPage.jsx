import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import './ProgresPage.css';

export default function ProgresPage() {
  const navigate = useNavigate();
  const { state, doneCount, badgeCount, pts, lv, expPct, MODULES } = useProgress();

  const hasRadar = Boolean(state?.hasRadar);
  const radar = Array.isArray(state?.radar) && state.radar.length === 4 ? state.radar : [0, 0, 0, 0];

  const totalProgressPct = Math.min(
    100,
    Math.round(((doneCount / 24) * 0.6 + (badgeCount / 5) * 0.25 + (hasRadar ? 0.15 : 0)) * 100)
  );

  return (
    <div className="page-wrap">
      <div className="hub-section-head progres-header">
        <div>
          <h1 className="hub-section-title progres-title">Perkembangan Progres Belajar</h1>
          <p className="hub-section-sub">Pantau Capaian Literasi AI, Skor Pilar, dan Riwayat Penyelesaian Modul Kamu</p>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="progres-stats-grid">
        <div className="stat-card stat-card-indigo">
          <div className="stat-card-label">Level &amp; EXP</div>
          <div className="stat-card-value">Level {lv}</div>
          <div className="stat-card-desc">{pts} Etika Gems (EXP {expPct}%)</div>
        </div>

        <div className="stat-card stat-card-amber">
          <div className="stat-card-label">Langkah Selesai</div>
          <div className="stat-card-value">{doneCount} / 24 Langkah</div>
          <div className="stat-card-desc">
            {doneCount >= 24 ? 'Semua 24 langkah tuntas 🎉' : `${Math.max(0, 24 - doneCount)} langkah tersisa`}
          </div>
        </div>

        <div className="stat-card stat-card-emerald">
          <div className="stat-card-label">E-Badge Terkumpul</div>
          <div className="stat-card-value">{badgeCount} / 5 Badge</div>
          <div className="stat-card-desc">
            <span
              className="stat-link-emerald"
              onClick={() => navigate('/koleksi-badge')}
            >
              Lihat Koleksi Reward →
            </span>
          </div>
        </div>

        <div className="stat-card stat-card-teal">
          <div className="stat-card-label">Total Progres Platform</div>
          <div className="stat-card-value">{totalProgressPct}%</div>
          <div className="pillar-item-track pillar-track-margin">
            <div
              className="pillar-item-fill pillar-fill-teal"
              style={{ width: `${totalProgressPct}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Radar Readiness Summary */}
      <div className="radar-section">
        <div className="radar-header">
          <div>
            <div className="radar-title">Status Asesmen Radar 4 Pilar</div>
            <div className="radar-subtitle">
              {hasRadar ? 'Kalibrasi hasil Pre-Test tingkat kecakapan' : 'Belum melakukan Pre-Test'}
            </div>
          </div>
          <button className="btn-lab-ghost btn-radar" onClick={() => navigate('/radar-readiness')}>
            {hasRadar ? 'Lihat Detail Radar →' : 'Jalankan Pre-Test →'}
          </button>
        </div>

        <div className="radar-pillar-list">
          <div className="pillar-item">
            <div className="pillar-item-label pillar-label-indigo">
              <span><i className="fa-solid fa-brain mr-1"></i> Pemahaman Dasar AI</span>
              <strong>{radar[0]}%</strong>
            </div>
            <div className="pillar-item-track">
              <div className="pillar-item-fill pillar-fill-indigo" style={{ width: `${radar[0]}%` }}></div>
            </div>
          </div>
          <div className="pillar-item">
            <div className="pillar-item-label pillar-label-teal">
              <span><i className="fa-solid fa-shield-halved mr-1"></i> Etika &amp; Keamanan Data</span>
              <strong>{radar[1]}%</strong>
            </div>
            <div className="pillar-item-track">
              <div className="pillar-item-fill pillar-fill-teal" style={{ width: `${radar[1]}%` }}></div>
            </div>
          </div>
          <div className="pillar-item">
            <div className="pillar-item-label pillar-label-amber">
              <span><i className="fa-solid fa-terminal mr-1"></i> Formulasi Prompting</span>
              <strong>{radar[2]}%</strong>
            </div>
            <div className="pillar-item-track">
              <div className="pillar-item-fill pillar-fill-amber" style={{ width: `${radar[2]}%` }}></div>
            </div>
          </div>
          <div className="pillar-item">
            <div className="pillar-item-label pillar-label-emerald">
              <span><i className="fa-solid fa-magnifying-glass mr-1"></i> Critical Thinking</span>
              <strong>{radar[3]}%</strong>
            </div>
            <div className="pillar-item-track">
              <div className="pillar-item-fill pillar-fill-emerald" style={{ width: `${radar[3]}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Module Completion Progress List */}
      <div className="module-completion-section">
        <div className="section-header">
          <div>
            <div className="section-title">Status Silabus 6 Modul Utama (24 Langkah Gamifikasi)</div>
            <div className="section-subtitle">Daftar kelulusan 24 game interaktif &amp; Tebak Gambar AI</div>
          </div>
          <button className="btn-lab btn-section" onClick={() => navigate('/modul-belajar')}>
            Buka Halaman Modul Belajar →
          </button>
        </div>

        <div className="module-list">
          {MODULES.map((mod) => {
            const modTotalSteps = mod.steps ? mod.steps.length : 1;
            const modCompletedSteps = mod.steps
              ? mod.steps.filter((s) => (state?.doneModules || []).includes(s.id)).length
              : ((state?.doneModules || []).includes(mod.id) ? 1 : 0);
            const isDone = modCompletedSteps === modTotalSteps || (state?.doneModules || []).includes(mod.id);
            return (
              <div
                key={mod.id}
                className={`module-item ${isDone ? 'done' : ''}`}
              >
                <div className="module-item-content">
                  <div
                    className="module-item-icon"
                    style={{ background: mod.iconBg }}
                  >
                    <i className={`fa-solid ${mod.icon}`}></i>
                  </div>
                  <div className="module-item-text">
                    <div className="module-item-title">
                      {mod.tag}: {mod.title} ({modCompletedSteps}/{modTotalSteps} Langkah)
                    </div>
                    <div className="module-item-desc">{mod.topics}</div>
                  </div>
                </div>

                <div className="module-item-status">
                  {isDone ? (
                    <span className="badge-status">
                      <i className="fa-solid fa-circle-check"></i> Tuntas ({modTotalSteps}/{modTotalSteps} Langkah)
                    </span>
                  ) : (
                    <button
                      className="btn-lab-ghost btn-module-status"
                      onClick={() => navigate('/modul-belajar')}
                    >
                      {modCompletedSteps}/{modTotalSteps} Langkah →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
