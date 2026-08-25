import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';

export default function EthicalDilemmaPage() {
  const navigate = useNavigate();
  const { showToast } = useProgress();
  const [dilemmaState, setDilemmaState] = useState(null);

  const chooseDilemma = (opt) => {
    const sets = {
      1: { cr: 70, pv: 30, int: 20, msg: 'Evaluasi Pilihan A: Menyembunyikan penggunaan AI merusak transparansi dan integritas akademik.' },
      2: { cr: 10, pv: 10, int: 95, msg: 'Evaluasi Pilihan B (Sangat Etis): Deklarasi eksplisit menjaga kejujuran ilmiah dan mematuhi etika akademik.' },
      3: { cr: 95, pv: 60, int: 5, msg: 'Evaluasi Pilihan C (Pelanggaran Berat): Merupakan plagiarisme langsung yang melanggar hak cipta.' },
    };
    setDilemmaState(sets[opt]);
    if (opt === 2) showToast('Keputusan sangat etis!', 'success');
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
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--indigo)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
            SANDBOX LAB 03
          </div>
          <h1 className="hub-section-title" style={{ fontSize: '1.6rem' }}>Ethical Dilemma</h1>
          <p className="hub-section-sub">Simulasi Keputusan &amp; Evaluasi Dampak Etika Penggunaan AI</p>
        </div>
      </div>

      <div className="panel" style={{ padding: '28px' }}>
        <div className="lab-inner">
          <div className="lab-box">
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--indigo)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>
              Skenario Studi Kasus
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px' }}>
              Penggunaan Generative AI dalam Karya Akademis &amp; Riset
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.65, marginBottom: '20px' }}>
              Seorang mahasiswa menggunakan AI untuk riset ide awal, merapikan tata bahasa, dan membuat ilustrasi grafik. Tindakan apa yang paling tepat sebelum karya dipublikasikan?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button className="quiz-option" onClick={() => chooseDilemma(1)}>
                <strong>Pilihan A:</strong> Mengklaim 100% murni buatan sendiri tanpa menyebut penggunaan AI.
              </button>
              <button className="quiz-option" onClick={() => chooseDilemma(2)}>
                <strong>Pilihan B:</strong> Mencantumkan deklarasi transparansi penggunaan AI pada bab metode &amp; sitasi.
              </button>
              <button className="quiz-option" onClick={() => chooseDilemma(3)}>
                <strong>Pilihan C:</strong> Menyalin seluruh isi artikel orang lain langsung via AI tanpa verifikasi.
              </button>
            </div>
          </div>

          <div className="lab-sidebar">
            <div className="lab-sidebar-title">Indikator Dampak Etika:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                  <span>Risiko Hak Cipta</span>
                  <span style={{ color: 'var(--amber)' }}>{dilemmaState?.cr || 0}%</span>
                </div>
                <div className="pillar-item-track">
                  <div className="pillar-item-fill" style={{ width: `${dilemmaState?.cr || 0}%`, background: 'var(--amber)' }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                  <span>Risiko Privasi Data</span>
                  <span style={{ color: 'var(--indigo)' }}>{dilemmaState?.pv || 0}%</span>
                </div>
                <div className="pillar-item-track">
                  <div className="pillar-item-fill" style={{ width: `${dilemmaState?.pv || 0}%`, background: 'var(--indigo)' }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                  <span>Integritas Akademik</span>
                  <span style={{ color: 'var(--emerald)' }}>{dilemmaState?.int || 100}%</span>
                </div>
                <div className="pillar-item-track">
                  <div className="pillar-item-fill" style={{ width: `${dilemmaState?.int || 100}%`, background: 'var(--emerald)' }}></div>
                </div>
              </div>
            </div>

            <div
              id="dilemma-feedback"
              style={{
                background: 'var(--white)',
                border: '1px solid var(--line)',
                borderRadius: '12px',
                padding: '14px',
                fontSize: '0.82rem',
                color: 'var(--text-dim)',
                marginTop: '10px',
              }}
            >
              {dilemmaState ? (
                dilemmaState.msg.includes('Evaluasi Pilihan B') ? (
                  <>
                    <strong style={{ color: 'var(--emerald)', display: 'block', marginBottom: '2px' }}>
                      Evaluasi Pilihan B (Sangat Etis):
                    </strong>
                    Deklarasi eksplisit menjaga kejujuran ilmiah dan mematuhi etika akademik.
                  </>
                ) : dilemmaState.msg.includes('Pilihan A') ? (
                  <>
                    <strong style={{ color: 'var(--amber)', display: 'block', marginBottom: '2px' }}>Evaluasi Pilihan A:</strong>
                    Menyembunyikan penggunaan AI merusak transparansi dan integritas akademik.
                  </>
                ) : (
                  <>
                    <strong style={{ color: 'var(--red)', display: 'block', marginBottom: '2px' }}>
                      Evaluasi Pilihan C (Pelanggaran Berat):
                    </strong>
                    Merupakan plagiarisme langsung yang melanggar hak cipta.
                  </>
                )
              ) : (
                'Pilih keputusan di kiri untuk mengevaluasi dampaknya.'
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
