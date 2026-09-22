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
      q: "Apa keunggulan utama teknologi Transformer yang membuat model AI (seperti ChatGPT) mampu memahami teks dengan cepat dan pintar?",
      opts: [
        "Mengubah komputer menjadi memiliki emosi dan kesadaran manusia.",
        "Mampu menganalisis seluruh kalimat secara bersamaan (paralel) lewat mekanisme self-attention.",
        "Hanya bisa membaca teks huruf demi huruf secara berurutan dan lambat.",
        "Menghubungkan AI langsung ke pikiran pengguna tanpa internet."
      ],
      ans: 1,
      explanation: "Transformer memproses seluruh kalimat sekaligus secara paralel dengan mekanisme self-attention, bukan membaca satu per satu kata secara lambat seperti model lama (Vaswani dkk., 2017)."
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
        title: "Pasangan Konsep Ilmiah",
        tag: "Langkah 2 • Logika Dasar",
        reading: "Self-attention paralel, model probabilistik, dan mekanisme tokenisasi."
      },
      {
        id: "1-3",
        stepNum: 3,
        title: "Logika Probabilitas & Kasus Hukum",
        tag: "Langkah 3 • Analisis Kasus",
        reading: "Prediksi distribusi token berikutnya dan audit halusinasi pada putusan hukum."
      },
      {
        id: "1-4",
        stepNum: 4,
        title: "Detektif Halusinasi & Evaluasi Lanjutan",
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
      q: "Dalam menangkal konten manipulasi (deepfake), apa perbedaan mendasar pendekatan standar C2PA dibanding deteksi forensik?",
      opts: [
        "C2PA menempelkan sertifikat riwayat asal-usul sejak media dibuat, sedangkan forensik mendeteksi cacat piksel setelah media beredar.",
        "C2PA hanya bekerja setelah konten viral, sedangkan forensik bekerja sebelum foto diambil.",
        "C2PA menghapus gambar otomatis dari internet, sedangkan forensik menyimpannya.",
        "Keduanya sama persis dan tidak memiliki perbedaan cara kerja."
      ],
      ans: 0,
      explanation: "C2PA bersifat proaktif dengan menyematkan metadata asal-usul (label nutrisi digital), sedangkan forensik digital menganalisis artefak piksel setelah konten tersebar."
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
        title: "Bias Algoritma & Gender Shades",
        tag: "Langkah 2 • Identifikasi Bias",
        reading: "Riset Joy Buolamwini & Timnit Gebru (MIT 2018) serta fenomena Coded Gaze pada visi komputer."
      },
      {
        id: "2-3",
        stepNum: 3,
        title: "Bias Bahasa & Word Embedding",
        tag: "Langkah 3 • Analisis Mendalam",
        reading: "Riset Bolukbasi dkk. (2016) membuktikan embedding vektor menyerap stereotip sosial data latih."
      },
      {
        id: "2-4",
        stepNum: 4,
        title: "Forensik Digital vs C2PA",
        tag: "Langkah 4 • Audit Teknis",
        reading: "Koalisi C2PA dengan metadata kriptografis provenance asal-usul vs analisis artefak forensik."
      }
    ]
  },
  {
    id: 3,
    tag: "Level 3",
    title: "Seni Berbicara dengan Mesin",
    topics: "4 Pilar Prompting (Konteks, Instruksi, Format, Persona), Zero-Shot, Few-Shot, CoT (Wei 2022), & ReAct (Yao 2022).",
    badge: "Master Prompt",
    icon: "fa-terminal",
    iconBg: "linear-gradient(135deg, #6366F1, #4F46E5)",
    quiz: {
      q: "Dalam teknik prompting tingkat lanjut, apa kelebihan metode ReAct (Reasoning + Acting) dibanding prompt biasa?",
      opts: [
        "Hanya bisa digunakan untuk menulis cerita dongeng fiksi.",
        "Memungkinkan AI menggabungkan penalaran bertahap dengan tindakan nyata seperti memanggil alat/web eksternal.",
        "Mengunci instruksi agar model AI tidak dapat diperbaiki.",
        "Membuat AI hanya berfungsi secara offline tanpa jaringan."
      ],
      ans: 1,
      explanation: "ReAct (Yao dkk., 2022) menggabungkan penalaran logis bertahap dengan kemampuan memanggil alat nyata (web search, kalkulator, API)."
    },
    steps: [
      {
        id: "3-1",
        stepNum: 1,
        title: "Empat Pilar Prompting",
        tag: "Langkah 1 • Formula Dasar",
        reading: "Formula 4 Pilar: Persona spesifik, Konteks latar belakang, Instruksi terarah, dan Format luaran."
      },
      {
        id: "3-2",
        stepNum: 2,
        title: "Taksonomi Prompting Dasar",
        tag: "Langkah 2 • Pola Contoh",
        reading: "Zero-Shot prompting tanpa contoh vs Few-Shot in-context learning (Brown dkk., GPT-3 2020)."
      },
      {
        id: "3-3",
        stepNum: 3,
        title: "Advanced Prompting - CoT",
        tag: "Langkah 3 • Nalar Bertahap",
        reading: "Chain-of-Thought (Wei dkk., 2022 Google Research) untuk penalaran bertahap soal analitis kompleks."
      },
      {
        id: "3-4",
        stepNum: 4,
        title: "Agentic Framework - ReAct",
        tag: "Langkah 4 • Tindakan Otonom",
        reading: "Paradigma ReAct (Yao dkk., ICLR 2023): Sinergi alur Thought, Action, Observation, & Final Answer."
      }
    ]
  },
  {
    id: 4,
    tag: "Level 4",
    title: "AI sebagai Asisten Produktivitas",
    topics: "RAG (Lewis 2020 Meta AI), Memori Parametrik vs Non-Parametrik, UNESCO Guidance 2023, & Tutor Sokratik.",
    badge: "Inovator Produktif",
    icon: "fa-rocket",
    iconBg: "linear-gradient(135deg, #EC4899, #F43F5E)",
    quiz: {
      q: "Mengapa teknologi RAG (Retrieval-Augmented Generation) sangat efektif mencegah AI mengarang fakta (halusinasi)?",
      opts: [
        "Karena AI dipaksa mencari dan merujuk pada dokumen fakta nyata yang disuntikkan sebelum menjawab.",
        "Karena RAG menghapus pertanyaan yang dianggap terlalu sulit.",
        "Karena RAG melatih ulang seluruh memori model setiap kali ditanya.",
        "Karena RAG mengubah teks jawaban menjadi suara robotik otomatis."
      ],
      ans: 0,
      explanation: "RAG (Lewis dkk., 2020 Meta AI) mengambil dokumen relevan dari basis data eksternal lalu menyuntikkannya sebagai konteks faktual ke model AI."
    },
    steps: [
      {
        id: "4-1",
        stepNum: 1,
        title: "Arsitektur & Prinsip RAG",
        tag: "Langkah 1 • Konsep Alur",
        reading: "Pemisahan memori parametrik (bobot statis) dan memori non-parametrik (dokumen fakta eksternal)."
      },
      {
        id: "4-2",
        stepNum: 2,
        title: "Mekanisme Teknis RAG & Vector DB",
        tag: "Langkah 2 • Ruang Vektor",
        reading: "Proses chunking teks, representasi embedding ruang vektor, dan pencarian kemiripan kosinus."
      },
      {
        id: "4-3",
        stepNum: 3,
        title: "Etika AI dalam Pendidikan",
        tag: "Langkah 3 • Etika Belajar",
        reading: "Panduan UNESCO (2023) menggunakan AI sebagai Tutor Sokratik dan pemantik draf kasar (zero-drafting)."
      },
      {
        id: "4-4",
        stepNum: 4,
        title: "Evaluasi RAG & Tata Kelola",
        tag: "Langkah 4 • Audit Akurasi",
        reading: "Evaluasi tripartit RAG (Faithfulness, Answer Relevance, Context Recall) dan tata kelola privasi data."
      }
    ]
  },
  {
    id: 5,
    tag: "Level 5",
    title: "Eksplorasi AI Kreatif",
    topics: "Enam Sumbu Visual Prompt (Ho 2020 Diffusion), Hak Cipta US Copyright Office, EU AI Act Opt-Out, & Lisensi India.",
    badge: "Kreator Beretika",
    icon: "fa-palette",
    iconBg: "linear-gradient(135deg, #10B981, #059669)",
    quiz: {
      q: "Berdasarkan pedoman hak cipta internasional, syarat utama agar karya seni yang dibantu AI dapat dilindungi hak cipta adalah...",
      opts: [
        "Cukup membayar biaya langganan aplikasi AI.",
        "Hanya mengetikkan prompt satu kalimat tanpa modifikasi apa pun.",
        "Terdapat kontribusi kreatif manusia yang nyata dan signifikan (human authorship) dalam proses pembuatannya.",
        "Semua karya AI dilarang keras dipublikasikan ke masyarakat luas."
      ],
      ans: 2,
      explanation: "U.S. Copyright Office menegaskan bahwa hanya elemen yang dihasilkan dari kepengarangan manusia (human authorship) yang dapat didaftarkan hak ciptanya."
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
        title: "Kebijakan Hak Cipta",
        tag: "Langkah 2 • Aturan Hukum",
        reading: "Preseden U.S. Copyright Office (Zarya of the Dawn) dan syarat modifikasi substantif human authorship."
      },
      {
        id: "5-3",
        stepNum: 3,
        title: "Regulasi Internasional",
        tag: "Langkah 3 • Hak Seniman",
        reading: "Hak opt-out seniman dalam EU AI Act dan skema kompensasi terpadu India One Nation One License."
      },
      {
        id: "5-4",
        stepNum: 4,
        title: "Arsitektur Generatif & Proteksi Seniman",
        tag: "Langkah 4 • Mekanisme Difusi",
        reading: "Mekanisme difusi denoising bertahap (DDPM Ho dkk. 2020) dan protokol watermarking C2PA."
      }
    ]
  },
  {
    id: 6,
    tag: "Level 6",
    title: "Bertahan & Berdaya di Era AI",
    topics: "David Autor MIT (2015) Tugas Rutin vs Fleksibel, Paradoks Polanyi 1966 (Tacit Knowledge), & 3 Human Skills.",
    badge: "Cendekia Digital",
    icon: "fa-graduation-cap",
    iconBg: "linear-gradient(135deg, #F59E0B, #D97706)",
    quiz: {
      q: "Menurut konsep Paradoks Polanyi ('kita tahu lebih banyak dari yang bisa kita katakan'), mengapa AI tidak bisa sepenuhnya menggantikan manusia?",
      opts: [
        "Karena biaya listrik komputer terlalu mahal.",
        "Karena empati, intuisi, dan nalar etis manusia (tacit knowledge) tidak bisa diubah menjadi sekadar rumus kode kaku.",
        "Karena AI selalu gagal dalam melakukan perhitungan matematika.",
        "Karena regulasi melarang semua penggunaan komputer di kantor."
      ],
      ans: 1,
      explanation: "Paradoks Polanyi menjelaskan bahwa tacit knowledge manusia (seperti empati, intuisi situasi, pertimbangan etis) tidak dapat diterjemahkan menjadi aturan eksplisit bagi algoritma statistik."
    },
    steps: [
      {
        id: "6-1",
        stepNum: 1,
        title: "Ekonomi Ketenagakerjaan",
        tag: "Langkah 1 • Pola Kerja",
        reading: "Analisis David Autor MIT (2015) memetakan kerentanan tugas rutin berpola vs tugas kognitif non-rutin."
      },
      {
        id: "6-2",
        stepNum: 2,
        title: "Paradoks Polanyi",
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
        title: "Adaptasi & Metakognisi Masa Depan",
        tag: "Langkah 4 • Visi Masa Depan",
        reading: "Transisi dari ilusi otomatisasi menuju realitas augmentasi: Manusia sebagai pilot, AI sebagai kopilot."
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