import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import RadarReadinessPage from '../RadarReadiness/RadarReadinessPage';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const { state } = useProgress();

  // Ekstrak state radar untuk digunakan di 4 kotak rekomendasi bawah
  const radar = Array.isArray(state?.radar) && state.radar.length === 4 ? state.radar : [0, 0, 0, 0];

  return (
    <div className="dashboard-container">
      <div className="wrap">
        
        {/* LOBBY HERO & QUICK LAUNCH CARDS */}
        <div className="hub-lobby dashboard-lobby-center">
          <div className="hub-lobby-flex">
            {/* Mascot Room Center */}
            <div className="hub-center">
              <div className="mascot-dialog">
                <i className="fa-solid fa-quote-left mascot-quote-icon"></i>
                Halo! Selamat datang di Lit-GO. Yuk mulai dari Radar Readiness untuk kenali level literasi AI kamu!
              </div>
              <div className="mascot-slot-hub">[ ruang maskot — diisi kemudian ]</div>
              <button className="btn-hub-start" onClick={() => navigate('/sandbox/deepfake-detective')}>
                <i className="fa-solid fa-play"></i> Mulai Jelajahi Lab
              </button>
            </div>
          </div>
        </div>

        {/* ==================================================
            KOMPONEN RADAR DI-EMBED DI SINI (Termasuk Modalnya)
            ================================================== */}
        <RadarReadinessPage embedded={true} />

        {/* Detailed 4-Pillar Recommendations Grid */}
        <div className="dashboard-pillars-grid">
          <div className="panel dashboard-pillar-panel">
            <div className="pillar-header">
              <div className="pillar-icon pillar-icon-indigo">
                <i className="fa-solid fa-brain"></i>
              </div>
              <div>
                <h3 className="pillar-title">Pemahaman Dasar</h3>
                <span className="pillar-score">Skor: {radar[0]}%</span>
              </div>
            </div>
            <p className="pillar-desc">
              Mengukur pemahamanmu tentang definisi AI, sejarah singkat, keterbatasan sistem, dan penanganan halusinasi data.
            </p>
            <button className="btn-back-dashboard pillar-btn" onClick={() => navigate('/modul-belajar')}>
              Pelajari Modul 1 →
            </button>
          </div>

          <div className="panel dashboard-pillar-panel">
            <div className="pillar-header">
              <div className="pillar-icon pillar-icon-teal">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <div>
                <h3 className="pillar-title">Etika &amp; Keamanan</h3>
                <span className="pillar-score">Skor: {radar[1]}%</span>
              </div>
            </div>
            <p className="pillar-desc">
              Mengukur kesadaran etika hak cipta, privasi data rahasia, serta kemampuan deteksi rekayasa deepfake visual.
            </p>
            <button className="btn-back-dashboard pillar-btn" onClick={() => navigate('/modul-belajar')}>
              Pelajari Modul 2 →
            </button>
          </div>

          <div className="panel dashboard-pillar-panel">
            <div className="pillar-header">
              <div className="pillar-icon pillar-icon-amber">
                <i className="fa-solid fa-terminal"></i>
              </div>
              <div>
                <h3 className="pillar-title">Prompt Engineering</h3>
                <span className="pillar-score">Skor: {radar[2]}%</span>
              </div>
            </div>
            <p className="pillar-desc">
              Mengukur kecakapan menyusun instruksi prompt terstruktur dengan konteks, format, persona, dan teknik few-shot.
            </p>
            <button className="btn-back-dashboard pillar-btn" onClick={() => navigate('/modul-belajar')}>
              Pelajari Modul 3 →
            </button>
          </div>

          <div className="panel dashboard-pillar-panel">
            <div className="pillar-header">
              <div className="pillar-icon pillar-icon-emerald">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <div>
                <h3 className="pillar-title">Critical Thinking</h3>
                <span className="pillar-score">Skor: {radar[3]}%</span>
              </div>
            </div>
            <p className="pillar-desc">
              Mengukur kemampuan melatih skeptisisme sehat, melakukan fact-checking, dan mengevaluasi klaim buatan AI.
            </p>
            <button className="btn-back-dashboard pillar-btn" onClick={() => navigate('/modul-belajar')}>
              Pelajari Modul 6 →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}