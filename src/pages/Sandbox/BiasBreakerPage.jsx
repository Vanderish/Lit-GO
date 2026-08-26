import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';

export default function BiasBreakerPage() {
  const navigate = useNavigate();
  const { showToast } = useProgress();

  const [factScore, setFactScore] = useState(0);
  const [factFeedback, setFactFeedback] = useState('Pilih kalimat di kiri untuk menguji analisis kamu.');
  const [factWords, setFactWords] = useState([
    { id: 1, text: 'Secara umum sistem bekerja menggunakan pemrosesan data statistik.', isHallu: false, clicked: false },
    { id: 2, text: 'Sebagai contoh, Sumpah Pemuda pertama kali dideklarasikan pada tahun 1995.', isHallu: true, clicked: false, exp: 'Sumpah Pemuda terjadi tahun 1928, bukan 1995!' },
    { id: 3, text: 'Model bahasa dilatih menggunakan miliaran korpus teks digital.', isHallu: false, clicked: false },
    { id: 4, text: 'Oleh karena itu, pria secara alami selalu lebih mahir koding dibanding wanita.', isHallu: true, clicked: false, exp: 'Klaim gender unggul dalam coding adalah Bias AI!' },
    { id: 5, text: 'Selain itu, Albert Einstein adalah pencipta lagu Indonesia Raya.', isHallu: true, clicked: false, exp: 'Albert Einstein adalah fisikawan. Pencipta lagu Indonesia Raya adalah W.R. Supratman!' },
  ]);

  const handleFactClick = (id) => {
    const word = factWords.find((w) => w.id === id);
    if (word.clicked) return;
    const newWords = factWords.map((w) => (w.id === id ? { ...w, clicked: true } : w));
    setFactWords(newWords);
    if (word.isHallu) {
      const newScore = Math.min(3, factScore + 1);
      setFactScore(newScore);
      setFactFeedback(`Tepat! Halusinasi/Bias: ${word.exp}`);
      if (newScore === 3) showToast('Semua halusinasi berhasil teridentifikasi!', 'success');
    } else {
      setFactFeedback('Informasi Valid: Kalimat ini berbasis data faktual yang dapat diverifikasi.');
    }
  };

  const resetHallucination = () => {
    setFactScore(0);
    setFactFeedback('Pilih kalimat di kiri untuk menguji analisis kamu.');
    setFactWords(factWords.map((w) => ({ ...w, clicked: false })));
  };

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
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--amber)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
            SANDBOX LAB 02
          </div>
          <h1 className="hub-section-title" style={{ fontSize: '1.6rem' }}>Bias Breaker</h1>
          <p className="hub-section-sub">Deteksi Halusinasi Teks &amp; Bias Informasi pada Keluaran Model Bahasa</p>
        </div>
      </div>

      <div className="panel" style={{ padding: '28px' }}>
        <div className="lab-inner">
          <div className="lab-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', fontSize: '0.82rem', color: 'var(--text-dim)' }}>
              <span>
                Klik kalimat yang kamu curigai <strong style={{ color: 'var(--navy)' }}>halusinasi atau bias</strong>
              </span>
              <span className="score-pill">
                🎯 Fact Score: <strong id="fact-score" style={{ color: 'var(--amber)' }}>{factScore}</strong>/3
              </span>
            </div>
            <div style={{ fontSize: '0.92rem', lineHeight: 2, color: 'var(--navy-light)', background: '#F8FAFC', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              Teknologi kecerdasan buatan berkembang sangat pesat.
              {factWords.map((w) => (
                <span
                  key={w.id}
                  className="fact-word"
                  onClick={() => handleFactClick(w.id)}
                  style={{
                    cursor: w.clicked ? 'default' : 'pointer',
                    background: w.clicked ? (w.isHallu ? 'rgba(239,68,68,0.12)' : 'rgba(16,185,129,0.12)') : 'transparent',
                    color: w.clicked ? (w.isHallu ? 'var(--red)' : 'var(--emerald)') : 'inherit',
                    textDecoration: w.clicked && w.isHallu ? 'line-through' : 'none',
                    padding: '2px 4px',
                    borderRadius: '4px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {' '}{w.text}
                </span>
              ))}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '14px', fontStyle: 'italic' }}>
              * Klik pada kalimat yang mencurigakan untuk menguji validitas dan memeriksa apakah mengandung bias/halusinasi.
            </div>
          </div>

          <div className="lab-sidebar">
            <div className="lab-sidebar-title">Umpan Balik Analisis:</div>
            <div
              id="fact-feedback"
              style={{
                background: 'var(--white)',
                border: '1px solid var(--line)',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '0.84rem',
                color: 'var(--text-dim)',
                minHeight: '120px',
              }}
            >
              {factFeedback.includes('Tepat!') ? (
                <>
                  <strong style={{ color: 'var(--red)', display: 'block', marginBottom: '4px' }}>
                    <i className="fa-solid fa-triangle-exclamation mr-1"></i> Tepat! Halusinasi/Bias:
                  </strong>
                  <span style={{ color: 'var(--red)' }}>{factFeedback.replace('Tepat! Halusinasi/Bias: ', '')}</span>
                </>
              ) : factFeedback.includes('Informasi Valid') ? (
                <>
                  <strong style={{ color: 'var(--emerald)', display: 'block', marginBottom: '4px' }}>
                    <i className="fa-solid fa-circle-check mr-1"></i> Informasi Valid:
                  </strong>
                  <span style={{ color: 'var(--emerald)' }}>Kalimat ini berbasis data faktual yang dapat diverifikasi.</span>
                </>
              ) : (
                factFeedback
              )}
            </div>
            <button className="btn-lab-ghost" onClick={resetHallucination} style={{ width: '100%', marginTop: '10px' }}>
              <i className="fa-solid fa-rotate-right mr-1"></i> Reset Simulasi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
