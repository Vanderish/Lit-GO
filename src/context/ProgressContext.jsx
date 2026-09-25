import { createContext, useContext, useState, useEffect } from 'react';

// Data Silabus & Badge Data (6 Modul Utama x 4 Langkah Penyelesaian Unik + Kuis Evaluasi dari Dokumen Resmi Melek AI)
export const MODULES = [
  {
    id: 1,
    tag: "Level 1",
    title: 'Kenalan dengan "Otak" Buatan',
    topics: "Turing Test (1950), Dartmouth 1956, Transformer (Vaswani 2017), Prediksi Token, & Halusinasi AI.",
    badge: "Pionir AI",
    icon: "fa-brain",
    iconBg: "linear-gradient(135deg, #2563EB, #1D4ED8)",
    quiz: {
      q: "Menurut materi modul, apa prinsip dasar cara kerja Large Language Model (LLM) seperti ChatGPT saat menghasilkan respons teks?",
      opts: [
        "Memiliki perasaan, kesadaran batin, dan akal budi layaknya manusia seutuhnya.",
        "Menebak potongan kata (token) berikutnya yang paling mungkin muncul berdasarkan pola probabilitas dari data latih.",
        "Mencari dokumen rahasia langsung dari pikiran pengguna secara nirkabel.",
        "Hanya menyalin dan menempel jawaban yang dihafal tanpa proses pengolahan."
      ],
      ans: 1,
      explanation: "Tepat sekali! LLM adalah model statistik probabilitas yang memprediksi kemunculan token kata berikutnya berdasarkan pola data latih, bukan entitas sadar yang memiliki akal budi atau perasaan manusiawi."
    },
    steps: [
      {
        id: "1-1",
        stepNum: 1,
        title: "Sejarah & Arsitektur AI",
        tag: "Langkah 1 • Konsep Dasar",
        reading: "Alan Turing (1950), Dartmouth (1956), & Transformer Vaswani dkk. (2017)."
      },
      {
        id: "1-2",
        stepNum: 2,
        title: "Prinsip & Logika Token AI",
        tag: "Langkah 2 • Logika Dasar",
        reading: "Self-attention paralel, model probabilistik, dan mekanisme tokenisasi."
      },
      {
        id: "1-3",
        stepNum: 3,
        title: "Mitos vs Realitas & Probabilitas",
        tag: "Langkah 3 • Analisis Kasus",
        reading: "Prediksi distribusi token berikutnya dan audit halusinasi pada putusan hukum."
      },
      {
        id: "1-4",
        stepNum: 4,
        title: "Deteksi Halusinasi & Verifikasi Fakta",
        tag: "Langkah 4 • Audit Lanjutan",
        reading: "Pencegahan kutipan fiktif, pelacakan sumber primer, dan validasi ground truth."
      }
    ]
  },
  {
    id: 2,
    tag: "Level 2",
    title: "Kompas Etika, Keamanan & Privasi",
    topics: "UNESCO Ethics 2021, SE Menkominfo No. 9/2023, Bias Gender Shades (Buolamwini), Word2Vec, & C2PA.",
    badge: "Penjaga Etika",
    icon: "fa-shield-halved",
    iconBg: "linear-gradient(135deg, #0EA5E9, #0284C7)",
    quiz: {
      q: "Mengapa kita wajib menerapkan sikap etis, kritis terhadap bias data, dan waspada terhadap deepfake dalam penggunaan AI?",
      opts: [
        "Karena AI bisa menyerap stereotip sosial dari data latih masa lalu, dan deepfake dapat memalsukan identitas untuk menyebarkan misinformasi jika tidak diverifikasi.",
        "Karena AI secara otomatis akan menghapus seluruh data dan akun media sosial di internet.",
        "Karena teknologi AI dilarang sepenuhnya untuk digunakan dalam segala bidang pekerjaan.",
        "Karena AI selalu menghasilkan keputusan yang 100% netral tanpa pernah ada pengaruh manusia."
      ],
      ans: 0,
      explanation: "Tepat sekali! AI dapat mereplikasi bias sosial dari data latihnya dan deepfake dapat disalahgunakan untuk manipulasi identitas, sehingga standar etika (UNESCO, SE Menkominfo) dan verifikasi keaslian (C2PA) sangat penting."
    },
    steps: [
      {
        id: "2-1",
        stepNum: 1,
        title: "Kerangka Etika Global & Nasional",
        tag: "Langkah 1 • Konsep Dasar",
        reading: "UNESCO Recommendation on the Ethics of AI (2021) & Surat Edaran Menkominfo No. 9/2023."
      },
      {
        id: "2-2",
        stepNum: 2,
        title: "Mengenali Bias Algoritma",
        tag: "Langkah 2 • Identifikasi Bias",
        reading: "Riset Joy Buolamwini & Timnit Gebru (MIT 2018) serta fenomena Coded Gaze pada visi komputer."
      },
      {
        id: "2-3",
        stepNum: 3,
        title: "Bias Bahasa & Representasi Data",
        tag: "Langkah 3 • Analisis Mendalam",
        reading: "Riset embedding vektor membuktikan model bahasa menyerap stereotip sosial dari data teks internet."
      },
      {
        id: "2-4",
        stepNum: 4,
        title: "Keamanan Digital, Deepfake & C2PA",
        tag: "Langkah 4 • Audit Teknis",
        reading: "Koalisi C2PA dengan metadata kriptografis provenance asal-usul vs analisis artefak forensik."
      }
    ]
  },
  {
    id: 3,
    tag: "Level 3",
    title: "Seni Berbicara dengan Mesin",
    topics: "4 Pilar Prompting (Persona, Konteks, Instruksi, Format), Zero-Shot, Few-Shot, CoT (Wei 2022), & ReAct.",
    badge: "Master Prompt",
    icon: "fa-terminal",
    iconBg: "linear-gradient(135deg, #6366F1, #4F46E5)",
    quiz: {
      q: "Apa 4 pilar utama dalam menyusun prompt yang efektif agar AI memberikan jawaban yang terarah dan berkualitas tinggi?",
      opts: [
        "Nama pengguna, kata sandi akun, nomor telepon, dan lokasi GPS.",
        "Persona (Peran), Konteks (Latar Belakang), Instruksi (Tugas Jelas), dan Format (Bentuk Hasil Luaran).",
        "Kalimat perintah sepanjang mungkin tanpa tanda baca sama sekali.",
        "Meminta AI menebak sendiri keinginan pengguna tanpa memberikan konteks apa pun."
      ],
      ans: 1,
      explanation: "Tepat! Formula 4 Pilar (Persona, Konteks, Instruksi, Format) membantu model AI memahami peran spesifik, latar belakang audiens, tugas terarah, dan bentuk keluaran yang Anda harapkan."
    },
    steps: [
      {
        id: "3-1",
        stepNum: 1,
        title: "Formula 4 Pilar Prompting",
        tag: "Langkah 1 • Formula Dasar",
        reading: "Formula 4 Pilar: Persona spesifik, Konteks latar belakang, Instruksi terarah, dan Format luaran."
      },
      {
        id: "3-2",
        stepNum: 2,
        title: "Teknik Zero-Shot & Few-Shot",
        tag: "Langkah 2 • Pola Contoh",
        reading: "Zero-Shot prompting tanpa contoh vs Few-Shot in-context learning dengan 1-3 contoh pola jawaban."
      },
      {
        id: "3-3",
        stepNum: 3,
        title: "Teknik Chain-of-Thought (CoT)",
        tag: "Langkah 3 • Nalar Bertahap",
        reading: "Chain-of-Thought (Wei dkk., 2022) untuk penalaran bertahap langkah-demi-langkah pada soal analitis."
      },
      {
        id: "3-4",
        stepNum: 4,
        title: "Prompt Interaktif & ReAct",
        tag: "Langkah 4 • Tindakan Otonom",
        reading: "Dialog interaktif dan sinergi alur ReAct: Thought (nalar), Action (alat), dan Observation (evaluasi)."
      }
    ]
  },
  {
    id: 4,
    tag: "Level 4",
    title: "AI sebagai Asisten Produktivitas",
    topics: "RAG (Lewis 2020), Memori Eksternal Faktual, UNESCO Guidance 2023, & Tutor Sokratik.",
    badge: "Inovator Produktif",
    icon: "fa-rocket",
    iconBg: "linear-gradient(135deg, #EC4899, #F43F5E)",
    quiz: {
      q: "Bagaimana cara terbaik dan paling etis memanfaatkan AI sebagai asisten belajar dan produktivitas sesuai materi modul?",
      opts: [
        "Menyalin seluruh jawaban AI secara mentah-mentah tanpa dibaca atau dicek kembali kebenarannya.",
        "Mengunggah data rahasia pribadi dan kata sandi agar AI bisa mengingat semuanya.",
        "Menjadikan AI sebagai mitra diskusi, pembuat draf kasar (zero-drafting), dan tutor Sokratik sambil tetap memverifikasi fakta ke sumber primer.",
        "Menyerahkan 100% keputusan penting medis dan hukum kepada AI tanpa konsultasi tenaga ahli."
      ],
      ans: 2,
      explanation: "Tepat sekali! AI sangat efektif sebagai pemantik ide (drafting) dan tutor diskusi yang memancing nalar (Sokratik), asalkan kita tetap memvalidasi fakta ke rujukan primer dan menjaga privasi data sensitif."
    },
    steps: [
      {
        id: "4-1",
        stepNum: 1,
        title: "Prinsip & Manfaat RAG",
        tag: "Langkah 1 • Konsep Alur",
        reading: "Pemisahan memori parametrik (data latih) dan memori non-parametrik (dokumen fakta eksternal)."
      },
      {
        id: "4-2",
        stepNum: 2,
        title: "AI untuk Produktivitas Kerja & Belajar",
        tag: "Langkah 2 • Alur Kerja Efisien",
        reading: "Pemanfaatan AI untuk perangkuman dokumen, zero-drafting, brainstorming, dan manajemen prioritas tugas."
      },
      {
        id: "4-3",
        stepNum: 3,
        title: "Etika AI dalam Pendidikan & Tutor Sokratik",
        tag: "Langkah 3 • Etika Belajar",
        reading: "Panduan UNESCO (2023) menggunakan AI sebagai Tutor Sokratik yang memancing nalar kritis siswa."
      },
      {
        id: "4-4",
        stepNum: 4,
        title: "Privasi Data & Verifikasi Jawaban",
        tag: "Langkah 4 • Audit Keamanan",
        reading: "Protokol keamanan data, larangan mengunggah rahasia sensitif, dan praktik anonimisasi informasi."
      }
    ]
  },
  {
    id: 5,
    tag: "Level 5",
    title: "Eksplorasi AI Kreatif",
    topics: "Enam Sumbu Visual Prompt, Hak Cipta & Human Authorship, Regulasi Internasional, & Perlindungan Seniman.",
    badge: "Kreator Beretika",
    icon: "fa-palette",
    iconBg: "linear-gradient(135deg, #10B981, #059669)",
    quiz: {
      q: "Berdasarkan pedoman hak cipta internasional (seperti US Copyright Office) dan etika AI kreatif di modul, apa syarat utama agar karya yang dibantu AI dapat dilindungi hak cipta?",
      opts: [
        "Cukup membayar biaya langganan aplikasi AI termahal.",
        "Harus terdapat kontribusi dan keterlibatan kreatif manusia yang nyata serta signifikan (Human Authorship) dalam proses pembuatannya.",
        "Semua karya yang menyentuh AI dilarang dipublikasikan ke internet.",
        "Hanya mengetikkan satu kata prompt tanpa modifikasi atau sentuhan manusia sama sekali."
      ],
      ans: 1,
      explanation: "Tepat! Badan hak cipta internasional menegaskan perlunya Human Authorship (keterlibatan kreatif manusia yang signifikan, seperti penulisan naskah, tata letak, dan kurasi artistik) agar karya berhak mendapat perlindungan hak cipta."
    },
    steps: [
      {
        id: "5-1",
        stepNum: 1,
        title: "Enam Sumbu Prompt Visual",
        tag: "Langkah 1 • Formula Visual",
        reading: "Formula 6 Sumbu: Subjek, Gaya seni, Pencahayaan, Komposisi kamera, Palet warna, dan Kualitas render."
      },
      {
        id: "5-2",
        stepNum: 2,
        title: "Hak Cipta & Human Authorship",
        tag: "Langkah 2 • Aturan Hukum",
        reading: "Preseden hukum hak cipta dan syarat modifikasi substantif keterlibatan kreatif manusia (human authorship)."
      },
      {
        id: "5-3",
        stepNum: 3,
        title: "Regulasi Internasional & Perlindungan Seniman",
        tag: "Langkah 3 • Hak Seniman",
        reading: "Hak opt-out seniman dalam EU AI Act dan skema kemitraan lisensi yang adil bagi kreator orisinal."
      },
      {
        id: "5-4",
        stepNum: 4,
        title: "Pemanfaatan Kreatif & Transparansi",
        tag: "Langkah 4 • Etika Visual",
        reading: "Pemberian label/watermark transparansi AI, pencegahan misinformasi, dan pemanfaatan sebagai papan ide (moodboard)."
      }
    ]
  },
  {
    id: 6,
    tag: "Level 6",
    title: "Bertahan & Berdaya di Era AI",
    topics: "David Autor MIT (Tugas Rutin vs Non-Rutin), Paradoks Polanyi 1966 (Tacit Knowledge), & 3 Human Skills.",
    badge: "Cendekia Digital",
    icon: "fa-graduation-cap",
    iconBg: "linear-gradient(135deg, #F59E0B, #D97706)",
    quiz: {
      q: "Mengapa peran manusia tetap tidak tergantikan oleh AI secanggih apa pun menurut konsep Paradoks Polanyi dan keterampilan manusiawi (Human Skills)?",
      opts: [
        "Karena biaya konsumsi listrik komputer AI terlalu boros di masa depan.",
        "Karena kecerdasan emosional (EQ), empati, intuisi situasi, nalar kritis, dan kebijaksanaan moral manusia (tacit knowledge) tidak dapat diubah menjadi sekadar rumus statistik kaku.",
        "Karena seluruh perusahaan akan melarang penggunaan komputer di masa depan.",
        "Karena AI tidak mampu mengolah data angka dalam jumlah banyak secara cepat."
      ],
      ans: 1,
      explanation: "Sempurna! AI adalah alat pengungkit (multiplier), namun empati, kehangatan hubungan antar-manusia, nalar kritis, dan kebijaksanaan etis (tacit knowledge) tetap menjadi keunggulan sejati manusia yang tak tergantikan."
    },
    steps: [
      {
        id: "6-1",
        stepNum: 1,
        title: "Otomasi vs Tugas Kognitif Non-Rutin",
        tag: "Langkah 1 • Pola Kerja",
        reading: "Analisis David Autor MIT (2015) memetakan kerentanan tugas rutin berpola vs tugas kognitif non-rutin."
      },
      {
        id: "6-2",
        stepNum: 2,
        title: "Paradoks Polanyi & Tacit Knowledge",
        tag: "Langkah 2 • Nalar Tacit",
        reading: "Michael Polanyi (1966) membuktikan bahwa tacit knowledge manusia melampaui aturan eksplisit kode."
      },
      {
        id: "6-3",
        stepNum: 3,
        title: "Tiga Pilar Keterampilan Manusiawi",
        tag: "Langkah 3 • Keterampilan Inti",
        reading: "Keterampilan human-centric WEF: Kecerdasan emosional (EQ), nalar kritis, dan pertimbangan etis moral."
      },
      {
        id: "6-4",
        stepNum: 4,
        title: "Adaptasi & Mindset Masa Depan",
        tag: "Langkah 4 • Visi Masa Depan",
        reading: "Transisi menuju realitas augmentasi: Manusia sebagai pengemudi utama (driver), AI sebagai pengungkit (multiplier)."
      }
    ]
  }
];

export const BADGE_DATA = [
  { id:1, icon:'fa-award', bg:'linear-gradient(135deg, #F59E0B, #D97706)', name:'Pionir AI', req:'Asesmen Radar & Fondasi AI', desc:'Lencana pembuka atas keberhasilan menyelesaikan asesmen awal dan memahami prinsip fondasi kecerdasan buatan.' },
  { id:2, icon:'fa-shield-halved', bg:'linear-gradient(135deg, #0EA5E9, #0284C7)', name:'Penjaga Etika', req:'Deteksi Deepfake & Etika', desc:'Lencana kehormatan atas pemahaman etika data, privasi, serta kecakapan mendeteksi rekayasa deepfake.' },
  { id:3, icon:'fa-feather-pointed', bg:'linear-gradient(135deg, #6366F1, #4F46E5)', name:'Master Prompt', req:'Prompt Safety & Komunikasi', desc:'Lencana keahlian menyusun instruksi prompt yang aman, terstruktur, relevan, serta bebas dari bias.' },
  { id:4, icon:'fa-rocket', bg:'linear-gradient(135deg, #EC4899, #F43F5E)', name:'Inovator Produktif', req:'Asistensi & Workflow Kreatif', desc:'Lencana kreativitas dalam memanfaatkan AI secara efektif untuk efisiensi riset, tugas, dan alur kerja harian.' },
  { id:5, icon:'fa-graduation-cap', bg:'linear-gradient(135deg, #10B981, #059669)', name:'Cendekia Digital', req:'Sertifikasi & Kelulusan Akhir', desc:'Lencana kualifikasi tertinggi atas penyelesaian seluruh kurikulum etika AI dan kelulusan evaluasi akhir.' },
];

const getStorageKey = () => {
  return 'litgo_complete_device';
};

const defaultState = {
  radar: [0, 0, 0, 0],
  hasRadar: false,
  doneModules: [],
  badges: [],
  activities: [],
  lastVisitedModuleId: null,
};

const loadInitialState = () => {
  const key = getStorageKey();
  const s = localStorage.getItem(key);
  if (s) {
    try {
      const parsed = JSON.parse(s);
      return {
        ...defaultState,
        ...parsed,
        radar: Array.isArray(parsed?.radar) && parsed.radar.length === 4 ? parsed.radar : defaultState.radar,
        hasRadar: Boolean(parsed?.hasRadar),
        doneModules: Array.isArray(parsed?.doneModules) ? parsed.doneModules : [],
        badges: Array.isArray(parsed?.badges) ? parsed.badges : [],
        activities: Array.isArray(parsed?.activities) ? parsed.activities : [],
        lastVisitedModuleId: parsed?.lastVisitedModuleId || null,
      };
    } catch (err) {
      console.error('Failed to parse ' + key, err);
    }
  }
  return defaultState;
};

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [state, setState] = useState(loadInitialState);

  const [toastMsg, setToastMsg] = useState(null);
  const [toastType, setToastType] = useState('info');
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  const refreshState = () => {
    setState(loadInitialState());
  };

  const saveState = (newState) => {
    setState(newState);
    const key = getStorageKey();
    localStorage.setItem(key, JSON.stringify(newState));
  };

  const logActivity = (text, icon = 'fa-solid fa-clock-rotate-left', tone = 'indigo') => {
    const newAct = {
      id: Date.now(),
      text,
      icon,
      tone,
      time: 'Baru saja',
      timestamp: Date.now(),
    };
    const current = Array.isArray(state.activities) ? state.activities : [];
    const updated = [newAct, ...current.slice(0, 9)];
    saveState({ ...state, activities: updated });
  };

  const showToast = (msg, type = 'info') => {
    setToastMsg(msg);
    setToastType(type);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleReset = () => {
    const key = getStorageKey();
    localStorage.removeItem(key);
    localStorage.removeItem('litgo_complete_v1');
    setState(defaultState);
    setConfirmModalOpen(false);
    showToast('Seluruh progres telah direset ke Cold-Start (State Awal).', 'info');
  };

  const loadDemoPreset = () => {
    const now = Date.now();
    const demoState = {
      radar: [85, 60, 90, 75], // 4 pilar: Literasi Teknis (85%), Etika & Privasi (60% -> lowest, fires Focus Utama badge!), Prompting Efektif (90%), AI Kolaboratif (75%)
      hasRadar: true,
      doneModules: ['1-1', '1-2', '1-3', '1-4', 1, '2-1', '2-2', '2-3', '2-4', 2],
      badges: [1, 2],
      pretestDurationSeconds: 145,
      activities: [
        {
          id: now - 1000 * 60 * 2,
          text: 'Menuntaskan Modul 2: Kompas Etika, Keamanan & Privasi',
          icon: 'fa-solid fa-shield-halved',
          tone: 'blue',
          time: '2 menit lalu',
          timestamp: now - 1000 * 60 * 2,
        },
        {
          id: now - 1000 * 60 * 15,
          text: 'Membuka Lencana Penjaga Etika 🏅',
          icon: 'fa-solid fa-award',
          tone: 'amber',
          time: '15 menit lalu',
          timestamp: now - 1000 * 60 * 15,
        },
        {
          id: now - 1000 * 60 * 45,
          text: 'Menyelesaikan Modul 1: Kenalan dengan "Otak" Buatan',
          icon: 'fa-solid fa-circle-check',
          tone: 'green',
          time: '45 menit lalu',
          timestamp: now - 1000 * 60 * 45,
        },
        {
          id: now - 1000 * 60 * 120,
          text: 'Menyelesaikan Asesmen Radar Kesiapan AI (Skor: 78%)',
          icon: 'fa-solid fa-compass',
          tone: 'indigo',
          time: '2 jam lalu',
          timestamp: now - 1000 * 60 * 120,
        },
      ],
    };
    saveState(demoState);
    setConfirmModalOpen(false);
    showToast('Skenario Demo Showcase berhasil dimuat! 🎉', 'success');
  };

  // Kalkulasi 24 langkah gamifikasi terstruktur
  const allStepIds = MODULES.flatMap((m) => (m.steps ? m.steps.map((s) => s.id) : []));
  const doneCount = state.doneModules
    ? state.doneModules.filter((id) => allStepIds.includes(id)).length
    : 0;

  // Hitung jumlah modul yang telah tuntas seluruh langkahnya (0 - 6 Modul)
  const completedModulesCount = MODULES.filter((mod) => {
    if (mod.steps && mod.steps.length > 0) {
      return mod.steps.every((s) => (state.doneModules || []).includes(s.id));
    }
    return (state.doneModules || []).includes(mod.id);
  }).length;

  const badgeCount = state.badges ? state.badges.length : 0;
  // Total Gems: 100 per langkah + 100 per badge + 50 jika Pre-Test selesai
  const pts = doneCount * 100 + badgeCount * 100 + (state.hasRadar ? 50 : 0);
  // Level progres naik setiap kelipatan 4 langkah (6 modul x 4 langkah = Level 1 sampai 7)
  const lv = Math.max(1, Math.floor(doneCount / 4) + 1);
  // EXP % proporsional terhadap total 24 langkah
  const expPct = Math.min(100, Math.round((doneCount / 24) * 100));

  // Accessibility global states
  const [fontSize, setFontSizeState] = useState(() => {
    try {
      const saved = localStorage.getItem('litgo_font_size');
      return saved ? parseInt(saved, 10) : 16;
    } catch {
      return 16;
    }
  });

  const [isDyslexic, setIsDyslexic] = useState(() => {
    try {
      return localStorage.getItem('litgo_dyslexic') === 'true';
    } catch {
      return false;
    }
  });

  const [isContrast, setIsContrast] = useState(() => {
    try {
      return localStorage.getItem('litgo_contrast') === 'true';
    } catch {
      return false;
    }
  });

  const [isEnglish, setIsEnglish] = useState(() => {
    try {
      return localStorage.getItem('litgo_lang') === 'en';
    } catch {
      return false;
    }
  });

  const [isSpeaking, setIsSpeaking] = useState(false);

  // Apply accessibility settings to DOM on change & on initial mount
  useEffect(() => {
    document.documentElement.style.fontSize = fontSize + 'px';
    document.body.style.fontSize = fontSize + 'px';

    if (isDyslexic) {
      document.body.classList.add('font-dyslexic');
    } else {
      document.body.classList.remove('font-dyslexic');
    }

    if (isContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }

    document.documentElement.lang = isEnglish ? 'en' : 'id';
  }, [fontSize, isDyslexic, isContrast, isEnglish]);

  const handleFontSize = (val, notify = true) => {
    const num = parseInt(val, 10) || 16;
    let size = 16;
    if (num >= 19) {
      size = 20;
    } else if (num >= 17) {
      size = 18;
    }

    setFontSizeState(size);
    localStorage.setItem('litgo_font_size', size.toString());
    if (notify) {
      const label = size === 16 ? '16px (Normal)' : size === 18 ? '18px (Sedang)' : '20px (Besar)';
      showToast('Ukuran teks: ' + label, 'info');
    }
  };

  const toggleDyslexia = () => {
    const next = !isDyslexic;
    setIsDyslexic(next);
    localStorage.setItem('litgo_dyslexic', next.toString());
    showToast(next ? 'Font ramah disleksia diaktifkan' : 'Font ramah disleksia dinonaktifkan', 'info');
  };

  const toggleContrast = () => {
    const next = !isContrast;
    setIsContrast(next);
    localStorage.setItem('litgo_contrast', next.toString());
    showToast(next ? 'Mode kontras tinggi diaktifkan' : 'Mode kontras tinggi dinonaktifkan', 'info');
  };

  const toggleLanguage = () => {
    const next = !isEnglish;
    setIsEnglish(next);
    localStorage.setItem('litgo_lang', next ? 'en' : 'id');
    showToast(next ? 'English language mode activated' : 'Mode Bahasa Indonesia diaktifkan', 'info');
  };

  const toggleTTS = () => {
    if (!('speechSynthesis' in window)) {
      showToast('Fitur Text-to-Speech tidak didukung browser kamu.', 'error');
      return;
    }
    if (!isSpeaking) {
      window.speechSynthesis.cancel();
      const textToSpeak = isEnglish
        ? 'Welcome to Lit-GO. An inclusive AI literacy and ethics learning platform. Complete assessment radars, syllabus modules, and interactive sandbox labs.'
        : 'Selamat datang di Lit-GO. Platform edukasi literasi dan etika kecerdasan buatan. Silakan selesaikan radar asesmen, modul pembelajaran, dan simulasi lab interaktif.';
      const u = new SpeechSynthesisUtterance(textToSpeak);
      u.lang = isEnglish ? 'en-US' : 'id-ID';
      u.onend = () => setIsSpeaking(false);
      u.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(u);
      showToast(isEnglish ? 'Reading summary in English...' : 'Membacakan ringkasan platform...', 'info');
    } else {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      showToast(isEnglish ? 'Text-to-Speech stopped.' : 'Text-to-Speech dihentikan.', 'info');
    }
  };

  return (
    <ProgressContext.Provider
      value={{
        state,
        saveState,
        refreshState,
        logActivity,
        showToast,
        toastMsg,
        toastType,
        handleReset,
        loadDemoPreset,
        isConfirmModalOpen,
        setConfirmModalOpen,
        doneCount,
        completedModulesCount,
        badgeCount,
        pts,
        lv,
        expPct,
        MODULES,
        BADGE_DATA,
        fontSize,
        handleFontSize,
        isDyslexic,
        toggleDyslexia,
        isContrast,
        toggleContrast,
        isEnglish,
        toggleLanguage,
        isSpeaking,
        toggleTTS,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}