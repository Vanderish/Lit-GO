import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import './ProgresPage.css';

export default function ProgresPage() {
  const navigate = useNavigate();
  const { state, doneCount, badgeCount, pts, lv, expPct, MODULES } = useProgress();

  const totalProgressPct = Math.round(
    ((doneCount / 6) * 0.5 + (badgeCount / 5) * 0.3 + (state.hasRadar ? 0.2 : 0)) * 100
  );

  return (
    <div className="page-wrap">
      {/* Back to Dashboard Button */}
      <div className="progres-back-wrapper">
        <button
          className="btn-lab-ghost btn-back-progres"
          onClick={() => navigate('/dashboard')}
        >
          <i className="fa-solid fa-arrow-left mr-2"></i> Kembali ke Dashboard
        </button>
      </div>

      <div className="hub-section-head progres-header">
        <div>
          <h1 className="hub-section-title progres-title">Perkembangan Progres Belajar</h1>
          <p className="hub-section-sub">Pantau Capaian Literasi AI, Skor Pilar, dan Riwayat Penyelesaian Modul Kamu</p>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="progres-stats-grid">
        <div className="stat-card stat-card-indigo">
          <div className="stat-card-label">
            Level &amp; EXP
          </div>
          <div className="stat-card-value">
            Level {lv}
          </div>
          <div className="stat-card-desc">
            {pts} Etika Gems (EXP {expPct}%)
          </div>
        </div>

        <div className="stat-card stat-card-amber">
          <div className="stat-card-label">
            Modul Selesai
          </div>
          <div className="stat-card-value">
            {doneCount} / 6 Modul
          </div>
          <div className="stat-card-desc">
            {doneCount === 6 ? 'Semua modul tuntas 🎉' : `${6 - doneCount} modul tersisa`}
          </div>
        </div>

        <div className="stat-card stat-card-emerald">
          <div className="stat-card-label">
            E-Badge Terkumpul
          </div>
          <div className="stat-card-value">
            {badgeCount} / 5 Badge
          </div>
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
          <div className="stat-card-label">
            Total Progres Platform
          </div>
          <div className="stat-card-value">
            {totalProgressPct}%
          </div>
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
              {state.hasRadar ? 'Kalibrasi hasil Pre-Test tingkat kecakapan' : 'Belum melakukan Pre-Test'}
            </div>
          </div>
          <button className="btn-lab-ghost btn-radar" onClick={() => navigate('/radar-readiness')}>
            {state.hasRadar ? 'Lihat Detail Radar →' : 'Jalankan Pre-Test →'}
          </button>
        </div>

        <div className="radar-pillar-list">
          <div className="pillar-item">
            <div className="pillar-item-label pillar-label-indigo">
              <span><i className="fa-solid fa-brain mr-1"></i> Pemahaman Dasar AI</span>
              <strong>{state.radar[0]}%</strong>
            </div>
            <div className="pillar-item-track">
              <div className="pillar-item-fill pillar-fill-indigo" style={{ width: `${state.radar[0]}%` }}></div>
            </div>
          </div>
          <div className="pillar-item">
            <div className="pillar-item-label pillar-label-teal">
              <span><i className="fa-solid fa-shield-halved mr-1"></i> Etika &amp; Keamanan Data</span>
              <strong>{state.radar[1]}%</strong>
            </div>
            <div className="pillar-item-track">
              <div className="pillar-item-fill pillar-fill-teal" style={{ width: `${state.radar[1]}%` }}></div>
            </div>
          </div>
          <div className="pillar-item">
            <div className="pillar-item-label pillar-label-amber">
              <span><i className="fa-solid fa-terminal mr-1"></i> Formulasi Prompting</span>
              <strong>{state.radar[2]}%</strong>
            </div>
            <div className="pillar-item-track">
              <div className="pillar-item-fill pillar-fill-amber" style={{ width: `${state.radar[2]}%` }}></div>
            </div>
          </div>
          <div className="pillar-item">
            <div className="pillar-item-label pillar-label-emerald">
              <span><i className="fa-solid fa-magnifying-glass mr-1"></i> Critical Thinking</span>
              <strong>{state.radar[3]}%</strong>
            </div>
            <div className="pillar-item-track">
              <div className="pillar-item-fill pillar-fill-emerald" style={{ width: `${state.radar[3]}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Module Completion Progress List */}
      <div className="module-completion-section">
        <div className="section-header">
          <div>
            <div className="section-title">Status Silabus 6 Modul</div>
            <div className="section-subtitle">Daftar kelulusan materi dan kuis evaluasi</div>
          </div>
          <button className="btn-lab btn-section" onClick={() => navigate('/modul-belajar')}>
            Buka Halaman Modul Belajar →
          </button>
        </div>

        <div className="module-list">
          {MODULES.map((mod) => {
            const isDone = state.doneModules.includes(mod.id);
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
                      {mod.tag}: {mod.title}
                    </div>
                    <div className="module-item-desc">{mod.topics}</div>
                  </div>
                </div>

                <div className="module-item-status">
                  {isDone ? (
                    <span className="badge-status">
                      <i className="fa-solid fa-circle-check"></i> Selesai (+250 Gems)
                    </span>
                  ) : (
                    <button
                      className="btn-lab-ghost btn-module-status"
                      onClick={() => navigate('/modul-belajar')}
                    >
                      Belum Selesai →
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
