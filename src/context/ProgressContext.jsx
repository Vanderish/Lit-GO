import React, { createContext, useContext, useState, useEffect } from 'react';

// Data Silabus & Badge Data (6 Modul Utama x 4 Langkah Penyelesaian Unik = 24 Langkah Total)
export const MODULES = [
  {
    id: 1,
    tag: "Level 1",
    title: 'Kenalan dengan "Otak" AI',
    topics: "Definisi AI, UNESCO Framework, Mitos vs Realitas, & Halusinasi Data.",
    badge: "Pionir AI",
    icon: "fa-brain",
    iconBg: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
    steps: [
      {
        id: "1-1",
        type: "dialogue",
        stepNum: 1,
        title: "Percakapan Interaktif: Anatomi 'Otak' AI",
        tag: "Langkah 1 • Duolingo Interactive Story",
        reading: "UNESCO AI Competency Framework (2024) menegaskan bahwa Generative AI (LLM) bekerja berbasis <b>stochastic prediction (probabilitas statistik kata)</b>, bukan kesadaran manusia. Keterbatasan terbesarnya adalah <b>Halusinasi Data</b> (mencetuskan klaim palsu dengan gaya meyakinkan).",
        keyTakeaway: "AI adalah alat prediksi statistik kata, bukan mesin pencari fakta serba tahu.",
        source: "UNESCO AI Competency Framework 2024 & Stanford AI Index"
      },
      {
        id: "1-2",
        type: "matching",
        stepNum: 2,
        title: "Matching Game: Istilah & Mitos AI",
        tag: "Langkah 2 • Mimo Card Matching Game",
        pairs: [
          { left: "Generative AI (LLM)", right: "Prediksi Probabilitas Kata" },
          { left: "Halusinasi Data", right: "Sitasi & Nomor UU Fiktif" },
          { left: "Search Engine", right: "Mengindeks Dokumen Asli" }
        ]
      },
      {
        id: "1-3",
        type: "tebakgambar1",
        stepNum: 3,
        title: "Game Tebak Gambar AI: Prinsip Probabilitas",
        tag: "Langkah 3 • Game Tebak Gambar Visual",
        clueIcons: ["🧠", "📊", "🎲"],
        clueText: "Otak AI + Diagram Grafik + Dadu Probabilitas",
        q: "Apakah arti dari petunjuk gambar di atas?",
        opts: [
          "AI berpikir menggunakan perasaan dan hati nurani.",
          "AI bekerja memprediksi teks berbasis kalkulasi probabilitas statistik.",
          "AI adalah mesin ajaib serba tahu."
        ],
        ans: 1
      },
      {
        id: "1-4",
        type: "bughunter",
        stepNum: 4,
        title: "Bug Hunter: Berburu Halusinasi Hukum",
        tag: "Langkah 4 • Duolingo Spot-The-Error Game",
        caseTitle: "Rangkuman Hukum Fiktif AI",
        caseDesc: "Berdasarkan Pasal 999 UU Literasi Digital 1945, penggunaan AI wajib didaftarkan ke Kementerian Kebudayaan Kuno."
      }
    ]
  },
  {
    id: 2,
    tag: "Level 2",
    title: "Kompas Etika & Privasi",
    topics: "UNESCO Ethics 2021 & IEEE: Privasi Data, Hak Cipta, & Deteksi Deepfake.",
    badge: "Penjaga Etika",
    icon: "fa-shield-halved",
    iconBg: "linear-gradient(135deg, #0EA5E9, #0284C7)",
    steps: [
      {
        id: "2-1",
        type: "swipebin",
        stepNum: 1,
        title: "Data Privacy Swipe & Shredder",
        tag: "Langkah 1 • Duolingo Swipe/Drag Bin Game",
        reading: "UNESCO Ethics 2021 melarang memasukkan NIK, password, dan rekam medis ke prompt AI publik."
      },
      {
        id: "2-2",
        type: "tebakgambar2",
        stepNum: 2,
        title: "Game Tebak Gambar: Artefak Visual Deepfake",
        tag: "Langkah 2 • Game Tebak Gambar Deepfake",
        clueIcons: ["📸", "🖐️", "👁️"],
        clueText: "Kamera Foto + Tangan 6 Jari + Pupil Mata Asimetris",
        q: "Manakah ciri utama manipulasi foto deepfake AI pada gambar?",
        opts: [
          "Warna baju pejabat terlalu terang.",
          "Anatomi tangan berjumlah 6 jari & refleks pupil mata menyimpang.",
          "Latar pemandangan sangat bagus."
        ],
        ans: 1
      },
      {
        id: "2-3",
        type: "rpgtree",
        stepNum: 3,
        title: "Dilema Etika Kantor: RPG Adventure",
        tag: "Langkah 3 • Duolingo Choice Tree Game"
      },
      {
        id: "2-4",
        type: "stampstudio",
        stepNum: 4,
        title: "Hologram Watermark Stamping Studio",
        tag: "Langkah 4 • Mimo Stamping Studio"
      }
    ]
  },
  {
    id: 3,
    tag: "Level 3",
    title: "Seni Berbicara dengan Mesin",
    topics: "NIST AI RMF & OpenAI Safety: 4 Elemen Anatomi Prompt, Few-Shot, & Safety Guardrails.",
    badge: "Master Prompt",
    icon: "fa-terminal",
    iconBg: "linear-gradient(135deg, #6366F1, #4F46E5)",
    steps: [
      {
        id: "3-1",
        type: "promptpuzzle",
        stepNum: 1,
        title: "NIST 4-Block Prompt Puzzle",
        tag: "Langkah 1 • Mimo Drag-to-Slot Puzzle"
      },
      {
        id: "3-2",
        type: "tebakgambar3",
        stepNum: 2,
        title: "Game Tebak Gambar: Kualitas Few-Shot Prompt",
        tag: "Langkah 2 • Game Tebak Gambar Prompting",
        clueIcons: ["🎯", "📝", "✨"],
        clueText: "Target Presisi + Contoh Teks + Hasil Sempurna",
        q: "Teknik prompting apakah yang menyertakan contoh konkret sebelum meminta hasil?",
        opts: [
          "Zero-Shot Prompting (Tanpa Contoh)",
          "Few-Shot Prompting (Dengan 2-3 Contoh Ideal)",
          "Random Prompting"
        ],
        ans: 1
      },
      {
        id: "3-3",
        type: "terminalauditor",
        stepNum: 3,
        title: "Cybersecurity Terminal Safety Auditor",
        tag: "Langkah 3 • Red-Teaming Terminal Auditor"
      },
      {
        id: "3-4",
        type: "promptrepair",
        stepNum: 4,
        title: "Prompt Repair Workshop",
        tag: "Langkah 4 • Mimo Prompt Repair Workshop"
      }
    ]
  },
  {
    id: 4,
    tag: "Level 4",
    title: "Asisten Produktivitas AI",
    topics: "Tips riset anti-hoaks, prompt repair, & faktualisasi verifikasi.",
    badge: "Inovator Produktif",
    icon: "fa-rocket",
    iconBg: "linear-gradient(135deg, #EC4899, #F43F5E)",
    steps: [
      {
        id: "4-1",
        type: "tebakgambar4",
        stepNum: 1,
        title: "Game Tebak Gambar: Riset Anti-Hoaks",
        tag: "Langkah 1 • Game Tebak Gambar Produktivitas",
        clueIcons: ["🔍", "📰", "🛡️"],
        clueText: "Kaca Pembesar + Berita Berita + Perisai Validasi",
        q: "Tindakan wajib pertama setelah menerima rangkuman AI adalah...",
        opts: [
          "Langsung membagikan ke grup percakapan tanpa dibaca.",
          "Verifikasi klaim spesifik & sitasi ke sumber resmi primer.",
          "Menghapus seluruh tugas."
        ],
        ans: 1
      },
      {
        id: "4-2",
        type: "tileorder",
        stepNum: 2,
        title: "Rantai Protokol Fact-Checking",
        tag: "Langkah 2 • Mimo Tile Reorder Game",
        checkpoints: [
          "Verifikasi klaim ke sumber resmi primer",
          "Uji konsistensi dengan counter-prompt",
          "Cek DOI/URL asli sebelum menyalin"
        ]
      },
      {
        id: "4-3",
        type: "splitslider",
        stepNum: 3,
        title: "Zero-Shot vs Few-Shot Split Slider",
        tag: "Langkah 3 • Fullscreen Output Slider"
      },
      {
        id: "4-4",
        type: "speedquiz",
        stepNum: 4,
        title: "Flash Quiz: Timer 10 Detik Produktivitas",
        tag: "Langkah 4 • Kuis Kilat 10 Detik",
        questions: [
          { q: "Mengapa pembatasan format output (misal: 'Maksimal 3 poin ringkas') sangat penting?", opts: ["Agar AI tidak bertele-tele dan melenceng.", "Agar AI mengakses harddisk.", "Tidak ada pengaruh."], ans: 0 }
        ]
      }
    ]
  },
  {
    id: 5,
    tag: "Level 5",
    title: "Eksplorasi AI Kreatif",
    topics: "Etika text-to-image, hak cipta karya visual, & transparansi deklarasi.",
    badge: "Kreator Beretika",
    icon: "fa-palette",
    iconBg: "linear-gradient(135deg, #10B981, #059669)",
    steps: [
      {
        id: "5-1",
        type: "tebakgambar5",
        stepNum: 1,
        title: "Game Tebak Gambar: Style Visual AI",
        tag: "Langkah 1 • Game Tebak Gambar Style Visual",
        clueIcons: ["🎨", "🌆", "🤖"],
        clueText: "Kuas Cat + Kota Masa Depan + Neon Robot",
        q: "Gaya visual apakah yang direpresentasikan oleh gambar lampu neon & kota futuristik di atas?",
        opts: [
          "Gaya Watercolor Klasik",
          "Gaya Cyberpunk Futuristik",
          "Gaya Sketsa Pensil Hitam Putih"
        ],
        ans: 1
      },
      {
        id: "5-2",
        type: "citationstudio",
        stepNum: 2,
        title: "UNESCO Academic Integrity Studio",
        tag: "Langkah 2 • Citation Studio Generator"
      },
      {
        id: "5-3",
        type: "stampstudio",
        stepNum: 3,
        title: "Hologram Watermark Stamping Studio",
        tag: "Langkah 3 • Mimo Stamping Studio"
      },
      {
        id: "5-4",
        type: "rpgtree",
        stepNum: 4,
        title: "Dilema Etika Hak Cipta Karya Visual",
        tag: "Langkah 4 • RPG Choice Adventure"
      }
    ]
  },
  {
    id: 6,
    tag: "Level 6",
    title: "Bertahan di Era AI",
    topics: "Human-in-the-Loop, empati, critical thinking, & ikrar cendekia digital.",
    badge: "Cendekia Digital",
    icon: "fa-graduation-cap",
    iconBg: "linear-gradient(135deg, #F59E0B, #D97706)",
    steps: [
      {
        id: "6-1",
        type: "cockpitwheel",
        stepNum: 1,
        title: "Pilot vs Copilot Cockpit Console",
        tag: "Langkah 1 • Duolingo Cockpit Console"
      },
      {
        id: "6-2",
        type: "equalizersliders",
        stepNum: 2,
        title: "Human-AI Skill Matrix Equalizer",
        tag: "Langkah 2 • Mimo Equalizer Sliders"
      },
      {
        id: "6-3",
        type: "tebakgambar6",
        stepNum: 3,
        title: "Game Tebak Gambar: Skill Tak Tergantikan",
        tag: "Langkah 3 • Game Tebak Gambar Human Agency",
        clueIcons: ["❤️", "🤝", "🧠"],
        clueText: "Hati Empati + Jabat Tangan + Otak Berpikir Kritis",
        q: "Keterampilan manusia manakah yang PALING TIDAK BISA DIGANTIKAN oleh AI?",
        opts: [
          "Kecepatan menyalin dokumen berulang.",
          "Empati Emosional, Moralitas, & Pemikiran Kritis.",
          "Kecepatan menghitung perkalian matematika."
        ],
        ans: 1
      },
      {
        id: "6-4",
        type: "signaturepledge",
        stepNum: 4,
        title: "Digital Signature & Pledge Ceremony",
        tag: "Langkah 4 • Signature Pad & Pledge Ceremony"
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
  } catch (err) {}
  return 'litgo_complete_v1';
};

const loadInitialState = () => {
  const key = getStorageKey();
  const s = localStorage.getItem(key);
  if (s) {
    try {
      return JSON.parse(s);
    } catch (err) {
      console.error('Failed to parse ' + key, err);
    }
  }
  return {
    radar: [0, 0, 0, 0],
    hasRadar: false,
    doneModules: [],
    badges: [],
  };
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

  useEffect(() => {
    refreshState();
  }, []);

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
    setState({
      radar: [0, 0, 0, 0],
      hasRadar: false,
      doneModules: [],
      badges: [],
    });
    window.location.reload();
  };

  const doneCount = state.doneModules ? state.doneModules.length : 0;
  const badgeCount = state.badges ? state.badges.length : 0;
  const pts = doneCount * 100 + badgeCount * 100;
  const lv = Math.max(1, Math.floor(doneCount / 3) + 1);
  const expPct = Math.min(100, Math.round((doneCount / 16) * 100));

  return (
    <ProgressContext.Provider
      value={{
        state,
        saveState,
        refreshState,
        showToast,
        toastMsg,
        toastType,
        isConfirmModalOpen,
        setConfirmModalOpen,
        handleReset,
        doneCount,
        badgeCount,
        pts,
        lv,
        expPct,
        MODULES,
        BADGE_DATA,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
