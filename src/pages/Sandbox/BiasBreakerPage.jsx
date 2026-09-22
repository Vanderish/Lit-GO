import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import './SandboxLabs.css';

// Dataset Kasus dengan Fixed Answer Key
const DATASET_CASES = [
  {
    id: 'case-1',
    topic: 'Sejarah & Teknologi',
    subTitle: 'Output Ringkasan LLM: Komputasi & Sejarah Nasional',
    modelTag: 'GPT-4o Synthesized #01',
    items: [
      { id: 101, text: 'Teknologi kecerdasan buatan modern berkembang pesat berkat komputasi GPU.', isHallu: false, exp: 'Fakta Valid: Akselerasi komputasi berbasis GPU memang menjadi pendorong utama revolusi Deep Learning.' },
      { id: 102, text: 'Secara umum sistem bekerja menggunakan pemrosesan data statistik dan probabilitas token.', isHallu: false, exp: 'Fakta Valid: LLM memprediksi kata berikutnya berbasis distribusi probabilitas korpus teks.' },
      { id: 103, text: 'Sebagai contoh, Sumpah Pemuda pertama kali dideklarasikan pada tahun 1995.', isHallu: true, exp: 'Halusinasi Kronologi: Sumpah Pemuda dideklarasikan pada 28 Oktober 1928, bukan 1995!' },
      { id: 104, text: 'Model bahasa dilatih menggunakan miliaran korpus teks digital dari berbagai domain.', isHallu: false, exp: 'Fakta Valid: Dataset pra-pelatihan model fondasi tersusun dari ratusan miliar token teks digital.' },
      { id: 105, text: 'Oleh karena itu, pria secara alami selalu lebih mahir koding dibanding wanita.', isHallu: true, exp: 'Bias Stereotip Gender: Kemahiran pemrograman tidak ditentukan oleh gender biologis, melainkan latihan dan pendidikan.' },
      { id: 106, text: 'Selain itu, Albert Einstein adalah tokoh pencipta lagu kebangsaan Indonesia Raya.', isHallu: true, exp: 'Halusinasi Faktual: Albert Einstein adalah fisikawan teoretis. Pencipta lagu Indonesia Raya adalah W.R. Supratman!' },
    ]
  },
  {
    id: 'case-2',
    topic: 'Kesehatan & Medis Terapan',
    subTitle: 'Output Konsultasi AI: Farmakologi & Biologi Manusia',
    modelTag: 'Claude-3.5 Synthesized #02',
    items: [
      { id: 201, text: 'Antibiotik adalah obat yang dirancang khusus untuk membasmi infeksi bakteri.', isHallu: false, exp: 'Fakta Valid: Antibiotik efektif melawan bakteri, bukan virus.' },
      { id: 202, text: 'Penyakit flu biasa akibat virus influenza dapat disembuhkan total dengan antibiotik dosis tinggi.', isHallu: true, exp: 'Halusinasi Medis: Flu disebabkan oleh virus, sehingga antibiotik tidak efektif dan memicu resistensi antimikroba!' },
      { id: 203, text: 'Vaksin bekerja dengan melatih sistem imun mengenali antigen patogen secara aman.', isHallu: false, exp: 'Fakta Valid: Mekanisme vaksinasi adalah pembentukan memori imunologis tanpa memicu penyakit parah.' },
      { id: 204, text: 'Hanya masyarakat di perkotaan yang memiliki risiko terkena diabetes tipe 2.', isHallu: true, exp: 'Bias Demografis: Diabetes tipe 2 dapat terjadi pada siapa saja terlepas dari lokasi tempat tinggal.' },
      { id: 205, text: 'Minum air mendidih 100°C secara langsung terbukti membunuh seluruh virus dalam tubuh seketika.', isHallu: true, exp: 'Halusinasi Berbahaya: Meminum air mendidih menyebabkan luka bakar esofagus parah dan tidak menyembuhkan infeksi sistemik!' },
      { id: 206, text: 'Menjaga pola tidur yang teratur dan hidrasi cukup mendukung kesehatan sistem kekebalan tubuh.', isHallu: false, exp: 'Fakta Valid: Istirahat dan hidrasi merupakan pilar fisiologis penting dalam imunitas tubuh.' },
    ]
  },
  {
    id: 'case-3',
    topic: 'Sains Lingkungan & Astronomi',
    subTitle: 'Output Generatif: Atmosfer Bumi & Eksplorasi Antariksa',
    modelTag: 'Llama-3 Synthesized #03',
    items: [
      { id: 301, text: 'Gas nitrogen merupakan unsur penyusun terbesar atmosfer bumi dengan proporsi sekitar 78%.', isHallu: false, exp: 'Fakta Valid: Komposisi atmosfer bumi didominasi oleh Nitrogen (~78%) dan Oksigen (~21%).' },
      { id: 302, text: 'Gas karbon dioksida adalah penyusun terbesar atmosfer bumi mencapai lebih dari 85%.', isHallu: true, exp: 'Halusinasi Faktual: Karbon dioksida hanya menyusun sekitar 0.04% atmosfer bumi, bukan 85%!' },
      { id: 303, text: 'Energi surya dapat dikonversi menjadi energi listrik melalui sel fotovoltaik.', isHallu: false, exp: 'Fakta Valid: Efek fotovoltaik mengubah energi foton matahari langsung menjadi arus listrik.' },
      { id: 304, text: 'Negara berkembang di wilayah tropis mustahil menerapkan pembangkit listrik tenaga surya secara efisien.', isHallu: true, exp: 'Bias Sosio-Teknis: Wilayah tropis justru memiliki iradiasi matahari paling tinggi dan sangat optimal untuk PLTS.' },
      { id: 305, text: 'Gravitasi di permukaan bulan tercatat 10 kali lebih kuat dibandingkan gravitasi bumi.', isHallu: true, exp: 'Halusinasi Fisika: Gravitasi bulan hanya sekitar 1/6 (16.6%) dari gravitasi bumi, bukan 10 kali lebih kuat!' },
      { id: 306, text: 'Revolusi bumi mengelilingi matahari membutuhkan waktu sekitar 365,25 hari dalam satu tahun.', isHallu: false, exp: 'Fakta Valid: Periode orbit bumi terhadap matahari adalah sekitar 365.25 hari (tahun kabisat).' },
    ]
  }
];

// Fisher-Yates Shuffle Utility
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function BiasBreakerPage() {
  const navigate = useNavigate();
  const { logActivity, showToast } = useProgress();

  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [factWords, setFactWords] = useState([]);
  const [factScore, setFactScore] = useState(0);
  const [feedbackState, setFeedbackState] = useState({
    type: 'neutral',
    title: 'Menunggu Analisis',
    message: 'Klik pada salah satu kalimat di dokumen sebelah kiri yang kamu curigai mengandung bias atau halusinasi.',
  });

  const currentCase = DATASET_CASES[activeCaseIndex];
  const totalHallu = currentCase.items.filter(w => w.isHallu).length;

  // Inisialisasi & acak urutan kalimat saat ganti kasus atau load
  const loadCase = (caseIdx, shouldShuffle = true) => {
    setActiveCaseIndex(caseIdx);
    const selectedCase = DATASET_CASES[caseIdx];
    const initialItems = selectedCase.items.map(item => ({
      ...item,
      clicked: false
    }));
    setFactWords(shouldShuffle ? shuffleArray(initialItems) : initialItems);
    setFactScore(0);
    setFeedbackState({
      type: 'neutral',
      title: 'Menunggu Analisis',
      message: 'Klik pada salah satu kalimat di dokumen sebelah kiri yang kamu curigai mengandung bias atau halusinasi.',
    });
  };

  useEffect(() => {
    loadCase(0, true);
  }, []);

  const handleFactClick = (id) => {
    const word = factWords.find((w) => w.id === id);
    if (word.clicked) return;

    const newWords = factWords.map((w) => (w.id === id ? { ...w, clicked: true } : w));
    setFactWords(newWords);

    if (word.isHallu) {
      const newScore = Math.min(totalHallu, factScore + 1);
      setFactScore(newScore);
      setFeedbackState({
        type: 'danger',
        title: '⚠️ Terdeteksi Halusinasi / Bias!',
        message: word.exp,
      });

      if (newScore === totalHallu) {
        logActivity(`Menuntaskan Analisis Bias Breaker: ${currentCase.title} ⚡`, 'fa-solid fa-bolt', 'amber');
        showToast('Luar biasa! Semua anomali pada dataset ini berhasil ditemukan!', 'success');
      }
    } else {
      setFeedbackState({
        type: 'success',
        title: '✓ Pernyataan Valid (Fakta)',
        message: word.exp,
      });
    }
  };

  const handleResetCurrentCase = () => {
    // Acak ulang susunan kalimat pada kasus aktif
    loadCase(activeCaseIndex, true);
    showToast('Urutan kalimat berhasil diacak ulang!', 'indigo');
  };

  const handleSwitchCase = (newIndex) => {
    loadCase(newIndex, true);
    showToast(`Dataset dialihkan ke topik: ${DATASET_CASES[newIndex].topic}`, 'indigo');
  };

  return (
    <div className="page-wrap">
      {/* Header */}
      <div className="hub-section-head" style={{ marginBottom: '24px' }}>
        <div>
          <span className="lab-badge lab-badge-amber">
            <i className="fa-solid fa-brain"></i> SANDBOX LAB 02
          </span>
          <h1 className="hub-section-title" style={{ fontSize: '1.65rem' }}>Bias Breaker</h1>
          <p className="hub-section-sub">Deteksi Halusinasi Teks &amp; Bias Informasi pada Model Bahasa (Fixed Answer Key Dataset)</p>
        </div>
      </div>

      {/* Dataset Case Selector Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '20px', background: 'var(--white)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <i className="fa-solid fa-database mr-1 text-indigo"></i> Pilih Kasus Dataset:
          </span>
          {DATASET_CASES.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              onClick={() => handleSwitchCase(idx)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                border: activeCaseIndex === idx ? '1px solid var(--indigo)' : '1px solid #E2E8F0',
                background: activeCaseIndex === idx ? 'rgba(59, 130, 246, 0.1)' : '#F8FAFC',
                color: activeCaseIndex === idx ? 'var(--indigo)' : 'var(--navy-light)',
                transition: 'all 0.2s',
              }}
            >
              Kasus #{idx + 1}: {c.topic}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="btn-lab-ghost"
          onClick={handleResetCurrentCase}
          style={{ fontSize: '0.78rem', padding: '6px 12px' }}
          title="Acak kembali susunan kalimat agar tidak menghafal posisi"
        >
          <i className="fa-solid fa-shuffle mr-1"></i> Acak Urutan Posisi
        </button>
      </div>

      {/* Main Grid */}
      <div className="sandbox-layout-grid">
        {/* Left Column: Interactive Document */}
        <div className="sandbox-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fa-regular fa-file-lines" style={{ color: 'var(--indigo)' }}></i> {currentCase.subTitle}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                Urutan kalimat diacak otomatis. Klik kalimat yang mencurigakan.
              </div>
            </div>
            <div className="document-tag">
              <i className="fa-solid fa-microchip"></i> {currentCase.modelTag}
            </div>
          </div>

          <div className="document-sheet">
            <div className="document-sheet-header">
              <span><strong>Topik:</strong> {currentCase.topic}</span>
              <span><strong>Metode:</strong> Deterministic Fact Verification</span>
            </div>

            <div style={{ fontSize: '0.94rem', lineHeight: 2.2 }}>
              {factWords.map((w) => {
                let statusClass = '';
                if (w.clicked) {
                  statusClass = w.isHallu ? 'is-clicked is-hallu' : 'is-clicked is-fact';
                }

                return (
                  <span
                    key={w.id}
                    className={`fact-sentence-btn ${statusClass}`}
                    onClick={() => handleFactClick(w.id)}
                    title={w.clicked ? 'Sudah diperiksa' : 'Klik untuk menguji validitas kalimat ini'}
                  >
                    {w.text}{' '}
                  </span>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '16px' }}>
            <i className="fa-solid fa-circle-info" style={{ color: 'var(--indigo)' }}></i>
            <span>
              <strong>Petunjuk:</strong> Terdapat tepat <strong>{totalHallu} kekeliruan (halusinasi/bias)</strong> yang diselipkan pada teks di atas. Temukan semuanya!
            </span>
          </div>
        </div>

        {/* Right Column: Diagnostic Sidebar */}
        <div className="sandbox-sidebar">
          {/* Fact Score Card */}
          <div className="sandbox-sidebar-card">
            <div className="sandbox-sidebar-title">
              <span>Fact-Check Accuracy</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)' }}>
                Target: {totalHallu} Temuan
              </span>
            </div>

            <div className="fact-score-display">
              <div className="fact-score-number">{factScore}/{totalHallu}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#92400E' }}>
                  {factScore === totalHallu ? '🎉 Sempurna! Terpecahkan' : `${factScore} dari ${totalHallu} Teridentifikasi`}
                </div>
                <div className="fact-score-dots">
                  {Array.from({ length: totalHallu }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`score-dot ${idx < factScore ? 'active' : ''}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Card */}
          <div className="sandbox-sidebar-card">
            <div className="sandbox-sidebar-title">
              <span>Hasil Analisis Verifikasi</span>
              {feedbackState.type === 'danger' && (
                <span style={{ fontSize: '0.72rem', color: 'var(--red)', fontWeight: 700 }}>Bias/Halusinasi</span>
              )}
              {feedbackState.type === 'success' && (
                <span style={{ fontSize: '0.72rem', color: 'var(--emerald)', fontWeight: 700 }}>Valid</span>
              )}
            </div>

            <div className={`feedback-callout ${feedbackState.type}`}>
              <div style={{ fontSize: '0.86rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                {feedbackState.title}
              </div>
              <p style={{ fontSize: '0.82rem', lineHeight: 1.6, margin: 0 }}>
                {feedbackState.message}
              </p>
            </div>

            <button className="btn-lab-action" onClick={handleResetCurrentCase} style={{ marginTop: '16px' }}>
              <i className="fa-solid fa-rotate-right"></i> Reset &amp; Acak Ulang Kasus Ini
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
