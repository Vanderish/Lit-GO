import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import RadarReadinessPage from '../RadarReadiness/RadarReadinessPage';
import LitoMascot3D from '../../components/Mascot3D/LitoMascot3D';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const { state, completedModulesCount, badgeCount, pts } = useProgress();

  let userName = 'Sobat Lit-GO';
  try {
    const raw = localStorage.getItem('user_data');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.name) userName = parsed.name;
    }
  } catch {
    // ignore
  }

  // Ekstrak state radar untuk digunakan di 4 kotak rekomendasi bawah
  const radar = Array.isArray(state?.radar) && state.radar.length === 4 ? state.radar : [0, 0, 0, 0];
  const hasRadar = state?.hasRadar || false;

  // Average radar readiness score
  const avgRadarScore = hasRadar
    ? Math.round(radar.reduce((a, b) => a + b, 0) / 4)
    : 0;

  // Log aktivitas terbaru dari ProgressContext
  const activities = Array.isArray(state?.activities) ? state.activities : [];

  // Formatter waktu relatif aman (mencegah NaN / epoch 1970)
  const formatRelativeTime = (act) => {
    if (!act) return 'Baru saja';
    const ts = typeof act.timestamp === 'number' ? act.timestamp : null;
    if (!ts || isNaN(ts) || ts <= 0) {
      return act.time || 'Baru saja';
    }

    const diffMs = Date.now() - ts;
    if (diffMs < 0 || diffMs < 45 * 1000) {
      return 'Baru saja';
    }

    const diffMins = Math.floor(diffMs / (60 * 1000));
    if (diffMins < 60) {
      return `${diffMins} menit lalu`;
    }

    const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
    if (diffHours < 24) {
      return `${diffHours} jam lalu`;
    }

    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
    if (diffDays <= 7) {
      return `${diffDays} hari lalu`;
    }

    try {
      const d = new Date(ts);
      return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    } catch {
      return act.time || 'Baru saja';
    }
  };

  // Adaptive Priority: Temukan pilar dengan skor terendah untuk dijadikan rekomendasi utama
  const minScore = hasRadar ? Math.min(...radar) : 0;
  const priorityPillarIndex = hasRadar ? radar.indexOf(minScore) : -1;

  // Handler Lanjutkan Belajar: Membuka modul terakhir yang dikunjungi atau modul belum tuntas berikutnya
  const handleContinueLearning = () => {
    const lastMod = state?.lastVisitedModuleId;
    if (lastMod) {
      navigate(`/modul-belajar?mod=${lastMod}`);
    } else {
      const doneList = state?.doneModules || [];
      const firstUnfinished = [1, 2, 3, 4, 5, 6].find((mId) => {
        const steps = [`${mId}-1`, `${mId}-2`, `${mId}-3`, `${mId}-4`];
        return !steps.every((s) => doneList.includes(s)) && !doneList.includes(mId);
      }) || 1;
      navigate(`/modul-belajar?mod=${firstUnfinished}`);
    }
  };

  const pillarsData = [
    {
      id: 1,
      num: '01',
      title: 'Pemahaman Dasar AI',
      icon: 'fa-solid fa-brain',
      tone: 'indigo',
      borderClass: 'pillar-border-indigo',
      badgeClass: 'badge-indigo',
      score: radar[0],
      desc: 'Memahami definisi fundamental AI, sejarah perkembangan Transformer, keterbatasan model LLM, dan mitigasi halusinasi.',
      moduleTarget: '/modul-belajar?mod=1',
      btnLabel: 'Pelajari Modul 1',
    },
    {
      id: 2,
      num: '02',
      title: 'Etika & Keamanan Data',
      icon: 'fa-solid fa-shield-halved',
      tone: 'teal',
      borderClass: 'pillar-border-teal',
      badgeClass: 'badge-teal',
      score: radar[1],
      desc: 'Memahami hak cipta karya AI, regulasi privasi data, bias algoritma Gender Shades, dan deteksi forensik deepfake.',
      moduleTarget: '/modul-belajar?mod=2',
      btnLabel: 'Pelajari Modul 2',
    },
    {
      id: 3,
      num: '03',
      title: 'Prompt Engineering',
      icon: 'fa-solid fa-terminal',
      tone: 'amber',
      borderClass: 'pillar-border-amber',
      badgeClass: 'badge-amber',
      score: radar[2],
      desc: 'Menyusun instruksi terstruktur dengan formula persona, konteks, format output, zero-shot, few-shot, dan teknik ReAct.',
      moduleTarget: '/modul-belajar?mod=3',
      btnLabel: 'Pelajari Modul 3',
    },
    {
      id: 4,
      num: '04',
      title: 'Critical Thinking',
      icon: 'fa-solid fa-magnifying-glass',
      tone: 'emerald',
      borderClass: 'pillar-border-emerald',
      badgeClass: 'badge-emerald',
      score: radar[3],
      desc: 'Melatih skeptisisme sehat, melakukan fact-checking silang, evaluasi bias informasi, dan verifikasi klaim output AI.',
      moduleTarget: '/modul-belajar?mod=6',
      btnLabel: 'Pelajari Modul 6',
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="wrap">
        
        {/* ========================================================= */}
        {/* 1. HERO BENTO BANNER (Personalized Greeting & Quick Metrics) */}
        {/* ========================================================= */}
        <div className="dashboard-hero-bento">
          <div className="bento-left-col">
            <div className="bento-badge-row">
              <span className="bento-status-pill">
                <i className="fa-solid fa-sparkles mr-1"></i> Platform Literasi AI Terverifikasi
              </span>
              <span className="bento-level-pill">
                <i className="fa-solid fa-award mr-1"></i> Level {Math.floor(pts / 100) + 1}
              </span>
            </div>

            <h1 className="bento-greeting-title">
              Selamat datang kembali, <span className="text-gradient-indigo">{userName}</span>! 👋
            </h1>

            <p className="bento-greeting-sub">
              Latih kepekaan kritis terhadap kecerdasan buatan, uji keaslian konten deepfake, dan pelajari etika AI melalui modul interaktif berbasis gamifikasi.
            </p>

            <div className="bento-quick-metrics">
              <div className="bento-metric-item">
                <span className="metric-val">{completedModulesCount}/6</span>
                <span className="metric-lbl">Modul Tuntas</span>
              </div>
              <div className="bento-metric-divider"></div>
              <div className="bento-metric-item">
                <span className="metric-val">{badgeCount}/5</span>
                <span className="metric-lbl">E-Badges</span>
              </div>
              <div className="bento-metric-divider"></div>
              <div className="bento-metric-item">
                <span className={`metric-val ${hasRadar ? 'text-indigo' : 'text-amber'}`}>
                  {hasRadar ? `${avgRadarScore}%` : 'Belum Tes'}
                </span>
                <span className="metric-lbl">Indeks Kesiapan</span>
              </div>
            </div>

            <div className="bento-cta-row">
              <button className="btn-bento-primary" onClick={handleContinueLearning}>
                <i className="fa-solid fa-book-open-reader mr-2"></i> Lanjutkan Belajar
              </button>
              <button className="btn-bento-ghost" onClick={() => navigate('/sandbox/deepfake-detective')}>
                <i className="fa-solid fa-microchip mr-2"></i> Uji Deepfake Lab
              </button>
            </div>
          </div>

          <div className="bento-right-col">
            <LitoMascot3D
              interactive={true}
              showGreeting={true}
              greetingText="Lito AI Companion"
              subText={
                hasRadar 
                  ? `Kesiapan AI kamu rata-rata ${avgRadarScore}%. Fokus tingkatkan pilar "${pillarsData[priorityPillarIndex]?.title}" untuk hasil optimal!`
                  : "Selamat datang! Yuk ikuti Pre-test AI Readiness Radar untuk memetakan kekuatan dan kelemahan literasi AI kamu!"
              }
              className="dashboard-bento-mascot"
            />
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. AI READINESS RADAR (Diagnostik Kompetensi & Pre-Test) */}
        {/* ========================================================= */}
        <RadarReadinessPage embedded={true} />

        {/* ========================================================= */}
        {/* 3. ADAPTIVE LEARNING ROADMAP (Rekomendasi Terarah Adaptif) */}
        {/* ========================================================= */}
        <div className="section-header-block">
          <div className="section-badge-pre">
            <i className="fa-solid fa-route text-indigo mr-1"></i> RENCANA BELAJAR ADAPTIF
          </div>
          <h2 className="section-title-clean">Rekomendasi Modul Berdasarkan Skor Radar</h2>
          <p className="section-desc-clean">
            Sistem menganalisis performa radar kamu dan merekomendasikan pilar mana yang perlu diprioritaskan terlebih dahulu.
          </p>
        </div>

        <div className="dashboard-pillars-grid">
          {pillarsData.map((pilar, index) => {
            const isPriority = hasRadar && index === priorityPillarIndex;
            const isMastered = hasRadar && pilar.score >= 80;

            return (
              <div 
                key={pilar.id} 
                className={`panel dashboard-pillar-panel ${pilar.borderClass} ${isPriority ? 'is-priority-focus' : ''}`}
              >
                <div className="pillar-header">
                  <div className={`pillar-icon pillar-icon-${pilar.tone}`}>
                    <i className={pilar.icon}></i>
                  </div>
                  <div className="pillar-title-wrap">
                    <div className="pillar-badge-row">
                      <span className={`pillar-badge ${pilar.badgeClass}`}>Pilar {pilar.num}</span>
                      {hasRadar ? (
                        isPriority ? (
                          <span className="pillar-status-chip priority">
                            <i className="fa-solid fa-fire"></i> Fokus Utama
                          </span>
                        ) : isMastered ? (
                          <span className="pillar-status-chip mastered">
                            <i className="fa-solid fa-circle-check"></i> Mahir
                          </span>
                        ) : (
                          <span className="pillar-status-chip regular">
                            <i className="fa-solid fa-chart-line"></i> Terpetakan
                          </span>
                        )
                      ) : (
                        <span className="pillar-status-chip unmeasured">
                          <i className="fa-solid fa-hourglass-start"></i> Belum Diuji
                        </span>
                      )}
                    </div>
                    <h3 className="pillar-title">{pilar.title}</h3>
                  </div>
                </div>

                <div className="pillar-progress-track">
                  <div 
                    className={`pillar-progress-fill fill-${pilar.tone}`} 
                    style={{ width: `${hasRadar ? pilar.score : 0}%` }}
                  ></div>
                </div>

                <div className="pillar-score-row">
                  <span className="score-label">Tingkat Penguasaan:</span>
                  <strong className={`score-val text-${pilar.tone}`}>
                    {hasRadar ? `${pilar.score}%` : '—'}
                  </strong>
                </div>

                <p className="pillar-desc">{pilar.desc}</p>

                <button className="btn-pillar-cta" onClick={() => navigate(pilar.moduleTarget)}>
                  <span>{pilar.btnLabel}</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* 4. RECENT ACTIVITY FEED (Log Jejak Pembelajaran Terakhir)  */}
        {/* ========================================================= */}
        <div className="dashboard-activity-section">
          <div className="panel dashboard-activity-card">
            <div className="activity-card-header">
              <div>
                <h3 className="activity-title">
                  <i className="fa-solid fa-clock-rotate-left text-indigo mr-2"></i>
                  Aktivitas &amp; Jejak Belajar Terakhir
                </h3>
                <p className="activity-subtitle">Riwayat pencapaian, simulasi lab, dan asesmen yang kamu selesaikan</p>
              </div>
              <span className="activity-counter-pill">
                {activities.length > 0 ? `${activities.length} Aktivitas` : 'Siap Memulai'}
              </span>
            </div>

            {activities.length > 0 ? (
              <div className="activity-timeline-list">
                {activities.slice(0, 5).map((act) => (
                  <div key={act.id} className="activity-timeline-item">
                    <div className={`activity-icon-bubble ${act.tone || 'indigo'}`}>
                      <i className={act.icon || 'fa-solid fa-circle-check'}></i>
                    </div>
                    <div className="activity-info">
                      <div className="activity-text">{act.text}</div>
                      <span className="activity-time">{formatRelativeTime(act)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="activity-empty-state">
                <div className="activity-empty-icon">
                  <i className="fa-solid fa-seedling"></i>
                </div>
                <div className="activity-empty-text">
                  <strong>Belum ada catatan aktivitas baru</strong>
                  <p>Mulai dengan menyelesaikan Pre-Test atau buka Modul 1 untuk memulai rekaman jejak belajarmu di platform ini!</p>
                </div>
                <button 
                  className="btn-activity-start"
                  onClick={() => navigate('/modul-belajar')}
                >
                  <i className="fa-solid fa-play mr-1"></i> Mulai Belajar Sekarang
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}