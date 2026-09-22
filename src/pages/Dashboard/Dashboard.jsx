import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import RadarReadinessPage from '../RadarReadiness/RadarReadinessPage';
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

  return (
    <div className="dashboard-container">
      <div className="wrap">
        
        {/* ========================================================= */}
        {/* HERO BENTO BANNER (Personalized Greeting & Quick Launch)  */}
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
                <span className="metric-val text-indigo">{hasRadar ? `${avgRadarScore}%` : 'Pre-test'}</span>
                <span className="metric-lbl">AI Readiness</span>
              </div>
            </div>

            <div className="bento-cta-row">
              <button className="btn-bento-primary" onClick={() => navigate('/modul-belajar')}>
                <i className="fa-solid fa-book-open-reader mr-2"></i> Lanjutkan Belajar
              </button>
              <button className="btn-bento-ghost" onClick={() => navigate('/sandbox/deepfake-detective')}>
                <i className="fa-solid fa-microchip mr-2"></i> Uji Deepfake Lab
              </button>
            </div>
          </div>

          <div className="bento-right-col">
            <div className="mascot-card-bento">
              <div className="mascot-avatar-circle">
                <i className="fa-solid fa-robot"></i>
                <div className="mascot-glow-ring"></div>
              </div>
              <div className="mascot-speech-bubble">
                <i className="fa-solid fa-quote-left mr-1 text-indigo"></i>
                {hasRadar 
                  ? "Kesiapan AI kamu sudah terpetakan! Tingkatkan skor pilar yang masih rendah di modul belajar ya!"
                  : "Mulai petualanganmu dengan mengikuti Pre-test Radar Readiness untuk mengetahui level kesiapanmu!"}
              </div>
              <div className="mascot-action-tag">
                <span className="pulse-dot-indigo"></span> AI Companion Active
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            KOMPONEN RADAR DI-EMBED DI SINI (Termasuk Modalnya)
            ================================================== */}
        <RadarReadinessPage embedded={true} />

        {/* ========================================================= */}
        {/* 4-PILLAR RECOMMENDATIONS GRID (Rapi, Sejajar, Proporsional)*/}
        {/* ========================================================= */}
        <div className="section-header-block">
          <div className="section-badge-pre">
            <i className="fa-solid fa-compass text-indigo mr-1"></i> 4 PILAR UTAMA
          </div>
          <h2 className="section-title-clean">Rekomendasi Pembelajaran Terarah</h2>
          <p className="section-desc-clean">
            Tingkatkan pemahaman pada tiap pilar kecerdasan buatan melalui silabus komprehensif terstandarisasi.
          </p>
        </div>

        <div className="dashboard-pillars-grid">
          
          {/* Pilar 1 */}
          <div className="panel dashboard-pillar-panel pillar-border-indigo">
            <div className="pillar-header">
              <div className="pillar-icon pillar-icon-indigo">
                <i className="fa-solid fa-brain"></i>
              </div>
              <div className="pillar-title-wrap">
                <span className="pillar-badge badge-indigo">Pilar 01</span>
                <h3 className="pillar-title">Pemahaman Dasar AI</h3>
              </div>
            </div>
            
            <div className="pillar-progress-track">
              <div className="pillar-progress-fill fill-indigo" style={{ width: `${radar[0]}%` }}></div>
            </div>
            <div className="pillar-score-row">
              <span className="score-label">Skor Kesiapan:</span>
              <strong className="score-val text-indigo">{radar[0]}%</strong>
            </div>

            <p className="pillar-desc">
              Memahami definisi fundamental AI, sejarah perkembangan, keterbatasan sistem LLM, dan mitigasi halusinasi data.
            </p>
            
            <button className="btn-pillar-cta" onClick={() => navigate('/modul-belajar')}>
              <span>Pelajari Modul 1</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          {/* Pilar 2 */}
          <div className="panel dashboard-pillar-panel pillar-border-teal">
            <div className="pillar-header">
              <div className="pillar-icon pillar-icon-teal">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <div className="pillar-title-wrap">
                <span className="pillar-badge badge-teal">Pilar 02</span>
                <h3 className="pillar-title">Etika &amp; Keamanan Data</h3>
              </div>
            </div>

            <div className="pillar-progress-track">
              <div className="pillar-progress-fill fill-teal" style={{ width: `${radar[1]}%` }}></div>
            </div>
            <div className="pillar-score-row">
              <span className="score-label">Skor Kesiapan:</span>
              <strong className="score-val text-teal">{radar[1]}%</strong>
            </div>

            <p className="pillar-desc">
              Memahami hak cipta AI, regulasi perlindungan data pribadi, bias algoritma, dan deteksi rekayasa deepfake visual.
            </p>
            
            <button className="btn-pillar-cta" onClick={() => navigate('/modul-belajar')}>
              <span>Pelajari Modul 2</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          {/* Pilar 3 */}
          <div className="panel dashboard-pillar-panel pillar-border-amber">
            <div className="pillar-header">
              <div className="pillar-icon pillar-icon-amber">
                <i className="fa-solid fa-terminal"></i>
              </div>
              <div className="pillar-title-wrap">
                <span className="pillar-badge badge-amber">Pilar 03</span>
                <h3 className="pillar-title">Prompt Engineering</h3>
              </div>
            </div>

            <div className="pillar-progress-track">
              <div className="pillar-progress-fill fill-amber" style={{ width: `${radar[2]}%` }}></div>
            </div>
            <div className="pillar-score-row">
              <span className="score-label">Skor Kesiapan:</span>
              <strong className="score-val text-amber">{radar[2]}%</strong>
            </div>

            <p className="pillar-desc">
              Menyusun instruksi terstruktur dengan formula persona, konteks, format output, zero-shot, dan few-shot prompting.
            </p>
            
            <button className="btn-pillar-cta" onClick={() => navigate('/modul-belajar')}>
              <span>Pelajari Modul 3</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          {/* Pilar 4 */}
          <div className="panel dashboard-pillar-panel pillar-border-emerald">
            <div className="pillar-header">
              <div className="pillar-icon pillar-icon-emerald">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <div className="pillar-title-wrap">
                <span className="pillar-badge badge-emerald">Pilar 04</span>
                <h3 className="pillar-title">Critical Thinking</h3>
              </div>
            </div>

            <div className="pillar-progress-track">
              <div className="pillar-progress-fill fill-emerald" style={{ width: `${radar[3]}%` }}></div>
            </div>
            <div className="pillar-score-row">
              <span className="score-label">Skor Kesiapan:</span>
              <strong className="score-val text-emerald">{radar[3]}%</strong>
            </div>

            <p className="pillar-desc">
              Melatih skeptisisme sehat, melakukan verifikasi fakta silang (*cross-check*), dan mengevaluasi validitas output AI.
            </p>
            
            <button className="btn-pillar-cta" onClick={() => navigate('/modul-belajar')}>
              <span>Pelajari Modul 6</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}