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
      q: "Apa inovasi utama arsitektur Transformer (Vaswani dkk., 2017) yang membuat perkembangan AI melesat tajam?",
      opts: [
        "Mengubah nama Imitation Game menjadi Turing Test.",
        "Memungkinkan AI memproses kata secara berurutan agar hasilnya lebih rapi.",
        "Memungkinkan AI memproses banyak data bahasa secara paralel dalam waktu singkat lewat mekanisme self-attention.",
        "Memberikan AI kemampuan untuk memiliki perasaan dan kesadaran sendiri."
      ],
      ans: 2,
      explanation: "Transformer membuang pemrosesan berurutan (seperti pada RNN) dan menggantinya dengan self-attention, sehingga seluruh kalimat bisa diproses bersamaan secara paralel — jauh lebih cepat dan efisien (Vaswani dkk., 2017)."
    },
    steps: [
      {
        id: "1-1",
        stepNum: 1,
        title: "Sejarah & Arsitektur AI",
        tag: "Langkah 1 • 5 Kuis Jurnal",
        reading: "Alan Turing (1950), Dartmouth (1956), & Transformer Vaswani dkk. (2017)."
      },
      {
        id: "1-2",
        stepNum: 2,
        title: "Pasangan Konsep Ilmiah",
        tag: "Langkah 2 • 5 Kuis Jurnal",
        reading: "Self-attention paralel, model probabilistik, dan mekanisme tokenisasi."
      },
      {
        id: "1-3",
        stepNum: 3,
        title: "Logika Probabilitas & Kasus Hukum",
        tag: "Langkah 3 • 5 Kuis Jurnal",
        reading: "Prediksi distribusi token berikutnya dan audit halusinasi pada putusan hukum."
      },
      {
        id: "1-4",
        stepNum: 4,
        title: "Detektif Halusinasi & Evaluasi Lanjutan",
        tag: "Langkah 4 • 5 Kuis Jurnal",
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
      q: "Perbedaan mendasar pendekatan C2PA dibanding deteksi forensik terhadap konten sintetis (deepfake) adalah...",
      opts: [
        "C2PA bekerja reaktif setelah gambar viral, sedangkan forensik bekerja proaktif sejak awal.",
        "C2PA menyematkan metadata asal-usul sejak media dibuat (proaktif), sedangkan forensik menganalisis kejanggalan piksel setelah tersebar (reaktif).",
        "Keduanya persis sama, hanya beda nama merek.",
        "C2PA hanya bisa dipakai untuk video, bukan gambar."
      ],
      ans: 1,
      explanation: "C2PA bersifat proaktif dengan menyematkan metadata asal-usul (label nutrisi) sejak awal, sedangkan forensik digital menganalisis artefak piksel setelah media beredar (reaktif)."
    },
    steps: [
      {
        id: "2-1",
        stepNum: 1,
        title: "Kerangka Etika Global & Nasional",
        tag: "Langkah 1 • 5 Kuis Jurnal",
        reading: "UNESCO Recommendation on the Ethics of AI (2021) & Surat Edaran Menkominfo No. 9/2023."
      },
      {
        id: "2-2",
        stepNum: 2,
        title: "Bias Algoritma & Gender Shades",
        tag: "Langkah 2 • 5 Kuis Jurnal",
        reading: "Riset Joy Buolamwini & Timnit Gebru (MIT 2018) serta fenomena Coded Gaze pada visi komputer."
      },
      {
        id: "2-3",
        stepNum: 3,
        title: "Bias Bahasa & Word Embedding",
        tag: "Langkah 3 • 5 Kuis Jurnal",
        reading: "Riset Bolukbasi dkk. (2016) membuktikan embedding vektor menyerap stereotip sosial data latih."
      },
      {
        id: "2-4",
        stepNum: 4,
        title: "Forensik Digital vs C2PA",
        tag: "Langkah 4 • 5 Kuis Jurnal",
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
      q: "Apa yang membedakan paradigma ReAct (Yao dkk., 2022) dari Chain-of-Thought biasa?",
      opts: [
        "ReAct hanya bisa dipakai untuk menulis karya fiksi.",
        "ReAct menggabungkan penalaran dengan tindakan nyata seperti memanggil alat eksternal (pencarian web/API), bukan sekadar bernalar dalam teks.",
        "ReAct tidak membutuhkan instruksi prompt sama sekali.",
        "ReAct hanya berfungsi secara offline tanpa internet."
      ],
      ans: 1,
      explanation: "ReAct (Synergizing Reasoning and Acting) memungkinkan model AI tidak hanya bernalar langkah demi langkah tetapi juga mengambil tindakan nyata memanggil alat eksternal."
    },
    steps: [
      {
        id: "3-1",
        stepNum: 1,
        title: "Empat Pilar Prompting",
        tag: "Langkah 1 • 5 Kuis Jurnal",
        reading: "Formula 4 Pilar: Persona spesifik, Konteks latar belakang, Instruksi terarah, dan Format luaran."
      },
      {
        id: "3-2",
        stepNum: 2,
        title: "Taksonomi Prompting Dasar",
        tag: "Langkah 2 • 5 Kuis Jurnal",
        reading: "Zero-Shot prompting tanpa contoh vs Few-Shot in-context learning (Brown dkk., GPT-3 2020)."
      },
      {
        id: "3-3",
        stepNum: 3,
        title: "Advanced Prompting - CoT",
        tag: "Langkah 3 • 5 Kuis Jurnal",
        reading: "Chain-of-Thought (Wei dkk., 2022 Google Research) untuk penalaran bertahap soal analitis kompleks."
      },
      {
        id: "3-4",
        stepNum: 4,
        title: "Agentic Framework - ReAct",
        tag: "Langkah 4 • 5 Kuis Jurnal",
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
      q: "Mengapa arsitektur Retrieval-Augmented Generation (RAG) sangat efektif mencegah halusinasi AI?",
      opts: [
        "Karena RAG melatih ulang seluruh parameter jaringan saraf setiap ada pertanyaan baru.",
        "Karena AI dipaksa merumuskan jawaban dari dokumen fakta eksternal yang disuntikkan saat itu juga, bukan sekadar menebak dari ingatan internal.",
        "Karena RAG menghapus pertanyaan yang dianggap rumit.",
        "Karena RAG memblokir kemampuan AI menghasilkan teks baru."
      ],
      ans: 1,
      explanation: "RAG (Lewis dkk., 2020 Meta AI) mengambil dokumen relevan dari basis data eksternal (non-parametrik) lalu menyuntikkannya sebagai konteks faktual ke model generatif."
    },
    steps: [
      {
        id: "4-1",
        stepNum: 1,
        title: "Arsitektur & Prinsip RAG",
        tag: "Langkah 1 • 5 Kuis Jurnal",
        reading: "Pemisahan memori parametrik (bobot statis) dan memori non-parametrik (dokumen fakta eksternal)."
      },
      {
        id: "4-2",
        stepNum: 2,
        title: "Mekanisme Teknis RAG & Vector DB",
        tag: "Langkah 2 • 5 Kuis Jurnal",
        reading: "Proses chunking teks, representasi embedding ruang vektor, dan pencarian kemiripan kosinus."
      },
      {
        id: "4-3",
        stepNum: 3,
        title: "Etika AI dalam Pendidikan",
        tag: "Langkah 3 • 5 Kuis Jurnal",
        reading: "Panduan UNESCO (2023) menggunakan AI sebagai Tutor Sokratik dan pemantik draf kasar (zero-drafting)."
      },
      {
        id: "4-4",
        stepNum: 4,
        title: "Evaluasi RAG & Tata Kelola",
        tag: "Langkah 4 • 5 Kuis Jurnal",
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
      q: "Menurut panduan resmi U.S. Copyright Office, syarat mutlak agar karya yang dibantu AI dapat memperoleh perlindungan hak cipta adalah...",
      opts: [
        "Membayar biaya langganan komersial ke penyedia model AI.",
        "Menjadi orang pertama yang mengetikkan prompt tanpa menyentuh hasil gambarnya.",
        "Terdapat unsur kepengarangan manusia (human authorship) berupa modifikasi kreatif yang signifikan dan substantif atas karya tersebut.",
        "Semua karya AI dilarang keras dilindungi dalam kondisi apa pun."
      ],
      ans: 2,
      explanation: "U.S. Copyright Office menegaskan bahwa hanya elemen yang dihasilkan dari kepengarangan manusia (human authorship) yang dapat didaftarkan hak ciptanya."
    },
    steps: [
      {
        id: "5-1",
        stepNum: 1,
        title: "Enam Sumbu Prompt Visual",
        tag: "Langkah 1 • 5 Kuis Jurnal",
        reading: "Formula 6 Sumbu: Subjek, Gaya seni, Pencahayaan, Komposisi kamera, Palet warna, dan Kualitas render."
      },
      {
        id: "5-2",
        stepNum: 2,
        title: "Kebijakan Hak Cipta",
        tag: "Langkah 2 • 5 Kuis Jurnal",
        reading: "Preseden U.S. Copyright Office (Zarya of the Dawn) dan syarat modifikasi substantif human authorship."
      },
      {
        id: "5-3",
        stepNum: 3,
        title: "Regulasi Internasional",
        tag: "Langkah 3 • 5 Kuis Jurnal",
        reading: "Hak opt-out seniman dalam EU AI Act dan skema kompensasi terpadu India One Nation One License."
      },
      {
        id: "5-4",
        stepNum: 4,
        title: "Arsitektur Generatif & Proteksi Seniman",
        tag: "Langkah 4 • 5 Kuis Jurnal",
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
      q: "Menurut konsep Paradoks Polanyi (1966) yang diulas ekonom David Autor (2015), mengapa AI tidak bisa sepenuhnya menggantikan keahlian manusia?",
      opts: [
        "Karena daya komputasi awan terlalu mahal bagi industri.",
        "Karena banyak pengetahuan dan intuisi manusia bersifat tacit (tersirat) — 'kita tahu lebih banyak dari yang bisa kita katakan' — sehingga sulit diformalkan ke aturan eksplisit.",
        "Karena hukum perburuhan melarang penggunaan mesin.",
        "Karena AI selalu gagal dalam tugas rutin."
      ],
      ans: 1,
      explanation: "Paradoks Polanyi menjelaskan bahwa tacit knowledge manusia (seperti empati, intuisi situasi, pertimbangan etis) tidak dapat diterjemahkan menjadi aturan eksplisit bagi algoritma statistik."
    },
    steps: [
      {
        id: "6-1",
        stepNum: 1,
        title: "Ekonomi Ketenagakerjaan",
        tag: "Langkah 1 • 5 Kuis Jurnal",
        reading: "Analisis David Autor MIT (2015) memetakan kerentanan tugas rutin berpola vs tugas kognitif non-rutin."
      },
      {
        id: "6-2",
        stepNum: 2,
        title: "Paradoks Polanyi",
        tag: "Langkah 2 • 5 Kuis Jurnal",
        reading: "Michael Polanyi (1966) membuktikan bahwa tacit knowledge manusia melampaui aturan eksplisit kode."
      },
      {
        id: "6-3",
        stepNum: 3,
        title: "Tiga Pilar Keterampilan Manusiawi",
        tag: "Langkah 3 • 5 Kuis Jurnal",
        reading: "Keterampilan human-centric WEF: Kecerdasan emosional (EQ), nalar kritis, dan pertimbangan etis moral."
      },
      {
        id: "6-4",
        stepNum: 4,
        title: "Adaptasi & Metakognisi Masa Depan",
        tag: "Langkah 4 • 5 Kuis Jurnal",
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
  try {
    const s = localStorage.getItem('user_data');
    if (s) {
      const u = JSON.parse(s);
      if (u && u.email) {
        return `litgo_complete_${u.email}`;
      }
    }
  } catch {
    // fallback
  }
  return 'litgo_complete_v1';
};

const defaultState = {
  radar: [0, 0, 0, 0],
  hasRadar: false,
  doneModules: [],
  badges: [],
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
    window.location.reload();
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
        showToast,
        toastMsg,
        toastType,
        handleReset,
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