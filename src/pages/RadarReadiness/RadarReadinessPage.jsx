import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { useProgress } from '../../context/ProgressContext';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

export default function RadarReadinessPage() {
  const navigate = useNavigate();
  const { state, saveState, showToast } = useProgress();
  const [isRadarModalOpen, setRadarModalOpen] = useState(false);
  const [radarAnswers, setRadarAnswers] = useState([3, 2, 3, 4, 2, 2, 3, 3]);

  const handleRadarSubmit = () => {
    const vals = radarAnswers;
    const newRadar = [
      Math.round(((vals[0] + vals[1]) / 10) * 100),
      Math.round(((vals[2] + vals[3]) / 10) * 100),
      Math.round(((vals[4] + vals[5]) / 10) * 100),
      Math.round(((vals[6] + vals[7]) / 10) * 100),
    ];
    let newBadges = [...state.badges];
    if (!newBadges.includes(1)) newBadges.push(1);
    saveState({ ...state, radar: newRadar, hasRadar: true, badges: newBadges });
    setRadarModalOpen(false);
    showToast('Pre-Test tersimpan! Radar kecakapan diperbarui.', 'success');
  };

  const radarData = {
    labels: ['Pemahaman Dasar', 'Etika & Keamanan', 'Prompting', 'Berpikir Kritis'],
    datasets: [
      {
        label: 'Skor (%)',
        data: state.radar || [0, 0, 0, 0],
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        borderColor: '#3B82F6',
        pointBackgroundColor: '#F59E0B',
        borderWidth: 2.5,
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        min: 0,
        max: 100,
        grid: { color: '#E2E8F0' },
        angleLines: { color: '#E2E8F0' },
        ticks: { display: false },
        pointLabels: {
          font: { size: 11, family: 'Space Grotesk', weight: 'bold' },
          color: '#334155',
        },
      },
    },
    plugins: { legend: { display: false } },
  };

  const avgScore = Math.round(state.radar.reduce((a, b) => a + b, 0) / 4);

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
          <h1 className="hub-section-title" style={{ fontSize: '1.6rem' }}>Radar Readiness</h1>
          <p className="hub-section-sub">Asesmen 4 Pilar Kecakapan Literasi Kecerdasan Buatan</p>
        </div>
        <button className="btn-lab" onClick={() => setRadarModalOpen(true)}>
          <i className="fa-solid fa-clipboard-check mr-1"></i> {state.hasRadar ? 'Ulangi Pre-Test' : 'Mulai Pre-Test'}
        </button>
      </div>

      <div className="panel" style={{ padding: '32px' }}>
        <div className="radar-hub-grid">
          <div className="radar-chart-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Radar data={radarData} options={radarOptions} />
          </div>
          <div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>STATUS ASESMEN</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy)' }}>
                {state.hasRadar ? `Level Rata-Rata: ${avgScore}%` : 'Belum Memulai Pre-Test'}
              </div>
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
                  <span><i className="fa-solid fa-magnifying-glass mr-1"></i> Berpikir Kritis &amp; Fact-Checking</span>
                  <strong>{state.radar[3]}%</strong>
                </div>
                <div className="pillar-item-track">
                  <div className="pillar-item-fill" style={{ width: `${state.radar[3]}%`, background: 'var(--emerald)' }}></div>
                </div>
              </div>
            </div>

            <div className="radar-rec" style={{ marginTop: '20px' }}>
              {state.hasRadar
                ? `Berdasarkan asesmen 4 pilar, pilar dengan skor terendah disarankan untuk ditingkatkan melalui modul pembelajaran terkait.`
                : 'Silakan jalankan Pre-Test awal untuk mendapatkan kalibrasi grafis kecakapan AI Anda.'}
            </div>
          </div>
        </div>
      </div>

      {/* Pre-Test Modal */}
      {isRadarModalOpen && (
        <div className="modal-overlay" id="modal-radar">
          <div className="modal-box">
            <div className="modal-head">
              <div className="modal-title">Pre-Test Asesmen Radar</div>
              <button className="modal-close" onClick={() => setRadarModalOpen(false)}>
                ✕
              </button>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', marginBottom: '20px' }}>
              Jawab 8 pertanyaan (skala 1–5) untuk mengkalibrasi radar kecakapan awal kamu.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.84rem' }}>
              {[
                'Saya memahami konsep dasar dan keterbatasan sistem AI.',
                'Saya mengetahui risiko fenomena halusinasi data pada AI.',
                'Saya selalu memeriksa hak cipta sebelum mempublikasikan konten.',
                'Saya tidak pernah memasukkan data rahasia ke dalam prompt publik.',
                'Saya mampu menyusun prompt dengan konteks, instruksi & format jelas.',
                'Saya terbiasa menggunakan teknik few-shot & persona dalam prompting.',
                'Saya selalu melakukan fact-checking terhadap klaim dari AI.',
                'Saya mampu mengenali kejanggalan visual pada foto deepfake.',
              ].map((q, i) => (
                <div key={i}>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    {i + 1}. {q}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={radarAnswers[i]}
                    onChange={(e) => {
                      const newAns = [...radarAnswers];
                      newAns[i] = parseInt(e.target.value);
                      setRadarAnswers(newAns);
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button className="btn-modal-cancel" onClick={() => setRadarModalOpen(false)}>
                Batal
              </button>
              <button className="btn-modal-ok" onClick={handleRadarSubmit}>
                Simpan &amp; Update Radar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
