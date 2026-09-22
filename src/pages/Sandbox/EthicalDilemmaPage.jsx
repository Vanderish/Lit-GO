import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import './SandboxLabs.css';

const ETHICAL_CASES = [
  {
    id: 'eth-1',
    caseNum: 1,
    topic: 'Akademik & Riset Ilmiah',
    title: 'Penggunaan Generative AI dalam Penulisan Karya Ilmiah & Jurnal Riset',
    contextDesc: 'Seorang peneliti menggunakan LLM untuk merangkum 30 jurnal terdahulu, memperbaiki tata bahasa Inggris, dan menyusun draf hipotesis. Deadline submisi tinggal 2 hari lagi.',
    question: 'Tindakan apa yang paling tepat, berintegritas, dan mematuhi etika publikasi ilmiah internasional?',
    options: [
      {
        id: 1,
        letter: 'A',
        type: 'warning',
        cr: 65,
        pv: 30,
        int: 30,
        title: 'Klaim 100% Karya Orisinal Mandiri (Tanpa Deklarasi)',
        desc: 'Mengklaim seluruh teks adalah murni tulisan tangan sendiri tanpa menyebutkan keterlibatan AI generatif sama sekali.',
        evalTitle: '⚠️ Pelanggaran Prinsip Transparansi Metodologis',
        whyReason: 'Menyembunyikan penggunaan AI melanggar asas kejujuran ilmiah. Meskipun AI membantu sebagai asisten, pembaca dan reviewer berhak mengetahui metodologi yang digunakan agar temuan dapat direplikasi dan divalidasi.',
        regulations: 'Melanggar Pedoman Etika Publikasi COPE (Committee on Publication Ethics) & Standar Transparansi IEEE.',
        actionGuide: 'Selalu cantumkan deklarasi penggunaan asisten AI pada bagian Acknowledgments atau Metode Penelitian.',
      },
      {
        id: 2,
        letter: 'B',
        type: 'ethical',
        cr: 5,
        pv: 10,
        int: 98,
        title: 'Deklarasi Transparan, Sitasi Prompt & Verifikasi Sumber Asli',
        desc: 'Mencantumkan pernyataan eksplisit penggunaan AI pada bab metode, melampirkan log prompt, dan memverifikasi setiap sitasi secara manual.',
        evalTitle: '🏆 Standar Emas Integritas & Praktik Etis',
        whyReason: 'Deklarasi transparan melindungi orisinalitas peneliti sekaligus mengakui alat bantu yang digunakan. Verifikasi manual terhadap sumber rujukan memastikan tidak ada halusinasi sitasi fiktif yang merusak kredibilitas sains.',
        regulations: 'Sesuai dengan UNESCO Recommendation on the Ethics of AI (2021) & Panduan Penulis Nature/Springer 2024.',
        actionGuide: 'Pertahankan metode ini: catat versi model AI yang digunakan, tanggal akses, dan cakupan kontribusinya.',
      },
      {
        id: 3,
        letter: 'C',
        type: 'danger',
        cr: 95,
        pv: 60,
        int: 5,
        title: 'Salin Utuh Output AI Tanpa Membaca & Verifikasi Ulang',
        desc: 'Menyalin langsung seluruh paragraf buatan AI ke dalam naskah akhir tanpa memeriksa kebenaran data maupun lisensi sumbernya.',
        evalTitle: '🚨 Pelanggaran Berat: Fabrikasi & Risiko Plagiarisme',
        whyReason: 'Tindakan ini sangat berisiko memasukkan sitasi palsu (halusinasi AI), plagiarisme terselubung, dan klaim data yang tidak dapat dipertanggungjawabkan secara hukum maupun akademik.',
        regulations: 'Dapat dikenakan sanksi diskualifikasi, pencabutan publikasi (retraction), dan sanksi pelanggaran hak cipta.',
        actionGuide: 'Dilarang keras mempublikasikan teks mentah sintetis tanpa kurasi, penelaahan kritis, dan tanggung jawab manusiawi.',
      },
    ]
  },
  {
    id: 'eth-2',
    caseNum: 2,
    topic: 'Kesehatan & Privasi Pasien',
    title: 'Analisis Data Rekam Medis Pasien Menggunakan Model AI Publik',
    contextDesc: 'Seorang staf klinik ingin mempercepat analisis riwayat penyakit 50 pasien dengan mengunggah spreadsheet berisi nama, NIK, alamat, dan diagnosis ke chatbot AI online gratis.',
    question: 'Bagaimana seharusnya staf tersebut bertindak demi menjaga kerahasiaan dan privasi data pasien?',
    options: [
      {
        id: 1,
        letter: 'A',
        type: 'danger',
        cr: 20,
        pv: 98,
        int: 10,
        title: 'Unggah Langsung Seluruh Data Mentah Pasien ke Cloud AI Publik',
        desc: 'Mengunggah file Excel lengkap dengan identitas pribadi pasien demi efisiensi waktu pengerjaan tugas.',
        evalTitle: '🚨 Pelanggaran Berat Hukum Privasi Data (UU PDP)',
        whyReason: 'Platform AI publik umumnya menggunakan data input pengguna untuk melatih model mereka. Mengunggah data kesehatan pribadi membocorkan rahasia medis ke pihak ketiga tanpa izin subjek data.',
        regulations: 'Melanggar UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP) & Regulasi HIPAA internasional.',
        actionGuide: 'Data kesehatan adalah data pribadi yang bersifat spesifik/sensitif yang wajib dilindungi dengan enkripsi ketat.',
      },
      {
        id: 2,
        letter: 'B',
        type: 'ethical',
        cr: 5,
        pv: 8,
        int: 95,
        title: 'Anonimisasi Data Penuh (De-identification) & Gunakan Sistem Lokal',
        desc: 'Menghapus seluruh NIK, nama, alamat (data teridentifikasi), dan hanya memproses pola statistik pada infrastruktur AI internal yang aman.',
        evalTitle: '🏆 Praktik Perlindungan Privasi Sesuai Regulasi',
        whyReason: 'Teknik de-identifikasi memutus korelasi antara riwayat medis dengan identitas individu, sehingga manfaat analisis AI tetap didapat tanpa mengorbankan privasi pasien.',
        regulations: 'Memenuhi prinsip Privacy by Design & Klausul Keamanan Data Sensitif ISO/IEC 27001.',
        actionGuide: 'Terapkan teknik masking, tokenisasi, atau k-anonymity sebelum data diproses oleh modul analitik.',
      },
      {
        id: 3,
        letter: 'C',
        type: 'warning',
        cr: 30,
        pv: 70,
        int: 40,
        title: 'Hanya Mengganti Nama Pasien Menjadi Inisial di AI Publik',
        desc: 'Mengubah nama menjadi inisial tetapi tetap menyertakan NIK, tanggal lahir lengkap, dan lokasi detail.',
        evalTitle: '⚠️ Pseudo-Anonimisasi Lemah (Re-identification Risk)',
        whyReason: 'Kombinasi tanggal lahir, lokasi, dan NIK masih sangat mudah dilacak balik (*linkage attack*) untuk mengungkap identitas asli pasien.',
        regulations: 'Belum memenuhi kriteria anonimisasi penuh menurut standar otoritas pelindungan data.',
        actionGuide: 'Hapus seluruh pengenal unik (unique identifiers) kuasi-identitas dari dataset.',
      },
    ]
  },
  {
    id: 'eth-3',
    caseNum: 3,
    topic: 'Kreativitas & Hak Cipta Komersial',
    title: 'Monetisasi Karya Desain Menggunakan Model Gambar Generatif',
    contextDesc: 'Seorang desainer grafis memenangkan tender kampanye komersial brand ternama. Ia membuat seluruh ilustrasi menggunakan AI prompt bergaya meniru spesifik seniman lokal yang masih hidup.',
    question: 'Apa langkah paling beretika dalam mengelola hak cipta dan royalti karya tersebut?',
    options: [
      {
        id: 1,
        letter: 'A',
        type: 'danger',
        cr: 95,
        pv: 20,
        int: 15,
        title: 'Klaim Hak Cipta Eksklusif & Tolak Sebut Seniman Referensi',
        desc: 'Menjual karya sebagai orisinalitas murni dan meniru habis-habisan signature visual seniman asli tanpa izin lisensi.',
        evalTitle: '🚨 Pelanggaran Hak Moral & Eksploitasi Hak Cipta',
        whyReason: 'Memanfaatkan prompt "in the style of [living artist]" untuk keuntungan komersial tanpa kompensasi atau izin merampas hak ekonomi dan moral seniman asli.',
        regulations: 'Berpotensi gugatan pelanggaran hak cipta (Copyright Infringement) & Melanggar Doktrin Fair Use.',
        actionGuide: 'Hormati hak kekayaan intelektual kreator independen saat melatih atau mem-prompt model gambar.',
      },
      {
        id: 2,
        letter: 'B',
        type: 'ethical',
        cr: 10,
        pv: 5,
        int: 96,
        title: 'Kolaborasi Resmi / Gunakan Dataset Berlisensi Komersial Terbuka',
        desc: 'Menggunakan model yang dilatih pada dataset publik domain atau meminta izin lisensi resmi/kolaborasi dengan seniman terkait.',
        evalTitle: '🏆 Praktik Bisnis Berkelanjutan & Adil bagi Kreator',
        whyReason: 'Memastikan rantai pasok hak cipta aman, transparan bagi klien korporat, dan mendukung ekosistem kreatif yang berkeadilan bagi seniman manusia.',
        regulations: 'Sesuai dengan pedoman Content Credentials (C2PA) & UU Hak Cipta No. 28 Tahun 2014.',
        actionGuide: 'Gunakan platform berlisensi komersial jelas (misal: Adobe Firefly / C2PA certified datasets).',
      },
      {
        id: 3,
        letter: 'C',
        type: 'warning',
        cr: 60,
        pv: 10,
        int: 45,
        title: 'Memodifikasi 10% Output AI Lalu Menjualnya Tanpa Label AI',
        desc: 'Mengubah sedikit warna dengan Photoshop lalu mengklaim 100% buatan tangan untuk menghindari diskusi lisensi dengan klien.',
        evalTitle: '⚠️ Praktik Mengelabui Konsumen (Misleading Disclosure)',
        whyReason: 'Menyembunyikan asal-usul sintetis pada karya komersial melanggar hak transparansi konsumen dan merugikan reputasi agensi jika terdeteksi publik.',
        regulations: 'Berpotensi melanggar ketentuan perlindungan konsumen dan klausul transparansi kontrak komersial.',
        actionGuide: 'Berikan pengungkapan jujur (disclosure) kepada klien mengenai porsi penggunaan generative AI.',
      },
    ]
  }
];

export default function EthicalDilemmaPage() {
  const navigate = useNavigate();
  const { showToast } = useProgress();

  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [dilemmaState, setDilemmaState] = useState(null);

  const currentCase = ETHICAL_CASES[activeCaseIndex];

  const selectCase = (idx) => {
    setActiveCaseIndex(idx);
    setSelectedOption(null);
    setDilemmaState(null);
    showToast(`Beralih ke Skenario #${idx + 1}: ${ETHICAL_CASES[idx].topic}`, 'indigo');
  };

  const chooseDilemma = (optId) => {
    const opt = currentCase.options.find(o => o.id === optId);
    if (!opt) return;

    setSelectedOption(optId);
    setDilemmaState(opt);

    if (opt.type === 'ethical') {
      showToast('Keputusan sangat etis, berintegritas, & mematuhi regulasi!', 'success');
    } else if (opt.type === 'warning') {
      showToast('Perhatian: Terdapat potensi risiko etika yang perlu dimitigasi.', 'warning');
    } else {
      showToast('Peringatan: Keputusan ini melanggar etika dan regulasi hukum!', 'danger');
    }
  };

  return (
    <div className="page-wrap">
      {/* Header */}
      <div className="hub-section-head" style={{ marginBottom: '24px' }}>
        <div>
          <span className="lab-badge lab-badge-indigo">
            <i className="fa-solid fa-scale-balanced"></i> SANDBOX LAB 03
          </span>
          <h1 className="hub-section-title" style={{ fontSize: '1.65rem' }}>Ethical Dilemma</h1>
          <p className="hub-section-sub">Simulasi Keputusan &amp; Evaluasi Dampak Etika Penggunaan AI (UNESCO &amp; EU AI Act Framework)</p>
        </div>
      </div>

      {/* Case Selector Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '20px', background: 'var(--white)', padding: '12px 18px', borderRadius: '14px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <i className="fa-solid fa-landmark mr-1 text-indigo"></i> Pilih Skenario Studi Kasus:
          </span>
          {ETHICAL_CASES.map((c, idx) => (
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

        <span style={{ fontSize: '0.76rem', color: 'var(--text-dim)', fontWeight: 600 }}>
          Skenario {activeCaseIndex + 1} dari {ETHICAL_CASES.length}
        </span>
      </div>

      {/* Main Grid */}
      <div className="sandbox-layout-grid">
        {/* Left Column: Case Study & Decision Choices */}
        <div className="sandbox-card">
          <div className="scenario-header-badge">
            <i className="fa-solid fa-bookmark"></i> Skenario Kasus #{currentCase.caseNum}: {currentCase.topic}
          </div>
          <h2 className="scenario-title">
            {currentCase.title}
          </h2>

          <div className="scenario-desc-box">
            <p style={{ margin: 0 }}>
              {currentCase.contextDesc} <strong>{currentCase.question}</strong>
            </p>
          </div>

          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '12px' }}>
            Pilih Salah Satu Keputusan untuk Dianalisis Dampaknya:
          </div>

          <div className="choice-cards-container">
            {currentCase.options.map((item) => {
              const isSelected = selectedOption === item.id;
              let selectedClass = '';
              if (isSelected) {
                if (item.type === 'ethical') selectedClass = 'selected-ethical';
                else if (item.type === 'warning') selectedClass = 'selected-warning';
                else if (item.type === 'danger') selectedClass = 'selected-danger';
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`dilemma-choice-btn ${selectedClass}`}
                  onClick={() => chooseDilemma(item.id)}
                >
                  <div className="choice-letter-badge">{item.letter}</div>
                  <div className="choice-text-content">
                    <div className="choice-title">Pilihan {item.letter}: {item.title}</div>
                    <div className="choice-desc">{item.desc}</div>
                  </div>
                  {isSelected && (
                    <div style={{ fontSize: '1.1rem', color: item.type === 'ethical' ? 'var(--emerald)' : item.type === 'warning' ? 'var(--amber)' : 'var(--red)' }}>
                      <i className={item.type === 'ethical' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation'}></i>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Ethics Diagnostic Dashboard */}
        <div className="sandbox-sidebar">
          {/* Ethics Gauges Card */}
          <div className="sandbox-sidebar-card">
            <div className="sandbox-sidebar-title">
              <span>Indikator Dampak Etika</span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>Tingkat Risiko</span>
            </div>

            <div className="ethics-meter-group">
              {/* Copyright Risk */}
              <div className="ethics-meter-item">
                <div className="ethics-meter-header">
                  <span>Risiko Hak Cipta</span>
                  <span style={{ color: (dilemmaState?.cr || 0) > 50 ? 'var(--red)' : (dilemmaState?.cr || 0) > 20 ? 'var(--amber)' : 'var(--emerald)' }}>
                    {dilemmaState ? `${dilemmaState.cr}%` : '0%'}
                  </span>
                </div>
                <div className="ethics-track">
                  <div
                    className="ethics-fill"
                    style={{
                      width: `${dilemmaState?.cr || 0}%`,
                      background: (dilemmaState?.cr || 0) > 50 ? 'var(--red)' : (dilemmaState?.cr || 0) > 20 ? 'var(--amber)' : 'var(--emerald)',
                    }}
                  />
                </div>
              </div>

              {/* Privacy Risk */}
              <div className="ethics-meter-item">
                <div className="ethics-meter-header">
                  <span>Risiko Privasi Data</span>
                  <span style={{ color: (dilemmaState?.pv || 0) > 50 ? 'var(--red)' : (dilemmaState?.pv || 0) > 20 ? 'var(--amber)' : 'var(--emerald)' }}>
                    {dilemmaState ? `${dilemmaState.pv}%` : '0%'}
                  </span>
                </div>
                <div className="ethics-track">
                  <div
                    className="ethics-fill"
                    style={{
                      width: `${dilemmaState?.pv || 0}%`,
                      background: (dilemmaState?.pv || 0) > 50 ? 'var(--red)' : (dilemmaState?.pv || 0) > 20 ? 'var(--amber)' : 'var(--indigo)',
                    }}
                  />
                </div>
              </div>

              {/* Academic/Professional Integrity */}
              <div className="ethics-meter-item">
                <div className="ethics-meter-header">
                  <span>Integritas &amp; Kejujuran</span>
                  <span style={{ color: (dilemmaState?.int || 100) > 80 ? 'var(--emerald)' : (dilemmaState?.int || 100) > 40 ? 'var(--amber)' : 'var(--red)' }}>
                    {dilemmaState ? `${dilemmaState.int}%` : '100%'}
                  </span>
                </div>
                <div className="ethics-track">
                  <div
                    className="ethics-fill"
                    style={{
                      width: `${dilemmaState ? dilemmaState.int : 100}%`,
                      background: (dilemmaState?.int || 100) > 80 ? 'var(--emerald)' : (dilemmaState?.int || 100) > 40 ? 'var(--amber)' : 'var(--red)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Detailed "Kenapa" Explanatory Card */}
          <div className="sandbox-sidebar-card">
            <div className="sandbox-sidebar-title">
              <span>Evaluasi &amp; Analisis "Kenapa"</span>
            </div>

            {dilemmaState ? (
              <div
                className={`feedback-callout ${
                  dilemmaState.type === 'ethical' ? 'success' : dilemmaState.type === 'danger' ? 'danger' : 'warning'
                }`}
                style={{ minHeight: 'auto' }}
              >
                <div style={{ fontSize: '0.88rem', fontWeight: 800, marginBottom: '4px' }}>
                  {dilemmaState.evalTitle}
                </div>
                
                {/* Penjelasan Kenapa */}
                <div style={{ fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '8px' }}>
                  <strong>🔍 Mengapa Dampaknya Demikian?</strong><br />
                  {dilemmaState.whyReason}
                </div>

                {/* Regulasi Terkait */}
                <div style={{ fontSize: '0.78rem', background: 'rgba(255,255,255,0.6)', padding: '8px 10px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)', marginBottom: '8px' }}>
                  <strong>📜 Regulasi &amp; Standar:</strong><br />
                  {dilemmaState.regulations}
                </div>

                {/* Panduan Tindakan */}
                <div style={{ fontSize: '0.78rem', fontStyle: 'italic', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '6px' }}>
                  <strong>💡 Langkah Praktis:</strong> {dilemmaState.actionGuide}
                </div>
              </div>
            ) : (
              <div className="feedback-callout neutral" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '24px 16px' }}>
                <i className="fa-solid fa-hand-pointer" style={{ fontSize: '1.4rem', color: 'var(--indigo)', marginBottom: '8px' }}></i>
                <div style={{ fontSize: '0.82rem', lineHeight: 1.5 }}>
                  Pilih salah satu opsi (A, B, atau C) di sebelah kiri untuk melihat evaluasi mendalam mengenai <strong>mengapa</strong> keputusan tersebut etis atau melanggar aturan.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
