import { useState } from 'react';
import { useProgress } from '../../context/ProgressContext';
import './SandboxLabs.css';

// Dataset Kasus Audit Transparansi AI
const AUDIT_CASES = [
  {
    id: 'tc-1',
    caseNum: 1,
    category: 'Media Sosial & Endorsement',
    title: 'Postingan Influencer Promosi Suplemen Kesehatan dengan Foto Sebelum/Sesudah Sintetis',
    author: '@fitness_guru_ai',
    platform: 'Instagram / TikTok Post',
    contentSnippet: '"Hasil pemakaian 14 hari suplemen super! Perut langsung sixpack tanpa diet ketat. Link bio untuk diskon 50%!" (Gambar tubuh before/after dibuat 100% menggunakan Midjourney tanpa label apapun).',
    disclosureItems: [
      { id: 'watermark', name: 'Label Visual Sintetis / Watermark AI', hasIt: false, required: true, why: 'Wajib mencantumkan label "Dibuat dengan AI" agar konsumen tidak tertipu oleh klaim khasiat fisik palsu.' },
      { id: 'c2pa', name: 'Metadata Asal-Usul (C2PA / Content Credentials)', hasIt: false, required: true, why: 'Metadata kriptografis dihapus saat pengunggahan sehingga asal-usul foto tidak dapat diverifikasi publik.' },
      { id: 'method', name: 'Deklarasi Prompting / Penjelasan Alat Bantu', hasIt: false, required: false, why: 'Tidak ada keterangan bahwa gambar merupakan ilustrasi konsep semata.' },
      { id: 'human', name: 'Disclaimer Efek Nyata & Verifikasi Medis', hasIt: false, required: true, why: 'Tidak ada tinjauan dokter atau uji klinis; klaim murni rekayasa visual.' },
    ],
    correctScore: 0,
    complianceStatus: 'Pelanggaran Berat (Non-Compliant)',
    verdictType: 'danger',
    legalRationale: 'Melanggar UU Perlindungan Konsumen No. 8/1999 dan Pasal 50 EU AI Act mengenai pelarangan manipulasi visual yang memperdaya keputusan ekonomi konsumen.',
    remediationAction: 'Wajib menyematkan watermark "Simulasi AI / Model Sintetis" dan mencantumkan peringatan hasil nyata bervariasi.',
  },
  {
    id: 'tc-2',
    caseNum: 2,
    category: 'Jurnal Riset Medis & Farmasi',
    title: 'Publikasi Riset Pola Mutasi Virus dengan Bantuan Asisten AI Bio-Informatika',
    author: 'Dr. Sarah & Tim Riset Biomolekular',
    platform: 'Open Access Biomedical Journal',
    contentSnippet: '"Visualisasi 3D folding protein disintesis menggunakan AlphaFold dan divalidasi dengan difraksi sinar-X. Kode prompt dan dataset pelatihan dilampirkan pada Lampiran A."',
    disclosureItems: [
      { id: 'watermark', name: 'Label Visual Sintetis / Watermark AI', hasIt: true, required: true, why: 'Gambar figur 3D diberi caption jelas: "Fig 3. AlphaFold predicted structure with pLDDT > 90".' },
      { id: 'c2pa', name: 'Metadata Asal-Usul (C2PA / Content Credentials)', hasIt: true, required: true, why: 'File mentah PDB (Protein Data Bank) tersertifikasi dan tersimpan di repositori publik terbuka.' },
      { id: 'method', name: 'Deklarasi Prompting / Penjelasan Metodologi', hasIt: true, required: true, why: 'Bab Metodologi menguraikan secara rinci versi model, hyperparameter, dan tanggal komputasi.' },
      { id: 'human', name: 'Indikasi Peninjauan Manusia (Peer Review)', hasIt: true, required: true, why: 'Seluruh struktur divalidasi silang secara basah (wet lab) oleh peneliti manusia sebelum diterbitkan.' },
    ],
    correctScore: 100,
    complianceStatus: 'Sangat Patuh & Berintegritas (Full Compliant)',
    verdictType: 'ethical',
    legalRationale: 'Memenuhi 100% prinsip transparansi UNESCO AI Ethics 2021 dan panduan authorship Nature/Springer mengenai pengungkapan model komputasi.',
    remediationAction: 'Model percontohan standar emas untuk keterbukaan riset sains di era kecerdasan buatan.',
  },
  {
    id: 'tc-3',
    caseNum: 3,
    category: 'Jurnalistik & Konten Publik Pilkada',
    title: 'Pemberitaan Audio Wawancara Kandidat Pemilu Menggunakan Suara AI Kloning',
    author: 'Kanal Berita Independen Web',
    platform: 'Portal Berita & Podcast Online',
    contentSnippet: '"Mendengarkan prediksi calon gubernur mengenai APBD lewat rekaman suara." (Suara dihasilkan lewat Voice Cloning ElevenLabs, dengan teks kecil di akhir artikel: "Suara merupakan simulasi AI").',
    disclosureItems: [
      { id: 'watermark', name: 'Audio Watermark / Suara Peringatan di Awal', hasIt: false, required: true, why: 'Suara tidak memiliki sinyal audio disclaimer di awal rekaman, sehingga pendengar podcast dapat mengira itu rekaman asli.' },
      { id: 'c2pa', name: 'Metadata C2PA / Content Credentials', hasIt: false, required: true, why: 'Audio stream tidak menyertakan watermark frekuensi tak terdengar (inaudible acoustic watermark).' },
      { id: 'method', name: 'Deklarasi di Teks Artikel', hasIt: true, required: true, why: 'Terdapat catatan kaki kecil di bagian bawah artikel yang menyatakan suara adalah simulasi.' },
      { id: 'human', name: 'Izin Subjek / Verifikasi Fakta Pidato', hasIt: false, required: true, why: 'Tidak ada izin tertulis dari kandidat terkait penggunaan sampel suaranya untuk kloning sintetik.' },
    ],
    correctScore: 25,
    complianceStatus: 'Transparansi Parsial & Rawan Tuntutan (High Risk)',
    verdictType: 'warning',
    legalRationale: 'Mencantumkan disclaimer di akhir teks tidak cukup untuk format audio. Melanggar Surat Edaran Menkominfo No. 9/2023 tentang Etika Kecerdasan Buatan dalam penyiaran publik.',
    remediationAction: 'Wajib menambahkan suara narator pembuka "Audio ini disimulasikan menggunakan teknologi AI" sebelum pemutaran klip.',
  }
];

export default function TransparencyCheckPage() {
  const { logActivity, showToast } = useProgress();

  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [userAuditAnswers, setUserAuditAnswers] = useState({});
  const [isAudited, setIsAudited] = useState(false);

  const currentCase = AUDIT_CASES[activeCaseIndex];

  const handleToggleCheck = (itemId, val) => {
    setUserAuditAnswers(prev => ({
      ...prev,
      [itemId]: val
    }));
  };

  const selectCase = (idx) => {
    setActiveCaseIndex(idx);
    setUserAuditAnswers({});
    setIsAudited(false);
    showToast(`Beralih ke Kasus Audit #${idx + 1}: ${AUDIT_CASES[idx].category}`, 'indigo');
  };

  const runAuditCompliance = () => {
    const totalAnswered = Object.keys(userAuditAnswers).length;
    if (totalAnswered < currentCase.disclosureItems.length) {
      showToast('Harap evaluasi ke-4 indikator keterbukaan sebelum menjalankan audit.', 'warning');
      return;
    }

    setIsAudited(true);
    logActivity(`Menuntaskan Audit Transparansi AI: ${currentCase.category} 📋`, 'fa-solid fa-file-shield', 'teal');
    showToast('Audit kepatuhan transparansi selesai dievaluasi!', 'success');
  };

  const resetAudit = () => {
    setUserAuditAnswers({});
    setIsAudited(false);
  };

  // Hitung akurasi audit pengguna
  let correctMatches = 0;
  if (isAudited) {
    currentCase.disclosureItems.forEach(item => {
      const userVal = userAuditAnswers[item.id];
      if ((userVal === 'ada' && item.hasIt) || (userVal === 'tidak' && !item.hasIt)) {
        correctMatches++;
      }
    });
  }

  return (
    <div className="page-wrap">
      {/* Header */}
      <div className="hub-section-head" style={{ marginBottom: '24px' }}>
        <div>
          <span className="lab-badge" style={{ background: 'rgba(20, 184, 166, 0.12)', color: '#0D9488', border: '1px solid rgba(20, 184, 166, 0.25)' }}>
            <i className="fa-solid fa-file-shield"></i> SANDBOX LAB 05 (COMPLIANCE AUDIT)
          </span>
          <h1 className="hub-section-title" style={{ fontSize: '1.65rem' }}>Transparency Check</h1>
          <p className="hub-section-sub">Audit Keterbukaan &amp; Kepatuhan Regulasi AI Disclosure (EU AI Act Art. 50 &amp; UNESCO Standards)</p>
        </div>
      </div>

      {/* Case Selector Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '20px', background: 'var(--white)', padding: '12px 18px', borderRadius: '14px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <i className="fa-solid fa-magnifying-glass-chart mr-1 text-teal"></i> Pilih Kasus Audit Produk:
          </span>
          {AUDIT_CASES.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              onClick={() => selectCase(idx)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                border: activeCaseIndex === idx ? '1px solid var(--teal)' : '1px solid #E2E8F0',
                background: activeCaseIndex === idx ? 'rgba(20, 184, 166, 0.1)' : '#F8FAFC',
                color: activeCaseIndex === idx ? 'var(--teal)' : 'var(--navy-light)',
                transition: 'all 0.2s',
              }}
            >
              Kasus #{idx + 1}: {c.category}
            </button>
          ))}
        </div>

        <span style={{ fontSize: '0.76rem', color: 'var(--text-dim)', fontWeight: 600 }}>
          Kasus {activeCaseIndex + 1} dari {AUDIT_CASES.length}
        </span>
      </div>

      {/* Main Grid */}
      <div className="sandbox-layout-grid">
        {/* Left Column: Case Inspection & Audit Checklist */}
        <div className="sandbox-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--teal)', letterSpacing: '0.06em' }}>
              <i className="fa-solid fa-cube mr-1"></i> Produk / Konten yang Di-Audit
            </span>
            <span style={{ fontSize: '0.76rem', padding: '3px 8px', borderRadius: '6px', background: '#F1F5F9', color: 'var(--navy-light)', fontWeight: 600 }}>
              {currentCase.platform}
            </span>
          </div>

          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '10px' }}>
            {currentCase.title}
          </h2>

          <div style={{ background: '#FAFBFD', border: '1px dashed #CBD5E1', borderRadius: '12px', padding: '16px', marginBottom: '22px', fontSize: '0.88rem', color: 'var(--navy-light)', lineHeight: 1.6 }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '6px' }}>
              KONTEN DITAMPILKAN PUBLIK OLEH: <strong>{currentCase.author}</strong>
            </div>
            <em>{currentCase.contentSnippet}</em>
          </div>

          {/* Checklist 4 Pilar Transparansi */}
          <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-list-check text-teal"></i> Form Audit Transparansi Pengguna:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {currentCase.disclosureItems.map((item, idx) => {
              const userVal = userAuditAnswers[item.id];
              return (
                <div
                  key={item.id}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    background: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '2px' }}>
                      {idx + 1}. {item.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                      {item.why}
                    </div>
                  </div>

                  {/* Radio Buttons (Ada / Tidak Ada) */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => handleToggleCheck(item.id, 'ada')}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        border: userVal === 'ada' ? '1.5px solid var(--emerald)' : '1px solid #CBD5E1',
                        background: userVal === 'ada' ? 'rgba(16, 185, 129, 0.12)' : '#F8FAFC',
                        color: userVal === 'ada' ? '#065F46' : 'var(--text-dim)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <i className="fa-solid fa-circle-check mr-1"></i> Terpenuhi (Ada)
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleCheck(item.id, 'tidak')}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        border: userVal === 'tidak' ? '1.5px solid var(--red)' : '1px solid #CBD5E1',
                        background: userVal === 'tidak' ? 'rgba(239, 68, 68, 0.12)' : '#F8FAFC',
                        color: userVal === 'tidak' ? '#991B1B' : 'var(--text-dim)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <i className="fa-solid fa-circle-xmark mr-1"></i> Tidak Ada / Hilang
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              className="btn-lab"
              onClick={runAuditCompliance}
              style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)', boxShadow: '0 4px 14px rgba(20, 184, 166, 0.25)' }}
            >
              <i className="fa-solid fa-clipboard-check"></i> Jalankan Evaluasi Audit Kepatuhan
            </button>
            <button type="button" className="btn-lab-ghost" onClick={resetAudit}>
              <i className="fa-solid fa-rotate-right"></i> Reset
            </button>
          </div>
        </div>

        {/* Right Column: Diagnostic & Legal Rationale Sidebar */}
        <div className="sandbox-sidebar">
          {/* Compliance Status Card */}
          <div className="sandbox-sidebar-card">
            <div className="sandbox-sidebar-title">
              <span>Status Kepatuhan Regulasi</span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>EU AI Act Art. 50</span>
            </div>

            {isAudited ? (
              <div>
                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: '10px',
                    marginBottom: '14px',
                    background: currentCase.verdictType === 'ethical' ? 'rgba(16, 185, 129, 0.1)' : currentCase.verdictType === 'danger' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                    border: `1px solid ${currentCase.verdictType === 'ethical' ? 'rgba(16, 185, 129, 0.3)' : currentCase.verdictType === 'danger' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                  }}
                >
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: currentCase.verdictType === 'ethical' ? '#065F46' : currentCase.verdictType === 'danger' ? '#991B1B' : '#92400E' }}>
                    {currentCase.complianceStatus}
                  </div>
                  <div style={{ fontSize: '0.78rem', marginTop: '4px', color: 'var(--navy-light)' }}>
                    Tingkat Akurasi Evaluasi Kamu: <strong>{correctMatches} / 4 Kriteria Tepat</strong>
                  </div>
                </div>

                <div style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--navy-light)' }}>
                  <strong>⚖️ Landasan Hukum &amp; Standar:</strong><br />
                  {currentCase.legalRationale}
                </div>

                <div style={{ marginTop: '12px', borderTop: '1px solid #E2E8F0', paddingTop: '10px', fontSize: '0.78rem', color: '#0D9488' }}>
                  <strong>💡 Langkah Perbaikan (*Remediation*):</strong><br />
                  {currentCase.remediationAction}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 16px', color: 'var(--text-dim)', fontSize: '0.84rem' }}>
                <i className="fa-solid fa-clipboard-question" style={{ fontSize: '1.6rem', color: 'var(--teal)', marginBottom: '8px', display: 'block' }}></i>
                Isi ke-4 kriteria pengungkapan di sebelah kiri dan klik <strong>Jalankan Evaluasi</strong> untuk melihat status kepatuhan regulasi.
              </div>
            )}
          </div>

          {/* Quick Transparency Principle Reference */}
          <div className="sandbox-sidebar-card" style={{ background: '#F8FAFC' }}>
            <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="fa-solid fa-shield-halved text-teal"></i> 3 Pilar Regulasi AI Disclosure:
            </div>
            <ul style={{ fontSize: '0.78rem', color: 'var(--navy-light)', paddingLeft: '18px', lineHeight: 1.65, margin: 0 }}>
              <li><strong>Inform the User:</strong> Pengguna wajib diberi tahu jika berinteraksi dengan AI atau melihat konten sintetis.</li>
              <li><strong>Provenance &amp; C2PA:</strong> Menjaga jejak rekam digital agar tidak memicu misinformasi massal.</li>
              <li><strong>Non-Deceptive Presentation:</strong> Dilarang menggunakan media AI untuk klaim medis/finansial palsu.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
