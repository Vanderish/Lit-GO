import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';

export default function ProgresPage() {
  const navigate = useNavigate();
  const { state, doneCount, badgeCount, pts, lv, expPct, MODULES } = useProgress();

  const totalProgressPct = Math.min(
    100,
    Math.round(((doneCount / 16) * 0.6 + (badgeCount / 5) * 0.25 + (state.hasRadar ? 0.15 : 0)) * 100)
  );

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
          <h1 className="hub-section-title" style={{ fontSize: '1.6rem' }}>Perkembangan Progres Belajar</h1>
          <p className="hub-section-sub">Pantau Capaian Literasi AI, Skor Pilar, dan Riwayat Penyelesaian Modul Kamu</p>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        <div
          className="panel"
          style={{
            padding: '20px',
            background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(37,99,235,0.02))',
            border: '1px solid rgba(59,130,246,0.2)',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: 'var(--indigo)', fontWeight: 700, textTransform: 'uppercase' }}>
            Level &amp; EXP
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy)', marginTop: '4px' }}>
            Level {lv}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '4px' }}>
            {pts} Etika Gems (EXP {expPct}%)
          </div>
        </div>

        <div
          className="panel"
          style={{
            padding: '20px',
            background: 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(217,119,6,0.02))',
            border: '1px solid rgba(245,158,11,0.2)',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: 'var(--amber)', fontWeight: 700, textTransform: 'uppercase' }}>
            Langkah Selesai
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy)', marginTop: '4px' }}>
            {doneCount} / 16 Langkah
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '4px' }}>
            {doneCount === 16 ? 'Semua 16 langkah tuntas 🎉' : `${16 - doneCount} langkah tersisa`}
          </div>
        </div>

        <div
          className="panel"
          style={{
            padding: '20px',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(5,150,105,0.02))',
            border: '1px solid rgba(16,185,129,0.2)',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: 'var(--emerald)', fontWeight: 700, textTransform: 'uppercase' }}>
            E-Badge Terkumpul
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy)', marginTop: '4px' }}>
            {badgeCount} / 5 Badge
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '4px' }}>
            <span
              style={{ color: 'var(--emerald)', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => navigate('/koleksi-badge')}
            >
              Lihat Koleksi Reward →
            </span>
          </div>
        </div>

        <div
          className="panel"
          style={{
            padding: '20px',
            background: 'linear-gradient(135deg, rgba(20,184,166,0.08), rgba(13,148,136,0.02))',
            border: '1px solid rgba(20,184,166,0.2)',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: 'var(--teal)', fontWeight: 700, textTransform: 'uppercase' }}>
            Total Progres Platform
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy)', marginTop: '4px' }}>
            {totalProgressPct}%
          </div>
          <div className="pillar-item-track" style={{ marginTop: '8px' }}>
            <div
              className="pillar-item-fill"
              style={{ width: `${totalProgressPct}%`, background: 'var(--teal)' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Radar Readiness Summary */}
      <div className="panel" style={{ padding: '24px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--navy)' }}>Status Asesmen Radar 4 Pilar</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
              {state.hasRadar ? 'Kalibrasi hasil Pre-Test tingkat kecakapan' : 'Belum melakukan Pre-Test'}
            </div>
          </div>
          <button className="btn-lab-ghost" onClick={() => navigate('/radar-readiness')}>
            {state.hasRadar ? 'Lihat Detail Radar →' : 'Jalankan Pre-Test →'}
          </button>
        </div>

        <div className="radar-pillar-list">
          <div>
            <div className="pillar-item-label" style={{ color: 'var(--indigo)' }}>
              <span><i className="fa-solid fa-brain mr-1"></i> Pemahaman Dasar AI</span>
              <strong>{state.radar[0]}%</strong>
            </div>
            <div className="pillar-item-track">
              <div className="pillar-item-fill" style={{ width: `${state.radar[0]}%`, background: 'var(--indigo)' }}></div>
            </div>
          </div>
          <div>
            <div className="pillar-item-label" style={{ color: 'var(--teal)' }}>
              <span><i className="fa-solid fa-shield-halved mr-1"></i> Etika &amp; Keamanan Data</span>
              <strong>{state.radar[1]}%</strong>
            </div>
            <div className="pillar-item-track">
              <div className="pillar-item-fill" style={{ width: `${state.radar[1]}%`, background: 'var(--teal)' }}></div>
            </div>
          </div>
          <div>
            <div className="pillar-item-label" style={{ color: 'var(--amber)' }}>
              <span><i className="fa-solid fa-terminal mr-1"></i> Formulasi Prompting</span>
              <strong>{state.radar[2]}%</strong>
            </div>
            <div className="pillar-item-track">
              <div className="pillar-item-fill" style={{ width: `${state.radar[2]}%`, background: 'var(--amber)' }}></div>
            </div>
          </div>
          <div>
            <div className="pillar-item-label" style={{ color: 'var(--emerald)' }}>
              <span><i className="fa-solid fa-magnifying-glass mr-1"></i> Critical Thinking</span>
              <strong>{state.radar[3]}%</strong>
            </div>
            <div className="pillar-item-track">
              <div className="pillar-item-fill" style={{ width: `${state.radar[3]}%`, background: 'var(--emerald)' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Module Completion Progress List */}
      <div className="panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--navy)' }}>Status Silabus 6 Modul Utama (24 Langkah Gamifikasi)</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>Daftar kelulusan 24 game interaktif &amp; Tebak Gambar AI</div>
          </div>
          <button className="btn-lab" onClick={() => navigate('/modul-belajar')}>
            Buka Halaman Modul Belajar →
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {MODULES.map((mod) => {
            const modTotalSteps = mod.steps.length;
            const modCompletedSteps = mod.steps.filter((s) => (state.doneModules || []).includes(s.id)).length;
            const isDone = modCompletedSteps === modTotalSteps;
            return (
              <div
                key={mod.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  background: isDone ? 'rgba(16,185,129,0.05)' : 'var(--bg)',
                  border: isDone ? '1px solid rgba(16,185,129,0.2)' : '1px solid var(--line)',
                  borderRadius: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: mod.iconBg,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                    }}
                  >
                    <i className={`fa-solid ${mod.icon}`}></i>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--navy)' }}>
                      {mod.tag}: {mod.title} ({modCompletedSteps}/{modTotalSteps} Langkah)
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{mod.topics}</div>
                  </div>
                </div>

                <div>
                  {isDone ? (
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: 'var(--emerald)',
                        background: 'rgba(16,185,129,0.1)',
                        padding: '6px 12px',
                        borderRadius: '20px',
                      }}
                    >
                      <i className="fa-solid fa-circle-check mr-1"></i> Tuntas ({modTotalSteps}/{modTotalSteps} Langkah)
                    </span>
                  ) : (
                    <button
                      className="btn-lab-ghost"
                      style={{ fontSize: '0.76rem', padding: '6px 12px' }}
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
