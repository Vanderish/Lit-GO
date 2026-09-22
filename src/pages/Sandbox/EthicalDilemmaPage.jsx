import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import './EthicalDilemmaPage.css';

// ==========================================
// 1. DATASET SKENARIO DILEMA ETIKA AI (TAB 1)
// ==========================================
const ETHICAL_CASES = [
  {
    id: 'eth-1',
    caseNum: 1,
    pillTitle: '#1 Akademik & Riset',
    topic: 'Akademik & Riset Ilmiah',
    domainTag: 'Domain: Publikasi Ilmiah & LLM',
    subDomain: 'Riset Akademik',
    title: 'Penggunaan Generative AI dalam Penulisan Jurnal Riset',
    contextDesc:
      'Seorang peneliti menggunakan LLM untuk merangkum 30 jurnal terdahulu, menyempurnakan naskah bahasa Inggris, serta merumuskan hipotesis kerja. Deadline submisi tinggal 2 hari lagi.',
    question: 'Keputusan apa yang paling berintegritas dan mematuhi etika publikasi ilmiah?',
    footerGuide: 'Pedoman: ICMJE, Elsevier & Nature Publication Policy',
    options: [
      {
        id: 1,
        letter: 'A',
        type: 'warning',
        badgeText: 'Risiko Tinggi',
        badgeClass: 'badge-warning',
        cr: 65,
        pv: 30,
        int: 30,
        score: 45,
        title: 'A. Klaim 100% Karya Orisinal Mandiri',
        desc: 'Mengklaim seluruh naskah murni buatan tangan sendiri tanpa mencantumkan penggunaan AI.',
        evalTitle: '⚠️ Pelanggaran Prinsip Transparansi Metodologis',
        whyReason:
          'Menyembunyikan penggunaan AI melanggar asas kejujuran ilmiah. Meskipun AI membantu sebagai asisten, pembaca dan reviewer berhak mengetahui metodologi yang digunakan agar temuan dapat direplikasi dan divalidasi.',
        regulations:
          'Akuntabilitas Mutlak: Berdasarkan UNESCO AI Ethics (2021) dan Permenkominfo No. 9/2023, AI dilarang menjadi subjek hukum atau penulis rekanan. Peneliti bertanggung jawab penuh atas validasi data empiris.',
        checklists: [
          'Wajib mencantumkan deklarasi penggunaan asisten AI di catatan kaki.',
          'Verifikasi manual setiap rujukan literatur untuk mencegah kutipan fiktif.',
        ],
      },
      {
        id: 2,
        letter: 'B',
        type: 'ethical',
        badgeText: 'Rekomendasi Etis',
        badgeClass: 'badge-ethical',
        cr: 0,
        pv: 0,
        int: 100,
        score: 98,
        title: 'B. Deklarasi Transparan & Validasi Sumber',
        desc: 'Mencantumkan atribusi pemakaian AI di bab metode, mendokumentasikan prompt, dan memverifikasi rujukan literatur secara manual.',
        evalTitle: '🏆 Standar Emas Integritas & Praktik Etis',
        whyReason:
          'Deklarasi transparan melindungi orisinalitas peneliti sekaligus mengakui alat bantu yang digunakan. Verifikasi manual terhadap sumber rujukan memastikan tidak ada halusinasi sitasi fiktif yang merusak kredibilitas sains.',
        regulations:
          'Akuntabilitas Mutlak: Berdasarkan UNESCO AI Ethics (2021) dan Permenkominfo No. 9/2023, AI dilarang menjadi subjek hukum atau penulis rekanan. Peneliti bertanggung jawab penuh atas validasi data empiris.',
        checklists: [
          'Cantumkan versi model AI & tanggal akses di catatan kaki.',
          'Verifikasi manual minimal 5 rujukan jurnal primer.',
        ],
      },
      {
        id: 3,
        letter: 'C',
        type: 'danger',
        badgeText: 'Pelanggaran Kritis',
        badgeClass: 'badge-danger',
        cr: 95,
        pv: 60,
        int: 5,
        score: 10,
        title: 'C. Salin Utuh Output AI Tanpa Uji Mandiri',
        desc: 'Menempelkan seluruh teks buatan AI langsung ke draf akhir tanpa verifikasi kebenaran klaim atau hak cipta rujukan.',
        evalTitle: '🚨 Pelanggaran Berat: Fabrikasi & Risiko Plagiarisme',
        whyReason:
          'Tindakan ini sangat berisiko memasukkan sitasi palsu (halusinasi AI), plagiarisme terselubung, dan klaim data yang tidak dapat dipertanggungjawabkan secara hukum maupun akademik.',
        regulations:
          'Dapat dikenakan sanksi diskualifikasi, pencabutan publikasi (retraction), dan sanksi pelanggaran hak cipta.',
        checklists: [
          'Dilarang keras menyalin teks mentah tanpa audit kebenaran fakta.',
          'Tanggung jawab intelektual mutlak berada di tangan penulis manusia.',
        ],
      },
    ],
  },
  {
    id: 'eth-2',
    caseNum: 2,
    pillTitle: '#2 Kesehatan & Privasi',
    topic: 'Kesehatan & Privasi Pasien',
    domainTag: 'Domain: Rekam Medis & Privasi Data',
    subDomain: 'Kepatuhan UU PDP',
    title: 'Analisis Data Rekam Medis Pasien Menggunakan Model AI Publik',
    contextDesc:
      'Seorang staf klinik ingin mempercepat analisis riwayat penyakit 50 pasien dengan mengunggah spreadsheet berisi nama, NIK, alamat, dan diagnosis ke chatbot AI online gratis.',
    question: 'Bagaimana seharusnya staf tersebut bertindak demi menjaga kerahasiaan dan privasi data pasien?',
    footerGuide: 'Pedoman: UU No. 27/2022 (UU PDP) & Standar Keamanan Data Medis ISO 27001',
    options: [
      {
        id: 1,
        letter: 'A',
        type: 'danger',
        badgeText: 'Pelanggaran Kritis',
        badgeClass: 'badge-danger',
        cr: 20,
        pv: 98,
        int: 10,
        score: 15,
        title: 'A. Unggah Langsung Seluruh Data Mentah ke Cloud AI Publik',
        desc: 'Mengunggah file Excel lengkap dengan identitas pribadi pasien demi efisiensi waktu pengerjaan tugas.',
        evalTitle: '🚨 Pelanggaran Berat Hukum Privasi Data (UU PDP)',
        whyReason:
          'Platform AI publik umumnya menggunakan data input pengguna untuk melatih model mereka. Mengunggah data kesehatan pribadi membocorkan rahasia medis ke pihak ketiga tanpa izin subjek data.',
        regulations:
          'Kepatuhan Privasi Data: Data kesehatan adalah data pribadi sensitif/spesifik menurut UU No. 27 Tahun 2022. Pembocoran data medis dapat dikenakan sanksi pidana dan denda administratif.',
        checklists: [
          'Dilarang memasukkan NIK, nama, atau riwayat penyakit ke server publik.',
          'Wajib memproses data medis pada sistem terenkripsi tertutup (on-premise).',
        ],
      },
      {
        id: 2,
        letter: 'B',
        type: 'ethical',
        badgeText: 'Rekomendasi Etis',
        badgeClass: 'badge-ethical',
        cr: 0,
        pv: 0,
        int: 96,
        score: 96,
        title: 'B. Anonimisasi Data Penuh & Olah di Infrastruktur Aman',
        desc: 'Menghapus seluruh NIK, nama, alamat (data teridentifikasi), dan hanya memproses pola statistik pada infrastruktur AI internal yang aman.',
        evalTitle: '🏆 Praktik Perlindungan Privasi Sesuai Regulasi',
        whyReason:
          'Teknik de-identifikasi memutus korelasi antara riwayat medis dengan identitas individu, sehingga manfaat analisis AI tetap didapat tanpa mengorbankan privasi pasien.',
        regulations:
          'Privacy by Design: Memenuhi asas pelindungan data pribadi (UU PDP) dan standar keamanan informasi kesehatan ISO/IEC 27001.',
        checklists: [
          'Terapkan masking atau tokenisasi sebelum data diproses AI.',
          'Pastikan tidak ada identifier kuasi yang dapat dilacak balik.',
        ],
      },
      {
        id: 3,
        letter: 'C',
        type: 'warning',
        badgeText: 'Risiko Tinggi',
        badgeClass: 'badge-warning',
        cr: 30,
        pv: 70,
        int: 40,
        score: 40,
        title: 'C. Hanya Mengganti Nama Menjadi Inisial di AI Publik',
        desc: 'Mengubah nama menjadi inisial tetapi tetap menyertakan NIK, tanggal lahir lengkap, dan lokasi detail.',
        evalTitle: '⚠️ Pseudo-Anonimisasi Lemah (Re-identification Risk)',
        whyReason:
          'Kombinasi tanggal lahir, lokasi, dan NIK masih sangat mudah dilacak balik (*linkage attack*) untuk mengungkap identitas asli pasien.',
        regulations:
          'Belum memenuhi standar anonimisasi penuh menurut otoritas pelindungan data pribadi.',
        checklists: [
          'Hapus seluruh pengenal unik kuasi-identitas.',
          'Gunakan teknik k-anonymity untuk pengujian dataset agregat.',
        ],
      },
    ],
  },
  {
    id: 'eth-3',
    caseNum: 3,
    pillTitle: '#3 Hak Cipta Komersial',
    topic: 'Kreativitas & Hak Cipta Komersial',
    domainTag: 'Domain: Desain Komersial & Hak Cipta',
    subDomain: 'Etika Kreatif & Fair Use',
    title: 'Monetisasi Karya Desain Menggunakan Model Gambar Generatif',
    contextDesc:
      'Seorang desainer grafis memenangkan tender kampanye komersial brand ternama. Ia membuat seluruh ilustrasi menggunakan AI prompt bergaya meniru spesifik seniman lokal yang masih hidup.',
    question: 'Apa langkah paling beretika dalam mengelola hak cipta dan royalti karya tersebut?',
    footerGuide: 'Pedoman: Content Credentials (C2PA) & UU Hak Cipta No. 28/2014',
    options: [
      {
        id: 1,
        letter: 'A',
        type: 'danger',
        badgeText: 'Pelanggaran Kritis',
        badgeClass: 'badge-danger',
        cr: 95,
        pv: 20,
        int: 15,
        score: 20,
        title: 'A. Klaim Hak Cipta Eksklusif & Tolak Sebut Seniman Referensi',
        desc: 'Menjual karya sebagai orisinalitas murni dan meniru habis-habisan signature visual seniman asli tanpa izin lisensi.',
        evalTitle: '🚨 Pelanggaran Hak Moral & Eksploitasi Hak Cipta',
        whyReason:
          'Memanfaatkan prompt "in the style of [living artist]" untuk keuntungan komersial tanpa kompensasi atau izin merampas hak ekonomi dan moral seniman asli.',
        regulations:
          'Potensi Gugatan Hak Cipta: Melanggar hak moral kreator dan melanggar prinsip keadilan pemanfaatan teknologi.',
        checklists: [
          'Hormati hak cipta kreator independen.',
          'Dilarang mengeksploitasi gaya seniman hidup untuk komersial tanpa izin.',
        ],
      },
      {
        id: 2,
        letter: 'B',
        type: 'ethical',
        badgeText: 'Rekomendasi Etis',
        badgeClass: 'badge-ethical',
        cr: 0,
        pv: 0,
        int: 98,
        score: 98,
        title: 'B. Kolaborasi Resmi / Gunakan Dataset Berlisensi Terbuka',
        desc: 'Menggunakan model yang dilatih pada dataset publik domain atau meminta izin lisensi resmi/kolaborasi dengan seniman terkait.',
        evalTitle: '🏆 Praktik Bisnis Berkelanjutan & Adil bagi Kreator',
        whyReason:
          'Memastikan rantai pasok hak cipta aman, transparan bagi klien korporat, dan mendukung ekosistem kreatif yang berkeadilan bagi seniman manusia.',
        regulations:
          'Standar Industri C2PA: Sesuai dengan panduan U.S. Copyright Office & Content Credentials (C2PA) untuk transparansi rantai pasok seni digital.',
        checklists: [
          'Gunakan dataset yang aman secara komersial (commercial-safe).',
          'Sertakan metadata lisensi pembuatan gambar secara terbuka.',
        ],
      },
      {
        id: 3,
        letter: 'C',
        type: 'warning',
        badgeText: 'Risiko Tinggi',
        badgeClass: 'badge-warning',
        cr: 60,
        pv: 10,
        int: 45,
        score: 45,
        title: 'C. Modifikasi 10% Output AI Tanpa Label Pengungkapan',
        desc: 'Mengubah sedikit warna dengan Photoshop lalu mengklaim 100% buatan tangan untuk menghindari diskusi lisensi dengan klien.',
        evalTitle: '⚠️ Praktik Mengelabui Konsumen (Misleading Disclosure)',
        whyReason:
          'Menyembunyikan asal-usul sintetis pada karya komersial melanggar hak transparansi konsumen dan merugikan reputasi agensi jika terdeteksi publik.',
        regulations:
          'Klausul Transparansi Kontrak: Melanggar ketentuan keterbukaan informasi produk kepada klien dan publik.',
        checklists: [
          'Berikan disclosure porsi penggunaan AI kepada klien.',
          'Jaga kejujuran profesional dalam setiap deliverable komersial.',
        ],
      },
    ],
  },
];

// ==========================================
// 2. DATASET AUDIT TRANSPARANSI (TAB 2)
// ==========================================
const AUDIT_CASES = [
  {
    id: 'tc-1',
    caseNum: 1,
    pillTitle: '1. Media Sosial & Endorsement',
    auditId: 'TC-AUG-32-0015',
    category: 'Media Sosial & Endorsement',
    title: 'Promosi Suplemen Kesehatan dengan Foto Sebelum/Sesudah Sintetis',
    platformInfo: 'Media sosial @fitness_guru_ai • Post Berbayar / Endorsement',
    quoteText:
      '"Hasil pemakaian 14 hari suplemen super! Perut langsung sixpack tanpa diet ketat. Link bio untuk diskon 50%!"',
    forensicFinding:
      '🔍 Hasil Forensik: Dihasilkan Midjourney v6 tanpa watermark AI, klaim khasiat fisik tanpa bukti uji klinis.',
    indicatorsCount: '4 Indikator Uji Kepatuhan',
    parameters: [
      {
        id: 'watermark',
        num: '01',
        name: 'Watermark / Label Visual AI',
        sub: 'Pemberian penanda visual eksplisit bahwa gambar adalah rekayasa AI.',
        hasIt: false,
      },
      {
        id: 'c2pa',
        num: '02',
        name: 'Metadata Provenance (C2PA)',
        sub: 'Sertifikasi kriptografis asal-usul file tetap utuh dan dapat diverifikasi.',
        hasIt: false,
      },
      {
        id: 'method',
        num: '03',
        name: 'Deklarasi Prompt & Ilustrasi',
        sub: 'Klarifikasi tertulis bahwa materi merupakan ilustrasi, bukan bukti empiris.',
        hasIt: false,
      },
      {
        id: 'disclaimer',
        num: '04',
        name: 'Disclaimer Khasiat & Verifikasi',
        sub: 'Ketiadaan klaim kesehatan sepihak tanpa tinjauan dokter atau riset klinis.',
        hasIt: false,
      },
    ],
    riskStatus: 'Non-Compliant',
    riskClass: 'badge-danger',
    score: 0,
    violationCount: '4 Pelanggaran',
    summaryText:
      'Materi melanggar transparansi konten AI tanpa penanda eksplisit. Berpotensi melanggar ketentuan perlindungan konsumen.',
    tableMeta: [
      { label: 'Regulasi Terkait', val: 'EU AI Act & SE Kominfo' },
      { label: 'Sanksi Regulasi', val: 'Takedown & Denda' },
      { label: 'Status Publikasi', val: 'Dilarang Terbit' },
    ],
  },
  {
    id: 'tc-2',
    caseNum: 2,
    pillTitle: '2. Jurnal Riset Medis',
    auditId: 'TC-MED-44-0102',
    category: 'Jurnal Riset Medis',
    title: 'Publikasi Riset Pola Mutasi Virus dengan Bantuan Asisten AI Bio-Informatika',
    platformInfo: 'Dr. Sarah & Tim Riset • Open Access Biomedical Journal',
    quoteText:
      '"Visualisasi 3D folding protein disintesis menggunakan AlphaFold dan divalidasi dengan difraksi sinar-X. Kode prompt dilampirkan pada Lampiran A."',
    forensicFinding:
      '🔍 Hasil Forensik: Menggunakan model terverifikasi PDB, menyertakan metadata C2PA utuh, divalidasi silang wet-lab.',
    indicatorsCount: '4 Indikator Uji Kepatuhan',
    parameters: [
      {
        id: 'watermark',
        num: '01',
        name: 'Watermark / Label Visual AI',
        sub: 'Pemberian penanda visual eksplisit pada figur 3D prediksi AlphaFold.',
        hasIt: true,
      },
      {
        id: 'c2pa',
        num: '02',
        name: 'Metadata Provenance (C2PA)',
        sub: 'File mentah PDB tersertifikasi dan tersimpan di repositori publik.',
        hasIt: true,
      },
      {
        id: 'method',
        num: '03',
        name: 'Deklarasi Prompt & Metodologi',
        sub: 'Bab Metodologi menguraikan secara rinci versi model dan tanggal komputasi.',
        hasIt: true,
      },
      {
        id: 'disclaimer',
        num: '04',
        name: 'Validasi Manusia (Peer Review)',
        sub: 'Seluruh struktur divalidasi silang secara basah oleh peneliti manusia.',
        hasIt: true,
      },
    ],
    riskStatus: 'Full Compliant',
    riskClass: 'badge-ethical',
    score: 100,
    violationCount: '0 Pelanggaran (Sempurna)',
    summaryText:
      'Memenuhi 100% prinsip transparansi UNESCO AI Ethics 2021 dan panduan authorship Nature/Springer untuk pengungkapan komputasi.',
    tableMeta: [
      { label: 'Regulasi Terkait', val: 'UNESCO AI & COPE 2024' },
      { label: 'Sanksi Regulasi', val: 'Bebas Sanksi' },
      { label: 'Status Publikasi', val: 'Direkomendasikan' },
    ],
  },
  {
    id: 'tc-3',
    caseNum: 3,
    pillTitle: '3. Jurnalistik Pilkada',
    auditId: 'TC-POL-19-0089',
    category: 'Jurnalistik Pilkada',
    title: 'Pemberitaan Audio Wawancara Kandidat Pemilu Menggunakan Suara AI Kloning',
    platformInfo: 'Kanal Berita Independen • Podcast Online & Web',
    quoteText:
      '"Mendengarkan prediksi calon gubernur mengenai APBD lewat rekaman suara." (Suara dihasilkan lewat Voice Cloning ElevenLabs).',
    forensicFinding:
      '🔍 Hasil Forensik: Tidak memiliki audio watermark pembuka, tidak ada izin tertulis subjek pidato asli.',
    indicatorsCount: '4 Indikator Uji Kepatuhan',
    parameters: [
      {
        id: 'watermark',
        num: '01',
        name: 'Audio Watermark / Peringatan',
        sub: 'Suara disclaimer di awal rekaman untuk mencegah persepsi suara asli.',
        hasIt: false,
      },
      {
        id: 'c2pa',
        num: '02',
        name: 'Metadata Provenance (C2PA)',
        sub: 'Audio stream menyertakan acoustic watermark frekuensi digital.',
        hasIt: false,
      },
      {
        id: 'method',
        num: '03',
        name: 'Deklarasi di Teks Artikel',
        sub: 'Catatan kaki kecil di bawah artikel bahwa suara adalah simulasi.',
        hasIt: true,
      },
      {
        id: 'disclaimer',
        num: '04',
        name: 'Izin Subjek / Verifikasi Fakta',
        sub: 'Izin tertulis dari kandidat terkait penggunaan sampel suara kloning.',
        hasIt: false,
      },
    ],
    riskStatus: 'High Risk (Parsial)',
    riskClass: 'badge-warning',
    score: 25,
    violationCount: '3 Pelanggaran',
    summaryText:
      'Mencantumkan disclaimer di akhir teks tidak memadai untuk format audio penyiaran publik. Rawan tuntutan hukum.',
    tableMeta: [
      { label: 'Regulasi Terkait', val: 'SE Menkominfo No. 9/2023' },
      { label: 'Sanksi Regulasi', val: 'Teguran Tertulis' },
      { label: 'Status Publikasi', val: 'Wajib Revisi Audio' },
    ],
  },
];

export default function EthicalDilemmaPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { logActivity, showToast } = useProgress();

  // Tab utama: 'dilemma' (Simulator Dilema AI) vs 'transparency' (Audit Transparansi Produk)
  const [activeTab, setActiveTab] = useState(
    searchParams.get('tab') === 'transparency' ? 'transparency' : 'dilemma'
  );

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'transparency' || tabParam === 'dilemma') {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabSwitch = (tabKey) => {
    setActiveTab(tabKey);
    setSearchParams({ tab: tabKey });
  };

  // State Tab 1: Skenario Dilema Etika
  const [ethCaseIdx, setEthCaseIdx] = useState(0);
  const [selectedOptId, setSelectedOptId] = useState(2); // Default to option B on load
  const currentEthCase = ETHICAL_CASES[ethCaseIdx];
  const activeOption = currentEthCase.options.find((o) => o.id === selectedOptId) || currentEthCase.options[1];

  const handleSelectOption = (optId) => {
    setSelectedOptId(optId);
    const opt = currentEthCase.options.find((o) => o.id === optId);
    if (opt?.type === 'ethical') {
      logActivity(`Membuat Keputusan Etis AI: ${currentEthCase.topic} ⚖️`, 'fa-solid fa-scale-balanced', 'indigo');
      showToast('Keputusan sangat etis, berintegritas, & mematuhi regulasi!', 'success');
    }
  };

  const handleNextEthCase = () => {
    const nextIdx = (ethCaseIdx + 1) % ETHICAL_CASES.length;
    setEthCaseIdx(nextIdx);
    setSelectedOptId(2);
    showToast(`Beralih ke Skenario #${nextIdx + 1}: ${ETHICAL_CASES[nextIdx].topic}`, 'indigo');
  };

  const handleResetEthCase = () => {
    setSelectedOptId(null);
    showToast('Pilihan jawaban berhasil direset.', 'info');
  };

  // State Tab 2: Audit Transparansi Produk
  const [auditCaseIdx, setAuditCaseIdx] = useState(0);
  const currentAuditCase = AUDIT_CASES[auditCaseIdx];
  const [auditAnswers, setAuditAnswers] = useState({
    watermark: 'tidak',
    c2pa: 'tidak',
    method: 'tidak',
    disclaimer: 'tidak',
  });

  const handleToggleAudit = (paramId, val) => {
    setAuditAnswers((prev) => ({
      ...prev,
      [paramId]: val,
    }));
  };

  const handleRunAudit = () => {
    logActivity(`Menuntaskan Audit Transparansi AI: ${currentAuditCase.category} 📋`, 'fa-solid fa-file-shield', 'teal');
    showToast('Evaluasi audit kepatuhan berhasil dikalkulasi ulang!', 'success');
  };

  const handleResetAudit = () => {
    setAuditAnswers({
      watermark: 'tidak',
      c2pa: 'tidak',
      method: 'tidak',
      disclaimer: 'tidak',
    });
    showToast('Formulir audit dikembalikan ke kondisi awal.', 'info');
  };

  return (
    <div className="ethical-page-root wrap">
      {/* 1. Header Area */}
      <div className="ethical-top-head">
        <div>
          <div className="ethical-brand-tag">
            <i className="fa-solid fa-scale-balanced text-indigo"></i>
            LAB 03 • STANDAR ETIKA &amp; TRANSPARANSI AI 2026
          </div>
          <h1 className="ethical-main-title">Ethical Dilemma</h1>
          <p className="ethical-sub-desc">
            Simulasi pengambilan keputusan etis sesuai panduan UNESCO AI Ethics, EU AI Act, dan SE Menkominfo 9/2023.
          </p>
        </div>

        <div className="ethical-accuracy-badge">
          <i className="fa-solid fa-chart-line text-indigo"></i>
          <span>Akurasi Global: <strong>88.4%</strong></span>
        </div>
      </div>

      {/* 2. Feature Tab Switcher (Simulator Dilema AI vs Audit Transparansi Produk) */}
      <div className="ethical-feature-tabs">
        <button
          type="button"
          className={`ethical-tab-btn ${activeTab === 'dilemma' ? 'active' : ''}`}
          onClick={() => handleTabSwitch('dilemma')}
        >
          <i className="fa-solid fa-scale-balanced mr-1"></i>
          <span>Simulator Dilema AI</span>
          <span className="ethical-tab-count">3</span>
        </button>

        <button
          type="button"
          className={`ethical-tab-btn ${activeTab === 'transparency' ? 'active' : ''}`}
          onClick={() => handleTabSwitch('transparency')}
        >
          <i className="fa-solid fa-file-shield mr-1"></i>
          <span>Audit Transparansi Produk</span>
          <span className="ethical-tab-count">3</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: SIMULATOR DILEMA AI                                */}
      {/* ========================================================= */}
      {activeTab === 'dilemma' && (
        <div>
          {/* Sub-Case Selector Bar */}
          <div className="ethical-selector-bar">
            <div className="ethical-selector-left">
              <span className="ethical-selector-label">SKENARIO:</span>
              {ETHICAL_CASES.map((c, idx) => (
                <button
                  key={c.id}
                  type="button"
                  className={`ethical-pill-btn ${ethCaseIdx === idx ? 'active' : ''}`}
                  onClick={() => {
                    setEthCaseIdx(idx);
                    setSelectedOptId(2);
                  }}
                >
                  {c.pillTitle}
                </button>
              ))}
            </div>

            <span className="ethical-case-counter">
              {ethCaseIdx + 1} dari {ETHICAL_CASES.length}
            </span>
          </div>

          {/* Two-Column Layout */}
          <div className="ethical-grid-layout">
            {/* Left Column: Story & Choice Cards */}
            <div className="ethical-main-panel">
              <div className="ethical-domain-row">
                <span>{currentEthCase.domainTag}</span>
                <span>{currentEthCase.subDomain}</span>
              </div>

              <h2 className="ethical-panel-title">{currentEthCase.title}</h2>

              <p className="ethical-context-paragraph">
                {currentEthCase.contextDesc}
                <strong className="ethical-question-bold">{currentEthCase.question}</strong>
              </p>

              {/* Choices */}
              <div className="ethical-choices-stack">
                {currentEthCase.options.map((opt) => {
                  const isSelected = selectedOptId === opt.id;
                  return (
                    <div
                      key={opt.id}
                      className={`ethical-choice-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelectOption(opt.id)}
                    >
                      <div className="ethical-radio-circle">
                        {isSelected && <div className="ethical-radio-dot" />}
                      </div>

                      <div className="ethical-choice-body">
                        <div className="ethical-choice-title">{opt.title}</div>
                        <div className="ethical-choice-desc">{opt.desc}</div>
                      </div>

                      <span className={`ethical-status-badge ${opt.badgeClass}`}>
                        {opt.badgeText}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Card Footer */}
              <div className="ethical-card-footer">
                <span>{currentEthCase.footerGuide}</span>
                <button type="button" className="ethical-reset-btn" onClick={handleResetEthCase}>
                  Reset Jawaban
                </button>
              </div>
            </div>

            {/* Right Column: Diagnostic & Regulatory Analysis */}
            <div className="ethical-side-panel">
              <div className="ethical-side-card">
                <div className="ethical-side-header">
                  <span className="ethical-side-heading">Evaluasi Dampak Etika</span>
                  <span className="ethical-side-score-pill">
                    Skor {activeOption ? activeOption.score : 0} / 100
                  </span>
                </div>

                {/* Progress Meters */}
                <div className="ethical-meter-list">
                  <div className="ethical-meter-row">
                    <div className="ethical-meter-labels">
                      <span>Integritas Akademik</span>
                      <span style={{ color: '#059669' }}>
                        {activeOption ? (activeOption.int >= 90 ? 'Optimal (100%)' : `${activeOption.int}%`) : '0%'}
                      </span>
                    </div>
                    <div className="ethical-meter-track">
                      <div
                        className="ethical-meter-fill"
                        style={{
                          width: `${activeOption ? activeOption.int : 0}%`,
                          background: '#059669',
                        }}
                      />
                    </div>
                  </div>

                  <div className="ethical-meter-row">
                    <div className="ethical-meter-labels">
                      <span>Risiko Hak Cipta</span>
                      <span style={{ color: activeOption && activeOption.cr > 50 ? '#DC2626' : '#059669' }}>
                        {activeOption ? (activeOption.cr === 0 ? 'Sangat Rendah (0%)' : `${activeOption.cr}%`) : '0%'}
                      </span>
                    </div>
                    <div className="ethical-meter-track">
                      <div
                        className="ethical-meter-fill"
                        style={{
                          width: `${activeOption ? (100 - activeOption.cr) : 100}%`,
                          background: activeOption && activeOption.cr > 50 ? '#DC2626' : '#0F172A',
                        }}
                      />
                    </div>
                  </div>

                  <div className="ethical-meter-row">
                    <div className="ethical-meter-labels">
                      <span>Risiko Privasi Data</span>
                      <span style={{ color: activeOption && activeOption.pv > 50 ? '#DC2626' : '#059669' }}>
                        {activeOption ? (activeOption.pv === 0 ? 'Aman (0%)' : `${activeOption.pv}%`) : '0%'}
                      </span>
                    </div>
                    <div className="ethical-meter-track">
                      <div
                        className="ethical-meter-fill"
                        style={{
                          width: `${activeOption ? (100 - activeOption.pv) : 100}%`,
                          background: activeOption && activeOption.pv > 50 ? '#DC2626' : '#059669',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Analysis Box */}
                <div className="ethical-analysis-box">
                  <div className="ethical-analysis-title">ANALISIS REGULASI</div>
                  <div className="ethical-analysis-text">
                    {activeOption?.regulations}
                  </div>

                  {activeOption?.checklists && (
                    <div className="ethical-checklist">
                      {activeOption.checklists.map((chk, i) => (
                        <div key={i}>✓ {chk}</div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Next CTA */}
                <button type="button" className="btn-ethical-dark" onClick={handleNextEthCase}>
                  <span>Lanjut ke Skenario #{((ethCaseIdx + 1) % ETHICAL_CASES.length) + 1}</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>

                <a className="ethical-side-link" onClick={() => showToast('Ringkasan evaluasi etika siap diekspor.', 'info')}>
                  📥 Unduh Ringkasan Evaluasi (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: AUDIT TRANSPARANSI PRODUK                          */}
      {/* ========================================================= */}
      {activeTab === 'transparency' && (
        <div>
          {/* Sub-Case Selector Bar */}
          <div className="ethical-selector-bar">
            <div className="ethical-selector-left">
              <span className="ethical-selector-label">STUDI KASUS:</span>
              {AUDIT_CASES.map((c, idx) => (
                <button
                  key={c.id}
                  type="button"
                  className={`ethical-pill-btn ${auditCaseIdx === idx ? 'active' : ''}`}
                  onClick={() => setAuditCaseIdx(idx)}
                >
                  {c.pillTitle}
                </button>
              ))}
            </div>

            <span className="ethical-case-counter">
              Kasus {auditCaseIdx + 1} dari {AUDIT_CASES.length}
            </span>
          </div>

          {/* Two-Column Layout */}
          <div className="ethical-grid-layout">
            {/* Left Column: Product Audit & Parameters */}
            <div className="ethical-main-panel">
              <div className="ethical-domain-row">
                <span>SUBJEK AUDIT</span>
                <span>{currentAuditCase.auditId}</span>
              </div>

              <h2 className="ethical-panel-title">{currentAuditCase.title}</h2>
              <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '16px', fontWeight: 600 }}>
                {currentAuditCase.platformInfo}
              </div>

              <div className="trans-quote-box">
                {currentAuditCase.quoteText}
              </div>

              <div className="trans-forensic-tag">
                {currentAuditCase.forensicFinding}
              </div>

              {/* Parameter Verification Header */}
              <div className="trans-params-head">
                <span>PARAMETER VERIFIKASI KETERBUKAAN</span>
                <span style={{ color: '#94A3B8' }}>{currentAuditCase.indicatorsCount}</span>
              </div>

              {/* 4 Parameter Rows */}
              {currentAuditCase.parameters.map((param) => {
                const val = auditAnswers[param.id] || 'tidak';
                return (
                  <div key={param.id} className="trans-param-row">
                    <div>
                      <div className="trans-param-name">
                        <span className="trans-param-num">{param.num}</span>
                        {param.name}
                      </div>
                      <div className="trans-param-sub">{param.sub}</div>
                    </div>

                    <div className="trans-toggle-group">
                      <button
                        type="button"
                        className={`trans-toggle-btn ${val === 'ada' ? 'active-terpenuhi' : ''}`}
                        onClick={() => handleToggleAudit(param.id, 'ada')}
                      >
                        Terpenuhi
                      </button>
                      <button
                        type="button"
                        className={`trans-toggle-btn ${val === 'tidak' ? 'active-tidak' : ''}`}
                        onClick={() => handleToggleAudit(param.id, 'tidak')}
                      >
                        Tidak Ada
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Card Footer Actions */}
              <div style={{ display: 'flex', gap: '14px', marginTop: '22px', alignItems: 'center' }}>
                <button type="button" className="btn-ethical-dark" style={{ width: 'auto', padding: '10px 22px' }} onClick={handleRunAudit}>
                  Jalankan Rekalkulasi Kepatuhan
                </button>
                <button type="button" className="ethical-reset-btn" onClick={handleResetAudit}>
                  Reset Formulir
                </button>
              </div>
            </div>

            {/* Right Column: Compliance Status Sidebar */}
            <div className="ethical-side-panel">
              <div className="ethical-side-card">
                <div className="ethical-side-header">
                  <span className="ethical-side-heading">STATUS KEPATUHAN</span>
                  <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 600 }}>Art. 50</span>
                </div>

                {/* Score & Risk */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span className={`ethical-status-badge ${currentAuditCase.riskClass}`}>
                    Tingkat Risiko: {currentAuditCase.riskStatus}
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A' }}>
                    {currentAuditCase.score} / 100
                  </span>
                </div>

                <p style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.55, marginBottom: '16px' }}>
                  {currentAuditCase.summaryText}
                </p>

                {/* Meta Table */}
                <table className="trans-meta-table">
                  <tbody>
                    {currentAuditCase.tableMeta.map((m, idx) => (
                      <tr key={idx}>
                        <td>{m.label}</td>
                        <td>{m.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 3 Principles Reference Card */}
              <div className="ethical-side-card" style={{ background: '#F8FAFC' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
                  3 PRINSIP PANDUAN
                </div>
                <ol className="trans-principles-list">
                  <li>
                    <strong>Keterbukaan Pengguna (Inform)</strong><br />
                    Wajib menginfokan keterlibatan AI secara langsung dan mudah dipahami.
                  </li>
                  <li>
                    <strong>Keaslian Media (Provenance)</strong><br />
                    Menjaga jejak digital C2PA agar tidak terjadi manipulasi data publik.
                  </li>
                  <li>
                    <strong>Integritas Non-Deceptive</strong><br />
                    Dilarang memalsukan hasil uji medis, ilmiah, atau efek kesehatan fisik.
                  </li>
                </ol>

                <a className="ethical-side-link" style={{ textAlign: 'left', marginTop: '12px', color: '#2563EB', fontWeight: 700 }}>
                  Pedoman Regulasi →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
